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
  const tokenInput = document.getElementById('admin-token').value.trim();
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
    
    // alert(adminConfig.token);
    
    // Check token (Assuming your column header is named "admin-token")
    if (tokenInput === adminConfig.token) {
      localStorage.setItem('admin_config', JSON.stringify(adminConfig));
      document.getElementById('confirm-access-modal').classList.add('hidden');
      
      populateFields();
      // loadBookings(); // Initialize the dashboard
    } else {
      alert("Invalid Admin Token");
      btn.innerText = "Enter Admin";
    }
  } catch (error) {
    console.error("Fetch error:", error);
    alert("Connection failed.");
  }
});

document.getElementById("admin-data-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const btn = e.target.querySelector('#save-button');
  
  saveAdminData(btn);
});

async function saveAdminData(btn) {
  btn.innerText = "Saving...";
  
  try {
    // Upload Data to Backend
    const formData = new FormData();
    formData.append("token", "Dahican$30972_");
    formData.append("timestamp", new Date());
    formData.append("bank_name", bankName.value);
    formData.append("acct_name", acctName.value);
    formData.append("acct_no", "*" + acctNo.value);
    formData.append("gcash_bank_name", gcashBankName.value);
    formData.append("gcash_acct_name", gcashAcctName.value);
    formData.append("gcash_acct_no", "*" + gcashAcctNo.value);
    
    const res = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: formData,
    });
    
    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }
    
    const data = await res.json();
    
    if (data.status === 'success') {
      alert("Admin Data Saved!");
      btn.innerText = "Save Changes";
    }
  } catch (err) {
    alert(err);
  }
}

function populateFields() {
  const adminData = JSON.parse(localStorage.getItem("admin_config"));
  
  if (adminData) {
    const data = adminData;
    bankName.value = data.bank_name;
    acctName.value = data.acct_name;
    acctNo.value = data.acct_no;
    gcashBankName.value = data.gcash_bank_name;
    gcashAcctName.value = data.gcash_acct_name;
    gcashAcctNo.value = data.gcash_acct_no;
  }
}

function restartSession() {
  localStorage.removeItem("admin_config");
  location.reload();
}

populateFields();