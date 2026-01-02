// 다국어 데이터
const translations = {
    ko: {
        // 메인 페이지
        title: "Teto-Egen Platform",
        subtitle: "✨ 내 안의 숨겨진 호르몬 본능을 깨우다",
        description: "테스토스테론과 에스트로겐 호르몬의 심오한 조화...<br>당신은 어떤 티어의 본능을 가지고 있나요? 지금 바로 확인하세요!",
        genderTitle: "1️⃣ 성별을 선택해주세요",
        ageTitle: "2️⃣ 연령대를 선택해주세요",
        age10: "10대",
        age20: "20대",
        age30: "30대",
        age40: "40대",
        age50: "50대+",
        male: "남성",
        female: "여성",
        startBtn: "무료 테스트 시작하기",
        testInfo: "📋 총 25문항 | ⏱️ 약 6분 소요",
        backBtn: "← 이전 질문",
        retryBtn: "다시 테스트하기",
        shareBtn: "📝 링크 복사",
        saveImageBtn: "📷 이미지로 저장",
        traitsTitle: "당신의 성격 특징",
        detailTitle: "상세 설명",
        scoreTitle: "점수 분포",
        compatibilityTitle: "💕 연애 궁합",
        careersTitle: "💼 추천 직업",
        celebritiesTitle: "⭐ 같은 유형 유명인",
        healthTitle: "🏥 건강 & 스트레스 관리",
        growthTitle: "🎯 성장 방향",
        exerciseTitle: "💪 추천 운동",
        dietTitle: "🥗 식단 관리",
        stressTitle: "😌 스트레스 해소",

        // About 페이지
        about: {
            title: "테토-에겐 성격 유형 테스트란?",
            scientific: {
                title: "🧬 과학적 근거",
                intro: "테토-에겐 성격 유형 테스트는 <strong>테스토스테론(Testosterone)</strong>과 <strong>에스트로겐(Estrogen)</strong> 호르몬의 영향에 기반한 성격 분석 도구입니다.",
                relationship: "호르몬과 성격의 관계",
                testosterone: "<strong>테스토스테론</strong>: 경쟁심, 리더십, 목표 지향성, 독립성과 연관",
                estrogen: "<strong>에스트로겐</strong>: 공감 능력, 협동심, 감정 표현, 관계 중심성과 연관",
                balance: "두 호르몬의 균형이 개인의 성격 특성을 결정",
                universal: "성별에 관계없이 모든 사람이 두 호르몬을 모두 가지고 있음"
            },
            types: {
                title: "🎯 4가지 성격 유형",
                tetoMale: {
                    title: "👨 테토남",
                    subtitle: "테스토스테론 우세 남성",
                    trait1: "강한 리더십과 경쟁심",
                    trait2: "목표 달성에 집중",
                    trait3: "독립적이고 결단력 있음",
                    trait4: "논리적 사고 선호"
                },
                egenMale: {
                    title: "👨 에겐남",
                    subtitle: "에스트로겐 우세 남성",
                    trait1: "높은 공감 능력",
                    trait2: "협력과 조화 중시",
                    trait3: "감정 표현이 풍부",
                    trait4: "관계 중심적 사고"
                },
                tetoFemale: {
                    title: "👩 테토녀",
                    subtitle: "테스토스테론 우세 여성",
                    trait1: "진취적이고 적극적",
                    trait2: "명확한 의사표현",
                    trait3: "도전을 즐김",
                    trait4: "실용적 접근법"
                },
                egenFemale: {
                    title: "👩 에겐녀",
                    subtitle: "에스트로겐 우세 여성",
                    trait1: "섬세하고 배려심 많음",
                    trait2: "직관적 판단력",
                    trait3: "감정적 지지 제공",
                    trait4: "조화로운 환경 선호"
                }
            },
            applications: {
                title: "🎯 활용 분야",
                career: {
                    title: "💼 직업 선택",
                    desc: "개인의 호르몬 성향에 맞는 직업과 업무 환경을 찾는 데 도움"
                },
                relationship: {
                    title: "💕 연애 궁합",
                    desc: "파트너와의 호르몬 균형을 분석하여 관계 개선점 파악"
                },
                teamwork: {
                    title: "🤝 팀워크",
                    desc: "팀 구성원들의 성향을 이해하여 효율적인 협업 방법 모색"
                },
                development: {
                    title: "🌱 자기계발",
                    desc: "개인의 장단점을 파악하여 성장 방향 설정"
                }
            },
            limitations: {
                title: "⚠️ 주의사항",
                purpose: "이 테스트는 오락 및 자기이해 목적으로 제작되었습니다",
                medical: "의학적 진단이나 치료 목적으로 사용할 수 없습니다",
                individual: "개인차가 존재하므로 결과를 절대적으로 받아들이지 마세요",
                fluid: "성격은 유동적이며 시간과 상황에 따라 변할 수 있습니다",
                expert: "결과에 대한 궁금증이 있다면 전문가와 상담하세요"
            },
            cta: {
                title: "🚀 지금 테스트해보세요!",
                description: "당신의 테토-에겐 성격 유형을 알아보고 더 나은 자신을 발견해보세요.",
                button: "테스트로 돌아가기"
            }
        },

        // Guide 페이지
        guide: {
            title: "테토-에겐 성격 유형 가이드",
            intro: {
                title: "📊 결과 이해하기",
                description: "테토-에겐 테스트는 당신의 테스토스테론과 에스트로겐 성향을 측정하여 4가지 성격 유형 중 하나를 제시합니다. 각 결과에는 풍부한 정보가 포함되어 있어 자신을 더 깊이 이해할 수 있습니다."
            },
            maleTypes: {
                title: "👨 남성 유형 분석",
                teto: {
                    title: "🦁 테토남 (테스토스테론 우세)",
                    core: "핵심 특징",
                    trait1: "자연스러운 리더: 그룹에서 자연스럽게 주도권을 잡는 경향",
                    trait2: "목표 지향적: 명확한 목표를 설정하고 달성에 집중",
                    trait3: "경쟁 선호: 경쟁적 환경에서 더 좋은 성과를 보임",
                    trait4: "독립적 성향: 혼자 일하는 것을 선호하고 자기 결정을 중시",
                    career: "💼 추천 직업군",
                    job1: "CEO/임원",
                    job2: "영업관리자",
                    job3: "프로젝트 매니저",
                    job4: "운동선수",
                    job5: "기업가",
                    job6: "부동산 중개인",
                    relationship: "💕 연애 스타일",
                    love1: "주도적이고 적극적인 어프로치",
                    love2: "명확한 의사표현을 선호",
                    love3: "파트너의 독립성도 존중",
                    love4: "계획적이고 안정적인 관계 추구",
                    growth: "🎯 성장 방향",
                    growth1: "감정 표현 연습: 논리적 사고도 중요하지만 감정 공유도 필요",
                    growth2: "경청 능력 개발: 다른 사람의 의견에도 귀 기울이기",
                    growth3: "협력 기술 향상: 혼자보다 팀워크의 힘 인정하기"
                },
                egen: {
                    title: "🤝 에겐남 (에스트로겐 우세)",
                    core: "핵심 특징",
                    trait1: "뛰어난 공감 능력: 다른 사람의 감정을 잘 이해하고 배려",
                    trait2: "조화로운 관계: 갈등보다는 협력과 조화를 선호",
                    trait3: "감정 표현: 자신의 감정을 솔직하게 표현하는 편",
                    trait4: "직관적 판단: 논리와 감정을 모두 고려한 의사결정",
                    career: "💼 추천 직업군",
                    job1: "상담사",
                    job2: "교사",
                    job3: "사회복지사",
                    job4: "예술가",
                    job5: "HR 전문가",
                    job6: "간호사",
                    relationship: "💕 연애 스타일",
                    love1: "감정적 교감을 중시",
                    love2: "세심한 배려와 관심 표현",
                    love3: "깊은 대화를 좋아함",
                    love4: "파트너의 감정 상태에 민감",
                    growth: "🎯 성장 방향",
                    growth1: "의사결정력 강화: 감정에만 의존하지 말고 논리적 판단도 활용",
                    growth2: "자기주장 연습: 자신의 의견을 더 명확히 표현하기",
                    growth3: "경계 설정: 타인을 배려하되 자신의 한계도 인정하기"
                }
            },
            femaleTypes: {
                title: "👩 여성 유형 분석",
                teto: {
                    title: "🔥 테토녀 (테스토스테론 우세)",
                    core: "핵심 특징",
                    trait1: "진취적 성격: 새로운 도전을 두려워하지 않는 적극적 성향",
                    trait2: "명확한 의사표현: 자신의 생각과 의견을 분명하게 전달",
                    trait3: "독립적 사고: 타인의 의견에 휘둘리지 않는 주관적 판단",
                    trait4: "목표 달성형: 계획을 세우고 실행하는 능력이 뛰어남",
                    career: "💼 추천 직업군",
                    job1: "변호사",
                    job2: "의사",
                    job3: "금융 전문가",
                    job4: "마케팅 디렉터",
                    job5: "기업가",
                    job6: "컨설턴트",
                    relationship: "💕 연애 스타일",
                    love1: "솔직하고 직접적인 표현",
                    love2: "상호 존중하는 평등한 관계 선호",
                    love3: "개인 공간과 시간 중시",
                    love4: "논리적이고 실용적인 문제 해결",
                    growth: "🎯 성장 방향",
                    growth1: "감정적 소통: 논리적 접근과 함께 감정적 교감도 중요시하기",
                    growth2: "유연성 기르기: 때로는 계획을 수정할 수 있는 융통성 발휘",
                    growth3: "팀워크 향상: 개인 성과와 팀 화합의 균형 찾기"
                },
                egen: {
                    title: "🌸 에겐녀 (에스트로겐 우세)",
                    core: "핵심 특징",
                    trait1: "섬세한 배려: 주변 사람들의 감정과 필요를 세심하게 파악",
                    trait2: "직관적 지혜: 논리를 넘어선 직관적 판단력 보유",
                    trait3: "감정적 지지: 다른 사람들에게 정서적 안정감 제공",
                    trait4: "조화로운 환경: 평화롭고 안정적인 분위기를 만드는 능력",
                    career: "💼 추천 직업군",
                    job1: "유치원 교사",
                    job2: "간호사",
                    job3: "심리상담사",
                    job4: "작가",
                    job5: "디자이너",
                    job6: "사회복지사",
                    relationship: "💕 연애 스타일",
                    love1: "깊은 정서적 연결 추구",
                    love2: "세심한 관찰과 배려 표현",
                    love3: "안정적이고 따뜻한 관계 선호",
                    love4: "Sensitive to partner's emotional changes",
                    growth: "🎯 성장 방향",
                    growth1: "자기주장 강화: 타인 배려와 함께 자신의 의견도 적극 표현",
                    growth2: "논리적 사고: 감정과 직관에 더해 논리적 분석 능력 기르기",
                    growth3: "스트레스 관리: 타인의 감정에 과도하게 영향받지 않는 방법 학습"
                }
            },
            compatibility: {
                title: "💕 연애 궁합 완전 가이드",
                matrix: "궁합 매트릭스",
                perfect: "💕 완벽한 조화 (90%+)",
                perfect1: "테토남 ↔ 에겐녀: 서로의 부족한 부분을 완벽하게 보완",
                perfect2: "에겐남 ↔ 테토녀: 감성과 이성의 아름다운 균형",
                good: "🔥 역동적 관계 (70-85%)",
                good1: "테토남 ↔ 테토녀: 서로를 이해하지만 충돌 가능성도 존재",
                good2: "에겐남 ↔ 에겐녀: 감정적 교감은 깊지만 결정력 부족 가능",
                challenge: "⚖️ 도전적 관계 (50-70%)",
                challenge1: "같은 성별의 같은 유형: 너무 비슷해서 오히려 갈등 가능",
                challenge2: "극단적 차이: 서로 다른 가치관으로 인한 이해 필요",
                tips: "관계 개선 팁",
                tipTitle1: "🗣️ 의사소통",
                tip1: "서로의 성향을 이해하고 존중하기",
                tip2: "감정과 논리 모두 고려한 대화",
                tip3: "정기적인 솔직한 대화 시간 갖기",
                tipTitle2: "⚖️ 균형",
                tip4: "개인 시간과 함께하는 시간의 균형",
                tip5: "주도권을 번갈아 가며 갖기",
                tip6: "서로의 강점을 활용한 역할 분담",
                tipTitle3: "🌱 성장",
                tip7: "파트너의 성향에서 배울 점 찾기",
                tip8: "함께 새로운 활동 도전하기",
                tip9: "서로의 성장을 응원하고 지지하기"
            },
            application: {
                title: "🎯 일상 적용 가이드",
                work: "💼 직장에서 활용하기",
                work1: "팀 구성: 다양한 성향의 동료들과 어떻게 협력할지 계획",
                work2: "업무 스타일: 자신의 강점을 살릴 수 있는 업무 방식 찾기",
                work3: "갈등 해결: 성향 차이로 인한 갈등을 건설적으로 해결",
                work4: "리더십: 팀원들의 성향을 이해한 맞춤형 리더십 발휘",
                family: "👨‍👩‍👧‍👦 가족 관계에서 활용하기",
                family1: "부모-자녀: 자녀의 성향을 이해한 맞춤형 양육법",
                family2: "부부 관계: 서로의 차이를 인정하고 보완하는 관계",
                family3: "형제자매: 성향 차이로 인한 갈등 최소화",
                family4: "대화법: 각자의 성향에 맞는 소통 방식 채택",
                personal: "🌱 개인 성장에 활용하기",
                personal1: "목표 설정: 자신의 성향에 맞는 현실적 목표 수립",
                personal2: "스트레스 관리: 성향별 맞춤 스트레스 해소법 찾기",
                personal3: "취미 활동: 자신의 성향과 잘 맞는 취미 발견",
                personal4: "자기계발: 부족한 부분을 보완하는 학습 계획"
            },
            cta: {
                title: "🚀 이제 당신의 차례입니다!",
                description: "가이드를 참고하여 자신만의 성격 유형을 더 깊이 이해하고, 더 나은 관계와 성장을 위한 구체적인 실천 방안을 세워보세요.",
                button: "테스트로 돌아가기"
            }
        },

        // Privacy Policy 페이지
        privacy: {
            title: "개인정보보호정책",
            lastUpdated: "최종 업데이트: 2024년 12월 19일",
            section1: {
                title: "1. 수집하는 개인정보",
                intro: "테토-에겐 성격 유형 테스트는 다음과 같은 정보를 수집합니다:",
                required: "필수 정보: 성별 선택 (테스트 결과 제공 목적)",
                auto: "자동 수집 정보: IP 주소, 브라우저 정보, 접속 시간, 이용 기록",
                cookies: "쿠키: 사용자 환경 설정 (언어, 다크모드 등)"
            },
            section2: {
                title: "2. 개인정보 수집 및 이용 목적",
                purpose1: "성격 유형 테스트 결과 제공",
                purpose2: "서비스 개선 및 통계 분석",
                purpose3: "웹사이트 성능 최적화",
                purpose4: "광고 서비스 제공 (Google AdSense)"
            },
            section3: {
                title: "3. 개인정보 보유 및 이용 기간",
                intro: "수집된 개인정보는 다음과 같이 처리됩니다:",
                results: "테스트 결과: 브라우저 세션 종료 시 자동 삭제",
                cookies: "쿠키: 사용자가 직접 삭제하거나 브라우저 설정에 따라 삭제",
                logs: "로그 데이터: 최대 1년간 보관 후 자동 삭제"
            },
            section4: {
                title: "4. 개인정보 제3자 제공",
                intro: "본 웹사이트는 사용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 다음의 경우에는 예외로 합니다:",
                consent: "사용자가 사전에 동의한 경우",
                legal: "법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우"
            },
            section5: {
                title: "5. Google AdSense 및 쿠키",
                intro: "본 웹사이트는 Google AdSense를 통해 광고를 제공합니다:",
                cookies: "Google은 쿠키를 사용하여 사용자의 관심사에 맞는 광고를 표시합니다",
                disable: "사용자는 Google 광고 설정에서 개인화 광고를 비활성화할 수 있습니다",
                link: "자세한 내용은 <a href=\"https://policies.google.com/privacy\" target=\"_blank\">Google 개인정보보호정책</a>을 참조하세요"
            },
            section6: {
                title: "6. 사용자의 권리",
                intro: "사용자는 다음과 같은 권리를 가집니다:",
                access: "개인정보 처리 현황에 대한 열람 요구",
                stop: "개인정보 처리 정지 요구",
                delete: "개인정보 삭제 요구",
                cookies: "쿠키 설정 변경 및 삭제"
            },
            section7: {
                title: "7. 개인정보 보호책임자",
                contact: "연락처: GitHub Issues를 통한 문의",
                address: "주소: <a href=\"https://github.com/spungs/teto-egen-test/issues\" target=\"_blank\">https://github.com/spungs/teto-egen-test/issues</a>"
            },
            section8: {
                title: "8. 개인정보 처리방침 변경",
                content: "이 개인정보보호정책은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다."
            },
            section9: {
                title: "9. 데이터 보안",
                intro: "개인정보 보호를 위해 다음과 같은 보안 조치를 취하고 있습니다:",
                https: "HTTPS 암호화 통신",
                minimal: "최소한의 개인정보 수집",
                audit: "정기적인 보안 점검",
                access: "개인정보 처리 시스템 접근 제한"
            },
            cta: {
                button: "테스트로 돌아가기"
            }
        },

        // Footer
        footer: {
            copyright: "© 2024 Teto-Egen Platform. All rights reserved.",
            dailyVisitors: "오늘 방문자",
            totalVisitors: "총 방문자",
            otherServices: "spungs's other services"
        }
    },
    en: {
        // Main page
        title: "Teto-Egen Platform",
        subtitle: "✨ Awaken your hidden hormonal instincts",
        description: "The profound harmony of testosterone and estrogen...<br>What tier of instinct do you possess? Find out now!",
        genderTitle: "1️⃣ Please select your gender",
        ageTitle: "2️⃣ Please select your age group",
        age10: "10s",
        age20: "20s",
        age30: "30s",
        age40: "40s",
        age50: "50s+",
        male: "Male",
        female: "Female",
        startBtn: "Start Free Test",
        testInfo: "📋 25 Questions | ⏱️ About 6 minutes",
        backBtn: "← Previous Question",
        retryBtn: "Retry Test",
        shareBtn: "📝 Copy Link",
        saveImageBtn: "📷 Save as Image",
        traitsTitle: "Your Personality Traits",
        detailTitle: "Detailed Description",
        scoreTitle: "Score Distribution",
        compatibilityTitle: "💕 Love Compatibility",
        careersTitle: "💼 Recommended Careers",
        celebritiesTitle: "⭐ Celebrity Examples",
        healthTitle: "🏥 Health & Stress Management",
        growthTitle: "🎯 Growth Direction",
        exerciseTitle: "💪 Recommended Exercise",
        dietTitle: "🥗 Diet Management",
        stressTitle: "😌 Stress Relief",

        // About page
        about: {
            title: "What is Teto-Egen Personality Type Test?",
            scientific: {
                title: "🧬 Scientific Basis",
                intro: "The Teto-Egen personality type test is a personality analysis tool based on the influence of <strong>testosterone</strong> and <strong>estrogen</strong> hormones.",
                relationship: "Relationship between Hormones and Personality",
                testosterone: "<strong>Testosterone</strong>: Associated with competitiveness, leadership, goal orientation, and independence",
                estrogen: "<strong>Estrogen</strong>: Associated with empathy, cooperation, emotional expression, and relationship focus",
                balance: "The balance of these two hormones determines individual personality traits",
                universal: "All people have both hormones regardless of gender"
            },
            types: {
                title: "🎯 4 Personality Types",
                tetoMale: {
                    title: "👨 Teto Male",
                    subtitle: "Testosterone-dominant Male",
                    trait1: "Strong leadership and competitiveness",
                    trait2: "Focus on goal achievement",
                    trait3: "Independent and decisive",
                    trait4: "Prefers logical thinking"
                },
                egenMale: {
                    title: "👨 Egen Male",
                    subtitle: "Estrogen-dominant Male",
                    trait1: "High empathy",
                    trait2: "Values cooperation and harmony",
                    trait3: "Rich emotional expression",
                    trait4: "Relationship-centered thinking"
                },
                tetoFemale: {
                    title: "👩 Teto Female",
                    subtitle: "Testosterone-dominant Female",
                    trait1: "Progressive and proactive",
                    trait2: "Clear communication",
                    trait3: "Enjoys challenges",
                    trait4: "Practical approach"
                },
                egenFemale: {
                    title: "👩 Egen Female",
                    subtitle: "Estrogen-dominant Female",
                    trait1: "Delicate and considerate",
                    trait2: "Intuitive judgment",
                    trait3: "Provides emotional support",
                    trait4: "Prefers harmonious environment"
                }
            },
            applications: {
                title: "🎯 Application Areas",
                career: {
                    title: "💼 Career Choice",
                    desc: "Helps find jobs and work environments that match individual hormone tendencies"
                },
                relationship: {
                    title: "💕 Love Compatibility",
                    desc: "Analyzes hormone balance with partners to identify relationship improvements"
                },
                teamwork: {
                    title: "🤝 Teamwork",
                    desc: "Understands team members' tendencies to find efficient collaboration methods"
                },
                development: {
                    title: "🌱 Self-Development",
                    desc: "Identifies individual strengths and weaknesses to set growth direction"
                }
            },
            limitations: {
                title: "⚠️ Precautions",
                purpose: "This test is created for entertainment and self-understanding purposes",
                medical: "Cannot be used for medical diagnosis or treatment purposes",
                individual: "Individual differences exist, so do not accept results absolutely",
                fluid: "Personality is fluid and can change over time and circumstances",
                expert: "If you have questions about the results, consult with an expert"
            },
            cta: {
                title: "🚀 Take the Test Now!",
                description: "Discover your Teto-Egen personality type and find a better version of yourself.",
                button: "Back to Test"
            }
        },

        // Guide page
        guide: {
            title: "Teto-Egen Personality Type Guide",
            intro: {
                title: "📊 Understanding Results",
                description: "The Teto-Egen test measures your testosterone and estrogen tendencies and suggests one of four personality types. Each result contains rich information to help you understand yourself more deeply."
            },
            maleTypes: {
                title: "👨 Male Type Analysis",
                teto: {
                    title: "🦁 Teto Male (Testosterone Dominant)",
                    core: "Core Characteristics",
                    trait1: "Natural Leader: Tendency to naturally take charge in groups",
                    trait2: "Goal-Oriented: Sets clear goals and focuses on achievement",
                    trait3: "Prefers Competition: Shows better performance in competitive environments",
                    trait4: "Independent Nature: Prefers working alone and values self-decision",
                    career: "💼 Recommended Careers",
                    job1: "CEO/Executive",
                    job2: "Sales Manager",
                    job3: "Project Manager",
                    job4: "Athlete",
                    job5: "Entrepreneur",
                    job6: "Real Estate Agent",
                    relationship: "💕 Love Style",
                    love1: "Proactive and assertive approach",
                    love2: "Prefers clear communication",
                    love3: "Respects partner's independence",
                    love4: "Seeks planned and stable relationships",
                    growth: "🎯 Growth Direction",
                    growth1: "Practice Emotional Expression: Logical thinking is important, but emotional sharing is also necessary",
                    growth2: "Develop Listening Skills: Pay attention to others' opinions too",
                    growth3: "Improve Collaboration: Recognize the power of teamwork over solo work"
                },
                egen: {
                    title: "🤝 Egen Male (Estrogen Dominant)",
                    core: "Core Characteristics",
                    trait1: "Excellent Empathy: Understands and cares for others' emotions well",
                    trait2: "Harmonious Relationships: Prefers cooperation and harmony over conflict",
                    trait3: "Emotional Expression: Tends to express feelings honestly",
                    trait4: "Intuitive Judgment: Makes decisions considering both logic and emotion",
                    career: "💼 Recommended Careers",
                    job1: "Counselor",
                    job2: "Teacher",
                    job3: "Social Worker",
                    job4: "Artist",
                    job5: "HR Specialist",
                    job6: "Nurse",
                    relationship: "💕 Love Style",
                    love1: "Values emotional connection",
                    love2: "Shows detailed care and attention",
                    love3: "Enjoys deep conversations",
                    love4: "Sensitive to partner's emotional state",
                    growth: "🎯 Growth Direction",
                    growth1: "Strengthen Decision-Making: Use logical judgment alongside emotions",
                    growth2: "Practice Self-Assertion: Express your opinions more clearly",
                    growth3: "Set Boundaries: Care for others while recognizing your own limits"
                }
            },
            femaleTypes: {
                title: "👩 Female Type Analysis",
                teto: {
                    title: "🔥 Teto Female (Testosterone Dominant)",
                    core: "Core Characteristics",
                    trait1: "Progressive Personality: Proactive nature that doesn't fear new challenges",
                    trait2: "Clear Communication: Clearly conveys thoughts and opinions",
                    trait3: "Independent Thinking: Subjective judgment not swayed by others' opinions",
                    trait4: "Goal Achiever: Excellent at planning and execution",
                    career: "💼 Recommended Careers",
                    job1: "Lawyer",
                    job2: "Doctor",
                    job3: "Financial Expert",
                    job4: "Marketing Director",
                    job5: "Entrepreneur",
                    job6: "Consultant",
                    relationship: "💕 Love Style",
                    love1: "Honest and direct expression",
                    love2: "Prefers equal relationships with mutual respect",
                    love3: "Values personal space and time",
                    love4: "Logical and practical problem solving",
                    growth: "🎯 Growth Direction",
                    growth1: "Emotional Communication: Value emotional connection alongside logical approach",
                    growth2: "Develop Flexibility: Sometimes show adaptability to modify plans",
                    growth3: "Improve Teamwork: Find balance between individual performance and team harmony"
                },
                egen: {
                    title: "🌸 Egen Female (Estrogen Dominant)",
                    core: "Core Characteristics",
                    trait1: "Delicate Care: Carefully perceives emotions and needs of people around",
                    trait2: "Intuitive Wisdom: Possesses intuitive judgment beyond logic",
                    trait3: "Emotional Support: Provides emotional stability to others",
                    trait4: "Harmonious Environment: Ability to create peaceful and stable atmosphere",
                    career: "💼 Recommended Careers",
                    job1: "Kindergarten Teacher",
                    job2: "Nurse",
                    job3: "Psychologist",
                    job4: "Writer",
                    job5: "Designer",
                    job6: "Social Worker",
                    relationship: "💕 Love Style",
                    love1: "Seeks deep emotional connection",
                    love2: "Shows careful observation and care",
                    love3: "Prefers stable and warm relationships",
                    love4: "Sensitive to partner's emotional changes",
                    growth: "🎯 Growth Direction",
                    growth1: "Strengthen Self-Assertion: Actively express your opinions while caring for others",
                    growth2: "Logical Thinking: Develop analytical abilities alongside emotion and intuition",
                    growth3: "Stress Management: Learn not to be overly affected by others' emotions"
                }
            },
            compatibility: {
                title: "💕 Complete Love Compatibility Guide",
                matrix: "Compatibility Matrix",
                perfect: "💕 Perfect Harmony (90%+)",
                perfect1: "Teto Male ↔ Egen Female: Perfectly complement each other's weaknesses",
                perfect2: "Egen Male ↔ Teto Female: Beautiful balance of emotion and reason",
                good: "🔥 Dynamic Relationship (70-85%)",
                good1: "Teto Male ↔ Teto Female: Understand each other but potential for conflict exists",
                good2: "Egen Male ↔ Egen Female: Deep emotional connection but may lack decisiveness",
                challenge: "⚖️ Challenging Relationship (50-70%)",
                challenge1: "Same gender, same type: Too similar, may lead to conflict",
                challenge2: "Extreme differences: Need understanding due to different values",
                tips: "Relationship Improvement Tips",
                tipTitle1: "🗣️ Communication",
                tip1: "Understand and respect each other's tendencies",
                tip2: "Conversations considering both emotion and logic",
                tip3: "Have regular honest conversation time",
                tipTitle2: "⚖️ Balance",
                tip4: "Balance between personal time and time together",
                tip5: "Take turns in taking the lead",
                tip6: "Role division utilizing each other's strengths",
                tipTitle3: "🌱 Growth",
                tip7: "Find things to learn from partner's tendencies",
                tip8: "Challenge new activities together",
                tip9: "Support and encourage each other's growth"
            },
            application: {
                title: "🎯 Daily Application Guide",
                work: "💼 Using at Work",
                work1: "Team Building: Plan how to collaborate with colleagues of various tendencies",
                work2: "Work Style: Find work methods that leverage your strengths",
                work3: "Conflict Resolution: Constructively resolve conflicts due to tendency differences",
                work4: "Leadership: Exercise customized leadership understanding team members' tendencies",
                family: "👨‍👩‍👧‍👦 Using in Family Relationships",
                family1: "Parent-Child: Customized parenting understanding children's tendencies",
                family2: "Marital Relationship: Acknowledge and complement each other's differences",
                family3: "Siblings: Minimize conflicts due to tendency differences",
                family4: "Communication: Adopt communication methods suitable for each tendency",
                personal: "🌱 Using for Personal Growth",
                personal1: "Goal Setting: Set realistic goals suitable for your tendencies",
                personal2: "Stress Management: Find customized stress relief methods by tendency",
                personal3: "Hobby Activities: Discover hobbies that match your tendencies well",
                personal4: "Self-Development: Learning plans to complement lacking areas"
            },
            cta: {
                title: "🚀 Now it's your turn!",
                description: "Use this guide to understand your personality type more deeply and create specific action plans for better relationships and growth.",
                button: "Back to Test"
            }
        },

        // Privacy Policy page
        privacy: {
            title: "Privacy Policy",
            lastUpdated: "Last Updated: December 19, 2024",
            section1: {
                title: "1. Personal Information We Collect",
                intro: "The Teto-Egen Personality Type Test collects the following information:",
                required: "Required Information: Gender selection (for providing test results)",
                auto: "Automatically Collected Information: IP address, browser information, access time, usage records",
                cookies: "Cookies: User preferences (language, dark mode, etc.)"
            },
            section2: {
                title: "2. Purpose of Personal Information Collection and Use",
                purpose1: "Providing personality type test results",
                purpose2: "Service improvement and statistical analysis",
                purpose3: "Website performance optimization",
                purpose4: "Advertising service provision (Google AdSense)"
            },
            section3: {
                title: "3. Personal Information Retention and Use Period",
                intro: "Collected personal information is processed as follows:",
                results: "Test Results: Automatically deleted when browser session ends",
                cookies: "Cookies: Deleted by user directly or according to browser settings",
                logs: "Log Data: Automatically deleted after maximum 1 year storage"
            },
            section4: {
                title: "4. Third-Party Provision of Personal Information",
                intro: "This website does not provide users' personal information to external parties in principle. However, exceptions are made in the following cases:",
                consent: "When user has given prior consent",
                legal: "When required by law or requested by investigative agencies according to procedures and methods stipulated by law for investigation purposes"
            },
            section5: {
                title: "5. Google AdSense and Cookies",
                intro: "This website provides advertisements through Google AdSense:",
                cookies: "Google uses cookies to display ads tailored to users' interests",
                disable: "Users can disable personalized ads in Google Ad Settings",
                link: "For more information, please refer to <a href=\"https://policies.google.com/privacy\" target=\"_blank\">Google Privacy Policy</a>"
            },
            section6: {
                title: "6. User Rights",
                intro: "Users have the following rights:",
                access: "Request to view personal information processing status",
                stop: "Request to stop personal information processing",
                delete: "Request to delete personal information",
                cookies: "Change and delete cookie settings"
            },
            section7: {
                title: "7. Personal Information Protection Officer",
                contact: "Contact: Inquiries through GitHub Issues",
                address: "Address: <a href=\"https://github.com/spungs/teto-egen-test/issues\" target=\"_blank\">https://github.com/spungs/teto-egen-test/issues</a>"
            },
            section8: {
                title: "8. Changes to Privacy Policy",
                content: "This privacy policy is applied from the effective date, and when there are additions, deletions, and corrections of changes according to laws and policies, it will be announced through notices 7 days before the implementation of changes."
            },
            section9: {
                title: "9. Data Security",
                intro: "The following security measures are taken to protect personal information:",
                https: "HTTPS encrypted communication",
                minimal: "Minimal personal information collection",
                audit: "Regular security checks",
                access: "Restricted access to personal information processing systems"
            },
            cta: {
                button: "Back to Test"
            }
        },

        // Footer
        footer: {
            copyright: "© 2024 Teto-Egen Platform. All rights reserved.",
            dailyVisitors: "Today's Visitors",
            totalVisitors: "Total Visitors",
            otherServices: "spungs's other services"
        }
    }
};