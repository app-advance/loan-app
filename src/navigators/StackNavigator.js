import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PractiseScreen from "../screens/PractiseScreen";
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import PasswordResetScreen from "../screens/PasswordResetScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ChangeEmailScreen from "../screens/ChangeEmailScreen";
import ChangeProfileScreen from "../screens/ChangeProfileScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import LoanReceiveScreenP1 from "../screens/LoanReceiveScreenP1";
import LoanReceiveScreenP2 from "../screens/LoanReceiveScreenP2";
import LoanPaymentSceen from "../screens/LoanPaymentSceen";
import LoanStretchScreen from "../screens/LoanStretchScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ContactScreen from "../screens/ContactScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="WelcomeScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="PractiseScreen"
        component={PractiseScreen}
        options={{ title: "Эдванс Кредит ББСБ" }}
      />
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{ title: "Эдванс Кредит ББСБ" }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ title: "Эдванс Кредит ББСБ" }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ title: "Эдванс Кредит ББСБ" }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "Эдванс Кредит ББСБ" }}
      />
      <Stack.Screen
        name="PasswordResetScreen"
        component={PasswordResetScreen}
        options={{ title: "Эдванс Кредит ББСБ" }}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{ title: "Эдванс Кредит ББСБ" }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ title: "Эдванс Кредит ББСБ" }}
      />
      <Stack.Screen
        name="ChangeEmailScreen"
        component={ChangeEmailScreen}
        options={{ title: "Эдванс Кредит ББСБ" }}
      />
      <Stack.Screen
        name="ChangeProfileScreen"
        component={ChangeProfileScreen}
        options={{ title: "Эдванс Кредит ББСБ" }}
      />
      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
        options={{ title: "Эдванс Кредит ББСБ" }}
      />
      <Stack.Screen
        name="LoanReceiveScreenP1"
        component={LoanReceiveScreenP1}
        options={{ title: "Эдванс Кредит ББСБ" }}
      />
      <Stack.Screen
        name="LoanReceiveScreenP2"
        component={LoanReceiveScreenP2}
        options={{ title: "Эдванс Кредит ББСБ" }}
      />
      <Stack.Screen
        name="LoanPaymentSceen"
        component={LoanPaymentSceen}
        options={{ title: "Эдванс Кредит ББСБ" }}
      />
      <Stack.Screen
        name="LoanStretchScreen"
        component={LoanStretchScreen}
        options={{ title: "Эдванс Кредит ББСБ" }}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{ title: "Эдванс Кредит ББСБ" }}
      />
      <Stack.Screen
        name="ContactScreen"
        component={ContactScreen}
        options={{ title: "Эдванс Кредит ББСБ" }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
