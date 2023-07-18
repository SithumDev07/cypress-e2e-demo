import React, {Fragment, useState} from 'react'
import {Fab, TextField, TextareaAutosize, Grid, Card} from '@mui/material'
import {ArrowBack, GetApp} from '@mui/icons-material'
import { Link } from "react-router-dom";
import QRcode from 'qrcode.react'
import MainContainer from '../MainContainer';
import SubTitle from '../SubTitle';

function QRgenerator() {
    const [qr, setQr] = useState('');
    const handleChange = (event) => {
        setQr(event.target.value);
    };
    const downloadQR = () => {
        const canvas = document.getElementById("qr");
        const pngUrl = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = ('ID.png');
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <Fragment>
            <MainContainer>
                <Card
                    sx={{m:10, p:20}}
                >
                    <Grid
                        container
                        sx={{m:10, display:'flex-column', justifyContent:'center'}}
                    >
                        <Grid 
                            sx={{display: 'flex', justifyContent:'center'}}
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                        >
                            <Grid>
                                <SubTitle title="Student ID" />
                                <TextField 
                                    onChange={(event)=>{
                                        setQr(event.target.value);
                                    }} 
                                    style={{width:320}}
                                    value={qr} 
                                    // label="Student ID" 
                                    size="large" 
                                    variant="outlined" 
                                    color="green" 
                                />
                            </Grid>
                        </Grid>

                        <Grid
                            // sx={{mb:10, }}
                            item
                            xs={12}
                            sm={6}
                            md={6}
                            lg={3}
                        >
                            {
                                qr ?
                                
                                <Grid>
                                    <QRcode 
                                        id="qr"
                                        value={qr} 
                                        size={320}
                                        // width={'80%'}
                                        includeMargin={true}
                                    /> 
                                    
                                </Grid>
                                : null
                                // <p>Insert ID number to preview QR code</p>
                                
                            }
                            
                        </Grid>
                        <Grid
                            sx={{mb:10}}
                            item
                            xs={2}
                        >
                            {
                                qr ? 
                                // <Grid container>
                                    <Grid 
                                        item
                                        sx={{display: 'flex', justifyContent: 'center', mt:70}}
                                    >
                                        
                                        <Fab onClick={downloadQR}  color="green" >
                                            <GetApp/>
                                        </Fab>
                                    {/* </Grid> */}
                                </Grid> :
                                ''
                            }
                        </Grid>
                    </Grid> 
                </Card>
            </MainContainer>
        </Fragment>
    );
  }
  
  export default QRgenerator;
  