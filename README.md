# battleship
Battleship game API

Demo: https://radiant-reaches-55414.herokuapp.com/api

Post man Import: https://www.getpostman.com/collections/ab867d3e8f19b6d55545

Description

<h2>1. Place a ship</h2>
Method: POST
/api/ship
  <b>row</b>: 1-10
  <b>column</b>: 1-10
  <b>direction</b
  <b>ship_type</b>
    - battleship    total: 1, size: 4
    - cruisers      total: 2, size: 3
    - destroyers    total: 3, size: 2
    - submarines    total: 4, size: 1
<b>Example Request</b>
{
  "row": 1,
  "column": 1,
  "direction": "row",     
  "ship_type": "cruisers"
}

<h2>2. Attack</h2>
Method: POST
/api/attack
  * Must be placed all ship first.
  Input the point to attack.
  <b>row</b>: 1-10
  <b>column</b>: 1-10
<b>Example Request</b>
{
  "row": 1,
  "column": 2
}

<h2>2. View game info</h2>
Method: GET
/api


<h2>2. Reset the game</h2>
Method: GET
/reset
