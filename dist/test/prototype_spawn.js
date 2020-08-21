module.exports = function () {
  StructureSpawn.prototype.spawnCustomCreep = function (
    energy,
    creepName,
    roleName
  ) {
    // create a balanced body as big as possible with the given energy
    var numberOfParts = Math.floor(energy / 200);
    var body = [];
    for (let i = 0; i < numberOfParts; i++) {
      body.push(WORK);
    }
    for (let i = 0; i < numberOfParts; i++) {
      body.push(CARRY);
    }
    for (let i = 0; i < numberOfParts; i++) {
      body.push(MOVE);
    }

    // create creep with the created body and the given role
    return this.spawnCreep(body, creepName, { memory: { role: roleName } });
  };
};
