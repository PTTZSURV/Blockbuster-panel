import * as React from 'react';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import Divider from '@mui/joy/Divider';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import Check from '@mui/icons-material/Check';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from "react-router-dom";
import { Chip } from '@mui/joy';

import { useAtom } from 'jotai';
import { subscribedPackage } from "../state";

export default function PricingCard(props) {
  const navigate = useNavigate()

  const [currentPackage, setCurrentPackage] = useAtom(subscribedPackage)
  const validatePayments = () => {
    navigate("/validate", { state: { index: props.index } })
  }

  return (
    <Card size="lg" variant="outlined">
      {
        props.data.planName == currentPackage.planName ?
          <Chip size="sm" variant="outlined" color="primary">
            YOUR CURRENT PLAN
          </Chip>
          :
          <div></div>
      }

      <Typography level="h3">{props.data.planName}</Typography>
      <Divider inset="none" />
      <List size="sm" sx={{ mx: 'calc(-1 * var(--ListItem-paddingX))' }}>
        <ListItem>
          <ListItemDecorator>
            <Check />
          </ListItemDecorator>
          Surveys per day :<Typography fontWeight={"bold"}>{props.data.dailySurvey}</Typography>
        </ListItem>
        {
          props.data.planName != "Free Account" ?
            <div>
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                Earnings per month : <Typography fontWeight={"bold"}>Ksh {props.data.monthlyIncome}</Typography>
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                Daily income : <Typography fontWeight={"bold"}>Ksh {props.data.dailyIncome}</Typography>
              </ListItem>
            </div>
            : <div></div>
        }

        <ListItem>
          <ListItemDecorator>
            <Check />
          </ListItemDecorator>
          Minimum withdrawals : <Typography fontWeight={"bold"}>Ksh {props.data.minimumWithdrawal}</Typography>
        </ListItem>
        <ListItem>
          <ListItemDecorator>
            <Check />
          </ListItemDecorator>
          Earnings per survey<Typography fontWeight={"bold"}>Ksh{props.data.earningPerSurvey}</Typography>
        </ListItem>
      </List>
      <Divider inset="none" />
      {
        props.data.planName != "Free Account" ?
          <CardActions>
            <Typography level="title-lg" sx={{ mr: 'auto' }}>
              {props.data.price} Ksh{' '}
            </Typography>
            <Button
              onClick={validatePayments}
              // variant="soft"
              color="primary"
              endDecorator={<KeyboardArrowRight />}
            >
              Start now
            </Button>
          </CardActions> : <div></div>
      }
    </Card>

  );
}
