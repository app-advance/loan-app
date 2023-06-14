import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  and,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { app, database } from "../../firebase";
import { Alert } from "react-native";

const useLoan = (method, data) => {
  if (method === "GET") {
    const [loansDetail, setLoansDetail] = useState();

    useEffect(() => {
      const collectionRef = collection(database, "loans");
      const loanQuery = query(
        collectionRef,
        and(
          where("user", "==", data.id),
          where("loan_status", "in", [
            "6KkSosdjxnZkBJwYq1fy",
            "gDhqtQGFYVmv5LR4C5R4",
            "rzGj9i6KYc2G96lYTsJo",
          ])
        )
      );
      onSnapshot(loanQuery, (res) => {
        setLoansDetail(
          res?.docs?.map((data) => {
            return { ...data?.data(), id: data.id };
          })
        );
      });
    }, []);

    return loansDetail;
  } else if (method === "POST") {
    const collectionRef = collection(database, "loans");
    const currentDate = new Date(Date.now());

    addDoc(collectionRef, {
      user: data.user.id,
      email: data.user.email,
      lastname: data.user.lastname,
      firstname: data.user.firstname,
      mobile: data.user.mobile,
      register: data.user.register,
      segment: data.product.id,
      loan_amount: Number(data.product.loan_amount),
      user_loan_amount: Number(data.loan.loan),
      created_datetime: currentDate,
      user_loan_fee: Number(data.loan.fee),
      loan_status: "gDhqtQGFYVmv5LR4C5R4",
      unique: data.uniqueID,
    })
      .then((result) => {
        Alert.alert("Зээлийн хүсэлт амжилттай илгээгдлээ. Танд амжилт хүсье.");
        return true;
      })
      .catch((error) => {
        Alert.alert("Зээлийн хүсэлт илгээхэд алдаа гарлаа. Дахин оролдоно уу.");
        return false;
      });
  } else if (method === "STRETCH") {
    const collectionRef = collection(database, "loans");
    const currentDate = new Date(Date.now());

    addDoc(collectionRef, {
      user: data.user.id,
      email: data.user.email,
      lastname: data.user.lastname,
      firstname: data.user.firstname,
      mobile: data.user.mobile,
      register: data.user.register,
      segment: data.loan.segment,
      loan_amount: Number(data.loan.loan_amount),
      user_loan_amount: Number(data.txnAmount),
      created_datetime: currentDate,
      user_loan_fee: Number((data.txnAmount * data.productDetail.fee) / 100),
      loan_status: "gDhqtQGFYVmv5LR4C5R4",
      unique: data.uniqueID,
      prevUnique: data.loan.unique,
      polaris_registration: true,
    })
      .then((result) => {
        Alert.alert(
          "Зээлийн хугацаа сунгах хүсэлт амжилттай илгээгдлээ. Танд амжилт хүсье."
        );
        return true;
      })
      .catch((error) => {
        Alert.alert(
          "Зээлийн хугацаа сунгах хүсэлт илгээхэд алдаа гарлаа. Дахин оролдоно уу."
        );
        return false;
      });
  }
};

export default useLoan;
