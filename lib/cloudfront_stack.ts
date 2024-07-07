import * as cdk from "aws-cdk-lib";
import {
  Duration,
  aws_cognito,
  aws_ssm,
  aws_secretsmanager,
  aws_cloudfront,
} from "aws-cdk-lib";
import { Construct } from "constructs";

export interface CloudfrontStackProps extends cdk.StackProps {
  readonly project: string;
  readonly stage: string;
}

export class CloudfrontStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: CloudfrontStackProps) {
    super(scope, id, props);
    // Cloudfront
  }
}
