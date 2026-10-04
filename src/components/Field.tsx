import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors, radius } from '../theme/tokens';

export function Field({ label, error, ...props }: TextInputProps & { label: string; error?: string }) {
  return <View style={styles.wrap}>
    <Text style={styles.label}>{label}</Text>
    <TextInput placeholderTextColor="#9AA69F" {...props} style={[styles.input, props.multiline && styles.multiline, error && styles.invalid, props.style]} />
    {error ? <Text style={styles.error}>{error}</Text> : null}
  </View>;
}
const styles = StyleSheet.create({
  wrap: { gap: 7, marginBottom: 17 }, label: { fontSize: 13, fontWeight: '700', color: colors.text },
  input: { minHeight: 50, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingHorizontal: 14, color: colors.text, fontSize: 15 },
  multiline: { minHeight: 78, paddingTop: 13, textAlignVertical: 'top' }, invalid: { borderColor: colors.danger },
  error: { color: colors.danger, fontSize: 12 }
});