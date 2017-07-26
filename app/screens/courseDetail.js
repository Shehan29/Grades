import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, AsyncStorage, StyleSheet, Alert } from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';
import { Icon } from 'react-native-elements';


class courseDetail extends Component {
  render() {
    const { picture, name, mark, quiz, assignments, midterm, final } = this.props.navigation.state.params;

    removeCourse = () => {
      AsyncStorage.getItem('Courses', (err, result) => {
        Courses = JSON.parse(result);
        index = Courses.findIndex(course => course.name===name);
        if (index > -1) {
            Courses.splice(index, 1);
        }
        AsyncStorage.setItem('Courses', JSON.stringify(Courses));
        this.props.navigation.goBack();
      });
      Alert.alert('Deletion', name + ' has been deleted.', [{text: 'OK'}])
    }

    return (
      <ScrollView>
        <View style={styles.menu}>
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginRight: 5}} onPress={() => { removeCourse() }}><Icon name="add" size={28} color='rgba(0,122,255,0.95)'/><Text style={{color: 'rgba(0,122,255,0.95)', fontSize: 16}}>Remove Course</Text></TouchableOpacity>
        </View>
        <List>
          <ListItem
            title="Mark"
            rightTitle={mark}
            hideChevron
          />
        </List>

        <List>
          <ListItem
            title="Quiz"
            rightTitle={quiz}
            hideChevron
          />
          <ListItem
            title="Assignments"
            rightTitle={assignments}
            hideChevron
          />
          <ListItem
            title="Midterm"
            rightTitle={midterm}
            hideChevron
          />
          <ListItem
            title="Final Exam"
            rightTitle={final}
            hideChevron
          />
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
});
