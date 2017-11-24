# -*- coding: euc-kr -*-

import ExtractOPCode as eoc
import os

# 디렉토리 내 파일 이름들 추출
pathDir = 'C:\\UDIL\\UDIL\\DrawOPGraph\\TargetSample\\'
fileList = os.listdir(pathDir)


###resDict = eoc.extractOPCode(["notepad.exe",], pathDir)
#resDict = eoc.ex

x1 = list(resDict.keys())

y1 = list(resDict.values())

xlen = len(x1)
i = 0

while(True) :
    if(i >= xlen) :
        break
    x = x1[i][1:-1].split(', ')
    try:
        print('%s %s %s %s' % (x[0], x[1], x[2], x[3]), end=' ')
        print(y1[i])
    except IndexError:
        print('', end='')
    i += 1
