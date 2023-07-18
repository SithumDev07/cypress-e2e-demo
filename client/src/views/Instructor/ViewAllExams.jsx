import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Button, Card, CardHeader, CardMedia, Chip, Grid, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Grades, Levels } from "../../appconst";
import CustCard from "../../components/CustCard";
import MainContainer from "../../components/MainContainer";
import SubTitle from "../../components/SubTitle";
import CustSnackbar from "../../components/CustSnackbar";
import coverImage from '../../assets/loginImg.jpg'

import SendIcon from '@mui/icons-material/Send';
import moment from "moment";


import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventIcon from '@mui/icons-material/Event';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import InstructorServices from "../../services/InstructorServices";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ClassServices from "../../services/ClassServices";
import Table from "../../components/CustTable";
import { MagicSpinner } from "react-spinners-kit";
import ResultServices from "../../services/ResultServices";
import LocalStorageServices from "../../services/LocalStorageServices";

import SearchIcon from '@mui/icons-material/Search';


const ViewAllExams = (props) => {

    //alert
    let [message, setMessage] = useState('')
    let [alert, setAlert] = useState(false)
    let [severity, setServerity] = useState('success')

    // const {classID} = useParams() 
    let [myClasses, setMyClasses] = useState(null)
    let currentUser = null;
    let [classes, setClasses] = useState('')
    let [assignmentIDs, setAssgmentIDs] = useState(null)
    let [assignment, setAssgment] = useState('')
    const [classStudents,setClassStudents] = useState([])
    
    useEffect(()=> {
        const getClasses = async () => {
            const user = getUser()
            if (user != null){
                const res = await InstructorServices.getClasses(user.id)
                setMyClasses(res.data)
                console.log("ins classes",res.data)
            }
        }
        getClasses()
    },[])

    let getUser = () => {
        currentUser = JSON.parse(LocalStorageServices.getItem('user'))
        // console.log('lcoaluser', currentUser)
        return currentUser
    }

    const getAssignments = (class_ID) => {
        let params = {
            class_ID : class_ID
        }
        const getClasses = async () => {
            const res = await ResultServices.getAllAssignmentIdsOfClass(params)

            setAssgmentIDs(res.data.assignments)
            console.log("assi",res.data)
        }
        getClasses()
    }

    let handleSubmit = async() => {
        let params = {
            assignment_ID : assignment
        }

        let res = await ResultServices.getAllResultsOfAssignment(params)
        if(res.status === 200){
            console.log(res.data.studentsResults)
            setClassStudents(res.data.studentsResults)
        }else {
            setAlert(true)
            setMessage('No student found!')
            setServerity('error')
        }
        console.log(res)
    }
    let handleError = () => {
        console.log('error')
    }

    const columns = [
        { 
            accessorKey: 'student_ID', 
            header: 'Student ID', 
            width : 130,
        },
        { 
            accessorKey: 'studentName', 
            header: 'Student Name', 
            width : 150
        },
        { 
            accessorKey: 'gender', 
            header: 'Gender',
            width : 150
        },
        { 
            accessorKey: 'marks', 
            header: 'Marks', 
            width : 150
        },
    ];


    return ( 
        <Fragment>
            <MainContainer>
                <Card
                    sx={{p: 10, m:5, mx:10}}
                    elevation={6} 
                    className="px-main-card py-3" 
                    style={{backgroundColor:'#52aa9f'}}
                >
                    <Typography variant='h5'>View Student Marks</Typography>
                </Card>
                <ValidatorForm
                    onSubmit={handleSubmit}
                    onError={handleError}
                >
                    <Grid
                        container
                        spacing={2}
                        sx={{p:20}}
                    >
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={4}
                            sx={{p:5}}
                        >
                            <SubTitle title="Class" required/>
                            <Autocomplete
                                color='green'
                                options={myClasses}
                                // groupBy={(option)=>option.level}
                                disabled={
                                    myClasses != null 
                                            ? (myClasses.length > 0) 
                                                ? false 
                                                : true
                                            : true
                                }
                                name="classes"
                                // value={myClasses}
                                getOptionLabel={(option) => "Grade " + option.grade + " - " + option.classType}
                                renderInput={(params) => (
                                    <TextValidator
                                        color='green'
                                        {...params}
                                        // className=" w-full"
                                        // placeholder="Select classes which you wants to notify"
                                        value={classes}
                                        disabled={
                                            // true
                                            myClasses != null 
                                            ? (myClasses.length > 0) 
                                                ? false 
                                                : true
                                            : true
                                        }
                                        InputLabelProps={{shrink: false}}
                                        type="text"
                                        variant="outlined"
                                        size="small"
                                        validators={[
                                            'required',
                                        ]}
                                        errorMessages={[
                                            'This field is required',
                                        ]}
                                    />
                                )}
                                onChange={(e, newValue) => {
                                    if(newValue !== null){
                                        setClasses(newValue._id)
                                        getAssignments(newValue._id)
                                    }
                                }}
                            />
                        </Grid>
                        
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={4}
                            sx={{p:5}}
                        >
                            <SubTitle title="Assignment Name" required/>
                            <Autocomplete
                                color='green'
                                options={assignmentIDs}
                                // groupBy={(option)=>option.level}
                                disabled={
                                    assignmentIDs != null 
                                            ? (assignmentIDs.length > 0) 
                                                ? false 
                                                : true
                                            : true
                                }
                                name="assignmentIDs"
                                // value={myClasses}
                                getOptionLabel={(option) => option}
                                renderInput={(params) => (
                                    <TextValidator
                                        color='green'
                                        {...params}
                                        // className=" w-full"
                                        // placeholder="Select assignmentIDs which you wants to notify"
                                        value={assignment}
                                        disabled={
                                            // true
                                            assignmentIDs != null 
                                            ? (assignmentIDs.length > 0) 
                                                ? false 
                                                : true
                                            : true
                                        }
                                        InputLabelProps={{shrink: false}}
                                        type="text"
                                        variant="outlined"
                                        size="small"
                                        validators={[
                                            'required',
                                        ]}
                                        errorMessages={[
                                            'This field is required',
                                        ]}
                                    />
                                )}
                                onChange={(e, newValue) => {
                                    if(newValue !== null){
                                        setAssgment(newValue)
                                        // getAssignments(newValue)
                                    }
                                }}
                            />
                        </Grid>

                        <Grid
                            xs={12}
                            sm={12}
                            md={4}
                            lg={4}
                            sx={{mt:10, pl:10}}
                        >
                            <Button
                                type='submit'
                                variant="contained"
                                color="green"
                                startIcon={<SearchIcon/>}
                            >
                                Show Marks of Students
                            </Button>
                        </Grid>
                        
                        

                    </Grid>


                </ValidatorForm>
                        
                        {classStudents.length > 0 ? 
                            (
                                <Card
                                    sx={{ mx:10}}
                                    elevation={6} 
                                    // className="px-main-card py-3" 
                                >
                                    <Table
                                        data={classStudents}
                                        columns={columns}
                                        // pageSize={5}
                                        // color="green"
                                        // rowsPerPageOptions={[5]}
                                        // getRowId={(rows)=>rows._id}
                                    />
                                </Card>
                            )
                        
                        
                        : 
                            <Grid style={{display:'flex',alignItems:'center', position:"absolute", flexDirection:'row', textAlign:'center', flexWrap:'wrap'  }}
                                sx={{mt:50, ml:250}}
                            >
                                <MagicSpinner size={200} color="#008272" loading={true} />
                            </Grid>
                        }
            </MainContainer>
            <CustSnackbar
                open={alert}
                onClose={() => {
                    setAlert(false)
                }}
                message={message}
                autoHideDuration={3000}
                severity={severity}
                elevation={2}
                variant="filled"
            ></CustSnackbar>
        </Fragment>
    );
}

export default ViewAllExams;