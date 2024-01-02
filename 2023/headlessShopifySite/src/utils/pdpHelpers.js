export default function optionAvailable(name, value) {
    const currentSize = variant.selectedOptions.find(
        (vso) => vso.name === "Size"
    )
    const currentColor = variant.selectedOptions.find(
        (vso) => vso.name === "Vendor Color Name"
    )
    if (name === "Size") {
        return sizesByColor && currentColor && currentColor.value
            ? sizesByColor[currentColor.value].includes(value)
            : false
    }
    if (name === "Vendor Color Name") {
        return colorsBySize && currentSize && currentSize.value
            ? colorsBySize[currentSize.value].includes(value)
            : false
    }

    return false
}
