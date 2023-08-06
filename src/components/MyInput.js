import { View, TextInput, StyleSheet } from "react-native";
import React from "react";
import { FontAwesome, Feather, Fontisto } from "@expo/vector-icons";
import { platform } from "../constants/platform";

const MyInput = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 0,
      }}
    >
      {props.name === "email" ||
      props.name === "register" ||
      props.name === "lastname" ||
      props.name === "firstname" ? (
        <FontAwesome
          name="user-o"
          size={24}
          color="black"
          style={platform === "ios" ? css.iconIos : css.iconAndroid}
        />
      ) : props.name === "password" ||
        props.name === "password1" ||
        props.name === "password2" ? (
        <Feather
          name="lock"
          size={24}
          color="black"
          style={platform === "ios" ? css.iconIos : css.iconAndroid}
        />
      ) : props.name === "mobile" ? (
        <Fontisto
          name="mobile-alt"
          size={24}
          color="black"
          style={platform === "ios" ? css.iconIos : css.iconAndroid}
        />
      ) : null}
      <TextInput
        name={props.name}
        placeholder={props.placeholder}
        placeholderTextColor="#888"
        style={platform === "ios" ? css.inputIos : css.inputAndroid}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={props.keyboardType}
        textContentType={props.textContentType}
        onChange={(event) => props.onChange(event.nativeEvent.text)}
        value={props.value}
        secureTextEntry={props.secureTextEntry}
      />
    </View>
  );
};

export default MyInput;

const css = StyleSheet.create({
  inputAndroid: {
    backgroundColor: "#ddd",
    paddingVertical: 13,
    paddingRight: 13,
    paddingLeft: 2,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    flex: 12,
  },
  inputIos: {
    backgroundColor: "#ddd",
    paddingVertical: 13,
    paddingRight: 13,
    paddingLeft: 2,
    flex: 12,
  },
  iconAndroid: {
    paddingVertical: 15,
    paddingLeft: 15,
    paddingRight: 13,
    flex: 1,
    color: "#aaa",
    backgroundColor: "#ddd",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  iconIos: {
    paddingVertical: 9,
    paddingLeft: 15,
    paddingRight: 13,
    flex: 1,
    color: "#aaa",
    backgroundColor: "#ddd",
  },
});
