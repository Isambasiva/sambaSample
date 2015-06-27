$(document).ready(function() {
	var items = $('#gallery li'),
		itemByTags = {};

/*
* @samba extract the tags into the arrays
* Assign the data id attribute to the element.
*/
	items.each(function(i){
		
		var elem = $(this),
		tags = elem.data('lists').split(',');
		elem.attr("data-id",i);
		
		console.log("number of elements::" + i + "::" + tags );
		
		/*
			@ Assigning non repeated items into the array
		*/
		$.each(tags, function(key, value){
			value = $.trim(value);
			if(!(value in itemByTags)){
				itemByTags[value]=[];
			}
				itemByTags[value].push(elem);

		});
	});
	

	//Creating a List of navigation bar
	function createLists(text, items){
		
		var ul= $('<ul>', {'class':'hidden'});
		
		$.each(items, function(){
			$(this).clone().appendTo(ul);
			
		});
		
		//console.log(ul);
		
		ul.appendTo('#gallery');
		
		//create menu
		var a = $('<a>', {
			href:'#',
			html:text,
			data:{list:ul}
		}).appendTo('#main-nav');
	}
	
	createLists('All items', items);
	$.each(itemByTags, function(k,v){
		createLists(k,v);
	});
	
	$('#main-nav a').on('click', function(e){
		var link = $(this);
		link.addClass('active').siblings().removeClass('active');
		$("#gallery").quicksand(link.data('list').find('li'));
	});
	
	
});