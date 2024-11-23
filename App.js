import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles'; // Estilos importados

// Tela de Login
function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('user');
      const storedPassword = await AsyncStorage.getItem('password');

      if (storedUsername === username && storedPassword === password) {
        navigation.replace('Home');
      } else {
        Alert.alert('Erro', 'Usuário ou senha incorretos');
      }
    } catch (error) {
      console.error('Erro ao realizar login:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
        <Text style={styles.linkText}>Criar Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

// Tela de Criar Conta
function CreateAccountScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccount = async () => {
    if (username && password) {
      try {
        await AsyncStorage.setItem('user', username);
        await AsyncStorage.setItem('password', password);
        Alert.alert('Sucesso', 'Conta criada com sucesso!');
        navigation.replace('Home');
      } catch (error) {
        console.error('Erro ao criar conta:', error);
        Alert.alert('Erro', 'Não foi possível criar a conta.');
      }
    } else {
      Alert.alert('Erro', 'Preencha todos os campos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Criar Conta</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity onPress={handleCreateAccount} style={styles.button}>
        <Text style={styles.buttonText}>Criar Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

// Tela de Agendamento
function Schedule({ navigation }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSchedule = async () => {
    if (name && phone && service && date && time) {
      const newAppointment = {
        id: Date.now(),
        name,
        phone,
        service,
        date,
        time,
      };
      try {
        const existingAppointments = await AsyncStorage.getItem('appointments');
        const appointments = existingAppointments ? JSON.parse(existingAppointments) : [];
        appointments.push(newAppointment);
        await AsyncStorage.setItem('appointments', JSON.stringify(appointments));
        Alert.alert('Agendamento', 'Agendamento realizado com sucesso.');
        navigation.navigate('Appointments');
      } catch (error) {
        console.error('Erro ao salvar o agendamento:', error);
        Alert.alert('Erro', 'Não foi possível agendar o serviço.');
      }
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Agendar Serviço</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        onChangeText={setName}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        keyboardType="phone-pad"
        onChangeText={setPhone}
        value={phone}
      />
      <TextInput
        style={styles.input}
        placeholder="Serviço"
        onChangeText={setService}
        value={service}
      />
      <TextInput
        style={styles.input}
        placeholder="Data (DD/MM/AAAA)"
        onChangeText={setDate}
        value={date}
      />
      <TextInput
        style={styles.input}
        placeholder="Hora (HH:MM)"
        onChangeText={setTime}
        value={time}
      />
      <TouchableOpacity onPress={handleSchedule} style={styles.button}>
        <Text style={styles.buttonText}>Agendar</Text>
      </TouchableOpacity>
    </View>
  );
}

// Tela de Meus Agendamentos
function Appointments({ navigation }) {
  const [appointments, setAppointments] = useState([]);

  const loadAppointments = async () => {
    try {
      const storedAppointments = await AsyncStorage.getItem('appointments');
      setAppointments(storedAppointments ? JSON.parse(storedAppointments) : []);
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleMarkAsCompleted = async (id) => {
    try {
      const storedAppointments = await AsyncStorage.getItem('appointments');
      const appointments = storedAppointments ? JSON.parse(storedAppointments) : [];
      const updatedAppointments = appointments.filter((appointment) => appointment.id !== id);
      await AsyncStorage.setItem('appointments', JSON.stringify(updatedAppointments));
      setAppointments(updatedAppointments);
      Alert.alert('Concluído', 'Agendamento concluído com sucesso.');
    } catch (error) {
      console.error('Erro ao concluir agendamento:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Meus Agendamentos</Text>
      {appointments.length > 0 ? (
        appointments.map((appointment) => (
          <View key={appointment.id} style={styles.appointmentItem}>
            <Text>Nome: {appointment.name}</Text>
            <Text>Telefone: {appointment.phone}</Text>
            <Text>Serviço: {appointment.service}</Text>
            <Text>Data: {appointment.date}</Text>
            <Text>Hora: {appointment.time}</Text>
            <TouchableOpacity
              onPress={() => handleMarkAsCompleted(appointment.id)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Marcar como Concluído</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text>Não há agendamentos.</Text>
      )}
    </View>
  );
}

// Tela Home
function HomeScreen({ navigation }) {
  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('password');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Schedule')} style={styles.button}>
        <Text style={styles.buttonText}>Fazer Agendamento</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Appointments')} style={styles.button}>
        <Text style={styles.buttonText}>Meus Agendamentos</Text>
      </TouchableOpacity>
    </View>
  );
}

// Navegação Principal
export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Schedule" component={Schedule} />
        <Stack.Screen name="Appointments" component={Appointments} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}