import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Stack, router } from 'expo-router';
import { MapPin, Navigation, Zap, User } from 'lucide-react-native';
import BatteryStatus from '@/components/BatteryStatus';
import WeatherCard from '@/components/WeatherCard';
import SwapStationCard from '@/components/SwapStationCard';
import { colors } from '@/constants/colors';
import { batteryData, weatherData, swapStations } from '@/constants/mockData';

export default function HomeScreen() {
  const nearestStation = swapStations[0];

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'ZaZen Fisherman',
          headerTitleStyle: {
            fontWeight: '700',
            color: colors.text,
          },
          headerStyle: {
            backgroundColor: colors.card,
          },
          headerRight: () => (
            <Pressable 
              style={styles.profileButton}
              onPress={() => router.push('/profile')}
            >
              <User size={24} color={colors.primary} />
            </Pressable>
          ),
        }} 
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.greeting}>Namaste, Rajesh!</Text>
          <View style={styles.locationContainer}>
            <MapPin size={14} color={colors.primary} />
            <Text style={styles.locationText}>Kochi Harbor</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <BatteryStatus 
            percentage={batteryData.percentage} 
            range={batteryData.range} 
            timeRemaining={batteryData.timeRemaining} 
          />
        </View>
        
        <View style={styles.section}>
          <WeatherCard 
            temperature={weatherData.current.temp}
            condition={weatherData.current.condition}
            windSpeed={weatherData.current.windSpeed}
            windDirection={weatherData.current.windDirection}
            waveHeight={weatherData.current.waveHeight}
            forecast={weatherData.forecast}
          />
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearest Swap Station</Text>
            <Pressable>
              <Text style={styles.seeAllText}>See All</Text>
            </Pressable>
          </View>
          
          <SwapStationCard 
            name={nearestStation.name}
            distance={nearestStation.distance}
            batteries={nearestStation.batteries}
            isOpen={nearestStation.isOpen}
            onPress={() => {}}
          />
        </View>
        
        <View style={styles.quickActions}>
          <Pressable style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: colors.primary + '20' }]}>
              <Navigation size={24} color={colors.primary} />
            </View>
            <Text style={styles.actionText}>Navigate</Text>
          </Pressable>
          
          <Pressable style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: colors.secondary + '20' }]}>
              <Zap size={24} color={colors.secondary} />
            </View>
            <Text style={styles.actionText}>Reserve Swap</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginLeft: 6,
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  seeAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
    backgroundColor: colors.cardElevated,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
});