function incomingmessage() {
    fetchAndDisplayMessages();
  }

document.getElementById('refreshMessages').addEventListener('click', function() {
    fetchAndDisplayMessages();
});

/////////////////////////////////////////////////////////////////////////////////////////////////

//Fetch data 
// Global variables
let items = {};  // Store items dynamically fetched from the API
let cart = {};   // Store items added to the cart

// Spinner display function
function showSpinner() {
    document.getElementById('spinner').style.display = 'block';
}

// Hide spinner
function hideSpinner() {
    document.getElementById('spinner').style.display = 'none';
}

// Fetch data from the Apps Script URL only once
async function fetchData() {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbzXWL8oN0knVFt2ZV5w6CVSPvZ2iHtToxhQgqova7AobgeP6qEhp50R8lwVNLEndxSp/exec?sheetName=PRODUCT_DATA_TABLE');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

// Organize data into categories dynamically (called only once on page load)
async function organizeItems() {
    const data = await fetchData();
    items = {};  // Reset items
    data.data.slice(1).forEach(row => { // Skip the header row
        const [productId, productName, productCategory, productPrice] = row;
        // Check if the category exists, if not create it
        if (!items[productCategory.toLowerCase()]) {
            items[productCategory.toLowerCase()] = [];
        }
        // Push the item to its respective category
        items[productCategory.toLowerCase()].push({
            name: productName.trim(),
            price: parseFloat(productPrice)
        });
    });
}

// Display items dynamically from the loaded data
async function showItems(category) {
    if (Object.keys(items).length === 0) {
        await organizeItems(); // Ensure items are loaded before displaying
    }

    const menuItemsDiv = document.getElementById('menu-items');
    menuItemsDiv.innerHTML = '';

    // Display items in the selected category
    if (items[category]) {
        items[category].forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'menu-item1';
            itemDiv.onclick = () => addToCart(category, index);
            itemDiv.innerHTML = `
                <img class="card-img-top" src="samplefoodimage.png" alt="Card image cap" />
                <h5 style="text-align: center; color: #3498db; ">${item.name}</h5>
                <p class="card-text" style="color: #555; font-size: 1rem;">Price: ₹${item.price.toFixed(2)}</p>
            `;
            menuItemsDiv.appendChild(itemDiv);
        });
    } else {
        menuItemsDiv.innerHTML = `<p>No items available for this category.</p>`;
    }

    // Add 10 empty boxes at the end
    for (let i = 0; i < 15; i++) {
        const emptyBox = document.createElement('div');
        emptyBox.className = 'menu-item1';
        emptyBox.style.border = '1px dashed #ddd'; // Optional: dashed border for empty boxes
        emptyBox.style.height = '150px'; // Adjust height as needed
        emptyBox.style.display = 'flex';
        emptyBox.style.justifyContent = 'center';
        emptyBox.style.alignItems = 'center';
        emptyBox.style.color = '#aaa'; // Light gray text color
        emptyBox.innerText = '';
        menuItemsDiv.appendChild(emptyBox);
    }
}


// Search items based on the user's input
async function searchItems() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const menuItemsDiv = document.getElementById('menu-items');
    menuItemsDiv.innerHTML = '';

    if (Object.keys(items).length === 0) {
        await organizeItems(); // Ensure items are loaded before searching
    }

    let foundItems = false;

    for (const category in items) {
        items[category].forEach((item, index) => {
            if (item.name.toLowerCase().includes(query)) {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'menu-item1';
                itemDiv.onclick = () => addToCart(category, index);
                itemDiv.innerHTML = `
                    <img class="card-img-top" src="samplefoodimage.png" alt="Card image cap" />
                    <h5 style="text-align: center; color: #3498db;">${item.name}</h5>
                    <p class="card-text">Price: ₹${item.price.toFixed(2)}</p>
                `;
                menuItemsDiv.appendChild(itemDiv);
                foundItems = true;
            }
        });
    }

    if (!foundItems) {
        menuItemsDiv.innerHTML = '<p>No items found.</p>';
    }
}

