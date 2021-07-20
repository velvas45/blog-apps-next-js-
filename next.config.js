const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')


module.exports = (phase) => {
    if (phase === PHASE_DEVELOPMENT_SERVER){
        return {
            env:{
                mongodb_username:'helmi405',
                mongodb_password:'VrQId1pZqhWebisW',
                mongodb_clustername: 'cluster0',
                mongodb_database: 'my-blog-site-dev',
            }
        }
    }

    return {
        env:{
            mongodb_username:'helmi405',
            mongodb_password:'VrQId1pZqhWebisW',
            mongodb_clustername: 'cluster0',
            mongodb_database: 'my-blog-site',
        }
    }
}