import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import MainContainerResponsive from "../../components/MainContainerResponsive";
import InstructorServices from "../../services/InstructorServices";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import StudentServices from "../../services/StudentServices";
import moment from "moment";
import { MagicSpinner, } from "react-spinners-kit";
import MainContainer from "../../components/MainContainer";
import Table from "../../components/CustTable";


const GetAllStudents = () => {

    const [rows, setRows] = useState(undefined);
    const [loaded, setLoaded] = useState(false);
    let arr = rows || []

    useEffect(()=> {
        const getData = async () => {
            setLoaded(false)
            const res = await StudentServices.getAllStudents() 
            if(res){
                setTimeout(() => {
                    setRows(res.data)
                    setLoaded(true)
                }, 2000);
            }
            console.log("all students",res.data)
        }
        getData()
    },[])

    const columns = [
        { 
            accessorKey: '_id', 
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
            width : 150
        },
        { 
            accessorKey: 'email', 
            header: 'Email', 
            width : 150,
            // Cell:({cell})=>(
            //     <div style={{display:'flex', justifyContent:'center'}}>
            //         {cell.getValue()}
            //     </div>
            // )
        },
        { 
            accessorKey: 'level', 
            header: 'Level',
            width : 150 
        },
        { 
            accessorKey: 'year', 
            header: 'Examination Year', 
            width : 150,
            Cell: ({ cell }) => (
                    <div style={{display:'flex', justifyContent:'center'}}>
                        {/* adas */}
                        {moment(cell.getValue()).format('yyyy')}
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

export default GetAllStudents;