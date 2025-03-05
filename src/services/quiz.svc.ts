import { db } from "@/db/database";
import logger from "@/logger/logger";
import { QuizAnswers } from "@/models/quizAnswers";
import { quizMap } from "@/quiz/quizMap";
import { Archetype } from "@/quiz/archetypes";

export class QuizService {
    private readonly collectionName = "quiz_submissions";

    async isQuizSubmittedForUser(email: string, quizId: number): Promise<boolean> {
        const collection = db.collection(this.collectionName);
        const existingSubmission = await collection.findOne({ email, quizId });
        return !!existingSubmission;
    }

    async saveQuizToDB(email: string, quizId: number, answers: string, resultArchetype: string, isResultMailSent: boolean) {
        try {
            const collection = db.collection(this.collectionName);

            await collection.insertOne({
                email,
                quizId,
                answers,
                resultArchetype,
                isResultMailSent,
                submittedAt: new Date(),
            });

            logger.info(`Successfully stored quiz submission for: ${email} - Quiz ID: ${quizId}`);
            return true;
        }
        catch (error) {
            logger.error("Quiz submission error:", error);
            return false;
        }
    }

    calculateQuizResult(quizID: number, userAnswersJson: string) {

        const quizKey = this.getQuizKey(quizID);

        if (!quizKey) {
            return false;
        }

        const userAnswers = QuizAnswers.fromJSON(userAnswersJson);

        const userResponses = userAnswers.getQuestionNumbers();

        const archetypesMap = new Map<string, number>();
        let mostFrequentArchetype: string | null = null;
        let maxCount = 0;

        userResponses.forEach((questionNumber) => {

            const userAnswer = userAnswers[questionNumber];

            if (userAnswer !== undefined) {
                const optionMap = quizKey[questionNumber];
                const archetype = optionMap[userAnswer];

                if (archetype) {
                    const newCount = (archetypesMap.get(archetype) || 0) + 1;
                    archetypesMap.set(archetype, newCount);

                    if (newCount > maxCount || (newCount === maxCount && mostFrequentArchetype === null)) {
                        maxCount = newCount;
                        mostFrequentArchetype = archetype;
                    }
                }
            }
        })

        return mostFrequentArchetype
    }

    private getQuizKey(quizId: number) {

        const quizKeyEle = quizMap.find(element => element.quizID === quizId);

        if (quizKeyEle === undefined) {
            return false;
        }

        return quizKeyEle.quizKey;
    }

}
