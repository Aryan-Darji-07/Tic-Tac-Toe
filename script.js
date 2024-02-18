document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    document.getElementById("splashScreen").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
  }, 4000); // 4000 milliseconds
  
  document.getElementById('playButton').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default link behavior

    var player1Name = document.getElementById('player1_name').value;
    var player2Name = document.getElementById('player2_name').value;

    window.location.href = 'tictactoe.html?player1=' + encodeURIComponent(player1Name) + '&player2=' + encodeURIComponent(player2Name);
  });
});
