import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

type StatCardProps = {
  title: string;
  value: number | string;
  unit?: string;
  icon?: React.ReactNode;
  color?: string;
};

export default function StatCard({ 
  title, 
  value, 
  unit, 
  icon,
  color = colors.primary 
}: StatCardProps) {
  return (
    <View style={[styles.container, { borderColor: color + '40' }]}>
      {icon && (
        <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
          {icon}
        </View>
      )}
      
      <Text style={styles.value}>
        {value}
        {unit && <Text style={styles.unit}> {unit}</Text>}
      </Text>
      
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardElevated,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    flex: 1,
    minHeight: 140,
    justifyContent: 'center',
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  value: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
  },
  unit: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  title: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '500',
  },
});