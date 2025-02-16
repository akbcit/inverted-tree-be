import { sendError, sendSuccess } from "@/utils/apiResponse.utils";
import { RequestHandler } from "express";
import { db } from "@/db/database"; // Import AstraDB client
import logger from "@/logger/logger";
import { UserLocation } from "@/types/userLocation";

export class SubscriptionController {

    public static subscribeEmail: RequestHandler = async (req, res, next) => {

        try {

            const { email } = req.body;

            // Check if email exists
            if (!email) {
                return sendError(res, "Email is required to subscribe", 400);
            }

            const userLocation: UserLocation | undefined = req.userLocation;
            if (!userLocation) {
                return sendError(res, "Unable to subscribe user", 500);
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return sendError(res, "Invalid email format", 400);
            }

            const collection = db.collection("subscriptions");

            // Check if the email is already subscribed
            const existingSubscription = await collection.findOne({ email });
            if (existingSubscription) {
                return sendError(res, "Email is already subscribed", 409);
            }

            // Save the subscription
            await collection.insertOne({ email, subscribedAt: new Date(), userLocation });

            logger.info(`New subscription: ${email}`);
            return sendSuccess(res, "Subscription successful!",);
        } catch (error) {
            logger.error("Subscription error:", error);
            console.error("Full Error:", error);  
            return sendError(res, "Internal server error", 500);
        }
    };
}
