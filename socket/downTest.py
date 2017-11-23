import sys
import urllib.request as urq
def hook(blockNumber, blockSize, totalSize) :
   print('Downloading %s of %s' %(blockNumber * blockSize, totalSize))
   

def runFileDownload(fileURL, saveDirectory) : 
   fname, header = urq.urlretrieve(fileURL, saveDirectory + fileURL.split('/')[-1])

def helloTest() :
   print('HELLO\n')
