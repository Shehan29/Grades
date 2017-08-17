import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements';

class Overview extends Component {
	state = {
		mark: 'No Data',
		goal: '100%',
	}
	
  componentDidMount() {
	  AsyncStorage.getItem('PersonalAvg', (err, result) => {
		  this.setState({mark: parseFloat(result).toFixed(1)});
	  });
  }
  render() {
    // const { name, mark, quiz, assignments, midterm, final } = this.props.navigation.state.params;

    return (
      <View style={styles.overview}>
        <View style={styles.container100}>
          <View style={styles.circle}>
              <Text style={ styles.text }>{this.state.mark}%</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Overview;


const styles = StyleSheet.create({
	overview: {
		flex: 1,
		flexDirection: 'column',
        alignItems: 'center',
		justifyContent: 'space-between',
	},
    container100: {
		width: 100,
		height: 100,
    },
	circle: {
        borderRadius: 50,
        backgroundColor: '#1abc9c',
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
    text: {
	    textAlign: 'center',
	    flex: 1,
	    flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 16,
    },
});

