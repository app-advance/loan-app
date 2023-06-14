import { View, Text } from "react-native";
import React from "react";

const MyLabel = (props) => {
  return (
    <View>
      <Text>{props.label}</Text>
    </View>
  );
};

export default MyLabel;
