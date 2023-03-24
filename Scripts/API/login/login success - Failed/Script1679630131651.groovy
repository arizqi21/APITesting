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

request = WS.sendRequestAndVerify(findTestObject('API/Reqres.in/login API/login - Failed'))

WS.verifyResponseStatusCode(request, 400)

String jsonSchema = '\r\n{\r\n\t"$id": "https://example.com/person.schema.json",\r\n  \t"$schema": "https://json-schema.org/draft/2020-12/schema",\r\n  \t"title": "user",\r\n  \t"type": "object",\r\n  \t"properties": {\r\n\t\t"error": {\r\n\t     \t"type": "string",\r\n\t      \t"description": "showing the error message."\r\n\t    }\r\n\t}\r\n}\r\n\r\n'

WS.validateJsonAgainstSchema(request, jsonSchema)

