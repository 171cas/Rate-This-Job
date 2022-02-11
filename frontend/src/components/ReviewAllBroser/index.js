import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import BusinessDetail from '../BusinessDetail';
import { getAllReviews } from '../../store/review';
import CreateReviewForm from '../CreateReviewForm';

const ReviewAllBrowser = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)

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
