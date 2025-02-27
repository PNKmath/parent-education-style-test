// 전역 변수 설정
let currentQuestionIndex = 0;
let userAnswers = [];
let scores = {
    RG: 0, // 양수면 G(성장 중심), 음수면 R(결과 중심)
    IU: 0, // 양수면 I(관여형), 음수면 U(방관형)
    SF: 0, // 양수면 S(구조적), 음수면 F(유연한)
    DA: 0  // 양수면 D(지시적), 음수면 A(자율적)
};
let resultTypeCode = "";
let finalResultType = '';
let finalScores = {};

// DOM 요소들 선택
document.addEventListener('DOMContentLoaded', function() {
    // DOM 요소들 선택
    const startTestBtn = document.getElementById('start-test-btn');
    const testContainer = document.getElementById('test-container');
    const questionContainer = document.getElementById('question-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const resultContainer = document.getElementById('result-container');
    const resultTitle = document.getElementById('result-type');
    const resultDescription = document.getElementById('result-description');
    const resultDetail = document.getElementById('result-detail');
    const restartBtn = document.getElementById('restart-btn');
    const shareBtn = document.getElementById('share-btn');

    // 이벤트 리스너 등록
    startTestBtn.addEventListener('click', startTest);
    prevBtn.addEventListener('click', showPreviousQuestion);
    nextBtn.addEventListener('click', showNextQuestion);
    restartBtn.addEventListener('click', restartTest);
    shareBtn.addEventListener('click', shareResult);
    
    // 사용자 응답 배열 초기화
    userAnswers = Array(questions.length).fill(null);

    // 테스트 시작 함수
    function startTest() {
        document.querySelector('.container').classList.add('hidden');
        testContainer.classList.remove('hidden');
        showQuestion(0);
    }

    // 진행 상태 업데이트 함수
    function updateProgress() {
        const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressBar.style.setProperty('--progress', `${progress}%`);
        progressText.textContent = `${currentQuestionIndex + 1} / ${questions.length}`;
    }

    // 이전/다음 버튼 상태 업데이트 함수
    function updateNavigationButtons() {
        // 이전 버튼 상태 업데이트
        prevBtn.disabled = currentQuestionIndex === 0;
        
        // 다음 버튼 상태 업데이트
        if (currentQuestionIndex === questions.length - 1) {
            nextBtn.textContent = '결과 보기';
            nextBtn.disabled = !userAnswers[currentQuestionIndex];
        } else {
            nextBtn.textContent = '다음';
            nextBtn.disabled = !userAnswers[currentQuestionIndex];
        }
    }

    // 질문 표시 함수
    function showQuestion(index) {
        // 현재 질문 인덱스 업데이트
        currentQuestionIndex = index;
        
        // 진행 상태 업데이트
        updateProgress();
        
        // 이전/다음 버튼 상태 업데이트
        updateNavigationButtons();
        
        // 현재 질문 정보 가져오기
        const question = questions[index];
        
        // 질문 컨테이너 비우기
        questionContainer.innerHTML = '';
        
        // 질문 텍스트 생성
        const questionText = document.createElement('div');
        questionText.className = 'question-text';
        questionText.textContent = question.text;
        questionContainer.appendChild(questionText);
        
        // 질문 유형에 따라 다른 UI 생성
        switch(question.type) {
            case 'likert':
                createLikertScale(question, index);
                break;
            case 'multiple':
                createMultipleChoice(question, index);
                break;
            case 'ox':
                createOXQuestion(question, index);
                break;
            case 'ranking':
                createRankingQuestion(question, index);
                break;
        }
    }

    // 리커트 척도 생성 함수
    function createLikertScale(question, index) {
        const likertContainer = document.createElement('div');
        likertContainer.className = 'likert-scale';
        
        question.options.forEach((option, optionIndex) => {
            const optionCard = document.createElement('div');
            optionCard.className = 'option-card likert-card';
            
            // 이미 선택된 옵션인지 확인
            if (userAnswers[index] === optionIndex) {
                optionCard.classList.add('selected');
            }
            
            // 체크 아이콘 추가
            const checkIcon = document.createElement('div');
            checkIcon.className = 'check-icon';
            checkIcon.innerHTML = '<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path></svg>';
            
            // 텍스트 컨테이너 추가
            const optionText = document.createElement('div');
            optionText.className = 'option-text';
            optionText.textContent = option;
            
            // 클릭 이벤트 리스너 추가
            optionCard.addEventListener('click', () => {
                // 이전 선택 제거
                document.querySelectorAll('.likert-card').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // 현재 선택 표시
                optionCard.classList.add('selected');
                
                // 사용자 응답 저장
                userAnswers[index] = optionIndex;
                
                // 다음 버튼 활성화
                nextBtn.disabled = false;
            });
            
            optionCard.appendChild(checkIcon);
            optionCard.appendChild(optionText);
            likertContainer.appendChild(optionCard);
        });
        
        questionContainer.appendChild(likertContainer);
    }

    // 다지선다형 생성 함수
    function createMultipleChoice(question, index) {
        const choiceContainer = document.createElement('div');
        choiceContainer.className = 'multiple-choice';
        
        question.options.forEach((option, optionIndex) => {
            const optionCard = document.createElement('div');
            optionCard.className = 'option-card';
            
            // 이미 선택된 옵션인지 확인
            if (userAnswers[index] === optionIndex) {
                optionCard.classList.add('selected');
            }
            
            // 체크 아이콘 추가
            const checkIcon = document.createElement('div');
            checkIcon.className = 'check-icon';
            checkIcon.innerHTML = '<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path></svg>';
            
            // 텍스트 컨테이너 추가
            const optionText = document.createElement('div');
            optionText.className = 'option-text';
            optionText.textContent = option;
            
            // 클릭 이벤트 리스너 추가
            optionCard.addEventListener('click', () => {
                // 이전 선택 제거
                document.querySelectorAll('.option-card').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // 현재 선택 표시
                optionCard.classList.add('selected');
                
                // 사용자 응답 저장
                userAnswers[index] = optionIndex;
                
                // 다음 버튼 활성화
                nextBtn.disabled = false;
            });
            
            optionCard.appendChild(checkIcon);
            optionCard.appendChild(optionText);
            choiceContainer.appendChild(optionCard);
        });
        
        questionContainer.appendChild(choiceContainer);
    }

    // O/X 질문 생성 함수
    function createOXQuestion(question, index) {
        const oxContainer = document.createElement('div');
        oxContainer.className = 'ox-options';
        
        const options = [
            { value: 'O', icon: '✓', label: '맞아요' },
            { value: 'X', icon: '✕', label: '아니에요' }
        ];
        
        options.forEach(option => {
            const oxOption = document.createElement('div');
            oxOption.className = `ox-option ${option.value.toLowerCase()}`;
            
            // 이미 선택된 옵션인지 확인
            if (userAnswers[index] === option.value) {
                oxOption.classList.add('selected');
            }
            
            // 원형 컨테이너 생성
            const oxCircle = document.createElement('div');
            oxCircle.className = 'ox-circle';
            
            // 아이콘 추가
            const icon = document.createElement('span');
            icon.className = 'ox-icon';
            icon.textContent = option.icon;
            oxCircle.appendChild(icon);
            
            // 라벨 추가
            const oxLabel = document.createElement('div');
            oxLabel.className = 'ox-label';
            oxLabel.textContent = option.label;
            
            // 클릭 이벤트 리스너 추가
            oxOption.addEventListener('click', () => {
                // 이전 선택 제거
                document.querySelectorAll('.ox-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // 현재 선택 표시
                oxOption.classList.add('selected');
                
                // 사용자 응답 저장
                userAnswers[index] = option.value;
                
                // 다음 버튼 활성화
                nextBtn.disabled = false;
            });
            
            oxOption.appendChild(oxCircle);
            oxOption.appendChild(oxLabel);
            oxContainer.appendChild(oxOption);
        });
        
        questionContainer.appendChild(oxContainer);
    }

    // 순위형 질문 생성 함수
    function createRankingQuestion(question, index) {
        const rankingContainer = document.createElement('div');
        rankingContainer.className = 'ranking-options';
        
        // 사용자가 이미 순위를 매겼는지 확인
        let options = [...question.options];
        if (userAnswers[index] && Array.isArray(userAnswers[index])) {
            options = [...userAnswers[index]];
        } else {
            // 초기 응답 설정 - 사용자가 순서를 바꾸지 않아도 다음으로 넘어갈 수 있도록
            userAnswers[index] = [...options];
            nextBtn.disabled = false;
        }
        
        // 드래그 앤 드롭 관련 변수
        let draggedItem = null;
        let draggedIndex = null;
        
        options.forEach((option, optionIndex) => {
            const rankingItem = document.createElement('div');
            rankingItem.className = 'ranking-item';
            rankingItem.draggable = true;
            
            const rankCircle = document.createElement('div');
            rankCircle.className = 'rank';
            rankCircle.textContent = optionIndex + 1;
            
            const itemText = document.createElement('div');
            itemText.className = 'text';
            itemText.textContent = option;
            
            // 드래그 이벤트 리스너 추가
            rankingItem.addEventListener('dragstart', (e) => {
                draggedItem = rankingItem;
                draggedIndex = optionIndex;
                setTimeout(() => {
                    rankingItem.classList.add('dragging');
                }, 0);
            });
            
            rankingItem.addEventListener('dragend', () => {
                rankingItem.classList.remove('dragging');
                draggedItem = null;
                draggedIndex = null;
            });
            
            rankingItem.addEventListener('dragover', (e) => {
                e.preventDefault();
            });
            
            rankingItem.addEventListener('dragenter', (e) => {
                e.preventDefault();
                if (draggedItem !== rankingItem) {
                    rankingItem.classList.add('drag-over');
                }
            });
            
            rankingItem.addEventListener('dragleave', () => {
                rankingItem.classList.remove('drag-over');
            });
            
            rankingItem.addEventListener('drop', (e) => {
                e.preventDefault();
                rankingItem.classList.remove('drag-over');
                
                if (draggedItem !== rankingItem) {
                    const targetIndex = optionIndex;
                    
                    // 순위 변경
                    const temp = options[draggedIndex];
                    
                    if (draggedIndex < targetIndex) {
                        // 위에서 아래로 드래그
                        for (let i = draggedIndex; i < targetIndex; i++) {
                            options[i] = options[i + 1];
                        }
                    } else {
                        // 아래에서 위로 드래그
                        for (let i = draggedIndex; i > targetIndex; i--) {
                            options[i] = options[i - 1];
                        }
                    }
                    
                    options[targetIndex] = temp;
                    
                    // 사용자 응답 저장 - 새로운 배열로 복사하여 참조 문제 해결
                    userAnswers[index] = [...options];
                    
                    // UI 갱신 - 이전 순위가 남지 않도록 완전히 새로 그림
                    questionContainer.innerHTML = '';
                    const questionText = document.createElement('div');
                    questionText.className = 'question-text';
                    questionText.textContent = question.text;
                    questionContainer.appendChild(questionText);
                    createRankingQuestion(question, index);
                }
            });
            
            rankingItem.appendChild(rankCircle);
            rankingItem.appendChild(itemText);
            rankingContainer.appendChild(rankingItem);
        });
        
        questionContainer.appendChild(rankingContainer);
    }

    // 이전 질문 표시 함수
    function showPreviousQuestion() {
        if (currentQuestionIndex > 0) {
            showQuestion(currentQuestionIndex - 1);
        }
    }

    // 다음 질문 또는 결과 표시 함수
    function showNextQuestion() {
        if (currentQuestionIndex < questions.length - 1) {
            showQuestion(currentQuestionIndex + 1);
        } else {
            calculateAndShowResult();
        }
    }

    // 결과 계산 및 표시 함수
    function calculateAndShowResult() {
        // 로딩 화면 표시
        showLoadingScreen();
        
        // 결과 계산 및 표시는 로딩 애니메이션 후에 실행
        setTimeout(() => {
            // 결과 계산
            calculateResults();
            
            // Google Sheets에 결과 저장
            saveResultToGoogleSheets();
            
            // 결과 표시
            showResults();
            
            // 로딩 화면 숨기기
            hideLoadingScreen();
        }, 3000); // 3초 후 결과 표시
    }

    // 결과 계산 함수
    function calculateResults() {
        // 점수 초기화
        scores = {
            RG: 0,
            IU: 0,
            SF: 0,
            DA: 0
        };
        
        // 각 질문에 대한 점수 계산
        questions.forEach((question, index) => {
            const answer = userAnswers[index];
            
            if (answer !== undefined) {
                const dimension = question.dimension;
                let score;
                
                // 질문 유형에 따라 점수 계산 방식이 다름
                if (question.type === 'ranking') {
                    score = question.scoring(answer);
                } else if (question.type === 'ox') {
                    score = question.scoring[answer];
                } else {
                    score = question.scoring[answer];
                }
                
                // 해당 차원에 점수 추가
                scores[dimension] += score;
            }
        });
        
        // 결과 유형 결정
        resultTypeCode = determineResultType(scores);
    }
    
    // 결과 유형 결정 함수
    function determineResultType(scores) {
        // 각 차원별로 더 강한 성향 결정
        const r_vs_g = scores.RG < 0 ? 'R' : 'G';
        const i_vs_u = scores.IU > 0 ? 'I' : 'U';
        const s_vs_f = scores.SF > 0 ? 'S' : 'F';
        const d_vs_a = scores.DA > 0 ? 'D' : 'A';
        
        // 결과 유형 코드 생성 (예: "RISD")
        return r_vs_g + i_vs_u + s_vs_f + d_vs_a;
    }

    // 결과 표시 함수
    function showResults() {
        // 테스트 컨테이너 숨기기
        testContainer.style.display = 'none';
        
        // 결과 컨테이너 표시
        resultContainer.style.display = 'block';
        
        // 결과 유형 정보 가져오기
        const result = results[resultTypeCode];
        
        // 결과 내용 생성
        resultTitle.textContent = `${result.emoji} ${result.title}`;
        
        // 결과 설명 표시
        resultDescription.textContent = result.description;
        
        // 결과 상세 정보 표시
        resultDetail.innerHTML = `
            <h3>✨ 당신의 특징</h3>
            <ul>
                ${result.details.특징.map(item => `<li>${item}</li>`).join('')}
            </ul>
            <h3>🎯 교육 스타일</h3>
            <ul>
                ${result.details.스타일.map(item => `<li>${item}</li>`).join('')}
            </ul>
            <h3>💫 당신의 모토</h3>
            <p><strong>"${result.details.모토}"</strong></p>
        `;
    }

    // Google Sheets에 결과 저장 함수
    function saveResultToGoogleSheets() {
        try {
            // 저장할 데이터 구성
            const resultData = {
                resultTypeCode: resultTypeCode,
                scores: scores,
                userAnswers: userAnswers,
                timestamp: new Date().toISOString()
            };
            
            // Google Apps Script 웹 앱 URL
            const scriptURL = 'https://script.google.com/macros/s/AKfycbzgvEYX0StXZhDE7394rJ3-AIkrc11BmKGvaltez0d_s20d3YkUMyyVhZMDUOLCs2Jh1Q/exec';
            
            console.log("데이터 저장 시도 중...", resultData);
            
            // 데이터 전송
            fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors', // CORS 이슈 방지
                headers: {
                    'Content-Type': 'text/plain' // JSON 대신 text/plain 사용
                },
                body: JSON.stringify(resultData)
            })
            .then(response => {
                console.log('결과가 성공적으로 저장되었습니다!');
                // 로컬 스토리지에도 백업으로 저장
                try {
                    const savedResults = JSON.parse(localStorage.getItem('surveyResults') || '[]');
                    savedResults.push({
                        ...resultData,
                        savedAt: new Date().toISOString()
                    });
                    localStorage.setItem('surveyResults', JSON.stringify(savedResults));
                    console.log('결과가 로컬 스토리지에도 저장되었습니다.');
                } catch (storageError) {
                    console.warn('로컬 스토리지 저장 실패:', storageError);
                }
            })
            .catch(error => {
                console.error('결과 저장 중 오류 발생:', error);
                alert('결과 저장 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
            });
        } catch (error) {
            console.error('saveResultToGoogleSheets 함수 실행 중 오류:', error);
        }
    }

    // 로딩 화면 표시 함수
    function showLoadingScreen() {
        // 기존 컨테이너 숨기기
        testContainer.style.display = 'none';
        resultContainer.style.display = 'none';
        
        // 로딩 컨테이너 생성
        const loadingContainer = document.createElement('div');
        loadingContainer.id = 'loading-container';
        loadingContainer.className = 'loading-container';
        
        // 로딩 애니메이션 요소 생성
        const loadingAnimation = document.createElement('div');
        loadingAnimation.className = 'loading-animation';
        
        // 원형 프로그레스 바 생성
        const circleProgress = document.createElement('div');
        circleProgress.className = 'circle-progress';
        
        // 로딩 텍스트 생성
        const loadingText = document.createElement('div');
        loadingText.className = 'loading-text';
        loadingText.innerHTML = '<h3>결과 분석 중...</h3>';
        
        // 로딩 단계 텍스트 생성
        const loadingSteps = document.createElement('div');
        loadingSteps.className = 'loading-steps';
        loadingSteps.id = 'loading-steps';
        loadingSteps.textContent = '응답 수집 중...';
        
        // 로딩 퍼센트 생성
        const loadingPercent = document.createElement('div');
        loadingPercent.className = 'loading-percent';
        loadingPercent.id = 'loading-percent';
        loadingPercent.textContent = '0%';
        
        // 요소들 추가
        loadingAnimation.appendChild(circleProgress);
        loadingContainer.appendChild(loadingAnimation);
        loadingContainer.appendChild(loadingText);
        loadingContainer.appendChild(loadingSteps);
        loadingContainer.appendChild(loadingPercent);
        
        // 페이지에 로딩 컨테이너 추가
        document.body.appendChild(loadingContainer);
        
        // 로딩 애니메이션 시작
        startLoadingAnimation();
    }
    
    // 로딩 애니메이션 시작 함수
    function startLoadingAnimation() {
        const steps = [
            '응답 수집 중...',
            '성향 분석 중...',
            '결과 생성 중...'
        ];
        
        let currentStep = 0;
        let progress = 0;
        
        const loadingSteps = document.getElementById('loading-steps');
        const loadingPercent = document.getElementById('loading-percent');
        
        // 로딩 애니메이션 인터벌
        const loadingInterval = setInterval(() => {
            progress += 1;
            
            // 진행률 업데이트
            loadingPercent.textContent = `${progress}%`;
            
            // 단계 업데이트
            if (progress === 33) {
                currentStep = 1;
                loadingSteps.textContent = steps[currentStep];
            } else if (progress === 66) {
                currentStep = 2;
                loadingSteps.textContent = steps[currentStep];
            }
            
            // 로딩 완료
            if (progress >= 100) {
                clearInterval(loadingInterval);
            }
        }, 30); // 30ms마다 업데이트 (총 3초)
    }
    
    // 로딩 화면 숨기기 함수
    function hideLoadingScreen() {
        const loadingContainer = document.getElementById('loading-container');
        if (loadingContainer) {
            // 페이드 아웃 효과 추가
            loadingContainer.classList.add('fade-out');
            
            // 애니메이션 완료 후 요소 제거
            setTimeout(() => {
                document.body.removeChild(loadingContainer);
                resultContainer.style.display = 'block';
            }, 500);
        }
    }

    // 테스트 재시작 함수
    function restartTest() {
        // 사용자 응답 및 점수 초기화
        userAnswers = Array(questions.length).fill(null);
        scores = {
            RG: 0,
            IU: 0,
            SF: 0,
            DA: 0
        };
        resultTypeCode = "";
        
        // 결과 컨테이너 숨기기
        resultContainer.style.display = 'none';
        
        // 테스트 컨테이너 표시
        testContainer.style.display = 'block';
        
        // 첫 번째 질문 표시
        showQuestion(0);
    }

    // 결과 공유 함수
    function shareResult() {
        // 결과 정보 가져오기
        const resultInfo = results[resultTypeCode];
        
        // 현재 URL 가져오기
        const currentUrl = window.location.href.split('?')[0]; // 쿼리 파라미터 제거
        
        // 공유 텍스트 생성 - 전체 내용 포함
        const shareText = `
📊 나의 학부모 교육 스타일 테스트 결과 📊

✨ 나는 "${resultInfo.title}" 타입의 학부모래요! ${resultInfo.emoji}

📝 특징:
${resultInfo.details.특징.map(item => `• ${item}`).join('\n')}

🎯 교육 스타일:
${resultInfo.details.스타일.map(item => `• ${item}`).join('\n')}

💫 나의 모토:
"${resultInfo.details.모토}"

${resultInfo.description}

✨ 당신도 테스트 해보세요! ✨
${currentUrl}

#나의학부모타입 #교육스타일테스트 #학부모심리테스트
`;
        
        // 클립보드에 복사
        navigator.clipboard.writeText(shareText).then(() => {
            alert('결과가 클립보드에 복사되었습니다! SNS에 붙여넣기해서 공유해보세요 😊');
            console.log('결과가 클립보드에 복사되었습니다.');
        }).catch(err => {
            alert('결과 복사에 실패했습니다. 직접 선택해서 복사해주세요!');
            console.error('클립보드 복사 실패:', err);
        });
    }
});

// CSS 변수 설정을 위한 함수
document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.getElementById('progress-bar');
    if(progressBar) {
        progressBar.style.setProperty('--progress', '0%');
    }
});
