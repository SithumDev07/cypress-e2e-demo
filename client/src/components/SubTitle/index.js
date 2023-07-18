import React, { Fragment, useState, Component } from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";

class SubTitle extends Component {
    static propTypes = {
        title: PropTypes.string,
        required: PropTypes.bool,
    };

    static defaultProps = {
        title: "",
        required: false
    };



    render() {
        const {
            title,
            required
        } = this.props;


        if(required === true){
            return (
                <Grid style={{display: 'flex'}}>
                    <Typography className="text-gray font-semibold text-13 mt-2" style={{ lineHeight: '1', }}>{title}</Typography>
                    <Typography className="font-bold" sx={{color :"red.main"}} style={{ lineHeight: '1'}}>*</Typography>
                </Grid>
            );
        }else {
            return (
                <div className='text-error flex'>
                    <Typography className=" text-gray font-semibold text-13 mt-2 mb-2" style={{ lineHeight: '1', }}>{title}</Typography>
                </div>
            );
        }
    }
}

export default SubTitle;