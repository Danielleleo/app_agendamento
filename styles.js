import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      backgroundColor: '#f4f4f4',
    },
  
    titleText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 15,
      textAlign: 'center',
    },
  
    input: {
      backgroundColor: '#FFF',
      padding: 12,
      borderRadius: 8,
      marginBottom: 15,
      width: '100%',
      borderWidth: 1,
      borderColor: '#ccc',
      fontSize: 16,
      color: '#333',
    },
  
    button: {
      backgroundColor: '#FF69B4', // Rosa
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 10,
    },
  
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
  
    logoutButton: {
      position: 'absolute',
      top: 20,
      right: 20,
      backgroundColor: '#FF69B4', // Rosa
      padding: 10,
      borderRadius: 8,
    },
  
    logoutButtonText: {
      color: '#fff',
      fontSize: 14,
    },
  
    appointmentItem: {
      backgroundColor: '#FFF',
      padding: 15,
      borderRadius: 8,
      marginVertical: 8,
      borderColor: '#ddd',
      borderWidth: 1,
      elevation: 2,
    },
    linkText: {
      color: '#FF69B4', // Cor rosa
      textAlign: 'center',
      marginTop: 10,
      fontSize: 16,
      fontWeight: '600',
    },
    
  });
  
  export default styles;