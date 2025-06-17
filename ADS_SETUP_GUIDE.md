# 🎯 광고 설정 가이드

테토-에겐 성격 테스트 웹서비스에 광고를 추가하는 단계별 가이드입니다.

## 📊 현재 광고 배치 위치

1. **시작 화면 하단** (`#ad-start-bottom`) - 728x90 배너
2. **결과 화면 중간** (`#ad-result-middle`) - 300x250 사각형
3. **결과 화면 하단** (`#ad-result-bottom`) - 728x90 배너

## 🚀 Google AdSense 설정 방법

### 1단계: AdSense 계정 생성
1. https://www.google.com/adsense/ 접속
2. Google 계정으로 로그인
3. 사이트 URL 입력: `https://spungs.github.io/teto-egen-test/`
4. 국가/지역 선택 (한국)
5. 결제 정보 입력

### 2단계: 사이트 승인 대기
- 승인 기간: 보통 1-14일
- 승인 조건:
  - 충분한 콘텐츠 (현재 충족)
  - 개인정보보호정책 필요
  - 트래픽 요구사항 (최소 방문자 필요)

### 3단계: 광고 코드 삽입 (승인 후)
1. AdSense 대시보드에서 "광고" → "광고 단위별" 선택
2. 각 위치별 광고 단위 생성:

#### 시작 화면 광고 (728x90)
```html
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
     data-ad-slot="YOUR_START_AD_SLOT"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
```

#### 결과 화면 광고 (300x250)
```html
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
     data-ad-slot="YOUR_RESULT_AD_SLOT"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
```

### 4단계: 코드 적용
1. `index.html`에서 주석 처리된 광고 코드 활성화
2. `YOUR_PUBLISHER_ID`를 실제 Publisher ID로 교체
3. `YOUR_AD_SLOT_ID`를 실제 슬롯 ID로 교체

## 💰 대안 광고 플랫폼

### Google AdSense 승인이 어려운 경우:

#### 1. Media.net
- Yahoo/Bing 광고 네트워크
- AdSense 대안으로 인기
- 설정: https://www.media.net/

#### 2. PropellerAds
- 팝업, 배너, 네이티브 광고
- 승인 빠름, 낮은 최소 지급액
- 설정: https://propellerads.com/

#### 3. Carbon Ads
- 개발자/디자이너 타겟 광고
- 깔끔한 디자인, 관련성 높음
- 설정: https://carbonads.net/

#### 4. Ezoic
- AI 기반 광고 최적화
- AdSense와 병행 가능
- 설정: https://www.ezoic.com/

## 📈 수익 최적화 팁

### 광고 배치 최적화
1. **Above the fold**: 스크롤 없이 보이는 영역에 배치
2. **콘텐츠 사이**: 자연스러운 광고 통합
3. **모바일 최적화**: 반응형 광고 단위 사용

### 트래픽 증가 방법
1. **SEO 최적화**: 이미 meta 태그 추가 완료
2. **소셜 미디어 공유**: 공유 기능 활용
3. **키워드 최적화**: "성격테스트", "MBTI 대안" 등

### 사용자 경험 유지
- 광고 로딩으로 인한 페이지 속도 저하 방지
- 과도한 광고로 사용자 이탈 방지
- 모바일에서 광고 크기 적절히 조정

## 🔧 기술적 설정

### 광고 차단기 대응
```javascript
// 광고 차단기 감지 (선택사항)
function detectAdBlocker() {
    const testAd = document.createElement('div');
    testAd.innerHTML = '&nbsp;';
    testAd.className = 'adsbox';
    document.body.appendChild(testAd);
    
    setTimeout(() => {
        if (testAd.offsetHeight === 0) {
            console.log('Ad blocker detected');
            // 대체 수익 모델 제안
        }
        document.body.removeChild(testAd);
    }, 100);
}
```

### 성능 모니터링
- Google Analytics로 광고 성과 추적
- 페이지 로딩 속도 모니터링
- 사용자 이탈률 체크

## 📊 예상 수익

### 트래픽별 예상 수익 (월간)
- **1,000 방문자**: $1-5
- **10,000 방문자**: $10-50  
- **100,000 방문자**: $100-500

*실제 수익은 트래픽 품질, 사용자 지역, 클릭률에 따라 달라집니다.

## ⚠️ 주의사항

1. **정책 준수**: AdSense 정책 위반 시 계정 정지
2. **클릭 조작 금지**: 자신의 광고 클릭 절대 금지
3. **콘텐츠 품질**: 지속적인 콘텐츠 업데이트 필요
4. **개인정보보호**: GDPR/CCPA 준수 필요

## 🚀 다음 단계

1. **즉시**: Google AdSense 계정 생성
2. **승인 대기 중**: 트래픽 증가 작업
3. **승인 후**: 광고 코드 활성화
4. **1개월 후**: 수익 분석 및 최적화

---

**문의사항이 있으면 언제든지 물어보세요! 💪** 