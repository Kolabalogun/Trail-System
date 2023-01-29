import { StyleSheet, Text, LogBox } from "react-native";
import React, { useState, useContext, useEffect } from "react";

import { useNavigation } from "@react-navigation/native";

import { auth, db, provider } from "../Utils/Firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { signOut } from "firebase/auth";

const AppContext = React.createContext();

LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
]);

const AppProvider = ({ children }) => {
  const [notification, notificationF] = useState("");
  const [loader, loaderF] = useState("");

  //   notification
  useEffect(() => {
    const timeoutt = setTimeout(() => {
      notificationF("");
    }, 3000);

    return () => {
      clearInterval(timeoutt);
    };
  }, [notification]);

  const navigation = useNavigation();

  // get list of teams from firebase

  const [TeamsFromDBi, TeamsFromDBiF] = useState([]);

  const TeamsFromDB = TeamsFromDBi;
  TeamsFromDB.sort(function (a, b) {
    return a.dateId - b.dateId;
  });

  function getTeamsFromDB(params) {
    loaderF(true);
    const unsub = onSnapshot(
      collection(db, "Teams"),

      (snapshot) => {
        let list = [];

        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        TeamsFromDBiF(list);
        loaderF(false);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }

  // get list of users from firebase

  const [UsersToken, UsersTokenF] = useState("");

  useEffect(() => {
    getBlogDetail();
  }, []);

  const getBlogDetail = async () => {
    const docRef = doc(db, "Users", "Vgp5x0EfVAXtx8JM7yGx");
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      UsersTokenF({ ...snapshot.data() });
    }
  };

  // check if there is internet connecttion
  const [online, onlineF] = useState(true);

  NetInfo.fetch().then((state) => {
    onlineF(state.isConnected);
  });

  if (!online) {
    alert("You have no Internet Connection!!");
  }

  const [currentAdmin, currentAdminF] = useState(null);

  const [currentUser, currentUserF] = useState(false);

  const [currentTheme, currentThemeF] = useState("Default");

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("@checkUserSignIn", value);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@checkUserSignIn");

      if (value !== null) {
        currentUserF(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
  }, []);
  // refreshing

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getBlogDetail();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // AutoUpdate

  // let projectVersion = "1.8";

  const [projectVersion, projectVersionF] = useState("1.0");

  const [AutoUpdateState, AutoUpdateStateF] = useState({
    isthereUpdate: false,
    link: "",
    currentVersion: projectVersion,
  });

  useEffect(() => {
    getUpdateDetail();
  }, []);

  const getUpdateDetail = async () => {
    loaderF(true);
    const docRef = doc(db, "AutoUpdate", "uhTnMICHPaLJOx5TJSw1");
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      AutoUpdateStateF({ ...snapshot.data() });
    }
    loaderF(false);
  };

  //$$$$$$$$$$$$$$$$$$

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        currentAdminF(authUser);
      } else {
        currentAdminF(null);
      }
    });
  }, []);

  // Ministries list

  const Ministries = [
    "Ministry of Health",
    "Ministry of Education",
    "Ministry of Finance",
  ];

  // Departments list

  const Departments = [
    "Departments of Health",
    "Departments of Education",
    "Departments of Finance",
  ];

  // LevelofAccess list

  const LevelofAccess = ["1", "2", "3"];

  // type of memo

  const typeOfMemo = ["Internal Memo", "External Memo"];

  //   Memo

  const [Memos, MemosF] = useState([]);

  useEffect(() => {
    loaderF(true);
    const unsub = onSnapshot(
      collection(db, "Memo"),

      (snapshot) => {
        let list = [];

        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });

        if (!list || list.length === 0) {
        } else {
          MemosF(list);

          loaderF(false);
        }
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  // to delete Memo
  const handleDeleteMemo = async (id) => {
    try {
      loaderF(true);
      await deleteDoc(doc(db, "Memo", id));
      loaderF(false);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  //   User

  const [UsersFromDB, UsersFromDBF] = useState([]);

  function getUsersFromDB() {
    loaderF(true);

    const unsub = onSnapshot(
      collection(db, "Users"),

      (snapshot) => {
        let list = [];

        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });

        if (!list || list.length === 0) {
        } else {
          UsersFromDBF(list);

          loaderF(false);
        }
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }

  useEffect(() => {
    getUsersFromDB();
  }, []);

  //   logging out user
  const handleLogout = () => {
    signOut(auth).then(() => {
      currentAdminF(null);
      currentUserF(null);
      storeData(null);
    });
  };

  //current User and ministry

  const [CurrentUserfromDb, CurrentUserfromDbF] = useState(null);

  useEffect(() => {
    UsersFromDB.map((user) => {
      if (user?.email.toLowerCase() === currentAdmin?.email) {
        CurrentUserfromDbF(user);
      }
    });
  }, [UsersFromDB]);

  const StaffRole = ["Head of Department", "Staff"];

  return (
    <AppContext.Provider
      value={{
        notification,
        notificationF,
        navigation,

        currentUser,
        currentUserF,
        currentAdmin,
        currentAdminF,

        loader,
        loaderF,

        online,
        UsersToken,
        storeData,
        getData,

        AutoUpdateState,
        AutoUpdateStateF,
        projectVersion,
        projectVersionF,

        // $$$$$$$$$$$$$$4

        Ministries,
        Departments,
        LevelofAccess,
        typeOfMemo,
        Memos,
        MemosF,
        handleDeleteMemo,
        UsersFromDB,
        UsersFromDBF,
        handleLogout,
        CurrentUserfromDb,
        getUsersFromDB,
        StaffRole,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
