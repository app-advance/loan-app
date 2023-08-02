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
    fontSize: 15,
    fontWeight: 700,
    textAlign: "center",
    backgroundColor: "white",
    color: primary_color,
    borderColor: "#ddd",
    borderWidth: 1,
    width: "100%",
    paddingVertical: 20,
    borderRadius: 36,
  },
});
