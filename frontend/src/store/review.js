import { csrfFetch } from './csrf';

const LOAD = 'review/LOAD'
const ADD_ONE = 'review/ADD';
const DELETE = 'review/DELETE'
const EDIT = 'review/EDIT';

const load = (list) => (
    {
        type: LOAD,
        list
    }
)

const remove = (reviewId) => ({
    type: DELETE,
    reviewId
})

const addOneReview = (business) => (
    {
        type: ADD_ONE,
        business
    }
);

export const getReviews = (businessId) => async (dispatch) => {
    const response = await fetch(`/api/review/business/${businessId}`);
    //console.log('response', response)
    if (response.ok) {
        const list = await response.json();
        //console.log('list', list)
        dispatch(load(list));
    }
};

export const getOneReview = (id) => async (dispatch) => {
    const response = await fetch(`/api/review/${id}`)
    return response
}

export const deleteReview = (reviewId) => async (dispatch) => {

    const response = await csrfFetch(`/api/review/${reviewId}`, {
        method: 'delete',
    });

    if (response.ok) {
        const review = await response.json();
        dispatch(remove(review.id));
        return review;
    }
}

export const createReview = (data) => async (dispatch) => {
    //console.log(data);
    const response = await csrfFetch(`/api/review`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const review = await response.json();
        dispatch(addOneReview(review.id));
        return review;
    }
};

const initialState = {
    list: [],
    types: []
};

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD: {
            const allReviews = {};
            action.list.forEach((review) => {
                allReviews[review.id] = review;
            });
            return {
                ...allReviews,
                ...state,
                list: action.list //sortList(action.list)
            };
        }
        case DELETE: {
            const newState = { ...state };
            delete newState[action.reviewId];
            newState.list = newState.list.filter(
                (review) => review.id !== action.reviewId)
            return newState
        }

        default:
            return state;
    }
};

export default reviewReducer;
