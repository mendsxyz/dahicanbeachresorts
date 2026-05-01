/*
function sendPendingEmails() {
  try {
    const ss = SpreadsheetApp.openById(
      "1CyRRIz4GliqoK21AQO9jbqOupCDXvxEy6QItQHIRN3s"
    );
    const sheet = ss.getSheetByName("Reservation_Data");
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    
    const emailCol = headers.indexOf("guest_email");
    const sentCol = headers.indexOf("email_sent");
    
    if (emailCol === -1 || sentCol === -1) {
      console.log("Column not found");
      return;
    }
    
    for (let i = 1; i < data.length; i++) {
      const email = data[i][emailCol];
      const sent = data[i][sentCol];
      
      // Only send if email exists AND not already sent
      if (email && !sent) {
        try {
          MailApp.sendEmail({
            to: email,
            subject: "Submission received",
            body: "Your submission has been successfully received",
            name: "Web Services",
          });
          
          // Mark as sent
          sheet.getRange(i + 1, sentCol + 1).setValue(new Date());
          
          Utilities.sleep(500); // small delay (avoid limit issues)
        } catch (err) {
          console.log("Error sending to " + email + ": " + err);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
}*/