import * as cdk from "aws-cdk-lib";
import { Duration, aws_cognito } from "aws-cdk-lib";
import { Construct } from "constructs";

export interface ServerlessBlogStackProps extends cdk.StackProps {}

export class ServerlessBlogStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: ServerlessBlogStackProps) {
    super(scope, id, props);

    // User Auth
    // Cognito
    const cognitouserPool = new aws_cognito.UserPool(this, "blogUserPool", {
      accountRecovery: aws_cognito.AccountRecovery.EMAIL_ONLY,
      mfa: aws_cognito.Mfa.REQUIRED,
      mfaSecondFactor: {
        otp: true,
        sms: false,
      },
      email: aws_cognito.UserPoolEmail.withSES({ // Will need to setup an SES verifed email/identity and provide cognito permissions to use it 
        fromEmail: "no-reply@placeholder.com",
        fromName: "serverlessBlog",
        sesVerifiedDomain: "",
      }),
      passwordPolicy: {
        minLength: 12,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: true,
        tempPasswordValidity: Duration.days(3),
      },
      signInAliases: { username: true, email: true },
      selfSignUpEnabled: true,
      userVerification: {
        emailSubject: "",
        emailBody: "",
        emailStyle: aws_cognito.VerificationEmailStyle.LINK
      }
    });
    // Blog post management
    // DynamoDB

    // API Gateway

    // Lambda
    // Frontend and hosting
    // S3

    // Cloudfront

    // Monitoring and logging
    // Cloudwatch
  }
}
