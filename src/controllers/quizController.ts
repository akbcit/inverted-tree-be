import { sendError, sendSuccess } from "@/utils/apiResponse.utils";
import { RequestHandler } from "express";
import { db } from "@/db/database"; // AstraDB client
import logger from "@/logger/logger";

export class QuizSubmissionController {

    public static submitQuiz: RequestHandler = async (req, res, next) => {
        try {
            const { email, quizId, answers } = req.body;

            // ✅ Convert answers object to a JSON string for proper logging
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

            const collection = db.collection("quiz_submissions");

            // Check if the user has already submitted this quiz
            const existingSubmission = await collection.findOne({ email, quizId });
            if (existingSubmission) {
                return sendError(res, "User has already submitted this quiz", 409);
            }

            // ✅ Convert answers to a valid JSON format before saving in AstraDB
            await collection.insertOne({
                email,
                quizId,
                answers: JSON.stringify(answers), // Storing answers as a JSON string
                submittedAt: new Date(),
            });

            logger.info(`Successfully stored quiz submission for: ${email} - Quiz ID: ${quizId}`);
            return sendSuccess(res, "Quiz submission stored successfully!");
        } catch (error) {
            logger.error("Quiz submission error:", error);
            console.error("Full Error:", error);
            return sendError(res, "Internal server error", 500);
        }
    };
}
