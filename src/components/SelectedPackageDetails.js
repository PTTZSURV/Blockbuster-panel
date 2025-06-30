import * as React from 'react';
import Card from '@mui/joy/Card';
import Divider from '@mui/joy/Divider';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import Check from '@mui/icons-material/Check';

export default function SelectedPackageDetails(props) {
    console.log(props)
    return (
        <Card size="lg" variant="outlined">
            <Typography level="h3">Selected Plan</Typography>
            <Divider inset="none" />
            <List size="sm" sx={{ mx: 'calc(-1 * var(--ListItem-paddingX))' }}>
                <ListItem>
                    <ListItemDecorator>
                        <Check />
                    </ListItemDecorator>
                    Plan Name :<Typography fontWeight={"bold"}>{props.data.planName}</Typography>
                </ListItem>
                {
                    props.data.planName != "Free Account" ?
                        <div>
                            <ListItem>
                                <ListItemDecorator>
                                    <Check />
                                </ListItemDecorator>
                                Surveys : <Typography fontWeight={"bold"}>{props.data.dailySurvey} Surveys per day</Typography>
                            </ListItem>
                            <ListItem>
                                <ListItemDecorator>
                                    <Check />
                                </ListItemDecorator>
                                Withdraw Limit : <Typography fontWeight={"bold"}>Ksh {props.data.minimumWithdrawal}</Typography>
                            </ListItem>
                        </div>
                        : <div></div>
                }

                <ListItem>
                    <ListItemDecorator>
                        <Check />
                    </ListItemDecorator>
                    Monthly Income : <Typography fontWeight={"bold"}>Ksh {props.data.monthlyIncome}</Typography>
                </ListItem>
                <ListItem>
                    <ListItemDecorator>
                        <Check />
                    </ListItemDecorator>
                    Due Today :<Typography fontWeight={"bold"}>Ksh {props.data.price}</Typography>
                </ListItem>
            </List>
        </Card>

    );
}
