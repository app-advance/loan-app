import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { primary_color } from "../constants/colors";

const BusinessTitle = (props) => {
  return (
    <View style={css.container}>
      <FontAwesome5 name="chevron-right" size={15} color="darkblue" />
      <Text style={css.title}>{props.title}</Text>
    </View>
  );
};

export default BusinessTitle;

const css = StyleSheet.create({
  container: {
    marginTop: 25,
    marginBottom: 15,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    marginLeft: 5,
    color: primary_color,
    fontSize: 16,
    fontWeight: "700",
  },
});
