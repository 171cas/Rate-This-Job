import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllReviews } from '../../store/review';

const ReviewAllBrowser = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const reviews = useSelector(state => {
        return state.review.list
    });

    useEffect(() => {
        dispatch(getAllReviews());
    }, [dispatch]);

    if (!reviews) {
        return null;
    }

    return (
        <nav>
            {reviews && reviews?.map((review, i) => {
                return (
                    <div key={`r${review?.id}`}>
                        <div>{review?.context}</div>
                        <div>User: {review?.userId}</div>
                        <div>Business: {review?.businessId}</div>
                        <button onClick={() => { history.push(`/review/${review.id}`) }}>Info</button>
                    </div>
                );
            })}
        </nav>
    );

}

export default ReviewAllBrowser;
