// returns array of path handles for Breadcrumb component
// Example: ['curtains-drapes', 'cafe-tier-curtains']
export default function getProductBreadcrumbs(collections) {
    let _collections = [...collections]
    const parentCollections = ['curtains-drapes', 'blinds-shades', 'rods-hardware', 'bedding', 'bath', 'home-decor', 'rugs', 'fabrics'];
    const hiddenCats = ['promotional', 'sale', 'usa-made', 'spring', 'summer-sale']
    let pathBits = []
    let parentCollectionHandle = null

    //loop through collections and find parent collection
    _collections.forEach((c, index) => {
        if (parentCollections.includes(c.handle)) {
            if (!pathBits.includes(c.handle)) {
                pathBits.push(c.handle)
            }
            parentCollectionHandle = c.handle
        }
    })

    //handle bath rugs
    //make bath the parent
    if (!!pathBits.length && pathBits.length > 1) {
        if (pathBits.includes('bath') && pathBits.includes('rugs')) {
            pathBits = pathBits.filter(bit => bit !== 'rugs')
            //remove rugs from collections too, so it doesn't show up as a child
            _collections = _collections.filter(c => c.handle !== 'rugs')
        }
    }

    //remove parent instances from collections array
    let childCollections = _collections.filter(c => c.handle !== parentCollectionHandle)

    //remove hidden collections types
    childCollections = childCollections.filter(c => !hiddenCats.includes(c.handle))

    //push other handles to pathBits
    if (!!childCollections.length) {
        //only going to push one child
        //others may exist because product can be assigned to multiple categories
        pathBits.push(childCollections[0].handle)
    }

    return pathBits
}
