'use strict'

// noinspection EqualityComparisonWithCoercionJS
class Matrix {
    static SARRUS = 0;
    static COFACTOR = 1;
    static GAUSS = 2;
    static ADJOINT = 3;

    constructor(name, data) {
        this.name = name
        this.data = []

        for (let row of data) {
            let temp = []
            for (let col of row) temp.push(math.fraction(col))
            this.data.push(temp)
        }
    }

    formatNum(data) {
        return typeof data == "string" ? data :
            (data.n % data.d === 0 ? `${data.n / data.d}` : `${data.n}/${data.d}`)
    }

    // noinspection DuplicatedCode
    fAdd(data) {
        let modifier = "+"
        if (data < 0) {
            modifier = "-"
            data = data.mul(-1)
        }
        data = typeof data == "string" ? data : (data.n % data.d === 0 ? `${data.n / data.d}` : `${data.n}/${data.d}`)
        return `${modifier} ${data}`
    }

    // noinspection DuplicatedCode
    fSub(data) {
        let modifier = "-"
        if (data < 0) {
            modifier = "+"
            data = data.mul(-1)
        }
        data = typeof data == "string" ? data : (data.n % data.d === 0 ? `${data.n / data.d}` : `${data.n}/${data.d}`)
        return `${modifier} ${data}`
    }

    toString (args=null) {
        let name
        let data
        let others = []
        let big = false
        let k = null

        if (args != null) {
            if (args.others) {
                others = args.others
                data = others[0].data
                k = others[0].k
                others.shift()
            } else {
                data = args.data
                name = args.name || null
                k = args.k || null
            }
            big = args.big || false
        } else {
            data = this.data
            name = this.name
        }

        let content = []
        if (name != null) content.push(p(name.length < 6 ? `Matrix ${name}` : name))

        iter(data, (i, row) => {
            if (i > 0) content.push(divider);
            content.push('<div class="row">')
            if (k != null) content.push(`<div class="m-1">${k}</div>`)

            iter(row, (j, col) => {
                content.push(mcol(col, big))
            })

            iter(others, (_, x) => {
                let xk = x.k || ""
                if (x.div != null) content.push(x.div)
                else content.push(`<div class="m-1">${x.operator ? " " + x.operator : ""} ${xk}</div>`)
                iter(x.data[i], (_, o) => {
                    content.push(mcol(o, big))
                })
            })

            content.push("</div>")
        })

        return content.join("")
    }

    add(other) {
        let result = []
        let x = this.data
        let y = other.data

        if (x.length !== y.length) alert("jumlah baris tidak sama")
        if (x[0].length !== y[0].length) alert("jumlah kolom tidak sama")

        iter(x, (i, _) => {
            result.push([])
            iter(x[0], (j, _) => {
                result[i].push(x[i][j].add(y[i][j]))
            })
        })

        return {
            flow: this.toString({
                name: `${this.name} + ${other.name}`,
                data: result
            }),
            result: result
        }
    }

    sub(other) {
        let result = []
        let x = this.data
        let y = other.data

        if (x.length !== y.length) alert("jumlah baris tidak sama")
        if (x[0].length !== y[0].length) alert("jumlah kolom tidak sama")

        iter(x, (i, _) => {
            result.push([])
            iter(x[0], (j, _) => {
                result[i].push(x[i][j].sub(y[i][j]))
            })
        })

        return {
            flow: this.toString({
                name: `${this.name} - ${other.name}`,
                data: result
            }),
            result: result
        }
    }

