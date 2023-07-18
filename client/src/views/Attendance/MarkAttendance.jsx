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

function MarkAttendance() {
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
    const [qrscan, setQrscan] = useState(null);
    
    const [students, setStudents] = useState(null);
    const [loaded, setLoaded] = useState(false);
    
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
    ]

    useEffect(() => {
        const getInstructors = async () => {
            let res = await InstructorServices.getAllInstructors()
            // console.log("ins",res.data)
            setInstructorList(res.data)
        } 
        getInstructors()
        showAttendance()
    },[])

    const showAttendance = async () => {
        setLoaded(false)
        let class_ID = classID;
        var dateobj = new Date();
        var dateNow = dateobj.toISOString();
        console.log("ClassID",class_ID,"Date now",dateNow)
        let res2 = await AttendanceServices.showAttendance(class_ID,dateNow)
        setStudents(res2.data.attendedST_ID)
        setLoaded(true)
        console.log(res2)
    }

    const handleScan = data => {
        if (data && instructorID !== null && classID !== null) {
            setQrscan(data)
        }
    }
    
    const handleError = err => {
        console.error(err)
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
        let formData = {
            "ST_ID" : qrscan,
            "class_ID" : classID,
            "attend_date" : new Date()
        }
        console.log(formData)
        let res = await AttendanceServices.markAttendance(formData)
        console.log("response",res)
        showAttendance()
        
        if(res.status === 200){
            setAlert(true)
            setMessage(res.data.message)
            setServerity('success')
        }else if(res.status === 400){
            setAlert(true)
            setMessage(res.data.message)
            setServerity('error')
        }else if(res.status === 401){
            setAlert(true)
            setMessage(res.data.message)
            setServerity('error')
        }else if(res.status === 402){
            setAlert(true)
            setMessage(res.data.message)
            setServerity('error')
        }
        
    }
    return (
        <Fragment>
            <MainContainer>
                <Grid
                    container
                    sx={{display:'flex', mt:10}}
                    spacing={5}
                >
                    {/* <button onClick={()=> showAttendance()}>
                        getdata
                    </button> */}
                    <Grid
                        xs={12}
                        sm={12}
                        md={3}
                        lg={3}
                        // sx={{display:'flex'}}
                    >
                        
                        <Grid
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
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
                                                    // console.log("new Value",newValue)
                                                }
                                            }}
                                            onInputChange={(e, newValue) => {
                                                // console.log(newValue)
                                                if(newValue !== null){
                                                    setInstructorID(newValue.ID)
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
                                            md={12}
                                            lg={12}
                                            item
                                        >
                                            {/* {instructorClasses.length > 0 ? */}
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
                                                        setStartScan(false)
                                                    }}
                                                    onInputChange={(e, newValue) => {
                                                        if(newValue !== null){
                                                            setClassID(newValue._id)
                                                        }
                                                        setStartScan(false)
                                                    }}
                                                />    
                                            {/* : null */}
                                            {/* } */}
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
                                                    console.log(Date())
                                                    // console.log(classID,instructorID)
                                                    if(classID !== null && instructorID !== null){
                                                        setStartScan(true)
                                                        showAttendance()
                                                    }
                                                }}
                                            >
                                                Start Scan
                                            </Button>
                                        </Grid>
                                    </>
                                    : null
                                    }
                                    {startScan ? 
                                        <Grid
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            lg={12}
                                            spacing={3}
                                        >
                                            <Grid 
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                lg={12}
                                                item
                                            >
                                                <QrReader
                                                    delay={300}
                                                    onError={handleError}
                                                    onScan={handleScan}
                                                    style={{  width: '50%' }}
                                                    onResult={(result, error) => {
                                                        if (!!result) {
                                                            if (instructorID !== null && classID !== null){
                                                                setQrscan(result?.text);
                                                            }else {
                                                                setQrscan('select class first');
                                                            }
                                                        }
                                            
                                                        if (!!error) {
                                                        console.log(error);
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                            <Grid
                                                sx={{display:'flex'}}
                                                container
                                                // spacing={5}
                                            >
                                                <Grid
                                                    xs={12}
                                                    sm={12}
                                                    md={12}
                                                    lg={12}
                                                    item
                                                >
                                                    <TextValidator
                                                        style={{width:'100%'}}
                                                        placeholder="Student ID"
                                                        name="stuID"
                                                        color="green"
                                                        InputLabelProps={{
                                                            shrink: false,
                                                        }}
                                                        value={qrscan}
                                                        disabled={true}
                                                        type="text"
                                                        variant="outlined"
                                                        size="small"
                                                        // onChange={(e)=>{
                                                        //     (instructorID !== null && classID !== null)
                                                        //     ?
                                                        //         setQrscan(e.target.val)
                                                        //     :
                                                        //         setQrscan(null)
                                                        // }}
                                                        validators={[
                                                            'required',
                                                        ]}
                                                        errorMessages={[
                                                            'student ID is required',
                                                        ]}
                                                    />
                                                </Grid>
                                                <Grid
                                                    xs={12}
                                                    sm={12}
                                                    md={12}
                                                    lg={12}
                                                    item
                                                    sx={{py:5, display:'flex', justifyContent:'center'}}
                                                >
                                                    <Button
                                                        variant="contained"
                                                        color='green'
                                                        endIcon={<SendIcon/>}
                                                        type='submit'
                                                    >
                                                        Enter
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        
                                        : null    
                                    }

                                    
                                </Grid>
                            </ValidatorForm>
                        </Grid>

                        
                    </Grid>
                    <Grid
                        xs={12}
                        sm={12}
                        md={9}
                        lg={9}
                        sx={{pl:10}}
                    >
                        {loaded && startScan? 
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

export default MarkAttendance;
