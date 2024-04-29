/**
 * @title WET-BOEW Steps Quiz plugin
 * @overview Quiz pattern for use with the Steps Form plugin.
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author ricokola
 */
( function( $, document ) {
"use strict";

//Detect the enhancement of the quiz
var quizSelector = ".provisional.wb-steps.quiz",
	instances = document.querySelectorAll( quizSelector );

//How many quiz instances in the page
instances.forEach ( ( instance ) => {
	let $instance = $( instance );

	// Calculate number of questions
	let numQuestion = $( "fieldset", $instance ).length;

	let progressCount = 100/numQuestion;

	// Addition to UI (Ex: progress bar)
	$( "form", $instance ).prepend( "<p class='progressText' role='status'></p>" );
	$( "form", $instance ).prepend( "<p><progress class='progressBar' max='" + numQuestion + "'></progress></p>" );
	$( "form", $instance ).prepend( "<div class='progress'><div class='progress-bar bg-success' role='progressbar' aria-valuenow='" + progressCount + "' aria-valuemin='" + progressCount + "' style='width: " + progressCount + "%' aria-valuemax='100'></div></div>" );

});

var hideOtherSteps = function( e ) {
	// Get wb-steps component
	let steps,
	currentElement = e.currentTarget;

	if ( currentElement.classList.contains( "quiz" ) && currentElement.classList.contains( "wb-steps" ) ) {
		steps = currentElement;

	} else {
		steps = $( currentElement ).parentsUntil( quizSelector ).parent().get( 0 );
	}


	// Check if the instance is not found
	if ( !steps || steps instanceof HTMLDocument ) {
		return;
	}

	// Find the steps form context and validate it is a quiz
	let currentTabId = $( "legend.wb-steps-active:first-child", steps ).parents().prevAll( ".steps-wrapper" ).length + 1;
	
	// Get progress bar
	let $progressBar = $( ".progressBar", steps );

	// Get number of questions
	let numQuestion = $progressBar.attr( "max" );

	// Set the progress label
	$( "p.progressText", steps ).text( currentTabId + " of  " + numQuestion );

	// Update progress bar
  	$progressBar.val( currentTabId );

	// Experimentation - START
	let $progressBar2 = $( ".progress-bar", steps );
	let progressCount = $progressBar2.attr( "aria-valuemin" );
  	var i = parseFloat(progressCount);
    var bar = document.querySelector(".progress-bar", steps);

    if( i < 100 ){
    		console.log("i-1");
			console.log(i);
        i = i + i;
        console.log("i-2");
		console.log(i);
        bar.style.width = i + "%";
    }
    // Experimentation - END



  	// Hide other steps that are not active
	$( ".steps-wrapper", steps ).removeClass( "hidden" );
	$( ".steps-wrapper:has( div.hidden )", steps ).addClass( "hidden" );

};

$( document ).on( "click", quizSelector + " .steps-wrapper div.buttons > :button", hideOtherSteps );

//Init
$( quizSelector ).on( "wb-ready.wb-steps", hideOtherSteps );

} )( jQuery, document );
