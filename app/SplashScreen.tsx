import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { height } = Dimensions.get('window');

interface SplashScreenProps {
  onAnimationComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onAnimationComplete }) => {
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(30)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const developerOpacity = useRef(new Animated.Value(0)).current;
  const developerTranslateY = useRef(new Animated.Value(20)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowOpacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // Start pulse animation for the glow
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(glowOpacity, {
          toValue: 0.6,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(glowOpacity, {
          toValue: 0.3,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );
    pulseLoop.start();

    // Main animation sequence
    Animated.sequence([
      // Logo appears with scale and fade
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      // Pulse the logo
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
      // Title slides up and fades in
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(titleTranslateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      // Subtitle fades in
      Animated.timing(subtitleOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      // Developer credit slides up
      Animated.parallel([
        Animated.timing(developerOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(developerTranslateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      // Hold for a moment
      Animated.delay(800),
    ]).start(() => {
      pulseLoop.stop();
      onAnimationComplete();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      {/* Background gradient effect using overlapping views */}
      <View style={styles.gradientTop} />
      <View style={styles.gradientBottom} />

      {/* Animated glow behind logo */}
      <Animated.View
        style={[
          styles.glowEffect,
          {
            opacity: glowOpacity,
            transform: [{ scale: pulseAnim }],
          },
        ]}
      />

      {/* Logo */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: logoOpacity,
            transform: [
              { scale: Animated.multiply(logoScale, pulseAnim) },
            ],
          },
        ]}
      >
        <View style={styles.logoInner}>
          <Ionicons name="calculator" size={80} color="#fff" />
        </View>
      </Animated.View>

      {/* App Title */}
      <Animated.View
        style={[
          styles.titleContainer,
          {
            opacity: titleOpacity,
            transform: [{ translateY: titleTranslateY }],
          },
        ]}
      >
        <Text style={styles.title}>Custom</Text>
        <Text style={styles.titleBold}>Counter</Text>
      </Animated.View>

      {/* Subtitle */}
      <Animated.Text style={[styles.subtitle, { opacity: subtitleOpacity }]}>
        Count with style
      </Animated.Text>

      {/* Developer Credit */}
      <Animated.View
        style={[
          styles.developerContainer,
          {
            opacity: developerOpacity,
            transform: [{ translateY: developerTranslateY }],
          },
        ]}
      >
        <View style={styles.divider} />
        <Text style={styles.developedBy}>Developed by</Text>
        <View style={styles.companyRow}>
          <View style={styles.companyIcon}>
            <Ionicons name="water" size={20} color="#4FC3F7" />
          </View>
          <Text style={styles.companyName}>Deep Blue Development</Text>
        </View>
      </Animated.View>

      {/* Version at bottom */}
      <Text style={styles.version}>v3.2.0</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a1628',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.5,
    backgroundColor: '#0d2137',
    opacity: 0.8,
  },
  gradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.5,
    backgroundColor: '#061220',
  },
  glowEffect: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#2196F3',
    top: height * 0.25,
    ...Platform.select({
      ios: {
        shadowColor: '#2196F3',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 60,
      },
      android: {
        elevation: 20,
      },
    }),
  },
  logoContainer: {
    marginBottom: 30,
  },
  logoInner: {
    width: 140,
    height: 140,
    borderRadius: 35,
    backgroundColor: '#1565C0',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
      },
      android: {
        elevation: 15,
      },
    }),
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderTopColor: 'rgba(255, 255, 255, 0.4)',
    borderLeftColor: 'rgba(255, 255, 255, 0.3)',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 42,
    fontWeight: '300',
    color: '#fff',
    letterSpacing: 2,
  },
  titleBold: {
    fontSize: 48,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 1,
    marginTop: -8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.6)',
    letterSpacing: 4,
    textTransform: 'uppercase',
    marginBottom: 60,
  },
  developerContainer: {
    position: 'absolute',
    bottom: 100,
    alignItems: 'center',
  },
  divider: {
    width: 40,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 20,
    borderRadius: 1,
  },
  developedBy: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyIcon: {
    marginRight: 8,
  },
  companyName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4FC3F7',
    letterSpacing: 1,
  },
  version: {
    position: 'absolute',
    bottom: 50,
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.3)',
    letterSpacing: 1,
  },
});

export default SplashScreen;
