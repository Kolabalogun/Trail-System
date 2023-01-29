import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../Utils/Firebase";
import { useGlobalContext } from "../../../Function/Context";
import { styles } from "../../../Function/styles";
import Button from "../../Components/Button";

const initialState = {
  img: "",

  description: "",
  dateofMemo: "",
  recipientMinistry: "",
  MatchDate: "",
  memoTitle: "",
  senderMinistry: "",
  Approvals: [],
};
const MemoDetails = ({
  route,
  navigation,
  functions,
  title,
  imgtype,
  functions2,
  imgtype2,
}) => {
  const {
    loaderF,
    handleDeleteMemo,
    CurrentUserfromDb,
    notification,
    notificationF,
  } = useGlobalContext();

  const { memoId } = route.params;

  const [MemoInfo, MemoInfoF] = useState(initialState);

  useEffect(() => {
    memoId && getMemoDetail();
  }, [memoId]);

  const getMemoDetail = async () => {
    loaderF(true);
    const docRef = doc(db, "Memo", memoId);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      MemoInfoF({ ...snapshot.data() });
    }
    loaderF(false);
  };
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    getMemoDetail();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  function navigateTogoBack(params) {
    navigation.goBack();
  }

  const [signMemo, signMemoF] = useState({
    fullName: CurrentUserfromDb?.fullName,
    Role: CurrentUserfromDb?.Role,
    Ministry: CurrentUserfromDb?.minitries,
    Depatment: CurrentUserfromDb?.department,
    Comment: "",
  });

  const SendAproval = async () => {
    try {
      await updateDoc(doc(db, "Memo", memoId), {
        ...MemoInfo,
        Approvals: arrayUnion(signMemo),
      });
      notificationF("Approval Sent");
    } catch (error) {
      console.log(error, "line 219");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.homeHeader, { justifyContent: "space-between" }]}>
          <TouchableOpacity
            onPress={() => navigateTogoBack()}
            style={styles.profilePic}
          >
            <Image
              source={require("../../../../assets/ba.png")}
              resizeMode="cover"
              style={{ height: imgtype ? 28 : 20, width: imgtype ? 28 : 20 }}
            />
          </TouchableOpacity>
          <View style={styles.headerTitleDiv}>
            <Text style={styles.headerTitle}>Trail System</Text>
          </View>
          <TouchableOpacity
            onPress={() => handleDeleteMemo(memoId)}
            style={styles.profilePic}
          >
            <Image
              source={require("../../../../assets/delete.png")}
              resizeMode="cover"
              style={{ height: 18, width: 18 }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "600" }}>
            {MemoInfo?.memoTitle}
          </Text>

          <View
            style={{ marginTop: 30, display: "flex", flexDirection: "row" }}
          >
            <Image
              source={require("../../../../assets/all.png")}
              resizeMode="contain"
              style={{ height: 50, width: 50 }}
            />

            <View style={{ marginLeft: 10 }}>
              <Text>{MemoInfo?.recipientMinistry}</Text>
              <Text style={{ paddingVertical: 5 }}>{MemoInfo?.dateofMemo}</Text>
            </View>
          </View>

          <View
            style={{ marginTop: 30, display: "flex", flexDirection: "column" }}
          >
            <Text style={{ marginBottom: 10 }}>
              From: {MemoInfo?.senderEmail}
            </Text>
            <Text>{MemoInfo?.description}</Text>
          </View>

          {MemoInfo?.img && (
            <View style={{ marginTop: 20 }}>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                Document Attached
              </Text>
            </View>
          )}

          <TouchableOpacity
            onPress={() => {
              Linking.openURL(MemoInfo?.img);
            }}
          >
            <Image
              source={{ uri: MemoInfo?.img }}
              resizeMode="contain"
              style={{ height: 200, width: 150 }}
            />
          </TouchableOpacity>

          <View
            style={{
              marginTop: 30,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{
                borderColor: "black",
                borderWidth: 1,
                borderRadius: 5,
                display: "flex",
                flexDirection: "row",

                alignItems: "center",
                paddingHorizontal: 10,
              }}
            >
              <Image
                source={require("../../../../assets/lefta.png")}
                resizeMode="contain"
                style={{ height: 15, width: 15 }}
              />
              <Text style={{ padding: 10 }}>Reply</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderColor: "black",
                borderWidth: 1,
                borderRadius: 5,
                display: "flex",
                flexDirection: "row",

                alignItems: "center",
                paddingHorizontal: 10,
              }}
            >
              <Image
                source={require("../../../../assets/righta.png")}
                resizeMode="contain"
                style={{ height: 15, width: 15 }}
              />
              <Text style={{ padding: 10 }}>Forward</Text>
            </TouchableOpacity>
          </View>

          <View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ paddingVertical: 10, fontWeight: "600" }}>
                Approvals
              </Text>

              {MemoInfo.Approvals.map((approval, i) => (
                <View
                  key={i}
                  style={{
                    display: "flex",
                    backgroundColor: "#f5f5f5",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderRadius: 10,
                    marginBottom: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "400",
                      paddingBottom: 10,
                    }}
                  >
                    {approval?.fullName}
                  </Text>
                  <Text style={{ fontSize: 15, fontWeight: "400" }}>
                    {approval?.Ministry}
                  </Text>
                  <Text style={{ fontSize: 15, fontWeight: "400" }}>
                    {approval?.Depatment}
                  </Text>
                  <Text style={{ fontSize: 15, fontWeight: "400" }}>
                    {approval?.Role}
                  </Text>
                  <Text style={{ fontSize: 15, fontWeight: "400" }}>
                    {approval?.Comment}
                  </Text>
                </View>
              ))}

              <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                Your Role
              </Text>
              <Text>{CurrentUserfromDb?.Role}</Text>
              <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                Full Name
              </Text>
              <Text>{CurrentUserfromDb?.fullName}</Text>

              <View style={{ marginTop: 10 }}>
                <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                  Sign this Memo
                </Text>
                <TextInput
                  value={signMemo}
                  onChangeText={(e) =>
                    signMemoF({
                      ...signMemo,
                      Comment: e,
                    })
                  }
                  placeholder="Comment on Memo"
                  style={styles.Input}
                />
              </View>
              <Text style={{ color: "green" }}> {notification}</Text>
              <Button handleSubmit={SendAproval} txt="Send" />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MemoDetails;
