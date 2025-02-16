// auth.routes.ts
import { QuizSubmissionController } from "@/controllers/quizController";
import { subscriptionLimiter } from "@/middleware/limiter.middleware";
import { Router } from "express";

const quizRouter = Router();

// Routes
quizRouter.post("/", subscriptionLimiter, QuizSubmissionController.submitQuiz);

export default quizRouter;