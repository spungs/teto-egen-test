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
        // Supabase 설정 (config.js에서 가져옴)
        this.supabaseUrl = config.supabaseUrl;
        this.supabaseKey = config.supabaseKey;
        this.apiUrl = `${this.supabaseUrl}/rest/v1`;
        this.tableName = 'visitor_stats';
        this.init();
    }

    // 초기화
    async init() {
        // 현재 페이지가 메인 테스트 페이지인지 확인
        const isMainTestPage = this.isMainTestPage();
        const isLocal = this.isLocalEnvironment();
        
        // 디버깅용 로그
        console.log('현재 페이지:', window.location.pathname);
        console.log('현재 호스트:', window.location.hostname);
        console.log('로컬 환경 여부:', isLocal);
        console.log('메인 테스트 페이지 여부:', isMainTestPage);
        
        if (isLocal) {
            console.log('🏠 로컬 환경 - 방문자 카운트 제외');
        } else if (isMainTestPage) {
            // 프로덕션 환경의 메인 테스트 페이지에서만 방문자 카운트 증가
            console.log('✅ 방문자 카운트 증가 (프로덕션)');
            await this.updateVisitorCount();
        } else {
            console.log('❌ 방문자 카운트 제외 (가이드/소개 페이지)');
        }
        
        // 모든 페이지에서 통계는 표시
        await this.displayStats();
        
        // 주기적으로 카운터 업데이트 (1분마다)
        setInterval(async () => {
            await this.displayStats();
        }, 60000);
    }

    // 로컬 환경인지 확인
    isLocalEnvironment() {
        const hostname = window.location.hostname;
        return (
            hostname === 'localhost' ||
            hostname === '127.0.0.1' ||
            hostname.startsWith('192.168.') ||
            hostname.startsWith('10.') ||
            hostname.startsWith('172.') ||
            hostname === '' ||
            hostname.includes('local')
        );
    }

    // 메인 테스트 페이지인지 확인
    isMainTestPage() {
        const currentPath = window.location.pathname;
        const currentPage = window.location.href;
        
        // 다음 조건들 중 하나라도 만족하면 메인 테스트 페이지로 판단
        return (
            // 1. 루트 경로 (/) 또는 루트의 index.html
            currentPath === '/' || 
            currentPath.endsWith('/index.html') ||
            // 2. 레포지토리 루트 경로 (GitHub Pages의 경우)
            currentPath.endsWith('/teto-egen-test/') ||
            currentPath.endsWith('/teto-egen-test/index.html') ||
            // 3. 파일명이 명시적으로 index.html이고 루트 레벨
            (currentPage.includes('index.html') && !currentPath.includes('/about.html') && !currentPath.includes('/guide.html') && !currentPath.includes('/privacy-policy.html'))
        );
    }

    // 방문자 수 업데이트 - 페이지 접속할 때마다 카운트
    async updateVisitorCount() {
        await this.incrementTotalVisitors();
    }

    // Supabase로 총 방문자 수 증가
    async incrementTotalVisitors() {
        try {
            // 현재 데이터 가져오기
            const currentData = await this.getVisitorDataFromSupabase();
            const today = this.getTodayString();
            
            // 새로운 데이터 계산 - 총 방문자와 일일 방문자 모두 +1
            let newTotalVisitors = currentData.total_visitors + 1;
            let newDailyVisitors;
            
            // 날짜가 바뀌었으면 일일 방문자 리셋
            if (currentData.visit_date !== today) {
                newDailyVisitors = 1; // 새로운 날의 첫 방문자
            } else {
                newDailyVisitors = currentData.daily_visitors + 1; // 오늘 방문자 +1
            }
            
            // Supabase 업데이트
            
            const response = await fetch(`${this.apiUrl}/${this.tableName}?id=eq.1`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': this.supabaseKey,
                    'Authorization': `Bearer ${this.supabaseKey}`,
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify({
                    total_visitors: newTotalVisitors,
                    daily_visitors: newDailyVisitors,
                    visit_date: today
                    // last_updated는 제거하여 Supabase에서 자동으로 현재 시간 설정되도록 함
                })
            });
            
            if (response.ok) {
                return newTotalVisitors;
            } else {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }
        } catch (error) {
            return 0;
        }
    }

    // Supabase에서 방문자 데이터 가져오기
    async getVisitorDataFromSupabase() {
        try {
            const response = await fetch(`${this.apiUrl}/${this.tableName}?id=eq.1`, {
                method: 'GET',
                headers: {
                    'apikey': this.supabaseKey,
                    'Authorization': `Bearer ${this.supabaseKey}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                if (data && data.length > 0) {
                    return data[0];
                }
            }
            
            // 데이터가 없으면 초기값 반환
            return {
                total_visitors: 0,
                daily_visitors: 0,
                visit_date: this.getTodayString(),
                last_updated: new Date().toISOString()
            };
        } catch (error) {
            return {
                total_visitors: 0,
                daily_visitors: 0,
                visit_date: this.getTodayString(),
                last_updated: new Date().toISOString()
            };
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
        const dailyElement = document.getElementById('daily-visitors');
        const totalElement = document.getElementById('total-visitors');
        
        // 모든 데이터를 Supabase에서 가져오기
        const data = await this.getVisitorDataFromSupabase();
        
        // 오늘 방문자 (서버 기반)
        if (dailyElement) {
            dailyElement.textContent = this.formatNumber(data.daily_visitors || 0);
        }
        
        // 총 방문자 (서버 기반)
        if (totalElement) {
            totalElement.textContent = this.formatNumber(data.total_visitors || 0);
        }
    }

    // 통계 리셋 (개발/테스트용) - Supabase 데이터 초기화
    async resetStats() {
        try {
            const response = await fetch(`${this.apiUrl}/${this.tableName}?id=eq.1`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': this.supabaseKey,
                    'Authorization': `Bearer ${this.supabaseKey}`,
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify({
                    total_visitors: 0,
                    daily_visitors: 0,
                    visit_date: this.getTodayString(),
                    last_updated: new Date().toISOString()
                })
            });
            
            if (response.ok) {
                await this.displayStats();
            }
        } catch (error) {
            // 에러 발생 시 무시
        }
    }

    // 현재 통계 정보 반환
    async getCurrentStats() {
        const data = await this.getVisitorDataFromSupabase();
        
        return {
            dailyVisitors: data.daily_visitors || 0,
            totalVisitors: data.total_visitors || 0,
            lastDate: data.visit_date || this.getTodayString()
        };
    }
}

// 개발자 도구용 함수들
window.getVisitorStats = async function() {
    return window.visitorCounter?.getCurrentStats() || null;
};

window.resetVisitorStats = async function() {
    if (window.visitorCounter) {
        await window.visitorCounter.resetStats();
    }
};

// 테스트용: 강제로 방문자 수 증가
window.forceIncrementVisitor = async function() {
    if (window.visitorCounter) {
        await window.visitorCounter.incrementTotalVisitors();
        await window.visitorCounter.displayStats();
    }
};

// DOM 로드 후 footer 로딩
document.addEventListener('DOMContentLoaded', loadFooter); 