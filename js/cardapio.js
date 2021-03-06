const menu_items = document.querySelectorAll('.cardapio-item') // getting the clicable item of the menu
const menu_containers = document.querySelectorAll('.cardapio-item-container') // getting the box of the item of the menu

const next_btn = document.querySelector('.next-page-icon a')
const previous_btn = document.querySelector('.previous-page-icon a')
const cardapio_close_btn = document.querySelector('.close-page-icon a')

const section_cardapio = document.querySelector('.hiddable-cardapio')
const btn_hide_or_show = document.querySelector('.btn-hero')
var hide_or_show_state = true

// var expositor_atual = document.querySelector(".expositores-cardapio[name='0']")
var lista_de_expositores = document.querySelectorAll('.expositores-cardapio')
var expositor_atual = document.querySelector(".expositores-cardapio[name='0']")
let isPressed = false
let startX
let scrollLeft

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

const changeGroupOfImages_fromTo_forCardapio = (id_from, id_to) => {
    let from_imgs = getThePagesOfTheSelectedMenuItem(id_from)
    let to_imgs = getThePagesOfTheSelectedMenuItem(id_to)

    opacityToZero(from_imgs, 'selecionado')
    opacityTo_100(to_imgs, 'selecionado')
}

// aplyied on the menu options change event
const changeCategoryAndPage = (menu_item_index) => {
    let id_from = changeCurrentSelection(menu_item_index)
    changeGroupOfImages_fromTo_forCardapio(id_from, menu_item_index)
    lista_de_expositores[menu_item_index].scrollLeft = lista_de_expositores[menu_item_index].innerWidth
}

/* - - - - - */

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


/* event listeners */
for (var i = 0; i < lista_de_expositores.length; i++) {
    let y = i
    lista_de_expositores[i].addEventListener('mousedown', (e) => {
        isPressed = true
        lista_de_expositores[y].classList.add('dragging')
        startX = e.pageX - lista_de_expositores[y].offsetLeft
        scrollLeft = lista_de_expositores[y].scrollLeft
    })
    lista_de_expositores[y].addEventListener('mouseleave', () => {
        isPressed = false
        lista_de_expositores[y].classList.remove('dragging')
    })
    lista_de_expositores[y].addEventListener('mouseup', () => {
        isPressed = false
        lista_de_expositores[y].classList.remove('dragging')
    })

    lista_de_expositores[i].addEventListener('mousemove', (e) => {
        if (!isPressed) return
        e.preventDefault()
        let atualX = e.pageX - lista_de_expositores[y].offsetLeft

        deslocamentoX = atualX - startX
        lista_de_expositores[y].scrollLeft = scrollLeft - 1.4 * deslocamentoX
    })
}

next_btn.onclick = () => {
    let deslocamentoX_desejado = window.innerWidth
    expositor_atual.scrollLeft += deslocamentoX_desejado
}
previous_btn.onclick = () => {
    let deslocamentoX_desejado = window.innerWidth
    expositor_atual.scrollLeft -= deslocamentoX_desejado
}

cardapio_close_btn.onclick = () => {
    section_cardapio.classList.add('hidden')
}