import React, { useState } from "react";
import { View, StyleSheet, Alert, Text } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import useUser from "../hooks/useUser";
import HamburgerMenu from "../components/HamburgerMenu";
import NavBar from "../components/NavBar";
import BusinessTitle from "../components/BusinessTitle";
import ProductCard from "../components/ProductCard";
import UserLoanList from "../components/UserLoanList";

export default HomeScreen = (props) => {
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
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
        <BusinessTitle title="Таны зээлийн эрх" />
        {userDetail !== undefined && userDetail.length > 0 && (
          <ProductCard
            userDetail={userDetail[0]}
            navigation={props.navigation}
          />
        )}
        <BusinessTitle title="Таны зээл" />
        {userDetail !== undefined && userDetail.length > 0 && (
          <UserLoanList user={userDetail[0]} navigation={props.navigation} />
        )}
      </View>
      {showHamburgerMenu && (
        <HamburgerMenu
          handleSignOut={handleSignOut}
          handleScreen={handleScreen}
        />
      )}
    </View>
  );
};

const css = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 30,
    marginBottom: 10,
    flex: 1,
  },
});
