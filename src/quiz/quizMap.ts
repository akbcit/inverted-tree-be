import { Archetype } from "./archetypes"



export interface OptionMap {
    [option: number]: string;
}

export interface QuestionKey {
    [question: number]: Array<OptionMap>;
}

export interface QuizMap {
    quizID: number,
    quizKey: Array<QuestionKey>,
}

export const quizMap: Array<QuizMap> = [
    {
        quizID: 1,
        quizKey: [
            {
                1: [
                    { 1: Archetype.Goddess.Saraswati },
                    { 2: Archetype.Goddess.Durga },
                    { 3: Archetype.Goddess.Lakshmi },
                    { 4: Archetype.Goddess.Parvati },
                    { 5: Archetype.Goddess.Kali },
                    { 6: Archetype.Goddess.Lalita_Tripura_Sundari }
                ]
            },
            {
                2: [
                    { 1: Archetype.Goddess.Saraswati },
                    { 2: Archetype.Goddess.Durga },
                    { 3: Archetype.Goddess.Lakshmi },
                    { 4: Archetype.Goddess.Parvati },
                    { 5: Archetype.Goddess.Kali },
                    { 6: Archetype.Goddess.Lalita_Tripura_Sundari }
                ]
            },
            {
                3: [
                    { 1: Archetype.Goddess.Saraswati },
                    { 2: Archetype.Goddess.Durga },
                    { 3: Archetype.Goddess.Lakshmi },
                    { 4: Archetype.Goddess.Parvati },
                    { 5: Archetype.Goddess.Kali },
                    { 6: Archetype.Goddess.Lalita_Tripura_Sundari }
                ]
            },
            {
                4: [
                    { 1: Archetype.Goddess.Saraswati },
                    { 2: Archetype.Goddess.Durga },
                    { 3: Archetype.Goddess.Lakshmi },
                    { 4: Archetype.Goddess.Parvati },
                    { 5: Archetype.Goddess.Kali },
                    { 6: Archetype.Goddess.Lalita_Tripura_Sundari }
                ]
            },
            {
                5: [
                    { 1: Archetype.Goddess.Saraswati },
                    { 2: Archetype.Goddess.Durga },
                    { 3: Archetype.Goddess.Lakshmi },
                    { 4: Archetype.Goddess.Parvati },
                    { 5: Archetype.Goddess.Kali },
                    { 6: Archetype.Goddess.Lalita_Tripura_Sundari }
                ]
            },
            {
                6: [
                    { 1: Archetype.Goddess.Saraswati },
                    { 2: Archetype.Goddess.Durga },
                    { 3: Archetype.Goddess.Lakshmi },
                    { 4: Archetype.Goddess.Parvati },
                    { 5: Archetype.Goddess.Kali },
                    { 6: Archetype.Goddess.Lalita_Tripura_Sundari }
                ]
            },
            {
                7: [
                    { 1: Archetype.Goddess.Saraswati },
                    { 2: Archetype.Goddess.Durga },
                    { 3: Archetype.Goddess.Lakshmi },
                    { 4: Archetype.Goddess.Parvati },
                    { 5: Archetype.Goddess.Kali },
                    { 6: Archetype.Goddess.Lalita_Tripura_Sundari }
                ]
            },
            {
                8: [
                    { 1: Archetype.Goddess.Saraswati },
                    { 2: Archetype.Goddess.Durga },
                    { 3: Archetype.Goddess.Lakshmi },
                    { 4: Archetype.Goddess.Parvati },
                    { 5: Archetype.Goddess.Kali },
                    { 6: Archetype.Goddess.Lalita_Tripura_Sundari }
                ]
            },
            {
                9: [
                    { 1: Archetype.Goddess.Saraswati },
                    { 2: Archetype.Goddess.Durga },
                    { 3: Archetype.Goddess.Lakshmi },
                    { 4: Archetype.Goddess.Parvati },
                    { 5: Archetype.Goddess.Kali },
                    { 6: Archetype.Goddess.Lalita_Tripura_Sundari }
                ]
            }
        ]
    }
];