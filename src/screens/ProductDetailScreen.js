import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  Alert,
} from "react-native";
import React from "react";
import thoud from "thousand_separator_number";
import ScreenHeader from "../components/ScreenHeader";
import useParameter from "../hooks/useParameter";
import MyLabel from "../components/MyLabel";
import Spinner from "../components/Spinner";
import { primary_color } from "../constants/colors";

const ProductDetailScreen = (props) => {
  const parameters = useParameter("SrWlRTEJbhSnzG5zsntZ");
  const product = props.route.params.product;
  const user = props.route.params.user;
  const userTotalLoanAmount = props.route.params.userTotalLoanAmount;

  const handleLoanReceive = () => {
    if (user.isAgreement) {
      if (product?.min_amount > product?.max_amount - userTotalLoanAmount) {
        Alert.alert(
          `Таны авах боломжтой зээлийн эрх доод үлдэгдлээс бага байна.`
        );
      } else {
        props.navigation.navigate("LoanReceiveScreenP1", {
          product,
          user,
          userTotalLoanAmount,
        });
      }
    } else {
      Alert.alert(
        `Та гэрээ байгуулаагүй байна. ${
          parameters !== undefined &&
          parameters[0]?.official_mobile + " дугаарт залгана уу."
        }`
      );
    }
  };

  return (
    <View>
      <ScreenHeader
        title="Бүтээгдэхүүний дэлгэрэнгүй"
        navigation={props.navigation}
      />
      {product !== undefined ? (
        <ScrollView style={css.container}>
          <View style={css.items}>
            <MyLabel label="Бүтээгдэхүүний нэр" />
            <Text style={css.text}>{product.segment}</Text>
          </View>
          <View style={css.items}>
            <MyLabel label="Зээлийн хязгаар" />
            <Text style={css.text}>
              {thoud(product.min_amount) + product.currency} -{" "}
              {thoud(product.max_amount) + product.currency}
            </Text>
          </View>
          <View style={css.items}>
            <MyLabel label="Авах боломжтой зээлийн хэмжээ" />
            <Text style={css.text}>
              {thoud(product.loan_amount - userTotalLoanAmount) +
                product.currency}
            </Text>
          </View>
          <View style={css.items}>
            <MyLabel label="Зээлийн хүү" />
            <Text style={css.text}>{product.interest}%</Text>
          </View>
          {/* <View style={css.items}>
            <MyLabel label="Хугацаа хэтрэлтийн хүү" />
            <Text style={css.text}>{product.pentalty_rate}%</Text>
          </View> */}
          <View style={css.items}>
            <MyLabel label="Зээлийн шимтгэл" />
            {/* <Text style={css.text}>{product.fee}%</Text> */}
            <Text style={css.text}>100,000 төгрөг тутамд 5,000 төгрөг</Text>
          </View>
          {/* <View style={css.items}>
            <MyLabel label="Өргөдлийн хураамж" />
            <Text style={css.text}>
              {product.application_fee + product.currency}
            </Text>
          </View> */}
          <View style={css.items}>
            <MyLabel label="Үндсэн хугацаа" />
            <Text style={css.text}>{product.duration} хоног</Text>
          </View>
          <View style={css.items}>
            <MyLabel label="Сунгах боломжит хугацаа" />
            <Text style={css.text}>{product.extension} хоног</Text>
          </View>
          <View style={css.items}>
            <Button title="Зээл авах" onPress={handleLoanReceive} color={primary_color} />
          </View>
        </ScrollView>
      ) : (
        <Spinner />
      )}
    </View>
  );
};

export default ProductDetailScreen;

const css = StyleSheet.create({
  container: {
    marginHorizontal: 35,
    marginTop: 50,
  },
  text: {
    paddingLeft: 20,
    paddingTop: 10,
    color: "#666",
  },
  items: {
    marginBottom: 20,
  },
});
