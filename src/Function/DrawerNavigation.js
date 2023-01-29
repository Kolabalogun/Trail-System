import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigations from "./TabNavigation";

import CustomDrawer from "./CustomDrawer";
import { useGlobalContext } from "./Context";
import AddUser from "../Frontend/Pages/AddUser";
import AddDepartments from "../Frontend/Pages/AddDepartments";

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  const { currentTheme } = useGlobalContext();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor:
          currentTheme === "Red"
            ? "#CF0A0A"
            : currentTheme === "Pink"
            ? "#EA047E"
            : currentTheme === "Purple"
            ? "#EA047E"
            : "#008751",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#fff",
      }}
      initialRouteName="Go Home"
    >
      <Drawer.Screen name="Go Home" component={TabNavigations} />
      <Drawer.Screen name="Add User" component={AddUser} />

      <Drawer.Screen name="Add Departments" component={AddDepartments} />
    </Drawer.Navigator>
  );
}
