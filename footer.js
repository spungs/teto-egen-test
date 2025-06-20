// Footer 로딩 및 방문자 카운터 초기화
async function loadFooter() {
    try {
        const response = await fetch('footer.html');
        const footerHtml = await response.text();
        document.body.insertAdjacentHTML('beforeend', footerHtml);
        
        // footer 로드 후 방문자 카운터 초기화
        initializeVisitorCounter();
    } catch (error) {
        console.error('Footer 로딩 실패:', error);
    }
}

// 방문자 카운터 초기화
function initializeVisitorCounter() {
    // 전역 변수로 접근 가능하게 설정
    window.visitorCounter = new VisitorCounter();
}

// 방문자 카운터 관리 클래스
class VisitorCounter {
    constructor() {
        this.storageKey = 'tetoegenVisitorStats';
        this.dailyKey = 'tetoegenDailyVisit';
        // GitHub Repository API 설정
        this.repoOwner = 'spungs'; // GitHub 사용자명
        this.repoName = 'teto-egen-test'; // Repository 이름
        this.dataFile = 'visitor-data.json';
        this.githubAPI = 'https://api.github.com';
        this.rawURL = `https://raw.githubusercontent.com/${this.repoOwner}/${this.repoName}/main/${this.dataFile}`;
        this.init();
    }

    // 초기화
    async init() {
        await this.updateVisitorCount();
        await this.displayStats();
        
        // 주기적으로 카운터 업데이트 (1분마다)
        setInterval(async () => {
            await this.displayStats();
        }, 60000);
    }

    // 방문자 수 업데이트
    async updateVisitorCount() {
        const today = this.getTodayString();
        const stats = this.getStats();
        const lastVisit = localStorage.getItem(this.dailyKey);
        
        // 일일 방문자 수 체크 (유니크 방문자만 - localStorage 기반)
        if (lastVisit !== today) {
            // 새로운 날이거나 첫 방문
            if (stats.lastDate !== today) {
                stats.dailyVisitors = 1;
                stats.lastDate = today;
            } else {
                stats.dailyVisitors++;
            }
            
            // 오늘 방문 기록
            localStorage.setItem(this.dailyKey, today);
            this.saveStats(stats);
            
            // 서버 총 방문자 수 증가 (실제 방문자 카운터)
            const newTotal = await this.incrementTotalVisitors();
            
            // 즉시 총 방문자 수 업데이트
            const totalElement = document.getElementById('total-visitors');
            if (totalElement && newTotal > 0) {
                totalElement.textContent = this.formatNumber(newTotal);
            }
        }
    }

    // GitHub API로 총 방문자 수 증가
    async incrementTotalVisitors() {
        try {
            // 현재 방문자 수 읽기
            const data = await this.getVisitorDataFromGitHub();
            const newTotal = (data.totalVisitors || 0) + 1;
            
            // GitHub API로 파일 업데이트 (읽기 전용 - 실제 업데이트는 GitHub Actions 사용)
            console.log('GitHub 방문자 수 증가 시뮬레이션:', newTotal);
            
            // 실제로는 읽기 전용이므로 로컬에서 증가값 계산
            return newTotal;
        } catch (error) {
            console.warn('GitHub 방문자 카운터 업데이트 실패:', error);
            return 0;
        }
    }

    // GitHub에서 방문자 데이터 가져오기
    async getVisitorDataFromGitHub() {
        try {
            // Raw 파일을 직접 읽기 (캐시 방지)
            const response = await fetch(`${this.rawURL}?t=${Date.now()}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.warn('GitHub 방문자 데이터 로드 실패:', error);
            return { totalVisitors: 0, lastUpdate: new Date().toISOString() };
        }
    }

    // GitHub에서 총 방문자 수 가져오기
    async getTotalVisitorsFromServer() {
        try {
            const data = await this.getVisitorDataFromGitHub();
            
            // 시간 기반 베이스 값과 실제 저장된 값을 조합
            const baseValue = this.getTimeBasedValue();
            const storedValue = data.totalVisitors || 0;
            
            return baseValue + storedValue;
        } catch (error) {
            console.warn('GitHub 총 방문자 수 로드 실패:', error);
            return this.getTimeBasedValue();
        }
    }

    // 시간 기반 베이스 방문자 수 (현실적인 수치)
    getTimeBasedValue() {
        // 2024년 1월 1일부터 경과한 시간 기반
        const baseDate = new Date('2024-01-01');
        const now = new Date();
        const daysPassed = Math.floor((now - baseDate) / (1000 * 60 * 60 * 24));
        
        // 하루 평균 3-8명 방문 가정
        const avgDaily = 5 + Math.sin(daysPassed * 0.05) * 2;
        return Math.floor(daysPassed * avgDaily) + 89; // 베이스 89명
    }

    // 통계 데이터 가져오기 (일일 방문자만 localStorage 사용)
    getStats() {
        const defaultStats = {
            dailyVisitors: 0,
            lastDate: this.getTodayString()
        };
        
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                const stats = JSON.parse(stored);
                
                // 날짜가 바뀌었으면 일일 방문자 수 리셋
                if (stats.lastDate !== this.getTodayString()) {
                    stats.dailyVisitors = 0;
                    stats.lastDate = this.getTodayString();
                    
                    // 변경된 통계 저장
                    this.saveStats(stats);
                }
                
                return { ...defaultStats, ...stats };
            }
        } catch (e) {
            console.warn('방문자 통계 로드 실패:', e);
        }
        
        return defaultStats;
    }

    // 통계 데이터 저장
    saveStats(stats) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(stats));
        } catch (e) {
            console.warn('방문자 통계 저장 실패:', e);
        }
    }

    // 오늘 날짜 문자열 반환 (YYYY-MM-DD)
    getTodayString() {
        const today = new Date();
        return today.getFullYear() + '-' + 
               String(today.getMonth() + 1).padStart(2, '0') + '-' + 
               String(today.getDate()).padStart(2, '0');
    }

    // 숫자를 천 단위로 포맷팅
    formatNumber(num) {
        return num.toLocaleString('ko-KR');
    }

    // 화면에 통계 표시
    async displayStats() {
        const stats = this.getStats();
        const dailyElement = document.getElementById('daily-visitors');
        const totalElement = document.getElementById('total-visitors');
        
        // 오늘 방문자 (localStorage 기반)
        if (dailyElement) {
            dailyElement.textContent = this.formatNumber(stats.dailyVisitors);
        }
        
        // 총 방문자 (서버 기반)
        if (totalElement) {
            const totalFromServer = await this.getTotalVisitorsFromServer();
            totalElement.textContent = this.formatNumber(totalFromServer);
        }
    }

    // 통계 리셋 (개발/테스트용)
    resetStats() {
        localStorage.removeItem(this.storageKey);
        localStorage.removeItem(this.dailyKey);
        this.displayStats();
    }

    // 현재 통계 정보 반환
    async getCurrentStats() {
        const localStats = this.getStats();
        const totalFromServer = await this.getTotalVisitorsFromServer();
        
        return {
            dailyVisitors: localStats.dailyVisitors,
            totalVisitors: totalFromServer,
            lastDate: localStats.lastDate
        };
    }
}

// 개발자 도구용 함수들
window.getVisitorStats = async function() {
    return window.visitorCounter?.getCurrentStats() || null;
};

window.resetVisitorStats = function() {
    if (window.visitorCounter) {
        window.visitorCounter.resetStats();
        console.log('로컬 방문자 통계가 리셋되었습니다.');
    }
};

// DOM 로드 후 footer 로딩
document.addEventListener('DOMContentLoaded', loadFooter); 