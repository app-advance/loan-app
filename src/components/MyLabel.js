import { View, Text } from "react-native";
import React from "react";
import { primary_color } from "../constants/colors";

const MyLabel = (props) => {
  return (
    <View>
      <Text style={{ color: primary_color }}>{props.label}</Text>
    </View>
  );
};

export default MyLabel;
