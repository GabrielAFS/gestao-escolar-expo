import React from "react";
import { Button, ButtonText, Spinner } from "@gluestack-ui/themed";
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
  style?: object;
}) {
  const backgroundColor =
    variant === "primary"
      ? colors.primary
      : variant === "secondary"
        ? colors.accent
        : variant === "danger"
          ? colors.dangerBg
          : "transparent";
  const textColor =
    variant === "primary"
      ? "#FFFFFF"
      : variant === "danger"
        ? colors.danger
        : colors.primaryDark;

  return (
    <Button
      accessibilityRole="button"
      onPress={onPress}
      isDisabled={loading}
      minHeight={48}
      borderRadius={radius.md}
      px={18}
      bg={backgroundColor}
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      opacity={loading ? 0.65 : 1}
      $pressed={{ opacity: 0.78 }}
      style={style}
    >
      {loading ? (
        <Spinner color={variant === "primary" ? "#FFFFFF" : colors.primary} />
      ) : (
        <ButtonText color={textColor} fontSize={15} fontWeight="$bold">
          {title}
        </ButtonText>
      )}
    </Button>
  );
}
