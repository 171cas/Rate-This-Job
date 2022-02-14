const express = require('express')
const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { check } = require('express-validator');
const { Business } = require('../../db/models')
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

async function list() {
    return await Business.findAll();
}
// Restore session user
router.get('/', asyncHandler(async function (_req, res) {
    const businesses = await list();
    //console.log(businesses)
    return res.json(businesses);
}));

const validateBusiness = [
    check('title')
        .notEmpty()
        .isLength({ max: 30, min: 1 })
        .withMessage('Please provide a valid title.'),
    check('description')
        .isLength({ max: 500, min: 10 })
        .withMessage('Please provide a valid description.'),
    check('address')
        .notEmpty()
        .isLength({ max: 100, min: 5 })
        .withMessage('Please provide a valid address.'),
    check('city')
        .notEmpty()
        .isLength({ max: 25, min: 3 })
        .withMessage('Please provide a valid city.'),
    check('state')
        .notEmpty()
        .isLength({ max: 2, min: 2 })
        .withMessage('Please provide a valid state.'),
    check('zipcode')
        .notEmpty()
        .isInt({ min: 0, max: 99999 })
        .toInt()
        .withMessage('Please provide a valid zipcode.'),
    check('imageUrl')
        .notEmpty()
        .withMessage('Please provide a valid Image URL.'),
    handleValidationErrors
]

router.post(
    '/',
    restoreUser,
    validateBusiness,
    asyncHandler(async function (req, res) {

        const { user } = req;
        // const userId = req.session.user.id
        const {
            title,
            description,
            address,
            city,
            state,
            zipcode,
            imageUrl
        } = req.body;

        const business = await Business.create(
            {
                userId: user.id,
                title,
                description,
                address,
                city,
                state,
                zipcode,
                imageUrl
            }
        )

        //console.log(business.dataValues)
        if (!business) {
            const err = new Error('Create failed');
            err.status = 401;
            err.title = 'Create failed';
            err.errors = ['The provided credentials were invalid.'];
            return next(err);
        }

        return res.json({
            business
        });

    })
);

router.put('/:id(\\d+)', asyncHandler(async (req, res) => {
    const business = await Business.findByPk(req.params.id);
    business.title = req.body.title;
    business.description = req.body.description;
    business.address = req.body.address;
    business.city = req.body.city;
    business.zipcode = req.body.zipcode;
    business.imageUrl = req.body.imageUrl;

    await business.save();
    res.json(business);
}));

router.delete(
    '/:id',
    restoreUser,
    asyncHandler(async function (req, res) {
        //const { user } = req;
        const business = await Business.findByPk(+req.params.id);
        await Business.destroy({ where: { id: business.id } })
        return res.json(business)
    })
);

router.get('/:id', asyncHandler(async function (req, res) {
    const business = await Business.findByPk(+req.params.id);
    return res.json(business);
}));

module.exports = router;
