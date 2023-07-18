import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert, Snackbar } from '@mui/material'

class CustSnackbar extends Component {
    static propTypes = {
        open: PropTypes.bool,
        className: PropTypes.string,
        message: PropTypes.string,
        anchorOrigin: PropTypes.object,
        children: PropTypes.node,
        severity: PropTypes.string,
        autoHideDuration: PropTypes.number,
    }

    static defaultProps = {
        open: false,
        className: "",
        message: "",
        severity: "success",
        autoHideDuration: 5000,
        anchorOrigin: { 
            vertical: "bottom", 
            horizontal: "center",
        },
    }

    handleButtonClose = (event) => {
        const { onClose } = this.props
        onClose &&
            onClose({
                event,
            })
    }

    renderChildren = (message, children) => {

        if (message) {
            return message;
        }

        if (children) {
            return children;
        }
    };

    render() {
        const { 
            open, 
            className, 
            severity, 
            autoHideDuration, 
            anchorOrigin,
            children, 
            message,

        } = this.props

        return (
            <Snackbar
                name="customSnackbar"
                open={open}
                className={className}
                anchorOrigin={anchorOrigin}
                autoHideDuration={autoHideDuration}
                onClose={this.handleButtonClose}
            >
                <Alert severity={severity} onClose={this.handleButtonClose}>
                    {this.renderChildren(message, children)}
                </Alert>
            </Snackbar>
        )
    }
}

export default CustSnackbar;
