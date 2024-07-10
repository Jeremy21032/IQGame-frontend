import React, { useEffect, useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useAuth } from "../context/AuthContext";
import globalStyles from "../styles/global";
import { validate } from "../utils/validations";
import { REGISTER } from "../services/services";

export default function RegisterScreen({ navigation }) {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const validatePassword = () => {
      if (password !== confirmPassword) {
        setErrors((prevErrors) => ({ ...prevErrors, password: "Las contraseñas no son iguales" }));
      } else {
        setErrors((prevErrors) => {
          const { password, ...rest } = prevErrors;
          return rest;
        });
      }
    };
    validatePassword();
  }, [password, confirmPassword]);

  const handleRegister = async () => {
    if (!validate(username, email, password, setErrors, false)) return;

    try {
      const data = await REGISTER(username, email, password);
      if (data.error) {
        throw new Error(data.message || "Something went wrong");
      }
//console.log("Data: ", data)
      login(data.user); // Almacena el usuario en el contexto
      navigation.navigate("Home");
    } catch (error) {
      console.error("Registration Error: ", error);
      Alert.alert("Registration Error", error.message);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text variant="headlineLarge">Register</Text>
      <TextInput
        label="Username"
        mode="outlined"
        style={[errors.username && globalStyles.errorInput]}
        value={username}
        onChangeText={setUsername}
        error={!!errors.username}
      />
      {errors.username && (
        <Text style={styles.errorText}>{errors.username}</Text>
      )}
      <TextInput
        label="Email"
        mode="outlined"
        style={[errors.email && globalStyles.errorInput]}
        value={email}
        maxLength={50}
        onChangeText={setEmail}
        error={!!errors.email}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      <TextInput
        label="Password"
        mode="outlined"
        style={[errors.password && globalStyles.errorInput]}
        value={password}
        secureTextEntry={!showPassword}
        onChangeText={setPassword}
        right={
          <TextInput.Icon
            icon={showPassword ? "eye-off" : "eye"}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        error={!!errors.password}
      />
      <TextInput
        label="Confirm Password"
        mode="outlined"
        style={[errors.password && globalStyles.errorInput]}
        value={confirmPassword}
        secureTextEntry={!showPassword}
        onChangeText={setConfirmPassword}
        right={
          <TextInput.Icon
            icon={showPassword ? "eye-off" : "eye"}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        error={!!errors.password}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}
      <Button mode="contained" onPress={handleRegister} style={styles.button}>
        Register
      </Button>
      <Button mode="text" onPress={() => navigation.navigate("Login")}>
        Back to Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});
