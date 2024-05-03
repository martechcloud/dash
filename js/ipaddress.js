function fetchIPAddress() {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ipAddress = data.ip;
            document.getElementById('ip-address').textContent = ipAddress;
        })
        .catch(error => {
            console.error('Error fetching IP address:', error);
            document.getElementById('ip-address').textContent = 'Failed to fetch IP address';
        });
}

// Function to copy text to clipboard
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    var copyIcon = document.getElementById("copy-icon");
    copyIcon.style.color = "#696cff";
}

// Call the function when the page loads
window.onload = function() {
    fetchIPAddress();
    const copyIcon = document.getElementById('copy-icon');
    copyIcon.addEventListener('click', function() {
        const ipAddress = document.getElementById('ip-address').textContent;
        copyToClipboard(ipAddress);
    });
};



function submitip() {
    document.getElementById('submitbutton').style.backgroundColor = 'lightgrey';
    document.getElementById('submitbutton').style.border = 'lightgrey';
    var username = document.getElementById("IP").value;
	var password = document.getElementById("password").value;

    var formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    fetch("https://script.google.com/macros/s/AKfycbyBUL2H60q5Hj-ajUpCsRAB3Lg2ZxsImljFAiD1UtNk95GK04KszlFMZWVeRfhABurMlg/exec", {
        method: "POST",
        body: formData,
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        if (data.redirectUrl) {
            var box = document.getElementById("box");
            box.style.display = "inline-block";
            document.getElementById('submitbutton').style.backgroundColor = '';
            document.getElementById('submitbutton').style.border = '';
            document.getElementById("formAuthentication").reset();
            setTimeout(function() {
                box.style.display = "none"; 
            }, 2000); // 10 seconds
            window.location.href = "index.html"
        } else {
            var box2 = document.getElementById("box2");
            box2.style.display = "inline-block";
            document.getElementById('submitbutton').style.backgroundColor = '';
            document.getElementById('submitbutton').style.border = '';
            setTimeout(function() {
                box2.style.display = "none"; 
            }, 2000); // 10 seconds
        }
    })
    .catch(function(error) {
        console.error("Error:", error);
        loadingSpinner.style.display = "none";
    });
};
       