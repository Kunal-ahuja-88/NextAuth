import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getData = (request: NextRequest) => {
    try {

        const cookies = request.cookies.getAll(); // Log all cookies
        console.log("Cookies:", cookies);
        
        const token = request.cookies.get("token")?.value||"";

        if (!token) {
            throw new Error("Token not provided");
        }

        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);

        return decodedToken.id;
    } catch (error: any) {
        throw new Error(error.message);
    }
};



