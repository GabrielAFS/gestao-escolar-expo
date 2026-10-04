import React, { useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";
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
          .includes(query.trim().toLowerCase())
      ),
    [schools, query]
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
      <View style={styles.topline}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>GE</Text>
        </View>
        <Text style={styles.toplabel}>GESTÃO MUNICIPAL</Text>
        <View style={{ flex: 1 }} />
        <View style={styles.live}>
          <View style={styles.dot} />
          <Text style={styles.liveText}>Offline pronto</Text>
        </View>
      </View>
      <Text style={styles.eyebrow}>PAINEL DE CONTROLE</Text>
      <Text style={styles.title}>Suas escolas,{"\n"}em um só lugar.</Text>
      <Text style={styles.subtitle}>
        Acompanhe unidades escolares e organize as turmas do ano letivo.
      </Text>
      <View style={styles.metrics}>
        <View style={styles.metric}>
          <Text style={styles.metricNumber}>{schools.length}</Text>
          <Text style={styles.metricLabel}>Escolas cadastradas</Text>
        </View>
        <View style={styles.metricDivider} />
        <View style={styles.metric}>
          <Text style={styles.metricNumber}>
            {schools.reduce((sum, school) => sum + school.classes.length, 0)}
          </Text>
          <Text style={styles.metricLabel}>Turmas cadastradas</Text>
        </View>
      </View>
      <View style={styles.sectionHeading}>
        <View>
          <Text style={styles.sectionTitle}>Unidades escolares</Text>
          <Text style={styles.sectionHint}>Gerencie os cadastros da rede</Text>
        </View>
        <Text style={styles.count}>{filtered.length} itens</Text>
      </View>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder='Buscar por escola ou endereço'
        placeholderTextColor='#89968F'
        style={styles.search}
        accessibilityLabel='Buscar escolas'
      />
      <AppButton
        title='+  Adicionar escola'
        onPress={() => router.push("/school/form")}
        style={{ marginBottom: 18 }}
      />
      {filtered.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>⌕</Text>
          <Text style={styles.emptyTitle}>Nenhuma escola encontrada</Text>
          <Text style={styles.emptyText}>
            Tente outro termo ou cadastre uma nova unidade.
          </Text>
        </View>
      ) : (
        filtered.map((school) => (
          <Pressable
            key={school.id}
            onPress={() => router.push(`/school/${school.id}`)}
            style={({ pressed }) => [
              styles.schoolCard,
              pressed && { opacity: 0.85 },
            ]}
          >
            <View style={styles.schoolIcon}>
              <Text style={styles.schoolIconText}>⌂</Text>
            </View>
            <View style={styles.schoolInfo}>
              <Text style={styles.schoolName}>{school.name}</Text>
              <Text style={styles.address} numberOfLines={2}>
                {school.address}
              </Text>
              <View style={styles.cardFooter}>
                <View style={styles.pill}>
                  <Text style={styles.pillText}>
                    {school.classes.length}{" "}
                    {school.classes.length === 1 ? "turma" : "turmas"}
                  </Text>
                </View>
                <Text style={styles.openText}>Ver detalhes ›</Text>
              </View>
            </View>
            <Pressable
              accessibilityRole='button'
              accessibilityLabel={`Excluir ${school.name}`}
              onPress={() => confirmDelete(school.id, school.name)}
              hitSlop={8}
              style={styles.more}
            >
              <Text style={styles.moreText}>•••</Text>
            </Pressable>
          </Pressable>
        ))
      )}
      <Text style={styles.footer}>GESTÃO ESCOLAR · VERSÃO 1.0</Text>
    </Screen>
  );
}
const styles = StyleSheet.create({
  topline: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginBottom: 30,
  },
  logo: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: { color: "#fff", fontSize: 13, fontWeight: "900" },
  toplabel: {
    fontSize: 11,
    letterSpacing: 1.4,
    color: colors.muted,
    fontWeight: "800",
  },
  live: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    backgroundColor: "#E5F4EB",
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#2D9B64" },
  liveText: { fontSize: 10, fontWeight: "700", color: "#26764F" },
  eyebrow: {
    color: colors.primary,
    letterSpacing: 2,
    fontSize: 10,
    fontWeight: "900",
    marginBottom: 10,
  },
  title: {
    fontSize: 34,
    lineHeight: 39,
    color: colors.text,
    fontWeight: "800",
    letterSpacing: -1.1,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 23,
    marginTop: 12,
    maxWidth: 420,
  },
  metrics: {
    flexDirection: "row",
    backgroundColor: colors.primaryDark,
    borderRadius: radius.lg,
    padding: 20,
    marginTop: 25,
    marginBottom: 30,
    alignItems: "center",
  },
  metric: { flex: 1, gap: 4 },
  metricNumber: { color: "#FFFFFF", fontSize: 29, fontWeight: "800" },
  metricLabel: { color: "#C6DED4", fontSize: 11 },
  metricDivider: {
    height: 44,
    width: 1,
    backgroundColor: "#477568",
    marginHorizontal: 18,
  },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  sectionTitle: { color: colors.text, fontSize: 20, fontWeight: "800" },
  sectionHint: { color: colors.muted, fontSize: 12, marginTop: 4 },
  count: { color: colors.muted, fontSize: 12, fontWeight: "700" },
  search: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    height: 50,
    paddingHorizontal: 15,
    color: colors.text,
    marginBottom: 12,
  },
  schoolCard: {
    backgroundColor: "#fff",
    borderRadius: radius.lg,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E8EDE9",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  schoolIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  schoolIconText: { fontSize: 25, color: colors.primary, fontWeight: "600" },
  schoolInfo: { flex: 1, paddingTop: 2 },
  schoolName: {
    fontSize: 15,
    color: colors.text,
    fontWeight: "800",
    lineHeight: 21,
  },
  address: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 5 },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 13,
    flexWrap: "wrap",
  },
  pill: {
    backgroundColor: "#EEF6F1",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  pillText: { fontSize: 11, fontWeight: "700", color: colors.primary },
  openText: { color: colors.primary, fontSize: 12, fontWeight: "700" },
  more: { padding: 5 },
  moreText: { color: "#8C9992", letterSpacing: 1 },
  empty: {
    alignItems: "center",
    paddingVertical: 38,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: radius.lg,
  },
  emptyIcon: { fontSize: 36, color: colors.primary },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.text,
    marginTop: 10,
  },
  emptyText: {
    color: colors.muted,
    textAlign: "center",
    marginTop: 7,
    lineHeight: 20,
  },
  footer: {
    textAlign: "center",
    color: "#98A49D",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.6,
    marginTop: 24,
    marginBottom: 6,
  },
});
