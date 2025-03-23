import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  StyleSheet, 
  ActivityIndicator 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useOAuth } from "@clerk/clerk-expo";
import Icon from "react-native-vector-icons/FontAwesome";

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { startOAuthFlow: signUpWithGoogle } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: signUpWithApple } = useOAuth({ strategy: "oauth_apple" });
  const { startOAuthFlow: signUpWithMicrosoft } = useOAuth({ strategy: "oauth_microsoft" });

  const handleSignUp = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      Alert.alert("Success", "Account created!");
      navigation.replace("Home");
      setLoading(false);
    }, 1500);
  };

  const handleOAuthSignUp = async (platform) => {
    try {
      if (platform === 'google') {
        await signUpWithGoogle();
      } else if (platform === 'apple') {
        await signUpWithApple();
      } else if (platform === 'microsoft') {
        await signUpWithMicrosoft();
      }
      // Optionally navigate or show success message after OAuth sign-up
      navigation.replace("Home");
    } catch (error) {
      console.error("OAuth sign-up error: ", error);
      Alert.alert("Error", "Something went wrong during sign-up");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>

      <View style={styles.form}>
        

        {/* OAuth Buttons */}
        <TouchableOpacity style={styles.oauthButton} onPress={() => handleOAuthSignUp('google')}>
          <Icon name="google" size={24} color="#DB4437" style={styles.oauthIcon} />
          <Text style={styles.oauthText}>Sign up with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.oauthButton} onPress={() => handleOAuthSignUp('apple')}>
          <Icon name="apple" size={24} color="#000" style={styles.oauthIcon} />
          <Text style={styles.oauthText}>Sign up with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.oauthButton} onPress={() => handleOAuthSignUp('microsoft')}>
          <Icon name="windows" size={24} color="#00A4EF" style={styles.oauthIcon} />
          <Text style={styles.oauthText}>Sign up with Microsoft</Text>
        </TouchableOpacity>

        {/* Already have an account? */}
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.signUpLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop:-350,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 60,
  },
  form: {
    width: '100%',
    marginTop: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  oauthButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
    
  },
  oauthIcon: {
    marginRight: 10,
  },
  oauthText: {
    fontSize: 16,
    color: '#333',
  },
  signUpContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpText: {
    fontSize: 16,
  },
  signUpLink: {
    color: '#007BFF',
    fontSize: 16,
  },
});
