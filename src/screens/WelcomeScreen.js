import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { primary_color } from "../constants/colors";

export default WelcomeScreen = (props) => {
  setTimeout(() => {
    props.navigation.navigate("LoginScreen");
  }, 2000);

  return (
    <View style={css.container}>
      {/* <Text style={css.slogan}>Эдванс Кредит ББСБ</Text> */}
      <Image
        style={css.logo}
        source={require("../../assets/splash-logo.png")}
      />
      {/* <Text style={css.product}>ХҮҮГҮЙ ЗЭЭЛ</Text> */}
    </View>
  );
};

const css = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: primary_color,
  },
  slogan: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  product: {
    fontSize: 20,
    color: "white",
    fontWeight: "semibold",
  },
  logo: {
    height: "36%",
    width: "93%",
    marginVertical: 20,
  },
});
