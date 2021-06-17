import { FC, useState } from 'react';
import classNames from 'classnames';
import { Grid, IconButton, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBackIos';
import ArrowForward from '@material-ui/icons/ArrowForwardIos';
import { makeStyles } from '@material-ui/core/styles';

const weeks = [21, 22, 23, 24, 25, 26, 27, 28];

const useStyles = makeStyles((theme) => ({
  slideContainer: {
    width: 210,
    overflow: 'hidden',
    display: 'flex',
    position: 'relative',

    '&::before': {
      display: 'block',
      content: '""',
      background: `linear-gradient(to right, ${theme.palette.background.default} 30%, rgba(0, 0, 0, 0))`,
      position: 'absolute',
      width: 70,
      height: 56,
      left: 0,
      zIndex: theme.zIndex.appBar,
    },

    '&::after': {
      display: 'block',
      content: '""',
      background: `linear-gradient(to left, ${theme.palette.background.default} 30%, rgba(0, 0, 0, 0))`,
      position: 'absolute',
      width: 70,
      height: 56,
      right: 0,
    },
  },
  slider: {
    transition: theme.transitions.create('transform', { easing: 'ease-in-out' }),
  },
  sliderItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    flex: '0 0 70px',
    height: 56,
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  weekItem: {
    transition: theme.transitions.create(['color', 'font-size'], { easing: 'ease-in-out' }),
    fontSize: '2rem',
    color: theme.palette.text.secondary,
  },
  currentWeek: {
    fontSize: '3rem',
    color: theme.palette.primary.main,
  },

  [theme.breakpoints.up('md')]: {
    slideContainer: {
      width: 350,
    },
  },
}));

const WeekSlider: FC = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const [currentIndex, setIndex] = useState(0);
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Grid item className={classes.buttonContainer}>
        <IconButton onClick={() => setIndex(Math.max(0, currentIndex - 1))}>
          <ArrowBack />
        </IconButton>
      </Grid>
      <Grid item className={classes.slideContainer}>
        <Grid
          container
          wrap="nowrap"
          className={classes.slider}
          style={{
            transform: `translateX(${(isMd ? 140 : 70) - currentIndex * 70}px)`,
          }}
        >
          {weeks.map((week, index) => {
            const textClass = classNames(classes.weekItem, {
              [classes.currentWeek]: currentIndex === index,
            });

            return (
              <Grid item className={classes.sliderItem} key={week}>
                <Typography variant="h3" className={textClass}>
                  {week}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Grid item className={classes.buttonContainer}>
        <IconButton onClick={() => setIndex(Math.min(weeks.length - 1, currentIndex + 1))}>
          <ArrowForward />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default WeekSlider;
