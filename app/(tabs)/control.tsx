import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { Bluetooth, Power, RotateCcw, Gauge, Navigation2, AlertTriangle, Wifi, WifiOff } from 'lucide-react-native';
import { colors } from '@/constants/colors';

export default function ControlScreen() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [direction, setDirection] = useState(0); // -100 to 100 (left to right)
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [batteryLevel, setBatteryLevel] = useState(78);

  const handleConnect = async () => {
    if (isConnected) {
      // Disconnect
      setIsConnected(false);
      setSpeed(0);
      setDirection(0);
      setCurrentSpeed(0);
      return;
    }

    setIsConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      Alert.alert('Connected', 'Successfully connected to ZaZen Outboard Motor');
    }, 2000);
  };

  const handleSpeedChange = (newSpeed: number) => {
    if (!isConnected) return;
    setSpeed(newSpeed);
    // Simulate gradual speed change
    setTimeout(() => setCurrentSpeed(newSpeed), 500);
  };

  const handleDirectionChange = (newDirection: number) => {
    if (!isConnected) return;
    setDirection(newDirection);
  };

  const handleEmergencyStop = () => {
    Alert.alert(
      'Emergency Stop',
      'Are you sure you want to stop the motor immediately?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'STOP', 
          style: 'destructive',
          onPress: () => {
            setSpeed(0);
            setDirection(0);
            setCurrentSpeed(0);
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Boat Control',
          headerTitleStyle: {
            fontWeight: '700',
            color: colors.text,
          },
          headerStyle: {
            backgroundColor: colors.card,
          },
        }} 
      />
      
      {/* Connection Status */}
      <View style={styles.connectionContainer}>
        <View style={[
          styles.connectionStatus,
          { backgroundColor: isConnected ? colors.success + '20' : colors.danger + '20' }
        ]}>
          {isConnected ? (
            <Wifi size={24} color={colors.success} />
          ) : (
            <WifiOff size={24} color={colors.danger} />
          )}
          <Text style={[
            styles.connectionText,
            { color: isConnected ? colors.success : colors.danger }
          ]}>
            {isConnected ? 'Connected to Outboard' : 'Not Connected'}
          </Text>
        </View>
        
        <Pressable 
          style={[
            styles.connectButton,
            { 
              backgroundColor: isConnected ? colors.danger : colors.primary,
              opacity: isConnecting ? 0.7 : 1
            }
          ]}
          onPress={handleConnect}
          disabled={isConnecting}
        >
          <Bluetooth size={20} color={colors.background} />
          <Text style={styles.connectButtonText}>
            {isConnecting ? 'Connecting...' : isConnected ? 'Disconnect' : 'Connect'}
          </Text>
        </Pressable>
      </View>

      {/* Status Display */}
      <View style={styles.statusContainer}>
        <View style={styles.statusCard}>
          <Gauge size={32} color={colors.primary} />
          <Text style={styles.statusValue}>{currentSpeed}</Text>
          <Text style={styles.statusLabel}>km/h</Text>
        </View>
        
        <View style={styles.statusCard}>
          <Navigation2 size={32} color={colors.secondary} />
          <Text style={styles.statusValue}>{direction > 0 ? 'R' : direction < 0 ? 'L' : 'C'}</Text>
          <Text style={styles.statusLabel}>Direction</Text>
        </View>
        
        <View style={styles.statusCard}>
          <Power size={32} color={colors.success} />
          <Text style={styles.statusValue}>{batteryLevel}%</Text>
          <Text style={styles.statusLabel}>Battery</Text>
        </View>
      </View>

      {/* Speed Control */}
      <View style={styles.controlSection}>
        <Text style={styles.controlTitle}>Speed Control</Text>
        <View style={styles.speedContainer}>
          <View style={styles.speedButtons}>
            {[0, 5, 10, 15, 20, 25].map((speedValue) => (
              <Pressable
                key={speedValue}
                style={[
                  styles.speedButton,
                  { 
                    backgroundColor: speed === speedValue ? colors.primary : colors.cardElevated,
                    opacity: !isConnected ? 0.5 : 1
                  }
                ]}
                onPress={() => handleSpeedChange(speedValue)}
                disabled={!isConnected}
              >
                <Text style={[
                  styles.speedButtonText,
                  { color: speed === speedValue ? colors.background : colors.text }
                ]}>
                  {speedValue}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>

      {/* Direction Control */}
      <View style={styles.controlSection}>
        <Text style={styles.controlTitle}>Direction Control</Text>
        <View style={styles.directionContainer}>
          <Pressable
            style={[
              styles.directionButton,
              { 
                backgroundColor: direction < 0 ? colors.secondary : colors.cardElevated,
                opacity: !isConnected ? 0.5 : 1
              }
            ]}
            onPress={() => handleDirectionChange(-50)}
            disabled={!isConnected}
          >
            <RotateCcw size={24} color={direction < 0 ? colors.background : colors.text} />
            <Text style={[
              styles.directionButtonText,
              { color: direction < 0 ? colors.background : colors.text }
            ]}>
              Left
            </Text>
          </Pressable>
          
          <Pressable
            style={[
              styles.directionButton,
              { 
                backgroundColor: direction === 0 ? colors.accent : colors.cardElevated,
                opacity: !isConnected ? 0.5 : 1
              }
            ]}
            onPress={() => handleDirectionChange(0)}
            disabled={!isConnected}
          >
            <Navigation2 size={24} color={direction === 0 ? colors.background : colors.text} />
            <Text style={[
              styles.directionButtonText,
              { color: direction === 0 ? colors.background : colors.text }
            ]}>
              Center
            </Text>
          </Pressable>
          
          <Pressable
            style={[
              styles.directionButton,
              { 
                backgroundColor: direction > 0 ? colors.secondary : colors.cardElevated,
                opacity: !isConnected ? 0.5 : 1
              }
            ]}
            onPress={() => handleDirectionChange(50)}
            disabled={!isConnected}
          >
            <RotateCcw 
              size={24} 
              color={direction > 0 ? colors.background : colors.text}
              style={{ transform: [{ scaleX: -1 }] }}
            />
            <Text style={[
              styles.directionButtonText,
              { color: direction > 0 ? colors.background : colors.text }
            ]}>
              Right
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Emergency Stop */}
      <Pressable 
        style={[
          styles.emergencyButton,
          { opacity: !isConnected ? 0.5 : 1 }
        ]}
        onPress={handleEmergencyStop}
        disabled={!isConnected}
      >
        <AlertTriangle size={32} color={colors.background} />
        <Text style={styles.emergencyButtonText}>EMERGENCY STOP</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  connectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    flex: 1,
    marginRight: 16,
  },
  connectionText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  connectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
  },
  connectButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statusCard: {
    backgroundColor: colors.cardElevated,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  statusValue: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginTop: 8,
  },
  statusLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  controlSection: {
    marginBottom: 32,
  },
  controlTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  speedContainer: {
    backgroundColor: colors.cardElevated,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  speedButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  speedButton: {
    width: '30%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  speedButtonText: {
    fontSize: 18,
    fontWeight: '700',
  },
  directionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  directionButton: {
    flex: 1,
    paddingVertical: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  directionButtonText: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 8,
  },
  emergencyButton: {
    backgroundColor: colors.danger,
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: 'center',
    marginTop: 'auto',
    shadowColor: colors.danger,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  emergencyButtonText: {
    color: colors.background,
    fontSize: 18,
    fontWeight: '800',
    marginTop: 8,
  },
});