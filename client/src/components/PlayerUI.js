import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {Paper, Grid, IconButton, SvgIcon, Avatar, Typography} from '@material-ui/core';
import { rotatein } from 'react-animations';
import classNames from 'classnames';
import { updateCurrentTrack } from '../actions/playerAction';


const buttonGradientBackground = 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)';

const styles = theme => ({
  '@keyframes rotatein': rotatein,
  playerContainer: {
    backgroundColor: '#EFEFEF',
    height: '60px',
    width: '100%',
    position: 'fixed',
    bottom: 0,
    left: 0,
    opacity: 1,
    color: 'black'
  },
  playerTopControlsContainer : {
    padding: '0'
  },
  playerTopControlsLeftContainer : {
    padding: '0',
    width: '60%',
    marginTop: '-5px',
  },
  playerTopControlsRightContainer : {
    padding: '0',
    width: '30%',
    marginTop: '-5px',
  },
  playerBottomControlsContainer : {
    margin: '0 auto',
    padding: '0',
  },
  playerMainContainer: {
    borderTop: '1px solid #C9C9C9',
  },
  ControlsMainContainer: {
    height: '60px',
    flex: 3
  },
  playerAlbumInfoContainer: {
    height: '60px',
    flex: 1
  },
  albumThumbnailContainer: {
    flex: 1,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  },
  playerTrackInfoContainer: {
    width: '100%',
  },
  playerVolumeSlider: {
    width: theme.spacing.unit * 20,
    height: theme.spacing.unit * 8
  },
  playerSeekbarSlider: {
    width: theme.spacing.unit * 50,
  },
  timer: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    fontSize: theme.spacing.unit * 1.8
  },
  volumeItem: {
    flex: 1
  },
  albumThumbnail: {
    width: 80,
    height: 80
  },
  albumAnimation: {
    animationName: 'rotatein',
    animationDuration: '0.2s',
  },
  playerTitle: {
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
  },
  playerIcon: {
    fontFamily: 'icomoon',
    fontSize: '12px',
    color: 'black',
  },
});

class PlayerUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      isMuted: false,
      volumeAmount: 25,
      sliderAmount: 0,
      props: this.props
    }
  }

  _handlePlay() {
    const {
      play,
      currentTrack,
    } = this.props;

    play(currentTrack.trackId);
    this.setState({
      isPlaying: true
    })
  }

  _handlePause() {
    this.props.pause();
    this.setState({
      isPlaying: false
    })
  }

  handleVolumeChange = (e) => {
    const {
      volume,
    } = this.props;

    volume(e.target.value);

    this.setState({
      volumeAmount: e.target.value,
    });
  }

  handleSliderChange = (e) => {
    const {
      seek,
    } = this.props;

    seek(e.target.value);
    this.setState({
      sliderAmount: e.target.value,
    });
  }

  render() {
    const {
      classes,
      currentTrack,
    } = this.props;
    const {
      volumeAmount,
      sliderAmount,
    } = this.state;

    const duration = currentTrack.duration.split(":");
    const totalSeconds = (+duration[0]) * 60 + (+duration[1]);
    const sliderPercent = sliderAmount/totalSeconds * 100.;

    const volumePercent = volumeAmount;

    const rangeStyles = StyleSheet.create({
      sliderStyles: {
        backgroundImage: `
          -webkit-gradient(linear, left top, right top, color-stop(${sliderPercent}%, #4F4F4F), color-stop(${sliderPercent}%, #FFFFFF));
          -moz-linear-gradient(left center, #4F4F4F 0%, #4F4F4F ${sliderPercent}%, #FFFFFF ${sliderPercent}%, #FFFFFF 100%)`,
        width: '500px',
      },
      volumeStyles: {
        backgroundImage: `
          -webkit-gradient(linear, left top, right top, color-stop(${volumePercent}%, #4F4F4F), color-stop(${volumePercent}%, #FFFFFF));
          -moz-linear-gradient(left center, #4F4F4F 0%, #4F4F4F ${volumePercent}%, #FFFFFF ${volumePercent}%, #FFFFFF 100%)`,
      },
    });

    return (
      <Paper className={classes.playerContainer} elevation={0}>
        <div>
         {/****** main player container *******/}
          <Grid container
            className={classes.playerMainContainer}
            direction='row'
            justify='center'
            alignItems='center'
          >
            <Grid container
              className={classes.playerAlbumInfoContainer}
              justify='center'
              alignItems='center'
            >
              <Grid container
                className={classes.playerTrackInfoContainer}
                direction='column'
                justify='center'
                alignItems='flex-start'
              >
                <div className={classes.playerTitle}>
                  {currentTrack.title} - {currentTrack.artists}
                </div>
              </Grid>
            </Grid>
            <Grid container
              className={classes.ControlsMainContainer}
              direction='column'
              justify='center'
              alignItems='center'
            >
              <Grid container
                className={classes.playerTopControlsContainer}
                justify='center'
                direction='row'
                alignItems='center'
              >
                <Grid container
                  className={classes.playerTopControlsLeftContainer}
                  justify='flex-end'
                  alignItems='center'
                  direction='row'
                >
                  <Grid item>
                    <IconButton aria-label="Previous" >
                      <div className={classNames(classes.playerIcon, 'icon-mm-icon-previous')} />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    {this.state.isPlaying ?
                        (
                          <IconButton aria-label="Pause">
                            <div onClick={this._handlePause.bind(this)} className={classNames(classes.playerIcon, 'icon-mm-icon-pause')} />
                          </IconButton>
                        ) : (
                          <IconButton aria-label="Play">
                            <div onClick={this._handlePlay.bind(this)} className={classNames(classes.playerIcon, 'icon-mm-icon-play')} />
                          </IconButton>
                        )
                    }
                  </Grid>
                  <Grid item>
                    <IconButton aria-label="Next" >
                      <div onClick={this.props.updateCurrentTrack} className={classNames(classes.playerIcon, 'icon-mm-icon-next')} />
                    </IconButton>
                  </Grid>


                  <Grid item>
                    <Typography variant="body2" component="p" className={classes.timer}>0:00 </Typography>
                  </Grid>
                  <Grid item>
                    <input
                      type="range"
                      step={0.01}
                      max={totalSeconds}
                      value={sliderAmount}
                      onChange={this.handleSliderChange}
                      className={css(rangeStyles.sliderStyles)}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" component="p" className={classes.timer}> {currentTrack.duration}</Typography>
                  </Grid>
                </Grid>
                <Grid container
                  className={classes.playerTopControlsRightContainer}
                  justify='flex-start'
                  alignItems='center'
                  direction='row'
                 >
                  <Grid item>
                    <IconButton aria-label="Loop" >
                      <div className={classNames(classes.playerIcon, 'icon-mm-icon-loop')} />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton aria-label="Shuffle" >
                      <div className={classNames(classes.playerIcon, 'icon-mm-icon-shuffle')} />
                    </IconButton>
                  </Grid>

                  <Grid item className={classes.volume}>
                    {!this.state.isMuted ?
                      (
                        <IconButton aria-label="Mute" >
                          <div onClick={this._handleMuteUnmute} className={classNames(classes.playerIcon, 'icon-mm-icon-volume')} />
                        </IconButton>
                      ) : (
                        <IconButton aria-label="Unmute" >
                          <div onClick={this._handleMuteUnmute} className={classNames(classes.playerIcon, 'icon-mm-icon-mute')} />
                        </IconButton>
                      )
                    }
                  </Grid>
                  <Grid
                    item
                    className={classes.volume}
                  >
                    <input
                      type="range"
                      step={0.01}
                      min={0}
                      max={100}
                      value={volumeAmount}
                      onChange={this.handleVolumeChange}
                      className={css(rangeStyles.volumeStyles)}
                    />
                  </Grid>
                  <Grid item className={classes.volume}>
                    <IconButton aria-label="More">
                      <div className={classNames(classes.playerIcon, 'icon-mm-icon-hamburger')} />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  currentTrack: state.player.currentTrack,
})

PlayerUI.propTypes = {
  classes: PropTypes.object.isRequired,
  currentTrack: PropTypes.object.isRequired,
  playerType: PropTypes.string,
  play: PropTypes.func,
  pause: PropTypes.func,
  volume: PropTypes.func,
  isPlaying: PropTypes.bool,
  isMuted: PropTypes.bool,
};

export default withStyles(styles)(connect(mapStateToProps, { updateCurrentTrack })(PlayerUI));
