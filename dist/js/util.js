'use strict'

const divider = '<div class="divider"></div>'
const line = {
    horizontal: `<div class="w-75 border border-white"></div>`,
    vertical: `<div class="h-100 border border-white"></div>`
}

function p(text) {
    return `<p class="text-center text-white font-weight-bold">${text}</p>`
}

function mcol(data, big = false) {
    let width = big ? 170 : 50
    let col = typeof data == "string" ? data : (data.n % data.d === 0 ? `${data.n / data.d}` : `${data.n}/${data.d}`)
    return `<input type="text" class="m-1 text-center form-control" disabled value="${col}" style="width: ${width}px"/>`
}

function hideFlex(id) {
    $(id).removeClass("d-flex").addClass("d-none");
}

function showFlex(id) {
    $(id).removeClass("d-none").addClass("d-flex");
}

function hideCancel() {
    $("#bt-cancel-operation").hide()
}

function showCancel() {
    $("#bt-cancel-operation").show()
}

function createAddMatrix(parentId, row, col) {
    let parent = $(parentId)
    let content = []
    let ids = []
    for (let i = 0; i < row; i++) {
        content.push('<div class="divider"></div>')
        content.push('<div class="row">')
        ids.push([])
        for (let j = 0; j < col; j++) {
            let id = `#m-data-${i}-${j}`
            ids[i].push(id)
            content.push(`<input type="text" class="m-1 text-center form-control" id="${id}" style="width: 70px"/>`)
        }
        content.push("</div>")
    }
    content.push('<div class="divider"></div>')
    content.push('<button class="btn btn-primary w-25" id="add-matrix-bt-add">Add</button>')
    parent.append(content.join(""))
    showFlex(parentId)
    return ids
}

function showResults(data) {
	$('html, body').animate({
        scrollTop: $("#results").offset().top
    }, 1000);
    let content = Array.isArray(data) ? data : [data]
    let parent = $("#results")
    content.push(divider)
    content.push('<button class="btn btn-danger w-25" id="result-bt-clear">Clear</button>')
    content.push(divider)
    parent.append(content.join(""))
    $("#result-bt-clear").click(function () {
        $("#results").empty()
    })
}

function iter(data, callback) {
    for (let key of Object.keys(data)) {
        callback(!isNaN(key) ? parseInt(key) : key, data[key])
    }
}

function getMatrix(ids) {
    let matrix = []
    for (let i = 0; i < ids.length; i++) {
        matrix.push([])
        for (let j = 0; j < ids[i].length; j++) {
            let element = document.getElementById(ids[i][j]).value

            if (!element) {
                alert(`elemen [${i}][${j}] tidak boleh kosong`)
                return null;
            } else if (isNaN(element)) {
                alert(`elemen [${i}][${j}] harus angka`)
                return null;
            } else {
                matrix[i].push(element)
            }
        }
    }
    return matrix
}

function showQuestion() {
    showFlex("#save-results")
}

function init() {
    $("#results").empty()
    $("#add-matrix-data").empty()
    $("#add-sub-matrix-1-select").empty()
    $("#add-sub-matrix-2-select").empty()
    $("#mul-matrix-1-select").empty()
    $("#mul-matrix-2-select").empty()
    $("#det-matrix-select").empty()
    $("#inv-matrix-select").empty()
    $("#transpose-matrix-select").empty()

    $("#save-results-name").val("")
    $("#add-matrix-input-name").val("")
    $("#add-matrix-input-row").val("")
    $("#add-matrix-input-col").val("")
    $("#generate-matrix-input-name").val("")
    $("#generate-matrix-input-row").val("")
    $("#generate-matrix-input-col").val("")
    $("#mul-matrix-2-num").val("")

    showFlex("#main-menu")
    hideFlex("#add-matrix")
    hideFlex("#add-sub-matrix")
    hideFlex("#generate-matrix")
    hideFlex("#mul-matrix")
    hideFlex("#det-matrix")
    hideFlex("#inv-matrix")
    hideFlex("#transpose-matrix")
    hideFlex("#save-results")
    hideCancel()
}