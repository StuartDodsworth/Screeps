var roleWorker = {
  /** @param {Creep} creep **/
  run: function (creep) {
    this.harvest(creep);
    this.store(creep);
    this.build(creep);
    this.upgrade(creep);
  },
  /**
   * Sets the creep to harvest if it has space
   * @param {creep} creep
   */
  harvest: function (creep) {
    if (creep.store[RESOURCE_ENERGY] == 0 || creep.memory.job == "harvesting") {
      //console.log("Worker is harvesting");
      var sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], {
          visualizePathStyle: { stroke: "#ffaa00" },
        });
        console.log(sources);
      }
      creep.memory.job =
        creep.store.getFreeCapacity() == 0 ? "none" : "harvesting";
    }
  },
  /**
   * Tells the creep to store the energy
   * @param {creep} creep
   */
  store: function (creep) {
    if (creep.memory.job == "none" || creep.memory.job == "storing") {
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
        //console.log("Worker is storing");
        creep.memory.job = "storing";
        if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], {
            visualizePathStyle: { stroke: "#ffffff" },
          });
        }
      } else {
        creep.memory.job = "none";
      }
    }
  },
  /**
   * Builds construction sites if any
   * @param {creep} creep
   */
  build: function (creep) {
    if (creep.memory.job == "none" || creep.memory.job == "building") {
      var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      if (targets.length) {
        creep.memory.job = "building";
        console.log("Buildings found");
        //console.log("Worker is building");
        if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], {
            visualizePathStyle: { stroke: "#ffffff" },
          });
        }
      } else {
        creep.memory.job = "none";
      }
    }
  },
  /**
   * Upgrades the room controller if nothing else to do
   * @param {creep} creep
   */
  upgrade: function (creep) {
    if (creep.memory.job == "none" || creep.memory.job == "upgrading") {
      console.log("Worker is upgrading");
      creep.memory.job = "upgrading";
      if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller, {
          visualizePathStyle: { stroke: "#ffffff" },
        });
      }
    }
  },
};

module.exports = roleWorker;
