const LOAD = 'business/LOAD'

const load = (list) => (
    {
        type: LOAD,
        list
    }
)

export const getOneBusiness = (id) => async (dispatch) => {
    const response = await fetch(`/api/business/${id}`);

    if (response.ok) {
        const business = await response.json();
        dispatch(getOneBusiness(business));
    }
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

        default:
            return state;
    }
};

export default businessReducer;
