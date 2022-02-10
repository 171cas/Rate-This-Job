import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { getOneBusiness, deleteBusiness } from '../../store/business';


const BusinessDetail = () => {
    const { businessId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const business = useSelector((state) => state.business[businessId]);
    const sessionUser = useSelector(state => state.session.user);

    let reviewLinks;
    if (sessionUser) {
        reviewLinks = (
            <NavLink exact to="/">Check its Reviews!</NavLink>
        );
    } else {
        reviewLinks = (
            <NavLink to="/login">Check its Reviews!</NavLink>
        );
    }

    useEffect(() => {
        dispatch(getOneBusiness(businessId));
    }, [dispatch, businessId]);

    if (!business) {
        return null;
    }

    console.log(+businessId)
    const handleClick = async (e) => {
        e.preventDefault();
        await dispatch(deleteBusiness(+businessId))
        history.push("/business");
    };

    return (
        <div>
            <h1>{business.title}</h1>
            <h2>{business.description}</h2>
            <h2>{business.city}</h2>
            <button
                onClick={handleClick}
            >
                Delete Business
            </button>

            {reviewLinks && reviewLinks}
        </div>
    );

}

export default BusinessDetail;
