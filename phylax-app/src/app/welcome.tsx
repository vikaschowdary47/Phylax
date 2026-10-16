import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <View style={styles.brandBlock}>
          <View style={styles.logoMark} />
          <Text style={styles.wordmark}>Phylax</Text>
          <Text style={styles.subtitle}>Your safety, at a glance.</Text>
        </View>
        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.replace("/home")}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.primaryButtonText}>Log in</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.replace("/home")}
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.secondaryButtonText}>Sign up</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F5EE",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 28,
    paddingTop: 56,
    paddingBottom: 36,
  },
  brandBlock: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },
  logoMark: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#D05D48",
  },
  wordmark: {
    color: "#183B32",
    fontFamily: "serif",
    fontSize: 44,
    fontWeight: "600",
  },
  subtitle: {
    color: "#5C6C62",
    fontSize: 16,
  },
  actions: {
    gap: 12,
  },
  primaryButton: {
    minHeight: 58,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#183B32",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
  secondaryButton: {
    minHeight: 58,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#AAB7AC",
    borderRadius: 8,
    backgroundColor: "transparent",
  },
  secondaryButtonText: {
    color: "#183B32",
    fontSize: 17,
    fontWeight: "700",
  },
  pressed: {
    opacity: 0.78,
  },
});
