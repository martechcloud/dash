// Function to decrypt the URL
function decryptURL(encryptedUrl, password) {
    try {
        var decrypted = CryptoJS.AES.decrypt(
            decodeURIComponent(encryptedUrl), 
            password
        ).toString(CryptoJS.enc.Utf8);
        
        // Check if decryption failed
        if (!decrypted) {
            throw new Error("Decryption failed. Check the password or URL.");
        }
        return decrypted;
    } catch (error) {
        console.error("Decryption error:", error.message);
        return null; // Return null if decryption fails
    }
}

// Encrypted URL stored in a variable
var encryptedUrl = "U2FsdGVkX1/xwj7h01dOahh9ZglmdtbB3H2hA1FgMO8Y/b9vjFjuLbs5DTFPog6mT7SqFhY/EbD26PeGUfKyBDlA2kHfTvGjjeZXSMg7VPMKnu916J5G5pPv73ypTmEG9IcqBzeVUwKs6jLqDC231A+a0SOcK/AQ830aFeWayuQ3MB5yO5NtHWPCJsePd5al";

// Retrieve password from session storage
var password = sessionStorage.getItem("pass");

// Blacklist email function
function blacklistemail() {
    var button = document.getElementById('blacklistemail');
    button.style.backgroundColor = 'lightgrey';
    button.style.border = '1px solid lightgrey';

    // Retrieve input values
    var contact = document.getElementById('name').value;
    var reason = document.getElementById('reason').value;
    var password = document.getElementById('password').value;

    // Set the phone radio field
    var phoneRadio = "email";

    // Prepare form data
    var formData = new FormData();
    formData.append('contact', contact);
    formData.append('reason', reason);
    formData.append('password', password);
    formData.append('phoneRadio', phoneRadio);

    // Decrypt the URL
    var decryptedUrl = decryptURL(encryptedUrl, password);
    if (!decryptedUrl) {
        alert("Invalid decryption. Please check the password.");
        resetButtonStyles(button);
        return;
    }

    // Make the fetch request
    fetch(decryptedUrl, {
        method: "POST",
        body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
        handleResponse(data, "contactForm", button);
    })
    .catch((error) => {
        console.error("Error:", error);
        resetButtonStyles(button);
    });
}

// Blacklist phone function
function blacklistphone() {
    var button = document.getElementById('blacklistphone');
    button.style.backgroundColor = 'lightgrey';
    button.style.border = '1px solid lightgrey';

    // Retrieve input values
    var contact = document.getElementById('phone1').value;
    var reason = document.getElementById('reason1').value;
    var password = document.getElementById('password1').value;

    // Set the phone radio field
    var phoneRadio1 = "Phone";

    // Prepare form data
    var formData = new FormData();
    formData.append('contact', contact);
    formData.append('reason', reason);
    formData.append('password', password);
    formData.append('phoneRadio', phoneRadio1);

    // Decrypt the URL
    var decryptedUrl = decryptURL(encryptedUrl, password);
    if (!decryptedUrl) {
        alert("Invalid decryption. Please check the password.");
        resetButtonStyles(button);
        return;
    }

    // Make the fetch request
    fetch(decryptedUrl, {
        method: "POST",
        body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
        handleResponse(data, "contactForm1", button);
    })
    .catch((error) => {
        console.error("Error:", error);
        resetButtonStyles(button);
    });
}

// Handle the fetch response
function handleResponse(data, formId, button) {
    if (data.redirectUrl) {
        var box = document.getElementById("box");
        box.style.display = "inline-block";
        document.getElementById(formId).reset();
    } else {
        var box2 = document.getElementById("box2");
        box2.style.display = "inline-block";
    }
    setTimeout(() => {
        box.style.display = "none";
        box2.style.display = "none";
    }, 3000);

    resetButtonStyles(button);
}

// Reset button styles
function resetButtonStyles(button) {
    button.style.backgroundColor = '';
    button.style.border = '';
}
