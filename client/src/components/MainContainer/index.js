import { Grid } from "@mui/material";
import React, { Component } from "react";

class MainContainer extends Component {
    static propTypes = {
        children: Node,
    };

    static defaultProps = {
        title: null,

    };



    render() {
        const {
            children
        } = this.props;

        return (

            <Grid 
                sx={{py:8, px:20}}
                className="pb-8 pt-8 px-main-8 " 
                style={{  
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    background: "linear-gradient(320deg,rgba(213,226,237,1),rgba(213,226,237,1))",
                    minHeight: '100vh',
                }}
            >
                {children}
            </Grid>

        );
    }
}

export default MainContainer;