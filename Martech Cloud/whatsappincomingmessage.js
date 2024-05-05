'use strict';

async function fetchAndDisplayMessages() {
    document.getElementById('refreshMessages').style.backgroundColor = 'lightgrey';
    document.getElementById('refreshMessages').style.border = 'lightgrey';
    const url = "https://script.google.com/macros/s/AKfycbwNu4oJZ6UgvY99QcX-ntTAO2-xex0KuDO3DAIozxjcdmEPOHZ8dMR1Qs2t0wbTSYk/exec";
    const response = await fetch(url);
    const data = await response.json();

    const filteredData = data.filter(message => message.phoneNumber === 918208710562);

    // Sort data by timestamp in descending order
    filteredData.sort((a, b) => b.timestamp - a.timestamp);

    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = ''; // Clear existing messages

    filteredData.forEach(message => {
        const timestamp = new Date(message.timestamp * 1000);
        const istTime = timestamp.toLocaleString('en-US', { 
            timeZone: 'Asia/Kolkata', 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit',
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit', 
            hour12: true 
        });
    
        const messageDiv = document.createElement('div');
        messageDiv.className = "card p-3 mb-3";
        // Add border style
        messageDiv.style.border = "0.5px solid blue"; 

        messageDiv.innerHTML = `
            <figure class="p-3 mb-0">
                <blockquote class="blockquote">
                    <p>${message.message}</p>
                </blockquote>
                <figcaption class="blockquote-footer mb-0 text-muted">
                    ${message.fromName} (${message.fromPhoneNumber}) at ${istTime}
                </figcaption>
            </figure>
        `;
    
        const today = new Date();
        if (timestamp.toDateString() === today.toDateString()) {
            // Create a reply button
            const replyButton = document.createElement('button');
            replyButton.className = "btn btn-primary";
            replyButton.innerText = "Reply";
            // Add event listener to handle reply functionality
            replyButton.addEventListener('click', () => {
                // You can implement reply functionality here
                alert("Reply functionality goes here for message: " + message.message);
            });

            // Append the reply button to the messageDiv
            messageDiv.appendChild(replyButton);
        }
    
        // Append the messageDiv to the messagesContainer
        messagesContainer.appendChild(messageDiv);
        document.getElementById('refreshMessages').style.backgroundColor = '';
        document.getElementById('refreshMessages').style.border = '';
    });
}

window.onload = fetchAndDisplayMessages;
