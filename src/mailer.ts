import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import { NEXTAPP_URL } from "./config";
import prisma from "./db";

export const sendMail = async({
    userId,
    email,
    emailType,
}: {
    userId: number,
    email: string,
    emailType: "VERIFY" | "RESET"
}) => {
    const token = uuidv4();
    
    try {
        if(emailType === "VERIFY") {
            await prisma.user.update({
                where: { id: userId },
                data: { verificationToken: token, verificationTokenExpiry: new Date(new Date().getTime() + 10 * 60 * 1000) }
            })
        } 
        else {
            await prisma.user.update({ 
                where: { id: userId },
                data: { forgetPasswordToken: token, forgetPasswordTokenExpiry: new Date(new Date().getTime() + 10 * 60 * 1000) }
            })
        }
        console.log(process.env.MAIL_TRAP_USERANAME)
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "5ab5439e8e5346",
                pass: "c0fe80cd7224e8"
            }
        });
        const pathName = emailType === "VERIFY" ? "verifyEmail" : "resetPassword"; 
        const mailResponse = await transport.sendMail({
            from: '"Brainly", <testerjain3575@gmail.com>',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `
                <div>
                    <p>
                        Click <a href="${NEXTAPP_URL}/${pathName}?token=${token}">here</a>
                        ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
                    </p>
                    <p>
                        or copy and paste the link below in your browser.
                        <br>
                        ${NEXTAPP_URL}/${pathName}?token=${token}
                    </p>
                </div>
            `
        })   
        console.log(mailResponse);
        return mailResponse; 
    } catch (error) {
        console.log(error);
        return error;
    }
}   
