import React from 'react';
import { TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Feed from '../screens/Feed';
import Settings from '../screens/Settings';
import assessmentDetail from '../screens/assessmentDetail';
import courseDetail from '../screens/courseDetail';
import Overview from '../screens/overview';
import Me from '../screens/Me';

export const CourseStack = StackNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: {
      title: 'Courses',
    },
  },
  Details: {
    screen: courseDetail,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name.toUpperCase()}`,
      headerRight: (
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginRight: 6}}
                          onPress={() => {
                            AsyncStorage.getItem('Courses', (err, result) => {
							  let Courses = JSON.parse(result);
							  const index = Courses.findIndex(course => course.name===navigation.state.params.name);
							  if (index > -1) {
								  Courses.splice(index, 1);
							  }
							  AsyncStorage.setItem('Courses', JSON.stringify(Courses));
							  navigation.goBack();
						    });
                            Alert.alert('Deletion', navigation.state.params.name + ' has been deleted.', [{text: 'OK'}]) }}>
                          <Icon name="remove-circle" size={20} color='rgba(0,122,255,0.95)'/></TouchableOpacity>
      ),
    }),
  },
	Assessments: {
		screen: assessmentDetail,
		navigationOptions: ({ navigation }) => ({
			title: `${navigation.state.params.name.toUpperCase()}`,
			headerRight: (
				<TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginRight: 6}}
								  onPress={() => {
									  AsyncStorage.getItem('Courses', (err, result) => {
										  let Courses = JSON.parse(result);
										  const index = Courses.findIndex(course => course.name===navigation.state.params.course);
										  if (index > -1) {
											  let Assessments = Courses[index].assessments;
											  const index2 = Assessments.findIndex(assessment => assessment.name===navigation.state.params.name);
											  if (index2 > -1) {
												  Assessments.splice(index2, 1);
												  Courses[index].assessments = Assessments;
											  }
										  }
										  AsyncStorage.setItem('Courses', JSON.stringify(Courses));
										  navigation.goBack();
									  });
									  Alert.alert('Deletion', navigation.state.params.name + ' has been deleted.', [{text: 'OK'}]) }}><Icon name="remove-circle" size={20} color='rgba(0,122,255,0.95)'/></TouchableOpacity>
			),
		}),
	},
});

export const OverviewStack = StackNavigator({
  Overview: {
    screen: Overview,
    navigationOptions: {
      title: 'Overview',
    },
  },
});

export const Tabs = TabNavigator({
  Feed: {
    screen: CourseStack,
    navigationOptions: {
      tabBarLabel: 'Courses',
      tabBarIcon: ({ tintColor }) => <Icon name="class" size={35} color={tintColor} />,
    },
  },
  Overview: {
    screen: OverviewStack,
    navigationOptions: {
      tabBarLabel: 'Overview',
      tabBarIcon: ({ tintColor }) => <Icon name="show-chart" size={35} color={tintColor} />
    },
  },
  Me: {
    screen: Me,
    navigationOptions: {
      tabBarLabel: 'Me',
      tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
    },
  },
});

export const SettingsStack = StackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'Settings',
    },
  },
});

export const Root = StackNavigator({
  Tabs: {
    screen: Tabs,
  },
  Settings: {
    screen: SettingsStack,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});
