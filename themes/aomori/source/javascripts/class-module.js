// Add class to element - Optimized using classList API
export function addNewClass(elements, myClass) {
    // if there are no elements, we're done
    if (!elements) {
        return
    }
    // if we have a selector, get the chosen elements
    if (typeof elements === 'string') {
        elements = document.querySelectorAll(elements)
    }
    // if we have a single DOM element, make it an array to simplify behavior
    else if (elements.tagName) {
        elements = [elements]
    }
    // add class to all chosen elements using modern classList API
    for (let i = 0; i < elements.length; i++) {
        if (elements[i] && elements[i].classList) {
            elements[i].classList.add(myClass)
        }
    }
}

// Remove class from element - Optimized using classList API
export function removeClass(elements, myClass) {
    // if there are no elements, we're done
    if (!elements) {
        return
    }

    // if we have a selector, get the chosen elements
    if (typeof elements === 'string') {
        elements = document.querySelectorAll(elements)
    }
    // if we have a single DOM element, make it an array to simplify behavior
    else if (elements.tagName) {
        elements = [elements]
    }
    // remove class from all chosen elements using modern classList API
    for (let i = 0; i < elements.length; i++) {
        if (elements[i] && elements[i].classList) {
            elements[i].classList.remove(myClass)
        }
    }
}

// 函数节流
export function throttle(fn, scope) {
    let timer
    return function () {
        const context = scope || this
        const args = arguments
        if (!timer) {
            timer = setTimeout(function () {
                fn.apply(context, args)
                timer = null
            }, 80)
        }
    }
}
