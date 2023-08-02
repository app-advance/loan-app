import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import ScreenHeader from "../components/ScreenHeader";
import MyLabel from "../components/MyLabel";
import useUser from "../hooks/useUser";
import { primary_color } from "../constants/colors";

const ProfileScreen = (props) => {
  const userDetail = useUser();

  const handleChangeEmail = () => {
    props.navigation.navigate("ChangeEmailScreen", { id: userDetail[0]?.id });
  };

  const handleChangeProfile = (name) => {
    props.navigation.navigate("ChangeProfileScreen", {
      name,
      id: userDetail[0]?.id,
      value: userDetail[0],
    });
  };

  return (
    <View>
      <View>
        <ScreenHeader title="Хувийн мэдээлэл" navigation={props.navigation} />
      </View>
      <View style={css.container}>
        <View style={css.items}>
          <MyLabel label="Имэйл хаяг | Нэвтрэх нэр" />
          <View
            style={{
              width: "100%",
              alignSelf: "flex-start",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={css.text}>
              {userDetail !== undefined && userDetail[0]?.email}
            </Text>
            {/* <Button title="Өөрчлөх" onPress={handleChangeEmail} color={primary_color} /> */}
          </View>
        </View>
        <View style={css.items}>
          <MyLabel label="Овог, нэр" />
          <Text style={css.text}>
            {userDetail !== undefined &&
              userDetail[0]?.lastname + " " + userDetail[0]?.firstname}
          </Text>
        </View>
        <View style={css.items}>
          <MyLabel label="Регистрийн дугаар" />
          <Text style={css.text}>
            {userDetail !== undefined && userDetail[0]?.register}
          </Text>
        </View>
        <View style={css.items}>
          <MyLabel label="Утасны дугаар" />
          <View
            style={{
              width: "100%",
              alignSelf: "flex-start",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={css.text}>
              {userDetail !== undefined && userDetail[0]?.mobile}
            </Text>
            {/* <Button
              title="Өөрчлөх"
              onPress={() => handleChangeProfile("mobile")}
              color={primary_color}
            /> */}
          </View>
        </View>
        <View style={css.items}>
          <MyLabel label="Гэрээ байгуулсан эсэх" />
          <Text style={css.text}>
            {userDetail !== undefined &&
              (userDetail[0]?.isAgreement ? "Тийм" : "Үгүй")}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const css = StyleSheet.create({
  container: {
    marginHorizontal: 35,
    marginTop: 50,
  },
  text: {
    fontSize: 18,
    fontWeight: "semibold",
    color: primary_color,
  },
  items: {
    marginBottom: 20,
  },
});
