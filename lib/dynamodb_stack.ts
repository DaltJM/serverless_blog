import * as cdk from "aws-cdk-lib";
import {
  Duration,
  aws_cognito,
  aws_ssm,
  aws_secretsmanager,
  aws_dynamodb,
} from "aws-cdk-lib";
import { Construct } from "constructs";

export interface DynamoDBStackProps extends cdk.StackProps {
  readonly project: string;
  readonly stage: string;
}

export class DynamoDBStack extends Construct {
  constructor(scope: Construct, id: string, props: DynamoDBStackProps) {
    super(scope, id);
    // Blog post management
    // DynamoDB
  }
}
