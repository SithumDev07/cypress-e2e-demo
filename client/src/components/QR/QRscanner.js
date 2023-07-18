import React, {Fragment, useState} from 'react'
import {Fab, Grid, TextareaAutosize, TextField} from '@mui/material'
import {ArrowBack} from '@mui/icons-material'
import { Link } from "react-router-dom";
import {QrReader} from 'react-qr-reader'
import MainContainer from '../MainContainer';
import { flexbox } from '@mui/system';

function QRscanner() {

    const [qrscan, setQrscan] = useState('');
    const handleScan = data => {
        if (data) {
            setQrscan(data)
        }
    }
    const handleError = err => {
    console.error(err)
    }

    return (
      <Fragment>
            <MainContainer>
                <Grid style={{width: '30%'}}>
                    <QrReader
                        delay={300}
                        onError={handleError}
                        onScan={handleScan}
                        style={{  width: '50%' }}
                        onResult={(result, error) => {
                            if (!!result) {
                              setQrscan(result?.text);
                            }
                  
                            if (!!error) {
                              console.info(error);
                            }
                          }}
                    />
                </Grid>
                <Grid
                    style={{width: '30%'}}
                    // sx={{display:'flex', justifyContent: 'center'}}
                >
                    <TextField
                        value={qrscan}
                        color='green'
                        onChange={(e)=>{
                            setQrscan(e.target.val)
                        }}
                    />
                </Grid>
            </MainContainer>
      </Fragment>
    );
  }
  
  export default QRscanner;
  