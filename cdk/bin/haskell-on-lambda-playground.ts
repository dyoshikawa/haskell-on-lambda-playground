#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from '@aws-cdk/core'
import { HaskellOnLambdaPlaygroundStack } from '../lib/haskell-on-lambda-playground-stack'

const app = new cdk.App()
new HaskellOnLambdaPlaygroundStack(app, 'haskell-on-lambda-playground-stack')
