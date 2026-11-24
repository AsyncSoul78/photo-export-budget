const fs = require('node:fs');
const path = require('node:path');
function check(file, limitKiB) {
  if (!Number.isFinite(limitKiB) || limitKiB <= 0) throw new Error('Limit must be a positive number in KiB.');
  const stat = fs.statSync(file);
  if (!stat.isFile()) throw new Error('Expected a file.');
  const limit = Math.floor(limitKiB * 1024);
  return {name:path.basename(file),bytes:stat.size,limit,within:stat.size<=limit};
}
if (require.main === module) {
  try {
    const result = check(process.argv[2], Number(process.argv[3]));
    console.log(result.name + ': ' + result.bytes + ' bytes, limit ' + result.limit + ' bytes (' + (result.within ? 'within budget' : 'over budget') + ')');
    if (!result.within) process.exitCode = 1;
  } catch (error) {
    console.error(error.message);
    process.exitCode = 2;
  }
}
module.exports = {check};
