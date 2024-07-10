import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { TextInput, Button, Text, Avatar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import globalStyles from "../styles/global";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { API_URL } from "@env";
import { UPDATE_PROFILE } from "../services/services";

const ProfileScreen = () => {
  const { user, logout, updateUser } = useAuth(); // Incluye updateUser para actualizar el contexto del usuario
  const [firstName, setFirstName] = useState(user?.user_firstName || "");
  const [lastName, setLastName] = useState(user?.user_lastName || "");
  const [profileImage, setProfileImage] = useState(user?.user_image || null);
  const [imageUri, setImageUri] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);

  useEffect(() => {
    console.info("USER-------------------------------------------", user);
  }, [user, profileImage]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    if (!result.canceled) {
      setImageBase64(result.base64); // Guardar base64
      setImageUri(result.assets[0].uri); // Usa result.assets[0].uri directamente
      setProfileImage(result.assets[0].uri); // Actualiza el avatar con la imagen seleccionada
    }
  };

  const updateProfile = async () => {
    if (!firstName || !lastName) {
      Alert.alert("Validation Error", "First Name and Last Name are required.");
      return;
    }

    try {
      const response = await UPDATE_PROFILE(firstName, lastName, imageBase64, user.user_id);
      console.warn("-----------------------------------RESPUESTA: ----------------------------------------------------");
      console.warn(response);
      console.warn("--------------------------------------------------------------------------------------------------");
      //setProfileImage(`data:image/png;base64,${response.profileImageUrl}`); // Actualiza la imagen del perfil con base64
      Alert.alert("Profile Updated", response.message);
    } catch (error) {
      console.error("Error: ",error)
      Alert.alert("Profile Update Error", error.message);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text variant="headlineLarge">Profile</Text>
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        <Avatar.Image
          size={100}
          source={imageUri ? { uri: imageUri } : profileImage ? { uri: `${API_URL}${profileImage}` } : require("../assets/default_profile.png")}
        />
      </TouchableOpacity>
      <TextInput
        label="Email"
        mode="outlined"
        style={styles.input}
        value={user?.email || ""}
        disabled
      />
      <TextInput
        label="Username"
        mode="outlined"
        style={styles.input}
        value={user?.username || ""}
        disabled
      />
      <TextInput
        label="First Name"
        mode="outlined"
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        label="Last Name"
        mode="outlined"
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
      />

      <Button mode="contained" onPress={updateProfile} style={styles.button}>
        Update Profile
      </Button>
      <Button mode="outlined" onPress={logout} style={styles.logoutButton}>
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  logoutButton: {
    marginTop: 10,
    borderColor: "red",
    borderWidth: 1,
  },
  imagePicker: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});

export default ProfileScreen;
