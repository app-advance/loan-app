import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { app, database } from "../../firebase";

const useParameter = (id) => {
  const [parameterValue, setParameterValue] = useState();

  useEffect(() => {
    const collectionRef = collection(database, "parameters");
    const parameterQuery = query(collectionRef, where("id", "==", id));

    onSnapshot(parameterQuery, (res) => {
      setParameterValue(
        res?.docs?.map((data) => {
          return { ...data?.data(), id: data.id };
        })
      );
    });
  }, []);

  return parameterValue;
};

export default useParameter;
