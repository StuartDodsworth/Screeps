require("prototype_spawn")();

var popControl = {
  minPop: {
    harvester: 5,
    upgrader: 2,
    builder: 2,
    repairer: 2,
  },
  currPop: {
    harvester: 0,
    upgrader: 0,
    builder: 0,
    repairer: 0,
  },
  populationLimit: 20,
  currPopulation: 0,
  run: function () {
    if (
      _.sum(
        Game.spawns["Spawn1"].room.find(FIND_STRUCTURES, {
          filter: (s) => s.structureType == STRUCTURE_EXTENSION,
        })
      ) < 5
    ) {
      this.minPop.harvester = 10;
      this.minPop.upgrader = 3;
      this.minPop.builder = 3;
      this.minPop.repairer = 3;
    }

    for (var name in Memory.creeps) {
      if (!Game.creeps[name]) {
        delete Memory.creeps[name];
        console.log("Clearing non-existing creep memory:", name);
      }
    }

    // Get Population numbers
    this.currPop.harvester = _.sum(
      Game.creeps,
      (creep) => creep.memory.role == "harvester"
    );
    this.currPop.upgrader = _.sum(
      Game.creeps,
      (creep) => creep.memory.role == "upgrader"
    );
    this.currPop.builder = _.sum(
      Game.creeps,
      (creep) => creep.memory.role == "builder"
    );
    this.currPop.repairer = _.sum(
      Game.creeps,
      (creep) => creep.memory.role == "builder"
    );

    var energy = Game.spawns["Spawn1"].room.energyCapacityAvailable;

    // Spawn new creeps
    if (this.currPopulation < this.populationLimit) {
      if (this.currPop.harvester < this.minPop.harvester) {
        if (
          Game.spawns["Spawn1"].spawnCustomCreep(
            energy,
            "Harvester" + Game.time,
            "harvester"
          ) == ERR_NOT_ENOUGH_ENERGY &&
          this.currPop.harvester == 0
        ) {
          Game.spawns["Spawn1"].spawnCustomCreep(
            200,
            "Harvester" + Game.time,
            "harvester"
          );
        }
      } else if (this.currPop.upgrader < this.minPop.upgrader) {
        Game.spawns["Spawn1"].spawnCustomCreep(
          energy,
          "Upgrader" + Game.time,
          "upgrader"
        );
      } else if (this.currPop.builder < this.minPop.builder) {
        Game.spawns["Spawn1"].spawnCustomCreep(
          energy,
          "Builder" + Game.time,
          "builder"
        );
      } else if (this.currPop.repairer < this.minPop.repairer) {
        Game.spawns["Spawn1"].spawnCustomCreep(
          energy,
          "Repairer" + Game.time,
          "repairer"
        );
      } else {
        Game.spawns["Spawn1"].spawnCustomCreep(
          energy,
          "Builder" + Game.time,
          "builder"
        );
      }
    }
    if (Game.spawns["Spawn1"].spawning) {
      var spawningCreep = Game.creeps[Game.spawns["Spawn1"].spawning.name];
      Game.spawns["Spawn1"].room.visual.text(
        "🛠️" + spawningCreep.memory.role,
        Game.spawns["Spawn1"].pos.x + 1,
        Game.spawns["Spawn1"].pos.y,
        { align: "left", opacity: 0.8 }
      );
    }
  },
};

module.exports = popControl;
