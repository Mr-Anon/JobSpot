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
import Fuse from 'fuse.js';





class JobsList extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    constructor(props) {
        super(props);
        this.state = {
            application: [],
            jobName: [],
            recName: [],
            salary: [],
            rating: [],
            joinDate: [],
            showPopup: false,
            ogapplication: [],
            sortSalary: true,
            sortDuration: true,
            sortDeadline: true,
            filterDuration: true,
            types: [],
            type: '',
            status: [],

        };



    }

    async componentDidMount() {
        var temp1 = []
        var temp2 = []
        var temp3 = []
        var temp4 = []
        var temp5 = []
        const user = this.props.auth.user;

        const data = {
            appId: user.id,
        }
        await axios.post('api/application/getone', data)
            .then(async response => {
                this.setState({ application: response.data, ogapplication: response.data, searchText: '' });
                console.log(this.state.application)
                for (var i = 0; i < response.data.length; ++i) {
                    const data1 = {
                        jobId: response.data[i].jobId,
                    }
                    await axios.post('api/applicant/getjobwithid', data1)
                        .then(response1 => {
                            console.log(response1)
                            temp1.push(response1.data[0].jobName)
                            temp2.push(response1.data[0].recName)
                            temp3.push(response1.data[0].salary)
                            temp4.push(response1.data[0].rating)
                            temp5.push(response1.data[0].joinDate)
                            this.setState({


                                jobName: temp1,
                                recName: temp2,
                                salary: temp3,
                                rating: temp4,
                                joinDate: temp5


                            })
                        })

                }

            })
            .catch(function (error) {
                console.log(error);
                //  console.log("errorrrr");
            })





        // console.log("lalalala")

        // console.log(this.state.application)


    }


    async rate(id, status,index) {
        console.log("Ok");
        console.log(id);
        var rate, jobrating;

        if (status === 'Accepted' && !this.state.application[index].appRate) {
            var rate = prompt('Enter a rating (0-5)');

            if (isNaN(rate) == true || rate < 0 || rate > 5) {
                alert('Invalid rating');
            }

            else {
                if (rate !== null) {
                    if (rate.length > 0) {
                        const data = {
                            jobId: id,
                        }
                        await axios.post('/api/applicant/getjobwithid', data)
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
                            jobId: id,
                            rating: jobrating.rating,
                            noOfRating: jobrating.noOfRating,
                            totalRating: jobrating.totalRating
                        }

                        await axios.post('/api/applicant/updatejobrating', data1)
                            .then(res => (console.log(res.data)));

                            console.log(this.state.application[index]._id)

                            const data2 = {
                                applicationId: this.state.application[index]._id,
                                appRate: true
                            }

                        await axios.post('/api/application/updateapplicationappratestatus', data2)
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

        else
            alert("You can't rate this job!");


    };







    render() {

        return (
            <div className="col s12 center-align"  >

                <Grid item xs={12} md={9} lg={12} >
                    <Paper >
                        <Table size="medium" >
                            <TableHead>
                                <TableRow>
                                    <TableCell> Sr No.</TableCell>
                                    <TableCell> Job Name</TableCell>
                                    <TableCell> Recuriter Name</TableCell>


                                    <TableCell>Salary</TableCell>
                                    <TableCell>Date of Joining</TableCell>


                                    <TableCell>Rating</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Rate</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.application.map((job, ind) => (

                                        <TableRow key={ind}>
                                            <TableCell>{ind}</TableCell>
                                            <TableCell>{this.state.jobName[ind]}</TableCell>
                                            <TableCell>{this.state.recName[ind]}</TableCell>




                                            <TableCell>{this.state.salary[ind]}</TableCell>
                                            <TableCell>{String(job.joinDate).split("T")[0]}</TableCell>
                                            <TableCell>{Number(this.state.rating[ind]).toFixed(2)}</TableCell>


                                            <TableCell>
                                                <button
                                                    // onClick={() => this.rate(job._id, job.status)}
                                                    style={{
                                                        width: "120px",
                                                        borderRadius: "1.5px",
                                                        letterSpacing: ".75px"
                                                    }}
                                                    className="btn"
                                                // className="btn blue"
                                                >

                                                    {job.status}
                                                </button>
                                                {/* {this.state.showPopup ?
                                                        <Popup
                                                            text='Click "Close Button" to hide popup'
                                                            // closePopup={this.togglePopup.bind(this)}
                                                        />
                                                        : null
                                                    } */}
                                            </TableCell>
                                            <TableCell>
                                                <button
                                                    onClick={() => this.rate(job.jobId, job.status,ind)}
                                                    style={{
                                                        width: "120px",
                                                        borderRadius: "1.5px",
                                                        letterSpacing: ".75px"
                                                    }}

                                                    className="btn blue"
                                                >

                                                    rate
                                                    </button>
                                                {/* {this.state.showPopup ?
                                                        <Popup
                                                            text='Click "Close Button" to hide popup'
                                                            // closePopup={this.togglePopup.bind(this)}
                                                        />
                                                        : null
                                                    } */}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </Paper>
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
