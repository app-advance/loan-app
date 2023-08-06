import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { primary_color } from "../constants/colors";

const MyOutlineButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={css.container}>
      {props.navigation ? (
        <Text
          style={css.button}
          onPress={() => props.navigation(props.navigate)}
        >
          {props.title}
        </Text>
      ) : (
        <Text style={css.button}>{props.title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default MyOutlineButton;

const css = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    backgroundColor: "white",
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
    color: primary_color,
    width: "100%",
    paddingVertical: 20,
  },
});
