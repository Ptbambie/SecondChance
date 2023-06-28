require('dotenv').config();

const app = require('./src/app');

const port = parseInt(process.env.PORT ?? '5001', 10);

app.listen(port, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log(`Server listening on port ${port}`);
  }
});
