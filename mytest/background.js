// 익스텐션의 html파일 위치
var extension_url = 'chrome-extension://'+location.host+'/mytest.html';

//파일 다운로드 순서
var num = 0;
var exTabId = null;

// 메시지 전송
function sendMsgToEx(srcUrl) 
{
	console.log("num value : " + num);
	
	chrome.tabs.query({currentWindow: true, active: false}, function(tabs)
	{
		chrome.tabs.sendMessage(exTabId, {action: "add_new_table", url: srcUrl, num:num}, function(response){});
		
		return;
    });
}

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
	
	if(exTabId != null)
	{
		return;
	}
	num = 0;
	chrome.tabs.create({url: extension_url }, function(tab)
	{
		exTabId = tab.id;
		sendMsgToEx(tab.id);
	});
});

//오른쪽 클릭했을 때 메뉴 보이게
chrome.contextMenus.create
({
  id: 'open',
  title: 'Send to Cuckoo Server',
  contexts: ['link'],
});

//클릭 이벤트
chrome.contextMenus.onClicked.addListener(function(info, tab) 
{
	if(exTabId == null)
	{
		return;
	}
	num++;
	sendMsgToEx(info.linkUrl);
});

//다운로드 시작 이벤트
chrome.downloads.onCreated.addListener(function(item)
{
	num++;
	console.log(num);
	chrome.downloads.cancel(item.id, function(){});
	sendMsgToEx(item.url);
});


















