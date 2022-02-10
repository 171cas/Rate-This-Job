import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import BusinessDetail from '../BusinessDetail';
import { getBusiness } from '../../store/business';

const BusinessBrowser = () => {
    const dispatch = useDispatch();

    const { businessId } = useParams();
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
            <Route path="/business/:businessId">
                <BusinessDetail />
            </Route>
            {businesses && businesses?.map((business, i) => {
                return (
                    <NavLink key={i} to={`/business/${business?.id}`}>
                        <div>{business?.title}</div>
                    </NavLink>
                );
            })}
        </nav>
    );

}

export default BusinessBrowser;
