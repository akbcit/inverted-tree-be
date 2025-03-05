import { sendError, sendSuccess } from "@/utils/apiResponse.utils";
import { RequestHandler } from "express";
import { QuizService } from "@/services/quiz.svc";

import logger from "@/logger/logger";
import { sendResultEmail } from "@/services/email.svc";

export class QuizSubmissionController {

    private quizService: QuizService;

    constructor() {
        this.quizService = new QuizService();
    }

    public submitQuiz: RequestHandler = async (req, res, next) => {

        try {

            const { email, quizId, answers } = req.body;

            logger.info(`New quiz submission: ${email} for Quiz ID: ${quizId} and answers: ${JSON.stringify(answers)}`);

            // Validate required fields
            if (!email || !quizId || !answers) {
                return sendError(res, "Email, quizId, and answers are required", 400);
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return sendError(res, "Invalid email format", 400);
            }

            // check if quiz Id is number
            if (isNaN(Number(quizId))) {
                return sendError(res, "Invalid Quiz ID", 400);
            }

            // Check if the user has already submitted this quiz
            const isExistingSubmission = await this.quizService.isQuizSubmittedForUser(email, Number(quizId));

            if (isExistingSubmission) {
                return sendError(res, "User has already submitted this quiz", 409);
            }

            const quizResult = this.quizService.calculateQuizResult(quizId, JSON.stringify(answers));

            if (!quizResult) {
                return sendError(res, "Internal server error", 500);
            }

            const sendEmailResult = await sendResultEmail(quizResult, email);

            if (!sendEmailResult) {
                return sendError(res, "Internal server error", 500);
            }

            const saveToDBResult = await this.quizService.saveQuizToDB(email, Number(quizId), JSON.stringify(answers), quizResult, true);

            if (saveToDBResult) {
                logger.info(`Successfully stored quiz submission for: ${email} - Quiz ID: ${quizId}`);
                return sendSuccess(res, "Quiz submission stored successfully!");
            }
            else {
                return sendError(res, "Internal server error", 500);
            }

        } catch (error) {
            logger.error("Quiz submission error:", error);
            console.error("Full Error:", error);
            return sendError(res, "Internal server error", 500);
        }
    };
}
