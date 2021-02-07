import React from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CenteredH2, CenteredH3, TextContainer } from "./styled";

const JavaLambdaPartTwo = () => {
    return (
        <TextContainer>
            <CenteredH2>Using AWS Lambda With Java Part II</CenteredH2>
            <CenteredH3>Introduction</CenteredH3>
            <p>
                The previous post described how to create a Lambda function with
                Java, add dependencies to it and parse input JSONs. This post will
                start where the last one left off and use Cloud Development Kit
                (CDK) to create the lambda instead of doing it from the AWS
                console, make a deploy script and integration tests. With this
                all infrastructure from the previous post can be created and
                tested without accessing the AWS console. This post suppose cdk
                and npm are already installed.
            </p>
            <CenteredH3>Creating a CDK project</CenteredH3>
            <p>
                The CDK project need to be in it's own directory, here it will
                be created in the case git repository, but there's no problem
                in creating in another one. Create a directory for the CDK
                project with:
            </p>
            <SyntaxHighlighter language="bash" style={dracula}>
                $ mkdir cdk &amp;&amp; cd cdk
            </SyntaxHighlighter>
            <p>
                Inside the CDK directory create a new cdk project:
            </p>
            <SyntaxHighlighter language="bash" style={dracula}>
                $ cdk init app --language typescript
            </SyntaxHighlighter>
            <p>
                Add some dependencies we'll need:
            </p>
            <SyntaxHighlighter language="bash" style={dracula}>
                $ npm i --save @aws-cdk/aws-s3 @aws-cdk/aws-lambda @aws-cdk/aws-s3-deployment
            </SyntaxHighlighter>
            <p>
                It's possible to change the stack name in bin/cdk.ts. Here
                I'll change it to javaCdkStack. The cdk.ts file now looks
                like this:
            </p>
            <SyntaxHighlighter language="typescript" style={dracula}>
                {
                    "#!/usr/bin/env node\n"
                    + "import 'source-map-support/register';\n"
                    + "import * as cdk from '@aws-cdk/core';\n"
                    + "import { JavaCdkStack } from '../lib/cdk-stack';\n"
                    + "\n"
                    + "const app = new cdk.App();\n"
                    + "new JavaCdkStack(app, 'JavaCdkStack');"
                }
            </SyntaxHighlighter>
            <p>
                We need the jar name to deploy it to AWS, right now the name change
                with the version, this is a problem if we want to make a script to
                deploy it, we would need to change the script after every version
                update. A way to solve this is to set a fixed name to the JAR file,
                to do this replace this piece of code from the pom.xml file:
            </p>
            <SyntaxHighlighter language="markup" style={dracula}>
                {"<build>"}
            </SyntaxHighlighter>
            <p>
                With this:
            </p>
            <SyntaxHighlighter language="markup" style={dracula}>
                {
                    "<packaging>jar</packaging>\n"
                    + "<build>\n"
                    + "  <finalName>JavaCdk</finalName>"
                }
            </SyntaxHighlighter>
            <p>
                Now the JAR will always be named JavaCdk.jar.
            </p>
            <p>
                In the cdk-stack.ts file all that's necessary is to intanciate a Lambda
                construct. Something like this:
            </p>
            <SyntaxHighlighter language="typescript" style={dracula}>
                {
                    "import * as cdk from '@aws-cdk/core';\n"
                    + "import * as lambda from '@aws-cdk/aws-lambda';\n"
                    + "\n"
                    + "export class JavaCdkStack extends cdk.Stack {\n"
                    + "    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {\n"
                    + "        super(scope, id, props);\n"
                    + "\n"
                    + "        new lambda.Function(this, 'JavaLambda', {\n"
                    + "            runtime: lambda.Runtime.JAVA_8,\n"
                    + "            handler: 'com.example.javaaws.Handler::handleRequest',\n"
                    + "            memorySize: 512,\n"
                    + "            code: lambda.Code.fromAsset('../target/JavaCdk.jar')\n"
                    + "        });\n"
                    + "    }\n"
                    + "}"
                }
            </SyntaxHighlighter>
            <p>
                To deploy the application run (in the cdk directory):
            </p>
            <SyntaxHighlighter language="bash" style={dracula}>
                {
                    "$ cdk bootstrap && cdk deploy"
                }
            </SyntaxHighlighter>
            <p>
                cdk bootstrap will create an s3 bucket with the jar file in "target/JavaCdk.jar"
            </p>
            <p>
                The text from this section is in the branch&nbsp;
                <a href="https://github.com/HeitorBoschirolli/AwsLambdaAndJava/pull/new/part-2-a">
                    part-2-a.
                </a>.&nbsp;
                There's also a deploy script to build the jar file and deploy it to AWS.
            </p>
            <CenteredH3>Integration tests</CenteredH3>
            <p>                    
                When writing integration tests, there are some decisions one must
                take. If the service under test (SUT) depends on other services,
                will the call to such services be mocked? Will the service be
                actually deployed before the tests or it will run in the
                development machine? If it's gonna run in the develop machine,
                will it be inside a container?
            </p>
            <p>
                This is what will be described here: how to write a integration test
                that sends a request to a lambda deployed to AWS without mocking
                anything. Whether this is the best approach is not gonna be addressed
                here, maybe that's a topic for another post.
            </p>
            <p>
                In this example the integration test will be writen inside the test
                package created by maven. When writing your integration tests
                you can choose to put them in a separate folder (test/unit for unit
                tests and test/integration for integration tests perhaps) or even
                in a different project.
            </p>
            <p>
                Before writing the test, a new dependency need to be added so that
                the lambda functions can be invoked from Java code. In the
                pom.xml file, under the project tag add the snipped bellow:
            </p>
            <SyntaxHighlighter language="markup" style={dracula}>
                {
                    "<dependencyManagement>\n"
                    + "  <dependencies>\n"
                    + "    <dependency>\n"
                    + "      <groupId>software.amazon.awssdk</groupId>\n"
                    + "      <artifactId>bom</artifactId>\n"
                    + "      <version>2.15.14</version>\n"
                    + "      <type>pom</type>\n"
                    + "      <scope>import</scope>\n"
                    + "    </dependency>\n"
                    + "  </dependencies>\n"
                    + "</dependencyManagement>"
                }
            </SyntaxHighlighter>
            <p>
                And under the dependencies tag, add the snipped bellow:
            </p>
            <SyntaxHighlighter language="markup" style={dracula}>
                {
                    "<dependency>\n"
                    + "  <groupId>software.amazon.awssdk</groupId>\n"
                    + "  <artifactId>lambda</artifactId>\n"
                    + "</dependency>\n"
                }
            </SyntaxHighlighter>
            <p>
                In the "HandlerTest" file that already exists, add a function to
                fetch the ARN of the lambda that will be tested. There are different
                ways to do this, one is to search for lambdas by prefix like shown
                bellow:
            </p>
            <SyntaxHighlighter language="java" style={dracula}>
                {
                    "private String fetchArn() {\n"
                    + "    LambdaClient lambdaClient = LambdaClient.builder().build();\n"
                    + "    ListFunctionsResponse listFunctionsResponse = lambdaClient.listFunctions();\n"
                    + "    List<FunctionConfiguration> list = listFunctionsResponse\n"
                    + "            .functions()\n"
                    + "            .stream()\n"
                    + "            .filter(lambda -> lambda.functionName().startsWith(\"JavaCdkStack-JavaLambda\"))\n"
                    + "            .collect(Collectors.toList());\n"
                    + "\n"
                    + "    return list.get(0).functionArn();\n"
                    + "}"
                }
            </SyntaxHighlighter>
            <p>
                Now all that's left is to invoke the lambda function and
                check if the response is what we expect:
            </p>
            <SyntaxHighlighter language="java" style={dracula}>
                {
                    "@Test\n"
                    + "public void shouldRespondWithOutput() throws Exception\n"
                    + "{\n"
                    + "    // create request\n"
                    + "    String arn = fetchArn();\n"
                    + "    Input input = new Input(\"hello\", \"there\");\n"
                    + "    String inputString = objectMapper.writeValueAsString(input);\n"
                    + "    SdkBytes payload = SdkBytes.fromString(inputString, Charset.defaultCharset());\n"
                    + "    InvokeRequest request = InvokeRequest.builder()\n"
                    + "            .functionName(arn)\n"
                    + "            .payload(payload)\n"
                    + "            .build();\n"
                    + "\n"
                    + "    // create Lambda\n"
                    + "    LambdaClient awsLambda = LambdaClient.builder()\n"
                    + "            .build();\n"
                    + "    InvokeResponse response = awsLambda.invoke(request);\n"
                    + "    Output objectResponse = objectMapper.readValue(response.payload().asUtf8String(), Output.class);\n"
                    + "\n"
                    + "    assertEquals(objectResponse.getConcatenation(), \"hellothere\");\n"
                    + "    new DateTime(objectResponse.getDateString()).isAfter(new DateTime().minusMinutes(5));\n"
                    + "    new DateTime(objectResponse.getDateString()).isBeforeNow();\n"
                    + "    awsLambda.close();\n"
                    + "}"
                }
            </SyntaxHighlighter>
            <p>
                The code from this section is in branch part-2-b.
            </p>
        </TextContainer>
    );
};
export default JavaLambdaPartTwo;