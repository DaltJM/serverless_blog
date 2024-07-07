import * as cdk from "aws-cdk-lib";
import {
  Duration,
  aws_cognito,
  aws_ssm,
  aws_secretsmanager,
  aws_cloudwatch,
} from "aws-cdk-lib";
import { Construct } from "constructs";

export interface CloudwatchStackProps extends cdk.StackProps {
  readonly project: string;
  readonly stage: string;
}

export class CloudwatchStack extends Construct {
  constructor(scope: Construct, id: string, props: CloudwatchStackProps) {
    super(scope, id);
    // Cloudwatch
  }
}
