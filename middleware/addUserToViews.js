const Appointment = require('../models/appointment');

const addUserToViews = async (req, res, next) => {
  const { user } = req.session;

  if (user) {
    res.locals.user = user;

    const today = new Date();

    const twoDaysFromNow = new Date();
    twoDaysFromNow.setDate(today.getDate() + 2);

    const appointments = await Appointment.find({
      user: user._id,
      status: 'booked',
      appointmentDate: {
        $gte: today,
        $lte: twoDaysFromNow,
      },
    }).populate('service');

    res.locals.notificationCount = appointments.length;
    res.locals.upcomingAppointments = appointments;
  } else {
    res.locals.user = null;
    res.locals.notificationCount = 0;
    res.locals.upcomingAppointments = [];
  }

  next();
};

module.exports = addUserToViews;