import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text, ActivityIndicator } from "react-native-paper";
import { validate } from "../utils/validations";
import globalStyles from "../styles/global";
import { useAuth } from "../context/AuthContext";
import { LOGIN } from "../services/services";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Estado de carga
  const { login } = useAuth();

  const loginUser = async () => {
    if (!validate(username, "", password, setErrors, true)) return;
    try {
      setLoading(true); // Activar loader
      const data = await LOGIN(username, password);
      if (data.isAuthenticated) {
        login(data.user);
        navigation.navigate("Home");
      } else {
        Alert.alert("Login Error", "Error al iniciar sesión");
      }
    } catch (error) {
      Alert.alert("Login Error", error.message);
    } finally {
      setLoading(false); // Desactivar loader
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text variant="headlineLarge">Login</Text>
      <TextInput
        label="Username"
        mode="outlined"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        error={!!errors.username}
      />
      {errors.username && (
        <Text style={styles.errorText}>{errors.username}</Text>
      )}

      <TextInput
        label="Password"
        mode="outlined"
        style={styles.input}
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
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}

      <Button mode="contained" onPress={loginUser} style={styles.button} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
      {loading && <ActivityIndicator animating={true} size="large" style={styles.loader} />}
      <Button mode="text" onPress={() => navigation.navigate("Register")}>
        Register
      </Button>
      <Button mode="text" onPress={() => navigation.navigate("ForgotPassword")}>
        Olvidaste tu contraseña? Recuperalo aquí
      </Button>
      <Text style={styles.version}> Version 1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  loader: {
    marginTop: 20,
  },
  version: {
    color: "#c4c4c4",
    alignSelf: "center",
    marginTop: 20,
  },
});
