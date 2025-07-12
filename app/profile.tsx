import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { Stack, router } from 'expo-router';
import { Leaf, Droplet, TreePine, Bolt, ArrowLeft } from 'lucide-react-native';
import LanguageSelector from '@/components/LanguageSelector';
import StatCard from '@/components/StatCard';
import { colors } from '@/constants/colors';
import { userProfile, languages } from '@/constants/mockData';

export default function ProfileScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState(userProfile.language.toLowerCase());

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'My Profile',
          headerTitleStyle: {
            fontWeight: '700',
            color: colors.text,
          },
          headerStyle: {
            backgroundColor: colors.card,
          },
          headerLeft: () => (
            <Pressable 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color={colors.primary} />
            </Pressable>
          ),
        }} 
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop' }} 
              style={styles.profileImage} 
            />
          </View>
          
          <Text style={styles.profileName}>{userProfile.name}</Text>
          <Text style={styles.profileDetails}>{userProfile.village}</Text>
          
          <View style={styles.boatInfoContainer}>
            <Bolt size={18} color={colors.primary} />
            <Text style={styles.boatInfo}>{userProfile.boatName} • {userProfile.boatId}</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <LanguageSelector 
            languages={languages}
            selectedLanguage={selectedLanguage}
            onSelectLanguage={setSelectedLanguage}
          />
          
          <Pressable style={styles.settingItem}>
            <Text style={styles.settingText}>Notification Preferences</Text>
          </Pressable>
          
          <Pressable style={styles.settingItem}>
            <Text style={styles.settingText}>Help & Support</Text>
          </Pressable>
          
          <Pressable style={styles.settingItem}>
            <Text style={styles.settingText}>About ZaZen</Text>
          </Pressable>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Environmental Impact</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statsRow}>
              <StatCard 
                title="Fuel Saved"
                value={userProfile.ecoImpact.fuelSaved}
                unit="L"
                icon={<Droplet size={24} color={colors.primary} />}
                color={colors.primary}
              />
              
              <StatCard 
                title="CO₂ Reduced"
                value={userProfile.ecoImpact.co2Reduced}
                unit="kg"
                icon={<Leaf size={24} color={colors.success} />}
                color={colors.success}
              />
            </View>
            
            <View style={styles.statsRow}>
              <StatCard 
                title="Trees Equivalent"
                value={userProfile.ecoImpact.treesEquivalent}
                icon={<TreePine size={24} color={colors.accent} />}
                color={colors.accent}
              />
              
              <StatCard 
                title="Trips Taken"
                value={userProfile.ecoImpact.tripsTaken}
                icon={<Bolt size={24} color={colors.secondary} />}
                color={colors.secondary}
              />
            </View>
          </View>
        </View>
        
        <Pressable style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 4,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileName: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  profileDetails: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  boatInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  boatInfo: {
    fontSize: 16,
    color: colors.primary,
    marginLeft: 8,
    fontWeight: '600',
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
  settingItem: {
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
  settingText: {
    fontSize: 18,
    color: colors.text,
    fontWeight: '500',
  },
  statsContainer: {
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  logoutButton: {
    backgroundColor: colors.danger + '20',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: colors.danger,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 4,
  },
  logoutText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.danger,
  },
});