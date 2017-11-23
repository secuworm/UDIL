createTable = {
		init: function() {
			createTR = $('#createTRButton');
			
			(function()
			{	
				$('#myTable').append( 
					`<table class = "container">
						<tr id = "tr1">
							<th><h1> Num </h1></th>
							<th><h1> Name </h1></th>
							<th><h1> URL </h1></th>
							<th><h1> Result </h1></th>
						</tr>
					</table>`
				);
			})();
		}        
}
/*
$(function() {
	createTable.init();
});
*/
chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
	if (message.action == "add_new_table")
	{
		$('#myTable tr:last-child').after(
		'<tr id = ' +  1  + '>' +
		'<td h2>' + message.timestamp+ '</td>' +
		'<td h2>' + message.filename+ '</td>' +
		'<td h2>' + message.url + '</td>' +
		'<td h2>' + "Analysing..." + '</td>'  +
		'</tr>'
		) ;
		
		$.get("http://192.168.0.58:3000/download?path=" + encodeURIComponent(message.url), function(data, status)
		{
			alert("Data: " + data + "\nStatus: " + status);
		});
	}
});

document.addEventListener('DOMContentLoaded', function () {
  createTable.init();
});
  
  
  
  

