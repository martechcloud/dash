function login() {
    document.getElementById('submitbutton').style.backgroundColor = 'lightgrey';
    document.getElementById('submitbutton').style.border = 'lightgrey';
    var username = document.getElementById("email").value;
	var password = document.getElementById("password").value;

    var formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    fetch("https://script.google.com/macros/s/AKfycbxV7F6QB27lIoY5aOdlqn3BTglp_e7D04mD2M9uRthi3TP8rm3hzBLMCrsClZztFOPgOg/exec", {
        method: "POST",
        body: formData,
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        if (data.redirectUrl) {
            document.getElementById('submitbutton').style.backgroundColor = '';
            document.getElementById('submitbutton').style.border = '';
            window.location.href = data.redirectUrl;
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
       