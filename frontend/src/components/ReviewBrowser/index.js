import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import BusinessDetail from '../BusinessDetail';
import { getReviews } from '../../store/review';

const ReviewBrowser = () => {
    const dispatch = useDispatch();

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
                    <NavLink key={i} to={`/`}>
                        <div>{review?.context}</div>
                    </NavLink>
                );
            })}
        </nav>
    );

}

export default ReviewBrowser;
