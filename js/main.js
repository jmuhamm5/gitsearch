$(document).ready(function(){
  $('#searchUser').on('keyup', function(e){
    let username = e.target.value;

    // Make request to Github
    $.ajax({
      url:index.php+username,
      data:{
        client_id:'a056ea2f38494ab8dbc0',
        client_secret:'4f293ca62c0208133f00167b89cc008b96415d10'
      }
    }).done(function(user){
      $.ajax({
        url:index.php+username+'/followers',
        data:{
          client_id:'a056ea2f38494ab8dbc0',
          client_secret:'4f293ca62c0208133f00167b89cc008b96415d10',
          sort: 'created: asc',
          per_page: 10
        }
      }).done(function(followers){
        $.each(followers, function(index, follower){
          $('#followers').append(`
            <div class="well">
              <div class="row">
                <div class="col-md-7">
                  <img class="follower avatar" src="${follower.avatar_url}">
                </div>
                <div class="col-md-2">
                  <a href="${follower.html_url}" target="_blank" class="btn btn-default">Profile Page</a>
                </div>
              </div>
            </div>
          `);
        });
      });
      $('#profile').html(`
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">${user.name}</h3>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-3">
                <img class="thumbnail avatar" src="${user.avatar_url}">
                <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
              </div>
              <div class="col-md-9">
              <span class="label label-default">Public Repos: ${user.public_repos}</span>
              <span class="label label-primary">Public Gists: ${user.public_gists}</span>
              <span class="label label-success">Followers: ${user.followers}</span>
              <span class="label label-info">Following: ${user.following}</span>
              <br><br>
              <ul class="list-group">
                <li class="list-group-item">Company: ${user.company}</li>
                <li class="list-group-item">Website/blog: ${user.blog}</li>
                <li class="list-group-item">Location: ${user.location}</li>
                <li class="list-group-item">Member Since: ${user.created_at}</li>
              </ul>
              </div>
            </div>
          </div>
        </div>
        <h3 class="page-header">Followers</h3>
        <div id="followers"></div>
      `);
    });
  });
});
