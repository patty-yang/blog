const Koa = require('koa')
const router = require('koa-router')()
const staticFiles = require('koa-static')
const path = require('path')
const views = require('koa-views')
const axios = require('axios')
const qs = require('qs')
const app = new Koa()
const { config } = require('./config')

app.use(staticFiles(path.resolve(__dirname, './public')))
app.use(views('views', { map: { html: 'ejs' } }))

router.get('/login', async (ctx) => {
  await ctx.render('login')
})

router.get('/home', async (ctx) => {
  await ctx.render('home', { userInfo })
})

let userInfo = null
router.get('/github/callback', async (ctx) => {
  const { code } = ctx.query
  const response = await axios.post(
    'https://github.com/login/oauth/access_token',
    {
      client_id: config.clientId,
      client_secret: config.clientSecret,
      code
    }
  )
  const { access_token } = qs.parse(response.data)
  const res = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: 'Bearer ' + access_token
    }
  })
  userInfo = res.data
  ctx.redirect('/home')
})

app.use(router.routes())
app.listen(3000, () => {
  console.log('server is running on port 3000')
})
