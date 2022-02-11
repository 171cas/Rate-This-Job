import { csrfFetch } from './csrf';

const LOAD = 'business/LOAD'
const ADD_ONE = 'business/ADD_ONE';
const DELETE = 'business/DELETE'
const EDIT = 'business/EDIT';

const remove = (businessId) => ({
    type: DELETE,
    businessId
})

const load = (list) => (
    {
        type: LOAD,
        list
    }
)

const edit = (business) => (
    {
        type: EDIT,
        business
    }
);

const addOneBusiness = (business) => (
    {
        type: ADD_ONE,
        business
    }
);

export const editBusiness = (business) => async (dispatch) => {
    const response = await csrfFetch(`/api/business/${business.id}`, {
        method: 'PUT',
        body: JSON.stringify(business)
    })
    if (response.ok) {
        const editedBusiness = await response.json()
        dispatch(edit(editedBusiness))
        return editedBusiness
    }
}

export const deleteBusiness = (businessId) => async (dispatch) => {

    const response = await csrfFetch(`/api/business/${businessId}`, {
        method: 'delete',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        // body: JSON.stringify(businessId)
    });

    if (response.ok) {
        const business = await response.json();
        dispatch(remove(business.id));
        return business;
    }
}

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
        dispatch(addOneBusiness(business.id));
        return business;
    }
    return response
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
            if (!state[action.business?.id]) {
                const newState = {
                    ...state,
                    [action.business?.id]: action.business
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
        case EDIT:
            return {
                ...state,
                [action.business.id]: action.business
            }

        case DELETE: {
            const newState = { ...state };
            delete newState[action.businessId];
            newState.list = newState.list.filter(
                (business) => business.id !== action.businessId)
            return newState
        }

        default:
            return state;
    }
};

export default businessReducer;
