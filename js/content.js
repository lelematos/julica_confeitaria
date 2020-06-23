// var title_sections1_top = document.querySelector('.title-of-section').getBoundingClientRect()["y"] //getting the y coordinate of the element

var start_fix_position_of_first_title = 100.2833251953125;
var finish_fix_position_of_first_title = -700;

/* ---------------------------- functions -------------------------------- */

const updatePositionOfTheElement = (element_class, x_or_y) => {
    let position = document.querySelector(element_class).getBoundingClientRect()[x_or_y]
    return position
}

const fixingElement = (element_class) => {
    document.querySelector(element_class).classList.add('fixed');
}

const unfixingElement = (element_class) => {
    document.querySelector(element_class).classList.remove('fixed');
}

/* ----------------------------------------------------------------------- */

window.onscroll = () => {
    let title_1_position = updatePositionOfTheElement('.title-of-section', 'y');
    console.log(title_1_position)
    if (title_1_position === start_fix_position_of_first_title) {
        fixingElement('.title-of-section');
    }
    if (title_1_position === finish_fix_position_of_first_title) {
        unfixingElement('.title-of-section');
    }
}