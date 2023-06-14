import { StyleSheet, Button, View, Alert } from "react-native";
import { doc, updateDoc } from "firebase/firestore";
import { app, database } from "../../firebase";
import React, { useState } from "react";
import ScreenHeader from "../components/ScreenHeader";
import MyInput from "../components/MyInput";
import MyLabel from "../components/MyLabel";
import Spinner from "../components/Spinner";
import { primary_color } from "../constants/colors";

const ChangeProfileScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const name = props.route.params.name;
  const [value, setValue] = useState(props.route.params.value[name]);

  const handleSubmit = () => {
    if (value) {
      setLoading(true);
      const docUpdate = doc(database, "users", props.route.params.id);

      updateDoc(docUpdate, {
        [name]: value,
      })
        .then(() => {
          setValue(null);
          setLoading(false);
          Alert.alert("Хувийн мэдээлэл амжилттай солигдлоо. Амжилт хүсье.");
        })
        .then(() => {
          props.navigation.pop();
        })
        .catch((error) => {
          //   console.log("CHANGE_EMAIL_ERROR: ", error);
          setValue(null);
          setLoading(false);
          Alert.alert(
            "Хувийн мэдээлэл өөрчлөхөд алдаа гарлаа. Дахин оролдоно уу."
          );
        });
    } else {
      Alert.alert(
        "Оруулсан хувийн мэдээлэл алдаатай байна. Дахин оролдоно уу."
      );
    }
  };

  return (
    <View>
      <View>
        <ScreenHeader
          title={name === "mobile" && "Утасны дугаар солих"}
          navigation={props.navigation}
        />
      </View>
      <View style={css.container}>
        <MyLabel label={name === "mobile" && "Утасны дугаар"} />
        <MyInput
          name={name}
          placeholder={null}
          keyboardType={name === "mobile" && "numeric"}
          textContentType={name === "mobile" && "telephoneNumber"}
          onChange={setValue}
          value={value}
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

export default ChangeProfileScreen;

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
