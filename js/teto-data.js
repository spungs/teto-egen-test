// 개선된 상황 기반 질문지 데이터 (심리학적 검증 기반)
const questionData = {
    ko: [
        {
            situation: "🔥 야심만만한 첫 출근, 갑자기 대표가 전체 회의에서 내 의견을 묻는다면?",
            options: [
                { text: "준비된 야망을 보여줄 때! 논리적이고 공격적으로 내 의견을 쏟아낸다", type: "teto", score: 3 },
                { text: "아직은 정보가 부족하다. 대표의 의중을 간 보며 적당히 맞장구친다", type: "balanced", score: 1 },
                { text: "설친다고 찍히면 끝장이다. 다른 팀원들의 표정을 살피며 조용히 함구한다", type: "egen", score: 3 }
            ]
        },
        {
            situation: "💔 친구가 '나 바람피우다 걸린 것 같아'라며 울먹이며 전화했다면?",
            options: [
                { text: "울 시간에 변명이나 준비해! 팩트로 조져주며 생존 전략을 짜준다", type: "teto", score: 3 },
                { text: "일단 진정시키고 상황을 객관적으로 따져본 뒤 같이 대책을 논의한다", type: "balanced", score: 1 },
                { text: "어떡해... 많이 놀랐지? 일단 친구 옆을 지켜주며 정서적 안정을 돕는다", type: "egen", score: 3 }
            ]
        },
        {
            situation: "🍷 성공적인 데이트를 위해 '필살기' 장소를 골라야 한다면?",
            options: {
                male: [
                    { text: "압도적인 에너지! 파이팅 넘치는 스포츠 경기장이나 힙한 클럽", type: "teto", score: 3 },
                    { text: "실패 없는 정석! 분위기 좋은 파인다이닝이나 팝업 스토어", type: "balanced", score: 1 },
                    { text: "감성 한 스푼... 고즈넉한 와인바나 새벽 한강 산책", type: "egen", score: 3 }
                ],
                female: [
                    { text: "내가 리드한다! 짜릿한 번지점프나 레이싱 서킷", type: "teto", score: 3 },
                    { text: "취향 저격! 요즘 제일 핫하다는 인스타 감성 핫플", type: "balanced", score: 1 },
                    { text: "분위기에 취해... 캔들라이트 콘서트나 조용한 LP바", type: "egen", score: 3 }
                ]
            }
        },
        {
            situation: "🗿 인생을 송두리째 바꿀 '올인'의 순간이 찾아왔다면?",
            options: [
                { text: "하이 리스크 하이 리턴! 철저한 분석 끝에 내 모든 걸 걸고 베팅한다", type: "teto", score: 3 },
                { text: "안정적인 게 최고다. 리스크를 분산하며 돌다리도 두들겨 보고 건넌다", type: "balanced", score: 1 },
                { text: "수치보다는 내 영혼의 부름을 따른다. 운명적인 직감을 믿고 움직인다", type: "egen", score: 3 }
            ]
        },
        {
            situation: "🤛 누군가 선을 넘으며 나를 대놓고 무시한다면?",
            options: [
                { text: "눈에는 눈, 이에는 이! 즉각적으로 반격하며 서열을 확실히 정리한다", type: "teto", score: 3 },
                { text: "일단 참는다. 하지만 뒤에서 철저히 복수하거나 우아하게 압박한다", type: "balanced", score: 1 },
                { text: "싸움은 싫다. 상대가 왜 그랬을지 이해해보려 노력하며 원만히 넘어간다", type: "egen", score: 3 }
            ]
        },
        {
            situation: "🤯 '오늘 나 달라진 거 없어?' 연인의 치명적인 질문에 내 뇌 정지가 왔다면?",
            options: {
                male: [
                    { text: "버퍼링은 없다! 일단 '당연히 알지, 오늘도 너무 예쁘네'라며 위기부터 탈출한다", type: "teto", score: 3 },
                    { text: "아무 말이나 던졌다가 독박 쓸라... 눈동자를 굴리며 바뀐 부분을 필사적으로 찾는다", type: "balanced", score: 1 },
                    { text: "솔직히 잘 모르겠지만, 대답 대신 연인의 손을 잡으며 '사랑해'라고 속삭인다", type: "egen", score: 3 }
                ],
                female: [
                    { text: "이미 다 알고 물어보는 거다. 내가 바뀐 3가지를 대보라며 역으로 압박한다", type: "teto", score: 3 },
                    { text: "모를 수도 있지 뭐. '힌트 줄까?'라며 귀여운 장난으로 분위기를 푼다", type: "balanced", score: 1 },
                    { text: "내 변화를 못 알아보는 상대방에게 서운함이 밀려와 살짝 풀이 죽는다", type: "egen", score: 3 }
                ]
            }
        },
        {
            situation: "🥂 낯선 사람들과의 압박 면접 같은 사교 모임, 내 포지션은?",
            options: [
                { text: "이미 이 구역의 인싸! 화려한 입담으로 대화를 휘어잡으며 센터에 선다", type: "teto", score: 3 },
                { text: "적당한 미소와 리액션... 분위기를 살피며 필요한 순간에만 숟가락을 얹는다", type: "balanced", score: 1 },
                { text: "구석자리가 내 안식처. 질문이 오기 전까지는 벽과 하나가 되어 지켜본다", type: "egen", score: 3 }
            ]
        },
        {
            situation: "💰 로또 1등 당첨! 하지만 세금 떼고 나면 생각보다 적다면?",
            options: [
                { text: "이 돈으로 돈을 불려야지! 부동산이나 주식, 사업에 공격적으로 투자한다", type: "teto", score: 3 },
                { text: "일단 빚부터 갚고 절반은 저축, 절반은 나를 위해 적절히 소비한다", type: "balanced", score: 1 },
                { text: "그동안 고생한 나에게 명품 백과 여행을! 현재의 행복을 위해 지른다", type: "egen", score: 3 }
            ]
        },
        {
            situation: "🎮 '노는 물'이 다르다! 나에게 딱 맞는 힐링 타임은?",
            options: {
                male: [
                    { text: "땀 흘려야 제맛! 축구나 게임으로 승부욕을 불태운다", type: "teto", score: 3 },
                    { text: "그때그때 달라요. 삘 꽂히는 대로 자유롭게 즐긴다", type: "balanced", score: 1 },
                    { text: "나만의 아지트에서 음악을 듣거나 그림을 그리며 감성을 충전한다", type: "egen", score: 3 }
                ],
                female: [
                    { text: "가만히 있으면 병난다! 친구들과 핫플을 투어하며 에너지를 발산한다", type: "teto", score: 3 },
                    { text: "기분이죠! 내 텐션에 맞춰 활동적이거나 조용한 것을 고른다", type: "balanced", score: 1 },
                    { text: "방해받고 싶지 않아. 혼자 소소하게 다이어리를 꾸미거나 취미를 즐긴다", type: "egen", score: 3 }
                ]
            }
        },
        {
            situation: "⚔️ 조별 과제 잔혹사! 빌런들 사이에서 당신의 포지션은?",
            options: [
                { text: "답답해서 내가 한다! 독재자 소리를 들어도 하드캐리하며 팀을 이끈다", type: "teto", score: 3 },
                { text: "싸움은 피한다. 빌런들을 적당히 구슬려 각자 할 일은 하게 만든다", type: "balanced", score: 1 },
                { text: "자료조사와 편집 등 보이지 않는 곳에서 묵묵히 팀을 서포트한다", type: "egen", score: 3 }
            ]
        },
        {
            situation: "🌪️ 멘탈 바사삭... 인생의 쓴맛을 제대로 봤을 때 나는?",
            options: [
                { text: "패배는 없다! 원인을 살벌하게 분석하고 '두고 보자'며 칼을 간다", type: "teto", score: 3 },
                { text: "시간이 약이다. 맛있는 거나 먹으며 자연스럽게 잊혀지길 기다린다", type: "balanced", score: 1 },
                { text: "세상이 무너진 듯... 방구석에서 슬픈 노래를 들으며 눈물을 한 바가지 쏟는다", type: "egen", score: 3 }
            ]
        },
        {
            situation: "⚔️ 의견 충돌 발생! 상대방이 말도 안 되는 소리를 한다면?",
            options: [
                { text: "팩폭 폭격기 가동! 논리로 상대방의 뼈를 때리며 참교육 시전한다", type: "teto", score: 3 },
                { text: "좋은 게 좋은 거지. 적당히 맞춰주며 상황을 유연하게 넘긴다", type: "balanced", score: 1 },
                { text: "저 사람은 왜 저럴까... 상대의 입장을 이해해보려 노력하며 속으로 삭힌다", type: "egen", score: 3 }
            ]
        },
        {
            situation: "🗺️ 10년 후의 나, 어떤 모습일까?",
            options: [
                { text: "야망 로드맵 완비! 연도별 달성 목표가 엑셀 파일로 정리되어 있다", type: "teto", score: 3 },
                { text: "큰 그림은 있지. 근데 인생이 계획대로 되나? 그때 가서 수정하면 된다", type: "balanced", score: 1 },
                { text: "그냥 행복했으면 좋겠어... 구체적 목표보다는 내 마음이 이끄는 대로 살고 싶다", type: "egen", score: 3 }
            ]
        },
        {
            situation: "🏆 내가 생각하는 '갓생'의 기준은?",
            options: [
                { text: "통장 잔고와 명함! 눈에 보이는 성과와 지위가 빵빵해야 한다", type: "teto", score: 3 },
                { text: "워라밸이 최고! 일과 삶이 적절히 조화를 이루는 안정적인 삶", type: "balanced", score: 1 },
                { text: "사랑과 평화! 소중한 사람들과 깊은 정을 나누며 마음 편히 사는 삶", type: "egen", score: 3 }
            ]
        },
        {
            situation: "🎤 수백 명 앞에서의 프레젠테이션, 단 1분의 시간이 주어진다면?",
            options: [
                { text: "압도적인 자신감! 핵심 포인트만 짚어내며 청중의 뇌리에 나를 각인시킨다", type: "teto", score: 3 },
                { text: "철저한 연습의 결과물! 준비한 대로 실수 없이 완벽하게 내용을 전달한다", type: "balanced", score: 1 },
                { text: "진심은 통한다! 화려한 기술보다는 내 진심과 감성을 담아 청중의 마음을 울린다", type: "egen", score: 3 }
            ]
        },
        {
            situation: "🌪️ 갑작스런 계획 변경! 내 반응은?",
            options: [
                { text: "오히려 좋아! 즉각 플랜 B를 가동하며 상황을 주도한다", type: "teto", score: 3 },
                { text: "일단 지켜본다. 상황이 어떻게 흘러가는지 보고 천천히 움직인다", type: "balanced", score: 1 },
                { text: "아 멘붕... 마음의 준비가 안 됐는데 당황해서 어쩔 줄 모른다", type: "egen", score: 3 }
            ]
        },
        {
            situation: "👑 내가 리더가 된다면 어떤 스타일?",
            options: [
                { text: "나를 따르라! 확실한 비전을 제시하며 앞장서서 돌격하는 장군형", type: "teto", score: 3 },
                { text: "유연한 조율자. 상황에 따라 밀고 당기며 균형을 맞춘다", type: "balanced", score: 1 },
                { text: "따뜻한 엄마 리더십. 팀원들의 고충을 들어주며 다독이는 서포트형", type: "egen", score: 3 }
            ]
        },
        {
            situation: "⛱️ 모처럼 생긴 꿀 같은 휴일, 나는?",
            options: {
                male: [
                    { text: "가만히 있으면 몸이 쑤신다. 풋살이든 롤이든 승부를 봐야 직성이 풀린다", type: "teto", score: 3 },
                    { text: "그날 기분에 따라! 나가 놀 수도 있고 집에서 쉴 수도 있다", type: "balanced", score: 1 },
                    { text: "이불 밖은 위험해. 집에서 혼자만의 시간을 즐기거나 전시회를 간다", type: "egen", score: 3 }
                ],
                female: [
                    { text: "인싸력 폭발! 친구들 모아서 맛집 탐방 가고 쇼핑하며 활개 친다", type: "teto", score: 3 },
                    { text: "반반 치킨처럼! 낮엔 놀고 밤엔 쉬는 하이브리드 전략을 쓴다", type: "balanced", score: 1 },
                    { text: "밀린 넷플릭스 정주행! 따뜻한 코코아 한 잔과 함께 감성에 젖는다", type: "egen", score: 3 }
                ]
            }
        },
        {
            situation: "🎭 내 감정이 요동칠 때, 겉으로 드러나는 모습은?",
            options: [
                { text: "감정보다는 행동! 화가 나면 운동을 하거나 일에 집중하며 쿨하게 털어낸다", type: "teto", score: 3 },
                { text: "포커페이스... 상황에 맞게 내 감정을 적절히 숨기거나 조절하며 표현한다", type: "balanced", score: 1 },
                { text: "내 마음은 호수요... 풍부한 표정과 섬세한 단어로 내 속마음을 솔직히 터놓는다", type: "egen", score: 3 }
            ]
        },
        {
            situation: "🧩 복잡한 문제가 생겼을 때 나의 해결법은?",
            options: [
                { text: "기계적인 두뇌 회전! 단계별로 착착 쪼개서 체계적으로 박살 낸다", type: "teto", score: 3 },
                { text: "감과 논리의 콜라보! 적당한 직관과 팩트를 섞어본다", type: "balanced", score: 1 },
                { text: "번뜩이는 영감! 남들이 생각지 못한 창의적인 꼼수(?)를 찾아낸다", type: "egen", score: 3 }
            ]
        }
    ],
    // 한국어 성별별 추가 질문
    ko_male_specific: [
        {
            situation: "🦁 진정한 '남자'의 멋, 당신이 정의하는 남성성이란?",
            options: [
                { text: "거친 야생의 카리스마! 강인한 육체와 정신, 그리고 압도적인 리더십이다", type: "teto", score: 2 },
                { text: "시대에 발맞추는 유연함! 강할 땐 강하고 부드러울 땐 부드러운 하이브리드다", type: "balanced", score: 1 },
                { text: "섬세한 감각의 완성! 타인을 배려하고 자신을 아름답게 가꿀 줄 아는 섬세함이다", type: "egen", score: 2 }
            ]
        },
        {
            situation: "🌹 내 여자는 내가 지킨다! 연애할 때 나의 스타일은?",
            options: [
                { text: "상남자 특: 리드한다. '오빠 믿지?'하며 모든 코스를 계획하고 이끈다", type: "teto", score: 2 },
                { text: "케바케지. 상황에 따라 리드하기도 하고 맞춰주기도 하는 유연함", type: "balanced", score: 1 },
                { text: "너 하고 싶은 거 다 해! 여친의 의견을 전적으로 따르며 공감해준다", type: "egen", score: 2 }
            ]
        },
        {
            situation: "💅 '그루밍족' 열풍, 남자의 외모 관리에 대한 당신의 솔직한 생각은?",
            options: [
                { text: "세수만 잘하면 끝! 남자가 외모에 너무 치중하는 건 오히려 멋이 떨어진다", type: "teto", score: 2 },
                { text: "TPO는 지켜야지! 장소와 상황에 맞게 깔끔하고 단정하게만 관리한다", type: "balanced", score: 1 },
                { text: "자기관리도 실력! 스킨케어부터 패션까지 완벽하게 가꾸는 게 진정한 프로다", type: "egen", score: 2 }
            ]
        },
        {
            situation: "🍺 의리! 친구들과의 우정을 증명하는 방법은?",
            options: [
                { text: "몸으로 부딪혀야지! 땀 흘리며 운동하거나 술 한잔 걸치며 끈끈해진다", type: "teto", score: 2 },
                { text: "적당한 거리 유지. 필요할 때 돕고 평소엔 각자 잘 산다", type: "balanced", score: 1 },
                { text: "속 깊은 대화. 고민을 나누고 서로 위로하며 정서적 유대를 쌓는다", type: "egen", score: 2 }
            ]
        },
        {
            situation: "💼 남자의 자존심! 나에게 성공이란?",
            options: [
                { text: "무조건 1등! 남들 위에 서서 지배하고 성취하는 것", type: "teto", score: 2 },
                { text: "밸런스 게임. 일도 중요하지만 내 삶의 여유도 챙기는 것", type: "balanced", score: 1 },
                { text: "나만의 행복. 돈보다는 내가 좋아하는 일을 하며 의미를 찾는 것", type: "egen", score: 2 }
            ]
        }
    ],
    ko_female_specific: [
        {
            situation: "🐆 세상이 규정한 '여성스러움', 당신은 어떻게 받아들이나요?",
            options: [
                { text: "내가 곧 길이다! 사회적 편견에 맞서 독립적이고 강인한 나만의 길을 간다", type: "teto", score: 2 },
                { text: "때로는 당당하게, 때로는 부드럽게! 상황에 따라 내 안의 다채로운 면을 보여준다", type: "balanced", score: 1 },
                { text: "따뜻한 포용의 힘! 주변을 배려하고 조화를 이루는 온화함을 소중히 여긴다", type: "egen", score: 2 }
            ]
        },
        {
            situation: "👠 내 인생의 주인공은 나! 일과 사랑 중 나의 선택은?",
            options: [
                { text: "커리어가 먼저다. 내 능력으로 인정받고 성공하는 게 최우선이다", type: "teto", score: 2 },
                { text: "상황 봐서 조율한다. 때로는 일이, 때로는 가정이 먼저일 수 있다", type: "balanced", score: 1 },
                { text: "사랑이 없으면 무슨 소용? 따뜻한 가정과 사랑하는 사람들과의 관계가 1순위다", type: "egen", score: 2 }
            ]
        },
        {
            situation: "💄 부드러운 카리스마! 내가 여왕벌이 된다면?",
            options: [
                { text: "카리스마 폭발! 확실한 결단력으로 좌중을 압도하며 이끈다", type: "teto", score: 2 },
                { text: "상황 대처 능력 만렙. 그때그때 센스 있게 대처하며 융통성을 발휘한다", type: "balanced", score: 1 },
                { text: "공감 능력 풀가동! 사람들의 마음을 읽고 보듬어주며 부드럽게 이끈다", type: "egen", score: 2 }
            ]
        },
        {
            situation: "💍 '꾸안꾸'부터 '풀메'까지, 당신에게 꾸밈이란 어떤 의미인가요?",
            options: [
                { text: "편안함이 최고! 화려한 치장보다는 실용적이고 활동적인 스타일을 선호한다", type: "teto", score: 2 },
                { text: "센스 있는 연출! 때로는 힙하게, 때로는 우아하게 나를 표현하는 즐거움이다", type: "balanced", score: 1 },
                { text: "나를 위한 선물! 메이크업과 패션을 통해 매일 새로운 아름다움을 발견한다", type: "egen", score: 2 }
            ]
        },
        {
            situation: "👯‍♀️ 찐친 케미! 친구들과 함께할 때 나는?",
            options: [
                { text: "우리는 어벤져스! 서로 자극 주며 같이 성장하고 성공하자고 파이팅한다", type: "teto", score: 2 },
                { text: "그냥 노는 거지 뭐. 맛있는 거 먹고 수다 떨며 가볍게 즐긴다", type: "balanced", score: 1 },
                { text: "눈빛만 봐도 알아. 서로의 아픔을 공감하고 위로해주는 영혼의 단짝이다", type: "egen", score: 2 }
            ]
        }
    ],
    en: [
        {
            situation: "🔥 First day, high stakes! The CEO suddenly asks for your opinion in an all-hands meeting?",
            options: [
                { text: "Showtime! Unleash my prepared ambition and aggressively pour out logical arguments.", type: "teto", score: 3 },
                { text: "Not enough info yet. Read the room and agree moderately to stay safe.", type: "balanced", score: 1 },
                { text: "Standing out means death. Watch colleagues' faces and stay quietly invisible.", type: "egen", score: 3 }
            ]
        },
        {
            situation: "💔 A friend calls crying, \"I think I got caught cheating...\"",
            options: [
                { text: "Stop crying and prep excuses! Hit them with facts and strategize survival.", type: "teto", score: 3 },
                { text: "Calm them down, analyze the situation objectively, and discuss countermeasures.", type: "balanced", score: 1 },
                { text: "Oh no... Are you okay? Stay by their side and offer emotional support first.", type: "egen", score: 3 }
            ]
        },
        {
            situation: "🍷 Picking a 'Killer' Date Spot for a Successful Night?",
            options: {
                male: [
                    { text: "Overwhelming Energy! A sports stadium with fighting spirit or a hip club.", type: "teto", score: 3 },
                    { text: "Fail-proof Classic! A fine dining spot with great atmosphere or a pop-up store.", type: "balanced", score: 1 },
                    { text: "Emotional Vibes... A quiet wine bar or a dawn riverside walk.", type: "egen", score: 3 }
                ],
                female: [
                    { text: "I Lead! Thrilling bungee jumping or a racing circuit.", type: "teto", score: 3 },
                    { text: "Taste Sniper! The hottest Instagrammable spot right now.", type: "balanced", score: 1 },
                    { text: "Drunk on Atmosphere... Candlelight concert or a quiet LP bar.", type: "egen", score: 3 }
                ]
            }
        },
        {
            situation: "🗿 A moment to go 'All-In' that could change your life entirely?",
            options: [
                { text: "High Risk, High Return! After thorough analysis, I bet everything I have.", type: "teto", score: 3 },
                { text: "Stability is king. Distribute risks and double-check even stone bridges.", type: "balanced", score: 1 },
                { text: "Follow my soul's calling over numbers. Trust trusting fate and intuition.", type: "egen", score: 3 }
            ]
        },
        {
            situation: "🤛 Someone crosses the line and openly disrespects you?",
            options: [
                { text: "Eye for an eye! Counterattack immediately and clearly set the hierarchy.", type: "teto", score: 3 },
                { text: "Endure for now. But plot thorough revenge or pressure them elegantly later.", type: "balanced", score: 1 },
                { text: "I hate fighting. Try to understand why they did that and smooth it over.", type: "egen", score: 3 }
            ]
        },
        {
            situation: "🤯 \"Notice anything different today?\" Lover's lethal question causes brain freeze?",
            options: {
                male: [
                    { text: "No buffering! Escape crisis with \"Of course, looking gorgeous as always!\"", type: "teto", score: 3 },
                    { text: "Wild guessing is risky... Desperately scan for changes with rolling eyes.", type: "balanced", score: 1 },
                    { text: "Honestly don't know, but hold their hand and whisper \"I love you\" instead.", type: "egen", score: 3 }
                ],
                female: [
                    { text: "You know I changed. Pressure them to name 3 things that changed.", type: "teto", score: 3 },
                    { text: "Maybe they don't know. \"Want a hint?\" and loosen the mood playfully.", type: "balanced", score: 1 },
                    { text: "Feel a wave of sadness that they didn't notice and get slightly sulky.", type: "egen", score: 3 }
                ]
            }
        },
        {
            situation: "🥂 High-pressure social gathering with strangers, what's your position?",
            options: [
                { text: "Already the insider here! Dominate the convo with wit and stand in the center.", type: "teto", score: 3 },
                { text: "Moderate smiles... Read the air and chime in only when necessary.", type: "balanced", score: 1 },
                { text: "The corner is my sanctuary. Become one with the wall until asked.", type: "egen", score: 3 }
            ]
        },
        {
            situation: "💰 Lottery Jackpot! But after taxes, it's less than expected?",
            options: [
                { text: "Money makes money! Aggressively invest in real estate, stocks, or business.", type: "teto", score: 3 },
                { text: "Pay off debts first, save half, spend half sensibly on myself.", type: "balanced", score: 1 },
                { text: "Luxury bags and travel for the hardworking me! Splurge for present happiness.", type: "egen", score: 3 }
            ]
        },
        {
            situation: "🎮 Playing in a different league! My perfect healing time?",
            options: {
                male: [
                    { text: "Sweat is sweet! Burn competitive spirit with soccer or gaming.", type: "teto", score: 3 },
                    { text: "Depends on the day. Freely enjoy whatever I feel like.", type: "balanced", score: 1 },
                    { text: "Recharge emotion listening to music or drawing in my hideout.", type: "egen", score: 3 }
                ],
                female: [
                    { text: "Staying still makes me sick! Tour hot spots with friends and release energy.", type: "teto", score: 3 },
                    { text: "It's a mood! Choose active or quiet based on my tension.", type: "balanced", score: 1 },
                    { text: "Don't disturb. Decorate diary or enjoy hobbies alone quietly.", type: "egen", score: 3 }
                ]
            }
        },
        {
            situation: "⚔️ Group Project Nightmare! Your position among the villains?",
            options: [
                { text: "Frustrated so I do it! Hard carry the team even if called a dictator.", type: "teto", score: 3 },
                { text: "Avoid fights. Coax villains appropriately to get their parts done.", type: "balanced", score: 1 },
                { text: "Silently support the team from behind with research and editing.", type: "egen", score: 3 }
            ]
        },
        {
            situation: "🌪️ Mental Breakdown... When life gives you lemons?",
            options: [
                { text: "No defeat! Analyze causes brutally and sharpen the knife for 'Just you wait'.", type: "teto", score: 3 },
                { text: "Time heals. Eat something good and wait for it to fade naturally.", type: "balanced", score: 1 },
                { text: "World collapsed... Listen to sad songs in my room and pour out tears.", type: "egen", score: 3 }
            ]
        },
        {
            situation: "⚔️ Conflict of Opinion! If they spout nonsense?",
            options: [
                { text: "Fact Bomber! Crush their bones with logic and teach them a lesson.", type: "teto", score: 3 },
                { text: "Peace is good. Match them appropriately and smooth over the situation.", type: "balanced", score: 1 },
                { text: "Why are they like that... Try to understand their stance and swallow it.", type: "egen", score: 3 }
            ]
        },
        {
            situation: "🗺️ Me in 10 years, what do I look like?",
            options: [
                { text: "Ambition Roadmap Ready! Yearly goals sorted in an Excel file.", type: "teto", score: 3 },
                { text: "Have a big picture. But life changes, I'll adjust then.", type: "balanced", score: 1 },
                { text: "Just want happiness... Follow my heart rather than specific goals.", type: "egen", score: 3 }
            ]
        },
        {
            situation: "🏆 My standard for a 'God-Tier Life'?",
            options: [
                { text: "Bank balance and title! Visible achievements and status must be full.", type: "teto", score: 3 },
                { text: "Work-life balance is best! Stable life with harmony of work and life.", type: "balanced", score: 1 },
                { text: "Love and Peace! Living comfortably sharing deep affection with loved ones.", type: "egen", score: 3 }
            ]
        },
        {
            situation: "🎤 Presentation before hundreds, given only 1 minute?",
            options: [
                { text: "Overwhelming Confidence! Hit key points and imprint myself on the audience.", type: "teto", score: 3 },
                { text: "Result of thorough practice! Deliver perfectly without mistakes as prepared.", type: "balanced", score: 1 },
                { text: "Sincerity works! Touch the audience's hearts with genuine emotion over technique.", type: "egen", score: 3 }
            ]
        },
        {
            situation: "🌪️ Sudden Change of Plans! My reaction?",
            options: [
                { text: "Even better! Immediately activate Plan B and lead the situation.", type: "teto", score: 3 },
                { text: "Watch first. See how things flow and move slowly.", type: "balanced", score: 1 },
                { text: "Mental boom... Unprepared and panic, don't know what to do.", type: "egen", score: 3 }
            ]
        },
        {
            situation: "👑 If I become a leader, what style?",
            options: [
                { text: "Follow me! General type who presents clear vision and charges forward.", type: "teto", score: 3 },
                { text: "Flexible coordinator. Push and pull according to situation for balance.", type: "balanced", score: 1 },
                { text: "Warm Mom Leadership. Supporter type who listens to grievances and soothes.", type: "egen", score: 3 }
            ]
        },
        {
            situation: "⛱️ A rare sweet holiday, what do I do?",
            options: {
                male: [
                    { text: "Body aches if still. Must competer in futsal or LoL to feel satisfied.", type: "teto", score: 3 },
                    { text: "Depending on mood! Go out to play or rest at home.", type: "balanced", score: 1 },
                    { text: "Outside is dangerous. Enjoy alone time at home or visit exhibitions.", type: "egen", score: 3 }
                ],
                female: [
                    { text: "Social energy explosion! Gather friends, tour food spots, and shop.", type: "teto", score: 3 },
                    { text: "Half and half! Play during day, rest at night hybrid strategy.", type: "balanced", score: 1 },
                    { text: "Netflix marathon! Get emotional with hot cocoa.", type: "egen", score: 3 }
                ]
            }
        },
        {
            situation: "🎭 When my emotions fluctuate, how does it show?",
            options: [
                { text: "Action over emotion! Exercise or focus on work to coolly shake it off.", type: "teto", score: 3 },
                { text: "Poker face... Hide or adjust emotions appropriately to the situation.", type: "balanced", score: 1 },
                { text: "My heart is a lake... Honestly reveal inner feelings with rich expressions.", type: "egen", score: 3 }
            ]
        },
        {
            situation: "🧩 Complex problem arises, my solution?",
            options: [
                { text: "Mechanical brain rotation! Break it down step-by-step and crush it systematically.", type: "teto", score: 3 },
                { text: "Collab of gut and logic! Mix intuition and facts appropriately.", type: "balanced", score: 1 },
                { text: "Flash of inspiration! Find creative tricks others didn't think of.", type: "egen", score: 3 }
            ]
        }
    ],
    // English gender-specific additional questions
    en_male_specific: [
        {
            situation: "🦁 True 'Man's Coolness', how do you define masculinity?",
            options: [
                { text: "Wild Charisma! Strong body, spirit, and overwhelming leadership.", type: "teto", score: 2 },
                { text: "Modern Flexibility! Hybrid who is strong when needed, soft when needed.", type: "balanced", score: 1 },
                { text: "Perfection of Delicate Sense! Consideration for others and grooming oneself.", type: "egen", score: 2 }
            ]
        },
        {
            situation: "🌹 I protect my woman! My dating style?",
            options: [
                { text: "Alpha Male: I Lead. \"Trust oppa\" and plan/lead every course.", type: "teto", score: 2 },
                { text: "Case by case. Flexible to lead or match depending on situation.", type: "balanced", score: 1 },
                { text: "Do whatever you want! Follow girlfriend's opinion entirely and empathize.", type: "egen", score: 2 }
            ]
        },
        {
            situation: "💅 'Grooming' Craze, honest thought on men's appearance care?",
            options: [
                { text: "Washing face is enough! Too much focus on looks reduces coolness.", type: "teto", score: 2 },
                { text: "Keep TPO! Clean and tidy according to place and situation.", type: "balanced", score: 1 },
                { text: "Self-care is skill! Perfect grooming from skincare to fashion is pro.", type: "egen", score: 2 }
            ]
        },
        {
            situation: "🍺 Loyalty! How to prove friendship with bros?",
            options: [
                { text: "Physical clash! Sweat it out exercising or bond over a drink.", type: "teto", score: 2 },
                { text: "Moderate distance. Help when needed, live well separately otherwise.", type: "balanced", score: 1 },
                { text: "Deep conversation. Share worries and build emotional bonds.", type: "egen", score: 2 }
            ]
        },
        {
            situation: "💼 Man's Pride! What is success to me?",
            options: [
                { text: "Absolute #1! Standing above others, dominating and achieving.", type: "teto", score: 2 },
                { text: "Balance Game. Work is important but my life's leisure matters.", type: "balanced", score: 1 },
                { text: "My Happiness. Finding meaning doing what I like rather than money.", type: "egen", score: 2 }
            ]
        }
    ],
    en_female_specific: [
        {
            situation: "🐆 Society's defined 'Femininity', how do you take it?",
            options: [
                { text: "I am the way! Go my own independent, strong path against prejudice.", type: "teto", score: 2 },
                { text: "Sometimes confident, sometimes soft! Show colorful sides per situation.", type: "balanced", score: 1 },
                { text: "Power of Warm Embrace! Cherish gentleness that cares for surroundings.", type: "egen", score: 2 }
            ]
        },
        {
            situation: "👠 Protagonist of my life! Choice between work and love?",
            options: [
                { text: "Career first. Being recognized for ability and succeeding is priority.", type: "teto", score: 2 },
                { text: "Adjust to context. Sometimes work, sometimes family comes first.", type: "balanced", score: 1 },
                { text: "What's the point without love? Warm family and relationships are #1.", type: "egen", score: 2 }
            ]
        },
        {
            situation: "💄 Soft Charisma! If I become a Queen Bee?",
            options: [
                { text: "Charisma Explosion! Lead while overwhelming the crowd with decisiveness.", type: "teto", score: 2 },
                { text: "Max Coping Skill. Handle wittily and flexibly moment to moment.", type: "balanced", score: 1 },
                { text: "Full Empathy! Read people's hearts and lead gently.", type: "egen", score: 2 }
            ]
        },
        {
            situation: "💍 From 'No-Makeup' to 'Full-Glam', what does grooming mean?",
            options: [
                { text: "Comfort is best! Prefer practical and active styles over fancy ones.", type: "teto", score: 2 },
                { text: "Sense of Style! Joy of expressing myself, sometimes hip, sometimes elegant.", type: "balanced", score: 1 },
                { text: "Gift to myself! Discover new beauty daily through makeup and fashion.", type: "egen", score: 2 }
            ]
        },
        {
            situation: "👯‍♀️ Bestie Chemistry! When with friends?",
            options: [
                { text: "We are Avengers! Stimulate each other to grow and succeed together.", type: "teto", score: 2 },
                { text: "Just playing. Eat good food, chat, and enjoy lightly.", type: "balanced", score: 1 },
                { text: "Know just by eyes. Soulmates who empathize with pain and comfort.", type: "egen", score: 2 }
            ]
        }
    ]
};

