'use strict';

document.addEventListener("DOMContentLoaded", function() {
    // Function to fetch IP address
    function getIPAddress() {
        return fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => data.ip)
            .catch(error => {
                console.error('Error fetching IP address:', error);
            });
    }

    // Fetch user's IP address
    getIPAddress().then(userIPAddress => {
        var cellNumber = "E2";
        var webAppUrl = 'https://script.google.com/macros/s/AKfycbxKiSPISfUwk03wXrxjERfGiN4OprqgYv3rAobW9MAOh1RR3sf03zRO335pSCS_XR8T/exec?cellNumber=' + cellNumber;
        fetch(webAppUrl)
            .then(response => response.text())
            .then(data => {
                if (data.trim() === userIPAddress) {
                    // Pass or do nothing if the output matches the user's IP address
                } else {
                    var box = document.getElementById("IPMissmatched");
                    box.style.display = "inline-block";
                    setTimeout(function () {
                        box.style.display = "none";    
                        window.location.href = "https://martechcloud.github.io/dash/martechcloudipwhitelisting.html"; // Replace with the URL of another page
                    }, 2000);             
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});
