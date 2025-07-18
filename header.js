// 헤더 로딩 및 활성 페이지 설정
async function loadHeader() {
    try {
        const response = await fetch('header.html');
        const headerHtml = await response.text();
        document.body.insertAdjacentHTML('afterbegin', headerHtml);
        
        // 현재 페이지에 따라 활성 버튼 설정
        setActiveNavButton();
        
        // 데이터베이스에서 버전 정보 로드
        await loadVersionFromDatabase();
        
        // 언어 토글 이벤트 리스너 추가 (translations.js가 로드된 후)
        setTimeout(() => {
            const languageToggle = document.getElementById('language-toggle');
            if (languageToggle) {
                // 기존 이벤트 리스너 제거 (중복 방지)
                if (!languageToggle.hasAttribute('data-listener-added')) {
                    languageToggle.addEventListener('click', function() {
                        if (typeof toggleLanguage === 'function') {
                            toggleLanguage();
                        } else {
                            console.warn('toggleLanguage 함수를 찾을 수 없습니다.');
                        }
                        // 클릭 후 포커스 제거 (모바일에서 포커스 상태 해제)
                        this.blur();
                    });
                    languageToggle.setAttribute('data-listener-added', 'true');
                }
            }
        }, 100);
    } catch (error) {
        console.error('헤더 로딩 실패:', error);
    }
}

function setActiveNavButton() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // 모든 nav 버튼에서 active 클래스 제거
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 현재 페이지에 해당하는 버튼에 active 클래스 추가
    switch(currentPage) {
        case 'index.html':
        case '':
            document.getElementById('home-nav')?.classList.add('active');
            break;
        case 'about.html':
            document.getElementById('about-nav')?.classList.add('active');
            break;
        case 'guide.html':
            document.getElementById('guide-nav')?.classList.add('active');
            break;
        case 'privacy-policy.html':
            document.getElementById('privacy-nav')?.classList.add('active');
            break;
    }
}

// 데이터베이스에서 버전 정보 로드
async function loadVersionFromDatabase() {
    try {
        // config.js에서 Supabase 설정 가져오기
        if (typeof config === 'undefined') {
            console.warn('config.js가 로드되지 않았습니다. 기본 버전을 사용합니다.');
            return;
        }

        const response = await fetch(`${config.supabaseUrl}/rest/v1/visitor_stats?id=eq.1`, {
            method: 'GET',
            headers: {
                'apikey': config.supabaseKey,
                'Authorization': `Bearer ${config.supabaseKey}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            if (data && data.length > 0 && data[0].version) {
                updateVersion(data[0].version);
                // console.log('데이터베이스에서 버전 로드:', data[0].version);
            } else {
                console.warn('데이터베이스에서 버전 정보를 찾을 수 없습니다.');
            }
        } else {
            console.error('버전 정보 로드 실패:', response.status);
        }
    } catch (error) {
        console.error('버전 정보 로드 중 오류:', error);
    }
}

// 버전 업데이트 함수
function updateVersion(newVersion) {
    const versionInfo = document.querySelector('.version-info');
    if (versionInfo) {
        versionInfo.textContent = newVersion;
    }
}

// 데이터베이스에 새 버전 저장 (관리자용)
async function updateVersionInDatabase(newVersion) {
    try {
        if (typeof config === 'undefined') {
            console.error('config.js가 로드되지 않았습니다.');
            return false;
        }

        const response = await fetch(`${config.supabaseUrl}/rest/v1/visitor_stats?id=eq.1`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'apikey': config.supabaseKey,
                'Authorization': `Bearer ${config.supabaseKey}`,
                'Prefer': 'return=representation'
            },
            body: JSON.stringify({
                version: newVersion
            })
        });

        if (response.ok) {
            // console.log('데이터베이스 버전 업데이트 성공:', newVersion);
            updateVersion(newVersion);
            return true;
        } else {
            console.error('버전 업데이트 실패:', response.status);
            return false;
        }
    } catch (error) {
        console.error('버전 업데이트 중 오류:', error);
        return false;
    }
}

// 전역 함수로 등록 (개발자 도구에서 사용 가능)
window.updateVersionInDatabase = updateVersionInDatabase;
window.loadVersionFromDatabase = loadVersionFromDatabase;

// DOM 로드 후 헤더 로딩
document.addEventListener('DOMContentLoaded', loadHeader); 