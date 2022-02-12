import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { getBusiness, deleteBusiness } from '../../store/business';
import EditBusinessForm from '../EditBusinessForm';


const BusinessDetail = ({ propId }) => {
    let { businessId } = useParams();
    if (propId) businessId = propId;
    const dispatch = useDispatch();
    const history = useHistory();

    const [showForm, setShowForm] = useState(false);
    const sessionUser = useSelector(state => state.session.user);


    useEffect(() => {
        dispatch(getBusiness());
    }, [dispatch]);

    const business = useSelector((state) => state.business[businessId]);

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
        setShowForm(true)
        //history.push(`/edit/business/${businessId}`);
    };


    let reviewLinks;
    if (sessionUser?.id === business?.userId) {
        reviewLinks = (
            <>
                <button onClick={handleClick}>Delete Business</button>
                <button onClick={handleClickEdit}>Edit Business</button>
                {showForm ? (
                    <>
                        <button onClick={() => setShowForm(false)}>Cancel Edit</button>
                        <EditBusinessForm propId={propId} />
                    </>
                ) : (
                    <></>
                )}
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
                    <h2><NavLink to={`/review/business/${businessId}`}>{business?.title}</NavLink></h2>
                </div>
                <div className='item2'>
                    <h3>{business?.description}</h3>
                    <h3>{business?.city}, {business?.state}.</h3>
                </div>
                <div className='item3 imx'>

                </div>
            </div>
            {reviewLinks && reviewLinks}
        </>
    );

}

export default BusinessDetail;
