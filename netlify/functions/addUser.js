const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

 exports.handler = async function (event, context) {
    // if(event.body){
        //const newUser = JSON.parse(event.body);
        await prisma.users.create({
            data:{
                name: "newone",
                email: "616616161@qq.com",
                phone: "123456789"
            },
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Hello World" }),
        };
    // }
    // return {
    //     statusCode: 500
    // };
  };

//   import { Handler } from '@netlify/functions'
//   import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient();
// interface UserEntry{
//    name: string,
//    email: string,
//    phone: string
// }

//  const handler: Handler = async (event, context) =>{
//     if(event.body){
//         const newUser = JSON.parse(event.body) as UserEntry;
//         await prisma.users.create({
//             data:{
//                 name: newUser.name,
//                 email: newUser.email,
//                 phone: newUser.phone
//             },
//         });

//         return {
//             statusCode: 200,
//             body: JSON.stringify(newUser)
//         };
//     }
//     return {
//         statusCode: 500
//     };
//  }

//  export { handler }
