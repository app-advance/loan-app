import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { primary_color } from "../constants/colors";

const HamburgerMenuItem = (props) => {
  return (
    <View style={css.box}>
      <Text
        style={css.text}
        onPress={
          props.screen
            ? () => props.handleScreen(props.screen)
            : props.handleSignOut
        }
      >
        {props.name}
      </Text>
    </View>
  );
};

export default HamburgerMenuItem;

const css = StyleSheet.create({
  box: {
    height: 35,
    width: "100%",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    color: primary_color,
    fontWeight: "600",
    textAlign: "center",
  },
});
