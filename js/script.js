// 테스트 상태 관리
let currentGender = null;
let currentAge = null;
let currentQuestionIndex = 0;
let answers = [];
let tetoScore = 0;
let egenScore = 0;


// DOM 요소들
let screens = {};

// 이벤트 리스너 설정
document.addEventListener('DOMContentLoaded', function () {
    // DOM이 로드된 후 screens 초기화
    setTimeout(() => {
        screens = {
            start: document.getElementById('start-screen'),
            test: document.getElementById('test-screen'),
            result: document.getElementById('result-screen')
        };
        initializeApp();
        setupEventListeners();
    }, 100); // 헤더 로딩을 위한 약간의 지연
});

function initializeApp() {
    // 다크모드를 기본으로 적용
    document.body.classList.add('dark-mode');

    // 언어 설정은 common.js에서 자동으로 처리됨
    // console.log('🚀 앱 초기화 완료');
}

function setupEventListeners() {
    // 성별 선택 버튼
    document.querySelectorAll('.gender-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            selectGender(this.dataset.gender);
        });
    });

    // 연령대 선택 버튼
    document.querySelectorAll('.age-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            selectAge(this.dataset.age);
        });
    });

    // 테스트 시작 버튼
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', startTest);
    }

    // 다시 시작 버튼
    const retryBtn = document.getElementById('retry-btn');
    if (retryBtn) {
        retryBtn.addEventListener('click', resetTest);
    }

    // 공유 버튼
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', shareResult);
    }

    // 이미지 저장 버튼
    const saveImageBtn = document.getElementById('save-image-btn');
    if (saveImageBtn) {
        saveImageBtn.addEventListener('click', saveResultAsImage);
    }

    // 뒤로가기 버튼
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', goToPreviousQuestion);
    }

    // 언어 토글 버튼 (헤더에서 처리하므로 여기서는 제거)
    // 하지만 기존 페이지에서 이미 토글된 경우를 대비해 중복 체크
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle && !languageToggle.hasAttribute('data-listener-added')) {
        languageToggle.addEventListener('click', toggleLanguage);
        languageToggle.setAttribute('data-listener-added', 'true');
    }

    // 추가 테스트 클릭 이벤트 추적
}

function selectGender(gender) {
    currentGender = gender;

    // 버튼 상태 업데이트
    document.querySelectorAll('.gender-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    document.querySelector(`[data-gender="${gender}"]`).classList.add('selected');

    // 시작 버튼 활성화 체크
    checkStartButton();
}

function selectAge(age) {
    currentAge = age;

    // 버튼 상태 업데이트
    document.querySelectorAll('.age-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    document.querySelector(`[data-age="${age}"]`).classList.add('selected');

    // 시작 버튼 활성화 체크
    checkStartButton();
}

function checkStartButton() {
    const startBtn = document.getElementById('start-btn');
    if (currentGender && currentAge) {
        startBtn.disabled = false;
    } else {
        startBtn.disabled = true;
    }
}

function startTest() {
    if (!currentGender || !currentAge) return;

    // GA4 이벤트 추적
    if (window.dataLayer) {
        window.dataLayer.push({
            'event': 'test_start',
            'gender': currentGender,
            'age': currentAge
        });
    }

    showScreen('test');
    currentQuestionIndex = 0;
    answers = [];
    tetoScore = 0;
    egenScore = 0;

    showQuestion();
}

function showScreen(screenName) {
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
    });
    screens[screenName].classList.add('active');
}

function showQuestion() {
    // 기본 질문 + 성별별 질문 통합 (언어별로)
    const baseQuestions = questionData[currentLanguage];

    // 현재 언어에 맞는 성별별 질문 선택
    let genderQuestions = [];
    if (currentLanguage === 'ko') {
        genderQuestions = currentGender === 'male' ?
            questionData['ko_male_specific'] :
            questionData['ko_female_specific'];
    } else if (currentLanguage === 'en') {
        genderQuestions = currentGender === 'male' ?
            questionData['en_male_specific'] :
            questionData['en_female_specific'];
    }

    const allQuestions = [...baseQuestions, ...genderQuestions];
    const question = allQuestions[currentQuestionIndex];

    // 뒤로가기 버튼 표시/숨김 관리
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
        if (currentQuestionIndex > 0) {
            backBtn.style.display = 'inline-block';
        } else {
            backBtn.style.display = 'none';
        }
    }

    // 상황 텍스트 업데이트
    document.getElementById('question-text').textContent = question.situation;

    // 진행률 업데이트
    const progress = ((currentQuestionIndex + 1) / allQuestions.length) * 100;
    document.getElementById('progress').style.width = progress + '%';
    document.getElementById('current-question').textContent = currentQuestionIndex + 1;
    document.getElementById('total-questions').textContent = allQuestions.length;

    // 선택지 생성 (랜덤 순서)
    const optionsContainer = document.querySelector('.options');
    optionsContainer.innerHTML = '';

    // 성별별 선택지 처리
    let questionOptions;
    if (question.options && typeof question.options === 'object' && question.options.male && question.options.female) {
        // 성별별 선택지가 있는 경우
        questionOptions = question.options[currentGender];
    } else {
        // 공통 선택지인 경우
        questionOptions = question.options;
    }

    // 선택지 순서 고정 (일관된 사용자 경험을 위해)
    const optionsToShow = questionOptions;

    optionsToShow.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option.text;

        // 이전에 선택한 답변이 있다면 강조
        if (answers[currentQuestionIndex] && answers[currentQuestionIndex].text === option.text) {
            button.classList.add('selected');
        }

        button.addEventListener('click', () => selectOption(option));
        optionsContainer.appendChild(button);
    });
}

