// Import server creds
const creds = require('./config/creds');
const PORT = process.env.PORT || creds.PORT;

// Init express
const app = require('./server/server.js');

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
});
