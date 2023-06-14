import { StyleSheet, ScrollView, Text, View, Button } from "react-native";
import Slider from "@react-native-community/slider";
import thoud from "thousand_separator_number";
import React, { useState } from "react";
import ScreenHeader from "../components/ScreenHeader";
import MyLabel from "../components/MyLabel";
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
        <View style={css.items}>
          <MyLabel label="Бүтээгдэхүүний нэр" />
          <Text style={css.text}>{product.segment}</Text>
        </View>
        <View style={css.items}>
          <MyLabel label="Зээлийн хэмжээ" />
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
            <Text>{thoud(product.min_amount)}₮</Text>
            {/* <Text>{thoud(product.max_amount)}₮</Text> */}
            <Text>
              {thoud(Number(product.loan_amount) - userTotalLoanAmount)}₮
            </Text>
          </View>
          <Text style={css.text}>{thoud(userLoanAmount)} төг</Text>
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
          <Text style={css.text_desc}>
            Зээл олгосноос хойш {product.duration} хоногийн дараа
          </Text>
        </View>
        <View style={{ ...css.items, marginTop: 35 }}>
          <Button title="Үргэлжлүүлэх" onPress={handleLoanContinue} color={primary_color} />
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
  text: {
    fontSize: 30,
    fontWeight: "bold",
    shadowColor: "gray",
    textAlign: "center",
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
    marginBottom: 20,
  },
});
