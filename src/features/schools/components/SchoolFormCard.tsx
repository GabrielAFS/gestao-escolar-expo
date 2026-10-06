import React from "react";
import { HStack, Pressable, Text, VStack } from "@gluestack-ui/themed";
import { Field } from "../../../components/Field";
import { AppButton } from "../../../components/AppButton";
import type { ClassErrors, Shift } from "../../../domain/types";
import { colors, radius } from "../../../theme/tokens";
import { SHIFTS } from "../../../constants/school";

export function SchoolFormCard({
  name,
  address,
  onNameChange,
  onAddressChange,
  errors,
  onSubmit,
  onCancel,
  saving,
  isEditing,
}: {
  name: string;
  address: string;
  onNameChange: (value: string) => void;
  onAddressChange: (value: string) => void;
  errors: { name: string; address: string };
  onSubmit: () => void;
  onCancel: () => void;
  saving: boolean;
  isEditing: boolean;
}) {
  return (
    <VStack
      bg="#fff"
      borderRadius={20}
      p={18}
      borderColor={colors.border}
      borderWidth={1}
    >
      <Field
        label="Nome da escola *"
        value={name}
        onChangeText={onNameChange}
        placeholder="Ex.: Escola Municipal Aurora"
        autoCapitalize="words"
        error={errors.name ? errors.name : undefined}
      />
      <Field
        label="Endereço completo *"
        value={address}
        onChangeText={onAddressChange}
        placeholder="Rua, número, bairro"
        autoCapitalize="sentences"
        error={errors.address ? errors.address : undefined}
      />
      <AppButton
        title={isEditing ? "Salvar alterações" : "Cadastrar escola"}
        onPress={onSubmit}
        loading={saving}
        style={{ marginTop: 12 }}
      />
      <AppButton
        title="Cancelar"
        onPress={onCancel}
        variant="ghost"
        style={{ marginTop: 8 }}
      />
    </VStack>
  );
}

export function ClassFormCard({
  name,
  shift,
  year,
  errors,
  globalError,
  onNameChange,
  onShiftChange,
  onYearChange,
  onSubmit,
  onCancel,
  saving,
  isEditing,
}: {
  name: string;
  shift: Shift;
  year: string;
  errors: ClassErrors;
  globalError: string | null;
  onNameChange: (value: string) => void;
  onShiftChange: (value: Shift) => void;
  onYearChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  saving: boolean;
  isEditing: boolean;
}) {
  return (
    <VStack
      bg="#fff"
      borderRadius={20}
      p={18}
      borderColor={colors.border}
      borderWidth={1}
    >
      <Field
        label="Nome da turma *"
        value={name}
        onChangeText={onNameChange}
        placeholder="Ex.: 2º Ano A"
        autoCapitalize="words"
        error={errors.name ? errors.name : undefined}
      />
      <Text fontSize={13} fontWeight="$bold" color={colors.text} mb={8}>
        Turno *
      </Text>
      <HStack flexWrap="wrap" space="sm" mb={20}>
        {SHIFTS.map((item) => (
          <Pressable
            key={item}
            onPress={() => onShiftChange(item)}
            borderRadius={radius.md}
            px={13}
            py={10}
            bg={shift === item ? colors.accent : "#EEF2EF"}
            borderWidth={1}
            borderColor={shift === item ? colors.primary : "transparent"}
          >
            <Text
              color={shift === item ? colors.primary : colors.muted}
              fontSize={12}
              fontWeight="$bold"
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </HStack>
      <Field
        label="Ano letivo *"
        value={year}
        onChangeText={onYearChange}
        placeholder="2026"
        keyboardType="number-pad"
        maxLength={4}
        error={errors.schoolYear ? errors.schoolYear : undefined}
      />
      {globalError ? (
        <Text color={colors.danger} mb={12} fontSize={13}>
          {globalError}
        </Text>
      ) : null}
      <AppButton
        title={isEditing ? "Salvar alterações" : "Cadastrar turma"}
        onPress={onSubmit}
        loading={saving}
      />
      <AppButton
        title="Cancelar"
        onPress={onCancel}
        variant="ghost"
        style={{ marginTop: 8 }}
      />
    </VStack>
  );
}
