var popControl = {
  run: function () {
    for (var name in Memory.creeps) {
      if (!Game.creeps[name]) {
        delete Memory.creeps[name];
        console.log("Clearing non-existing creep memory:", name);
      }
    }

    // Get Population numbers
    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == "miner");
    var upgraders = _.filter(
      Game.creeps,
      (creep) => creep.memory.role == "upgrader"
    );
    var builders = _.filter(
      Game.creeps,
      (creep) => creep.memory.role == "builder"
    );
    var transporters = _.filter(
      Game.creeps,
      (creep) => creep.memory.role == "transporter"
    );

    // Spawn new creeps
    if (miners.length < 3) {
      var newName = "Miner" + Game.time;
      Game.spawns["Spawn1"].spawnCreep([WORK, WORK, CARRY, MOVE], newName, {
        memory: { role: "miner" },
      });
    } else if (transporters.length < 1) {
      var newName = "Transporter" + Game.time;
      Game.spawns["Spawn1"].spawnCreep(
        [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
        newName,
        {
          memory: { role: "transporter" },
        }
      );
    } else if (upgraders.length < 1) {
      var newName = "Upgrader" + Game.time;
      Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], newName, {
        memory: { role: "upgrader" },
      });
    } else if (builders.length < 3) {
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
