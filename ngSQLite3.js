/*
 * ngAQLite3
 * https://github.com/griiettner/ngSQLite3

 * Version: 0.1.0 - 2014-12-14
 * License: MIT
 */

"use strict";

(function() {

  /**
   * @ngdoc overview
   * @name ngSQLite3
   */

  angular.module("ngSQLite3", []).

  /**
   * @ngdoc object
   * @name ngSQLite3.$SQLite3
   */

  factory("$SQLite3", ["$q", function($q) {
    return {
      executeQuery: function(db, query, callback) {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', db, true);
        xhr.responseType   = 'arraybuffer';
        var result = [];
        xhr.onload         = function(e) {
          var uInt8Array = new Uint8Array(this.response);
          var db         = new SQL.Database(uInt8Array);
          var contents   = db.each(query,[],
            function(row) {
              result.push(row);
            },
            function() {
              // window.localStorage.setItem('data', result);
              callback(result);
              db.close();
            }
          );
        };
        xhr.send();
      },
      insert: function(db, table, fields, values) {
        return this.executeQuery(db, 'INSERT INTO ' + table + ' (' + fields + ') VALUES (' + values + ');');
      },
      update: function(db, table, update, where) {
        return this.executeQuery(db, 'UPDATE ' + table + ' SET ' + update + ' WHERE ' + where + ';');
      },
      delete: function(db, table, where) {
        return this.executeQuery(db, 'DELETE FROM ' + table + ' WHERE ' + where + ';');
      },
      select: function(db, fields, table, where, callback) {
        var w = null;
        if (!where) {
          w = '';
        } else {
          w = ' WHERE ' + where;
        }
        select = this.executeQuery(db, 'SELECT ' + fields + ' FROM ' + table + w, callback);

        return select;
      },
      createTable: function(db, table, fields) {
        return this.executeQuery(db, 'CREATE TABLE IF NOT EXISTS  ' + table + ' (' + fields + ');');
      },
      dropTable: function(db, table, callback) {
        return this.executeQuery(db, 'DROP TABLE IF EXISTS ' + table + ';', callback);
      }
    }
  }]);
})();