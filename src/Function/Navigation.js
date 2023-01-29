import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useGlobalContext } from "./Context";

import TabNavigations from "./TabNavigation";
import UserSignInPage from "../Auth/UserSignInPage";
import Login from "../Auth/Login";
import SendMemo from "../Frontend/Pages/Home/SendMemo";
import ReceivedMemo from "../Frontend/Pages/Home/ReceivedMemo";
import ReceivedInternalMemo from "../Frontend/Pages/Home/Received/ReceivedInternalMemo";
import ReceivedExternalMemo from "../Frontend/Pages/Home/Received/ReceivedExternalMemo";
import OutboxMemo from "../Frontend/Pages/Home/OutboxMemo";
import OutboxExternalMemo from "../Frontend/Pages/Home/Outbox/OutboxExternalMemo";
import OutboxInternalMemo from "../Frontend/Pages/Home/Outbox/OutboxInternalMemo";
import MemoDetails from "../Frontend/Pages/Home/MemoDetails";
import MemoReceiverDetails from "../Frontend/Pages/Home/MemoReceiverDetails";
import DrawerNavigation from "./DrawerNavigation";
import AutoUpdatee from "../Frontend/Pages/AutoUpdate";

const Stack = createNativeStackNavigator();

const Navigations = () => {
  const { currentUser, AutoUpdateState, projectVersion } = useGlobalContext();

  return (
    <>
      {projectVersion !== AutoUpdateState.currentVersion ? (
        <AutoUpdatee />
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={"TabNavigations"}
        >
          {!currentUser ? (
            <>
              <Stack.Screen name="UserSignIn" component={UserSignInPage} />
              <Stack.Screen name="Login" component={Login} />
            </>
          ) : (
            <>
              <Stack.Screen
                name="DrawerNavigation"
                component={DrawerNavigation}
              />
              <Stack.Screen name="TabNavigations" component={TabNavigations} />
              <Stack.Screen name="SendMemo" component={SendMemo} />
              <Stack.Screen name="ReceivedMemo" component={ReceivedMemo} />
              <Stack.Screen name="OutboxMemo" component={OutboxMemo} />
              <Stack.Screen name="MemoDetails" component={MemoDetails} />
              <Stack.Screen
                name="MemoReceiverDetails"
                component={MemoReceiverDetails}
              />
              <Stack.Screen
                name="ReceivedInternalMemo"
                component={ReceivedInternalMemo}
              />
              <Stack.Screen
                name="ReceivedExternalMemo"
                component={ReceivedExternalMemo}
              />
              <Stack.Screen
                name="OutboxExternalMemo"
                component={OutboxExternalMemo}
              />
              <Stack.Screen
                name="OutboxInternalMemo"
                component={OutboxInternalMemo}
              />
            </>
          )}
        </Stack.Navigator>
      )}
    </>
  );
};

export default Navigations;
