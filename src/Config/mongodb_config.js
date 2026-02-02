import mongoose from "mongoose"



export async function Mongodb() {

try{

await mongoose.connect(process.env.MONGODB_URL)

console.log("Successfully conected to Mongodb")


}catch(error){

console.error("Failed to connect mongodb",error)
process.exit(1)


}

    
}


