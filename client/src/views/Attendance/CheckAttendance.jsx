import React, {Fragment, useEffect, useState} from 'react'
import {Autocomplete, Button, Fab, Grid, IconButton, TextareaAutosize, TextField} from '@mui/material'
import {ArrowBack} from '@mui/icons-material'
import { Link } from "react-router-dom";
import {QrReader} from 'react-qr-reader'
import MainContainer from '../../components/MainContainer';
import { flexbox } from '@mui/system';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import InstructorServices from '../../services/InstructorServices';

import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SendIcon from '@mui/icons-material/Send';
import moment from 'moment';
import LocalStorageServices from '../../services/LocalStorageServices';
import AttendanceServices from '../../services/AttendanceServices';
import CustSnackbar from '../../components/CustSnackbar';
import Table from '../../components/CustTable';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function CheckAttendance() {
    let [message, setMessage] = useState('')
    let [alert, setAlert] = useState(false)
    let [severity, setServerity] = useState('success')


    const [instructorID, setInstructorID] = useState(null)
    const [classID, setClassID] = useState(null)
    
    const [instructorList, setInstructorList] = useState(null)
    const [instructorClasses, setInstructorClasses] = useState([])

    const [disable, setDisable] = useState(true)
    const [startScan, setStartScan] = useState(false)
    const [showclassField, setShowclassField] = useState(false)
    // const [qrscan, setQrscan] = useState(null);
    
    const [students, setStudents] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [classDate, setClassDate] = useState(new Date);
    
    const columns = [
        {
            accessorKey: '_id',
            header: 'ID',
        //   size: 40,
        },
        {
            accessorKey: 'firstName',
            header: 'First Name',
        //   size: 120,
        },
        {
            accessorKey: 'lastName',
            header: 'Last Name',
        //   size: 120,
        },
        {
            accessorKey: 'gender',
            header: 'Gender',
          //   size: 120,
        },
        {
            accessorKey: 'contactNumber',
            header: 'Telephone',
          //   size: 120,
        },
        { 
            accessorKey: 'createdAt', 
            header: 'Attended Time', 
            width : 130,
            Cell: ({ cell }) => (
                <div>
                    {moment(cell).format('MMMM Do YYYY, h:mm:ss a')}
                </div>
            ),
        },
    ]

    useEffect(() => {
        const getInstructors = async () => {
            let res = await InstructorServices.getAllInstructors()
            // console.log("ins",res.data)
            setInstructorList(res.data)
        } 
        getInstructors()
        // showAttendance()
    },[])

    const showAttendance = async () => {
        setLoaded(false)
        let class_ID = classID;
        // let classDate = classDate;
        let res2 = await AttendanceServices.showAttendance(class_ID,classDate)
        setStudents(res2.data.attendedST_ID)
        setLoaded(true)
        console.log(res2)
    }


    const getInstructorClasses = async (id) => {
        setInstructorID(id)
        console.log("iD",instructorID)
        setDisable(true)
        setShowclassField(false)
        if(instructorID){
            const res = await InstructorServices.getClassesForAttendance(instructorID)
            setInstructorClasses(res.data)
            setDisable(false)
            setShowclassField(true)
            console.log("ins classes",res.data)
        }
    }

    const handleSubmit = async () => {
        // let formData = {
        //     "ST_ID" : qrscan,
        //     "class_ID" : classID,
        //     "attend_date" : moment()
        // }
        // console.log(formData)
        // let res = await AttendanceServices.markAttendance(formData)
        // console.log("response",res)
        // showAttendance()
        
        // if(res.status === 200){
        //     setAlert(true)
        //     setMessage(res.data.message)
        //     setServerity('success')
        // }else if(res.status === 400){
        //     setAlert(true)
        //     setMessage(res.data.message)
        //     setServerity('error')
        // }else if(res.status === 401){
        //     setAlert(true)
        //     setMessage(res.data.message)
        //     setServerity('error')
        // }else if(res.status === 402){
        //     setAlert(true)
        //     setMessage(res.data.message)
        //     setServerity('error')
        // }
        
    }

    return (
        <Fragment>
            <MainContainer>
                <Grid
                    container
                    // sx={{display:'flex'}}
                >
                    {/* <button onClick={()=> showAttendance()}>
                        getdata
                    </button> */}
                    <Grid
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        sx={{display:'flex', justifyContent:'center'}}
                    >
                        
                        <Grid
                            xs={12}
                            sm={12}
                            md={6}
                            lg={6}
                            spacing={3}
                        >
                            <ValidatorForm
                                onSubmit={handleSubmit}
                            >
                                <Grid
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    container
                                    spacing={5}
                                    // style={{width: '30%'}}
                                    // sx={{display:'flex', justifyContent: 'center'}}
                                >
                                    <Grid
                                        xs={12}
                                        sm={12}
                                        md={11}
                                        lg={11}
                                        item
                                    >
                                        <Autocomplete
                                            color='green'
                                            className="w-full"
                                            options={instructorList}
                                            disabled={false}
                                            disableClearable={true}
                                            name="classType"
                                            getOptionLabel={(option) => option.firstName + " " +option.lastName}
                                            renderInput={(params) => (
                                                <TextValidator
                                                    color='green'
                                                    {...params}
                                                    // className=" w-full"
                                                    placeholder="Select instructor"
                                                    value={instructorID}
                                                    disabled={false}
                                                    InputLabelProps={{shrink: false}}
                                                    type="text"
                                                    variant="outlined"
                                                    size="small"
                                                    validators={[
                                                        // 'required',
                                                    ]}
                                                    errorMessages={[
                                                        // 'This field is required',
                                                    ]}
                                                />
                                            )}
                                            onChange={(e, newValue) => {
                                                if(newValue !== null){
                                                    setInstructorID(newValue._id)
                                                    setShowclassField(false)
                                                    // getInstructorClasses(newValue.ID)
                                                    // console.log("newValue",instructorID)
                                                }
                                            }}
                                            onInputChange={(e, newValue) => {
                                                console.log(newValue)
                                                if(newValue !== null){
                                                    setInstructorID(newValue._id)
                                                    // getInstructorClasses(newValue.ID)
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        xs={1}
                                        sm={1}
                                        md={1}
                                        lg={1}
                                        sx={{pl:5}}
                                        item
                                    >
                                        <Fab
                                            onClick={()=>{
                                                getInstructorClasses(instructorID)
                                            }}
                                            color='green' 
                                            size='small'
                                            
                                        >
                                            <ArrowForwardRoundedIcon />
                                        </Fab>
                                    </Grid>
                                    {showclassField ? 
                                    <>
                                        <Grid
                                            xs={12}
                                            sm={12}
                                            md={11}
                                            lg={11}
                                            item
                                        >
                                                <Autocomplete
                                                    color='green'
                                                    className="w-full"
                                                    disableClearable={true}
                                                    options={instructorClasses}
                                                    disabled={disable}
                                                    name="classType"
                                                    getOptionLabel={(option) => "Grade" + option.grade + " - " + option.classType}
                                                    renderInput={(params) => (
                                                        <TextValidator
                                                            color='green'
                                                            {...params}
                                                            // className=" w-full"
                                                            placeholder="Select class type"
                                                            value={classID}
                                                            disabled={disable}
                                                            InputLabelProps={{shrink: false}}
                                                            type="text"
                                                            variant="outlined"
                                                            size="small"
                                                            validators={[
                                                                // 'required',
                                                            ]}
                                                            errorMessages={[
                                                                // 'This field is required',
                                                            ]}
                                                        />
                                                    )}
                                                    onChange={(e, newValue) => {
                                                        // console.log(newValue)
                                                        if(newValue !== null){
                                                            setClassID(newValue._id)
                                                        }
                                                    }}
                                                    onInputChange={(e, newValue) => {
                                                        if(newValue !== null){
                                                            setClassID(newValue._id)
                                                        }
                                                    }}
                                                />    

                                        </Grid>
                                        <Grid
                                            xs={12}
                                            sm={12}
                                            md={11}
                                            lg={11}
                                            item
                                        >
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    color='green'
                                                    // label=""
                                                    // className="w-full"
                                                    // fullWidth
                                                    format="yyyy"
                                                    // disablePast
                                                    orientation="portrait"
                                                    value={classDate}
                                                    // views={['year']}
                                                    onChange={(newValue) => {
                                                        const newDate = newValue.toISOString();
                                                        setClassDate(newDate);
                                                        console.log(newValue)
                                                        console.log(newDate)
                                                    }}
                                                    renderInput={(params) => 
                                                        <TextValidator
                                                            color='green' 
                                                            {...params}
                                                            placeholder=""
                                                            sx={{width: '100%'}}
                                                            value={classDate}
                                                            disabled={false}
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
                                                    }
                                                    validators={[
                                                        'required',
                                                    ]}
                                                    errorMessages={[
                                                        'This field is required',
                                                    ]} 
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                        <Grid
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            lg={12}
                                            item
                                            sx={{display:'flex',justifyContent:'center'}}
                                        >
                                            <Button
                                                endIcon={<PlayArrowIcon/>}
                                                color='green'
                                                variant='contained'
                                                onClick={() => {
                                                    // console.log(Date())
                                                    // console.log(classID,instructorID)
                                                    if(classID !== null && instructorID !== null && classDate !== null){
                                                        // setStartScan(true)
                                                        showAttendance()
                                                    }
                                                }}
                                            >
                                                Get Attendance
                                            </Button>
                                        </Grid>
                                    </>
                                    : null
                                    }
                                    
                                </Grid>
                            </ValidatorForm>
                        </Grid>

                        
                    </Grid>
                    <Grid
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        sx={{mt:10}}
                    >
                        {loaded ? 
                            <Table
                                columns={columns}
                                data={students}
                            />
                            : null
                        }
                    </Grid>
                    
                </Grid>
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
  
  export default CheckAttendance;
  