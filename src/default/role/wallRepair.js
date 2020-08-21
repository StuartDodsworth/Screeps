var roleBuilder = require("role_builder");

var roleRepairer = {
  /** @param {Creep} creep **/
  run: function (creep) {
    if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.working = false;
      creep.say("🔄 harvest");
    }
    if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
      creep.memory.working = true;
      creep.say("🚧 build");
    }

    if (creep.memory.working) {
      var walls = creep.room.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_WALL || s.structureType == STRUCTURE_RAMPART
      });
      //sorts walls by building progress
      walls = walls.sort(function(a,b) {return (a.hits > b.hits) ? 1 : ((b.hits > a.hits) ? -1 : 0);} );
      var target = walls[0];
      if (target != undefined) {
        if (creep.repair(target) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target, {
            visualizePathStyle: { stroke: "#ffffff" },
          });
        }
      } else {
        roleBuilder.run(creep);
      }
    } else {
      var sources = creep.pos.findClosestByPath(FIND_SOURCES);
      if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources, { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    }
  },
};

module.exports = roleRepairer;
