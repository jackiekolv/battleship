<p>&nbsp;</p>
<p><strong>Battleship game API</strong></p>
<p><strong>Demo</strong>: https://radiant-reaches-55414.herokuapp.com/api</p>
<p><strong>Post man Import</strong>: https://www.getpostman.com/collections/ab867d3e8f19b6d55545</p>
<p><strong>Description</strong></p>
<p><strong>1. Place a ship</strong><br /><strong>Method: POST</strong><br /><strong>/api/ship</strong><br /><strong>row</strong>: 1-10<br /><strong>column</strong>: 1-10<br /><strong>direction</strong>: "row" or "column"<br /><strong>ship_type</strong><br /> - battleship&nbsp; &nbsp; &nbsp; total: 1, size: 4<br /> - cruisers&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;total: 2, size: 3<br /> - destroyers&nbsp; &nbsp; &nbsp;total: 3, size: 2<br /> - submarines&nbsp; &nbsp; total: 4, size: 1<br /><strong>Example Request</strong><br />{<br />&nbsp; &nbsp; "row": 1,<br />&nbsp; &nbsp; "column": 1,<br />&nbsp; &nbsp; "direction": "row", <br />&nbsp; &nbsp; "ship_type": "cruisers"<br />}</p>
<p><strong>2. Attack</strong><br /><strong>Method: POST</strong><br /><strong>/api/attack</strong><br /> * Must be placed all ship first.<br /> Input the point to attack.<br /><strong>row</strong>: 1-10<br /><strong>column</strong>&lt;/b&gt;: 1-10<br /><strong>Example Request</strong><br />{<br />&nbsp; &nbsp; "row": 1,<br />&nbsp; &nbsp; "column": 2<br />}</p>
<p><strong>2. View game info</strong><br /><strong>Method: GET</strong><br /><strong>/api</strong></p>
<p><br /><strong>2. Reset the game</strong><br /><strong>Method: GET</strong><br /><strong>/reset</strong></p>
<p>&nbsp;</p>
<p><strong>Local run</strong></p>
<p>$ npm install<br />$ npm start</p>
