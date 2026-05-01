/*
function doGet() {
  const ss = SpreadsheetApp.openById(
    "1CyRRIz4GliqoK21AQO9jbqOupCDXvxEy6QItQHIRN3s"
  );
  const sheet = ss.getSheetByName("Admin");
  const rows = sheet.getDataRange().getValues();
  
  const headers = rows.shift();
  
  const formatted = rows.map(row => {
    let obj = {};
    headers.forEach((key, i) => obj[key] = row[i]);
    return obj;
  });
  
  return ContentService
    .createTextOutput(JSON.stringify(formatted))
    .setMimeType(ContentService.MimeType.JSON);
}*/