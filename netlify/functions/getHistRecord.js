const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
exports.handler = async function (event, context) {
    //     return {
    //     statusCode: 200,
    //     body: JSON.stringify({ message: "Hello World" }),
    //   };

    // load all histRecord from the database
    const allHistRecords = await prisma.histRecord.findMany();
    return {
        statusCode: 200,
        body: JSON.stringify(allHistRecords, (_key, value) =>
            // need to add a custom serializer because CockroachDB IDs map to
            // JavaScript BigInts, which JSON.stringify has trouble serializing.
            typeof value === 'bigint'
            ? value.toString()
            : value 
        )
    }
};
