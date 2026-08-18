export async function GET() {
    return Response.json({
        nodeEnv: process.env.NODE_ENV,
        authSecret: Boolean(process.env.AUTH_SECRET),
        graphqlUrl: process.env.GRAPHQL_API_URL,
        siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
    });
}