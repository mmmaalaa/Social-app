const sendEmailTemplate = (username, otp_code) => {
  return `<!DOCTYPE html>
<html lang="ar" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Account</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f5f5f5;
            padding: 20px;
            line-height: 1.6;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
        }
        
        .header h1 {
            font-size: 28px;
            margin-bottom: 10px;
            font-weight: 700;
        }
        
        .header p {
            font-size: 16px;
            opacity: 0.95;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .greeting {
            font-size: 18px;
            color: #333;
            margin-bottom: 20px;
        }
        
        .message {
            font-size: 16px;
            color: #555;
            margin-bottom: 30px;
            line-height: 1.8;
        }
        
        .otp-container {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            border-radius: 10px;
            padding: 30px;
            text-align: center;
            margin: 30px 0;
            border: 2px dashed #667eea;
        }
        
        .otp-label {
            font-size: 14px;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 15px;
            font-weight: 600;
        }
        
        .otp-code {
            font-size: 42px;
            font-weight: 800;
            color: #667eea;
            letter-spacing: 8px;
            font-family: 'Courier New', monospace;
            margin: 10px 0;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .otp-expiry {
            font-size: 13px;
            color: #e74c3c;
            margin-top: 15px;
            font-weight: 600;
        }
        
        .warning {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px 20px;
            margin: 25px 0;
            border-radius: 4px;
        }
        
        .warning-title {
            font-size: 15px;
            font-weight: 700;
            color: #856404;
            margin-bottom: 8px;
        }
        
        .warning-text {
            font-size: 14px;
            color: #856404;
            line-height: 1.6;
        }
        
        .footer {
            background-color: #f8f9fa;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e9ecef;
        }
        
        .footer-text {
            font-size: 13px;
            color: #6c757d;
            margin-bottom: 10px;
        }
        
        .social-links {
            margin-top: 20px;
        }
        
        .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #667eea;
            text-decoration: none;
            font-size: 14px;
            font-weight: 600;
        }
        
        .divider {
            height: 1px;
            background: linear-gradient(to right, transparent, #ddd, transparent);
            margin: 25px 0;
        }
        
        @media only screen and (max-width: 600px) {
            body {
                padding: 10px;
            }
            
            .header {
                padding: 30px 20px;
            }
            
            .header h1 {
                font-size: 24px;
            }
            
            .content {
                padding: 30px 20px;
            }
            
            .otp-code {
                font-size: 36px;
                letter-spacing: 6px;
            }
            
            .footer {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <h1>🔐 Account Verification</h1>
            <p>Secure your account with our verification system</p>
        </div>
        
        <!-- Main Content -->
        <div class="content">
            <div class="greeting">
                Hello, <strong>${username}</strong>! 👋
            </div>
            
            <div class="message">
                Thank you for joining our social media platform! To complete your registration and secure your account, please verify your email address using the One-Time Password (OTP) below.
            </div>
            
            <!-- OTP Box -->
            <div class="otp-container">
                <div class="otp-label">Your Verification Code</div>
                <div class="otp-code">${otp_code}</div>
                <div class="otp-expiry">⏱️ This code expires in 5 minutes</div>
            </div>
            
            <div class="message">
                Enter this code in the verification page to activate your account and start connecting with friends!
            </div>
            
            <div class="divider"></div>
            
            <!-- Security Warning -->
            <div class="warning">
                <div class="warning-title">🛡️ Security Notice</div>
                <div class="warning-text">
                    Never share this code with anyone. Our team will never ask for your verification code via email, phone, or social media. If you didn't request this code, please ignore this email or contact our support team.
                </div>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="footer-text">
                This is an automated message from <strong>Social Connect</strong>
            </div>
            <div class="footer-text">
                © 2024 Social Connect. All rights reserved.
            </div>
            <div class="social-links">
                <a href="#">Help Center</a> • 
                <a href="#">Privacy Policy</a> • 
                <a href="#">Terms of Service</a>
            </div>
        </div>
    </div>
</body>
</html>`;
};

export default sendEmailTemplate;
