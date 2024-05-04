
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
        document.getElementById('usernamedetails').value = filteredRow[0][0];
        document.getElementById('roledetails').value = filteredRow[0][2];
        document.getElementById('firstNamedetails').value = filteredRow[0][3];
        document.getElementById('lastNamedetails').value = filteredRow[0][4];
        document.getElementById('emaildetails').value = filteredRow[0][5];
        document.getElementById('phoneNumberdetails').value = filteredRow[0][6];

        document.getElementById('firstNamedetails').disabled = false;
        document.getElementById('lastNamedetails').disabled = false;
        document.getElementById('emaildetails').disabled = false;
        document.getElementById('phoneNumberdetails').disabled = false;
        document.getElementById('submitbutton').disabled = false;
      
    })
})


function handleResponse1(response) {
    if (response && response.result === "success") {
        document.getElementById('submitbutton').style.backgroundColor = '';
        document.getElementById('submitbutton').style.border = '';
        var box = document.getElementById("box");
        box.style.display = "inline-block";
        setTimeout(function () {
            box.style.display = "none";
        }, 2000);
    } else {
        document.getElementById('submitbutton').style.backgroundColor = '';
        document.getElementById('submitbutton').style.border = '';
        var box2 = document.getElementById("box2");
        box2.style.display = "inline-block";
        setTimeout(function () {
            box2.style.display = "none";    
        }, 2000);
    }
}


function adddetails() {
    document.getElementById('submitbutton').style.backgroundColor = 'lightgrey';
    document.getElementById('submitbutton').style.border = 'lightgrey';
    var key = "profile";
    var name = "";
    var number = "";
    var email = "";
    var age = "";
    var usernamedetails = document.getElementById("usernamedetails").value;
    var roledetails = document.getElementById("roledetails").value;
    var firstNamedetails = document.getElementById("firstNamedetails").value;
    var lastNamedetails = document.getElementById("lastNamedetails").value;
    var emaildetails = document.getElementById("emaildetails").value;
    var phoneNumberdetails = document.getElementById("phoneNumberdetails").value;

    if (phoneNumberdetails !== "") {
        var phonePattern = /^[0-9]{12}$/;
        if (!phonePattern.test(phoneNumberdetails)) {
            document.getElementById('almessage').innerHTML = "Phone Number is not valid!";
            var box2 = document.getElementById("box2");
            box2.style.display = "inline-block";
            setTimeout(function () {
                box2.style.display = "none";
                document.getElementById('submitbutton').style.backgroundColor = '';
                document.getElementById('submitbutton').style.border = '';
            }, 3000);
            return;
        }
    }

    if (emaildetails !== "") {
        var re = /\S+@\S+\.\S+/;
        if (!re.test(emaildetails)) {
            document.getElementById('almessage').innerHTML = "Email is not valid!"
            var box2 = document.getElementById("box2");
                box2.style.display = "inline-block";
                setTimeout(function () {
                    box2.style.display = "none";
                    document.getElementById('submitbutton').style.backgroundColor = '';
                    document.getElementById('submitbutton').style.border = '';
                }, 3000);
            return;
        }
    }

    var script = document.createElement('script');
    script.src = "https://script.google.com/macros/s/AKfycbzpyf_9pT91KKIxKlxEiixvSxvMy_QfeDfXB3V1_YDkIBZE_hw7euu-ovCYk_e-6Hlp/exec" +
                 "?callback=handleResponse1" +
                 "&key=" + encodeURIComponent(key) +
                 "&name=" + encodeURIComponent(name) +
                 "&number=" + encodeURIComponent(number) +
                 "&email=" + encodeURIComponent(email) +
                 "&age=" + encodeURIComponent(age)+
                 "&usernamedetails=" + encodeURIComponent(usernamedetails)+
                 "&roledetails=" + encodeURIComponent(roledetails)+
                 "&firstNamedetails=" + encodeURIComponent(firstNamedetails)+
                 "&lastNamedetails=" + encodeURIComponent(lastNamedetails)+
                 "&emaildetails=" + encodeURIComponent(emaildetails)+
                 "&phoneNumberdetails=" + encodeURIComponent(phoneNumberdetails);
    document.body.appendChild(script);
}