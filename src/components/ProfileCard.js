import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { AccountBalance, AccountCircleOutlined, Add, EmailOutlined, ListAltOutlined, Loop, Loyalty, Paid, Quiz, Star, Stars } from '@mui/icons-material';
import { Box, Divider } from '@mui/joy';

import { useAtom } from 'jotai';
import mpesaLogo from '../assets/mpesa.png'
import { userObject, userLoggedIn, paymentDetails, subscribedPackage } from "../state";

export default function ProfileCard() {
    const navigate = useNavigate()
    const [loggedIn, setLoggedIn] = useAtom(userLoggedIn)
    const [user, setUser] = useAtom(userObject)
    const [currentPackage, setCurrentPackage] = useAtom(subscribedPackage)
    const [payments, setPayments] = useAtom(paymentDetails)

    const [surveysLength, setSurveysLength] = useState([]);

    useEffect(() => {
        fetch('https://derekkemoi.github.io/SurveyMonie/surveys.json')
            .then(response => response.json())
            .then(data => {
                setSurveysLength(data.surveys.length)
            });
    }, []);


    const takeSurveys = () => {
        navigate("/home")
    }
    const upgrade = () => {
        navigate("/packages")
    }
    const Addpayments = () => {
        navigate("/payments")
    }
    const viewRefarrals = () => {
        navigate("/referrals")
    }
    const withdraw = () => {
        navigate("/withdraw")
    }
    return (
        <div>
            <Card level="body-sm" sx={{ mx: 'calc(-1 * var(--ListItem-paddingX))' }}>
                <div>
                    <Typography align="left" level="title-lg" startDecorator={<AccountCircleOutlined />}>{user.firstName} {user.lastName}</Typography>
                    <Typography align="left" startDecorator={<EmailOutlined />}>{user.email}</Typography>
                    <Divider />
                    {/* <IconButton
                        aria-label="bookmark Bahamas Islands"
                        variant="plain"
                        color="neutral"
                        size="sm"
                        sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
                    >
                        <BookmarkAdd />
                    </IconButton> */}
                </div>
                <CardContent orientation="horizontal">
                    <div>
                        <Typography align="left">Account type:</Typography>
                        <Typography align="left" level="title-lg" startDecorator={<Star />}>
                            {currentPackage.planName}
                        </Typography>
                        <Typography align="left" variant="outlined"
                            color="primary">
                            {currentPackage.dailySurvey} surveys per day
                        </Typography>
                    </div>
                    <Button
                        onClick={upgrade}
                        variant="solid"
                        size="md"
                        color="warning"
                        endDecorator={<Stars />}
                        aria-label="Explore Bahamas Islands"
                        sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                    >
                        Upgrade
                    </Button>
                </CardContent>
                <Divider />
                <CardContent orientation="horizontal">
                    <div>
                        <Typography >Account Balance :</Typography>
                        <Typography align="left" level="title-lg" startDecorator={<AccountBalance />}>
                            Ksh {user.accountBalance}
                        </Typography>
                    </div>
                    <Button
                        onClick={withdraw}
                        variant="solid"
                        size="md"
                        color="success"
                        endDecorator={<Paid />}
                        aria-label="Explore Bahamas Islands"
                        sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                    >
                        Withdraw
                    </Button>
                </CardContent>
                <Divider />
                <CardContent orientation="horizontal">
                    <div>
                        <Typography align="left">Available Surveys:</Typography>
                        <Typography align="left" level="title-lg" startDecorator={<Quiz />}>
                            {surveysLength}
                        </Typography>
                    </div>
                    <Button
                        onClick={takeSurveys}
                        variant="solid"
                        size="md"
                        color="primary"
                        endDecorator={<ListAltOutlined />}
                        aria-label="Explore Bahamas Islands"
                        sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                    >
                        Surveys
                    </Button>
                </CardContent>
                <Divider />
                <CardContent orientation="horizontal">
                    <div>
                        <Typography>Loyalty points:</Typography>
                        <Typography align="left" level="title-lg" startDecorator={<Loyalty />}>
                            {user.loyaltyPoints}
                        </Typography>
                    </div>
                    <Button
                        onClick={viewRefarrals}
                        variant="solid"
                        size="md"
                        color="primary"
                        endDecorator={<Loop />}
                        aria-label="Explore Bahamas Islands"
                        sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                    >
                        Referrals
                    </Button>
                </CardContent>
                <Divider />
                <CardContent orientation="horizontal">
                    <div>
                        <Typography align="left">Payments details:</Typography>
                        {
                            payments.added ?
                                <div>
                                    <Typography align="left">Method :
                                        <Box
                                            component="img"
                                            sx={{
                                                height: 45,
                                                width: 70,
                                                maxHeight: { xs: 233, md: 167 },
                                                maxWidth: { xs: 350, md: 250 },
                                            }}
                                            alt="The house from the offer."
                                            src={mpesaLogo}
                                        />
                                    </Typography>

                                    <Typography align="left">Name :
                                        <Typography align="right" fontWeight="bold">
                                            {payments.mpesaName}
                                        </Typography></Typography>

                                    <Typography align="left">No :
                                        <Typography align="right" fontWeight="bold">
                                            {payments.mpesaNumber}
                                        </Typography></Typography>
                                </div>

                                :
                                <Typography align="left" level="title-lg">
                                    Not Provided
                                </Typography>
                        }

                    </div>
                    <Button
                        onClick={Addpayments}
                        variant="solid"
                        size="md"
                        color="primary"
                        aria-label="Explore Bahamas Islands"
                        endDecorator={<Add />}
                        sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                    >
                        {
                            payments.added ? <span>Update</span> : <span>Add</span>
                        }
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
