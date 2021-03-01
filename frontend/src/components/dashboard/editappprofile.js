import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { upAppPro } from "../../actions/authActions";
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
            skills: [],
            appId: "",
            instituteName: [""],
            startYear: [""],
            endYear: [""],
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
                    skills: response.data[0].skills,
                    instituteName: response.data[0].instituteName,
                    startYear: response.data[0].startYear,
                    endYear: response.data[0].endYear


                })
            })
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/editappprofile");
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
        const { user } = this.props.auth
        e.preventDefault();
        const updatedUser = {
            name: this.state.name,
            skills: this.state.skills,
            appId: user.id,
            instituteName: this.state.instituteName,
            startYear: this.state.startYear,
            endYear: this.state.endYear

        };
        console.log(updatedUser)
        this.props.upAppPro(updatedUser, this.props.history);
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
                                <h6 htmlFor="education">education</h6>

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
    upAppPro: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { upAppPro }
)(withRouter(EditRecruiterProfile));