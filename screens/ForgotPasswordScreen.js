import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import globalStyles from "../styles/global";
import { REQUEST_RESET_PASSWORD, RESET_PASSWORD } from "../services/services";

export default function ForgotPasswordScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetToken, setResetToken] = useState("");

  const requestReset = async () => {
    console.log("Username: ",username)
    try {
      const response = await REQUEST_RESET_PASSWORD(username);
      if (response.message) {
        Alert.alert("Success", response.message);
        setShowResetForm(true);
      } else {
        Alert.alert("Error", "User not found");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const resetPassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      const response = await RESET_PASSWORD(resetToken, newPassword);
      if (response.message) {
        Alert.alert("Success", response.message);
        navigation.navigate("Login");
      } else {
        Alert.alert("Error", "Failed to reset password");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={globalStyles.container}>
      {!showResetForm ? (
        <>
          <Text variant="headlineLarge">Forgot Password</Text>
          <TextInput
            label="Email"
            mode="outlined"
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
          <Button mode="contained" onPress={()=>requestReset()} style={styles.button}>
            Request Reset
          </Button>
        </>
      ) : (
        <>
          <Text variant="headlineLarge">Reset Password</Text>
          <TextInput
            label="Reset Token"
            mode="outlined"
            style={styles.input}
            value={resetToken}
            onChangeText={setResetToken}
          />
          <TextInput
            label="New Password"
            mode="outlined"
            style={styles.input}
            value={newPassword}
            secureTextEntry
            onChangeText={setNewPassword}
          />
          <TextInput
            label="Confirm Password"
            mode="outlined"
            style={styles.input}
            value={confirmPassword}
            secureTextEntry
            onChangeText={setConfirmPassword}
          />
          <Button mode="contained" onPress={resetPassword} style={styles.button}>
            Reset Password
          </Button>
        </>
      )}
      <Button mode="text" onPress={() => navigation.navigate("Login")}>
        Back to Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});
