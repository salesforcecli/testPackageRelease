/*
 * Copyright 2025, Salesforce, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { expect } from 'chai';
import { MockTestOrgData, TestContext } from '@salesforce/core/testSetup';
import { stubSfCommandUx } from '@salesforce/sf-plugins-core';
import Org from '../../../src/commands/hello/org.js';

describe('hello:org', () => {
  const $$ = new TestContext();
  const testOrg = new MockTestOrgData();
  let sfCommandStubs: ReturnType<typeof stubSfCommandUx>;

  beforeEach(async () => {
    sfCommandStubs = stubSfCommandUx($$.SANDBOX);
    await $$.stubAuths(testOrg);
    $$.fakeConnectionRequest = (request) => {
      if (/Organization/.exec(String((request as { url: string }).url))) {
        return Promise.resolve({
          records: [
            {
              Name: 'Super Awesome Org',
              TrialExpirationDate: '2018-03-20T23:24:11.000+0000',
            },
          ],
        });
      }
      return Promise.resolve({ records: [] });
    };
  });

  it('runs hello:org --targetusername', async () => {
    const result = await Org.run(['--targetusername', testOrg.username]);
    const output = sfCommandStubs.log
      .getCalls()
      .flatMap((c) => c.args)
      .join('\n');
    expect(output).to.contain(
      'Hello world! This is org: Super Awesome Org and I will be around until Tue Mar 20 2018!'
    );
    expect(result.orgId).to.equal(testOrg.orgId);
  });

  it('runs hello:org --target-org with --name', async () => {
    const result = await Org.run(['--target-org', testOrg.username, '--name', 'Astro']);
    expect(result.outputString).to.contain('Hello Astro! This is org: Super Awesome Org');
  });
});
