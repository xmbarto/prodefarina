import html2canvas from 'html2canvas'

export const createShareableImg = async (elementId) => {
    const element = document.querySelector(elementId)
    if(!element){
        throw new Error('Element not found')
    }

    try {
        const canvas = await html2canvas(element)
        const dataUrl = canvas.toDataURL('image/png')
        return dataUrl
    } catch (e) {
        console.error('Error al generar la imagen, error: ', e)
        throw e
    }
}