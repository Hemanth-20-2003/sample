import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Stack } from 'expo-router';
import { Phone, MessageCircle, HelpCircle, Zap, Thermometer, Wrench } from 'lucide-react-native';
import AlertCard from '@/components/AlertCard';
import { colors } from '@/constants/colors';
import { diagnosticsData } from '@/constants/mockData';

export default function DiagnosticsScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'System Diagnostics',
          headerTitleStyle: {
            fontWeight: '700',
            color: colors.text,
          },
          headerStyle: {
            backgroundColor: colors.card,
          },
        }} 
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System Alerts</Text>
          
          {diagnosticsData.alerts.map((alert) => (
            <AlertCard
              key={alert.id}
              type={alert.type as 'warning' | 'info' | 'success'}
              title={alert.title}
              description={alert.description}
              timestamp={alert.timestamp}
            />
          ))}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System Health</Text>
          
          <View style={styles.healthContainer}>
            <View style={styles.healthItem}>
              <View style={[
                styles.healthIndicator, 
                { backgroundColor: diagnosticsData.systemHealth.battery === 'Good' ? colors.success : colors.warning }
              ]} />
              <View style={styles.healthIconContainer}>
                <Zap size={28} color={colors.primary} />
              </View>
              <Text style={styles.healthTitle}>Battery</Text>
              <Text style={styles.healthStatus}>{diagnosticsData.systemHealth.battery}</Text>
            </View>
            
            <View style={styles.healthItem}>
              <View style={[
                styles.healthIndicator, 
                { backgroundColor: diagnosticsData.systemHealth.motor === 'Good' ? colors.success : colors.warning }
              ]} />
              <View style={styles.healthIconContainer}>
                <Thermometer size={28} color={colors.warning} />
              </View>
              <Text style={styles.healthTitle}>Motor</Text>
              <Text style={styles.healthStatus}>{diagnosticsData.systemHealth.motor}</Text>
            </View>
            
            <View style={styles.healthItem}>
              <View style={[
                styles.healthIndicator, 
                { backgroundColor: diagnosticsData.systemHealth.controller === 'Good' ? colors.success : colors.warning }
              ]} />
              <View style={styles.healthIconContainer}>
                <Wrench size={28} color={colors.secondary} />
              </View>
              <Text style={styles.healthTitle}>Controller</Text>
              <Text style={styles.healthStatus}>{diagnosticsData.systemHealth.controller}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <View style={styles.supportContainer}>
            <Pressable style={styles.supportButton}>
              <View style={[styles.supportIconContainer, { backgroundColor: colors.primary + '20' }]}>
                <Phone size={28} color={colors.primary} />
              </View>
              <Text style={styles.supportButtonText}>Call Support</Text>
            </Pressable>
            
            <Pressable style={styles.supportButton}>
              <View style={[styles.supportIconContainer, { backgroundColor: colors.secondary + '20' }]}>
                <MessageCircle size={28} color={colors.secondary} />
              </View>
              <Text style={styles.supportButtonText}>Chat Support</Text>
            </Pressable>
            
            <Pressable style={styles.supportButton}>
              <View style={[styles.supportIconContainer, { backgroundColor: colors.accent + '20' }]}>
                <HelpCircle size={28} color={colors.accent} />
              </View>
              <Text style={styles.supportButtonText}>Help Center</Text>
            </Pressable>
          </View>
        </View>
        
        <View style={styles.troubleshootingContainer}>
          <Text style={styles.troubleshootingTitle}>Common Issues</Text>
          
          <Pressable style={styles.troubleshootingItem}>
            <Text style={styles.troubleshootingText}>Motor not starting</Text>
          </Pressable>
          
          <Pressable style={styles.troubleshootingItem}>
            <Text style={styles.troubleshootingText}>Battery draining quickly</Text>
          </Pressable>
          
          <Pressable style={styles.troubleshootingItem}>
            <Text style={styles.troubleshootingText}>Controller error codes</Text>
          </Pressable>
          
          <Pressable style={styles.troubleshootingItem}>
            <Text style={styles.troubleshootingText}>Propeller issues</Text>
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
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  healthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  healthItem: {
    backgroundColor: colors.cardElevated,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: '31%',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  healthIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  healthIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  healthTitle: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
    marginBottom: 4,
  },
  healthStatus: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  supportContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  supportButton: {
    backgroundColor: colors.cardElevated,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: '31%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  supportIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  supportButtonText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '600',
    textAlign: 'center',
  },
  troubleshootingContainer: {
    backgroundColor: colors.cardElevated,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  troubleshootingTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  troubleshootingItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  troubleshootingText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
});