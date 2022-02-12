import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useParams, useHistory, Redirect } from 'react-router-dom';
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
            {showForm ? (
                <>
                    <button onClick={() => setShowForm(false)}>Cancel Business</button>
                    <CreateBusinessForm />
                </>
            ) : (
                <></>
            )}
            <Switch>

                <Route path="/business/:businessId">
                    <BusinessDetail />
                </Route>
                <Route>

                    {businesses && businesses?.map((business, i) => {
                        return (
                            <div key={i} >
                                <BusinessDetail propId={business?.id} />
                                <button onClick={() => history.push(`review/business/${business?.id}`)}>Read Reviews or create one!</button>
                            </div>
                        );
                    })}
                </Route>
            </Switch>
        </nav>
    );

}

export default BusinessBrowser;
