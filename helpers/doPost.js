/*
function doPost(e) {
  try {
    const ss = SpreadsheetApp.openById(
      "1CyRRIz4GliqoK21AQO9jbqOupCDXvxEy6QItQHIRN3s"
    );
    
    if (e.parameter.booking_id) {
      const sheet = ss.getSheetByName("Reservation_Data");
      
      sheet.appendRow([
        e.parameter.timestamp || new Date(),
        e.parameter.booking_id,
        e.parameter.guest_name,
        e.parameter.guest_email,
        e.parameter.guest_phone_no,
        e.parameter.guest_special_req,
        e.parameter.room,
        e.parameter.check_in,
        e.parameter.check_out,
        e.parameter.total,
        e.parameter.proof_url || "errorFetchingUrl"
      ]);
      
      return ContentService
        .createTextOutput(JSON.stringify({
          status: "success"
        }))
        .setMimeType(ContentService.MimeType.JSON);
    } else if (e.parameter.bank_name) {
      const sheet = ss.getSheetByName("Admin");
      
      sheet.appendRow([
        e.parameter.bank_name,
        e.parameter.acct_name,
        e.parameter.acct_no,
        e.parameter.gcash_bank_name,
        e.parameter.gcash_acct_name,
        e.parameter.gcash_acct_no,
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
}*/