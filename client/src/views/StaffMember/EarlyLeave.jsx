import { Autocomplete, Button, Card, Grid, TextField, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
// import { Grades, Levels } from "../../appconst";
import CustCard from "../../components/CustCard";
import MainContainer from "../../components/MainContainer";
import SubTitle from "../../components/SubTitle";
import CustSnackbar from "../../components/CustSnackbar";
import { DatePicker, LocalizationProvider, MobileTimePicker, StaticTimePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InstructorServices from "../../services/InstructorServices";
import NotificationServices from "../../services/NotificationServices";
import { useNavigate } from "react-router-dom";
import LocalStorageServices from "../../services/LocalStorageServices";
import CampaignIcon from '@mui/icons-material/Campaign';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from "dayjs";
import moment from "moment";
import HandleRefresh from "../../utils/HandleRefresh";


const EarlyLeave = () => {

    const navigate = useNavigate();

    let [date, setDate] = useState(new Date())
    let [time, setTime] = useState(new Date)
    let [notification, setNotification] = useState('')
    let [header, setHeader] = useState('Leave the class Early')
    let [ST_ID, setST_ID] = useState('')


    let [message, setMessage] = useState('')
    let [alert, setAlert] = useState(false)
    let [severity, setServerity] = useState('success')
    // let [myClasses, setMyClasses] = useState(null)
    let currentUser = null;
    
    

    useEffect(()=> {
        // const getClasses = async () => {
        //     const user = getUser()
        //     if (user != null){
        //         const res = await InstructorServices.getClasses(user.userID)
        //         setMyClasses(res.data)
        //         console.log("ins classes",res.data)
        //     }else{
        //         setAlert(true)
        //         setMessage('Something went wrong!')
        //         setServerity('error')
        //     }
        // }
        // getClasses()
    },[])

    let getUser = () => {
        currentUser = LocalStorageServices.getItem('user')
        console.log('lcoaluser', currentUser)
        return currentUser
    }
    
    let handleSubmit = async () => {
        // console.log(classes, header, notification)

        let msg = 'Your child leave the class early. '+(notification)+" | Date : "+moment(date).format('yyyy/MM/DD')+" | Time: "+moment(time).format('HH:mm A')


        let formData = new FormData();
        formData = {
            class_ID : 0,
            header : header,
            message : msg,
            ST_ID:ST_ID
        }

        console.log("Email",formData)
        const res = await NotificationServices.createEarlyLeaveNotification(formData)
        console.log("notification res",res)
        if (res.status < 300){
            setAlert(true)
            setMessage('Notification sent!')
            setServerity('success')
            HandleRefresh(1)
        }else if (res.status > 399){
            setAlert(true)
            setMessage(res.data.msg)
            setServerity('Cannot send notification!')
        }
    }

    let handleError = () => {
        console.log('error')
    }
    
    const handleRedirect = () => {
        setTimeout(() => {
            navigate ('/class/instructor/')
        }, 2000);
    }

    return ( 
        <Fragment>
            <MainContainer>
                <Card
                    sx={{p: 10, m:5, mx:10}}
                    elevation={6} 
                    className="px-main-card py-3" 
                    style={{backgroundColor:'#52aa9f'}}
                >
                    <Typography variant='h5'>Send Notification</Typography>
                </Card>
                <CustCard>
                    <ValidatorForm
                        onSubmit={handleSubmit}
                        onError={handleError}
                    >
                        <Grid
                            container
                        >
                            
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                lg={6}
                                sx={{p:5}}
                            >
                                <SubTitle title="Header" required/>
                                <TextValidator
                                    color='green'
                                    fullWidth 
                                    placeholder="Enter notification header"
                                    name="header"
                                    InputLabelProps={{
                                        shrink: false,
                                    }}
                                    value={
                                        header
                                    }
                                    disabled={false}
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => {
                                        setHeader(e.target.value)
                                    }}
                                    validators={[
                                        'required',
                                    ]}
                                    errorMessages={[
                                        'This field is required',
                                    ]}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                lg={6}
                                sx={{p:5}}
                            >
                                <SubTitle title="Student ID" required/>
                                <TextValidator
                                    color='green'
                                    fullWidth 
                                    placeholder="Enter student id"
                                    name="ST_ID"
                                    InputLabelProps={{
                                        shrink: false,
                                    }}
                                    value={
                                        ST_ID
                                    }
                                    disabled={false}
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => {
                                        setST_ID(e.target.value)
                                    }}
                                    validators={[
                                        'required',
                                    ]}
                                    errorMessages={[
                                        'This field is required',
                                    ]}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                lg={6}
                                sx={{p:5}}
                            >
                                <SubTitle title="Date" required/>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        color='green'
                                        // label=""
                                        // className="w-full"
                                        // fullWidth
                                        format="yyyy"
                                        // disablePast
                                        orientation="portrait"
                                        value={date}
                                        // views={['year']}
                                        onChange={(newValue) => {
                                            const newDate = newValue.toISOString();
                                            setDate(newDate);
                                            // console.log(newValue)
                                            console.log(newDate)
                                        }}
                                        renderInput={(params) => 
                                            <TextValidator
                                                color='green' 
                                                {...params}
                                                placeholder=""
                                                sx={{width: '100%'}}
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
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                lg={6}
                                sx={{p:5}}
                            >
                                <SubTitle title="Time" required/>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <MobileTimePicker
                                        // label="For mobile"
                                        // color='secondary'
                                        // minTime={dayjs('2018-01-01T06:00')}
                                        // maxTime={dayjs('2018-01-01T20:00')}
                                        value={time}
                                        onChange={(newValue) => {
                                            setTime(newValue.toISOString());
                                            console.log(newValue.toISOString());
                                        }}
                                        renderInput={(params) => 
                                            <TextValidator
                                                color='green' 
                                                {...params}
                                                placeholder=""
                                                sx={{width: '100%'}}
                                                value={time}
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
                                sm={12}
                                md={12}
                                lg={12}
                                sx={{p:5}}
                            >
                                <SubTitle title="Additional Message"/>
                                <TextValidator
                                    color='green'
                                    fullWidth
                                    multiline
                                    rows={4} 
                                    placeholder="Enter notification header"
                                    name="notification"
                                    InputLabelProps={{
                                        shrink: false,
                                    }}
                                    value={
                                        notification
                                    }
                                    disabled={false}
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => {
                                        setNotification(e.target.value)
                                    }}
                                    // validators={[
                                    //     'required',
                                    // ]}
                                    // errorMessages={[
                                    //     'This field is required',
                                    // ]}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                lg={6}
                                sx={{p:5}}
                            >
                                <SubTitle title="Message" required/>
                                <Typography>
                                    Your child leave the class early. <br/>
                                    {notification}
                                    <br/> Date : {moment(date).format('yyyy/MM/DD')}
                                    <br/> Time: {moment(time).format('hh:mm A')}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                sx={{pt:10, pr:5,display:'flex', justifyContent: 'end'}}
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
                                    endIcon ={<CampaignIcon/>}
                                    variant="contained"
                                    color="green"
                                    // onClick={handleSubmit}
                                >
                                    <span className="capitalize">
                                        Send
                                    </span>
                                </Button>
                            </Grid>
                        </Grid>
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
                </CustCard>
            </MainContainer>
        </Fragment>
    );
}

export default EarlyLeave;