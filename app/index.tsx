import React, { useMemo, useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import {
  Box,
  HStack,
  Input,
  InputField,
  Pressable,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { Screen } from "../src/components/Screen";
import { AppButton } from "../src/components/AppButton";
import { colors, radius } from "../src/theme/tokens";
import { useSchoolStore } from "../src/store/useSchoolStore";

export default function SchoolsScreen() {
  const router = useRouter();
  const schools = useSchoolStore((s) => s.schools);
  const removeSchool = useSchoolStore((s) => s.removeSchool);
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      schools.filter((school) =>
        `${school.name} ${school.address}`
          .toLowerCase()
          .includes(query.trim().toLowerCase()),
      ),
    [schools, query],
  );

  const confirmDelete = (id: string, name: string) =>
    Alert.alert("Excluir escola?", `“${name}” e suas turmas serão removidas.`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => void removeSchool(id),
      },
    ]);

  return (
    <Screen>
      <HStack alignItems="center" space="sm" mb={30}>
        <Box
          width={38}
          height={38}
          borderRadius={13}
          bg={colors.primary}
          alignItems="center"
          justifyContent="center"
        >
          <Text color="#fff" fontSize={13} fontWeight="$black">
            GE
          </Text>
        </Box>
        <Text
          fontSize={11}
          letterSpacing={1.4}
          color={colors.muted}
          fontWeight="$extrabold"
        >
          GESTÃO MUNICIPAL
        </Text>
      </HStack>

      <Text
        color={colors.primary}
        letterSpacing={2}
        fontSize={10}
        fontWeight="$black"
        mb={10}
      >
        PAINEL DE CONTROLE
      </Text>
      <Text
        fontSize={34}
        lineHeight={39}
        color={colors.text}
        fontWeight="$extrabold"
        letterSpacing={-1.1}
      >
        Suas escolas,{"\n"}em um só lugar.
      </Text>
      <Text
        color={colors.muted}
        fontSize={15}
        lineHeight={23}
        mt={12}
        maxWidth={420}
      >
        Acompanhe unidades escolares e organize as turmas do ano letivo.
      </Text>

      <HStack
        bg={colors.primaryDark}
        borderRadius={radius.lg}
        p={20}
        mt={25}
        mb={30}
        alignItems="center"
      >
        <VStack flex={1} space="xs">
          <Text color="#FFFFFF" fontSize={29} fontWeight="$extrabold">
            {schools.length}
          </Text>
          <Text color="#C6DED4" fontSize={11}>
            Escolas cadastradas
          </Text>
        </VStack>
        <Box height={44} width={1} bg="#477568" mx={18} />
        <VStack flex={1} space="xs">
          <Text color="#FFFFFF" fontSize={29} fontWeight="$extrabold">
            {schools.reduce((sum, school) => sum + school.classes.length, 0)}
          </Text>
          <Text color="#C6DED4" fontSize={11}>
            Turmas cadastradas
          </Text>
        </VStack>
      </HStack>

      <HStack alignItems="center" justifyContent="space-between" mb={14}>
        <VStack space="xs">
          <Text color={colors.text} fontSize={20} fontWeight="$extrabold">
            Unidades escolares
          </Text>
          <Text color={colors.muted} fontSize={12}>
            Gerencie os cadastros da rede
          </Text>
        </VStack>
        <Text color={colors.muted} fontSize={12} fontWeight="$bold">
          {filtered.length} itens
        </Text>
      </HStack>

      <Input
        bg="#fff"
        borderWidth={1}
        borderColor={colors.border}
        borderRadius={radius.md}
        height={50}
        mb={12}
        px={15}
      >
        <InputField
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar por escola ou endereço"
          placeholderTextColor="#89968F"
          color={colors.text}
          fontSize={15}
          accessibilityLabel="Buscar escolas"
        />
      </Input>
      <AppButton
        title="+  Adicionar escola"
        onPress={() => router.push("/school/form")}
        style={{ marginBottom: 18 }}
      />

      {filtered.length === 0 ? (
        <VStack
          alignItems="center"
          py={38}
          px={20}
          bg="#fff"
          borderRadius={radius.lg}
        >
          <Text fontSize={36} color={colors.primary}>
            ⌕
          </Text>
          <Text
            fontSize={16}
            fontWeight="$extrabold"
            color={colors.text}
            mt={10}
          >
            Nenhuma escola encontrada
          </Text>
          <Text color={colors.muted} textAlign="center" mt={7} lineHeight={20}>
            Tente outro termo ou cadastre uma nova unidade.
          </Text>
        </VStack>
      ) : (
        filtered.map((school) => (
          <Pressable
            key={school.id}
            onPress={() => router.push(`/school/${school.id}`)}
            $pressed={{ opacity: 0.85 }}
          >
            <HStack
              bg="#fff"
              borderRadius={radius.lg}
              p={15}
              mb={12}
              borderWidth={1}
              borderColor="#E8EDE9"
              alignItems="flex-start"
              space="md"
            >
              <Box
                width={43}
                height={43}
                borderRadius={14}
                bg={colors.accent}
                alignItems="center"
                justifyContent="center"
              >
                <Text
                  fontSize={25}
                  color={colors.primary}
                  fontWeight="$semibold"
                >
                  ⌂
                </Text>
              </Box>
              <VStack flex={1} pt={2}>
                <Text
                  fontSize={15}
                  color={colors.text}
                  fontWeight="$extrabold"
                  lineHeight={21}
                >
                  {school.name}
                </Text>
                <Text
                  color={colors.muted}
                  fontSize={12}
                  lineHeight={18}
                  mt={5}
                  numberOfLines={2}
                >
                  {school.address}
                </Text>
                <HStack alignItems="center" space="sm" mt={13} flexWrap="wrap">
                  <Box bg="#EEF6F1" borderRadius={20} px={10} py={5}>
                    <Text
                      fontSize={11}
                      fontWeight="$bold"
                      color={colors.primary}
                    >
                      {school.classes.length}{" "}
                      {school.classes.length === 1 ? "turma" : "turmas"}
                    </Text>
                  </Box>
                  <Text color={colors.primary} fontSize={12} fontWeight="$bold">
                    Ver detalhes ›
                  </Text>
                </HStack>
              </VStack>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Excluir ${school.name}`}
                onPress={() => confirmDelete(school.id, school.name)}
                p={5}
                hitSlop={8}
              >
                <Text color="#8C9992" letterSpacing={1}>
                  •••
                </Text>
              </Pressable>
            </HStack>
          </Pressable>
        ))
      )}
      <Text
        textAlign="center"
        color="#98A49D"
        fontSize={9}
        fontWeight="$extrabold"
        letterSpacing={1.6}
        mt={24}
        mb={6}
      >
        GESTÃO ESCOLAR · VERSÃO 1.0
      </Text>
    </Screen>
  );
}
