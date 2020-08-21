var roleBuilder = require("role_builder");

var roleRepairer = {
	/** @param {Creep} creep **/
	run: function (creep) {
		if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
			creep.memory.working = false;
			creep.say("🔄 harvest");
		}
		if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
			creep.memory.working = true;
			creep.say("🚧 build");
		}

		if (creep.memory.working) {
			var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
				filter: (t) =>
					(t.structureType != STRUCTURE_WALL ||
						t.structureType != STRUCTURE_RAMPART) &&
					t.hits < t.hitsMax,
			});
			if (target != undefined) {
				if (creep.repair(target) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target, {
						visualizePathStyle: { stroke: "#ffffff" },
					});
				}
			} else {
				console.log("Repairer is building");
				roleBuilder.run(creep);
			}
		} else {
			var sources = creep.pos.findClosestByPath(FIND_SOURCES);
			if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources, { visualizePathStyle: { stroke: "#ffaa00" } });
			}
		}
	},
};

module.exports = roleRepairer;
