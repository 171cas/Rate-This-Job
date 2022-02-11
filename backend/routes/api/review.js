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

router.get('/:id', asyncHandler(async function (req, res) {
    const review = await Review.findByPk(+req.params.id);
    return res.json(review);
}));

router.delete(
    '/:id',
    restoreUser,
    asyncHandler(async function (req, res) {
        //const { user } = req;
        const review = await Review.findByPk(+req.params.id);
        await Review.destroy({ where: { id: review.id } })
        return res.json(review)
    })
);

const validateReview = [
    check('businessId')
        .notEmpty()
        .withMessage('Error with Business Authentication'),
    check('field')
        .notEmpty()
        .isInt({ min: 0, max: 3 })
        .toInt()
        .withMessage('Please provide a valid field.'),
    check('position')
        .notEmpty()
        .isLength({ max: 30, min: 3 })
        .withMessage('Please provide a valid position.'),
    check('context')
        .notEmpty()
        .isLength({ max: 1000, min: 10 })
        .withMessage('Please provide a valid context.'),
    check('rating')
        .notEmpty()
        .isInt({ min: 1, max: 10 })
        .toInt()
        .withMessage('Please provide a valid rating (1-10).'),
    handleValidationErrors
]
router.post(
    '/',
    restoreUser,
    validateReview,
    asyncHandler(async function (req, res) {

        const { user } = req;
        // const userId = req.session.user.id
        const {
            businessId,
            field,
            position,
            context,
            rating
        } = req.body;

        const review = await Review.create(
            {
                userId: user.id,
                businessId,
                fieldId: field,
                position,
                context,
                rating
            }
        )

        // console.log(review.dataValues)
        if (!review) {
            const err = new Error('Create failed');
            err.status = 401;
            err.title = 'Create failed';
            err.errors = ['The provided credentials were invalid.'];
            return next(err);
        }

        return res.json({
            review
        });

    })
);


module.exports = router;
