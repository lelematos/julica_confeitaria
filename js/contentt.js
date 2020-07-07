const transition_element = document.querySelector('.transition')
const hero_image = document.querySelector('.container-hero')

var c_hero, c_transition

/* ---------------------------- functions -------------------------------- */

const updateSubtractionOfElementHeights = (add_value) => {
    c_hero = hero_image.clientHeight
    c_transition = transition_element.clientHeight
    return c_hero - c_transition + add_value
}

const applyTheTransitionHeight = (add_value) => {
    transition_element.setAttribute('style', `top: ${updateSubtractionOfElementHeights(add_value)}px !important;`)
}

// /* ----------------------------------------------------------------------- */

var add_value = window.innerWidth * 0.05

applyTheTransitionHeight(add_value)

window.onresize = () => {
    add_value = window.innerWidth * 0.05
    applyTheTransitionHeight(add_value)
}