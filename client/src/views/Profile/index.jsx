import { Button, Divider, Grid, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import CustCard from "../../components/CustCard";
import MainContainer from "../../components/MainContainer";
import SubTitle from "../../components/SubTitle";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import UserServices from "../../services/UserServices";
import CustSnackbar from "../../components/CustSnackbar";

const Profile = () => {
    let [message, setMessage] = useState('')
    let [alert, setAlert] = useState(false)
    let [severity, setServerity] = useState('success')


    let [firstName,setFirstName] = useState('')
    let [lastName,setLastName] = useState('')
    let [contact,setContact] = useState('')
    let [email,setEmail] = useState('')
    let [password,setPassword] = useState('')
    let [verifyPassword,setVerifyPassword] = useState('')
    let [loaded,setLoaded] = useState(true)

    const handleSubmit = () => {
        
    }

    const getUserInfo = async () => {
        setLoaded(false)
        let res = await UserServices.userProfile()
        console.log("PROFILE", res)
        setData(res.data)

    }

    const setData = (userData)=> {
        setFirstName(userData.firstName)
        setLastName(userData.lastName)
        setContact(userData.contactNumber)
        setEmail(userData.email)
        setLoaded(true)
    }

    useEffect(()=>{
        getUserInfo()
    },[])

    return ( 
        <Fragment>
            <Grid>
                <ValidatorForm
                    onSubmit={handleSubmit}
                    onError={()=>console.log()}
                >
                    <MainContainer>
                        {loaded ?
                            <CustCard>
                                <Typography variant="h5">Profile</Typography>
                                <Divider/>
                                <Grid 
                                    sx={{display: 'flex', justifyContent:'center',mt:5}}
                                    container
                                >
                                    <Grid 
                                        item
                                    >
                                        <AccountCircleIcon
                                            // height="100px"
                                            // width="100px"
                                            sx={{
                                                height:"150px",
                                                width:"150px",
                                                color : '#909090'
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={12} sx={{mt:2}}>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={6}
                                        lg={4}
                                        sx={{p:5}}
                                    >
                                        <SubTitle title="First Name" />
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
                                        <SubTitle title="Last Name" />
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
                                        <SubTitle title="Contact Number" />
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
                                        <SubTitle title="Email Address" />
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
                                        <SubTitle title="Password" />
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
                                        <SubTitle title="Confirm Password" />
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
                                        sx={{p:5, display: 'flex', justifyContent:'center'}}
                                    >
                                        <Button 
                                            variant="contained"
                                            color="yellow"
                                            onClick={()=>{
                                                setAlert(true)
                                                setServerity('error')
                                                setMessage('Password mismatch')
                                            }}
                                        >
                                            Change Password
                                        </Button>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={12}
                                        sx={{p:5, display: 'flex', justifyContent:'center'}}
                                    >
                                        <Button 
                                            variant="contained"
                                            color="green"
                                            onClick={()=>{
                                                setAlert(true)
                                                setServerity('success')
                                                setMessage('Profile Updated!')
                                            }}
                                        >
                                            Update Profile
                                        </Button>
                                    </Grid>


                                </Grid>
                            </CustCard>
                        :null}
                    </MainContainer>
                </ValidatorForm>
            </Grid>

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

export default Profile;