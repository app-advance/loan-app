import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Linking,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenHeader from "../components/ScreenHeader";
import useParameter from "../hooks/useParameter";
import { primary_color } from "../constants/colors";

const ContactScreen = (props) => {
  const [contact, setContact] = useState();
  const phoneNumber = useParameter("SrWlRTEJbhSnzG5zsntZ");
  const emailAddress = useParameter("fEeOhf6Ph9EsbQwpn7nV");

  const handleContactByCall = (type) => {
    if (type === "call") {
      if (Platform.OS === "android") {
        Linking.openURL(`tel:${contact?.phoneNumber}`);
      } else {
        Linking.openURL(`telpropmpt:${contact?.phoneNumber}`);
      }
    } else if (type === "email") {
      Linking.openURL(`mailto:${contact?.emailAddress}`);
    }
  };

  useEffect(() => {
    if (phoneNumber !== undefined && emailAddress !== undefined) {
      setContact({
        phoneNumber: phoneNumber[0]?.official_mobile,
        emailAddress: emailAddress[0]?.official_email,
      });
    }
  }, [phoneNumber, emailAddress]);

  return (
    <View>
      <View>
        <ScreenHeader title="Холбоо барих" navigation={props.navigation} />
      </View>
      <ScrollView
        style={{
          marginTop: 25,
          alignSelf: "center",
          width: "100%",
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ textAlign: "center", color: primary_color }}>
          Та бүтээгдэхүүн, үйлчилгээтэй холбоотой дэлгэрэнгүй мэдээлэл авахыг
          хүсвэл доорх дугаараар
        </Text>
        <Text
          style={{
            color: primary_color,
            fontSize: 50,
            fontWeight: 700,
            textAlign: "center",
            marginVertical: 50,
          }}
          onPress={() => handleContactByCall("call")}
        >
          {phoneNumber !== undefined && contact?.phoneNumber}
        </Text>
        <Text style={{ textAlign: "center", color: primary_color }}>
          эсвэл доорх имэйлээр холбогдоно уу.
        </Text>
        <Text
          style={{
            color: primary_color,
            fontSize: 30,
            fontWeight: 700,
            textAlign: "center",
            marginVertical: 50,
          }}
          onPress={() => handleContactByCall("email")}
        >
          {emailAddress !== undefined && contact?.emailAddress}
        </Text>
      </ScrollView>
    </View>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({});
