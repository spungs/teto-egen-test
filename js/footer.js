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
    window.visitorCounter = new VisitorCounter();
}

// 방문자 카운터 관리 클래스 (daily_visitors 테이블 기반)
class VisitorCounter {
    constructor() {
        // config 객체 존재 여부 확인
        const hasConfig = typeof config !== 'undefined';

        this.supabaseUrl = hasConfig ? config.supabaseUrl : '';
        this.supabaseKey = hasConfig ? config.supabaseKey : '';
        this.apiUrl = `${this.supabaseUrl}/rest/v1`;
        this.dailyTable = 'daily_visitors';
        this.statsTable = 'visitor_stats'; // 총 방문자수 집계용(누적)
        this.sessionKey = 'visitor_uuid_' + this.getTodayString();

        // 다른 서비스 링크 설정 (다국어 지원)
        this.otherServices = [
            {
                name: {
                    ko: '닷지마스터',
                    en: 'Dodge Master'
                },
                url: 'https://dodge-master.spungs-teto-egen.com',
                icon: '🚀'
            },
            {
                name: {
                    ko: '룰렛',
                    en: 'Roulette'
                },
                url: 'https://roulette.spungs-teto-egen.com',
                icon: '🎲'
            },
            // 필요한 서비스들을 여기에 추가
        ];

        if (hasConfig) {
            this.cleanupOldUuids(); // 오래된 uuid 정리
        }
        this.init();
    }

    // 다른 서비스 링크들을 화면에 렌더링
    renderServices() {
        const servicesContainer = document.getElementById('services-links');
        if (!servicesContainer) return;

        servicesContainer.innerHTML = '';

        this.otherServices.forEach(service => {
            const link = document.createElement('a');
            link.href = service.url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.className = 'service-link';

            // 현재 언어에 맞는 서비스명 표시 (translations.js의 currentLanguage 사용)
            const lang = (typeof currentLanguage !== 'undefined') ? currentLanguage : 'ko';
            const serviceName = service.name[lang] || service.name.ko; // 기본값은 한국어

            // 아이콘이 있으면 앞에 붙여줌
            link.innerHTML = (service.icon ? `<span class="service-icon">${service.icon}</span> ` : '') + serviceName;

            servicesContainer.appendChild(link);
        });

        // 서비스가 없으면 전체 섹션 숨기기
        const otherServicesSection = document.querySelector('.other-services');
        if (otherServicesSection) {
            otherServicesSection.style.display = this.otherServices.length > 0 ? 'flex' : 'none';
        }
    }

