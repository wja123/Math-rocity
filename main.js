'use strict';

$(document).ready(init);


var selectTotal = 0;
var turns = 3;
var numStars = Math.floor(Math.random() * 9) + 1;
var gameLive = true;
var $numBox;
var $restart;
var $reroll;
var $starHolder;
var $status;
var $submit;

function init(){
	$numBox = $(".numberbox");
	$restart = $(".restart");
	$reroll = $(".reroll");
	$submit = $(".submit");
	$starHolder = $(".starholder");
	$status = $("#message");
	var selectTotal = 0;
	var turns = 0;
	console.log("ready");
	genStars();

	$numBox.on("click",".num",numClick);
	$(".disabled").off("click");
	$reroll.click(rerollHandler);
	$restart.click(restartHandler);
	$submit.click(submitHandler);

	console.log($('.num').not(".diabled"));
}

function numClick(event){
	var num = event.target;
	if(gameLive === true){
		if(!$(num).hasClass("disabled")){
			if($(num).hasClass("selected")){
				$(num).removeClass("selected");
				selectTotal -= parseInt($(num).text());
			}
			else
			{
				$(num).addClass("selected");
				selectTotal += parseInt($(num).text());
			}
		}
	}


	console.log(selectTotal);

}

function rerollHandler(){
	if(turns > 1){
		turns--;
		genStars();
		if(turns===0){
			$status.text("No rerolls left... you can do it..");
		}
		else if(turns===1){
			$status.text("Just one more reroll left, you can do it..");
		}
		else{
			$status.text("Just " + turns + " rerolls left, you can do it..");
		}

	}
	else 
	{
		$status.text("No rerolls left... how about a new game?");
		gameLive = false;
	}
}

function restartHandler(){
	$(".selected").removeClass("selected");
	$(".disabled").removeClass("disabled");
	$status.text("Can you pick numbers that add up to the number of stars?");
	selectTotal = 0;
	turns = 3;
	genStars();
	gameLive = true;
}

function submitHandler(event) {

	if(gameLive === true){

if(parseInt($(".disabled").length)===9){
				console.log("submit : " + (parseInt($(".disabled").length)===9));
				$status.text("Wow!! You beat the game! How about another round?");
				gameLive=false;
			} else{



		if(selectTotal === numStars){
			
				$status.text("Great work! Now lets try it without those numbers ☺");
				$(".selected").addClass("disabled").removeClass("selected");
				selectTotal=0;
				genStars();
		}
		else
		{
			$status.text("Not quite, but please try again ☺");
		}
	}
}
}

function genStars(){
	numStars = Math.floor(Math.random() * 9)+1;
	$starHolder.empty();
	for(var i = 1;i <= numStars; i++){
		var $star = $("<div>").addClass("star");
		$starHolder.append($star).addClass("animated bounceInLeft");
	}
}

function loseDetection(){

}