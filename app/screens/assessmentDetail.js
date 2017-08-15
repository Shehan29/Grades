import React, { Component } from 'react';
import { ScrollView, Modal, View, Text, TextInput, TouchableOpacity, AsyncStorage, StyleSheet, Alert } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Icon } from 'react-native-elements';


class assessmentDetail extends Component {
	state = {
		assessmentList: this.props.navigation.state.params.assessmentList,
		assessmentListName: '',
		assessmentListMark: '',
		colourModal: false,
		assessmentModal: false,
		colour: this.props.navigation.state.params.colour,
	}
	
	name = this.props.navigation.state.params.name;
	course = this.props.navigation.state.params.course;
	
	addToListModal(visible) {
		this.setState({assessmentModal: visible});
	}
	
	setAssessmentListName = (name) => {
		this.setState({assessmentListName: name});
	}
	
	setMark = (mark) => {
		this.setState({assessmentListMark: mark});
	}
	
	addToList = () => {
		this.addToListModal(false);
		AsyncStorage.getItem('Courses', (err, result) => {
			const courses = result ? JSON.parse(result) : [];
			const index = courses.findIndex(course => course.name===this.course);
			let assessments = [];
			if (index > -1) {
				assessments = courses[index].assessments;
				const index2 = assessments.findIndex(assessment => assessment.name===this.name);
				if (index2 > -1) {
					let assessmentList = courses[index].assessments[index2].assessmentList;
					const assessmentListObject = {
						"name": this.state.assessmentListName,
						"mark": this.state.assessmentListMark,
					};
					assessmentList.push(assessmentListObject);
					this.setState({assessmentList: assessmentList});
					courses[index].assessments[index2].assessmentList = assessmentList;
					AsyncStorage.setItem('Courses', JSON.stringify(courses));
				}
			}
		});
	}
	
	onLearnMore = async (assessment) => {
		const assessments = this.state.assessments;
		const index = assessments.findIndex(object => object.name===assessment.name);
		let assessmentList = [];
		if (assessments[index].assessmentList) {
			assessmentList = assessments[index].assessmentList;
		}
		this.props.navigation.navigate('Details', { "name": assessment.name, "colour": this.state.colour, "assessmentList": assessmentList } );
	};
	
	
	
	render() {
		return (
			<ScrollView>
				<View style={styles.menu}>
					<TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginLeft: 5}} onPress={() => { this.addToListModal(true) }}><Icon name="create" size={22} color='rgba(0,122,255,0.95)'/></TouchableOpacity>
					<TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginRight: 5}} onPress={() => {  }}><Icon name="palette" size={22} color='rgba(0,122,255,0.95)'/></TouchableOpacity>
				</View>
				
				<Modal
					transparent={true}
					animationType={"slide"}
					visible={this.state.assessmentModal}>
					<View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
						<View style={{ width: 250, height: 150, alignItems: 'center', justifyContent: 'space-between', borderRadius: 15, backgroundColor: '#FFF' }}>
							<Text style={{ fontWeight: 'bold', paddingVertical: 20, height: 50 }}>Course Name</Text>
							<TextInput
								placeholder='Name'
								//placeholderTextColor='rgba(255,255,255,0.7)'
								borderWidth={0.5}
								borderColor='#d6d7da'
								textAlign='center'
								returnKeyType='go'
								autoCapitalize='characters'
								autoCorrect={false}
								autoFocus={true}
								blurOnSubmit
								onChangeText={this.setAssessmentListName}
								onSubmitEditing={() => this.refs.mark.focus()}
								style={styles.input} />
							<TextInput
								ref='mark'
								placeholder='Mark'
								//placeholderTextColor='rgba(255,255,255,0.7)'
								borderWidth={0.5}
								borderColor='#d6d7da'
								textAlign='center'
								returnKeyType='go'
								autoCorrect={false}
								autoFocus={true}
								blurOnSubmit
								onChangeText={this.setMark}
								onSubmitEditing={this.enterCourse}
								style={styles.input} />
							<TouchableOpacity style={{paddingTop: 10}} onPress={() => this.addToList()}>
								<View style={{ flex: 1, flexDirection: 'column', width: 250, height: 50 }}>
									<Text style={{color: '#3498db', textAlign: 'center'}}>OK</Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
				
				<List>
					{this.state.assessmentList.map((assessment) => (
						<ListItem
							style={styles.listItem}
							key={assessment.name}
							leftIcon={{name: 'bubble-chart', color: this.state.colour, size: 50}}
							title={`${assessment.name.toUpperCase()}`}
							subtitle={assessment.mark}
							onPress={() => this.onLearnMore(assessment)}
						/>
					))}
				</List>
			</ScrollView>
		);
	}
}

export default assessmentDetail;

const styles = StyleSheet.create({
	menu: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: -15,
		marginTop: 5,
	},
	input: {
		height: 40,
		width: 230,
		backgroundColor: 'rgba(255,255,255,0.2)',
		marginBottom: 10,
		marginHorizontal: 10,
		paddingVertical: 5
	},
	
});