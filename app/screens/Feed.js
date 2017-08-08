import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  StyleSheet,
  AsyncStorage,
  Alert,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Icon } from 'react-native-elements';

class Feed extends Component {
  state = {
    modalVisible: false,
    courseName: 'Clear',
    courses: [],
    colour: 0,
  }

  getColour() {
    colours = ['#e74c3c', '#e67e22', '#f1c40f', '#1abc9c', '#2980b9', '#9b59b6'];
    return colours[this.state.colour++%6];
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  onLearnMore = (course) => {
    this.props.navigation.navigate('Details', { ...course });
  };

    enterCourse = () => {
        this.setModalVisible(false);
        AsyncStorage.getItem('Courses', (err, result) => {
            Courses = result ? JSON.parse(result) : [];
            courseObject = {
                "name": this.state.courseName,
                "colour": this.getColour(),
                "assessments": [],
            };
            Courses.push(courseObject);
            this.setState({courses: Courses});
            AsyncStorage.setItem('Courses', JSON.stringify(Courses));
        });
    }

  setCourseName = (courseName) => {
    this.setState({courseName: courseName});
  }

  clear = (courseName) => {
     AsyncStorage.clear();
  }
  getCourses = async () => {
    await AsyncStorage.getItem('Courses', (err, result) => {
      Courses = result ? JSON.parse(result) : [];
      this.setState({courses: Courses});
    });
  }

  render() {
    this.getCourses();
    return (
      <ScrollView>
        <View style={styles.menu}>
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginLeft: 5}} onPress={() => { this.setModalVisible(true) }}><Icon name="add" size={28} color='rgba(0,122,255,0.95)'/><Text style={{color: 'rgba(0,122,255,0.95)', fontSize: 16}}>Add Course</Text></TouchableOpacity>
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginRight: 5}} onPress={() => { Alert.alert('Help', 'Help is here',[{text: 'OK'}]) }}><Text style={{color: 'rgba(0,122,255,0.95)', fontSize: 16}}></Text><Icon name="help-outline" size={28} color='rgba(0,122,255,0.95)'/></TouchableOpacity>
        </View>
        <Modal
          transparent={true}
          animationType={"slide"}
          visible={this.state.modalVisible}>
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
                onChangeText={this.setCourseName}
                onSubmitEditing={this.enterCourse}
                style={styles.input} />
              <TouchableOpacity style={{paddingTop: 10}} onPress={this.enterCourse}>
                <View style={{ flex: 1, flexDirection: 'column', width: 250, height: 50 }}>
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
              //roundAvatar
              //avatar={{ uri: course.picture.thumbnail }}
              title={`${course.name.toUpperCase()}`}
              subtitle={course.mark}
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
  listItem: {
    flex: 1,
    backgroundColor: '#3498db'  //blue
  },

  buttonContainer: {
    backgroundColor: '#2980b9',
    borderRadius: 10,
    paddingVertical: 15,
    marginTop: 15,
    width: 150,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
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
