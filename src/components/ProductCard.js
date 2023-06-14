import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import thoud from "thousand_separator_number";
import useProduct from "../hooks/useProduct";
import useLoan from "../hooks/useLoan";
import useParameter from "../hooks/useParameter";
import useLoanTxn from "../hooks/useLoanTxn";
import Spinner from "./Spinner";
import { primary_color } from "../constants/colors";

const ProductCard = (props) => {
  const productDetail = useProduct(props.userDetail);
  const loans = useLoan("GET", props.userDetail);
  const parameters = useParameter("SrWlRTEJbhSnzG5zsntZ");
  const [userTotalLoanAmount, setUserTotalLoanAmount] = useState(0);
  const loanTxns = useLoanTxn("GET", props.userDetail);

  const handleProductDetail = () => {
    if (productDetail !== undefined && productDetail) {
      props.navigation.navigate("ProductDetailScreen", {
        product: productDetail[0],
        user: props.userDetail,
        userTotalLoanAmount,
      });
    }
  };

  const handleLoanReceive = () => {
    if (props.userDetail.isAgreement) {
      if (
        productDetail[0]?.min_amount >
        productDetail[0]?.max_amount - userTotalLoanAmount
      ) {
        Alert.alert(`Таны зээлийн лимит хүрэлцэхгүй байна.`);
      } else {
        props.navigation.navigate("LoanReceiveScreenP1", {
          product: productDetail[0],
          user: props.userDetail,
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

    setUserTotalLoanAmount(calcAmount);
  }, [loans, loanTxns]);

  return (
    <View>
      {productDetail !== undefined && productDetail ? (
        <View>
          <View style={css.container}>
            <Text style={{ color: "#999", fontSize: 13 }}>
              {/* {productDetail[0]?.segment} бүтээгдэхүүн */}
              Боломжит зээлийн хэмжээ
            </Text>
            <Text
              style={{
                color: "#333",
                fontSize: 40,
                fontWeight: "bold",
                marginVertical: 3,
              }}
            >
              {thoud(productDetail[0]?.loan_amount - userTotalLoanAmount)}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text>Зээлийн хүү</Text>
                <Text>{productDetail[0]?.interest}%</Text>
              </View>
              {/* <View>
                <Text>Шимтгэл</Text>
                <Text>{productDetail[0]?.fee}%</Text>
              </View> */}
              <View>
                <Text>Хугацаа</Text>
                <Text>{productDetail[0]?.duration} хоног</Text>
              </View>
            </View>
          </View>
          <View style={css.cardFooter}>
            <Text style={css.footerItemLeft} onPress={handleLoanReceive}>
              Зээл авах
            </Text>
            <Text style={css.footerItemRight} onPress={handleProductDetail}>
              Дэлгэрэнгүй
            </Text>
          </View>
        </View>
      ) : (
        <Spinner />
      )}
    </View>
  );
};

export default ProductCard;

const css = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardFooter: {
    flexDirection: "row",
    height: 40,
  },
  footerItemLeft: {
    backgroundColor: primary_color,
    flex: 1,
    textAlign: "center",
    verticalAlign: "middle",
    color: "white",
    fontSize: 16,
    fontWeight: "semibold",
    borderBottomLeftRadius: 10,
  },
  footerItemRight: {
    borderColor: primary_color,
    borderWidth: 1,
    flex: 1,
    textAlign: "center",
    verticalAlign: "middle",
    color: primary_color,
    fontSize: 16,
    fontWeight: "semibold",
    borderBottomRightRadius: 10,
  },
});
