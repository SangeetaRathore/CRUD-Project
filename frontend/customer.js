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
