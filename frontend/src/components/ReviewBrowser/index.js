import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import BusinessDetail from '../BusinessDetail';
import { getReviews } from '../../store/review';

const ReviewBrowser = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { businessId } = useParams();
    const reviews = useSelector(state => {
        return state.review.list
    });

    useEffect(() => {
        dispatch(getReviews(businessId));
    }, [dispatch]);

    if (!reviews) {
        return null;
    }

    return (
        <nav>
            <BusinessDetail />
            {reviews && reviews?.map((review, i) => {
                return (
                    <div key={`r${review.id}`}>
                        <div>{review?.context}</div>
                        <button onClick={() => { history.push(`/review/${review.id}`) }}>Update/Delete</button>
                    </div>
                );
            })}
        </nav>
    );

}

export default ReviewBrowser;
