import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";

import { colors, radius } from "@/theme/tokens";
import { School } from "@/domain/types";

export function SchoolCard({
  school,
  onPress,
  onDelete,
}: {
  school: School;
  onPress: () => void;
  onDelete: () => void;
}) {
  return (
    <Pressable
      key={school.id}
      onPress={onPress}
      style={({ pressed }) => [styles.schoolCard, pressed && { opacity: 0.85 }]}
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
        onPress={onDelete}
        hitSlop={8}
        style={styles.more}
      >
        <Text style={styles.moreText}>•••</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
});
