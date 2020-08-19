var roleTransporter = {
  /** @param {Creep} creep **/
  run: function (creep) {
    if (
      creep.store.getFreeCapacity() > 0 &&
      creep.memory.transportStatus != "storing"
    ) {
      var sources = creep.room.find(FIND_DROPPED_RESOURCES);
      if (creep.pickup(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    } else {
      creep.memory.transportStatus == "storing";
      var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (
            (structure.structureType == STRUCTURE_EXTENSION ||
              structure.structureType == STRUCTURE_SPAWN ||
              structure.structureType == STRUCTURE_TOWER) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
          );
        },
      });
      if (targets.length > 0) {
        switch (creep.transfer(targets[0], RESOURCE_ENERGY)) {
          case ERR_NOT_IN_RANGE:
            creep.moveTo(targets[0], {
              visualizePathStyle: { stroke: "#ffffff" },
            });
            break;
          case OK:
            creep.memory.transportStatus == "collecting";
            break;
          default:
            break;
        }
      }
    }
  },
};

module.exports = roleTransporter;
