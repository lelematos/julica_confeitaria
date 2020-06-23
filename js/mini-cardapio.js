var side_menu_items = document.querySelectorAll('.side-menu-text') // getting the clicable item of the menu
var side_menu_containers = document.querySelectorAll('.side-menu-items') // getting the box of the item of the menu

/* functions */

const addItemOnclick = (index) => {
    // removendo a classe ativo do item que já não é mais o selecionado
    let last_item_selected = document.querySelectorAll('.ativo')
    last_item_selected[0].classList.remove('ativo')

    // definindo o novo item selecionado como ativo
    side_menu_containers[index].classList.add('ativo')
}

const getTheRelatedGroupOfImages = (id) => {
    return document.querySelector(`.expositor-de-imagens[name='${id}']`)
}

// const opacityToZero = (element) => {
//     element.classList.remove('visivel')
// }

// const opacityTo_100 = (element) => {
//     element.classList.add('visivel')
// }

const opacityToZero = (element, class_identifier) => {
    element.classList.remove(class_identifier)
}

const opacityTo_100 = (element, class_identifier) => {
    element.classList.add(class_identifier)
}

const changeGroupOfImages_fromTo = (id_from, id_to) => {
    let from_imgs = getTheRelatedGroupOfImages(id_from)
    let to_imgs = getTheRelatedGroupOfImages(id_to)

    opacityToZero(from_imgs, 'visivel');
    opacityTo_100(to_imgs, 'visivel');
}


/*  - - - - */

for (var i = 0; i < side_menu_items.length; i++) {
    let y = i
    side_menu_items[i].onclick = function () {
        var id_from = document.querySelector('.ativo').id
        addItemOnclick(y)
        changeGroupOfImages_fromTo(id_from, y.toString())
    }
}