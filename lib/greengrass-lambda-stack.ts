import cdk = require('@aws-cdk/core');
import lambda = require('@aws-cdk/aws-lambda');

export class GreengrassLambdaStack extends cdk.Stack {

    public readonly greengrassLambdaAlias: lambda.Alias;

    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // GreengrassにデプロイするLambda関数の作成
        const greengrassLambda = new lambda.Function(this, 'GreengrassSampleHandler', {
            runtime: lambda.Runtime.PYTHON_3_7,
            code: lambda.Code.asset('handlers'),
            handler: 'handler.handler',
        });
        const version = greengrassLambda.addVersion('GreengrassSampleVersion');

        // Greengrass Lambdaとして使用する場合、エイリアスを指定する必要がある
        this.greengrassLambdaAlias = new lambda.Alias(this, 'GreengrassSampleAlias', {
            aliasName: 'rasberrypi',
            version: version
        })
    }
}