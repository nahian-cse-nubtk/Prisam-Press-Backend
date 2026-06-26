import app from "./app";
import { prisma } from "./lib/prisma";

const PORT = 3000;
async function main(){
    try{
        await prisma.$connect();
        console.log("DB connection successful")
        app.listen(PORT,()=>{
            console.log(`The server is running at port ${PORT}`)
        })
    }
    catch(error){

        console.log(error)
        await prisma.$disconnect();
        process.exit(1);
    }
}
main();