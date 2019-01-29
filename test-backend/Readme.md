#Hello Team.
This the readme file for the development branch.
   ###Structure.
    - unit tests are in test folder. have a look at the file. 
    - no test classes may result your PR rejected!
    - all api routes should be in routes folder
    - all db related code will be in db file.
    
  ###Rules
    - all development should be done on development branch.
    - merges will trigger the deployments (coming soon)
    - No merge without at least 1 PR confirm.
    - only administrators can merge development to the master branch.
    - merge to master branch will trigger to the production deployment.

  ###Install
  - clone repo
  - run `npm i`

  ###Use docker for development 
  - run `cd docker && docker-compose up -d` to create mysql container `work_db`

  ####For more comfortable use docker, include this command to your system. After you can use name container in browser address line.  
  <pre>sed -i.old -r '/docker-ips/d' /etc/hosts docker inspect -f "{{.NetworkSettings.IPAddress}}   {{.Name}}   #docker-ips" $(docker ps -q) | sed -e 's/\///' >> /etc/hosts</pre>

  #####save this command to file docker-ips in path `/usr/local/bin`
  #####and make this file executable:
  - `sudo chmod +x /usr/local/bin/docker-ips`

  #####then run this commands to start docker
  - `docker-compose up -d`
  - `sudo /usr/local/bin/docker-ips`
  #####run database synchronization 
  `npm run db:sync`
  #####run database seeders
  `npm run db:seed`
  #####or run both commands at one
  `npm run db:init`
  ##### to clean drop and create database 
  mysql -p -uroot --execute="DROP DATABASE energy; CREATE DATABASE energy;"
  ####run server
  - with nodemon: `npm run dev`
  - or simple run: `npm start`
  ####run tests `npm test`


##Project structure

#####This section was created for better understanding the project.

First of all, this is node.js application. It based on those modules:

- Express.js - web routing, middleware
- Sequelize - ORM, provides models, relations, migrations, querying
- Mysql - as dialect for Sequelize ORM

#####All codebase can be found in /src

Since there is no single rule on how to build a Express.js project structure
we decide to follow recommendations described in this article:
<https://blog.risingstack.com/node-hero-node-js-project-structure-tutorial>.

###App structure (src/app)

####config
We place all configs to this folder to keep the configuration part and business logic separately.

###features
All features live in this folder. Features can be nested. For Example:
<pre>
|-- auth
|-- user
|-- admin
|   |-- company
|   |-- user
</pre>

Each feature can have its own routes, middleware, validators, services etc.
Also, each feature can expose its internal parts to other features.

For example, `auth` feature can provide authMiddleware for other features.

###middleware
We place global middleware that used among different features to this folder

###models
All models go here. File /models/index.js helps to initialize sequelize connection with db
and import all models to single object

###seeders
All database seeders go here. For now, we have only one seeder to create test user and company.
But as project growing, we will create more different seeders

###services
We place shared services here. Each service should be used among a few features.
If one service exactly will be used in one feature, better to move it to this feature.

###tools
We place different tools here. They can be shared for any other project part.

###transformers
We place various data transformers here. Data transformer is used to prepare some model data
to api response.

For example: `/users/me` api endpoint returns authed user data, but we want to omit `password`
field for frontend part. Transformer should do this work.

###utils
We place various utilities here. Each util should be simple and do only one specific thing.

# Install instructions
1. clone repository
2. pull latest code
3. install dependencies 
4. run server
5. go to 2
