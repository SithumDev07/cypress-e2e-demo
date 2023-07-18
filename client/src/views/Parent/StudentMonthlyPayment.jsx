import * as React from 'react';
import { AppBar, Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, List, ListItem, ListItemText, Slide, Toolbar, Typography} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import LocalStorageServices from "../../services/LocalStorageServices";
import MainContainer from "../../components/MainContainer";
// import ParentServices from "../../services/ParentServices";
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ClassServices from "../../services/ClassServices";
import moment from "moment";
import { ImpulseSpinner, MagicSpinner, MetroSpinner } from "react-spinners-kit";
import Table from "../../components/CustTable";
import CustCard from "../../components/CustCard";
import { useParams } from "react-router-dom";

import PaymentIcon from '@mui/icons-material/Payment';
import CloseIcon from '@mui/icons-material/Close';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { months } from '../../appconst';
import SubTitle from '../../components/SubTitle';
import CustSnackbar from '../../components/CustSnackbar';


const StudentMonthlyPayment = () => {
    let navigate; 

    let {classId} = useParams()
    let [studentId, setStudentId] = useState(null)
    let [paymentDetails, setPaymentDetails] = useState()
    let [classInfo, setClassInfo] = useState(null)
    let [instructor, setInstructor] = useState([])
    let [loaded, setLoaded] = useState(false)
    let [loaded2, setLoaded2] = useState(false)
    let arr = paymentDetails || []


    let [message, setMessage] = useState('')
    let [alert, setAlert] = useState(false)
    let [severity, setServerity] = useState('success')

    let [month, setMonth] = useState(null)

    const [open, setOpen] = useState(false);

    useEffect(()=> {
        setStudentId(localStorage.getItem('myStudent').replace(/"|'/g,''))
        getMonthlyPaymentsOfStudent()
    },[studentId,message])

    const getMonthlyPaymentsOfStudent = async () => {
        setLoaded(false)
        console.log("details",classId,studentId)
        let res = await ClassServices.getMonthlyPaymentsOfStudent(classId,studentId)
        setInstructor(res.data.instructorInfo)
        setClassInfo(res.data.classInfo)
        setPaymentDetails(res.data.payments)
        console.log("class payment",instructor)
        setLoaded(true)
    }

    const handlePayment = async () => {
        setLoaded2(true)
        var formData = new FormData();
        formData = {
            class_ID : classId,
            ST_ID : studentId,
            Admission : false,
            Amount : classInfo.classFee,
            month : month,
            Type: 'STU'
        }
        console.log(formData)

        const res = await ClassServices.classPayment(formData)
        console.log("aaa",res)
        if (res.status < 300){
            handleClose()
            setMonth(null)
            setAlert(true)
            setMessage('Successfully registered to the class')
            setServerity('success')
        }else if (res.status > 399){
            setAlert(true)
            setMessage('Cannot complete the class registration')
            setServerity('error')
        }
    }

    // const Transition = React.forwardRef(function Transition(props, ref) {
    //     return <Slide direction="up" ref={ref} {...props} />;
    // });

    const handleClickOpen = () => {
        console.log("open")
        setOpen(true);
        setMonth(null);
    };
    
    const handleClose = () => {
        console.log("close")
        setOpen(false);
        setLoaded2(false)
    };

    const columns = [
        { 
            accessorKey: 'month', 
            header: 'Month', 
            width : 130,
            Cell: ({ cell }) => (
                <div 
                    style={{
                        // display:'flex', 
                        // justifyContent:'center'
                    }}
                >
                    {months.map((m) => {
                        console.log(cell.getValue())
                        if(cell.getValue() == m.value){
                            return m.label
                        }
                    })}
                </div>
            ),
        },
        { 
            accessorKey: 'createdAt', 
            header: 'Payment Date', 
            width : 130,
            Cell: ({ cell }) => (
                <div>
                    {moment(cell).format('yyyy/MM/DD')}
                </div>
            ),
        },
        { 
            accessorKey: 'Amount', 
            header: 'Amount', 
            width : 130,
        },
        { 
            accessorKey: 'Type', 
            header: 'Payment method', 
            width : 130,
        },
    ]

    return ( 
        <Fragment>
            <MainContainer>
                <Grid
                    // container
                >
                    <CustCard>
                        <Grid
                            sx={{display:'flex', justifyContent:'space-around'}}
                        >
                            {(instructor != null)?
                                <Typography variant='h6'>{instructor.firstName} {instructor.lastName}</Typography>
                                : null
                            }
                            
                            {(classInfo != null)?
                                <Typography variant='h5'>Payment amount : Rs.{classInfo.classFee}/=</Typography>
                                // <Typography variant='h6'>{classInfo.classDate}</Typography>
                                : null
                            }
                        </Grid>
                    </CustCard>
                    <CustCard>
                        <Grid
                            style={{display:"flex", justifyContent:'space-between', marginBottom:'10px'}}
                        >   
                            <Typography variant="h6">Monthly Payment</Typography>
                            <Button
                                variant="contained"
                                startIcon={<PaymentIcon/>}
                                onClick={()=>handleClickOpen()}
                            >
                                Pay class Fee
                            </Button>
                        </Grid>
                        <Divider/>
                        <Grid
                            sx={{p:10}}
                        >
                            {loaded ?
                                (<Table
                                    data={arr}
                                    columns={columns}
                                    // pageSize={5}
                                    // color="green"
                                    // rowsPerPageOptions={[5]}
                                    // getRowId={(rows)=>rows._id}
                                />)
                            :
                                <Grid style={{display:'flex',alignItems:'center', position:"absolute", flexDirection:'row', textAlign:'center', flexWrap:'wrap'  }}
                                    sx={{mt:50, ml:250}}
                                >
                                    {/* <CustCard> */}
                                        <MagicSpinner size={200} color="#008272" loading={true} />
                                    {/* </CustCard> */}
                                </Grid>
                            }   
                        </Grid>

                    </CustCard>               
                </Grid>
            </MainContainer>
            <Dialog
                // fullScreen
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                // TransitionComponent={Transition}
            >
                <DialogTitle id="alert-dialog-title">
                    <Toolbar>
                        <Typography sx={{ ml: 5, flex: 1 }} variant="h6" component="div">
                            Monthly Payment
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={()=>handleClose()}
                            aria-label="close"
                        >
                            <CloseIcon color='error'/>
                        </IconButton>
                    </Toolbar>
                    <Divider/>
                </DialogTitle>

                <ValidatorForm
                    onSubmit={()=>handlePayment()}
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <Grid>
                                <SubTitle title="month" required/>
                                <Grid
                                    xs={12}
                                    sm={12}
                                    md={6}
                                    lg={6}
                                    sx={{display:'flex', justifyContent:'center'}}
                                >
                                    <Autocomplete
                                        color='green'
                                        className="w-full"
                                        style={{width:'100%'}}
                                        options={months}
                                        disabled={false}
                                        name="level"
                                        getOptionLabel={(option) => option.label}
                                        renderInput={(params) => (
                                            <TextValidator
                                                color='green'
                                                {...params}
                                                className=" w-full"
                                                placeholder="Select payment month"
                                                value={month}
                                                disabled={false}
                                                InputLabelProps={{shrink: false}}
                                                type="text"
                                                variant="outlined"
                                                size="small"
                                                validators={[
                                                    'required',
                                                ]}
                                                errorMessages={[
                                                    'Payment month is required',
                                                ]}
                                            />
                                        )}
                                        onChange={(e, newValue) => {
                                            if(newValue !== null){
                                                setMonth(newValue.value)
                                            }
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Grid
                            container
                            spacing={2}
                            style={{margin:'10px', marginLeft:'80px', marginRight:'80px'}}
                            sx={{display:'flex', justifyContent:'space-around'}}
                        >
                            {loaded2 ? 
                            <Grid
                                sx={{my:10}}
                            >
                                <MetroSpinner color="#008272"/> 
                            </Grid>
                            :
                            <>
                                {/* <ImpulseSpinner/> */}
                                <Grid
                                    item
                                    >
                                    <Button 
                                        variant='contained'
                                        type='submit'
                                        // onClick={()=>{handlePayment()}}
                                        startIcon={<PaymentIcon/>}
                                        color='green'
                                    >
                                        Pay Fee
                                    </Button>
                                </Grid>
                                <Grid
                                    item
                                >
                                    <Button 
                                        variant='contained'
                                        color='red'
                                        startIcon={<CloseIcon/>}
                                        onClick={handleClose}
                                        >
                                        Cancel
                                    </Button>
                                </Grid>
                            </>
                            }
                            
                        </Grid>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>

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

export default StudentMonthlyPayment;