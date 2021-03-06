var roleBuilder = require("role_builder");

var roleRepairer = {
	/** @param {Creep} creep **/
	run: function (creep) {
		if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
			creep.memory.target = undefined;
			creep.memory.working = false;
			creep.say("🔄 harvest");
		}
		if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
			creep.memory.working = true;
			creep.say("🚧 repair");
		}

		if (creep.memory.working) {
			if (creep.memory.target == undefined) {
				var walls = creep.room.find(FIND_STRUCTURES, {
					filter: (s) =>
						(s.structureType == STRUCTURE_WALL ||
							s.structureType == STRUCTURE_RAMPART) &&
						s.hits < s.hitsMax,
				});
				//sorts walls by building progress
				walls = walls.sort(function (a, b) {
					return a.hits > b.hits ? 1 : b.hits > a.hits ? -1 : 0;
				});
				creep.memory.target = walls[0].id;
			}
			if (
				creep.memory.target != undefined &&
				Game.getObjectById(creep.memory.target) != undefined
			) {
				if (
					Game.getObjectById(creep.memory.target).hits <
					Game.getObjectById(creep.memory.target).hitsMax
				) {
					if (
						creep.repair(Game.getObjectById(creep.memory.target)) ==
						ERR_NOT_IN_RANGE
					) {
						creep.moveTo(Game.getObjectById(creep.memory.target), {
							visualizePathStyle: { stroke: "#ffffff" },
						});
					}
				} else {
					creep.memory.target = undefined;
				}
			} else {
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
