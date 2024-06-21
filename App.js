import { StatusBar } from 'expo-status-bar';
import Home from './src/Pages/Home/Index';
import CadastroIsoas from './src/Pages/CadastroIsoas/Index';
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
import Porte from './src/Pages/Cadastro/Porte/Index';
import AterroFinal from './src/Pages/Cadastro/Aterro/AterroFinal/Index';
import UpdateAterroFinal from './src/Pages/Updates/UpdateUmAterro/UpdateAterroFinal/Index';
import MeusMunicipios from './src/Pages/ListaDados/MeusMunicipios/Index';
import MinhasOrganizacoes from './src/Pages/ListaDados/MinhasOrganizacoes/Index'
import MeusPortes from './src/Pages/ListaDados/MeusPortes/Index'
import PainelAterro from './src/Pages/PainelAterro/Index';
import PainelBasicos from './src/Pages/PainelBasicos/Index';
import FormIndicador from './src/Pages/IndicesOptions/Indicador/FormIndicador/Index';
import MinhasAnalises from './src/Pages/ListaDados/MinhasAnalises/Index';
import Indicador from './src/Pages/IndicesOptions/Indicador/Index';
import SelectDate from './src/Pages/IndicesOptions/SelectDate/Index';
import Dashboard from './src/Pages/IndicesOptions/Dashboard/Index';
import TemporalDashboard from './src/Pages/IndicesOptions/TemporalDashboard/Index';
import Ferramentas from './src/Pages/Ferramentas/Index';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function App() {

	const Stack = createNativeStackNavigator();

	return (
		<>
			<StatusBar style='light' />
			<NavigationContainer >
				<Stack.Navigator>
					<Stack.Screen
						name='Home'
						component={Home}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name='CadastroIsoas'
						component={CadastroIsoas}
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
						name='Indicador'
						component={Indicador}
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
					<Stack.Screen
						name='FormIndicador'
						component={FormIndicador}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name='MinhasAnalises'
						component={MinhasAnalises}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name='SelectDate'
						component={SelectDate}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name='Dashboard'
						component={Dashboard}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name='Ferramentas'
						component={Ferramentas}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name='TemporalDashboard'
						component={TemporalDashboard}
						options={{ headerShown: false }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
}
