import { Request, Response, NextFunction } from "express";
import geoip from "geoip-lite";

export const captureUserLocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extract real IP address (Handles proxies)
        let ip = req.headers["x-forwarded-for"] as string || req.socket.remoteAddress || "";

        // If multiple IPs (behind proxy), use the first one
        if (ip.includes(",")) {
            ip = ip.split(",")[0].trim();
        }

        // If local IP (localhost), use a public IP for testing
        if (ip === "127.0.0.1" || ip === "::1") {
            ip = "8.8.8.8"; // Google Public DNS (for testing)
        }

        // Lookup location using geoip-lite
        const geo = geoip.lookup(ip);

        // If location found, attach data to request
        req.userLocation = geo
            ? {
                  ip,
                  city: geo.city || "Unknown",
                  region: geo.region || "Unknown",
                  country: geo.country || "Unknown",
                  latitude: geo.ll ? geo.ll[0] : null,
                  longitude: geo.ll ? geo.ll[1] : null,
                  timezone: geo.timezone || "Unknown",
              }
            : { ip, error: "Location not found" };

        console.log("📍 User Location:", req.userLocation);

        next(); // Move to the next middleware/controller
    } catch (error) {
        console.error("❌ Location Middleware Error:", error);
        req.userLocation = { error: "Failed to determine location", ip: req.socket.remoteAddress || "" };
        next();
    }
};
