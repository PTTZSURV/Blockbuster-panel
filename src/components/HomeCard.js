import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Divider } from '@mui/material';

import { useAtom } from 'jotai';
import { userObject } from "../state";
import { AccountBalanceWallet, AccountCircleOutlined, Loop, Loyalty } from '@mui/icons-material';

export default function HomeCard() {
    const navigate = useNavigate()

    const [user, setUser] = useAtom(userObject)
    const viewEarnings = () => {
        navigate("/profile")
    }
    const viewRefarrals = () => {
        navigate("/referrals")
    }
    return (
        <div>
            <Card variant="soft">
                <div>
                    <Typography>Total Balance</Typography>
                    <Typography level="title-lg">
                        Ksh {user.accountBalance}.00</Typography>
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
                <Divider />
                <CardContent orientation="horizontal">
                    <div>
                        <Typography align="left">
                            Your Balance:</Typography>
                        <Typography level="title-lg" align="left" startDecorator={<AccountBalanceWallet />}>
                            Ksh {user.accountBalance}.00
                        </Typography>
                    </div>
                    <Button
                        onClick={viewEarnings}
                        variant="solid"
                        size="md"
                        color="primary"
                        endDecorator={<AccountCircleOutlined />}
                        aria-label="Explore Bahamas Islands"
                        sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                    >
                        Profile
                    </Button>
                </CardContent>
                <CardContent orientation="horizontal">
                    <div>
                        <Typography align="left">Loyalty Points:</Typography>
                        <Typography level="title-lg" align="left" startDecorator={<Loyalty />}>
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
            </Card>
        </div>
    )
}