// Add item to the cart
function addToCart(category, index) {
    const tableNumber = document.querySelector('.pagination .page-item.active .page-link');
    console.log(tableNumber)
    const errorMessage = document.getElementById('box2');
    const alertMessage = document.getElementById('almessage');
    if (tableNumber === null) {
      alertMessage.textContent = "Please select a table before proceeding!";
      errorMessage.style.display = "block"; // Show error message
      setTimeout(() => {
        errorMessage.style.display = "none";
      }, 3000);
    } else {
      const item = items[category][index];
      console.log(category)
      
      // Check if the item is already in the cart
      if (!cart[item.name]) {
          cart[item.name] = { ...item, quantity: 1 }; // Add item with quantity 1
      } else {
          cart[item.name].quantity++; // Increase quantity if already in cart
      }

      updateBilling(); // Call function to update the billing details
  }
}
    

// Update billing details
function updateBilling() {
    const billTable = document.querySelector('.billing table tbody');
    const billTable2 = document.querySelector('.billing2 table tbody');
    const subtotalSpan = document.getElementById('subtotal');
    const subtotalSpan2 = document.getElementById('subtotal2');
    let subtotal = 0;

    // Clear existing table rows
    billTable.innerHTML = '';
    billTable2.innerHTML = '';

    // Populate table rows based on cart items
    Object.values(cart).forEach(item => { 
        subtotal += item.price * item.quantity;

        // Create a table rowss
        const row1 = document.createElement('tr');
        const row2 = document.createElement('tr');
        row1.innerHTML = `
            <td>${item.name}</td>
            <td>
                <div class="quantity-control">
                    <button onclick="changeQuantity('${item.name}', -1)">-</button>
                    ${item.quantity}
                    <button onclick="changeQuantity('${item.name}', 1)">+</button>
                </div>
            </td>
            <td>₹${item.price.toFixed(2)}</td>
            <td>₹${(item.price * item.quantity).toFixed(2)}</td>
        `;

        row2.innerHTML = `
            <td>${item.name}</td>
            <td>
                <div class="quantity-control">
                    <button onclick="changeQuantity('${item.name}', -1)">-</button>
                    ${item.quantity}
                    <button onclick="changeQuantity('${item.name}', 1)">+</button>
                </div>
            </td>
            <td>₹${item.price.toFixed(2)}</td>
            <td>₹${(item.price * item.quantity).toFixed(2)}</td>
            <td>
                  <input type="checkbox" id="complimentary-${item.name}" name="complimentary-${item.name}" onchange="toggleComplimentary('${item.name}', ${(item.price * item.quantity).toFixed(2)})"style="width: 20px; height: 20px;">
            </td>
        `;
        billTable.appendChild(row1);
        billTable2.appendChild(row2);
    });

    // Handle empty cart
    // Handle empty cart
    if (!subtotal) {
        const emptyRow1 = document.createElement('tr');
        emptyRow1.innerHTML = `
            <td colspan="4" style="text-align: center;">No items selected</td>
        `;
        billTable.appendChild(emptyRow1);

        const emptyRow2 = document.createElement('tr');
        emptyRow2.innerHTML = emptyRow1.innerHTML; // Duplicate for the second table
        billTable2.appendChild(emptyRow2);
    }

    // Update subtotal
    subtotalSpan.textContent = subtotal.toFixed(2);
    subtotalSpan2.textContent = subtotal.toFixed(2);
}

// Change item quantity in the cart
function changeQuantity(itemName, delta) {
    if (cart[itemName]) {
        cart[itemName].quantity += delta;
        if (cart[itemName].quantity <= 0) {
            delete cart[itemName];
        }
    }
    updateBilling();
}

// Fetch the items on page load to ensure they're available for use in selections
window.onload = async function() {
    showSpinner(); // Show spinner while data is loading
    await organizeItems(); // Fetch and organize items only once
    showItems('home');
    hideSpinner(); // Hide the spinner once data is loaded
    console.log('Items are now ready for selection.');
    checkSessionElements()
};


////////////////////////////////////////////////////////////////////////////////////////////
// Reset order onclick reset button

