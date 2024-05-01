'use strict';

document.addEventListener("DOMContentLoaded", function() {
    var Username = sessionStorage.getItem("Username");
    var key = sessionStorage.getItem("key");
    
    if (key === null) {
        // Redirect to another page
        window.location.href = "https://martechcloud.github.io/dash/index.html";
    } else {
        console.log(key);
    }
});
