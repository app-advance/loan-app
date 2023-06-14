import React, { useState, useEffect } from "react";
import { app } from "../../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  Switch,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyInput from "../components/MyInput";
import MyOutlineButton from "../components/MyOutlineButton";
import MyGreyButton from "../components/MyGreyButton";
import Spinner from "../components/Spinner";
import { primary_color } from "../constants/colors";

export default LoginScreen = (props) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    AsyncStorage.getItem("advance_credit_email")
      .then((result) => {
        setEmail(result);
        if (result !== undefined && result !== "" && result !== null) {
          setIsEnabled(true);
        } else {
          setIsEnabled(false);
        }
      })
      .catch((error) => console.log(error.message));
  }, []);

  const handleSubmit = () => {
    if (email && password) {
      setLoading(true);
      signInWithEmailAndPassword(auth, email.trim(), password.trim())
        .then((result) => {
          // console.log("RESULT: ", result.user);
          Alert.alert("Амжилттай нэвтэрлээ. Амжилт хүсье.");
        })
        .then(() => {
          if (isEnabled) {
            AsyncStorage.setItem("advance_credit_email", email)
              .then(() => {
                console.log("EMAIL SAVED.");
              })
              .catch((error) => {
                console.log("NO EMAIL SAVED.");
              });
          } else {
            AsyncStorage.removeItem("advance_credit_email")
              .then(() => console.log("EMAIL IS REMOVED"))
              .catch((error) => console.log("NO EMAIL IS REMOVED"));
          }
          setEmail(null);
          setPassword(null);
          setLoading(false);
          props.navigation.navigate("HomeScreen");
        })
        .catch((error) => {
          // console.log("ERROR: ", error.message);
          if (isEnabled === false) {
            setEmail(null);
          }
          setPassword(null);
          setLoading(false);
          Alert.alert(
            "Имэйл эсвэл нууц үг буруу байна. Дахин оролдоно уу. Амжилт хүсье."
          );
        });
    } else {
      Alert.alert("Имэйл эсвэл нууц үгээ оруулна уу. Амжилт хүсье.");
    }
  };

  const handleNavigation = (screen) => {
    props.navigation.navigate(screen);
  };

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  return (
    <View style={css.container}>
      <View style={css.titleArea}>
        <Image
          source={require("../../assets/white-logo.png")}
          style={css.logo}
        />
        <Text style={css.title}>Нэвтрэх</Text>
      </View>
      <View style={css.inputArea}>
        <View style={{ marginBottom: 20 }}>
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
        <View style={{ marginBottom: 20 }}>
          <MyInput
            name="password"
            placeholder="Нууц үг"
            keyboardType="default"
            textContentType="password"
            onChange={setPassword}
            value={password}
            secureTextEntry={true}
          />
        </View>
        <View
          style={{
            marginBottom: 40,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Switch
            trackColor={{ false: "lightgray", true: "lightblue" }}
            thumbColor={isEnabled ? primary_color : "gray"}
            value={isEnabled}
            onValueChange={toggleSwitch}
          />
          <Text>Нэвтрэх нэр сануулах</Text>
        </View>
        <View style={{ width: "50%", alignSelf: "center", marginTop: 20 }}>
          {loading ? (
            <Spinner />
          ) : (
            <Button
              title="Нэвтрэх"
              onPress={handleSubmit}
              color={primary_color}
            />
          )}
        </View>
        <View style={{ marginTop: 40, width: "50%", alignSelf: "center" }}>
          <MyOutlineButton
            title="Бүртгүүлэх"
            navigation={handleNavigation}
            navigate="RegisterScreen"
          />
        </View>
        <View style={{ marginTop: 50, alignSelf: "center" }}>
          <MyGreyButton
            title="Нууц үг сэргээх"
            navigation={handleNavigation}
            navigate="PasswordResetScreen"
          />
        </View>
      </View>
    </View>
  );
};

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
    justifyContent: "space-between",
  },
  title: {
    color: "white",
    fontSize: 45,
    fontWeight: "bold",
    bottom: 20,
    left: 20,
  },
  logo: {
    width: 50,
    height: 50,
    alignSelf: "flex-end",
    right: 30,
    top: 40,
  },
  inputArea: {
    paddingTop: 50,
    flex: 2,
    backgroundColor: "white",
    width: "100%",
    paddingHorizontal: 30,
    justifyContent: "flex-start",
  },
});