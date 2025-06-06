let items = []; // Array to store items in the invoice

// Function to add a new row to the invoice table (for adding items)
function addItemRow() {
    const table = document.getElementById("itemTable");
    const row = table.insertRow();
    row.innerHTML = `
        <td><input class="item" placeholder="Item Name" /></td>
        <td><input class="price" type="number" placeholder="Price" /></td>
        <td><input class="qty" type="number" placeholder="Quantity" /></td>
    `;

    // Add event listeners to update the total whenever an item is updated
    row.querySelector(".price").addEventListener("input", calculateTotal);
    row.querySelector(".qty").addEventListener("input", calculateTotal);
}

// Function to calculate the total price of all items
function calculateTotal() {
    const prices = document.querySelectorAll(".price");
    const qtys = document.querySelectorAll(".qty");
    let total = 0;
    
    for (let i = 0; i < prices.length; i++) {
        total += (parseFloat(prices[i].value) || 0) * (parseFloat(qtys[i].value) || 0);
    }
    
    // Update the total amount displayed
    document.getElementById("totalAmount").innerText = total.toFixed(2);
}

// Function to download the invoice as a PDF
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("Invoice", 10, 10);
    doc.text("Total: ₹" + document.getElementById("totalAmount").innerText, 10, 20);

    // Optionally, you can loop through items and add them to the PDF as well
    const itemsList = document.querySelectorAll(".item");
    let yPos = 30;
    itemsList.forEach((item, index) => {
        doc.text(item.value + ": ₹" + (parseFloat(document.querySelectorAll(".price")[index].value) * parseFloat(document.querySelectorAll(".qty")[index].value)).toFixed(2), 10, yPos);
        yPos += 10;
    });

    doc.save("invoice.pdf"); // Save the PDF file
}



// Function to get and display the list of customers
async function getCustomers() {
    const res = await fetch("http://localhost:3000/customers"); // Assuming backend API is running locally
    const customers = await res.json();
    const table = document.getElementById("customerTable");
    table.innerHTML = ""; // Clear previous data

    customers.forEach(customer => {
        const row = table.insertRow();
        row.innerHTML = `
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.address}</td>
            <td><button onclick="editCustomer(${customer.id})">Edit</button></td>
        `;
    });
}

// Function to add a new customer
document.getElementById("customerForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent form submission

    const newCustomer = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value
    };

    const res = await fetch("http://localhost:3000/customers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCustomer)
    });

    if (res.ok) {
        // Refresh customer list
        getCustomers();
    }
});

// Call this function when the page loads to display existing customers
window.onload = getCustomers;

