const menu_items = document.querySelectorAll('.cardapio-item') // getting the clicable item of the menu
const menu_containers = document.querySelectorAll('.cardapio-item-container') // getting the box of the item of the menu

const next_btn = document.querySelector('.next-page-icon a')
const previous_btn = document.querySelector('.previous-page-icon a')
const cardapio_close_btn = document.querySelector('.close-page-icon a')

const section_cardapio = document.querySelector('.hiddable-cardapio')
const btn_hide_or_show = document.querySelector('.btn-hero')
var hide_or_show_state = true

/* functions */

const hideOrShowCardapio = (bool, div_cardapio) => {
    if (bool) {
        opacityTo_100(div_cardapio, 'hidden')
    } else {
        opacityToZero(div_cardapio, 'hidden')
    }
}

const ifCardapioIsHiddenThenShow = () => {
    if (Array.from(section_cardapio.classList).includes('hidden')) {
        section_cardapio.classList.remove('hidden')
    }
}

const changeCurrentSelection = (index) => {
    // removendo a classe ativo do item que já não é mais o selecionado
    let last_item_selected = document.querySelectorAll('.item-ativo')

    if (parseInt(last_item_selected[0].id) !== index) {
        last_item_selected[0].classList.remove('item-ativo')

        // definindo o novo item selecionado como ativo
        menu_containers[index].classList.add('item-ativo')
        return last_item_selected[0].id
    }
}

const getThePagesOfTheSelectedMenuItem = (id) => {
    return document.querySelector(`.expositores-cardapio[name='${id}']`)
}

const getTheContentOfPage = (id, page_number) => {
    return document.querySelectorAll(`.expositores-cardapio[name='${id}'] .page-${page_number}`)
}

const changeTheDisplayedPage = (id_sel_from, id_sel_to, page_from, page_to) => {
    var from_page = getTheContentOfPage(id_sel_from, page_from)
    var to_page = getTheContentOfPage(id_sel_to, page_to)

    if (to_page[0] !== undefined && from_page[0] !== undefined) {
        opacityToZero(from_page[0], 'pagina-atual')
        opacityTo_100(to_page[0], 'pagina-atual')
    }
}

const changeGroupOfImages_fromTo_forCardapio = (id_from, id_to) => {
    // let id_from = document.querySelector(`.expositores-cardapio[name='${id}']`)
    let from_imgs = getThePagesOfTheSelectedMenuItem(id_from)
    let to_imgs = getThePagesOfTheSelectedMenuItem(id_to)

    let id_selecao_from = parseInt(from_imgs.attributes[0].value)
    let id_selecao_to = parseInt(to_imgs.attributes[0].value)

    changeTheDisplayedPage(id_selecao_from, id_selecao_to, 0, 0)

    //tratando 'pagina-atual' from para que no retorno para esta pagina, não fique com mais de uma atual
    let pagina_atual_from = document.querySelectorAll(`.expositores-cardapio[name='${id_selecao_to}'] .pagina-atual`)
    console.log(pagina_atual_from)
    if (pagina_atual_from.length > 1) {
        for (var i = 1; i < pagina_atual_from.length; i++) {
            console.log(pagina_atual_from[i])

            pagina_atual_from[i].classList.remove('pagina-atual')
        }
    }

    opacityToZero(from_imgs, 'selecionado')
    opacityTo_100(to_imgs, 'selecionado')
}

// next: increment_value = 1 | previous: increment_value = -1
const changePages = (increment_value) => {
    let id_selecao_atual = parseInt(document.querySelector('.selecionado').attributes[0].value)

    let current_page_id = parseInt(document.querySelector(`.expositores-cardapio[name='${id_selecao_atual}'] .pagina-atual`).attributes[0].value)
    let next_page_id = current_page_id + increment_value

    changeTheDisplayedPage(id_selecao_atual, id_selecao_atual, current_page_id.toString(), next_page_id.toString())
}

// aplyied on the menu options change event
const changeCategoryAndPage = (menu_item_index) => {
    let id_from = changeCurrentSelection(menu_item_index)
    console.log(menu_item_index)
    changeGroupOfImages_fromTo_forCardapio(id_from, menu_item_index)
}


/* - - - - */
ifCardapioIsHiddenThenShow() // debug

btn_hide_or_show.onclick = () => {
    // invertendo state
    hide_or_show_state = !hide_or_show_state

    ifCardapioIsHiddenThenShow()
    section_cardapio.scrollIntoView(false);
}

for (var i = 0; i < side_menu_items.length; i++) {
    let y = i
    menu_items[i].onclick = function () {
        changeCategoryAndPage(y)
    }
}

next_btn.onclick = () => {
    var increment = 1
    changePages(increment)
}

previous_btn.onclick = () => {
    var increment = -1
    changePages(increment)
}

cardapio_close_btn.onclick = () => {
    section_cardapio.classList.add('hidden')
}