    mul(other) {
        let flow = []
        let result = []
        let x = this.data

        if (isNaN(other)) {
            let y = other.data

            if (x.length !== y[0].length) {
                alert(`baris matriks ${this.name} != kolom matriks ${other.name}`)
            }

            iter(x, (i, row) => {
                result.push([])
                flow.push([])
                iter(row, (k, _) => {
                    let temp_result = math.fraction(0);
                    let temp_flow = []
                    iter(row, (j, _) => {
                        temp_result = temp_result.add(x[i][j].mul(y[j][k]))
                        temp_flow.push(`${this.formatNum(x[i][j].mul(y[j][k]))}`)
                    })
                    result[i].push(temp_result)
                    flow[i].push(temp_flow.join(" + "))
                })
            })

            return {
                flow: [
                    this.toString({
                        name: `${this.name} * ${other.name}`,
                        data: flow,
                        big: true
                    }),
                    divider,
                    this.toString({
                        name: `Result`,
                        data: result
                    })
                ].join(""),
                result: result
            }
        } else {
            iter(x, (i, row) => {
                result.push([])
                flow.push([])
                iter(row, (_, col) => {
                    result[i].push(col.mul(other))
                    flow[i].push(`${this.formatNum(col)} * ${this.formatNum(other)}`)
                })
            })
            return {
                flow: [
                    this.toString({
                        name: `${this.name} * ${this.formatNum(other)}`,
                        data: flow,
                        big: true
                    }),
                    this.toString({
                        name: `Result`,
                        data: result
                    })
                ].join(""),
                result: result
            }
        }
    }

    determinant(method=Matrix.SARRUS, data=null) {
        if (data == null) data = this.data
        let data_type = data.length

        if (method === Matrix.SARRUS) {
            if (data_type === 2) return this.determinant2x2(data)
            else if (data_type === 3) return this.determinant3x3_sarrus(data)
            else return this.determinant4x4_sarrus(data)
        } else if (method === Matrix.COFACTOR) {
            if (data_type === 2) return this.determinant2x2(data)
            else return this.determinant_cofactor()
        } else if (method === Matrix.GAUSS) {
            if (data_type === 3) return this.determinant_gauss()
            else return this.determinant()
        } else return {}
    }

    determinant2x2(data=null) {
        let flow = []
        let name = this.name
        if (data == null) data = this.data

        let a = data[0][0].mul(data[1][1])
        let b = data[1][0].mul(data[0][1])

        flow.push(divider)
        flow.push(p(`|${name}| = ${this.formatNum(a)} - ${this.formatNum(b)}`))
        flow.push(p(`|${name}| = ${this.formatNum(a.sub(b))}`))

        return {
            flow: flow.join(""),
            result: a.sub(b)
        }
    }

    determinant3x3_sarrus(data=null) {
        if (data == null) data = this.data
        let name = this.name
        let flow = []

        let a1 = (data[0][0].mul(data[1][1])).mul(data[2][2])
        let a2 = (data[0][1].mul(data[1][2])).mul(data[2][0])
        let a3 = (data[0][2].mul(data[1][0])).mul(data[2][1])
        let b1 = (data[2][0].mul(data[1][1])).mul(data[0][2])
        let b2 = (data[2][1].mul(data[1][2])).mul(data[0][0])
        let b3 = (data[2][2].mul(data[1][0])).mul(data[0][1])
        let r1 = (a1.add(a2)).add(a3)
        let r2 = (b1.add(b2)).add(b3)
        let result = r1.sub(r2)

        let flow_1 = `${this.formatNum(a1)} + ${this.formatNum(a2)} + ${this.formatNum(a3)}`
        let flow_2 = `(${this.formatNum(b1)} + ${this.formatNum(b2)} + ${this.formatNum(b3)})`

        flow.push(p(`|${name}| = ${flow_1} - ${flow_2}`))
        flow.push(p(`|${name}| = ${this.formatNum(r1)} - ${this.formatNum(r2)}`))
        flow.push(p(`|${name}| = ${this.formatNum(result)}`))

        return {
            flow: flow.join(""),
            result: result
        }
    }

