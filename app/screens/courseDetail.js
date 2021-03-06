import React, { Component } from 'react';
import { ScrollView, Modal, View, Text, TextInput, TouchableOpacity, AsyncStorage, StyleSheet, RefreshControl } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { refreshData } from '../computation/avgCalculations';

class courseDetail extends Component {
	state = {
		assessments: [],
		assessmentName: '',
		value: -1,
		colourModal: false,
		assessmentModal: false,
		colour: this.props.navigation.state.params.colour,
		refreshing: false,
	}
	
	name = this.props.navigation.state.params.name;
	
	changeColourModal(visible) {
		this.setState({colourModal: visible});
	}
	
	changeColour = (col) => {
		AsyncStorage.getItem('Courses', (err, result) => {
			let Courses = JSON.parse(result);
			const index = Courses.findIndex(course => course.name===this.name);
			if (index > -1) {
				Courses[index].colour = col;
			}
			AsyncStorage.setItem('Courses', JSON.stringify(Courses));
			this.changeColourModal(false);
			this.setState({colour: col});
		});
	}
	
	addAssessmentModal(visible) {
		this.setState({assessmentModal: visible});
	}
	
	setAssessmentName = (name) => {
		this.setState({assessmentName: name});
	}
	
	setValue = (value) => {
		this.setState({value: value});
	}
	
	getAssessments = async () => {
		await refreshData();
		await AsyncStorage.getItem('Courses', (err, result) => {
			const courses = result ? JSON.parse(result) : [];
			const index = courses.findIndex(course => course.name===this.name);
			let assessments = [];
			if (courses[index].assessments) {
				assessments = courses[index].assessments;
			}
			this.setState({assessments: assessments});
		});
	}
	
	addAssessment = () => {
		this.addAssessmentModal(false);
		if (this.state.assessmentName && this.state.value >= 0 && this.state.value <= 100) {
			AsyncStorage.getItem('Courses', (err, result) => {
				const courses = result ? JSON.parse(result) : [];
				const index = courses.findIndex(course => course.name === this.name);
				let assessments = [];
				if (index > -1) {
					assessments = courses[index].assessments;
					const assessmentObject = {
						"name": this.state.assessmentName,
						"value": this.state.value,
						"mark": "---%",
						"assessmentList": [],
					};
					this.setState({assessmentName: ''});
					this.setState({value: -1});
					assessments.push(assessmentObject);
					this.setState({assessments: assessments});
					courses[index].assessments = assessments;
					AsyncStorage.setItem('Courses', JSON.stringify(courses));
				}
			});
		}
	}
	
	onLearnMore = async (assessment) => {
		const assessments = this.state.assessments;
		const index = assessments.findIndex(object => object.name===assessment.name);
		let assessmentList = [];
		if (assessments[index].assessmentList) {
			assessmentList = assessments[index].assessmentList;
		}
		this.props.navigation.navigate('Assessments', { "name": assessment.name, "course": this.name, "colour": this.state.colour, "assessmentList": assessmentList } );
	};
	
	_onRefresh() {
		this.setState({refreshing: true});
		refreshData().then(this.getAssessments()).then(this.setState({refreshing: false}));
	}
	
	componentDidMount() {
		this.getAssessments();
	}
	
	render() {
		return (
			<ScrollView refreshControl={
				<RefreshControl
					refreshing={this.state.refreshing}
					onRefresh={this._onRefresh.bind(this)}
				/>
			}>
				<View style={styles.menu}>
					<TouchableOpacity style={[styles.menuButton, {marginLeft: 5}]} onPress={() => { this.addAssessmentModal(true) }}><Icon name="create" size={22} color='rgba(0,122,255,0.95)'/></TouchableOpacity>
					<TouchableOpacity style={[styles.menuButton, {marginRight: 5}]} onPress={() => { this.changeColourModal(true) }}><Icon name="palette" size={22} color='rgba(0,122,255,0.95)'/></TouchableOpacity>
				</View>
				<Modal
					transparent={true}
					animationType={"slide"}
					visible={this.state.colourModal}>
					<View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
						<View style={[styles.modalContent, {height: 180}]}>
							<Text style={{ fontWeight: 'bold', paddingVertical: 20 }}>Change Colour</Text>
							<View style={{flex: 1, flexDirection: 'row'}}>
								<TouchableOpacity
									onPress={() => this.changeColour('#e74c3c')}
									style={{backgroundColor: '#e74c3c', height: 40, width: 40, marginHorizontal: 10}}></TouchableOpacity>
								<TouchableOpacity
									onPress={() => this.changeColour('#e67e22')}
									style={{backgroundColor: '#e67e22',height: 40, width: 40, marginHorizontal: 10}}></TouchableOpacity>
								<TouchableOpacity
									onPress={() => this.changeColour('#f1c40f')}
									style={{backgroundColor: '#f1c40f',height: 40, width: 40, marginHorizontal: 10}}></TouchableOpacity>
							</View>
							<View style={{flex: 1, flexDirection: 'row'}}>
								<TouchableOpacity
									onPress={() => this.changeColour('#1abc9c')}
									style={{backgroundColor: '#1abc9c', height: 40, width: 40, marginHorizontal: 10}}></TouchableOpacity>
								<TouchableOpacity
									onPress={() => this.changeColour('#2980b9')}
									style={{backgroundColor: '#2980b9',height: 40, width: 40, marginHorizontal: 10}}></TouchableOpacity>
								<TouchableOpacity
									onPress={() => this.changeColour('#9b59b6')}
									style={{backgroundColor: '#9b59b6',height: 40, width: 40, marginHorizontal: 10}}></TouchableOpacity>
							</View>
						
						</View>
					</View>
				</Modal>
				
				<Modal
					transparent={true}
					animationType={"slide"}
					visible={this.state.assessmentModal}>
					<View style={styles.modal} >
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
								onChangeText={this.setAssessmentName}
								onSubmitEditing={() => this.refs.value.focus()}
								style={styles.input} />
							<TextInput
								ref='value'
								placeholder='Value (%)'
								borderWidth={0.5}
								borderColor='#d6d7da'
								textAlign='center'
								returnKeyType='go'
								autoCapitalize='characters'
								autoCorrect={false}
								blurOnSubmit
								onChangeText={this.setValue}
								onSubmitEditing={() => this.addAssessment()}
								style={styles.input} />
							<TouchableOpacity style={{paddingTop: 10}} onPress={() => this.addAssessment()}>
								<View style={styles.modalButton}>
									<Text style={{color: '#3498db', textAlign: 'center'}}>OK</Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
				
				<List>
					{this.state.assessments.map((assessment) => (
						<ListItem
							style={styles.listItem}
							key={assessment.name}
							leftIcon={{name: 'bubble-chart', color: this.state.colour, size: 50}}
							title={`${assessment.name.toUpperCase()} (${assessment.value}%)`}
							subtitle={`${isNaN(parseFloat(assessment.mark).toFixed(1)) ? 0 : parseFloat(assessment.mark).toFixed(1)}%`}
							onPress={() => this.onLearnMore(assessment)}
						/>
					))}
				</List>
			</ScrollView>
		);
	}
}

export default courseDetail;

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
	modal: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	modalContent: {
		width: 250,
		height: 200,
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
