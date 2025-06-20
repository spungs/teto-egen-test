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
        this.countAPIBase = 'https://api.countapi.xyz';
        this.namespace = 'tetoegentest';
        this.totalKey = 'total-visitors';
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

    // CountAPI로 총 방문자 수 증가
    async incrementTotalVisitors() {
        try {
            const response = await fetch(`${this.countAPIBase}/hit/${this.namespace}/${this.totalKey}`);
            const data = await response.json();
            console.log('서버 방문자 수 업데이트:', data.value);
            return data.value;
        } catch (error) {
            console.warn('서버 방문자 카운터 업데이트 실패:', error);
            return 0;
        }
    }

    // CountAPI에서 총 방문자 수 가져오기
    async getTotalVisitorsFromServer() {
        try {
            const response = await fetch(`${this.countAPIBase}/get/${this.namespace}/${this.totalKey}`);
            const data = await response.json();
            
            // 키가 존재하지 않으면 생성
            if (!data.value && data.value !== 0) {
                console.log('CountAPI 키가 존재하지 않아 초기화합니다...');
                const initResponse = await fetch(`${this.countAPIBase}/create?namespace=${this.namespace}&key=${this.totalKey}&value=0`);
                return 0;
            }
            
            return data.value || 0;
        } catch (error) {
            console.warn('서버 방문자 수 로드 실패:', error);
            return 0;
        }
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