    determinant4x4_sarrus(data=null) {
        if (data == null) data = this.data
        let name = this.name
        let formatNum = this.formatNum
        let fAdd = this.fAdd
        let fSub = this.fSub

        function gi_multiple(matrix, chars) {
            let result = math.fraction(1)
            for (let char of chars) {
                let index = char.charCodeAt(0) - 96
                let row = Math.ceil(index / 4) - 1
                let col = index - (row * 4) - 1
                result = result.mul(matrix[row][col])
            }
            return result
        }

        function generate_a1(matrix) {
            let afkp = gi_multiple(matrix, "afkp")
            let bglm = gi_multiple(matrix, "bglm")
            let chin = gi_multiple(matrix, "chin")
            let dejo = gi_multiple(matrix, "dejo")
            let ahkn = gi_multiple(matrix, "ahkn")
            let belo = gi_multiple(matrix, "belo")
            let cfip = gi_multiple(matrix, "cfip")
            let dgjm = gi_multiple(matrix, "dgjm")

            let a1 = afkp.sub(bglm).add(chin).sub(dejo).sub(ahkn).add(belo).sub(cfip).add(dgjm)
            return {
                flow: [
                    divider,
                    p(`${name}1 = ${afkp} ${fSub(bglm)} ${fAdd(chin)} ${fSub(dejo)} ${fSub(ahkn)} ${fAdd(belo)} ${fSub(cfip)} ${fAdd(dgjm)}`),
                    p(`${name}1 = ${formatNum(a1)}`)
                ],
                result: a1
            }
        }

        function generate_a2(matrix) {
            let aflo = gi_multiple(matrix, "aflo").mul(-1)
            let bgip = gi_multiple(matrix, "bgip")
            let chjm = gi_multiple(matrix, "chjm")
            let dekn = gi_multiple(matrix, "dekn")
            let ahjo = gi_multiple(matrix, "ahjo")
            let bekp = gi_multiple(matrix, "bekp")
            let cflm = gi_multiple(matrix, "cflm")
            let dgin = gi_multiple(matrix, "dgin")

            let a2 = aflo.add(bgip).sub(chjm).add(dekn).add(ahjo).sub(bekp).add(cflm).sub(dgin)
            return {
                flow: [
                    divider,
                    p(`${name}2 = ${aflo} ${fAdd(bgip)} ${fSub(chjm)} ${fAdd(dekn)} ${fAdd(ahjo)} ${fSub(bekp)} ${fAdd(cflm)} ${fSub(dgin)}`),
                    p(`${name}2 = ${formatNum(a2)}`)
                ],
                result: a2
            }
        }

        function generate_a3(matrix) {
            let agln = gi_multiple(matrix, "agln")
            let bhio = gi_multiple(matrix, "bhio")
            let cejp = gi_multiple(matrix, "cejp")
            let dfkm = gi_multiple(matrix, "dfkm")
            let agjp = gi_multiple(matrix, "agjp")
            let bhkm = gi_multiple(matrix, "bhkm")
            let celn = gi_multiple(matrix, "celn")
            let dfio = gi_multiple(matrix, "dfio")

            let a3 = agln.sub(bhio).add(cejp).sub(dfkm).sub(agjp).add(bhkm).sub(celn).add(dfio)
            return {
                flow: [
                    divider,
                    p(`${name}3 = ${agln} ${fSub(bhio)} ${fAdd(cejp)} ${fSub(dfkm)} ${fSub(agjp)} ${fAdd(bhkm)} ${fSub(celn)} ${fAdd(dfio)}`),
                    p(`${name}3 = ${formatNum(a3)}`)
                ],
                result: a3
            }
        }

        let a1 = generate_a1(data)
        let a2 = generate_a2(data)
        let a3 = generate_a3(data)
        let result = a1.result.add(a2.result).add(a3.result)

        return {
            flow: a1.flow.concat(a2.flow).concat(a3.flow).concat([
                divider,
                p(`|${name}| = ${formatNum(a1.result)} ${fAdd(a2.result)} ${fAdd(a3.result)}`),
                p(`|${name}| = ${formatNum(result)}`)
            ]).join(""),
            result: result
        }
    }

