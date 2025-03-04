import { db } from "@/db/database";
import logger from "@/logger/logger";
import { QuizAnswers } from "@/models/quizAnswers";
import { quizMap } from "@/quiz/quizMap";

export class QuizService {
    private readonly collectionName = "quiz_submissions";

    async isQuizSubmittedForUser(email: string, quizId: number): Promise<boolean> {
        const collection = db.collection(this.collectionName);
        const existingSubmission = await collection.findOne({ email, quizId });
        return !!existingSubmission;
    }

    async saveQuizToDB(email: string, quizId: number, answers: string) {
        try {
            const collection = db.collection(this.collectionName);

            await collection.insertOne({
                email,
                quizId,
                answers,
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

    calculateQuizResult(quizID: number, answersJson: string) {
        
        const answers = QuizAnswers.fromJSON(answersJson);
        
    }

}
