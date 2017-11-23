import downTest
import DBTest
import sys
import json


if __name__ == "__main__":
   #if(DBTest.DBUriSearch(sys.argv[1]) == 0):
   downTest.runFileDownload(sys.argv[1], './')  # parameter(uri), downloadpath

   # machineLeaningAlgorithm place
   typeParam = '0'

   DBTest.DBUriWrite(sys.argv[1], typeParam)

   JEn = json.dumps({'id':sys.argv[2],'stat':typeParam})
   #print(JEn)
   print(sys.argv[2])
   print(typeParam)
