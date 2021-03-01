

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
            application: [],
            sortedapplication: [],
            sortName: true,
            sortDateofApplication: true,
            sortRating: true,
            deadline: "",
            maxApp: "",
            numOfPositions: "",
            app_acc: "",
            email: []
        };
        this.renderIconName = this.renderIconName.bind(this);
        this.renderIconDateofApplication = this.renderIconDateofApplication.bind(this);
        this.renderIconRating = this.renderIconRating.bind(this);
        this.sortChangeName = this.sortChangeName.bind(this);
        this.sortChangeDateofApplication = this.sortChangeDateofApplication.bind(this);
        this.sortChangeRating = this.sortChangeRating.bind(this);
        this.reject = this.reject.bind(this);
        this.download = this.download.bind(this);
    }

    async componentDidMount() {
        const user = this.props.auth.user;
        console.log(user.id);
        const data = {
            jobId: localStorage.getItem("infojobId"),
        }
        var appdata = [];
        var appemail= [];
        var accepted = 0;
        await axios.post('api/application/getjobappnonrejected', data)
            .then(async response => {
                console.log(response);
                appdata.push(response.data)
                console.log(appdata)
                this.setState({ application: response.data, sortedapplication: response.data, searchText: '' });
                for (var n = 0; n < response.data.length; ++n) {
                    const dataApp = {
                        appId: response.data[n].appId
                    }
                    console.log(dataApp)
                    await axios.post('api/applicant/getprofile', dataApp)
                        .then(async response1 => {
                            console.log(response1)
                            appemail.push(response1.data[0].email)
                         })
                    if (response.data[n].status === "Accepted") {
                        accepted++
                    }
                }

            })
            .catch(function (error) {
                console.log(error);
                //  console.log("errorrrr");
            })

        console.log(appemail);




        appdata = this.state.application;
        for (var i = 0; i < appdata.length; ++i) {
            for (var j = 0; j < appdata[i].instituteName.length; ++j) {
                appdata[i].instituteName[j] += ',  ' + " " + " ";
            }
            for (var j = 0; j < appdata[i].skills.length; ++j) {
                appdata[i].skills[j] += ',  ' + " " + " ";
            }
            for (var j = 0; j < appdata[i].startYear.length; ++j) {
                appdata[i].startYear[j] += ',  ' + " " + " ";
            }
            for (var j = 0; j < appdata[i].endYear.length; ++j) {
                appdata[i].endYear[j] += ',  ' + " " + " ";
            }
        }
        for (var i = 0; i < appdata.length; ++i) {
            if (appdata[i].status == "Applied") {
                appdata[i].nextStatus = "Shortlist"
            }
            if (appdata[i].status == "Shortlisted") {
                appdata[i].nextStatus = "Accept"
            }

        }
        console.log(appdata);
        await this.setState({
            application: appdata,
            app_acc: accepted,
            email: appemail
        })
        console.log(this.state.email)
    }

    download(appemail){
        window.open('http://localhost:5000/resume/'+appemail+'.pdf');
    }


    sortChangeName() {
        /**
         *      Note that this is sorting only at front-end.
         */
        var array = this.state.application;
        var flag = this.state.sortName;
        array.sort(function (a, b) {
            if (a.name != undefined && b.name != undefined) {
                var str1 = a.name;
                var str2 = b.name;
                var n = str1.localeCompare(str2);
                return (1 - flag * 2) * n;
            }
            else {
                return 1;
            }
        });
        this.setState({
            application: array,
            sortName: !this.state.sortName,
        })
    }
    sortChangeDateofApplication() {
        /**
         *      Note that this is sorting only at front-end.
         */
        var array = this.state.application;
        var flag = this.state.sortDateofApplication;
        array.sort(function (a, b) {
            if (a.dateOfApplication != undefined && b.dateOfApplication != undefined) {
                return (1 - flag * 2) * (new Date(a.dateOfApplication) - new Date(b.dateOfApplication));
            }
            else {
                return 1;
            }
        });
        this.setState({
            application: array,
            sortDateofApplication: !this.state.sortDateofApplication,
        })
    }
    async oneup(id, status, appId, index) {
        if (status === "Applied") {
            const data = {
                applicationId: id,
                status: "Shortlisted",
                joinDate: '0000-01-01T00:00:00.173Z'
            }
            await axios.post("/api/application/updateapplication", data)
                .then(response => {
                    console.log("shortlised")
                    this.componentDidMount()
                })
        } else if (status === "Shortlisted") {

            const data = {
                applicationId: id,
                status: "Accepted",
                joinDate: Date.now()

            }
            await axios.post("/api/application/updateapplication", data)
                .then(async response => {
                    console.log("Accepted")
                    const info = {
                        appName: this.state.application[index].name,
                        jobName: this.state.application[index].jobName,
                        recName: this.props.auth.user.name,
                        appemail: this.state.application[index].appemail

                    }
                    console.log(info)
                    console.log(index)
                    axios.post("/api/applicant/sendmail",info)

                })
            console.log(appId)
            const data1 = {
                appId: appId

            }
            await axios.post("/api/application/getappapp", data1)
                .then(async response => {
                    console.log(response)
                    for (var i = 0; i < response.data.length; ++i) {
                        if (response.data[i].status !== "Accepted") {
                            const data2 = {
                                applicationId: response.data[i]._id,
                                status: "Rejected",
                                joinDate: '0000-01-01T00:00:00.173Z'

                            }
                            await axios.post("/api/application/updateapplication", data2)
                                .then(response => {
                                    console.log("rest all rejected")

                                })

                        }
                    }

                })
            const data3 = {
                jobId: localStorage.getItem("infojobId"),
            }
            await axios.post('api/applicant/getjob', data3)
                .then(async response => {
                    if (this.state.app_acc + 1 >= response.data[0].numOfPositions) {
                        await axios.post('api/application/getjobappnonrejected', data3)
                            .then(response1 => {
                                for (var n = 0; n < response1.data.length; ++n) {
                                    if (response1.data[n].status !== "Accepted")
                                        this.reject(response1.data[n]._id, response1.data[n].status)

                                }
                            })
                    }

                })
            this.componentDidMount()

        } else if (status === "Rejected") {
            alert("Applicant is Rejected")
        } else if (status === "Accepted") {
            alert("Applicant is Accepted")

        }

    }

    async reject(id, status) {
        if (status !== "Accepted") {
            if (status === "Rejected") {
                alert("Applicant is Already Rejected")

            } else {
                const data = {
                    applicationId: id,
                    status: "Rejected"
                }
                await axios.post("/api/application/updateapplication", data)
                    .then(response => {
                        console.log("Rejected")
                        this.componentDidMount()
                    })
            }
        } else {
            alert("Applicant is Already Accepted")
        }

    }
    sortChangeRating() {
        /**
         *      Note that this is sorting only at front-end.
         */
        var array = this.state.application;
        var flag = this.state.sortRating;
        array.sort(function (a, b) {
            if (a.rating != undefined && b.rating != undefined) {
                return (1 - flag * 2) * (a.rating - b.rating);
            }
            else {
                return 1;
            }
        });
        this.setState({
            application: array,
            sortRating: !this.state.sortRating,
        })
    }

    renderIconName() {
        if (this.state.sortName) {
            return (
                <ArrowDownwardIcon />
            )
        }
        else {
            return (
                <ArrowUpwardIcon />
            )
        }
    }
    renderIconDateofApplication() {
        if (this.state.sortDateofApplication) {
            return (
                <ArrowDownwardIcon />
            )
        }
        else {
            return (
                <ArrowUpwardIcon />
            )
        }
    }
    renderIconRating() {
        if (this.state.sortRating) {
            return (
                <ArrowDownwardIcon />
            )
        }
        else {
            return (
                <ArrowUpwardIcon />
            )
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };





    render() {
        return (
            <div >

                <Grid container className="white">


                    <Grid item xs={12} md={9} lg={12}>
                        <Paper>
                            <Table size="medium">
                                <TableHead>
                                    <TableRow>
                                        <TableCell> Sr No.</TableCell>
                                        <TableCell><Button onClick={this.sortChangeName}>{this.renderIconName()}</Button>Name</TableCell>
                                        <TableCell>Skills</TableCell>

                                        <TableCell><Button onClick={this.sortChangeDateofApplication}>{this.renderIconDateofApplication()}</Button>Date of Application</TableCell>
                                        <TableCell>Institutes</TableCell>
                                        <TableCell>Start</TableCell>
                                        <TableCell>End</TableCell>
                                        <TableCell>SOP</TableCell>
                                        <TableCell><Button onClick={this.sortChangeRating}>{this.renderIconRating()}</Button>Rating</TableCell>
                                        {/* <TableCell>Type</TableCell> */}
                                        {/* <TableCell></TableCell> */}
                                        {/* <TableCell></TableCell> */}
                                        {/* <TableCell></TableCell> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        this.state.application.map((application, ind) => (
                                            <TableRow key={ind}>
                                                <TableCell>{ind}</TableCell>
                                                <TableCell>{application.name}</TableCell>
                                                <TableCell>{application.skills}</TableCell>

                                                <TableCell>{application.dateOfApplication.split("T")[0]} {application.dateOfApplication.split("T")[1].split(".")[0]}</TableCell>
                                                <TableCell>{application.instituteName}</TableCell>
                                                <TableCell>{application.startYear}</TableCell>
                                                <TableCell>{application.endYear}</TableCell>
                                                <TableCell>{application.sop}</TableCell>
                                                <TableCell>{Number(application.rating).toFixed(2)}</TableCell>

                                                <TableCell><Link
                                                    
                                                    to="/dashboard"
                                                    style={{
                                                        width: "120px",
                                                        borderRadius: "1.5px",
                                                        letterSpacing: ".75px"
                                                    }}
                                                    className="btn "
                                                >

                                                    {application.status}
                                                </Link></TableCell>
                                                <TableCell><button
                                                    onClick={() => this.reject(application._id, application.status)}
                                                    style={{
                                                        width: "120px",
                                                        borderRadius: "1.5px",
                                                        letterSpacing: ".75px"
                                                    }}
                                                    className="red btn"
                                                // className="btn blue"
                                                >

                                                    reject
                                                </button></TableCell>
                                                <TableCell><button
                                                    onClick={() => this.oneup(application._id, application.status, application.appId, ind)}
                                                    style={{
                                                        width: "120px",
                                                        borderRadius: "1.5px",
                                                        letterSpacing: ".75px"
                                                    }}
                                                    className="green btn"
                                                // className="btn blue"
                                                >

                                                    {application.nextStatus}
                                                </button></TableCell>
                                                <TableCell><button
                                                    onClick={() => this.download(application.appemail)}
                                                    style={{
                                                        width: "120px",
                                                        borderRadius: "1.5px",
                                                        letterSpacing: ".75px"
                                                    }}
                                                    className="green btn"
                                                // className="btn blue"
                                                >

                                                   resume
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
