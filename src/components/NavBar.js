import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { View, StyleSheet, Text, Image } from "react-native";
import Spinner from "../components/Spinner";
import { primary_color } from "../constants/colors";

const NavBar = (props) => {
  return (
    <View style={css.header}>
      <View
        style={{
          flex: 2,
          paddingLeft: 10,
          height: "100%",
          flexDirection: "row",
          gap: 5,
        }}
      >
        <Image
          source={require("../../assets/emptyProfile.png")}
          style={{ width: 38, height: "100%", resizeMode: "contain" }}
        />
        <Text
          style={{
            fontSize: 16,
            height: "100%",
            verticalAlign: "middle",
            color: "white",
            fontWeight: "semibold",
          }}
        >
          {props.userDetail !== undefined ? (
            "Сайн уу, " +
            props.userDetail[0]?.firstname +
            "." +
            props.userDetail[0]?.lastname[0]
          ) : (
            <Spinner />
          )}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          // backgroundColor: "blue",
          paddingRight: 23,
          height: "100%",
        }}
      >
        <FontAwesome5
          name="bars"
          style={{
            fontSize: 25,
            height: "100%",
            verticalAlign: "middle",
            textAlign: "right",
            color: "white",
          }}
          onPress={() => props.setShowHamburgerMenu(!props.showHamburgerMenu)}
        />
      </View>
    </View>
  );
};

export default NavBar;

const css = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: primary_color,
  },
});
