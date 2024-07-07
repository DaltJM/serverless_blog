import * as cdk from "aws-cdk-lib";
import {
  Duration,
  aws_cognito,
  aws_ssm,
  aws_secretsmanager,
  aws_s3,
} from "aws-cdk-lib";
import { Construct } from "constructs";

export interface S3StackProps extends cdk.StackProps {
  readonly project: string;
  readonly stage: string;
}

export class S3Stack extends Construct {
  constructor(scope: Construct, id: string, props: S3StackProps) {
    super(scope, id);
    // S3
  }
}
