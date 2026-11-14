let jwtToken = "";

// Fetch applications on page load
async function loadApps() {
const res = await fetch('/applications');
const data = await res.json();
const list = document.getElementById('appList');
list.innerHTML = data.map(app => `
<div class="app-item">
<div><strong>${app.university}</strong> - ${app.course}</div>
<div><span style="background: #eee; padding: 4px 8px; border-radius: 12px; font-size: 12px;">${app.status}</span></div>
</div>
`).join('');
}

// Mock login to get JWT
async function login() {
const res = await fetch('/applications/login', { method: 'POST' });
const data = await res.json();
jwtToken = data.token;
document.getElementById('token-status').innerText = "✅ Token generated & attached to browser memory!";
}

// Add Application via API
async function addApp(event) {
event.preventDefault();
document.getElementById('form-error').innerText = "";

if (!jwtToken) {
document.getElementById('form-error').innerText = "❌ Access Denied: Click the Generate Token button first!";
return;
}

const payload = {
university: document.getElementById('uni').value,
course: document.getElementById('course').value,
status: document.getElementById('status').value
};

const res = await fetch('/applications', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'Authorization': `Bearer ${jwtToken}`
},
body: JSON.stringify(payload)
});

if (res.status === 201) {
document.getElementById('appForm').reset();
loadApps(); // Refresh the visual list automatically
} else {
const errorData = await res.json();
document.getElementById('form-error').innerText = "❌ API Error: " + (errorData.errors ? errorData.errors[0].msg : JSON.stringify(errorData));
}
}

// Trigger initial load
loadApps();