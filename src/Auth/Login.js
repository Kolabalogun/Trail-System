import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import {
  sigEmailWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { useGlobalContext } from "../Function/Context";
import { auth } from "../Utils/Firebase";

import Header from "../Frontend/Components/Header";
import Loader from "../Frontend/Components/Loader";

const Login = ({ navigation }) => {
  const {
    notification,
    notificationF,
    currentUser,
    currentUserF,
    currentAdminF,
  } = useGlobalContext();

  const [Email, EmailF] = useState("");

  const [loader, loaderF] = useState("");

  const [password, passwordF] = useState("");

  const handleSignIn = () => {
    if (Email && password) {
      loaderF(true);
      signInWithEmailAndPassword(auth, Email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          currentAdminF(user);
          currentUserF(user);
          navigation.navigate("TabNavigations");
        })

        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          notificationF(errorMessage);
        });
      loaderF(false);
    } else {
      notificationF("All field must be filled");
    }
  };

  function navigateTogoBack(params) {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Header
            functions={navigateTogoBack}
            imgtype={require("../../assets/ba.png")}
            title="LOG IN"
          />

          <View style={{ flex: 1, justifyContent: "center" }}>
            <View style={styles.topSection}>
              <Text style={styles.topText}>Welcome! </Text>
              <Text style={styles.capText}>
                Enter your credentials to continue
              </Text>
            </View>
            <View style={styles.Inputs}>
              <View style={{ marginTop: 10 }}>
                <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                  Email
                </Text>
                <TextInput
                  value={Email}
                  name="name"
                  onChangeText={(e) => EmailF(e)}
                  placeholder="Enter your Email"
                  style={styles.Input}
                />
              </View>

              <View style={{ marginTop: 10 }}>
                <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                  Password
                </Text>
                <TextInput
                  value={password}
                  onChangeText={(e) => passwordF(e)}
                  placeholder="Enter your password"
                  secureTextEntry={true}
                  style={styles.Input}
                  name="password"
                />
              </View>
            </View>

            <Text style={{ color: "red", alignSelf: "center" }}>
              {notification}
            </Text>
            <TouchableOpacity style={styles.btn} onPress={handleSignIn}>
              <Text style={styles.btnTxt}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
    padding: 15,
    flex: 1,
  },
  topSection: {
    paddingTop: 20,
    // flex: 1,
  },
  topText: {
    fontWeight: "700",
    fontSize: 25,

    color: "rgb(7, 1, 57)",
    marginTop: 20,
  },
  capText: {
    color: "rgb(100, 100, 100)",
    marginTop: 10,
  },

  Inputs: {
    marginTop: 20,
    // flex: 1,

    justifyContent: "center",
  },
  Input: {
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 15,
    borderColor: "#aaa",
  },
  btn: {
    paddingVertical: 12,
    backgroundColor: "#008751",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: "100%",
    marginVertical: 30,
  },
  btnTxt: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  logo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logoTxt: {
    color: "#020E79",
    fontSize: 17,
    fontWeight: "500",
    paddingHorizontal: 5,
  },
});