function resetBilling() {
    // Get the table body element for billing
    const billTable = document.querySelector('.billing table tbody');
    const billTable2 = document.querySelector('.billing2 table tbody');
    // Get the subtotal element
    const subtotalSpan = document.getElementById('subtotal');
    const subtotalSpan2 = document.getElementById('subtotal2');

    // Check if the table body exists and if it has rows
    if (billTable) {
        // Loop through each row and remove its <td> elements
        const rows = billTable.querySelectorAll('tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            cells.forEach(cell => {
                row.removeChild(cell); // Remove each <td> element
            });
        });
    }

    if (billTable2) {
        // Loop through each row and remove its <td> elements
        const rows = billTable2.querySelectorAll('tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            cells.forEach(cell => {
                row.removeChild(cell); // Remove each <td> element
            });
        });
    }
    cart = {};

    // Reset the subtotal text to '0.00'
    if (subtotalSpan) {
        subtotalSpan.textContent = '0.00'; // Set the subtotal text to '0.00'
    }
    // Reset the subtotal text to '0.00'
    if (subtotalSpan2) {
        subtotalSpan2.textContent = '0.00'; // Set the subtotal text to '0.00'
    }
}

// Reset order onclick reset button
document.getElementById('reset-btn').addEventListener('click', function() {
    resetBilling();
    const activePageLink = document.querySelector('.pagination .page-item.active .page-link');
    const activePage = activePageLink.textContent.trim();
    const pageLink = document.querySelector(`.pagination .page-item:nth-child(${activePage}) .page-link`);
    pageLink.style.backgroundColor = "";
    pageLink.style.color = "";
    sessionStorage.removeItem(activePage);
    console.log("Session item removed!");
});
/////////////////////////////////////////////////////////////////////////////////////////////////////

function checkSessionElements() {
    // List of session elements you want to check
    const sessionKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    // Loop through each session key and check if it's available in sessionStorage
    sessionKeys.forEach(key => {
      const value = sessionStorage.getItem(key); // Get the value from sessionStorage

      // If the value exists in sessionStorage, apply styles to corresponding page link and select option
      if (value) {
        // Find the corresponding page link by its position in the pagination
        const pageLink = document.querySelector(`.pagination .page-item:nth-child(${key}) .page-link`);

        if (pageLink) {
          pageLink.style.backgroundColor = "green";
          pageLink.style.color = "white";
        }
      }
    });
  }


// To draft the order
document.getElementById('draft-btn').addEventListener('click', function() {
    // Get the select element
    const activePageLink = document.querySelector('.pagination .page-item.active .page-link');
    const activePage = activePageLink.textContent.trim();
    const errorMessage = document.getElementById('box2');
    const successMessage = document.getElementById('box');
    const alertMessage = document.getElementById('almessage');
    
    
    // Check if the selected value is the default
    if (activePage === "") {
      alertMessage.textContent = "Please select a table before proceeding!";
      errorMessage.style.display = "block"; // Show error message
      setTimeout(() => {
        errorMessage.style.display = "none";
      }, 3000);
    } else {
      errorMessage.style.display = "none"; // Hide error message
      // Proceed with your logic
      const billTable = document.querySelector('.billing table tbody');
      const subtotalSpan = document.getElementById('subtotal');
      let subtotal = 0;

      // Prepare the data for storage
      const billingData = {
          items: [],
          subtotal: subtotalSpan.textContent
      };

      // Loop through the cart items and gather data
      Object.values(cart).forEach(item => {
          subtotal += item.price * item.quantity;

          // Add each item to the billing data
          billingData.items.push({
              name: item.name,
              quantity: item.quantity,
              price: item.price,
              total: (item.price * item.quantity).toFixed(2)
          });
      });

      // Store the data in sessionStorage using the table number as the key
      sessionStorage.setItem(activePage, JSON.stringify(billingData));
      console.log(sessionStorage.getItem(activePage))
      console.log(activePage)
      success.textContent = "Order Saved as Draft!";
      successMessage.style.display = "block";
      setTimeout(() => {
        successMessage.style.display = "none";
      }, 3000);

    }
  });


