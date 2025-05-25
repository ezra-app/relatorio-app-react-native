import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Modal,
  TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RNDateTimePicker from '@react-native-community/datetimepicker';

export default function AddReportScreen({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState({ hours: 0, minutes: 0 });
  const [studies, setStudies] = useState('0');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showHoursPicker, setShowHoursPicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const formatHours = (hours, minutes) => {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const increaseHours = () => {
    setHours(prev => ({
      ...prev,
      hours: prev.hours + 1
    }));
  };

  const decreaseHours = () => {
    setHours(prev => ({
      ...prev,
      hours: Math.max(0, prev.hours - 1)
    }));
  };

  const increaseMinutes = () => {
    const newMinutes = hours.minutes + 15;
    if (newMinutes >= 60) {
      setHours(prev => ({
        hours: prev.hours + 1,
        minutes: 0
      }));
    } else {
      setHours(prev => ({
        ...prev,
        minutes: newMinutes
      }));
    }
  };

  const decreaseMinutes = () => {
    const newMinutes = hours.minutes - 15;
    if (newMinutes < 0) {
      if (hours.hours > 0) {
        setHours(prev => ({
          hours: prev.hours - 1,
          minutes: 45
        }));
      }
    } else {
      setHours(prev => ({
        ...prev,
        minutes: newMinutes
      }));
    }
  };

  const validateAndUpdateHours = (text) => {
    const number = parseInt(text) || 0;
    if (number >= 0) {
      setHours(prev => ({
        ...prev,
        hours: number
      }));
    }
  };

  const validateAndUpdateMinutes = (text) => {
    const number = parseInt(text) || 0;
    if (number >= 0 && number < 60) {
      setHours(prev => ({
        ...prev,
        minutes: number
      }));
    }
  };

  const handleSubmit = () => {
    // TODO: Implementar salvamento no banco de dados
    navigation.goBack();
  };

  const formatDate = (date) => {
    const weekDays = [
      'Dom', 'Seg', 'Ter', 
      'Qua', 'Qui', 'Sex', 'Sáb'
    ];
    const weekDay = weekDays[date.getDay()];
    return `${weekDay}, ${date.toLocaleDateString('pt-BR')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={32} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Novo Relatório</Text>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <ScrollView contentContainerStyle={styles.formContainer}>
          {/* Data */}
          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <Ionicons name="calendar-outline" size={28} color="#2B7C85" />
              <Text style={styles.label}>Data:</Text>
            </View>
            <TouchableOpacity 
              style={styles.input}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.inputText}>
                {formatDate(date)}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Horas */}
          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <Ionicons name="time-outline" size={28} color="#2B7C85" />
              <Text style={styles.label}>Horas:</Text>
            </View>
            <TouchableOpacity 
              style={styles.input}
              onPress={() => setShowHoursPicker(true)}
            >
              <Text style={styles.inputText}>{formatHours(hours.hours, hours.minutes)}</Text>
            </TouchableOpacity>
          </View>

          {/* Estudos */}
          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <Ionicons name="school-outline" size={28} color="#2B7C85" />
              <Text style={styles.label}>Estudos:</Text>
            </View>
            <View style={styles.input}>
              <TextInput
                style={styles.studiesInput}
                value={studies}
                onChangeText={(text) => {
                  const number = text.replace(/[^0-9]/g, '');
                  setStudies(number);
                }}
                keyboardType="number-pad"
                placeholder="0"
                placeholderTextColor="#999"
              />
            </View>
          </View>

          {/* Botão Salvar */}
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSubmit}
          >
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <RNDateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChangeDate}
        />
      )}

      {/* Hours Picker Modal */}
      <Modal
        visible={showHoursPicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowHoursPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Quantidade de Horas</Text>
            
            <View style={styles.hoursPickerContainer}>
              {/* Horas */}
              <View style={styles.pickerColumn}>
                <TouchableOpacity onPress={increaseHours} style={styles.pickerButton}>
                  <Ionicons name="chevron-up" size={24} color="#2B7C85" />
                </TouchableOpacity>
                <TextInput
                  style={styles.pickerInput}
                  value={hours.hours.toString()}
                  onChangeText={validateAndUpdateHours}
                  keyboardType="number-pad"
                  maxLength={2}
                  selectTextOnFocus
                />
                <TouchableOpacity onPress={decreaseHours} style={styles.pickerButton}>
                  <Ionicons name="chevron-down" size={24} color="#2B7C85" />
                </TouchableOpacity>
                <Text style={styles.pickerLabel}>horas</Text>
              </View>

              <Text style={styles.pickerSeparator}>:</Text>

              {/* Minutos */}
              <View style={styles.pickerColumn}>
                <TouchableOpacity onPress={increaseMinutes} style={styles.pickerButton}>
                  <Ionicons name="chevron-up" size={24} color="#2B7C85" />
                </TouchableOpacity>
                <TextInput
                  style={styles.pickerInput}
                  value={hours.minutes.toString()}
                  onChangeText={validateAndUpdateMinutes}
                  keyboardType="number-pad"
                  maxLength={2}
                  selectTextOnFocus
                />
                <TouchableOpacity onPress={decreaseMinutes} style={styles.pickerButton}>
                  <Ionicons name="chevron-down" size={24} color="#2B7C85" />
                </TouchableOpacity>
                <Text style={styles.pickerLabel}>minutos</Text>
              </View>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setShowHoursPicker(false)}
              >
                <Text style={[styles.modalButtonText, styles.modalButtonTextCancel]}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonConfirm]}
                onPress={() => setShowHoursPicker(false)}
              >
                <Text style={[styles.modalButtonText, styles.modalButtonTextConfirm]}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
    gap: 25,
  },
  inputGroup: {
    gap: 10,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  label: {
    fontSize: 20,
    color: '#2B7C85',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  inputText: {
    fontSize: 18,
    color: '#2B7C85',
  },
  saveButton: {
    backgroundColor: '#FF7F50',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2B7C85',
    marginBottom: 20,
  },
  hoursPickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 20,
  },
  pickerColumn: {
    alignItems: 'center',
  },
  pickerButton: {
    padding: 10,
  },
  pickerInput: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2B7C85',
    textAlign: 'center',
    width: 60,
    padding: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  pickerLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  pickerSeparator: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2B7C85',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  modalButtonCancel: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#2B7C85',
  },
  modalButtonConfirm: {
    backgroundColor: '#FF7F50',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2B7C85',
  },
  modalButtonTextCancel: {
    color: '#2B7C85',
  },
  modalButtonTextConfirm: {
    color: '#fff',
  },
  studiesInput: {
    fontSize: 18,
    color: '#2B7C85',
    padding: 0,
    flex: 1,
  },
}); 