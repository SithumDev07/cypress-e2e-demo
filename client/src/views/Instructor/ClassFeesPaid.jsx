import { Fragment, useEffect, useState } from "react";
import MainContainer from "../../components/MainContainer";
import InstructorServices from "../../services/InstructorServices";
import LocalStorageServices from "../../services/LocalStorageServices";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AppBar, Autocomplete, Button, Card, Grid, Tab, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs } from "@mui/material";
import SubTitle from "../../components/SubTitle";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import moment from "moment";
import Table from "../../components/CustTable";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FilterListIcon from '@mui/icons-material/FilterList';
import { ImpulseSpinner, MagicSpinner, StageSpinner } from "react-spinners-kit";
import ReactEcharts from "echarts-for-react"
import { useNavigate, useParams } from "react-router-dom";
import PaymentsIcon from '@mui/icons-material/Payments';

const ClassFeesPaidMonthly = () => {
    
    const param = useParams()
    const navigate = useNavigate()

    const [user, setUser] = useState(null)
    const [data, setData] = useState([])
    const [data2, setData2] = useState(null)
    const [data3, setData3] = useState(null)
    const [legend3, setLegend3] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [loaded2, setLoaded2] = useState(false)
    const [selected, setSelected] = useState(null)
    const [amount, setAmount] = useState(null)
    const [totalPayment, setTotalPayment] = useState(null)
    const [filterYear, setFilterYear] = useState(null)
    const [activeTab, setActiveTab] = useState(0)

    const columns = [
        { 
            accessorKey: 'ST_ID', 
            header: 'Student ID', 
            width : 200,
        },
        { 
            accessorKey: 'Type', 
            header: 'Name', 
            width : 150
        },
        { 
            accessorKey: 'Amount', 
            header: 'Amount',
            width : 150
        },
        { 
            accessorKey: 'createdAt', 
            header: 'Payment Date', 
            width : 150,
            Cell: ({ cell }) => (
                <div style={{display:'flex', justifyContent:'center'}}>
                    {/* adas */}
                    {moment(cell.getValue()).format('yyyy-MM-DD HH:mm:ss')}
                    {/* (value) */}
                </div>
        // }
            ),
        },
    ];


    useEffect(()=>{
        getData()
        console.log("PARAM",param.instructor_id)
    },[])

    const getData = async () => {
        const user = JSON.parse(LocalStorageServices.getItem("user"))
        setUser(user)
        setLoaded(false)
        // setSelected(null)
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
        setData(res.data.payments)
        // setData2(res.data.MonthlyAmount)
        setAmount(res.data.MonthlyAmount)
        setLoaded(true)
        console.log("GET DATA",res)
        setGraph2()
        // console.log("GET DATA",params)
    }

    const setGraph = (id) => {
        console.log("data22",amount)
        amount.map(x=>{
            if(x.class_ID == id){
                setData2(x)
            }
        })
        console.log("data2",data2)
    } 
    const setGraph2 = () => {
        console.log("data22",amount)
        let tempData = []
        let tempLegend = []
        if(amount !== null){
            amount.map(x=>{
                let temp = {
                    name: x.grade + " "+ x.classType,
                    type: 'bar',
                    barGap: 0,
                    // label: labelOption,
                    emphasis: {
                        focus: 'series'
                    },
                    data: x.totalPayment
                }
                tempLegend.push(x.grade + " " +x.classType)
                tempData.push(temp)
            })
        }
        setData3(tempData)
        console.log("data222",tempData)
        setLegend3(tempLegend)
        setLoaded2(true)

        let tempFA = 0
        tempData.map((x)=>{
            tempFA += x.data.reduce((a, b) => a + b, 0)
        })
        setTotalPayment(tempFA)
    } 
    
    return ( 
        <Fragment>
            <MainContainer>
                <AppBar position="static" color="default" className="mb-4 mt-2">
                    <Grid item lg={12} md={12} xs={12}>
                        <Tabs style={{ minHeight: 39, height: 26 }}
                            indicatorColor="primary"
                            variant='fullWidth'
                            textColor="primary"
                            value={activeTab}
                            onChange={(event, newValue) => {
                                // console.log(newValue)
                                setGraph2()
                                setActiveTab(newValue)
                            }} >

                            <Tab label={<span className="font-bold text-12">DETAILED</span>} />
                            <Tab label={<span className="font-bold text-12">ALL CLASSES</span>} />
                        </Tabs>
                    </Grid>
                </AppBar>



                {activeTab == 0 ?
                    <Grid>
                        <ValidatorForm>
                            <Card>
                                <Grid
                                    container
                                    spacing={5}
                                    sx={{p:10}}
                                >
                                        <Grid
                                            xs={12}
                                            sx={{p:5, display:'flex', justifyContent:'center'}}
                                        >
                                            <Typography variant="h4">Class Payments</Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            sm={6}
                                            md={6}
                                            lg={4}
                                            sx={{p:5}}
                                        >
                                            <SubTitle title="Class" required/>
                                            <Autocomplete
                                                color='green'
                                                className="w-full"
                                                options={data}
                                                disabled={false}
                                                disableClearable
                                                name="class"
                                                getOptionLabel={(option) => "Grade "+option.grade}
                                                renderInput={(params) => (
                                                    <TextValidator
                                                        color='green'
                                                        {...params}
                                                        // className=" w-full"
                                                        placeholder="Select class"
                                                        value={selected}
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
                                                    setSelected(newValue.paidStudents)
                                                    setGraph(newValue.class_ID)
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
                                            <SubTitle title="Year"/>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    color='green'
                                                    // label=""
                                                    // className="w-full"
                                                    // fullWidth
                                                    // format="MM"
                                                    orientation="portrait"
                                                    value={filterYear}
                                                    views={['year']}
                                                    onChange={(newValue) => {
                                                        const temp = moment(newValue.$d).format('yyyy')
                                                        setFilterYear(temp);
                                                        // setLoaded(false)
                                                        // getData()
                                                        console.log(newValue)
                                                        console.log(temp)
                                                    }}
                                                    renderInput={(params) => 
                                                        <TextValidator
                                                            color='green' 
                                                            {...params}
                                                            placeholder=""
                                                            sx={{width: '100%'}}
                                                            value={filterYear}
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
                                            sx={{p:5, mt:8}}
                                            >
                                            <Button
                                                startIcon={<FilterListIcon/>}
                                                color="green"
                                                variant="contained"
                                                onClick={()=>{
                                                    // getData()
                                                    // setLoaded(false)
                                                }}
                                            >
                                                Filter
                                            </Button>
                                        </Grid>
                                </Grid>
                            </Card>
                            <Grid>
                                    {(data2 != null ? 
                                        <Card
                                            sx={{display:'flex',justifyContent:'center', background:'#bfdfdb'}}
                                        >
                                            <Grid>
                                                <Typography variant="h6">Monthly Payments</Typography>
                                                <ReactEcharts
                                                    option={{
                                                        
                                                        // grid: { top: 20, right: 40, bottom: 20, left: 40 },
                                                        xAxis: {
                                                            type: "category",
                                                            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                                                        },
                                                        yAxis: {
                                                            type: "value"
                                                        },
                                                        series: [
                                                            {
                                                                data: data2.totalPayment,
                                                                type: "bar",
                                                                smooth: true,
                                                                color:['#008272']
                                                            }
                                                        ],
                                                        tooltip: {
                                                            trigger: "axis"
                                                        }
                                                    }}
                                                    style={{ width: "600px", height: "300px" }}
                                                ></ReactEcharts>
                                            </Grid>
                                        </Card>
                                    : null)}
                                </Grid>
                        </ValidatorForm>
                        {selected !== null ?
                            // console.log(x)
                            selected.map((x,index)=>(
                                <Grid container>
                                    <Grid
                                        container
                                            
                                    >
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                                variant="outlined"
                                                sx={{background:'#BFDFDB'}}
                                                >
                                                <Grid
                                                    sx={{ml:20}}
                                                    >
                                                    <Typography sx={{color:'#008272'}} variant="h6">{moment((index+1).toString()).format('MMMM')}</Typography>
                                                </Grid>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Grid
                                                    sx={{width:"94vw", background:'#cac6c6'}}
                                                    // sx={{background:'#BFDFDB'}}
                                                >
                                                    <Table
                                                        data={x}
                                                        columns={columns}
                                                    />
                                                </Grid>
                                            </AccordionDetails>
                                        </Accordion>
                                    </Grid>
                                </Grid>
                            ))
                    
                        : 
                        <Grid style={{display:'flex',alignItems:'center', position:"absolute", flexDirection:'row', textAlign:'center', flexWrap:'wrap'  }}
                            sx={{mt:50, ml:350}}
                        >                        
                            <StageSpinner size={50} color="#008272" loading={true} />
                        </Grid>
                        }
                    </Grid>
                : null}

                
                {activeTab == 1 ?
                    <Grid>
                        {data3 !== null ? 
                            <Card
                                // sx={{display:'flex',justifyContent:'center', background:'#bfdfdb'}}
                            >
                                <Grid>
                                    <Typography variant="h6">Monthly Payments</Typography>
                                    <ReactEcharts
                                        option={{
                                            legend: {
                                                data: legend3
                                            },
                                            color : ['#fd7a8c','#cc89d6','#4dc656','#4dc656','#feaf8a'],
                                            // grid: { top: 20, right: 40, bottom: 20, left: 40 },
                                            xAxis: {
                                                type: "category",
                                                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                                            },
                                            yAxis: {
                                                type: "value"
                                            },
                                            series: data3,
                                            tooltip: {
                                                trigger: "axis"
                                            }
                                        }}
                                        // style={{ width: "600px", height: "300px" }}
                                    ></ReactEcharts>
                                </Grid>

                                <Grid>
                                    {data3 !== null ?
                                        <Grid
                                            style={{display:'flex', justifyContent:'center'}}
                                        >
                                            <table>
                                                <tr>
                                                    <th style={{border : '1px solid #dddddd', justifyContent:'flex-end', width:'200px'}}>Class</th>
                                                    <th style={{border : '1px solid #dddddd', justifyContent:'flex-end', width:'150px'}}>Total Amount</th>
                                                </tr>
                                                {data3.map((x) => (
                                                    <tr>
                                                        <td style={{border : '1px solid #dddddd', justifyContent:'flex-end'}}>
                                                            {x.name}
                                                        </td>
                                                        <td style={{border : '1px solid #dddddd', display:'flex', justifyContent:'flex-end'}}>
                                                            {x.data.reduce((a, b) => a + b, 0)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </table>
                                        </Grid>
                                    : <Grid>not available</Grid>}
                                </Grid>
                                <Grid
                                    style={{display:'flex',justifyContent:"center"}}
                                    sx={{my:10}}
                                >
                                    <Grid>
                                        <Button
                                            variant="contained"
                                            color="green"
                                            // sx={{color:'green'}}
                                        >
                                            <Typography
                                                variant="h6"
                                            >
                                                Total Annual Amount : {totalPayment}.00
                                            </Typography>
                                        </Button>
                                    </Grid>
                                    {/* {user.userType == 5 ?  */}
                                        <Button
                                            variant="contained"
                                            color="red"
                                            sx={{ml : 10}}
                                            startIcon={<PaymentsIcon/>}
                                            onClick={()=>{
                                                if(user.userType == 5){
                                                    navigate("/payments/instructor/"+param.instructor_id)
                                                }else{
                                                    navigate("/payments/instructor/"+user.id)
                                                }
                                            }}
                                        >
                                            <Typography
                                                // variant="h6"
                                            >
                                                Payments
                                            </Typography>
                                        </Button>
                                    {/* : null} */}
                                </Grid>
                            </Card>
                        : 
                        <Grid style={{display:'flex',alignItems:'center', position:"absolute", flexDirection:'row', textAlign:'center', flexWrap:'wrap'  }}
                            sx={{mt:50, ml:350}}
                        >                        
                            <StageSpinner size={50} color="#008272" loading={true} />
                        </Grid>
                        }
                    </Grid>
                : null}
                
                        
            </MainContainer>
        </Fragment>
    );
}

export default ClassFeesPaidMonthly;