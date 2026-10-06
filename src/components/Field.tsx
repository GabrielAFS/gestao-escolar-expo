import React from "react";
import { TextInputProps } from "react-native";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { colors, radius } from "../theme/tokens";

export function Field({
  label,
  error,
  ...props
}: TextInputProps & { label: string; error?: string }) {
  return (
    <FormControl isInvalid={Boolean(error)} mb="$4">
      <VStack space="xs">
        <FormControlLabel>
          <FormControlLabelText
            fontSize={13}
            fontWeight="$bold"
            color={colors.text}
          >
            {label}
          </FormControlLabelText>
        </FormControlLabel>
        <Input
          minHeight={50}
          bg={colors.surface}
          borderWidth={1}
          borderColor={error ? colors.danger : colors.border}
          borderRadius={radius.md}
          px={14}
        >
          <InputField
            {...props}
            placeholderTextColor="#9AA69F"
            color={colors.text}
            fontSize={15}
            {...(props.multiline
              ? { minHeight: 78, py: 13, textAlignVertical: "top" as const }
              : { py: 0 })}
          />
        </Input>
        {error ? (
          <Text color={colors.danger} fontSize={12}>
            {error}
          </Text>
        ) : null}
      </VStack>
    </FormControl>
  );
}
