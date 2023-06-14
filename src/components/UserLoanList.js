import { StyleSheet, View, FlatList, ScrollView } from "react-native";
import React from "react";
import UserLoanCard from "./UserLoanCard";
import useLoan from "../hooks/useLoan";
import Spinner from "./Spinner";
import useLoanTxn from "../hooks/useLoanTxn";
import { primary_color } from "../constants/colors";

const UserLoanList = (props) => {
  const loans = useLoan("GET", props.user);
  const loanTxns = useLoanTxn("GET", props.user);

  return (
    <ScrollView>
      {loans !== undefined && loanTxns !== undefined ? (
        // <FlatList
        //   data={loans}
        //   keyExtractor={(loan) => loan.unique}
        //   showsHorizontalScrollIndicator={false}
        //   pagingEnabled={true}
        //   renderItem={({ item, index }) => {
        //     return (
        //       <UserLoanCard
        //         user={props.user}
        //         loan={item}
        //         navigation={props.navigation}
        //         key={index}
        //       />
        //     );
        //   }}
        // />
        loans?.map((loan, index) => {
          return (
            <UserLoanCard
              user={props.user}
              loan={loan}
              loans={loans}
              navigation={props.navigation}
              key={index}
              loanTxns={loanTxns}
            />
          );
        })
      ) : (
        <Spinner />
      )}
    </ScrollView>
  );
};

export default UserLoanList;

const css = StyleSheet.create({
  inActiveCircle: {
    height: 10,
    width: 10,
    backgroundColor: "#bbb",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 5,
  },
  activeCircle: {
    height: 13,
    width: 13,
    backgroundColor: primary_color,
    alignSelf: "center",
    borderRadius: 13,
    marginHorizontal: 5,
    marginTop: 10,
  },
});
