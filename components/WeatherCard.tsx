import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Cloud, CloudRain, Sun, Wind } from 'lucide-react-native';
import { colors } from '@/constants/colors';

type WeatherCondition = 'Sunny' | 'Partly Cloudy' | 'Cloudy' | 'Rainy' | 'Clear';

type WeatherCardProps = {
  temperature: number;
  condition: string;
  windSpeed: number;
  windDirection: string;
  waveHeight: number;
  forecast?: Array<{
    time: string;
    temp: number;
    condition: string;
  }>;
};

export default function WeatherCard({ 
  temperature, 
  condition, 
  windSpeed, 
  windDirection,
  waveHeight,
  forecast 
}: WeatherCardProps) {
  
  const getWeatherIcon = (condition: string) => {
    switch(condition) {
      case 'Sunny':
        return <Sun size={28} color={colors.secondary} />;
      case 'Partly Cloudy':
        return <Cloud size={28} color={colors.secondary} />;
      case 'Cloudy':
        return <Cloud size={28} color={colors.textSecondary} />;
      case 'Rainy':
        return <CloudRain size={28} color={colors.primary} />;
      case 'Clear':
        return <Sun size={28} color={colors.secondary} />;
      default:
        return <Cloud size={28} color={colors.textSecondary} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          {getWeatherIcon(condition)}
        </View>
        <Text style={styles.title}>Weather</Text>
      </View>
      
      <View style={styles.currentWeather}>
        <Text style={styles.temperature}>{temperature}°C</Text>
        <Text style={styles.condition}>{condition}</Text>
      </View>
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Wind size={20} color={colors.textSecondary} />
          <Text style={styles.detailText}>{windSpeed} km/h {windDirection}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.waveIcon}>≈</Text>
          <Text style={styles.detailText}>{waveHeight} m waves</Text>
        </View>
      </View>
      
      {forecast && (
        <View style={styles.forecastContainer}>
          {forecast.map((item, index) => (
            <View key={index} style={styles.forecastItem}>
              <Text style={styles.forecastTime}>{item.time}</Text>
              <View style={styles.forecastIconContainer}>
                {getWeatherIcon(item.condition)}
              </View>
              <Text style={styles.forecastTemp}>{item.temp}°</Text>
            </View>
          ))}
        </View>
      )}
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
    marginBottom: 16,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  currentWeather: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  temperature: {
    fontSize: 40,
    fontWeight: '800',
    color: colors.text,
    marginRight: 12,
  },
  condition: {
    fontSize: 18,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  detailsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  detailText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 6,
  },
  waveIcon: {
    fontSize: 20,
    color: colors.textSecondary,
  },
  forecastContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 16,
  },
  forecastItem: {
    alignItems: 'center',
  },
  forecastTime: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 8,
  },
  forecastIconContainer: {
    marginBottom: 8,
  },
  forecastTemp: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
});