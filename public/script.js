$(function() {
	$('.deleteItem').on('click', function(event) {
		event.preventDefault();
		var deleteThis = $(this);
		$.ajax({
			url:'/watchList/'+deleteThis.data('id'),
			type:'DELETE',
			success:function(result) {
				deleteThis.closest('span').fadeOut('slow', function() {
					$(this).remove();

				})
			}
		})
	})

	$('.addTo').on('click', function(event) {
		var theButton = $(this);
		event.preventDefault();
		var addThis = $(this);
		$.post('/watchList', {title:addThis.data('title'), year:addThis.data('year'), imdbcode:addThis.data('imdb')},
		function(data) {
			theButton.fadeOut();
	})
	})

})

