import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MapPin, Battery, Clock } from 'lucide-react-native';
import { colors } from '@/constants/colors';

type SwapStationProps = {
  name: string;
  distance: number;
  batteries: number;
  isOpen: boolean;
  onPress: () => void;
};

export default function SwapStationCard({ 
  name, 
  distance, 
  batteries, 
  isOpen,
  onPress 
}: SwapStationProps) {
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed
      ]}
      onPress={onPress}
    >
      <View style={styles.header}>
        <Text style={styles.name}>{name}</Text>
        <View style={[
          styles.statusBadge, 
          { backgroundColor: isOpen ? colors.success + '30' : colors.danger + '30' }
        ]}>
          <Text style={[
            styles.statusText, 
            { color: isOpen ? colors.success : colors.danger }
          ]}>
            {isOpen ? 'Open' : 'Closed'}
          </Text>
        </View>
      </View>
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <MapPin size={18} color={colors.primary} />
          <Text style={styles.detailText}>{distance} km away</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Battery size={18} color={colors.secondary} />
          <Text style={styles.detailText}>
            {batteries} {batteries === 1 ? 'battery' : 'batteries'} available
          </Text>
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        <Pressable 
          style={[
            styles.button, 
            { 
              backgroundColor: isOpen && batteries > 0 ? colors.primary : colors.border,
              opacity: isOpen && batteries > 0 ? 1 : 0.5
            }
          ]}
          disabled={!isOpen || batteries === 0}
        >
          <Text style={[
            styles.buttonText, 
            { color: isOpen && batteries > 0 ? colors.background : colors.textMuted }
          ]}>
            Reserve Battery
          </Text>
        </Pressable>
        
        <Pressable style={styles.directionsButton}>
          <MapPin size={22} color={colors.primary} />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardElevated,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  detailText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 8,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 16,
  },
  directionsButton: {
    width: 50,
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
});