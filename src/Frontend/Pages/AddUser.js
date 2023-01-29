import {
  Image,
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
import React, { useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { auth, db } from "../../Utils/Firebase";
import { useGlobalContext } from "../../Function/Context";
import SelectDropdown from "react-native-select-dropdown";
import Header from "../Components/Header";
import { pickImage, uploadImgetoFireStorage } from "../../Utils/DisplayImage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const AddUser = ({ navigation }) => {
  const {
    notification,
    notificationF,
    Ministries,
    Departments,
    LevelofAccess,
    loaderF,
    loader,
    StaffRole,
  } = useGlobalContext();

  const [fullName, fullNameF] = useState("");
  const [email, emailF] = useState("");
  const [password, passwordF] = useState("");
  const [confirmPassword, confirmPasswordF] = useState("");
  const [minitries, minitriesF] = useState("");
  const [department, departmentF] = useState("");
  const [LevelofAccessState, LevelofAccessStateF] = useState("");
  const [StaffRoleState, StaffRoleStateF] = useState("");

  const [dateId, setdateId] = useState("");

  // to set timeId
  useEffect(() => {
    const dateId = new Date().getTime();
    setdateId(dateId);
  }, []);

  const [selectedImage, selectedImageF] = useState(null);

  const handleAuth = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return notificationF("Password don't match");
    }
    if (fullName && email && password) {
      loaderF(true);

      let image;
      const { url } = await uploadImgetoFireStorage(
        selectedImage,
        `images/${dateId}`,
        "profilePicture"
      );

      image = url;

      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(user, {
        displayName: `${fullName}`,
        photoURL: url,
      });

      try {
        await addDoc(collection(db, "Users"), {
          fullName: fullName,
          email: email,
          Userimg: url,
          minitries,
          department,
          LevelofAccessState,
          Role: StaffRoleState,

          timestamp: serverTimestamp(),
          // author: currentUser.email,
          // userId: currentUser.uid,
          dateId: dateId,
        });
        loaderF(false);
      } catch (error) {
        notificationF(error);
      }

      // setstate(initialState);
      loaderF(false);
      return notificationF("You've successfully Signed Up");
    } else {
      return notificationF("All fields must be filled");
    }
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

  return (
    <SafeAreaView style={styles.container}>
      <Header
        functions={navigateTogoBack}
        imgtype={require("../../../assets/ba.png")}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={Imagepicker}
          style={{
            height: 100,
            width: 100,

            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            marginVertical: 40,
            borderRadius: 120,
          }}
        >
          {!selectedImage ? (
            <View style={{ alignSelf: "center" }}>
              <Image
                source={require("../../../assets/photo.png")}
                style={{
                  height: 150,
                  width: 150,
                }}
              />
              <Text style={{ width: "100%", textAlign: "center" }}>
                Add a Profile Picture
              </Text>
            </View>
          ) : (
            <Image
              source={{ uri: selectedImage }}
              style={{
                height: "100%",
                width: "100%",

                borderRadius: 100,
              }}
            />
          )}
        </TouchableOpacity>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={styles.Inputs}>
            <View style={{ marginTop: 10 }}>
              <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                Full Name
              </Text>
              <TextInput
                value={fullName}
                onChangeText={(e) => fullNameF(e)}
                placeholder="Enter Full Name"
                style={styles.Input}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                Email
              </Text>
              <TextInput
                value={email}
                onChangeText={(e) => emailF(e)}
                placeholder="Enter Email"
                style={styles.Input}
              />
            </View>

            <View style={{ marginTop: 10 }}>
              <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                Select Ministry
              </Text>

              <SelectDropdown
                data={Ministries}
                defaultButtonText="Please select Ministry"
                buttonStyle={styles.dropdownStyle}
                buttonTextStyle={styles.dropdownStyleTxt}
                onSelect={(selectedItem, index) => {
                  minitriesF(selectedItem);
                }}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                Select Department
              </Text>

              <SelectDropdown
                data={Departments}
                defaultButtonText="Please select Department"
                buttonStyle={styles.dropdownStyle}
                buttonTextStyle={styles.dropdownStyleTxt}
                onSelect={(selectedItem, index) => {
                  departmentF(selectedItem);
                }}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                Role
              </Text>

              <SelectDropdown
                data={StaffRole}
                defaultButtonText="Please Role"
                buttonStyle={styles.dropdownStyle}
                buttonTextStyle={styles.dropdownStyleTxt}
                onSelect={(selectedItem, index) => {
                  StaffRoleStateF(selectedItem);
                }}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                Select Level
              </Text>

              <SelectDropdown
                data={LevelofAccess}
                defaultButtonText="Please select Level"
                buttonStyle={styles.dropdownStyle}
                buttonTextStyle={styles.dropdownStyleTxt}
                onSelect={(selectedItem, index) => {
                  LevelofAccessStateF(selectedItem);
                }}
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
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                Confirm Password
              </Text>
              <TextInput
                value={confirmPassword}
                onChangeText={(e) => confirmPasswordF(e)}
                placeholder="Enter your password again"
                secureTextEntry={true}
                style={styles.Input}
              />
            </View>
          </View>

          <Text style={{ color: "red", alignSelf: "center" }}>
            {notification}
          </Text>
          <TouchableOpacity style={styles.btn} onPress={handleAuth}>
            <Text style={styles.btnTxt}>Register User</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddUser;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
    paddingTop: 15,
    paddingHorizontal: 15,
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

  //$$$$$$$$$$$$$$$

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
