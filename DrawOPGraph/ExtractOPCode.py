import distorm3
import os
import pefile

# .text 섹션을 추출
def extractTextSection(fname, pathDir) :
    pe = pefile.PE(pathDir + fname)
    _text = pe.sections[0]
    tos = pe.OPTIONAL_HEADER.Magic # Three Or Six (32bit or 64bit)
    _textStartOffset = _text.PointerToRawData  ## 섹션 시작 offset
    _textSize = _text.SizeOfRawData  ## 섹션 size
    pe.close()

    with open(pathDir+fname, 'rb') as f:
        f.seek(_textStartOffset)
        return f.read(_textSize), tos

def extractOPCode(fileList, pathDir) :
    for fname in fileList :
        with open('C:\\UDIL\\UDIL\\DrawOPGraph\\OutputTXT\\Backdoor\\'+fname+'.txt', 'w') as f :
            print(fname+ " analyzing..... ")
            OPlist = []

            # Read the code from the file
            code, tos = extractTextSection(fname, pathDir)

            # Print each decoded instruction
            # This shows how to use the Deocode - Generator
            if tos == 523 :
                iterable = distorm3.DecodeGenerator(0, code, distorm3.Decode64Bits)
            elif tos == 267 :
                iterable = distorm3.DecodeGenerator(0, code, distorm3.Decode32Bits)

            List = []
            for (offset, size, instruction, hexdump) in iterable:
                # print("%.8x: %-32s %s" % (offset, hexdump, instruction))
                try :
                    op_code = instruction.split()[0]
                    #print(offset, size, instruction, hexdump)
                    if len(OPlist) == 4:  #
                        OPlist.pop(0)
                    OPlist.append(int.from_bytes(op_code, byteorder='little',signed=False))
                    #OPlist.append(op_code)
                    List.append(str(OPlist))

                except IndexError :
                    print('idx', end='')

            setList = set(List) # 중복 제거
            dicList = {}

            # 중복제거된 리스트 요소가 원본리스트에 각 몇개씩 있었는지 확인
            for li in setList:
                dicList[li] = List.count(li)

            x1 = list(dicList.keys())
            y1 = list(dicList.values())

            # 파일 쓰기
            xlen = len(x1)
            i=0
            while (True):
                if (i >= xlen):
                    break
                x = x1[i][1:-1].split(', ')
                try:
                    f.write('%s %s %s %s ' % (x[0], x[1], x[2], x[3]))
                    f.write(str(y1[i])+'\n')
                except IndexError:
                    print('idx err2', end='')
                i += 1
        #
        print("OK")

if __name__ == "__main__" :
    # 디렉토리 내 파일 이름들 추출
    pathDir = 'C:\\UDIL\\MalList\\vxheavens-2010-05-18\\viruses-2010-05-18\\Backdoor01\\'
    fileList = os.listdir(pathDir)

    # OPCode추출+출력
    extractOPCode(fileList, pathDir)

