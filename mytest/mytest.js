var initTable = function()
{
	var a= $('#myTable');
	console.log(a);
	$('#myTable').append( 
		`<table class="responsive-table">
			<tr id = "tr1">
				<th> Num </th>
				<th> Time </th>
				<th> Name </th>
				<th> URL </th>
				<th> Result </th>
			</tr>
		</table>`
		)
	createTable();
}

var createTable = function()
{
	var downLoadList = new Object();
	var keyValues = ["num", "time", "name", "url", "status"];
	var endIndex = 0;

	chrome.storage.local.get(function(data)
	{
		downLoadList = data;
		console.log(downLoadList);
		var keyList = Object.keys(downLoadList);
		console.log();
				
		for(i = 0; keyList[i] != endIndex; i++)
		{
			var downloadEle = downLoadList[keyList[i]];
			var tempJson = JSON.parse(downloadEle);
			$('#myTable tr:last-child').after(
			'<tr id = ' +  "asdf" + '>' +
			'<td>' + tempJson.num+ '</td>' +
			'<td>' + tempJson.time+ '</td>' +
			'<td>' + tempJson.name+ '</td>' +
			'<td>' + tempJson.url + '</td>' +
			'<td>' + tempJson.result + '</td>'  +
			'</tr>'
			)
		}
		
	});
}


/*
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
	if (request.action == "add_new_table")
	{
		console.log("Hello");
		
		$('#myTable tr:last-child').after(
		'<tr id = ' +  '1' + '>' +
		'<td h2>' + request.timestamp+ '</td>' +
		'<td h2>' + request.filename+ '</td>' +
		'<td h2>' + request.url + '</td>' +
		'<td h2>' + "Analysing..." + '</td>'  +
		'</tr>'
		) ;
		
		$.get("http://192.168.0.58:3000/download?path=" + encodeURIComponent(request.url), function(data, status)
		{
			alert("Data: " + data + "\nStatus: " + status);
		});
	}
});
*/

document.addEventListener('DOMContentLoaded', function () {
	initTable();
});