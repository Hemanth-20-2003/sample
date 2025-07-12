import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, FlatList } from 'react-native';
import { Check, Globe } from 'lucide-react-native';
import { colors } from '@/constants/colors';

type Language = {
  code: string;
  name: string;
};

type LanguageSelectorProps = {
  languages: Language[];
  selectedLanguage: string;
  onSelectLanguage: (code: string) => void;
};

export default function LanguageSelector({ 
  languages, 
  selectedLanguage, 
  onSelectLanguage 
}: LanguageSelectorProps) {
  const [modalVisible, setModalVisible] = useState(false);
  
  const selectedLanguageName = languages.find(lang => lang.code === selectedLanguage)?.name || '';

  return (
    <>
      <Pressable 
        style={({ pressed }) => [
          styles.container,
          pressed && styles.pressed
        ]}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.iconContainer}>
          <Globe size={24} color={colors.primary} />
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.label}>Language</Text>
          <Text style={styles.value}>{selectedLanguageName}</Text>
        </View>
      </Pressable>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Language</Text>
            
            <FlatList
              data={languages}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <Pressable 
                  style={({ pressed }) => [
                    styles.languageItem,
                    pressed && styles.languageItemPressed
                  ]}
                  onPress={() => {
                    onSelectLanguage(item.code);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.languageName}>{item.name}</Text>
                  {item.code === selectedLanguage && (
                    <Check size={24} color={colors.primary} />
                  )}
                </Pressable>
              )}
              style={styles.languageList}
            />
            
            <Pressable 
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardElevated,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
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
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.cardElevated,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  languageList: {
    marginBottom: 20,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  languageItemPressed: {
    backgroundColor: colors.background,
    borderRadius: 12,
    marginHorizontal: -12,
    paddingHorizontal: 12,
  },
  languageName: {
    fontSize: 18,
    color: colors.text,
    fontWeight: '500',
  },
  closeButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  closeButtonText: {
    color: colors.background,
    fontSize: 18,
    fontWeight: '700',
  },
});