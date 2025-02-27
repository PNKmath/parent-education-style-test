// 테스트 데이터 생성 스크립트
// 이 파일은 개발 및 테스트 목적으로만 사용됩니다.
// 실제 배포 시에는 제거하거나 접근을 제한해야 합니다.

// 테스트 데이터 생성 함수
function generateTestData(count = 10) {
    // 결과 유형 코드 목록
    const resultTypeCodes = ['RGIU', 'RGSF', 'RGDA', 'IURG', 'IUSF', 'IUDA', 'SFRG', 'SFIU', 'SFDA', 'DARG', 'DAIU', 'DASF'];
    
    // 현재 날짜 기준으로 과거 30일 내의 랜덤 날짜 생성
    function getRandomDate() {
        const now = new Date();
        const pastDate = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000);
        return pastDate.toISOString();
    }
    
    // 랜덤 점수 생성 (0-10 사이)
    function getRandomScore() {
        return Math.floor(Math.random() * 11);
    }
    
    // Firebase 데이터베이스 참조
    const resultsRef = firebase.database().ref('test_results');
    
    // 테스트 데이터 생성 및 저장
    for (let i = 0; i < count; i++) {
        // 랜덤 결과 유형 선택
        const resultTypeCode = resultTypeCodes[Math.floor(Math.random() * resultTypeCodes.length)];
        
        // 랜덤 점수 생성
        const scores = {
            RG: getRandomScore(),
            IU: getRandomScore(),
            SF: getRandomScore(),
            DA: getRandomScore()
        };
        
        // 테스트 데이터 객체 생성
        const testData = {
            resultTypeCode: resultTypeCode,
            scores: scores,
            timestamp: getRandomDate()
        };
        
        // Firebase에 데이터 저장
        resultsRef.push(testData)
            .then(() => {
                console.log(`테스트 데이터 #${i+1} 저장 성공`);
                
                // 모든 데이터가 저장되면 완료 메시지 표시
                if (i === count - 1) {
                    alert(`${count}개의 테스트 데이터가 성공적으로 생성되었습니다.`);
                }
            })
            .catch(error => {
                console.error(`테스트 데이터 #${i+1} 저장 실패:`, error);
            });
    }
}

// 테스트 데이터 생성 함수를 전역으로 노출
window.generateTestData = generateTestData;
