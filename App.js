import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/Pages/home/Index';
import Aterro from './src/Pages/Cadastro/Aterro/Index';
import CadastrosBasicos from './src/Pages/CadastrosBasicos/Index';
import CadastroMunicipio from './src/Pages/Cadastro/Municipio/Index';
import Profissional from './src/Pages/Cadastro/Profissional/Index';
import Organizacao from './src/Pages/Cadastro/Organizacao/Index';
import MeusAterros from './src/Pages/ListaDados/MeusAterros/Index';
import UpdateUmAterro from './src/Pages/Updates/UpdateUmAterro/Index';
import UpdateUmMunicipio from './src/Pages/Updates/UpdateUmMunicipio/Index';
import UpdateOrg from './src/Pages/Updates/UpdateOrg/Index';
import UpdateProf from './src/Pages/Updates/UpdateProf/Index';
import UpdatePorte from './src/Pages/Updates/UpdatePorte/Index'
import IndicesOptions from './src/Pages/IndicesOptions/Index';
import IndicadorTecnico from './src/Pages/IndicesOptions/IndicadorTecnico/Index';
import Porte from './src/Pages/Cadastro/Porte/Index';
import AterroFinal from './src/Pages/Cadastro/Aterro/AterroFinal/Index';
import UpdateAterroFinal from './src/Pages/Updates/UpdateUmAterro/UpdateAterroFinal/Index';
import MeusMunicipios from './src/Pages/ListaDados/MeusMunicipios/Index';
import MinhasOrganizacoes from './src/Pages/ListaDados/MinhasOrganizacoes/Index'
import MeusPortes from './src/Pages/ListaDados/MeusPortes/Index'
import PainelAterro from './src/Pages/PainelAterro/Index';
import PainelBasicos from './src/Pages/PainelBasicos/Index';

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
					name='CadastrosBasicos'
					component={CadastrosBasicos}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='Aterro'
					component={Aterro}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='AterroFinal'
					component={AterroFinal}
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
					name='Porte'
					component={Porte}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='MeusAterros'
					component={MeusAterros}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='UpdateUmAterro'
					component={UpdateUmAterro}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='UpdateUmMunicipio'
					component={UpdateUmMunicipio}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='UpdateOrg'
					component={UpdateOrg}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='UpdatePorte'
					component={UpdatePorte}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='UpdateProf'
					component={UpdateProf}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='IndicesOptions'
					component={IndicesOptions}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='IndiceTecnico'
					component={IndicadorTecnico}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='UpdateAterroFinal'
					component={UpdateAterroFinal}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='MeusMunicipios'
					component={MeusMunicipios}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='MinhasOrganizacoes'
					component={MinhasOrganizacoes}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='MeusPortes'
					component={MeusPortes}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='PainelAterro'
					component={PainelAterro}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='PainelBasicos'
					component={PainelBasicos}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
