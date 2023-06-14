import { StyleSheet, View, Button, Alert } from "react-native";
import React, { useState } from "react";
import { app } from "../../firebase";
import { getAuth, updatePassword } from "firebase/auth";
import ScreenHeader from "../components/ScreenHeader";
import MyInput from "../components/MyInput";
import MyLabel from "../components/MyLabel";
import Spinner from "../components/Spinner";
import { primary_color } from "../constants/colors";

const ChangePassword = (props) => {
  const [password1, setPassword1] = useState(null);
  const [password2, setPassword2] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (password1 && password2 && password1 === password2) {
      setLoading(true);
      const auth = getAuth();
      const user = auth.currentUser;

      updatePassword(user, password1)
        .then(() => {
          setLoading(false);
          setPassword1(null);
          setPassword2(null);
          Alert.alert("Нууц үг амжилттай солигдлоо. Амжилт хүсье.");
        })
        .then(() => {
          props.navigation.pop();
        })
        .catch((error) => {
          // console.log("CHANGE_PASSWORD_ERROR: ", error);
          setLoading(false);
          setPassword1(null);
          setPassword2(null);

          if (error.message.includes("auth/weak-password")) {
            Alert.alert(
              "Нууц үг нь 6-аас дээш тэмдэгтэй, тоо, тэмдэгт, жижиг үсэг, том үсэг агуулсан байна."
            );
          } else {
            Alert.alert("Нууц үг өөрчлөхөд алдаа гарлаа. Дахин оролдоно уу.");
          }
        });
    } else {
      Alert.alert("Оруулсан нууц үг алдаатай байна. Дахин оролдоно уу.");
    }
  };

  return (
    <View>
      <View>
        <ScreenHeader title="Нууц үг өөрчлөх" navigation={props.navigation} />
      </View>
      <View style={css.container}>
        <View style={css.items}>
          <MyLabel label="Шинэ нууц үг" />
          <MyInput
            name="password1"
            placeholder={null}
            keyboardType="default"
            textContentType="newPassword"
            onChange={setPassword1}
            value={password1}
            secureTextEntry={true}
          />
        </View>
        <View style={css.items}>
          <MyLabel label="Баталгаажуулах нууц үг" />
          <MyInput
            name="password2"
            placeholder={null}
            keyboardType="default"
            textContentType="newPassword"
            onChange={setPassword2}
            value={password2}
            secureTextEntry={true}
          />
        </View>
        <View style={css.button}>
          {loading ? (
            <Spinner />
          ) : (
            <Button title="Өөрчлөх" onPress={handleSubmit} color={primary_color} />
          )}
        </View>
      </View>
    </View>
  );
};

export default ChangePassword;

const css = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginTop: 50,
  },
  button: {
    marginTop: 50,
    width: "50%",
    alignSelf: "center",
  },
  items: {
    marginBottom: 15,
  },
});
