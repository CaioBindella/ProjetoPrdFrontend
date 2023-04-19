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


// await axios
// 	.post('http://10.0.10.143:3030/organizacao', data)
// 	.then((response) => {
// 		console.log(response);
// 		navigation.navigate('Home');
// 	})
// 	.catch((error) => console.log(JSON.stringify(error)));


// await axios
    // 	.post('http://10.0.10.143:3030/municipio', data)
    // 	.then((response) => {
    // 		console.log(response);
    // 		navigation.navigate('Aterro');
    // 	})
    // 	.catch((error) => console.log(JSON.stringify(error)));

// await axios
    // 	.post('http://10.0.10.143:3030/organizacao', data)
    // 	.then((response) => {
    // 		console.log(response);
    // 		navigation.navigate('Home');
    // 	})
    // 	.catch((error) => console.log(JSON.stringify(error)));

// let lastTitle = response[0].Titulo;
        // let lastDescription = response[0].DescInd;
        // responses.push(response[0].Desc)
          
        // for (let i = 1; i < response.length; i++) {
            
        //     if (response[i].Titulo === lastTitle) {
        //         lastTitle = response[i].Titulo;
        //         lastDescription = response[i].DescInd
        //         responses.push(response[i].Desc)
                
        //     } 
        //     else if(i === response.length-1){
        //         responseObject.push({
        //             Titulo: lastTitle,
        //             DescInd: lastDescription,
        //             Options: responses
                    
        //         })
        //     }
        //     else {
        //         responseObject.push({
        //             Titulo: lastTitle,
        //             DescInd: lastDescription,
        //             Options: responses
                    
        //         })
        //         responses = []
        //         lastTitle = response[i].Titulo;
        //         lastDescription = response[i].DescInd
        //     }
        // }

        // console.log(responseObject)