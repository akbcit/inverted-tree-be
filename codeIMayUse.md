// template.hbs
const template = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Divine Connection Awaits</title>
    <style>
        /* These styles will be inlined by Juice */
        .email-wrapper {
            width: 100%;
            margin: 0;
            padding: 20px;
            background-color: #000000;
            font-family: Arial, sans-serif;
            color: #FFD700;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #0a0a0a;
            border-radius: 8px;
            border: 1px solid #FFD700;
        }
        
        .header {
            padding: 40px 30px;
            text-align: center;
            background: linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(10,10,10,0.95));
            border-radius: 8px 8px 0 0;
            border-bottom: 1px solid #FFD700;
        }
        
        .header-image {
            max-width: 100%;
            height: auto;
            margin-bottom: 20px;
        }
        
        .content {
            padding: 30px;
            background: url('{{backgroundStarsUrl}}') repeat;
            background-size: cover;
        }
        
        .divine-title {
            color: #FFD700;
            font-size: 32px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin: 0 0 20px;
            text-align: center;
        }
        
        .result-box {
            margin: 30px 0;
            padding: 30px;
            background: rgba(0, 0, 0, 0.7);
            border-radius: 8px;
            border: 1px solid #FFD700;
            text-align: center;
        }
        
        .goddess-image {
            max-width: 200px;
            height: auto;
            margin: 20px auto;
            border-radius: 50%;
            border: 2px solid #FFD700;
        }
        
        .archetype-name {
            color: #FFD700;
            margin: 20px 0;
            font-size: 24px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .progress-bar {
            width: 100%;
            height: 20px;
            background-color: rgba(255, 215, 0, 0.1);
            border-radius: 10px;
            overflow: hidden;
            margin: 5px 0;
            border: 1px solid #FFD700;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(to right, #FFD700, #FFA500);
            border-radius: 10px;
        }
        
        .cta-button {
            display: inline-block;
            padding: 15px 30px;
            background: linear-gradient(45deg, #FFD700, #FFA500);
            color: #000000;
            text-decoration: none;
            border-radius: 25px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin: 20px 0;
        }
        
        .divider {
            border: 0;
            height: 1px;
            background: linear-gradient(to right, transparent, #FFD700, transparent);
            margin: 30px 0;
        }
        
        .footer {
            padding: 30px;
            text-align: center;
            background-color: #000000;
            border-radius: 0 0 8px 8px;
            border-top: 1px solid #FFD700;
        }
        
        .footer a {
            color: #FFD700;
            text-decoration: none;
        }
        
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
            }
            
            .content {
                padding: 20px !important;
            }
            
            .divine-title {
                font-size: 24px;
            }
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <div class="email-container">
            <div class="header">
                {{#if headerImage}}
                <img src="{{headerImage}}" alt="Divine Wisdom" class="header-image">
                {{/if}}
                <h1 class="divine-title">✨ INVITE THE DIVINE ✨</h1>
            </div>
            
            <div class="content">
                <p>Dear {{userName}},</p>
                
                <p>Your divine journey has revealed your primary goddess energy:</p>
                
                <div class="result-box">
                    {{#if goddessImage}}
                    <img src="{{goddessImage}}" alt="{{primaryArchetype}}" class="goddess-image">
                    {{/if}}
                    <h2 class="archetype-name">{{primaryArchetype}}</h2>
                    <p>{{archetypeDescription}}</p>
                </div>
                
                <hr class="divider">
                
                <h3>Your Divine Energy Distribution</h3>
                {{#each archetypeScores}}
                <div style="margin-bottom: 15px;">
                    <p>{{name}}</p>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: {{percentage}}%"></div>
                    </div>
                    <p style="text-align: right; font-size: 14px;">{{percentage}}%</p>
                </div>
                {{/each}}
                
                <div style="text-align: center;">
                    <a href="{{detailsUrl}}" class="cta-button">
                        Explore Your Divine Path
                    </a>
                </div>
                
                <hr class="divider">
                
                <div style="text-align: center;">
                    <p>Share your divine connection:</p>
                    <div>
                        {{#each shareUrls}}
                        <a href="{{this}}" class="cta-button" style="margin: 0 10px;">{{@key}}</a>
                        {{/each}}
                    </div>
                </div>
            </div>
            
            <div class="footer">
                <p>You received this sacred message because you took the Divine Archetype Quiz</p>
                <p>
                    <a href="{{unsubscribeUrl}}">Unsubscribe</a> |
                    <a href="{{privacyUrl}}">Privacy Policy</a>
                </p>
            </div>
        </div>
    </div>
</body>
</html>
`;

// Backend implementation (Node.js with Express)
const express = require('express');
const Handlebars = require('handlebars');
const juice = require('juice');
const nodemailer = require('nodemailer');

const app = express();

app.post('/send-quiz-results', async (req, res) => {
    try {
        // Compile the template
        const compiledTemplate = Handlebars.compile(template);
        
        // Sample data from quiz results
        const templateData = {
            userName: req.body.userName,
            headerImage: "path/to/header-image.jpg",
            goddessImage: "path/to/goddess-image.jpg",
            backgroundStarsUrl: "path/to/stars-bg.jpg",
            primaryArchetype: req.body.primaryArchetype,
            archetypeDescription: req.body.archetypeDescription,
            archetypeScores: [
                { name: "Saraswati", percentage: 85 },
                { name: "Durga", percentage: 70 },
                { name: "Lakshmi", percentage: 65 },
                { name: "Radha/Parvati", percentage: 60 },
                { name: "Kali/Chhinnamasta", percentage: 55 },
                { name: "Baglamukhi/Dhumavati", percentage: 50 }
            ],
            detailsUrl: `https://yoursite.com/results/${req.body.resultId}`,
            shareUrls: {
                Facebook: `https://yoursite.com/share/fb/${req.body.resultId}`,
                Twitter: `https://yoursite.com/share/twitter/${req.body.resultId}`,
                Instagram: `https://yoursite.com/share/ig/${req.body.resultId}`
            },
            unsubscribeUrl: "https://yoursite.com/unsubscribe",
            privacyUrl: "https://yoursite.com/privacy"
        };
        
        // Generate HTML from template
        let html = compiledTemplate(templateData);
        
        // Inline CSS using Juice
        html = juice(html);
        
        // Create Nodemailer transporter
        const transporter = nodemailer.createTransport({
            // Your email service configuration
            host: "smtp.yourservice.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        
        // Send email
        await transporter.sendMail({
            from: '"Divine Archetype Quiz" <quiz@yoursite.com>',
            to: req.body.userEmail,
            subject: "✨ Your Divine Connection Has Been Revealed ✨",
            html: html
        });
        
        res.json({ success: true, message: "Quiz results email sent successfully" });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: "Failed to send email" });
    }
});

module.exports = app;