module.exports = {
  // disbable logging for production
  logging: false,
  seed: true,
  db: {
    url: process.env.MONGODB_URI
  }
};
