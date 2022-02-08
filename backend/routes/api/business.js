const express = require('express')
const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Business } = require('../../db/models')

const router = express.Router();

async function list() {
    return await Business.findAll();
}
// Restore session user
router.get('/', asyncHandler(async function (_req, res) {
    const business = await list();
    return res.json(business);
}));

module.exports = router;
