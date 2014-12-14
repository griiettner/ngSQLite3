Angular SQLite3 Service
====================
Helps you generate SQLite3 simple queries and run them without writing any sql code.

> NOTE: Inspired on [angular-websql](https://github.com/paulocaldeira17/angular-websql) by Paulo Caldeira

Setup
-------
1. Clone this project from Github.
2. Include the `ngsqlite3.min.js` and angular itself.
3. Add `ngSQLite3` as a module dependency to your app.

Usage
--------
1- Add ```$SQLite3``` provider to a controller.
2- Use returned database object's methods.

Methods
-----------
### Open Database
#### `$scope.db = $SQLite3;`

#### Returns
An object, containing database operation methods, is returned with ```openDatabase``` method.
All methods return a promise which takes query result object as parameter.
These methods are:
- [createTable()](#create-table)
- [dropTable()](#drop-table)
- [insert()](#insert)
- [update()](#update)
- [delete()](#delete)
- [select()](#select)
- [executeQuery()](#executeQuery)

## Database Methods
### Create Table
#### `createTable(db, table, fields, callback)`
#### Example:
```javascript
createTable('/folder/dbName.db', 'user', '
  id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
  created TIMESTAMP NOT NULL CURRENT_TIMESTAMP,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  age INTEGER
');
```
### Drop Table
#### `dropTable(db, table)`
#### Example:
```javascript
dropTable('/folder/dbName.db', 'user')
```
### Insert
#### `insert(db, table, fields, values)`
#### Example:
```javascript
$scope.db.insert("/folder/dbName.db", "user", "username, password, age", "'pc', '1234', 22");
```
```sql
INSERT INTO user (username, password, age) VALUES('pc', '1234', 22)
```
### Update
#### `update(db, table, update, where)`
#### Examples:
```javascript
$scope.db.update("/folder/dbName.db", "user", "age=23", "username LIKE 'paulo.*' AND age=22");
```
```sql
UPDATE user SET age=23 WHERE username LIKE 'paulo.*' AND age=22
```
### Delete
#### `delete(db, table, where)`
```javascript
$scope.db.del("/folder/dbName.db", "user", "id=1")
```
```sql
DELETE user WHERE id=1
```
### Select
#### `select(db, fields, table, where, callback)`
```javascript
$scope.db.select(
  "/folder/dbName.db",
  "age IS NULL AND username IS NOT NULL",
  function(row) {
  $scope.users = [];
    for(var i = 0; i < row.length; i++) {
      $scope.users.push(row[i]);
    }
  }
);
```
```sql
SELECT * FROM user WHERE age IS NULL AND username IS NOT NULL
```
```
Operators
------------
Your can use common operators like `=`, `>=`, `<=` and `LIKE`. You can use also `IS NULL` and `NOT NULL` as condition values.

License
---------
ngSQLite3 is licensed under the MIT license. See the LICENSE file for more details.