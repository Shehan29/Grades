import React, { Component } from 'react';
import { Text, TextInput, View, ScrollView, TouchableOpacity, Modal, StyleSheet, AsyncStorage, Alert, RefreshControl } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { refreshData } from '../computation/avgCalculations';

class Feed extends Component {
	state = {
		modalVisible: false,
		courseName: '',
		courses: [],
		colour: 0,
		refreshing: false,
	}
	
	getColour() {
		const colours = ['#e74c3c', '#e67e22', '#f1c40f', '#1abc9c', '#2980b9', '#9b59b6'];
		return colours[this.state.colour++%6];
	}
	
	setModalVisible(visible) {
		this.setState({modalVisible: visible});
	}
	
	onLearnMore = async (course) => {
		await AsyncStorage.getItem('Courses', (err, result) => {
			const courses = result ? JSON.parse(result) : [];
			const index = courses.findIndex(object => object.name===course.name);
			let assessments = [];
			if (courses[index].assessments) {
				assessments = courses[index].assessments;
			}
			this.props.navigation.navigate('Details', { "name": course.name, "colour": course.colour, "assessments": assessments } );
		});
	};
	
	enterCourse = () => {
		this.setModalVisible(false);
		if (this.state.courseName) {
			AsyncStorage.getItem('Courses', (err, result) => {
				Courses = result ? JSON.parse(result) : [];
				const index = Courses.findIndex(course => course.name === this.state.courseName);
				if (index === -1) {
					courseObject = {
						"name": this.state.courseName,
						"colour": this.getColour(),
						"assessments": [],
					};
					Courses.push(courseObject);
					this.setState({courses: Courses});
					this.setState({courseName: ''});
					AsyncStorage.setItem('Courses', JSON.stringify(Courses));
				}
			});
		}
	}
	
	setCourseName = (courseName) => {
		this.setState({courseName: courseName});
	}
	
	clear = () => {
		AsyncStorage.clear();
	}
	getCourses = async () => {
		await AsyncStorage.getItem('Courses', (err, result) => {
			Courses = result ? JSON.parse(result) : [];
			this.setState({courses: Courses});
		});
	}
	
	_onRefresh() {
		this.setState({refreshing: true});
		refreshData().then(this.getCourses()).then(this.setState({refreshing: false}));
	}
	
	render() {
		this.getCourses();
		return (
			<ScrollView refreshControl={
				<RefreshControl
					refreshing={this.state.refreshing}
					onRefresh={this._onRefresh.bind(this)}
				/>
			}>
				<View style={styles.menu}>
					<TouchableOpacity style={[styles.menuButton, {marginLeft: 5}]} onPress={() => { this.setModalVisible(true) }}>
						<Icon name="add" size={28} color='rgba(0,122,255,0.95)'/>
						<Text style={{color: 'rgba(0,122,255,0.95)', fontSize: 16}}>Add Course</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[styles.menuButton, {marginRight: 5}]} onPress={() => { Alert.alert('Help', 'Refresh page by swiping down',[{text: 'OK'}]) }}>
						<Text style={{color: 'rgba(0,122,255,0.95)', fontSize: 16}}></Text>
						<Icon name="help-outline" size={28} color='rgba(0,122,255,0.95)'/>
					</TouchableOpacity>
				</View>
				<Modal
					transparent={true}
					animationType={"slide"}
					visible={this.state.modalVisible}>
					<View style={styles.modal}>
						<View style={styles.modalContent}>
							<Text style={styles.modalTitle}>Course Name</Text>
							<TextInput
								placeholder='Name'
								borderWidth={0.5}
								borderColor='#d6d7da'
								textAlign='center'
								returnKeyType='go'
								autoCapitalize='characters'
								autoCorrect={false}
								autoFocus={true}
								blurOnSubmit
								onChangeText={this.setCourseName}
								onSubmitEditing={this.enterCourse}
								style={styles.input} />
							<TouchableOpacity style={{paddingTop: 10}} onPress={this.enterCourse}>
								<View style={styles.modalButton}>
									<Text style={{color: '#3498db', textAlign: 'center'}}>OK</Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
				<List>
					{this.state.courses.map((course) => (
						<ListItem
							style={styles.listItem}
							key={course.name}
							leftIcon={{name: 'assessment', color: course.colour, size: 50}}
							title={`${course.name.toUpperCase()}`}
							subtitle={`${isNaN(parseFloat(course.mark).toFixed(1)) ? 0 : parseFloat(course.mark).toFixed(1)}%`}
							onPress={() => this.onLearnMore(course)}
						/>
					))}
				</List>
			</ScrollView>
		);
	}
}

export default Feed;

const styles = StyleSheet.create({
	menu: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: -15,
		marginTop: 5,
	},
	menuButton: {
		flexDirection: 'row', alignItems: 'center',
	},
	listItem: {
		flex: 1,
		backgroundColor: '#3498db'  //blue
	},
	modal: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	modalContent: {
		width: 250,
		height: 150,
		alignItems: 'center',
		justifyContent: 'space-between',
		borderWidth: 1,
		borderRadius: 15,
		borderColor: '#ededed',
		backgroundColor: '#FFF',
	},
	modalTitle: {
		fontWeight: 'bold',
		paddingVertical: 20,
		height: 55
	},
	modalButton: {
		flex: 1,
		flexDirection: 'column',
		width: 230,
		height: 50
	},
	input: {
		height: 40,
		width: 230,
		backgroundColor: 'transparent',
		marginBottom: 10,
		marginHorizontal: 10,
		paddingVertical: 5
	},
});
