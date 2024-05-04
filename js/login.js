function login() {
    document.getElementById('submitbutton').style.backgroundColor = 'lightgrey';
    document.getElementById('submitbutton').style.border = 'lightgrey';
    var username = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Generate a random key
    var key = Math.random().toString(36).substr(2, 10);
    // Store the key in sessionStorage
    sessionStorage.setItem("Username", username);
    sessionStorage.setItem("key", key);

    // Fetch IP address
    fetch('https://api.ipify.org?format=json')
        .then(function(response) {
            return response.json();
        })
        .then(function(ipData) {
            var ipAddress = ipData.ip;

            var formData = new FormData();
            formData.append("username", username);
            formData.append("password", password);
            // Append the key and IP address to the form data
            formData.append("key", key);
            formData.append("ipAddress", ipAddress);

            // Make the POST request to your App Script URL
            fetch("https://script.google.com/macros/s/AKfycbxV7F6QB27lIoY5aOdlqn3BTglp_e7D04mD2M9uRthi3TP8rm3hzBLMCrsClZztFOPgOg/exec", {
                    method: "POST",
                    body: formData,
                })
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    if (data.redirectUrl === "IP Address not found") {
                        var box = document.getElementById("IPMissmatched");
                        box.style.display = "inline-block";
                        document.getElementById('submitbutton').style.backgroundColor = '';
                        document.getElementById('submitbutton').style.border = '';
                        setTimeout(function() {
                            box.style.display = "none";
                            window.location.href = "martechcloudipwhitelisting.html";
                        }, 2000); // 10 seconds
                    } else if (data.redirectUrl === "Invalid username or password") {
                        var box2 = document.getElementById("box2");
                        box2.style.display = "inline-block";
                        document.getElementById('submitbutton').style.backgroundColor = '';
                        document.getElementById('submitbutton').style.border = '';
                        setTimeout(function() {
                            box2.style.display = "none";
                        }, 2000); // 10 seconds
                    } else {
                        document.getElementById('submitbutton').style.backgroundColor = '';
                        document.getElementById('submitbutton').style.border = '';
                        window.location.href = data.redirectUrl;
                    }
                })
                .catch(function(error) {
                    console.error("Error:", error);
                    loadingSpinner.style.display = "none";
                });
        })
        .catch(function(error) {
            console.error("Error fetching IP:", error);
        });
}
