import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import handlebars from "handlebars";
import { ArchetypeDetails } from "@/quiz/archetypes";
import logger from "@/logger/logger";


import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
        user: "connect@invertedtree.yoga",
        pass: process.env.EMAIL_PASS
    }
});

const emailTemplatePath = path.resolve(
    __dirname,
    process.env.NODE_ENV === "production" ? "../quiz/email-template.hbs" : "src/quiz/email-template.hbs"
);
const emailTemplateSource = fs.readFileSync(emailTemplatePath, "utf8");
const template = handlebars.compile(emailTemplateSource);

// Function to send the result email
export async function sendResultEmail(archetypeKey: keyof typeof ArchetypeDetails, email: string) {

    // Ensure archetype exists
    const archetype = ArchetypeDetails[archetypeKey];
    if (!archetype) {
        console.error(`Invalid Archetype: ${archetypeKey}`);
        return;
    }

    const replacements = {
        userName: email.split("@")[0], // Extracts name from email
        primaryArchetype: archetype.name,
        archetypeDescription: archetype.description,
        goddessImage: archetype.imagePath,
        detailsUrl: "https://invertedtree.yoga/goddess-archetypes", // Link to more details
        unsubscribeUrl: "https://invertedtree.yoga",  // Redirect to homepage for now
        privacyUrl: "https://invertedtree.yoga",     // Redirect to homepage for now
        shareUrls: {
            Facebook: `https://www.facebook.com/sharer/sharer.php?u=https://invertedtree.yoga`,
            Twitter: `https://twitter.com/intent/tweet?text=Discover%20your%20Goddess%20Archetype!%20https://invertedtree.yoga`,
        }
    };

    const emailContent = template(replacements);

    const mailOptions = {
        from: `"InvertedTree Yoga" <connect@invertedtree.yoga>`,
        to: email,
        subject: `✨ Your Goddess Archetype: ${archetype.name} ✨`,
        html: emailContent,
        headers: {
            'Content-Type': 'text/html; charset=UTF-8',
            'X-Entity-Ref-ID': Date.now().toString(), 
        }
    };

    try {
        await transporter.sendMail(mailOptions);
        logger.info(`Email sent to ${email}`);
        return true;
    } catch (error) {
        logger.error("Error sending email:", error);
        return false;
    }
}
