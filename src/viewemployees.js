import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { db } from "./firebaseini";
import { useState } from "react";
import Cards from "./cards";
import { useAuth } from "./useAuth";
import { Routes, Route } from "react-router-dom";
import EmployeeDataService from "./employeeserver";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


  


const employeeCollectionRef = collection(db, "Employees");
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const EmployeesList = ({ getEmployeeId }) => {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState([]);
  const [errormessage, setErrormessage] = useState();
  useEffect(() => {
    getEmployees();
  }, []);
  const getEmployees = async () => {
    if (user) {
      let call1 = "https://businessaide-backend.herokuapp.com/findUserType/?";
      console.log(user.email);
      call1 = call1 + "email=" + user.email;
      let result = await (await fetch(call1)).json();
      console.log(result.name);
      setName(result.name);
      let call = "https://businessaide-backend.herokuapp.com/getAllEmployeeSalary/?";
      call = call + "employerName=" + result.name;
      let returned = await (await fetch(call)).json();
      if (returned.status == "error") {
        setErrormessage("You currently have no employees!");
      }
      setEmployees(
        returned.body.map((doc) => ({
          ...doc,
          id: doc,
        }))
      );
    }
  };

  const changeAllQuota = async(employerName, value) =>{
    let call = "https://businessaide-backend.herokuapp.com/changeAllQuota/?";
    call = call + "employerName=" + employerName + "&";
    call = call + "value=" + value;
    let result = await (await fetch(call)).json();
    alert(result.reason);
  }

  const [open, setOpen] = React.useState(false);
const [quota, setQuota] = useState();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  /* 
  const deleteHandler = async (id) => {
    await deleteEmployee(id);
    getEmployees();
  }; */

  /*   {namecards.map(({ id, data: { Firstname, Lastname, TeamLeader } }) => (
        <Cards
          key={id}
          Firstname={Firstname}
          Lastname={Lastname}
          TeamLeader={TeamLeader}
        />
      ))} */

  return errormessage ? (
    <h1>{errormessage}</h1>
  ) : employees.length == 0 ? (
    <div>loading...</div>
  ) : (
    <div>
       <div style={{color: "white"}}>hello</div>
 <Button variant="outlined" onClick={handleClickOpen}>
        Set a Leave Quota for All Employees
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Set the Leave Quota</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Please set an annual leave quota for all the employees. You may also choose to do that for each employee by clicking on each employee.
          </DialogContentText>
          <TextField
            value={quota}
            autoFocus
            margin="dense"
            id="quota"
            label="Annual Leave Quota"
            fullWidth
            variant="standard"
            onChange={(e)=>{setQuota(e.target.value)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{changeAllQuota(name, quota); handleClose()}}>Set Leave Quota</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <div style={{color: "white"}}>hello</div>
      <Grid
        container
        rowSpacing={1}
        columns={12}
        columnSpacing={{
          xs: 2,
          sm: 2,
          md: 3,
        }}
      >
        {employees.map((doc, index) => {
          console.log(doc);
          return (
            <Grid item xs={3} key={doc.name}>
              <Link
                to={"/Individual/" + doc.name}
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
                key={doc.name}
              >
                <Cards
                  key={doc.name}
                  id={doc.name}
                  index={index + 1}
                  fullname={doc.name}
                  employer={name}
                />
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default EmployeesList;
