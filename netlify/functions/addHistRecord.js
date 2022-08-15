const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.handler = async function (event, context) {
    if(event.body){
        const aHistRecord = JSON.parse(event.body)
        await prisma.histRecord.create({
            data:{
                title: aHistRecord.title,
                content: aHistRecord.content,
                comment: aHistRecord.comment
            },
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: aHistRecord }),
        };
    }
    return {
        statusCode: 500
    };
};
