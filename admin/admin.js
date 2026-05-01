const bankName = document.getElementById("bank_name");
const acctName = document.getElementById("acct_name");
const acctNo = document.getElementById("acct_no");
const gcashBankName = document.getElementById("gcash_bank_name");
const gcashAcctName = document.getElementById("gcash_acct_name");
const gcashAcctNo = document.getElementById("gcash_acct_no");

async function fetchAdminData() {
  const scriptUrl = "https://script.google.com/macros/s/AKfycbwjWxIK1Vc_n-rUCdWFQ1GJ8nj0QXAm92GPdAgwxdoNPjOoUg1WfqzH2P8neX_NoA2X/exec";
  
  try {
    const res = await fetch(scriptUrl, {
      method: "GET",
    });
    
    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }
    
    const data = await res.json();
    
    if (data.status === 'success') {
      bankName.innerText = data[0].bank_name;
    }
  } catch (err) {
    alert(err);
  }
}

async function saveAdminData() {
  try {
    // Upload Data to Backend
    const formData = new FormData();
    formData.append("timestamp", new Date());
    formData.append("bank_name", bankName.innerText);
    formData.append("acct_name", acctName.innerText);
    formData.append("acct_no", acctNo.innerText);
    formData.append("gcash_bank_name", gcashBankName.innerText);
    formData.append("gcash_acct_name", gcashAcctName.innerText);
    formData.append("gcash_acct_no", gcashAcctNo.innerText);
    
    const res = await fetch(scriptUrl, {
      method: 'POST',
      body: formData,
    });
    
    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }
    
    const data = await res.json();
    
    if (data.status === 'success') {
      alert("Admin Data Saved!");
    }
  } catch (err) {
    alert(err);
  }
}