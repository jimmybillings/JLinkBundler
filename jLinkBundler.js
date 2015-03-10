(function($){
  $.fn.extend({ 
 
    //plugin name - searchPage
    searchPage: function(options) {
 
      //Create default properties
      var defaults = {
        searchResults: '.searchresults',
        inputBox: '#searchText',
        searchItems: 'span.searchAbleLink',
        searchTitle: "Your search Results:<br />",
      };
 
      //Merge default properties and any auguments passed in
      var options = $.extend(defaults, options);
 
      return this.each(function() {
 
        //Assign items to be searched into variables
        var o =options;
        var obj = $(this);                
        var items = $(o.searchItems, obj);
        var arr = [];
        //convert to lowercase 
        var text = $(o.inputBox).val().toLowerCase();
 
        //Search through each possible search result
        $(items).each(function() {
          //convert to lowercase 
          var lowerText = $(this).text().toLowerCase();
 
          //take out any special characters
          var noSpecialChars = lowerText.replace(/[^a-zA-Z 0-9]+/g,'');
          //If a match is found push text and link into array
          if (noSpecialChars.indexOf(text)>=0 ){
            arr.push($(this).text()+";"+$(this).children('a').attr('href'));
          }
 
        });
        //Loop through array and rebuild search results as links
        $.each(arr, function(index, value) { 
          o.searchTitle = o.searchTitle + ('<p><a href="'+value.split(';')[1]+'">'+value.split(';')[0]+'</a></p>');
        });
        //Append links to search result area and slide down into display
        $(o.searchResults).hide('fast', function(){
          $(o.searchResults).append(o.searchTitle).slideDown('fast');
        }).html(' ');
 
      });
    }
  });
})(jQuery);
