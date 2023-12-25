import HaloJs, {haloJs, haloRender} from "../src";

const editor = document.getElementById("editor")
const preview = document.getElementById("preview")
const html = document.getElementById("html")

editor.addEventListener("input", e => {
    render()
})

const render = () => {
    const text = editor.value
    let ht = ""
    text.split("---").forEach(ele => {
        ht += HaloJs.renderHalo(ele)
    })
    console.log(ht)
    preview.innerHTML = ht
    html.value = ht
}


window.addEventListener('load', () => {
    editor.value = `tips:warn
This is the warning tips

---

tips
This is a tips

---

tips:danger
This is a danger tips

---

tips:success
This is a success tips

---

tips:info
This is a info tips

---

git:[@github/justice2001/halo-plugin-vditor]
`
    render()
})
