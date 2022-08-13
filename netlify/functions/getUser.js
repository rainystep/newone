const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
exports.handler = async function (event, context) {

    // return {
    //     statusCode: 200,
    //     body: JSON.stringify({ message: "Hello World" }),
    //   };

    // load all users from the database
    const allUsers = await prisma.users.findMany();
    return {
        statusCode: 200,
        body: JSON.stringify(allUsers, (_key, value) =>
            // need to add a custom serializer because CockroachDB IDs map to
            // JavaScript BigInts, which JSON.stringify has trouble serializing.
            typeof value === 'bigint'
            ? value.toString()
            : value 
        )
    }
};
