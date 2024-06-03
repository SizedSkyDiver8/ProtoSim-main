/* eslint-disable react/prop-types */
import { useState } from "react";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Collapse, IconButton, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useBlueBird } from "../../contexts/AppContext";
import { useEffect } from "react";
import { useRef } from "react";





// const jsonPreview ='{"type": 0, "autopilot": 0, "state": 0, "plane_mode": 0, "armed": False, "manual": False, "hil": False, "stabilized": False, "guided": False, "auto": False, "test": False, "s_date_time": "00:13:55.524"}';
function MessagesTable() {
  const {recievedMessages} = useBlueBird();
  const tableContainerRef = useRef(null);

  useEffect(() => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollTop = tableContainerRef.current.scrollHeight;
    }
  }, [recievedMessages]);


  // const [columnWidths, setColumnWidths] = useState({
  //   column1: 150,
  //   column2: 200,
  //   column3: 120,
  //   column4: 300,
  //   // Add more columns as needed
  // });

  // const handleMouseDown = (e, columnName) => {
  //   const initialX = e.clientX;
  //   const initialWidth = columnWidths[columnName];

  //   const handleMouseMove = (event) => {
  //     const widthChange = event.clientX - initialX;
  //     setColumnWidths((prevWidths) => ({
  //       ...prevWidths,
  //       [columnName]: initialWidth + widthChange,
  //     }));
  //   };

  //   const handleMouseUp = () => {
  //     window.removeEventListener("mousemove", handleMouseMove);
  //     window.removeEventListener("mouseup", handleMouseUp);
  //   };

  //   window.addEventListener("mousemove", handleMouseMove);
  //   window.addEventListener("mouseup", handleMouseUp);
  // };

  // return (
  //   <div className="table">
  //     <table className="data-table" border={1}>
  //       <thead>
  //         <tr>
  //           <th style={{ width: columnWidths.column1 }}>
  //             <div
  //               className="resizer"
  //               onMouseDown={(e) => handleMouseDown(e, "column1")}
  //             />
  //             timestamp
  //           </th>
  //           <th style={{ width: columnWidths.column2 }}>
  //             <div
  //               className="resizer"
  //               onMouseDown={(e) => handleMouseDown(e, "column2")}
  //             />
  //             message
  //           </th>
  //           <th style={{ width: columnWidths.column3 }}>
  //             <div
  //               className="resizer"
  //               onMouseDown={(e) => handleMouseDown(e, "column3")}
  //             />
  //             dir.
  //           </th>
  //           <th style={{ width: columnWidths.column4 }}>
  //             <div
  //               className="resizer"
  //               onMouseDown={(e) => handleMouseDown(e, "column4")}
  //             />
  //             hex data
  //           </th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {messages.map((message) => (
  //           <tr className="table-row" key={message.timestamp}>
  //             <td>{message.timestamp.split("T")[1].split("Z")[0]}</td>
  //             <td>{message.message} </td>
  //             <td>
  //               <span
  //                 style={{
  //                   display: "flex",
  //                   justifyContent: "center",
  //                   alignItems: "center",
  //                 }}
  //               >
  //                 {message.direction}
  //               </span>
  //               {/* {message.direction === "UP" ? (
  //                 <img className="uav-img" src="GCS_TO_PLANE.png" />
  //               ) : (
  //                 <img className="uav-img" src="PLANE_TO_GCS.png" />
  //               )} */}
  //             </td>
  //             <td style={{whiteSpace:"nowrap",overflow:"hidden"}}>{message.hexdata}</td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </div>
  // );
  

  return (
    <>
      <TableContainer
        className="scroll"
        sx={{ width: "25%", maxHeight: "80vh" }}
        component={Paper}
        ref={tableContainerRef}
      >
        <Table stickyHeader
          sx={{ minWidth: 650, maxWidth: 650 }}
          size="small"
          aria-label="simple table"
        >
          <TableHead sx={{backgroundColor:"red"}}>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 }}}
            >
              <TableCell sx={{ fontSize: "12px", width: "30px" }}></TableCell>
              <TableCell sx={{ fontSize: "12px", width: "100px" }}>
                Timestamp
              </TableCell>
              <TableCell sx={{ fontSize: "12px", width: "20px" }}>
                Message
              </TableCell>
              <TableCell sx={{ fontSize: "12px", width: "20px" }}>
                Dir.
              </TableCell>
              <TableCell sx={{ fontSize: "12px" }}>Hex Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {messages.map((message, index) => (
            <TableRow
              key={message.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 },backgroundColor: hoveredRow === index ? '#d9d9d9' : null}} onClick={() => console.log("clicked row", message.timestamp)}
              onMouseEnter={() => setHoveredRow(index)}
              onMouseLeave={() => setHoveredRow(null)}
              
            >
              <TableCell sx={{fontSize:"12px"}}  >{message.timestamp.split("T")[1].split("Z")[0]}</TableCell>
              <TableCell sx={{fontSize:"12px"}}  >{message.message}</TableCell>
              <TableCell sx={{fontSize:"12px"}}  >{message.direction === "1"? "DOWN" : message.direction}</TableCell>
              <TableCell sx={{fontSize:"12px"}}  >{message.hexdata}</TableCell>
            </TableRow>
          ))} */}
            {recievedMessages.map((mes) => (
              <Row key={mes.timestamp} message={mes} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default MessagesTable;

// {messages.map((message, index) => (
//   <TableRow
//     key={message.name}
//     sx={{ '&:last-child td, &:last-child th': { border: 0 },backgroundColor: hoveredRow === index ? '#d9d9d9' : null}} onClick={() => console.log("clicked row", message.timestamp)}
// onMouseEnter={() => setHoveredRow(index)}
// onMouseLeave={() => setHoveredRow(null)}

//   >
//     <TableCell sx={{fontSize:"12px"}}  >{message.timestamp.split("T")[1].split("Z")[0]}</TableCell>
//     <TableCell sx={{fontSize:"12px"}}  >{message.message}</TableCell>
//     <TableCell sx={{fontSize:"12px"}}  >{message.direction === "1"? "DOWN" : message.direction}</TableCell>
//     <TableCell sx={{fontSize:"12px"}}  >{message.hexdata}</TableCell>
//   </TableRow>
// ))}

function Row({ message }) {
  const [open, setOpen] = React.useState(false);
  const [hoveredRow, setHoveredRow] = useState(false);
  const {trimTimestamp, setTempDataTransfer} = useBlueBird()
  
  let jsonObj = message.messageData !== ' ' ?  JSON.parse(message.messageData) : JSON.parse({});

// Convert the object back to a formatted JSON string with indentation
var formattedJsonString = JSON.stringify(jsonObj, null, 2);
// console.log(formattedJsonString)
  

  return (
    <React.Fragment>
      <TableRow className="rowtable"
        sx={{
          "& > *": { borderBottom: "unset" },
          backgroundColor: hoveredRow ? "#d9d9d9" : null,
        }}
        onMouseEnter={() => setHoveredRow(true)}
        onMouseLeave={() => setHoveredRow(false)}
        onClick={() => setTempDataTransfer(message)}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" sx={{ fontSize: "12px" }}>
          {trimTimestamp(message.timestamp)}
        </TableCell>
        <TableCell sx={{ fontSize: "12px" }}>{message.message}</TableCell>
        <TableCell sx={{ fontSize: "12px", backgroundColor: message.direction === "1" ? "#b0c4de" : "#ffa50054"}}>
          {message.direction === "1" ? "DOWN" : "UP"} {/* change to UP when there is another side in mavlink events*/}
        </TableCell>
        <TableCell sx={{ fontSize: "12px", whiteSpace: "nowrap" }}>
          {message.hexdata}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {/* <Typography variant="h6" gutterBottom component="div">
                History
              </Typography> */}
              <Table
                size="small"
                sx={{ minWidth: 650, maxWidth: 650 }}
                aria-label="purchases"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Message Data</TableCell> {/* CAN SET BACKGROUND COLOR FOR INNER TABLE BASED ON SIDE (GREEN/BLUE)*/}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={message.messageData}>
                    <TableCell
                      sx={{ whiteSpace: "normal" }}
                      component="th"
                      scope="row"
                    >
                      {/* {(message.messageData === " " ? formattedJsonString : message.messageData)} */}
                      <pre>{formattedJsonString}</pre>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
