var roleUpgrader = require("role_upgrader");
var roleBuilder = require("role_builder");
var roleMiner = require("role_miner");
var roleTransporter = require("role_transporter");

var popControl = require("pop.control");

module.exports.loop = function () {
  popControl.run();

  // var tower = Game.getObjectById("TOWER_ID");
  // if (tower) {
  //   var closestDamagedStructure = tower.pos.findClosestByRange(
  //     FIND_STRUCTURES,
  //     {
  //       filter: (structure) => structure.hits < structure.hitsMax,
  //     }
  //   );
  //   if (closestDamagedStructure) {
  //     tower.repair(closestDamagedStructure);
  //   }

  //   var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
  //   if (closestHostile) {
  //     tower.attack(closestHostile);
  //   }
  // }

  var minerCount = _.filter(
    Game.creeps,
    (creep) => creep.memory.role == "miner"
  ).length;

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    switch (creep.memory.role) {
      case "miner":
        roleMiner.run(creep);
        break;
      case "upgrader":
        if (minerCount >= 3) {
          roleUpgrader.run(creep);
        }
        break;
      case "builder":
        if (minerCount >= 3) {
          roleBuilder.run(creep);
        }
        break;
      case "transporter":
        roleTransporter.run(creep);
        break;
      default:
        break;
    }
  }
};
