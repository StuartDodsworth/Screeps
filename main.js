var roleUpgrader = require("role.upgrader");
var roleBuilder = require("role.builder");
var roleMiner = require("role.miner");
var roleTransporter = require("role.transporter");

//var popControl = require("pop.control");

module.exports.loop = function () {
  //popControl.run();

  var tower = Game.getObjectById("TOWER_ID");
  if (tower) {
    var closestDamagedStructure = tower.pos.findClosestByRange(
      FIND_STRUCTURES,
      {
        filter: (structure) => structure.hits < structure.hitsMax,
      }
    );
    if (closestDamagedStructure) {
      tower.repair(closestDamagedStructure);
    }

    var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (closestHostile) {
      tower.attack(closestHostile);
    }
  }

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    switch (creep.memory.role) {
      case "miner":
        roleMiner.run(creep);
        break;
      case "upgrader":
        roleUpgrader.run(creep);
        break;
      case "builder":
        roleBuilder.run(creep);
        break;
      case "transporter":
        roleTransporter.run(creep);
        break;
      default:
        break;
    }
  }
};
