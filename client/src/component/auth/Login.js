import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../../action/authAction'
import TextFieldGroup from '../common/TextFieldGroup';
class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        // after login, user can not go to login page
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        const loginData = {
            email: this.state.email,
            password: this.state.password
        };
        console.log(loginData);
        this.props.loginUser(loginData);
    }
    render() {
        const { errors } = this.state;
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">Sign in to your DevConnector account</p>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    type="email"
                                    placeholder="Email Address"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    error={errors.email}
                                    name="email"
                                />
                                <TextFieldGroup
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    error={errors.password}
                                    name="password"
                                    placeholder="password"
                                />

                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})
export default connect(mapStateToProps, { loginUser })(Login);