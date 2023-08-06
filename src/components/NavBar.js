import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { View, StyleSheet, Text, Image } from "react-native";
import Spinner from "../components/Spinner";
import { platform } from "../constants/platform";

const NavBar = (props) => {
  return (
    <View style={css.header}>
      <View
        style={{
          flex: 14,
          paddingLeft: 10,
          height: "100%",
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Image
          source={require("../../assets/emptyProfile.png")}
          style={{
            width: 38,
            height: "100%",
            resizeMode: "contain",
            alignSelf: "center",
          }}
        />
        <Text style={platform === "ios" ? css.profileIos : css.profileAndroid}>
          {props.userDetail !== undefined ? (
            <View>
              <Text style={{ color: "white" }}>Сайн уу,</Text>
              <Text style={{ fontWeight: "bold", color: "white" }}>
                {props.userDetail[0]?.firstname +
                  "." +
                  props.userDetail[0]?.lastname[0]}
              </Text>
            </View>
          ) : (
            <Spinner />
          )}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          // backgroundColor: "blue",
          marginRight: 23,
          justifyContent: "center",
          height: "100%",
        }}
      >
        <FontAwesome5
          name="bars"
          style={platform === "ios" ? css.barsIos : css.barsAndroid}
          onPress={() => props.setShowHamburgerMenu(!props.showHamburgerMenu)}
        />
      </View>
    </View>
  );
};

export default NavBar;

const css = StyleSheet.create({
  header: {
    marginHorizontal: 10,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  profileAndroid: {
    fontSize: 16,
    height: "100%",
    verticalAlign: "middle",
    color: "white",
  },
  profileIos: {
    fontSize: 16,
    height: "100%",
    verticalAlign: "middle",
    color: "white",
    marginTop: 20,
  },
  barsAndroid: {
    fontSize: 25,
    height: "100%",
    verticalAlign: "middle",
    textAlign: "right",
    color: "white",
  },
  barsIos: {
    fontSize: 25,
    height: "100%",
    verticalAlign: "middle",
    textAlign: "right",
    color: "white",
    marginTop: 20,
  },
});
