import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser} from "../../actions/authActions";
import { upRecPro} from "../../actions/authActions";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';



import classnames from "classnames";


var user;
class EditRecruiterProfile extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
    constructor() {
        
        super();
        this.state = {
            name: "",
            bio: "",
            contactNumber: "",
            recId: "",
            errors: {}
        };
    }
    componentDidMount() {

        const user = this.props.auth.user;
        console.log(user.id);
        const data = {
            recId: user.id,
        }
        axios.post('api/recruiter/getprofile', data)
        .then(response => {
            console.log(response);
            this.setState({
                name: response.data[0].name,
                contactNumber: response.data[0].contactNumber,
                bio: response.data[0].bio
    
            })
        })
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/editrecprofile");
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        const {user} = this.props.auth
        e.preventDefault();
        const updatedUser = {
            name: this.state.name,
            contactNumber: this.state.contactNumber,
            bio: this.state.bio,
            recId: user.id

        }; 
        console.log(updatedUser)
        this.props.upRecPro(updatedUser, this.props.history);
    };
    render() {
        const { errors } = this.state; 
        return (
            <div className="container">
                <div className="row">
                    <div className="col s8 offset-s2">
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    error={errors.name}
                                    id="name"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.name
                                    })}
                                />
                                <label htmlFor="name">Name</label>
                                <span className="red-text">{errors.name}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.contactNumber}
                                    error={errors.contactNumber}
                                    id="contactNumber"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.contactNumber
                                    })}
                                />
                                <label htmlFor="contactNumber">Contact Number</label>
                                <span className="red-text">{errors.contactNumber}</span>
                            </div>
                            <div className="col s12">
                                <TextField
                                    id="bio"
                                    label="Bio"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    defaultValue=""
                                    variant="outlined"
                                    onChange={this.onChange}
                                    value={this.state.bio}
                                    error={errors.bio}
                                    id="bio"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.bio
                                    })}
                                />

                                <span className="red-text">{errors.bio}</span>
                            </div>

                            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                <button
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                    type="submit"
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                >
                                    Update
                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

} EditRecruiterProfile.propTypes = {
    upRecPro: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { upRecPro }
)(withRouter(EditRecruiterProfile));