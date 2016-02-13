
  // luodaan module nimellä scotchApp
  var scotchApp = angular.module('scotchApp', ['ngRoute', 'ngCookies']);

  // määritetään mistä sivun sisältö löytyy
  scotchApp.config(function($routeProvider) {

    $routeProvider
      .when('/', {
      templateUrl: 'views/etusivu.html',
      controller: 'mainController'
    })

    .when('/video', {
      templateUrl: 'views/video.html'
    })

    .when('/credits', {
      templateUrl: 'views/credits.html',
    })

    .when('/kello', {
      templateUrl: 'views/kello.html',
      controller: 'kelloController'
    })

    .when('/kello', {
      templateUrl: 'views/kello.html',
      controller: 'kelloController'
    })

    .when('/kello/aika/:time/nimi/:name', {
      templateUrl: 'views/kello.html',
      controller: 'kelloTimeAndNameUrlController'
    })

    .when('/kello/aika/:time', {
      templateUrl: 'views/kello.html',
      controller: 'kelloTimeUrlController'
    });

  });


  // luodaan ohjain etusivulle
  scotchApp.controller('mainController', function($scope, $cookies, $location) {

    $scope.generateKuumotus = function() {

      var name = document.getElementById('kuumotus_nimi').value;
      var inserted_day = document.getElementById('kuumotus_paivamaara').value;
      var inserted_time = document.getElementById('kuumotus_aika').value;
      var time_and_day = inserted_day + " " + inserted_time;
      target_date = new Date(time_and_day);
      if ($cookies.get('day') !== null) {
        $cookies.remove('day');
      }
      if ($cookies.get('name') !== null) {
        $cookies.remove('name');
      }
      $cookies.put('name', name);
      $cookies.put('day', target_date.getTime());

      $location.path();
      $location.path('/kello');
      window.location = '#/kello';
      window.location.reload();

    };

  });

  scotchApp.controller('kelloController', function($scope, $cookies) {
    var target_date = $cookies.get('day');
    if ($cookies.get('name') === undefined) {
      $scope.name = "Meneppäs generoimaan kuumotus";
    } else {
      $scope.name = $cookies.get('name') + "  armon aikaa jäljellä";
    }

    startClock(target_date);

      $scope.destroyKuumotus = function() {
        $cookies.remove('day');
        $cookies.remove('name');
        window.location.reload();
      };
  });

  scotchApp.controller('kelloTimeAndNameUrlController', function($scope, $cookies,$routeParams) {
    if ($cookies.get('day') !== null) {
      $cookies.remove('day');
    }
    if ($cookies.get('name') !== null) {
      $cookies.remove('name');
    }

    var target_date = $routeParams.time;
    if ($routeParams.name === null) {
      $scope.name = "";
    } else {
      $scope.name = $routeParams.name + "  armon aikaa jäljellä";
    }
    var name = $routeParams.name;
    $cookies.put('name', name);
    $cookies.put('day', target_date);
    startClock(target_date);
    window.location = '#/kello';
    window.location.reload();
  });

  scotchApp.controller('kelloTimeUrlController', function($scope, $cookies,$routeParams,$location) {
    if ($cookies.get('day') !== null) {
      $cookies.remove('day');
    }
    if ($cookies.get('name') !== null) {
      $cookies.remove('name');
    }

    var target_date = $routeParams.time;
    if ($routeParams.name === null) {
      $scope.name = "";
    } else {
      $scope.name = $routeParams.name + "  armon aikaa jäljellä";
    }
    var name = "";
    $cookies.put('name', name);
    $cookies.put('day', target_date);
    startClock(target_date);
    window.location = '#/kello';
    window.location.reload();


    // if ($cookies.get('day') != null) {
    //   $cookies.remove('day');
    // }
    // if ($cookies.get('name') != null) {
    //   $cookies.remove('name');
    // }
    // $scope.name = "";
    //
    // $cookies.put('day', target_date);
    //
    // $location.path();
    // $location.path('/kello');
    // window.location = '#/kello';
    // window.location.reload();
  });




function laskuri(target_date) {
    var days, hours, minutes, seconds;
    var target = target_date;
    var countdown = document.getElementById("kuumotuskello");

    var current_date = new Date().getTime();
    var seconds_left = (target_date - current_date) / 1000;

    days = parseInt(seconds_left / 86400);
    seconds_left = seconds_left % 86400;

    hours = parseInt(seconds_left / 3600);
    seconds_left = seconds_left % 3600;

    minutes = parseInt(seconds_left / 60);
    seconds = parseInt(seconds_left % 60);
    if (target === undefined) {
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

 function startClock(target_date) {

    kello = setInterval(function() {
      laskuri(target_date);
    }, 1000);


  }
$(document).foundation();
