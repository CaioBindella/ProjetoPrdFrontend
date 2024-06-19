export const tecnicoInfo = {
    details:{
        maxScore: 638,
        firstQuestion: 1,
        lastQuestion: 78,
    },
    data: [
        {
            category: "Características Locacionais",
            subCategories: [
                {name: "Características fisiográficas", maxScore: 71},
                {name: "Interface socioambiental", maxScore: 51},
                {name: "Sistema viário público de acesso", maxScore: 40},
            ]
        },
        {
            category: "Infraestrutura Implantada",
            subCategories: [
                {name: "Avaliação da infraestrutura implantada", maxScore: 72},
                {name: "Avaliação do sistema de controle implantado", maxScore: 98}
            ]
        },
        {
            category: "Condições Operacionais",
            subCategories: [
                {name: "Caracteristicas operacionais", maxScore: 104},
                {name: "Avaliação da Eficiência dos Sistemas de Controle", maxScore: 125},
                {name: "Documentos básicos e diretrizes operacionais", maxScore: 77},
            ]
        }
    ]
}

export const economicoInfo = {
    details:{
        maxScore: 53,
        firstQuestion: 79,
        lastQuestion: 90,
    },
    data: [
        {
            category: "Avaliações",
            subCategories: [
                {name: "Disponibilidade de Equipamentos Mínimos Obrigatórios", maxScore: 53},
                {name: "Inadimplência", maxScore: 54} // Seria 0, mas eu coloquei assim para evitar erros na hora de pegar a pontuação dessa subcategoria
            ]
        }
    ]
}

export const socialInfoRisc = {
    details:{
        maxScore: 133,
        firstQuestion: 106,
        lastQuestion: 116,
    },
    data: [
        {
            category: "Análise de Risco",
            subCategories: [
                {name: "Percepção social dos impactos ambientais negativos da atividade - Análise de Risco", maxScore: 133},
            ]
        }
    ]
}