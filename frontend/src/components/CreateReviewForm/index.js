import { useState } from "react";
import { useDispatch } from 'react-redux';
import { createReview } from "../../store/review";
import { useHistory, useParams } from 'react-router-dom';

const CreateReviewForm = ({ hideForm }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [field, setField,] = useState(1)
    const [position, setPosition,] = useState('')
    const [context, setContext,] = useState('')
    const [rating, setRating,] = useState(10)
    const [errors, setErrors] = useState([]);

    const { businessId } = useParams();

    const updateField = (e) => setField(e.target.value)
    const updatePosition = (e) => setPosition(e.target.value)
    const updateContext = (e) => setContext(e.target.value)
    const updateRating = (e) => setRating(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const payload = {
            businessId: +businessId,
            field,
            position,
            context,
            rating
        }
        let newReview = await dispatch(createReview(payload))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });

        if (newReview) {
            history.push(`/`)
            history.push(`/review/business/${+businessId}`)
        }
    };

    return (
        <section>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <div className="fcont">
                <form className="myform" onSubmit={handleSubmit}>
                    <select value={field} onChange={updateField}>
                        <option value="1">FOH</option>
                        <option value="2">BOH</option>
                        <option value="3">Management / HR</option>
                    </select>
                    <input
                        type='text'
                        placeholder='Position'
                        required
                        value={position}
                        onChange={updatePosition}
                    />
                    <input
                        type='text'
                        placeholder='Context'
                        value={context}
                        onChange={updateContext}
                    />
                    <input
                        type='text'
                        placeholder='Rating'
                        required
                        value={rating}
                        onChange={updateRating}
                    />
                    <button type='submit'>Create new Review</button>
                </form>
            </div>
        </section>
    );
};

export default CreateReviewForm;
