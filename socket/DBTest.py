import pymongo



class DBConn:
   def __init__(self):
      self.conn = pymongo.MongoClient('127.0.0.1', 27017)
      self.db = self.conn.get_database('uri') # select database
      self.coll = self.db.get_collection('uri')

def DBUriWrite(uriParam, typeParam):
   ConnObj = DBConn()
   ConnObj.coll.insert({"uri":uriParam}, {"type",typeParam})
   return 'done'

def DBUriSearch(uriParam):
   #ConnObj = DBConn()
   conn = pymongo.MongoClient('127.0.0.1', 27017)
   db = conn.get_database('uri') # select database
   coll = db.get_collection('uri')
   result = coll.find({"uri":uriParam}).count()
   return result
   
