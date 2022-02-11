import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams, useHistory } from 'react-router-dom';
import BusinessDetail from '../BusinessDetail';
import { getBusiness } from '../../store/business';

const BusinessBrowser = () => {
    const dispatch = useDispatch();
    const history = useHistory();

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
    const handleClickReview = async (e) => {
        e.preventDefault();
        history.push(`/review/business/${businessId}`);
    };

    return (
        <nav>
            <Route path="/business/:businessId">
                <BusinessDetail />
                <button onClick={handleClickReview}>Read Reviews or Create one!</button>
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
