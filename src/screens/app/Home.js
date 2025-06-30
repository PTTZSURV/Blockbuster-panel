
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAtom } from 'jotai';
import { completedSurveys, userLoggedIn } from "../../state";
import { Box, Grid, Paper, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Home() {
  const navigate = useNavigate();
  const [doneSurveys] = useAtom(completedSurveys);
  const [loggedIn] = useAtom(userLoggedIn);

  useEffect(() => {
    if (!loggedIn) navigate("/register");
  }, [loggedIn, navigate]);

  const stats = [
    { title: "Total Earnings", value: "KES 5,240", color: "#ff4b2b" },
    { title: "Completed Surveys", value: doneSurveys?.length || 0, color: "#36d1dc" },
    { title: "Referrals", value: "23", color: "#ffc107" }
  ];

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [{
      label: 'Monthly Earnings',
      data: [500, 1200, 900, 1800, 740],
      backgroundColor: ['#ff416c', '#ff4b2b', '#36d1dc', '#5b86e5', '#ffc107']
    }]
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom color="primary">Dashboard Overview</Typography>
      <Grid container spacing={3}>
        {stats.map((item, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Paper elevation={3} sx={{ p: 2, background: item.color, color: "#fff", borderRadius: 2 }}>
              <Typography variant="h6">{item.title}</Typography>
              <Typography variant="h4">{item.value}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 5, background: "#fff", p: 3, borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h5" mb={2}>Earnings Chart</Typography>
        <Bar data={chartData} />
      </Box>
    </Box>
  );
}
