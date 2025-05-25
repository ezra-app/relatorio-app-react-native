import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions, Platform } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import RNDateTimePicker from '@react-native-community/datetimepicker';

export default function HomeScreen() {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  
  const month = date.toLocaleString('pt-BR', { month: 'long' }).replace(/^\w/, c => c.toUpperCase());
  const year = date.getFullYear();
  const screenWidth = Dimensions.get('window').width;

  const showDatepicker = () => {
    setShow(true);
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const goToPreviousMonth = () => {
    const newDate = new Date(date.setMonth(date.getMonth() - 1));
    setDate(new Date(newDate));
  };

  const goToNextMonth = () => {
    const newDate = new Date(date.setMonth(date.getMonth() + 1));
    setDate(new Date(newDate));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{`${month} ${year}`}</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="settings-outline" size={32} color="#FF7F50" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.mainContent}>
        {/* Relatório Section */}
        <View style={styles.section}>
          <View style={styles.sectionTitleContainer}>
            <MaterialCommunityIcons name="notebook-outline" size={32} color="#2B7C85" />
            <Text style={styles.sectionTitle}>Relatório</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.addButton}>
                <Ionicons name="play" size={38} color="#FF7F50" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.addButton}>
                <Ionicons name="add-circle" size={38} color="#FF7F50" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statsWrapper}>
              <View style={[styles.statRow, styles.statRowLarge]}>
                <View style={styles.statContent}>
                  <View style={styles.statIconContainer}>
                    <Ionicons name="time-outline" size={40} color="#2B7C85" />
                  </View>
                  <View style={styles.statTextContainer}>
                    <Text style={styles.statLabel}>Horas:</Text>
                    <Text style={styles.statValue}>00:00</Text>
                  </View>
                </View>
              </View>

              <View style={[styles.statRow, styles.statRowLarge]}>
                <View style={styles.statContent}>
                  <View style={styles.statIconContainer}>
                    <FontAwesome5 name="graduation-cap" size={36} color="#2B7C85" />
                  </View>
                  <View style={styles.statTextContainer}>
                    <Text style={styles.statLabel}>Estudos:</Text>
                    <Text style={styles.statValue}>0</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Navigation Buttons */}
          <View style={styles.navButtons}>
            <TouchableOpacity 
              style={styles.navButton}
              onPress={goToPreviousMonth}
            >
              <Ionicons name="chevron-back" size={32} color="#2B7C85" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.navButton}
              onPress={showDatepicker}
            >
              <Ionicons name="calendar-outline" size={32} color="#2B7C85" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.navButton}
              onPress={goToNextMonth}
            >
              <Ionicons name="chevron-forward" size={32} color="#2B7C85" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton}>
              <Ionicons name="paper-plane-outline" size={32} color="#2B7C85" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton}>
              <MaterialIcons name="list-alt" size={32} color="#2B7C85" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Goals Section */}
        <View style={[styles.section, styles.goalsSection]}>
          <View style={styles.goalsTitleContainer}>
            <MaterialCommunityIcons name="chart-line" size={32} color="#fff" />
            <Text style={styles.goalsTitle}>Minhas Metas</Text>
          </View>
          
          <View style={styles.goalsContent}>
            <View style={styles.goalsWrapper}>
              <View style={styles.goalCard}>
                <View style={styles.goalIconContainer}>
                  <MaterialCommunityIcons name="target" size={32} color="#2B7C85" />
                </View>
                <Text style={styles.goalLabel}>Meta Total:</Text>
                <Text style={styles.goalValue}>15:00 hrs</Text>
              </View>

              <View style={styles.goalCard}>
                <View style={styles.goalIconContainer}>
                  <MaterialCommunityIcons name="clock-time-four" size={32} color="#2B7C85" />
                </View>
                <Text style={styles.goalLabel}>Meta Diária:</Text>
                <Text style={styles.goalValue}>07:30 hrs</Text>
              </View>

              <View style={styles.goalCard}>
                <View style={styles.goalIconContainer}>
                  <MaterialCommunityIcons name="timer-sand" size={32} color="#2B7C85" />
                </View>
                <Text style={styles.goalLabel}>Faltam:</Text>
                <Text style={styles.goalValue}>15:00 hrs</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {Platform.OS === 'android' ? (
        show && (
          <RNDateTimePicker
            value={date}
            mode="date"
            onChange={onChangeDate}
          />
        )
      ) : (
        show && (
          <RNDateTimePicker
            value={date}
            mode="date"
            onChange={onChangeDate}
            display="spinner"
          />
        )
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#2B7C85',
    paddingTop: 18,
    paddingBottom: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: -8,
  },
  headerButton: {
    marginLeft: 8,
    padding: 8,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'column',
  },
  section: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2B7C85',
    marginLeft: 15,
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  addButton: {
    padding: 8,
    marginLeft: 10,
  },
  statsContainer: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  statsWrapper: {
    flex: 1,
    justifyContent: 'center',
    gap: 15,
  },
  statRow: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statRowLarge: {
    padding: 15,
  },
  statContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  statLabel: {
    color: '#2B7C85',
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 2,
  },
  statValue: {
    color: '#2B7C85',
    fontSize: 28,
    fontWeight: 'bold',
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#f8f9fa',
  },
  navButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  goalsSection: {
    backgroundColor: '#2B7C85',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  goalsTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  goalsTitle: {
    color: '#fff',
    fontSize: 28,
    marginLeft: 15,
    fontWeight: 'bold',
  },
  goalsContent: {
    flex: 1,
  },
  goalsWrapper: {
    gap: 15,
  },
  goalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  goalIconContainer: {
    width: 50,
    alignItems: 'center',
  },
  goalLabel: {
    color: '#2B7C85',
    fontSize: 20,
    marginLeft: 15,
    flex: 1,
    fontWeight: '500',
  },
  goalValue: {
    color: '#2B7C85',
    fontSize: 24,
    fontWeight: 'bold',
    minWidth: 100,
    textAlign: 'right',
  },
}); 