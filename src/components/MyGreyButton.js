import { StyleSheet, Text } from "react-native";
import React from "react";

const MyGreyButton = (props) => {
  return props.navigation ? (
    <Text style={css.button} onPress={() => props.navigation(props.navigate)}>
      {props.title}
    </Text>
  ) : (
    <Text style={css.button}>{props.title}</Text>
  );
};

export default MyGreyButton;

const css = StyleSheet.create({
  button: {
    textDecorationLine: "underline",
    fontSize: 15,
    color: "#666",
  },
});
