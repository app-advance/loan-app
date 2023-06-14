import { StyleSheet, Button, View, Alert } from "react-native";
import { getAuth, updateEmail } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { app, database } from "../../firebase";
import React, { useState } from "react";
import ScreenHeader from "../components/ScreenHeader";
import MyInput from "../components/MyInput";
import MyLabel from "../components/MyLabel";
import Spinner from "../components/Spinner";
import { primary_color } from "../constants/colors";

const ChangeEmailScreen = (props) => {
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (email) {
      setLoading(true);
      const auth = getAuth();
      const user = auth.currentUser;

      updateEmail(user, email)
        .then(() => {
          const docUpdate = doc(database, "users", props.route.params.id);

          updateDoc(docUpdate, {
            email,
          })
            .then(() => {
              setEmail(null);
              setLoading(false);
              Alert.alert("Имэйл хаяг амжилттай солигдлоо. Амжилт хүсье.");
            })
            .then(() => {
              props.navigation.pop();
            })
            .catch((error) => {
              //   console.log("CHANGE_EMAIL_ERROR: ", error);
              Alert.alert(
                "Имэйл хаяг өөрчлөхөд алдаа гарлаа. Дахин оролдоно уу."
              );
            });
        })
        .catch((error) => {
          //   console.log("CHANGE_EMAIL_ERROR: ", error);
          setEmail(null);
          setLoading(false);

          Alert.alert("Имэйл хаяг өөрчлөхөд алдаа гарлаа. Дахин оролдоно уу.");
        });
    } else {
      Alert.alert("Оруулсан имэйл хаяг алдаатай байна. Дахин оролдоно уу.");
    }
  };

  return (
    <View>
      <View>
        <ScreenHeader
          title="Имэйл хаяг өөрчлөх"
          navigation={props.navigation}
        />
      </View>
      <View style={css.container}>
        <MyLabel label="Имэйл хаяг | Нэвтрэх нэр" />
        <MyInput
          name="email"
          placeholder={null}
          keyboardType="email-address"
          textContentType="emailAddress"
          onChange={setEmail}
          value={email}
          secureTextEntry={false}
        />
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

export default ChangeEmailScreen;

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
});
