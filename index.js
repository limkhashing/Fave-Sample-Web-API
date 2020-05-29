const express = require('express');

const app = express();
app.use(express.json());

// Initialize API routes 
app.use('/', require('./routes/routes-controller'));

// error handling for non existed page
app.use((req, res) => {
  const error = new Error('Not found');
  error.status = 404;
  res.status(error.status || 500);
  res.json({
    error: error.message
  })
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log('App listening on port http://localhost:'+PORT+'/');
  console.log('Press Ctrl+C to quit.');
});
// [END app]