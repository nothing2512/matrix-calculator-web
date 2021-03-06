'use strict'

let data = {}
let inputMatrix = []
let addSubCtx
let temp_matrix = null

// cancel
$("#bt-cancel-operation").click(function () {
    init()
})

// Add Matrix
$("#main-menu-bt-add-matrix").click(function() {
    hideFlex("#main-menu")
    showFlex("#add-matrix")
    showCancel()
})

$("#add-matrix-bt-input").click(function () {
    let name = $("#add-matrix-input-name").val()
    let row = $("#add-matrix-input-row").val()
    let col = $("#add-matrix-input-col").val()

    if (!name) alert("Nama matrix tidak boleh kosong")
    else if (!row) alert("Jumlah baris tidak boleh kosong")
    else if (!col) alert("Jumlah kolom tidak boleh kosong")
    else if (isNaN(row)) alert("baris harus angka")
    else if (isNaN(col)) alert("kolom harus angka")
    else {
        inputMatrix = createAddMatrix("#add-matrix-data", parseInt(row), parseInt(col))
        $("#add-matrix-bt-add").click(function () {
            let matrix = getMatrix(inputMatrix)
            if (matrix != null) {
                if (data[name] != null) {
                    if (confirm(`Apakah anda ingin mengganti data matrix ${name} ?`)) {
                        data[name] = new Matrix(name, matrix)
                        init()
                        showResults(data[name].toString())
                    }
                } else {
                    data[name] = new Matrix(name, matrix)
                    init()
                    showResults(data[name].toString())
                }
            }
        })
    }
})

// Generate Matrix
$("#main-menu-bt-generate-matrix").click(function() {
    hideFlex("#main-menu")
    showFlex("#generate-matrix")
    showCancel()
})

$("#generate-matrix-bt-input").click(function () {
    let name = $("#generate-matrix-input-name").val()
    let row = $("#generate-matrix-input-row").val()
    let col = $("#generate-matrix-input-col").val()
    let minVal = $("#generate-matrix-input-min-val").val()

    if (!name) alert("Nama matrix tidak boleh kosong")
    else if (!row) alert("Jumlah baris tidak boleh kosong")
    else if (!col) alert("Jumlah kolom tidak boleh kosong")
    else if (isNaN(row)) alert("baris harus angka")
    else if (isNaN(col)) alert("kolom harus angka")
    else {
        minVal = !isNaN(minVal) ? parseInt(minVal) : 0
        let matrix = []
        let range = []
        for(let x = minVal; x < (row * col) + minVal; x++) range.push(x)
        range = range.sort(() => Math.random() - 0.5)
        for (let x = 0; x < range.length; x++) {
            let i_row = Math.ceil((x + 1) / col) - 1
            let i_col = x % col
            if (i_col === 0) matrix.push([])
            matrix[i_row].push(range[x])
        }
        if (data[name] != null) {
            if (confirm(`Apakah anda ingin mengganti data matrix ${name} ?`)) {
                data[name] = new Matrix(name, matrix)
                init()
                showResults(data[name].toString())
            }
        } else {
            data[name] = new Matrix(name, matrix)
            init()
            showResults(data[name].toString())
        }
    }
})

function showAddSub(ctx) {
    addSubCtx = ctx
    if (Object.keys(data).length > 0) {
        let m1 = $("#add-sub-matrix-1-select")
        let m2 = $("#add-sub-matrix-2-select")

        m1.empty()
        m2.empty()

        for (let key of Object.keys(data)) {
            m1.append(`<option value="${key}">${key}</option>`)
            m2.append(`<option value="${key}">${key}</option>`)
        }

        hideFlex("#main-menu")
        showFlex("#add-sub-matrix")
        showCancel()
    } else {
        alert("Belum ada matrix tersimpan")
    }
}

// adding matrix
$("#main-menu-bt-addition").click(function() {
    showAddSub("add")
})

// subtration matrix
$("#main-menu-bt-subtraction").click(function() {
    showAddSub("sub")
})

// Add Sub Process
$("#add-sub-matrix-bt-process").click(function () {
    let m1 = $("#add-sub-matrix-1-select").find(":selected").val()
    let m2 = $("#add-sub-matrix-2-select").find(":selected").val()
    let result = addSubCtx === "sub" ? data[m1].sub(data[m2]) : data[m1].add(data[m2])
    temp_matrix = result.result
    init()
    showResults(result.flow)
    showFlex("#save-results")
})

// Multiply Matrix
$("#main-menu-bt-multiply").click(function() {
    if (Object.keys(data).length > 0) {
        let m1 = $("#mul-matrix-1-select")
        let m2 = $("#mul-matrix-2-select")

        m1.empty()
        m2.empty()

        for (let key of Object.keys(data)) {
            m1.append(`<option value="${key}">${key}</option>`)
            m2.append(`<option value="${key}">${key}</option>`)
        }

        hideFlex("#main-menu")
        showFlex("#mul-matrix")
        showCancel()
    } else {
        alert("Belum ada matrix tersimpan")
    }
})

