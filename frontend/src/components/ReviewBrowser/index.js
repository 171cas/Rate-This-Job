import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import BusinessDetail from '../BusinessDetail';
import { getReviews } from '../../store/review';
import CreateReviewForm from '../CreateReviewForm';

const ReviewBrowser = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)

    const [showForm, setShowForm] = useState(false);

    const { businessId } = useParams();
    const reviews = useSelector(state => {
        return state.review.list
    });

    useEffect(() => {
        dispatch(getReviews(businessId));
    }, [dispatch, businessId]);

    if (!reviews) {
        return null;
    }

    const handleClickMR = async (e) => {
        e.preventDefault();
        if (sessionUser) {
            setShowForm(true)
        } else {
            history.push("/signup");
        }
    };
    const handleClickGoBack = async (e) => {
        e.preventDefault();
        history.goBack()
    };
    const ratingFunc = () => {
        let rating = 0
        let count = 0
        reviews.forEach(review => {
            rating += review.rating
            count++

        });
        return (count === 0 ? "No reviews yet" : (rating / count).toFixed(2))
    }

    return (
        <nav>
            <button onClick={handleClickGoBack}>Go Back</button>
            <BusinessDetail rating={ratingFunc()} />
            <button onClick={handleClickMR}>Make a Review</button>
            {showForm ? (
                <>
                    <CreateReviewForm />
                    <button onClick={() => setShowForm(false)}>Cancel Review</button>
                </>
            ) : (
                <></>
            )}
            {reviews && reviews?.map((review, i) => {
                return (
                    <div key={`r${review?.id}`}>
                        <div>{review?.context}</div>
                        <button onClick={() => { history.push(`/review/${review?.id}`) }}>Info</button>
                    </div>
                );
            })}
        </nav>
    );

}

export default ReviewBrowser;
