import nodemailer from "nodemailer";
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

// Define the email template HTML directly in the code
const emailTemplateSource = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Your Divine Goddess Archetype</title>
    <style>
        body {
            background-color: #000;
            color: #FFD700;
            font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif;
            padding: 0;
            margin: 0;
            width: 100%;
            line-height: 1.6;
        }
        .email-wrapper {
            width: 100%;
            padding: 20px;
            box-sizing: border-box;
            background: linear-gradient(135deg, rgba(10,10,10,1) 0%, rgba(25,25,25,1) 100%);
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            padding: 40px;
            background-color: #0a0a0a;
            border: 1px solid #FFD700;
            border-radius: 15px;
            text-align: center;
            box-sizing: border-box;
            box-shadow: 0 0 30px rgba(255, 215, 0, 0.2);
        }
        .header-ornament {
            font-size: 24px;
            margin: 0 auto 20px auto;
            line-height: 1;
        }
        h1 {
            font-family: 'Georgia', serif;
            font-weight: normal;
            font-size: 28px;
            margin-bottom: 30px;
            letter-spacing: 1px;
            color: #FFD700;
            text-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
        }
        h2 {
            font-family: 'Georgia', serif;
            font-size: 26px;
            font-weight: normal;
            margin: 30px 0;
            letter-spacing: 1px;
            color: #FFC125;
            text-shadow: 0 0 8px rgba(255, 215, 0, 0.3);
        }
        .goddess-image-container {
            margin: 30px auto;
            position: relative;
            width: 220px;
            height: 220px;
        }
        .goddess-image {
            max-width: 200px;
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 50%;
            border: 2px solid #FFD700;
            display: block;
            margin: 0 auto;
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
        }
        .image-glow {
            position: absolute;
            top: -10px;
            left: -10px;
            right: -10px;
            bottom: -10px;
            border-radius: 50%;
            background: radial-gradient(ellipse at center, rgba(255,215,0,0.2) 0%, rgba(255,215,0,0) 70%);
            z-index: -1;
        }
        p {
            margin: 16px 0;
            font-size: 16px;
            line-height: 1.8;
            color: #FFFFFF;
        }
        .emphasis {
            color: #FFD700;
            font-weight: bold;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(45deg, #FFD700, #FFA500);
            padding: 15px 30px;
            border-radius: 30px;
            font-weight: bold;
            text-decoration: none;
            color: black;
            margin: 25px auto;
            text-align: center;
            width: auto;
            max-width: 80%;
            transition: transform 0.3s, box-shadow 0.3s;
            box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
            font-family: 'Arial', sans-serif;
        }
        .divider {
            border: 0;
            height: 1px;
            background: linear-gradient(to right, transparent, #FFD700, transparent);
            margin: 35px 0;
        }
        .footer {
            padding: 20px;
            text-align: center;
            background-color: rgba(0,0,0,0.5);
            border-top: 1px solid rgba(255,215,0,0.3);
            font-size: 14px;
            border-radius: 0 0 15px 15px;
        }
        .footer a {
            color: #FFD700;
            text-decoration: none;
        }
        .display-images-note {
            font-style: italic;
            background-color: rgba(255, 215, 0, 0.25);
            border: 1px dashed rgba(255, 215, 0, 0.6);
            padding: 10px;
            border-radius: 8px;
            margin: 10px auto 20px auto;
            max-width: 90%;
            font-size: 14px;
            color: #FFFFFF;
            font-weight: bold;
        }
        .social-buttons {
            display: flex;
            justify-content: center;
            gap: 15px;
            flex-wrap: wrap;
            margin: 20px auto;
            width: 100%;
            text-align: center;
        }
        .social-button {
            display: inline-block;
            background: linear-gradient(45deg, #1f1f1f, #333);
            padding: 12px 20px;
            border-radius: 25px;
            font-weight: bold;
            text-decoration: none;
            color: #FFD700;
            margin: 5px;
            text-align: center;
            border: 1px solid rgba(255, 215, 0, 0.5);
            min-width: 120px;
            transition: transform 0.2s, background 0.2s;
            font-family: 'Arial', sans-serif;
        }
        .archetype-description {
            font-style: italic;
            line-height: 1.9;
            background-color: rgba(255,215,0,0.15);
            padding: 20px;
            border-radius: 10px;
            margin: 25px auto;
            max-width: 90%;
            border-left: 3px solid rgba(255,215,0,0.5);
            text-align: left;
            color: #FFFFFF;
            font-weight: 500;
        }

        /* 🌟 Responsive Styles */
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 95% !important;
                padding: 25px 15px !important;
            }
            h1 {
                font-size: 24px !important;
            }
            h2 {
                font-size: 22px !important;
            }
            .cta-button, .social-button {
                width: 100%;
                padding: 12px;
                font-size: 14px;
                margin: 10px auto;
            }
            .goddess-image {
                max-width: 180px;
                height: 180px;
            }
            p {
                font-size: 15px;
                line-height: 1.6;
            }
            .display-images-note {
                padding: 8px;
                font-size: 13px;
            }
            .goddess-image-container {
                width: 200px;
                height: 200px;
            }
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <div class="email-container">
            <div class="header-ornament">✧ ✦ ✧</div>
            <h1>✨ Your Divine Goddess Archetype Revealed ✨</h1>
            
            <div class="display-images-note">
                ⚠️ IMAGES NOT DISPLAYING? Please click "Display Images" in your email client to see your beautiful goddess archetype visualization.
            </div>
            
            <p>Dear {{userName}},</p>

            <p>Throughout history, goddesses have been the embodiment of <span class="emphasis">strength, wisdom, love, and transformation</span>. These archetypes live in all of us, revealing different aspects of our <span class="emphasis">divine nature</span>.</p>

            <p>While you are a tapestry of many divine energies, your <span class="emphasis">dominant archetype</span>—the one guiding you most powerfully at this time—is:</p>

            <h2>{{primaryArchetype}}</h2>
            
            <div class="goddess-image-container">
                <img src="{{goddessImage}}" alt="{{primaryArchetype}} Goddess Archetype" class="goddess-image" width="200" height="200">
                <div class="image-glow"></div>
            </div>
            
            <div class="archetype-description">
                {{archetypeDescription}}
            </div>

            <p>If you cannot see the image above, <a href="{{goddessImage}}" style="color:#FFC125; text-decoration:underline;">click here</a> to view your goddess archetype.</p>

            <hr class="divider">

            <p><b>What are Goddess Archetypes?</b></p>
            <p>Goddess archetypes are the sacred energies that shape our emotions, actions, and paths in life. Each carries wisdom, each offers gifts. By understanding them, you deepen your connection to yourself and the world around you.</p>

            <p><i>Keep exploring your divine path, and remember—your journey has only just begun.</i></p>

            <a href="https://invertedtree.yoga" class="cta-button">Discover Your Divine Path</a>

            <hr class="divider">

            <p>Share your divine connection:</p>
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td align="center">
                        <table border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td align="center" style="padding: 0 10px;">
                                    <a href="https://www.instagram.com/invertedtreeyoga" class="social-button">Instagram</a>
                                </td>
                                <td align="center" style="padding: 0 10px;">
                                    <a href="https://twitter.com/invertedtree" class="social-button">X (Twitter)</a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>

            <div class="footer">
                <p><small>You received this sacred message because you took the Divine Archetype Quiz at InvertedTree Yoga.</small></p>
                <p><small>©2025 InvertedTree Yoga | <a href="https://invertedtree.yoga/privacy">Privacy</a></small></p>
            </div>
        </div>
    </div>
</body>
</html>`;

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