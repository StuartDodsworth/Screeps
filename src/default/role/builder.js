var roleUpgrader = require("role_upgrader");

var roleBuilder = {
	/** @param {Creep} creep **/
	run: function (creep) {
		creep.memory.working =
			creep.memory.working == undefined ? false : creep.memory.working;
		if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
			creep.memory.working = false;
			creep.say("🔄 harvest");
		}
		if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
			creep.memory.working = true;
			creep.say("🚧 build");
		}

		if (creep.memory.working) {
			var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
				filter: (s) => s.structureType == STRUCTURE_EXTENSION,
			});
			if (target == undefined) {
				var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
			}
			if (target != undefined) {
				var buildStatus = creep.build(target);
				if (buildStatus == ERR_NOT_IN_RANGE) {
					creep.moveTo(target, {
						visualizePathStyle: { stroke: "#ffffff" },
					});
				} else if (
					buildStatus == OK &&
					(target.structureType == STRUCTURE_RAMPART ||
						target.structureType == STRUCTURE_WALL)
				) {
					creep.repair(target);
				}
			} else {
				roleUpgrader.run(creep);
			}
		} else {
			var sources = creep.pos.findClosestByPath(FIND_SOURCES);
			if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources, { visualizePathStyle: { stroke: "#ffaa00" } });
			}
		}
	},
};

module.exports = roleBuilder;
