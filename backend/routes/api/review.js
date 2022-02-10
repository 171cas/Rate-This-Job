const express = require('express')
const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { check } = require('express-validator');
const { Review } = require('../../db/models')
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

async function list(businessId) {
    return await Review.findAll({ where: { businessId: businessId } });
}

router.get('/business/:businessId', asyncHandler(async function (req, res) {
    const reviews = await list(req.params.businessId);
    return res.json(reviews);
}));

module.exports = router;
