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
            situation: "취미나 여가 활동을 선택할 때",
            options: {
                male: [
                    { text: "경쟁적이고 도전적인 활동을 선호한다", type: "teto", score: 3 },
                    { text: "기분에 따라 다양한 활동을 즐긴다", type: "balanced", score: 1 },
                    { text: "창작이나 예술적 표현 활동을 좋아한다", type: "egen", score: 3 }
                ],
                female: [
                    { text: "활동적이고 사교적인 취미를 선호한다", type: "teto", score: 3 },
                    { text: "그때그때 끌리는 활동을 선택한다", type: "balanced", score: 1 },
                    { text: "조용하고 개인적인 취미를 즐긴다", type: "egen", score: 3 }
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
            situation: "실패나 좌절을 경험했을 때",
            options: [
                { text: "빠르게 원인을 분석하고 다음 도전을 준비한다", type: "teto", score: 3 },
                { text: "적당한 시간을 두고 차근차근 회복한다", type: "balanced", score: 1 },
                { text: "충분히 감정을 느끼고 내면의 힘을 기른다", type: "egen", score: 3 }
            ]
        },
        {
            situation: "의견이 다른 상황에서",
            options: [
                { text: "논리적 근거로 내 의견을 설득력 있게 제시한다", type: "teto", score: 3 },
                { text: "서로의 의견을 종합하여 절충안을 찾는다", type: "balanced", score: 1 },
                { text: "상대방의 입장을 이해하고 공감대를 형성한다", type: "egen", score: 3 }
            ]
        },
        {
            situation: "미래 계획을 세울 때",
            options: [
                { text: "구체적인 목표와 실행 계획을 체계적으로 수립한다", type: "teto", score: 3 },
                { text: "큰 방향은 정하되 유연성을 유지한다", type: "balanced", score: 1 },
                { text: "직감과 흐름에 맞춰 자연스럽게 진행한다", type: "egen", score: 3 }
            ]
        },
        {
            situation: "성취감을 느끼는 순간",
            options: [
                { text: "목표 달성과 성과 창출을 이루었을 때", type: "teto", score: 3 },
                { text: "균형잡힌 삶을 유지할 때", type: "balanced", score: 1 },
                { text: "타인과의 관계나 감정적 연결이 깊어질 때", type: "egen", score: 3 }
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
            situation: "예상치 못한 변화에 직면했을 때",
            options: [
                { text: "빠르게 상황을 파악하고 적극적으로 대응한다", type: "teto", score: 3 },
                { text: "신중하게 상황을 관찰한 후 점진적으로 적응한다", type: "balanced", score: 1 },
                { text: "변화로 인한 감정을 충분히 받아들인 후 대응한다", type: "egen", score: 3 }
            ]
        },
        {
            situation: "리더십을 발휘해야 하는 상황에서",
            options: [
                { text: "명확한 방향성과 강력한 추진력으로 이끈다", type: "teto", score: 3 },
                { text: "상황에 맞는 적절한 리더십 스타일을 택한다", type: "balanced", score: 1 },
                { text: "구성원들의 의견을 수렴하며 협력적으로 이끈다", type: "egen", score: 3 }
            ]
        },
        {
            situation: "여가 시간 활용 방식",
            options: {
                male: [
                    { text: "스포츠나 게임 등 경쟁적 활동을 선호한다", type: "teto", score: 3 },
                    { text: "그때 기분에 따라 다양하게 보낸다", type: "balanced", score: 1 },
                    { text: "혼자만의 조용한 시간이나 문화 활동을 즐긴다", type: "egen", score: 3 }
                ],
                female: [
                    { text: "친구들과 활발한 사교 활동을 즐긴다", type: "teto", score: 3 },
                    { text: "때로는 활발하게, 때로는 조용하게 보낸다", type: "balanced", score: 1 },
                    { text: "개인적인 취미나 자기계발에 시간을 투자한다", type: "egen", score: 3 }
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
            situation: "문제 해결 접근 방식",
            options: [
                { text: "체계적이고 단계적으로 해결책을 찾는다", type: "teto", score: 3 },
                { text: "직관과 논리를 조합하여 접근한다", type: "balanced", score: 1 },
                { text: "창의적이고 유연한 방법을 모색한다", type: "egen", score: 3 }
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
            situation: "연인과의 관계에서 남성의 역할",
            options: [
                { text: "보호자이자 이끄는 역할을 해야 한다고 생각한다", type: "teto", score: 2 },
                { text: "상황에 따라 역할이 바뀔 수 있다고 본다", type: "balanced", score: 1 },
                { text: "평등한 파트너로서 감정적 교감을 중시한다", type: "egen", score: 2 }
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
            situation: "남성 친구들과의 우정 표현",
            options: [
                { text: "함께 활동하고 경쟁하며 우정을 쌓는다", type: "teto", score: 2 },
                { text: "때로는 깊게, 때로는 가볍게 교류한다", type: "balanced", score: 1 },
                { text: "깊은 대화와 감정적 교감을 나눈다", type: "egen", score: 2 }
            ]
        },
        {
            situation: "직업이나 성공에 대한 태도",
            options: [
                { text: "성취와 성공이 남성의 중요한 덕목이다", type: "teto", score: 2 },
                { text: "성공도 중요하지만 균형있는 삶을 추구한다", type: "balanced", score: 1 },
                { text: "개인적 만족과 의미를 더 중시한다", type: "egen", score: 2 }
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
            situation: "커리어와 가정의 균형",
            options: [
                { text: "커리어 성공이 우선이며 그에 따라 가정을 조율한다", type: "teto", score: 2 },
                { text: "상황과 시기에 따라 우선순위를 조절한다", type: "balanced", score: 1 },
                { text: "가족과의 관계와 조화를 가장 중요하게 여긴다", type: "egen", score: 2 }
            ]
        },
        {
            situation: "리더십을 발휘할 때의 스타일",
            options: [
                { text: "결단력 있고 강력한 리더십을 보여준다", type: "teto", score: 2 },
                { text: "상황에 맞는 다양한 리더십을 발휘한다", type: "balanced", score: 1 },
                { text: "공감과 소통을 바탕으로 한 리더십을 추구한다", type: "egen", score: 2 }
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
            situation: "여성 친구들과의 관계",
            options: [
                { text: "함께 목표를 추구하고 서로 동기부여를 한다", type: "teto", score: 2 },
                { text: "다양한 방식으로 친밀감을 나눈다", type: "balanced", score: 1 },
                { text: "감정적 지지와 깊은 공감대를 형성한다", type: "egen", score: 2 }
            ]
        }
    ],
    en: [
        {
            situation: "When attending your first meeting at a new workplace",
            options: [
                { text: "I prepare materials in advance and actively share my opinions", type: "teto", score: 3 },
                { text: "I assess the atmosphere and speak appropriately to the situation", type: "balanced", score: 1 },
                { text: "I listen carefully to others and speak only when necessary", type: "egen", score: 3 }
            ]
        },
        {
            situation: "When a friend asks for advice about their troubles",
            options: [
                { text: "I logically present specific solutions", type: "teto", score: 3 },
                { text: "I listen to their emotions fully, then give situation-appropriate advice", type: "balanced", score: 1 },
                { text: "I empathize and comfort them first, providing emotional support", type: "egen", score: 3 }
            ]
        },
        {
            situation: "When deciding on a date location with your partner",
            options: {
                male: [
                    { text: "I suggest activity or sports-related places", type: "teto", score: 3 },
                    { text: "I look for a compromise that both of us would enjoy", type: "balanced", score: 1 },
                    { text: "I prioritize emotional places my partner would like", type: "egen", score: 3 }
                ],
                female: [
                    { text: "I suggest new and challenging activities", type: "teto", score: 3 },
                    { text: "I decide on a place we can both enjoy together", type: "balanced", score: 1 },
                    { text: "I prefer beautiful and emotional cafes or exhibitions", type: "egen", score: 3 }
                ]
            }
        },
        {
            situation: "When making important life decisions",
            options: [
                { text: "I make logical judgments based on data and facts", type: "teto", score: 3 },
                { text: "I consider both logic and intuition carefully before deciding", type: "balanced", score: 1 },
                { text: "I value my inner voice and intuition more", type: "egen", score: 3 }
            ]
        },
        {
            situation: "When facing conflict situations",
            options: [
                { text: "I identify the core problem and try to solve it directly", type: "teto", score: 3 },
                { text: "I analyze the situation objectively and find the best approach", type: "balanced", score: 1 },
                { text: "I consider everyone's feelings to find harmonious solutions", type: "egen", score: 3 }
            ]
        },
        {
            situation: "How I cope with stress",
            options: {
                male: [
                    { text: "I relieve stress through exercise or physical activities", type: "teto", score: 3 },
                    { text: "I try various methods depending on the situation", type: "balanced", score: 1 },
                    { text: "I calm my mind with quiet activities like music or reading", type: "egen", score: 3 }
                ],
                female: [
                    { text: "I lift my mood through exercise or active activities", type: "teto", score: 3 },
                    { text: "I choose methods that match my mood at the time", type: "balanced", score: 1 },
                    { text: "I organize my emotions with emotional movies or music", type: "egen", score: 3 }
                ]
            }
        },
        {
            situation: "At gatherings with new people",
            options: [
                { text: "I approach first and lead conversations", type: "teto", score: 3 },
                { text: "I naturally participate in conversations", type: "balanced", score: 1 },
                { text: "I observe the atmosphere and join in carefully", type: "egen", score: 3 }
            ]
        },
        {
            situation: "My priorities when spending money",
            options: [
                { text: "I prioritize long-term investments or practical value", type: "teto", score: 3 },
                { text: "I consider both necessity and enjoyment in balance", type: "balanced", score: 1 },
                { text: "I value current happiness and emotional satisfaction", type: "egen", score: 3 }
            ]
        },
        {
            situation: "When choosing hobbies or leisure activities",
            options: {
                male: [
                    { text: "I prefer competitive and challenging activities", type: "teto", score: 3 },
                    { text: "I enjoy various activities depending on my mood", type: "balanced", score: 1 },
                    { text: "I like creative or artistic expression activities", type: "egen", score: 3 }
                ],
                female: [
                    { text: "I prefer active and social hobbies", type: "teto", score: 3 },
                    { text: "I choose activities that appeal to me at the moment", type: "balanced", score: 1 },
                    { text: "I enjoy quiet and personal hobbies", type: "egen", score: 3 }
                ]
            }
        },
        {
            situation: "My role in team projects",
            options: [
                { text: "I demonstrate leadership and guide the project", type: "teto", score: 3 },
                { text: "I take either leader or follower roles as needed", type: "balanced", score: 1 },
                { text: "I provide creative ideas and careful support", type: "egen", score: 3 }
            ]
        },
        {
            situation: "When experiencing failure or setbacks",
            options: [
                { text: "I quickly analyze the cause and prepare for the next challenge", type: "teto", score: 3 },
                { text: "I take appropriate time to recover step by step", type: "balanced", score: 1 },
                { text: "I fully feel the emotions and build inner strength", type: "egen", score: 3 }
            ]
        },
        {
            situation: "In situations with differing opinions",
            options: [
                { text: "I present my opinion persuasively with logical evidence", type: "teto", score: 3 },
                { text: "I combine different opinions to find compromise", type: "balanced", score: 1 },
                { text: "I understand others' positions and build empathy", type: "egen", score: 3 }
            ]
        },
        {
            situation: "When making future plans",
            options: [
                { text: "I systematically establish specific goals and action plans", type: "teto", score: 3 },
                { text: "I set the general direction but maintain flexibility", type: "balanced", score: 1 },
                { text: "I proceed naturally according to intuition and flow", type: "egen", score: 3 }
            ]
        },
        {
            situation: "When I feel accomplished",
            options: [
                { text: "When I achieve goals and create results", type: "teto", score: 3 },
                { text: "When I maintain a balanced life", type: "balanced", score: 1 },
                { text: "When relationships deepen or emotional connections grow", type: "egen", score: 3 }
            ]
        },
        {
            situation: "When preparing for important presentations",
            options: [
                { text: "I focus on thorough material preparation and logical structure", type: "teto", score: 3 },
                { text: "I prepare both content and delivery methods in balance", type: "balanced", score: 1 },
                { text: "I emphasize emotional communication and empathy with the audience", type: "egen", score: 3 }
            ]
        },
        {
            situation: "When facing unexpected changes",
            options: [
                { text: "I quickly assess the situation and respond actively", type: "teto", score: 3 },
                { text: "I carefully observe the situation and adapt gradually", type: "balanced", score: 1 },
                { text: "I fully accept emotions from change before responding", type: "egen", score: 3 }
            ]
        },
        {
            situation: "When leadership is required",
            options: [
                { text: "I lead with clear direction and strong momentum", type: "teto", score: 3 },
                { text: "I adopt appropriate leadership styles for each situation", type: "balanced", score: 1 },
                { text: "I lead collaboratively by gathering members' opinions", type: "egen", score: 3 }
            ]
        },
        {
            situation: "How I use leisure time",
            options: {
                male: [
                    { text: "I prefer competitive activities like sports or games", type: "teto", score: 3 },
                    { text: "I spend time differently depending on my mood", type: "balanced", score: 1 },
                    { text: "I enjoy quiet personal time or cultural activities", type: "egen", score: 3 }
                ],
                female: [
                    { text: "I enjoy active social activities with friends", type: "teto", score: 3 },
                    { text: "Sometimes active, sometimes quiet activities", type: "balanced", score: 1 },
                    { text: "I invest time in personal hobbies or self-development", type: "egen", score: 3 }
                ]
            }
        },
        {
            situation: "My way of expressing emotions",
            options: [
                { text: "I express through actions rather than emotions", type: "teto", score: 3 },
                { text: "I adjust expression methods according to situations", type: "balanced", score: 1 },
                { text: "I express emotions in detailed and rich ways", type: "egen", score: 3 }
            ]
        },
        {
            situation: "My approach to problem-solving",
            options: [
                { text: "I find solutions systematically and step by step", type: "teto", score: 3 },
                { text: "I approach by combining intuition and logic", type: "balanced", score: 1 },
                { text: "I seek creative and flexible methods", type: "egen", score: 3 }
            ]
        }
    ],
    // English gender-specific additional questions
    en_male_specific: [
        {
            situation: "About my identity as a man",
            options: [
                { text: "I value traditional masculinity principles", type: "teto", score: 2 },
                { text: "I pursue a flexible male image for modern times", type: "balanced", score: 1 },
                { text: "I believe emotional and caring aspects are part of masculinity", type: "egen", score: 2 }
            ]
        },
        {
            situation: "Men's role in romantic relationships",
            options: [
                { text: "I think men should be protectors and leaders", type: "teto", score: 2 },
                { text: "I believe roles can change depending on situations", type: "balanced", score: 1 },
                { text: "I value equal partnership and emotional connection", type: "egen", score: 2 }
            ]
        },
        {
            situation: "My perspective on appearance management",
            options: [
                { text: "Basic cleanliness is sufficient", type: "teto", score: 2 },
                { text: "I manage appropriately according to situations", type: "balanced", score: 1 },
                { text: "I'm also interested in skincare and fashion", type: "egen", score: 2 }
            ]
        },
        {
            situation: "Expressing friendship with male friends",
            options: [
                { text: "I build friendship through activities and competition", type: "teto", score: 2 },
                { text: "Sometimes deep, sometimes light interaction", type: "balanced", score: 1 },
                { text: "I share deep conversations and emotional connections", type: "egen", score: 2 }
            ]
        },
        {
            situation: "My attitude toward career and success",
            options: [
                { text: "Achievement and success are important virtues for men", type: "teto", score: 2 },
                { text: "Success is important but I pursue balanced life", type: "balanced", score: 1 },
                { text: "I value personal satisfaction and meaning more", type: "egen", score: 2 }
            ]
        }
    ],
    en_female_specific: [
        {
            situation: "About my identity as a woman",
            options: [
                { text: "I pursue a strong and independent female image", type: "teto", score: 2 },
                { text: "I show various aspects depending on situations", type: "balanced", score: 1 },
                { text: "I value warm and embracing femininity", type: "egen", score: 2 }
            ]
        },
        {
            situation: "Balance between career and family",
            options: [
                { text: "Career success is priority, adjusting family accordingly", type: "teto", score: 2 },
                { text: "I adjust priorities according to situations and timing", type: "balanced", score: 1 },
                { text: "I value family relationships and harmony most", type: "egen", score: 2 }
            ]
        },
        {
            situation: "My leadership style when taking charge",
            options: [
                { text: "I demonstrate decisive and strong leadership", type: "teto", score: 2 },
                { text: "I exercise various leadership styles for different situations", type: "balanced", score: 1 },
                { text: "I pursue leadership based on empathy and communication", type: "egen", score: 2 }
            ]
        },
        {
            situation: "My interest in appearance and fashion",
            options: [
                { text: "I prioritize practicality and convenience", type: "teto", score: 2 },
                { text: "I adjust according to time and place", type: "balanced", score: 1 },
                { text: "I consider beauty and style important", type: "egen", score: 2 }
            ]
        },
        {
            situation: "Relationships with female friends",
            options: [
                { text: "We pursue goals together and motivate each other", type: "teto", score: 2 },
                { text: "We share intimacy in various ways", type: "balanced", score: 1 },
                { text: "We form emotional support and deep empathy", type: "egen", score: 2 }
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
                type: "Teto Male",
                emoji: "💪",
                traits: ["Masculine", "Leadership", "Direct", "Realistic", "Social"],
                description: "A man with strong masculine traits due to high testosterone levels. Interested in sports, games, politics, and enjoys working out at the gym to build muscle. Strives to have a decent job, saves money, and works on self-improvement. Has good relationships with parents and maintains regular social connections with male friends. Simple, positive, and takes pride in his work.",
                tetoLabel: "Teto Male",
                egenLabel: "Egen Male",
                compatibility: [
                    { type: "Egen Female", emoji: "💕", reason: "Different strengths complement each other for balanced relationship. However, communication style differences may cause misunderstandings" },
                    { type: "Teto Female", emoji: "🤝", reason: "Similar goal-oriented nature leads to high understanding, but may develop into competitive relationship" }
                ],
                careers: ["Executive", "Athlete", "Military/Police", "Sales", "Entrepreneur", "Politician", "Real Estate", "Construction"],
                celebrities: [
                    { name: "Bang Chan", profession: "Singer" },
                    { name: "Minho", profession: "Singer" },
                    { name: "Shownu", profession: "Singer" },
                    { name: "Jichang-wook", profession: "Singer" }
                ],
                health: {
                    exercise: ["Weight Training", "Soccer/Basketball", "Running/Jogging", "Hiking"],
                    diet: ["High Protein Diet", "Sufficient Calories for Muscle Gain", "Regular Meals"],
                    stress: ["Goal Achievement Activities", "Sports with Friends", "Competitive Games"]
                },
                growth: [
                    { title: "Improve Emotional Expression", description: "Develop ability to understand and empathize with others' emotions", icon: "❤️" },
                    { title: "Develop Listening Skills", description: "Cultivate habit of listening to others' opinions completely", icon: "👂" },
                    { title: "Cultivate Attention to Detail", description: "Develop sensitivity to small details", icon: "🎯" }
                ]
            },
            egen: {
                type: "Egen Male",
                emoji: "🎨",
                traits: ["Emotional", "Sensitive", "Creative", "Unique", "Trendy"],
                description: "A man with strong feminine traits due to high estrogen levels. Pays great attention to clothing and appearance, knows brands well, and tends to be obsessed with self-care. Interested in interior design and enjoys niche music or artistic activities. Capable of sensitive and interesting conversations like women, prefers cozy places when dating. Socially somewhat passive and tends to be very conscious of what others think.",
                tetoLabel: "Teto Male",
                egenLabel: "Egen Male",
                compatibility: [
                    { type: "Teto Female", emoji: "⚖️", reason: "Different personalities are attractive, but value differences may cause conflict situations" },
                    { type: "Egen Female", emoji: "🌙", reason: "Deep empathy through similar emotions, but relationship may become passive at times" }
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
                    diet: ["Balanced Diet", "Vitamin Intake", "Adequate Hydration"],
                    stress: ["Reading", "Meditation", "Talking with Friends", "Artistic Activities"]
                },
                growth: [
                    { title: "Build Confidence", description: "Recognize your strengths and express them confidently", icon: "💪" },
                    { title: "Improve Decisiveness", description: "Develop quick decision-making abilities", icon: "⚡" },
                    { title: "Develop Social Skills", description: "Increase interactions with diverse people", icon: "🤝" }
                ]
            }
        },
        female: {
            teto: {
                type: "Teto Female",
                emoji: "👑",
                traits: ["Confident", "Independent", "Direct", "Realistic", "Driven"],
                description: "A woman with strong testosterone tendencies, having an independent and confident personality. Goal-oriented with strong leadership and prefers direct communication. Not afraid of competition and clearly expresses her opinions. Has career ambitions and seeks to forge her own path rather than traditional female roles. Prioritizes logic over emotions and has excellent problem-solving abilities.",
                tetoLabel: "Teto Female",
                egenLabel: "Egen Female",
                compatibility: [
                    { type: "Egen Male", emoji: "⚖️", reason: "Mutually complementary relationship enables growth. However, leadership issues may cause conflicts" },
                    { type: "Teto Male", emoji: "🔥", reason: "Both strong personalities enable passionate relationship, but clashes and competition also exist" }
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
                    diet: ["High Protein Low Carb", "Regular Meals", "Supplement Intake"],
                    stress: ["Energy Release through Exercise", "Goal Achievement Activities", "Competitive Games"]
                },
                growth: [
                    { title: "Improve Empathy", description: "Develop understanding and consideration for others' emotions", icon: "💝" },
                    { title: "Cultivate Flexibility", description: "Learn to compromise and yield sometimes", icon: "🌊" },
                    { title: "Express Emotions", description: "Express emotions honestly, not just logic", icon: "🎭" }
                ]
            },
            egen: {
                type: "Egen Female",
                emoji: "🌸",
                traits: ["Emotional", "Caring", "Sensitive", "Gentle", "Social"],
                description: "A woman with strong estrogen tendencies, having many typical feminine characteristics. Rich in emotional expression, sensitive, and deeply caring towards others. Has excellent aesthetic sense and is interested in fashion and beauty. Values harmonious relationships and tends to avoid conflict situations. Makes intuitive and emotional judgments, enjoys arts or creative activities. Values deep emotional bonds with people.",
                tetoLabel: "Teto Female",
                egenLabel: "Egen Female",
                compatibility: [
                    { type: "Teto Male", emoji: "💕", reason: "Stable relationship with traditional male-female roles. However, modern value differences may exist" },
                    { type: "Egen Male", emoji: "🌙", reason: "Deep emotional connection, but may stagnate due to lack of decisiveness at times" }
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
                    diet: ["Balanced Diet", "Fruits and Vegetables", "Adequate Hydration"],
                    stress: ["Chatting with Friends", "Shopping", "Movies/Dramas", "Travel"]
                },
                growth: [
                    { title: "Increase Self-Assertion", description: "Express your opinions more actively", icon: "📢" },
                    { title: "Develop Independence", description: "Increase things you can do on your own", icon: "🦋" },
                    { title: "Set Goals", description: "Set clear goals and pursue them systematically", icon: "🎯" }
                ]
            }
        }
    }
};
