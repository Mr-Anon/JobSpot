import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";


// const USER  = JSON.parse(localStorage.getItem("USER"));
class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };


  render() {
    const { user } = this.props.auth;
    const { isAuthenticated } = this.props.auth;
    if(isAuthenticated === true){
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <h5
            style={{
              color: "black",
              fontFamily: "monospace",
              float: "left",
              marginLeft: ".5rem",
              marginTop: "2rem"
            }}
            >Hi,{user.name.split(" ")[0]}</h5>
            <Link
              to="/dashboard"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center black-text"
            >
              <i className="material-icons">code</i>
              JobSPot
            </Link>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: ".25rem",
                float:"right",
                marginRight: ".25rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light blue accent-3"
            >
              Logout
            </button>
          </div>
        </nav>
      </div>
    );}
    else{
      return (
        <div className="navbar-fixed">
          <nav className="z-depth-0">
            <div className="nav-wrapper white">
              <Link
                to="/"
                style={{
                  fontFamily: "monospace"
                }}
                className="col s5 brand-logo center black-text"
              >
                <i className="material-icons">code</i>
                JobSPot
              </Link>
            </div>
          </nav>
        </div>
      );
    }
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

// const mapStateToProps = state => ({
//   auth: state.auth
// });

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);