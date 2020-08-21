var roleUpgrader = {
	/** @param {Creep} creep **/
	run: function (creep) {
		if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
			creep.memory.working = false;
			creep.say("🔄 harvest");
		}
		if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
			creep.memory.working = true;
			creep.say("⚡ upgrade");
		}

		if (creep.memory.working) {
			if (creep.memory.isClear) {
				if (
					creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE
				) {
					creep.moveTo(creep.room.controller, {
						visualizePathStyle: { stroke: "#ffffff" },
					});
				}
			} else {
				if (creep.pos.isNearTo(27, 31)) {
					creep.memory.isClear = true;
					creep.moveTo(creep.room.controller, {
						visualizePathStyle: { stroke: "#ffffff" },
					});
				} else {
					creep.memory.isClear = false;
					creep.moveTo(27, 31, {
						visualizePathStyle: { stroke: "#ffffff" },
					});
				}
			}
		} else {
			creep.memory.isClear = false;
			var sources = creep.pos.findClosestByPath(FIND_SOURCES);
			if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources, { visualizePathStyle: { stroke: "#ffaa00" } });
			}
		}
	},
};

module.exports = roleUpgrader;
