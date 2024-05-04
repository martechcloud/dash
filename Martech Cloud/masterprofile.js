'use strict';
document.addEventListener("DOMContentLoaded", function() {
  const appScriptUrl = "https://script.google.com/macros/s/AKfycbwdZZ8Y357eQB4jeCyKvmfrPap8Q3vmNZjZGIXyyUlkN8eSNmsft0oNyzZ5Fbs42OSi/exec?sheet=MyProfile"; // Replace with your actual URL
  fetch(appScriptUrl)
    .then(response => response.json())
    .then(data => { 
        sessionStorage.setItem("secondaryprofileusername", data[2][7]);
        sessionStorage.setItem("secondaryprofilerole", data[2][2]); 

        var Username = sessionStorage.getItem("Username");
        var filteredRow = data.filter(function(row) {
            return row[0] === Username;
        });  
        sessionStorage.setItem("profileusername", filteredRow[0][7]);
        sessionStorage.setItem("profilerole", filteredRow[0][2]); 
        document.getElementById('profileusername').textContent = filteredRow[0][7]; 
        document.getElementById('profilerole').textContent = filteredRow[0][2];           
    })
})