// 결과 데이터
const resultData = {
    ko: {
        male: {
            teto: {
                type: "Tier 1: 야망의 지배자, 테토남",
                emoji: "🦁",
                traits: ["알파메일", "불도저 리더십", "강력한 승부욕", "성공 집착", "사교 끝판왕"],
                description: "당신은 타고난 승부사입니다. 테스토스테론의 은총(?)을 듬뿍 받아 어딜 가나 주인공이 되어야 직성이 풀리는 타입이죠. 헬스장에서 쇳덩이를 들 때 비로소 살아있음을 느끼며, 경쟁자가 나타나면 오히려 전의를 불태웁니다. 단순해 보이지만 그 안에는 세상을 집어삼키려는 거대한 야망이 숨어 있습니다. 연애할 때도 직진! 차일 걱정 따위는 운동으로 잊어버리는 쿨함의 정석입니다.",
                tetoLabel: "테토남",
                egenLabel: "에겐남",
                compatibility: [
                    { type: "에겐녀", emoji: "💕", reason: "서로 다른 강점이 보완되어 균형잡힌 관계. 하지만 소통 방식 차이로 오해 가능성 있음" },
                    { type: "테토녀", emoji: "🤝", reason: "목표 지향적인 성향이 비슷해 이해도가 높으나, 경쟁적 관계로 발전할 수 있음" }
                ],
                careers: ["경영진", "운동선수", "군인/경찰", "영업직", "기업가", "정치인", "부동산업", "건설업"],
                celebrities: [
                    { name: "방찬", profession: "가수" },
                    { name: "민호", profession: "가수" },
                    { name: "셔누", profession: "가수" },
                    { name: "지창욱", profession: "가수" }
                ],
                health: {
                    exercise: ["헬스장 웨이트 트레이닝", "축구/농구", "러닝/조깅", "등산"],
                    diet: ["고단백 식단", "근육 증량 위한 칼로리", "규칙적인 식사"],
                    stress: ["목표 달성 활동", "친구들과 운동", "승부욕을 자극하는 게임"]
                },
                growth: [
                    { title: "감정 표현력 향상", description: "상대방의 감정을 이해하고 공감하는 능력을 기르세요", icon: "❤️" },
                    { title: "경청 능력 개발", description: "다른 사람의 의견을 끝까지 들어보는 습관을 기르세요", icon: "👂" },
                    { title: "세심함 기르기", description: "작은 디테일에도 신경 쓰는 섬세함을 개발하세요", icon: "🎯" }
                ]
            },
            egen: {
                type: "Tier 1: 감성의 연금술사, 에겐남",
                emoji: "🦄",
                traits: ["패션 피플", "섬세한 터치", "예술적 영혼", "트렌드 세터", "분위기 메이커"],
                description: "당신은 이 시대의 진정한 댄디 가이입니다. 에스트로겐의 축복(?)으로 남들은 보지 못하는 미세한 감정 선과 트렌드를 읽어내는 능력이 탁월하죠. '오늘 뭐 입지?'가 인생 최대의 고민이며, 거울 앞에서의 시간이 당신에겐 명상과도 같습니다. 데이트 장소를 고를 때도 인스타 핫플 5군데는 기본으로 꿰고 있죠. 가끔은 너무 예민해서 주위 눈치를 보기도 하지만, 그만큼 섬세한 매력으로 모성애를 자극하는 타입입니다.",
                tetoLabel: "테토남",
                egenLabel: "에겐남",
                compatibility: [
                    { type: "테토녀", emoji: "⚖️", reason: "서로 다른 성격이 매력적이지만, 가치관 차이로 갈등 상황 발생 가능" },
                    { type: "에겐녀", emoji: "🌙", reason: "비슷한 감성으로 깊이 공감하나, 때로는 소극적 관계가 될 수 있음" }
                ],
                careers: ["디자이너", "예술가", "상담사", "교사", "의료진", "작가", "스타일리스트", "미용사"],
                celebrities: [
                    { name: "차은우", profession: "가수/배우" },
                    { name: "휴닝카이", profession: "가수" },
                    { name: "지민", profession: "가수" },
                    { name: "펠릭스", profession: "가수" }
                ],
                health: {
                    exercise: ["요가/필라테스", "수영", "댄스", "산책"],
                    diet: ["균형잡힌 식단", "비타민 섭취", "충분한 수분 섭취"],
                    stress: ["독서", "명상", "친구와 대화", "예술 활동"]
                },
                growth: [
                    { title: "자신감 강화", description: "자신의 장점을 인정하고 당당하게 표현하세요", icon: "💪" },
                    { title: "결단력 향상", description: "빠른 의사결정 능력을 기르세요", icon: "⚡" },
                    { title: "사회성 개발", description: "다양한 사람들과의 교류를 늘려보세요", icon: "🤝" }
                ]
            }
        },
        female: {
            teto: {
                type: "Tier 1: 당당한 카리스마, 테토녀",
                emoji: "🐆",
                traits: ["걸크러쉬", "갓생 설계자", "차도녀", "결정판 판결자", "야망 넘치는 리더"],
                description: "당신은 걸어 다니는 카리스마 그 자체입니다. '여자가~'라는 말은 당신 앞에서 금기어죠. 논리 없는 감정 호소보다는 확실한 팩트로 상대를 압도하는 것을 즐깁니다. 커리어에서는 이미 정점을 찍었거나 찍을 예정인 야망가이며, 연애에서도 주도권을 잡아야 직성이 풀립니다. 가끔은 너무 차갑다는 말을 듣기도 하지만, 내 사람이라고 판단되면 그 누구보다 든든한 방패가 되어주는 멋진 언니 스타일입니다.",
                tetoLabel: "테토녀",
                egenLabel: "에겐녀",
                compatibility: [
                    { type: "에겐남", emoji: "⚖️", reason: "상호 보완적 관계로 서로 성장 가능. 단, 주도권 문제로 갈등 있을 수 있음" },
                    { type: "테토남", emoji: "🔥", reason: "둘 다 강한 성향으로 열정적 관계 가능하나, 충돌과 경쟁 요소도 존재" }
                ],
                careers: ["변호사", "의사", "CEO/임원", "저널리스트", "컨설턴트", "정치인", "마케터", "투자가"],
                celebrities: [
                    { name: "예지", profession: "가수" },
                    { name: "윈터", profession: "가수" },
                    { name: "화사", profession: "가수" },
                    { name: "리사", profession: "가수" }
                ],
                health: {
                    exercise: ["크로스핏", "복싱", "테니스", "골프"],
                    diet: ["고단백 저탄수화물", "규칙적인 식사", "영양제 섭취"],
                    stress: ["운동으로 에너지 발산", "목표 달성 활동", "경쟁적 게임"]
                },
                growth: [
                    { title: "공감 능력 향상", description: "다른 사람의 감정을 이해하고 배려하는 마음을 기르세요", icon: "💝" },
                    { title: "유연성 기르기", description: "때로는 타협하고 양보하는 법을 배우세요", icon: "🌊" },
                    { title: "감정 표현하기", description: "논리뿐만 아니라 감정도 솔직하게 표현해보세요", icon: "🎭" }
                ]
            },
            egen: {
                type: "Tier 1: 온 세상의 꽃, 에겐녀",
                emoji: "🦢",
                traits: ["힐링의 아이콘", "공감 요정", "천생 여자", "인간 비타민", "평화주의자"],
                description: "당신은 존재만으로도 주변을 환하게 밝히는 타입입니다. 에스트로겐의 정수를 모아놓은 듯한 섬세함과 따뜻함이 당신의 가장 큰 무기죠. 상대방의 작은 표정 변화 하나에도 마음이 쓰이는 배려왕이며, 꽃과 향기, 흐르는 음악에 눈물 흘릴 줄 아는 풍부한 감수성을 가졌습니다. 갈등은 질색! 어딜 가나 평화를 사랑하며, 사람들의 속마음을 들어주고 위로해주는 진정한 소통의 여왕입니다.",
                tetoLabel: "테토녀",
                egenLabel: "에겐녀",
                compatibility: [
                    { type: "테토남", emoji: "💕", reason: "전통적인 남녀 역할로 안정적 관계. 다만 현대적 가치관 차이 있을 수 있음" },
                    { type: "에겐남", emoji: "🌙", reason: "감성적으로 깊이 통하나, 때로는 결정력 부족으로 정체될 수 있음" }
                ],
                careers: ["간호사", "교사", "예술가", "심리상담사", "사회복지사", "HR", "미용사", "플라워 디자이너"],
                celebrities: [
                    { name: "장원영", profession: "가수" },
                    { name: "카리나", profession: "가수" },
                    { name: "아이유", profession: "가수" },
                    { name: "해린", profession: "가수" }
                ],
                health: {
                    exercise: ["요가", "필라테스", "발레", "산책"],
                    diet: ["균형잡힌 식단", "과일과 채소 위주", "충분한 수분"],
                    stress: ["친구와 수다", "쇼핑", "영화/드라마 감상", "여행"]
                },
                growth: [
                    { title: "자기 주장 늘리기", description: "자신의 의견을 더 적극적으로 표현해보세요", icon: "📢" },
                    { title: "독립성 기르기", description: "혼자서도 할 수 있는 일들을 늘려보세요", icon: "🦋" },
                    { title: "목표 설정하기", description: "명확한 목표를 세우고 체계적으로 추진해보세요", icon: "🎯" }
                ]
            }
        }
    },
    en: {
        male: {
            teto: {
                type: "Tier 1: The Ambition Dominator, Teto Man",
                emoji: "🦁",
                traits: ["Alpha Male", "Bulldozer Leadership", "Fierce Competitiveness", "Obsessed with Success", "Social King"],
                description: "You are a natural-born winner. Blessed by testosterone, you can't stand not being the main character wherever you go. You only feel alive when lifting heavy iron at the gym, and the appearance of a rival only fuels your fighting spirit. You may seem simple, but hidden inside is a massive ambition to swallow the world. Even in dating, it's full speed ahead! You're the epitome of cool, shaken off rejection with a workout.",
                tetoLabel: "Teto Man",
                egenLabel: "Egen Man",
                compatibility: [
                    { type: "Egen Woman", emoji: "💕", reason: "Balanced relationship where different strengths complement each other. But communication style differences may cause misunderstandings." },
                    { type: "Teto Woman", emoji: "🤝", reason: "Similar goal-oriented nature leads to high understanding, but can turn into a competitive relationship." }
                ],
                careers: ["Executive", "Athlete", "Military/Police", "Sales", "Entrepreneur", "Politician", "Real Estate", "Construction"],
                celebrities: [
                    { name: "Bang Chan", profession: "Singer" },
                    { name: "Minho", profession: "Singer" },
                    { name: "Shownu", profession: "Singer" },
                    { name: "Ji Chang-wook", profession: "Actor" }
                ],
                health: {
                    exercise: ["Gym Weight Training", "Soccer/Basketball", "Running", "Hiking"],
                    diet: ["High Protein Diet", "Bulking Calories", "Regular Meals"],
                    stress: ["Goal Achieving Activities", "Sports with Bros", "Competitive Gaming"]
                },
                growth: [
                    { title: "Improve Emotional Expression", description: "Develop empathy skills to understand others' feelings deeper.", icon: "❤️" },
                    { title: "Develop Listening Skills", description: "Practice listening to others' opinions until the end.", icon: "👂" },
                    { title: "Cultivate Detail", description: "Develop sensitivity to small details.", icon: "🎯" }
                ]
            },
            egen: {
                type: "Tier 1: The Alchemy of Emotion, Egen Man",
                emoji: "🎨",
                traits: ["Fashion People", "Delicate Touch", "Artistic Soul", "Unique Vibe", "Trendy"],
                description: "The true dandy guy of this era with high estrogen sensitivity. You pay sharp attention to clothes and appearance, know your brands, and take self-care seriously. You have a deep interest in interior design, niche music, or art. You can hold sensitive and interesting conversations just like women do, and prefer cozy, atmospheric spots for dates. You might be a bit passive socially and care a lot about what others think.",
                tetoLabel: "Teto Man",
                egenLabel: "Egen Man",
                compatibility: [
                    { type: "Teto Woman", emoji: "⚖️", reason: "Different charms are attractive, but clashing values can lead to conflict." },
                    { type: "Egen Woman", emoji: "🌙", reason: "Deep empathy through similar emotional waves, but the relationship might get too passive." }
                ],
                careers: ["Designer", "Artist", "Counselor", "Teacher", "Healthcare", "Writer", "Stylist", "Hairdresser"],
                celebrities: [
                    { name: "Cha Eun-woo", profession: "Singer/Actor" },
                    { name: "HueningKai", profession: "Singer" },
                    { name: "Jimin", profession: "Singer" },
                    { name: "Felix", profession: "Singer" }
                ],
                health: {
                    exercise: ["Yoga/Pilates", "Swimming", "Dancing", "Walking"],
                    diet: ["Balanced Diet", "Vitamin Intake", "Hydration"],
                    stress: ["Reading", "Meditation", "Chatting with Friends", "Artistic Activities"]
                },
                growth: [
                    { title: "Build Confidence", description: "Recognize your strengths and express them boldly.", icon: "💪" },
                    { title: "Improve Decisiveness", description: "Develop the ability to make quick decisions.", icon: "⚡" },
                    { title: "Expand Social Skills", description: "Increase interactions with a wider variety of people.", icon: "🤝" }
                ]
            }
        },
        female: {
            teto: {
                type: "Tier 1: The Iron Empress, Teto Woman",
                emoji: "👑",
                traits: ["Girl Boss", "Independent", "Fact Bomber", "Realistic", "Ambition Incarnate"],
                description: "The 'Girl Boss' with strong testosterone vibes. You have an independent and confident personality that refuses to rely on others. You're goal-oriented, possess strong leadership, and prefer direct, no-nonsense communication. You aren't afraid of competition and express your opinions clearly. Rather than traditional gender roles, you carve your own path with career ambitions. You prioritize logic over fleeting emotions and are a master problem solver.",
                tetoLabel: "Teto Woman",
                egenLabel: "Egen Woman",
                compatibility: [
                    { type: "Egen Man", emoji: "⚖️", reason: "Mutually complementary relationship for growth. But leadership struggles can cause friction." },
                    { type: "Teto Man", emoji: "🔥", reason: "Two strong personalities make for a passionate romance, but clashes and rivalry are inevitable." }
                ],
                careers: ["Lawyer", "Doctor", "CEO/Executive", "Journalist", "Consultant", "Politician", "Marketer", "Investor"],
                celebrities: [
                    { name: "Yeji", profession: "Singer" },
                    { name: "Winter", profession: "Singer" },
                    { name: "Hwasa", profession: "Singer" },
                    { name: "Lisa", profession: "Singer" }
                ],
                health: {
                    exercise: ["CrossFit", "Boxing", "Tennis", "Golf"],
                    diet: ["High Protein Low Carb", "Regular Meals", "Supplements"],
                    stress: ["Energy Release Exercise", "Goal Achievement", "Competitive Games"]
                },
                growth: [
                    { title: "Improve Empathy", description: "Cultivate a heart that understands and considers others.", icon: "💝" },
                    { title: "Cultivate Flexibility", description: "Learn the wisdom of compromising and yielding sometimes.", icon: "🌊" },
                    { title: "Express Emotions", description: "Try expressing your feelings honestly, not just logic.", icon: "🎭" }
                ]
            },
            egen: {
                type: "Tier 1: The Queen of Empathy, Egen Woman",
                emoji: "🌸",
                traits: ["Emotionally Rich", "Caring Angel", "Sensitive", "Gentle", "Social Queen"],
                description: "The epitome of femininity with high estrogen levels. You are rich in emotional expression, sensitive, and deeply caring towards everyone around you. You have excellent aesthetic sense and a high interest in fashion and beauty. You value harmonious relationships above all and hate conflict. You tend to judge intuitively and emotionally, and enjoy art or creative activities. Deep emotional bonds are your lifeblood.",
                tetoLabel: "Teto Woman",
                egenLabel: "Egen Woman",
                compatibility: [
                    { type: "Teto Man", emoji: "💕", reason: "Stable relationship with traditional roles. But modern value differences might arise." },
                    { type: "Egen Man", emoji: "🌙", reason: "Deep emotional connection is possible, but indecisiveness might stall the relationship." }
                ],
                careers: ["Nurse", "Teacher", "Artist", "Counselor", "Social Worker", "HR", "Hairdresser", "Floral Designer"],
                celebrities: [
                    { name: "Jang Won-young", profession: "Singer" },
                    { name: "Karina", profession: "Singer" },
                    { name: "IU", profession: "Singer" },
                    { name: "Haerin", profession: "Singer" }
                ],
                health: {
                    exercise: ["Yoga", "Pilates", "Ballet", "Walking"],
                    diet: ["Balanced Diet", "Fruits & Veggies", "Hydration"],
                    stress: ["Chatting with Friends", "Shopping", "Movies/Dramas", "Travel"]
                },
                growth: [
                    { title: "Increase Self-Assertion", description: "Try expressing your own opinions more actively.", icon: "📢" },
                    { title: "Develop Independence", description: "Increase the number of things you can handle on your own.", icon: "🦋" },
                    { title: "Set Goals", description: "Set clear goals and try pursuing them systematically.", icon: "🎯" }
                ]
            }
        }
    }
};
