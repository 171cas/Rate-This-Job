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
    const [state, setState,] = useState('CA')
    const [zipcode, setZipcode,] = useState(10001)
    const [imageUrl, setImageUrl] = useState('https://st4.depositphotos.com/17828278/24401/v/600/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg')
    const [errors, setErrors] = useState([]);

    const updateTitle = (e) => setTitle(e.target.value)
    const updateDescription = (e) => setDescription(e.target.value)
    const updateAddress = (e) => setAddress(e.target.value)
    const updateCity = (e) => setCity(e.target.value)
    const updateState = (e) => setState(e.target.value)
    const updateZipcode = (e) => setZipcode(e.target.value)
    const updateImageUrl = (e) => setImageUrl(e.target.value)


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const payload = {
            title,
            description,
            address,
            city,
            state,
            zipcode,
            imageUrl
        }
        let newBusiness = await dispatch(createBusiness(payload))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data?.errors) setErrors(data?.errors);
            });

        if (newBusiness) {
            history.push(`/`)
            history.push(`/business/${newBusiness?.business?.id}`)
        }
    };

    // const handleCancelClick = (e) => {
    //     e.preventDefault();
    //     hideForm();
    // };

    return (
        <section>
            <ul>
                {errors?.map((error, idx) => <li className='required' key={idx}>{error}</li>)}
            </ul>
            <div className="fcont">
                <form className="myform" onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='title'
                        required
                        value={title}
                        onChange={updateTitle}
                    />
                    <textarea
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
                    <select
                        value={state}
                        onChange={updateState}
                    >
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                    </select>
                    <input
                        type='number'
                        placeholder='zipcode'
                        required
                        min='0'
                        max='99999'
                        value={zipcode}
                        onChange={updateZipcode}
                    />
                    <input
                        type='text'
                        placeholder='Image Url'
                        required
                        value={imageUrl}
                        onChange={updateImageUrl}
                    />
                    <button type='submit'>Create new Business</button>
                </form>
            </div>
        </section>
    );
};

export default CreateBusinessForm;
