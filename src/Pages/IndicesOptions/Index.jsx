import React, { useState, useEffect } from "react";
import {
	Container,
	Button,
	Content,
	Text,
} from './Style'

import StarRating from "../Components/star";
import Header from "../Components/Header/Index";
import { AntDesign } from '@expo/vector-icons';
import { excluir } from "../../Services/Networks/excluir";
import DeleteModal from "../Components/DeleteModal/Index";
import { economicoInfo, socialInfoRisc, tecnicoInfo } from "../../Configs/Fonts/IndicadorInfo";
import Score from "../Components/Score/Index";
import { getGlobalScore } from "./Indicador/Index";

function IndicesOptions({ navigation, route }) {
    const aterroData = route.params.aterroData;
	const analiseData = route.params.analiseData;
	const [selectedScore, setSelectedScore] = useState(0)
	const [modalVisible, setModalVisible] = useState(false);
	const [scoreStar, setScoreStar] = useState(0)

	const loadScore = async () => {
		var response
		response = await getGlobalScore(analiseData.CodAnalise, tecnicoInfo.details.firstQuestion, socialInfoRisc.details.lastQuestion)
		
		let ScoreAtual = ((response[0].Pontuacao / (tecnicoInfo.details.maxScore + economicoInfo.details.maxScore + socialInfoRisc.details.maxScore)) * 100).toFixed()
		console.log(ScoreAtual)
		if (ScoreAtual == 0) {
			setScoreStar(0);
		} else if (ScoreAtual >= 1 && ScoreAtual < 20) {
			setScoreStar(1);
		}else if (ScoreAtual >= 20 && ScoreAtual < 40) {
			setScoreStar(2);
		} else if (ScoreAtual >= 40 && ScoreAtual < 60) {
			setScoreStar(3);
		} else if (ScoreAtual >= 60 && ScoreAtual < 80) {
			setScoreStar(4);
		} else if (ScoreAtual >= 80 && ScoreAtual <= 100) {
			setScoreStar(5);
		} else {
			setScoreStar(0);
		}

        setSelectedScore(response[0].Pontuacao)
	}

	const deleteData = async () => {
		await excluir(analiseData.CodAnalise, 'analise')
	}

	
	useEffect(() => {
		loadScore()
	}, [])


    return(
        <Container>
            <Header title={`Índices de ${aterroData.Nome} ${analiseData.DataIni}`}/>
			<Score 
				scored={selectedScore} 
				total={tecnicoInfo.details.maxScore + economicoInfo.details.maxScore + socialInfoRisc.details.maxScore}
			/>
			<StarRating initialRating={scoreStar} />

            <Content>
				<Button onPress={() => navigation.navigate('Indicador', {
					type: "Técnico", 
					aterroData: aterroData, 
					analiseData: analiseData, 
					indicadorData: tecnicoInfo.data, 
					indicadorDetails: tecnicoInfo.details
				})}>
					<Text>Cadastrar Indicador Técnico</Text>
				</Button>

				<Button onPress={() => navigation.navigate('Indicador', {
					type: "Econômico", 
					aterroData: aterroData, 
					analiseData: analiseData, 
					indicadorData: economicoInfo.data, 
					indicadorDetails: economicoInfo.details
				})}>
					<Text>Cadastrar Indicador Econômico</Text>
				</Button>

				<Button onPress={() => navigation.navigate('Indicador', {
					type: "Social", 
					aterroData: aterroData, 
					analiseData: analiseData, 
					indicadorData: socialInfoRisc.data, 
					indicadorDetails: socialInfoRisc.details, 
				})}>
					<Text>Cadastrar Indicador Social</Text>
				</Button>

				<Button onPress={() => setModalVisible(!modalVisible)}>
					<AntDesign name="delete" size={24} color="red" />
					<Text>Excluir Analise {analiseData.DataIni}</Text>
				</Button>
			</Content>
			
			<DeleteModal modalVisible={modalVisible} setModalVisible={setModalVisible} navigation={navigation} deleteFunction={deleteData}/>
        </Container>
    );
};

export default IndicesOptions;
