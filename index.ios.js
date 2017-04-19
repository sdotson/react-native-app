/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import formatTime from 'minutes-seconds-milliseconds';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

export default class stopwatch extends Component {
  constructor(props){
    super(props);
    this.state = {
      timeElapsed: null,
      running: false,
      startTime: null,
      laps: []
    };
  }

  handleStartPress() {
    if (this.state.running) {
      clearInterval(this.interval);
      this.setState({ running: false });
      return
    }

    this.setState({ startTime: new Date() });

    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        running: true
      });
    }, 30);
  }
  handleLapPress() {
    var lap = this.state.timeElapsed;

    this.setState({
      startTime: new Date(),
      laps: this.state.laps.concat([lap])
    });
  }
  startStopButton() {
    var style = this.state.running ? styles.stopButton : styles.startButton;
    return (
      <TouchableHighlight
        underlayColor="gray"
        onPress={this.handleStartPress.bind(this)}
        style={[styles.button, style]}
      >
        <Text>
          {this.state.running ? 'Stop' : 'Start'}
        </Text>
      </TouchableHighlight>
    );
  }
  lapButton() {
    return (
      <TouchableHighlight
        underlayColor="gray"
        onPress={this.handleLapPress.bind(this)}
        style={styles.button}
      >
        <Text>
          Lap
        </Text>
      </TouchableHighlight>
    );
  }
  border(color) {
    return {
      borderColor: color,
      borderWidth: 4
    }
  }
  laps() {
    return this.state.laps.map((time, index) => {
      return (
        <View key={index} style={styles.lap}>
          <Text style={styles.lapText}>
            Lap #{index + 1}
          </Text>
          <Text style={styles.lapText}>
            {formatTime(time)}
          </Text>
        </View>
      );
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.header]}>
          <View style={[styles.timerWrapper]}>
            <Text style={styles.timer}>
              {formatTime(this.state.timeElapsed)}
            </Text>
          </View>
          <View style={[styles.buttonWrapper]}>
            {this.startStopButton()}
            {this.lapButton()}
          </View>
        </View>
        <View style={[styles.footer]}>
          {this.laps()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
  },
  header: {
    flex: 1
  },
  footer: {
    flex: 1
  },
  timerWrapper: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonWrapper: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  timer: {
    fontSize: 60
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  startButton: {
    borderColor: '#00CC00'
  },
  stopButton: {
    borderColor: '#CC0000'
  },
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  lapText: {
    fontSize: 30
  }
});

AppRegistry.registerComponent('stopwatch', () => stopwatch);
