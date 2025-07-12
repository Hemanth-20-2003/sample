import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { Zap, Waves } from 'lucide-react-native';
import { colors } from '@/constants/colors';

type SplashScreenProps = {
  onFinish: () => void;
};

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(waveAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(waveAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();

    // Auto finish after 3 seconds
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const waveOpacity = waveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.8],
  });

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }
        ]}
      >
        <View style={styles.logoContainer}>
          <View style={styles.iconContainer}>
            <Zap size={48} color={colors.primary} />
          </View>
          
          <Animated.View 
            style={[
              styles.waveContainer,
              { opacity: waveOpacity }
            ]}
          >
            <Waves size={32} color={colors.secondary} />
          </Animated.View>
        </View>
        
        <Text style={styles.title}>ZaZen</Text>
        <Text style={styles.subtitle}>Fisherman's Electric Companion</Text>
        
        <View style={styles.loadingContainer}>
          <View style={styles.loadingBar}>
            <Animated.View 
              style={[
                styles.loadingFill,
                {
                  width: waveAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['20%', '100%'],
                  }),
                }
              ]}
            />
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    width: width * 0.8,
  },
  logoContainer: {
    position: 'relative',
    marginBottom: 32,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.cardElevated,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  waveContainer: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 48,
  },
  loadingContainer: {
    width: '100%',
    alignItems: 'center',
  },
  loadingBar: {
    width: '60%',
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  loadingFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
});