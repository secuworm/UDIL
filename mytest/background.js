'use strict'

//크롬 다운로드 바 없에기
/*
let disableShelf = () => chrome.downloads.setShelfEnabled(false);
chrome.runtime.onInstalled.addListener(disableShelf);
chrome.runtime.onStartup.addListener(disableShelf);
*/

var ws = new WebSocket("ws://192.168.0.58:3010"); //WebSocket 함수 생성
var extension_url = 'chrome-extension://'+location.host+'/mytest.html';	// 익스텐션의 html파일 위치
var num = 0;					//파일 다운로드 순서
var downLoadArray = new Array();	//다운로드 리스트를 담음

//서버에게 연결 확인
ws.onopen = function(event)
{
	//ws.send("Hello Hello Hello");
}

 ws.onmessage = function(event) 
 {
    console.log("Server message: ", event.data);
	var tempObj = JSON.parse(event.data);
	console.log(tempObj);
	var id = tempObj["id"];
	var stat = tempObj["stat"];
	if(stat == "0")
	{
		chrome.storage.local.get(function(data)
		{
			var downLoadList = data;
			var downLoadEle = downLoadList[id];
			downLoadEle = JSON.parse(downLoadEle);
			console.log(id);
			console.log(downLoadEle);
			console.log(downLoadEle.status);
			downLoadEle.status = "Safe";
			
			var tempObj = new Object();
			tempObj[id] = downLoadEle;
			chrome.storage.local.set(tempObj, function()
			{
				$.get(downLoadEle.url, function(data, status)
				{
					console.log(downLoadEle.url);
				});
			});
		
		});
	}
 }
 
 //서버에게 데이터 보내기
 
function sendFileUrl(tempJsonStr)
{
	console.log(tempJsonStr);
	ws.send(tempJsonStr);
}

//데이터를 읽어오는 초기화 함수
function initialNum()
{
	chrome.storage.local.get("endIndex", function(data)
	{
		if(JSON.stringify(data) != '{}')
		{
			//num = data.endIndex;
		}
		alert("초기화 완료");
		return true;
	})
	return false;
}

//시간 구하기
function getTimeStamp() {
  var d = new Date();
  var s = d.getFullYear().toString() + '.' +
			(d.getMonth() + 1).toString() + '.' +
			d.getDate().toString() + ' ' +
			d.getHours().toString() + ':' +
			d.getMinutes().toString();
  return s;
}

// 다운로드 리스트에 순서, 시간, 파일이름, URL, 결과값을 넣고 딕셔너리 형태로 반환하는 함수
function downLoadArrayPush(id, num, time, name, url)
{
	var tempJson = new Object();
	
	tempJson.id = id;
	tempJson.num= num;
	tempJson.time= time;
	tempJson.name= name;
	tempJson.url= url;
	tempJson.status= "Checking";
	downLoadArray.push(JSON.stringify(tempJson));
	//console.log(downLoadArray);
	return JSON.stringify(tempJson);
}

function saveData(item)
{
	//url에서 파일이름 추출
	num++;
	var finalUrl = "";
	var fileName = "";
	var idx = 0;
	finalUrl = item.finalUrl;
	idx = finalUrl.lastIndexOf("/") + 1;
	fileName = finalUrl.substr(idx, finalUrl.length);	
	
	//딕셔너리 생성
	var tempJsonStr = downLoadArrayPush(item.id, num, getTimeStamp(), fileName, item.finalUrl);
	console.log(tempJsonStr);
	var tempObj = new Object();
	var id= item.id;
	id = id.toString();
	//console.log(tempJsonStr);	
	tempObj[id] = tempJsonStr;		
	//console.log(tempObj);
	//다운로드 기록 저장
	chrome.storage.local.set(tempObj, function(){});
	chrome.storage.local.set({"endIndex" : num}, function(){});
	sendFileUrl(tempJsonStr);
	console.log("asdfasd");
	console.log(downLoadArray);
}

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
	
	num = 0;
	chrome.tabs.create({url: extension_url }, function(tab)
	{
		exTabId = tab.id;
		sendMsgToEx(tab.id);
	});
});

//오른쪽 클릭했을 때 메뉴 보이게
/*
chrome.contextMenus.create
({
  id: 'open',
  title: 'Send to Cuckoo Server',
  contexts: ['link'],
});
*/

//클릭 이벤트
chrome.contextMenus.onClicked.addListener(function(info, tab) 
{
	num++;
	sendMsgToEx(info.linkUrl);
	saveData();
});

//다운로드 시작 이벤트
chrome.downloads.onCreated.addListener(function(item)
{	
	if(item.state != "in_progress")
	{
		return;
	}
	var tempId = item.id;
	var tempId2 = item;
	var ditem = item.id;
	ditem = ditem.toString();
	console.log(ditem);
	chrome.storage.local.get(ditem, function(data)
	{
		var resultCheck = data;
		console.log(resultCheck);
		resultCheck = JSON.parse(resultCheck);
		
		if(resultCheck.status == "Safe")
		{
			return;
		}
		
		//다운로드가 시작되면 정지하고 서버에서 결과가 끝났는지 확인
		//chrome.downloads.pause(item.id, function(){});
		chrome.downloads.cancel(tempId, function(){});
		console.log(tempId);
		saveData(tempId2);
	});
});

document.addEventListener('DOMContentLoaded', function () {
	if(initialNum() == false)
	{
		alert("초기화 중...");
	}
});
  
  
  

















