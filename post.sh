testDataFileName=samples/fill_form/testData.json
templateFileName=samples/fill_form/testForm.html
sampleImageFileName=samples/fill_form/testImage.svg
curl -F "data=@$testDataFileName" -F "template=@$templateFileName" -F "image=@$sampleImageFileName" localhost:8000/makepdf --output result.pdf
