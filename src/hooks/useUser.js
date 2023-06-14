import { collection, query, where, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import { app, database } from "../../firebase";

const useUser = () => {
  const [userDetail, setUserDetail] = useState();
  const user = getAuth();

  useEffect(() => {
    const collectionRef = collection(database, "users");
    const emailQuery = query(
      collectionRef,
      where("email", "==", user?.currentUser?.email)
    );
    onSnapshot(emailQuery, (res) => {
      setUserDetail(
        res?.docs?.map((data) => {
          return { ...data?.data(), id: data.id };
        })
      );
    });
  }, []);

  return userDetail;
};

export default useUser;
