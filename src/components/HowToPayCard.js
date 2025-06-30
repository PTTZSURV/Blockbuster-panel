import * as React from 'react';
import Card from '@mui/joy/Card';
import Divider from '@mui/joy/Divider';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import Check from '@mui/icons-material/Check';
import { IconButton } from '@mui/joy';
import { CopyAll } from '@mui/icons-material';

export default function HowToPayCard(props) {
    const copyToClipBoard = () => {
        window.alert("Till number " + props.data.tillNumber)
        navigator.clipboard.writeText(props.data.tillNumber);
    }
    return (
        <Card size="lg" variant="outlined">
            <Typography level="h3">How To Pay</Typography>
            <Divider inset="none" />
            <List size="sm" sx={{ mx: 'calc(-1 * var(--ListItem-paddingX))' }}>
                <ListItem>
                    <ListItemDecorator>
                        <Check />
                    </ListItemDecorator>
                    Go to M-PESA
                </ListItem>
                {
                    props.data.planName != "Free Account" ?
                        <div>
                            <ListItem>
                                <ListItemDecorator>
                                    <Check />
                                </ListItemDecorator>
                                Select : <Typography fontWeight={"bold"}>Lipa na M-PESA</Typography>
                            </ListItem>
                            <ListItem>
                                <ListItemDecorator>
                                    <Check />
                                </ListItemDecorator>
                                Select : <Typography fontWeight={"bold"}>Buy Goods and Services</Typography>
                            </ListItem>
                        </div>
                        : <div></div>
                }

                <ListItem>
                    <ListItemDecorator>
                        <Check />
                    </ListItemDecorator>
                    Enter till no : <Typography fontWeight={"bold"}>{props.data.tillNumber}</Typography>

                    <IconButton variant="solid" color='primary' onClick={copyToClipBoard}>
                        <CopyAll />
                    </IconButton>

                </ListItem>
                <ListItem>
                    <ListItemDecorator>
                        <Check />
                    </ListItemDecorator>
                    Enter amount :<Typography fontWeight={"bold"}>Ksh {props.amount}</Typography>
                </ListItem>
            </List>
        </Card>
    );
}
