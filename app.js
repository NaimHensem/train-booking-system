document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const homeScreen = document.getElementById('home-screen');
    const trainInfoScreen = document.getElementById('train-info-screen');
    const seatSelectionScreen = document.getElementById('seat-selection-screen');
    const bookingSummaryScreen = document.getElementById('booking-summary-screen');
    const successScreen = document.getElementById('success-screen');
    const bookingForm = document.getElementById('booking-form');
    const trainList = document.getElementById('train-list');
    const seatMap = document.getElementById('seat-map');
    const bookingSummaryDiv = document.getElementById('booking-summary');
    const departureDateInput = document.getElementById('departure-date');
    const returnDateInput = document.getElementById('return-date');

    const originSelect = document.getElementById('origin');
    const destinationSelect = document.getElementById('destination');
    const paxInput = document.getElementById('pax');
    const confirmBookingButton = document.getElementById('confirm-booking');
    const confirmPaymentButton = document.getElementById('confirm-payment');
    const returnHomeButton = document.getElementById('return-home');
    const printTicketButton = document.getElementById('print-ticket');

    const backToTrainSelectionButton = document.getElementById('back-to-train-selection');
    const backToSeatSelectionButton = document.getElementById('back-to-seat-selection');

    let selectedTrain, selectedCoach, selectedSeats = [];

    // Dummy Train Data
    const trains = [
        { number: 'Naim-1', departure: '10:00', arrival: '14:00' },
        { number: 'Naim-2', departure: '12:00', arrival: '16:00' },
        { number: 'Naim-3', departure: '14:00', arrival: '18:00' }
    ];

    // Set the minimum departure date to today
    const today = new Date().toISOString().split('T')[0];
    departureDateInput.setAttribute('min', today);

    // Update the return date when the departure date is changed
    departureDateInput.addEventListener('change', function () {
        const departureDate = departureDateInput.value;
        returnDateInput.setAttribute('min', departureDate);
    });

    // Set the minimum return date to match the departure date when the page loads
    returnDateInput.setAttribute('min', departureDateInput.value || today);

    // Handle origin and destination selection
    originSelect.addEventListener('change', function () {
        updateDestinationOptions();
    });

    destinationSelect.addEventListener('change', function () {
        updateOriginOptions();
    });

    function updateDestinationOptions() {
        const originValue = originSelect.value;
        Array.from(destinationSelect.options).forEach(option => {
            option.disabled = option.value === originValue;
        });
    }

    function updateOriginOptions() {
        const destinationValue = destinationSelect.value;
        Array.from(originSelect.options).forEach(option => {
            option.disabled = option.value === destinationValue;
        });
    }

    // Show trains when form is submitted
    bookingForm.addEventListener('submit', function (e) {
        e.preventDefault();
        homeScreen.classList.add('hidden');
        trainInfoScreen.classList.remove('hidden');
        populateTrains();
    });

    function populateTrains() {
        trainList.innerHTML = '';
        trains.forEach(train => {
            const trainButton = document.createElement('button');
            trainButton.textContent = `Train ${train.number} (Dep: ${train.departure}, Arr: ${train.arrival})`;
            trainButton.addEventListener('click', () => {
                selectedTrain = train;
                trainInfoScreen.classList.add('hidden');
                seatSelectionScreen.classList.remove('hidden');
                populateSeats();
            });
            trainList.appendChild(trainButton);
        });
    }

    // Populate seats (A1 - F20) with two columns per coach
    function populateSeats() {
        seatMap.innerHTML = '';
        const coachLabels = ['A', 'B', 'C', 'D', 'E', 'F']; // Six coaches

        coachLabels.forEach(coach => {
            const coachDiv = document.createElement('div');
            coachDiv.className = 'coach';

            // Create two columns for each coach
            for (let column = 0; column < 2; column++) {
                const columnDiv = document.createElement('div');
                columnDiv.className = 'column';

                for (let row = 1; row <= 10; row++) {
                    const seatNumber = (column * 10) + row;
                    const seatLabel = coach + seatNumber; // Create seat label like A1, A2, ..., F20
                    const seatButton = document.createElement('button');
                    seatButton.textContent = seatLabel;
                    seatButton.addEventListener('click', () => selectSeat(coach, seatNumber, seatButton));
                    columnDiv.appendChild(seatButton);
                }

                coachDiv.appendChild(columnDiv);
            }

            seatMap.appendChild(coachDiv);
        });
    }

    function selectSeat(coach, seatNumber, seatButton) {
        if (selectedSeats.includes(seatButton)) {
            // Deselect if already selected
            selectedSeats = selectedSeats.filter(seat => seat !== seatButton);
            seatButton.classList.remove('selected');
        } else if (selectedSeats.length < parseInt(paxInput.value)) {
            // Select if not already selected and under pax limit
            selectedSeats.push(seatButton);
            seatButton.classList.add('selected');
        } else {
            alert('You have selected the maximum number of seats.');
        }
    }

    // Confirm booking and show summary
    confirmBookingButton.addEventListener('click', function () {
        if (selectedSeats.length === parseInt(paxInput.value)) { // Ensure correct number of seats are selected
            seatSelectionScreen.classList.add('hidden');
            bookingSummaryScreen.classList.remove('hidden');
            showBookingSummary();
        } else {
            alert('Please select the correct number of seats before confirming.');
        }
    });

    function showBookingSummary() {
        let summaryHTML = `
            <p>Train: ${selectedTrain.number}</p>
            <p>Departure: ${selectedTrain.departure}</p>
            <p>Arrival: ${selectedTrain.arrival}</p>
            <p>Total Pax: ${paxInput.value}</p>
            <ul>
        `;
        
        selectedSeats.forEach(seat => {
            const seatLabel = seat.textContent;
            summaryHTML += `<li>Coach: ${seatLabel.charAt(0)}, Seat: ${seatLabel.substring(1)}</li>`;
        });

        summaryHTML += `</ul><p>Total: $${parseInt(paxInput.value) * 100}</p>`;
        bookingSummaryDiv.innerHTML = summaryHTML;
    }

    // Show success message and buttons
    confirmPaymentButton.addEventListener('click', function () {
        bookingSummaryScreen.classList.add('hidden');
        successScreen.classList.remove('hidden');
    });

    // Return Home button functionality
    returnHomeButton.addEventListener('click', function () {
        successScreen.classList.add('hidden');
        homeScreen.classList.remove('hidden');
        // Optionally reset the form and selections
        bookingForm.reset();
        originSelect.selectedIndex = 0;
        destinationSelect.selectedIndex = 0;
        paxInput.value = 1; // Reset pax input to default
        selectedSeats = [];
    });

    // Print Ticket button functionality
    printTicketButton.addEventListener('click', function () {
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Ticket Summary</title>');
        printWindow.document.write('</head><body >');
        printWindow.document.write('<h1>Booking Summary</h1>');
        printWindow.document.write(bookingSummaryDiv.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    });

    // Back button to return to train selection
    backToTrainSelectionButton.addEventListener('click', function () {
        seatSelectionScreen.classList.add('hidden');
        trainInfoScreen.classList.remove('hidden');
        // Clear previously selected seats
        selectedSeats.forEach(seatButton => {
            seatButton.classList.remove('selected'); // Remove the selected class from previously selected seat buttons
        });
        selectedSeats = []; // Clear the selectedSeats
    });

    // Back button to return to seat selection
    backToSeatSelectionButton.addEventListener('click', function () {
        bookingSummaryScreen.classList.add('hidden');
        seatSelectionScreen.classList.remove('hidden');
        // Ensure that previously selected seats are still highlighted if returning from summary
        selectedSeats.forEach(seatButton => {
            seatButton.classList.add('selected');
        });
    });
});
