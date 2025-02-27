// Google Apps Script 코드
// 이 코드를 Google Apps Script 편집기에 붙여넣고 배포하세요

// 웹 앱으로 POST 요청을 처리하는 함수
function doPost(e) {
  try {
    // 요청 데이터 파싱
    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseError) {
      // JSON 파싱 오류 시 텍스트 그대로 사용
      data = {
        rawContent: e.postData.contents,
        parseError: parseError.toString()
      };
    }
    
    // 스프레드시트 ID - 여기에 실제 스프레드시트 ID를 입력하세요
    const spreadsheetId = 'YOUR_SPREADSHEET_ID';
    const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName('Responses') || 
                  SpreadsheetApp.openById(spreadsheetId).getSheets()[0];
    
    // 타임스탬프 생성
    const timestamp = new Date().toISOString();
    
    // 결과 데이터 추출
    const resultTypeCode = data.resultTypeCode || '';
    const scores = data.scores || {};
    const userAnswers = data.userAnswers || [];
    
    // 스프레드시트에 저장할 데이터 준비
    const rowData = [
      timestamp,
      resultTypeCode,
      JSON.stringify(scores),
      JSON.stringify(userAnswers)
    ];
    
    // 스프레드시트에 데이터 추가
    sheet.appendRow(rowData);
    
    // 성공 응답 반환 - CORS 헤더 추가
    return ContentService.createTextOutput(JSON.stringify({
      result: 'success',
      message: '데이터가 성공적으로 저장되었습니다.'
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
  } catch (error) {
    // 오류 응답 반환 - CORS 헤더 추가
    return ContentService.createTextOutput(JSON.stringify({
      result: 'error',
      message: error.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
}

// CORS 지원을 위한 OPTIONS 요청 처리
function doOptions(e) {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type')
    .setHeader('Access-Control-Max-Age', '3600');
}