function selectOption(selectedOption) {
    // 선택한 옵션 강조
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
        if (btn.textContent === selectedOption.text) {
            btn.classList.add('selected');
        }
    });

    // 답변 저장
    answers[currentQuestionIndex] = selectedOption;

    // 점수 재계산 (이미 답변한 질문을 다시 선택할 수 있으므로)
    recalculateScores();

    // 다음 질문으로 이동 (잠시 후)
    setTimeout(() => {
        nextQuestion();
    }, 500);
}

function nextQuestion() {
    currentQuestionIndex++;

    // 기본 질문 + 성별별 질문 통합
    const baseQuestions = questionData[currentLanguage];
    let genderQuestions = [];
    if (currentLanguage === 'ko') {
        genderQuestions = currentGender === 'male' ?
            questionData['ko_male_specific'] :
            questionData['ko_female_specific'];
    } else if (currentLanguage === 'en') {
        genderQuestions = currentGender === 'male' ?
            questionData['en_male_specific'] :
            questionData['en_female_specific'];
    }

    const totalQuestions = baseQuestions.length + genderQuestions.length;

    if (currentQuestionIndex < totalQuestions) {
        showQuestion();
    } else {
        showResult();
    }
}

// 뒤로가기 기능
function goToPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        // 현재 질문의 답변 제거 (아직 답변하지 않았다면)
        answers[currentQuestionIndex] = null;

        // 이전 질문으로 이동
        currentQuestionIndex--;

        // 점수 재계산
        recalculateScores();

        // 질문 화면 업데이트
        showQuestion();
    }
}

// 점수 재계산 함수
function recalculateScores() {
    tetoScore = 0;
    egenScore = 0;

    // 현재까지 답변한 질문들의 점수를 다시 계산
    for (let i = 0; i <= currentQuestionIndex; i++) {
        const answer = answers[i];
        if (answer) {
            if (answer.type === 'teto') {
                tetoScore += answer.score;
            } else if (answer.type === 'egen') {
                egenScore += answer.score;
            } else if (answer.type === 'balanced') {
                tetoScore += answer.score * 0.5;
                egenScore += answer.score * 0.5;
            }
        }
    }
}

function showResult() {
    showScreen('result');

    // 개선된 결과 계산 (비율과 차이를 고려)
    const totalScore = tetoScore + egenScore;
    const tetoRatio = tetoScore / totalScore;
    const egenRatio = egenScore / totalScore;
    const scoreDifference = Math.abs(tetoScore - egenScore);

    // 더 정교한 타입 판정 (10% 이상 차이가 나야 확실한 타입으로 판정)
    let isTetoType;
    if (scoreDifference / totalScore >= 0.1) {
        // 뚜렷한 차이가 있는 경우
        isTetoType = tetoScore > egenScore;
    } else {
        // 차이가 적은 경우, 소수점까지 고려하여 판정
        isTetoType = tetoScore >= egenScore;
    }

    const typeKey = isTetoType ? 'teto' : 'egen';

    // GA4 이벤트 추적
    if (window.dataLayer) {
        window.dataLayer.push({
            'event': 'test_complete',
            'result_type': typeKey,
            'gender': currentGender,
            'age': currentAge,
            'teto_score': tetoScore,
            'egen_score': egenScore
        });
    }

    const result = resultData[currentLanguage][currentGender][typeKey];

    // 결과 표시
    document.getElementById('result-type').textContent = result.type;
    document.getElementById('result-emoji').textContent = result.emoji;

    // 특징 태그들
    const traitsContainer = document.getElementById('result-traits');
    traitsContainer.innerHTML = '';
    result.traits.forEach(trait => {
        const tag = document.createElement('div');
        tag.className = 'trait-tag';
        tag.textContent = trait;
        traitsContainer.appendChild(tag);
    });

    // 상세 설명
    document.getElementById('result-detail').textContent = result.description;

    // 점수 분포
    const tetoPercent = Math.round((tetoScore / totalScore) * 100);
    const egenPercent = Math.round((egenScore / totalScore) * 100);

    document.getElementById('type1-label').textContent = result.tetoLabel;
    document.getElementById('type2-label').textContent = result.egenLabel;

    document.getElementById('type1-score').className = 'score-fill teto';
    document.getElementById('type2-score').className = 'score-fill egen';

    document.getElementById('type1-percent').textContent = tetoPercent + '%';
    document.getElementById('type2-percent').textContent = egenPercent + '%';

    // 💕 연애 궁합 렌더링
    renderCompatibility(result.compatibility);

    // 💼 추천 직업 렌더링
    renderCareers(result.careers);

    // ⭐ 아이돌 렌더링
    renderCelebrities(result.celebrities);

    // 🏥 건강 & 스트레스 관리 렌더링
    renderHealth(result.health);

    // 🎯 성장 방향 렌더링
    renderGrowth(result.growth);

    // 애니메이션으로 점수 바 채우기
    setTimeout(() => {
        document.getElementById('type1-score').style.width = tetoPercent + '%';
        document.getElementById('type2-score').style.width = egenPercent + '%';
    }, 500);
}

