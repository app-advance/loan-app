import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Button, Clipboard } from "react-native";

export default PractiseScreen = (props) => {
  const [copiedText, setCopiedText] = useState(null);

  const handleCopyText = (data) => {
    console.log(data);
    Clipboard.setString(data);
  };

  return (
    <View style={css.container}>
      <Button
        title="Хуулах"
        onPress={() => handleCopyText("Tamirkov@asta3000")}
        color={primary_color}
      />
      <Text style={{ marginTop: 50 }}>
        {/* Copied Text: {Clipboard.getString()} */}
      </Text>
    </View>
  );
};

const css = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
