import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';

const Nav = () => {

    return (
        <>
            <div>
                <Button component={Link} to="/">Home</Button>
                <Button component={Link} to="/favorites">Favorites</Button>
            </div>
        </>
    )
}

export default Nav;