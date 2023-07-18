// TODO: create handlesubmit funtion and inside loop backend call function using results, show progressbarx



import { Autocomplete, Button, Card, Divider, Grid, LinearProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, CSSProperties, Fragment, useEffect } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

import {
  useCSVReader,
  lightenDarkenColor,
  formatFileSize,
} from 'react-papaparse';
import { MagicSpinner } from 'react-spinners-kit';
import MainContainer from '../../components/MainContainer';
import SubTitle from '../../components/SubTitle';
import InstructorServices from '../../services/InstructorServices';
import LocalStorageServices from '../../services/LocalStorageServices';
import ResultServices from '../../services/ResultServices';

import DownloadIcon from '@mui/icons-material/Download';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

const GREY = '#008272';
// const GREY_LIGHT = 'rgba(255, 255, 255, 0.4)';
const DEFAULT_REMOVE_HOVER_COLOR = '#A01919';
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(DEFAULT_REMOVE_HOVER_COLOR,40);
const GREY_DIM = '#008272';

const styles = {
    zone: {
        alignItems: 'center',
        border: `2px dashed ${GREY}`,
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        padding: 20,
    },
    file: {
        background: 'linear-gradient(to bottom, #EEE, #DDD)',
        borderRadius: 20,
        display: 'flex',
        height: 120,
        width: 200,
        position: 'relative',
        zIndex: 10,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    info: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
    },
    size: {
        // backgroundColor: GREY_LIGHT,
        borderRadius: 3,
        marginBottom: '0.5em',
        justifyContent: 'center',
        display: 'flex',
    },
    name: {
        // backgroundColor: GREY_LIGHT,
        borderRadius: 3,
        fontSize: 12,
        marginBottom: '0.5em',
    },
    progressBar: {
        bottom: 14,
        color:'#008272',
        position: 'absolute',
        width: '80%',
        paddingLeft: 10,
        paddingRight: 10,
    },
    zoneHover: {
        borderColor: GREY_DIM,
    },
    default: {
        borderColor: GREY,
    },
    remove: {
        height: 23,
        position: 'absolute',
        right: 6,
        top: 6,
        width: 23,
    },
};

