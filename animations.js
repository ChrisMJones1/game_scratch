/*jslint browser: true*/
/*global $, jQuery*/
window.onload = function() {
  var Move_Box = document.getElementById("move_box");
  var play_stage = document.getElementById("stage");
  var position = 0;
  var projectileXPositions = [];
  var projectileYPositions = [];
  var projectileList = [];
  var enemyXPositions = [];
  var enemyYPositions = [];
  var enemyList = [];
  var enemy_id = 0;
  var projectile_id = 0;
  var game_speed = 33;
  var shoot_reset = true;
  var gameOver = false;
  
  var game_timer = setInterval(play_game, game_speed);
  
  function play_game() {
    $('.projectile_box').animate({bottom: '+=5'}, 33, "linear");
    $('.enemy_box').animate({bottom: '-=3'}, 33, "linear");
    checkbounds();
    
    if($('.projectile_box').length > 0) {
      $('.projectile_box').each(function(projectile_index, projectile_element){
        var projectile_position = $(projectile_element).position();
        if(projectile_position.top < -68) {
         $(projectile_element).remove();
        }
        if($('.enemy_box').length > 0) {
          $('.enemy_box').each(function(enemy_index, enemy_element) {
            var enemy_position = $(enemy_element).position();
            if((enemy_position.top + $(enemy_element).height()) > projectile_position.top && enemy_position.left < (projectile_position.left + $(projectile_element).width()) && (enemy_position.left + $(enemy_element).width()) > projectile_position.left) {
              enemy_element.remove();
              projectile_element.remove();

            }
          });
        }
      });
    }
    if($('.enemy_box').length > 0) {
      $('.enemy_box').each(function(enemy_index, enemy_element) {
        var enemy_position = $(enemy_element).position();
        if(enemy_position.top > 600) {
          enemy_element.remove();
          $('#damage_box').addClass("run_flicker");
//          console.log("adding flicker");
          $('.run_flicker').on('animationend', remove_flicker);
        }
      });
    }
    else {
      
    }
    if(projectileList.length > 0) {
      //$('.projectile_box').animate({bottom: '+=5'}, 33, "linear");
      for(i=0;i<projectileList.length;i++) {
        projectileYPositions[i] += 5;
        //projectileList[i].style.bottom = projectileYPositions[i] + 'px';
        //projectileList[i].style.transform = 'translateY('+ projectileYPositions[i] +'px)';
        
//        if(projectileYPositions[i] >= 600) {
//          projectileYPositions.splice(i,1);
//          projectileXPositions.splice(i,1);
//          play_stage.removeChild(projectileList[i]);
//          projectileList.splice(i,1);
//        }
        
      }
    }
    if($('.enemy_box').length < 2) {
      var enemy;
      var enemy_pos = (Math.random() * (380));
      enemyXPositions.push(enemy_pos);
      enemyYPositions.push(650);
      enemy = document.createElement('div');
      enemy.setAttribute('class', 'enemy_box');
      enemy.setAttribute('id', "enemy_" + enemy_id);
      enemy.style.left = enemy_pos + "px";
      enemy.style.bottom = 625 + 'px';
      play_stage.appendChild(enemy);
      enemyList.push(document.getElementById("enemy_" + enemy_id));
      enemy_id++;
    }
    if(enemyList.length > 0) {
      //$('.enemy_box').animate({bottom: '-=3'}, 33, "linear");
      for(i=0;i<enemyList.length;i++) {
        enemyYPositions[i] -= 3;
        //enemyList[i].style.bottom = enemyYPositions[i] + 'px';
//        if(enemyYPositions[i] <= 0) {
//          enemyYPositions.splice(i,1);
//          enemyXPositions.splice(i,1);
//          play_stage.removeChild(enemyList[i]);
//          enemyList.splice(i,1);
//        }
//        for(j=0;j<projectileList.length;j++) {
//          if (((projectileYPositions[j]) > (enemyYPositions[i])) && ((projectileXPositions[j] + 10) > (enemyXPositions[i])) && ((projectileXPositions[j]) < (enemyXPositions[i] + 25))){
//            enemyYPositions.splice(i,1);
//            enemyXPositions.splice(i,1);
//            play_stage.removeChild(enemyList[i]);
//            enemyList.splice(i,1);
//            
//            projectileYPositions.splice(j,1);
//            projectileXPositions.splice(j,1);
//            play_stage.removeChild(projectileList[j]);
//            projectileList.splice(j,1);
//            
//          }
//        }
      }
    }
//    if(enemy_id > 25) {
//      clearInterval(game_timer);
//      game_speed--;
//      game_timer = setInterval(play_game, game_speed);
//    }
  }
  document.addEventListener('keydown', box_move);
  document.addEventListener('keyup', fire_reset);
  document.addEventListener('click', play_stage);
  
  function checkbounds() {
    position = $('#move_box').position();
//    console.log("current position: " + position.left);
    if(position.left  < -50 || (position.left + $('move_box').width()) > 350) {
//      $('#move_box').stop(true, false);
      if(position.left < -50) {
        $('#move_box').css('left', '350px');
      }
      else {
        $('#move_box').css('left', '-50px');
      }
    }
  }
  
  function remove_flicker() {
   // console.log("removing flicker");
    $('.run_flicker').off('animationend', remove_flicker);
    $('#damage_box').removeClass('run_flicker');
  }
  
  function remove_shoot() {
//    console.log("removing volcano shoot");
    $('.volcano_shoot').on('animationend', remove_shoot);
    $('#volcano').removeClass('volcano_shoot');
  }
  
  function remove_Rskew() {
//    console.log("removing right skew");
    $('.skew_right').off('animationend', remove_Rskew);
    $('#skew_box').removeClass('skew_right');
  }
  
  function remove_Lskew() {
//    console.log("removing left skew");
    $('.skew_left').off('animationend', remove_Lskew);
    $('#skew_box').removeClass('skew_left');
  }
  
  function fire_reset(/*space*/) {
//    if (space.keyCode === 32) {
      shoot_reset = true;
//    }
//    if (space.keyCode === 39 || space.keyCode === 37) {
//      $('#move_box').stop(false, false);
//    }
  }
  function box_move(ko) {
//    console.log("current position: " + position.left);
//    position = $('#move_box').position();
////    console.log("current position: " + position.left);
//    if(position.left  < 0 || (position.left + $('move_box').width()) > 405) {
////      $('#move_box').stop(true, false);
//      if(position.left < 0) {
//        $('#move_box').css('left', '+=405px');
//      }
//      else {
//        $('#move_box').css('left', '-=405px');
//      }
//    }
    if (ko.keyCode === 39 && shoot_reset === true){
      //position += 10;
      $('#move_box').animate({left: '+=50'}, 33, "linear");
      $('#skew_box').addClass("skew_right");
      $('.skew_right').on('animationend', remove_Rskew);
      shoot_reset = false;
//      checkbounds();
    }
    if (ko.keyCode === 37 && shoot_reset === true){
      //position -= 10;
      //Move_Box.style.left = position + "px";
      $('#move_box').animate({left: '-=50'}, 33, "linear");
      $('#skew_box').addClass("skew_left");
      $('.skew_left').on('animationend', remove_Lskew);
      shoot_reset = false;
//      checkbounds();
    }
    if (ko.keyCode === 32 && shoot_reset === true){
      var shooty;
      projectileXPositions.push(position.left);
      projectileYPositions.push(0);
      shooty = document.createElement('div');
      shooty.setAttribute('class', 'projectile_box');
      shooty.setAttribute('id', 'projectile_' + projectile_id);
      shooty.style.left = position.left + 48 + "px";
      shooty.style.bottom = 0 + 'px';
      play_stage.appendChild(shooty);
      flamey = document.createElement('div');
      flamey.setAttribute('class', 'fireball');
      document.getElementById('projectile_' + projectile_id).appendChild(flamey);
      //projectileList.push(document.getElementById('projectile_' + projectile_id));
      $('#volcano').addClass("volcano_shoot");
      console.log("adding shoot");
      $('.volcano_shoot').on('animationend', remove_shoot);
      $('.projectile_box')
      projectile_id++
      shoot_reset = false;
      }
    }
  }