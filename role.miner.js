var roleMiner = {
  /** @param {Creep} creep **/
  run: function (creep) {
    if (creep.store.getFreeCapacity() > 0) {
      var sources = creep.room.find(FIND_SOURCES);

      var closestSource = Game.spawns['Spawn1'].pos.findClosestByRange(
            FIND_SOURCES
          );

      if (creep.harvest(closestSource) == ERR_NOT_IN_RANGE) {
        creep.moveTo(closestSource, { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    } else {
      var transporters = _.filter(
        Game.creeps,
        (creep) => creep.memory.role == "transporter"
      );

      if (transporters.length) {
        creep.drop(RESOURCE_ENERGY);
      } else {
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
          if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], {
              visualizePathStyle: { stroke: "#ffffff" },
            });
          }
        }
      }
    }
  },
};

module.exports = roleMiner;
