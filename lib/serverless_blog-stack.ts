import * as cdk from "aws-cdk-lib";
import { APIGWStack } from "./apigw_stack";
import { CloudfrontStack } from "./cloudfront_stack";
import { CloudwatchStack } from "./cloudwatch_stack";
import { CognitoStack } from "./cognito_stack";
import { DynamoDBStack } from "./dynamodb_stack";
import { LambdaStack } from "./lambda_stack";
import { S3Stack } from "./s3_stack";
import { Construct } from "constructs";

export interface ServerlessBlogStackProps extends cdk.StackProps {
  readonly project: string;
  readonly stage: string;
  readonly cognitoFromEmailPrefix: string;
  readonly cognitoFromName: string;
  readonly accountIdParameter: string;
  readonly domainNameParameter: string;
  readonly googleOAuthClientIdParameter: string;
  readonly cognitoUserPoolRetentionOnStackDestroy: cdk.RemovalPolicy;
}

export class ServerlessBlogStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: ServerlessBlogStackProps) {
    super(scope, id, props);

    const commonProps = {
      env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION,
      },
      project: "serverlessBlogStack",
      stage: "Development",
    };

    new APIGWStack(this, "APIGWStack", {
      ...commonProps,
    });

    new CloudfrontStack(this, "CloudfrontStack", {
      ...commonProps,
    });

    new CloudwatchStack(this, "CloudwatchStack", {
      ...commonProps,
    });

    new CognitoStack(this, "CognitoStack", {
      ...commonProps,
      cognitoFromEmailPrefix: props.cognitoFromEmailPrefix,
      cognitoFromName: props.cognitoFromName,
      accountIdParameter: props.accountIdParameter,
      domainNameParameter: props.domainNameParameter,
      googleOAuthClientIdParameter: props.googleOAuthClientIdParameter,
      cognitoUserPoolRetentionOnStackDestroy: props.cognitoUserPoolRetentionOnStackDestroy
    });

    new DynamoDBStack(this, "DynamoDBStack", {
      ...commonProps
    });

    new LambdaStack(this, "LambdaStack", {
      ...commonProps
    });

    new S3Stack(this, "S3Stack", {
      ...commonProps
    })
  }
}
