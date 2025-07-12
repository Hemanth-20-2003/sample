import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { Image } from 'expo-image';
import { Search, Filter } from 'lucide-react-native';
import SwapStationCard from '@/components/SwapStationCard';
import { colors } from '@/constants/colors';
import { swapStations } from '@/constants/mockData';

export default function MapScreen() {
  const [selectedStation, setSelectedStation] = useState<string | null>(null);

  // Using a static map image for demonstration
  // In a real app, you would use a proper map component like react-native-maps
  const mapImageUrl = "https://images.unsplash.com/photo-1569336415962-a4bd9f69c07a?q=80&w=2069&auto=format&fit=crop";
  
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Battery Swap Stations',
          headerTitleStyle: {
            fontWeight: '700',
            color: colors.text,
          },
          headerStyle: {
            backgroundColor: colors.card,
          },
        }} 
      />
      
      <View style={styles.mapContainer}>
        <Image
          source={{ uri: mapImageUrl }}
          style={styles.mapImage}
          contentFit="cover"
        />
        
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color={colors.textSecondary} />
            <Text style={styles.searchPlaceholder}>Search for stations...</Text>
          </View>
          <View style={styles.filterButton}>
            <Filter size={20} color={colors.primary} />
          </View>
        </View>
      </View>
      
      <View style={styles.stationsContainer}>
        <Text style={styles.stationsTitle}>Nearby Stations</Text>
        
        <ScrollView 
          style={styles.stationsList}
          contentContainerStyle={styles.stationsListContent}
          showsVerticalScrollIndicator={false}
        >
          {swapStations.map((station) => (
            <SwapStationCard
              key={station.id}
              name={station.name}
              distance={station.distance}
              batteries={station.batteries}
              isOpen={station.isOpen}
              onPress={() => setSelectedStation(station.id)}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  mapContainer: {
    height: 280,
    width: '100%',
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    backgroundColor: colors.cardElevated,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    marginRight: 16,
  },
  searchPlaceholder: {
    color: colors.textSecondary,
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
  },
  filterButton: {
    width: 56,
    height: 56,
    backgroundColor: colors.cardElevated,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  stationsContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  stationsTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  stationsList: {
    flex: 1,
  },
  stationsListContent: {
    paddingBottom: 20,
  },
});