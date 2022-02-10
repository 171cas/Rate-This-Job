import { csrfFetch } from './csrf';

const LOAD = 'review/LOAD'
const ADD = 'review/ADD';
const DELETE = 'review/DELETE'
const EDIT = 'review/EDIT';

const load = (list) => (
    {
        type: LOAD,
        list
    }
)

export const getReviews = (businessId) => async (dispatch) => {
    const response = await fetch(`/api/review/business/${businessId}`);
    //console.log('response', response)
    if (response.ok) {
        const list = await response.json();
        //console.log('list', list)
        dispatch(load(list));
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

        default:
            return state;
    }
};

export default reviewReducer;
