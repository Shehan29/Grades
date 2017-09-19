import React from 'react';
import { TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { refreshData } from '../computation/avgCalculations';

import CourseList from '../screens/courseList';
import assessmentDetail from '../screens/assessmentDetail';
import courseDetail from '../screens/courseDetail';
import Grade from '../screens/overview';

export const CourseStack = StackNavigator({
	CourseList: {
		screen: CourseList,
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
								  onPress={() => Alert.alert(
									  `Delete ${navigation.state.params.name}`, '',
									  [
										  {text: 'Delete', onPress: () => {AsyncStorage.getItem('Courses', (err, result) => {
											  let Courses = JSON.parse(result);
											  const index = Courses.findIndex(course => course.name===navigation.state.params.name);
											  if (index > -1) {
												  Courses.splice(index, 1);
											  }
											  AsyncStorage.setItem('Courses', JSON.stringify(Courses)).then(refreshData()).then(navigation.goBack());
										  });}, style: 'destructive'},
										  {text: 'Cancel', onPress: () => console.log(), style: 'cancel'},
									  ],
								  )}>
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
								  onPress={() => Alert.alert(
									  `Delete ${navigation.state.params.name}`, '',
									  [
										  {text: 'Delete', onPress: () => {
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
												  AsyncStorage.setItem('Courses', JSON.stringify(Courses)).then(refreshData()).then(navigation.goBack());
											  });
										  }, style: 'destructive'},
										  {text: 'Cancel', onPress: () => console.log(), style: 'cancel'},
									  ],
								  )}><Icon name="remove-circle" size={20} color='rgba(0,122,255,0.95)'/></TouchableOpacity>
			),
		}),
	},
});

export const OverviewStack = StackNavigator({
	Overview: {
		screen: Grade,
		navigationOptions: {
			title: 'Grade',
		},
	},
});

export const Tabs = TabNavigator({
	CourseList: {
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
});

export const Root = StackNavigator({
	Tabs: {
		screen: Tabs,
	},
}, {
	mode: 'modal',
	headerMode: 'none',
});
