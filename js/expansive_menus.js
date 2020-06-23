var triggers_to_expand = document.querySelectorAll('.text-expansive');
var expansive_menus = document.querySelectorAll('.expansive-menu');

var expandedBefore = undefined;

const expandTheElement = (element) => {
    element.classList.remove('not-expanded');
    element.classList.add('expanded');
}
const unexpandTheElement = (element) => {
    element.classList.remove('expanded');
    element.classList.add('not-expanded');
}

const expandEventListeners = () => {
    for (var i = 0; i < triggers_to_expand.length; i++) {
        let y = i;
        triggers_to_expand[i].addEventListener('mouseover', () => {
            if (expandedBefore !== undefined) {
                unexpandTheElement(expandedBefore);
            }

            expandTheElement(expansive_menus[y]);
            expandedBefore = expansive_menus[y];
        })
    }
}

const unexpandEventListeners = () => {
    for (var i = 0; i < expansive_menus.length; i++) {
        let y = i;
        expansive_menus[i].addEventListener('mouseout', () => {
            unexpandTheElement(expansive_menus[y]);
        })
    }
}

expandEventListeners()
// unexpandEventListeners()