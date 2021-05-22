import React from "react"
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            hasError : false
        }
    }

    static getDerivedStateFromError(){
        return {
            hasError : true
        }
    }
   
    render() {
        return !this.state.hasError ? this.props.children : <div>ERROR OCCURED</div>
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.element
};

export default ErrorBoundary