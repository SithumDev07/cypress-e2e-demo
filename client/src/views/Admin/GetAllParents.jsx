import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import MainContainerResponsive from "../../components/MainContainerResponsive";
import InstructorServices from "../../services/InstructorServices";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import ParentServices from "../../services/ParentServices";
import { MagicSpinner, } from "react-spinners-kit";
import MainContainer from "../../components/MainContainer";
import Table from "../../components/CustTable";

const GetAllParents = () => {

    const [rows, setRows] = useState(undefined);
    const [loaded, setLoaded] = useState(false);
    let arr = rows || []

    useEffect(()=> {
        const getData = async () => {
            setLoaded(false)
            const res = await ParentServices.getAllParents() 
            if(res){
                setTimeout(() => {
                    setRows(res.data)
                    setLoaded(true)
                }, 1000);
            }
            console.log("all instructors",res.data)
        }
        getData()
    },[])

    const columns = [
        { 
            accessorKey: '_id', 
            header: 'Parent ID', 
            width : 130,
        },
        { 
            accessorKey: 'firstName', 
            header: 'First Name', 
            width : 150
        },
        { 
            accessorKey: 'lastName', 
            header: 'Last Name',
            width : 150
        },
        { 
            accessorKey: 'contactNumber', 
            header: 'Contact Number', 
            width : 150
        },
        { 
            accessorKey: 'email', 
            header: 'Parent email', 
            width : 230
        },
        { 
            accessorKey: 'email2', 
            header: 'Student emails', 
            width : 230
        },
        { 
            accessorKey: 'address', 
            header: 'Address', 
            width : 250
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
 
export default GetAllParents;