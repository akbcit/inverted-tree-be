import { Archetype } from "./archetypes"



export interface OptionMap {
    [option: number]: string;
}

export interface QuizKey {
    [question: number]: OptionMap;
}

export interface QuizMap {
    quizID: number,
    quizKey: QuizKey,
}

export const quizMap: QuizMap[] = [
    {
        quizID: 1,
        quizKey: {
            0: {
                0: Archetype.Goddess.Saraswati,
                1: Archetype.Goddess.Durga,
                2: Archetype.Goddess.Lakshmi,
                3: Archetype.Goddess.Parvati,
                4: Archetype.Goddess.Kali,
                5: Archetype.Goddess.Lalita_Tripura_Sundari,
            },
            1: {
                0: Archetype.Goddess.Saraswati,
                1: Archetype.Goddess.Durga,
                2: Archetype.Goddess.Lakshmi,
                3: Archetype.Goddess.Parvati,
                4: Archetype.Goddess.Kali,
                5: Archetype.Goddess.Lalita_Tripura_Sundari,
            },
            2: {
                0: Archetype.Goddess.Saraswati,
                1: Archetype.Goddess.Durga,
                2: Archetype.Goddess.Lakshmi,
                3: Archetype.Goddess.Parvati,
                4: Archetype.Goddess.Kali,
                5: Archetype.Goddess.Lalita_Tripura_Sundari,
            },
            3: {
                0: Archetype.Goddess.Saraswati,
                1: Archetype.Goddess.Durga,
                2: Archetype.Goddess.Lakshmi,
                3: Archetype.Goddess.Parvati,
                4: Archetype.Goddess.Kali,
                5: Archetype.Goddess.Lalita_Tripura_Sundari,
            },
            4: {
                0: Archetype.Goddess.Saraswati,
                1: Archetype.Goddess.Durga,
                2: Archetype.Goddess.Lakshmi,
                3: Archetype.Goddess.Parvati,
                4: Archetype.Goddess.Kali,
                5: Archetype.Goddess.Lalita_Tripura_Sundari,
            },
            5: {
                0: Archetype.Goddess.Saraswati,
                1: Archetype.Goddess.Durga,
                2: Archetype.Goddess.Lakshmi,
                3: Archetype.Goddess.Parvati,
                4: Archetype.Goddess.Kali,
                5: Archetype.Goddess.Lalita_Tripura_Sundari,
            },
            6: {
                0: Archetype.Goddess.Saraswati,
                1: Archetype.Goddess.Durga,
                2: Archetype.Goddess.Lakshmi,
                3: Archetype.Goddess.Parvati,
                4: Archetype.Goddess.Kali,
                5: Archetype.Goddess.Lalita_Tripura_Sundari,
            },
            7: {
                0: Archetype.Goddess.Saraswati,
                1: Archetype.Goddess.Durga,
                2: Archetype.Goddess.Lakshmi,
                3: Archetype.Goddess.Parvati,
                4: Archetype.Goddess.Kali,
                5: Archetype.Goddess.Lalita_Tripura_Sundari,
            },
            8: {
                0: Archetype.Goddess.Saraswati,
                1: Archetype.Goddess.Durga,
                2: Archetype.Goddess.Lakshmi,
                3: Archetype.Goddess.Parvati,
                4: Archetype.Goddess.Kali,
                5: Archetype.Goddess.Lalita_Tripura_Sundari,
            },

        },
    },
];



