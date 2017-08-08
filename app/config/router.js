import React from 'react';
import { TouchableOpacity } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Feed from '../screens/Feed';
import Settings from '../screens/Settings';
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
        onPress={() => { removeCourse() }}><Icon name="remove-circle" size={20}
        color='rgba(0,122,255,0.95)'/></TouchableOpacity>
        //NEED TO CHANGE TO ADD ASSESSMENT
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
