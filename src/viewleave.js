import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAuth } from './useAuth';
import { useState } from 'react';
import { useEffect } from 'react';

export default function ViewApprovedLeave() {
    const {user} = useAuth();
    const [employeeName, setEmployeeName] = useState();
    const [employerName, setEmployerName] = useState();
    const [error, setError] = useState();
    const [leaves, setLeaves] = useState([]);
    const acceptLeave = async (employeeName, employerName, startdate) => {
        let call = "https://businessaide-backend.herokuapp.com/acceptLeave/?";
        call = call + "employeeName=" + employeeName + "&";
        call = call + "employerName=" + employerName + "&";
        call = call + "startdate=" + startdate;
        let result = await (await fetch(call)).json();
        alert (result.reason);
    }
    const rejectLeave = async (employeeName, employerName, startdate) => {
        let call = "https://businessaide-backend.herokuapp.com/rejectLeave/?";
        call = call + "employeeName=" + employeeName + "&";
        call = call + "employerName=" + employerName + "&";
        call = call + "startdate=" + startdate;
        let result = await (await fetch(call)).json();
        alert (result.reason);
    }
    const ViewApprovedLeaves = async (status, email)=> {
        let call1 = "https://businessaide-backend.herokuapp.com/findUserType/?";
        call1 = call1 + "email=" + email;
        let result1 = await (await fetch(call1)).json();
        setEmployerName(result1.name);
        let call = "https://businessaide-backend.herokuapp.com/getLeaveByType/?";
        call = call + "employerName=" + result1.name + "&";
        call = call + "status=" + status;
        let result = await (await fetch(call)).json();
        if (result.status == "error") {
            setError("There is no pending leave");
        }
        setLeaves(result.body);
        console.log(result.body);
    }
    useEffect(() => {
        if (user) {
         ViewApprovedLeaves("pending", user.email);
        }
      }, []);

const [open, setOpen] = React.useState(false);
const [open2, setOpen2] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
        <TableCell>Status</TableCell>
          <TableCell align="right">Start Date</TableCell>
          <TableCell align="right">End Date</TableCell>
          <TableCell align="right">reason</TableCell>
          <TableCell align="right">Action</TableCell>
        </TableRow>
      </TableHead>
      {error ? (<h2>{error}</h2>) :
      leaves.length == 0 ? (<div>loading...</div>) :
      <TableBody>
        {leaves.map((leave) => (
          <TableRow
            key={leave.startdate}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {leave.status}
            </TableCell>
            <TableCell align="right">{leave.startdate}</TableCell>
            <TableCell align="right">{leave.enddate}</TableCell>
            <TableCell align="right">{leave.reason}</TableCell>
            <TableCell align="right">
<Button onClick={handleClickOpen}>Approve</Button><Button onClick={handleClickOpen2}>Reject</Button></TableCell>
<div>
<Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Approve the Leave?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Please click on "Confirm" to approve the leave application
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={()=>{acceptLeave(leave.employeeName,employerName,leave.startdate);handleClose()}}>Confirm</Button>
              <Button onClick={handleClose} autoFocus>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
          </div>
          <div>
    <Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Reject the Leave?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please click on "Confirm" to reject the leave application
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{rejectLeave(leave.employeeName,employerName,leave.startdate);handleClose2()}}>Confirm</Button>
          <Button onClick={handleClose2} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
          </TableRow>
         
        
        ))}
   
      </TableBody>
}
    </Table>
  </TableContainer>
   
    </div>
  );
}






