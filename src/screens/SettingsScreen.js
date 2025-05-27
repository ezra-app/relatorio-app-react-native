import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, headerTheme } from '../constants/colors';
import { useGoals } from '../contexts/GoalsContext';

const SettingSection = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionContent}>
      {children}
    </View>
  </View>
);

const SettingItem = ({ icon, title, subtitle, onPress, value }) => (
  <TouchableOpacity 
    style={styles.settingItem}
    onPress={onPress}
  >
    <View style={styles.settingIcon}>
      <Ionicons name={icon} size={24} color={colors.secondary} />
    </View>
    <View style={styles.settingInfo}>
      <Text style={styles.settingTitle}>{title}</Text>
      {subtitle && (
        <Text style={styles.settingSubtitle}>{subtitle}</Text>
      )}
    </View>
    <View style={styles.settingAction}>
      {value ? (
        <Text style={styles.settingValue}>{value}</Text>
      ) : (
        <Ionicons name="chevron-forward" size={24} color={colors.text.secondary} />
      )}
    </View>
  </TouchableOpacity>
);

export default function SettingsScreen({ navigation }) {
  const { goals, formatGoalHours } = useGoals();
  const monthlyGoal = formatGoalHours(goals.monthlyHours).formatted;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={32} color={headerTheme.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configurações</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Perfil */}
        <SettingSection title="Perfil">
          <SettingItem
            icon="person-outline"
            title="Informações Pessoais"
            subtitle="Configurar nome e email"
            onPress={() => navigation.navigate('PersonalInfo')}
          />
        </SettingSection>

        {/* Metas */}
        <SettingSection title="Metas">
          <SettingItem
            icon="time-outline"
            title="Meta Mensal"
            subtitle="Total de horas por mês"
            value={monthlyGoal}
            onPress={() => navigation.navigate('MonthlyGoal')}
          />
        </SettingSection>

        {/* Dias de Atividades */}
        <SettingSection title="Dias de Atividades">
          <SettingItem
            icon="calendar-number-outline"
            title="Dias da Semana"
            subtitle="Definir dias regulares de atividade"
            onPress={() => navigation.navigate('WorkDays')}
          />
        </SettingSection>

        {/* Backup */}
        <SettingSection title="Backup">
          <SettingItem
            icon="cloud-upload-outline"
            title="Fazer Backup"
            subtitle="Salvar seus dados na nuvem"
            onPress={() => {}}
          />
          <SettingItem
            icon="cloud-download-outline"
            title="Restaurar Backup"
            subtitle="Recuperar dados da nuvem"
            onPress={() => {}}
          />
        </SettingSection>

        {/* Sobre */}
        <SettingSection title="Sobre">
          <SettingItem
            icon="information-circle-outline"
            title="Versão do App"
            value="1.0.0"
          />
        </SettingSection>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    backgroundColor: headerTheme.background,
    paddingTop: 25,
    paddingBottom: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: headerTheme.text,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingTop: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionContent: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  settingAction: {
    marginLeft: 10,
  },
  settingValue: {
    fontSize: 16,
    color: colors.text.secondary,
  },
}); 