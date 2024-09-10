# Train Ticket Booking System

## Overview

This is an offline web application for booking train tickets. Users can select their origin, destination, departure and return dates, choose a train, select seats, and confirm their booking. The app ensures users cannot select already booked seats and offers functionalities for printing the ticket and returning to the home screen.

## Features

- **Home Screen**: Enter origin, destination, departure date, return date, and number of passengers.
- **Train Selection**: View available trains and select one.
- **Seat Selection**: Choose seats from a visual map, with validation to prevent booking of already selected or booked seats.
- **Booking Summary**: Review selected train, departure and arrival times, and seat details.
- **Confirmation**: Confirm booking and make payment.
- **Success Screen**: Display a success message with options to return home or print the ticket.

## Technologies Used

- HTML
- CSS
- JavaScript

## How to Run

1. **Download** or **Clone** the repository.
2. Open `index.html` in a web browser.

## Key Points

- **Date Validation**: Departure date cannot be earlier than today; return date cannot be before the departure date.
- **Seat Booking**: Users can select multiple seats up to the number of passengers, but cannot select the same seat twice or seats already booked.
- **UI**: The seat map is designed with columns and rows, with coaches separated for clarity.
- **Print Ticket**: After booking, users can print the ticket summary as a PDF.

## Files

- `index.html`: Main HTML file
- `styles.css`: Styling for the app
- `script.js`: JavaScript for functionality
- `background.png`: Background image

## Notes

- The app is designed to work offline and does not require a server.
- For real-world applications, integration with a backend service would be necessary for managing bookings and seat availability."# train-booking-system" 
