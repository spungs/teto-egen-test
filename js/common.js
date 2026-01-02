// 공통 유틸리티 및 상태 관리
let currentLanguage = 'ko';

// 공통 언어 관련 함수들
function getNestedValue(obj, path) {
    return path.split('.').reduce((curr, key) => curr && curr[key], obj);
}

// 공통 언어 토글 함수
function toggleLanguage() {
    const previousLanguage = currentLanguage;
    currentLanguage = currentLanguage === 'ko' ? 'en' : 'ko';

    updateLanguage();
    localStorage.setItem('language-preference', currentLanguage);

    // 언어 토글 버튼 텍스트 업데이트
    const languageBtn = document.getElementById('language-toggle');
    if (languageBtn) {
        languageBtn.textContent = currentLanguage === 'ko' ? 'EN' : '한국어';
    }
}

// 공통 언어 업데이트 함수
function updateLanguage() {
    if (typeof translations === 'undefined') return;

    const texts = translations[currentLanguage];

    // data-text 속성을 가진 요소들 업데이트
    const elements = document.querySelectorAll('[data-text]');
    elements.forEach(element => {
        const key = element.getAttribute('data-text');
        if (key) {
            const text = getNestedValue(translations[currentLanguage], key);
            if (text) {
                element.innerHTML = text;
            }
        }
    });

    // index.html 하드코딩된 텍스트들 업데이트
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero .subtitle');
    const heroDescription = document.querySelector('.hero .description');
    const genderTitle = document.querySelector('.gender-selection h3');
    const maleBtn = document.querySelector('.gender-btn[data-gender="male"] span:last-child');
    const femaleBtn = document.querySelector('.gender-btn[data-gender="female"] span:last-child');
    const startBtn = document.getElementById('start-btn');
    const testInfo = document.querySelector('.test-info p');
    const backBtn = document.getElementById('back-btn');
    const retryBtn = document.getElementById('retry-btn');
    const shareBtn = document.getElementById('share-btn');

    if (heroTitle) heroTitle.textContent = texts.title;
    if (heroSubtitle) heroSubtitle.textContent = texts.subtitle;
    if (heroDescription) heroDescription.innerHTML = texts.description;
    if (genderTitle) genderTitle.textContent = texts.genderTitle;
    if (maleBtn) maleBtn.textContent = texts.male;
    if (femaleBtn) femaleBtn.textContent = texts.female;

    // 연령대 선택 텍스트 업데이트
    const ageTitle = document.querySelector('.age-selection h3');
    if (ageTitle) ageTitle.textContent = texts.ageTitle;

    const ageButtons = document.querySelectorAll('.age-btn');
    if (ageButtons.length > 0) {
        ageButtons.forEach(btn => {
            const age = btn.getAttribute('data-age');
            if (age && texts[`age${age}`]) {
                btn.textContent = texts[`age${age}`];
            }
        });
    }

    if (startBtn) startBtn.textContent = texts.startBtn;
    if (testInfo) testInfo.textContent = texts.testInfo;
    if (backBtn) backBtn.textContent = texts.backBtn;
    if (retryBtn) retryBtn.textContent = texts.retryBtn;
    if (shareBtn) shareBtn.textContent = texts.shareBtn;


    // 결과 화면 제목들
    const traitsTitle = document.querySelector('.result-description h3');
    const detailTitle = document.querySelector('.result-detailed h3');
    const scoreTitle = document.querySelector('.result-score h3');
    const compatibilityTitle = document.querySelector('.result-compatibility h3');
    const careersTitle = document.querySelector('.result-careers h3');
    const celebritiesTitle = document.querySelector('.result-celebrities h3');
    const healthTitle = document.querySelector('.result-health h3');
    const growthTitle = document.querySelector('.result-growth h3');
    const exerciseTitle = document.querySelector('.health-category:nth-child(1) h4');
    const dietTitle = document.querySelector('.health-category:nth-child(2) h4');
    const stressTitle = document.querySelector('.health-category:nth-child(3) h4');

    if (traitsTitle) traitsTitle.textContent = texts.traitsTitle;
    if (detailTitle) detailTitle.textContent = texts.detailTitle;
    if (scoreTitle) scoreTitle.textContent = texts.scoreTitle;
    if (compatibilityTitle) compatibilityTitle.textContent = texts.compatibilityTitle;
    if (careersTitle) careersTitle.textContent = texts.careersTitle;
    if (celebritiesTitle) celebritiesTitle.textContent = texts.celebritiesTitle;
    if (healthTitle) healthTitle.textContent = texts.healthTitle;
    if (growthTitle) growthTitle.textContent = texts.growthTitle;
    if (exerciseTitle) exerciseTitle.textContent = texts.exerciseTitle;
    if (dietTitle) dietTitle.textContent = texts.dietTitle;
    if (stressTitle) stressTitle.textContent = texts.stressTitle;

    // 페이지 제목 업데이트
    const titleKey = document.querySelector('title[data-text]')?.getAttribute('data-text');
    if (titleKey) {
        const titleText = getNestedValue(translations[currentLanguage], titleKey);
        if (titleText) {
            document.title = titleText;
        }
    } else {
        // 페이지별 기본 제목 설정
        const pageTitles = {
            'index.html': translations[currentLanguage].title,
            'about.html': translations[currentLanguage].about?.title,
            'guide.html': translations[currentLanguage].guide?.title,
            'privacy-policy.html': translations[currentLanguage].privacy?.title
        };

        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const pageTitle = pageTitles[currentPage];
        if (pageTitle) {
            document.title = pageTitle;
        }
    }

    // 언어 토글 버튼 텍스트 업데이트
    const languageBtn = document.getElementById('language-toggle');
    if (languageBtn) {
        languageBtn.textContent = currentLanguage === 'ko' ? 'EN' : '한국어';
    }

    // 결과 내용이 있다면 업데이트 (script.js의 함수 호출)
    if (typeof updateResultContent === 'function') {
        updateResultContent();
    }

    // 푸터의 다른 서비스 링크도 언어에 맞게 업데이트 (visitorCounter가 있다면)
    if (typeof window !== 'undefined' && window.visitorCounter && typeof window.visitorCounter.renderServices === 'function') {
        window.visitorCounter.renderServices();
    }

    // 이미지 저장 버튼 텍스트 업데이트
    const saveImageBtn = document.getElementById('save-image-btn');
    if (saveImageBtn && texts.saveImageBtn) saveImageBtn.textContent = texts.saveImageBtn;
}

