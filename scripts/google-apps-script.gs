const SHEET_ID = '1zCY4TVlupgGNMBZFhDG8wqU_otYocTKaizqt4-moJoA';
const SHEET_NAME = 'RSVP';

function doPost(e) {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  const sheet =
    spreadsheet.getSheetByName(SHEET_NAME) ||
    spreadsheet.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Name', 'Attending', 'Guests', 'Message']);
  }

  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.name || '',
    data.attending || '',
    data.guests || '',
    data.message || '',
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
