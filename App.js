import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/Pages/home/Index';
import Cadastro from './src/Pages/Cadastro/Aterro/Index';
import CadastroMunicipio from './src/Pages/Cadastro/Municipio/Index';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { useFonts } from 'expo-font';
// import { Loading } from 'expo-app-loading';

export default function App() {
	// const [fontsLoaded] = useFonts({
	// 	'Medula One': require('./assets/Fonts/Medula_One/MedulaOne-Regular.tff'),
	// });

	// if (!fontsLoaded) {
	// 	<Loading />
	// }

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
				<Stack.Screen
					name='CadastroMunicipio'
					component={CadastroMunicipio}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
