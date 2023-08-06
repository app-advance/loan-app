import React, { useState } from "react";
import { View, StyleSheet, Alert, Text, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getAuth, signOut } from "firebase/auth";
import useUser from "../hooks/useUser";
import HamburgerMenu from "../components/HamburgerMenu";
import NavBar from "../components/NavBar";
// import BusinessTitle from "../components/BusinessTitle";
import ProductCard from "../components/ProductCard";
import UserLoanList from "../components/UserLoanList";
import GetLoan from "../components/GetLoan";
import { primary_color, secondary_color } from "../constants/colors";

export default HomeScreen = (props) => {
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const [userTotalLoanAmount, setUserTotalLoanAmount] = useState(0);
  const userDetail = useUser();

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then((result) => {
        // console.log(result);
        Alert.alert("Системээс гарлаа. Амжилт хүсье.");
      })
      .then(() => {
        setShowHamburgerMenu(false);
        props.navigation.replace("LoginScreen");
      })
      .catch((error) => {
        // console.log(error);
        Alert.alert("Системээс гарахад алдаа гарлаа.");
      });
  };

  const handleScreen = (screen) => {
    setShowHamburgerMenu(false);

    if (screen === "NotificationScreen") {
      props.navigation.navigate(screen, {
        user: userDetail[0],
      });
    } else {
      props.navigation.navigate(screen);
    }
  };

  return (
    <LinearGradient
      colors={[primary_color, secondary_color]}
      style={{ height: "100%" }}
    >
      <View style={css.container}>
        <NavBar
          showHamburgerMenu={showHamburgerMenu}
          setShowHamburgerMenu={setShowHamburgerMenu}
          userDetail={userDetail}
        />
        <View
          style={{
            marginTop: 35,
            width: "100%",
            height: "93%",
            position: "absolute",
            zIndex: 1,
          }}
        >
          {/* <BusinessTitle title="Таны зээлийн эрх" /> */}
          {userDetail !== undefined && userDetail.length > 0 && (
            <ProductCard
              userDetail={userDetail[0]}
              navigation={props.navigation}
              userTotalLoanAmount={userTotalLoanAmount}
            />
          )}
          {/* <BusinessTitle title="Таны зээл" /> */}
          {userDetail !== undefined && userDetail.length > 0 && (
            <GetLoan
              userDetail={userDetail[0]}
              navigation={props.navigation}
              setUserTotalLoanAmount={setUserTotalLoanAmount}
              userTotalLoanAmount={userTotalLoanAmount}
              title="Зээл авах"
            />
          )}
          {userDetail !== undefined && userDetail.length > 0 && (
            <ScrollView style={css.loanlist} scrollEnabled={true}>
              <Text style={css.loanlistline}>&nbsp;</Text>
              <Text style={css.loanTitle}>Таны зээл</Text>
              <UserLoanList
                user={userDetail[0]}
                navigation={props.navigation}
              />
            </ScrollView>
          )}
        </View>
        {showHamburgerMenu && (
          <HamburgerMenu
            handleSignOut={handleSignOut}
            handleScreen={handleScreen}
          />
        )}
      </View>
    </LinearGradient>
  );
};

const css = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
  },
  loanlist: {
    backgroundColor: "white",
    height: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: -16,
  },
  loanlistline: {
    marginTop: 10,
    width: "40%",
    alignSelf: "center",
    height: 5,
    borderRadius: 50,
    backgroundColor: primary_color,
  },
  loanTitle: {
    color: primary_color,
    marginLeft: 30,
    marginTop: 20,
    fontSize: 16,
    fontWeight: 700,
  },
});
