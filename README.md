# keepstraight.node
NodeJS app for the Keepstraight App
built on Angular Universal, based on [https://github.com/FrozenPandaz/ng-universal-demo]
deployed in Heroku [https://dashboard.heroku.com] [ramon.van.raaij@outlook.com]
on url: [https://keepstraight.herokuapp.com]

# TODO
* unit testing with karma / mocha / chai / sinon
* use component library Prime-NG [https://www.primefaces.org/primeng]


# {DEPRECATED} install typings
typings install dt~node@7 --global --save
typings install dt~express-serve-static-core -global --save
typings install mime -global --save
typings install serve-static -global --save
typings install express -global --save
typings install body-parser -global --save

# instead, these are installed through 
`npm install --save @typings/node`
`npm install --save @typings/express`
`npm install --save @typings/body-parser`
