$(document).ready(() => {


    /**
     * nav bar hide when scroll
     */
    const mainDOM = $('main')
    const mainDOMfirstElement = mainDOM.children(":first-child");
    let previousPagePosition = mainDOMfirstElement.offset().top;
    let headerHeight = `-${getCssVar('--header-height')}`;

    let scrolledByJS = false

    mainDOM.scroll(function(){
        if(!scrolledByJS){
            let currentPagePosition = mainDOMfirstElement.offset().top;
            if (previousPagePosition < currentPagePosition) {
                $(".shown-header").removeClass('header-hide');
            } else {
    
                $(".shown-header").addClass('header-hide');
            }
            previousPagePosition = currentPagePosition;
        }

    });

    $(".transparent-header").hover(function(){
        $(".shown-header").removeClass('header-hide');
    },function(){
        $(".shown-header").add('header-hide');

    })
 

    /**
     * click nav to scroll
     */

    $(".nav-link").on('click', function (event) {

        scrolledByJS = true;

        event.preventDefault();
        //get href
        let href = $(this).attr('href')

        //disable snap
        $('main').css("scroll-snap-type", "none");


        let scrollTop = getScrollTopCoordinate($("#home"), $(href));
        $('main').animate({
            scrollTop:scrollTop
        }, 500, () => {
            //eneable snap
            $('main').css("scroll-snap-type", "y mandatory");
            scrolledByJS = false;
        });

        // //remove original nav-active
        // $(".nav-active").removeClass("nav-active");
        // //add new class to this
        // $(this).children(".nav-link-list-container").addClass("nav-active");

    });


    /**
     * change nav item when scrolled into it
     */
    mainDOM.scroll(function(){
        let windowHeight = window.innerHeight;

        let topCondition = -0.5 * windowHeight;
        let bottomCondition = 0.5 * windowHeight;
        $('section').each(function(){
            let sectionOffset = $(this).offset().top
            let id = $(this).attr('id');
            if( topCondition < sectionOffset && bottomCondition > sectionOffset){
                $(`[href='#${id}']>div`).addClass('nav-active')
            }else{
                $(`[href='#${id}']>div`).removeClass('nav-active')

            }
        })
    })



});


/**
 * @param {string} varName
 * 
 * */
function getCssVar(varName) {
    varName = varName.startsWith("--") ? varName : "--" + varName;
    let value = window.getComputedStyle(document.documentElement).getPropertyValue(varName);

    value = removeSpace(value);
    return value;
}

/**
 * @param {string} str
 * */
function removeSpace(str) {
    return str.replace(/\s/g, '');
}


/**
 * Takes jQuery Objects
 * @param {jQuery} startDOM 
 * @param {jQuery} targetDOM 
 */
function getScrollTopCoordinate(startDOM, targetDOM){
    startDOMOffset = startDOM.offset().top;
    targetDOMOffset = targetDOM.offset().top;

    return targetDOMOffset - startDOMOffset;
}
