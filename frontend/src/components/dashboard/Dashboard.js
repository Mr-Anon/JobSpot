import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import axios from "axios";

//console.log(USER.type);


class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  componentDidMount() {
    const user = this.props.auth.user;
    console.log(user.id);
    const data = {
      recId: user.id,
    }
    axios.post('api/recruiter/getjobs', data)
      .then(response => {
        console.log(response);
        console.log(response.data);
        // rows = [].concat(response.data);
        localStorage.setItem("JOBS", response.data)


        //  this.setState({users: response.data, sortedUsers:response.data, searchText:''});
      })
      .catch(function (error) {
        console.log(error);
        //  console.log("errorrrr");
      })
  }
  // if(USER.type === "rec"){

  render() {
    const { user } = this.props.auth;
    if (user.type === "app") {
      return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align">
              <h4>
                <b>Hey there,</b> {user.name.split(" ")[0]}
                <p className="flow-text grey-text text-darken-1">
                  You are logged on JobSPot{" "}
                </p>
              </h4>

              <Link
                to="/appprofile"
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                  marginRight: "10px"
                }}

                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Profile
            </Link>
              <Link
                to="/appjobs"
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}

                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Jobs
            </Link>
              <br></br>
              <Link
                to="/myapplications"
                style={{
                  width: "250px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}

                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                My Applications
            </Link>
            </div>
          </div>
        </div>
      );
    }
    else {
      const { user } = this.props.auth;
      return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align">
              <h4>
                <b>Hey there,</b> {user.name.split(" ")[0]}
                <p className="flow-text grey-text text-darken-1">
                  You are logged on JobSPot{" "}
                </p>
              </h4>
              <Link
                to="/recprofile"
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                  marginRight: "10px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Profile
            </Link>
              <Link
                to="/recjobs"
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                  marginRight: "10px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Jobs
            </Link>

              <Link
                to="/addjob"
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Add Job
            </Link>
              <br></br>
              <Link
                to="/myemployees"
                style={{
                  width: "250px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                My Employees
            </Link>

            </div>
          </div>
        </div>
      );

    }
  }
}
// }
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);