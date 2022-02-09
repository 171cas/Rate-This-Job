import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneBusiness } from '../../store/business';

const BusinessDetail = () => {
    const { businessId } = useParams();
    const dispatch = useDispatch();
    const business = useSelector((state) => state.business[businessId]);

    useEffect(() => {
        dispatch(getOneBusiness(businessId));
    }, [dispatch, businessId]);

    if (!business) {
        return null;
    }

    //console.log(+businessId)

    return (
        <div>
            <h1>{business.title}</h1>
            <h2>{business.description}</h2>
            <h2>{business.city}</h2>
        </div>
    );

}

export default BusinessDetail;
