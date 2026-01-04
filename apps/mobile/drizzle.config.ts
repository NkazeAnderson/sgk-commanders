import dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';
import Prompt from "prompt-sync";

const prompt = Prompt()
 const environment = prompt("What environment do you want to loaded?\nD -> Development\nS -> Staging\nP -> Production\n\n") as "D"|"S"|"P"
 console.log(environment);

 if(environment.toLowerCase() === "d"){
   dotenv.config({path:"./.env.local"})
   console.log("used development");
   
 }
 else  if(environment.toLowerCase() === "s"){
   dotenv.config({path:"./.env.staging"})
      console.log("used staging");
 }
 else  if(environment.toLowerCase() === "p"){
   dotenv.config({path:"./.env.production"})
      console.log("used production");
 }
 else {
  throw new Error("Unsupported environment");
}
if (!process.env.DATABASE_URL) {
   throw new Error("DATABASE_URL not found in env");
 }
 console.log(process.env.DATABASE_URL);
 

export default defineConfig({
  out: './drizzle',
  schema: './dbSchema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
