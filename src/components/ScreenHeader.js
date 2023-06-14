import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { primary_color } from "../constants/colors";

const ScreenHeader = (props) => {
  return (
    <View style={css.container}>
      <AntDesign
        name="left"
        size={25}
        style={{ color: primary_color }}
        onPress={() => props.navigation.goBack()}
      />
      <Text style={css.title}>{props.title}</Text>
    </View>
  );
};

export default ScreenHeader;

const css = StyleSheet.create({
  container: {
    marginTop: 50,
    marginHorizontal: 20,
    paddingLeft: 10,
    paddingBottom: 15,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: primary_color,
  },
  title: {
    color: primary_color,
    fontSize: 15,
    fontWeight: "semibold",
  },
});
