// 테스트 질문 데이터
const questions = [
    // 결과 중심(R) vs 성장 중심(G) 질문
    {
        id: 1,
        type: 'likert',
        dimension: 'RG',
        text: '아이의 시험 점수보다 공부하는 과정이 더 의미 있다고 생각해요.',
        options: ['전혀 아니에요', '별로 아니에요', '그럴 수도 있어요', '그런 편이에요', '정말 그래요'],
        scoring: [2, 1, 0, -1, -2] // 점수가 양수면 G, 음수면 R
    },
    {
        id: 2,
        type: 'multiple',
        dimension: 'RG',
        text: '우리 아이가 어려운 문제를 못 풀 때 나는...',
        options: [
            '빨리 답을 알려주고 다음으로 넘어가요.',
            '자세히 설명해주고 이해했는지 확인해요.',
            '힌트를 주고 스스로 풀도록 응원해요.',
            '실패해도 괜찮으니 이것저것 시도해보라고 격려해요.'
        ],
        scoring: [-2, -1, 1, 2] // 점수가 양수면 G, 음수면 R
    },
    {
        id: 3,
        type: 'ox',
        dimension: 'RG',
        text: '성적이 조금 떨어져도 아이가 배움에 즐거움을 느끼면 괜찮아요.',
        scoring: {'O': 2, 'X': -2} // O면 G, X면 R
    },
    {
        id: 4,
        type: 'multiple',
        dimension: 'RG',
        text: '학원이나 과외 선생님을 고를 때 가장 중요한 건?',
        options: [
            '입시 합격률과 성적 상승 그래프!',
            '체계적인 관리 시스템과 커리큘럼!',
            '우리 아이 스타일과 얼마나 잘 맞는지!',
            '아이의 호기심을 자극하는 재미있는 수업!'
        ],
        scoring: [-2, -1, 1, 2] // 점수가 양수면 G, 음수면 R
    },
    {
        id: 5,
        type: 'ranking',
        dimension: 'RG',
        text: '아이 교육에서 중요한 것들! 당신의 우선순위는?',
        options: [
            '높은 성적과 좋은 대학',
            '문제를 해결하는 능력',
            '스스로 공부하는 태도',
            '색다른 생각과 창의력'
        ],
        scoring: function(ranking) {
            // 첫 번째 항목이 '높은 성적과 좋은 대학'일 경우 R 성향 강함
            if (ranking[0] === '높은 성적과 좋은 대학') {
                return -2;
            } 
            // 마지막 항목이 '높은 성적과 좋은 대학'일 경우 G 성향 강함
            else if (ranking[3] === '높은 성적과 좋은 대학') {
                return 2;
            }
            // 그 외의 경우 중간 점수
            else {
                return ranking.indexOf('높은 성적과 좋은 대학') === 1 ? -1 : 1;
            }
        }
    },
    {
        id: 6,
        type: 'likert',
        dimension: 'RG',
        text: '아이가 열심히 했는데도 성적이 안 오르면 나도 모르게 답답해져요.',
        options: ['전혀 아니에요', '별로 아니에요', '그럴 수도 있어요', '그런 편이에요', '정말 그래요'],
        scoring: [-2, -1, 0, 1, 2] // 점수가 양수면 R, 음수면 G
    },

    // 관여형(I) vs 방관형(U) 질문
    {
        id: 7,
        type: 'likert',
        dimension: 'IU',
        text: '아이 공부 계획표를 함께 만들고 진행 상황을 종종 체크해요.',
        options: ['전혀 아니에요', '별로 아니에요', '그럴 수도 있어요', '그런 편이에요', '정말 그래요'],
        scoring: [-2, -1, 0, 1, 2] // 점수가 양수면 I, 음수면 U
    },
    {
        id: 8,
        type: 'multiple',
        dimension: 'IU',
        text: '아이 숙제나 학습 관리, 나는 주로...',
        options: [
            '매일 확인하고 필요하면 도와줘요.',
            '가끔 확인하고 문제가 있을 때만 개입해요.',
            '아이가 물어볼 때만 도와줘요.',
            '아이가 알아서 잘 할 거라 믿고 맡겨요.'
        ],
        scoring: [2, 1, -1, -2] // 점수가 양수면 I, 음수면 U
    },
    {
        id: 9,
        type: 'ox',
        dimension: 'IU',
        text: '아이 공부에 부모가 적극적으로 참여해야 성적이 오른다!',
        scoring: {'O': 2, 'X': -2} // O면 I, X면 U
    },
    {
        id: 10,
        type: 'multiple',
        dimension: 'IU',
        text: '아이 학업에 문제가 생겼을 때 나는...',
        options: [
            '바로 나서서 해결책을 찾아요.',
            '아이와 함께 상의하고 해결 방법을 찾아요.',
            '일단 아이가 시도해보게 하고, 안 되면 도와줘요.',
            '스스로 해결할 수 있다고 믿고 기다려요.'
        ],
        scoring: [2, 1, -1, -2] // 점수가 양수면 I, 음수면 U
    },
    {
        id: 11,
        type: 'likert',
        dimension: 'IU',
        text: '아이 학교생활은 선생님과 수시로 소통하며 체크해요.',
        options: ['전혀 아니에요', '별로 아니에요', '그럴 수도 있어요', '그런 편이에요', '정말 그래요'],
        scoring: [-2, -1, 0, 1, 2] // 점수가 양수면 I, 음수면 U
    },
    {
        id: 12,
        type: 'ranking',
        dimension: 'IU',
        text: '부모의 역할! 중요한 순서대로 골라주세요.',
        options: [
            '학습 계획 세우고 관리하기',
            '좋은 학습 환경 만들어주기',
            '정서적으로 응원하고 지지하기',
            '아이의 선택 존중하기'
        ],
        scoring: function(ranking) {
            // 첫 번째 항목이 '학습 계획 세우고 관리하기'일 경우 I 성향 강함
            if (ranking[0] === '학습 계획 세우고 관리하기') {
                return 2;
            } 
            // 마지막 항목이 '학습 계획 세우고 관리하기'일 경우 U 성향 강함
            else if (ranking[3] === '학습 계획 세우고 관리하기') {
                return -2;
            }
            // 그 외의 경우 중간 점수
            else {
                return ranking.indexOf('학습 계획 세우고 관리하기') === 1 ? 1 : -1;
            }
        }
    },

    // 구조적(S) vs 유연한(F) 질문
    {
        id: 13,
        type: 'likert',
        dimension: 'SF',
        text: '아이 공부는 체계적인 계획과 규칙적인 습관이 중요해요.',
        options: ['전혀 아니에요', '별로 아니에요', '그럴 수도 있어요', '그런 편이에요', '정말 그래요'],
        scoring: [-2, -1, 0, 1, 2] // 점수가 양수면 S, 음수면 F
    },
    {
        id: 14,
        type: 'multiple',
        dimension: 'SF',
        text: '아이 공부 시간에 대해 나는...',
        options: [
            '정해진 시간표대로 철저하게 지키게 해요.',
            '기본 계획은 있지만 상황에 따라 조정해요.',
            '아이가 기분 좋을 때 몰아서 공부하게 해요.',
            '아이가 스스로 알아서 시간을 정하도록 해요.'
        ],
        scoring: [2, 1, -1, -2] // 점수가 양수면 S, 음수면 F
    },
    {
        id: 15,
        type: 'ox',
        dimension: 'SF',
        text: '계획은 계획일 뿐! 상황에, 맞게 언제든 바꿀 수 있어야 해요.',
        scoring: {'O': -2, 'X': 2} // O면 F, X면 S
    },
    {
        id: 16,
        type: 'multiple',
        dimension: 'SF',
        text: '공부 방법! 나는 이렇게 생각해요.',
        options: [
            '검증된 방법으로 차근차근 단계별로 해야 성공해요.',
            '기본 틀은 있되 아이에게 맞게 조정해야 해요.',
            '여러 방법을 시도해보고 아이에게 맞는 걸 찾아요.',
            '아이만의 독특한 공부법을 개발하게 해요.'
        ],
        scoring: [2, 1, -1, -2] // 점수가 양수면 S, 음수면 F
    },
    {
        id: 17,
        type: 'likert',
        dimension: 'SF',
        text: '갑자기 일정이 바뀌어 아이 공부 계획이 틀어지면 마음이 불안해져요.',
        options: ['전혀 아니에요', '별로 아니에요', '그럴 수도 있어요', '그런 편이에요', '정말 그래요'],
        scoring: [-2, -1, 0, 1, 2] // 점수가 양수면 S, 음수면 F
    },
    {
        id: 18,
        type: 'ranking',
        dimension: 'SF',
        text: '효과적인 학습의 비밀 재료! 순서대로 골라보세요.',
        options: [
            '체계적인 계획과 꾸준한 실천',
            '집중력과 의지력',
            '호기심과 재미',
            '유연하게 상황에 적응하는 능력'
        ],
        scoring: function(ranking) {
            // 첫 번째 항목이 '체계적인 계획과 꾸준한 실천'일 경우 S 성향 강함
            if (ranking[0] === '체계적인 계획과 꾸준한 실천') {
                return 2;
            } 
            // 마지막 항목이 '체계적인 계획과 꾸준한 실천'일 경우 F 성향 강함
            else if (ranking[3] === '체계적인 계획과 꾸준한 실천') {
                return -2;
            }
            // 그 외의 경우 중간 점수
            else {
                return ranking.indexOf('체계적인 계획과 꾸준한 실천') === 1 ? 1 : -1;
            }
        }
    },

    // 지시적(D) vs 자율적(A) 질문
    {
        id: 19,
        type: 'likert',
        dimension: 'DA',
        text: '아이의 목표와 공부 방법은 경험 많은 부모가 정해줘야 효과적이에요.',
        options: ['전혀 아니에요', '별로 아니에요', '그럴 수도 있어요', '그런 편이에요', '정말 그래요'],
        scoring: [-2, -1, 0, 1, 2] // 점수가 양수면 D, 음수면 A
    },
    {
        id: 20,
        type: 'multiple',
        dimension: 'DA',
        text: '아이의 진로나 선택과목에 대해 나는...',
        options: [
            '아이에게 맞는 길을 내가 판단해서 결정해요.',
            '함께 상의하지만 최종 결정은 내가 해요.',
            '아이 의견을 듣고 조언은 하되 존중해줘요.',
            '전적으로 아이 스스로 결정하게 해요.'
        ],
        scoring: [2, 1, -1, -2] // 점수가 양수면 D, 음수면 A
    },
    {
        id: 21,
        type: 'ox',
        dimension: 'DA',
        text: '스스로 선택하고 결정하는 능력이 좋은 성적보다 인생에 더 중요해요!',
        scoring: {'O': -2, 'X': 2} // O면 A, X면 D
    },
    {
        id: 22,
        type: 'multiple',
        dimension: 'DA',
        text: '아이의 공부 방식에 대해 나는...',
        options: [
            '내가 효과적이라고 생각하는 방법을 따르게 해요.',
            '큰 방향은 제시하고 세부적인 건 아이가 정하게 해요.',
            '아이 방식을 존중하되 필요할 때만 조언해요.',
            '아이가 자기만의 방식을 찾도록 완전히 자유를 줘요.'
        ],
        scoring: [2, 1, -1, -2] // 점수가 양수면 D, 음수면 A
    },
    {
        id: 23,
        type: 'likert',
        dimension: 'DA',
        text: '아이가 내 조언과 다른 선택을 해도 응원하고 지지해요.',
        options: ['전혀 아니에요', '별로 아니에요', '그럴 수도 있어요', '그런 편이에요', '정말 그래요'],
        scoring: [2, 1, 0, -1, -2] // 점수가 양수면 D, 음수면 A
    },
    {
        id: 24,
        type: 'ranking',
        dimension: 'DA',
        text: '학습에서 중요한 요소들! 당신의 우선순위는?',
        options: [
            '명확한 길잡이와 방향 제시',
            '적절한 피드백과 조언',
            '스스로 문제 해결하는 경험',
            '자기 주도적 선택과 결정'
        ],
        scoring: function(ranking) {
            // 첫 번째 항목이 '명확한 길잡이와 방향 제시'일 경우 D 성향 강함
            if (ranking[0] === '명확한 길잡이와 방향 제시') {
                return 2;
            } 
            // 마지막 항목이 '명확한 길잡이와 방향 제시'일 경우 A 성향 강함
            else if (ranking[3] === '명확한 길잡이와 방향 제시') {
                return -2;
            }
            // 그 외의 경우 중간 점수
            else {
                return ranking.indexOf('명확한 길잡이와 방향 제시') === 1 ? 1 : -1;
            }
        }
    }
];