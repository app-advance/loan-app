import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import useProduct from "../hooks/useProduct";
import useLoan from "../hooks/useLoan";
import useParameter from "../hooks/useParameter";
import useLoanTxn from "../hooks/useLoanTxn";
import { primary_color } from "../constants/colors";

const GetLoan = (props) => {
  const productDetail = useProduct(props.userDetail);
  const loans = useLoan("GET", props.userDetail);
  const parameters = useParameter("SrWlRTEJbhSnzG5zsntZ");
  const loanTxns = useLoanTxn("GET", props.userDetail);

  const handleLoanReceive = () => {
    if (props.userDetail.isAgreement) {
      if (
        productDetail[0]?.min_amount >
        productDetail[0]?.max_amount - props.userTotalLoanAmount
      ) {
        Alert.alert(`Таны зээлийн лимит хүрэлцэхгүй байна.`);
      } else {
        props.navigation.navigate("LoanReceiveScreenP1", {
          product: productDetail[0],
          user: props.userDetail,
          userTotalLoanAmount: props.userTotalLoanAmount,
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

  useEffect(() => {
    let calcAmount = 0;

    if (loans !== undefined) {
      loans?.forEach((loan) => {
        const txns = loanTxns?.filter(
          (t) =>
            t.user === loan.user &&
            t.unique === loan.unique &&
            loan.loan_status === "6KkSosdjxnZkBJwYq1fy"
        );

        // Зээлийн гүйлгээний төрлөөр дүнг нэмж хасч байгаа
        if (txns?.length === 0) {
          // зээл сунгалтаас бусад зээлийг ялгах
          if (loan.prevUnique === undefined || loan.prevUnique === null) {
            calcAmount = calcAmount + loan.user_loan_amount;
          }
        } else if (txns?.length > 0) {
          txns?.forEach((txn) => {
            if (txn.txn_type === "Approve" || txn.txn_type === "Stretch") {
              calcAmount = calcAmount + txn.txn_amount;
            } else if (txn.txn_type === "Pay" || txn.txn_type === "Close") {
              calcAmount = calcAmount - txn.txn_amount;
            }
          });
        }
      });
    }

    props.setUserTotalLoanAmount(calcAmount);
  }, [loans, loanTxns]);

  return (
    <TouchableOpacity style={css.container} onPress={handleLoanReceive}>
      <Text style={css.text}>{props.title}</Text>
      <View style={css.logo}>
        <Image
          source={require("../../assets/blue-logo.png")}
          style={css.image}
        />
      </View>
    </TouchableOpacity>
  );
};

export default GetLoan;

const css = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 15,
    backgroundColor: "white",
    borderRadius: 50,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  logo: {
    borderColor: primary_color,
    borderWidth: 1,
    marginRight: -4,
    padding: 15,
    borderRadius: 50,
  },
  image: {
    width: 50,
    height: 50,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    color: primary_color,
    marginLeft: 25,
  },
});
