import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import axios from 'axios';

class recruiterprofile extends Component {

    constructor() {
        super();

        this.state = {
            name: "",
            email: "",
            bio: "",
            contactNumber: "",
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
                    email: response.data[0].email,
                    contactNumber: response.data[0].contactNumber,
                    bio: response.data[0].bio
        
                })
            })

       


    }


    render() {
        return (
            <div className="container col s12 left-align">


                <br></br>
                <div>
                    <br></br>
                    <h5>Name : {this.state.name}</h5><br></br>
                    <h5>Email ID : {this.state.email}</h5><br></br>
                    <h5>Contact Number : {this.state.contactNumber}</h5><br></br>
                    <h5>Bio : {this.state.bio}</h5><br></br>
                </div>
                <Link
                to="/editrecprofile"
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                  marginRight: "10px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Edit
            </Link>
            </div>
        )
    }
}

recruiterprofile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(recruiterprofile);