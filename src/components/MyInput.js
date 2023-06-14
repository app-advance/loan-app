import { TextInput, StyleSheet } from "react-native";
import React from "react";

const MyInput = (props) => {
  //   console.log("MY_INPUT_PROPS: ", props);
  return (
    <TextInput
      name={props.name}
      placeholder={props.placeholder}
      style={css.input}
      autoCapitalize="none"
      autoCorrect={false}
      keyboardType={props.keyboardType}
      textContentType={props.textContentType}
      onChange={(event) => props.onChange(event.nativeEvent.text)}
      value={props.value}
      secureTextEntry={props.secureTextEntry}
    />
  );
};

export default MyInput;

const css = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
