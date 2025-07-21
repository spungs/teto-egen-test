// 테스트 상태 관리
let currentGender = null;
let currentQuestionIndex = 0;
let answers = [];
let tetoScore = 0;
let egenScore = 0;

// 개선된 상황 기반 질문지 데이터 (심리학적 검증 기반)
const questionData = {
    ko: [
        {
            situation: "새로운 직장에서 첫 미팅에 참석할 때",
            options: [
                { text: "미리 자료를 준비하고 적극적으로 의견을 제시한다", type: "teto", score: 3 },
                { text: "분위기를 파악한 후 상황에 맞게 발언한다", type: "balanced", score: 1 },
                { text: "다른 사람들의 이야기를 주의 깊게 듣고 필요할 때만 발언한다", type: "egen", score: 3 }
            ]
        },
        {
            situation: "친구가 힘든 일로 상담을 요청했을 때",
            options: [
                { text: "구체적인 해결방안을 논리적으로 제시해준다", type: "teto", score: 3 },
                { text: "감정을 충분히 들어준 후 상황에 맞는 조언을 한다", type: "balanced", score: 1 },
                { text: "먼저 공감하고 위로하며 감정적 지지를 해준다", type: "egen", score: 3 }
            ]
        },
        {
            situation: "연인과 데이트 장소를 정할 때",
            options: {
                male: [
                    { text: "액티비티나 스포츠 관련 장소를 제안한다", type: "teto", score: 3 },
                    { text: "둘 다 좋아할 만한 절충안을 찾아본다", type: "balanced", score: 1 },
                    { text: "연인이 좋아할 만한 감성적인 장소를 우선 고려한다", type: "egen", score: 3 }
                ],
                female: [
                    { text: "새롭고 도전적인 액티비티를 제안한다", type: "teto", score: 3 },
                    { text: "둘 다 즐길 수 있는 장소를 함께 정한다", type: "balanced", score: 1 },
                    { text: "아름답고 감성적인 카페나 전시회를 선호한다", type: "egen", score: 3 }
                ]
            }
        },
        {
            situation: "중요한 인생 결정을 내려야 할 때",
            options: [
                { text: "데이터와 사실을 기반으로 논리적으로 판단한다", type: "teto", score: 3 },
                { text: "논리와 직감을 모두 고려하여 신중하게 결정한다", type: "balanced", score: 1 },
                { text: "내 마음의 소리와 직감을 더 중요하게 여긴다", type: "egen", score: 3 }
            ]
        },
        {
            situation: "갈등 상황에 직면했을 때",
            options: [
                { text: "문제의 핵심을 파악하고 직접적으로 해결하려 한다", type: "teto", score: 3 },
                { text: "상황을 객관적으로 분석한 후 최선의 방법을 찾는다", type: "balanced", score: 1 },
                { text: "모든 사람의 감정을 고려하여 조화로운 해결책을 찾는다", type: "egen", score: 3 }
            ]
        },
        {
            situation: "스트레스를 받았을 때 대처 방식",
            options: {
                male: [
                    { text: "운동이나 신체 활동으로 스트레스를 해소한다", type: "teto", score: 3 },
                    { text: "상황에 따라 다양한 방법을 시도한다", type: "balanced", score: 1 },
                    { text: "음악감상, 독서 등 조용한 활동으로 마음을 달랜다", type: "egen", score: 3 }
                ],
                female: [
                    { text: "운동이나 적극적인 활동으로 기분전환을 한다", type: "teto", score: 3 },
                    { text: "그때그때 기분에 맞는 방법을 선택한다", type: "balanced", score: 1 },
                    { text: "감성적인 영화나 음악으로 감정을 정리한다", type: "egen", score: 3 }
                ]
            }
        },
        {
            situation: "새로운 사람들과의 모임에서",
            options: [
                { text: "먼저 다가가 대화를 이끌어간다", type: "teto", score: 3 },
                { text: "자연스럽게 대화에 참여한다", type: "balanced", score: 1 },
                { text: "분위기를 살펴본 후 조심스럽게 어울린다", type: "egen", score: 3 }
            ]
        },
        {
            situation: "돈을 쓸 때의 우선순위",
            options: [
                { text: "장기적 투자나 실용적 가치를 우선 고려한다", type: "teto", score: 3 },
                { text: "필요성과 즐거움을 균형있게 고려한다", type: "balanced", score: 1 },
                { text: "현재의 행복과 감정적 만족을 중시한다", type: "egen", score: 3 }
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
            situation: "팀 프로젝트에서 나의 역할",
            options: [
                { text: "리더십을 발휘하여 프로젝트를 이끈다", type: "teto", score: 3 },
                { text: "필요에 따라 리더나 팔로워 역할을 한다", type: "balanced", score: 1 },
                { text: "창의적 아이디어 제공과 세심한 지원을 담당한다", type: "egen", score: 3 }
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
            situation: "중요한 발표나 프레젠테이션 준비할 때",
            options: [
                { text: "철저한 자료 준비와 논리적 구성에 집중한다", type: "teto", score: 3 },
                { text: "내용과 전달 방식을 균형있게 준비한다", type: "balanced", score: 1 },
                { text: "청중과의 감정적 소통과 공감에 중점을 둔다", type: "egen", score: 3 }
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
            situation: "자신의 감정 표현 방식",
            options: [
                { text: "감정보다는 행동으로 표현하는 편이다", type: "teto", score: 3 },
                { text: "상황에 따라 표현 방식을 조절한다", type: "balanced", score: 1 },
                { text: "감정을 세밀하고 풍부하게 표현한다", type: "egen", score: 3 }
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
            situation: "남성으로서의 자아 정체성에 대해",
            options: [
                { text: "전통적인 남성다움의 가치를 중요하게 생각한다", type: "teto", score: 2 },
                { text: "시대에 맞는 유연한 남성상을 추구한다", type: "balanced", score: 1 },
                { text: "감성적이고 세심한 면도 남성다움의 일부라고 본다", type: "egen", score: 2 }
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
            situation: "외모 관리에 대한 관점",
            options: [
                { text: "기본적인 청결함만 유지하면 충분하다", type: "teto", score: 2 },
                { text: "상황에 맞게 적절히 관리한다", type: "balanced", score: 1 },
                { text: "스킨케어나 패션에도 관심이 많다", type: "egen", score: 2 }
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
            situation: "여성으로서의 자아 정체성에 대해",
            options: [
                { text: "강인하고 독립적인 여성상을 추구한다", type: "teto", score: 2 },
                { text: "상황에 따라 다양한 면모를 보여준다", type: "balanced", score: 1 },
                { text: "따뜻하고 포용적인 여성다움을 중요시한다", type: "egen", score: 2 }
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
            situation: "외모나 패션에 대한 관심",
            options: [
                { text: "실용성과 편의성을 우선시한다", type: "teto", score: 2 },
                { text: "때와 장소에 맞게 조절한다", type: "balanced", score: 1 },
                { text: "아름다움과 스타일을 중요하게 생각한다", type: "egen", score: 2 }
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
                type: "테토남",
                emoji: "💪",
                traits: ["남성적", "리더십", "직설적", "현실적", "사교적"],
                description: "테스토스테론 호르몬이 많은 남성적인 면모가 강한 남자입니다. 축구, 게임, 정치 등에 관심이 많고, 헬스장에서 운동하며 근육을 만드는 것을 좋아합니다. 번듯한 직장을 가지려 노력하고, 돈을 모으며 자기계발에 힘씁니다. 부모와 사이가 좋고, 정기적으로 만나는 남자 친구들이 있어 사회적 관계가 탄탄합니다. 단순하고 긍정적이며, 자기 일에 자부심을 가지고 있습니다.",
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
                    { name: "쇼누", profession: "가수" },
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
                type: "에겐남",
                emoji: "🎨",
                traits: ["감성적", "섬세함", "창작적", "개성적", "트렌디"],
                description: "에스트로겐 호르몬이 많은 여성적인 면모가 강한 남자입니다. 옷과 외모에 많은 신경을 쓰고, 브랜드를 잘 알고 있으며 자기관리에 집착하는 경향이 있습니다. 인테리어에 관심이 많고, 매니악한 음악이나 예술 활동을 즐깁니다. 여성과 같은 섬세하고 재미있는 대화가 가능하며, 데이트 시 아기자기한 장소를 선호합니다. 사회적으로는 다소 수동적이며, 주변 사람들의 눈치를 많이 보는 편입니다.",
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
                type: "테토녀",
                emoji: "👑",
                traits: ["당당함", "독립적", "직설적", "현실적", "추진력"],
                description: "테스토스테론 성향이 강한 여성으로, 독립적이고 당당한 성격을 가지고 있습니다. 목표 지향적이며 리더십이 강하고, 직설적인 소통을 선호합니다. 경쟁을 두려워하지 않고, 자신의 의견을 확실히 표현합니다. 커리어에 대한 야망이 있고, 전통적인 여성의 역할보다는 자신만의 길을 개척하려 합니다. 감정보다는 논리를 우선시하며, 문제 해결 능력이 뛰어납니다.",
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
                type: "에겐녀",
                emoji: "🌸",
                traits: ["감성적", "배려심", "섬세함", "온화함", "사교적"],
                description: "에스트로겐 성향이 강한 여성으로, 전형적인 여성스러운 특징을 많이 가지고 있습니다. 감정 표현이 풍부하고 섬세하며, 타인에 대한 배려심이 깊습니다. 미적 감각이 뛰어나고 패션이나 뷰티에 관심이 많습니다. 조화로운 관계를 중시하며, 갈등 상황을 피하려는 경향이 있습니다. 직관적이고 감성적인 판단을 하며, 예술이나 창작 활동을 즐깁니다. 사람들과의 깊은 정서적 유대를 중요하게 생각합니다.",
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

// DOM 요소들
let screens = {};

// 이벤트 리스너 설정
document.addEventListener('DOMContentLoaded', function() {
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
    
    // 언어 설정은 translations.js에서 자동으로 처리됨
    // console.log('🚀 앱 초기화 완료');
}

function setupEventListeners() {
    // 성별 선택 버튼
    document.querySelectorAll('.gender-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            selectGender(this.dataset.gender);
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
}

function selectGender(gender) {
    currentGender = gender;
    
    // 버튼 상태 업데이트
    document.querySelectorAll('.gender-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    document.querySelector(`[data-gender="${gender}"]`).classList.add('selected');
    
    // 시작 버튼 활성화
    document.getElementById('start-btn').disabled = false;
}

function startTest() {
    if (!currentGender) return;
    
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
    
    // console.log('🔄 점수 재계산:', {
    //     questionIndex: currentQuestionIndex,
    //     tetoScore: tetoScore,
    //     egenScore: egenScore,
    //     answeredQuestions: answers.slice(0, currentQuestionIndex + 1).filter(Boolean).length
    // });
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
    
    const result = resultData[currentLanguage][currentGender][isTetoType ? 'teto' : 'egen'];
    
    // console.log('📊 결과 표시:', {
    //     language: currentLanguage,
    //     gender: currentGender,
    //     tetoScore: tetoScore,
    //     egenScore: egenScore,
    //     isTetoType: isTetoType,
    //     resultType: result.type
    // });
    
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
    
    // console.log('🧮 궁합도 계산:', {
    //     tetoScore: tetoScore,
    //     egenScore: egenScore,
    //     userTetoRatio: userTetoRatio,
    //     userEgenRatio: userEgenRatio
    // });
    
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
        
        // console.log(`💕 ${item.type} 최종 궁합:`, {
        //     rawScore: item.rawScore,
        //     normalizedScore: item.normalizedScore
        // });
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
    
    // console.log(`💕 ${partnerType} Helen Fisher 이론 기반 궁합:`, {
    //     userRatio: `테토${Math.round(userTetoRatio*100)}% / 에겐${Math.round(userEgenRatio*100)}%`,
    //     isOppositeAttraction: partnerType.includes('에겐') ? '테토→에겐 끌림' : '에겐→테토 끌림',
    //     finalScore: finalScore,
    //     theory: 'Director(테토) ↔ Negotiator(에겐) 강한 상호 끌림'
    // });
    
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
    showScreen('start');
    currentGender = null;
    currentQuestionIndex = 0;
    answers = [];
    tetoScore = 0;
    egenScore = 0;
    
    // 성별 선택 초기화
    document.querySelectorAll('.gender-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    document.getElementById('start-btn').disabled = true;
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
    
    // 원본 텍스트 미리 저장
    const originalText = saveBtn.textContent;
    
    try {
        // 버튼 로딩 상태
        saveBtn.textContent = currentLanguage === 'ko' ? '📸 생성 중...' : '📸 Generating...';
        saveBtn.disabled = true;
        
        // 캡처할 핵심 영역 선택 (헤더 + 특징 + 상세설명 + 점수 + 연애궁합)
        const resultHeader = document.querySelector('.result-header');
        const resultDescription = document.querySelector('.result-description');
        const resultDetailed = document.querySelector('.result-detailed');
        const resultScore = document.querySelector('.result-score');
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
        
        // 컨테이너를 DOM에 잠시 추가하여 크기 계산
        document.body.appendChild(tempContainer);
        
        // 실제 크기 측정 후 다시 숨김
        const containerWidth = tempContainer.offsetWidth;
        const containerHeight = tempContainer.offsetHeight;
        
        // 윈도우별 Canvas 설정
        let canvas;
        try {
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
                onclone: function(clonedDoc) {
                    // 모든 복잡한 스타일 제거
                    const allElements = clonedDoc.querySelectorAll('*');
                    allElements.forEach(el => {
                        // 복잡한 CSS 속성들 제거
                        el.style.backgroundImage = 'none';
                        el.style.boxShadow = 'none';
                        el.style.textShadow = 'none';
                        el.style.filter = 'none';
                        el.style.webkitBackgroundClip = 'unset';
                        el.style.backgroundClip = 'unset';
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
                canvasOptions.scale = 1.5; // 윈도우에서는 스케일 줄임
            } else {
                canvasOptions.useCORS = true;
                canvasOptions.allowTaint = false;
                canvasOptions.foreignObjectRendering = true;
            }
            
            canvas = await html2canvas(tempContainer, canvasOptions);
            
        } catch (error) {
            console.error('첫 번째 Canvas 생성 실패, 안전 모드로 재시도:', error);
            
            // 두 번째 시도: 안전 모드 (윈도우용)
            try {
                canvas = await html2canvas(tempContainer, {
                    backgroundColor: '#2c3e50',
                    scale: 1,
                    useCORS: false,
                    allowTaint: true,
                    foreignObjectRendering: false,
                    logging: false,
                    imageTimeout: 60000,
                    width: containerWidth,
                    height: containerHeight,
                    onclone: function(clonedDoc) {
                        // 최소한의 스타일만 유지
                        const allElements = clonedDoc.querySelectorAll('*');
                        allElements.forEach(el => {
                            const computedStyle = window.getComputedStyle(el);
                            el.style.backgroundImage = 'none';
                            el.style.background = computedStyle.backgroundColor || 'transparent';
                        });
                    }
                });
            } catch (secondError) {
                console.error('두 번째 Canvas 생성도 실패:', secondError);
                throw new Error('Canvas 생성에 실패했습니다.');
            }
        }
        
        // 임시 컨테이너 제거
        document.body.removeChild(tempContainer);
        
        // Canvas를 Blob으로 변환
        canvas.toBlob(async (blob) => {
            if (!blob) {
                throw new Error('Canvas to blob conversion failed');
            }
            
            const resultType = document.getElementById('result-type').textContent;
            const fileName = `teto-egen-result-${resultType}.png`;
            
            // 플랫폼 감지 및 통일된 처리 방식
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            const isWindows = navigator.platform.indexOf('Win') > -1;
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
            const isAndroid = /Android/.test(navigator.userAgent);
            
            // 디버깅 정보 (개발 중에만 사용)
            // console.log('🔍 플랫폼 정보:', {
            //     userAgent: navigator.userAgent,
            //     platform: navigator.platform,
            //     isMobile: isMobile,
            //     isWindows: isWindows,
            //     isIOS: isIOS,
            //     isAndroid: isAndroid,
            //     hasShareAPI: !!navigator.share,
            //     hasFileAPI: !!window.File,
            //     hasCanShare: !!navigator.canShare
            // });
            
            // 모바일에서 네이티브 공유 지원하는 경우 (iOS Safari, Android Chrome 등)
            if (isMobile && navigator.share && window.File && navigator.canShare && (isIOS || isAndroid)) {
                try {
                    const file = new File([blob], fileName, { type: 'image/png' });
                    
                    if (navigator.canShare({ files: [file] })) {
                        await navigator.share({
                            title: `나는 ${resultType}!`,
                            text: `테토-에겐 성격 유형 테스트 결과: ${resultType}`,
                            files: [file]
                        });
                        return; // 성공시 함수 종료
                    }
                } catch (shareError) {
                    console.error('네이티브 공유 실패, 다운로드로 전환:', shareError);
                }
            }
            
            // 데스크톱 또는 네이티브 공유 실패시: 통일된 다운로드 방식
            downloadImage(blob, fileName);
            
        }, 'image/png', 0.9);
        
    } catch (error) {
        console.error('이미지 저장 실패:', error);
        const message = currentLanguage === 'ko' ? 
            '이미지 저장에 실패했습니다. 다시 시도해주세요.' : 
            'Failed to save image. Please try again.';
        alert(message);
    } finally {
        // 버튼 복원
        saveBtn.textContent = originalText;
        saveBtn.disabled = false;
    }
}

// 이미지 다운로드 헬퍼 함수 (크로스 플랫폼 호환성 개선)
function downloadImage(blob, fileName) {
    const isWindows = navigator.platform.indexOf('Win') > -1;
    
    try {
        // 윈도우 전용 다운로드 방식
        if (isWindows) {
            // 방법 1: 윈도우용 안전한 다운로드
            const url = URL.createObjectURL(blob);
            
            // 사용자 제스처를 시뮬레이션하기 위해 임시 버튼 생성
            const tempButton = document.createElement('button');
            tempButton.style.display = 'none';
            document.body.appendChild(tempButton);
            
            tempButton.addEventListener('click', function() {
                const a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                a.style.display = 'none';
                a.target = '_self'; // 윈도우에서 더 안전한 타겟
                document.body.appendChild(a);
                
                // 강제 클릭 이벤트
                if (a.click) {
                    a.click();
                } else {
                    // IE 호환성
                    const event = document.createEvent('MouseEvents');
                    event.initEvent('click', true, true);
                    a.dispatchEvent(event);
                }
                
                document.body.removeChild(a);
            });
            
            // 임시 버튼 클릭
            tempButton.click();
            document.body.removeChild(tempButton);
            
            // 메모리 정리
            setTimeout(() => {
                URL.revokeObjectURL(url);
            }, 2000);
            
        } else {
            // 다른 플랫폼용 표준 다운로드
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            // 메모리 정리
            setTimeout(() => {
                URL.revokeObjectURL(url);
            }, 1000);
        }
        
        const message = currentLanguage === 'ko' ? 
            '이미지가 다운로드되었습니다! 📥' : 
            'Image downloaded! 📥';
        
        // 다운로드 성공 메시지를 약간 지연 후 표시
        setTimeout(() => {
            alert(message);
        }, 500);
        
    } catch (error) {
        console.error('다운로드 실패, 대체 방법 시도:', error);
        
        // 방법 2: 새 창에서 열기
        try {
            const url = URL.createObjectURL(blob);
            
            // 윈도우에서는 window.open 대신 location.href 사용
            if (isWindows) {
                const newTab = window.open('', '_blank');
                if (newTab) {
                    newTab.location.href = url;
                    const message = currentLanguage === 'ko' ? 
                        '새 탭에서 이미지가 열렸습니다. 우클릭하여 저장하세요.' : 
                        'Image opened in new tab. Right-click to save.';
                    alert(message);
                } else {
                    throw new Error('새 탭 열기 실패');
                }
            } else {
                const newWindow = window.open(url, '_blank');
                if (newWindow) {
                    const message = currentLanguage === 'ko' ? 
                        '새 창에서 이미지가 열렸습니다. 우클릭하여 저장하세요.' : 
                        'Image opened in new window. Right-click to save.';
                    alert(message);
                } else {
                    throw new Error('팝업이 차단됨');
                }
            }
            
            // 메모리 정리
            setTimeout(() => {
                URL.revokeObjectURL(url);
            }, 5000);
            
        } catch (fallbackError) {
            console.error('대체 방법도 실패:', fallbackError);
            
            // 방법 3: 사용자에게 안내
            const message = currentLanguage === 'ko' ? 
                '자동 다운로드에 실패했습니다.\n\n해결 방법:\n1. 브라우저 설정에서 다운로드 허용\n2. 팝업 차단 해제\n3. 다른 브라우저 시도 (Chrome 권장)' : 
                'Auto download failed.\n\nSolutions:\n1. Allow downloads in browser settings\n2. Disable popup blocker\n3. Try different browser (Chrome recommended)';
            alert(message);
        }
    }
}

// 📱 개선된 공유 기능 (이미지 + 텍스트)
async function shareResultWithImage() {
    const resultType = document.getElementById('result-type').textContent;
    const resultEmoji = document.getElementById('result-emoji').textContent;
    const resultContainer = document.querySelector('.result-container');
    
    try {
        // 이미지 생성
        resultContainer.classList.add('result-for-image');
        const canvas = await html2canvas(resultContainer, {
            backgroundColor: null,
            scale: 1.5,
            useCORS: true
        });
        resultContainer.classList.remove('result-for-image');
        
        canvas.toBlob(async (blob) => {
            const shareTexts = {
                ko: `나는 ${resultType}! ${resultEmoji}\n\n테토-에겐 성격 유형 테스트\n${window.location.href}`,
                en: `I am ${resultType}! ${resultEmoji}\n\nTeto-Egen Personality Test\n${window.location.href}`
            };
            
            const file = new File([blob], `teto-egen-${resultType}.png`, { type: 'image/png' });
            
            if (navigator.share && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    title: `테토-에겐 테스트 결과: ${resultType}`,
                    text: shareTexts[currentLanguage],
                    files: [file]
                });
            } else {
                // 폴백: 기존 텍스트 공유
                shareResult();
            }
        }, 'image/png');
        
    } catch (error) {
        console.error('이미지 공유 실패:', error);
        // 폴백: 기존 텍스트 공유
        shareResult();
    }
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
        
        // console.log('✅ 결과 내용 언어 업데이트 완료:', currentLanguage);
    }
}

 

 