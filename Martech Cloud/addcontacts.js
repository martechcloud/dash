
function handleResponse1(response) {
    if (response && response.result === "success") {
        document.getElementById('submitbutton1').style.backgroundColor = '';
        document.getElementById('submitbutton1').style.border = '';
        document.getElementById('submitbutton2').style.backgroundColor = '';
        document.getElementById('submitbutton2').style.border = '';
        var box = document.getElementById("box");
        box.style.display = "inline-block";
        setTimeout(function () {
            box.style.display = "none";
            document.getElementById("dataForm1").reset();
            document.getElementById("dataForm2").reset();
        }, 2000);
    } else {
        document.getElementById('submitbutton1').style.backgroundColor = '';
        document.getElementById('submitbutton1').style.border = '';
        document.getElementById('submitbutton2').style.backgroundColor = '';
        document.getElementById('submitbutton2').style.border = '';
        var box2 = document.getElementById("box2");
        box2.style.display = "inline-block";
        setTimeout(function () {
            box2.style.display = "none";    
        }, 2000);
    }
}


function addcontact1() {
    document.getElementById('submitbutton1').style.backgroundColor = 'lightgrey';
    document.getElementById('submitbutton1').style.border = 'lightgrey';
    var key = document.getElementById("key").value;
    var name = document.getElementById("name").value;
    var number = document.getElementById("number").value;
    var email = document.getElementById("email").value;

    if (number !== "") {
        var phonePattern = /^[0-9]{12}$/;
        if (!phonePattern.test(number)) {
            document.getElementById('almessage').innerHTML = "Phone Number is not valid!";
            var box2 = document.getElementById("box2");
            box2.style.display = "inline-block";
            setTimeout(function () {
                box2.style.display = "none";
                document.getElementById('submitbutton1').style.backgroundColor = '';
                document.getElementById('submitbutton1').style.border = '';
            }, 3000);
            return;
        }
    }

    if (email !== "") {
        var re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
            document.getElementById('almessage').innerHTML = "Email is not valid!"
            var box2 = document.getElementById("box2");
                box2.style.display = "inline-block";
                setTimeout(function () {
                    box2.style.display = "none";
                    document.getElementById('submitbutton1').style.backgroundColor = '';
                    document.getElementById('submitbutton1').style.border = '';
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
                 "&email=" + encodeURIComponent(email);
    document.body.appendChild(script);
}



function addcontact2() {
    document.getElementById('submitbutton2').style.backgroundColor = 'lightgrey';
    document.getElementById('submitbutton2').style.border = 'lightgrey';
    var key = document.getElementById("key1").value;
    var name = document.getElementById("name1").value;
    var number = document.getElementById("number1").value;
    var email = document.getElementById("email1").value;
    var age = document.getElementById("age1").value;

    if (number !== "") {
        var phonePattern = /^[0-9]{12}$/;
        if (!phonePattern.test(number)) {
            document.getElementById('almessage').innerHTML = "Phone Number is not valid!";
            var box2 = document.getElementById("box2");
            box2.style.display = "inline-block";
            setTimeout(function () {
                box2.style.display = "none";
                document.getElementById('submitbutton2').style.backgroundColor = '';
                document.getElementById('submitbutton2').style.border = '';
            }, 3000);
            return;
        }
    }

    if (email !== "") {
        var re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
            document.getElementById('almessage').innerHTML = "Email is not valid!"
            var box2 = document.getElementById("box2");
                box2.style.display = "inline-block";
                setTimeout(function () {
                    box2.style.display = "none";
                    document.getElementById('submitbutton2').style.backgroundColor = '';
                    document.getElementById('submitbutton2').style.border = '';
                }, 3000);
            return;
        }
    }

    var script = document.createElement('script');
    script.src = "https://script.google.com/macros/s/AKfycbzpyf_9pT91KKIxKlxEiixvSxvMy_QfeDfXB3V1_YDkIBZE_hw7euu-ovCYk_e-6Hlp/exec" +
                 "?callback=handleResponse2" +
                 "&key=" + encodeURIComponent(key) +
                 "&name=" + encodeURIComponent(name) +
                 "&number=" + encodeURIComponent(number) +
                 "&email=" + encodeURIComponent(email) +
                 "&age=" + encodeURIComponent(age);
    document.body.appendChild(script);
}