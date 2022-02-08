import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getBusiness } from '../../store/business';

const BusinessBrowser = () => {
    const dispatch = useDispatch();
    //const { businessId } = useParams();
    const businesses = useSelector(state => {
        return state.business.list
    });

    useEffect(() => {
        dispatch(getBusiness());
    }, [dispatch]);

    if (!businesses) {
        return null;
    }

    return (
        <nav>
            {businesses.map((business) => {
                return (
                    <NavLink key={business.title} to={`/business/${business.id}`}>
                        <div>
                            <div className="primary-text">{business.title}</div>
                        </div>
                    </NavLink>
                );
            })}
        </nav>
    );

}

export default BusinessBrowser;
