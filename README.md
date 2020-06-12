
My Tunez - Api
==================

Prerequisites
--------------------------------------
- NodeJs
- Maria DB
We recommend installing the latest version of node.

Install node modules
--------------------
Run the following command from the root of your source files to install the node modules listed in packages.json
+ npm install

Database Configuration
----------------------
+ Create "myTunez_db" database
+ import "myTunez_db.sql"
+ configure params in "db/connection.js" file

Execute the app
--------------------------
Load http://localhost:3000/ in your browser to access the app.
   
+$ DEBUG=mytunez:* npm start
