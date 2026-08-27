💅 Rare Nails — Nail Salon Booking Website



![alt text](/public/stylesheets/images/screenshootweb.png)

A full-stack nail salon booking website built with Node.js, Express.js, MongoDB, EJS, HTML, CSS, and JavaScript.

Customers can browse nail services, view service details, create appointments, manage their bookings, and receive notifications for upcoming appointments. Admin users can manage nail services and view all customer appointments.

📌 Features

👩 Customer Features

📝 Create a customer account

🔐 Sign in and sign out

💅 View all available nail services

🔎 View detailed information about each service

💰 View service prices

⏱️ View service duration

📅 Choose an appointment date

🕐 Choose an appointment time

📝 Add notes to an appointment

🚫 Prevent double-booking the same date and time

📋 View all personal appointments

✏️ Edit appointments

❌ Cancel appointments

🔔 Receive upcoming appointment notifications

🔢 Notification count in the navigation bar

👩‍💼 Admin Features

🔐 Admin sign in

➕ Add a new nail service

👀 View service details

✏️ Edit a nail service

🗑️ Delete a nail service

📋 View all customer appointments

👤 View customer information

📅 View appointment date and time

📝 View appointment notes

📌 View appointment status

💅 Available Services

The project currently includes:

💗 Gel Manicure

🌸 Classic Manicure

🤍 French Manicure

✨ Nail Extensions

Each service includes:

Service name

Description

Price

Duration

Service image

🎮 How to Use

Customer

Create a new account.

Sign in to the website.

Open Services.

Choose a nail service.

Click View Details.

Click Book Appointment.

Select a date and time.

Add optional notes.

Confirm the appointment.

Open My Appointments to view, edit, or cancel your booking.

Use the notification bell to see upcoming appointments.

Admin

Sign in using an admin account.

Open Services to manage nail services.

Add, edit, or delete services.

Open All Appointments to view customer bookings.

🔔 Appointment Notifications

The website includes a notification system for upcoming appointments.

Customers can see:

🔔 Your appointment is today!

or:

🔔 Your appointment is tomorrow!

or:

🔔 Your appointment is in X days!

The navigation bar also displays a notification count when upcoming appointments are available.

🚫 Double Booking Protection

The application checks whether a selected appointment date and time are already booked.

If the time is unavailable, the customer receives:

This date and time is already booked. Please choose another time.

The customer can then choose another available time without leaving the booking page.

🔐 Authentication

The project uses session-based authentication.

Customer Authentication

Customers can:

Sign Up

Sign In

Sign Out

Passwords are hashed using bcrypt before being stored in the database.

User Roles

There are two user roles:

customer
admin

Each role has different permissions and navigation options.

🗃️ Database

The project uses MongoDB with Mongoose.

User

Stores customer and admin account information.

Main fields:

name
email
password
contact
role

Service

Stores nail service information.

Main fields:

name
description
price
duration

Appointment

Stores customer bookings.

Main fields:

user
service
appointmentDate
appointmentTime
notes
status

🛠️ Built With

Frontend

HTML5

CSS3

JavaScript

EJS

Backend

Node.js

Express.js

Database

MongoDB

Mongoose

Authentication & Packages

Express Session

Connect Mongo

bcrypt

dotenv

method-override

Morgan

Nodemon

📐 Entity Relationship Diagram



🎨 Initial Prototype



📁 Project Structure

NailsSalon/
│
├── config/
│   └── database.js
│
├── middleware/
│   ├── addUserToViews.js
│   ├── isAdmin.js
│   └── isSignedIn.js
│
├── models/
│   ├── appointment.js
│   ├── service.js
│   └── user.js
│
├── routes/
│   ├── authRouter.js
│   └── pagesRouter.js
│
├── public/
│   ├── images/
│   └── stylesheets/
│       ├── style.css
│       └── partials.css
│
├── views/
│   ├── admin/
│   │   └── appointments.ejs
│   │
│   ├── appointments/
│   │   ├── edit.ejs
│   │   ├── index.ejs
│   │   └── new.ejs
│   │
│   ├── auth/
│   │   ├── sign-in.ejs
│   │   └── sign-up.ejs
│   │
│   ├── notifications/
│   │   └── index.ejs
│   │
│   ├── partials/
│   │   ├── _navbar.ejs
│   │   └── _footer.ejs
│   │
│   └── services/
│       ├── edit.ejs
│       ├── index.ejs
│       ├── new.ejs
│       └── show.ejs
│
├── server.js
├── package.json
├── README.md
└── .env

🌐 Main Routes

Authentication

GET  /auth/sign-up
POST /auth/sign-up
GET  /auth/sign-in
POST /auth/sign-in
GET  /auth/sign-out

Services

GET    /services
GET    /services/new
POST   /services
GET    /services/:id
GET    /services/:id/edit
PUT    /services/:id
DELETE /services/:id

Appointments

GET    /appointments
GET    /appointments/new/:serviceId
POST   /appointments
GET    /appointments/:id/edit
PUT    /appointments/:id
DELETE /appointments/:id

Notifications

GET /notifications

Admin

GET /admin/appointments

🚀 Getting Started

Installation

Install the project dependencies:

npm install

Create a .env file in the root directory:

MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
PORT=3000

Run Locally

Start the development server:

npm run dev

Open the website in your browser:

http://localhost:3000

🔄 User Flow

Customer Flow

Home
  ↓
Sign Up / Sign In
  ↓
Services
  ↓
View Details
  ↓
Book Appointment
  ↓
Choose Date & Time
  ↓
Confirm Booking
  ↓
My Appointments
  ↓
Edit / Cancel Appointment

Admin Flow

Sign In
  ↓
Admin Navigation
  ↓
Add / Edit / Delete Services

        OR

All Appointments
  ↓
View Customer Bookings

🧩 CRUD Operations

The project demonstrates CRUD functionality.

Create

Create a customer account

Create a nail service

Create an appointment

Read

View services

View service details

View appointments

View notifications

View all admin appointments

Update

Edit a nail service

Edit an appointment

Change appointment status when cancelled

Delete

Delete a nail service

📱 Design

The website uses a minimal and elegant nail salon aesthetic.

Design Elements

🤎 Warm cream background

🤎 Dark brown typography

🌸 Soft beige tones

✨ Serif headings

💅 Large nail photography

🧴 Minimal navigation

🌫️ Subtle shadows

↔️ Smooth hover transitions

📱 Responsive layout

💅 Rare Nails custom logo

🖼️ Branding

The website is branded as:

Rare Nails

The Rare Nails logo is used in the navigation bar and as the website favicon.

🔮 Future Improvements

Add a customer profile page

Add an admin dashboard

Add a calendar-based booking interface

Display only available appointment times

Add email appointment confirmations

Add automatic appointment reminders

Add service image uploads

Add service search and filtering

Improve mobile navigation

Add more detailed form validation

Add better error pages

Add an admin calendar for appointment management

🙏 Attributions

Nail service and website imagery used for the project UI.

Rare Nails logo created for the project.

No external frontend libraries are required for the website interface.

👨‍💻 Author

Rare Nails — Nail Salon Booking Website

GitHub Repository:

GitHub(https://github.com/ruqayanasser51-coder/nails-salon-project.git)



⭐ If you enjoyed this project, feel free to give it a star on GitHub.