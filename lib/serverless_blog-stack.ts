import * as cdk from "aws-cdk-lib";
import { Duration, aws_cognito } from "aws-cdk-lib";
import { Construct } from "constructs";

export interface ServerlessBlogStackProps extends cdk.StackProps {
  readonly project: string;
  readonly stage: string;
  readonly cognitoFromEmail: string;
  readonly cognitoFromName: string;
  readonly cognitoSesVerifiedDomain: string;
}

export class ServerlessBlogStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: ServerlessBlogStackProps) {
    super(scope, id, props);

    // User Auth
    // Cognito User Pool
    const cognitoUserPool = new aws_cognito.UserPool(this, "blogUserPool", {
      // Sets account recovery to email only with a link
      accountRecovery: aws_cognito.AccountRecovery.EMAIL_ONLY,
      // Enforces the use of an MFW device
      mfa: aws_cognito.Mfa.REQUIRED,
      // Enable the use of OTP devices and disables MFA via SMS
      mfaSecondFactor: {
        otp: true,
        sms: false,
      },
      // Configure Cognito to send emails to users with SES
      email: aws_cognito.UserPoolEmail.withSES({ // Will need to setup an SES verifed email/identity and provide cognito permissions to use it 
        // The from email used for sending emails
        fromEmail: props.cognitoFromEmail,
        // The name that appears on the sent emails
        fromName: props.cognitoFromName,
        // SES Verified custom domain to be used to verify the identity.
        sesVerifiedDomain: props.cognitoSesVerifiedDomain,
      }),
      // Sets a password policy
      passwordPolicy: {
        // Minimum length of 12 characters
        minLength: 12,
        // Requires the use of at least 1 lowercase letter
        requireLowercase: true,
        // Requires the use of at least 1 uppsercase letter
        requireUppercase: true,
        // RFequires the use of at least 1 number
        requireDigits: true,
        // Requires the use of at least 1 symbol
        requireSymbols: true,
        // Sets the duration a temporary password is valid for when created by an Administrator
        tempPasswordValidity: Duration.days(3),
      },
      // Allows users to signup/signin with email or username
      signInAliases: { username: true, email: true },
      // Allow users to register their own accounts
      selfSignUpEnabled: true,
      // Configure the email that is sent to a user when they sign themselves up
      userVerification: {
        // Subject of the email
        emailSubject: "",
        // Body of the email
        emailBody: "",
        // Sends a link the user can follow to verify their account
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
