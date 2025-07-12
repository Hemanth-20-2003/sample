import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { AlertTriangle, Info, CheckCircle } from 'lucide-react-native';
import { colors } from '@/constants/colors';

type AlertType = 'warning' | 'info' | 'success';

type AlertCardProps = {
  type: AlertType;
  title: string;
  description: string;
  timestamp: string;
  onPress?: () => void;
};

export default function AlertCard({ 
  type, 
  title, 
  description, 
  timestamp,
  onPress 
}: AlertCardProps) {
  
  const getAlertIcon = () => {
    switch(type) {
      case 'warning':
        return <AlertTriangle size={24} color={colors.warning} />;
      case 'info':
        return <Info size={24} color={colors.primary} />;
      case 'success':
        return <CheckCircle size={24} color={colors.success} />;
      default:
        return <Info size={24} color={colors.primary} />;
    }
  };
  
  const getAlertColor = () => {
    switch(type) {
      case 'warning':
        return colors.warning;
      case 'info':
        return colors.primary;
      case 'success':
        return colors.success;
      default:
        return colors.primary;
    }
  };

  return (
    <Pressable 
      style={({ pressed }) => [
        styles.container,
        { borderLeftColor: getAlertColor() },
        pressed && styles.pressed
      ]}
      onPress={onPress}
    >
      <View style={[styles.iconContainer, { backgroundColor: getAlertColor() + '20' }]}>
        {getAlertIcon()}
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.timestamp}>{timestamp}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardElevated,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 10,
    lineHeight: 22,
  },
  timestamp: {
    fontSize: 12,
    color: colors.textMuted,
    opacity: 0.8,
  },
});