import { UserLocation } from "@/types/userLocation";

declare global {
    namespace Express {
        export interface Request {
            userLocation?: UserLocation;
        }
    }
}

export {};