// Mul Process
$("#mul-matrix-bt-process").click(function () {
    console.log("OK")
    let m1 = $("#mul-matrix-1-select").find(":selected").val()
    let m2 = $("#mul-matrix-2-select").find(":selected").val()
    let i2 = $("#mul-matrix-2-num").val()
    let mul = data[m1].mul(!isNaN(i2) && i2 === "" ? data[m2] : parseInt(i2))
    console.log(mul)
    temp_matrix = mul.result
    init()
    showResults(mul.flow)
    showFlex("#save-results")
})

// det Matrix
$("#main-menu-bt-determinant").click(function() {
    if (Object.keys(data).length > 0) {
        let select = $("#det-matrix-select")
        select.empty()

        for (let key of Object.keys(data)) {
            select.append(`<option value="${key}">${key}</option>`)
        }

        hideFlex("#main-menu")
        showFlex("#det-matrix")
        showCancel()
    } else {
        alert("Belum ada matrix tersimpan")
    }
})

// det sarrus
$("#det-bt-sarrus").click(function () {
    let m = $("#det-matrix-select").find(":selected").val()
    init()
    let matrix = data[m].toString()
    let det = data[m].determinant(Matrix.SARRUS)
    showResults([matrix, det.flow])
})

// det cofactor
$("#det-bt-cofactor").click(function () {
    let m = $("#det-matrix-select").find(":selected").val()
    init()
    let matrix = data[m].toString()
    let det = data[m].determinant(Matrix.COFACTOR)
    showResults([matrix, det.flow])
})

// det gauss
$("#det-bt-gauss").click(function () {
    let m = $("#det-matrix-select").find(":selected").val()
    init()
    let matrix = data[m].toString()
    let det = data[m].determinant(Matrix.GAUSS)
    showResults([matrix, det.flow])
})

// inverse Matrix
$("#main-menu-bt-inverse").click(function() {
    if (Object.keys(data).length > 0) {
        let select = $("#inv-matrix-select")
        select.empty()

        for (let key of Object.keys(data)) {
            select.append(`<option value="${key}">${key}</option>`)
        }

        hideFlex("#main-menu")
        showFlex("#inv-matrix")
        showCancel()
    } else {
        alert("Belum ada matrix tersimpan")
    }
})

// inverse adjoint
$("#inv-bt-adjoint").click(function () {
    let m = $("#inv-matrix-select").find(":selected").val()
    init()
    let matrix = data[m].toString()
    let inv = data[m].inverse(Matrix.ADJOINT)
    temp_matrix = inv.result
    showResults([matrix, inv.flow])
    showFlex("#save-results")
})

// inverse gauss
$("#inv-bt-gauss").click(function () {
    let m = $("#inv-matrix-select").find(":selected").val()
    init()
    let matrix = data[m].toString()
    let inv = data[m].inverse(Matrix.GAUSS)
    temp_matrix = inv.result
    showResults([matrix, inv.flow])
    showFlex("#save-results")
})

// transpose Matrix
$("#main-menu-bt-transpose").click(function() {
    if (Object.keys(data).length > 0) {
        let select = $("#transpose-matrix-select")
        select.empty()

        for (let key of Object.keys(data)) {
            select.append(`<option value="${key}">${key}</option>`)
        }

        hideFlex("#main-menu")
        showFlex("#transpose-matrix")
        showCancel()
    } else {
        alert("Belum ada matrix tersimpan")
    }
})

// transpose process
$("#transpose-bt-process").click(function () {
    let m = $("#transpose-matrix-select").find(":selected").val()
    init()
    let matrix = data[m].toString()
    let transpose = data[m].transpose()
    temp_matrix = transpose.result
    showResults([matrix, divider, p(`Transpose ${m}`), transpose.flow])
    showFlex("#save-results")
})

// Show Matrix
$("#main-menu-bt-show").click(function () {
    let contents = []
    for(let key of Object.keys(data)) {
        contents.push(data[key].toString())
    }
    init()
    showResults(contents)
})

// No Save Matrix
$("#bt-no-save-results").click(function () {
    hideFlex("#save-results")
})

// Save Matrix
$("#bt-save-results").click(function () {
    if (temp_matrix != null) {
        let name = $("#save-results-name").val()
        if (!name) alert("Nama matrix tidak boleh kosong")
        else {
            if (data[name] != null) {
                if (confirm(`Apakah anda ingin mengganti data matrix ${name} ?`)) {
                    data[name] = new Matrix(name, temp_matrix)
                    temp_matrix = null
                    hideFlex("#save-results")
                }
            } else {
                data[name] = new Matrix(name, temp_matrix)
                temp_matrix = null
                hideFlex("#save-results")
            }
        }
    }
})

// Clear Matrix
$("#main-menu-bt-clear").click(function () {
    if (confirm("Hapus semua data?")) {
        data = {}
        init()
    }
})