    determinant_cofactor() {
        let data = this.data
        let name = this.name

        let flow = [divider, divider, `|${name}| = `]
        let flow1 = []
        let flow2 = `|${name}| = `
        let flow3 = `|${name}| = `
        let result = math.fraction(0)

        iter(data, (i, _) => {
            let minor = this.minor(0, i, data)
            let det = this.determinant(Matrix.SARRUS, minor)
            let k = data[0][i]
            let kdet = k.mul(det.result)

            if (i === 0) {
                result = result.add(kdet)

                flow1.push({
                    k: k,
                    operator: "",
                    data: minor
                })
                flow2 += `${this.formatNum(k)}(${this.formatNum(det.result)})`
                flow3 += `${this.formatNum(kdet)}`
            } else if (i % 2 === 0) {
                result = result.add(kdet)

                flow1.push({
                    k: k,
                    operator: "+",
                    data: minor
                })
                flow2 += ` + ${this.formatNum(k)}(${this.formatNum(det.result)})`
                flow3 += this.fAdd(kdet) + " "
            } else {
                result = result.sub(kdet)
                flow1.push({
                    k: k,
                    operator: "-",
                    data: minor
                })
                flow2 += ` - ${this.formatNum(k)}(${this.formatNum(det.result)})`
                flow3 += this.fSub(kdet) + " "
            }
        })

        return {
            flow: [
                divider,
                flow.join(""),
                this.toString({others: flow1}),
                divider,
                p(flow2),
                p(flow3),
                divider,
                `|${name}| = ${this.formatNum(result)}`,
                divider
            ].join(""),
            result: result
        }
    }

    determinant_gauss() {
        let data = this.data
        let name = this.name
        let multiplier = 1
        let flow = []
        let sub

        // Swapping
        iter(data, (x, _) => {
            if (data[x][0] == 0 && data[x][1] == 0 && x != 2) {
                data[x] = [data[2], data[2] = data[x]][0]
                multiplier = -multiplier

                if(flow.length > 0) flow.push(divider)
                flow.push(p(`Swap row ${x + 1} with row 2, multiplier = ${multiplier}`))
                flow.push(this.toString({data: data}))
            }
        })
        iter(data, (x, _) => {
            if (data[x][0] == 0 && data[x][1] != 0 && x != 1) {
                data[x] = [data[1], data[1] = data[x]][0]
                multiplier = -multiplier

                if(flow.length > 0) flow.push(divider)
                flow.push(p(`Swap row ${x + 1} with row 2, multiplier = ${multiplier}`))
                flow.push(this.toString({data: data}))
            }
        })

        if(flow.length > 0) flow.push(divider)

        // Start Elimination
        sub = data[1][0].div(data[0][0])
        iter(data[1], (x, _) => {
            data[1][x] = data[1][x].sub(data[0][x].mul(sub))
        })
        flow.push(this.toString({data: data, name: "Row 2 - (Row 1 * Row 2 Col 1 / Row 1 Col 1)"}))

        sub = data[2][0].div(data[0][0])
        iter(data[2], (x, _) => {
            data[2][x] = data[2][x].sub(data[0][x].mul(sub))
        })
        flow.push(this.toString({data: data, name: "Row 3 - (Row 1 * Row 3 Col 1 / Row 1 Col 1)"}))

        sub = data[2][1].div(data[1][1])
        iter(data[2], (x, _) => {
            if (x > 0) data[2][x] = data[2][x].sub(data[1][x].mul(sub))
        })
        flow.push(this.toString({data: data, name: "Row 3 - (Row 2 * Row 3 Col 2 / Row 2 Col 2)"}))

        flow.push(divider)

        let result = data[0][0].mul(data[1][1]).mul(data[2][2]).mul(multiplier)
        flow.push(p(`|${name}| = ${multiplier} * ${data[0][0]} * ${data[1][1]} * ${data[2][2]}`))
        flow.push(p(`|${name}| = ${result}`))

        return {
            flow: flow.join(""),
            result: result
        }
    }

