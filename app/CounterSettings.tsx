import React, { useState } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { Linking, Platform, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

import { useCustomTheme } from '../assets/theme-context';
import packageJson from '../package.json';

const COLORS = [
  { name: 'Blue', value: '#2196F3' },
  { name: 'Red', value: '#F44336' },
  { name: 'Green', value: '#4CAF50' },
  { name: 'Purple', value: '#9C27B0' },
  { name: 'Orange', value: '#FF9800' },
  { name: 'Teal', value: '#009688' },
  { name: 'Pink', value: '#E91E63' },
  { name: 'Indigo', value: '#3F51B5' },
  { name: 'Cyan', value: '#00BCD4' },
  { name: 'Amber', value: '#FFC107' },
  { name: 'Lime', value: '#8BC34A' },
  { name: 'Deep Purple', value: '#673AB7' },
];

type ExpandedSection = 'pad' | 'icon' | null;

const CounterSettingsScreen = () => {
  const { colors } = useTheme();
  const { mode, toggleTheme, padColor, iconColor, setPadColor, setIconColor } = useCustomTheme();
  const [expandedSection, setExpandedSection] = useState<ExpandedSection>(null);

  const toggleSection = (section: ExpandedSection) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.section}>
        <Text style={[styles.sectionHeader, { color: colors.text }]}>Appearance</Text>

        <View style={[styles.settingRow, { backgroundColor: colors.card }]}>
          <View style={styles.settingContent}>
            <Ionicons name="moon-outline" size={22} color={colors.text} />
            <Text style={[styles.settingLabel, { color: colors.text }]}>Dark Mode</Text>
          </View>
          <Switch
            testID="darkModeSwitch"
            accessibilityLabel="Toggle dark mode"
            onValueChange={toggleTheme}
            value={mode === 'dark'}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={mode === 'dark' ? '#2196F3' : '#f4f3f4'}
          />
        </View>

        <View style={[styles.colorSettingContainer, { backgroundColor: colors.card }]}>
          <Pressable
            style={({ pressed }) => [
              styles.colorSettingRow,
              pressed && styles.settingRowPressed,
            ]}
            onPress={() => toggleSection('pad')}
          >
            <View style={styles.settingContent}>
              <Ionicons name="color-palette-outline" size={22} color={colors.text} />
              <Text style={[styles.settingLabel, { color: colors.text }]}>Counter Pad Color</Text>
            </View>
            <View style={styles.settingRight}>
              <View style={[styles.colorPreview, { backgroundColor: padColor }]} />
              <Ionicons
                name={expandedSection === 'pad' ? 'chevron-down' : 'chevron-forward'}
                size={20}
                color={colors.text}
                style={styles.chevron}
              />
            </View>
          </Pressable>
          {expandedSection === 'pad' && (
            <View style={styles.colorPickerInline}>
              {COLORS.map((color) => (
                <Pressable
                  key={color.value}
                  style={({ pressed }) => [
                    styles.colorSwatch,
                    { backgroundColor: color.value },
                    padColor === color.value && styles.colorSwatchSelected,
                    pressed && styles.colorSwatchPressed,
                  ]}
                  onPress={() => setPadColor(color.value)}
                >
                  {padColor === color.value && (
                    <Ionicons name="checkmark" size={18} color="#fff" />
                  )}
                </Pressable>
              ))}
            </View>
          )}
        </View>

        <View style={[styles.colorSettingContainer, { backgroundColor: colors.card }]}>
          <Pressable
            style={({ pressed }) => [
              styles.colorSettingRow,
              pressed && styles.settingRowPressed,
            ]}
            onPress={() => toggleSection('icon')}
          >
            <View style={styles.settingContent}>
              <Ionicons name="ellipsis-horizontal-circle-outline" size={22} color={colors.text} />
              <Text style={[styles.settingLabel, { color: colors.text }]}>Top Icons Color</Text>
            </View>
            <View style={styles.settingRight}>
              <View style={[styles.colorPreview, { backgroundColor: iconColor }]} />
              <Ionicons
                name={expandedSection === 'icon' ? 'chevron-down' : 'chevron-forward'}
                size={20}
                color={colors.text}
                style={styles.chevron}
              />
            </View>
          </Pressable>
          {expandedSection === 'icon' && (
            <View style={styles.colorPickerInline}>
              {COLORS.map((color) => (
                <Pressable
                  key={color.value}
                  style={({ pressed }) => [
                    styles.colorSwatch,
                    { backgroundColor: color.value },
                    iconColor === color.value && styles.colorSwatchSelected,
                    pressed && styles.colorSwatchPressed,
                  ]}
                  onPress={() => setIconColor(color.value)}
                >
                  {iconColor === color.value && (
                    <Ionicons name="checkmark" size={18} color="#fff" />
                  )}
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionHeader, { color: colors.text }]}>About</Text>

        <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.infoText, { color: colors.text }]}>
            Thank you for using the Custom Counter app! This product was developed
            by Deep Blue Development LLC.
          </Text>
          <Text style={[styles.infoText, { color: colors.text }]}>
            We welcome your feedback and appreciate you joining the Deep Blue
            Development community!
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionHeader, { color: colors.text }]}>Links</Text>

        <Pressable
          style={({ pressed }) => [
            styles.linkRow,
            { backgroundColor: colors.card },
            pressed && styles.settingRowPressed,
          ]}
          onPress={() => Linking.openURL('https://enterdeepblue.com/contact.html')}
        >
          <View style={styles.settingContent}>
            <Ionicons name="chatbubble-outline" size={22} color={colors.text} />
            <Text style={[styles.settingLabel, { color: colors.text }]}>Product Feedback</Text>
          </View>
          <Ionicons name="open-outline" size={20} color={colors.text} style={styles.chevron} />
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.linkRow,
            { backgroundColor: colors.card },
            pressed && styles.settingRowPressed,
          ]}
          onPress={() => Linking.openURL('https://www.enterdeepblue.com/')}
        >
          <View style={styles.settingContent}>
            <Ionicons name="globe-outline" size={22} color={colors.text} />
            <Text style={[styles.settingLabel, { color: colors.text }]}>Company Website</Text>
          </View>
          <Ionicons name="open-outline" size={20} color={colors.text} style={styles.chevron} />
        </Pressable>
      </View>

      <View style={styles.versionContainer}>
        <Text style={[styles.versionText, { color: colors.text }]}>
          Version {packageJson.version}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 8,
    marginLeft: 4,
    opacity: 0.6,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 2,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  settingRowPressed: {
    opacity: 0.7,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    marginLeft: 12,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorPreview: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  chevron: {
    marginLeft: 8,
    opacity: 0.5,
  },
  colorSettingContainer: {
    borderRadius: 12,
    marginBottom: 2,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  colorSettingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  colorPickerInline: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    paddingBottom: 12,
    gap: 8,
  },
  colorSwatch: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  colorSwatchSelected: {
    borderColor: '#fff',
    borderWidth: 3,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  colorSwatchPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  infoCard: {
    padding: 16,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  infoText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  versionContainer: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 13,
    opacity: 0.5,
  },
});

export default CounterSettingsScreen;
