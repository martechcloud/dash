'use strict';
document.addEventListener("DOMContentLoaded", function() {
    var profileusername = sessionStorage.getItem("profileusername");
    var profilerole = sessionStorage.getItem("profilerole");

    var secondaryprofileusername = sessionStorage.getItem("secondaryprofileusername");
    var secondaryprofilerole = sessionStorage.getItem("secondaryprofilerole");

    document.getElementById('profileusername').textContent = profileusername; 
    document.getElementById('profilerole').textContent = profilerole;

    try {
    document.getElementById('primaryprofileusername').textContent = profileusername;
    document.getElementById('primaryprofilerole').textContent = profilerole;

    document.getElementById('secondaryprofileusername').textContent = secondaryprofileusername;
    document.getElementById('secondaryprofilerole').textContent = secondaryprofilerole;
    } catch (error) {
    }      
     
})
