import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getOneReview, deleteReview } from '../../store/review';

const ReviewDetail = () => {
    const { reviewId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const review = useSelector((state) => state.review[reviewId]);
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getOneReview(reviewId));
    }, [dispatch, reviewId]);

    if (!review) {
        return null;
    }
    const handleClickDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteReview(+reviewId))
        history.push(`/review/business/${review.businessId}`)
    };
    const handleClickGoBack = async (e) => {
        e.preventDefault();
        history.goBack()
    };
    // const handleClickEdit = async (e) => {
    //     e.preventDefault();
    // };
    let reviewLinks;
    if (sessionUser.id === review.userId) {
        reviewLinks = (
            <>
                <button onClick={handleClickDelete}>Delete Review</button>
                {/* <button onClick={handleClickEdit}>Edit Review</button> */}
            </>
        );
    }

    return (
        <>
            <div className='revcont'>
                <h2>{review.context}</h2>
                <h2>Field: {review.Field.name}</h2>
                <h2>Position: {review.position}</h2>
                <h2>Rating: {review.rating}</h2>
                <h2>User: {review.User.username}</h2>
                <h2>Business: {review.Business.title}</h2>

                {reviewLinks && reviewLinks}

            </div>
            <button onClick={handleClickGoBack}>Go Back</button>
        </>
    );
}

export default ReviewDetail;
