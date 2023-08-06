import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { primary_color } from "../constants/colors";

const MySolidButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={css.container}>
      <Text style={css.button}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default MySolidButton;

const css = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    backgroundColor: primary_color,
    borderRadius: 50,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  button: {
    fontSize: 15,
    fontWeight: 700,
    textAlign: "center",
    color: "white",
    width: "100%",
    paddingVertical: 20,
  },
});
