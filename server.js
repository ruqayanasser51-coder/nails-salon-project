/* eslint-disable prefer-destructuring */

require('dotenv').config();
require('./config/database');

const path = require('path');
const express = require('express');

const app = express();

// Middleware
const session = require('express-session');
const MongoStore = require('connect-mongo').MongoStore;
const methodOverride = require('method-override');
const morgan = require('morgan');

const isSignedIn = require('./middleware/isSignedIn');
const isAdmin = require('./middleware/isAdmin');
const addUserToViews = require('./middleware/addUserToViews');

// Routers
const authRouter = require('./routes/authRouter');
const pagesRouter = require('./routes/pagesRouter');

// Models
const Service = require('./models/service');
const Appointment = require('./models/appointment');

// Port
const port = process.env.PORT ? process.env.PORT : '3000';


// =========================================
// MIDDLEWARE
// =========================================

app.use(
  express.static(path.join(__dirname, 'public'))
);

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(methodOverride('_method'));

app.use(morgan('dev'));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,

    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);

app.use(addUserToViews);


// =========================================
// MAIN ROUTES
// =========================================

app.use('', pagesRouter);

app.use('/auth', authRouter);


// =========================================
// SERVICES
// =========================================

// Show all services
app.get('/services', async (req, res) => {
  const services = await Service.find();

  res.render('services/index.ejs', {
    services,
  });
});


// Show page to create service
app.get('/services/new', (req, res) => {
  res.render('services/new.ejs');
});


// Create service
app.post('/services', async (req, res) => {
  await Service.create(req.body);

  res.redirect('/services');
});


// Edit service page
app.get('/services/:id/edit', async (req, res) => {
  const service = await Service.findById(req.params.id);

  res.render('services/edit.ejs', {
    service,
  });
});


// Show one service
app.get('/services/:id', async (req, res) => {
  const service = await Service.findById(req.params.id);

  res.render('services/show.ejs', {
    service,
  });
});


// Update service
app.put('/services/:id', async (req, res) => {
  await Service.findByIdAndUpdate(
    req.params.id,
    req.body
  );

  res.redirect('/services');
});


// Delete service
app.delete('/services/:id', async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);

  res.redirect('/services');
});


// =========================================
// CUSTOMER / APPOINTMENTS
// =========================================

app.use(isSignedIn);


// =========================================
// BOOK APPOINTMENT PAGE
// =========================================

app.get(
  '/appointments/new/:serviceId',
  async (req, res) => {
    const service = await Service.findById(
      req.params.serviceId
    );

    res.render('appointments/new.ejs', {
      service,
      error: null,
    });
  }
);


// =========================================
// CREATE APPOINTMENT
// =========================================

app.post('/appointments', async (req, res) => {
  const {
    serviceId,
    appointmentDate,
    appointmentTime,
    notes,
  } = req.body;


  // Check if the date and time are already booked
  const existingAppointment =
    await Appointment.findOne({
      appointmentDate,
      appointmentTime,
      status: 'booked',
    });


  // If already booked, stay on booking page
  if (existingAppointment) {
    const service = await Service.findById(
      serviceId
    );

    return res.status(409).render(
      'appointments/new.ejs',
      {
        service,
        error:
          'This date and time is already booked. Please choose another time.',
      }
    );
  }


  // Create appointment
  await Appointment.create({
    user: req.session.user._id,
    service: serviceId,
    appointmentDate,
    appointmentTime,
    notes,
    status: 'booked',
  });


  // Go to My Appointments
  res.redirect('/appointments');
});


// =========================================
// MY APPOINTMENTS
// =========================================

app.get('/appointments', async (req, res) => {
  const appointments =
    await Appointment.find({
      user: req.session.user._id,
    }).populate('service');


  res.render(
    'appointments/index.ejs',
    {
      appointments,
    }
  );
});


// =========================================
// EDIT APPOINTMENT PAGE
// =========================================

app.get(
  '/appointments/:id/edit',
  async (req, res) => {

    const appointment =
      await Appointment.findOne({
        _id: req.params.id,
        user: req.session.user._id,
      }).populate('service');


    if (!appointment) {
      return res.send(
        'Appointment not found.'
      );
    }


    res.render(
      'appointments/edit.ejs',
      {
        appointment,
      }
    );
  }
);


// =========================================
// UPDATE APPOINTMENT
// =========================================

app.put(
  '/appointments/:id',
  async (req, res) => {

    const {
      appointmentDate,
      appointmentTime,
      notes,
    } = req.body;


    // Check if another appointment
    // already uses this date and time
    const existingAppointment =
      await Appointment.findOne({
        appointmentDate,
        appointmentTime,
        status: 'booked',
        _id: {
          $ne: req.params.id,
        },
      });


    if (existingAppointment) {
      return res.send(
        'This date and time is already booked. Please choose another time.'
      );
    }


    await Appointment.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.session.user._id,
      },
      {
        appointmentDate,
        appointmentTime,
        notes,
      }
    );


    res.redirect('/appointments');
  }
);


// =========================================
// CANCEL APPOINTMENT
// =========================================

app.delete(
  '/appointments/:id',
  async (req, res) => {

    await Appointment.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.session.user._id,
      },
      {
        status: 'cancelled',
      }
    );


    res.redirect('/appointments');
  }
);


// =========================================
// ADMIN
// =========================================

app.get(
  '/admin/appointments',
  isAdmin,
  async (req, res) => {

    const appointments =
      await Appointment.find()
        .populate('user')
        .populate('service');


    res.render(
      'admin/appointments.ejs',
      {
        appointments,
      }
    );
  }
);


// =========================================
// NOTIFICATIONS
// =========================================

app.get(
  '/notifications',
  async (req, res) => {

    const today = new Date();


    const appointments =
      await Appointment.find({

        user: req.session.user._id,

        status: 'booked',

        appointmentDate: {
          $gte: today,
        },

      }).populate('service');


    res.render(
      'notifications/index.ejs',
      {
        appointments,
      }
    );
  }
);


// =========================================
// START SERVER
// =========================================

app.listen(port, () => {
  console.log(
    `The express app is ready on port ${port}!`
  );
});

