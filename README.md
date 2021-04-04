# backendMinotauRPG

## Contents
* [About](#about)  
* [/signup](#/signup-(POST))  
* [/signin](#/signin-(POST))  
* [/newGame](#/newGame-(POST))  
* [/loadGame](#/loadgame-(POST))  
* [/saveGame](#/savegame-(PATCH))  
* [/loadGameData](#/loadGameData-(POST))  
* [/deleteGame](#/deleteGame-(DELETE))

## About

Minotaurpg is a browser based RPG maze game for a school project at BYU-Idaho. This is the backend repository. The front-end repository can be found [here](https://github.com/jxxb/minotauRPG).

## /signup (POST)
Requires: `email`, `password`, `confirmPassword`, and `username`.
```
{
    "email": <user_email>,
    "password": <password>,
    "confirmPassword": <confirm_passowrd>,
    "username": <uername>
}
```
If valid, signup information is saved to the database and a 200 status code is returned with the message, 'User Created'.

If invalid a 400 status code is reterned along with an error message.

## /signIn (POST)
Requires `email`, and `password` sent in the body in JSON form.
```
{
    "email": <user_email>,
    "password": <password>
}
```

If validated will return a status of 200, a 'user' object, and a 'token' to stay logged in.

If user not found or password incorrect: Status code of 403 and message of "Invalid password or email" returned.

## /newgame (POST)
Requires the number of rows '`h`' and collums '`w`' of the maze to be generated. Requires the height '`cH`' and width '`cW`' of the canvas HTML object for whrere the maze is placed.
```
{
    "h": <maze_height>,
    "w": <maze_width>,
    "cH": <canvas_height>,
    "cW": <canvas_width>
}
```
Returns:
```
{
    "maze": <maze_object>,
    "inventory": [],
    "playerExperience": <PLAYER_EXPERIENCE>,
    "playerLevel": <PLAYER_LEVEL>,
    "playerPosition": <randomely_genereated_player_position>,
    "playerHealth": <MAX_HEALTH>,
    "playerMaxHealth: <MAX_HEALTH>,
    "enemyList": <generated_enemy_list>
}
```

## /loadgame (POST)
Requires a `gameId` sent in the body in JSON form.
```
{
    "gameId": <game_id>
}
```

Returns the game object that corresponds with the ID. 

## /savegame (PATCH)
Requires `game` object and `userId`. Game object should be the same format as seen in `/newGame`.

## /loadGameData (POST)
Requires `gameId`.
```
{
    "gameId": <gameId>
}
```
Returns the `playerLevel` and `playerExperience` in the body of the response.
```
{
    "playerLevel": <player_level>,
    "playerExperience": <player_experience>
}
```
## /deleteGame (DELETE)
Requires `gameId` and `userId`
```
{
    "gameId": <game_id>,
    "userId": <user_id>
}
```
If successfull, returns a response with a status code of 200 and a message of "Game Deleted".