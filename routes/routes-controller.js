const router = require('express').Router();

router.use('/ReadFirestore', require('./ReadFirestore'));

module.exports = router