// 💕 연애 궁합 렌더링 함수 (동적 계산, 합계 100%)
function renderCompatibility(compatibilityData) {
    const container = document.getElementById('compatibility-list');
    container.innerHTML = '';

    // 유저의 실제 점수 비율 계산
    const totalScore = tetoScore + egenScore;
    const userTetoRatio = tetoScore / totalScore; // 0.0 ~ 1.0
    const userEgenRatio = egenScore / totalScore; // 0.0 ~ 1.0

    // 모든 궁합 점수를 먼저 계산
    const compatibilityScores = compatibilityData.map(item => ({
        ...item,
        rawScore: calculateCompatibilityScore(userTetoRatio, userEgenRatio, item.type)
    }));

    // 두 점수의 합이 100%가 되도록 정규화
    const totalRawScore = compatibilityScores.reduce((sum, item) => sum + item.rawScore, 0);

    // 정규화된 점수로 업데이트하고 높은 점수 순으로 정렬
    const sortedCompatibilityScores = compatibilityScores.map(item => ({
        ...item,
        normalizedScore: Math.round((item.rawScore / totalRawScore) * 100)
    })).sort((a, b) => b.normalizedScore - a.normalizedScore);

    sortedCompatibilityScores.forEach(item => {
        const compatibilityItem = document.createElement('div');
        compatibilityItem.className = 'compatibility-item';

        compatibilityItem.innerHTML = `
            <div class="compatibility-info">
                <div class="compatibility-type">${item.type}</div>
                <div class="compatibility-reason">${item.reason}</div>
            </div>
            <div class="compatibility-score">
                <span class="compatibility-emoji">${item.emoji}</span>
                <span>${item.normalizedScore}%</span>
            </div>
        `;

        container.appendChild(compatibilityItem);
    });
}

// Helen Fisher 이론 기반 궁합도 계산 함수
function calculateCompatibilityScore(userTetoRatio, userEgenRatio, partnerType) {
    // Helen Fisher 연구: Director(테토) ↔ Negotiator(에겐) 강한 끌림
    // 반대 성향끼리 높은 호환성을 가짐

    let compatibilityScore;

    if (partnerType.includes('에겐') || partnerType.includes('Egen')) {
        // 에겐형 파트너: 사용자가 테토형일수록 높은 궁합
        // 테토 비율이 높을수록 에겐형과 궁합이 좋음
        const baseAttraction = 40; // 기본 끌림
        const oppositeAttraction = userTetoRatio * 40; // 반대 성향 끌림 (0~40점)
        const personalityBonus = (1 - Math.abs(userTetoRatio - 0.7)) * 20; // 최적 테토 비율 보너스

        compatibilityScore = baseAttraction + oppositeAttraction + personalityBonus;

    } else if (partnerType.includes('테토') || partnerType.includes('Teto')) {
        // 테토형 파트너: 사용자가 에겐형일수록 높은 궁합
        // 에겐 비율이 높을수록 테토형과 궁합이 좋음
        const baseAttraction = 40; // 기본 끌림
        const oppositeAttraction = userEgenRatio * 40; // 반대 성향 끌림 (0~40점)
        const personalityBonus = (1 - Math.abs(userEgenRatio - 0.7)) * 20; // 최적 에겐 비율 보너스

        compatibilityScore = baseAttraction + oppositeAttraction + personalityBonus;
    }

    // 점수 범위 제한 (30-100%)
    const finalScore = Math.max(30, Math.min(100, Math.round(compatibilityScore)));

    return finalScore;
}

