import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {Image} from 'react-native';
import AccountScreen from './screens/AccountScreen';
import HomeScreen from './screens/HomeScreen';
import NotificationScreen from './screens/NotificationScreen';

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
          tabBarLabel: 'Home',
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
          tabBarLabel: 'Notifications',
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
          tabBarLabel: 'Profile',
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
    <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
  </HomeStack.Navigator>
);

const NotificationStack = createStackNavigator();
const NotificationStackScreen = () => (
  <NotificationStack.Navigator>
    <NotificationStack.Screen
      name="NotificationScreen"
      component={NotificationScreen}
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
      component={AccountScreen}
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
