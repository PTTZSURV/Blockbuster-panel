import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Payments, Quiz, StarBorderOutlined, Stars } from '@mui/icons-material';
import { Chip, DialogContent, DialogTitle, FormControl, FormLabel, Modal, ModalDialog } from '@mui/joy';

import { useAtom } from 'jotai';
import { surveyValidation, subscribedPackage } from "../state";
import { Stack } from '@mui/material';



export default function HomeSurveyItem(props) {
    const [getValidation, setValidation] = useAtom(surveyValidation)
    const [currentPackage,] = useAtom(subscribedPackage)
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("")
    const navigate = useNavigate()


    const calculateNavigation = () => {
        var dateNow = new Date().toLocaleDateString()
        if (dateNow == getValidation.date) {
            console.log("count", getValidation.count, currentPackage.dailySurvey)
            if (getValidation.count < currentPackage.dailySurvey) {
                navigate("/survey", { state: { Id: props.Id } })
            } else {
                setMessage("You have reached your today limit")
                setOpen(true)
            }
        } else {
            setValidation((item) => ({
                ...item,
                date: dateNow
            }))
            navigate("/survey", { state: { Id: props.Id } })
        }
    }


    const startSurvey = () => {
        if (props.Id == "1") {
            navigate("/survey", { state: { Id: props.Id } })
        } else {
            if (props.survey.surveyPaid) {
                if (currentPackage.planName == "Free Account") {
                    setMessage("This is a premium survey")
                    setOpen(true)
                    console.log("This is a paid package. Subscribe")
                } else {
                    calculateNavigation()
                }
            } else {
                calculateNavigation()
            }
        }
    }
    return (
        <div>
            <Card size="sm" sx={{ mt: 1.5 }}>
                <CardContent orientation="horizontal" sx={{ m: 1 }}>
                    <div>
                        <Typography fontWeight={"bold"} align="left" >{props.survey.surveyCategory}</Typography>
                        <Typography align="left" startDecorator={<Quiz />}>
                            Questions :  <Typography fontWeight={"bold"} align="left">
                                <Typography color='primary' fontWeight={"bold"} align="left">{props.survey.surveyQuestions.length}</Typography>
                            </Typography>
                        </Typography>
                        <Typography align="left" startDecorator={<Payments />}>
                            Payout :
                            {/* <Chip align="left" sx={{ m: 0.1 }} variant="outlined" color="primary"> */}
                            <Typography variant="outlined"
                                color="primary"
                                // startDecorator={<Paid />} 
                                fontWeight={"bold"} align="left">
                                Ksh {props.survey.surveyAmount}
                            </Typography>
                            {/* </Chip> */}
                        </Typography>
                    </div>
                    <Button
                        onClick={startSurvey}
                        variant="solid"
                        size="md"
                        color="primary"
                        aria-label="Explore Bahamas Islands"
                        sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}>
                        Take Survey
                    </Button>
                    {props.survey.surveyPaid ? <StarBorderOutlined style={{ color: "orange" }}
                        sx={{ position: 'absolute', top: '0.8rem', left: '14rem' }} /> : <div></div>}
                </CardContent>
            </Card>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog>
                    <DialogTitle>{message}</DialogTitle>
                    <DialogContent>Upgrade your account to access this and more surveys and earn more</DialogContent>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            setOpen(false);
                            navigate("/packages")
                        }}
                    >
                        <Stack spacing={2}>
                            <Button type="submit">UPGRADE ACCOUNT</Button>
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </div>
    )
}
