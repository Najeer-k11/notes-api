const express = require('express');
const fs = require('fs');
const https = require('https');
const bodyParser = require('body-parser');
const notesRoutes = require('./routes/index.js');
const authRoutes = require('./routes/auth.js');
const cors = require('cors');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', notesRoutes);
app.use('/auth', authRoutes);

// Load SSL cert and key
const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert'),
};

https.createServer(options, app).listen(PORT, () => {
  console.log(`✅ HTTPS server running at https://localhost:${PORT}`);
});
