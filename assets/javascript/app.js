$(document).ready(function() {
  // Array for searched topics to be added
  const topics = [];

  // Function with AJAX call to GIPHY; Q parameterc for API link set to search term, limit 10 results
  // Create div with respective still and animate image sources with "data-state", "data-still" and "data-animate" attributes
  function displayPixar() {
    const x = $(this).data('search');
    console.log(x);

    const queryURL = `https://api.giphy.com/v1/gifs/search?q=${x}&api_key=EGbVEEahGpJcHd3KjMIMGPxom0aD59Py`;

    console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: 'GET',
    }).done(function(response) {
      const results = response.data;
      console.log(results);
      for (let i = 0; i < results.length; i++) {
        const showDiv = $("<div class='col-md-4'>");

        const { rating } = results[i];
        const defaultAnimatedSrc = results[i].images.fixed_height.url;
        const staticSrc = results[i].images.fixed_height_still.url;
        const showImage = $('<img>');
        const p = $('<p>').text(`Rating: ${rating}`);

        showImage.attr('src', staticSrc);
        showImage.addClass('pixarGiphy');
        showImage.attr('data-state', 'still');
        showImage.attr('data-still', staticSrc);
        showImage.attr('data-animate', defaultAnimatedSrc);
        showDiv.append(p);
        showDiv.append(showImage);
        $('#gifArea').prepend(showDiv);
      }
    });
  }

  // Submit button click event takes search term from form input, trims and pushes to topics array, displays button
  $('#addShow').on('click', function(event) {
    event.preventDefault();
    const newShow = $('#pixarInput')
      .val()
      .trim();
    topics.push(newShow);
    console.log(topics);
    $('#pixarInput').val('');
    displayButtons();
  });

  // Function iterates through topics array to display button with array values in "myButtons" section of HTML
  function displayButtons() {
    $('#myButtons').empty();
    for (let i = 0; i < topics.length; i++) {
      const a = $('<button class="btn btn-primary">');
      a.attr('id', 'show');
      a.attr('data-search', topics[i]);
      a.text(topics[i]);
      $('#myButtons').append(a);
    }
  }

  displayButtons();

  // Click event on button with id of "show" executes displayNetflixShow function
  $(document).on('click', '#show', displayPixar);

  // Click event on gifs with class of "netflixGiphy" executes pausePlayGifs function
  $(document).on('click', '.pixarGiphy', pausePlayGifs);

  // Function accesses "data-state" attribute and depending on status, changes image source to "data-animate" or "data-still"
  function pausePlayGifs() {
    const state = $(this).attr('data-state');
    if (state === 'still') {
      $(this).attr('src', $(this).attr('data-animate'));
      $(this).attr('data-state', 'animate');
    } else {
      $(this).attr('src', $(this).attr('data-still'));
      $(this).attr('data-state', 'still');
    }
  }
});
