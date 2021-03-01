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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Fuse from 'fuse.js';





class JobsList extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    constructor(props) {
        super(props);
        this.customFunction = this.customFunction.bind(this);
        this.onChangetype = this.onChangetype.bind(this);
        this.onChangeduration = this.onChangeduration.bind(this);
        this.onChangesalarymin = this.onChangesalarymin.bind(this);
        this.onChangesalarymax = this.onChangesalarymax.bind(this);
        this.sortChangeDeadline = this.sortChangeDeadline.bind(this);
        this.renderIconDeadline = this.renderIconDeadline.bind(this);
        this.sortChangeRating = this.sortChangeRating.bind(this);
        this.renderIconRating = this.renderIconRating.bind(this);
        this.sortChangeSalary = this.sortChangeSalary.bind(this);
        this.renderIconSalary = this.renderIconSalary.bind(this);
        this.sortChangeDuration = this.sortChangeDuration.bind(this);
        this.renderIconDuration = this.renderIconDuration.bind(this);
        this.state = {
            jobs: [],
            filterDuration: true,
            ogjobs: [],
            sortSalary: true,
            types: [],
            sortDuration: true,
            sortRating: true,
            status: [],
            maxsalary: 9999999,
            sortDeadline: true,
            minsalary: 0,
            durations: [],
            type: '',
            className: [],
            duration: '',
            search: "",
        };
    }

    async componentDidMount() {
        var status1 = [], color = [];
        await axios.post('api/applicant/getjobs')
            .then(response => {
                console.log(response);
                this.setState({ jobs: response.data, ogjobs: response.data, searchText: '' });
            })
            .catch(function (error) {
                console.log(error);
                //  console.log("errorrrr");
            })


        // status=this.state.job
        for (var i = 0; i < this.state.jobs.length; ++i) {
            const user = this.props.auth.user;
            console.log(user.id);
            const data = {
                appId: user.id,
                jobId: this.state.jobs[i]._id
            }
            var curr_sel = 0
            var curr_app = 0
            await axios.post('api/application/getjobapp', data)
                .then(response => {
                    console.log(response);
                    for (var j = 0; j < response.data.length; j++) {
                        if (response.data[j].status === "Accepted") {
                            curr_sel++
                        }
                    }
                    curr_app = response.data.length
                    console.log(curr_app + " " + curr_sel)

                })
            await axios.post('api/application/getapp', data)
                .then(response => {
                    console.log(response);
                    if (response.data.length === 0) {
                        status1.push("Apply");
                        color.push("btn blue");
                    }
                    else {
                        // console.log(i)
                        status1.push(response.data[0].status)
                        color.push("btn green");
                    }
                    if (status1[i] === "Apply" && (this.state.jobs[i].maxApp <= curr_app || this.state.jobs[i].numOfPositions <= curr_sel)) {
                        status1[i] = "Full";
                        color[i] = "btn red";
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    //  console.log("errorrrr");
                })


        }

        var temp = this.state.jobs

        for (var i = 0; i < this.state.jobs.length; ++i) {
            temp[i].status = status1[i]
            temp[i].color = color[i]
        }



        await this.setState({
            status: status1,
            types: ['All', 'Full-Time', 'Part-Time', 'WorkFromHome'],
            type: 'All',
            durations: ['1', '2', '3', '4', '5', '6', '7'],
            duration: '7',
            minsalary: 0,
            maxsalary: 99999999,
            search: "",
            ogjobs: temp,
            jobs: temp,
            className: color
        })
        console.log("lalalala")

        console.log(this.state.jobs)


    }

    async onChangeduration(e) {
        await this.setState({
            duration: e.target.value
        });
        console.log(this.state.duration);

        var filteredJobs = [];
        var i;
        for (i = 0; i < this.state.ogjobs.length; ++i) {
            if (this.state.ogjobs[i].duration < this.state.duration && this.state.ogjobs[i].duration != 0 && (this.state.ogjobs[i].type === this.state.type || this.state.type === "All") && (this.state.minsalary < Number(this.state.ogjobs[i].salary) && Number(this.state.ogjobs[i].salary) < this.state.maxsalary)) {
                filteredJobs.push(this.state.ogjobs[i]);
            }
        }


        var array = filteredJobs;

        this.setState({
            jobs: array,
            search: '',

        })
    };
    async apply(id, curStat, index) {
        if (curStat === "Apply") {
            var noofapplications = 0;
            var isAccepted = false;
            console.log(id);
            const user = this.props.auth.user;
            console.log(user.id);
            const data = {
                appId: user.id,

            }
            await axios.post('api/application/getone', data)
                .then(response => {
                    console.log(response);
                    for (var i = 0; i < response.data.length; ++i) {
                        if (response.data[i].status === "Applied") {
                            noofapplications++
                        }
                        if (response.data[i].status === "Accepted") {
                            isAccepted = true;
                        }


                    }
                })
                .catch(function (error) {
                    console.log(error);
                    //  console.log("errorrrr");
                })
            console.log(noofapplications)
            if (noofapplications < 2 && !isAccepted) {
                var sop = prompt("S.O.P (max 250)");
                console.log(sop);
                if (sop !== null) {
                    if (sop.length > 0) {
                        if (sop.split(" ").length > 250) {
                            alert("SOP must not be more than 250 words");
                        } else {
                            const data = {
                                jobId: id,

                            }
                            var recId;
                            await axios.post('api/applicant/getjobwithid', data)
                                .then(response => {
                                    recId = response.data[0].recId
                                    console.log(response.data[0].recId);
                                })
                            const user = this.props.auth.user;
                            const Appdata = {
                                jobId: id,
                                recId: recId,
                                appId: user.id,
                                sop: sop,
                                status: "Applied",
                                dateOfApplication: Date.now(),
                                name: user.name,
                                skills: user.skills,
                                joinDate: "0000-01-01T00:00:00.173Z",
                                instituteName: user.instituteName,
                                startYear: user.startYear,
                                endYear: user.endYear,
                                rating: '',
                                nextStatus: '',
                                jobName: this.state.jobs[index].jobName,
                                type: this.state.jobs[index].type,
                                appemail: user.email

                            }
                            console.log("zuzuzu")
                            console.log(Appdata)
                            await axios.post('api/application/add', Appdata)
                                .then(response => {
                                    alert("Appiled Successfully");
                                    this.componentDidMount()
                                })

                        }
                    } else {
                        alert("SOP must not be empty");
                    }
                } else {
                    alert("SOP must not be empty");
                }
            } else if (isAccepted) {
                alert("You are already Accepted in a job!!")
            }
            else {
                alert("10 open Applications exists")
            }

        }
    };

    async onChangetype(e) {
        await this.setState({
            type: e.target.value
        });
        console.log(this.state.type);
        var filteredJobs = [];
        var i;
        for (i = 0; i < this.state.ogjobs.length; ++i) {
            if ((this.state.ogjobs[i].type === this.state.type || this.state.type === 'All') && (this.state.ogjobs[i].duration < this.state.duration) && (this.state.minsalary < Number(this.state.ogjobs[i].salary) && Number(this.state.ogjobs[i].salary) < this.state.maxsalary)) {
                filteredJobs.push(this.state.ogjobs[i]);
            }

        }
        var array = filteredJobs;

        this.setState({
            jobs: array,
            search: '',

        })
    };

    async onChangesalarymin(e) {
        await this.setState({
            minsalary: e.target.value
        });
        console.log(this.state.minsalary);
        var filteredJobs = [];
        var i;
        for (i = 0; i < this.state.ogjobs.length; ++i) {
            if (isNaN(this.state.minsalary) == true) console.log("error");
            if ((this.state.ogjobs[i].type === this.state.type || this.state.type === 'All') && (this.state.ogjobs[i].duration < this.state.duration) && (this.state.minsalary < Number(this.state.ogjobs[i].salary) && Number(this.state.ogjobs[i].salary) < this.state.maxsalary)) {
                filteredJobs.push(this.state.ogjobs[i]);
            }

        }
        var array = filteredJobs;

        this.setState({
            jobs: array,
            search: '',

        })
    };
    async onChangesalarymax(e) {
        
        await this.setState({
            maxsalary: e.target.value
        });
        console.log(this.state.maxsalary);
        console.log(Number(this.state.ogjobs[0].salary))
        var filteredJobs = [];
        var i;
        for (i = 0; i < this.state.ogjobs.length; ++i) {
            // if (isNaN(this.state.minsalary)==true) console.log("error");
            if ((this.state.ogjobs[i].type === this.state.type || this.state.type === 'All') && (this.state.ogjobs[i].duration < this.state.duration) && (this.state.minsalary < Number(this.state.ogjobs[i].salary) && Number(this.state.ogjobs[i].salary) < this.state.maxsalary)) {
                filteredJobs.push(this.state.ogjobs[i]);
            }

        }
        var array = filteredJobs;

        this.setState({
            jobs: array,
            search: '',
        })
    };
    sortChangeDeadline() {
        /**
         *      Note that this is sorting only at front-end.
         */
        var array = this.state.jobs;
        var flag = this.state.sortDeadline;
        array.sort(function (a, b) {
            if (a.deadline != undefined && b.deadline != undefined) {
                return (1 - flag * 2) * (new Date(a.deadline) - new Date(b.deadline));
            }
            else {
                return 1;
            }
        });
        this.setState({
            jobs: array,
            sortDeadline: !this.state.sortDeadline,
        })
    }

    renderIconDeadline() {
        // console.log("tusharBond");
        if (this.state.sortDeadline) {
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
    sortChangeRating() {
        /**
         *      Note that this is sorting only at front-end.
         */
        var array = this.state.jobs;
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
            jobs: array,
            sortRating: !this.state.sortRating,
        })
    }

    renderIconRating() {
        // console.log("tusharBond");
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
    sortChangeSalary() {
        /**
         *      Note that this is sorting only at front-end.
         */
        var array = this.state.jobs;
        var flag = this.state.sortSalary;
        array.sort(function (a, b) {
            if (a.salary != undefined && b.salary != undefined) {
                return (1 - flag * 2) * (a.salary - b.salary);
            }
            else {
                return 1;
            }
        });
        this.setState({
            jobs: array,
            sortSalary: !this.state.sortSalary,
        })
    }
    renderIconSalary() {
        if (this.state.sortSalary) {
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
    sortChangeDuration() {
        /**
         *      Note that this is sorting only at front-end.
         */
        var array = this.state.jobs;
        var flag = this.state.sortDuration;
        array.sort(function (a, b) {
            if (a.duration != undefined && b.duration != undefined) {
                return (1 - flag * 2) * (a.duration - b.duration);
            }
            else {
                return 1;
            }
        });
        this.setState({
            jobs: array,
            sortDuration: !this.state.sortDuration,
        })
    }

    renderIconDuration() {
        if (this.state.sortDuration) {
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

    async customFunction(e) {
        await this.setState({
            search: e.target.value
        });

        if (this.state.search === "") {
            this.setState({
                jobs: this.state.ogjobs,
                duration: '7',
                minsalary: 0,
                maxsalary: 99999999,
                type: 'All',

            })

        }
        else {

            const fuse = new Fuse(this.state.jobs, {
                keys: [
                    'jobName'
                ],
                includeScore: true
            })

            // console.log('fuse', fuse)
            const results = fuse.search(this.state.search);
            console.log(results);
            this.setState({
                jobs: results.map(result => result.item),

            })
        }
    };




    render() {

        return (
            <div >
                <Grid container className="white">
                    <Grid item xs={12} md={3} lg={3}>

                    </Grid>
                    <Grid item xs={12} md={9} lg={9} className="white">
                        <List component="nav" aria-label="mailbox folders" className="white">
                            <input

                                value={this.state.search}
                                onChange={this.customFunction}
                                id="search"
                                type="text"

                            />
                        </List>
                    </Grid>
                </Grid>
                <Grid container className="white">
                    <Grid item xs={12} md={3} lg={3}>
                        <List component="nav" aria-label="mailbox folders">

                            <ListItem button className="white">
                                <form noValidate autoComplete="off" className="white" >
                                    <label>Min Salary</label>
                                    <input

                                        value={this.state.minsalary}
                                        onChange={this.onChangesalarymin}
                                        id="salaryMin"
                                        type="Number"

                                    />
                                    <label>Max Salary</label>
                                    <input

                                        value={this.state.maxsalary}
                                        onChange={this.onChangesalarymax}
                                        id="salaryMax"
                                        type="Number"

                                    />
                                </form>
                            </ListItem>
                            <Divider />
                            {/* <ListItem button divider className="white">
                                <Autocomplete
                                    id="combo-box-demo"
                                    options={this.state.jobs}
                                    getOptionLabel={(option) => option.type}
                                    style={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Select Type" variant="outlined" />}
                                />

                            </ListItem> */}
                            <div className="form-group browser-default">
                                <label>Type of Job</label>
                                <select ref="userInput"
                                    required
                                    style={{ "width": "50%" }}
                                    className="form-control browser-default"
                                    value={this.state.type}
                                    onChange={this.onChangetype}
                                >
                                    {
                                        this.state.types.map(function (type) {
                                            return <option
                                                key={type}
                                                value={type}>{type}
                                            </option>;
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group browser-default">
                                <label>Duration</label>
                                <select ref="userInput"
                                    required
                                    style={{ "width": "50%" }}
                                    className="form-control browser-default"
                                    value={this.state.duration}
                                    onChange={this.onChangeduration}
                                >
                                    {
                                        this.state.durations.map(function (duration) {
                                            return <option
                                                key={duration}
                                                value={duration}>{duration}
                                            </option>;
                                        })
                                    }
                                </select>
                            </div>
                        </List>
                    </Grid>
                    <Grid item xs={12} md={9} lg={9}>
                        <Paper>
                            <Table size="medium">
                                <TableHead>
                                    <TableRow>
                                        <TableCell> Sr No.</TableCell>
                                        <TableCell> Job Name</TableCell>
                                        <TableCell> Recuriter Name</TableCell>
                                        <TableCell>Skills</TableCell>
                                        <TableCell> <Button onClick={this.sortChangeDeadline}>{this.renderIconDeadline()}</Button>Deadline(GTM)</TableCell>
                                        <TableCell>Maximum Applications</TableCell>
                                        <TableCell>No. of Positions</TableCell>
                                        <TableCell><Button onClick={this.sortChangeSalary}>{this.renderIconSalary()}</Button>Salary</TableCell>
                                        <TableCell><Button onClick={this.sortChangeDuration}>{this.renderIconDuration()}</Button>Duration</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell><Button onClick={this.sortChangeRating}>{this.renderIconRating()}</Button>Rating</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        this.state.jobs.map((job, ind) => (

                                            <TableRow key={ind}>
                                                <TableCell>{ind}</TableCell>
                                                <TableCell>{job.jobName}</TableCell>
                                                <TableCell>{job.recName}</TableCell>
                                                <TableCell>{job.skillReq}</TableCell>
                                                <TableCell>{job.deadline.split("T")[0]} {job.deadline.split("T")[1].split(".")[0]}</TableCell>
                                                <TableCell>{job.maxApp}</TableCell>
                                                <TableCell>{job.numOfPositions}</TableCell>
                                                <TableCell>{job.salary}</TableCell>
                                                <TableCell>{job.duration}</TableCell>
                                                <TableCell>{job.type}</TableCell>
                                                <TableCell>{job.rating.toFixed(2)}</TableCell>
                                                <TableCell>
                                                    <button
                                                        onClick={() => this.apply(job._id, job.status, ind)}
                                                        style={{
                                                            width: "120px",
                                                            borderRadius: "1.5px",
                                                            letterSpacing: ".75px"
                                                        }}
                                                        className={job.color}
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
