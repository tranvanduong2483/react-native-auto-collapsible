import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {Image} from 'react-native';
import Feature1_2Screen from './screens/Feature1_2';
import Feature1_2_ChildScrollView from './screens/Feature1_2_ChildScrollView';
import Feature2 from './screens/Feature2';

const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Feature 1',
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('./assets/ic_home.png')}
              style={{height: size * 0.8, width: size * 0.8, tintColor: color}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationStackScreen}
        options={{
          tabBarLabel: 'Feature 1 & 2',
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('./assets/ic_notification.png')}
              style={{height: size * 0.8, width: size * 0.8, tintColor: color}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={AccountStackScreen}
        options={{
          tabBarLabel: 'Child ScrollView (1,2)',
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('./assets/ic_user.png')}
              style={{height: size * 0.8, width: size * 0.8, tintColor: color}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Feature 2 - Ẩn/Hiện bottom tab khi scroll"
      component={Feature2}
    />
  </HomeStack.Navigator>
);

const NotificationStack = createStackNavigator();
const NotificationStackScreen = () => (
  <NotificationStack.Navigator>
    <NotificationStack.Screen
      name="Feature1_2Screen"
      component={Feature1_2Screen}
      options={{
        headerShown: false,
      }}
    />
  </NotificationStack.Navigator>
);

const AccountStack = createStackNavigator();
const AccountStackScreen = () => (
  <AccountStack.Navigator>
    <AccountStack.Screen
      name="AccountStackScreen"
      component={Feature1_2_ChildScrollView}
      options={{
        headerShown: false,
      }}
    />
  </AccountStack.Navigator>
);

export const App = () => {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
};
