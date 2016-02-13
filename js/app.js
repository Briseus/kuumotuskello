function laskuri(target_paiva) {
    var days, hours, minutes, seconds;
    var target = target_paiva;
    var countdown = document.getElementById("kuumotuskello");

    var current_date = new Date().getTime();
    var seconds_left = (target_paiva - current_date) / 1000;

    days = parseInt(seconds_left / 86400);
    seconds_left = seconds_left % 86400;

    hours = parseInt(seconds_left / 3600);
    seconds_left = seconds_left % 3600;

    minutes = parseInt(seconds_left / 60);
    seconds = parseInt(seconds_left % 60);
    if (target === null) {
      countdown.innerHTML = "hopi hopi";
    } else {
   		countdown.innerHTML = days + "d, " + hours + "h, " + minutes + "m, " + seconds + "s";

    if (days >= 6) {
      document.getElementById("kuumotuskello").style.color = "#CCFF99";
      document.getElementById("piilotaChilliRiku").style.display = "block";
    } else
    if (days == 5) {
      document.getElementById("kuumotuskello").style.color = "#FFFF00";
      document.getElementById("piilotaPohtivaRiku").style.display = "block";

    } else
    if (days == 4) {
      document.getElementById("kuumotuskello").style.color = "#FFCC00";
      document.getElementById("piilotaPohtivaRiku").style.display = "block";

    } else
    if (days == 3) {
      document.getElementById("kuumotuskello").style.color = "#FF9900";
      document.getElementById("piilotaRiku").style.display = "block";
    } else
    if (days == 2) {
      document.getElementById("kuumotuskello").style.color = "#FF6633";
      document.getElementById("piilotaRiku").style.display = "block";
    } else
    if (days == 1) {
      document.getElementById("kuumotuskello").style.color = "#990000";

      document.getElementById("piilotaKuumaRiku").style.display = "block";

    }
    else
    if (days === 0 && hours > 0) {
      document.getElementById("kuumotuskello").style.color = "#FF3333";
      countdown.innerHTML = hours + "h, " + minutes + "m, " + seconds + "s";
      document.getElementById("piilotaKuumaRiku").style.display = "block";

    } else if (days < 1 && hours < 1 && minutes > 1 && seconds_left > 0) {

      countdown.innerHTML = minutes + "m, " + seconds + "s";
      document.getElementById("piilotaKuumaRiku").style.display = "block";

    } else if (days < 1 && hours < 1 && minutes < 1 && seconds_left > 0) {
      countdown.innerHTML = minutes + "m, " + seconds + "s" + " RIP";
      document.getElementById("piilotaKuumaRiku").style.display = "block";
    }
    else
    if (seconds_left <= 0) {
      countdown.innerHTML = "Zero";
      document.getElementById("piilotaRIPTunna").style.display = "block";
    }

  }
  }

 function aloitaKello(target_paiva) {

    kello = setInterval(function() {
      laskuri(target_paiva);
    }, 1000);


  }
$(document).foundation();
