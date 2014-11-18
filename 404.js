function createCustomSearch() {
    // Some private variables for this object
    var context = this;
    var dialog = document.querySelector('dialog');
    // Your keys
    var engineID = '011189733086193145933:m0lz3ocplou';
    var apiKey = 'AIzaSyDx4nkRDyIHGjOVT26lC2QIO8JuinlZRAA';
    this.trySearch = function(phrase) {
        var queryParams = {
            cx: engineID,
            key: apiKey,
            num: 10,
            q: phrase,
            alt: 'JSON'
        }
        var API_URL = 'https://www.googleapis.com/customsearch/v1?';
        // Send the request to the custom search API
        $.getJSON(API_URL, queryParams, function(response) {
            if (response.items && response.items.length) {
                console.log(response.items[0].link);
            }
        });
    };
    this.showDialog = function (url) {
        var suggestedLink = $('<a></a>');
        // Verify that the suggested URL is from this domain
        var hostname = new RegExp(location.hostname);
        if (hostname.test(url)) {
            suggestedLink.attr('href', url);
            suggestedLink.text(url);
            $('#suggestion').html(suggestedLink);
            dialog.showModal();
        }
    };
    this.hideDialog = function () {
        dialog.close();
    };
}

$(document).ready(function() {
    var customSearch = new createCustomSearch();
    var path = window.location.pathname;
    var phrase = decodeURIComponent(path.replace(/\/+/g, ' ').trim());
    customSearch.trySearch(phrase);
});