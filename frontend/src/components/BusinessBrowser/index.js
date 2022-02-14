import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useParams, useHistory } from 'react-router-dom';
import BusinessDetail from '../BusinessDetail';
import { getBusiness } from '../../store/business';
import CreateBusinessForm from '../CreateBusinessForm';
import { getAllReviews } from '../../store/review';

const BusinessBrowser = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [showForm, setShowForm] = useState(false);
    const sessionUser = useSelector(state => state.session.user)

    const { businessId } = useParams();
    const businesses = useSelector(state => {
        return state.business.list
    });

    const reviews = useSelector(state => {
        return state.review.list
    });

    useEffect(() => {
        dispatch(getBusiness());
        dispatch(getAllReviews());
    }, [dispatch]);

    if (!businesses) {
        return null;
    }

    const handleClickMB = async (e) => {
        e.preventDefault();
        if (sessionUser) {
            setShowForm(true)
        } else {
            history.push("/signup");
        }
    };


    const ratingFunc = (id) => {
        let rating = 0
        let count = 0
        reviews.forEach(review => {
            if (review.businessId === id) {
                rating += review.rating
                count++
            }
        });
        return (count === 0 ? "No reviews yet" : (rating / count).toFixed(2))
    }

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
                    <BusinessDetail rating={ratingFunc(+businessId)} />
                </Route>
                <Route>

                    {businesses && businesses?.map((business, i) => {
                        return (
                            <div key={i} >
                                <BusinessDetail propId={business?.id} rating={ratingFunc(business?.id)} />
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
