import React, { useMemo, useState } from "react";
import { Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Box, HStack, Pressable, Text, VStack } from "@gluestack-ui/themed";
import { Screen } from "../../src/components/Screen";
import { AppButton } from "../../src/components/AppButton";
import { colors, radius } from "../../src/theme/tokens";
import { useSchoolStore } from "../../src/store/useSchoolStore";
import type { Shift } from "../../src/domain/types";

const shifts: Shift[] = ["Manhã", "Tarde", "Noite", "Integral"];

export default function SchoolDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const school = useSchoolStore((s) =>
    s.schools.find((item) => item.id === id),
  );
  const removeClass = useSchoolStore((s) => s.removeClass);
  const [shift, setShift] = useState<Shift | "Todas">("Todas");
  const classes = useMemo(
    () =>
      (school?.classes ?? []).filter(
        (item) => shift === "Todas" || item.shift === shift,
      ),
    [school, shift],
  );
  if (!school)
    return (
      <Screen>
        <Text
          color={colors.text}
          fontSize={29}
          lineHeight={35}
          fontWeight="$extrabold"
        >
          Escola não encontrada
        </Text>
        <AppButton title="Voltar" onPress={() => router.replace("/")} />
      </Screen>
    );
  const confirmDelete = (classId: string, name: string) =>
    Alert.alert("Excluir turma?", `Deseja remover “${name}”?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => void removeClass(classId),
      },
    ]);
  return (
    <Screen>
      <Pressable onPress={() => router.back()} py={9} mb={24}>
        <Text color={colors.primary} fontWeight="$bold">
          ‹ Todas as escolas
        </Text>
      </Pressable>
      <Box
        width={54}
        height={54}
        borderRadius={18}
        bg={colors.accent}
        alignItems="center"
        justifyContent="center"
        mb={20}
      >
        <Text color={colors.primary} fontSize={30}>
          ⌂
        </Text>
      </Box>
      <Text
        color={colors.primary}
        fontSize={10}
        letterSpacing={1.6}
        fontWeight="$black"
        mb={8}
      >
        UNIDADE ESCOLAR
      </Text>
      <Text
        fontSize={29}
        lineHeight={35}
        fontWeight="$extrabold"
        letterSpacing={-0.8}
        color={colors.text}
      >
        {school.name}
      </Text>
      <Text color={colors.muted} fontSize={13} lineHeight={20} mt={9}>
        ⌖ {school.address}
      </Text>

      <HStack
        bg={colors.primaryDark}
        p={19}
        borderRadius={radius.lg}
        alignItems="center"
        mt={23}
        mb={18}
      >
        <VStack flex={1}>
          <Text color="#fff" fontSize={26} fontWeight="$extrabold">
            {school.classes.length}
          </Text>
          <Text color="#C6DED4" fontSize={11} mt={3}>
            Turmas cadastradas
          </Text>
        </VStack>
        <Box width={1} height={42} bg="#477568" mx={30} />
        <VStack flex={1}>
          <Text color="#fff" fontSize={26} fontWeight="$extrabold">
            {new Set(school.classes.map((item) => item.schoolYear)).size || 0}
          </Text>
          <Text color="#C6DED4" fontSize={11} mt={3}>
            Anos letivos
          </Text>
        </VStack>
      </HStack>

      <HStack space="sm" mb={30}>
        <Box flex={1}>
          <AppButton
            title="Editar escola"
            variant="secondary"
            onPress={() =>
              router.push({
                pathname: "/school/form",
                params: { id: school.id },
              })
            }
          />
        </Box>
        <Box flex={1}>
          <AppButton
            title="+ Nova turma"
            onPress={() =>
              router.push({
                pathname: "/school/class-form",
                params: { schoolId: school.id },
              })
            }
          />
        </Box>
      </HStack>

      <HStack alignItems="center" justifyContent="space-between" mb={14}>
        <Text fontSize={19} color={colors.text} fontWeight="$extrabold">
          Turmas da unidade
        </Text>
        <Text fontSize={12} color={colors.muted}>
          {classes.length} de {school.classes.length}
        </Text>
      </HStack>
      <HStack flexWrap="wrap" space="sm" mb={14}>
        {(["Todas", ...shifts] as const).map((item) => (
          <Pressable
            key={item}
            onPress={() => setShift(item)}
            borderRadius={30}
            px={13}
            py={8}
            bg={shift === item ? colors.primary : "#E9EEEA"}
          >
            <Text
              color={shift === item ? "#fff" : colors.muted}
              fontSize={11}
              fontWeight="$bold"
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </HStack>

      {classes.length === 0 ? (
        <VStack bg="#fff" p={25} borderRadius={18} alignItems="center">
          <Text fontWeight="$extrabold" color={colors.text} fontSize={15}>
            {school.classes.length
              ? "Nenhuma turma neste turno"
              : "Ainda não há turmas"}
          </Text>
          <Text
            textAlign="center"
            color={colors.muted}
            fontSize={12}
            lineHeight={18}
            mt={7}
          >
            Cadastre uma turma para começar a organizar o ano letivo.
          </Text>
        </VStack>
      ) : (
        classes.map((item) => (
          <HStack
            key={item.id}
            alignItems="center"
            space="sm"
            bg="#fff"
            p={13}
            borderRadius={16}
            borderWidth={1}
            borderColor={colors.border}
            mb={10}
          >
            <Box
              width={40}
              height={40}
              borderRadius={13}
              bg="#F1F5F2"
              alignItems="center"
              justifyContent="center"
            >
              <Text color={colors.primary} fontSize={20}>
                ▤
              </Text>
            </Box>
            <VStack flex={1}>
              <Text fontWeight="$extrabold" color={colors.text} fontSize={14}>
                {item.name}
              </Text>
              <Text color={colors.muted} fontSize={11} mt={5}>
                {item.shift} · Ano letivo {item.schoolYear}
              </Text>
            </VStack>
            <Pressable
              accessibilityLabel={`Editar ${item.name}`}
              onPress={() =>
                router.push({
                  pathname: "/school/class-form",
                  params: { schoolId: school.id, classId: item.id },
                })
              }
              p={7}
            >
              <Text color={colors.primary} fontSize={12} fontWeight="$bold">
                Editar
              </Text>
            </Pressable>
            <Pressable
              accessibilityLabel={`Excluir ${item.name}`}
              onPress={() => confirmDelete(item.id, item.name)}
              width={28}
              height={28}
              borderRadius={10}
              bg={colors.dangerBg}
              alignItems="center"
              justifyContent="center"
            >
              <Text color={colors.danger} fontSize={20}>
                ×
              </Text>
            </Pressable>
          </HStack>
        ))
      )}
    </Screen>
  );
}
