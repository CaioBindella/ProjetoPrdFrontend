import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/Pages/home/Index';
import Cadastro from './src/Pages/Cadastro/Index';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
	const Stack = createNativeStackNavigator();
	// <NavigationContainer>{/* Rest of your app code */}</NavigationContainer>
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name='Home'
					component={Home}
					options={{ headerShown: false }}
				/>
				<Stack.Screen name='Cadastro' component={Cadastro} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
