import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import ScreenHeader from "../components/ScreenHeader";
import useLoanTxn from "../hooks/useLoanTxn";
import thoud from "thousand_separator_number";
import { primary_color } from "../constants/colors";

const NotificationScreen = (props) => {
  const user = props.route.params.user;
  const transactions = useLoanTxn("GET", user);
  const screenHeight = Dimensions.get("screen").height * 0.75;

  return (
    <View>
      <View>
        <ScreenHeader title="Гүйлгээний түүх" navigation={props.navigation} />
      </View>
      <ScrollView
        style={{
          marginTop: 25,
          alignSelf: "center",
          width: "100%",
          paddingHorizontal: 20,
          height: screenHeight,
        }}
      >
        {transactions !== undefined ? (
          transactions?.map((t, index) => {
            let userDateTime = new Date(
              t.txn_date + 8 * 60 * 60 * 1000
            ).toJSON();

            return (
              <View
                style={{
                  width: "100%",
                  backgroundColor: "white",
                  borderRadius: 10,
                  padding: 10,
                  marginBottom: 10,
                }}
                key={index}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontWeight: 700, color: "#999" }}>
                    {userDateTime &&
                      userDateTime.slice(0, 10) +
                        " " +
                        userDateTime.slice(11, 19)}
                  </Text>
                  <Text style={{ fontWeight: 700, color: "#999" }}>
                    {t.txn_type === "Approve"
                      ? "Зээл олголт"
                      : t.txn_type === "Stretch"
                      ? "Зээл сунгалт"
                      : t.txn_type === "Pay"
                      ? "Хэсэгчилсэн төлөлт"
                      : t.txn_type === "Close"
                      ? "Зээл хаалт"
                      : null}
                  </Text>
                </View>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 30,
                    fontWeight: 700,
                    marginVertical: 7,
                    color: primary_color,
                  }}
                >
                  {thoud(t.txn_amount)} MNT
                </Text>
                <Text style={{ textAlign: "center", color: primary_color }}>
                  Зээлийн дугаар:&nbsp;&nbsp;&nbsp;
                  <Text style={{ fontWeight: 700 }}>{t.unique}</Text>
                </Text>
              </View>
            );
          })
        ) : (
          <Text>Гүйлгээ олдсонгүй</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({});
