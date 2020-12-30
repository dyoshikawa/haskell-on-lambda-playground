import * as cdk from '@aws-cdk/core'
import * as lambda from '@aws-cdk/aws-lambda'
import * as apigateway from '@aws-cdk/aws-apigateway'

export class HaskellOnLambdaPlaygroundStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    /**
     * lambda fn
     */
    new lambda.Function(this, `${id}-lambda-fn`, {
      code: lambda.Code.fromAsset('../lambda-src/build'),
      functionName: `${id}-lambda-fn`,
      runtime: lambda.Runtime.PROVIDED_AL2,
      handler: 'src/Lib.handler',
    })

    /**
     * apigateway + lambda fn
     */
    const api = new apigateway.RestApi(this, 'people-api')
    const peopleApi = api.root.addResource('people')

    const apigatewayLambdaFn = new lambda.Function(
      this,
      `${id}-apigateway-lambda-fn`,
      {
        code: lambda.Code.fromAsset('../lambda-src/build'),
        functionName: `${id}-apigateway-lambda-fn`,
        runtime: lambda.Runtime.PROVIDED_AL2,
        handler: 'src/Lib.handler',
      }
    )

    peopleApi.addMethod(
      'POST',
      new apigateway.LambdaIntegration(apigatewayLambdaFn)
    )
  }
}
