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
                    <div className='revcont' key={`r${review?.id}`}>
                        <div>{review?.context}</div>
                        <div>User: {review?.User?.username}</div>
                        <div>Business: {review?.Business?.title}</div>
                        <button onClick={() => { history.push(`/review/${review?.id}`) }}>Info</button>
                    </div>
                );
            })}
        </nav>
    );

}

export default ReviewAllBrowser;
