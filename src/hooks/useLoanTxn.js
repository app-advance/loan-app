import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { app, database } from "../../firebase";

const useLoanTxn = (method, data) => {
  const [txnsDetail, setTxnsDetail] = useState();

  if (method === "GET") {
    useEffect(() => {
      const collectionRef = collection(database, "loantxns");
      const txnsQuery = query(collectionRef, where("user", "==", data.id));
      onSnapshot(txnsQuery, (res) => {
        setTxnsDetail(
          res?.docs?.map((data) => {
            return { ...data?.data(), id: data.id };
          })
        );
      });
    }, []);

    return txnsDetail;
  }
};

export default useLoanTxn;
