
'use strict';
document.addEventListener("DOMContentLoaded", function() {
  const appScriptUrl = "https://script.google.com/macros/s/AKfycbwdZZ8Y357eQB4jeCyKvmfrPap8Q3vmNZjZGIXyyUlkN8eSNmsft0oNyzZ5Fbs42OSi/exec?sheet=MyProfile"; // Replace with your actual URL
  fetch(appScriptUrl)
    .then(response => response.json())
    .then(data => {  
        var Username = sessionStorage.getItem("Username");
        var filteredRow = data.filter(function(row) {
            return row[0] === Username;
        });  
        document.getElementById('Username').value = filteredRow[0][0];
        document.getElementById('Role').value = filteredRow[0][6];
        document.getElementById('firstName').value = filteredRow[0][7];
        document.getElementById('lastName').value = filteredRow[0][8];
        document.getElementById('email').value = filteredRow[0][9];
        document.getElementById('phoneNumber').value = filteredRow[0][10];

        document.getElementById('firstName').disabled = false;
        document.getElementById('lastName').disabled = false;
        document.getElementById('email').disabled = false;
        document.getElementById('phoneNumber').disabled = false;

        document.getElementById('submitbutton').disabled = false;
      
    })
})