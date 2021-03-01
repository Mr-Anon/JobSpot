import React, { Component, useState, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { registerApp } from "../../actions/authActions";
import classnames from "classnames";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';





class AppRegister extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      instituteName: [""],
      startYear: [""],
      endYear: [""],
      skills: ["Python", "React", "Node.js"],
      resume: null,
      image: null,
      errors: {}
    };
    this.onChangeResume = this.onChangeResume.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
  }
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    console.log(this.state);
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
  async onChangeResume(e) {
    await this.setState({ resume: e.target.files[0] }) // accesing file
    console.log(this.state.resume)
    console.log(this.state.resume.type)
  };
  async onChangeImage(e) {
    await this.setState({ image: e.target.files[0] }) // accesing file
    console.log(this.state.image)
  };
  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      instituteName: this.state.instituteName,
      startYear: this.state.startYear,
      endYear: this.state.endYear,
      rating: '',
      noOfRating: '',
      totalRating: '',
      // educations: this.state.educations,
      skills: this.state.skills
    }; this.props.registerApp(newUser, this.props.history);
    if (this.state.email !== '' && this.state.resume !== null && this.state.image !==null ) {
      if (this.state.resume.type !== "application/pdf" ) {
        alert("resume must be a pdf file")
      }
      else if(this.state.resume.size > 0) {
        const formData = new FormData();
        formData.append('resume', this.state.resume); // appending file
        axios.post('api/applicant/uploadResume/' + this.state.email, formData)
      }
      if (this.state.image.type !== "image/jpeg") {
        alert("Image must be a jpg Image")
      }
      else if(this.state.image.size > 0) {
      const formData1 = new FormData();
      formData1.append('image', this.state.image); // appending file
      axios.post('api/applicant/uploadImg/' + this.state.email, formData1)
      }
    }
  };
  SkillHandler(e, index) {
    const values = [...this.state.skills];
    values[index] = e.target.value;
    this.setState({ skills: values });
  }

  addSkillRow = e => {
    const values = [...this.state.skills];
    console.log(values);
    values.push(
      ""
    );
    this.setState({ skills: values });
  }
  removeSkillRow = e => {
    const values = [...this.state.skills];
    values.splice(e, 1);
    if (values.length == 0) {
      values.push(
        ""
      );
    }
    this.setState({ skills: values });
  }
  educationNameHandler(e, index) {
    const values = [...this.state.instituteName];
    values[index] = e.target.value;
    this.setState({ instituteName: values });
  }
  educationstartYearHandler(e, index) {
    const values = [...this.state.startYear];
    values[index] = e.target.value;
    this.setState({ startYear: values });
  }
  educationendYearHandler(e, index) {
    const values = [...this.state.endYear];
    values[index] = e.target.value;
    this.setState({ endYear: values });
  }
  addEducationRow = e => {
    const values1 = [...this.state.instituteName];
    console.log(values1);
    values1.push(
      ""

    );
    this.setState({ instituteName: values1 });
    const values2 = [...this.state.startYear];
    console.log(values2);
    values2.push(
      ""

    );
    this.setState({ startYear: values2 });
    const values3 = [...this.state.endYear];
    console.log(values3);
    values3.push(
      ""

    );
    this.setState({ endYear: values3 });
  }
  removeEducationRow = e => {
    const values1 = [...this.state.instituteName];
    const values2 = [...this.state.startYear];
    const values3 = [...this.state.endYear];
    values1.splice(e, 1);
    values2.splice(e, 1);
    values3.splice(e, 1);
    if (values1.length == 0) {
      values1.push({
        instituteName: "",
      });
      values2.push({
        startYear: "",
      });
      values3.push({
        endYear: "",
      });
    }
    this.setState({ instituteName: values1 });
    this.setState({ startYear: values2 });
    this.setState({ endYear: values3 });
  }
  render() {
    const { errors } = this.state; return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
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
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <label htmlFor="password2">Confirm Password</label>
                <span className="red-text">{errors.password2}</span>
              </div>
              <div className="input-field col s12">
                <h6 htmlFor="Skills">Skills</h6>
                {this.state.skills.map((inputField, index) => (
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <input
                      onChange={event => this.SkillHandler(event, index)}
                      value={inputField}
                      error={errors.skills}
                      id="skills"
                      type="text"
                      className={classnames("", {
                        invalid: errors.skills
                      })}
                    />
                    <div style={{ width: "25%", marginRight: "20%" }}>
                      <button type="button" onClick={e => this.removeSkillRow(index)}>
                        -
                    </button>
                      <button type="button" onClick={e => this.addSkillRow(index)}>
                        +
                    </button>

                    </div>

                  </div>
                ))}


                <span className="red-text">{errors.skills}</span>
              </div>
              <div className="input-field col s12">
                <h6 htmlFor="education">education(Institue Name, Start Year,End Year)</h6>

                {this.state.instituteName.map((inputField, index) => (
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <input
                      onChange={event => this.educationNameHandler(event, index)}
                      value={inputField}
                      error={errors.instituteName}
                      id="institueName"
                      type="text"
                      className={classnames("", {
                        invalid: errors.instituteName
                      })}
                    />
                    <input
                      onChange={event => this.educationstartYearHandler(event, index)}
                      value={this.state.startYear[index]}
                      error={errors.startYear}
                      id="startYear"
                      type="Number"
                      className={classnames("", {
                        invalid: errors.startYear
                      })}
                    />

                    <input
                      onChange={event => this.educationendYearHandler(event, index)}
                      value={this.state.endYear[index]}
                      error={errors.endYear}
                      id="endYear"
                      type="Number"
                      className={classnames("", {
                        invalid: errors.endYear
                      })}
                    />


                    <div style={{ width: "25%", marginRight: "20%" }}>
                      <button type="button" onClick={e => this.removeEducationRow(index)}>
                        -
                      </button>
                      <button type="button" onClick={e => this.addEducationRow(index)}>
                        +
                      </button>

                    </div>

                  </div>
                ))}


                <span className="red-text">{errors.education}</span>
              </div>

              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h6>Upload Resume</h6>
                <input
                  onChange={this.onChangeResume}

                  error={errors.instituteName}

                  type="file"

                />
              </div>
              <br></br>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h6>Upload Image</h6>
                <input
                  onChange={this.onChangeImage}

                  error={errors.instituteName}

                  type="file"

                />
              </div>
              <br></br>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "20px"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

}
AppRegister.propTypes = {
  registerApp: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerApp }
)(withRouter(AppRegister));