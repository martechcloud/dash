function sendTest() {
    // Get the input values
    var templateName = document.getElementById("nameWithTitle").value;
    var phoneNumber = document.getElementById("emailWithTitle").value;
    var password = document.getElementById("dobWithTitle").value;

    var formData = new FormData();
    formData.append('templateName', templateName);
    formData.append('phoneNumber', phoneNumber);
    formData.append('password', password);

    fetch('https://script.google.com/macros/s/AKfycbxZxQkqWJUceCAhDWKpBmpq-ex--76FVm8ihslC5Qhfdsl04krFAeZF0vyH5tnsJduSfw/exec', {
        method: "POST",
        body: formData,
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        if (data.redirectUrl) {
            document.getElementById('dobWithTitle').disabled = true;
            document.getElementById('emailWithTitle').value = '';
            document.getElementById('dobWithTitle').value = '';
            var box = document.getElementById("box");
            box.style.display = "inline-block";
            setTimeout(function () {
                box.style.display = "none";
            }, 3000);
            $('#modalCenter').modal('hide');
            document.getElementById('dobWithTitle').disabled = false;
        } else {
            document.getElementById('dobWithTitle').disabled = true;
            document.getElementById('emailWithTitle').value = '';
            document.getElementById('dobWithTitle').value = '';
            var box2 = document.getElementById("box2");
            box2.style.display = "inline-block";
            setTimeout(function () {
                box2.style.display = "none";
            }, 3000);
            $('#modalCenter').modal('hide');
            document.getElementById('dobWithTitle').disabled = false;
        }
    })
    .catch(function (error) {
        console.error("Error:", error);
        loadingSpinner.style.display = "none";
      });
    };

