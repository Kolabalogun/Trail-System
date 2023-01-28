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
import { styles } from "../../Function/styles";
import Header from "../Components/Header";

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Header title={"One Data"} />

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
            onPress={navigation.navigate("Update")}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Image
              style={{ height: 150, width: 150 }}
              source={require("../../../assets/a.png")}
            />
            <Text
              style={{ fontSize: 18, fontWeight: "500", paddingVertical: 10 }}
            >
              Send Memo or Letter
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={navigation.navigate("Education")}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Image
              style={{ height: 150, width: 150 }}
              source={require("../../../assets/e.png")}
            />
            <Text
              style={{ fontSize: 18, fontWeight: "500", paddingVertical: 10 }}
            >
              Inbox
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={navigation.navigate("Education")}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Image
              style={{ height: 150, width: 150 }}
              source={require("../../../assets/e.png")}
            />
            <Text
              style={{ fontSize: 18, fontWeight: "500", paddingVertical: 10 }}
            >
              Outbox
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
