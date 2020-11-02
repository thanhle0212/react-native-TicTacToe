/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1
    }
  };

  initializeGame = () => {
    this.setState(
      {
        gameState: [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ], currentPlayer: 1
      }
    )
  }

  componentdidMount() {
    this.initializeGame();
  }

  onTitlePress = (row, col) => {
    var arr = this.state.gameState.slice();
    if (arr[row][col] == 0) {
      var currentPlayer = this.state.currentPlayer;
      arr[row][col] = currentPlayer;
      this.setState({ gameState: arr });

      // Switch player
      var nextPlayer = currentPlayer == 1 ? -1 : 1;

      this.setState({ currentPlayer: nextPlayer });

      var gameCheck = this.getWinner();
      switch (gameCheck)
      {
        case 1:
          Alert.alert('Player 1 won');
          this.initializeGame();
          return;
          case -1:
            Alert.alert('Play 2 won');
            this.initializeGame();
            return;
      }
    
    } else {
      return;
    }
  }

  getWinner() {
    var sum = 0;

    // check row
    for (var i = 0; i < 3; i++) {
      sum = this.state.gameState[i][0] + this.state.gameState[i][1] + this.state.gameState[i][2];
      if (sum == 3) {
        return 1; // Player 1 win
      }
      else if(sum == -3){
        return -1; // Player 2 win
      }
    }

    // check col
    for (var i = 0; i < 3; i++) {
      sum = this.state.gameState[0][i] + this.state.gameState[1][i] + this.state.gameState[2][i];
      if (sum == 3) {
        return 1; // Player 1 win
      }
      else if(sum == -3){
        return -1; // Player 2 win
      }
    }

    // Check diagonals
    sum = this.state.gameState[0][0] + this.state.gameState[1][1] + this.state.gameState[2][2];
    if (sum == 3) {
      return 1; // Player 1 win
    }
    else if(sum == -3){
      return -1; // Player 2 win
    }

    sum = this.state.gameState[0][2] + this.state.gameState[1][1] + this.state.gameState[2][0];
    if (sum == 3) {
      return 1; // Player 1 win
    }
    else if(sum == -3){
      return -1; // Player 2 win
    }

    return 0; // Draw
  }

  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    switch (value) {
      case 1:
        return <Icon name="close" style={styles.titleX} />;
      case -1:
        return <Icon name="circle" style={styles.title0} />;
      default:
        return <View></View>
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => this.onTitlePress(0, 0)} style={[styles.title, { borderLeftWidth: 0, borderTopWidth: 0 }]}>
            {this.renderIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTitlePress(0, 1)} style={[styles.title, { borderTopWidth: 0 }]}>
            {this.renderIcon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTitlePress(0, 2)} style={[styles.title, { borderRightWidth: 0, borderTopWidth: 0 }]}>
            {this.renderIcon(0, 2)}
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity onPress={() => this.onTitlePress(1, 0)} style={[styles.title, { borderLeftWidth: 0 }]}>
            {this.renderIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTitlePress(1, 1)} style={[styles.title, {}]}>
            {this.renderIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTitlePress(1, 2)} style={[styles.title, { borderRightWidth: 0 }]}>
            {this.renderIcon(1, 2)}
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity onPress={() => this.onTitlePress(2, 0)} style={[styles.title, { borderLeftWidth: 0, borderBottomWidth: 0 }]}>
            {this.renderIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTitlePress(2, 1)} style={[styles.title, { borderBottomWidth: 0 }]}>
            {this.renderIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTitlePress(2, 2)} style={[styles.title, { borderRightWidth: 0, borderBottomWidth: 0 }]}>
            {this.renderIcon(2, 2)}
          </TouchableOpacity>
        </View>

        <View style={{paddingTop : 50}}></View>
        <Button title='New Game' onPress={ () => this.initializeGame()}></Button>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row"
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    borderWidth: 5,
    width: 100,
    height: 100
  },
  titleX: {
    color: "red",
    fontSize: 60,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
    marginTop: 20,
  },
  title0: {
    color: "green",
    fontSize: 60,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
    marginTop: 20,
  },
});


