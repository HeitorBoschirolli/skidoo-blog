import React from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CenteredH2, CenteredH3, TextContainer } from "./styled";

const JavaLambdaPartOne = () => {
    return (
        <TextContainer>
            <CenteredH2>Using AWS Lambda With Java Part I</CenteredH2>
            <CenteredH3>Introduction</CenteredH3>
            <p>
                This is a multi-part series on how to use AWS Lambda with Java.
                The first part will cover how to deploy a java aplication to AWS Lambda and test it using the AWS console.
                All source code is in <a href="https://github.com/HeitorBoschirolli/AwsLambdaAndJava">a Github repository</a> and
                the end of each step is saved in a different branch, the complete project is saved in the "mainline" branch.
            </p>
            <CenteredH3>Creating a Maven Project</CenteredH3>
            <p>
                We'll need a project to deploy to AWS Lambda and something to manage it's dependencies.
                Use the command bellow to create a Maven project. The details of the command bellow and how Maven works are not part of this tutorial and will not be explained in depth.
            </p>
            <SyntaxHighlighter language="bash" style={dracula}>
                mvn archetype:generate -DgroupId=com.example.vanilla -DartifactId=vanilla -DarchetypeArtifactId=maven-archetype-quickstart -DarchetypeVersion=1.4 -DinteractiveMode=false
            </SyntaxHighlighter>
            <p>
                To use Java 8, we'll need to change some lines in the pom.xml file, replace this lines:
            </p>
            <SyntaxHighlighter language="markup" style={dracula}>
                {
                    "<maven.compiler.source>1.7</maven.compiler.source>\n"
                    + "<maven.compiler.target>1.7</maven.compiler.target>"
                }
            </SyntaxHighlighter>
            <p>
                With this:
            </p>
            <SyntaxHighlighter language="markup" style={dracula}>
                {
                    "<maven.compiler.source>1.8</maven.compiler.source>\n"
                    + "<maven.compiler.target>1.8</maven.compiler.target>"
                }
            </SyntaxHighlighter>
            <p>
                The source code for the steps described in this section are in the
                branch <a href="https://github.com/HeitorBoschirolli/AwsLambdaAndJava/tree/part-1-a">part-1-a</a> of
                the Github repo.
            </p>
            <CenteredH3>Creating a Simple Lambda Function</CenteredH3>
            <p>
                The first step to create a lambda function is adding
                the aws-lambda-java-core dependency to the project. To do this, add the
                following code block to the dependencies section of the pom.xml file:
            </p>
            <SyntaxHighlighter language="markup" style={dracula}>
                {
                    "<dependency>\n"
                    + "  <groupId>com.amazonaws</groupId>\n"
                    + "  <artifactId>aws-lambda-java-core</artifactId>\n"
                    + "  <version>1.2.1</version>\n"
                    + "</dependency>"
                }
            </SyntaxHighlighter>
            <p>
                Rename the App class (and file) to Handler. This is not required, but it's a
                more convenient name. Now replace the content of the Handler class with:
            </p>
            <SyntaxHighlighter language="java" style={dracula}> 
                {
                    "public class Handler implements RequestHandler<Map<String,String>, String> {\n"
                    + "  public String handleRequest(Map<String, String> event, Context context) {\n"
                    + `    return "Hello there";\n`
                    + "  }\n"
                    + "}"
                }
            </SyntaxHighlighter>
            <p>
                It's necessary to specify the input and output types in the RequestHandler, in
                this case the input is of type Map&lt;String, String&gt; and the output of type
                String. The first parameter (called event here) is the input and the second
                parameter (called context here) provides information about the invocation,
                more on the context parameter can be found&nbsp;
                <a href="https://docs.aws.amazon.com/lambda/latest/dg/java-context.html">
                    here
                </a>.
            </p>
            <p>
                Use <SyntaxHighlighter style={dracula}>mvn clean install</SyntaxHighlighter> to generate the .jar file.
                To run the function set the runtime to java 8 and the Handler to
                com.example.javaaws.Handler::handleRequest, upload the jar, create a test (with empty input or not) and
                run it.
            </p>
            <p>
                The code from this section is in the&nbsp;
                <a href="https://github.com/HeitorBoschirolli/AwsLambdaAndJava/tree/part-1-b">part-1-b branch</a>.
            </p>
            <CenteredH3>Adding Dependencies</CenteredH3>
            <p>
                Since a single jar file is uploaded to AWS, it need to contain all project
                dependencies, normally Maven don't include all dependencies in a single jar,
                so if we added a library to the dependencies section of pom.xml, the lambda
                handler in AWS would not be able to find it. Adding the maven-shade plugin
                to the build configuration of the project solves this problem, with it Maven
                will include all dependencies in a "fat" jar file. This is not a tutorial
                on how maven-shade works, so I'll just show how to add it to the project
                so we can use libraries in lambda.
            </p>
            <p>
                Remove the pluginManagement tag from the build section of pom.xml, but leave
                everything that's inside it. Remove the maven-site-plugin and the
                maven-project-info-reports-plugin plugins then add the maven-shade plugin as
                shown bellow:
            </p>
            <SyntaxHighlighter language="markup" style={dracula}>
                {
                    "<plugin>\n"
                    + "  <groupId>org.apache.maven.plugins</groupId>\n"
                    + "  <artifactId>maven-shade-plugin</artifactId>\n"
                    + "  <version>3.2.2</version>\n"
                    + "  <configuration>\n"
                    + "    <createDependencyReducedPom>false</createDependencyReducedPom>\n"
                    + "  </configuration>\n"
                    + "  <executions>\n"
                    + "    <execution>\n"
                    + "      <phase>package</phase>\n"
                    + "      <goals>\n"
                    + "        <goal>shade</goal>\n"
                    + "      </goals>\n"
                    + "    </execution>\n"
                    + "  </executions>\n"
                    + "</plugin>"
                }
            </SyntaxHighlighter>
            <p>
                To check if dependencies are now correctly added to the same jar file, add
                the joda time dependency as shown bellow:
            </p>
            <SyntaxHighlighter language="markup" style={dracula}>
                {
                    "<dependency>\n"
                    + "  <groupId>joda-time</groupId>\n"
                    + "  <artifactId>joda-time</artifactId>\n"
                    + "  <version>2.10.9</version>\n"
                    + "</dependency>"
                }
            </SyntaxHighlighter>
            <p>
                And change the return value of the lambda function to a date ISO string:
            </p>
            <SyntaxHighlighter language="java" style={dracula}>
                {
                    "public class Handler implements RequestHandler<Map<String,String>, String> {\n"
                    + "    public String handleRequest(Map<String, String> event, Context context) {\n"
                    + "        return DateTime.now().toString();\n"
                    + "    }\n"
                    + "}"
                }
            </SyntaxHighlighter>
            <p>
                Upload to AWS and test it. Notice that now you have two jar files,
                original-javaaws-1.0-SNAPSHOT.jar and javaaws-1.0-SNAPSHOT.jar,
                the one with all dependencies is javaaws-1.0-SNAPSHOT.jar,
                hence is the one to be uploaded to AWS.
            </p>
            <p>
                Code from this section is in the branch&nbsp;
                <a href="https://github.com/HeitorBoschirolli/AwsLambdaAndJava/tree/part-1-c">
                        part-1-c
                </a>.
            </p>
            <CenteredH3>Using POJOs as Input and Output</CenteredH3>
            <p>
                Until now, the lambda function received a json as a Map and returned a string.
                It's possible to receive the json as a POJO and return another POJO that will
                be converted to json by Lambda.
            </p>
            <p>
                To test this create an Input and an Output class in the same package as
                the Handler class. The classes are shown bellow:
            </p>
            <SyntaxHighlighter language="java" style={dracula}>
                {
                    "public class Input {\n"
                    + "    private String value1;\n"
                    + "    private String value2;\n"
                    + "\n"
                    + "    public String getValue1() {\n"
                    + "        return this.value1;\n"
                    + "    }\n"
                    + "\n"
                    + "    public String getValue2() {\n"
                    + "        return this.value2;\n"
                    + "    }\n"
                    + "\n"
                    + "    public void setValue1(String value1) {\n"
                    + "        this.value1 = value1;\n"
                    + "    }\n"
                    + "\n"
                    + "    public void setValue2(String value2) {\n"
                    + "        this.value2 = value2;\n"
                    + "    }\n"
                    + "}"
                }
            </SyntaxHighlighter>
            <SyntaxHighlighter language="java" style={dracula}>
                {
                    "public class Output {\n"
                    + "    private String concatenation;\n"
                    + "    private String dateString;\n"
                    + "\n"
                    + "    public Output(String concatenation, String dateString) {\n"
                    + "        this.concatenation = concatenation;\n"
                    + "        this.dateString = dateString;\n"
                    + "    }\n"
                    + "\n"
                    + "    public String getConcatenation() {\n"
                    + "        return concatenation;\n"
                    + "    }\n"
                    + "\n"
                    + "    public String getDateString() {\n"
                    + "        return dateString;\n"
                    + "    }\n"
                    + "}"
                }
            </SyntaxHighlighter>
            <p>
                The Input class need setters so Jackson (which the AWS Lambda library uses)
                can build the object from the input JSON. The Output class needs getters
                so that Jackson can build the JSON from the object.
                Update the Handler class to:
            </p>
            <SyntaxHighlighter language="java" style={dracula}>
                {
                    "public class Handler implements RequestHandler<Input, Output> {\n"
                    + "    public Output handleRequest(Input input, Context context) {\n"
                    + "        return new Output(input.getValue1() + input.getValue2(), DateTime.now().toString());\n"
                    + "    }\n"
                    + "}"
                }
            </SyntaxHighlighter>
            <p>
                Upload the code to AWS, create a test passing a JSON with "value1" and "value2" and run it.
                The code from this section is in branch&nbsp;
                <a href="https://github.com/HeitorBoschirolli/AwsLambdaAndJava/tree/part-1-d">
                    part-1-d
                </a>.
            </p>
            <CenteredH3>
                Using a Custom Converter
            </CenteredH3>
            <p>
                Up until now aws-lambda-java-core was responsible for converting objects
                from and to JSON. This has some limitations, if we want to build the object
                from JSON using a constructor instead of setters, or if we want to receive
                a JSON a field named X and map it's value to a property named Y for example,
                this cannot be achieved with RequestHandler's automatic conversion, we need
                to convert from JSON to object and from object to JSON ourselves. This can
                be done using the RequestStreamHandler class instead of RequestHandler and
                adding Jackson as a dependency to map objects and JSONs in a more customized
                manner.
            </p>
            <p>
                Start by adding Jackson as a dependency as shown bellow:
            </p>
            <SyntaxHighlighter language="markup" style={dracula}>
                {
                    "<dependency>\n"
                    + "  <groupId>com.fasterxml.jackson.core</groupId>\n"
                    + "  <artifactId>jackson-databind</artifactId>\n"
                    + "  <version>2.11.4</version>\n"
                    + "</dependency>"
                }
            </SyntaxHighlighter>
            <p>
                Then update the Handler class to:
            </p>
            <SyntaxHighlighter language="java" style={dracula}>
                {
                    "public class Handler implements RequestStreamHandler {\n"
                    + "    private ObjectMapper objectMapper = new ObjectMapper();\n"
                    + "\n"
                    + "    public void handleRequest(InputStream inputStream, OutputStream outputStream, Context context) {\n"
                    + "        Input input;\n"
                    + "        try {\n"
                    + "            input = objectMapper.readValue(inputStream, Input.class);\n"
                    + "        } catch (Exception e) {\n"
                    + "            throw new RuntimeException(e);\n"
                    + "        }\n"
                    + "\n"
                    + "        Output output = new Output(input.getValue1() + input.getValue2(), DateTime.now().toString());\n"
                    + "\n"
                    + "        try {\n"
                    + "            objectMapper.writeValue(outputStream, output);\n"
                    + "        } catch (Exception e) {\n"
                    + "            throw new RuntimeException(e);\n"
                    + "        }\n"
                    + "    }\n"
                    + "}"
                }
            </SyntaxHighlighter>
            <p>
                If you upload this to AWS and run the same test, it should have
                the same result as before, and now it's possible to use some
                Jackson functionality to do things like building the object from JSON
                using a constructor instead of using setters, as shown bellow for
                the Input object:
            </p>
            <SyntaxHighlighter language="java" style={dracula}>
                {
                    "public class Input {\n"
                    + "    private String value1;\n"
                    + "\n"
                    + "    @JsonCreator(mode = JsonCreator.Mode.PROPERTIES)\n"
                    + "    public Input(@JsonProperty(\"value1\") String value1, @JsonProperty(\"value2\") String value2) {\n"
                    + "        this.value1 = value1;\n"
                    + "        this.value2 = value2;\n"
                    + "    }\n"
                    + "\n"
                    + "    private String value2;\n"
                    + "\n"
                    + "    public String getValue1() {\n"
                    + "        return this.value1;\n"
                    + "    }\n"
                    + "\n"
                    + "    public String getValue2() {\n"
                    + "        return this.value2;\n"
                    + "    }\n"
                    + "}"
                }
            </SyntaxHighlighter>
            <p>
                The code from this section is in the branch&nbsp;
                <a href="https://github.com/HeitorBoschirolli/AwsLambdaAndJava/tree/part-1-e">
                    part-1-e
                </a>. And this concludes the part one of this series on how to use AWS Lambda
                with Java.
            </p>
        </TextContainer>
    );
}

export default JavaLambdaPartOne;