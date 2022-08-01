import React from "react";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { Card, List, ListItem, Paper } from "@mui/material";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import SendIcon from "@mui/icons-material/Send";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import { config as firebaseConfig } from "./config";
import { useEffect } from "react";
import { useState } from "react";
import { Typography } from "@mui/material";

export default function Welcome() {
  const theme = createTheme({
    typography: {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
  });

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth();
  const user = auth.currentUser;
  //const q = query(collection(db, "users"), where("uid", "==", user.uid));
  // const docs = await getDocs(q);
  const [username, setUsername] = useState();
  const FindUserType = async (email) => {
    let call = "https://businessaide-backend.herokuapp.com/findUserType/?";
    call = call + "email=" + email;
    let result = await (await fetch(call)).json();
    console.log(result);
    //setUsertype(result.body);
    //setUsername(result.name);
    setUsername(result.name);
  };
  useEffect(() => {
    FindUserType(user.email);
  }, []);
  //console.log(user.uid);
  return username ? (
    <ThemeProvider theme={theme}>
      <div>
        <h1>Welcome {username}!</h1>
        <List>
          <ListItem>
            <Card>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <Typography
                sx={{
                  fontFamily: '"Segoe UI"',
                }}
                variant="h6"
              >
                To view or add payroll, please go to the "payroll" page and
                click on each salary. You will be able to create new payroll
                there
              </Typography>
            </Card>
          </ListItem>
          <ListItem>
            <Card>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <Typography fontFamily={'"Segoe UI"'} variant="h6">
                To create a task, please go to the "add task" page and fill in
                all the fields. Please remember to register an employee using
                the secret code you created before creating task because
                otherwise there will be no whom employee you can assign the task
                to
              </Typography>
            </Card>
          </ListItem>
          <ListItem>
            <Card>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <Typography fontFamily={'"Segoe UI"'} variant="h6">
                To view each individual task, please to go to the "view task"
                page and click on each of the task
              </Typography>
            </Card>
          </ListItem>
          <ListItem>
            <Card>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <Typography fontFamily={'"Segoe UI"'} variant="h6">
                To create a subtask, please set the goal as a number
              </Typography>
            </Card>
          </ListItem>
          <ListItem>
            <Card>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <Typography fontFamily={'"Segoe UI"'} variant="h6">
                To increase the task progress, please enter a number and click
                "increase progress by"
              </Typography>
            </Card>
          </ListItem>
        </List>
      </div>
    </ThemeProvider>
  ) : (
    <div>loading...</div>
  );
}
