# e-co - ECamara Organizada

**Specification:** [here](https://docs.google.com/document/d/e/2PACX-1vRMP1dmmr6DpXQECabYiR_pboa4P_XiXEywRX_wntWL0ego4KHlH25_Vsv0HB0_Io4nXn4lNI0eEaXU/pub)


## Getting Started

Install yarn:
```sh
npm install -g yarn
# you may need sudo for this
```

Install dependencies:
```sh
yarn
```

Set environment (vars):
```sh
get .env file on #see .env.example
```

Start server:
```sh
# Start server
yarn start
```

## Architecture Overview

![Sera?](https://i.imgur.com/sIOuPWl.png)

This system is divided in 3 layers: model, controller and view (MVC).  

The **Model** layer has a Document Based model for the system entities.  
The **Controller** layer contains all business logic and interactions between diferent system entities.  
The **View** layer is a collection of routes that defines our system's API.  

Model example: `server/user/user.model.js`  
View example: `server/user/user.route.js`  
Controller example: `server/user/user.controller.js`  

## Security

For authentication and authorization we use JWS (JSON Web Token) to ensure that the User is actualy himself and apply the specific rules for that user. But essentially is just to make sure that everyone mind its own business.

The authentication proccess happens in the **View** layer using two middlewares: `expressJwt` and `auth.checkUser`. The first one check the token signature, making sure that no one changed it. The second one make sure that the user is making operations that he is allowed.

In **e-co** we only have one route that needs authorization, this is the `Create Comission` route `POST /api/comission`. For this, we have a middleware who checks if the logged user have a role of congressperson, the only role that can create comissions.

## Performance

Due to a greate demand on quering user profiles, the e-co team implemented a cache system to this route. It's pretty simple: we a query is made we check the cache looking for a profile by DNI and when the user is patched we override the value for that user in the cache.

With cache we get a high increase in performance and we can prove in the following images:

This images are taken from a report generated with a greate load testing tool called `Artillery`.

### without cache  

![Sera?](https://i.imgur.com/VwFJt4f.png)


### with cache

![Sera?](https://i.imgur.com/rmleIIJ.png)

For a more detailed report check out the html files into the `loadTest` folder
