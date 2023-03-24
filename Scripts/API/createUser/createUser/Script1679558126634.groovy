import static com.kms.katalon.core.checkpoint.CheckpointFactory.findCheckpoint
import static com.kms.katalon.core.testcase.TestCaseFactory.findTestCase
import static com.kms.katalon.core.testdata.TestDataFactory.findTestData
import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject
import static com.kms.katalon.core.testobject.ObjectRepository.findWindowsObject
import com.kms.katalon.core.checkpoint.Checkpoint as Checkpoint
import com.kms.katalon.core.cucumber.keyword.CucumberBuiltinKeywords as CucumberKW
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as Mobile
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.testcase.TestCase as TestCase
import com.kms.katalon.core.testdata.TestData as TestData
import com.kms.katalon.core.testng.keyword.TestNGBuiltinKeywords as TestNGKW
import com.kms.katalon.core.testobject.TestObject as TestObject
import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WS
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import com.kms.katalon.core.windows.keyword.WindowsBuiltinKeywords as Windows
import internal.GlobalVariable as GlobalVariable
import org.openqa.selenium.Keys as Keys

response = WS.sendRequestAndVerify(findTestObject('API/Reqres.in/createUserAPI/createUser', [('name') : 'john', ('job') : 'clerk']))

'validate the status code\r\n'
WS.verifyResponseStatusCode(response, 201)

String jsonSchema = '\n\n{\n\t"$id": "https://example.com/person.schema.json",\n  \t"$schema": "https://json-schema.org/draft/2020-12/schema",\n  \t"title": "user",\n  \t"type": "object",\n  \t"properties": {\n\t\t"name": {\n\t     \t"type": "string",\n\t      \t"description": "The person\'s first name."\n\t    },\n\t    "job": {\n\t      \t"type": "string",\n\t      \t"description": "The person\'s job."\n\t    },\n\t\t"id": {\n\t\t\t"type": "string",\n\t\t\t"description": "The Id of the user."\n\t\t},\n\t    "createdAt": {\n\t      \t"type": "string",\n\t\t\t"description": "Date creation of the data."\n\t    }\n\t},\n    "required": [\n        "name",\n        "job"\n    ]\n}\n\n'

'validate the response content'
validation = WS.validateJsonAgainstSchema(response, jsonSchema)

WS.verifyElementsCount(response, '', 4)

