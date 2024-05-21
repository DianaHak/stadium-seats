// Function to initialize taken seats from local storage
function initializeSeats() {
    let storedSeats = localStorage.getItem('takenSeats');
    if (storedSeats) {
        return JSON.parse(storedSeats);
    } else {
        return new Array(1100).fill(false);
    }
}

// Initialize the array to keep track of taken seats
let takenSeats = initializeSeats();

// Function to display reserved seats
function displayReservedSeats() {
    const seatsList = document.getElementById('seats-list');
    seatsList.innerHTML = '';
    takenSeats.forEach((isTaken, index) => {
      if (isTaken) {
        const listItem = document.createElement('li');
        listItem.textContent = `Տեղ համար ${index + 1}-ը արդեն զբաղված է `;

        // Create a button element
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.classList.add('deleteItem');

        // Attach an event listener to the button
        deleteButton.addEventListener('click', function() {
          // Mark the seat as free
          takenSeats[index] = false;
          localStorage.setItem('takenSeats', JSON.stringify(takenSeats));

          // Remove the list item from the DOM
          seatsList.removeChild(listItem);
        });

        // Append the button to the list item
        listItem.appendChild(deleteButton);

        // Append the list item to the seats list
        seatsList.appendChild(listItem);
      }
    });
  }

  // Function to check if a seat is taken
  function checkSeat() {
    // Get the seat number from the input field
    const seatNumber = parseInt(document.getElementById('seat-number').value);
    const messageElement = document.getElementById('message');

    // Check if the seat number is within the valid range
    if (seatNumber < 1 || seatNumber > 1100 || isNaN(seatNumber)) {
        messageElement.textContent = 'Խնդրում ենք նշել 1-1100 թվանշան։';
        return;
    }

    // Check if the seat is already taken
    if (takenSeats[seatNumber - 1]) {
        messageElement.textContent = `Տեղ համար ${seatNumber}-ը արդեն զբաղված է:`;
        messageElement.style.color="#D71313";
    } else {
        // Mark the seat as taken
        takenSeats[seatNumber - 1] = true;
        localStorage.setItem('takenSeats', JSON.stringify(takenSeats));
        messageElement.textContent = `Տեղ համար ${seatNumber}-ը ազատ է:`;
        messageElement.style.color="#000000";

        displayReservedSeats();
    }
}
// Add an event listener to the "սկսել 0-ից" button
document.getElementById('clearvalues').addEventListener('click', function() {
    // Set the takenSeats array to a new array of 1100 false values
    takenSeats = new Array(1100).fill(false);
    // Clear the seats-list element
    document.getElementById('seats-list').innerHTML = '';
    // Clear the message element
    document.getElementById('message').textContent = '';
    // Remove the takenSeats item from local storage
    localStorage.removeItem('takenSeats');
  });
var input = document.getElementById("seat-number");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("seatchecker").click();
  }
});

displayReservedSeats(); // Call the function to display reserved seats
