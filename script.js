// 테스트 상태 관리
let currentGender = null;
let currentQuestionIndex = 0;
let answers = [];
let tetoScore = 0;
let egenScore = 0;

// 상황 기반 질문지 데이터
const questionData = {
    ko: [
        {
            situation: "친구들과 쇼핑몰에 갔을 때",
            options: [
                { text: "마음에 드는 옷이 있으면 브랜드나 가격보다 편안함을 우선 고려한다", type: "teto", score: 4 },
                { text: "유명 브랜드나 트렌디한 디자인의 옷을 주로 찾아본다", type: "egen", score: 4 },
                { text: "친구들 의견을 물어보고 결정한다", type: "egen", score: 2 }
            ]
        },
        {
            situation: "주말 저녁 시간에",
            options: {
                male: [
                    { text: "헬스장에서 운동하거나 친구들과 축구를 한다", type: "teto", score: 4 },
                    { text: "카페에서 감성적인 음악을 들으며 혼자만의 시간을 보낸다", type: "egen", score: 4 },
                    { text: "집에서 넷플릭스를 보며 휴식을 취한다", type: "egen", score: 2 }
                ],
                female: [
                    { text: "헬스장에서 운동하거나 친구들과 함께 액티비티를 즐긴다", type: "teto", score: 4 },
                    { text: "카페에서 감성적인 음악을 들으며 혼자만의 시간을 보낸다", type: "egen", score: 4 },
                    { text: "집에서 넷플릭스를 보며 휴식을 취한다", type: "egen", score: 2 }
                ]
            }
        },
        {
            situation: "새로운 사람들과 만났을 때",
            options: [
                { text: "먼저 대화를 시작하고 분위기를 이끌어간다", type: "teto", score: 4 },
                { text: "상대방을 관찰하면서 조심스럽게 접근한다", type: "egen", score: 3 },
                { text: "누군가 먼저 말을 걸어주기를 기다린다", type: "egen", score: 2 }
            ]
        },
        {
            situation: "스트레스를 받았을 때",
            options: {
                male: [
                    { text: "운동이나 술을 마시며 스트레스를 푼다", type: "teto", score: 4 },
                    { text: "혼자 있으면서 감성적인 활동으로 마음을 달랜다", type: "egen", score: 4 },
                    { text: "친한 사람과 대화하며 감정을 공유한다", type: "egen", score: 3 }
                ],
                female: [
                    { text: "운동이나 쇼핑을 하며 스트레스를 푼다", type: "teto", score: 4 },
                    { text: "혼자 있으면서 감성적인 활동으로 마음을 달랜다", type: "egen", score: 4 },
                    { text: "친한 사람과 대화하며 감정을 공유한다", type: "egen", score: 3 }
                ]
            }
        },
        {
            situation: "돈을 쓸 때",
            options: [
                { text: "미래를 위한 투자나 실용적인 것에 먼저 쓴다", type: "teto", score: 4 },
                { text: "외모 관리나 취미 활동에 아낌없이 투자한다", type: "egen", score: 4 },
                { text: "필요한 것만 사고 나머지는 저축한다", type: "teto", score: 2 }
            ]
        },
        {
            situation: "갈등 상황에서",
            options: [
                { text: "직접적으로 문제를 제기하고 해결책을 찾는다", type: "teto", score: 4 },
                { text: "감정이 상하지 않도록 조심스럽게 접근한다", type: "egen", score: 4 },
                { text: "가능하면 갈등을 피하고 시간이 해결해주길 기다린다", type: "egen", score: 3 }
            ]
        },
        {
            situation: "SNS를 사용할 때",
            options: [
                { text: "특별한 일이 있을 때만 가끔 올린다", type: "teto", score: 3 },
                { text: "일상을 예쁘게 꾸며서 자주 올린다", type: "egen", score: 4 },
                { text: "거의 사용하지 않거나 보기만 한다", type: "teto", score: 2 }
            ]
        },
        {
            situation: "집을 꾸밀 때",
            options: [
                { text: "실용성과 편의성을 가장 중요하게 생각한다", type: "teto", score: 4 },
                { text: "미적 감각과 분위기를 중시한다", type: "egen", score: 4 },
                { text: "기본적인 가구만 있으면 충분하다", type: "teto", score: 2 }
            ]
        },
        {
            situation: "친구가 고민 상담을 요청했을 때",
            options: [
                { text: "구체적인 해결책을 제시해준다", type: "teto", score: 4 },
                { text: "감정을 공감해주고 위로해준다", type: "egen", score: 4 },
                { text: "조언보다는 들어주는 역할을 한다", type: "egen", score: 3 }
            ]
        },
        {
            situation: "새로운 도전 앞에서",
            options: [
                { text: "계획을 세우고 적극적으로 도전한다", type: "teto", score: 4 },
                { text: "신중하게 고민한 후 결정한다", type: "egen", score: 3 },
                { text: "다른 사람들의 의견을 많이 구한다", type: "egen", score: 2 }
            ]
        },
        {
            situation: "데이트할 때",
            options: {
                male: [
                    { text: "활동적인 장소나 맛집을 선호한다", type: "teto", score: 4 },
                    { text: "감성적이고 아기자기한 카페나 전시회를 좋아한다", type: "egen", score: 4 },
                    { text: "상대방이 원하는 곳에 맞춰준다", type: "egen", score: 2 }
                ],
                female: [
                    { text: "액티비티나 새로운 맛집을 탐험하고 싶다", type: "teto", score: 4 },
                    { text: "감성적이고 아기자기한 카페나 전시회를 좋아한다", type: "egen", score: 4 },
                    { text: "상대방이 원하는 곳에 맞춰준다", type: "egen", score: 2 }
                ]
            }
        },
        {
            situation: "팀 프로젝트에서",
            options: [
                { text: "리더 역할을 맡아 팀을 이끈다", type: "teto", score: 4 },
                { text: "창의적인 아이디어를 제안한다", type: "egen", score: 4 },
                { text: "주어진 역할을 성실히 수행한다", type: "teto", score: 2 }
            ]
        },
        {
            situation: "여가 시간에",
            options: {
                male: [
                    { text: "친구들과 만나 스포츠나 게임을 한다", type: "teto", score: 4 },
                    { text: "혼자서 취미 활동이나 문화생활을 즐긴다", type: "egen", score: 4 },
                    { text: "집에서 편안하게 쉰다", type: "egen", score: 2 }
                ],
                female: [
                    { text: "친구들과 만나 쇼핑이나 브런치를 즐긴다", type: "teto", score: 4 },
                    { text: "혼자서 취미 활동이나 문화생활을 즐긴다", type: "egen", score: 4 },
                    { text: "집에서 편안하게 쉰다", type: "egen", score: 2 }
                ]
            }
        },
        {
            situation: "의견 충돌이 있을 때",
            options: [
                { text: "자신의 의견을 확실히 표현한다", type: "teto", score: 4 },
                { text: "상대방의 입장을 먼저 이해하려 한다", type: "egen", score: 4 },
                { text: "타협점을 찾으려고 노력한다", type: "egen", score: 3 }
            ]
        },
        {
            situation: "중요한 결정을 내릴 때",
            options: [
                { text: "논리적으로 분석해서 결정한다", type: "teto", score: 4 },
                { text: "직감과 감정을 중요하게 생각한다", type: "egen", score: 4 },
                { text: "주변 사람들의 조언을 구한다", type: "egen", score: 2 }
            ]
        },
        {
            situation: "성취감을 느낄 때",
            options: [
                { text: "목표를 달성했을 때", type: "teto", score: 4 },
                { text: "창작이나 표현 활동을 완성했을 때", type: "egen", score: 4 },
                { text: "다른 사람들로부터 인정받을 때", type: "egen", score: 3 }
            ]
        },
        {
            situation: "파티나 모임에서",
            options: [
                { text: "많은 사람들과 활발하게 대화한다", type: "teto", score: 4 },
                { text: "가까운 몇 명과 깊은 대화를 나눈다", type: "egen", score: 4 },
                { text: "분위기를 즐기면서 적당히 참여한다", type: "egen", score: 2 }
            ]
        },
        {
            situation: "실패했을 때",
            options: [
                { text: "빨리 털어내고 다음 기회를 준비한다", type: "teto", score: 4 },
                { text: "충분히 감정을 느끼고 다음에 더 잘하려 한다", type: "egen", score: 4 },
                { text: "다른 사람들에게 위로를 구한다", type: "egen", score: 2 }
            ]
        },
        {
            situation: "일할 때",
            options: [
                { text: "효율성과 결과를 중시한다", type: "teto", score: 4 },
                { text: "창의성과 과정을 중요하게 여긴다", type: "egen", score: 4 },
                { text: "안정성과 협업을 선호한다", type: "egen", score: 2 }
            ]
        },
        {
            situation: "관심사를 선택할 때",
            options: [
                { text: "스포츠, 정치, 경제 등 사회적 이슈", type: "teto", score: 4 },
                { text: "예술, 문화, 감성적 콘텐츠", type: "egen", score: 4 },
                { text: "일상적이고 실용적인 정보", type: "teto", score: 2 }
            ]
        }
    ],
    // 한국어 성별별 추가 질문
    ko_male_specific: [
        {
            situation: "군복무에 대한 생각",
            options: [
                { text: "남성의 의무이고 좋은 경험이라고 생각한다", type: "teto", score: 4 },
                { text: "개인의 선택이어야 한다고 생각한다", type: "egen", score: 4 },
                { text: "필요악이지만 어쩔 수 없다고 생각한다", type: "teto", score: 2 }
            ]
        },
        {
            situation: "남성다움이란",
            options: [
                { text: "책임감과 리더십을 갖추는 것", type: "teto", score: 4 },
                { text: "감정 표현과 소통 능력이 중요", type: "egen", score: 4 },
                { text: "시대에 따라 변하는 개념", type: "egen", score: 3 }
            ]
        },
        {
            situation: "외모 관리에 대해",
            options: [
                { text: "기본적인 청결함만 유지하면 충분", type: "teto", score: 4 },
                { text: "스킨케어와 패션에 꽤 신경 쓴다", type: "egen", score: 4 },
                { text: "상황에 따라 적당히 관리한다", type: "teto", score: 2 }
            ]
        },
        {
            situation: "브로맨스(남성 간의 우정)에서",
            options: [
                { text: "함께 운동하거나 게임하며 시간을 보낸다", type: "teto", score: 4 },
                { text: "깊은 대화나 감정 교류를 중시한다", type: "egen", score: 4 },
                { text: "가볍게 만나서 즐기는 게 좋다", type: "teto", score: 2 }
            ]
        },
        {
            situation: "이성과의 관계에서",
            options: [
                { text: "남성이 주도적인 역할을 해야 한다", type: "teto", score: 4 },
                { text: "서로 평등하고 감정적으로 교감해야 한다", type: "egen", score: 4 },
                { text: "상황에 따라 역할이 달라질 수 있다", type: "egen", score: 3 }
            ]
        }
    ],
    ko_female_specific: [
        {
            situation: "커리어와 가정의 균형",
            options: [
                { text: "커리어 성공이 우선이고 가정은 그 다음", type: "teto", score: 4 },
                { text: "가정의 화목이 더 중요하다", type: "egen", score: 4 },
                { text: "둘 다 중요하지만 시기마다 우선순위가 다르다", type: "egen", score: 2 }
            ]
        },
        {
            situation: "여성다움이란",
            options: [
                { text: "배려심과 포용력을 갖추는 것", type: "egen", score: 4 },
                { text: "자신의 의견을 당당하게 표현하는 것", type: "teto", score: 4 },
                { text: "개인마다 다르게 정의될 수 있다", type: "egen", score: 2 }
            ]
        },
        {
            situation: "뷰티 루틴에 대해",
            options: [
                { text: "시간 대비 효율성을 중시한 간단한 관리", type: "teto", score: 4 },
                { text: "꼼꼼하고 세밀한 관리 과정을 즐긴다", type: "egen", score: 4 },
                { text: "기분에 따라 달라진다", type: "egen", score: 2 }
            ]
        },
        {
            situation: "여성 친구들과의 시간",
            options: [
                { text: "목표 지향적인 활동이나 토론을 선호", type: "teto", score: 4 },
                { text: "감정과 일상을 나누는 시간을 중시", type: "egen", score: 4 },
                { text: "함께 있는 것만으로도 만족", type: "egen", score: 3 }
            ]
        },
        {
            situation: "이성과의 관계에서",
            options: [
                { text: "서로 독립적이면서 동등한 관계를 원한다", type: "teto", score: 4 },
                { text: "감정적 교감과 로맨틱한 분위기를 중시한다", type: "egen", score: 4 },
                { text: "상황에 따라 다양한 모습을 보인다", type: "egen", score: 3 }
            ]
        }
    ],
    en: [
        {
            situation: "When shopping with friends",
            options: [
                { text: "I prioritize comfort over brand or price when I like something", type: "teto", score: 4 },
                { text: "I mainly look for famous brands or trendy designs", type: "egen", score: 4 },
                { text: "I ask friends for their opinions before deciding", type: "egen", score: 2 }
            ]
        },
        {
            situation: "On weekend evenings",
            options: {
                male: [
                    { text: "I work out at the gym or play soccer with friends", type: "teto", score: 4 },
                    { text: "I spend alone time listening to emotional music at a cafe", type: "egen", score: 4 },
                    { text: "I relax at home watching Netflix", type: "egen", score: 2 }
                ],
                female: [
                    { text: "I work out at the gym or play badminton with friends", type: "teto", score: 4 },
                    { text: "I spend alone time listening to emotional music at a cafe", type: "egen", score: 4 },
                    { text: "I relax at home watching Netflix", type: "egen", score: 2 }
                ]
            }
        },
        {
            situation: "When meeting new people",
            options: [
                { text: "I start conversations first and lead the atmosphere", type: "teto", score: 4 },
                { text: "I observe others and approach them carefully", type: "egen", score: 3 },
                { text: "I wait for someone else to talk to me first", type: "egen", score: 2 }
            ]
        },
        {
            situation: "When feeling stressed",
            options: {
                male: [
                    { text: "I relieve stress through exercise or drinking", type: "teto", score: 4 },
                    { text: "I calm myself through emotional activities alone", type: "egen", score: 4 },
                    { text: "I talk to close people and share my feelings", type: "egen", score: 3 }
                ],
                female: [
                    { text: "I relieve stress through exercise or shopping", type: "teto", score: 4 },
                    { text: "I calm myself through emotional activities alone", type: "egen", score: 4 },
                    { text: "I talk to close people and share my feelings", type: "egen", score: 3 }
                ]
            }
        },
        {
            situation: "When spending money",
            options: [
                { text: "I spend on investments or practical things for the future first", type: "teto", score: 4 },
                { text: "I invest generously in appearance care or hobbies", type: "egen", score: 4 },
                { text: "I only buy what I need and save the rest", type: "teto", score: 2 }
            ]
        },
        {
            situation: "In conflict situations",
            options: [
                { text: "I directly address the problem and find solutions", type: "teto", score: 4 },
                { text: "I approach carefully to avoid hurt feelings", type: "egen", score: 4 },
                { text: "I avoid conflict when possible and wait for time to resolve it", type: "egen", score: 3 }
            ]
        },
        {
            situation: "When using social media",
            options: [
                { text: "I only post occasionally when something special happens", type: "teto", score: 3 },
                { text: "I often post my daily life beautifully arranged", type: "egen", score: 4 },
                { text: "I rarely use it or just browse", type: "teto", score: 2 }
            ]
        },
        {
            situation: "When decorating home",
            options: [
                { text: "I prioritize practicality and convenience most", type: "teto", score: 4 },
                { text: "I value aesthetic sense and atmosphere", type: "egen", score: 4 },
                { text: "Basic furniture is enough for me", type: "teto", score: 2 }
            ]
        },
        {
            situation: "When a friend asks for advice",
            options: [
                { text: "I provide specific solutions", type: "teto", score: 4 },
                { text: "I empathize with their emotions and comfort them", type: "egen", score: 4 },
                { text: "I focus on listening rather than giving advice", type: "egen", score: 3 }
            ]
        },
        {
            situation: "Facing new challenges",
            options: [
                { text: "I make plans and actively take on the challenge", type: "teto", score: 4 },
                { text: "I think carefully before deciding", type: "egen", score: 3 },
                { text: "I seek many opinions from others", type: "egen", score: 2 }
            ]
        },
        {
            situation: "When dating",
            options: {
                male: [
                    { text: "I prefer active places or good restaurants", type: "teto", score: 4 },
                    { text: "I like emotional and cozy cafes or exhibitions", type: "egen", score: 4 },
                    { text: "I accommodate what my partner wants", type: "egen", score: 2 }
                ],
                female: [
                    { text: "I prefer activities or exploring new restaurants", type: "teto", score: 4 },
                    { text: "I like emotional and cozy cafes or exhibitions", type: "egen", score: 4 },
                    { text: "I accommodate what my partner wants", type: "egen", score: 2 }
                ]
            }
        },
        {
            situation: "In team projects",
            options: [
                { text: "I take the leader role and guide the team", type: "teto", score: 4 },
                { text: "I propose creative ideas", type: "egen", score: 4 },
                { text: "I faithfully perform my assigned role", type: "teto", score: 2 }
            ]
        },
        {
            situation: "During leisure time",
            options: {
                male: [
                    { text: "I meet friends and play sports or games", type: "teto", score: 4 },
                    { text: "I enjoy hobbies or cultural activities alone", type: "egen", score: 4 },
                    { text: "I relax comfortably at home", type: "egen", score: 2 }
                ],
                female: [
                    { text: "I meet friends for shopping or brunch", type: "teto", score: 4 },
                    { text: "I enjoy hobbies or cultural activities alone", type: "egen", score: 4 },
                    { text: "I relax comfortably at home", type: "egen", score: 2 }
                ]
            }
        },
        {
            situation: "When there are conflicting opinions",
            options: [
                { text: "I clearly express my opinion", type: "teto", score: 4 },
                { text: "I try to understand the other person's position first", type: "egen", score: 4 },
                { text: "I try to find a compromise", type: "egen", score: 3 }
            ]
        },
        {
            situation: "When making important decisions",
            options: [
                { text: "I analyze logically and decide", type: "teto", score: 4 },
                { text: "I value intuition and emotions", type: "egen", score: 4 },
                { text: "I seek advice from people around me", type: "egen", score: 2 }
            ]
        },
        {
            situation: "When feeling accomplished",
            options: [
                { text: "When I achieve my goals", type: "teto", score: 4 },
                { text: "When I complete creative or expressive activities", type: "egen", score: 4 },
                { text: "When I receive recognition from others", type: "egen", score: 3 }
            ]
        },
        {
            situation: "At parties or gatherings",
            options: [
                { text: "I actively talk with many people", type: "teto", score: 4 },
                { text: "I have deep conversations with a few close people", type: "egen", score: 4 },
                { text: "I enjoy the atmosphere and participate moderately", type: "egen", score: 2 }
            ]
        },
        {
            situation: "When I fail",
            options: [
                { text: "I quickly shake it off and prepare for the next opportunity", type: "teto", score: 4 },
                { text: "I fully feel the emotions and try to do better next time", type: "egen", score: 4 },
                { text: "I seek comfort from others", type: "egen", score: 2 }
            ]
        },
        {
            situation: "When working",
            options: [
                { text: "I value efficiency and results", type: "teto", score: 4 },
                { text: "I consider creativity and process important", type: "egen", score: 4 },
                { text: "I prefer stability and collaboration", type: "egen", score: 2 }
            ]
        },
        {
            situation: "When choosing interests",
            options: [
                { text: "Sports, politics, economics and other social issues", type: "teto", score: 4 },
                { text: "Arts, culture, and emotional content", type: "egen", score: 4 },
                { text: "Daily and practical information", type: "teto", score: 2 }
            ]
        }
    ],
    // 영어 성별별 추가 질문
    en_male_specific: [
        {
            situation: "About military service",
            options: [
                { text: "It's a male duty and good experience", type: "teto", score: 4 },
                { text: "It should be individual choice", type: "egen", score: 4 },
                { text: "It's necessary evil but inevitable", type: "teto", score: 2 }
            ]
        },
        {
            situation: "Masculinity means",
            options: [
                { text: "Having responsibility and leadership", type: "teto", score: 4 },
                { text: "Emotional expression and communication skills are important", type: "egen", score: 4 },
                { text: "A concept that changes with times", type: "egen", score: 3 }
            ]
        },
        {
            situation: "About appearance management",
            options: [
                { text: "Basic cleanliness is sufficient", type: "teto", score: 4 },
                { text: "I pay quite attention to skincare and fashion", type: "egen", score: 4 },
                { text: "I manage appropriately depending on situation", type: "teto", score: 2 }
            ]
        },
        {
            situation: "In bromance (friendship between men)",
            options: [
                { text: "Spend time exercising or gaming together", type: "teto", score: 4 },
                { text: "Value deep conversations and emotional exchange", type: "egen", score: 4 },
                { text: "Like to meet casually and have fun", type: "teto", score: 2 }
            ]
        },
        {
            situation: "In relationships with opposite sex",
            options: [
                { text: "Men should take the leading role", type: "teto", score: 4 },
                { text: "Should be equal and emotionally connected", type: "egen", score: 4 },
                { text: "Roles can vary depending on situation", type: "egen", score: 3 }
            ]
        }
    ],
    en_female_specific: [
        {
            situation: "Balance between career and family",
            options: [
                { text: "Career success comes first, family second", type: "teto", score: 4 },
                { text: "Family harmony is more important", type: "egen", score: 4 },
                { text: "Both important but priorities differ by time", type: "egen", score: 2 }
            ]
        },
        {
            situation: "Femininity means",
            options: [
                { text: "Having care and tolerance", type: "egen", score: 4 },
                { text: "Expressing one's opinions confidently", type: "teto", score: 4 },
                { text: "Can be defined differently by each person", type: "egen", score: 2 }
            ]
        },
        {
            situation: "About beauty routine",
            options: [
                { text: "Simple care emphasizing time efficiency", type: "teto", score: 4 },
                { text: "Enjoy thorough and detailed care process", type: "egen", score: 4 },
                { text: "Depends on mood", type: "egen", score: 2 }
            ]
        },
        {
            situation: "Time with female friends",
            options: [
                { text: "Prefer goal-oriented activities or discussions", type: "teto", score: 4 },
                { text: "Value time sharing emotions and daily life", type: "egen", score: 4 },
                { text: "Satisfied just being together", type: "egen", score: 3 }
            ]
        },
        {
            situation: "In relationships with opposite sex",
            options: [
                { text: "Want independent and equal relationship", type: "teto", score: 4 },
                { text: "Value emotional connection and romantic atmosphere", type: "egen", score: 4 },
                { text: "Show various sides depending on situation", type: "egen", score: 3 }
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
                    { name: "리더십형 축구선수", profession: "스포츠 분야" },
                    { name: "목표지향적 운동선수", profession: "체육 분야" },
                    { name: "진취적 엔터테이너", profession: "연예 분야" },
                    { name: "적극적 방송인", profession: "미디어 분야" }
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
                    { name: "감성적 아티스트", profession: "음악 분야" },
                    { name: "유머러스한 진행자", profession: "방송 분야" },
                    { name: "섬세한 연기자", profession: "연기 분야" },
                    { name: "로맨틱한 배우", profession: "영화 분야" }
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
                    { name: "리더십형 스포츠 스타", profession: "스포츠 분야" },
                    { name: "자립적 아티스트", profession: "음악 분야" },
                    { name: "목표지향적 선수", profession: "체육 분야" },
                    { name: "진취적 미디어 인물", profession: "방송 분야" }
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
                    { name: "감성적 배우", profession: "연기 분야" },
                    { name: "다재다능한 엔터테이너", profession: "엔터테인먼트 분야" },
                    { name: "섬세한 보컬리스트", profession: "음악 분야" },
                    { name: "온화한 연기자", profession: "영화 분야" }
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
                    { name: "Leadership-oriented Athlete", profession: "Sports & Entertainment" },
                    { name: "Goal-driven Sports Icon", profession: "Sports Field" },
                    { name: "Action-oriented Actor", profession: "Entertainment Field" },
                    { name: "Competitive Chef", profession: "Culinary Field" }
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
                    { name: "Sensitive Artist", profession: "Acting Field" },
                    { name: "Creative Performer", profession: "Music Field" },
                    { name: "Emotional Actor", profession: "Film Field" },
                    { name: "Artistic Performer", profession: "Theater Field" }
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
                    { name: "Competitive Sports Leader", profession: "Athletic Field" },
                    { name: "Strong Action Star", profession: "Entertainment Field" },
                    { name: "Fighting Sports Pioneer", profession: "Combat Sports" },
                    { name: "Media Leadership Figure", profession: "Broadcasting Field" }
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
                    { name: "Charming Actress", profession: "Film Field" },
                    { name: "Emotional Storyteller", profession: "Music Field" },
                    { name: "Relatable Performer", profession: "Entertainment Field" },
                    { name: "Versatile Entertainer", profession: "Multi-talent Field" }
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
    // 저장된 설정 불러오기
    const savedLanguage = localStorage.getItem('language-preference');
    
    if (savedLanguage) {
        currentLanguage = savedLanguage;
    } else {
        // 브라우저 언어 감지
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.startsWith('en')) {
            currentLanguage = 'en';
        }
    }
    
    // 다크모드를 기본으로 적용
    document.body.classList.add('dark-mode');
    
    updateLanguage();
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
    
    // 선택지 순서 랜덤화
    const shuffledOptions = [...questionOptions].sort(() => Math.random() - 0.5);
    
    shuffledOptions.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option.text;
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
    
    // 점수 계산
    if (selectedOption.type === 'teto') {
        tetoScore += selectedOption.score;
    } else {
        egenScore += selectedOption.score;
    }
    
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

function showResult() {
    showScreen('result');
    
    // 결과 계산
    const isTetoType = tetoScore >= egenScore;
    const result = resultData[currentLanguage][currentGender][isTetoType ? 'teto' : 'egen'];
    
    console.log('📊 결과 표시:', {
        language: currentLanguage,
        gender: currentGender,
        tetoScore: tetoScore,
        egenScore: egenScore,
        isTetoType: isTetoType,
        resultType: result.type
    });
    
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
    const totalScore = tetoScore + egenScore;
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
    
    // ⭐ 유명인 렌더링
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
    
    console.log('🧮 궁합도 계산:', {
        tetoScore: tetoScore,
        egenScore: egenScore,
        userTetoRatio: userTetoRatio,
        userEgenRatio: userEgenRatio
    });
    
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
        
        console.log(`💕 ${item.type} 최종 궁합:`, {
            rawScore: item.rawScore,
            normalizedScore: item.normalizedScore
        });
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
    
    console.log(`💕 ${partnerType} Helen Fisher 이론 기반 궁합:`, {
        userRatio: `테토${Math.round(userTetoRatio*100)}% / 에겐${Math.round(userEgenRatio*100)}%`,
        isOppositeAttraction: partnerType.includes('에겐') ? '테토→에겐 끌림' : '에겐→테토 끌림',
        finalScore: finalScore,
        theory: 'Director(테토) ↔ Negotiator(에겐) 강한 상호 끌림'
    });
    
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

// ⭐ 유명인 렌더링 함수
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
    const resultType = document.getElementById('result-type').textContent;
    const resultEmoji = document.getElementById('result-emoji').textContent;
    
    const shareTexts = {
        ko: `나는 ${resultType}! ${resultEmoji}\n\n테토-에겐 성격 유형 테스트 결과입니다.\n\n테스트 해보기: ${window.location.href}`,
        en: `I am ${resultType}! ${resultEmoji}\n\nTeto-Egen Personality Type Test Result.\n\nTake the test: ${window.location.href}`
    };
    
    const shareText = shareTexts[currentLanguage];
    
    if (navigator.share) {
        navigator.share({
            title: translations[currentLanguage].title,
            text: shareText
        });
    } else {
        // 클립보드에 복사
        navigator.clipboard.writeText(shareText).then(() => {
            const message = currentLanguage === 'ko' ? '결과가 클립보드에 복사되었습니다!' : 'Result copied to clipboard!';
            alert(message);
        }).catch(() => {
            // 클립보드 복사 실패시 직접 선택
            const textarea = document.createElement('textarea');
            textarea.value = shareText;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            const message = currentLanguage === 'ko' ? '결과가 클립보드에 복사되었습니다!' : 'Result copied to clipboard!';
            alert(message);
        });
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
        
        console.log('✅ 결과 내용 언어 업데이트 완료:', currentLanguage);
    }
}

 