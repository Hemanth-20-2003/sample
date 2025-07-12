import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Battery } from 'lucide-react-native';
import { colors } from '@/constants/colors';

type BatteryStatusProps = {
  percentage: number;
  range: number;
  timeRemaining: number;
};

export default function BatteryStatus({ percentage, range, timeRemaining }: BatteryStatusProps) {
  // Determine battery color based on percentage
  const getBatteryColor = () => {
    if (percentage > 50) return colors.success;
    if (percentage > 20) return colors.warning;
    return colors.danger;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: getBatteryColor() + '20' }]}>
          <Battery size={32} color={getBatteryColor()} />
        </View>
        <Text style={styles.percentage}>{percentage}%</Text>
      </View>
      
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoValue}>{range}</Text>
          <Text style={styles.infoLabel}>km range</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.infoItem}>
          <Text style={styles.infoValue}>{timeRemaining}</Text>
          <Text style={styles.infoLabel}>hours left</Text>
        </View>
      </View>
      
      <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
        <View 
          style={[
            styles.progressFill, 
            { 
              width: `${percentage}%`,
              backgroundColor: getBatteryColor()
            }
          ]} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardElevated,
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  percentage: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  infoItem: {
    flex: 1,
  },
  infoValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  divider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: 20,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
});