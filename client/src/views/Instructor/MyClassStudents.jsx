import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Button, Card, CardHeader, CardMedia, Chip, Grid, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Grades, Levels } from "../../appconst";
import CustCard from "../../components/CustCard";
import MainContainer from "../../components/MainContainer";
import SubTitle from "../../components/SubTitle";
import CustSnackbar from "../../components/CustSnackbar";
import coverImage from '../../assets/loginImg.jpg'

import SendIcon from '@mui/icons-material/Send';
import moment from "moment";


import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventIcon from '@mui/icons-material/Event';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import InstructorServices from "../../services/InstructorServices";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ClassServices from "../../services/ClassServices";
import Table from "../../components/CustTable";
import { MagicSpinner } from "react-spinners-kit";



const MyClassStudents = (props) => {

    const [classStudents,setClassStudents] = useState('')
    const {classID} = useParams() 
    
    useEffect(()=> {
        const getClasses = async () => {
            const res = await ClassServices.myClassStudents(classID)
            setClassStudents(res.data)
            console.log("myclasses",res.data)
        }
        getClasses()
    },[])


    const columns = [
        { 
            accessorKey: 'studentID', 
            header: 'Student ID', 
            width : 130,
        },
        { 
            accessorKey: 'firstName', 
            header: 'First Name', 
            width : 150
        },
        { 
            accessorKey: 'lastName', 
            header: 'lastName',
            width : 150
        },
        { 
            accessorKey: 'contactNumber', 
            header: 'Contact Number', 
            width : 150
        },
        { 
            accessorKey: 'gender', 
            header: 'Gender', 
            width : 150,
        },
        { 
            accessorKey: 'email', 
            header: 'Email', 
            width : 150,
        },
        { 
            accessorKey: 'enrolledDate', 
            header: 'Enrolled Date', 
            width : 150,
            Cell: ({ cell }) => (
                        <div style={{display:'flex', justifyContent:'center'}}>
                            {/* adas */}
                            {moment(cell).format('yyyy/MM/DD')}
                            {/* (value) */}
                        </div>
                // }
            ),
        },
    ];


    return ( 
        <Fragment>
            <MainContainer>
                <Grid
                    // container
                    // spacing={30}
                    // sx={{px:20}}
                >
                    {classStudents.length > 0 ? 
                        (<Table
                            data={classStudents}
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
                            <MagicSpinner size={200} color="#008272" loading={true} />
                        </Grid>
                    }

                </Grid>
            </MainContainer>
        </Fragment>
    );
}

export default MyClassStudents;