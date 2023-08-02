import { StyleSheet, Text } from "react-native";
import React from "react";
import { primary_color } from "../constants/colors";

const MySolidButton = (props) => {
  return (
    <Text style={css.button} onPress={props.onPress}>
      {props.title}
    </Text>
  );
};

export default MySolidButton;

const css = StyleSheet.create({
  button: {
    fontSize: 15,
    fontWeight: 700,
    textAlign: "center",
    backgroundColor: primary_color,
    color: "white",
    borderColor: "#ddd",
    borderWidth: 1,
    width: "100%",
    paddingVertical: 20,
    borderRadius: 36,
  },
});
