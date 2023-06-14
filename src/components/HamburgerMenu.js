import { StyleSheet, View } from "react-native";
import React from "react";

import HamburgerMenuItem from "./HamburgerMenuItem";

const HamburgerMenu = (props) => {
  return (
    <View
      style={{
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: "#eee",
        minHeight: 25,
        width: 160,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-end",
        top: 5,
        zIndex: 100,
      }}
    >
      <HamburgerMenuItem
        name="Хувийн мэдээлэл"
        handleScreen={props.handleScreen}
        screen="ProfileScreen"
      />
      <HamburgerMenuItem
        name="Гүйлгээнүүд"
        handleScreen={props.handleScreen}
        screen="NotificationScreen"
      />
      <HamburgerMenuItem
        name="Нууц үг солих"
        handleScreen={props.handleScreen}
        screen="ChangePasswordScreen"
      />
      <HamburgerMenuItem
        name="Холбоо барих"
        handleScreen={props.handleScreen}
        screen="ContactScreen"
      />
      <HamburgerMenuItem
        name="Системээс гарах"
        handleSignOut={props.handleSignOut}
      />
    </View>
  );
};

export default HamburgerMenu;

const styles = StyleSheet.create({});
