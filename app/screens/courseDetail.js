import React, { Component } from 'react';
import { ScrollView, Modal, View, Text, TextInput, TouchableOpacity, AsyncStorage, StyleSheet, Alert, Picker } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Icon } from 'react-native-elements';


class courseDetail extends Component {
  state = {
	assessments: [],
	assessmentName: '',
	colourModal: false,
	assessmentModal: false,
	colour: 'red',
  }

  changeColourModal(visible) {
	this.setState({colourModal: visible});
  }

  addAssessmentModal(visible) {
	this.setState({assessmentModal: visible});
  }

  setAssessmentName = (name) => {
	this.setState({assessmentName: name});
  }


  render() {
	const { name, mark, quiz, assignments, midterm, final } = this.props.navigation.state.params;
	const getAssessments = async () => {
          await AsyncStorage.getItem('Courses', (err, result) => {
              const courses = result ? JSON.parse(result) : [];
              const index = courses.findIndex(course => course.name===name);
              let assessments = [];
              if (courses[index].assessments) {
                  assessments = courses[index].assessments;
              }
              this.setState({assessments: assessments});
          });
	}
	() => { getAssessments(); }

	const removeCourse = () => {
	  AsyncStorage.getItem('Courses', (err, result) => {
		let Courses = JSON.parse(result);
		const index = Courses.findIndex(course => course.name===name);
		if (index > -1) {
			Courses.splice(index, 1);
		}
		AsyncStorage.setItem('Courses', JSON.stringify(Courses));
		this.props.navigation.goBack();
	  });
	  Alert.alert('Deletion', name + ' has been deleted.', [{text: 'OK'}])
	}

	const changeColour = (col) => {
	  AsyncStorage.getItem('Courses', (err, result) => {
		let Courses = JSON.parse(result);
		const index = Courses.findIndex(course => course.name===name);
		if (index > -1) {
			Courses[index].colour = col;
		}
		AsyncStorage.setItem('Courses', JSON.stringify(Courses));
		this.changeColourModal(false);
	  });
	}

	const addAssessment = () => {
		  this.addAssessmentModal(false);
		  AsyncStorage.getItem('Courses', (err, result) => {
			  const courses = result ? JSON.parse(result) : [];
              const index = courses.findIndex(course => course.name===name);
			  let assessments = [];
              if (index > -1) {
              	  console.log(JSON.stringify(courses[index]));
                  assessments = courses[index].assessments;
                  const assessmentObject = {
                      "name": this.state.assessmentName,
                      "value": 0,
                      "mark": "---%",
                  };
                  assessments.push(assessmentObject);
                  this.setState({assessments: assessments});
                  courses[index].assessments = assessments;
                  console.log(assessments);
                  console.log(JSON.stringify(courses[index]));
                  AsyncStorage.setItem('Courses', JSON.stringify(courses));
              }
		  });
	  }

	return (
	  <ScrollView>
		<View style={styles.menu}>
		  <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginLeft: 5}} onPress={() => { this.addAssessmentModal(true) }}><Icon name="create" size={22} color='rgba(0,122,255,0.95)'/></TouchableOpacity>
			<TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginRight: 5}} onPress={() => { this.changeColourModal(true) }}><Icon name="palette" size={22} color='rgba(0,122,255,0.95)'/></TouchableOpacity>
		</View>
		<Modal
		  transparent={true}
		  animationType={"slide"}
		  visible={this.state.colourModal}>
		  <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
			<View style={{ width: 250, height: 180, alignItems: 'center', justifyContent: 'space-between', borderRadius: 15, backgroundColor: '#FFF' }}>
			  <Text style={{ fontWeight: 'bold', paddingVertical: 20 }}>Change Colour</Text>
			  <View style={{flex: 1, flexDirection: 'row'}}>
				<TouchableOpacity
				onPress={() => changeColour('#e74c3c')}
				style={{backgroundColor: '#e74c3c', height: 40, width: 40, marginHorizontal: 10}}></TouchableOpacity>
				<TouchableOpacity
				onPress={() => changeColour('#e67e22')}
				style={{backgroundColor: '#e67e22',height: 40, width: 40, marginHorizontal: 10}}></TouchableOpacity>
				<TouchableOpacity
				onPress={() => changeColour('#f1c40f')}
				style={{backgroundColor: '#f1c40f',height: 40, width: 40, marginHorizontal: 10}}></TouchableOpacity>
			  </View>
			  <View style={{flex: 1, flexDirection: 'row'}}>
				<TouchableOpacity
				onPress={() => changeColour('#1abc9c')}
				style={{backgroundColor: '#1abc9c', height: 40, width: 40, marginHorizontal: 10}}></TouchableOpacity>
				<TouchableOpacity
				onPress={() => changeColour('#2980b9')}
				style={{backgroundColor: '#2980b9',height: 40, width: 40, marginHorizontal: 10}}></TouchableOpacity>
				<TouchableOpacity
				onPress={() => changeColour('#9b59b6')}
				style={{backgroundColor: '#9b59b6',height: 40, width: 40, marginHorizontal: 10}}></TouchableOpacity>
			  </View>

			</View>
		  </View>
		 </Modal>

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
						  onChangeText={this.setAssessmentName}
						  onSubmitEditing={() => addAssessment()}
						  style={styles.input} />
					  <TouchableOpacity style={{paddingTop: 10}} onPress={() => addAssessment()}>
						  <View style={{ flex: 1, flexDirection: 'column', width: 250, height: 50 }}>
							  <Text style={{color: '#3498db', textAlign: 'center'}}>OK</Text>
						  </View>
					  </TouchableOpacity>
				  </View>
			  </View>
		  </Modal>

		  <List>
			  {this.state.assessments.map(function(assessment) {
				return (
				  <ListItem
					  style={styles.listItem}
					  key={assessment.name}
					  leftIcon={{name: 'assessment', color: 'red', size: 50}}
					  title={`${assessment.name.toUpperCase()}`}
					  subtitle={assessment.mark}
					  onPress={() => this.onLearnMore(assessment)}
				  />
				)
			  })}
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
  input: {
		height: 40,
		width: 230,
		backgroundColor: 'rgba(255,255,255,0.2)',
		marginBottom: 10,
		marginHorizontal: 10,
		paddingVertical: 5
	},

});
