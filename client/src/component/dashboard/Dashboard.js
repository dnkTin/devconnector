import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../action/profileAction';
import Spinner from '../common/spinner';
import { Link } from 'react-router-dom';

class Dashboard extends Component {

    // load cai component nay thi no goi den getCurrentProfile no ban cai action
    // thang reducer se phan tich action nay va day ra trang thai moi
    componentDidMount() {
        this.props.getCurrentProfile();
    }
    render() {
        // do da map state to props
        const user = this.props.auth;
        const { profile, loading } = this.props.profile;
        let dashBoardContent;
        if (profile === null || loading) {
            dashBoardContent = <Spinner />
        } else {
            if (Object.keys(profile).length > 0) {
                dashBoardContent = <h4>TODO: DISPLAY A PROFILE</h4>
            } else {
                // user logged in but not have profile
                dashBoardContent = (
                    <div>
                        <p className="text-muted lead">
                            Welcome {user.name}
                        </p>
                        <p>You have not setup a profile, please add some info.</p>
                        <Link to="create-profile" className="btn btn-lg btn-info">
                            Create profile
                        </Link>
                    </div>
                );
            }
        }
        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">
                                DashBoard
                            </h1>
                            {dashBoardContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,

}
const mapStateToProps = state => ({
    // state.profile, state.auth hinh nhu trong store?
    profile: state.profile,
    auth: state.auth
})
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
