import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import Home from "../Frontend/Pages/Home";
import AddUser from "../Frontend/Pages/AddUser";
import { useGlobalContext } from "./Context";
import AddDepartments from "../Frontend/Pages/AddDepartments";
import UserProfile from "../Frontend/Pages/UserProfile";

const Tabs = createMaterialBottomTabNavigator();

const TabNavigations = () => {
  const { CurrentUserfromDb } = useGlobalContext();

  return (
    <Tabs.Navigator
      barStyle={{
        backgroundColor: "#fff",
        activeTintColor: "#fff",
        paddingBottom: 14,
        borderTopColor: "#D9D9D9",
        borderTopWidth: 1,
        height: 70,
      }}
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
            (size = focused ? 26 : 26), (color = focused ? "#008751" : "#000");
          } else if (route.name === "UserProfile") {
            iconName = "user";
            (size = focused ? 23 : 23), (color = focused ? "#008751" : "#000");
          } else if (route.name === "AddUser") {
            iconName = "group";
            (size = focused ? 23 : 23), (color = focused ? "#008751" : "#000");
          } else if (route.name === "AddDepartment") {
            iconName = "list-alt";
            (size = focused ? 23 : 23), (color = focused ? "#008751" : "#000");
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="Home" component={Home} />

      {CurrentUserfromDb?.Role === "Head of Department" && (
        <Tabs.Screen name="AddUser" component={AddUser} />
      )}

      {/* <Tabs.Screen name="AddUser" component={AddUser} />
      <Tabs.Screen name="AddDepartment" component={AddDepartments} /> */}
      <Tabs.Screen name="UserProfile" component={UserProfile} />
    </Tabs.Navigator>
  );
};

export default TabNavigations;
