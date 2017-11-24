import pefile

pathDir = 'C:\\UDIL\\UDIL\\DrawOPGraph\\TargetSample\\'
fname = 'notepad.exe'
pe = pefile.PE(pathDir+fname)
_text = pe.sections[0]

_textStartOffset = _text.PointerToRawData ## 섹션 시작 offset
_textSize = _text.SizeOfRawData ## 섹션 size

print(_text.Name.decode()) # 섹션명
print(_textStartOffset)
print(_textSize)

pe.close()

f = open(pathDir+fname, 'rb')

f.seek(_textStartOffset)
print(f.read(_textSize))

f.close()
