import React from 'react'
import "../assets/css/review.css"
import StarSystem from './StarSystem'
import { makeStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

function Review(props) {
    const classes = useStyles();

    return (
        <div className="review">
            <Avatar className={classes.orange}>{props?.user_name.slice(0,1)}</Avatar>
            <div className='review_about'>
                <p className="text">
                    {props?.user_name}
                </p>
                <div className="dateAndStar">
                    <p className="review_date">{props.date}</p>
                    {props.star_count !== null && <StarSystem numberStar={props?.star_count}/>}
                </div>
                <p className="text">
                    {props?.review}
                </p>
            </div>
        </div>
    )
}

export default Review
