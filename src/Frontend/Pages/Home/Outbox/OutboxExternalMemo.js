import {
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../../../Function/Context";
import { styles } from "../../../../Function/styles";
import Header from "../../../Components/Header";
import { TextInput } from "react-native-paper";

const OutboxExternalMemo = ({ navigation }) => {
  const { Memos, CurrentUserfromDb, getUsersFromDB } = useGlobalContext();

  useEffect(() => {
    getUsersFromDB();
  }, []);

  const OutboxExternalMemoList = Memos.map((memo, index) => {
    if (
      memo?.senderDepartment === CurrentUserfromDb?.department &&
      memo?.MemoConfidentialLevel === CurrentUserfromDb?.LevelofAccessState &&
      memo?.typeOfMemo === "External Memo"
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
              {memo?.recipientDepartment}
            </Text>
            <Text style={styles.eachmemoTeamTxt}>{memo?.memoTitle}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  });

  function navigateTogoBack(params) {
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

  const SearchedOutboxExternalMemoList = Memos.map((memo, index) => {
    if (
      memo?.senderDepartment === CurrentUserfromDb?.department &&
      memo?.typeOfMemo === "External Memo" &&
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
        title={"External Memos"}
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
              //   borderWidth: 1,
              //   borderColor: "#CDCBC9",
            }}
          />
          <TouchableOpacity onPress={() => handleSearch()}>
            <Image
              source={require("../../../../../assets/se.png")}
              style={{
                height: 18,
                width: 18,
                marginRight: 10,
              }}
            />
          </TouchableOpacity>
        </View>

        {searchAvalable
          ? SearchedOutboxExternalMemoList
          : OutboxExternalMemoList}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OutboxExternalMemo;
