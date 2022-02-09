import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const HomePage = () => {
    const sessionUser = useSelector(state => state.session.user);
    let sessionLinks;
    if (!sessionUser) {
        sessionLinks = (
            <>
                <NavLink to="/login">Log In</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
            </>
        );
    }
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getBusiness());
    // }, [dispatch]);


    return (
        <nav>
            <h1>Review a Job</h1>
            <h1>Read Reviews of a Job</h1>
            <NavLink to="/createBusiness"><h1>Create a Job</h1></NavLink>
            {sessionLinks && sessionLinks}
        </nav>
    );

}

export default HomePage;
