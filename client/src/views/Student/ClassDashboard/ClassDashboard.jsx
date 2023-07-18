import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Button, Card, CardHeader, CardMedia, Divider, Fab, Grid, Typography } from "@mui/material";
import { Fragment, useState } from "react";

import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import MainContainer from "../../../components/MainContainer";
import CustCard from "../../../components/CustCard";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MainContainerResponsive from "../../../components/MainContainerResponsive";


const ClassDashboard = () => {

    const arr = [
        {
            month: 'January',
            weeks: 
            [   {
                    TaskName : 'Complete Activity 2.4 in Page 72',
                    WeekNo: 1,
                    file: false,
                },
                {
                    TaskName : 'Complete Activity 2.5 in Page 80',
                    WeekNo: 2,
                    file: false,
                },
                {
                    TaskName : 'Complete Task 2.4 in Workbook',
                    WeekNo: 3,
                    file: false,
                },
                {
                    TaskName : 'Complete this question paper 2 related to unit 2',
                    WeekNo: 4,
                    file: true,
                },
            ]
        },
        {
            month: 'February',
            weeks: 
            [   {
                    TaskName : 'Complete Activity 2.4 in Page 72',
                    WeekNo: 1,
                    file: false,
                },
                {
                    TaskName : 'Complete Activity 2.4 in Page 72',
                    WeekNo: 2,
                    file: false,
                },
                {
                    TaskName : 'Complete Activity 2.4 in Page 72',
                    WeekNo: 3,
                    file: false,
                },
                {
                    TaskName : 'Complete Activity 2.4 in Page 72',
                    WeekNo: 4,
                    file: false,
                },
            ]
        },
        {
            month: 'March',
            weeks: 
            [   {
                    TaskName : 'Complete Activity 2.4 in Page 72',
                    WeekNo: 1,
                    file: false,
                },
                {
                    TaskName : 'Complete Activity 2.4 in Page 72',
                    WeekNo: 2,
                    file: false,
                },
                {
                    TaskName : 'Complete Activity 2.4 in Page 72',
                    WeekNo: 3,
                    file: false,
                },
                {
                    TaskName : 'Complete Activity 2.4 in Page 72',
                    WeekNo: 4,
                    file: false,
                },
            ]
        },
    ]

    const handlePdfDownload = () => {
        // using Java Script method to get PDF file
        fetch('./../../files/639f58b123fb0e1e24ce2f31/input_devices.pdf').then(response => {
            response.blob().then(blob => {
                // Creating new object of PDF file
                const fileURL = window.URL.createObjectURL(blob);
                // Setting various property values
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = 'Input_devices.pdf';
                alink.click();
            })
        })
    }

    return ( 
        <Fragment>
            <MainContainerResponsive>
                <Card sx={{display:'flex', justifyContent:'space-around', mx:10, p:5}}>
                    <Typography variant='h5'>English</Typography>
                    <Divider/>
                    <Grid>
                        <Typography >Shyama Rodrigo | Saturday | 10.00 am</Typography>
                        {/* <Typography variant='caption'>Subject</Typography> */}
                        {/* <Typography variant='caption'>Subject</Typography> */}
                    </Grid>
                </Card>
                
                <Grid
                    item
                >
                    {arr.map((month) => (
                        <Grid>
                            <Card sx={{ m:5, mx:10, backgroundColor: '#bfdfdb'}} elevation={0}>
                                {month.weeks.map((week)=>(
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            sx={{backgroundColor:'#52aa9f'}}
                                        >
                                            <Typography sx={{display:'flex',  justifyContent:'center', pl:5}}>{month.month} | Week {week.WeekNo}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails
                                            sx={{backgroundColor:'#bfdfdb', p:20}}
                                        >
                                            <Typography>
                                                {week.TaskName}
                                            </Typography>
                                            {week.file ? 
                                                <Button onClick={handlePdfDownload} color="red" variant='outlined'>
                                                    Download
                                                </Button>
                                                
                                            : null}
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </MainContainerResponsive>
        </Fragment>
    );
}

export default ClassDashboard;