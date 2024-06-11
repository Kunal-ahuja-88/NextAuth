import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest,NextResponse } from "next/server";

connect()

export async function POST(request : NextRequest) {
    try {
        const reqBody=await request.json();
        const {token}=reqBody
        console.log(token)
        
        const user = await User.findOne
        ({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}})

        if(!user) {
            return NextResponse.json({error:"Inavlid token detail"},{status:400})
        }
        console.log(user)

         user.isVerified=true
         user.isverifyToken=undefined
         user.isverifyTokenExpiry=undefined

         await user.save()

         return NextResponse.json
         ({error:"Email verified",success:true},
            {status:500})
       

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}
