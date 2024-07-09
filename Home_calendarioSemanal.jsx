import React, {useState} from 'react';
import { Text, View, TouchableOpacity, Modal, FlatList, StyleSheet, ScrollView } from 'react-native';
import exercises from './ejercicios.json';
import styles from '../estilos/calendarioSemanalStyle'

const daysOfWeek = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const hoursOfDay = Array.from({ length: 24 }, (_, i) => `${i}:00`);


export default function Calendario_Semanal() {
    const [selectedRange, setSelectedRange] = useState({ day: null, startHour: null, endHour: null });
    const [isSelecting, setIsSelecting] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [events, setEvents] = useState([]);
    const [selectedExercises, setSelectExercise] = useState([]);
    const [schedule, setSchedule] = useState([]);

    const handleHourPress = (day, hour) => {
    };

    const handleConfirmSelection = () => {
        setIsSelecting(false);
        setModalVisible(true);
    };

    const handleAddExercise = (exercise) => {
        setSelectExercise(prevExercises => [...prevExercises, exercise]);
    };

    const handleFinish = () => {
        setSchedule(prevSchedule => [
            ...prevSchedule,
            { ...selectedRange, exercises: selectedExercises }
        ]);
        setSelectExercise([]);
        setModalVisible(false);
    };

    const isHourInRange = (day, hour) => {
        if (selectedRange.day !== day || selectedRange.startHour === null || selectedRange.endHour === null) {
            return false;
        }
        const start = parseInt(selectedRange.startHour);
        const end = parseInt(selectedRange.endHour);
        const current = parseInt(hour);

        return start <= current && current <= end;
    };

    const getDayIndex = (date) => {
        const day = new Date(date).getDay();
        return day === 0 ? 6 : day - 1; // Ajusta para que el domingo sea el último día de la semana
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.calendar}>
                    {daysOfWeek.map((day, dayIndex) => (
                        <View key={day} style={styles.dayColumn}>
                            <Text style={styles.dayHeader}>{day}</Text>
                            {hoursOfDay.map(hour => (
                                <TouchableOpacity
                                    key={hour}
                                    style={[
                                        styles.hourBlock,
                                        isHourInRange(day, hour) ? styles.selectedHourBlock : null,
                                        events.some(event => {
                                            const eventStart = new Date(event.start.dateTime).getHours();
                                            const eventEnd = new Date(event.end.dateTime).getHours();
                                            return getDayIndex(event.start.dateTime) === dayIndex && eventStart <= parseInt(hour) && parseInt(hour) < eventEnd;
                                        }) ? styles.occupiedHourBlock : null
                                    ]}
                                    onPress={() => handleHourPress(day, hour)}
                                >
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))}
                </View>
            </ScrollView>

            {isSelecting && (
                <TouchableOpacity onPress={handleConfirmSelection} style={styles.confirmButton}>
                    <Text style={styles.confirmButtonText}>Confirmar Selección</Text>
                </TouchableOpacity>
            )}

            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <Text style={styles.modalHeader}>Añadir Ejercicio</Text>
                    <Text style={styles.modalSubHeader}>
                        Día: {selectedRange.day}, Horas: {selectedRange.startHour} - {selectedRange.endHour}
                    </Text>
                    <FlatList
                        data={exercises}
                        renderItem={({ item }) => (
                            <View style={styles.card_ejercicio_a}>
                                <View style={styles.info_ejercicio_a}>
                                    <Text style={styles.title_ejercicio_a}>{item.nombre}</Text>
                                    <Text style={styles.description_ejercicio_a}>{item.descripcion}</Text>
                                    <Text style={styles.detail_ejercicio_a}>Dificultad: {item.dificultad}</Text>
                                    <Text style={styles.detail_ejercicio_a}>Equipo: {item.equipo}</Text>
                                    <Text style={styles.detail_ejercicio_a}>Peso: {item.peso} kg</Text>
                                    <Text style={styles.detail_ejercicio_a}>Series: {item.series}</Text>
                                    <Text style={styles.detail_ejercicio_a}>Repeticiones: {item.repeticiones}</Text>
                                    <Text style={styles.detail_ejercicio_a}>Duración: {item.duracion} s</Text>
                                </View>
                                <TouchableOpacity onPress={() => handleAddExercise(item)} style={styles.addButton}>
                                    <Text style={styles.addButtonText}>Añadir</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                    <View style={styles.selectedExercises}>
                        {selectedExercises.map((exercise, index) => (
                            <Text key={index}>{exercise.nombre}</Text>
                        ))}
                    </View>
                    <TouchableOpacity onPress={handleFinish} style={styles.finishButton}>
                        <Text style={styles.finishButtonText}>Terminar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}


