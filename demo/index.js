import {haloRender} from "../src";

const editor = document.getElementById("editor")
const preview = document.getElementById("preview")
const html = document.getElementById("html")

window.addEventListener('load', () => {
    render()
})

editor.addEventListener("input", e => {
    render()
})

const render = () => {
    const text = editor.value
    let ht = ""
    text.split("---").forEach(ele => {
        ht += haloRender(ele)
    })
    console.log(ht)
    preview.innerHTML = ht
    html.value = ht
}
