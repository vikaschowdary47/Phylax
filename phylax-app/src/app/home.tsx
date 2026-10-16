import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Sample values until heart-rate hardware is connected.
const HEART_RATE_SAMPLES = [
  22, 30, 26, 38, 32, 46, 28, 39, 35, 50, 41, 30, 44, 36, 54, 40, 34, 48,
];

export default function HomeScreen() {
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.wordmark}>PHYLAX</Text>
        <View
          accessible
          accessibilityLabel="User profile"
          style={styles.profileIcon}
        >
          <View style={styles.profileHead} />
          <View style={styles.profileShoulders} />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.page}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.greeting}>
          <Text style={styles.kicker}>YOUR DAILY CHECK-IN</Text>
          <Text style={styles.title}>How are you{"\n"}doing today?</Text>
        </View>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>Device status</Text>
          <View style={styles.connectedLabel}>
            <View style={styles.connectedDot} />
            <Text style={styles.connectedText}>READY</Text>
          </View>
        </View>

        <View style={styles.heartCard}>
          <View style={styles.heartTopRow}>
            <Text style={styles.cardLabel}>HEART RATE</Text>
            <Text style={styles.sampleLabel}>SAMPLE</Text>
          </View>
          <View style={styles.heartReading}>
            <Text style={styles.bpm}>72</Text>
            <Text style={styles.bpmUnit}>BPM</Text>
            <View style={styles.heartGlyph}>
              <Text style={styles.heartGlyphText}>♥</Text>
            </View>
          </View>
          <View
            accessible
            accessibilityLabel="Sample heart rate graph, between 58 and 82 beats per minute"
            style={styles.chart}
          >
            {HEART_RATE_SAMPLES.map((height, index) => (
              <View
                key={`${height}-${index}`}
                style={[
                  styles.chartBar,
                  {
                    height,
                    backgroundColor: index === 14 ? "#D05D48" : "#C8D8C7",
                  },
                ]}
              />
            ))}
          </View>
          <View style={styles.chartLabels}>
            <Text style={styles.chartLabel}>6 AM</Text>
            <Text style={styles.chartLabel}>NOW</Text>
          </View>
        </View>

        <View style={styles.deviceControls}>
          <DeviceToggle
            label="Camera"
            value={cameraEnabled}
            onValueChange={setCameraEnabled}
          />
          <View style={styles.divider} />
          <DeviceToggle
            label="Audio"
            value={audioEnabled}
            onValueChange={setAudioEnabled}
          />
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => router.push("/alert")}
          style={({ pressed }) => [
            styles.alertButton,
            pressed && styles.alertPressed,
          ]}
        >
          <Text style={styles.alertButtonText}>Simulate trigger</Text>
          <Text style={styles.alertArrow}>↗</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

type DeviceToggleProps = {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

function DeviceToggle({ label, value, onValueChange }: DeviceToggleProps) {
  return (
    <View style={styles.deviceRow}>
      <View style={styles.deviceInfo}>
        <Text style={styles.deviceName}>{label}</Text>
        <Text style={styles.deviceState}>{value ? "On" : "Off"}</Text>
      </View>
      <Switch
        accessibilityLabel={`${label} ${value ? "on" : "off"}`}
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#D7DDD4", true: "#85A66A" }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F5EE",
  },
  header: {
    height: 58,
    marginHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  wordmark: {
    color: "#183B32",
    fontSize: 14,
    fontWeight: "800",
  },
  profileIcon: {
    position: "absolute",
    right: 0,
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#CBD4C9",
    borderRadius: 19,
  },
  profileHead: {
    width: 8,
    height: 8,
    marginTop: 2,
    borderRadius: 4,
    backgroundColor: "#183B32",
  },
  profileShoulders: {
    width: 17,
    height: 9,
    marginTop: 2,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    backgroundColor: "#183B32",
  },
  page: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
    gap: 18,
  },
  greeting: {
    gap: 10,
    marginBottom: 4,
  },
  kicker: {
    color: "#63776A",
    fontSize: 11,
    fontWeight: "700",
  },
  title: {
    color: "#183B32",
    fontFamily: "serif",
    fontSize: 36,
    lineHeight: 41,
    fontWeight: "600",
  },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    color: "#263A32",
    fontSize: 16,
    fontWeight: "700",
  },
  connectedLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  connectedDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#6B9B5E",
  },
  connectedText: {
    color: "#63776A",
    fontSize: 10,
    fontWeight: "700",
  },
  heartCard: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
  },
  heartTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardLabel: {
    color: "#52675D",
    fontSize: 11,
    fontWeight: "700",
  },
  sampleLabel: {
    color: "#B15A49",
    fontSize: 10,
    fontWeight: "700",
  },
  heartReading: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 8,
    marginBottom: 16,
  },
  bpm: {
    color: "#183B32",
    fontSize: 38,
    fontWeight: "700",
    lineHeight: 42,
    fontVariant: ["tabular-nums"],
  },
  bpmUnit: {
    marginLeft: 7,
    marginBottom: 5,
    color: "#63776A",
    fontSize: 12,
    fontWeight: "700",
  },
  heartGlyph: {
    marginLeft: "auto",
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: "#FAEAE5",
  },
  heartGlyphText: {
    color: "#D05D48",
    fontSize: 16,
  },
  chart: {
    height: 58,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#E8ECE5",
  },
  chartBar: {
    flex: 1,
    minWidth: 4,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  chartLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  chartLabel: {
    color: "#7B8980",
    fontSize: 10,
  },
  deviceControls: {
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
  },
  deviceRow: {
    minHeight: 62,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  deviceInfo: {
    gap: 3,
  },
  deviceName: {
    color: "#263A32",
    fontSize: 15,
    fontWeight: "600",
  },
  deviceState: {
    color: "#7B8980",
    fontSize: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#E8ECE5",
  },
  alertButton: {
    minHeight: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#D05D48",
  },
  alertPressed: {
    backgroundColor: "#B74A38",
  },
  alertButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  alertArrow: {
    color: "#FFFFFF",
    fontSize: 20,
  },
});
