var popControl = {
  run: function () {
    for (var name in Memory.creeps) {
      if (!Game.creeps[name]) {
        delete Memory.creeps[name];
        console.log("Clearing non-existing creep memory:", name);
      }
    }

    var workers = _.filter(
      Game.creeps,
      (creep) => creep.memory.role == "worker"
    );
    console.log("Workers: " + workers.length);

    if (workers.length < 3) {
      var newName = "Worker" + Game.time;
      if (
        Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], newName, {
          memory: { role: "worker" },
        }) == OK
      ) {
        console.log("Spawning new worker: " + newName);
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
