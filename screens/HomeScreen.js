import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@clerk/clerk-expo";
import Icon from "react-native-vector-icons/Ionicons";  // Importing vector icons

export default function HomeScreen({ navigation }) {
  const { signOut } = useAuth();
  const [isMenuVisible, setMenuVisible] = useState(false); // To toggle the dropdown menu visibility
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state

  // Handle sign-out
  const handleSignOut = async () => {
    try {
      await signOut();  // Sign the user out
      navigation.replace("Login"); // Navigate to the login screen after signing out
    } catch (error) {
      console.log("Error signing out: ", error);
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode); // Toggle dark mode
  };

  // Toggle profile menu visibility
  const handleProfileClick = () => {
    setMenuVisible(!isMenuVisible); // Toggle the dropdown menu
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? "#333" : "#FFFFFF" }]}>
      <View style={styles.topBar}>
        <Text style={[styles.appName, { color: isDarkMode ? "#FFF" : "#333" }]}>
          <Text style={styles.appNameGreen}>Smart</Text>
          <Text style={styles.appNameWhite}>Bid</Text>
        </Text>
        {/* Profile Icon */}
        <TouchableOpacity onPress={handleProfileClick}>
          <Icon name="person-circle" size={40} color={isDarkMode ? "#FFF" : "#333"} style={styles.profileIcon} />
        </TouchableOpacity>
        
        {/* Profile Menu (Visible when profile icon is clicked) */}
        {isMenuVisible && (
          <View style={[styles.menuContainer, { backgroundColor: isDarkMode ? "#444" : "#FFF" }]}>
            <TouchableOpacity style={styles.menuItem} onPress={toggleDarkMode}>
              <Icon name={isDarkMode ? "sunny" : "moon"} size={24} color={isDarkMode ? "#FFF" : "#333"} />
              <Text style={[styles.menuItemText, { color: isDarkMode ? "#FFF" : "#333" }]}>
                Dark Mode
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
              <Icon name="settings" size={24} color={isDarkMode ? "#FFF" : "#333"} />
              <Text style={[styles.menuItemText, { color: isDarkMode ? "#FFF" : "#333" }]}>
                Settings
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleSignOut}>
              <Icon name="log-out" size={24} color={isDarkMode ? "#FFF" : "#333"} />
              <Text style={[styles.menuItemText, { color: isDarkMode ? "#FFF" : "#333" }]}>
                Log out
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Text style={[styles.title, { color: isDarkMode ? "#FFF" : "#333" }]}>Welcome to the Home Page! 🎉</Text>
      <Text style={[styles.subtitle, { color: isDarkMode ? "#FFF" : "#666" }]}>You're successfully logged in.</Text>

      <TouchableOpacity style={styles.homeIcon} onPress={() => navigation.navigate("Home")}>
        <Icon name="home" size={50} color={isDarkMode ? "#FFF" : "#333"} />
      </TouchableOpacity>

      {/* Notification Icon */}
      <TouchableOpacity style={styles.notificationIcon}>
        <Icon name="notifications" size={50} color={isDarkMode ? "#FFF" : "#333"} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
    borderBottomWidth: 2,
    borderColor: "#333",
    marginTop: -600,
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  appNameGreen: {
    color: "green",
  },
  appNameWhite: {
    color: "black",
  },
  profileIcon: {
    marginLeft: -10, // Adjust the profile icon slightly to the left
  },
  menuContainer: {
    position: "absolute",
    top: 50,
    left: 190,
    width: 180,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    zIndex: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuItemText: {
    marginLeft: 10,
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  homeIcon: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },
  notificationIcon: {
    position: "absolute",
    bottom: 20,
    right: 20, // Positioned at the bottom right
  },
});
