import { StyleSheetTestUtils } from 'aphrodite';

afterEach(
  () =>
    new Promise((resolve) => {
      StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
      return process.nextTick(resolve);
    })
);
