import { Autocomplete, Button, Card, CardHeader, CardMedia, Drawer, Grid, IconButton, Popper, SwipeableDrawer, Typography } from "@mui/material";
import { Fragment, useEffect, useRef, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { classTypes, Grades, Levels } from "../../appconst";
import CustCard from "../../components/CustCard";
import MainContainer from "../../components/MainContainer";
import SubTitle from "../../components/SubTitle";
import CustSnackbar from "../../components/CustSnackbar";
import coverImage from '../../assets/loginImg.jpg'

import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import MainContainerResponsive from "../../components/MainContainerResponsive";
import ClassServices from "../../services/ClassServices";
import { MagicSpinner } from "react-spinners-kit";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import FilterListIcon from '@mui/icons-material/FilterList';
import { WeekDays } from "../../appconst";

const Classes = () => {
    const navigate = useNavigate()
    
    const [loaded, setLoaded] = useState(false);
    const [view, setView] = useState(false);

    const [message, setMessage] = useState('')
    const [alert, setAlert] = useState(false)
    const [severity, setServerity] = useState('success')

    const [class_ID, setClass_ID] = useState('')
    const [ST_ID, setST_ID] = useState('')
    const [admission, setAdmission] = useState(true)
    const [amount, setAmount] = useState('')
    const [instructor, setInstructor] = useState('')
    const [grade, setGrade] = useState('')
    const [link, setLink] = useState(null)

    const [classTypeP,setClassTypeP] = useState(null)
    const [gradeP,setGradeP] = useState(null)
    const [levelP,setLevelP] = useState(null)
    const [day,setDay] = useState(null)

    const [classes, setClasses] = useState([])

    // const [loaded,SetLoaded] = useState(false)

    let user = useRef(null)
    
    useEffect(()=> {
        
        getData()

    },[])

    const getData = async () => {
        let params = {
            level : levelP,
            grade : gradeP,
            classType : classTypeP,
            day : day
        }
        console.log(params)
        setLoaded(false)
        const res = await ClassServices.getAllClasses4FE(params) 
        if(res.status == 200){
            setClasses(res.data.data)
            setLoaded(true)
        }
        console.log("all classes",res)
        user.current = localStorage.getItem('token')
        console.log("user",user.current)
    }

    const handleSubmit = async () => {
        var formData = new FormData();
        formData = {
            class_ID : class_ID,
            ST_ID : ST_ID,
            Admission : admission,
            Amount : amount,
            month : parseInt(moment(new Date()).format('MM')),
            Type: 'STU'
        }
        // console.log(formData)
        
        const res = await ClassServices.classPayment(formData)
        console.log("aaa",res)
        if (res.status < 300){
            window.location.replace(link);
            setView(false)
            setAlert(true)
            setMessage('Successfully registered to the class')
            setServerity('success')
            setAmount('')
            setClass_ID('')
            setInstructor('')
            setGrade('')
            
        }else if (res.status > 399){
            setAlert(true)
            setMessage('Cannot complete the class registration')
            setServerity('error')
        }
    }

    

    const toggleDrawer = (open, amount, classID, instructor, grade, paymentLink) => (event) => {
        setView(open);
        setAmount(amount)
        setClass_ID(classID)
        setInstructor(instructor)
        setGrade(grade)
        setLink(paymentLink)
    };
    
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
            <MainContainerResponsive>
                <ValidatorForm
                    onSubmit={()=>getData()}
                >
                    <Grid
                        container
                        spacing={2}
                        sx={{mx:5, mr:5}}
                    >
                        <Grid
                            item
                            xs={12}
                            md={6}
                            lg={2}
                            sx={{p:5}}
                        >
                            <SubTitle title="Level" />
                            <Autocomplete
                                color='green'
                                className="w-full"
                                options={Levels}
                                disabled={false}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => (
                                    <TextValidator
                                        color='green'
                                        {...params}
                                        // className=" w-full"
                                        placeholder="Select grade"
                                        value={levelP}
                                        disabled={false}
                                        InputLabelProps={{shrink: false}}
                                        type="text"
                                        variant="outlined"
                                        size="small"
                                        
                                    />
                                )}
                                onChange={(e, newValue) => {
                                    if(newValue !== null){
                                        setLevelP(newValue.value)
                                    }else {
                                        setLevelP(null)
                                    }
                                }}
                                onInputChange={(e, newValue) => {
                                    if(newValue !== null){
                                        setLevelP(newValue.value)
                                    }else {
                                        setLevelP(null)
                                    }
                                }}
                            />
                        </Grid> 
                        <Grid
                            item
                            xs={12}
                            md={6}
                            lg={2}
                            sx={{p:5}}
                        >
                            <SubTitle title="Grade" />
                            <Autocomplete
                                color='green'
                                className="w-full"
                                options={Grades}
                                disabled={false}
                                groupBy={(option) => option.level}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => (
                                    <TextValidator
                                        color='green'
                                        {...params}
                                        // className=" w-full"
                                        placeholder="Select grade"
                                        value={gradeP}
                                        disabled={false}
                                        InputLabelProps={{shrink: false}}
                                        type="text"
                                        variant="outlined"
                                        size="small"
                                        
                                    />
                                )}
                                onChange={(e, newValue) => {
                                    if(newValue !== null){
                                        setGradeP(newValue.value)
                                    }else {
                                        setGradeP(null)
                                    }
                                }}
                                onInputChange={(e, newValue) => {
                                    if(newValue !== null){
                                        setGradeP(newValue.value)
                                    }else {
                                        setGradeP(null)
                                    }
                                }}
                            />
                        </Grid> 
                        <Grid
                            item
                            xs={12}
                            md={6}
                            lg={2}
                            sx={{p:5}}
                        >
                            <SubTitle title="Class Type" />
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
                                        value={classTypeP}
                                        disabled={false}
                                        InputLabelProps={{shrink: false}}
                                        type="text"
                                        variant="outlined"
                                        size="small"
                                        
                                    />
                                )}
                                onChange={(e, newValue) => {
                                    if(newValue !== null){
                                        setClassTypeP(newValue.value)
                                    }else {
                                        setClassTypeP(null)
                                    }
                                }}
                                onInputChange={(e, newValue) => {
                                    if(newValue !== null){
                                        setClassTypeP(newValue.value)
                                    }else {
                                        setClassTypeP(null)
                                    }
                                }}
                            />
                        </Grid>        
                        <Grid
                            item
                            xs={12}
                            md={6}
                            lg={2}
                            sx={{p:5}}
                        >
                            <SubTitle title="Day" />
                            <Autocomplete
                                color='green'
                                className="w-full"
                                options={WeekDays}
                                disabled={false}
                                groupBy={(option) => option.type}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => (
                                    <TextValidator
                                        color='green'
                                        {...params}
                                        // className=" w-full"
                                        placeholder="Select day"
                                        value={gradeP}
                                        disabled={false}
                                        InputLabelProps={{shrink: false}}
                                        type="text"
                                        variant="outlined"
                                        size="small"
                                        
                                    />
                                )}
                                onChange={(e, newValue) => {
                                    if(newValue !== null){
                                        setDay(newValue.label)
                                    }else {
                                        setDay(null)
                                    }
                                }}
                                onInputChange={(e, newValue) => {
                                    if(newValue !== null){
                                        setDay(newValue.label)
                                    }else {
                                        setDay(null)
                                    }
                                }}
                            />
                        </Grid> 
                        <Grid
                            sx={{mt:10, pl:5}}
                        >
                            <Button 
                                type="submit"
                                color="green"
                                variant="contained"
                                startIcon={<FilterListIcon/>}
                            >
                                Filter
                            </Button>
                        </Grid>
                    </Grid>
                </ValidatorForm>
                <Grid
                    container
                >


                    {
                        classes.length > 0 && loaded ?
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
                                                    <Typography variant='h6' sx={{color:'#fff'}} >Grade {items.grade}</Typography>
                                                </Grid>
                                                <Grid
                                                    sx={{display:'flex', justifyContent:'center'}}
                                                >
                                                    <Typography variant='button'>{items.subject}</Typography> -
                                                    <Typography variant=''>{items.level}</Typography>
                                                </Grid>
                                            </Grid>
                                            <Typography></Typography>
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
                                                    {moment(items.startTime).format('HH:mm')}-{moment(items.endTime).format('HH:mm')} - Hall {items.hall}
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
                                        <Grid
                                            sx={{p:10, display:'flex', justifyContent:'center'}}
                                        >
                                            <Button 
                                                variant="contained" 
                                                color="green"
                                                onClick={
                                                    toggleDrawer(true, items.admission, items.id, items.instructor, items.grade, items.paymentLink)
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
                                        </Grid>


                                    </Card>
                                </Grid>
                            ))
                    : 
                        <Grid
                            sx={{m:10,display: 'flex', justifyContent:'center'}}
                        >
                            <Typography>
                                No classes based on your filter options
                            </Typography>
                        </Grid>
                    }
                    
                </Grid>
            </MainContainerResponsive>

            <Drawer
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
                                <Button 
                                    variant="contained" 
                                    type="submit"
                                    color="green" 
                                    startIcon={<HowToRegIcon/>}
                                >
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
            ></CustSnackbar>

        </Fragment>
    );
}

export default Classes;