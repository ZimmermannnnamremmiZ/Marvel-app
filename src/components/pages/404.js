import ErrorPng from '../errorMessage/404.png';
import { Link } from 'react-router-dom';

const Page404 = () => {
    return (
        <div>
            <img src={ErrorPng} style={{width: '100%'}} />
            <Link to='/' style={{display: 'block',
                                textAlign: 'center',
                                fontSize: '24px',
                                fontWeight: 'bold',
                                marginTop: '40px'}
            }>Back to main page</Link>
        </div>
    )
}

export default Page404;