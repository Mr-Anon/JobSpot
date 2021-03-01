

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
            sortjobName: true,
            sortjoinDate: true,
            sortRating: true,
            deadline: "",
            maxApp: "",
            numOfPositions: ""
        };
        this.renderIconName = this.renderIconName.bind(this);
        this.renderIconjobName = this.renderIconjobName.bind(this);
        this.renderIconjoinDate = this.renderIconjoinDate.bind(this);
        this.renderIconRating = this.renderIconRating.bind(this);
        this.sortChangeName = this.sortChangeName.bind(this);
        this.sortChangejobName = this.sortChangejobName.bind(this);
        this.sortChangejoinDate = this.sortChangejoinDate.bind(this);
        this.sortChangeRating = this.sortChangeRating.bind(this);
    }

    async componentDidMount() {
        const user = this.props.auth.user;
        console.log(user.id);
        const data = {
            recId: user.id,
        }
        var appdata = [];
        await axios.post('api/application/getrecappaccepted', data)
            .then(response => {
                console.log(response);
                appdata.push(response.data)
                console.log(appdata)
                this.setState({ application: response.data, sortedapplication: response.data, searchText: '' });
                // for(var i = 0; i<response.data.length; ++i){
                // const data1 ={
                //         appId: response.data[i].appId
                //     }
                //     axios.post('api/applicant/getprofile', data1)
                //         .then( response1=>{ 
                //             appdata[0][i].name = response1.data[0].name;
                //             appdata[0][i].skills = response1.data[0].skills;
                //             appdata[0][i].education = response1.data[0].education;
                //         })
                //     }
            })
            .catch(function (error) {
                console.log(error);
                //  console.log("errorrrr");
            })
        appdata = this.state.application;

        console.log(appdata);
        await this.setState({
            application: appdata
        })
    }

    async rate(appId, id, index) {
        console.log("Ok");
        console.log(id);
        var rate, jobrating;
        if (!this.state.application[index].recRate) {

            var rate = prompt('Enter a rating (0-5)');

            if (isNaN(rate) == true || rate < 0 || rate > 5 || rate === null) {
                alert('Invalid rating');
            }

            else {
                if (rate !== null) {
                    if (rate.length > 0) {
                        const data = {
                            appId: appId,
                        }
                        await axios.post('/api/applicant/getprofile', data)
                            .then(response => {
                                // console.log("Asd")
                                // console.log(response.data[0]);
                                // console.log("Asd")
                                // console.log(rat)
                                jobrating = response.data[0];


                                jobrating.totalRating = Number(jobrating.totalRating) + Number(rate);
                                jobrating.noOfRating = Number(jobrating.noOfRating) + Number(1);
                                console.log(jobrating.noOfRating)
                                jobrating.rating = Number(jobrating.totalRating) / Number(jobrating.noOfRating);
                                console.log(jobrating)
                            })
                        const data1 = {
                            appId: appId,
                            rating: jobrating.rating,
                            noOfRating: jobrating.noOfRating,
                            totalRating: jobrating.totalRating
                        }

                        await axios.post('/api/applicant/updateapprating', data1)
                            .then(res => (console.log(res.data)));

                        const data2 = {
                            applicationId: id,
                            rating: jobrating.rating,

                        }

                        await axios.post('/api/application/updateapplicationrating', data2)
                            .then(res => (console.log(res.data)));

                        const data3 = {
                            applicationId: this.state.application[index]._id,
                            recRate: true
                        }

                        await axios.post('/api/application/updateapplicationrecratestatus', data3)
                            .then(res => (console.log(res.data)));


                        this.componentDidMount();
                    } else {
                        alert('Invalid rating');
                    }
                } else {
                    alert('Invalid rating');
                }
            }

        }
        else {
            alert("You have already Rated the employee")
        }
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
    sortChangejobName() {
        /**
         *      Note that this is sorting only at front-end.
         */
        var array = this.state.application;
        var flag = this.state.sortjobName;
        array.sort(function (a, b) {
            if (a.jobName != undefined && b.jobName != undefined) {
                var str1 = a.jobName;
                var str2 = b.jobName;
                var n = str1.localeCompare(str2);
                return (1 - flag * 2) * n;
            }
            else {
                return 1;
            }
        });
        this.setState({
            application: array,
            sortjobName: !this.state.sortjobName,
        })
    }
    sortChangejoinDate() {
        /**
         *      Note that this is sorting only at front-end.
         */
        var array = this.state.application;
        var flag = this.state.sortjoinDate;
        array.sort(function (a, b) {
            if (a.joinDate != undefined && b.joinDate != undefined) {
                return (1 - flag * 2) * (new Date(a.joinDate) - new Date(b.joinDate));
            }
            else {
                return 1;
            }
        });
        this.setState({
            application: array,
            sortjoinDate: !this.state.sortjoinDate,
        })
    }



    sortChangeRating() {
        /**
         *      Note that this is sorting only at front-end.
         */
        var array = this.state.application;
        var flag = this.state.sortRating;
        array.sort(function (a, b) {
            if (a.rating != undefined && b.rating != undefined) {
                return (1 - flag * 2) * (new Date(a.rating) - new Date(b.rating));
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



    renderIconjobName() {
        if (this.state.sortjobName) {
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

    renderIconjoinDate() {
        if (this.state.sortjoinDate) {
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

    info(id) {

    }



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

                                        <TableCell><Button onClick={this.sortChangejoinDate}>{this.renderIconjoinDate()}</Button>Date of Joining</TableCell>
                                        <TableCell><Button onClick={this.sortChangejobName}>{this.renderIconjobName()}</Button>Job Name</TableCell>
                                        <TableCell>Type</TableCell>

                                        <TableCell><Button onClick={this.sortChangeRating}>{this.renderIconRating()}</Button>Rating</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        this.state.application.map((application, ind) => (
                                            <TableRow key={ind}>
                                                <TableCell>{ind}</TableCell>
                                                <TableCell>{application.name}</TableCell>
                                                <TableCell>{application.joinDate.split("T")[0]} {application.joinDate.split("T")[1].split(".")[0]}</TableCell>



                                                <TableCell>{application.jobName}</TableCell>
                                                <TableCell>{application.type}</TableCell>
                                                <TableCell>{Number(application.rating).toFixed(2)}</TableCell>

                                                <TableCell><button
                                                    onClick={() => this.rate(application.appId, application._id, ind)}
                                                    style={{
                                                        width: "120px",
                                                        borderRadius: "1.5px",
                                                        letterSpacing: ".75px"
                                                    }}
                                                    className="blue btn"
                                                // className="btn blue"
                                                >

                                                    rate
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
