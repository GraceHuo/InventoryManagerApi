var router = require('express').Router();

// api router will mount other routers for all our resources
router.use('/users', require('./user/userRoutes'));
router.use('/categories', require('./category/categoryRoutes'));
router.use('/locations', require('./location/locationRoutes'));
router.use('/items', require('./item/itemRoutes'));

module.exports = router;
