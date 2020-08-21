var roleHarvester = {
  /** @param {Creep} creep **/
  run: function (creep) {
    if (creep.store[RESOURCE_ENERGY] == 0 || creep.memory.working == true) {
      creep.memory.working = true;
      var sources = creep.pos.findClosestByPath(FIND_SOURCES);
      if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources, { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    } else {
      creep.memory.working == false;
      var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
          return (
            (structure.structureType == STRUCTURE_EXTENSION ||
              structure.structureType == STRUCTURE_SPAWN ||
              structure.structureType == STRUCTURE_TOWER) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
          );
        },
      });
      if (target != undefined) {
        if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target, {
            visualizePathStyle: { stroke: "#ffffff" },
          });
        }
      }
    }
    creep.pos.createConstructionSite(STRUCTURE_ROAD);
  },
};

module.exports = roleHarvester;