//Show drafted orders
function setActive(element) {
    checkSessionElements();
    const pageItems = document.querySelectorAll('.pagination .page-item');
    pageItems.forEach((item) => item.classList.remove('active'));
    const clickedPage = element.parentElement;
    clickedPage.classList.add('active');

    const pageLink = document.querySelector(`.pagination .page-item:nth-child(${element.textContent.trim()}) .page-link`);
    pageLink.style.backgroundColor = "";
    pageLink.style.color = "";

    const tableNumber = element.textContent.trim();

    // Fetch the data from sessionStorage
    const tableData = sessionStorage.getItem(tableNumber);
    console.log(tableData)
    if (tableData) {
        resetBilling();
        showItems('home');
        const billingData = JSON.parse(tableData);

        billingData.items.forEach((item) => {

            // Search for the item in the #menu-items container
            const menuItemsContainer = document.getElementById('menu-items');
            const menuItemsList = Array.from(menuItemsContainer.querySelectorAll('.menu-item1')); // Dynamically created items
            const itemIndex = menuItemsList.findIndex(menuItem => {
              // Compare the text inside the <h5> tag to match the item name
              return menuItem.querySelector('h5').textContent.trim() === item.name;
            });

            if (itemIndex !== -1) {
              // If item is found, run addToCart with 'home' category for the quantity of the item
              for (let i = 0; i < item.quantity; i++) {
                  addToCart('home', itemIndex); // Add the item to the cart as many times as the quantity
              }

            } else {
                console.warn(`Item "${item.name}" not found in menu-items.`);
            }
        });

    } else {
      resetBilling();
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////

//Add product

document.getElementById("addmenu-btn").addEventListener("click", function () {
    const modal = new bootstrap.Modal(document.getElementById("modalCenter"));
    modal.show();
  });

document.getElementById("modal-addproduct").addEventListener("click", async () => {
    const submitButton = document.getElementById('modal-addproduct');
    const errorMessage = document.getElementById('box2');
    const successMessage = document.getElementById('box');
    const alertMessagered = document.getElementById('almessage');
    const alertMessagegreen = document.getElementById('success');

    // Get input values
    const productName = document.getElementById("nameWithTitle").value.trim();
    const productCategory = document.getElementById("emailWithTitle").value.trim();
    const productPrice = document.getElementById("dobWithTitle").value.trim();

    // Validate inputs
    if (!productName || !productCategory || !productPrice) {
      alertMessagered.textContent = "Please fill all fields before adding the product!";
      showError(errorMessage, submitButton);
      return;
    }

    if (isNaN(productPrice) || Number(productPrice) <= 0) {
      alertMessagered.textContent = "Please enter a valid price!";
      showError(errorMessage, submitButton);
      return;
    }

    // Disable the submit button while processing
    disableButton(submitButton);

    // Construct the URL
    const url = new URL("https://script.google.com/macros/s/AKfycbzkgR57couUXfhmao-0GP4khq5WVVDza3m3bnki9izyBV-vErRBkRg0fPfuDcBUA4ulUQ/exec");
    url.searchParams.append("usecase", "addnewproduct");
    url.searchParams.append("productName", productName);
    url.searchParams.append("productCategory", productCategory);
    url.searchParams.append("productPrice", productPrice);

    try {
      // Make the API call
      const response = await fetch(url);
      const data = await response.json();
      handleResponse1(data, submitButton);
    } catch (error) {
      alertMessagered.textContent = "An unexpected error occurred. Please try again.";
      showError(errorMessage, submitButton);
    }
  });

  // Function to handle the server response
  function handleResponse1(response, submitButton) {
    const successMessage = document.getElementById('box');
    const alertMessagegreen = document.getElementById('success');
    const alertMessagered = document.getElementById('almessage');
    const errorMessage = document.getElementById('box2');

    if (response.status === "success") {
      alertMessagegreen.textContent = "Product added to menu successfully!";
      successMessage.style.display = "block";
      setTimeout(() => {
        successMessage.style.display = "none";
      }, 3000);

      // Clear input fields
      document.getElementById("nameWithTitle").value = "";
      document.getElementById("emailWithTitle").value = "";
      document.getElementById("dobWithTitle").value = "";
    } else {
      alertMessagered.textContent = response.message || "Failed to add product. Please try again.";
      showError(errorMessage, submitButton);
    }

    // Enable the submit button
    enableButton(submitButton);
  }

  // Function to disable the submit button
  function disableButton(button) {
    button.style.backgroundColor = 'lightgrey';
    button.style.border = 'lightgrey';
    button.disabled = true;
  }

  // Function to enable the submit button
  function enableButton(button) {
    button.style.backgroundColor = '';
    button.style.border = '';
    button.disabled = false;
  }

  // Function to show error message and re-enable the button
  function showError(errorMessage, button) {
    errorMessage.style.display = "block";
    setTimeout(() => {
      errorMessage.style.display = "none";
    }, 3000);
    enableButton(button);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////

//Delete Product


document.getElementById("deletemenu-btn").addEventListener("click", function () {
    const modal = new bootstrap.Modal(document.getElementById("modalCenterdeletemenu"));
    modal.show();
});

document.getElementById("modal-deleteproduct").addEventListener("click", async () => {
    const submitButton = document.getElementById("modal-deleteproduct");
    const errorMessage = document.getElementById("box2");
    const successMessage = document.getElementById("box");
    const alertMessagered = document.getElementById("almessage");
    const alertMessagegreen = document.getElementById("success");

    const productName = document.getElementById("nameWithTitleproductname").value.trim();

    // Disable the submit button and provide visual feedback
    disableButton(submitButton);

    // Validate product name
    if (!productName) {
      alertMessagered.textContent = "Please add a product name!";
      showError(errorMessage, submitButton);
      return;
    }

    // Construct the URL for the Apps Script web app (replace with your actual web app URL)
    const url = new URL("https://script.google.com/macros/s/AKfycbzkgR57couUXfhmao-0GP4khq5WVVDza3m3bnki9izyBV-vErRBkRg0fPfuDcBUA4ulUQ/exec");
    url.searchParams.append("productName", productName);
    url.searchParams.append("usecase", "deleteproduct");

    try {
      // Make a GET request to the Google Apps Script web app
      const response = await fetch(url);
      const data = await response.json();

      // Handle the response
      handleResponse2(data, submitButton);
    } catch (error) {
      alertMessagered.textContent = "An error occurred while deleting the product.";
      showError(errorMessage, submitButton);
    }
  });

  // Function to disable the submit button with feedback
  function disableButton(button) {
    button.style.backgroundColor = "lightgrey";
    button.style.border = "lightgrey";
    button.disabled = true;
  }

  // Function to reset the submit button's state
  function resetSubmitButton(button) {
    button.style.backgroundColor = "";
    button.style.border = "";
    button.disabled = false;
  }

  // Function to show error message and reset the button
  function showError(errorMessage, button) {
    errorMessage.style.display = "block";
    setTimeout(() => {
      errorMessage.style.display = "none";
    }, 3000);
    resetSubmitButton(button);
  }

  // Callback function to handle the response from the Apps Script
  function handleResponse2(response, submitButton) {
    const errorMessage = document.getElementById("box2");
    const successMessage = document.getElementById("box");
    const alertMessagered = document.getElementById("almessage");
    const alertMessagegreen = document.getElementById("success");

    if (response.status === "success") {
      alertMessagegreen.textContent = "Product Deleted!";
      successMessage.style.display = "block";
      setTimeout(() => {
        successMessage.style.display = "none";
      }, 3000);
      resetSubmitButton(submitButton);

      // Optionally, clear input fields or perform other UI updates
      document.getElementById("nameWithTitleproductname").value = "";
    } else {
      alertMessagered.textContent = `Error: ${response.message || "Unable to delete the product."}`;
      showError(errorMessage, submitButton);
    }
  }

///////////////////////////////////////////////////////////////////////////////////////////////////

//Needs to remove




//////////////////////////////////////////////////////////////////////////////////////////////////

//Refresh Menu

document.getElementById("refreshmenu-btn").addEventListener("click", async () => {
    const submitButton = document.getElementById('refreshmenu-btn')
    submitButton.style.backgroundColor = 'lightgrey';
    submitButton.style.border = 'lightgrey';
    submitButton.disabled = true;
    const errorMessage = document.getElementById('box2');
    const successMessage = document.getElementById('box');
    const alertMessagered = document.getElementById('almessage');
    const alertMessagegreen = document.getElementById('success');
    try {

      // Fetch and organize items only once
      await organizeItems(); 

      // Display the items on the page (assuming 'home' is a valid category or section)
      showItems('home');

      // Check session elements (assuming the function checks session state or similar)
      checkSessionElements();
      alertMessagegreen.textContent = "Product Refreshed!";
        successMessage.style.display = "block";
        setTimeout(() => {
          successMessage.style.display = "none";
        }, 3000);
      submitButton.style.backgroundColor = '';
      submitButton.style.border = '';
      submitButton.disabled = false;
    } catch (error) {
      alertMessagered.textContent = "Failed!";
                errorMessage.style.display = "block"; // Show error message
                setTimeout(() => {
                  errorMessage.style.display = "none";
                }, 3000);
      submitButton.style.backgroundColor = '';
      submitButton.style.border = '';
      submitButton.disabled = false;
    }
  });