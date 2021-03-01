

import React, { Component } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";
import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { Link } from "react-router-dom";

class JobsList extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            sortedjobs: [],
            sortName: true,
            deadline: "",
            maxApp: "",
            numOfPositions: ""
        };

    }

    async componentDidMount() {
        const user = this.props.auth.user;
        console.log(user.id);
        const data = {
            recId: user.id,
        }
        var curr_app = []
        var acc_app = []
        await axios.post('api/recruiter/getjobs', data)
            .then(async response => {
                console.log(response);
                this.setState({ jobs: response.data, sortedjobs: response.data, searchText: '' });
                for (var i = 0; i < this.state.jobs.length; ++i) {
                    const data1 = {

                        jobId: this.state.jobs[i]._id
                    }
                    await axios.post('api/application/getjobapp', data1)
                        .then(response => {
                            console.log(response)
                            curr_app.push(response.data.length)
                            var accepted_app = 0;
                            for (var j = 0; j < response.data.length; ++j) {
                                if (response.data[j].status === "Accepted") {
                                    accepted_app++;
                                }
                            }
                            acc_app.push(accepted_app)
                        })
                }
            })
            .catch(function (error) {
                console.log(error);
                //  console.log("errorrrr");
            })

        var jobdata = this.state.jobs
        for (var i = 0; i < jobdata.length; ++i) {
            jobdata[i].numberOfApp = curr_app[i];
            jobdata[i].noOfAccepted = acc_app[i];
        }
        console.log(jobdata)
        var activejobdata = []
        for (var i = 0; i < jobdata.length; ++i) {
            if (jobdata[i].numOfPositions > jobdata[i].noOfAccepted) {
                activejobdata.push(jobdata[i])
            }
        }
        console.log(activejobdata)

        await this.setState({
            jobs: activejobdata
        })
    }

    delete(id) {
        const data = {
            jobId: id,
        }
        axios.post('/api/recruiter/deletejob', data)
            .then(response => {
                console.log(response)
                alert("Job Deleted")
            });
        axios.post('/api/recruiter/deleteapplication', data)
            .then(response => {
                console.log(response)
                this.componentDidMount()
            });

    }
    async edit(id) {
        if (this.state.deadline.length > 0 && this.state.maxApp.length > 0 && this.state.numOfPositions.length > 0) {
            if (this.state.maxApp < this.state.numOfPositions ||this.state.maxApp<0 ||this.state.numOfPositions<0 ) {
                alert("Invaild input")
                this.componentDidMount()
            } else {
               

                const data = {
                    jobId: id,
                    maxApp: this.state.maxApp,
                    numOfPositions: this.state.numOfPositions,
                    deadline: this.state.deadline

                }
                await axios.post('api/recruiter/editjob', data)
                    .then(response => {
                        console.log(response)
                        this.componentDidMount()
                        // this.setState({
                        //     maxApp: response.data[0].maxApp,
                        //     numOfPositions: response.data[0].numOfPositions,
                        //     deadline: response.data[0].deadline
                        // })
                    })
            }
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    info(id) {
        localStorage.setItem("infojobId", id);
        window.location = "/recjobinfo"
    }



    render() {
        return (
            <div >

                <Grid container className="white">
                    <input
                        //   onChange={this.onChange}
                        value={this.state.maxApp}
                        //   error={errors.maxApp}
                        id="maxApp"
                        onChange={this.onChange}
                        type="Number"
                    //   className={classnames("", {
                    //     invalid: errors.maxApp
                    //   })}
                    /> <input
                        // onChange={this.onChange}

                        value={this.state.numOfPositions}
                        // error={errors.numOfPositions}
                        id="numOfPositions"
                        onChange={this.onChange}
                        type="Number"
                    // className={classnames("", {
                    //   invalid: errors.numOfPositions
                    // })}
                    /> <TextField
                        id="deadline"

                        type="datetime-local"
                        onChange={this.onChange}
                        value={this.state.deadline}
                    //   onChange={this.onChange}


                    />

                    <Grid item xs={12} md={9} lg={12}>
                        <Paper>
                            <Table size="medium">
                                <TableHead>
                                    <TableRow>
                                        <TableCell> Sr No.</TableCell>
                                        <TableCell> Job Name</TableCell>
                                        <TableCell>Skills</TableCell>
                                        <TableCell>No. of Applications</TableCell>
                                        <TableCell> Creation Date(GTM)</TableCell>
                                        <TableCell> Deadline(GTM)</TableCell>
                                        <TableCell>Maximum Applications</TableCell>
                                        <TableCell>No. of Positions</TableCell>
                                        <TableCell>No. of Positions Remaining</TableCell>
                                        <TableCell>Salary</TableCell>
                                        <TableCell>Duration</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        this.state.jobs.map((job, ind) => (
                                            <TableRow key={ind}>
                                                <TableCell>{ind}</TableCell>
                                                <TableCell>{job.jobName}</TableCell>
                                                <TableCell>{job.skillReq}</TableCell>
                                                <TableCell>{job.numberOfApp}</TableCell>
                                                <TableCell>{job.joinDate.split("T")[0]}</TableCell>
                                                <TableCell>{job.deadline.split("T")[0]} {job.deadline.split("T")[1].split(".")[0]}</TableCell>
                                                <TableCell>{job.maxApp}</TableCell>
                                                <TableCell>{job.numOfPositions}</TableCell>
                                                <TableCell>{job.numOfPositions - job.noOfAccepted}</TableCell>
                                                <TableCell>{job.salary.toFixed(2)}</TableCell>
                                                <TableCell>{job.duration}</TableCell>
                                                <TableCell>{job.type}</TableCell>
                                                <TableCell><Link
                                                    onClick={() => this.info(job._id)}
                                                    to="/dashboard"
                                                    style={{
                                                        width: "80px",
                                                        borderRadius: "1.5px",
                                                        letterSpacing: ".75px"
                                                    }}
                                                    className="btn blue "
                                                >

                                                    info
              </Link></TableCell>
                                                <TableCell><button
                                                    onClick={() => this.delete(job._id)}
                                                    style={{
                                                        width: "80px",
                                                        borderRadius: "1.5px",
                                                        letterSpacing: ".75px"
                                                    }}
                                                    className="red btn"
                                                // className="btn blue"
                                                >

                                                    delete
                                                </button></TableCell>
                                                <TableCell><button
                                                    onClick={() => this.edit(job._id)}
                                                    style={{
                                                        width: "80px",
                                                        borderRadius: "1.5px",
                                                        letterSpacing: ".75px"
                                                    }}
                                                    className="green btn"
                                                // className="btn blue"
                                                >

                                                    edit
                                                </button></TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

JobsList.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(JobsList);
