import { useState } from "react";
import { useDispatch } from 'react-redux';
import { createBusiness } from "../../store/business";
import { useHistory } from 'react-router-dom';

const CreateBusinessForm = ({ hideForm }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [title, setTitle,] = useState('')
    const [description, setDescription,] = useState('')
    const [address, setAddress,] = useState('')
    const [city, setCity,] = useState('')
    const [state, setState,] = useState('')
    const [zipcode, setZipcode,] = useState(10001)

    const updateTitle = (e) => setTitle(e.target.value)
    const updateDescription = (e) => setDescription(e.target.value)
    const updateAddress = (e) => setAddress(e.target.value)
    const updateCity = (e) => setCity(e.target.value)
    const updateState = (e) => setState(e.target.value)
    const updateZipcode = (e) => setZipcode(e.target.value)


    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title,
            description,
            address,
            city,
            state,
            zipcode
        }
        let createdBusiness = await dispatch(createBusiness(payload));
        if (createdBusiness) {
            console.log(createdBusiness)
            history.push(`/business/${createdBusiness.id}`);
            //hideForm();
        }
    };

    // const handleCancelClick = (e) => {
    //     e.preventDefault();
    //     hideForm();
    // };

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='title'
                    required
                    value={title}
                    onChange={updateTitle}
                />
                <input
                    type='text'
                    placeholder='description'
                    value={description}
                    onChange={updateDescription}
                />
                <input
                    type='text'
                    placeholder='address'
                    required
                    value={address}
                    onChange={updateAddress}
                />
                <input
                    type='text'
                    placeholder='city'
                    required
                    value={city}
                    onChange={updateCity}
                />
                <input
                    type='text'
                    placeholder='state'
                    required
                    value={state}
                    onChange={updateState}
                />
                <input
                    type='number'
                    placeholder='zipcode'
                    required
                    min='0'
                    max='99999'
                    value={zipcode}
                    onChange={updateZipcode}
                />
                <button type='submit'>Create new Business</button>
            </form>
        </section>
    );
};

export default CreateBusinessForm;
