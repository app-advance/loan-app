import React, { useState } from "react";
import { app, database } from "../../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import {
  ScrollView,
  Text,
  Button,
  StyleSheet,
  View,
  Alert,
  Image,
} from "react-native";
import MyInput from "../components/MyInput";
import MyGreyButton from "../components/MyGreyButton";
import Spinner from "../components/Spinner";
import { primary_color } from "../constants/colors";

export default RegisterScreen = (props) => {
  const [email, setEmail] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [password1, setPassword1] = useState(null);
  const [password2, setPassword2] = useState(null);
  const [register, setRegister] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [firstname, setFirstname] = useState(null);
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const collectionRef = collection(database, "users");

  const handleSubmit = () => {
    if (
      email &&
      password1 &&
      password2 &&
      password1 === password2 &&
      mobile &&
      register &&
      lastname &&
      firstname
    ) {
      setLoading(true);
      // Add user's authentication
      createUserWithEmailAndPassword(auth, email, password1)
        .then((result) => {
          // console.log("CREATE_USER_AUTH_RESULT: ", result.user.uid);

          // Add user's information
          addDoc(collectionRef, {
            email,
            mobile,
            register,
            firstname,
            lastname,
            isAgreement: false,
            permission: "m9clR2OLYQ9ADieO5HRI",
            segment: "6N47SwMSVdn3nbkRCVzp",
          })
            .then((result) => {
              // console.log("ADD_DATA_RESULT: ", result);
              // Clear variables
              setEmail(null);
              setMobile(null);
              setPassword1(null);
              setPassword2(null);
              setRegister(null);
              setLastname(null);
              setFirstname(null);
              setLoading(false);

              Alert.alert(
                "Амжилттай бүртгэгдлээ. Нэвтэрч орно уу. Амжилт хүсье."
              );
            })
            .then(() => {
              props.navigation.pop();
            })
            .catch((error) => {
              setLoading(false);
              // console.log("REGISTER_ADD_DOC_ERROR: ", error);
            });
        })
        .catch((error) => {
          setLoading(false);
          // console.log("ERROR: ", error.message);
          if (error.message.includes("auth/weak-password")) {
            Alert.alert(
              "Нууц үг нь 6-аас дээш тэмдэгтэй, тоо, тэмдэгт, жижиг үсэг, том үсэг агуулсан байна."
            );
          } else if (error.message.includes("auth/email-already-in-use")) {
            Alert.alert("Имэйл бүртгэгдсэн байна.");
          }
        });
    } else {
      Alert.alert(
        "Оруулсан мэдээлэл алдаатай байна. Дахин оролдоно уу. Амжилт хүсье."
      );
    }
  };

  const handleNavigation = (screen) => {
    props.navigation.pop();
  };

  return (
    <View style={css.container}>
      <View style={css.titleArea}>
        <Image
          source={require("../../assets/white-logo.png")}
          style={css.logo}
        />
        <Text style={css.title}>Бүртгүүлэх</Text>
      </View>
      <ScrollView style={css.inputArea}>
        <View style={{ ...css.items, marginTop: 30 }}>
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
        <View style={css.items}>
          <MyInput
            name="register"
            placeholder="Регистрийн дугаар"
            keyboardType="default"
            textContentType="name"
            onChange={setRegister}
            value={register}
            secureTextEntry={false}
          />
        </View>
        <View style={css.items}>
          <MyInput
            name="lastname"
            placeholder="Овог"
            keyboardType="default"
            textContentType="givenName"
            onChange={setLastname}
            value={lastname}
            secureTextEntry={false}
          />
        </View>
        <View style={css.items}>
          <MyInput
            name="firstname"
            placeholder="Нэр"
            keyboardType="default"
            textContentType="name"
            onChange={setFirstname}
            value={firstname}
            secureTextEntry={false}
          />
        </View>
        <View style={css.items}>
          <MyInput
            name="mobile"
            placeholder="Утасны дугаар"
            keyboardType="numeric"
            textContentType="telephoneNumber"
            onChange={setMobile}
            value={mobile}
            secureTextEntry={false}
          />
        </View>
        <View style={css.items}>
          <MyInput
            name="password1"
            placeholder="Шинэ нууц үг"
            keyboardType="default"
            textContentType="newPassword"
            onChange={setPassword1}
            value={password1}
            secureTextEntry={true}
          />
        </View>
        <View style={css.items}>
          <MyInput
            name="password2"
            placeholder="Шинэ нууц үг"
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
            <Button
              title="Бүртгүүлэх"
              onPress={handleSubmit}
              color={primary_color}
            />
          )}
        </View>
        <View style={{ marginVertical: 50, alignSelf: "center" }}>
          <MyGreyButton
            title="Буцах"
            navigation={handleNavigation}
            navigate="LoginScreen"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const css = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleArea: {
    height: "31%",
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
    height: "75%",
    backgroundColor: "white",
    width: "100%",
    paddingHorizontal: 30,
  },
  button: {
    marginTop: 20,
    width: "50%",
    alignSelf: "center",
  },
  items: {
    marginBottom: 15,
  },
});
