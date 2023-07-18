import { Button, Grid, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustCard from "../../components/CustCard";
import MainContainer from "../../components/MainContainer";
import AttendanceServices from "../../services/AttendanceServices";
import { months } from "../../appconst";
import moment from "moment";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { display } from "@mui/system";

const AttendanceView = () => {
    
    const param = useParams()
    const [attendance, setAttendance] = useState(null)

    
    const getData = async () => {
        let params = {
            ST_ID : param.ST_ID,
            class_ID : param.class_ID
        }
        let res = await AttendanceServices.getStudentAttendance(params)
        if(res.status === 200 || res.status ===201){
            setData(res.data)
        }
        // console.log("Attendance RES",attendance)
    }

    const setData = (data) =>{
        let events = []
        data.map((x)=>{
            let event = {
                title: "Attended At : "+moment(x.attend_date).format("HH:mm"),
                start: moment(x.attend_date).format("yyyy-MM-DD"),
                backgroundColor: "#008272",
                // textColor: "black"
            }
            events.push(event)
        })
        setAttendance(events)
        console.log("Events",attendance,events)
    }
    
    useEffect(()=>{
        getData ()
    },[])
    return ( 
        <Fragment>
            <MainContainer>
                    <Grid>
                        <Grid>
                            <CustCard>
                                <Grid
                                    sx={{display:'flex', justifyContent:'center'}}
                                    >
                                    <Typography variant="h4">Attendance Sheet</Typography>
                                </Grid>
                                <Grid>
                                    <FullCalendar
                                        defaultView="dayGridMonth"
                                        firstDay={1}
                                        locale="en"
                                        header={{
                                            left: "prev,next",
                                            center: "title",
                                            right: "dayGridMonth,timeGridWeek,timeGridDay"
                                        }}
                                        themeSystem="Simplex"
                                        plugins={[dayGridPlugin]}
                                        events={attendance}
                                    />
                                </Grid>
                            </CustCard>
                        </Grid>
                    </Grid>
            </MainContainer>
        </Fragment>
    );
}   

export default AttendanceView;