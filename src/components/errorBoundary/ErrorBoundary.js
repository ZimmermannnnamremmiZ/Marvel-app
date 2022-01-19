import { Component } from 'react';
import Error_gif from './errorBoundary.jpg'

class ErrorBoundary extends Component {
    state = {
        error: false
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <img style={{
                maxWidth: '100%',
                margin: '0 auto',
                display: 'block',
                maxHeight: '200px'
            }} src={Error_gif} alt='error, something wrong'/>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;