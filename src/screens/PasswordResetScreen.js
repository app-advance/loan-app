import { View, Text, Button, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { app } from "../../firebase";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import MyInput from "../components/MyInput";
import MyGreyButton from "../components/MyGreyButton";
import Spinner from "../components/Spinner";
import { primary_color } from "../constants/colors";

const PasswordResetScreen = (props) => {
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  const handleSubmit = () => {
    if (email) {
      setLoading(true);
      sendPasswordResetEmail(auth, email)
        .then((result) => {
          // console.log("PASSWORD_RESET_RESULT: ", result);
          setEmail();
          setLoading(false);
          Alert.alert("Имэйл илгээгдлээ. Амжилт хүсье.");
        })
        .then(() => {
          handleNavigation();
        })
        .catch((error) => {
          // console.log("PASSWORD_RESET_ERROR: ", error);
          setLoading(false);
          setEmail(null);
          Alert.alert(
            "Имэйл илгээхэд алдаа гарлаа. Дахин оролдоно уу. Амжилт хүсье."
          );
        });
    } else {
      Alert.alert("Имэйл хаягаа оруулна уу. Амжилт хүсье.");
    }
  };

  const handleNavigation = (screen) => {
    props.navigation.pop();
  };

  return (
    <View style={css.container}>
      <View style={css.titleArea}>
        <Text style={css.title}>Нууц үг сэргээх</Text>
      </View>
      <View style={css.inputArea}>
        <View style={{ marginBottom: 20, marginTop: 50 }}>
          <MyInput
            name="email"
            placeholder="Имэйл хаяг"
            keyboardType="email-address"
            textContentType="emailAddress"
            onChange={setEmail}
            value={email}
            secureTextEntry={false}
          />
        </View>
        <View style={{ width: "50%", alignSelf: "center", marginTop: 20 }}>
          {loading ? (
            <Spinner />
          ) : (
            <Button
              title="Илгээх"
              onPress={handleSubmit}
              color={primary_color}
            />
          )}
        </View>
        <View style={{ marginTop: 50, alignSelf: "center" }}>
          <MyGreyButton
            title="Буцах"
            navigation={handleNavigation}
            navigate="LoginScreen"
          />
        </View>
      </View>
    </View>
  );
};

export default PasswordResetScreen;

const css = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleArea: {
    flex: 1,
    backgroundColor: primary_color,
    width: "100%",
    justifyContent: "flex-end",
  },
  title: {
    color: "white",
    fontSize: 45,
    fontWeight: "bold",
    bottom: 20,
    left: 20,
  },
  inputArea: {
    flex: 2,
    backgroundColor: "white",
    width: "100%",
    paddingHorizontal: 30,
    justifyContent: "flex-start",
  },
});
