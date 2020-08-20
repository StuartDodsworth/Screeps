var roleHarvester = require("role_harvester");
var roleUpgrader = require("role_upgrader");

var population = require("population");

module.exports.loop = function () {
  population.run();

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    switch (creep.memory.role) {
      case "miner":
        roleHarvester.run(creep);
        break;
      case "upgrader":
        roleUpgrader.run(creep);
        break;
      case "builder":
        roleBuilder.run(creep);
        break;
      default:
        break;
    }
  }
};
