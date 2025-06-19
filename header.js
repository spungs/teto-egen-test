// 헤더 로딩 및 활성 페이지 설정
async function loadHeader() {
    try {
        const response = await fetch('header.html');
        const headerHtml = await response.text();
        document.body.insertAdjacentHTML('afterbegin', headerHtml);
        
        // 현재 페이지에 따라 활성 버튼 설정
        setActiveNavButton();
        
        // 언어 토글 이벤트 리스너 추가
        if (typeof toggleLanguage === 'function') {
            document.getElementById('language-toggle').addEventListener('click', toggleLanguage);
        }
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

// 버전 업데이트 함수
function updateVersion(newVersion) {
    const versionInfo = document.querySelector('.version-info');
    if (versionInfo) {
        versionInfo.textContent = newVersion;
    }
}

// DOM 로드 후 헤더 로딩
document.addEventListener('DOMContentLoaded', loadHeader); 