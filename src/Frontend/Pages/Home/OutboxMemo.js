import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Header from "../../Components/Header";
import { styles } from "../../../Function/styles";

const OutboxMemo = ({ navigation }) => {
  function navigateTogoBack(params) {
    navigation.goBack();
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header
        functions={navigateTogoBack}
        imgtype={require("../../../../assets/ba.png")}
        title={"Sent Memo"}
      />

      <ScrollView>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("OutboxInternalMemo")}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Image
              style={{ height: 200 }}
              source={require("../../../../assets/im.png")}
              resizeMode="contain"
            />
            {/* <Text
              style={{ fontSize: 18, fontWeight: "500", paddingVertical: 10 }}
            >
              Internal Memo
            </Text> */}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("OutboxExternalMemo")}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 60,
            }}
          >
            <Image
              style={{ height: 200 }}
              source={require("../../../../assets/em.png")}
              resizeMode="contain"
            />
            {/* <Text
              style={{ fontSize: 18, fontWeight: "500", paddingVertical: 10 }}
            >
              External Memo
            </Text> */}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OutboxMemo;
