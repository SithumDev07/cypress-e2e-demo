import React, { useRef, useState, useEffect, useCallback } from "react";
import MaterialReactTable from 'material-react-table';
import { Box, Button, Menu, MenuItem, Tooltip } from "@mui/material";
import { ExportToCsv } from 'export-to-csv'; 
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const Table = (data) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



    const csvOptions = {
    fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        useBom: true,
        useKeysAsHeaders: false,
        headers: data.columns.map((c) => c.header),
    };
    
    const csvExporter = new ExportToCsv(csvOptions);
    
    const handleExportRows = (rows) => {
        csvExporter.generateCsv(rows.map((row) => row.original));
    };
    
    const handleExportData = () => {
        csvExporter.generateCsv(data);
    };

    return (
        <MaterialReactTable
            columns={data.columns}
            data={data.data}
            enableRowSelection
            enableSorting={true}
            positionToolbarAlertBanner="bottom"
            renderTopToolbarCustomActions={({ table }) => (
                <Box
                    sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}
                >
                    {table.getPrePaginationRowModel().rows.length === 0 
                            ?
                                null    
                            : 
                                <Button
                                    id="demo-positioned-button"
                                    aria-controls={open ? 'demo-positioned-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    >
                                    <FileDownloadIcon 
                                        color="gray"
                                    />
                                </Button> 
                    }
                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                        }}
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                        }}
                    >
                        {/* <Tooltip title="export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)">
                            <MenuItem onClick={handleExportData}>Export All Data</MenuItem>
                        </Tooltip> */}
                        {table.getPrePaginationRowModel().rows.length === 0 
                            ?
                                null
                            : 
                                <Tooltip title="export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)">
                                    <MenuItem onClick={()=>handleExportRows(table.getPrePaginationRowModel().rows)}>
                                        Export All Rows
                                    </MenuItem>
                                </Tooltip>
                        }

                        {table.getRowModel().rows.length === 0 
                            ?
                                null
                            :
                                <Tooltip title="export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)">
                                    <MenuItem onClick={() => handleExportRows(table.getSelectedRowModel().rows)}>
                                        Export Page Rows
                                    </MenuItem>
                                </Tooltip>
                        }
                        {!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected() 
                            ?
                                null
                            :
                                <Tooltip title="only export selected rows">
                                    <MenuItem onClick={() => handleExportRows(table.getRowModel().rows)}>
                                        Export Selected Rows
                                    </MenuItem>
                                </Tooltip>
                        }      
                    </Menu>
                </Box>
            )}
        />
    )
}

const defaultOptions = {

    filterType: 'textField',
    sort: true,
    responsive: "standard",
    //responsive: 'scrollMaxHight',
    //responsive: "vertical",
    //responsive: "scroll",
    //responsive: 'vertical',
    //tableBodyHeight: '500px',
    selectableRows: 'none', // set checkbox for each row
    search: false, // set search option
    filter: false, // set data filter option
    download: true, // set download option
    downloadOptions: {
        filterOptions: {
            useDisplayedColumnsOnly: true,
            useDisplayedRowsOnly: true,
        }
    },
    //resizableColumns: true,
    draggableColumns: {
        enabled: true,
    },
    // print: false, // set print option
    pagination: false, //set pagination option
    // viewColumns: false, // set column option
    elevation: 0,
    rowsPerPageOptions: [],

}

export default Table
