import { Autocomplete, Button, Card, Grid, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
// import { Grades, Levels } from "../../appconst";
import CustCard from "../../components/CustCard";
import MainContainer from "../../components/MainContainer";
import SubTitle from "../../components/SubTitle";
import CustSnackbar from "../../components/CustSnackbar";

import CampaignIcon from '@mui/icons-material/Campaign';
import CloseIcon from '@mui/icons-material/Close';
import InstructorServices from "../../services/InstructorServices";
import NotificationServices from "../../services/NotificationServices";
import { useNavigate } from "react-router-dom";
import LocalStorageServices from "../../services/LocalStorageServices";


const Announcement = () => {

    const navigate = useNavigate();

    let [notification, setNotification] = useState('')
    let [header, setHeader] = useState('')
    let [classes, setClasses] = useState('')


    let [message, setMessage] = useState('')
    let [alert, setAlert] = useState(false)
    let [severity, setServerity] = useState('success')
    let [myClasses, setMyClasses] = useState(null)
    let currentUser = null;
    
    

    useEffect(()=> {
        const getClasses = async () => {
            const user = getUser()
            if (user != null){
                const res = await InstructorServices.getClasses(user.id)
                setMyClasses(res.data)
                console.log("ins classes",res.data)
            }else{
                setAlert(true)
                setMessage('Something went wrong!')
                setServerity('error')
            }
        }
        getClasses()
    },[])

    let getUser = () => {
        currentUser = JSON.parse(LocalStorageServices.getItem('user'))
        console.log('lcoaluser', currentUser)
        return currentUser
    }
    
    let handleSubmit = async () => {
        console.log(classes, header, notification)
        let formData = new FormData();
        formData = {
            class_ID : classes,
            header : header,
            message : notification
        }

        const res = await NotificationServices.createAnnoucement(formData)
        console.log("notification res",res)
        if (res.status < 300){
            setAlert(true)
            setMessage('Announcement sent!')
            setServerity('success')
            handleRedirect()
        }else if (res.status > 399){
            setAlert(true)
            setMessage(res.data.msg)
            setServerity('Cannot send annoucement!')
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
                    <Typography variant='h5'>Post Announcement</Typography>
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
                                            placeholder="Select classes which you wants to notify"
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
                                        }
                                    }}
                                    onInputChange={(e, newValue) => {
                                        if(newValue !== null){
                                            setClasses(newValue._id)
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                sx={{p:5}}
                            >
                                <SubTitle title="Message" required/>
                                <TextValidator
                                    color='green'
                                    fullWidth
                                    multiline
                                    rows={10} 
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

export default Announcement;