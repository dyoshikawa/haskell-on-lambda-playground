module Lib where

import Aws.Lambda
import Data.Aeson
import GHC.Generics

data Person = Person
  { personName :: String,
    personAge :: Int
  }
  deriving (Generic)

instance FromJSON Person

instance ToJSON Person

newtype ErrorBody = ErrorBody
  { errorBodyMessage :: String
  }
  deriving (Generic)

instance FromJSON ErrorBody

instance ToJSON ErrorBody

handler :: ApiGatewayRequest Person -> Context context -> IO (Either (ApiGatewayResponse ErrorBody) (ApiGatewayResponse Person))
handler request context =
  let person = apiGatewayRequestBody request
   in case person of
        Just person ->
          return
            ( Right
                ApiGatewayResponse
                  { apiGatewayResponseStatusCode = 200,
                    apiGatewayResponseBody = person,
                    apiGatewayResponseHeaders = [],
                    apiGatewayResponseIsBase64Encoded = False
                  }
            )
        Nothing ->
          return
            ( Left
                ApiGatewayResponse
                  { apiGatewayResponseStatusCode = 500,
                    apiGatewayResponseBody = ErrorBody {errorBodyMessage = "error"},
                    apiGatewayResponseHeaders = [],
                    apiGatewayResponseIsBase64Encoded = False
                  }
            )