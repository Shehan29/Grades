import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, TouchableOpacity } from 'react-native';
import { refreshData } from '../computation/avgCalculations';

class Overview extends Component {
	state = {
		mark: 'Tap to Reveal',
	}
	
	getAvg = async () => {
		refreshData().then(AsyncStorage.getItem('PersonalAvg', (err, result) => {
			let avg = parseFloat(result).toFixed(1);
			if (isNaN(avg)) {
				avg = 0;
			}
			this.setState({mark: `${avg}%`});
		}));
	}
	
	render() {
		return (
			<View style={styles.overview}>
				<View style={styles.container}>
					<Text style={styles.msg}>Your current average is:</Text>
					<View style={styles.container100}>
						<TouchableOpacity style={styles.circle} onPress={() => this.getAvg()}>
							<Text style={ styles.text }>{this.state.mark}</Text>
						</TouchableOpacity>
					</View>
					<Text style={ styles.smallText }>*Tap circle to recompute average</Text>
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
	container: {
		marginTop: 100,
		height: 300,
		width: 300,
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	container100: {
		width: 200,
		height: 200,
	},
	circle: {
		borderRadius: 100,
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
		fontSize: 40,
		fontWeight: 'bold',
	},
	smallText: {
		textAlign: 'center',
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 25,
		backgroundColor: 'transparent',
		color: 'black',
		fontSize: 12,
		fontWeight: '100',
	},
	msg: {
		textAlign: 'center',
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 20,
		backgroundColor: 'transparent',
		color: 'black',
		fontSize: 18,
		fontWeight: '500',
	},
});

