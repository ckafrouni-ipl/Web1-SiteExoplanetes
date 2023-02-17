const rootRouter = require('./root')
const exomoonsRouter = require('./exomoons')
const exoplanetsRouter = require('./exoplanets')
const forumRouter = require('./forumMessages')
// const xRouter = require('./x')

let routes = [
    {path: '/', router: rootRouter},
    {path: '/exomoons', router: exomoonsRouter},
    {path: '/exoplanets', router: exoplanetsRouter},
    {path: '/forum', router: forumRouter},
    // Add paths & routers here
    // ['/x', xRouter]
]

function mountApp(app) {
    routes.forEach((route) => {
        app.use(route.path, route.router)
    })
    return app
}

function displayRoutes(host, port) {
    console.log('Quick links :')
    routes.forEach((route) => {
        console.log(`\thttp://${host}:${port}${route.path}`)
    })
}

module.exports = {mountApp, displayRoutes}