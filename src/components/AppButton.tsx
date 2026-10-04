import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";
import { colors, radius } from "../theme/tokens";

export function AppButton({
  title,
  onPress,
  variant = "primary",
  loading = false,
  style,
}: {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  loading?: boolean;
  style?: ViewStyle;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={loading}
      style={({ pressed }) => [
        styles.button,
        variant === "primary" && styles.primary,
        variant === "secondary" && styles.secondary,
        variant === "danger" && styles.danger,
        variant === "ghost" && styles.ghost,
        pressed && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "primary" ? "#fff" : colors.primary}
        />
      ) : (
        <Text
          style={[
            styles.label,
            variant !== "primary" && styles.labelDark,
            variant === "danger" && styles.labelDanger,
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    borderRadius: radius.md,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.accent },
  danger: { backgroundColor: colors.dangerBg },
  ghost: { backgroundColor: "transparent" },
  label: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
  labelDark: { color: colors.primaryDark },
  labelDanger: { color: colors.danger },
  pressed: { opacity: 0.78 },
});
