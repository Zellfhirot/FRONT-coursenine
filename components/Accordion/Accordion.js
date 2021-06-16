import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './Accordion.css';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Media from '../Media/Media'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SimpleAccordion(props) {
  const classes = useStyles();
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    setReviews(props.reviews)
  })

  const drawList = () => {
    if (reviews.length > 0) {
      return reviews.map(el => <div className="reviewAcc"><Media media={el.valoracion} /><p>{el.descripcion}</p> </div>)
    }
  }

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Ver todas las opiniones</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {drawList()}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}