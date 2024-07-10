import { API_URL } from "./config";
import { useAuth } from "../context/AuthContext";
import { Alert } from "react-native";

export const LOGIN = async (username, password) => {
  console.log("DATA DE ENTRADA A LOGIN: ", username, password);
  console.log(API_URL);
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    Alert.alert("Login Error", error.message);
  }
};
export const REGISTER = async (username, email, password) => {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data; // Retorna los datos directamente
  } catch (error) {
    Alert.alert("Registration Error", error.message);
    return { error: true, message: error.message };
  }
};

export const GET_GAMES = async () => {
  try {
    const response = await fetch(`${API_URL}/games/get-games`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    const data = await response.json();
    console.log("Respuesta de getgames: ", data);
    return data;
  } catch (error) {
    Alert.alert("Get Games Error", error.message);
  }
};
export const UPDATE_PROFILE = async (
  firstName,
  lastName,
  imageBase64,
  userId
) => {
  console.warn({ firstName:firstName, lastName:lastName, imageBase64:imageBase64, userId:userId });
  if (!firstName || !lastName || !userId) {
    Alert.alert(
      "Validation Error",
      "First Name, Last Name, and User ID are required."
    );
    return;
  }

  const payload = {
    name: firstName,
    lastname: lastName,
    user_id: userId,
    profileImage: imageBase64,
  };

  try {
    const response = await fetch(`${API_URL}/users/update-profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    const data = response;
    console.success("Response", response);
    return data;
  } catch (error) {
    Alert.alert("Profile Update Error", error.message);
  }
};

export const SAVE_SCORE = async (user_id, points) => {
  try {
    await fetch(`${API_URL}/games/score`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
        points: points,
      }),
    });
    // Aquí puedes redirigir al usuario o realizar otras acciones
  } catch (error) {
    console.error("Error saving score:", error);
  }
};
export const GET_USER_SCORE = async (user_id) => {
  console.log(user_id);
  try {
    const response = await fetch(`${API_URL}/games/get-scores/${user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Response: ", response);
    let data = {};
    if (!response.ok) {
      const errorData = await response.json();
      data = { message: "Aun no tienes registrado puntaje" };
    } else {
      data = await response.json();
    }

    console.log("Data: ", data);

    return data;
  } catch (error) {
    Alert.alert("Get user Score Error", error.message);
  }
};

export const GET_ALL_SCORES = async () => {
  try {
    const response = await fetch(`${API_URL}/games/get-all-scores`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    Alert.alert("Get user Score Error", error.message);
  }
};
