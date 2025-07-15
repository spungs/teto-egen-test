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
        this.sessionKey = 'visitor_session_' + this.getTodayString();
        this.dbConnected = null; // DB 연결 상태 추적
        this.init();
    }

    // 초기화
    async init() {
        // 현재 페이지가 메인 테스트 페이지인지 확인
        const isMainTestPage = this.isMainTestPage();
        const isLocal = this.isLocalEnvironment();
        const hasVisitedToday = this.hasVisitedToday();
        
        // 디버깅용 로그
        console.log('현재 페이지:', window.location.pathname);
        console.log('현재 호스트:', window.location.hostname);
        console.log('로컬 환경 여부:', isLocal);
        console.log('메인 테스트 페이지 여부:', isMainTestPage);
        console.log('오늘 이미 방문 여부:', hasVisitedToday);
        
        if (isLocal) {
            console.log('🏠 로컬 환경 - 방문자 카운트 제외');
        } else if (isMainTestPage && !hasVisitedToday) {
            // 프로덕션 환경의 메인 테스트 페이지에서 오늘 첫 방문시에만 카운트 증가
            console.log('✅ 방문자 카운트 증가 (프로덕션, 오늘 첫 방문)');
            const success = await this.updateVisitorCount();
            if (success) {
                this.markVisitedToday();
            }
        } else if (isMainTestPage && hasVisitedToday) {
            console.log('⚠️ 오늘 이미 방문한 사용자 - 카운트 제외');
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

    // 오늘 이미 방문했는지 확인
    hasVisitedToday() {
        try {
            const visited = localStorage.getItem(this.sessionKey);
            return visited === 'true';
        } catch (error) {
            // localStorage가 사용 불가능한 경우 sessionStorage 사용
            try {
                const visited = sessionStorage.getItem(this.sessionKey);
                return visited === 'true';
            } catch (e) {
                // 둘 다 사용 불가능한 경우 쿠키로 체크
                return document.cookie.includes(`${this.sessionKey}=true`);
            }
        }
    }

    // 오늘 방문 표시
    markVisitedToday() {
        try {
            localStorage.setItem(this.sessionKey, 'true');
        } catch (error) {
            // localStorage가 사용 불가능한 경우 sessionStorage 사용
            try {
                sessionStorage.setItem(this.sessionKey, 'true');
            } catch (e) {
                // 둘 다 사용 불가능한 경우 쿠키로 설정 (하루 동안 유효)
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(0, 0, 0, 0);
                document.cookie = `${this.sessionKey}=true; expires=${tomorrow.toUTCString()}; path=/`;
            }
        }
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

    // 방문자 수 업데이트 - 성공/실패 상태 반환
    async updateVisitorCount() {
        return await this.incrementTotalVisitors();
    }

    // Supabase로 총 방문자 수 증가 (안정성 개선)
    async incrementTotalVisitors() {
        let retryCount = 0;
        const maxRetries = 3;
        let lastError = null;
        
        while (retryCount < maxRetries) {
            try {
                // 현재 데이터 가져오기
                const currentData = await this.getVisitorDataFromSupabase();
                
                // DB 연결 실패 시 바로 false 반환
                if (!currentData) {
                    this.dbConnected = false;
                    return false;
                }
                
                // daily_visitors, total_visitors +1
                let newTotalVisitors = (currentData.total_visitors || 0) + 1;
                let newDailyVisitors = (currentData.daily_visitors || 0) + 1;
                
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
                        daily_visitors: newDailyVisitors
                    })
                });
                
                if (response.ok) {
                    const result = await response.json();
                    console.log('방문자 카운트 업데이트 성공:', result);
                    this.dbConnected = true;
                    return true;
                } else {
                    const errorText = await response.text();
                    lastError = `HTTP ${response.status}: ${errorText}`;
                    throw new Error(lastError);
                }
            } catch (error) {
                retryCount++;
                lastError = error;
                console.error(`방문자 카운트 업데이트 시도 ${retryCount}/${maxRetries} 실패:`, error);
                
                if (retryCount >= maxRetries) {
                    console.error('최대 재시도 횟수 초과, 카운트 업데이트 실패');
                    this.dbConnected = false;
                    // 사용자에게 안내 메시지 표시
                    alert('방문자 수 업데이트에 실패했습니다. 네트워크 상태를 확인하거나 잠시 후 다시 시도해 주세요.');
                    return false;
                }
                // 재시도 전 대기 (exponential backoff)
                await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
            }
        }
        this.dbConnected = false;
        if (lastError) {
            alert('방문자 수 업데이트에 실패했습니다. 네트워크 상태를 확인하거나 잠시 후 다시 시도해 주세요.');
        }
        return false;
    }

    // Supabase에서 방문자 데이터 가져오기 (안정성 개선)
    async getVisitorDataFromSupabase() {
        let retryCount = 0;
        const maxRetries = 3;
        
        while (retryCount < maxRetries) {
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
                        const result = data[0];
                        this.dbConnected = true;
                        
                        return {
                            total_visitors: Math.max(0, result.total_visitors || 0),
                            daily_visitors: Math.max(0, result.daily_visitors || 0),
                            visit_date: result.visit_date, // 조회만
                            last_updated: result.last_updated || new Date().toISOString()
                        };
                    }
                }
                
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            } catch (error) {
                retryCount++;
                console.error(`데이터 로드 시도 ${retryCount}/${maxRetries} 실패:`, error);
                
                if (retryCount >= maxRetries) {
                    console.error('최대 재시도 횟수 초과, 데이터 로드 실패');
                    this.dbConnected = false;
                    return null;
                }
                
                // 재시도 전 대기
                await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
            }
        }
        
        this.dbConnected = false;
        return null;
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

    // 화면에 통계 표시 (사용자 피드백 개선)
    async displayStats() {
        const dailyElement = document.getElementById('daily-visitors');
        const totalElement = document.getElementById('total-visitors');
        
        try {
            // 모든 데이터를 Supabase에서 가져오기
            const data = await this.getVisitorDataFromSupabase();
            
            if (data) {
                // 정상 데이터 표시
                if (dailyElement) {
                    dailyElement.textContent = this.formatNumber(data.daily_visitors || 0);
                    dailyElement.style.color = '#74b9ff'; // 정상 상태 색상
                    dailyElement.title = '데이터베이스 연결 정상';
                }
                
                if (totalElement) {
                    totalElement.textContent = this.formatNumber(data.total_visitors || 0);
                    totalElement.style.color = '#74b9ff'; // 정상 상태 색상
                    totalElement.title = '데이터베이스 연결 정상';
                }
            } else {
                // DB 연결 실패 시 오류 표시
                if (dailyElement) {
                    dailyElement.textContent = '-';
                    dailyElement.style.color = '#ff6b6b'; // 오류 상태 색상
                    dailyElement.title = '데이터베이스 연결 오류';
                }
                
                if (totalElement) {
                    totalElement.textContent = '-';
                    totalElement.style.color = '#ff6b6b'; // 오류 상태 색상
                    totalElement.title = '데이터베이스 연결 오류';
                }
                
                console.warn('방문자 통계 표시 실패: 데이터베이스 연결 불가');
            }
        } catch (error) {
            console.error('통계 표시 실패:', error);
            
            // 에러 발생 시 기본값 표시
            if (dailyElement) {
                dailyElement.textContent = '-';
                dailyElement.style.color = '#ff6b6b';
                dailyElement.title = '통계 로드 오류';
            }
            if (totalElement) {
                totalElement.textContent = '-';
                totalElement.style.color = '#ff6b6b';
                totalElement.title = '통계 로드 오류';
            }
        }
    }

    // 통계 리셋 (개발/테스트용) - Supabase 데이터 초기화
    async resetStats() {
        // 운영 환경에서 사용 금지
        if (window.location.hostname !== 'localhost' && !window.location.hostname.startsWith('127.')) {
            alert('운영 환경에서는 통계 리셋 기능을 사용할 수 없습니다.');
            return;
        }
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
                    daily_visitors: 0
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
        
        if (data) {
            return {
                dailyVisitors: data.daily_visitors || 0,
                totalVisitors: data.total_visitors || 0,
                lastDate: data.visit_date || this.getTodayString(),
                dbConnected: this.dbConnected
            };
        } else {
            return {
                dailyVisitors: 0,
                totalVisitors: 0,
                lastDate: this.getTodayString(),
                dbConnected: false
            };
        }
    }
}

// 개발자 도구용 함수들
window.getVisitorStats = async function() {
    return window.visitorCounter?.getCurrentStats() || null;
};

// DOM 로드 후 footer 로딩
document.addEventListener('DOMContentLoaded', loadFooter); 