const UploadClassContent = () => {
    const { CSVReader } = useCSVReader();
    const [zoneHover, setZoneHover] = useState(false);
    const [removeHoverColor, setRemoveHoverColor] = useState(DEFAULT_REMOVE_HOVER_COLOR);
    const [myClasses, setMyClasses] = useState(null)
    const [classes, setClasses] = useState(null)
    const [assignment_ID, setAssignment_ID] = useState('')
    const [studentResult, setStudentResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [errorMsg, ShowErrorMsg] = useState(false)
    let currentUser = null

    useEffect(()=> {
        const getClasses = async () => {
            const user = getUser()
            if (user != null){
                const res = await InstructorServices.getClasses(user.id)
                setMyClasses(res.data)
                console.log("ins classes",res.data)
            }
        }
        getClasses()
    },[])

    let getUser = () => {
        currentUser = JSON.parse(LocalStorageServices.getItem('user'))
        console.log('lcoaluser', currentUser.id)
        return currentUser
    }

    let handleSubmit = async () => {
        console.log("studentResult", studentResult)
        let length = studentResult.length
        let count = 1
        
        
        if(studentResult.length > 0){
            setLoading(true)
            studentResult.map(async (x)=>{
                let formData = new FormData();
                formData = {
                    ST_ID : x[0], 
                    class_ID : classes, 
                    assignment_ID : assignment_ID,	
                    marks : x[1]
                }
                // console.log(formData)
                let res = await ResultServices.addResult(formData)
                if(res.status === 200){
                    count += 1
                    console.log(count,length)
                }else{
                    console.log(res)
                }
            })
            setTimeout(() => {
                setLoading(false)
                // navigate(route)
            },2000)
        }else{
            ShowErrorMsg(true)
        }

        // const res = await NotificationServices.createAnnoucement(formData)
        // console.log("notification res",res)
        // if (res.status < 300){
        //     setAlert(true)
        //     setMessage('Announcement sent!')
        //     setServerity('success')
        //     handleRedirect()
        // }else if (res.status > 399){
        //     setAlert(true)
        //     setMessage(res.data.msg)
        //     setServerity('Cannot send annoucement!')
        // }
    }

    let handleError = () => {
        console.log('error')
        if(studentResult.length < 0){
            ShowErrorMsg(true)
        }
    }

    let setResults = (results) => {
        // console.log("SR",results.data)
        let temp = []
        results.data.map((x,index) => {
            if(index > 0){
                temp.push(x)
            }
            setStudentResult(temp)
        })
        // console.log("SR",studentResult)
    }

    return (
        <Fragment>
            <MainContainer>
                <Card
                    sx={{p: 10, m:5, mx:10}}
                    elevation={6} 
                    className="px-main-card py-3" 
                >
                    <CSVReader
                        onUploadAccepted={(results) => {
                            console.log(results);
                            setResults(results)
                            setZoneHover(false);
                        }}
                        onDragOver={(event) => {
                            event.preventDefault();
                            setZoneHover(true);
                        }}
                        onDragLeave={(event) => {
                            event.preventDefault();
                            setZoneHover(false);
                        }}
                        >
                        {({
                            getRootProps,
                            acceptedFile,
                            ProgressBar,
                            getRemoveFileProps,
                            Remove,
                        }) => (
                            
                            <ValidatorForm
                                onSubmit={handleSubmit}
                                onError={handleError}
                            >
                                <Grid
                                    xs={12}
                                    sx={{py:5, display:'flex',}}
                                >
                                    {/* <Button
                                        variant='contained'
                                        color='yellow'
                                        startIcon={<DownloadIcon/>}
                                        onClick={()=>{
                                            window.open('https://drive.google.com/file/d/1cBx0fqx2VXVtHsfU-9n4qm5gYI0mb1A6/view?usp=share_link')
                                        }}
                                    >
                                        Result Sheet Template
                                    </Button> */}

                                    <Typography
                                        variant="h5"
                                    >
                                        Upload Class Content
                                    </Typography>
                                </Grid>
                                    <Divider/>
                                <Grid
                                    container
                                    spacing={2}
                                    sx={{mt:10}}

                                >
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        lg={4}
                                        sx={{p:5}}
                                    >
                                        <SubTitle title="Class" required/>
                                        <Autocomplete
                                            color='green'
                                            options={myClasses}
                                            // groupBy={(option)=>option.level}
                                            disabled={
                                                myClasses != null 
                                                        ? (myClasses.length > 0) 
                                                            ? false 
                                                            : true
                                                        : true
                                            }
                                            name="classes"
                                            // value={myClasses}
                                            getOptionLabel={(option) => "Grade " + option.grade + " - " + option.classType}
                                            renderInput={(params) => (
                                                <TextValidator
                                                    color='green'
                                                    {...params}
                                                    // className=" w-full"
                                                    placeholder="Select classes which you wants to notify"
                                                    value={classes}
                                                    disabled={
                                                        // true
                                                        myClasses != null 
                                                        ? (myClasses.length > 0) 
                                                            ? false 
                                                            : true
                                                        : true
                                                    }
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
                                            )}
                                            onChange={(e, newValue) => {
                                                if(newValue !== null){
                                                    setClasses(newValue._id)
                                                }
                                            }}
                                            onInputChange={(e, newValue) => {
                                                if(newValue !== null){
                                                    setClasses(newValue._id)
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        lg={4}
                                        sx={{p:5}}
                                    >
                                        <SubTitle title="Assignment title" required/>
                                        <TextValidator
                                            color='green'
                                            fullWidth 
                                            placeholder="Enter notification header"
                                            name="header"
                                            InputLabelProps={{
                                                shrink: false,
                                            }}
                                            value={
                                                assignment_ID
                                            }
                                            disabled={false}
                                            type="text"
                                            variant="outlined"
                                            size="small"
                                            onChange={(e) => {
                                                setAssignment_ID(e.target.value)
                                            }}
                                            validators={[
                                                'required',
                                            ]}
                                            errorMessages={[
                                                'This field is required',
                                            ]}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={12}
                                        sx={{p:5, mt:10}}
                                    >
                                        <SubTitle title="Upload Materials (only if available)"/>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={12}
                                        sx={{p:5,display:'flex', justifyContent:'center'}}
                                    >
                                        <Grid
                                            {...getRootProps()}
                                            style={Object.assign(
                                            {},
                                            styles.zone,
                                            zoneHover && styles.zoneHover
                                            )}  
                                            item
                                            xs={12}
                                            sm={12}
                                            md={6}
                                            lg={6}
                                            sx={{p:5}}
                                        >
                                            {acceptedFile ? (
                                            <>
                                                <div style={styles.file}>
                                                <div style={styles.info}>
                                                    <span style={styles.size}>
                                                    {formatFileSize(acceptedFile.size)}
                                                    </span>
                                                    <span style={styles.name}>{acceptedFile.name}</span>
                                                </div>
                                                <div style={styles.progressBar}>
                                                    <ProgressBar />
                                                </div>
                                                <div
                                                    {...getRemoveFileProps()}
                                                    style={styles.remove}
                                                    onMouseOver={(event) => {
                                                    event.preventDefault();
                                                    setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT);
                                                    }}
                                                    onMouseOut={(event) => {
                                                    event.preventDefault();
                                                    setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR);
                                                    }}
                                                >
                                                    <Remove color={removeHoverColor} />
                                                </div>
                                                </div>
                                            </>
                                            ) : (
                                                <Grid>
                                                    {!errorMsg ?
                                                        <Typography>                                            
                                                            'Drop file here or click to upload'
                                                        </Typography>
                                                    :
                                                        <Grid style={{color:'red'}}>
                                                            'Drop file here or click to upload'    
                                                        </Grid>
                                                    }
                                                </Grid>
                                            )}
                                        </Grid>
                                    </Grid>
                                    <Grid>
                                    <Box sx={{ width: '100%' }}>
                                        <LinearProgress />
                                    </Box>
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        sx={{display:'flex', justifyContent:'center', mt:10}}
                                        className=""
                                    >
                                        {!loading 
                                            ?
                                            <Button
                                                type='submit'
                                                color='green'
                                                variant='contained'
                                                startIcon={<DriveFolderUploadIcon/>}
                                            >
                                                Upload
                                            </Button>
                                        :
                                            <MagicSpinner color="#008272"/>
                                        }
                                    </Grid>
                                
                                </Grid>
                            </ValidatorForm>
                        )}
                    </CSVReader>
                </Card>
            </MainContainer>
        </Fragment>
    );
}

export default UploadClassContent