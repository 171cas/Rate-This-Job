const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const businessRouter = require('./business.js')
const reviewRouter = require('./review.js')


router.use('/session', sessionRouter);
router.use('/business', businessRouter);
router.use('/users', usersRouter);
router.use('/review', reviewRouter);

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});

module.exports = router;
