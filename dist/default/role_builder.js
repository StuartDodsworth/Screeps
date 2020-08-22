var roleUpgrader = require("role_upgrader");

var roleBuilder = {
	/** @param {Creep} creep **/
	run: function (creep) {
		//creep.memory.wallPos = undefined;
		creep.memory.working =
			creep.memory.working == undefined ? false : creep.memory.working;
		if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
			creep.memory.wallPos = undefined;
			creep.memory.wallType = undefined;
			creep.memory.wallID = undefined;
			creep.memory.working = false;
			creep.say("🔄 harvest");
		}
		if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
			creep.memory.working = true;
			creep.say("🚧 build");
		}

		if (
			creep.memory.working &&
			creep.memory.wallPos == undefined &&
			creep.memory.wallID == undefined
		) {
			var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
				filter: (s) => s.structureType == STRUCTURE_EXTENSION,
			});
			if (target == undefined) {
				var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
			}
			if (target != undefined && creep.memory.wallPos == undefined) {
				var buildStatus = creep.build(target);
				if (buildStatus == ERR_NOT_IN_RANGE) {
					creep.moveTo(target, {
						visualizePathStyle: { stroke: "#ffffff" },
					});
				} else if (
					buildStatus == OK &&
					target.structureType == STRUCTURE_RAMPART
				) {
					creep.memory.wallPos =
						target.structureType == STRUCTURE_RAMPART ? target.pos : undefined;
					creep.memory.wallType = target.structureType;
				}
			} else {
				roleUpgrader.run(creep);
			}
		} else if (
			creep.memory.wallPos != undefined ||
			creep.memory.wallID != undefined
		) {
			if (creep.memory.wallPos != undefined) {
				var wallPos = creep.room.getPositionAt(
					creep.memory.wallPos.x,
					creep.memory.wallPos.y
				);
				console.log(JSON.stringify(wallPos.look()));
				var structure = wallPos
					.lookFor(LOOK_STRUCTURES)
					.filter((s) => s.structureType == STRUCTURE_RAMPART);
				console.log(JSON.stringify(structure));
				creep.memory.wallID = structure[0].id;
				creep.memory.wallPos = undefined;
			}
			let target = Game.getObjectById(creep.memory.wallID);
			if (creep.repair(target) == ERR_NOT_IN_RANGE) {
				creep.moveTo(target, {
					visualizePathStyle: { stroke: "#ffffff" },
				});
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
