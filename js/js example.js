
const summaries = document.querySelectorAll('summary');

summaries.forEach((summary) => {
    summary.addEventListener('click', closeOpenedDetails);
});

function closeOpenedDetails() {
    summaries.forEach((summary) => {
        let detail = summary.parentNode;
        if (detail != this.parentNode) {
            detail.removeAttribute('open');
        }
    });
};

customElements.define('star-rating',
    class extends HTMLElement {
        constructor() {
            super(); // Always call super first in constructor
            const starRating = document.getElementById('star-rating-template').content;
            const shadowRoot = this.attachShadow({
                mode: 'open'
            });
            shadowRoot.appendChild(starRating.cloneNode(true));
        }
    });


btn = document.getElementById("btnshowdialog")
dlg = document.getElementById("dialog1")
sel = dlg.querySelector("select")
out = document.getElementById("output")
confirmbtn = dlg.querySelector("button[value='default']")

btn.addEventListener("click", () => {
    dlg.showModal();
});
// sel.addEventListener("change", (e) => {
//     confirmbtn.value = sel.value;
// });

dlg.addEventListener("close", (e) => {
    out.innerText =
        dlg.returnValue == "" ?
            "no return value" : dlg.returnValue;
});

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method
confirmbtn.addEventListener("click", (e) => {
    e.preventDefault();
    dlg.close(sel.value);
});

// upload avatar
const fileTypes = [
    "image/apng",
    "image/bmp",
    "image/gif",
    "image/jpeg",
    "image/pjpeg",
    "image/png",
    "image/svg+xml",
    "image/tiff",
    "image/webp",
    "image/x-icon",
];

function validfiletype(file) {
    return fileTypes.includes(file.type);
}

input = document.querySelector("input[type='file']")
preview = document.querySelector("#preview")

input.addEventListener("change", () => {
    while (preview.firstChild) {
        preview.removeChild(preview.firstChild);
    }
    if (input.files.length != 1) {
        const p = document.createElement("p");
        p.textContent = "please select one file";
        preview.appendChild(p);
    } else {
        const file = input.files[0];
        if (!validfiletype(file)) {
            const p = document.createElement("p");
            p.textContent = "please select image";
            preview.appendChild(p);
        }
        else {
            const img = document.createElement("img");
            img.src = URL.createObjectURL(file);
            preview.appendChild(img);
        }
    }
});

// animation related
stopbtn1 = document.querySelector("#stop1");
resumebtn1 = document.querySelector("#resume1");
paras = document.querySelectorAll("#anime1 > p");
paras.forEach(p => {
    p.className = "scroll";
});

stopbtn1.addEventListener("click", () => {
    paras.forEach(p => {
        p.addEventListener("animationiteration", () => {
            p.className = "stopped";
        })
    })
})

resumebtn1.addEventListener("click", () => {
    paras.forEach(p => {
        p.className = "stopped";
    });
    requestAnimationFrame((time) => {
        requestAnimationFrame((time) => {
            paras.forEach(p => {
                p.className = "scroll";
            });
        })
    })
})