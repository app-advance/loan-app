import emailjs from "@emailjs/browser";
import { Alert } from "react-native";

export const useEmailSend = async (data, type) => {
  let template;
  if (type === "payment") {
    template = "template_ssjh3v9";
  } else if (type === "loan") {
    template = "template_6dumzfs";
  }

  await emailjs
    .send("service_nwm04ln", template, data, "KtdJVHKY3jD7byQiO")
    .then((result) => {
      if (type === "payment") {
        Alert.alert("Төлөлт хийгдсэн мэдэгдлийг илгээлээ.");
      }
    })
    .catch((error) => {
      Alert.alert("Мэдэгдлийг илгээхэд алдаа гарлаа. Дахин оролдоно уу.");
    });
};
