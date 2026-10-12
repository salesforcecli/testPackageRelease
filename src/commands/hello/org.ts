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
import { Args } from '@oclif/core';
import { Messages, SfError } from '@salesforce/core';
import {
  Flags,
  SfCommand,
  optionalHubFlagWithDeprecations,
  orgApiVersionFlagWithDeprecations,
  requiredOrgFlagWithDeprecations,
} from '@salesforce/sf-plugins-core';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectoryFromMetaUrl(import.meta.url);

// Load the specific messages for this file. Messages from @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('@salesforce/test-plugin117', 'org');

export type HelloOrgResult = {
  orgId: string;
  outputString: string;
};

export default class Org extends SfCommand<HelloOrgResult> {
  public static readonly summary = messages.getMessage('commandDescription');

  public static readonly examples = messages.getMessages('examples');

  public static readonly args = {
    file: Args.string(),
  };

  public static readonly flags = {
    // flag with a value (-n, --name=VALUE)
    name: Flags.string({
      char: 'n',
      summary: messages.getMessage('nameFlagDescription'),
    }),
    force: Flags.boolean({
      char: 'f',
      summary: messages.getMessage('forceFlagDescription'),
    }),
    'target-org': requiredOrgFlagWithDeprecations,
    // Comment this out if your command does not support a hub org username
    'target-dev-hub': optionalHubFlagWithDeprecations,
    'api-version': orgApiVersionFlagWithDeprecations,
  };

  public async run(): Promise<HelloOrgResult> {
    const { args, flags } = await this.parse(Org);
    const name = flags.name ?? 'world';

    const org = flags['target-org'];
    const conn = org.getConnection();
    const query = 'Select Name, TrialExpirationDate from Organization';

    // The type we are querying for
    interface Organization {
      Name: string;
      TrialExpirationDate: string;
    }

    // Query the org
    const result = await conn.query<Organization>(query);

    // Organization will always return one result, but this is an example of throwing an error
    // The output and --json will automatically be handled for you.
    if (!result.records || result.records.length <= 0) {
      throw new SfError(messages.getMessage('errorNoOrgResults', [org.getOrgId()]));
    }

    // Organization always only returns one result
    const orgName = result.records[0].Name;
    const trialExpirationDate = result.records[0].TrialExpirationDate;

    let outputString = `Hello ${name}! This is org: ${orgName}`;
    if (trialExpirationDate) {
      const date = new Date(trialExpirationDate).toDateString();
      outputString = `${outputString} and I will be around until ${date}!`;
    }
    this.log(outputString);

    // the hub org is NOT guaranteed because target-dev-hub is optional.
    const hubOrg = flags['target-dev-hub'];
    if (hubOrg) {
      this.log(`My hub org id is: ${hubOrg.getOrgId()}`);
    }

    if (flags.force && args.file) {
      this.log(`You input --force and a file: ${args.file}`);
    }

    // Return an object to be displayed with --json
    return { orgId: org.getOrgId(), outputString };
  }
}
