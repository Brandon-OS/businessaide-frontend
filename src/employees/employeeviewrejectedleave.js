import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { useAuth } from '../useAuth';
import { useState } from 'react';

export default function EmployeeRejectedLeave() {
    const [error, setError] = useState();
    const {user} = useAuth();
    const [leaves, setLeaves] = useState([]);
    const ViewPendingLeaves = async (status, email)=> {
        let call1 = "https://businessaide-backend.herokuapp.com/findUserType/?";
        call1 = call1 + "email=" + email;
        let result1 = await (await fetch(call1)).json();
        let call = "https://businessaide-backend.herokuapp.com/viewLeaveRequestsByType/?";
        call = call + "employeeName=" + result1.name + "&";
        call = call + "status=" + status;
        let result = await (await fetch(call)).json();
        console.log(result);
        if (result.status == "error") {
            setError("You do not have any apporved leave");
        }
        setLeaves(result.body);
        console.log(result.body);
    }
    useEffect(() => {
        if (user) {
         ViewPendingLeaves("rejected", user.email);
        }
      }, []);
    
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>Status</TableCell>
            <TableCell align="right">Start Date</TableCell>
            <TableCell align="right">End Date</TableCell>
            <TableCell align="right">reason</TableCell>
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
              
            </TableRow>
          ))}
     
        </TableBody>
}
      </Table>
    </TableContainer>
  );
}
