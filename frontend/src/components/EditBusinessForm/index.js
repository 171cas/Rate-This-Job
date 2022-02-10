import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom';
import { editBusiness } from "../../store/business";

const EditBusinessForm = ({ hideForm }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    let { businessId } = useParams();
    businessId = parseInt(businessId)
    const businesses = useSelector(state => Object.values(state.business))
    const business = businesses.find(business => business.id === businessId);

    // const userId = useSelector(state => state.session.user.id);

    const [title, setTitle,] = useState(business?.title)
    const [description, setDescription,] = useState(business?.description)
    const [address, setAddress,] = useState(business?.address)
    const [city, setCity,] = useState(business?.city)
    const [state, setState,] = useState(business?.state)
    const [zipcode, setZipcode,] = useState(business?.zipcode)
    const [errors, setErrors] = useState([]);

    const updateTitle = (e) => setTitle(e.target.value)
    const updateDescription = (e) => setDescription(e.target.value)
    const updateAddress = (e) => setAddress(e.target.value)
    const updateCity = (e) => setCity(e.target.value)
    const updateState = (e) => setState(e.target.value)
    const updateZipcode = (e) => setZipcode(e.target.value)


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const payload = {
            id: businessId,
            title,
            description,
            address,
            city,
            state,
            zipcode
        }
        let newBusiness = await dispatch(editBusiness(payload))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });

        console.log(newBusiness)
        if (newBusiness) { history.push(`/business/${newBusiness.id}`) }
    };

    return (
        <section>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
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
                <button type='submit'>Edit ThisBusiness</button>
            </form>
        </section>
    );
};

export default EditBusinessForm;
