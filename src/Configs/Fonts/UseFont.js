// Rest of the import statements
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Medula One': require('../../../assets/Fonts/Medula_One/Medula_One-regular.tff'),
  });

  // ...
}

