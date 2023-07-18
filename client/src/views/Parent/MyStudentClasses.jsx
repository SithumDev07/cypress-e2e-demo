import {  Button, Card,  Grid, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import MainContainer from "../../components/MainContainer";
import coverImage from '../../assets/loginImg.jpg'

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
// import MainContainer from "../../components/MainContainer";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import ClassServices from "../../services/ClassServices";
import LocalStorageServices from "../../services/LocalStorageServices";

const MyClasses = () => {
    const navigate = useNavigate()
    
    const [loaded, setLoaded] = useState(false);
    const [loaded2, setLoaded2] = useState(false);

    // let [message, setMessage] = useState('')
    // let [alert, setAlert] = useState(false)
    // let [severity, setServerity] = useState('success')
    let [user, setUser] = useState(null)
    let [stuId, setStuId] = useState(null)

    const [classes, setClasses] = useState([])

    const getUserInfo = () => {
        setLoaded2(false)
        setUser(JSON.parse(LocalStorageServices.getItem('user')))
        setStuId(JSON.parse(LocalStorageServices.getItem('myStudent')))
        console.log("mystu",LocalStorageServices.getItem('myStudent'))
        setLoaded2(true)
        if(loaded2){
            getData() 
        }
    }
    
    const getData = async () => {
        setLoaded(false)
        let res = null
        if(user.userType == 1){
            res = await ClassServices.myClasses(user.id) 
        } else {
            if(stuId != null){
                res = await ClassServices.myClasses(stuId.replace(/"|'/g,'')) 
            }
        }
        console.log("all classes",res)
        if(res.status == 200){
            setClasses(res.data.studentMyClasses)
            setLoaded(true)
        }
        // user.current = localStorage.getItem('token')
        // console.log("user",user.current)
    }

    useEffect(()=> {

        getUserInfo()
        

    },[stuId])

    // const [class_ID, setClass_ID] = useState('')
    // const [ST_ID, setST_ID] = useState('')
    // const [admission, setAdmission] = useState(true)
    // const [amount, setAmount] = useState('')
    // const [instructor, setInstructor] = useState('')
    // const [grade, setGrade] = useState('')

    // const handleSubmit = async () => {
    //     var formData = new FormData();
    //     formData = {
    //         class_ID : class_ID,
    //         ST_ID : ST_ID,
    //         Admission : admission,
    //         Amount : amount,
    //         month : parseInt(moment(new Date()).format('MM')),
    //         Type: 'STU'
    //     }
    //     // console.log(formData)

    //     const res = await ClassServices.classPayment(formData)
    //     console.log("aaa",res)
    //     if (res.status < 300){
    //         setAlert(true)
    //         setMessage('Successfully registered to the class')
    //         setServerity('success')
    //         setAmount('')
    //         setClass_ID('')
    //         setInstructor('')
    //         setGrade('')
    //     }else if (res.status > 399){
    //         setAlert(true)
    //         setMessage('Cannot complete the class registration')
    //         setServerity('error')
    //     }
    // }

    

    // const toggleDrawer = (open, amount, classID, instructor, grade) => (event) => {
    //     setView(open);
    //     setAmount(amount)
    //     setClass_ID(classID)
    //     setInstructor(instructor)
    //     setGrade(grade)
    // };
    
    // const [anchorEl, setAnchorEl] = useState(null);

    // const handleClick = (event) => {
    //     console.log(event)
    //     event.screenX = 0
    //     event.screenY = 0
    //     setAnchorEl(event.currentTarget);
    // };

    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    // const open = Boolean(anchorEl);
    // const id = open ? 'simple-popover' : undefined;


    return ( 
        <Fragment>
            <MainContainer>
                <Grid
                    container
                >
                    {loaded2 ?
                        classes.map((items) => (
                            <Grid
                                sx={{display:'flex'}}
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={4}
                            >
                                
                                <Card
                                    sx={{ m:10}}
                                    elevation={6}
                                    style={{
                                        backgroundImage: `linear-gradient(to bottom, rgb(100, 208, 194),rgb(100, 208, 194), rgb(0, 130, 114), rgb(0, 130, 114), rgb(0, 53, 46))`,
                                        // backgroundColor:'#52aa9f'
                                    }}
                                >
                                    <img
                                        src={coverImage}
                                        alt='asd'
                                        height='200px'
                                        width='500px'
                                    />
                                    <Grid
                                        sx={{p:'10px'}}
                                    >
                                        <Typography variant='h5' sx={{color:'#fff'}}>{items.instructor}</Typography>
                                        <Grid
                                            sx={{
                                                // display:'flex', 
                                                // justifyContent:'space-around', 
                                                pl:'5px',
                                                pt:'5px'
                                            }}
                                        >
                                            <Grid
                                                sx={{display:'flex', justifyContent:'center'}}
                                            >
                                                <Typography variant='h6' sx={{color:'#fff'}} >Grade {items.grade} - {items.classType}</Typography>
                                            </Grid>
                                            <Grid
                                                sx={{display:'flex', justifyContent:'center'}}
                                            >
                                                <Typography variant='button'>{items.subject}</Typography> -
                                                <Typography variant=''>{items.level}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid
                                            sx={{
                                                display:'flex', 
                                                justifyContent:'space-around', 
                                                width : '100%',
                                                pt:10
                                            }}
                                        >
                                            <Button variant="contained" color="white"  onClick={() => {
                                                const class_ID = items.class_ID
                                                const ST_ID1 = user.id
                                                const ST_ID2 = stuId
                                                // console.log()
                                                if(user.userType == 1){
                                                    navigate('/results/'+class_ID+"/"+ST_ID1) 
                                                } else {
                                                    navigate('/results/'+class_ID+"/"+ST_ID2) 
                                                }
                                            }}>
                                                Progress
                                            </Button>
                                            <Button variant="contained" color="white" onClick={() => {
                                                const id = items.class_ID
                                                // console.log()
                                                if(user.userType == 1){
                                                    navigate('/class/dashboard/'+id) 
                                                } else {
                                                    navigate('/parent/classPayments/'+id) 
                                                }
                                            }}>
                                                Payments
                                            </Button>
                                            <Button variant="contained" color="white" onClick={() => {
                                                const class_ID = items.class_ID
                                                const ST_ID = stuId
                                                console.log(class_ID, ST_ID)
                                                if(user.userType == 1){
                                                    // navigate('/class/dashboard/'+id) 
                                                } else {
                                                    navigate('/StudentAttendance/'+class_ID+'/'+ST_ID) 
                                                }
                                            }}>
                                                Attendance
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        sx={{mt:3,display:'flex', justifyContent:'center', pt:'10px' }}
                                    >
                                        <Grid
                                            xs={12}
                                            sx={{display:'flex', justifyContent:'center', border:1, borderTopLeftRadius:'4px', borderBottomLeftRadius:'4px', p:3}}
                                        >
                                            <AccessAlarmIcon sx={{color:'#fff'}} />
                                            <Typography 
                                                sx={{pl:4, color:'#fff'}} 
                                                variant='button'
                                            >
                                                {moment(items.startTime).format('HH:mm')}-{moment(items.endTime).format('HH:mm')}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            xs={12}
                                            sx={{
                                                display:'flex', 
                                                justifyContent:'center', 
                                                border:1, 
                                                borderTopRightRadius:'4px', 
                                                borderBottomRightRadius:'4px', 
                                                p:3,
                                                // pl:8
                                            }}
                                        >
                                            <CalendarMonthIcon sx={{color:'#fff'}} />
                                            <Typography sx={{pl:4, color:'#fff'}} variant='button'>{items.classDate}</Typography>
                                        </Grid>
                                    </Grid>
                                    {/* <Grid
                                        sx={{p:10, display:'flex', justifyContent:'center'}}
                                    >
                                        <Button 
                                            variant="contained" 
                                            color="green"
                                            onClick={
                                                toggleDrawer(true, items.admission, items.class_ID, items.instructor, items.grade)
                                                // ()=>{
                                                //     if(user.current != null){
                                                //         console.log(user)
                                                //     }else {
                                                //         setAlert(true)
                                                //         setMessage('First login to the system inorder to register classes')
                                                //         setServerity('error')
                                                //     }
                                                // }
                                                // }?
                                                // console.log('payment info', (items.class_ID),(items.admission),JSON.parse(localStorage.getItem('user')).userID)
                                                // navigate("/class/" + (items.class_ID) + "/userID/" + JSON.parse(localStorage.getItem('user')).userID)
                                            }
                                        >
                                            <Typography 
                                                sx={{color:'#fff'}} 
                                                variant='button'
                                            >
                                                Register
                                            </Typography>
                                        </Button>
                                    </Grid> */}


                                </Card>

                            </Grid>
                        ))
                        : null
                    }
                    
                </Grid>
            </MainContainer>

            {/* <Drawer
                anchor={'bottom'}
                open={view}
                onClose={toggleDrawer(false)}
            >
                <Grid
                    sx={{p:10, px:20}}
                >
                    <ValidatorForm
                        onSubmit={handleSubmit}
                    >
                        <Grid
                            container
                            spacing={2}
                        >
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                sx={{display: 'flex', justifyContent: 'flex-end'}}
                            >
                                <IconButton
                                    onClick={toggleDrawer(false)}
                                >
                                    <CloseIcon color="white" style={{backgroundColor : 'red', borderRadius : '50%'}}/>
                                </IconButton>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={6}
                                lg={4}
                                sx={{p:5}}
                            >
                                <SubTitle title="Instructor" required/>
                                <TextValidator
                                    // placeholder="Enter your student number"
                                    name="studentNumber"
                                    color="green"
                                    sx={{width:'100%'}}
                                    InputLabelProps={{
                                        shrink: false,
                                    }}
                                    value={
                                        instructor
                                    }
                                    disabled={true}
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => {
                                        setAmount(e.target.value)
                                    }}
                                    validators={[
                                        'required',
                                        // 'matchRegexp:^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$',
                                    ]}
                                    errorMessages={[
                                        'Amount is required',
                                        // 'Enter valid email',
                                    ]}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={6}
                                lg={4}
                                sx={{p:5}}
                            >
                                <SubTitle title="Grade" required/>
                                <TextValidator
                                    // placeholder="Enter your student number"
                                    name="studentNumber"
                                    color="green"
                                    sx={{width:'100%'}}
                                    InputLabelProps={{
                                        shrink: false,
                                    }}
                                    value={
                                        grade
                                    }
                                    disabled={true}
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => {
                                        setAmount(e.target.value)
                                    }}
                                    validators={[
                                        'required',
                                        // 'matchRegexp:^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$',
                                    ]}
                                    errorMessages={[
                                        'Amount is required',
                                        // 'Enter valid email',
                                    ]}
                                />
                            </Grid>
                            
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={6}
                                lg={4}
                            >
                                <SubTitle title="Admission Fee" required/>
                                <TextValidator
                                    // placeholder="Enter your student number"
                                    name="studentNumber"
                                    color="green"
                                    sx={{width:'100%'}}
                                    InputLabelProps={{
                                        shrink: false,
                                    }}
                                    value={
                                        amount
                                    }
                                    disabled={true}
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => {
                                        setAmount(e.target.value)
                                    }}
                                    validators={[
                                        'required',
                                        // 'matchRegexp:^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$',
                                    ]}
                                    errorMessages={[
                                        'Amount is required',
                                        // 'Enter valid email',
                                    ]}
                                />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={6}
                                lg={4}
                                sx={{p:5}}
                            >
                                <SubTitle title="Student ID" required/>
                                <TextValidator
                                    placeholder="Enter your student number"
                                    name="studentNumber"
                                    color="green"
                                    sx={{width:'100%'}}
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
                                        // 'matchRegexp:^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$',
                                    ]}
                                    errorMessages={[
                                        'Student ID number is required',
                                        // 'Enter valid email',
                                    ]}
                                />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                sx={{display:'flex', justifyContent:'end'}}
                            >
                                <Button variant="contained" type="submit" color="green" startIcon={<HowToRegIcon/>}>
                                    Register
                                </Button>
                            </Grid>
                        </Grid>
                    </ValidatorForm>
                </Grid>
            </Drawer>

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
            ></CustSnackbar> */}

        </Fragment>
    );
}

export default MyClasses;