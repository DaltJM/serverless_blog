import * as cdk from 'aws-cdk-lib';
import {
  Duration,
  aws_cognito,
  aws_ssm,
  aws_secretsmanager,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface CognitoStackProps extends cdk.StackProps {
  readonly project: string;
  readonly stage: string;
  readonly cognitoFromEmailPrefix: string;
  readonly cognitoFromName: string;
  readonly accountIdParameter: string;
  readonly domainNameParameter: string;
  readonly googleOAuthClientIdParameter: string;
  readonly cognitoUserPoolRetentionOnStackDestroy: cdk.RemovalPolicy;
}

export class CognitoStack extends Construct {
  constructor(scope: Construct, id: string, props: CognitoStackProps) {
    super(scope, id);

    // Import some values from Parameter Store
    // Account ID to deploy this appliation

    const accountIdParameter = aws_ssm.StringParameter.valueFromLookup(
      this,
      props.accountIdParameter,
    );

    const domainNameParameter = aws_ssm.StringParameter.valueFromLookup(
      this,
      props.domainNameParameter,
    );

    const googleOAuthClientIdParameter =
      aws_ssm.StringParameter.valueFromLookup(
        this,
        props.googleOAuthClientIdParameter,
      );

    const googleOAuthClientSecret = new aws_secretsmanager.Secret(
      this,
      'googleOAuthClientSecret',
      {
        secretName: 'googleOAuthClientSecret',
        description: 'The client secret generated in the Google API console',
      },
    );
    // User Auth
    // Cognito User Pool
    const cognitoUserPool = new aws_cognito.UserPool(this, 'blogUserPool', {
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
      email: aws_cognito.UserPoolEmail.withSES({
        // Will need to setup an SES verifed email/identity and provide cognito permissions to use it
        // The from email used for sending emails
        fromEmail: props.cognitoFromEmailPrefix + domainNameParameter,
        // The name that appears on the sent emails
        fromName: props.cognitoFromName,
        // SES Verified custom domain to be used to verify the identity.
        sesVerifiedDomain: domainNameParameter,
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
        emailSubject: `${props.cognitoFromName} Sign-up`,
        // Body of the email
        emailBody: '{##Verify Email##}',
        // Sends a link the user can follow to verify their account
        emailStyle: aws_cognito.VerificationEmailStyle.LINK,
      },
      removalPolicy: props.cognitoUserPoolRetentionOnStackDestroy,
    });

    // Setup google to be an Authentication provider for Cognito and add it to the above userPool
    // https://developers.google.com/identity/sign-in/web/sign-in
    const googleUserPool = new aws_cognito.UserPoolIdentityProviderGoogle(
      this,
      'googleUserPool',
      {
        userPool: cognitoUserPool,
        clientId: googleOAuthClientIdParameter,
        clientSecretValue: googleOAuthClientSecret.secretValue,
      },
    );
  }
}
