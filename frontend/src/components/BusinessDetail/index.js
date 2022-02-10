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

    useEffect(() => {
        dispatch(getOneBusiness(businessId));
    }, [dispatch, businessId]);

    if (!business) {
        return null;
    }

    const handleClick = async (e) => {
        e.preventDefault();
        await dispatch(deleteBusiness(+businessId))
        history.push("/business");
    };
    const handleClickEdit = async (e) => {
        e.preventDefault();
        history.push(`/edit/business/${businessId}`);
    };
    const handleClickReview = async (e) => {
        e.preventDefault();
        history.push(`/review/business/${businessId}`);
    };


    let reviewLinks;
    if (sessionUser) {
        reviewLinks = (
            <>
                <button onClick={handleClick}>Delete Business</button>
                <button onClick={handleClickEdit}>Edit Business</button>
                <button onClick={handleClickReview}>Read Reviews or Create one!</button>
            </>
        );
    } else {
        reviewLinks = (
            <>
                <NavLink to="/login">Check its Reviews!</NavLink>
            </>
        );
    }

    return (
        <div>
            <h1>{business.title}</h1>
            <h2>{business.description}</h2>
            <h2>{business.city}</h2>

            {reviewLinks && reviewLinks}
        </div>
    );

}

export default BusinessDetail;
