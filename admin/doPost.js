function doPost(e) {
  try {
    const ss = SpreadsheetApp.openById(
      "1CyRRIz4GliqoK21AQO9jbqOupCDXvxEy6QItQHIRN3s"
    );
    
    if (e.parameter.location) {
      const sheet = ss.getSheetByName("Admin");
      
      sheet.appendRow([
        new Date(),
        e.parameter.bank_name,
        e.parameter.acct_name,
        e.parameter.acct_no,
        e.parameter.gcash_bank_name,
        e.parameter.gcash_acct_name,
        e.parameter.gcash_acct_no
      ]);
      
      return ContentService
        .createTextOutput(JSON.stringify({
          status: "success"
        }))
        .setMimeType(ContentService.MimeType.JSON);
    } else {
      return ContentService
        .createTextOutput(JSON.stringify({
          status: "invalid type"
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "error",
        message: err.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}