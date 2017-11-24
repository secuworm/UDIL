var initTable = function()
{
	var a= $('#myTable');
	console.log(a);
	$('#myTable').append( 
		`<table class="demo-table">
			<tr id = "tr1">
				<th> No </th>
				<th> Time </th>
				<th> Name </th>
				<th> URL </th>
				<th> Status </th>
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
		console.log(keyList);
				
		for(i = 0; keyList[i] != "endIndex"; i++)
		{
			var downloadEle = downLoadList[keyList[i]];
			var tempJson = downloadEle;
			console.log(tempJson);
			$('#myTable tr:last-child').after(
			'<tr id = ' +  "asdf" + '>' +
			'<td>' + tempJson.num+ '</td>' +
			'<td>' + tempJson.time+ '</td>' +
			'<td>' + tempJson.name+ '</td>' +
			'<td>' + tempJson.url+ '</td>' +
			'<td>' + tempJson.status + '</td>'  +
			'</tr>'
			)
		}
		
	});
}

document.addEventListener('DOMContentLoaded', function () {
	initTable();
});