import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { Card, LinearProgress, Container, Typography, Box, Grid, Button, ListDivider } from "@mui/joy";
import logo from "../../assets/logo.png"


export default function ReferralCode() {
  const [showProgressDialog, setProgressDialog] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setCodeError(true);
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
          Get 200 Loyalty Points
        </Typography>
        <Typography>
          If you are invited by someone, please enter your invitation code to earn your first 10 credits
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            name="referralCode"
            required
            fullWidth
            id="referralCode"
            label="Referral Code"
            error={codeError}
            helperText={codeError ? "Please enter a valid code" : ""}
            autoFocus
          />

          {
            showProgressDialog ? <LinearProgress sx={{ mt: 1 }} /> : <div></div>
          }

          <Button
            type="submit"
            fullWidth
            variant="solid"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
          <Grid container >
            <Grid item>
              <Link href="/" variant="body2">
                I don't have a referral code
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Card>

    </Container>

  );
}
