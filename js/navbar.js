var drawer_div = document.querySelector('.drawer-content');
var dropdown_btn = document.querySelector('.drawer-icon-clicable');
var close_btn = document.querySelector('.x-icon-clicable');
var navbar_background_div = document.querySelector('.container-navbar');
var visible_menu_items = document.querySelectorAll('.visible-items');
var logo = document.querySelector('.logo-img');

const intagram_icon = document.querySelector('.insta-icon');
const whatsapp_icon = document.querySelector('.whats-icon');

var initial_state = Array.from(navbar_background_div.classList);



/* ---------------------------- functions -------------------------------- */

const changeColorAccordingToPosition = () => {
    if ((window.scrollY === 0) && (Array.from(drawer_div.classList).includes('close'))) {
        ChangeColors_FromTo(navbar_background_div, 'colored', 'transparent');

        /* cor do drawer-icon */
        dropdown_btn.childNodes[1].childNodes[1].setAttribute('fill', 'white');

        OrangeToWhiteMenuItems()

    } else {
        if (initial_state.includes('transparent')) {
            ChangeColors_FromTo(navbar_background_div, 'transparent', 'colored');

            /* cor do drawer-icon */
            dropdown_btn.childNodes[1].childNodes[1].setAttribute('fill', '#FB925B');

            WhiteToOrangeMenuItems()
        }
    }
}


const ChangeColors_FromTo = (target, color_from, color_to) => {
    target.classList.remove(color_from);
    target.classList.add(color_to);
}

const OrangeToWhiteMenuItems = () => {
    for (var i = 0; i < visible_menu_items.length; i++) {
        ChangeColors_FromTo(visible_menu_items[i], 'laranja', 'light');
    }
    logo.setAttribute('src', "imagens/Logo-Julica branco.svg");
    intagram_icon.setAttribute('src', "imagens/instagram white.svg");
    whatsapp_icon.setAttribute('src', "imagens/whatsapp white.svg");
}
const WhiteToOrangeMenuItems = () => {
    for (var i = 0; i < visible_menu_items.length; i++) {
        ChangeColors_FromTo(visible_menu_items[i], 'light', 'laranja');
    }
    logo.setAttribute('src', "imagens/Logo-Julica.svg");
    intagram_icon.setAttribute('src', "imagens/instagram orange.svg");
    whatsapp_icon.setAttribute('src', "imagens/whatsapp orange.svg");
}

const openNavMenu = () => {
    drawer_div.classList.remove('close');
    dropdown_btn.classList.add('invisible');
    close_btn.classList.remove('invisible');

    if (Array.from(navbar_background_div.classList).includes('transparent')) {
        ChangeColors_FromTo(navbar_background_div, 'transparent', 'colored');

        WhiteToOrangeMenuItems()
    }
}

const closeNavMenu = () => {
    drawer_div.classList.add('close');
    close_btn.classList.add('invisible');
    dropdown_btn.classList.remove('invisible');

    if (!Array.from(navbar_background_div.classList).includes('transparent') && window.scrollY === 0) {
        ChangeColors_FromTo(navbar_background_div, 'colored', 'transparent');

        OrangeToWhiteMenuItems()
    }
}

/* ------------------------------------------------------------------------ */


drawer_div.classList.add('close');
close_btn.classList.add('invisible');
dropdown_btn.childNodes[1].childNodes[1].setAttribute('fill', 'white');
OrangeToWhiteMenuItems()
changeColorAccordingToPosition()

dropdown_btn.onclick = () => {
    openNavMenu()
}

close_btn.onclick = () => {
    drawer_div.classList.add('close');
    close_btn.classList.add('invisible');
    dropdown_btn.classList.remove('invisible');

    if (!Array.from(navbar_background_div.classList).includes('transparent') && window.scrollY === 0) {
        ChangeColors_FromTo(navbar_background_div, 'colored', 'transparent');

        OrangeToWhiteMenuItems()
    }
}

/* setting the color according to the y position */
window.onscroll = () => {
    changeColorAccordingToPosition()
}

/* redirects */

var link_kits = document.querySelector('.kits-link')
var link_bolos = document.querySelector('.bolos-link')
var link_tortas = document.querySelector('.tortas-link')
var link_doces = document.querySelector('.doces-link')
var link_about = document.querySelector('.about-link')

var sec_cardapio = document.querySelector('.hiddable-cardapio')
var sec_about = document.querySelector('.about-me-sec')


const routineNavLinkChangingPageOfCardapio = (index, target_section) => {
    closeNavMenu()
    ifCardapioIsHiddenThenShow()

    if (parseInt(document.querySelectorAll('.item-ativo')[0].id) !== index) {
        changeCategoryAndPage(index)
    }
    target_section.scrollIntoView(false)
}


link_kits.onclick = () => {
    routineNavLinkChangingPageOfCardapio(0, sec_cardapio)
}
link_bolos.onclick = () => {
    routineNavLinkChangingPageOfCardapio(1, sec_cardapio)
}
link_tortas.onclick = () => {
    routineNavLinkChangingPageOfCardapio(2, sec_cardapio)
}
link_doces.onclick = () => {
    routineNavLinkChangingPageOfCardapio(3, sec_cardapio)
}
link_about.onclick = () => {
    closeNavMenu()
    sec_about.scrollIntoView()
}