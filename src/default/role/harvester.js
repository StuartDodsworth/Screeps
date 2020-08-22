var roleUpgrader = require("role_upgrader");
var roleHarvester = {
	/** @param {Creep} creep **/
	run: function (creep) {
		if (creep.memory.working == true) {
			var sources = creep.pos.findClosestByPath(FIND_SOURCES);
			if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources, { visualizePathStyle: { stroke: "#ffaa00" } });
			}
			creep.memory.working = creep.store.getFreeCapacity() != 0;
		} else {
			var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
				filter: (structure) => {
					return (
						(structure.structureType == STRUCTURE_EXTENSION ||
							structure.structureType == STRUCTURE_SPAWN) &&
						structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
					);
				},
			});
			if (target != undefined) {
				if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target, {
						visualizePathStyle: { stroke: "#ffffff" },
					});
				}
			} else {
				var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
					filter: (structure) => {
						return (
							structure.structureType == STRUCTURE_TOWER &&
							structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
						);
					},
				});
				if (target != undefined) {
					if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						creep.moveTo(target, {
							visualizePathStyle: { stroke: "#ffffff" },
						});
					}
				} else {
					roleUpgrader.run(creep);
				}
			}
			creep.memory.working = creep.store[RESOURCE_ENERGY] == 0;
		}
	},
};

module.exports = roleHarvester;
