var popControl = {
  run: function () {
    for (var name in Memory.creeps) {
      if (!Game.creeps[name]) {
        delete Memory.creeps[name];
        console.log("Clearing non-existing creep memory:", name);
      }
    }

    // Get Population numbers
    var harvesters = _.filter(
      Game.creeps,
      (creep) => creep.memory.role == "harvester"
    );
    var upgraders = _.filter(
      Game.creeps,
      (creep) => creep.memory.role == "upgrader"
    );
    var builders = _.filter(
      Game.creeps,
      (creep) => creep.memory.role == "builder"
    );

    // Spawn new creeps
    if (harvesters.length < 3) {
      var newName = "Harvester" + Game.time;
      Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], newName, {
        memory: { role: "harvester" },
      });
    } else if (upgraders.length < 1) {
      var newName = "Upgrader" + Game.time;
      Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], newName, {
        memory: { role: "upgrader" },
      });
    } else if (builders.length < 2) {
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
