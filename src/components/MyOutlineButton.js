import { StyleSheet, Text } from "react-native";
import React from "react";
import { primary_color } from "../constants/colors";

const MyOutlineButton = (props) => {
  return props.navigation ? (
    <Text style={css.button} onPress={() => props.navigation(props.navigate)}>
      {props.title}
    </Text>
  ) : (
    <Text style={css.button}>{props.title}</Text>
  );
};

export default MyOutlineButton;

const css = StyleSheet.create({
  button: {
    fontSize: 14,
    textAlign: "center",
    color: primary_color,
    borderColor: primary_color,
    borderWidth: 1,
    width: "100%",
    paddingVertical: 5,
    borderRadius: 20,
  },
});
