import * as React from "react";
import { useState,useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Paper from "@mui/material/Paper";
import { LOGOUT,FETCH_EVENTS } from "../redux/type";
import { setEventDataforUser, getEventDataforUser } from "../utility/utility";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';


const theme = createTheme();
const defaultformState = {
  eventName: "",
  eventDate: null,
  eventDesc: "",
  bookingType: "",
  termsAccepted: false,
  price: "",
};

function preventDefault(event) {
  event.preventDefault();
}

export default function Events() {
  const [formData, setFormData] = useState(defaultformState);
  const loggedInUser = useSelector((state)=>state.loggedInUser);
  console.log(loggedInUser);
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const data = getEventDataforUser(loggedInUser);
    console.log(data);
    dispatch({type:FETCH_EVENTS, payload:data});
    setRows(data);  
  },[loggedInUser])

  const isFormFilled = () => {
    return (
      formData.eventDate &&
      formData.eventDesc &&
      formData.eventName &&
      formData.price &&
      formData.termsAccepted &&
      formData.bookingType
    );
  };

  const handleChange = (newData) => {
    setFormData({ ...formData, ...newData });
  };

  const handleSubmit = (e) => {
    preventDefault(e);
    console.log(formData);
    if (isFormFilled(formData)) {
      setRows([...rows, formData]);
      setEventDataforUser(loggedInUser, rows);
      setFormData(defaultformState);
    } else {
      alert("please fill all required fields");
    }
  };

  const onLogout = () => {
    setEventDataforUser(loggedInUser, rows);
    dispatch({type:LOGOUT});
    navigate("/");
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Container maxWidth="xxl" sx={{ mt: 4, mb: 4 }}>
            <Box container spacing={2} xs={12}  sx={{
                p: 2,
                textAlign:"right",
              }} >
              <Button onClick = {onLogout} size = {"small"} primary variant="contained">
                Logout
              </Button>
              
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          autoComplete="event-name"
                          name="eventName"
                          required
                          fullWidth
                          id="eventName"
                          label="Event Name"
                          autoFocus
                          value={formData.eventName}
                          onChange={(e) => {
                            handleChange({ eventName: e.target.value });
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            sx={{ width: "100%" }}
                            label="Event Date"
                            value={formData.eventDate}
                            onChange={(newValue) =>
                              handleChange({ eventDate: newValue })
                            }
                          />
                        </LocalizationProvider>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          required
                          fullWidth
                          id="eventDesc"
                          label="Event Description"
                          name="eventDesc"
                          autoComplete="eventDesc"
                          value={formData.eventDesc}
                          onChange={(e) => {
                            handleChange({ eventDesc: e.target.value });
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <RadioGroup
                          row
                          required
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          sx={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                          value={formData.bookingType}
                          onChange={(e) => {
                            handleChange({ bookingType: e.target.value });
                          }}
                        >
                          <FormControlLabel
                            value="premium"
                            control={<Radio />}
                            label="Premium"
                          />
                          <FormControlLabel
                            value="normal"
                            control={<Radio />}
                            label="Normal"
                          />
                        </RadioGroup>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          type="number"
                          required
                          fullWidth
                          id="price"
                          label="Price"
                          name="price"
                          autoComplete="price"
                          value={formData.price}
                          onChange={(e) => {
                            handleChange({ price: e.target.value });
                          }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={formData.termsAccepted}
                              color="primary"
                              onChange={(e) => {
                                handleChange({
                                  termsAccepted: !formData.termsAccepted,
                                });
                              }}
                            />
                          }
                          label="I accept terms & conditions."
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      variant="contained"
                      size="small"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Submit
                    </Button>
                  </Box>
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <React.Fragment>
                    {/* <Title>Recent Orders</Title> */}
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Event Name</TableCell>
                          <TableCell>Event Date</TableCell>
                          <TableCell>Event Description</TableCell>
                          <TableCell>Booking Type</TableCell>
                          <TableCell align="right">Price</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell>{row.eventName}</TableCell>
                            <TableCell>
                              {row.eventDate.toLocaleString()}
                            </TableCell>
                            <TableCell>{row.eventDesc}</TableCell>
                            <TableCell>{row.bookingType}</TableCell>
                            <TableCell align="right">{`${row.price}`}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </React.Fragment>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
