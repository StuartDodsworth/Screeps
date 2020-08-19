var roleTransporter = {
  /** @param {Creep} creep **/
  run: function (creep) {
    var sources = creep.room.find(FIND_DROPPED_RESOURCES);
    if (
      creep.store.getFreeCapacity() > 0 &&
      creep.memory.transportStatus != "storing" && sources.length
    ) {
      if (creep.pickup(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    } else {
      creep.memory.transportStatus = "storing";
      
      var closestSourceDrop = creep.pos.findClosestByRange(
            FIND_STRUCTURES,
            {
              filter: (structure) => {
                return (
                  (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER) &&
                  structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                );
              },
            }
          );

      if (creep.transfer(closestSourceDrop, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
          creep.moveTo(closestSourceDrop, {
            visualizePathStyle: { stroke: "#ffffff" },
          });
      }
      if (creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.transportStatus = "collecting";
      }
    }
  },
};

module.exports = roleTransporter;
