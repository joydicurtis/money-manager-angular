/* Common configs should be here */
const globalConfig = {
  /* Note:
    by some reason the GC doesn't release the memory after each test case.
    This property is going to call GC to reset heap size once it is close to 500 mb
  */
  workerIdleMemoryLimit: '500MB',
  collectCoverage: true,
  coverageDirectory: `${process.env.NX_WORKSPACE_ROOT}/coverage/${process.env['NX_TASK_TARGET_PROJECT']}`,
};

module.exports = { ...globalConfig };
