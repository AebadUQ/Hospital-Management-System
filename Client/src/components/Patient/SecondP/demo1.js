import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    padding:"auto",
    marginLeft:"5%",
    marginRight:"5%",
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
    color:"blue",
  },
  pos: {
    marginBottom: 12,
  },
  k:{
    color:"blue",
  },
});

export default function OutlinedCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h2" component="h2" >
        <span className="k">  Quality Assurance</span>
        </Typography>
        {/* 
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography> */}
        <Typography variant="body2" component="p">
        The Department of Quality Assurance (QA) at ABC Hospital focuses on hospital performance in quality services, customer (patient) satisfaction and continuous improvement. We make sure that the services being provided and developed are meeting our specific requirements and set targets. We have a system to increase patients’ confidence and reliability to improve our work process and competence
          <br />
          At present all departments of three campuses are ISO 9001:2015 certified by SGS, a Swiss inspection, verification, testing and Certification Services Company. We look towards the horizon, having more valuable international accreditations in the future.
        </Typography>
      </CardContent>
     
    </Card>
  );
}
