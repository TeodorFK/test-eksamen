const mongoose = require('mongoose');

async function connectToDatabase(uri, dbName) {
  try {
    const result = await mongoose.connect(uri, { dbName });
    if (result) {
      console.log(`connected to ${result.connection.name}`);
    }
  } catch (err) {
    console.log(`dbhandler.js:connectToDatabase -> ${err}`);
  }
}

module.exports = {
  connectToDatabase,
};
