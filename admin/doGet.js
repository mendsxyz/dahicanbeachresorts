/* Version 1
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

// Version 2
function doGet(e) {
  const ss = SpreadsheetApp.openById("1CyRRIz4GliqoK21AQO9jbqOupCDXvxEy6QItQHIRN3s");
  const action = e.parameter.action; // Used to decide which data to send
  
  // 1. ACTION: Fetch Admin Credentials/Config
  if (action === 'getAdmin') {
    const sheet = ss.getSheetByName("Admin"); // Your existing sheet name
    const rows = sheet.getDataRange().getValues();
    const headers = rows[0];
    const adminData = rows[1]; // Get the 2nd row (actual data)
    
    let obj = {};
    headers.forEach((key, i) => obj[key] = adminData[i]);
    
    return ContentService.createTextOutput(JSON.stringify(obj))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  // 2. ACTION: Fetch Reservation Records
  if (action === 'getReservationData') {
    const sheet = ss.getSheetByName("Reservation_Data");
    const rows = sheet.getDataRange().getValues();
    const headers = rows.shift(); // Remove the header row
    
    const formatted = rows.map(row => {
      let obj = {};
      headers.forEach((key, i) => obj[key] = row[i]);
      return obj;
    });
    
    return ContentService.createTextOutput(JSON.stringify(formatted))
      .setMimeType(ContentService.MimeType.JSON);
  }
}