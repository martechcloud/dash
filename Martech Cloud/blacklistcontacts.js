
function blacklistemail() {
    document.getElementById('blacklistemail').style.backgroundColor = 'lightgrey';
    document.getElementById('blacklistemail').style.border = 'lightgrey';
    var contact = document.getElementById('name').value;
    var reason = document.getElementById('reason').value;
    var password = document.getElementById('password').value;
    var phoneRadio = "email"

    var formData = new FormData();
    formData.append('contact', contact);
    formData.append('reason', reason);
    formData.append('password', password);
    formData.append('phoneRadio', phoneRadio);

    fetch('https://script.google.com/macros/s/AKfycby5h3Q63d3jhzMv5_tPuctffPkg64wQrfNj5O88RVZqZ0pgNi49UB91E3NO_rjIMy0k/exec', {
    method: "POST",
    body: formData,
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        if (data.redirectUrl) {
          var box = document.getElementById("box");
          box.style.display = "inline-block";
          document.getElementById("contactForm").reset();
          document.getElementById('blacklistemail').style.backgroundColor = '';
          document.getElementById('blacklistemail').style.border = '';
          setTimeout(function () {
            box.style.display = "none";
          }, 3000);
        } else {
            var box2 = document.getElementById("box2");
            box2.style.display = "inline-block";
            document.getElementById('blacklistemail').style.backgroundColor = '';
            document.getElementById('blacklistemail').style.border = '';
            setTimeout(function () {
              box2.style.display = "none";
            }, 3000);
        }
    })
    .catch(function (error) {
        console.error("Error:", error);
        loadingSpinner.style.display = "none";
    });
}



function blacklistphone() {
    document.getElementById('blacklistphone').style.backgroundColor = 'lightgrey';
    document.getElementById('blacklistphone').style.border = 'lightgrey';
    var contact = document.getElementById('phone1').value;
    var reason = document.getElementById('reason1').value;
    var password = document.getElementById('password1').value;
    var phoneRadio1 = "Phone"

    var formData = new FormData();
    formData.append('contact', contact);
    formData.append('reason', reason);
    formData.append('password', password);
    formData.append('phoneRadio', phoneRadio1);

    fetch('https://script.google.com/macros/s/AKfycby5h3Q63d3jhzMv5_tPuctffPkg64wQrfNj5O88RVZqZ0pgNi49UB91E3NO_rjIMy0k/exec', {
    method: "POST",
    body: formData,
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        if (data.redirectUrl) {
          var box = document.getElementById("box");
          box.style.display = "inline-block";
          document.getElementById("contactForm1").reset();
          document.getElementById('blacklistphone').style.backgroundColor = '';
          document.getElementById('blacklistphone').style.border = '';
          setTimeout(function () {
            box.style.display = "none";
          }, 3000);
        } else {
            var box2 = document.getElementById("box2");
            box2.style.display = "inline-block";
            document.getElementById('blacklistphone').style.backgroundColor = '';
            document.getElementById('blacklistphone').style.border = '';
            setTimeout(function () {
              box2.style.display = "none";
            }, 3000);
        }
    })
    .catch(function (error) {
        console.error("Error:", error);
        loadingSpinner.style.display = "none";
    });
}
                
                  

                    
                  
                  
              