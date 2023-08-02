import { StyleSheet, ScrollView, Text, View, Button } from "react-native";
import Slider from "@react-native-community/slider";
import thoud from "thousand_separator_number";
import React, { useState } from "react";
import ScreenHeader from "../components/ScreenHeader";
import MyLabel from "../components/MyLabel";
import MyTouchableButton from "../components/MyTouchableButton";
import useUniqueID from "../hooks/useUniqueID";
import useParameter from "../hooks/useParameter";
import { primary_color } from "../constants/colors";

const LoanReceiveScreenP1 = (props) => {
  const product = props.route.params.product;
  const user = props.route.params.user;
  const userTotalLoanAmount = props.route.params.userTotalLoanAmount;
  const uniqueID = useUniqueID();
  const parameters = useParameter("UzZeksoPpdNIkqh6KMCB");
  const [userLoanAmount, setUserLoanAmount] = useState(product.min_amount);
  const [userLoanFee, setUserLoanFee] = useState(
    (product.min_amount * product.fee) / 100
  );

  const loanCalculation = (value) => {
    setUserLoanAmount(value);
    setUserLoanFee((value * product.fee) / 100);
  };

  const handleLoanContinue = () => {
    props.navigation.navigate("LoanReceiveScreenP2", {
      user,
      product,
      loan: {
        loan: userLoanAmount,
        fee: userLoanFee,
      },
      uniqueID,
      bank_account: parameters[0].bank_account,
    });
  };

  return (
    <View>
      <View>
        <ScreenHeader title="Зээл авах (1/2)" navigation={props.navigation} />
      </View>
      <ScrollView style={css.container}>
        <View style={{ ...css.items, marginBottom: 50 }}>
          <MyLabel label="Зээлийн хэмжээ" />
          <Text style={css.bigText}>{thoud(userLoanAmount)} төг</Text>
          <Slider
            style={{ marginTop: 15, height: 20 }}
            minimumValue={product.min_amount}
            // maximumValue={product.max_amount}
            maximumValue={Number(product.loan_amount) - userTotalLoanAmount}
            thumbTintColor={primary_color}
            minimumTrackTintColor={primary_color}
            maximumTrackTintColor="gray"
            value={userLoanAmount}
            onValueChange={(value) => loanCalculation(value)}
            step={100000}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: primary_color, fontWeight: "bold" }}>
              {thoud(product.min_amount)}₮
            </Text>
            {/* <Text>{thoud(product.max_amount)}₮</Text> */}
            <Text style={{ color: primary_color, fontWeight: "bold" }}>
              {thoud(Number(product.loan_amount) - userTotalLoanAmount)}₮
            </Text>
          </View>
        </View>
        <View style={css.items}>
          <MyLabel label="Бүтээгдэхүүний нэр" />
          <Text style={css.text}>{product.segment}</Text>
        </View>
        <View style={css.items}>
          <MyLabel label="Зээлийн хүү" />
          <Text style={css.text}>
            {thoud(userLoanAmount * product.interest)} төг
          </Text>
        </View>
        <View style={css.items}>
          <MyLabel label="Шимтгэл" />
          <Text style={css.text}>{thoud(userLoanFee)} төг</Text>
        </View>
        <View style={css.items}>
          <MyLabel label="Дуусах хугацаа" />
          <Text style={css.text}>
            Зээл олгосноос хойш {product.duration} хоногийн дараа
          </Text>
        </View>
        <View style={{ ...css.items, marginTop: 35 }}>
          <MyTouchableButton
            navigation={props.navigation}
            onPress={handleLoanContinue}
            title="Үргэлжлүүлэх"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default LoanReceiveScreenP1;

const css = StyleSheet.create({
  container: {
    marginHorizontal: 35,
    marginTop: 50,
  },
  bigText: {
    fontSize: 40,
    fontWeight: 700,
    color: primary_color,
    shadowColor: "gray",
    textAlign: "left",
  },
  text: {
    fontSize: 20,
    fontWeight: 500,
    shadowColor: "gray",
    textAlign: "left",
    color: primary_color,
  },
  text_desc: {
    fontSize: 20,
    fontWeight: "bold",
    shadowColor: "gray",
    textAlign: "center",
    color: primary_color,
  },
  items: {
    marginBottom: 10,
  },
});
