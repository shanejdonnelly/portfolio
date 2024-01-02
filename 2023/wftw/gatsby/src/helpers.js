export function formatColor(rgb) {
    return `rgba(${rgb.r},${rgb.g}, ${rgb.b}, ${rgb.a})`
}

export function checkForImageWithMargin(images) {
    let hasImageWithMargin = false
    images.forEach(i => {
        if (i.marginTop && i.marginTop > 0) {
            hasImageWithMargin = true
        }
    })
    return hasImageWithMargin

}

export function formatBorderRadius(brArr) {
    if (brArr.length === 1) {
        return `${brArr[0]}px ${brArr[0]}px ${brArr[0]}px ${brArr[0]}px`
    }
    else if (brArr.length === 4) {
        return `${brArr[0]}px ${brArr[1]}px ${brArr[2]}px ${brArr[3]}px`
    }
    else {
        return '0 0 0 0'
    }
}

export function throttle(func, delay) {
    let inProgress = false;
    return (...args) => {
        if (inProgress) {
            return;
        }
        inProgress = true;
        setTimeout(() => {
            func(...args); // Consider moving this line before the set timeout if you want the very first one to be immediate
            inProgress = false;
        }, delay);
    }
}