function shareResult() {
    const shareUrl = window.location.href;

    // 클립보드에 복사
    navigator.clipboard.writeText(shareUrl).then(() => {
        const message = currentLanguage === 'ko' ?
            '링크가 복사되었습니다! 📋' :
            'Link copied to clipboard! 📋';
        alert(message);
    }).catch(() => {
        // 클립보드 복사 실패시 직접 선택
        const textarea = document.createElement('textarea');
        textarea.value = shareUrl;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        const message = currentLanguage === 'ko' ?
            '링크가 복사되었습니다! 📋' :
            'Link copied to clipboard! 📋';
        alert(message);
    });
}

// 🖼️ 결과를 이미지로 저장하는 함수
async function saveResultAsImage() {
    const saveBtn = document.getElementById('save-image-btn');
    if (!saveBtn) return;

    // 원본 텍스트 미리 저장
    const originalText = saveBtn.textContent;

    try {
        // 버튼 로딩 상태
        saveBtn.textContent = currentLanguage === 'ko' ? '📸 생성 중...' : '📸 Generating...';
        saveBtn.disabled = true;

        // 캡처할 핵심 영역 선택 (헤더 + 특징 + 상세설명 + 점수 + 연애궁합)
        const resultHeader = document.querySelector('.result-header');
        const resultCompatibility = document.querySelector('.result-compatibility');

        // 임시 컨테이너 생성
        const tempContainer = document.createElement('div');
        tempContainer.className = 'temp-image-container';
        tempContainer.style.cssText = `
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            border-radius: 25px;
            padding: 40px;
            max-width: 500px;
            width: 500px;
            margin: 0 auto;
            position: fixed;
            top: -9999px;
            left: -9999px;
            z-index: -1;
            color: white;
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        `;

        // 메인 타이틀 추가
        const mainTitle = document.createElement('div');
        mainTitle.style.cssText = `
            text-align: center;
            margin-bottom: 30px;
        `;

        const resultType = document.getElementById('result-type').textContent;
        const resultEmoji = document.getElementById('result-emoji').textContent;

        mainTitle.innerHTML = `
            <h1 style="font-size: 2.5rem; margin: 0 0 10px 0; color: #74b9ff; font-weight: bold;">${resultType}</h1>
            <div style="font-size: 4rem; margin-bottom: 20px;">${resultEmoji}</div>
        `;
        tempContainer.appendChild(mainTitle);

        // 성격 특징 태그들
        const traitsSection = document.createElement('div');
        traitsSection.style.cssText = `
            margin-bottom: 25px;
        `;

        const traitsTitle = document.createElement('h3');
        traitsTitle.textContent = currentLanguage === 'ko' ? '당신의 성격 특징' : 'Your Personality Traits';
        traitsTitle.style.cssText = `
            color: #74b9ff;
            font-size: 1.2rem;
            margin-bottom: 15px;
            font-weight: bold;
        `;
        traitsSection.appendChild(traitsTitle);

        const traitsContainer = document.createElement('div');
        traitsContainer.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            justify-content: center;
        `;

        const traits = document.querySelectorAll('#result-traits .trait-tag');
        traits.forEach(trait => {
            const tag = document.createElement('span');
            tag.textContent = trait.textContent;
            tag.style.cssText = `
                background: rgba(116, 185, 255, 0.2);
                color: #74b9ff;
                padding: 6px 12px;
                border-radius: 15px;
                font-size: 0.85rem;
                border: 1px solid rgba(116, 185, 255, 0.3);
                white-space: nowrap;
            `;
            traitsContainer.appendChild(tag);
        });
        traitsSection.appendChild(traitsContainer);
        tempContainer.appendChild(traitsSection);

        // 상세 설명
        const descSection = document.createElement('div');
        descSection.style.cssText = `
            margin-bottom: 25px;
        `;

        const descTitle = document.createElement('h3');
        descTitle.textContent = currentLanguage === 'ko' ? '상세 설명' : 'Detailed Description';
        descTitle.style.cssText = `
            color: #74b9ff;
            font-size: 1.2rem;
            margin-bottom: 15px;
            font-weight: bold;
        `;
        descSection.appendChild(descTitle);

        const description = document.createElement('p');
        description.textContent = document.getElementById('result-detail').textContent;
        description.style.cssText = `
            color: rgba(255,255,255,0.9);
            line-height: 1.6;
            font-size: 0.95rem;
            margin: 0;
        `;
        descSection.appendChild(description);
        tempContainer.appendChild(descSection);

        // 점수 분포
        const scoreSection = document.createElement('div');
        scoreSection.style.cssText = `
            margin-bottom: 25px;
        `;

        const scoreTitle = document.createElement('h3');
        scoreTitle.textContent = currentLanguage === 'ko' ? '점수 분포' : 'Score Distribution';
        scoreTitle.style.cssText = `
            color: #74b9ff;
            font-size: 1.2rem;
            margin-bottom: 15px;
            font-weight: bold;
        `;
        scoreSection.appendChild(scoreTitle);

        // 테토 점수
        const tetoPercent = document.getElementById('type1-percent').textContent;
        const tetoLabel = document.getElementById('type1-label').textContent;
        const tetoBar = document.createElement('div');
        tetoBar.style.cssText = `
            margin-bottom: 15px;
        `;
        tetoBar.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span style="color: white; font-weight: bold;">${tetoLabel}</span>
                <span style="color: #e17055; font-weight: bold; font-size: 1.1rem;">${tetoPercent}</span>
            </div>
            <div style="background: rgba(255,255,255,0.1); border-radius: 10px; height: 12px; overflow: hidden;">
                <div style="background: #e17055; height: 100%; width: ${tetoPercent}; border-radius: 10px; transition: width 0.3s ease;"></div>
            </div>
        `;
        scoreSection.appendChild(tetoBar);

        // 에겐 점수
        const egenPercent = document.getElementById('type2-percent').textContent;
        const egenLabel = document.getElementById('type2-label').textContent;
        const egenBar = document.createElement('div');
        egenBar.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span style="color: white; font-weight: bold;">${egenLabel}</span>
                <span style="color: #fd79a8; font-weight: bold; font-size: 1.1rem;">${egenPercent}</span>
            </div>
            <div style="background: rgba(255,255,255,0.1); border-radius: 10px; height: 12px; overflow: hidden;">
                <div style="background: #fd79a8; height: 100%; width: ${egenPercent}; border-radius: 10px; transition: width 0.3s ease;"></div>
            </div>
        `;
        scoreSection.appendChild(egenBar);
        tempContainer.appendChild(scoreSection);

        // 연애 궁합
        if (resultCompatibility) {
            const compatibilitySection = document.createElement('div');
            compatibilitySection.style.cssText = `
                margin-bottom: 25px;
            `;

            const compatibilityTitle = document.createElement('h3');
            compatibilityTitle.innerHTML = '💕 ' + (currentLanguage === 'ko' ? '연애 궁합' : 'Love Compatibility');
            compatibilityTitle.style.cssText = `
                color: #74b9ff;
                font-size: 1.2rem;
                margin-bottom: 15px;
                font-weight: bold;
            `;
            compatibilitySection.appendChild(compatibilityTitle);

            const compatibilityItems = resultCompatibility.querySelectorAll('.compatibility-item');
            compatibilityItems.forEach(item => {
                const compItem = document.createElement('div');
                compItem.style.cssText = `
                    background: rgba(255,255,255,0.05);
                    border-radius: 15px;
                    padding: 15px;
                    margin-bottom: 10px;
                    border: 1px solid rgba(255,255,255,0.1);
                `;

                const typeText = item.querySelector('.compatibility-type').textContent;
                const reasonText = item.querySelector('.compatibility-reason').textContent;
                const scoreText = item.querySelector('.compatibility-score span:last-child').textContent;
                const emoji = item.querySelector('.compatibility-emoji').textContent;

                compItem.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <span style="color: white; font-weight: bold;">${typeText}</span>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="font-size: 1.2rem;">${emoji}</span>
                            <span style="color: #74b9ff; font-weight: bold;">${scoreText}</span>
                        </div>
                    </div>
                    <p style="color: rgba(255,255,255,0.8); margin: 0; font-size: 0.9rem; line-height: 1.4;">${reasonText}</p>
                `;

                compatibilitySection.appendChild(compItem);
            });

            tempContainer.appendChild(compatibilitySection);
        }

        // 워터마크 추가
        const watermark = document.createElement('div');
        watermark.style.cssText = `
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid rgba(255,255,255,0.1);
            font-size: 0.9rem;
            color: rgba(255, 255, 255, 0.6);
            font-family: monospace;
            font-weight: bold;
        `;
        watermark.textContent = 'spungs-teto-egen.com';
        tempContainer.appendChild(watermark);

        document.body.appendChild(tempContainer);

        // 실제 크기 측정
        const containerWidth = tempContainer.offsetWidth;
        const containerHeight = tempContainer.offsetHeight;

        // 윈도우별 Canvas 설정
        let canvas;
        try {
            const isWindows = navigator.platform.indexOf('Win') > -1;

            // 첫 번째 시도: 표준 설정
            const canvasOptions = {
                backgroundColor: '#2c3e50',
                scale: 2,
                logging: false,
                imageTimeout: 45000,
                width: containerWidth,
                height: containerHeight,
                x: 0,
                y: 0,
                scrollX: 0,
                scrollY: 0,
                onclone: function (clonedDoc) {
                    const allElements = clonedDoc.querySelectorAll('*');
                    allElements.forEach(el => {
                        el.style.backgroundImage = 'none';
                        el.style.boxShadow = 'none';
                        el.style.textShadow = 'none';
                        el.style.filter = 'none';
                        el.style.transform = 'none';
                        el.style.transition = 'none';
                        el.style.animation = 'none';
                    });
                }
            };

            // 플랫폼별 설정
            if (isWindows) {
                canvasOptions.useCORS = false;
                canvasOptions.allowTaint = true;
                canvasOptions.foreignObjectRendering = false;
                canvasOptions.scale = 1.5;
            } else {
                // Mac, iOS 등에서는 foreignObjectRendering이 불안정할 수 있음
                // CORS와 함께 사용할 때 빈 이미지가 나오는 문제 해결 위함
                canvasOptions.useCORS = true;
                canvasOptions.allowTaint = false;
                canvasOptions.foreignObjectRendering = false; // true -> false로 변경
            }

            canvas = await html2canvas(tempContainer, canvasOptions);

        } catch (error) {
            console.error('Safe mode canvas retry:', error);
            try {
                canvas = await html2canvas(tempContainer, {
                    backgroundColor: '#2c3e50',
                    scale: 1,
                    useCORS: false,
                    allowTaint: true,
                    foreignObjectRendering: false,
                    logging: false
                });
            } catch (secondError) {
                throw new Error('Canvas failed');
            }
        }

        document.body.removeChild(tempContainer);

        canvas.toBlob(async (blob) => {
            if (!blob) throw new Error('Blob failed');

            const resultType = document.getElementById('result-type').textContent;
            const fileName = `teto-egen-result-${resultType}.png`;

            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
            const isAndroid = /Android/.test(navigator.userAgent);

            if (isMobile && navigator.share && window.File && navigator.canShare && (isIOS || isAndroid)) {
                try {
                    const file = new File([blob], fileName, { type: 'image/png' });
                    if (navigator.canShare({ files: [file] })) {
                        await navigator.share({
                            title: `나는 ${resultType}!`,
                            text: `테토-에겐 성격 유형 테스트 결과: ${resultType}`,
                            files: [file]
                        });
                        return;
                    }
                } catch (shareError) {
                    // Fallback to download
                }
            }

            downloadImage(blob, fileName);

        }, 'image/png', 0.9);

    } catch (error) {
        console.error('Image save failed:', error);
        alert(currentLanguage === 'ko' ? '이미지 저장 실패' : 'Failed to save image');
    } finally {
        saveBtn.textContent = originalText;
        saveBtn.disabled = false;
    }
}

