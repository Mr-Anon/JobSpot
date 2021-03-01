import React, { Component } from "react";
import { Link } from "react-router-dom";
class option extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper ">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Who</b> are you?
            </h4>
            <p className="flow-text grey-text text-darken-1">
            </p>
            <br />
            <div className="col s6">
              <Link
                to="/register_app"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Applicant
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/register_rec"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                
                Recruiter
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default option;