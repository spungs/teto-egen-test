# 🚀 다중 광고 전략 가이드

## 📊 추천 광고 조합

### 💰 최대 수익 조합 (월 5,000 방문자 기준)

| 위치 | 1순위 | 2순위 | 예상 월수익 |
|------|--------|--------|-------------|
| 시작화면 하단 | Google AdSense | Media.net | $15-25 |
| 결과화면 중간 | 카울리/애드핏 | PropellerAds | $20-35 |
| 결과화면 하단 | Carbon Ads | BuySellAds | $10-20 |
| **총 예상 수익** | | | **$45-80/월** |

## 🎯 즉시 적용 가능한 광고들

### 1. PropellerAds (즉시 승인)
```javascript
// 푸시 알림 광고
(function(d,z,s){s.src='//'+d+'/400/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('adsterra.com',4570302,document.createElement('script'));

// 배너 광고
<script type="text/javascript">
    atOptions = {
        'key' : 'YOUR_PROPELLER_KEY',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
    };
    document.write('<scr' + 'ipt type="text/javascript" src="//www.topcreativeformat.com/YOUR_KEY/invoke.js"></scr' + 'ipt>');
</script>
```

### 2. Media.net (빠른 승인)
```html
<div id="YOUR_DIV_ID">
    <script type="text/javascript">
        window._mNHandle = window._mNHandle || {};
        window._mNHandle.queue = window._mNHandle.queue || [];
        medianet_width = "728";
        medianet_height = "90";
        medianet_crid = "YOUR_CRID";
        medianet_versionId = "YOUR_VERSION_ID";
    </script>
    <script src="//contextual.media.net/dmedianet.js?cid=YOUR_CID" async="async"></script>
</div>
```

### 3. 카울리 (한국 특화)
```html
<script type="text/javascript" src="//t1.daumcdn.net/kas/static/ba.min.js" async></script>
<ins class="kakao_ad_area" style="display:none;" 
     data-ad-unit = "YOUR_UNIT_ID" 
     data-ad-width = "320" 
     data-ad-height = "100"></ins>
<script type="text/javascript">
     kakaoPixel('YOUR_PIXEL_ID').pageView();
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

## 🔧 구현 전략

### 단계별 적용 방법

1. **1주차**: PropellerAds 즉시 적용
2. **2주차**: Media.net 신청 + 승인
3. **3주차**: 카울리/애드핏 신청
4. **4주차**: 구글 애드센스 승인 시 최적 조합

### A/B 테스트 방법
```javascript
// 광고 성과 추적
function trackAdPerformance(adNetwork, position, revenue) {
    gtag('event', 'ad_revenue', {
        'ad_network': adNetwork,
        'ad_position': position,
        'value': revenue,
        'currency': 'USD'
    });
}
```

## 💡 수익 최적화 팁

### 1. 시간대별 광고 로테이션
- **오전**: 한국 광고 (카울리/애드핏)
- **오후**: 글로벌 광고 (AdSense/Media.net)
- **저녁**: 높은 단가 광고 (Carbon Ads)

### 2. 사용자별 타겟팅
- **모바일**: 다날 애드핏
- **데스크톱**: Google AdSense
- **해외 유저**: Media.net

### 3. 계절별 전략
- **연말**: 쇼핑몰 광고 (높은 단가)
- **신학기**: 교육 관련 광고
- **여름**: 여행/레저 광고

## 📈 예상 수익 시뮬레이션

### 보수적 시나리오 (월 3,000 방문자)
- PropellerAds: $10-15
- Media.net: $8-12
- 카울리: $12-18
- **총합**: $30-45/월

### 현실적 시나리오 (월 5,000 방문자)
- Google AdSense: $20-30
- Media.net: $12-18
- 카울리: $15-25
- PropellerAds: $8-12
- **총합**: $55-85/월

### 성공적 시나리오 (월 10,000 방문자)
- Google AdSense: $40-60
- Media.net: $25-35
- 카울리: $30-45
- Carbon Ads: $15-25
- PropellerAds: $15-20
- **총합**: $125-185/월

## ⚠️ 주의사항

### 광고 정책 준수
- **AdSense와 충돌하지 않는 광고만** 선택
- **팝업 광고 최소화** (사용자 경험)
- **모바일 친화적** 광고 우선

### 성능 최적화
- **페이지 로딩 속도** 모니터링
- **광고 차단기 대응**
- **사용자 이탈률** 체크

## 🚀 즉시 실행 계획

1. **오늘**: PropellerAds 가입 + 승인
2. **내일**: Media.net 신청
3. **이번 주**: 카울리 신청
4. **다음 주**: 성과 분석 + 최적화

---

**목표: 도메인 비용 22,000원을 1-2개월 내 회수!** 💪 