// 💼 추천 직업 렌더링 함수
function renderCareers(careersData) {
    const container = document.getElementById('career-list');
    container.innerHTML = '';

    careersData.forEach(career => {
        const careerTag = document.createElement('div');
        careerTag.className = 'career-tag';
        careerTag.textContent = career;
        container.appendChild(careerTag);
    });
}

// ⭐ 아이돌 렌더링 함수
function renderCelebrities(celebritiesData) {
    const container = document.getElementById('celebrity-list');
    container.innerHTML = '';

    celebritiesData.forEach(celebrity => {
        const celebrityItem = document.createElement('div');
        celebrityItem.className = 'celebrity-item';

        celebrityItem.innerHTML = `
            <div class="celebrity-name">${celebrity.name}</div>
            <div class="celebrity-profession">${celebrity.profession}</div>
        `;

        container.appendChild(celebrityItem);
    });
}

// 🏥 건강 & 스트레스 관리 렌더링 함수
function renderHealth(healthData) {
    // 운동 팁
    const exerciseContainer = document.getElementById('exercise-tips');
    exerciseContainer.innerHTML = '';
    healthData.exercise.forEach(tip => {
        const tipItem = document.createElement('div');
        tipItem.className = 'tip-item';
        tipItem.textContent = tip;
        exerciseContainer.appendChild(tipItem);
    });

    // 식단 팁
    const dietContainer = document.getElementById('diet-tips');
    dietContainer.innerHTML = '';
    healthData.diet.forEach(tip => {
        const tipItem = document.createElement('div');
        tipItem.className = 'tip-item';
        tipItem.textContent = tip;
        dietContainer.appendChild(tipItem);
    });

    // 스트레스 해소 팁
    const stressContainer = document.getElementById('stress-tips');
    stressContainer.innerHTML = '';
    healthData.stress.forEach(tip => {
        const tipItem = document.createElement('div');
        tipItem.className = 'tip-item';
        tipItem.textContent = tip;
        stressContainer.appendChild(tipItem);
    });
}

// 🎯 성장 방향 렌더링 함수
function renderGrowth(growthData) {
    const container = document.getElementById('growth-tips');
    container.innerHTML = '';

    growthData.forEach(item => {
        const growthItem = document.createElement('div');
        growthItem.className = 'growth-item';

        growthItem.innerHTML = `
            <div class="growth-icon">${item.icon}</div>
            <div class="growth-content">
                <div class="growth-title">${item.title}</div>
                <div class="growth-description">${item.description}</div>
            </div>
        `;

        container.appendChild(growthItem);
    });
}

function resetTest() {
    // GA4 이벤트 추적
    if (window.dataLayer) {
        window.dataLayer.push({
            'event': 'test_reset'
        });
    }

    showScreen('start');
    currentGender = null;
    currentAge = null;
    currentQuestionIndex = 0;
    answers = [];
    tetoScore = 0;
    egenScore = 0;

    // 성별 선택 초기화
    document.querySelectorAll('.gender-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    // 연령 선택 초기화
    document.querySelectorAll('.age-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    document.getElementById('start-btn').disabled = true;
}

// 결과 내용을 현재 언어로 업데이트하는 함수
function updateResultContent() {
    // 결과 화면이 활성화되어 있고, 성별과 점수가 설정되어 있는 경우에만 업데이트
    if (screens.result.classList.contains('active') && currentGender && (tetoScore > 0 || egenScore > 0)) {
        // 결과 계산
        const isTetoType = tetoScore >= egenScore;
        const result = resultData[currentLanguage][currentGender][isTetoType ? 'teto' : 'egen'];

        // 결과 타입과 이모지 업데이트
        document.getElementById('result-type').textContent = result.type;
        document.getElementById('result-emoji').textContent = result.emoji;

        // 특징 태그들 업데이트
        const traitsContainer = document.getElementById('result-traits');
        traitsContainer.innerHTML = '';
        result.traits.forEach(trait => {
            const tag = document.createElement('div');
            tag.className = 'trait-tag';
            tag.textContent = trait;
            traitsContainer.appendChild(tag);
        });

        // 상세 설명 업데이트
        document.getElementById('result-detail').textContent = result.description;

        // 라벨 업데이트
        document.getElementById('type1-label').textContent = result.tetoLabel;
        document.getElementById('type2-label').textContent = result.egenLabel;

        // 새로운 섹션들 업데이트
        renderCompatibility(result.compatibility);
        renderCareers(result.careers);
        renderCelebrities(result.celebrities);
        renderHealth(result.health);
        renderGrowth(result.growth);
    }
}