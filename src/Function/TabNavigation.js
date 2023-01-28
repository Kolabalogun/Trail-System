import { Image, StyleSheet, Text, View } from "react-native";

import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { useGlobalContext } from "./Context";
import UserProfile from "../Frontend/Pages/UserProfile";
import Home from "../Frontend/Pages/Home";

const Tabs = createMaterialBottomTabNavigator();

const TabNavigations = () => {
  const { currentTheme } = useGlobalContext();

  return (
    <Tabs.Navigator
      barStyle={{
        backgroundColor: "#008751",
        paddingVertical: 0,
        // height: 80,
      }}
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
            (size = focused ? 26 : 26), (color = focused ? "#000" : "#fff");
          } else if (route.name === "Group") {
            iconName = "group";
            (size = focused ? 23 : 23), (color = focused ? "#000" : "#fff");
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="Group" component={UserProfile} />
    </Tabs.Navigator>
  );
};

export default TabNavigations;