    // 오래된 uuid를 주기적으로 삭제
    cleanupOldUuids() {
        try {
            const todayKey = this.sessionKey;
            const keysToRemove = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('visitor_uuid_') && key !== todayKey) {
                    keysToRemove.push(key);
                }
            }
            keysToRemove.forEach(key => localStorage.removeItem(key));
        } catch (e) {
            // localStorage 접근 불가 시 무시
        }
    }

    async init() {
        const isLocal = this.isLocalEnvironment();
        const isMainTestPage = this.isMainTestPage();
        const hasVisitedToday = this.hasVisitedToday();

        if (isLocal) {
            // console.log('🏠 로컬 환경 - 방문자 카운트 제외');
        } else if (isMainTestPage && !hasVisitedToday) {
            // 오늘 첫 방문자라면 uuid 생성 및 insert
            await this.insertDailyVisitor();
            this.markVisitedToday();
        }

        // 다른 서비스 링크 렌더링
        this.renderServices();

        // 방문자 카운터는 현재 숨김(styles.css의 .stats-container: none) 상태라
        // 표시용 폴링(60초마다 Supabase 조회 ~3건)을 비활성화해 불필요한 요청 제거.
        // 방문 카운트 자체(insertDailyVisitor)는 유지되어 데이터는 계속 누적됨.
        // 카운터를 다시 노출하려면: .stats-container를 flex로 되돌리고 아래를 복구
        //   await this.displayStats();
        //   setInterval(() => this.displayStats(), 60000);
    }

    // 오늘 이미 방문했는지 확인
    hasVisitedToday() {
        try {
            const uuid = localStorage.getItem(this.sessionKey);
            return !!uuid;
        } catch (error) {
            try {
                const uuid = sessionStorage.getItem(this.sessionKey);
                return !!uuid;
            } catch (e) {
                return document.cookie.includes(`${this.sessionKey}=`);
            }
        }
    }

    // 오늘 방문 표시(uuid 저장)
    markVisitedToday(uuid) {
        const value = uuid || crypto.randomUUID();
        try {
            localStorage.setItem(this.sessionKey, value);
        } catch (error) {
            try {
                sessionStorage.setItem(this.sessionKey, value);
            } catch (e) {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(0, 0, 0, 0);
                document.cookie = `${this.sessionKey}=${value}; expires=${tomorrow.toUTCString()}; path=/`;
            }
        }
    }

    // uuid 생성 및 daily_visitors insert
    async insertDailyVisitor() {
        const uuid = crypto.randomUUID();
        const userAgent = navigator.userAgent;
        const ip = '';
        try {
            await fetch(`${this.apiUrl}/${this.dailyTable}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': this.supabaseKey,
                    'Authorization': `Bearer ${this.supabaseKey}`
                },
                body: JSON.stringify({
                    id: uuid,
                    user_agent: userAgent,
                    ip_address: ip
                })
            });
            this.markVisitedToday(uuid);
        } catch (error) {
            console.error('방문자 insert 실패:', error);
        }
    }

    // 오늘 날짜 문자열 반환 (YYYY-MM-DD)
    getTodayString() {
        const today = new Date();
        return today.getFullYear() + '-' +
            String(today.getMonth() + 1).padStart(2, '0') + '-' +
            String(today.getDate()).padStart(2, '0');
    }

    // KST 기준 오늘 0시 ~ 23시 59분의 UTC 범위 반환
    getKSTTodayUTCRange() {
        // 현재 UTC 시간을 KST로 변환해서 오늘 날짜 구하기
        const now = new Date();
        const kstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000); // UTC + 9시간 = KST

        const year = kstNow.getUTCFullYear();
        const month = kstNow.getUTCMonth();
        const date = kstNow.getUTCDate();

        // KST 기준 오늘 0시를 UTC로 변환
        const kstTodayStart = new Date(Date.UTC(year, month, date, 0, 0, 0));
        const utcTodayStart = new Date(kstTodayStart.getTime() - 9 * 60 * 60 * 1000);

        // KST 기준 오늘 23:59:59를 UTC로 변환
        const kstTodayEnd = new Date(Date.UTC(year, month, date, 23, 59, 59));
        const utcTodayEnd = new Date(kstTodayEnd.getTime() - 9 * 60 * 60 * 1000);

        return {
            start: utcTodayStart.toISOString(),
            end: utcTodayEnd.toISOString()
        };
    }

    // 오늘 0시(KST)를 UTC로 변환해 ISO 문자열 반환
    getTodayUTCISOString() {
        const range = this.getKSTTodayUTCRange();
        return range.start.slice(0, 10); // YYYY-MM-DD
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
        return (
            currentPath === '/' ||
            currentPath.endsWith('/index.html') ||
            currentPath.endsWith('/teto-egen-test/') ||
            currentPath.endsWith('/teto-egen-test/index.html') ||
            (currentPage.includes('index.html') && !currentPath.includes('/about.html') && !currentPath.includes('/guide.html') && !currentPath.includes('/privacy-policy.html'))
        );
    }

    // 오늘 방문자수 집계
    async getTodayVisitorCount() {
        try {
            // KST 기준 오늘 0시 ~ 23:59:59의 UTC 범위
            const range = this.getKSTTodayUTCRange();
            const response = await fetch(`${this.apiUrl}/${this.dailyTable}?created_at=gte.${range.start}&created_at=lte.${range.end}`, {
                method: 'GET',
                headers: {
                    'apikey': this.supabaseKey,
                    'Authorization': `Bearer ${this.supabaseKey}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                return data.length;
            }
        } catch (error) {
            console.error('오늘 방문자수 집계 실패:', error);
        }
        return 0;
    }

    // 총 방문자수 집계 (누적 + 오늘)
    async getTotalVisitorCount() {
        try {
            // 1. 누적 total_visitors(어제까지)
            const statsRes = await fetch(`${this.apiUrl}/${this.statsTable}?id=eq.1`, {
                method: 'GET',
                headers: {
                    'apikey': this.supabaseKey,
                    'Authorization': `Bearer ${this.supabaseKey}`
                }
            });
            let total = 0;
            if (statsRes.ok) {
                const stats = await statsRes.json();
                if (stats && stats.length > 0) {
                    total = stats[0].total_visitors || 0;
                }
            }
            // 2. 오늘 방문자수
            const todayCount = await this.getTodayVisitorCount();
            return total + todayCount;
        } catch (error) {
            console.error('총 방문자수 집계 실패:', error);
        }
        return 0;
    }

    // 화면에 통계 표시
    async displayStats() {
        const dailyElement = document.getElementById('daily-visitors');
        const totalElement = document.getElementById('total-visitors');
        try {
            const [today, total] = await Promise.all([
                this.getTodayVisitorCount(),
                this.getTotalVisitorCount()
            ]);
            if (dailyElement) {
                dailyElement.textContent = this.formatNumber(today);
                dailyElement.style.color = '#74b9ff';
                dailyElement.title = '데이터베이스 연결 정상';
            }
            if (totalElement) {
                totalElement.textContent = this.formatNumber(total);
                totalElement.style.color = '#74b9ff';
                totalElement.title = '데이터베이스 연결 정상';
            }
        } catch (error) {
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

    // 숫자 포맷
    formatNumber(num) {
        return num.toLocaleString('ko-KR');
    }
}

document.addEventListener('DOMContentLoaded', loadFooter); 