import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams, useHistory } from 'react-router-dom';
import BusinessDetail from '../BusinessDetail';
import { getBusiness } from '../../store/business';
import CreateBusinessForm from '../CreateBusinessForm';

const BusinessBrowser = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [showForm, setShowForm] = useState(false);
    const sessionUser = useSelector(state => state.session.user)

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

    const handleClickMB = async (e) => {
        e.preventDefault();
        if (sessionUser) {
            setShowForm(true)
        } else {
            history.push("/signup");
        }
    };

    return (
        <nav>
            <button onClick={handleClickMB}>Create a Business</button>
            <Route path="/business/:businessId">
                <BusinessDetail />
                {businessId &&
                    <button onClick={handleClickReview}>Read Reviews or create one!</button>
                }

                {/* <NavLink to={`/review/business/${businessId}`}>
                    <div>Read Reviews or create one!</div>
                </NavLink> */}
            </Route>

            {showForm ? (
                <>
                    <CreateBusinessForm />
                    <button onClick={() => setShowForm(false)}>Cancel Business</button>
                </>
            ) : (
                <></>
            )}
            {businesses && businesses?.map((business, i) => {
                return (
                    <NavLink onClick={() => setShowForm(false)} key={i} to={`/business/${business?.id}`}>
                        <div>{business?.title}</div>
                    </NavLink>
                );
            })}
        </nav>
    );

}

export default BusinessBrowser;
