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


    let reviewLinks;
    if (sessionUser?.id === business?.userId) {
        reviewLinks = (
            <>
                <button onClick={handleClick}>Delete Business</button>
                <button onClick={handleClickEdit}>Edit Business</button>
            </>
        );
    } else {
        reviewLinks = (
            <>
            </>
        );
    }

    return (
        <>
            <div className='brcont'>
                <div className='item1'>
                    <h2><NavLink to={`/business/${businessId}`}>{business.title}</NavLink></h2>
                </div>
                <div className='item2'>
                    <h3>{business.description}</h3>
                    <h3>{business.city}, {business.state}.</h3>
                </div>
                <div className='item3 imx'>

                </div>
            </div>
            {reviewLinks && reviewLinks}
        </>
    );

}

export default BusinessDetail;
