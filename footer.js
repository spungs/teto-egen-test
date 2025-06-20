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
        await this.updateVisitorCount();
        await this.displayStats();
        
        // 주기적으로 카운터 업데이트 (1분마다)
        setInterval(async () => {
            await this.displayStats();
        }, 60000);
    }

    // 방문자 수 업데이트 - 페이지 접속할 때마다 카운트
    async updateVisitorCount() {
        console.log('페이지 방문 감지! 데이터베이스 업데이트를 시작합니다.');
        
        // Supabase 데이터베이스에서 실제 방문자 수 증가
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
            console.log('업데이트할 데이터:', {
                total_visitors: newTotalVisitors,
                daily_visitors: newDailyVisitors,
                visit_date: today
            });
            
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
                    visit_date: today,
                    last_updated: new Date().toISOString()
                })
            });
            
            console.log('업데이트 응답 상태:', response.status);
            
            if (response.ok) {
                const updatedData = await response.json();
                console.log('Supabase 방문자 수 업데이트 성공:', updatedData);
                return newTotalVisitors;
            } else {
                const errorText = await response.text();
                console.error('업데이트 실패:', response.status, errorText);
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }
        } catch (error) {
            console.warn('Supabase 방문자 카운터 업데이트 실패:', error);
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
            
            console.log('Supabase 응답 상태:', response.status);
            
            if (response.ok) {
                const data = await response.json();
                console.log('Supabase에서 가져온 데이터:', data);
                
                if (data && data.length > 0) {
                    return data[0];
                } else {
                    // 데이터가 없으면 초기 레코드 생성
                    console.log('데이터가 없어서 초기 레코드를 생성합니다...');
                    await this.initializeVisitorRecord();
                    return {
                        total_visitors: 0,
                        daily_visitors: 0,
                        visit_date: this.getTodayString(),
                        last_updated: new Date().toISOString()
                    };
                }
            } else {
                console.error('Supabase 응답 에러:', response.status, await response.text());
            }
            
            // 데이터가 없으면 초기값 반환
            return {
                total_visitors: 0,
                daily_visitors: 0,
                visit_date: this.getTodayString(),
                last_updated: new Date().toISOString()
            };
        } catch (error) {
            console.warn('Supabase 데이터 로드 실패:', error);
            return {
                total_visitors: 0,
                daily_visitors: 0,
                visit_date: this.getTodayString(),
                last_updated: new Date().toISOString()
            };
        }
    }

    // 초기 방문자 레코드 생성
    async initializeVisitorRecord() {
        try {
            const response = await fetch(`${this.apiUrl}/${this.tableName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': this.supabaseKey,
                    'Authorization': `Bearer ${this.supabaseKey}`,
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify({
                    id: 1,
                    total_visitors: 0,
                    daily_visitors: 0,
                    visit_date: this.getTodayString(),
                    last_updated: new Date().toISOString()
                })
            });
            
            if (response.ok) {
                console.log('초기 방문자 레코드 생성 완료');
            } else {
                console.error('초기 레코드 생성 실패:', response.status, await response.text());
            }
        } catch (error) {
            console.error('초기 레코드 생성 중 오류:', error);
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
                console.log('Supabase 방문자 통계가 리셋되었습니다.');
                await this.displayStats();
            } else {
                console.error('통계 리셋 실패:', response.status);
            }
        } catch (error) {
            console.error('통계 리셋 중 오류:', error);
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
        console.log('강제로 방문자 수를 증가시켰습니다.');
    }
};

// DOM 로드 후 footer 로딩
document.addEventListener('DOMContentLoaded', loadFooter); 