// 이미지 다운로드 헬퍼 함수
function downloadImage(blob, fileName) {
    const isWindows = navigator.platform.indexOf('Win') > -1;
    const url = URL.createObjectURL(blob);

    try {
        if (isWindows) {
            const tempButton = document.createElement('button');
            tempButton.style.display = 'none';
            document.body.appendChild(tempButton);

            tempButton.addEventListener('click', function () {
                const a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                a.style.display = 'none';
                a.target = '_self';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            });

            tempButton.click();
            document.body.removeChild(tempButton);
        } else {
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }

        setTimeout(() => URL.revokeObjectURL(url), 2000);
        setTimeout(() => {
            alert(currentLanguage === 'ko' ? '이미지가 다운로드되었습니다! 📥' : 'Image downloaded! 📥');
        }, 500);

    } catch (error) {
        console.error('Download failed:', error);
        window.open(url, '_blank');
    }
}

// 📱 개선된 공유 기능 (이미지 + 텍스트)
async function shareResultWithImage() {
    const resultType = document.getElementById('result-type').textContent;
    const resultEmoji = document.getElementById('result-emoji').textContent;
    const resultContainer = document.querySelector('.result-container');

    try {
        resultContainer.classList.add('result-for-image');
        const canvas = await html2canvas(resultContainer, {
            backgroundColor: null,
            scale: 1.5,
            useCORS: true
        });
        resultContainer.classList.remove('result-for-image');

        canvas.toBlob(async (blob) => {
            const shareTexts = {
                ko: `[충격] 나의 본능 티어가 공개됐습니다... 🦁\n\n결과: ${resultType} ${resultEmoji}\n\n당신은 어떤 티어인지 지금 바로 확인해보세요! 👇\n${window.location.href}`,
                en: `[BREAKING] My instinct tier has been revealed... 🦁\n\nResult: ${resultType} ${resultEmoji}\n\nCheck your tier right now! 👇\n${window.location.href}`
            };

            const file = new File([blob], `teto-egen-${resultType}.png`, { type: 'image/png' });

            if (navigator.share && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    title: `테토-에겐 테스트 결과: ${resultType}`,
                    text: shareTexts[currentLanguage],
                    files: [file]
                });
            } else {
                shareResult();
            }
        }, 'image/png');

    } catch (error) {
        shareResult();
    }
}

