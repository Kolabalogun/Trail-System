import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../Function/Context";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import Loader from "../Components/Loader";

import Header from "../Components/Header";
import Button from "../Components/Button";

const UserProfile = () => {
  const { handleLogout, UsersFromDB, currentAdmin, loader, loaderF } =
    useGlobalContext();

  const UserProfile = UsersFromDB.map((user, index) => {
    if (user?.email.toLowerCase() === currentAdmin?.email) {
      return (
        <View key={index} showsVerticalScrollIndicator={false}>
          <View style={styles.topSection}>
            <Text style={styles.topText}>Your Profile</Text>
          </View>

          <KeyboardAvoidingView style={[styles.Inputs, { marginTop: 10 }]}>
            <TouchableOpacity
              style={{
                height: 100,
                width: 100,

                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
                marginVertical: 10,
                borderRadius: 120,
              }}
            >
              <Image
                source={{ uri: user.Userimg }}
                style={{
                  height: "100%",
                  width: "100%",

                  borderRadius: 100,
                }}
              />
            </TouchableOpacity>

            <View
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 30,
              }}
            >
              <View
                style={{
                  display: "flex",
                  backgroundColor: "#F5F5F5",
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{ fontSize: 15, fontWeight: "400", paddingBottom: 10 }}
                >
                  Full Name
                </Text>
                <Text style={{ fontSize: 15, fontWeight: "400" }}>
                  {user?.fullName}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  backgroundColor: "#F5F5F5",
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{ fontSize: 15, fontWeight: "400", paddingBottom: 10 }}
                >
                  Ministry
                </Text>
                <Text style={{ fontSize: 15, fontWeight: "400" }}>
                  {user?.minitries}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  backgroundColor: "#F5F5F5",
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{ fontSize: 15, fontWeight: "400", paddingBottom: 10 }}
                >
                  Department
                </Text>
                <Text style={{ fontSize: 15, fontWeight: "400" }}>
                  {user?.department}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  backgroundColor: "#F5F5F5",
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{ fontSize: 15, fontWeight: "400", paddingBottom: 10 }}
                >
                  Role
                </Text>
                <Text style={{ fontSize: 15, fontWeight: "400" }}>
                  {user?.Role}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  backgroundColor: "#F5F5F5",
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{ fontSize: 15, fontWeight: "400", paddingBottom: 10 }}
                >
                  Level
                </Text>
                <Text style={{ fontSize: 15, fontWeight: "400" }}>
                  {user?.LevelofAccessState}
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      );
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Header />

          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            {UserProfile}
            <TouchableOpacity>
              <Button
                handleSubmit={handleLogout}
                txt={"Log Out"}
                color={"red"}
              />
            </TouchableOpacity>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "white",
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
    padding: 15,
  },

  topSection: {
    // paddingTop: 15,
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
    flex: 1,
    justifyContent: "center",
  },
  Input: {
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 15,
    borderColor: "#aaa",
  },
  InputTextArea: {
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 15,
    borderColor: "#aaa",

    // height: 170,
    alignItems: "baseline",
    justifyContent: "flex-start",

    textAlignVertical: "top",
  },
  btn: {
    paddingVertical: 12,
    backgroundColor: "rgb(20, 119, 251)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,

    width: "100%",
    marginVertical: 20,
  },
  btnTxt: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
