'use strict';

const Router = require('koa-router');
const {getLinks} = require('../controllers').links;

const router = new Router();

router
  .get('/links', async (ctx) => {
    await getLinks()
      .then((links => {
        ctx.body = {
          status: 'success',
          data: links
        };
      }))
      .catch(error => {
        ctx.body = {
          status: 'error',
          data: error
        }
      })
  });


module.exports = router;