// 브라우저 언어 자동 감지 함수
function detectBrowserLanguage() {
    // 브라우저 언어 설정 가져오기
    const browserLang = navigator.language || navigator.userLanguage || navigator.languages?.[0] || 'en';

    // 한국어 관련 언어 코드들
    const koreanCodes = ['ko', 'ko-KR', 'ko-kr', 'korean'];

    // 영어 관련 언어 코드들  
    const englishCodes = ['en', 'en-US', 'en-us', 'en-GB', 'en-gb', 'en-AU', 'en-au', 'en-CA', 'en-ca', 'english'];

    // 언어 코드를 소문자로 변환해서 비교
    const lowerLang = browserLang.toLowerCase();

    // 한국어 감지
    if (koreanCodes.some(code => lowerLang.startsWith(code.toLowerCase()))) {
        return 'ko';
    }

    // 영어 감지 (또는 기타 언어는 영어로 기본 설정)
    if (englishCodes.some(code => lowerLang.startsWith(code.toLowerCase()))) {
        return 'en';
    }

    // 지원되지 않는 언어의 경우 영어를 기본값으로 설정
    return 'en';
}

// 페이지 로딩 시 저장된 언어 설정 적용
document.addEventListener('DOMContentLoaded', function () {
    // 1. 저장된 언어 설정 확인
    const savedLanguage = localStorage.getItem('language-preference');

    if (savedLanguage && (savedLanguage === 'ko' || savedLanguage === 'en')) {
        // 저장된 언어 설정이 있으면 사용
        currentLanguage = savedLanguage;
    } else {
        // 저장된 설정이 없으면 브라우저 언어 자동 감지
        const browserLanguage = detectBrowserLanguage();
        currentLanguage = browserLanguage;

        // 자동 감지된 언어를 localStorage에 저장
        localStorage.setItem('language-preference', currentLanguage);
    }

    // 100ms 지연 후 언어 업데이트 (DOM 완전 로딩 대기)
    setTimeout(() => {
        updateLanguage();
    }, 100);
});
