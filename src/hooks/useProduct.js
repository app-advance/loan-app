import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { app, database } from "../../firebase";

const useProduct = (value) => {
  const [productDetail, setProductDetail] = useState();

  useEffect(() => {
    if (value?.segment !== undefined && value?.segment !== null) {
      const collectionRef = collection(database, "products");
      const productQuery = query(
        collectionRef,
        where("id", "==", value?.segment)
      );
      onSnapshot(productQuery, (res) => {
        setProductDetail(
          res?.docs?.map((data) => {
            return { ...data?.data(), id: data.id };
          })
        );
      });
    } else {
      return false;
    }
  }, []);

  return productDetail;
};

export default useProduct;
