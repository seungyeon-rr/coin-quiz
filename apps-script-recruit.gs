// ── 신입생 모집 신청서 → 구글시트 수집용 Apps Script ──
// 사용법은 파일 하단 주석 참고

function doGet() {
  return ContentService.createTextOutput('신입생 모집 신청 수집기 작동중 ✅');
}

function doPost(e) {
  if (!e || !e.postData) {
    return ContentService.createTextOutput('POST 요청이 아닙니다 (편집기 Run 무시)');
  }
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('신청') || ss.insertSheet('신청');
  const d = JSON.parse(e.postData.contents);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['제출시각', '중학교명', '학년', '반', '이름', '연락처']);
  }
  sheet.appendRow([d.ts, d.school, d.grade, d.cls, d.name, d.phone]);
  return ContentService.createTextOutput('ok');
}

/*
[설치 방법]
1. sheets.google.com 에서 새 스프레드시트 생성
2. 상단 메뉴 [확장 프로그램] → [Apps Script]
3. 기본 코드 지우고 이 파일 내용 전체 붙여넣기 → 저장
4. 우측 상단 [배포] → [새 배포] → 유형: '웹 앱'
   - 실행: 나
   - 액세스 권한: '모든 사용자'
5. [배포] 클릭 → 권한 승인 → 생성된 '웹 앱 URL' 복사
6. recruit.html 의  const SHEET_URL = "";  에 그 URL 붙여넣기
7. 응답은 스프레드시트 '신청' 탭에 자동으로 쌓입니다.
*/
