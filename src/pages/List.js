import React, { useState, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  AsyncStorage,
  ScrollView,
  TouchableOpacity,
  Text
} from "react-native";

import SpotList from "../componets/SpotList";

import logo from "../assets/logo.png";

export default function List({ navigation }) {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("techs").then(storagedTech => {
      const techsArray = storagedTech.split(",").map(tech => tech.trim());
      setTechs(techsArray);
    });
  }, []);

  async function handleBack() {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("techs");

    navigation.navigate("Login");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <ScrollView>
        {techs.map(tech => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
      <TouchableOpacity onPress={handleBack} style={styles.button}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 35
  },
  button: {
    height: 42,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15
  }
});
