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
import { useGlobalContext } from "../../../Function/Context";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import Loader from "../../Components/Loader";

import {
  pickImage,
  uploadImgetoFireStorage,
} from "../../../Utils/DisplayImage";
import { db } from "../../../Utils/Firebase";

import Header from "../../Components/Header";
import SelectDropdown from "react-native-select-dropdown";

const SendMemo = () => {
  const {
    notification,
    notificationF,
    navigation,
    currentUser,
    loader,
    loaderF,
    Ministries,
    typeOfMemo,
    Departments,
    currentAdmin,
    UsersFromDB,
    CurrentUserfromDb,
    getUsersFromDB,
  } = useGlobalContext();

  useEffect(() => {
    getUsersFromDB();
  }, []);

  const [DateofMemo, DateofMemoF] = useState("");

  const [Description, DescriptionF] = useState("");
  const [recipientMinistry, recipientMinistryF] = useState("");
  const [recipientDepartment, recipientDepartmentF] = useState("");
  const [typeofMemoState, typeofMemoStateF] = useState("");
  const [MemoTitle, MemoTitleF] = useState("");
  const [selectedImage, selectedImageF] = useState(null);

  const [dateId, setdateId] = useState("");

  const [senderProfile, senderProfileF] = useState(null);
  const [MemoConfidentialLevel, MemoConfidentialLevelF] = useState("");
  const confidentialLevel = ["1", "2", "3"];

  // to set timeId
  useEffect(() => {
    const dateId = new Date().getTime();
    const realTime = new Date().toLocaleTimeString();
    const realDate = new Date().toDateString();

    DateofMemoF(`${realDate} ${realTime}`);

    setdateId(dateId);
  }, []);

  useEffect(() => {
    UsersFromDB.map((user) => {
      if (user?.email.toLowerCase() === currentAdmin?.email) {
        senderProfileF(user);
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      DateofMemo &&
      MemoTitle &&
      Description &&
      recipientMinistry &&
      recipientDepartment &&
      MemoConfidentialLevel
    ) {
      let image;

      if (selectedImage) {
        const { url } = await uploadImgetoFireStorage(
          selectedImage,
          `images/${dateId}`,
          "profilePicture"
        );

        image = url;
      }

      try {
        await addDoc(collection(db, "Memo"), {
          dateofMemo: DateofMemo,
          description: Description,

          img: selectedImage ? url : null,
          memoTitle: MemoTitle,
          recipientMinistry: recipientMinistry,
          recipientDepartment: recipientDepartment,
          senderMinistry: senderProfile?.minitries,
          senderDepartment: senderProfile?.department,
          senderEmail: currentAdmin?.email,
          typeOfMemo: typeofMemoState,
          timestamp: serverTimestamp(),
          author: currentAdmin?.email,
          userId: currentAdmin?.uid,
          dateId: dateId,
          MemoConfidentialLevel: MemoConfidentialLevel,

          Approvals: [],
        });
        // loaderF(false);
        notificationF("Memo Sent");
      } catch (error) {
        console.log(error);
        notificationF(error);
      }
    } else {
      return notificationF("All fields must be filled");
    }
    // navigation.navigate("Home");
  };

  const Imagepicker = async () => {
    let result = await pickImage();
    if (!result.canceled) {
      selectedImageF(result.uri);
    }
  };

  function navigateTogoBack(params) {
    navigation.goBack();
  }

  const [secondPage, secondPageF] = useState(false);

  return (
    <SafeAreaView style={[styles.container, { paddingTop: 10 }]}>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Header
            functions={navigateTogoBack}
            imgtype={require("../../../../assets/ba.png")}
            title={secondPage && "Fill in the details"}
          />

          {!secondPage ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={[styles.topSection, { alignItems: "center" }]}>
                <Text style={styles.topText}>Create a Document</Text>
                <Text style={styles.capText}>
                  Fill in your details to create a document
                </Text>
              </View>

              <KeyboardAvoidingView style={styles.Inputs}>
                <TouchableOpacity
                  onPress={Imagepicker}
                  style={{
                    height: 200,
                    width: 100,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "center",
                    marginVertical: 50,
                    borderRadius: 120,
                    flex: 1,
                    marginBottom: 150,
                  }}
                >
                  {!selectedImage ? (
                    <View
                      style={{
                        alignSelf: "center",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        source={require("../../../../assets/ph.png")}
                        style={{
                          height: 300,
                          width: 300,
                          marginTop: 30,
                        }}
                      />
                    </View>
                  ) : (
                    <Image
                      source={{ uri: selectedImage }}
                      style={{
                        height: 300,
                        width: 300,
                        marginTop: 30,
                      }}
                    />
                  )}
                </TouchableOpacity>
              </KeyboardAvoidingView>
              <Text style={{ color: "red", alignSelf: "center", padding: 3 }}>
                {notification}
              </Text>

              <View style={{ flex: 9, display: "flex" }}>
                <Text
                  style={{
                    width: "100%",
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: 18,
                    paddingHorizontal: 20,
                    marginBottom: 10,
                  }}
                >
                  Scan your document or attach a document
                </Text>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => secondPageF(true)}
                >
                  <Text style={styles.btnTxt}>Next</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          ) : (
            <>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View showsVerticalScrollIndicator={false}>
                  {/* <View style={[styles.topSection, { alignItems: "center" }]}>
                    <Text style={styles.capText}>Fill in your details</Text>
                  </View> */}

                  <KeyboardAvoidingView style={styles.Inputs}>
                    <View style={{ marginTop: 0 }}>
                      <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                        Date of Incident
                      </Text>
                      <TextInput
                        value={DateofMemo}
                        // onChangeText={(e) => DateofMemoF(e)}
                        placeholder="Enter the Date of Incident"
                        readonly="true"
                        style={styles.Input}
                      />
                    </View>

                    <View style={{ marginTop: 10 }}>
                      <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                        Select Confidential Level
                      </Text>

                      <SelectDropdown
                        data={confidentialLevel}
                        defaultButtonText="Select Memo Access"
                        buttonStyle={styles.dropdownStyle}
                        buttonTextStyle={styles.dropdownStyleTxt}
                        onSelect={(selectedItem, index) => {
                          MemoConfidentialLevelF(selectedItem);
                        }}
                      />
                    </View>
                    <View style={{ marginTop: 10 }}>
                      <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                        Select Recipient Ministry
                      </Text>

                      <SelectDropdown
                        data={Ministries}
                        defaultButtonText="Please select Ministry"
                        buttonStyle={styles.dropdownStyle}
                        buttonTextStyle={styles.dropdownStyleTxt}
                        onSelect={(selectedItem, index) => {
                          recipientMinistryF(selectedItem);
                        }}
                      />
                    </View>

                    <View style={{ marginTop: 10 }}>
                      <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                        Select Recipient Department
                      </Text>

                      <SelectDropdown
                        data={Departments}
                        defaultButtonText="Please select Ministry"
                        buttonStyle={styles.dropdownStyle}
                        buttonTextStyle={styles.dropdownStyleTxt}
                        onSelect={(selectedItem, index) => {
                          recipientDepartmentF(selectedItem);
                        }}
                      />
                    </View>
                    <View style={{ marginTop: 10 }}>
                      <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                        Type of Memo
                      </Text>

                      <SelectDropdown
                        data={typeOfMemo}
                        defaultButtonText="Please select Ministry"
                        buttonStyle={styles.dropdownStyle}
                        buttonTextStyle={styles.dropdownStyleTxt}
                        onSelect={(selectedItem, index) => {
                          typeofMemoStateF(selectedItem);
                        }}
                      />
                    </View>

                    <View style={{ marginTop: 20 }}>
                      <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                        Subject
                      </Text>
                      <TextInput
                        value={MemoTitle}
                        onChangeText={(e) => MemoTitleF(e)}
                        placeholder="Enter the Subject of the incident"
                        style={styles.Input}
                      />
                    </View>
                    <View style={{ marginTop: 20 }}>
                      <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                        Description
                      </Text>

                      <TextInput
                        value={Description}
                        onChangeText={(e) => DescriptionF(e)}
                        placeholder="Please enter detailed description of the incident"
                        multiline
                        style={styles.InputTextArea}
                        numberOfLines={10}
                      />
                    </View>
                  </KeyboardAvoidingView>
                  <Text
                    style={{ color: "red", alignSelf: "center", padding: 3 }}
                  >
                    {notification}
                  </Text>
                  <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                    <Text style={styles.btnTxt}>Send Memo</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default SendMemo;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
    paddingTop: 15,
    paddingHorizontal: 15,
  },

  topSection: {
    paddingTop: 15,
  },
  topText: {
    fontWeight: "700",
    fontSize: 25,

    marginTop: 20,
  },
  capText: {
    // color: "rgb(100, 100, 100)",
    marginTop: 10,
    fontSize: 18,
    fontWeight: "500",
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

    alignItems: "baseline",
    justifyContent: "flex-start",

    textAlignVertical: "top",
  },
  btn: {
    paddingVertical: 12,
    backgroundColor: "#008751",
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

  // $$$$

  dropdownStyle: {
    width: "100%",
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 13,
    borderColor: "#aaa",
    backgroundColor: "white",
    height: 40,
  },
  dropdownStyleTxt: {
    fontSize: 14,
  },
});
