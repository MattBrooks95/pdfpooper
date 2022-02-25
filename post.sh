testDataFileName=samples/fill_form/testData.json
templateFileName=samples/fill_form/testForm.html
curl -F "data=@$testDataFileName" -F "template=@$templateFileName" localhost:8000/makepdf --output result.pdf
