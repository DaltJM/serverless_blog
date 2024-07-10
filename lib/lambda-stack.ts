import * as cdk from 'aws-cdk-lib';
import {
  Duration,
  aws_cognito,
  aws_ssm,
  aws_secretsmanager,
  aws_lambda,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface LambdaStackProps extends cdk.StackProps {
  readonly project: string;
  readonly stage: string;
}

export class LambdaStack extends Construct {
  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id);
    // Lambda
  }
}
