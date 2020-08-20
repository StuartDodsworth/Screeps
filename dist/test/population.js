var popControl = {
  minPop: {
    harvester: 10,
    upgrader: 3,
    builder: 3,
    repairer: 3,
  },
  currPop: {
    harvester: 0,
    upgrader: 0,
    builder: 0,
    repairer: 0,
  },
  run: function () {
    for (var name in Memory.creeps) {
      if (!Game.creeps[name]) {
        delete Memory.creeps[name];
        console.log("Clearing non-existing creep memory:", name);
      }
    }

    // Get Population numbers
    currPop.harvesters = _.sum(
      Game.creeps,
      (creep) => creep.memory.role == "harvester"
    );
    currPop.upgraders = _.sum(
      Game.creeps,
      (creep) => creep.memory.role == "upgrader"
    );
    currPop.builders = _.sum(
      Game.creeps,
      (creep) => creep.memory.role == "builder"
    );

    // Spawn new creeps
    if (currPop.harvesters < this.minPop.harvester) {
      var newName = "Harvester" + Game.time;
      Game.spawns["Spawn1"].spawnCreep([WORK, WORK, CARRY, MOVE], newName, {
        memory: { role: "harvester" },
      });
    } else if (currPop.upgraders < this.minPop.upgrader) {
      var newName = "Upgrader" + Game.time;
      Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], newName, {
        memory: { role: "upgrader" },
      });
    } else if (currPop.builders < this.minPop.builder) {
      var newName = "Builder" + Game.time;
      Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], newName, {
        memory: { role: "builder" },
      });
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
