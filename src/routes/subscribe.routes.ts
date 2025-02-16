// auth.routes.ts
import { SubscriptionController } from "@/controllers/subscribeController";
import { subscriptionLimiter } from "@/middleware/limiter.middleware";
import { Router } from "express";

const subscriptionRouter = Router();

// Routes
subscriptionRouter.post("/signup-email", subscriptionLimiter, SubscriptionController.subscribeEmail);

export default subscriptionRouter;