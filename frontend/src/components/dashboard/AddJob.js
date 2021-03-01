import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addJob } from "../../actions/authActions";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import DateTimePicker from 'react-datetime-picker';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import 'date-fns';



import classnames from "classnames";

//const {user} = this.prop.auth;

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3),
  },
}));

// const classes = useStyles();

class Register extends Component {

  constructor() {
    super();
    this.state = {
      jobName: "",
      skillReq: "",
      recId: "",
      recName: "",
      type: "",
      salary: "",
      duration: "",
      deadline: "",
      numOfPositions: "",
      maxApp: "",
      rating: "0",
      errors: {}
    };
  }
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/addjob");
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

  onClickradio = e => {
    this.setState({ type: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { user } = this.props.auth;
    const newJob = {
      jobName: this.state.jobName,
      skillReq: this.state.skillReq,
      recId: user.id,
      recName: user.name,
      appliApp: this.state.appliApp,
      salary: this.state.salary,
      type: this.state.type,
      duration: this.state.duration,
      deadline: this.state.deadline,
      numOfPositions: this.state.numOfPositions,
      maxApp: this.state.maxApp,
      rating: '0',
      noOfRating: '0',
      totalRating: '0',
      status: '',
      color: '',
      numberOfApp: ''

    };
    console.log(newJob);
    this.props.addJob(newJob, this.props.history);
  };
  render() {

    const { errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/dashboard" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Add Job</b> below
              </h4>
            </div>
            <div>

            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="jobName"
                  type="text"
                  className={classnames("", {
                    invalid: errors.jobName
                  })}
                />
                <label htmlFor="jobName">Name</label>
                <span className="red-text">{errors.jobName}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="skillReq"
                  type="text"
                  className={classnames("", {
                    invalid: errors.skillReq
                  })}
                />
                <label htmlFor="skillReq">skillReq</label>
                <span className="red-text">{errors.skillReq}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.salary}
                  error={errors.salary}
                  id="salary"
                  type="text"
                  className={classnames("", {
                    invalid: errors.salary
                  })}
                />
                <label htmlFor="salary">salary</label>
                <span className="red-text">{errors.salary}</span>
              </div>
              <div className="input-field col s12">
                <RadioGroup aria-label="Type" id="type" onClick={this.onClickradio}
                  value={this.state.type}
                  error={errors.type}>
                  <FormControlLabel id="type" value="WorkFromHome" control={<Radio />} label="WorkFromHome" />
                  <FormControlLabel id="type" value="Part-Time" control={<Radio />} label="Part-Time" />
                  <FormControlLabel id="type" value="Full-Time" control={<Radio />} label="Full-Time" />
                </RadioGroup>
                <span className="red-text">{errors.type}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.duration}
                  error={errors.duration}
                  id="duration"
                  type="text"
                  className={classnames("", {
                    invalid: errors.duration
                  })}
                />
                <label htmlFor="duration">Duration</label>
                <span className="red-text">{errors.duration}</span>
              </div>
              <div className="col s12">
                <TextField
                  id="deadline"
                  label="Deadline"
                  type="datetime-local"
                  active
                  value={this.state.deadline}
                  onChange={this.onChange}


                />
                {/* <DateTimePicker
                  id="deadline"
                  label="Deadline"
                  type="date"

                  value={this.state.deadline}
                  onChange={this.onChange}
                /> */}
                <span className="red-text">{errors.deadline}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.numOfPositions}
                  error={errors.numOfPositions}
                  id="numOfPositions"
                  type="Number"
                  className={classnames("", {
                    invalid: errors.numOfPositions
                  })}
                />
                <label htmlFor="numOfPositions">Number of Position</label>
                <span className="red-text">{errors.deadline}</span>
                <span className="red-text">{errors.numOfPositions}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.maxApp}
                  error={errors.maxApp}
                  id="maxApp"
                  type="Number"
                  className={classnames("", {
                    invalid: errors.maxApp
                  })}
                />
                <label htmlFor="maxApp">Number of Applications</label>
                <span className="red-text">{errors.maxApp}</span>
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
                  Add Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

} Register.propTypes = {
  addJob: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { addJob }
)(withRouter(Register));