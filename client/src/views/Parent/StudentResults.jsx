import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import MainContainerResponsive from "../../components/MainContainerResponsive";
import InstructorServices from "../../services/InstructorServices";
import { Grid } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import StudentServices from "../../services/StudentServices";
import moment from "moment";
import { MagicSpinner, } from "react-spinners-kit";
import MainContainer from "../../components/MainContainer";
import Table from "../../components/CustTable";
import ResultServices from "../../services/ResultServices";


const StudentResults = () => {

    const {class_ID,ST_ID} = useParams() 
    const [rows, setRows] = useState(undefined);
    const [loaded, setLoaded] = useState(false);
    let arr = rows || []

    useEffect(()=> {
        const getData = async () => {
            setLoaded(false)
            let params = {
                class_ID:class_ID, 
                ST_ID:ST_ID
            }
            const res = await ResultServices.getAllResultsOfAssignmentForParentView(params) 
            console.log("all students",res.data)
            if(res){
                setTimeout(() => {
                    setRows(res.data.studentsResults)
                    setLoaded(true)
                }, 2000);
            }
        }
        getData()
    },[])

    const columns = [
        { 
            accessorKey: 'assignment', 
            header: 'Assignment', 
            width : 130,
        },
        { 
            accessorKey: 'marks', 
            header: 'Marks', 
            width : 150
        },
        { 
            accessorKey: 'releasedDate', 
            header: 'Released Date', 
            width : 100,
            Cell: ({ cell }) => (
                        <div style={{display:'flex', justifyContent:'center'}}>
                            {/* adas */}
                            {moment(cell.getValue()).format('DD/MM/yyyy')}
                            {/* (value) */}
                        </div>
                // }
            ),
        },
    ];
    

    

    
    return ( 
        <Fragment>
            <MainContainer>
                <div style={{ height: 400, width: '100%', background: '#fff' }}>
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
                            <MagicSpinner size={200} color="#008272" loading={true} />
                        </Grid>
                    }
                </div>
            </MainContainer>
        </Fragment>
    );
}

export default StudentResults;