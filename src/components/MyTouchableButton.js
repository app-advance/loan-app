import { StyleSheet, Text, Image, TouchableOpacity, View } from "react-native";
import React from "react";
import { primary_color } from "../constants/colors";

const MyTouchableButton = (props) => {
  return (
    <TouchableOpacity style={css.container} onPress={props.onPress}>
      <Text style={css.text}>{props.title}</Text>
      <View style={css.logo}>
        <Image
          source={require("../../assets/blue-logo.png")}
          style={css.image}
        />
      </View>
    </TouchableOpacity>
  );
};

export default MyTouchableButton;

const css = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 15,
    backgroundColor: "white",
    borderRadius: 50,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  logo: {
    borderColor: primary_color,
    borderWidth: 1,
    marginRight: -4,
    padding: 15,
    borderRadius: 50,
  },
  image: {
    width: 25,
    height: 25,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    color: primary_color,
    marginLeft: 25,
  },
});
