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
