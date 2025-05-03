import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/Splash/SplashScreen';
import LanguageSelectionScreen from '../screens/Language/LanguageSelectionScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import { RootStackParamList } from '../types/navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TaskScreen from '../screens/TaskScreen';
import ReportScreen from '../screens/ReportScreen';
import { Image, View, Text, Platform } from 'react-native';
import TaskTabIcon from '../assets/icons/task.png';
import ReportTabIcon from '../assets/icons/report.png';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: { backgroundColor: '#677687' },
      tabBarActiveTintColor: '#fff',
      tabBarInactiveTintColor: '#000000',
    }}
  >
    <Tab.Screen
      name="Task"
      component={TaskScreen}
      options={{
        tabBarIcon: ({ color, size, focused }) => (
          <View
            style={{
              width: size,
              height: size,
              backgroundColor: focused ? '#fff' : '#000',
              borderRadius: 6,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: focused ? '#000' : '#888',
                fontSize: size * 0.8,
                fontWeight: 'bold',
                lineHeight: size * 0.8,
                textAlign: 'center',
                includeFontPadding: false,
                textAlignVertical: 'center',
                fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
              }}
            >
              +
            </Text>
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Report"
      component={ReportScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Image source={ReportTabIcon} style={{ width: size, height: size, tintColor: color }} />
        ),
      }}
    />
  </Tab.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="LanguageSelection" component={LanguageSelectionScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator; 