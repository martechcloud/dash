/**
 * Contact Master
 */



'use strict';

function loadtable() {
    var loadingspinner = document.getElementById("loadingspinner");
    loadingspinner.style.display = "inline-block";
    fetch('https://script.google.com/macros/s/AKfycbwdZZ8Y357eQB4jeCyKvmfrPap8Q3vmNZjZGIXyyUlkN8eSNmsft0oNyzZ5Fbs42OSi/exec?sheet=Sheet1')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#dataTable tbody');
            data.slice(1).forEach(rowData => {
                const newRow = document.createElement('tr');
                
                // Extract primary key from the first cell
                const primaryKey = rowData[0];
                const customername = rowData[1];
                const phonenumber = rowData[2];
                const email = rowData[3];
                const age = rowData[4];

                rowData.forEach(cellData => {
                    const newCell = document.createElement('td');
                    newCell.textContent = cellData;
                    newRow.appendChild(newCell);
                });

                const actionsCell = document.createElement('td');
                actionsCell.innerHTML = `
                    <div class="dropdown">
                        <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                            <i class="bx bx-dots-vertical-rounded"></i>
                        </button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#" onclick="openModal('${primaryKey}','${customername}', '${phonenumber}','${email}', '${age}' )">
                                <i class="bx bx-pencil me-1"></i> Edit
                            </a>
                        </div>
                    </div>
                `;

                newRow.appendChild(actionsCell);
                tableBody.appendChild(newRow);
            });
            loadingspinner.style.display = "none";
        })
        .catch(error => console.error('Error fetching data:', error));
}

function searchTable() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("dataTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows
    for (i = 1; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        var found = false;
        for (var j = 0; j < td.length; j++) {
            txtValue = td[j].textContent || td[j].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                found = true;
                break;
            }
        }
        if (found) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}

function handleResponse2(response) {
    if (response && response.result === "success") {
        document.getElementById('editButton').style.backgroundColor = '';
        document.getElementById('editButton').style.border = '';
        $('#largeModal').modal('hide');
        var box = document.getElementById("box1");
        box.style.display = "inline-block";
        setTimeout(function () {
            box.style.display = "none";
            location.reload();
        }, 2000);
    } else {
        document.getElementById('editButton').style.backgroundColor = '';
        document.getElementById('editButton').style.border = '';
        $('#largeModal').modal('hide');
        var box2 = document.getElementById("box2");
        box2.style.display = "inline-block";
        setTimeout(function () {
            box2.style.display = "none";
        }, 2000);
    }
}

function editcontact() {
    document.getElementById('editButton').style.backgroundColor = 'lightgrey';
    document.getElementById('editButton').style.border = 'lightgrey';
    var key = document.getElementById("primarykey").value;
    var name = document.getElementById("customername").value;
    var number = document.getElementById("phonenumber").value;
    var email = document.getElementById("email").value;
    var age = document.getElementById("age").value;

    if (number !== "") {
        var phonePattern = /^[0-9]{12}$/;
        if (!phonePattern.test(number)) {
            document.getElementById('almessage').innerHTML = "Phone Number is not valid!";
            var box2 = document.getElementById("box2");
            box2.style.display = "inline-block";
            setTimeout(function () {
                box2.style.display = "none";
                document.getElementById('editButton').style.backgroundColor = '';
                document.getElementById('editButton').style.border = '';
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
                    document.getElementById('editButton').style.backgroundColor = '';
                    document.getElementById('editButton').style.border = '';
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