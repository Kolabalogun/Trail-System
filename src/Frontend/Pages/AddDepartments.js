import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { useGlobalContext } from "../../Function/Context";

import { db } from "../../Utils/Firebase";
// import Loader from "../../FrontEnd/Components/Others/Loader";
import SelectDropdown from "react-native-select-dropdown";
// import Header from "../../FrontEnd/Components/Others/Header";
import { styles } from "../../Function/styles";
// import    from "../../FrontEnd/Components/Others/    ";
import Loader from "../Components/Loader";
import Header from "../Components/Header";
import Button from "../Components/Button";

const AddDepartments = ({ navigation }) => {
  const {
    notification,
    notificationF,
    currentUser,
    loader,
    loaderF,

    Ministries,
  } = useGlobalContext();

  const [recipientMinistry, recipientMinistryF] = useState("");
  const [recipientDepartment, recipientDepartmentF] = useState("");
  const [departmentAddress, departmentAddressF] = useState("");

  const [dateId, setdateId] = useState("");

  // to set timeId
  useEffect(() => {
    const dateId = new Date().getTime();

    setdateId(dateId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (recipientDepartment && recipientMinistry && departmentAddress) {
      loaderF(true);

      try {
        await addDoc(collection(db, "Departments"), {
          recipientMinistry,
          recipientDepartment,
          departmentAddress,

          dateId: dateId,
        });

        notificationF("Department Successfully Added");
        recipientDepartmentF("");
        recipientMinistryF("");

        loaderF(false);
      } catch (error) {
        notificationF(error);
      }
    } else {
      return notificationF("All fields must be filled");
    }
  };

  function functions(params) {
    navigation.goBack();
  }

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <SafeAreaView style={styles.container}>
          <View>
            <Header
              functions={functions}
              imgtype={require("../../../assets/ba.png")}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.topSection}>
                <Text style={styles.topText}>Add Department</Text>
                <Text style={styles.capText}>
                  Please input the details of the department.
                </Text>
              </View>

              <KeyboardAvoidingView style={styles.Inputs}>
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
                      recipientMinistryF(selectedItem);
                    }}
                  />
                </View>

                <View style={{ marginTop: 10 }}>
                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Department Name
                  </Text>
                  <TextInput
                    value={recipientDepartment}
                    onChangeText={(e) => recipientDepartmentF(e)}
                    placeholder="Enter the Department Name"
                    style={styles.InputTextArea}
                  />
                </View>

                <View style={{ marginTop: 10 }}>
                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Department Address
                  </Text>
                  <TextInput
                    value={departmentAddress}
                    onChangeText={(e) => departmentAddressF(e)}
                    placeholder="Enter the Address of the Department"
                    style={styles.InputTextArea}
                  />
                </View>
              </KeyboardAvoidingView>
              <Text style={{ color: "red", alignSelf: "center", padding: 3 }}>
                {notification}
              </Text>
              <Button handleSubmit={handleSubmit} />
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default AddDepartments;
