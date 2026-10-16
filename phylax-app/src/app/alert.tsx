import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const COUNTDOWN_SECONDS = 20;

// Replace this placeholder with a backend request when one is available.
function sendAlert() {
  console.log("Alert sent (placeholder; no backend configured).");
}

export default function AlertScreen() {
  const [secondsRemaining, setSecondsRemaining] = useState(COUNTDOWN_SECONDS);

  useEffect(() => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    const interval = setInterval(() => {
      setSecondsRemaining((remaining) => {
        if (remaining <= 1) {
          clearInterval(interval);
          return 0;
        }
        return remaining - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (secondsRemaining === 0) {
      sendAlert();
    }
  }, [secondsRemaining]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Text style={styles.eyebrow}>SAFETY CHECK</Text>
        <View style={styles.prompt}>
          <Text style={styles.title}>Are you okay?</Text>
          <Text style={styles.caption}>Time remaining</Text>
          <Text style={styles.countdown} accessibilityLiveRegion="polite">
            {secondsRemaining}
          </Text>
          <Text style={styles.seconds}>seconds</Text>
          {secondsRemaining === 0 && (
            <Text style={styles.alertSent}>Alert sent</Text>
          )}
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.replace("/home")}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>I&apos;m okay</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F1F5F0",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 28,
    paddingTop: 40,
    paddingBottom: 32,
  },
  eyebrow: {
    color: "#49675B",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.2,
  },
  prompt: {
    alignItems: "center",
    gap: 8,
  },
  title: {
    marginBottom: 20,
    color: "#19392F",
    fontSize: 36,
    fontWeight: "700",
    lineHeight: 42,
    textAlign: "center",
  },
  caption: {
    color: "#52675F",
    fontSize: 16,
  },
  countdown: {
    color: "#19392F",
    fontSize: 96,
    fontWeight: "700",
    lineHeight: 104,
    fontVariant: ["tabular-nums"],
  },
  seconds: {
    color: "#52675F",
    fontSize: 16,
  },
  alertSent: {
    marginTop: 20,
    color: "#B4232D",
    fontSize: 20,
    fontWeight: "700",
  },
  button: {
    minHeight: 68,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "#24734F",
  },
  buttonPressed: {
    backgroundColor: "#1B5C3E",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "700",
  },
});
