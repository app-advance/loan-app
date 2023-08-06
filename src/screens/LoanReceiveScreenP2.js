import { StyleSheet, ScrollView, Text, View, Clipboard } from "react-native";
import thoud from "thousand_separator_number";
import React, { useState } from "react";
import ScreenHeader from "../components/ScreenHeader";
import MyTouchableButton from "../components/MyTouchableButton";
import MyLabel from "../components/MyLabel";
import useLoan from "../hooks/useLoan";
import { useEmailSend } from "../hooks/useEmailSend";
import Spinner from "../components/Spinner";
import { primary_color } from "../constants/colors";
import { platform } from "../constants/platform";
import { FontAwesome5 } from "@expo/vector-icons";

const LoanReceiveScreenP2 = (props) => {
  const [loading, setLoading] = useState(false);
  const loan = props.route.params.loan;
  const product = props.route.params.product;
  const user = props.route.params.user;
  const uniqueID = props.route.params.uniqueID;
  const bank_account = props.route.params.bank_account;

  const sendLoanRequest = async () => {
    setLoading(true);
    useLoan("POST", {
      loan,
      product,
      user,
      uniqueID,
    });

    const email = {
      firstname: user.firstname,
      lastname: user.lastname,
      txn_amount: loan.loan,
      unique: uniqueID,
      register: user.register,
      mobile: user.mobile,
    };

    await useEmailSend(email, "loan");

    setLoading(false);
    props.navigation.navigate("HomeScreen");
  };

  const copyToClipboard = (value) => {
    // console.log(typeof value.toString());
    Clipboard.setString(value.toString());
  };

  return (
    <View>
      <View>
        <ScreenHeader title="Зээл авах (2/2)" navigation={props.navigation} />
      </View>
      <ScrollView style={css.container}>
        <Text
          style={{
            marginBottom: 25,
            textAlign: "justify",
          }}
        >
          Та доорх дансанд{" "}
          <Text style={{ color: primary_color, fontWeight: "700" }}>
            шимтгэлээ
          </Text>{" "}
          төлснөөр ажлын 1-2 цагийн дотор зээл олголт хийгдэнэ.
        </Text>
        <View style={css.items}>
          <MyLabel label="Бүтээгдэхүүний нэр" />
          <Text style={{ ...css.text, fontWeight: "bold" }}>
            {product.segment}
          </Text>
        </View>
        <View style={{ ...css.items, marginBottom: 40 }}>
          <MyLabel label="Зээлийн хэмжээ" />
          <Text style={{ ...css.text, fontWeight: "bold" }}>
            {thoud(loan.loan)} төг
          </Text>
        </View>
        <View style={css.items}>
          <MyLabel label="Шимтгэл | Гүйлгээний дүн" />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={css.text}>{thoud(loan.fee)} төг</Text>
            <View>
              <FontAwesome5
                name="copy"
                size={24}
                color={primary_color}
                onPress={() => copyToClipboard(loan.fee)}
              />
            </View>
          </View>
        </View>
        <View style={css.items}>
          <MyLabel label="ХААН банкны данс" />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={css.text}>{bank_account}</Text>
            <View>
              <FontAwesome5
                name="copy"
                size={24}
                color={primary_color}
                onPress={() => copyToClipboard(bank_account)}
              />
            </View>
          </View>
        </View>
        <View style={css.items}>
          <MyLabel label="ХААН банкны данс" />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={css.text}>Эдванс Кредит ББСБ</Text>
            <View>
              <FontAwesome5
                name="copy"
                size={24}
                color={primary_color}
                onPress={() => copyToClipboard("Эдванс Кредит ББСБ")}
              />
            </View>
          </View>
        </View>
        <View style={css.items}>
          <MyLabel label="Гүйлгээний утга" />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={css.text}>{uniqueID}</Text>
            <View>
              <FontAwesome5
                name="copy"
                size={24}
                color={primary_color}
                onPress={() => copyToClipboard(uniqueID)}
              />
            </View>
          </View>
        </View>
        <View style={{ marginTop: 5 }}>
          <Text style={{ textAlign: "center" }}>
            Та зөвхөн дээрх дугаарыг{" "}
            <Text style={{ color: "red", fontWeight: "700" }}>
              гүйлгээний утга
            </Text>{" "}
            дээрээ бичнэ үү!
          </Text>
        </View>
        <View style={platform === "ios" ? css.itemsIos : css.itemsAndroid}>
          {loading ? (
            <Spinner />
          ) : (
            <MyTouchableButton
              onPress={sendLoanRequest}
              title="Хүсэлт илгээх"
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default LoanReceiveScreenP2;

const css = StyleSheet.create({
  container: {
    marginHorizontal: 35,
    marginTop: 50,
  },
  text: {
    fontSize: 20,
    fontWeight: "semibold",
    shadowColor: "gray",
    color: primary_color,
    // marginLeft: 20,
  },
  items: {
    marginBottom: 10,
  },
  itemsAndroid: {
    marginVertical: 35,
  },
  itemsIos: {
    marginTop: 35,
    marginBottom: 150,
  },
});
