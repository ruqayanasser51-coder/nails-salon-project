# 💅 Rare Nails — Nail Salon Booking Website

![Rare Nails Website](./public/stylesheets/images/screenshootweb.png)

Rare Nails is a full-stack nail salon booking website designed to make it easier for customers to explore nail services, view service details, and book appointments online.

Customers can browse available services, create an account, book appointments, manage their bookings, and receive notifications for upcoming appointments.

Admin users can manage nail services and view all customer appointments.

---

## 📌 Features

### 👩 Customer Features

- 📝 Create a customer account
- 🔐 Sign in and sign out
- 💅 View all available nail services
- 🔎 View detailed information about each service
- 💰 View service prices
- ⏱️ View service duration
- 📅 Choose an appointment date
- 🕐 Choose an appointment time
- 📝 Add notes to an appointment
- 🚫 Prevent double-booking the same date and time
- 📋 View all personal appointments
- ✏️ Edit appointments
- ❌ Cancel appointments
- 🔔 Receive upcoming appointment notifications
- 🔢 View notification count in the navigation bar

### 👩‍💼 Admin Features

- 🔐 Admin sign in
- ➕ Add a new nail service
- 👀 View service details
- ✏️ Edit a nail service
- 🗑️ Delete a nail service
- 📋 View all customer appointments
- 👤 View customer information
- 📅 View appointment date and time
- 📝 View appointment notes
- 📌 View appointment status

---

## 💅 Available Services

The project currently includes:

- 💗 Gel Manicure
- 🌸 Classic Manicure
- 🤍 French Manicure
- ✨ Nail Extensions

Each service includes:

- Service name
- Description
- Price
- Duration
- Service image

---

## 🎮 How to Use

### Customer

1. Create a new account.
2. Sign in to the website.
3. Open **Services**.
4. Choose a nail service.
5. Click **View Details**.
6. Click **Book Appointment**.
7. Select a date and time.
8. Add optional notes.
9. Confirm the appointment.
10. Open **My Appointments** to view, edit, or cancel the booking.
11. Use the notification bell to see upcoming appointments.

### Admin

1. Sign in using an admin account.
2. Open **Services** to manage nail services.
3. Add, edit, or delete services.
4. Open **All Appointments** to view customer bookings.

---

## 🔔 Appointment Notifications

The website includes a notification system for upcoming appointments.

Customers can receive notifications such as:

- 🔔 Your appointment is today!
- 🔔 Your appointment is tomorrow!
- 🔔 Your appointment is in X days!

The navigation bar also displays a notification count when upcoming appointments are available.

---

## 🚫 Double Booking Protection

The application checks whether a selected appointment date and time are already booked.

If the selected date and time are unavailable, the customer receives an error message and is asked to choose another available time.

Example:

> This date and time is already booked. Please choose another time.

This prevents two customers from booking the same date and time.

---

## 🔐 Authentication & Authorization

The project uses session-based authentication.

### Customer Authentication

Customers can:

- Sign Up
- Sign In
- Sign Out

Passwords are hashed using **bcrypt** before being stored in the database.

### User Roles

There are two user roles:

- `customer`
- `admin`

Each role has different permissions and navigation options.

Customers can manage their own appointments, while admins can manage services and view all customer appointments.

---

## 🗃️ Database

The project uses **MongoDB** with **Mongoose**.

### User

Stores customer and admin account information.

Main fields:

- `name`
- `email`
- `password`
- `contact`
- `role`

### Service

Stores nail service information.

Main fields:

- `name`
- `description`
- `price`
- `duration`

### Appointment

Stores customer bookings.

Main fields:

- `user`
- `service`
- `appointmentDate`
- `appointmentTime`
- `notes`
- `status`

---

## 🛠️ Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript
- EJS

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Authentication & Packages

- Express Session
- Connect Mongo
- bcrypt
- dotenv
- method-override
- Morgan
- Nodemon

---

## 📐 Entity Relationship Diagram

![Entity Relationship Diagram](./Untitled%20Diagram.drawio%20(1).png)

---

## 🎨 Initial Prototype

![Initial Prototype](./Untitled-2026-08-20-1056.png)

---

## 📁 Project Structure

```text
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

----

## 🌐 Main Routes
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


## 🔄 User Flow

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


## 🧩 CRUD Operations

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


## 📱 Design

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

The logo file is:
naillogo1.jpg


🙏 Attributions
Nail Service & Website Images

The following images were sourced from Pinterest:

 https://pin.it/6zFz88Tvb — hero-nails (2).jpg

https://pin.it/7qNFDlAGA — ClassicManicure.png

https://pin.it/4A48ppwQm — FrenchManicure.png

https://pin.it/4vWEqCgGT — GelManicure.png

https://pin.it/3DvgjMY9S — NailExtensions.png

https://pin.it/215gLZb9v — nails1.jpg

https://pin.it/5XSQlWTrF — nails3.jpg

https://pin.it/6pQ5PTkty — nailsring22.png

https://pin.it/RMviMcFIY — Set Manciure nails.jpg


Logo:
The Rare Nails logo was designed by me using Canva for this project.

No external frontend libraries are required for the website interface.


## 🔮 Future Improvements

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


## 👩‍💻 Author

Rare Nails — Nail Salon Booking Website

### GitHub Repository

[View GitHub Repository](https://github.com/ruqayanasser51-coder/nails-salon-project)

### Live Demo

[Visit Live Website](https://nails-salon-project.onrender.com)