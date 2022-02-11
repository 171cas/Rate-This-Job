import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

const HomePage = () => {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
    let sessionLinks;
    if (!sessionUser) {
        sessionLinks = (
            <>
                <h2>What can you do?</h2>
                <h2>Review a job!</h2>
                <h2>Create a job to be rated & reviewed!</h2>
                <h2>Write a review and rate a job!</h2>
                <h2>Read Reviews of a job!</h2>
            </>
        );
    } else {
        history.push("/business");
    }
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getBusiness());
    // }, [dispatch]);


    return (
        <nav>
            {sessionLinks && sessionLinks}
        </nav>
    );

}

export default HomePage;
