import { StyleSheet, Text, View, Alert } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { primary_color } from "../constants/colors";

const ScreenHeader = (props) => {
  return (
    <View style={css.container}>
      <AntDesign
        name="left"
        size={30}
        style={{ color: primary_color, fontWeight: "bold" }}
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
    // borderBottomWidth: 1,
    // borderBottomColor: primary_color,
  },
  title: {
    color: primary_color,
    width: "70%",
    fontSize: 25,
    fontWeight: "bold",
  },
});
