import React, { useMemo, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Screen } from '../../src/components/Screen';
import { AppButton } from '../../src/components/AppButton';
import { colors, radius } from '../../src/theme/tokens';
import { useSchoolStore } from '../../src/store/useSchoolStore';
import type { Shift } from '../../src/domain/types';

const shifts: Shift[] = ['Manhã', 'Tarde', 'Noite', 'Integral'];
export default function SchoolDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const school = useSchoolStore((s) => s.schools.find((item) => item.id === id));
  const removeClass = useSchoolStore((s) => s.removeClass);
  const [shift, setShift] = useState<Shift | 'Todas'>('Todas');
  const classes = useMemo(() => (school?.classes ?? []).filter((item) => shift === 'Todas' || item.shift === shift), [school, shift]);
  if (!school) return <Screen><Text style={styles.title}>Escola não encontrada</Text><AppButton title="Voltar" onPress={() => router.replace('/')} /></Screen>;
  const confirmDelete = (classId: string, name: string) => Alert.alert('Excluir turma?', `Deseja remover “${name}”?`, [
    { text: 'Cancelar', style: 'cancel' }, { text: 'Excluir', style: 'destructive', onPress: () => void removeClass(classId) }
  ]);
  return <Screen>
    <Pressable onPress={() => router.back()} style={styles.back}><Text style={styles.backText}>‹  Todas as escolas</Text></Pressable>
    <View style={styles.heroIcon}><Text style={styles.heroIconText}>⌂</Text></View>
    <Text style={styles.eyebrow}>UNIDADE ESCOLAR</Text>
    <Text style={styles.title}>{school.name}</Text>
    <Text style={styles.address}>⌖  {school.address}</Text>
    <View style={styles.summary}><View><Text style={styles.summaryNum}>{school.classes.length}</Text><Text style={styles.summaryLabel}>Turmas cadastradas</Text></View><View style={styles.summaryLine} /><View><Text style={styles.summaryNum}>{new Set(school.classes.map((item) => item.schoolYear)).size || 0}</Text><Text style={styles.summaryLabel}>Anos letivos</Text></View></View>
    <View style={styles.actions}><View style={{ flex: 1 }}><AppButton title="Editar escola" variant="secondary" onPress={() => router.push({ pathname: '/school/form', params: { id: school.id } })} /></View><View style={{ flex: 1 }}><AppButton title="+ Nova turma" onPress={() => router.push({ pathname: '/school/class-form', params: { schoolId: school.id } })} /></View></View>
    <View style={styles.heading}><Text style={styles.sectionTitle}>Turmas da unidade</Text><Text style={styles.count}>{classes.length} de {school.classes.length}</Text></View>
    <View style={styles.filters}>{(['Todas', ...shifts] as const).map((item) => <Pressable key={item} onPress={() => setShift(item)} style={[styles.filter, shift === item && styles.filterActive]}><Text style={[styles.filterText, shift === item && styles.filterTextActive]}>{item}</Text></Pressable>)}</View>
    {classes.length === 0 ? <View style={styles.empty}><Text style={styles.emptyTitle}>{school.classes.length ? 'Nenhuma turma neste turno' : 'Ainda não há turmas'}</Text><Text style={styles.emptyText}>Cadastre uma turma para começar a organizar o ano letivo.</Text></View> :
      classes.map((item) => <View key={item.id} style={styles.classCard}><View style={styles.classIcon}><Text style={styles.classIconText}>▤</Text></View><View style={{ flex: 1 }}><Text style={styles.className}>{item.name}</Text><Text style={styles.classMeta}>{item.shift} · Ano letivo {item.schoolYear}</Text></View><Pressable accessibilityLabel={`Editar ${item.name}`} onPress={() => router.push({ pathname: '/school/class-form', params: { schoolId: school.id, classId: item.id } })} style={styles.smallAction}><Text style={styles.smallActionText}>Editar</Text></Pressable><Pressable accessibilityLabel={`Excluir ${item.name}`} onPress={() => confirmDelete(item.id, item.name)} style={styles.delete}><Text style={styles.deleteText}>×</Text></Pressable></View>)
    }
  </Screen>;
}
const styles = StyleSheet.create({
  back: { paddingVertical: 9, marginBottom: 24 }, backText: { color: colors.primary, fontWeight: '700' },
  heroIcon: { width: 54, height: 54, borderRadius: 18, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  heroIconText: { color: colors.primary, fontSize: 30 }, eyebrow: { color: colors.primary, fontSize: 10, letterSpacing: 1.6, fontWeight: '900', marginBottom: 8 },
  title: { fontSize: 29, lineHeight: 35, fontWeight: '800', letterSpacing: -0.8, color: colors.text },
  address: { color: colors.muted, fontSize: 13, lineHeight: 20, marginTop: 9 },
  summary: { backgroundColor: colors.primaryDark, padding: 19, borderRadius: radius.lg, flexDirection: 'row', alignItems: 'center', marginTop: 23, marginBottom: 18 },
  summaryNum: { color: '#fff', fontSize: 26, fontWeight: '800' }, summaryLabel: { color: '#C6DED4', fontSize: 11, marginTop: 3 },
  summaryLine: { width: 1, height: 42, backgroundColor: '#477568', marginHorizontal: 30 }, actions: { flexDirection: 'row', gap: 10, marginBottom: 30 },
  heading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }, sectionTitle: { fontSize: 19, color: colors.text, fontWeight: '800' }, count: { fontSize: 12, color: colors.muted },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginBottom: 14 }, filter: { borderRadius: 30, paddingHorizontal: 13, paddingVertical: 8, backgroundColor: '#E9EEEA' },
  filterActive: { backgroundColor: colors.primary }, filterText: { color: colors.muted, fontSize: 11, fontWeight: '700' }, filterTextActive: { color: '#fff' },
  classCard: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#fff', padding: 13, borderRadius: 16, borderWidth: 1, borderColor: colors.border, marginBottom: 10 },
  classIcon: { width: 40, height: 40, borderRadius: 13, backgroundColor: '#F1F5F2', alignItems: 'center', justifyContent: 'center' }, classIconText: { color: colors.primary, fontSize: 20 },
  className: { fontWeight: '800', color: colors.text, fontSize: 14 }, classMeta: { color: colors.muted, fontSize: 11, marginTop: 5 },
  smallAction: { padding: 7 }, smallActionText: { color: colors.primary, fontSize: 12, fontWeight: '700' }, delete: { width: 28, height: 28, borderRadius: 10, backgroundColor: colors.dangerBg, alignItems: 'center', justifyContent: 'center' }, deleteText: { color: colors.danger, fontSize: 20 },
  empty: { backgroundColor: '#fff', padding: 25, borderRadius: 18, alignItems: 'center' }, emptyTitle: { fontWeight: '800', color: colors.text, fontSize: 15 }, emptyText: { textAlign: 'center', color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 7 }
});