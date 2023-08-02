import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import thoud from "thousand_separator_number";
import { primary_color, secondary_color } from "../constants/colors";

const UserLoanCard = (props) => {
  const loan = props.loan;
  const loans = props.loans;
  const user = props.user;
  const loanTxns = props.loanTxns;
  const [txnAmount, setTxnAmount] = useState(0);
  const [loanDate, setLoanDate] = useState({});

  const handleLoanPayment = () => {
    props.navigation.navigate("LoanPaymentSceen", {
      loan,
      user,
      txnAmount,
    });
  };

  const handleLoanStretchment = () => {
    const isStretch = loans?.filter(
      (l) =>
        l.prevUnique === loan.unique && l.loan_status === "gDhqtQGFYVmv5LR4C5R4"
    );

    if (isStretch.length > 0) {
      Alert.alert("Энэ зээлийг сунгах хүсэлт илгээгдсэн байна.");
    } else {
      props.navigation.navigate("LoanStretchScreen", {
        loan,
        user,
        txnAmount,
      });
    }
  };

  useEffect(() => {
    const txns = loanTxns?.filter(
      (t) =>
        t.user === loan.user &&
        t.unique === loan.unique &&
        loan.loan_status === "6KkSosdjxnZkBJwYq1fy"
    );

    let calcAmount = 0;
    if (txns?.length === 0) {
      calcAmount = loan.user_loan_amount;
    } else if (txns?.length > 0) {
      txns?.forEach((txn) => {
        if (txn.txn_type === "Approve" || txn.txn_type === "Stretch") {
          calcAmount = calcAmount + txn.txn_amount;
        } else if (txn.txn_type === "Pay" || txn.txn_type === "Close") {
          calcAmount = calcAmount - txn.txn_amount;
        }
      });
    }

    const userStartDateTime = new Date(
      loan.loan_start_datetime + 8 * 60 * 60 * 1000
    ).toJSON();

    const userEndDateTime = new Date(
      loan.loan_end_date + 8 * 60 * 60 * 1000
    ).toJSON();

    const userToday = new Date(Date.now());
    const userDifferenceDateTime = new Date(
      loan.loan_end_date - userToday
    ).getDate();

    setLoanDate({
      start_date: userStartDateTime,
      end_date: userEndDateTime,
      remain_day: userDifferenceDateTime,
    });

    setTxnAmount(calcAmount);
  }, [loan, loanTxns]);

  return (
    <View style={css.container}>
      <View style={css.cardHeader}>
        <View style={css.cardHeadFlex}>
          <View>
            <Text style={css.subtitle}>Зээлийн үлдэгдэл</Text>
            <Text
              style={{
                color: primary_color,
                fontSize: 40,
                fontWeight: "bold",
                // marginVertical: 3,
              }}
            >
              {thoud(txnAmount)}
            </Text>
          </View>
          {loan.loan_status !== "gDhqtQGFYVmv5LR4C5R4" && (
            <View>
              <Text style={css.subtitle}>Үлдсэн хоног</Text>
              <Text
                style={{
                  ...css.remainDay,
                  color: "#555",
                  fontWeight: 700,
                }}
              >
                {loanDate?.remain_day}
              </Text>
            </View>
          )}
        </View>
        {loan.loan_status === "gDhqtQGFYVmv5LR4C5R4" ? (
          <View
            style={{
              height: 38,
              justifyContent: "center",
              alignItems: "center",
              // paddingBottom: 16,
            }}
          >
            <Text>Түр хүлээнэ үү.</Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* <View>
              <Text>Зээл авсан огноо</Text>
              <Text>{loanDate?.start_date?.slice(0, 10)}</Text>
            </View> */}
            <View style={{ marginVertical: 10 }}>
              <Text style={css.subtitle}>Зээл дуусах хугацаа</Text>
              <Text style={{ fontSize: 20, color: "#999" }}>
                {loanDate?.end_date?.slice(0, 10)}
              </Text>
            </View>
          </View>
        )}
      </View>
      {loan.loan_status !== "gDhqtQGFYVmv5LR4C5R4" && (
        <View style={css.cardFooter}>
          <Text style={css.footerItemLeft} onPress={handleLoanPayment}>
            Зээл төлөх
          </Text>
          {loanDate?.remain_day > 7 ? (
            <Text
              style={{ ...css.footerItemRight, backgroundColor: "orange" }}
              onPress={handleLoanStretchment}
            >
              Хугацаа сунгах
            </Text>
          ) : (
            <Text
              style={{
                ...css.footerItemRight,
                backgroundColor: secondary_color,
              }}
              onPress={handleLoanStretchment}
            >
              Хугацаа сунгах
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

export default UserLoanCard;

const css = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 20,
    width: "100%",
    alignSelf: "center",
  },
  cardHeader: {
    paddingHorizontal: 30,
    // paddingVertical: 10,
  },
  cardHeadFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subtitle: {
    color: "#999",
    fontSize: 14,
    fontWeight: 700,
  },
  remainDay: {
    fontSize: 30,
    fontWeight: 600,
    textAlign: "right",
  },
  cardFooter: {
    marginHorizontal: 10,
    flexDirection: "row",
    height: 40,
    justifyContent: "flex-end",
  },
  footerItemLeft: {
    textAlign: "center",
    verticalAlign: "middle",
    color: "#666",
    fontSize: 16,
    fontWeight: 700,
    paddingHorizontal: 10,
  },
  footerItemRight: {
    textAlign: "center",
    verticalAlign: "middle",
    fontSize: 16,
    color: "white",
    fontWeight: 700,
    paddingHorizontal: 15,
    borderRadius: 50,
  },
});
