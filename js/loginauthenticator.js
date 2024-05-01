

'use strict';

document.addEventListener("DOMContentLoaded", function() {
    var Username = sessionStorage.getItem("Username");
    var key = sessionStorage.getItem("key");
    console.log(key)
    
    var uniqueKey = Username + key;
    var appScriptUrl = "https://script.google.com/macros/s/AKfycby7Q0EmJsOtukn19z1ulqaHaR7Ys0UJKz_D2-LKjsFWCZk-80nktAhpzt5J5S9eSPvKhQ/exec?uniqueKey=" + uniqueKey;
    
    // Send unique key to AppScript
    fetch(appScriptUrl)
    .then(response => response.text())
    .then(data => {
        // Check response
        if (data === uniqueKey) {
        } else {
            // Redirect user to another page
            window.location.href = "https://martechcloud.github.io/dash/index.html";
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
})