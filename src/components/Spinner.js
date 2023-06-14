import { View, ActivityIndicator } from "react-native";
import React from "react";
import { primary_color } from "../constants/colors";

const Spinner = () => {
  return (
    <View>
      <ActivityIndicator size="large" color={primary_color} />
    </View>
  );
};

export default Spinner;
