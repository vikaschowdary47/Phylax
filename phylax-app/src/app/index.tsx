import { router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SPLASH_DURATION_MS = 5000;

export default function SplashRoute() {
  useEffect(() => {
    void SplashScreen.hideAsync();
    const timeout = setTimeout(
      () => router.replace("/welcome"),
      SPLASH_DURATION_MS,
    );

    return () => clearTimeout(timeout);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.logo}>
        <View style={styles.logoMark} />
        <Text style={styles.wordmark}>Phylax</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#183B32",
  },
  logo: {
    alignItems: "center",
    gap: 12,
  },
  logoMark: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#D5EB78",
  },
  wordmark: {
    color: "#F5F6EE",
    fontFamily: "serif",
    fontSize: 42,
    fontWeight: "600",
  },
});
