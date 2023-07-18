import React, { Component } from "react";
import { any } from "prop-types";
import { Card } from "@mui/material";

class CustCard extends Component {
    static propTypes = {
        title: any,
        children: Node,
        Image: any,
    };

    static defaultProps = {
        title: null,
        Image: null,
    };



    render() {
        const {
            title,
            Image,
            children
        } = this.props;


        return (
            <Card 
                elevation={6} 
                sx={{p: 10, m:5, mx:10}}
                className="px-main-card py-3" 
                style={{backgroundImage: 'url('+ Image +')', backgroundColor:'rgba(255,255,255,0.9)'}}
            >
                {children}
            </Card>
        );
    }
}

export default CustCard;