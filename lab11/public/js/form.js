(function($) {
    var showList = $('#showList');
    var searchForm = $('#searchForm');
    var indiv_show = $('#show');
    var search_term = $('#search_term');

    function populateShowsFromArray(shows) {
        var list = '';
        for (var i = 0; i < shows.length; i++) {
            list += '<li><a href=' + shows[i]._links.self.href + '>' + shows[i].name + '</a></li>';
        }
        showList.html(list);
        showList.show();
    }

    var startConfig = {
        method: 'get',
        url: 'http://api.tvmaze.com/shows',
    };
    $.ajax(startConfig).then(function(response) {populateShowsFromArray(response)});
    
    

    searchForm.on('submit', function(event) {
        event.preventDefault();
        if (!/\S/.test(search_term.val())){
            alert('Search term must not be empty or all spaces');
            return;
        }
        indiv_show.hide();
        showList.empty();
        var searchConfig = {
            method: 'get',
            url: 'http://api.tvmaze.com/search/shows?q=' + search_term.val()
        };
        $.ajax(searchConfig).then(function(response) {
            var shows = [];
            for(item of response) {
                shows.push(item.show);
            }
            populateShowsFromArray(shows)
        });
    });


    showList.on('click', 'a', function(event) {
        event.preventDefault();
        showList.hide();
        var showUrl = $(this).attr('href');
        indiv_show.empty();
        var config = {
            method: 'get',
            url: showUrl,
        };
        $.ajax(config).then(function(response) {
            var showInfo = response;
            if(showInfo.name === null) showInfo.name = 'N/A';
            var rundown = '<h1>' + showInfo.name + '</h1>'
            if(showInfo.image === null){
                showInfo.image = {medium: 'public/no_image.jpeg'}
            } else if(showInfo.image.medium === null){
                showInfo.image.medium = 'public/no_image.jpeg'
            }
            rundown += '<img src="' + showInfo.image.medium  + '"/>';
            if(showInfo.language === null) showInfo.language = 'N/A';
            rundown += '<dl><dt>Language</dt><dd>' + showInfo.language + '</dd>';
            if(showInfo.genres === null) showInfo.genres = 'N/A';
            rundown += '<dt>Genre</dt><dd><ul>';
            for(var item in showInfo.genres){
                rundown += '<li>' + showInfo.genres[item] + '</li>'; 
            }
            rundown +='</ul></dd>';
            if(showInfo.rating.average === null) showInfo.rating.average = 'N/A';
            rundown += '<dt>Average Rating</dt><dd>' + showInfo.rating.average + '</dd>';
            if(showInfo.network === null) showInfo.network = {name:'N/A'};
            else if(showInfo.network.name === null) showInfo.network.name = 'N/A';
            rundown += '<dt>Network</dt><dd>' + showInfo.network.name + '</dd>';
            if(showInfo.summary === null) showInfo.summary = 'N/A';
            rundown += '<dt>Summary</dt>' + showInfo.summary + '</dl>';
            indiv_show.append(rundown);
            indiv_show.show();
        });
    });


})(window.jQuery);

