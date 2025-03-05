// auth.routes.ts
import { QuizSubmissionController } from "@/controllers/quizController";
import { subscriptionLimiter } from "@/middleware/limiter.middleware";
import { Router } from "express";

const quizRouter = Router();
const quizController = new QuizSubmissionController();
// Routes
quizRouter.post("/", subscriptionLimiter, quizController.submitQuiz);

export default quizRouter;