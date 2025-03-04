import { User } from "@/types/userInfo";
import { UserLocation } from "@/types/userLocation";
import { db } from "../database";
import logger from "@/logger/logger";

export class UserRepository {

    static async createUser(email: string, name: string, userLocation: UserLocation): Promise<User> {
        try {
            const user = new User(email, name, userLocation);
            await this.saveUser(user); // Save user in DB
            return user;
        } catch (error) {
            logger.error("Error creating user:", error);
            throw error;
        }
    }

    // Save user in AstraDB
    static async saveUser(user: User): Promise<void> {
        try {
            const collection = db.collection("users");

            await collection.insertOne({
                email: user.email,
                location: JSON.stringify(user.userLocation),
            });

            logger.info(`User ${user.email} saved successfully.`);
        } catch (error) {
            logger.error("Error saving user:", error);
            throw error;
        }
    }

    // Fetch a user from AstraDB
    static async getUser(email: string): Promise<User | null> {
        try {
            const collection = db.collection("users");
            const result = await collection.findOne({ email });

            if (!result) {
                return null;
            }

            return new User(result.email, result.name, JSON.parse(result.location));

        } catch (error) {
            logger.error("Error fetching user:", error);
            throw error;
        }
    }
}
