# battleship
Battleship game API

Demo: https://radiant-reaches-55414.herokuapp.com/api

Post man Import: https://www.getpostman.com/collections/ab867d3e8f19b6d55545

API docs

<h2>1. Place a ship</h2>
Method: POST
/api/ship
  <b>row</b>: 1-10
  <b>column</b>: 1-10
  <b>direction</b>
    - row
    - column
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
<b>Example Response</b>
{
    "message": "placed cruisers",
    "ocean": [
        "   1 2 3 4 5 6 7 8 9 10",
        " 1 ■ ■ ■ □ □ □ □ □ □ ■",
        " 2 □ □ □ □ ■ □ □ □ □ □",
        " 3 □ □ □ □ ■ □ ■ □ □ □",
        " 4 □ □ ■ □ ■ □ ■ □ □ □",
        " 5 □ □ □ □ □ □ ■ □ □ □",
        " 6 □ □ □ □ □ □ ■ □ □ □",
        " 7 □ □ □ □ □ □ □ □ □ □",
        " 8 □ □ ■ ■ □ ■ ■ □ □ ■",
        " 9 □ □ □ □ □ □ □ □ □ ■",
        "10 ■ □ □ □ ■ □ □ □ □ □"
    ],
    "shipLeftForPlace": 0,
    "shipCountInOcean": 10,
    "fleet": {
        "ships": {
            "battleship": {
                "type": "battleship",
                "size": 4,
                "total": 1,
                "leftForPlace": 0
            },
            "cruisers": {
                "type": "cruisers",
                "size": 3,
                "total": 2,
                "leftForPlace": 0
            },
            "destroyers": {
                "type": "destroyers",
                "size": 2,
                "total": 3,
                "leftForPlace": 0
            },
            "submarines": {
                "type": "submarines",
                "size": 1,
                "total": 4,
                "leftForPlace": 0
            }
        }
    }
}

<h2>2. Attack<h2>
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
<b>Example Response</b>
{
    "message": "Hit",
    "ocean": [
        "   1 2 3 4 5 6 7 8 9 10",
        " 1 □ H □ □ □ □ □ □ □ □",
        " 2 □ □ □ □ □ □ □ □ □ □",
        " 3 □ □ □ □ □ □ □ □ □ □",
        " 4 □ □ □ □ □ □ □ □ □ □",
        " 5 □ □ □ □ □ □ □ □ □ □",
        " 6 □ □ □ □ □ □ □ □ □ □",
        " 7 □ □ □ □ □ □ □ □ □ □",
        " 8 □ □ □ □ □ □ □ □ □ □",
        " 9 □ □ □ □ □ □ □ □ □ □",
        "10 □ □ □ □ □ □ □ □ □ □"
    ]
}

<h2>2. View game info<h2>
Method: GET
/
<b>Example Response</b>
{
    "message": "debug",
    "oceanCombine": [
        "   1 2 3 4 5 6 7 8 9 10",
        " 1 ■ H ■ □ □ □ □ □ □ ■",
        " 2 □ □ □ □ ■ □ □ □ □ □",
        " 3 □ □ □ □ ■ □ ■ □ □ □",
        " 4 □ □ ■ □ ■ □ ■ □ □ □",
        " 5 □ □ □ □ □ □ ■ □ □ □",
        " 6 □ □ □ □ □ □ ■ □ □ □",
        " 7 □ □ □ □ □ □ □ □ □ □",
        " 8 □ □ ■ ■ □ ■ ■ □ □ ■",
        " 9 □ □ □ □ □ □ □ □ □ ■",
        "10 ■ □ □ □ ■ □ □ □ □ □"
    ],
    "shipLeftForPlace": 0,
    "shipCountInOcean": 10,
    "fleet": {
        "ships": {
            "battleship": {
                "type": "battleship",
                "size": 4,
                "total": 1,
                "leftForPlace": 0
            },
            "cruisers": {
                "type": "cruisers",
                "size": 3,
                "total": 2,
                "leftForPlace": 0
            },
            "destroyers": {
                "type": "destroyers",
                "size": 2,
                "total": 3,
                "leftForPlace": 0
            },
            "submarines": {
                "type": "submarines",
                "size": 1,
                "total": 4,
                "leftForPlace": 0
            }
        }
    }
}


<h2>2. Reset the game<h2>
Method: GET
/
<b>Example Response</b>
{
    "message": "Reset successfuled",
    "ocean": [
        "   1 2 3 4 5 6 7 8 9 10",
        " 1 □ □ □ □ □ □ □ □ □ □",
        " 2 □ □ □ □ □ □ □ □ □ □",
        " 3 □ □ □ □ □ □ □ □ □ □",
        " 4 □ □ □ □ □ □ □ □ □ □",
        " 5 □ □ □ □ □ □ □ □ □ □",
        " 6 □ □ □ □ □ □ □ □ □ □",
        " 7 □ □ □ □ □ □ □ □ □ □",
        " 8 □ □ □ □ □ □ □ □ □ □",
        " 9 □ □ □ □ □ □ □ □ □ □",
        "10 □ □ □ □ □ □ □ □ □ □"
    ],
    "shipLeftForPlace": 10,
    "shipCountInOcean": 0,
    "fleet": {
        "ships": {
            "battleship": {
                "type": "battleship",
                "size": 4,
                "total": 1,
                "leftForPlace": 1
            },
            "cruisers": {
                "type": "cruisers",
                "size": 3,
                "total": 2,
                "leftForPlace": 2
            },
            "destroyers": {
                "type": "destroyers",
                "size": 2,
                "total": 3,
                "leftForPlace": 3
            },
            "submarines": {
                "type": "submarines",
                "size": 1,
                "total": 4,
                "leftForPlace": 4
            }
        }
    }
}
