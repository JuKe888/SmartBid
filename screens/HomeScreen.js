import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@clerk/clerk-expo";

export default function HomeScreen({ navigation }) {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();  // Sign the user out
      navigation.replace("Login"); // Navigate to the login screen after signing out
    } catch (error) {
      console.log("Error signing out: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Page! 🎉</Text>
      <Text style={styles.subtitle}>You're successfully logged in.</Text>

      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#FFFFFF" },
  title: { fontSize: 28, fontWeight: "bold", color: "#333", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "#666", marginBottom: 30 },
  button: { backgroundColor: "#FF3B30", padding: 15, borderRadius: 8, marginTop: 20 },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
});
