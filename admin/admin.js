const bankName = document.getElementById("bank_name");
const acctName = document.getElementById("acct_name");
const acctNo = document.getElementById("acct_no");
const gcashBankName = document.getElementById("gcash_bank_name");
const gcashAcctName = document.getElementById("gcash_acct_name");
const gcashAcctNo = document.getElementById("gcash_acct_no");

const confirmAccessModal = document.getElementById("confirm-access-modal");

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwjWxIK1Vc_n-rUCdWFQ1GJ8nj0QXAm92GPdAgwxdoNPjOoUg1WfqzH2P8neX_NoA2X/exec";

document.getElementById('admin-login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const tokenInput = document.getElementById('admin-token').value;
  const btn = e.target.querySelector('button');
  
  btn.innerText = "Verifying...";
  
  try {
    // We add a timestamp to prevent the browser from serving a cached error
    const fetchUrl = `${SCRIPT_URL}?action=getAdmin&t=${Date.now()}`;
    const response = await fetch(fetchUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const adminConfig = await response.json();
    
    alert(adminConfig);
    /*
    // Check token (Assuming your column header is named "admin-token")
    if (tokenInput === adminConfig['token']) {
      localStorage.setItem('admin_config', JSON.stringify(adminConfig));
      document.getElementById('confirm-access-modal').classList.add('hidden');
      // loadBookings(); // Initialize the dashboard
    } else {
      alert("Invalid Admin Token");
      btn.innerText = "Enter Admin";
    }
    */
  } catch (error) {
    console.error("Fetch error:", error);
    alert("Connection failed.");
  }
});

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