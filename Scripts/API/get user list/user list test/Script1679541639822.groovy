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

response = WS.sendRequestAndVerify(findTestObject('API/Reqres.in/getUserListAPI/getUserList'))

'verify the data length of each page'
WS.verifyElementsCount(response, 'data', 6)

'verify the data of each user\r\n'
WS.verifyElementsCount(response, 'data[0]', 5)

'verify response data completeness'
WS.verifyElementsCount(response, '', 6)

String jsonSchema = '\n{\n    "$id": "https://example.com/person.schema.json",\n    "$schema": "https://json-schema.org/draft/2020-12/schema",\n    "title": "user",\n    "type": "object",\n    "properties": {\n        "page": {\n            "type": "integer"\n        },\n        "per_page": {\n            "type": "integer"\n        },\n        "total": {\n            "type": "integer"\n        },\n        "total_pages": {\n            "type": "integer"\n        },\n        "data": {\n            "type": "array",\n            "items": {\n                "type": "object",\n                "required": [\n                    "id","email","first_name","last_name","avatar"\n                ],\n                "properties": {\n                    "id": {\n                        "type": "integer"\n                    },\n                    "email": {\n                        "type": "string"\n                    },\n                    "first_name": {\n                        "type": "string"\n                    },\n                    "last_name": {\n                        "type": "string"\n                    },\n                    "avatar": {\n                        "type": "string"\n                    }\n                }\n            }\n        }\n    },\n    "support": {\n        "type": "object",\n        "required": [\n            "url","text"\n        ],\n        "properties": {\n            "url": {\n                "type": "string"\n            },\n            "text": {\n                "type": "string"\n            }\n        }\n    }\n}\n'

WS.validateJsonAgainstSchema(response, jsonSchema)

