import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest,NextResponse } from "next/server";
import brcyptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connect()

export async function POST(request:NextRequest) {

    
    try {
        const reqBody = await request.json();
        const {password,email} = reqBody

       console.log(reqBody)

       const user = await User.findOne({email})

       if(!user) {
        return NextResponse.json({error:"User does not exist"},{status:500})
       }

       console.log("User exists")

       const validPassword =await  brcyptjs.compare(password,user.password)

       if(!validPassword) {
        return NextResponse.json({error:"Check your credentials"},
            {status:500}
            )
       }

       const tokenData = {
        username:user.username,
        email:user.email
     }
     
     const token = await jwt.sign(tokenData,
        process.env.TOKEN_SECRET!,
        {expiresIn:'1h'})

        const response = NextResponse.json({
            message:"Logged in success",
            success:true
        })

        response.cookies.set("token",token,{
            httpOnly:true
        })


    } catch (error:any) { 
        return NextResponse.json({error:error.message},
        {status:500}
        )
    }
}

