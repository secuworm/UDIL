createTable = {
		init: function() {
			createTR = $('#createTRButton');
			
			(function()
			{	
				$('#myTable').append( 
					`<table class = "container">
						<tr id = "tr1">
							<th><h1> Number </h1></th>
							<th><h1> URL </h1></th>
							<th><h1> Result </h1></th>
						</tr>
					</table>`
				);
			})();
		}        
}

$(function() {
	createTable.init();
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
	if (request.action == "add_new_table")
	{
		$('#myTable tr:last-child').after(
		'<tr id = ' +  request.num  + '>' +
		'<td h2>' + request.num+ '</td>' +
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
  
  
  
  