    transpose(data=null) {
        if (data == null) data = this.data
        let result = []
        for (let i = 0; i < data.length; i++) {
            result.push([])
            for (let j =0; j < data[i].length; j++) {
                result[i].push(data[j][i])
            }
        }
        return {
            flow: this.toString({data: result}),
            result: result
        }
    }

    minor(i_row, i_col, data=null) {
        let result = []
        if (data == null) data = this.data
        let index = 0

        iter(data, (i, row) => {
            if (i_row !== i) {
                result.push([])
                iter(row, (j, col) => {
                    if (i_col !== j) result[index].push(col)
                })
                index += 1
            }
        })

        return result
    }

    cofactor(i_row, i_col, data=null) {
        if (data == null) data = this.data
        let mnr = this.minor(i_row, i_col, data)
        let det = this.determinant(Matrix.SARRUS, mnr).result
        return {
            result: det.mul(((i_row + i_col) % 2 === 1 ? -1 : 1)),
            minor: mnr,
            k: det
        }
    }

    adjoint() {
        let data = this.transpose().result
        let name = this.name
        let result = []
        let flow = [divider, p(`Adjoint(${name}) =>`)]
        iter(data, (i_row, row) => {
            result.push([])
            let temp_flow = []
            iter(row, (i_col, _) => {
                let cof = this.cofactor(i_row, i_col, data)
                result[i_row].push(cof.result)
                temp_flow.push({
                    k: cof.k,
                    div: line.vertical,
                    data: cof.minor
                })
            })
            flow.push(this.toString({others: temp_flow}))
            flow.push(divider)
            if (i_row != data.length - 1) flow.push(line.horizontal)
        })

        return {
            flow: flow.join(""),
            result: result
        }
    }

    inverse_gauss() {
        let data = []
        let name = this.name

        let flow = [p(`Inverse ${name}`)]
        let result = []

        iter(this.data, (x, row) => {
            result.push([])
            data.push([])
            iter(row, (y, col) => {
                result[x].push(math.fraction(x == y ? 1 : 0))
                data[x].push(col)
            })
        })

        // appliying Gauss Jordan Elimination
        iter(data, (x, row) => {
            iter(row, (y, col) => {
                if (x != y) {
                    let ratio = data[y][x].div(data[x][x])
                    iter(data, (z, _) => {
                        data[y][z] = data[y][z].sub(ratio.mul(data[x][z]))
                        result[y][z] = result[y][z].sub(ratio.mul(result[x][z]))
                    })
                    flow.push(line.horizontal)
                    flow.push(this.toString({
                        others: [
                            {data: data, div: line.vertical},
                            {data: result, div: line.vertical}
                        ]
                    }))
                }
            })
        })

        // Row operation to make principal diagonal element to 1
        iter(data, (x, row) => {
            let divisor = data[x][x]
            iter(row, (y, _) => {
                data[x][y] = data[x][y].div(divisor)
                result[x][y] = result[x][y].div(divisor)
            })
            flow.push(line.horizontal)
            flow.push(this.toString({
                others: [
                    {data: data, div: line.vertical},
                    {data: result, div: line.vertical}
                ]
            }))
        })

        flow.push(this.toString({name: `Inverse ${name}`, data: result}))

        return {
            flow: flow.join(""),
            result: result
        }
    }

    inverse_adjoint() {
        let det = this.determinant()
        let adj = this.adjoint()
        let mul = (new Matrix(`Adjoint(${this.name})`, adj.result))
            .mul(math.fraction(1).div(det.result))
        return {
            flow: [
                det.flow,
                divider,
                adj.flow,
                divider,
                mul.flow
            ].join(""),
            result: mul.result
        }
    }

    inverse(method=Matrix.ADJOINT) {
        if (method == Matrix.ADJOINT) return this.inverse_adjoint()
        else return this.inverse_gauss()
    }
}
