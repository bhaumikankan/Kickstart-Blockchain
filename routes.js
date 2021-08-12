const routes=require('next-routes')();
routes
.add('/campaigns/new','/campaigns/new')
.add('/campaigns/:address','/campaigns/show')
.add('/campaigns/:address/requests','/campaigns/Requests/index')
.add('/campaigns/:address/requests/new','/campaigns/Requests/newRequest')
module.exports =routes;