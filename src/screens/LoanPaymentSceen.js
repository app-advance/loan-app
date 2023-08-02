import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Clipboard,
} from "react-native";
import React from "react";
import thoud from "thousand_separator_number";
import MyTouchableButton from "../components/MyTouchableButton";
import ScreenHeader from "../components/ScreenHeader";
import useParameter from "../hooks/useParameter";
import { useEmailSend } from "../hooks/useEmailSend";
import MyLabel from "../components/MyLabel";
import { primary_color } from "../constants/colors";
import { FontAwesome5 } from "@expo/vector-icons";

const LoanPaymentSceen = (props) => {
  const loan = props.route.params.loan;
  const user = props.route.params.user;
  const txnAmount = props.route.params.txnAmount;
  const parameter = useParameter("UzZeksoPpdNIkqh6KMCB");

  const handleInformPayment = async (loan) => {
    const email = {
      firstname: loan.firstname,
      lastname: loan.lastname,
      // txn_amount: loan.user_loan_amount,
      txn_amount: txnAmount,
      unique: loan.unique,
      register: loan.register,
      mobile: loan.mobile,
    };

    await useEmailSend(email, "payment");
    props.navigation.pop();
  };

  const copyToClipboard = (value) => {
    // console.log(value.toString());
    Clipboard.setString(value.toString());
  };

  return (
    <View>
      <View>
        <ScreenHeader title="Зээл төлөх, хаах" navigation={props.navigation} />
      </View>
      <ScrollView style={css.container}>
        <View style={css.items}>
          <MyLabel label="Зээлийн үлдэгдлийн хэмжээ" />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={css.text}>{thoud(txnAmount)} төг</Text>
            <View>
              <FontAwesome5
                name="copy"
                size={24}
                color={primary_color}
                onPress={() => copyToClipboard(loan.user_loan_amount)}
              />
            </View>
          </View>
        </View>
        <View style={css.items}>
          <MyLabel label="ХААН банкны данс" />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={css.text}>
              {parameter !== undefined && parameter[0].bank_account}
            </Text>
            <View>
              <FontAwesome5
                name="copy"
                size={24}
                color={primary_color}
                onPress={() =>
                  copyToClipboard(
                    parameter !== undefined && parameter[0].bank_account
                  )
                }
              />
            </View>
          </View>
        </View>
        <View style={css.items}>
          <MyLabel label="Данс эзэмшигчийн нэр" />
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
            <Text style={css.text}>{loan.unique}</Text>
            <View>
              <FontAwesome5
                name="copy"
                size={24}
                color={primary_color}
                onPress={() => copyToClipboard(loan.unique)}
              />
            </View>
          </View>
        </View>
        <View style={{ marginTop: 30 }}>
          <Text style={{ textAlign: "center", color: primary_color }}>
            Та зөвхөн дээрх дугаарыг{" "}
            <Text style={{ color: "red", fontWeight: "700" }}>
              гүйлгээний утга
            </Text>{" "}
            дээрээ бичнэ үү!
          </Text>
        </View>
        <View style={{ ...css.items, marginTop: 50 }}>
          <MyTouchableButton
            onPress={() => handleInformPayment(loan)}
            title="Төлөх, Хаах"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default LoanPaymentSceen;

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
  },
  items: {
    marginBottom: 10,
  },
});
