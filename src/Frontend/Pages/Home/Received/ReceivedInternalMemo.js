import {
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../../../Function/Context";
import { styles } from "../../../../Function/styles";
import Header from "../../../Components/Header";

const ReceivedInternalMemo = ({ navigation }) => {
  const { Memos, CurrentUserfromDb, getUsersFromDB } = useGlobalContext();

  useEffect(() => {
    getUsersFromDB();
  }, []);

  const ReceivedInternalMemoList = Memos.map((memo, index) => {
    if (
      memo?.recipientDepartment === CurrentUserfromDb?.department &&
      memo?.typeOfMemo === "Internal Memo" &&
      memo?.MemoConfidentialLevel === CurrentUserfromDb?.LevelofAccessState
    ) {
      return (
        <TouchableOpacity
          key={memo?.dateId}
          onPress={() =>
            navigation.navigate("MemoReceiverDetails", {
              memoId: memo.id,
            })
          }
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderBottomColor: "#D9D9D9",
          }}
        >
          <Image
            source={require("../../../../../assets/all.png")}
            resizeMode="contain"
            style={{ height: 50, width: 50 }}
          />

          <View style={{ marginLeft: 10 }}>
            <Text style={{ paddingBottom: 5, fontWeight: "500" }}>
              {memo?.senderDepartment}
            </Text>
            <Text style={styles.eachmemoTeamTxt}>{memo?.memoTitle}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  });

  function navigateTogoBack() {
    navigation.goBack();
  }

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    getUsersFromDB();
    searchAvalableF(false);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [search, searchF] = useState("");

  const [searchAvalable, searchAvalableF] = useState(false);

  function handleSearch(params) {
    searchAvalableF(!searchAvalable);
  }

  const SearchedReceivedInternalMemoList = Memos.map((memo, index) => {
    if (
      memo?.recipientDepartment === CurrentUserfromDb?.department &&
      memo?.typeOfMemo === "Internal Memo" &&
      memo?.MemoConfidentialLevel === CurrentUserfromDb?.LevelofAccessState &&
      memo?.memoTitle.trim() === search
    ) {
      return (
        <TouchableOpacity
          key={memo?.dateId}
          onPress={() =>
            navigation.navigate("MemoDetails", {
              memoId: memo.id,
            })
          }
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
            // borderBottomWidth: 1,
            // borderBottomColor: "#D9D9D9",
          }}
        >
          <Image
            source={require("../../../../../assets/all.png")}
            resizeMode="contain"
            style={{ height: 50, width: 50 }}
          />

          <View style={{ marginLeft: 10 }}>
            <Text style={{ paddingBottom: 5, fontWeight: "500" }}>
              {memo?.recipientDepartment}
            </Text>
            <Text style={styles.eachmemoTeamTxt}>{memo?.memoTitle}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header
        functions={navigateTogoBack}
        imgtype={require("../../../../../assets/ba.png")}
        title={"Internal Memos"}
      />

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            colors={["#377D71"]}
            onRefresh={onRefresh}
          />
        }
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            position: "relative",
          }}
        >
          <TextInput
            value={search}
            onChangeText={(e) => searchF(e)}
            placeholder="Search Memo"
            style={{
              backgroundColor: "#fff",
              borderRadius: 10,
              flex: 1,
              borderWidth: 1,
              borderColor: "#CDCBC9",
              paddingHorizontal: 5,
              paddingVertical: 10,
              marginRight: 10,
            }}
          />
          <TouchableOpacity onPress={() => searchAvalableF(true)}>
            <Image
              source={require("../../../../../assets/se.png")}
              style={{
                height: 18,
                width: 18,
              }}
            />
          </TouchableOpacity>
        </View>

        {searchAvalable
          ? SearchedReceivedInternalMemoList
          : ReceivedInternalMemoList}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReceivedInternalMemo;
