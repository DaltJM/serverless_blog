import * as cdk from "aws-cdk-lib";
import {
  Duration,
  aws_cognito,
  aws_ssm,
  aws_secretsmanager,
  aws_apigatewayv2,
} from "aws-cdk-lib";
import { Construct } from "constructs";

export interface APIGWStackProps extends cdk.StackProps {
  readonly project: string;
  readonly stage: string;
}

export class APIGWStack extends Construct {
  constructor(scope: Construct, id: string, props: APIGWStackProps) {
    super(scope, id);
    // API Gateway
  }
}
