import * as cdk from '@aws-cdk/core'
import * as lambda from '@aws-cdk/aws-lambda'
import * as apigateway from '@aws-cdk/aws-apigateway'

export class HaskellOnLambdaPlaygroundStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const api = new apigateway.RestApi(this, 'people-api')
    const peopleApi = api.root.addResource('people')

    const hsFn = new lambda.Function(this, `${id}-hs-fn`, {
      code: lambda.Code.fromAsset('../hs-src/build'),
      functionName: `${id}-hs-fn`,
      runtime: lambda.Runtime.PROVIDED_AL2,
      handler: 'src/Lib.handler',
    })

    peopleApi.addMethod('GET', new apigateway.LambdaIntegration(hsFn))
  }
}
