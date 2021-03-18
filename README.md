# backendMinotauRPG

## About

Minotaurpg is a browser based RPG maze game for a school project at BYU-Idaho. This is the backend repository. The front-end repository can be found [here](https://github.com/jxxb/minotauRPG).

## API

POST /signin - Requires 'email', and 'password' sent in the body in JSON form. If validated will return a status of 200 and a 'user' object. If invalid, returns a status of 400 and an error message.

POST /signup - Requires 'email', 'password', 'confirmPassword', and 'username'. If valid, signup information is saved to the database and a 200 status code is returned. If invalid a 400 status code is reterned along with an error message.

PATCH /newgame - Generates a maze and returns a game object that includes the generated maze

PUT /loadgame - Requires a 'gameId' sent in the body in JSON form. Returns the game object that corresponds with the ID. 

POST /savegame - Requires all the components of a game object: 'maze', 'enemyList', 'userIndex'. Also requires the 'userId'. The game is saves in the database. The gameId is added to the 'games' array of the 'user' and is updated in the database.
