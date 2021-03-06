var roleHarvester = require("role_harvester");
var roleUpgrader = require("role_upgrader");
var roleBuilder = require("role_builder");
var roleRepairer = require("role_repairer");

var population = require("population");

module.exports.loop = function () {
  population.run();

  // var closestSource = Game.spawns["Spawn1"].pos.findClosestByPath(FIND_SOURCES);
  // let path = closestSource.pos.findPathTo(Game.spawns["Spawn1"], {
  //   ignoreCreeps: true,
  // });

  // for (let j = 0; j < path.length; ++j) {
  //   room.createConstructionSite(path[j].x, path[j].y, STRUCTURE_ROAD);
  // }

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    switch (creep.memory.role) {
      case "harvester":
        roleHarvester.run(creep);
        break;
      case "upgrader":
        roleUpgrader.run(creep);
        break;
      case "builder":
        roleBuilder.run(creep);
        break;
      case "repairer":
        roleBuilder.run(creep);
        break;
      default:
        break;
    }
  }
};
