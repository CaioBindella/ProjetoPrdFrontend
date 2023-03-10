import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/Pages/home/Index';
import Aterro from './src/Pages/Cadastro/Aterro/Index';
import CadastroMunicipio from './src/Pages/Cadastro/Municipio/Index';
import Profissional from './src/Pages/Cadastro/Profissional/Index';
import Organizacao from './src/Pages/Cadastro/Organizacao/Index';
import MeusAterros from './src/Pages/MeusAterros/Index';
import UmAterro from './src/Pages/UmAterro/Index';

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
				<Stack.Screen
					name='Aterro'
					component={Aterro}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='CadastroMunicipio'
					component={CadastroMunicipio}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='Profissional'
					component={Profissional}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='Organizacao'
					component={Organizacao}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='MeusAterros'
					component={MeusAterros}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='UmAterro'
					component={UmAterro}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
