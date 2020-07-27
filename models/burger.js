var orm = require("../config/orm.js");
var burger = {
  selectAll: function(cb) {
    orm.selectAll("burgers", function(res) {
      cb(res);
    });
  },
  select: function(id, cb) {
    orm.selectAll("burgers", function(res) {
      const result = res.find(x=> x.id == id);
      cb(result);
    });
  },
  // The variables cols and vals are arrays.
  insertOne: function(burger, cb) {
    const cols = Object.keys(burger);
    const vals = Object.values(burger);
    orm.insertOne("burgers", cols, vals, function(res) {
      cb(res);
    });
  },
  updateOne: function(burger, id, cb) {
    const condition = "id = " + id;
    orm.updateOne("burgers", burger, condition, function(res) {
      cb(res);
    });
  },
  delete: function(id, cb) {
    const condition = "id = " + id;
     orm.delete("burgers", condition, function(res) {
       cb(res);
     });
  }
};
// Export the database functions for the controller (catsController.js).
module.exports = burger;
