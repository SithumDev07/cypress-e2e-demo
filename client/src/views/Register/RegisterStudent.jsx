import { Autocomplete, Box, Button, Card, Divider, FormControlLabel, Grid, Radio, RadioGroup, Tabs, Typography } from "@mui/material";
import React,{ Fragment, useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import { TextValidator,  ValidatorForm } from "react-material-ui-form-validator";
import SubTitle from "../../components/SubTitle";
import {Levels} from '../../appconst'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import CustCard from "../../components/CustCard";
import MainContainer from "../../components/MainContainer";
import CustSnackbar from "../../components/CustSnackbar";
import axios from 'axios'
import UserServices from "../../services/UserServices";

const RegisterStudent = () => {

    const navigate = useNavigate();

    let [firstName,setFirstName] = useState('')
    let [lastName,setLastName] = useState('')
    let [contact,setContact] = useState('')
    let [email,setEmail] = useState('')
    let [gender,setGender] = useState('')
    let [level,setLevel] = useState('')
    let [year,setYear] = useState(null)
    let [password,setPassword] = useState('')
    let [verifyPassword,setVerifyPassword] = useState('')

    let [message, setMessage] = useState('')
    let [alert, setAlert] = useState(false)
    let [severity, setServerity] = useState('success')

    let handleSubmit = async () => {
        var formData = new FormData()
    
        formData = {
            firstName : firstName,
            lastName : lastName,
            contactNumber : contact,
            email : email,
            gender : gender,
            level : level,
            year : year,
            password : password,
            userType:1
        }

        console.log(formData)

        if(password !== verifyPassword){
            setAlert(true)
            setMessage('Password mismatch')
            setServerity('error')
            console.log("TEST")
        }else{
            const res = await UserServices.createUser(formData)
            console.log("aaa",res)
            if (res.status < 300){
                setAlert(true)
                setMessage('User registration success')
                setServerity('success')
                handleRedirect()
            }else if (res.status > 399){
                setAlert(true)
                setMessage(res.data.msg)
                setServerity('error')
            }
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
            navigate ("/")
            console.log('timeout')
        }, 3000);
    }

    return ( 
        <Fragment>
            <ValidatorForm
                onSubmit={handleSubmit}
                onError={handleError}
            >
                <MainContainer>
                    <CustCard>
                    <Box style={{ width: '100%', backgroundColor:'#d5e2ed' }}>
                            <Tabs 
                                // value={value} 
                                // onChange={handleChange} 
                                centered
                            >
                                <Grid
                                    container
                                    style={{ display:"flex", justifyContent:'space-around'}}
                                >

                                    <Grid
                                        item
                                        sx={{mt:3}}
                                        >
                                        <Button 
                                            sx={{ml: 5}}
                                            progress={false}
                                            color="green"
                                            onClick={()=>{
                                                navigate('/register/student')
                                            }}
                                        >
                                            Student Registration
                                        </Button>
                                    </Grid>
                                    {/* <hr/> */}
                                    <Grid 
                                        sx={{mt:3}}
                                        item
                                    >
                                        <Button 
                                            sx={{ml: 5}}
                                            progress={false}
                                            color="green"
                                            onClick={()=>{
                                                navigate("/register/parent")
                                            }}
                                        >
                                            Parent Registration
                                        </Button>
                                    </Grid>
                                    
                                    {/* <Button>Parent Registration</Button> */}
                                </Grid>
                            </Tabs>
                        </Box>
                        <Typography variant="h5">Student Registration Form</Typography>
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
                                <SubTitle title="First Name" required/>
                                <TextValidator
                                    color='green'
                                    
                                    fullWidth 
                                    placeholder="Enter first name"
                                    name="firstName"
                                    InputLabelProps={{
                                        shrink: false,
                                    }}
                                    value={
                                        firstName
                                    }
                                    disabled={false}
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => {
                                        setFirstName(e.target.value)
                                    }}
                                    validators={[
                                        'required',
                                        'matchRegexp:^[A-Za-z]{1,40}$',
                                    ]}
                                    errorMessages={[
                                        'This field is required',
                                        'Name is invalid',
                                    ]}
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
                                <SubTitle title="Last Name" required/>
                                <TextValidator
                                    color='green'
                                    fullWidth 
                                    placeholder="Enter last name"
                                    name="lastName"
                                    InputLabelProps={{
                                        shrink: false,
                                    }}
                                    value={
                                        lastName
                                    }
                                    disabled={false}
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => {
                                        setLastName(e.target.value)
                                    }}
                                    validators={[
                                        'required',
                                        'matchRegexp:^[A-Za-z]{1,40}$',
                                    ]}
                                    errorMessages={[
                                        'This field is required',
                                        'Name is invalid',
                                    ]}
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
                                <SubTitle title="Contact Number" required/>
                                <TextValidator
                                    color='green'
                                    fullWidth 
                                    placeholder="Enter contact number"
                                    name="contact"
                                    InputLabelProps={{
                                        shrink: false,
                                    }}
                                    value={
                                        contact
                                    }
                                    disabled={false}
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => {
                                        setContact(e.target.value)
                                    }}
                                    validators={[
                                        'required',
                                        'matchRegexp:^[0-9]{10}$',
                                    ]}
                                    errorMessages={[
                                        'This field is required',
                                        'Contact number is invalid',
                                    ]}
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
                                <SubTitle title="Email Address" required/>
                                <TextValidator
                                    color='green'
                                    fullWidth 
                                    placeholder="Enter email address"
                                    name="email"
                                    InputLabelProps={{
                                        shrink: false,
                                    }}
                                    value={
                                        email
                                    }
                                    disabled={false}
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}
                                    validators={[
                                        'required',
                                        'matchRegexp:^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$',
                                    ]}
                                    errorMessages={[
                                        'This field is required',
                                        'Email is invalid',
                                    ]}
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
                                <SubTitle title="Gender"/>
                                <RadioGroup
                                    aria-labelledby="gender"
                                    name="gender"
                                    value={gender}
                                    onChange={(e) => {
                                        setGender(e.target.value)
                                    }}
                                    sx={{borderColor:'#bdbdbd', borderWidth:1, borderStyle:'solid', borderRadius: 1}}
                                    validators={[
                                        'required',
                                    ]}
                                    errorMessages={[
                                        'This field is required',
                                    ]}
                                >
                                    <Grid sx={{display:'flex', justifyContent:'center'}}>
                                        <FormControlLabel 
                                            value="male" 
                                            control={
                                                <Radio 
                                                    color="primary"
                                                />
                                            } 
                                            label="Male" 
                                        />
                                        <FormControlLabel 
                                            value="female" 
                                            control={
                                                <Radio 
                                                    color="red" 
                                                />
                                            } 
                                            label="Female" 
                                        />
                                    </Grid>
                                </RadioGroup>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                lg={4}
                                sx={{p:5}}
                            >
                                <SubTitle title="Level" required/>
                                <Autocomplete
                                    color='green'
                                    className="w-full"
                                    options={Levels}
                                    disabled={false}
                                    name="level"
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => (
                                        <TextValidator
                                            color='green'
                                            {...params}
                                            // className=" w-full"
                                            placeholder="Select examination level"
                                            value={level}
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
                                            setLevel(newValue.value)
                                        }
                                    }}
                                    onInputChange={(e, newValue) => {
                                        if(newValue !== null){
                                            setLevel(newValue.value)
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
                                <SubTitle title="Examination Year" required/>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        color='green'
                                        // label=""
                                        // className="w-full"
                                        // fullWidth
                                        format="MM"
                                        disablePast
                                        orientation="portrait"
                                        value={year}
                                        views={['year']}
                                        onChange={(newValue) => {
                                            // const newDate = moment(newValue).format('yyyy')
                                            setYear(newValue);
                                            // console.log(newValue)
                                            // console.log(newDate)
                                        }}
                                        renderInput={(params) => 
                                            <TextValidator
                                                color='green' 
                                                {...params}
                                                placeholder=""
                                                sx={{width: '100%'}}
                                                value={year}
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
                                lg={4}
                                sx={{p:5}}
                            >
                                <SubTitle title="Password" required/>
                                <TextValidator
                                    color='green'
                                    fullWidth 
                                    placeholder="Enter password"
                                    name="password"
                                    InputLabelProps={{
                                        shrink: false,
                                    }}
                                    value={
                                        password
                                    }
                                    disabled={false}
                                    type="password"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}
                                    validators={[
                                        'required',
                                        'matchRegexp:^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,20})',
                                    ]}
                                    errorMessages={[
                                        'This field is required',
                                        'Password is not strong enough',
                                    ]}
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
                                <SubTitle title="Confirm Password" required/>
                                <TextValidator
                                    color='green'
                                    fullWidth 
                                    placeholder="Enter password again"
                                    name="verifyPassword"
                                    InputLabelProps={{
                                        shrink: false,
                                    }}
                                    value={
                                        verifyPassword
                                    }
                                    disabled={false}
                                    type="password"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => {
                                        setVerifyPassword(e.target.value)
                                    }}
                                    validators={[
                                        'required',
                                        // 'isPasswordMatch',
                                    ]}
                                    errorMessages={[
                                        'This field is required',
                                        // 'Password mismatch',
                                    ]}
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
                            <Link
                                to='/'
                                style={{textDecoration:'none', color:'#fff'}}
                                // style={{textDecoration:'none'}}
                            >
                                <Button
                                    progress={false}
                                    type="cancel"
                                    startIcon ={<CloseIcon/>}
                                    variant="contained"
                                    color="red"
                                    onClick={ () =>
                                        navigate("/")
                                    }
                                >
                                    <span className="capitalize">
                                        Cancel
                                    </span>
                                </Button>
                            </Link>
                            
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

export default RegisterStudent;