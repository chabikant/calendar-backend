const { google } = require('googleapis');
const User = require('../models/User');
exports.createEvent = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  const user = await User.findById(req.user.id);
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: user.accessToken });
  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  try {
    const event = req.body.eventDetails;
    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Failed to create event" });
  }
};
exports.getEvents = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  const user = await User.findById(req.user.id);
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: user.accessToken });
  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  try {
    const events = await calendar.events.list({
      calendarId: "primary",
      maxResults: 10,
      orderBy: "updated", // Sort by the most recently updated events
      singleEvents: true,
      timeMin: new Date().toISOString(), // Show only upcoming events
    });

    // Sort events in descending order by start date and time
    const sortedEvents = events.data.items.sort(
      (a, b) =>
        new Date(b.start.dateTime || b.start.date) -
        new Date(a.start.dateTime || a.start.date)
    );

    res.status(200).json(sortedEvents);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};
