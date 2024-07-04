#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { ServerlessBlogStack } from "../lib/serverless_blog-stack";

const app = new cdk.App();

///////////////////////
// Development Stack //
///////////////////////
{
  const project = "serverlessBlogStack";
  const stage = "Development";

  const devStack = new ServerlessBlogStack(app, `${stage}-${project}`, {
    project: project,
    stage: stage,
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    },
    cognitoFromEmail: "",
    cognitoFromName: "",
    cognitoSesVerifiedDomain: "",
  });
  cdk.Tags.of(app).add("Project", project);
  cdk.Tags.of(app).add("Stage", stage);
}
