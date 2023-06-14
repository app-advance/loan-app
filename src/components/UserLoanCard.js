import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import thoud from "thousand_separator_number";
import { primary_color } from "../constants/colors";

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
            <Text style={{ color: "#999", fontSize: 13 }}>
              Зээлийн үлдэгдлийн хэмжээ
            </Text>
            <Text
              style={{
                color: "#333",
                fontSize: 40,
                fontWeight: "bold",
                marginVertical: 3,
              }}
            >
              {thoud(txnAmount)}
            </Text>
          </View>
          {loan.loan_status !== "gDhqtQGFYVmv5LR4C5R4" && (
            <View>
              <Text style={{ color: "#999", fontSize: 13 }}>Үлдсэн хоног</Text>
              {loanDate?.remain_day > 7 ? (
                <Text style={{ ...css.remainDay }}>{loanDate?.remain_day}</Text>
              ) : (
                <Text style={{ ...css.remainDay, color: "red" }}>
                  {loanDate?.remain_day}
                </Text>
              )}
            </View>
          )}
        </View>
        {loan.loan_status === "gDhqtQGFYVmv5LR4C5R4" ? (
          <View
            style={{
              height: 38,
              justifyContent: "center",
              alignItems: "center",
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
            <View>
              <Text>Зээл авсан огноо</Text>
              <Text>{loanDate?.start_date?.slice(0, 10)}</Text>
            </View>
            <View>
              <Text>Зээл дуусах хугацаа</Text>
              <Text>{loanDate?.end_date?.slice(0, 10)}</Text>
            </View>
          </View>
        )}
      </View>
      {loan.loan_status !== "gDhqtQGFYVmv5LR4C5R4" && (
        <View style={css.cardFooter}>
          <Text style={css.footerItemLeft} onPress={handleLoanPayment}>
            Зээл төлөх, хаах
          </Text>
          <Text style={css.footerItemRight} onPress={handleLoanStretchment}>
            Хугацаа сунгах
          </Text>
        </View>
      )}
    </View>
  );
};

export default UserLoanCard;

const css = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginBottom: 15,
    width: "100%",
    alignSelf: "center",
  },
  cardHeader: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardHeadFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  remainDay: {
    fontSize: 30,
    fontWeight: 600,
    textAlign: "right",
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
