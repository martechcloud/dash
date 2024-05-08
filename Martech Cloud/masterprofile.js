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

        // for main profile
        sessionStorage.setItem("profileusername", filteredRow[0][7]);
        sessionStorage.setItem("profilerole", filteredRow[0][2]); 

        // for myprofile page
        sessionStorage.setItem("usernamedetails", filteredRow[0][0]);
        sessionStorage.setItem("roledetails", filteredRow[0][2]); 
        sessionStorage.setItem("firstNamedetails", filteredRow[0][3]);
        sessionStorage.setItem("lastNamedetails", filteredRow[0][4]); 
        sessionStorage.setItem("emaildetails", filteredRow[0][5]);
        sessionStorage.setItem("phoneNumberdetails", filteredRow[0][6]); 

        document.getElementById('profileusername').textContent = filteredRow[0][7]; 
        document.getElementById('profilerole').textContent = filteredRow[0][2];         
        
        var filteredRow = data.filter(function(row) {
            return row[0] !== Username && row[0] !== "Username";
        });
        sessionStorage.setItem("secondaryprofileusername", filteredRow[0][7]);
        sessionStorage.setItem("secondaryprofilerole", filteredRow[0][2]); 
    })
})
