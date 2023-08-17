import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Clipboard,
} from "react-native";
import React, { useState } from "react";
import thoud from "thousand_separator_number";
import { FontAwesome5 } from "@expo/vector-icons";
import ScreenHeader from "../components/ScreenHeader";
import MyLabel from "../components/MyLabel";
import useParameter from "../hooks/useParameter";
import useLoan from "../hooks/useLoan";
import useProduct from "../hooks/useProduct";
import useUniqueID from "../hooks/useUniqueID";
import Spinner from "../components/Spinner";
import MyTouchableButton from "../components/MyTouchableButton";
import { primary_color } from "../constants/colors";

const LoanStretchScreen = (props) => {
  const loan = props.route.params.loan;
  const user = props.route.params.user;
  const txnAmount = props.route.params.txnAmount;
  const parameters = useParameter("UzZeksoPpdNIkqh6KMCB");
  const productDetail = useProduct(user);
  const [loading, setLoading] = useState(false);
  const uniqueID = useUniqueID();

  const sendLoanStretchRequest = () => {
    setLoading(true);
    useLoan("STRETCH", {
      loan,
      user,
      uniqueID,
      txnAmount,
      productDetail: productDetail[0],
    });

    setLoading(false);
    props.navigation.navigate("HomeScreen");
  };

  const copyToClipboard = (value) => {
    // console.log(value);
    Clipboard.setString(value.toString());
  };

  return (
    <View>
      <View>
        <ScreenHeader
          title="Зээл сунгах хүсэлт илгээх"
          navigation={props.navigation}
        />
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
          төлснөөр таны зээл 30 хоног сунгагдана.
        </Text>
        <View style={css.items}>
          <MyLabel label="Зээлийн хэмжээ" />
          <Text style={css.text}>{thoud(txnAmount)} төгрөг</Text>
        </View>
        <View style={css.items}>
          <MyLabel label="Шимтгэл | Гүйлгээний дүн" />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={css.text}>
              {productDetail !== undefined &&
                thoud((txnAmount * productDetail[0]?.fee) / 100)}{" "}
              төгрөг
            </Text>
            <View>
              <FontAwesome5
                name="copy"
                size={24}
                color={primary_color}
                onPress={() =>
                  copyToClipboard((txnAmount * productDetail[0]?.fee) / 100)
                }
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
              {parameters !== undefined && parameters[0].bank_account}
            </Text>
            <View>
              <FontAwesome5
                name="copy"
                size={24}
                color={primary_color}
                onPress={() =>
                  copyToClipboard(
                    parameters !== undefined && parameters[0].bank_account
                  )
                }
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
        <View style={{ marginTop: 25 }}>
          <Text style={{ textAlign: "center" }}>
            Та зөвхөн дээрх дугаарыг{" "}
            <Text style={{ color: "red", fontWeight: "700" }}>
              гүйлгээний утга
            </Text>{" "}
            дээрээ бичнэ үү!
          </Text>
        </View>
        <View style={{ ...css.items, marginTop: 50 }}>
          {loading ? (
            <Spinner />
          ) : (
            <MyTouchableButton
              onPress={sendLoanStretchRequest}
              title="Хүсэлт илгээх"
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default LoanStretchScreen;

const css = StyleSheet.create({
  container: {
    marginHorizontal: 35,
    marginTop: 50,
  },
  text: {
    fontSize: 20,
    shadowColor: "gray",
    color: primary_color,
  },
  items: {
    marginBottom: 10,
  },
});
