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
    cognitoFromEmailPrefix: "no-reply@",
    cognitoFromName: "ServerlessBlogApp",
    accountIdParameter: "/serverlessBlog/accountId",
    domainNameParameter: "/serverlessBlog/domainName",
    googleOAuthClientIdParameter: "/serverlessBlog/googleOAuthClientId",
    // googleOAuthClientSecret has not yet been implemented because I'm cheap and don't want to pay $.40 USD/month/secret.
    // It will be implemented when I figure out all the other secrets I need to store so I can make the most of the 30 day free trial.
    googleOAuthClientSecret: "PLACEHOLDER", 
  });
  cdk.Tags.of(app).add("Project", project);
  cdk.Tags.of(app).add("Stage", stage);
}
