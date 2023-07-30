import { Autocomplete, Box, Button, Card, Divider, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import React,{ Fragment, useEffect, useState } from "react";
import { TextValidator,  ValidatorForm } from "react-material-ui-form-validator";
import SubTitle from "../../components/SubTitle";
import {classTypes, Grades, Halls, WeekDays} from '../../appconst'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from "@mui/x-date-pickers";
import moment from "moment";
import dayjs from 'dayjs';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import CustCard from "../../components/CustCard";
import MainContainer from "../../components/MainContainer";
import CustSnackbar from "../../components/CustSnackbar";
import axios from 'axios'
import ClassServices from "../../services/ClassServices";
import InstructorServices from "../../services/InstructorServices";
import { useNavigate } from "react-router-dom";

const CreateClass = () => {
    const navigate = useNavigate();

    let [classID,setClassID] = useState('1')
    let [instructorID,setInstructorID] = useState('')
    let [classType,setClassType] = useState('')
    let [grade,setGrade] = useState('')
    let [date,setDate] = useState('')
    let [startTime,setStartTime] = useState('2018-01-01T06:00')
    let [endTime,setEndTime] = useState('2018-01-01T06:00')
    let [admission,setAdmission] = useState('')
    let [classFee,setClassFee] = useState('')
    let [paymentLink,setPaymentLink] = useState('')
    let [hall,setHall] = useState('')
    let [instructorList,setInstructorList] = useState(null)
    let [loaded,setLoaded] = useState(false)

    let [message, setMessage] = useState('')
    let [alert, setAlert] = useState(false)
    let [severity, setServerity] = useState('success')

    let handleSubmit = async () => {
        var formData = new FormData()
    
        formData = {
            class_ID : classID,
            IN_ID : instructorID,
            classType: classType,
            grade: grade,
            classDate: date,
            startTime : startTime,
            endTime: endTime,
            admission: admission,
            classFee: classFee,
            paymentLink:paymentLink,
            hall: hall,
        }

        console.log(formData)

        const res = await ClassServices.createClass(formData)
        console.log("aaa",res)
        if (res.status < 300){
            setAlert(true)
            setMessage('Successfully created a new class!')
            setServerity('success')
            handleRedirect()
        }else if (res.status > 399){
            setAlert(true)
            setMessage(res.data.msg)
            setServerity('error')
        }
    }

    let handleError = () => {
        alert('Submission error!')
        setAlert(true)
        setMessage('Error in submission')
        setServerity('error')
    }

    const handleRedirect = () => {
        setTimeout(() => {
            navigate ("/classes")
            console.log('timeout')
        }, 3000);
    }

    useEffect(() => {
        const getInstructors = async () => {
            let res = await InstructorServices.getAllInstructors()
            setInstructorList(res.data)
            setLoaded(true)
        } 
        getInstructors()
    },[])

    return ( 
        <Fragment>
            <ValidatorForm
                onSubmit={handleSubmit}
                onError={handleError}
            >
                {loaded ?
                    <MainContainer>
                        <CustCard>
                            <Typography variant="h5">Create New Class</Typography>
                            <Divider/>
                            <Grid container spacing={12} sx={{mt:10}}>
                                
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={6}
                                    lg={4}
                                    sx={{p:5}}
                                >
                                    <SubTitle title="Instructor Name" required/>
                                        <Autocomplete
                                            // color='green'
                                            role="instructor-list"
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
                                                        'required',
                                                    ]}
                                                    errorMessages={[
                                                        'This field is required',
                                                    ]}
                                                />
                                            )}
                                            onChange={(e, newValue) => {
                                                if(newValue !== null){
                                                    setInstructorID(newValue._id)
                                                    console.log("new Value",newValue)
                                                }
                                            }}
                                            onInputChange={(e, newValue) => {
                                                console.log(newValue)
                                                if(newValue !== null){
                                                    setInstructorID(newValue.ID)
                                                }
                                            }}
                                        />

                                    
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={6}
                                    lg={4}
                                    sx={{p:5}}
                                >
                                    <SubTitle title="Class Type" required/>
                                    <Autocomplete
                                        color='green'
                                        className="w-full"
                                        options={classTypes}
                                        disabled={false}
                                        name="classType"
                                        getOptionLabel={(option) => option.label}
                                        renderInput={(params) => (
                                            <TextValidator
                                                color='green'
                                                {...params}
                                                // className=" w-full"
                                                placeholder="Select class type"
                                                value={classType}
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
                                                setClassType(newValue.value)
                                            }
                                        }}
                                        onInputChange={(e, newValue) => {
                                            if(newValue !== null){
                                                setClassType(newValue.value)
                                            }
                                        }}
                                    />
                                </Grid>        
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={6}
                                    lg={4}
                                    sx={{p:5}}
                                >
                                    <SubTitle title="Grade" required/>
                                    <Autocomplete
                                        color='green'
                                        className="w-full"
                                        options={Grades}
                                        disabled={false}
                                        getOptionLabel={(option) => option.label}
                                        renderInput={(params) => (
                                            <TextValidator
                                                color='green'
                                                {...params}
                                                // className=" w-full"
                                                placeholder="Select grade"
                                                value={grade}
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
                                                data-cy={"grade"}
                                            />
                                        )}
                                        onChange={(e, newValue) => {
                                            if(newValue !== null){
                                                setGrade(newValue.value)
                                            }
                                        }}
                                        onInputChange={(e, newValue) => {
                                            if(newValue !== null){
                                                setGrade(newValue.value)
                                            }
                                        }}
                                    />
                                </Grid> 
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={6}
                                    lg={4}
                                    sx={{p:5}}
                                >
                                    <SubTitle title="Date" required/>
                                    <Autocomplete
                                        color='green'
                                        className="w-full"
                                        options={WeekDays}
                                        groupBy={(option)=>option.type}
                                        disabled={false}
                                        name="grade"
                                        data-cy={"select-grade-wrapper"}
                                        getOptionLabel={(option) => option.label}
                                        renderInput={(params) => (
                                            <TextValidator
                                                color='green'
                                                {...params}
                                                // className=" w-full"
                                                placeholder="Select grade"
                                                value={date}
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
                                                data-cy={"select-grade"}
                                            />
                                        )}
                                        onChange={(e, newValue) => {
                                            if(newValue !== null){
                                                setDate(newValue.label)
                                            }
                                        }}
                                        onInputChange={(e, newValue) => {
                                            if(newValue !== null){
                                                setDate(newValue.label)
                                            }
                                        }}
                                    />
                                </Grid>       
                                
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={6}
                                    lg={4}
                                    sx={{p:5}}
                                >
                                    <SubTitle title="Start Time" required/>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <MobileTimePicker
                                            // label="For mobile"
                                            // color='secondary'
                                            minTime={dayjs('2018-01-01T06:00')}
                                            maxTime={dayjs('2018-01-01T20:00')}
                                            value={startTime}
                                            onChange={(newValue) => {
                                                setStartTime(newValue);
                                            }}
                                            renderInput={(params) => 
                                                <TextValidator
                                                    color='green' 
                                                    {...params}
                                                    placeholder=""
                                                    sx={{width: '100%'}}
                                                    value={startTime}
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
                                                    data-cy={"start-time-picker"}
                                                />
                                            }
                                            
                                        />
                                    </LocalizationProvider>
                                </Grid>       
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={6}
                                    lg={4}
                                    sx={{p:5}}
                                >
                                    <SubTitle title="End Time" required/>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <MobileTimePicker
                                            // label="For mobile"
                                            // color='secondary'
                                            format="HH:mm"
                                            minTime={dayjs(startTime)}
                                            maxTime={dayjs('2018-01-01T20:00')}
                                            value={endTime}
                                            onChange={(newValue) => {
                                                //  const newTime = moment(newValue.$d).format('HH:mm')
                                                setEndTime(newValue)
                                            }}
                                            renderInput={(params) => 
                                                <TextValidator
                                                    color='green' 
                                                    {...params}
                                                    placeholder=""
                                                    sx={{width: '100%'}}
                                                    value={endTime}
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
                                            
                                        />
                                    </LocalizationProvider>
                                </Grid>       
                                        
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={6}
                                    lg={4}
                                    sx={{p:5}}
                                >
                                    <SubTitle title="Admission Fee" required/>
                                    <TextValidator
                                        color='green'
                                        
                                        fullWidth 
                                        placeholder="Enter admission fee amount"
                                        InputLabelProps={{
                                            shrink: false,
                                        }}
                                        value={
                                            admission
                                        }
                                        disabled={false}
                                        type="text"
                                        variant="outlined"
                                        size="small"
                                        onChange={(e) => {
                                            setAdmission(e.target.value)
                                        }}
                                        validators={[
                                            'required',
                                            'matchRegexp:^[+-]?[0-9]{1,10}(?:\.[0-9]{2})?$',
                                            'minNumber:0'
                                        ]}
                                        errorMessages={[
                                            'This field is required',
                                            'Admission fee is invalid',
                                            'Only positive amounts are acceptable'
                                        ]}
                                        data-cy={"admission-fee"}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={6}
                                    lg={4}
                                    sx={{p:5}}
                                >
                                    <SubTitle title="Class Fee" required/>
                                    <TextValidator
                                        color='green'
                                        fullWidth 
                                        placeholder="Enter class fee amount"
                                        name=""
                                        InputLabelProps={{
                                            shrink: false,
                                        }}
                                        value={
                                            classFee
                                        }
                                        disabled={false}
                                        type="text"
                                        variant="outlined"
                                        size="small"
                                        onChange={(e) => {
                                            setClassFee(e.target.value)
                                        }}
                                        validators={[
                                            'required',
                                            'matchRegexp:^[+-]?[0-9]{1,10}(?:\.[0-9]{2})?$',
                                            'minNumber:0'
                                        ]}
                                        errorMessages={[
                                            'This field is required',
                                            'Admission fee is invalid',
                                            'Only positive amounts are acceptable'
                                        ]}
                                        data-cy={"class-fee"}
                                    />
                                </Grid>

                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={6}
                                    lg={4}
                                    sx={{p:5}}
                                >
                                    <SubTitle title="Hall" required/>
                                    <Autocomplete
                                        color='green'
                                        className="w-full"
                                        options={Halls}
                                        disabled={false}
                                        name="classType"
                                        getOptionLabel={(option) => option.label}
                                        renderInput={(params) => (
                                            <TextValidator
                                                color='green'
                                                {...params}
                                                // className=" w-full"
                                                placeholder="Select hall"
                                                value={hall}
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
                                        )}
                                        onChange={(e, newValue) => {
                                            if(newValue !== null){
                                                setHall(newValue.value)
                                            }
                                        }}
                                        onInputChange={(e, newValue) => {
                                            if(newValue !== null){
                                                setHall(newValue.value)
                                            }
                                        }}
                                    />
                                </Grid>  
                                
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={6}
                                    lg={4}
                                    sx={{p:5}}
                                >
                                    <SubTitle title="Payment Link" required/>
                                    <TextValidator
                                        color='green'
                                        fullWidth 
                                        placeholder="Enter payment link generated by payhere"
                                        name=""
                                        InputLabelProps={{
                                            shrink: false,
                                        }}
                                        value={
                                            paymentLink
                                        }
                                        disabled={false}
                                        type="text"
                                        variant="outlined"
                                        size="small"
                                        onChange={(e) => {
                                            setPaymentLink(e.target.value)
                                        }}
                                        data-cy={"payment-link"}
                                        // validators={[
                                        //     'required',
                                        //     'matchRegexp:^[+-]?[0-9]{1,10}(?:\.[0-9]{2})?$',
                                        //     'minNumber:0'
                                        // ]}
                                        // errorMessages={[
                                        //     'This field is required',
                                        //     'Admission fee is invalid',
                                        //     'Only positive amounts are acceptable'
                                        // ]}
                                    />
                                </Grid>            


                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                sx={{pt:10, display: 'flex', justifyContent: 'end' }}
                            >
                                <Button
                                    progress={false}
                                    type="cancel"
                                    startIcon ={<CloseIcon/>}
                                    variant="contained"
                                    color="red"
                                    // onClick={handleSubmit}
                                >
                                    <span className="capitalize">
                                        Cancel
                                    </span>
                                </Button>
                                
                                <Button
                                    sx={{ml: 5}}
                                    progress={false}
                                    type="submit"
                                    endIcon ={<SendIcon/>}
                                    variant="contained"
                                    color="green"
                                    // onClick={handleSubmit}
                                >
                                    <span className="capitalize">
                                        Submit
                                    </span>
                                </Button>
                                
                            </Grid>
                            </Grid>
                        </CustCard>
                    </MainContainer>
                : null}
            </ValidatorForm>


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

export default CreateClass;