import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from "@mui/material";
import { Card, LinearProgress, Container, Typography, Box, Grid, Button, ListDivider } from "@mui/joy";
import { useAtom } from 'jotai';
import { userObject, userLoggedIn } from "../../state";
import logo from "../../assets/logo.png"


const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

export default function Register() {
  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useAtom(userLoggedIn)
  const [user, setUser] = useAtom(userObject)

  const [educationName, setEducationName] = useState("")

  const handleEducationChange = (event) => {
    setEducationName(event.target.value);

  };

  const onTermsChange = (event) => {
    console.log("School", event.target.checked)
    setTermsAccepted(event.target.checked)
  }

  const randomStr = (len, arr) => {
    let ans = '';
    for (let i = len; i > 0; i--) {
      ans +=
        arr[(Math.floor(Math.random() * arr.length))];
    }
    return ans
  }

  if (loggedIn) {
    navigate("/home")
  }
  const [nameError, setNameError] = useState(false);
  const [lastnameError, setLastNameError] = useState(false);
  const [educationError, setEducationError] = useState(false)
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termsError, setTermsError] = useState(false)
  const [showProgressDialog, setProgressDialog] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true)
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    if (data.get('firstName').length < 1) {
      setNameError(true);
      return
    } else {
      setNameError(false);
    }

    if (data.get('lastName').length < 1) {
      setLastNameError(true);
      return
    } else {
      setLastNameError(false);
    }

    if (educationName.length < 1) {
      setEducationError(true)
      return
    } else {
      setEducationError(false)
    }


    if (!data.get('email').match(isValidEmail)) {
      setEmailError(true);
      return
    } else {
      setEmailError(false);
    }

    if (data.get('password') < 6) {
      setPasswordError(true);
      return
    } else {
      setPasswordError(false);
    }

    if (!termsAccepted) {
      setTermsError(true)
      return
    } else {
      setTermsError(false)
    }

    setProgressDialog(true)
    setTimeout(() => {
      setUser((prev) => ({
        ...prev,
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        education: educationName,
        email: data.get('email'),
        password: data.get('password'),
        referralCode: randomStr(10, '12345ABCDE')
      }))
      setLoggedIn(true)
      setProgressDialog(false)
      navigate("/referralCode")
    }, 5000);
  };

  return (

    <Container component="main" maxWidth="xs">

      <Card
        variant="soft"
        size="lg"
        sx={{
          marginTop: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          sx={{
            height: 20,
            width: 75,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt="The house from the offer."
          src={logo}
        />
        <ListDivider />
        <Typography fontWeight={"bold"} level="h4">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            autoComplete="given-name"
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="First Name"
            error={nameError}
            helperText={nameError ? "Please enter your first name" : ""}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            error={lastnameError}
            helperText={lastnameError ? "Please enter your last name" : ""}
            autoComplete="family-name"
          />
          {/* <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DemoItem sx={{ mt: 2 }}>
              <DatePicker
                label="Date of Birth"
                openTo="year"
                value={dob}
                onChange={handleDobChange}
                error={nameError} />
            </DemoItem>
            <Typography sx={{ ml: 2, mt: 0.5 }} level="title-sm" align="left" color="danger">You are below are require age</Typography>
          </LocalizationProvider> */}

          <FormControl fullWidth sx={{ mt: 2, mb: 1 }}>
            <InputLabel id="demo-simple-select-label">Level of Education *</InputLabel>
            <Select
              align="left"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={educationName}
              label="Level of Education *"
              onChange={handleEducationChange}
            >
              <MenuItem value="High School">High School</MenuItem>
              <MenuItem value="Diploma">Diploma</MenuItem>
              <MenuItem value="Bachelors Degree">Bachelors Degree</MenuItem>
              <MenuItem value="Masters Degree">Masters Degree</MenuItem>
            </Select>
          </FormControl>
          {
            educationError ?
              <Typography sx={{ ml: 2, mt: 0 }} level="title-sm" align="left" color="danger">Select level of education</Typography>
              :
              ""
          }


          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            error={emailError}
            helperText={emailError ? "Please enter a valid email" : ""}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            error={passwordError}
            helperText={passwordError ? "Password too short" : ""}
          />

          <FormControlLabel
            control={
              <div>
                <Checkbox checked={termsAccepted} color="primary" onChange={e => onTermsChange(e)} />
                <Link href="/register" variant="body2">
                  {"Accept Our Terms and Condition"}
                </Link>
              </div>
            }
          />
          {
            termsError ? <Typography level="title-sm" color="danger">Accept our terms and conditions to continue</Typography>
              :
              ""
          }
          {
            showProgressDialog ? <LinearProgress sx={{ mt: 1 }} /> : <div></div>
          }

          <Button
            type="submit"
            fullWidth
            variant="solid"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container >
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Card>

    </Container>

  );
}