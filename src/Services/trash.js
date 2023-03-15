{/* {data ?
    <Item
        Endereco={data.Endereco}
        Nome={data.Nome}
        Latitude={data.Latitude}
        Longitude={data.Longitude}
        item={data}
        navigation={navigation}
    />
    :
    null
} */}



{/* {data ?
<FlatList
    data={data}
    renderItem={({ item }) => (
        <Item
            Endereco={item.Endereco}
            Nome={item.Nome}
            Latitude={item.Latitude}
            Longitude={item.Longitude}
            item={item}
            navigation={navigation}
        />
    )}
    keyExtractor={(item) => item.Nome}
    showsVerticalScrollIndicator={false}
/>
:
null
} */}

		// axios
		// 	.get('http://10.0.10.143:3030/aterros')
		// 	.then((response) => {
		// 		setData(response.data);
		// 	})
		// 	.catch((error) => console.log(JSON.stringify(error)));

		// const dataAterro = await AsyncStorage.getItem('dataAterro')
		// console.log(dataAterro)


// await axios
    // 	.post('http://10.0.10.143:3030/aterro', data)
    // 	.then((response) => {
    // 		console.log(response);
    // 		navigation.navigate('Profissional');
    // 	})
    // 	.catch((error) => console.log(JSON.stringify(error)));