import { csrfFetch } from './csrf';

const LOAD = 'business/LOAD'
const ADD_ONE = 'business/ADD_ONE';

const load = (list) => (
    {
        type: LOAD,
        list
    }
)

const addOneBusiness = (business) => (
    {
        type: ADD_ONE,
        business
    }
);

export const getOneBusiness = (id) => async (dispatch) => {
    const response = await fetch(`/api/business/${id}`);
    return response
};

export const getBusiness = () => async (dispatch) => {
    const response = await fetch(`/api/business`);
    //console.log('response', response)
    if (response.ok) {
        const list = await response.json();
        //console.log('list', list)
        dispatch(load(list));
    }
};

export const createBusiness = (data) => async (dispatch) => {
    //console.log(data);
    const response = await csrfFetch(`/api/business`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const business = await response.json();
        dispatch(addOneBusiness(business));
        return business;
    }
};

const initialState = {
    list: [],
    types: []
};

//???????
// const sortList = (list) => {
//     return list
//         .sort((businessA, businessB) => {
//             return businessA.id - businessB.id;
//         })
//         .map((business) => business.id);
// };
//???????

const businessReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD: {
            const allBusiness = {};
            action.list.forEach((business) => {
                allBusiness[business.id] = business;
            });
            return {
                ...allBusiness,
                ...state,
                list: action.list //sortList(action.list)
            };
        }
        case ADD_ONE: {
            if (!state[action.business.id]) {
                const newState = {
                    ...state,
                    [action.business.id]: action.business
                };
                const businessList = newState.list.map((id) => newState[id]);
                businessList.push(action.business);
                newState.list = businessList;
                return newState;
            }
            return {
                ...state,
                [action.business.id]: {
                    ...state[action.business.id],
                    ...action.business
                }
            };
        }

        default:
            return state;
    }
};

export default businessReducer;
