import { Autocomplete, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Grid, Typography } from "@mui/material";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useParams } from "react-router-dom";
import { MagicSpinner, SphereSpinner } from "react-spinners-kit";
import { months } from "../../appconst";
import Table from "../../components/CustTable";
import MainContainer from "../../components/MainContainer";
import SubTitle from "../../components/SubTitle";
import InstructorServices from "../../services/InstructorServices";
import LocalStorageServices from "../../services/LocalStorageServices";
import CloseIcon from '@mui/icons-material/Close';
import PaymentsIcon from '@mui/icons-material/Payments';
import CustSnackbar from "../../components/CustSnackbar";
import ClassServices from "../../services/ClassServices";
import PaymentServices from "../../services/PaymentServices";

const InstructorPayments = () => {

    let param = useParams()
    
    const [user, setUser] = useState(null)
    const [filterYear, setFilterYear] = useState(null)
    const [data, setData] = useState([])
    const [data2, setData2] = useState([])
    const [totalPayment, setTotalPayment] = useState(null)
    const [amount, setAmount] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const [loaded2, setLoaded2] = useState(false)
    const [loaded3, setLoaded3] = useState(false)
    const [loaded4, setLoaded4] = useState(false)
    const [open, setOpen] = useState(false)
    const [paymentAmount, setPaymentAmount] = useState(null)
    const [instituteFee, setInstituteFee] = useState(null)
    const [insPayment, setInsPayment] = useState(null)

    let [message, setMessage] = useState('')
    let [alert, setAlert] = useState(false)
    let [severity, setServerity] = useState('success')


    const columns = [
        {
            accessorKey: 'month', 
            header: 'Month', 
            width : 50,
        },
        {
            accessorKey: 'amount', 
            header: 'Amount', 
            width : 50,
        },
    ]
    const columns2 = [
        {
            accessorKey: 'createdAt', 
            header: 'Payment Date', 
            width : 100,
            Cell: ({ cell }) => (
                <div>
                    {moment(cell.getValue()).format('yyyy-MM-DD')}
                </div>
            ),
        },
        {
            accessorKey: 'Amount', 
            header: 'Amount', 
            width : 100,
            Cell: ({ cell }) => (
                <div>
                    {(cell.getValue())}.00
                </div>
            ),
        },
    ]

    useEffect(()=>{
        getData()
        getInstitutePaymentData()
        console.log("PARAM",param.instructor_id)
    },[])

    const getData = async () => {
        const user = JSON.parse(LocalStorageServices.getItem("user"))
        setUser(user)
        let params = null
        if (user.userType != 5 && param.instructor_id == 0){
            if(filterYear === null){
                params = {
                    IN_ID : user.id,
                    year : moment().year()
                }
            }else {
                params = {
                    IN_ID : user.id,
                    year : filterYear
                }
            }
        }else {
            if(filterYear === null){
                params = {
                    IN_ID : param.instructor_id,
                    year : moment().year()
                }
            }else {
                params = {
                    IN_ID : param.instructor_id,
                    year : filterYear
                }
            }
        }
        let res = await InstructorServices.getClassFeesForInstructor(params)
        // setData(res.data.payments)
        setAmount(res.data.MonthlyAmount)
        
        let temp = [];

        for(let i = 0 ; i <12; i++){
            let tot = 0
            res.data.MonthlyAmount.map((x) => {
                tot += x.totalPayment[i] 
            })
            let obj = {
                month : months[i].label,
                amount : tot
            }
            console.log("TOT",obj)
            temp.push(obj)
        }
        console.log("TOT",temp)
        setData(temp)
        setLoaded(true)
    }

    const getInstitutePaymentData = async() => {
        const user =  JSON.parse(LocalStorageServices.getItem("user"))
        let insID = null
        if(user.userType == 5){
            insID = param.instructor_id
        }else{
            insID = user.id
        }
        let res = await PaymentServices.getInstitutePaymentsForInstructor(insID)
        console.log("INS PAYMENT",res)
        setData2(res.data)
        setLoaded4(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    
    const calculateInsPayment = () => {
        if(paymentAmount !== null && instituteFee !== null){
            setLoaded3(false)
            if(paymentAmount !== null && instituteFee !== null){
                let temp = parseInt(paymentAmount) - (parseInt(paymentAmount) * parseFloat(instituteFee) /100)
                setInsPayment(temp)
            }
            console.log(insPayment)
            setLoaded3(true)
        }else{
            setLoaded3(false)
        }
    }

    const payInstructor = async () => {
        setLoaded2(true)
        var formData = new FormData();
        formData = {
            class_ID : 0,
            ST_ID : 0,
            IN_ID : param.instructor_id,
            Admission : false,
            Amount : insPayment,
            month : 0,
            Type: 'INS'
        }
        console.log(formData)
        const res = await ClassServices.classPayment(formData)
        console.log("aaa",res)
        if (res.status < 300){
            handleClose()
            setAlert(true)
            setPaymentAmount(null)
            setInstituteFee(null)
            setInsPayment(null)
            setMessage('Payment successfull!')
            setServerity('success')
        }else if (res.status > 399){
            setAlert(true)
            setMessage('Payment unsuccessfull!')
            setServerity('error')
        }
        setLoaded2(false)
        setOpen(false)
    }



    return ( 
        <Fragment>
            <MainContainer>
                {loaded ?
                    <Grid 
                        container
                        spacing={5}
                        // item
                    >
                        <Grid
                            item
                            lg={6}
                        >
                            <Card elevation={6} sx={{p:10}}>
                                <Grid>
                                    <Typography
                                        variant="h6"
                                    >
                                        Received from Students
                                    </Typography>
                                </Grid>
                                <Table
                                    data={data}
                                    columns={columns}
                                />
                            </Card>
                        </Grid>
                        <Grid
                            item
                            lg={6}
                        >
                            <Card elevation={6} sx={{p:10}}>
                                <Grid>
                                    <Typography
                                        variant="h6"
                                    >
                                        Received from Institute
                                    </Typography>
                                </Grid>
                                <Grid>
                                    {loaded4 ?
                                        <Table
                                            data={data2}
                                            columns={columns2}
                                        />
                                    :null}
                                </Grid>
                            </Card>
                        </Grid>
                    </Grid>

                    
                    : 
                    
                    <Grid style={{display:'flex',alignItems:'center', position:"absolute", flexDirection:'row', textAlign:'center', flexWrap:'wrap'  }}
                        sx={{mt:50, ml:250}}
                    >
                        <MagicSpinner size={200} color="#008272" loading={true} />
                    </Grid>
                }
            </MainContainer>
            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <ValidatorForm
                    onSubmit={payInstructor}
                >
                    <DialogTitle>Instructor Payment</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                                <Grid>
                                <Grid
                                    // container
                                    // spacing={2}
                                    // sx={{mx:5, mr:5}}
                                >
                                    <Grid
                                        item
                                        xs={12}
                                        md={6}
                                        lg={3}
                                        sx={{p:5}}
                                    >
                                        <SubTitle title="Amount" required/>
                                            <TextValidator
                                                color='green'
                                                fullWidth 
                                                placeholder="Enter Payment Fee"
                                                InputLabelProps={{
                                                    shrink: false,
                                                }}
                                                value={
                                                    paymentAmount
                                                }
                                                disabled={false}
                                                type="text"
                                                variant="outlined"
                                                size="small"
                                                onChange={(e) => {
                                                    setPaymentAmount(e.target.value)
                                                    // calculateInsPayment()
                                                }}
                                                validators={[
                                                    'required',
                                                    'matchRegexp:^[+-]?[0-9]{1,10}(?:\.[0-9]{2})?$',
                                                    'minNumber:0'
                                                ]}
                                                errorMessages={[
                                                    'This field is required',
                                                    'Invalid amount',
                                                    'Only positive amounts are acceptable'
                                                ]}
                                            />
                                    </Grid> 
                                    <Grid
                                        item
                                        xs={12}
                                        md={6}
                                        lg={3}
                                        sx={{p:5}}
                                    >
                                        <SubTitle title="Institute Fee (%)" required/>
                                            <TextValidator
                                                color='green'
                                                fullWidth 
                                                placeholder="Enter percentage"
                                                InputLabelProps={{
                                                    shrink: false,
                                                }}
                                                value={
                                                    instituteFee
                                                }
                                                disabled={false}
                                                type="text"
                                                variant="outlined"
                                                size="small"
                                                onChange={(e) => {
                                                    setInstituteFee(e.target.value)
                                                    // calculateInsPayment()
                                                }}
                                                validators={[
                                                    'required',
                                                    'matchRegexp:^[+-]?[0-9]{1,2}(?:\.[0-9]{1,2})?$',
                                                    'minNumber:0',
                                                    'maxNumber:100'
                                                ]}
                                                errorMessages={[
                                                    'This field is required',
                                                    'Invalid percentage',
                                                    'Percentage should be greater than 0%',
                                                    'Percentage should be less than 100%'
                                                ]}
                                            />
                                    </Grid> 
                                    <Grid>
                                        <Button
                                            onClick={calculateInsPayment}
                                        >
                                            calculate
                                        </Button>
                                    </Grid>
                                    {loaded3 ? 
                                        <Grid
                                            item
                                            xs={12}
                                            md={6}
                                            lg={3}
                                            sx={{p:5}}
                                        >
                                            <SubTitle title="Instructor Payment" required/>
                                                <TextValidator
                                                    color='green'
                                                    fullWidth 
                                                    placeholder="Enter percentage"
                                                    InputLabelProps={{
                                                        shrink: false,
                                                    }}
                                                    value={
                                                        insPayment
                                                    }
                                                    disabled={false}
                                                    type="text"
                                                    variant="outlined"
                                                    size="small"
                                                    // onChange={(e) => {
                                                    //     setInstituteFee(e.target.value)
                                                    //     calculateInsPayment()
                                                    // }}
                                                    // validators={[
                                                    //     'required',
                                                    //     'matchRegexp:^[+-]?[0-9]{1,2}(?:\.[0-9]{1,2})?$',
                                                    //     'minNumber:0',
                                                    //     'maxNumber:100'
                                                    // ]}
                                                    // errorMessages={[
                                                    //     'This field is required',
                                                    //     'Admission fee is invalid',
                                                    //     'Percentage should be greater than 0%',
                                                    //     'Percentage should be less than 100%'
                                                    // ]}
                                                />
                                        </Grid> 
                                    : null}
                                </Grid>
                                </Grid>
                        </DialogContentText>
                    </DialogContent>
                    {loaded3 ? 
                        <DialogActions>
                            <Button 
                                type='submit' 
                                variant="contained"
                                color="green"
                                startIcon ={!loaded2 ? <PaymentsIcon/> : null}
                                disabled={loaded2}
                            >
                                {!loaded2 ? "Confirm Payment" : 
                                    <Grid sx={{width :'100px', display:'flex', justifyContent:'center'}}>
                                        <SphereSpinner color="#404040"/>
                                    </Grid>
                                    }
                            </Button>
                            <Button 
                                variant="contained"
                                color="red"
                                onClick={handleClose}
                                // type="cancel"
                                startIcon ={<CloseIcon/>}
                                disabled={loaded2}
                            >
                                Cancel
                            </Button>
                        </DialogActions>
                    : null}
                </ValidatorForm>
            </Dialog>

            {user!== null && user.userType == 5 ?
            <Grid
                sx={{
                    display:'flex',
                    justifyContent:'end',
                    mt:10,
                    position: 'fixed',
                    bottom: 30,
                    right: 16,
                }}
            >
                <Fab
                    // variant="contained"
                    variant="extended"
                    onClick={()=>{
                        setOpen(true)
                    }}
                    color="green"
                    startIcon={<PaymentsIcon/>}
                >
                    <PaymentsIcon/>&nbsp;Pay for instructor
                </Fab>
                    
            </Grid>
            : null }

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

export default InstructorPayments;