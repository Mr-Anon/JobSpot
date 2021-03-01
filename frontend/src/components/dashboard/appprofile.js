import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import axios from 'axios';

class Appilcantprofile extends Component {

    constructor() {
        super();

        this.state = {
            name: "",
            email: "",
            skills: "",
            education: "",
            errors: {}
        };
    }

    componentDidMount() {

        const user = this.props.auth.user;
        console.log(user.id);
        const data = {
            appId: user.id,
        }
        axios.post('api/applicant/getprofile', data)
            .then(response => {
                console.log(response);
                this.setState({
                    name: response.data[0].name,
                    email: response.data[0].email,
                    instituteName: response.data[0].instituteName,
                    startYear: response.data[0].startYear,
                    endYear: response.data[0].endYear,
                    skills: response.data[0].skills,
                    rating: response.data[0].rating

                })
            })

    }

    getpp=e=>{
       
        window.open('http://localhost:5000/pp/'+this.state.email+'.jpeg');
   
    }
    getresume=e=>{
       
        window.open('http://localhost:5000/resume/'+this.state.email+'.pdf');
   
    }


    render() {
        return (
            <div className="container col s12 left-align">


                <br></br>
                <div>
                    <br></br>
                    <img src={'http://localhost:5000/pp/'+this.state.email+'.jpeg'} style={{width : "100px", height: "100px"}}></img>
                    {/* <button onClick={this.getpp}>Profile Pic</button> */}
                    <h5>Name : {this.state.name}</h5><br></br>
                    <h5>Email ID : {this.state.email}</h5><br></br>
                    <h5>Education : <br></br>
                       Institute Name: {this.state.instituteName}<br></br>
                       Start Year: {this.state.startYear}<br></br>
                       End Year: {this.state.endYear}<br></br>
                    </h5><br></br>
                    <h5>Skills : {this.state.skills}</h5><br></br>
                    <h5>Rating: {this.state.rating}</h5><br></br>
                    <button onClick={this.getresume}>Resume</button>

                </div>
                <Link
                    to="/editappprofile"
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

Appilcantprofile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Appilcantprofile);