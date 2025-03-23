import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    StyleSheet,
    ImageBackground
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useOAuth } from "@clerk/clerk-expo";
import Icon from "react-native-vector-icons/FontAwesome";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { startOAuthFlow: loginWithGoogle } = useOAuth({ strategy: "oauth_google" });
    const { startOAuthFlow: loginWithApple } = useOAuth({ strategy: "oauth_apple" });
    const { startOAuthFlow: loginWithMicrosoft } = useOAuth({ strategy: "oauth_microsoft" });

    const handleSignIn = () => {
        if (!email || !password) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        setLoading(true);
        setTimeout(() => {
            Alert.alert("Success", "Login successful!");
            navigation.replace("Home");
            setLoading(false);
        }, 1500);
    };

    const handleOAuthSignIn = async (loginMethod) => {
        setLoading(true);
        try {
            const result = await loginMethod(); // Start the OAuth flow

            if (result) {
                // Successfully logged in
                Alert.alert("Success", "Login successful!");
                navigation.replace("Home"); // Redirect to the Home screen
            } else {
                // Failed OAuth login
                Alert.alert("Error", "Login failed. Please try again.");
            }
        } catch (error) {
            // Handle error during OAuth login
            Alert.alert("Error", "An error occurred during login.");
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Background Image with transparency */}
            <ImageBackground 
                source={require('../assets/loginimage.jpg')} // Use require for local assets
                style={[styles.backgroundImage, { opacity: 0.9 }]} // Add opacity for transparency
                resizeMode="cover"
            >
                <Text style={styles.mainhead}>
                    <Text style={{ color: 'green' }}>Smart</Text>
                    <Text style={{ color: 'white' }}>Bid</Text>
                </Text>
            </ImageBackground>

            {/* Add enough space between SmartBid and the next texts */}
            <View style={styles.textContainer}>
                <Text style={styles.welcomeText}>Welcome Back</Text>
                <Text style={styles.subtitle}>Sign in to your account</Text>
            </View>

            <View style={styles.form}>
                {/* Google Sign-In */}
                <TouchableOpacity style={styles.oauthButton} onPress={() => handleOAuthSignIn(loginWithGoogle)}>
                    <Icon name="google" size={24} color="#DB4437" style={styles.oauthIcon} />
                    <Text style={styles.oauthText}>Sign in with Google</Text>
                </TouchableOpacity>

                {/* Apple Sign-In */}
                <TouchableOpacity style={styles.oauthButton} onPress={() => handleOAuthSignIn(loginWithApple)}>
                    <Icon name="apple" size={24} color="#000" style={styles.oauthIcon} />
                    <Text style={styles.oauthText}>Sign in with Apple</Text>
                </TouchableOpacity>

                {/* Microsoft Sign-In */}
                <TouchableOpacity style={styles.oauthButton} onPress={() => handleOAuthSignIn(loginWithMicrosoft)}>
                    <Icon name="windows" size={24} color="#00A4EF" style={styles.oauthIcon} />
                    <Text style={styles.oauthText}>Sign in with Microsoft</Text>
                </TouchableOpacity>

                {/* Sign-Up Link */}
                <View style={styles.signUpContainer}>
                    <Text style={styles.signUpText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                        <Text style={styles.signUpLink}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        padding: 20
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'flex-end',
        height: '90%', // Makes the image cover only the top half
        width: '110%',
        marginLeft: -20,
        top: -80
    },
    mainhead: {
        fontSize: 45,
        fontWeight: "bold",
        marginBottom: 8,
        alignItems: "center",
        flexDirection: "row",
        paddingLeft: "110",
        top: -360
    },
    textContainer: {
       top:-120,
        paddingLeft: 1,
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#333",
    },
    subtitle: {
        fontSize: 16,
        color: "#666666",
        marginBottom: 20,
    },
    form: {
        width: "100%",
    },
    oauthButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        marginBottom: 10,
        top:-90
    },
    oauthIcon: {
        marginRight: 10
    },
    oauthText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333"
    },
    signUpContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20
    },
    signUpText: {
        color: "#666666",
        fontSize: 14,
        top:-90
    },
    signUpLink: {
        color: "#5A45FF",
        fontWeight: "600",
        fontSize: 14,
        top:-90
    },
});
