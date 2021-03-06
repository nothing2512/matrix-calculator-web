!function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.math = t() : e.math = t()
}(this, function () {
    return n = {}, i.m = r = [, function (e, t, r) {
        var a;
        !function () {
            "use strict";

            function n(e) {
                return .5 * (Math.exp(e) + Math.exp(-e))
            }

            function i(e) {
                return .5 * (Math.exp(e) - Math.exp(-e))
            }

            var u = function () {
                throw SyntaxError("Invalid Param")
            };

            function o(e, t) {
                var r = Math.abs(e), n = Math.abs(t);
                return 0 === e ? Math.log(n) : 0 === t ? Math.log(r) : r < 3e3 && n < 3e3 ? .5 * Math.log(e * e + t * t) : Math.log(e / Math.cos(Math.atan2(t, e)))
            }

            function c(e, t) {
                if (!(this instanceof c)) return new c(e, t);
                t = function (e, t) {
                    var r = {re: 0, im: 0};
                    if (null == e) r.re = r.im = 0; else if (void 0 !== t) r.re = e, r.im = t; else switch (typeof e) {
                        case"object":
                            if ("im" in e && "re" in e) r.re = e.re, r.im = e.im; else if ("abs" in e && "arg" in e) {
                                if (!Number.isFinite(e.abs) && Number.isFinite(e.arg)) return c.INFINITY;
                                r.re = e.abs * Math.cos(e.arg), r.im = e.abs * Math.sin(e.arg)
                            } else if ("r" in e && "phi" in e) {
                                if (!Number.isFinite(e.r) && Number.isFinite(e.phi)) return c.INFINITY;
                                r.re = e.r * Math.cos(e.phi), r.im = e.r * Math.sin(e.phi)
                            } else 2 === e.length ? (r.re = e[0], r.im = e[1]) : u();
                            break;
                        case"string":
                            r.im = r.re = 0;
                            var n = e.match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g), i = 1, a = 0;
                            null === n && u();
                            for (var o = 0; o < n.length; o++) {
                                var s = n[o];
                                " " === s || "\t" === s || "\n" === s || ("+" === s ? i++ : "-" === s ? a++ : i = a = ("i" === s || "I" === s ? (i + a === 0 && u(), " " === n[o + 1] || isNaN(n[o + 1]) ? r.im += parseFloat((a % 2 ? "-" : "") + "1") : (r.im += parseFloat((a % 2 ? "-" : "") + n[o + 1]), o++)) : (i + a !== 0 && !isNaN(s) || u(), "i" === n[o + 1] || "I" === n[o + 1] ? (r.im += parseFloat((a % 2 ? "-" : "") + s), o++) : r.re += parseFloat((a % 2 ? "-" : "") + s)), 0))
                            }
                            0 < i + a && u();
                            break;
                        case"number":
                            r.im = 0, r.re = e;
                            break;
                        default:
                            u()
                    }
                    return isNaN(r.re) || isNaN(r.im), r
                }(e, t);
                this.re = t.re, this.im = t.im
            }

            c.prototype = {
                re: 0, im: 0, sign: function () {
                    var e = this.abs();
                    return new c(this.re / e, this.im / e)
                }, add: function (e, t) {
                    t = new c(e, t);
                    return this.isInfinite() && t.isInfinite() ? c.NAN : this.isInfinite() || t.isInfinite() ? c.INFINITY : new c(this.re + t.re, this.im + t.im)
                }, sub: function (e, t) {
                    t = new c(e, t);
                    return this.isInfinite() && t.isInfinite() ? c.NAN : this.isInfinite() || t.isInfinite() ? c.INFINITY : new c(this.re - t.re, this.im - t.im)
                }, mul: function (e, t) {
                    t = new c(e, t);
                    return this.isInfinite() && t.isZero() || this.isZero() && t.isInfinite() ? c.NAN : this.isInfinite() || t.isInfinite() ? c.INFINITY : 0 === t.im && 0 === this.im ? new c(this.re * t.re, 0) : new c(this.re * t.re - this.im * t.im, this.re * t.im + this.im * t.re)
                }, div: function (e, t) {
                    var r = new c(e, t);
                    if (this.isZero() && r.isZero() || this.isInfinite() && r.isInfinite()) return c.NAN;
                    if (this.isInfinite() || r.isZero()) return c.INFINITY;
                    if (this.isZero() || r.isInfinite()) return c.ZERO;
                    e = this.re, t = this.im;
                    var n, i, a = r.re, r = r.im;
                    return 0 === r ? new c(e / a, t / a) : Math.abs(a) < Math.abs(r) ? new c((e * (i = a / r) + t) / (n = a * i + r), (t * i - e) / n) : new c((e + t * (i = r / a)) / (n = r * i + a), (t - e * i) / n)
                }, pow: function (e, t) {
                    var r = new c(e, t);
                    if (e = this.re, t = this.im, r.isZero()) return c.ONE;
                    if (0 === r.im) {
                        if (0 === t && 0 <= e) return new c(Math.pow(e, r.re), 0);
                        if (0 === e) switch ((r.re % 4 + 4) % 4) {
                            case 0:
                                return new c(Math.pow(t, r.re), 0);
                            case 1:
                                return new c(0, Math.pow(t, r.re));
                            case 2:
                                return new c(-Math.pow(t, r.re), 0);
                            case 3:
                                return new c(0, -Math.pow(t, r.re))
                        }
                    }
                    if (0 === e && 0 === t && 0 < r.re && 0 <= r.im) return c.ZERO;
                    var n = Math.atan2(t, e), i = o(e, t);
                    return e = Math.exp(r.re * i - r.im * n), t = r.im * i + r.re * n, new c(e * Math.cos(t), e * Math.sin(t))
                }, sqrt: function () {
                    var e, t = this.re, r = this.im, n = this.abs();
                    if (0 <= t) {
                        if (0 === r) return new c(Math.sqrt(t), 0);
                        e = .5 * Math.sqrt(2 * (n + t))
                    } else e = Math.abs(r) / Math.sqrt(2 * (n - t));
                    return t = t <= 0 ? .5 * Math.sqrt(2 * (n - t)) : Math.abs(r) / Math.sqrt(2 * (n + t)), new c(e, r < 0 ? -t : t)
                }, exp: function () {
                    var e = Math.exp(this.re);
                    return this.im, new c(e * Math.cos(this.im), e * Math.sin(this.im))
                }, expm1: function () {
                    var e = this.re, t = this.im;
                    return new c(Math.expm1(e) * Math.cos(t) + function (e) {
                        var t = Math.PI / 4;
                        if (e < -t || t < e) return Math.cos(e) - 1;
                        e *= e;
                        return e * (e * (1 / 24 + e * (-1 / 720 + e * (1 / 40320 + e * (-1 / 3628800 + e * (1 / 4790014600 + e * (-1 / 87178291200 + 1 / 20922789888e3 * e)))))) - .5)
                    }(t), Math.exp(e) * Math.sin(t))
                }, log: function () {
                    var e = this.re, t = this.im;
                    return new c(o(e, t), Math.atan2(t, e))
                }, abs: function () {
                    return e = this.re, t = this.im, r = Math.abs(e), n = Math.abs(t), r < 3e3 && n < 3e3 ? Math.sqrt(r * r + n * n) : (n = r < n ? (r = n, e / t) : t / e, r * Math.sqrt(1 + n * n));
                    var e, t, r, n
                }, arg: function () {
                    return Math.atan2(this.im, this.re)
                }, sin: function () {
                    var e = this.re, t = this.im;
                    return new c(Math.sin(e) * n(t), Math.cos(e) * i(t))
                }, cos: function () {
                    var e = this.re, t = this.im;
                    return new c(Math.cos(e) * n(t), -Math.sin(e) * i(t))
                }, tan: function () {
                    var e = 2 * this.re, t = 2 * this.im, r = Math.cos(e) + n(t);
                    return new c(Math.sin(e) / r, i(t) / r)
                }, cot: function () {
                    var e = 2 * this.re, t = 2 * this.im, r = Math.cos(e) - n(t);
                    return new c(-Math.sin(e) / r, i(t) / r)
                }, sec: function () {
                    var e = this.re, t = this.im, r = .5 * n(2 * t) + .5 * Math.cos(2 * e);
                    return new c(Math.cos(e) * n(t) / r, Math.sin(e) * i(t) / r)
                }, csc: function () {
                    var e = this.re, t = this.im, r = .5 * n(2 * t) - .5 * Math.cos(2 * e);
                    return new c(Math.sin(e) * n(t) / r, -Math.cos(e) * i(t) / r)
                }, asin: function () {
                    var e = this.re, t = this.im, r = new c(t * t - e * e + 1, -2 * e * t).sqrt(),
                        e = new c(r.re - t, r.im + e).log();
                    return new c(e.im, -e.re)
                }, acos: function () {
                    var e = this.re, t = this.im, r = new c(t * t - e * e + 1, -2 * e * t).sqrt(),
                        e = new c(r.re - t, r.im + e).log();
                    return new c(Math.PI / 2 - e.im, e.re)
                }, atan: function () {
                    var e = this.re, t = this.im;
                    if (0 === e) {
                        if (1 === t) return new c(0, 1 / 0);
                        if (-1 === t) return new c(0, -1 / 0)
                    }
                    var r = e * e + (1 - t) * (1 - t), r = new c((1 - t * t - e * e) / r, -2 * e / r).log();
                    return new c(-.5 * r.im, .5 * r.re)
                }, acot: function () {
                    var e = this.re, t = this.im;
                    if (0 === t) return new c(Math.atan2(1, e), 0);
                    var r = e * e + t * t;
                    return (0 != r ? new c(e / r, -t / r) : new c(0 !== e ? e / 0 : 0, 0 !== t ? -t / 0 : 0)).atan()
                }, asec: function () {
                    var e = this.re, t = this.im;
                    if (0 === e && 0 === t) return new c(0, 1 / 0);
                    var r = e * e + t * t;
                    return (0 != r ? new c(e / r, -t / r) : new c(0 !== e ? e / 0 : 0, 0 !== t ? -t / 0 : 0)).acos()
                }, acsc: function () {
                    var e = this.re, t = this.im;
                    if (0 === e && 0 === t) return new c(Math.PI / 2, 1 / 0);
                    var r = e * e + t * t;
                    return (0 != r ? new c(e / r, -t / r) : new c(0 !== e ? e / 0 : 0, 0 !== t ? -t / 0 : 0)).asin()
                }, sinh: function () {
                    var e = this.re, t = this.im;
                    return new c(i(e) * Math.cos(t), n(e) * Math.sin(t))
                }, cosh: function () {
                    var e = this.re, t = this.im;
                    return new c(n(e) * Math.cos(t), i(e) * Math.sin(t))
                }, tanh: function () {
                    var e = 2 * this.re, t = 2 * this.im, r = n(e) + Math.cos(t);
                    return new c(i(e) / r, Math.sin(t) / r)
                }, coth: function () {
                    var e = 2 * this.re, t = 2 * this.im, r = n(e) - Math.cos(t);
                    return new c(i(e) / r, -Math.sin(t) / r)
                }, csch: function () {
                    var e = this.re, t = this.im, r = Math.cos(2 * t) - n(2 * e);
                    return new c(-2 * i(e) * Math.cos(t) / r, 2 * n(e) * Math.sin(t) / r)
                }, sech: function () {
                    var e = this.re, t = this.im, r = Math.cos(2 * t) + n(2 * e);
                    return new c(2 * n(e) * Math.cos(t) / r, -2 * i(e) * Math.sin(t) / r)
                }, asinh: function () {
                    var e = this.im;
                    this.im = -this.re, this.re = e;
                    var t = this.asin();
                    return this.re = -this.im, this.im = e, e = t.re, t.re = -t.im, t.im = e, t
                }, acosh: function () {
                    var e, t = this.acos();
                    return t.im <= 0 ? (e = t.re, t.re = -t.im, t.im = e) : (e = t.im, t.im = -t.re, t.re = e), t
                }, atanh: function () {
                    var e = this.re, t = this.im, r = 1 < e && 0 === t, n = 1 - e, i = 1 + e, a = n * n + t * t,
                        e = 0 != a ? new c((i * n - t * t) / a, (t * n + i * t) / a) : new c(-1 !== e ? e / 0 : 0, 0 !== t ? t / 0 : 0),
                        t = e.re;
                    return e.re = o(e.re, e.im) / 2, e.im = Math.atan2(e.im, t) / 2, r && (e.im = -e.im), e
                }, acoth: function () {
                    var e = this.re, t = this.im;
                    if (0 === e && 0 === t) return new c(0, Math.PI / 2);
                    var r = e * e + t * t;
                    return (0 != r ? new c(e / r, -t / r) : new c(0 !== e ? e / 0 : 0, 0 !== t ? -t / 0 : 0)).atanh()
                }, acsch: function () {
                    var e = this.re, t = this.im;
                    if (0 === t) return new c(0 !== e ? Math.log(e + Math.sqrt(e * e + 1)) : 1 / 0, 0);
                    var r = e * e + t * t;
                    return (0 != r ? new c(e / r, -t / r) : new c(0 !== e ? e / 0 : 0, 0 !== t ? -t / 0 : 0)).asinh()
                }, asech: function () {
                    var e = this.re, t = this.im;
                    if (this.isZero()) return c.INFINITY;
                    var r = e * e + t * t;
                    return (0 != r ? new c(e / r, -t / r) : new c(0 !== e ? e / 0 : 0, 0 !== t ? -t / 0 : 0)).acosh()
                }, inverse: function () {
                    if (this.isZero()) return c.INFINITY;
                    if (this.isInfinite()) return c.ZERO;
                    var e = this.re, t = this.im, r = e * e + t * t;
                    return new c(e / r, -t / r)
                }, conjugate: function () {
                    return new c(this.re, -this.im)
                }, neg: function () {
                    return new c(-this.re, -this.im)
                }, ceil: function (e) {
                    return e = Math.pow(10, e || 0), new c(Math.ceil(this.re * e) / e, Math.ceil(this.im * e) / e)
                }, floor: function (e) {
                    return e = Math.pow(10, e || 0), new c(Math.floor(this.re * e) / e, Math.floor(this.im * e) / e)
                }, round: function (e) {
                    return e = Math.pow(10, e || 0), new c(Math.round(this.re * e) / e, Math.round(this.im * e) / e)
                }, equals: function (e, t) {
                    t = new c(e, t);
                    return Math.abs(t.re - this.re) <= c.EPSILON && Math.abs(t.im - this.im) <= c.EPSILON
                }, clone: function () {
                    return new c(this.re, this.im)
                }, toString: function () {
                    var e = this.re, t = this.im, r = "";
                    return this.isNaN() ? "NaN" : this.isZero() ? "0" : this.isInfinite() ? "Infinity" : (0 !== e && (r += e), 0 !== t && (0 !== e ? r += t < 0 ? " - " : " + " : t < 0 && (r += "-"), 1 !== (t = Math.abs(t)) && (r += t), r += "i"), r || "0")
                }, toVector: function () {
                    return [this.re, this.im]
                }, valueOf: function () {
                    return 0 === this.im ? this.re : null
                }, isNaN: function () {
                    return isNaN(this.re) || isNaN(this.im)
                }, isZero: function () {
                    return !(0 !== this.re && -0 !== this.re || 0 !== this.im && -0 !== this.im)
                }, isFinite: function () {
                    return isFinite(this.re) && isFinite(this.im)
                }, isInfinite: function () {
                    return !(this.isNaN() || this.isFinite())
                }
            }, c.ZERO = new c(0, 0), c.ONE = new c(1, 0), c.I = new c(0, 1), c.PI = new c(Math.PI, 0), c.E = new c(Math.E, 0), c.INFINITY = new c(1 / 0, 1 / 0), c.NAN = new c(NaN, NaN), c.EPSILON = 1e-16, void 0 === (a = function () {
                return c
            }.apply(t, [])) || (e.exports = a)
        }()
    }, function (e, t) {
        e.exports = function () {
            throw new Error("define cannot be used indirect")
        }
    }, function (n, i, e) {
        var a;
        !function () {
            "use strict";
            var d = {s: 1, n: 0, d: 1};

            function e(t) {
                function e() {
                    var e = Error.apply(this, arguments);
                    e.name = this.name = t, this.stack = e.stack, this.message = e.message
                }

                function r() {
                }

                return r.prototype = Error.prototype, e.prototype = new r, e
            }

            var y = u.DivisionByZero = e("DivisionByZero"), t = u.InvalidParameter = e("InvalidParameter");

            function g(e, t) {
                return isNaN(e = parseInt(e, 10)) && v(), e * t
            }

            function v() {
                throw new t
            }

            var r = function (e, t) {
                var r, n = 0, i = 1, a = 1, o = 0, s = 0, u = 0, c = 1, f = 1, l = 0, p = 1, m = 1, h = 1;
                if (null != e) if (void 0 !== t) a = (n = e) * (i = t); else switch (typeof e) {
                    case"object":
                        "d" in e && "n" in e ? (n = e.n, i = e.d, "s" in e && (n *= e.s)) : 0 in e ? (n = e[0], 1 in e && (i = e[1])) : v(), a = n * i;
                        break;
                    case"number":
                        if (e < 0 && (e = -(a = e)), e % 1 == 0) n = e; else if (0 < e) {
                            for (1 <= e && (e /= f = Math.pow(10, Math.floor(1 + Math.log(e) / Math.LN10))); p <= 1e7 && h <= 1e7;) {
                                if (e === (r = (l + m) / (p + h))) {
                                    i = p + h <= 1e7 ? (n = l + m, p + h) : p < h ? (n = m, h) : (n = l, p);
                                    break
                                }
                                r < e ? (l += m, p += h) : (m += l, h += p), i = 1e7 < p ? (n = m, h) : (n = l, p)
                            }
                            n *= f
                        } else (isNaN(e) || isNaN(t)) && (i = n = NaN);
                        break;
                    case"string":
                        if (null === (p = e.match(/\d+|./g)) && v(), "-" === p[l] ? (a = -1, l++) : "+" === p[l] && l++, p.length === l + 1 ? s = g(p[l++], a) : "." === p[l + 1] || "." === p[l] ? ("." !== p[l] && (o = g(p[l++], a)), (++l + 1 === p.length || "(" === p[l + 1] && ")" === p[l + 3] || "'" === p[l + 1] && "'" === p[l + 3]) && (s = g(p[l], a), c = Math.pow(10, p[l].length), l++), ("(" === p[l] && ")" === p[l + 2] || "'" === p[l] && "'" === p[l + 2]) && (u = g(p[l + 1], a), f = Math.pow(10, p[l + 1].length) - 1, l += 3)) : "/" === p[l + 1] || ":" === p[l + 1] ? (s = g(p[l], a), c = g(p[l + 2], 1), l += 3) : "/" === p[l + 3] && " " === p[l + 1] && (o = g(p[l], a), s = g(p[l + 2], a), c = g(p[l + 4], 1), l += 5), p.length <= l) {
                            a = n = u + (i = c * f) * o + f * s;
                            break
                        }
                    default:
                        v()
                }
                if (0 === i) d.s = 1, d.n = 0, d.d = 1
                else d.s = a < 0 ? -1 : 1, d.n = Math.abs(n), d.d = Math.abs(i)
            };

            function s(e, t) {
                if (!e) return t;
                if (!t) return e;
                for (; ;) {
                    if (!(e %= t)) return t;
                    if (!(t %= e)) return e
                }
            }

            function u(e, t) {
                if (!(this instanceof u)) return new u(e, t);
                r(e, t), e = u.REDUCE ? s(d.d, d.n) : 1, this.s = d.s, this.n = d.n / e, this.d = d.d / e
            }

            u.REDUCE = 1, u.prototype = {
                s: 1, n: 0, d: 1, abs: function () {
                    return new u(this.n, this.d)
                }, neg: function () {
                    return new u(-this.s * this.n, this.d)
                }, add: function (e, t) {
                    return r(e, t), new u(this.s * this.n * d.d + d.s * this.d * d.n, this.d * d.d)
                }, sub: function (e, t) {
                    return r(e, t), new u(this.s * this.n * d.d - d.s * this.d * d.n, this.d * d.d)
                }, mul: function (e, t) {
                    return r(e, t), new u(this.s * d.s * this.n * d.n, this.d * d.d)
                }, div: function (e, t) {
                    return r(e, t), new u(this.s * d.s * this.n * d.d, this.d * d.n)
                }, clone: function () {
                    return new u(this)
                }, mod: function (e, t) {
                    return isNaN(this.n) || isNaN(this.d) ? new u(NaN) : void 0 === e ? new u(this.s * this.n % this.d, 1) : (r(e, t), 0 === d.n && 0 === this.d && u(0, 0), new u(this.s * (d.d * this.n) % (d.n * this.d), d.d * this.d))
                }, gcd: function (e, t) {
                    return r(e, t), new u(s(d.n, this.n) * s(d.d, this.d), d.d * this.d)
                }, lcm: function (e, t) {
                    return r(e, t), 0 === d.n && 0 === this.n ? new u : new u(d.n * this.n, s(d.n, this.n) * s(d.d, this.d))
                }, ceil: function (e) {
                    return e = Math.pow(10, e || 0), isNaN(this.n) || isNaN(this.d) ? new u(NaN) : new u(Math.ceil(e * this.s * this.n / this.d), e)
                }, floor: function (e) {
                    return e = Math.pow(10, e || 0), isNaN(this.n) || isNaN(this.d) ? new u(NaN) : new u(Math.floor(e * this.s * this.n / this.d), e)
                }, round: function (e) {
                    return e = Math.pow(10, e || 0), isNaN(this.n) || isNaN(this.d) ? new u(NaN) : new u(Math.round(e * this.s * this.n / this.d), e)
                }, inverse: function () {
                    return new u(this.s * this.d, this.n)
                }, pow: function (e) {
                    return e < 0 ? new u(Math.pow(this.s * this.d, -e), Math.pow(this.n, -e)) : new u(Math.pow(this.s * this.n, e), Math.pow(this.d, e))
                }, equals: function (e, t) {
                    return r(e, t), this.s * this.n * d.d == d.s * d.n * this.d
                }, compare: function (e, t) {
                    r(e, t);
                    t = this.s * this.n * d.d - d.s * d.n * this.d;
                    return (0 < t) - (t < 0)
                }, simplify: function (e) {
                    if (isNaN(this.n) || isNaN(this.d)) return this;
                    var t = this.abs().toContinued();
                    e = e || .001;
                    for (var r = 0; r < t.length; r++) {
                        var n = function e(t) {
                            return 1 === t.length ? new u(t[0]) : e(t.slice(1)).inverse().add(t[0])
                        }(t.slice(0, r + 1));
                        if (n.sub(this.abs()).abs().valueOf() < e) return n.mul(this.s)
                    }
                    return this
                }, divisible: function (e, t) {
                    return r(e, t), !(!(d.n * this.d) || this.n * d.d % (d.n * this.d))
                }, valueOf: function () {
                    return this.s * this.n / this.d
                }, toFraction: function (e) {
                    var t, r = "", n = this.n, i = this.d;
                    return this.s < 0 && (r += "-"), 1 === i ? r += n : (e && 0 < (t = Math.floor(n / i)) && (r += t, r += " ", n %= i), r += n, r += "/", r += i), r
                }, toLatex: function (e) {
                    var t, r = "", n = this.n, i = this.d;
                    return this.s < 0 && (r += "-"), 1 === i ? r += n : (e && 0 < (t = Math.floor(n / i)) && (r += t, n %= i), r += "\\frac{", r += n, r += "}{", r += i, r += "}"), r
                }, toContinued: function () {
                    var e, t = this.n, r = this.d, n = [];
                    if (isNaN(t) || isNaN(r)) return n;
                    for (; n.push(Math.floor(t / r)), e = t % r, t = r, r = e, 1 !== t;) ;
                    return n
                }, toString: function (e) {
                    var t = this.n, r = this.d;
                    if (isNaN(t) || isNaN(r)) return "NaN";
                    u.REDUCE || (t /= n = s(t, r), r /= n), e = e || 15;
                    var i = function (e) {
                        for (; e % 2 == 0; e /= 2) ;
                        for (; e % 5 == 0; e /= 5) ;
                        if (1 === e) return 0;
                        for (var t = 10 % e, r = 1; 1 !== t; r++) if (t = 10 * t % e, 2e3 < r) return 0;
                        return r
                    }(r), n = function (e) {
                        for (var t = 1, r = function (e, t, r) {
                            for (var n = 1; 0 < t; e = e * e % r, t >>= 1) 1 & t && (n = n * e % r);
                            return n
                        }(10, i, e), n = 0; n < 300; n++) {
                            if (t === r) return n;
                            t = 10 * t % e, r = 10 * r % e
                        }
                        return 0
                    }(r), a = -1 === this.s ? "-" : "";
                    if (a += t / r | 0, t %= r, (t *= 10) && (a += "."), i) {
                        for (var o = n; o--;) a += t / r | 0, t %= r, t *= 10;
                        for (a += "(", o = i; o--;) a += t / r | 0, t %= r, t *= 10;
                        a += ")"
                    } else for (o = e; t && o--;) a += t / r | 0, t %= r, t *= 10;
                    return a
                }
            }, void 0 === (a = function () {
                return u
            }.apply(i, [])) || (n.exports = a)
        }()
    }, function (e, t) {
        e.exports = function t(e, r) {
            "use strict";

            function n(e) {
                return t.insensitive && ("" + e).toLowerCase() || "" + e
            }

            var i, a, o = /(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi,
                s = /(^[ ]*|[ ]*$)/g,
                u = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
                c = /^0x[0-9a-f]+$/i, f = /^0/, e = n(e).replace(s, "") || "", s = n(r).replace(s, "") || "",
                l = e.replace(o, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"),
                p = s.replace(o, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"),
                e = parseInt(e.match(c), 16) || 1 !== l.length && e.match(u) && Date.parse(e),
                s = parseInt(s.match(c), 16) || e && s.match(u) && Date.parse(s) || null;
            if (s) {
                if (e < s) return -1;
                if (s < e) return 1
            }
            for (var m = 0, h = Math.max(l.length, p.length); m < h; m++) {
                if (i = !(l[m] || "").match(f) && parseFloat(l[m]) || l[m] || 0, a = !(p[m] || "").match(f) && parseFloat(p[m]) || p[m] || 0, isNaN(i) !== isNaN(a)) return isNaN(i) ? 1 : -1;
                if (typeof i != typeof a && (i += "", a += ""), i < a) return -1;
                if (a < i) return 1
            }
            return 0
        }
    }, function (e, t) {
        e.exports = function (e) {
            return e.webpackPolyfill || (e.deprecate = function () {
            }, e.paths = [], e.children || (e.children = []), Object.defineProperty(e, "loaded", {
                enumerable: !0,
                get: function () {
                    return e.l
                }
            }), Object.defineProperty(e, "id", {
                enumerable: !0, get: function () {
                    return e.i
                }
            }), e.webpackPolyfill = 1), e
        }
    }, function (t, e) {
        (function (e) {
            t.exports = e
        }).call(this, {})
    }, function (t, qe, Ie) {
        var Be;
        !function () {
            "use strict";
            var f, _, a, o = 9e15, h = "0123456789abcdef",
                n = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058",
                i = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789",
                s = {precision: 20, rounding: 4, modulo: 1, toExpNeg: -7, toExpPos: 21, minE: -o, maxE: o, crypto: !1},
                x = !0, d = "[DecimalError] Invalid argument: ", T = Math.floor, y = Math.pow,
                l = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,
                p = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,
                m = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i, u = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, z = 1e7,
                c = n.length - 1, g = i.length - 1, v = {name: "[object Decimal]"};

            function b(e) {
                var t, r, n, i = e.length - 1, a = "", o = e[0];
                if (0 < i) {
                    for (a += o, t = 1; t < i; t++) (r = 7 - (n = e[t] + "").length) && (a += R(r)), a += n;
                    (r = 7 - (n = (o = e[t]) + "").length) && (a += R(r))
                } else if (0 === o) return "0";
                for (; o % 10 == 0;) o /= 10;
                return a + o
            }

            function w(e, t, r) {
                if (e !== ~~e || e < t || r < e) throw Error(d + e)
            }

            function N(e, t, r, n) {
                for (var i, a, o = e[0]; 10 <= o; o /= 10) --t;
                return --t < 0 ? (t += 7, i = 0) : (i = Math.ceil((t + 1) / 7), t %= 7), o = y(10, 7 - t), a = e[i] % o | 0, null == n ? t < 3 ? (0 == t ? a = a / 100 | 0 : 1 == t && (a = a / 10 | 0), r < 4 && 99999 == a || 3 < r && 49999 == a || 5e4 == a || 0 == a) : (r < 4 && a + 1 == o || 3 < r && a + 1 == o / 2) && (e[i + 1] / o / 100 | 0) == y(10, t - 2) - 1 || (a == o / 2 || 0 == a) && 0 == (e[i + 1] / o / 100 | 0) : t < 4 ? (0 == t ? a = a / 1e3 | 0 : 1 == t ? a = a / 100 | 0 : 2 == t && (a = a / 10 | 0), (n || r < 4) && 9999 == a || !n && 3 < r && 4999 == a) : ((n || r < 4) && a + 1 == o || !n && 3 < r && a + 1 == o / 2) && (e[i + 1] / o / 1e3 | 0) == y(10, t - 3) - 1
            }

            function M(e, t, r) {
                for (var n, i, a = [0], o = 0, s = e.length; o < s;) {
                    for (i = a.length; i--;) a[i] *= t;
                    for (a[0] += h.indexOf(e.charAt(o++)), n = 0; n < a.length; n++) a[n] > r - 1 && (void 0 === a[n + 1] && (a[n + 1] = 0), a[n + 1] += a[n] / r | 0, a[n] %= r)
                }
                return a.reverse()
            }

            v.absoluteValue = v.abs = function () {
                var e = new this.constructor(this);
                return e.s < 0 && (e.s = 1), k(e)
            }, v.ceil = function () {
                return k(new this.constructor(this), this.e + 1, 2)
            }, v.comparedTo = v.cmp = function (e) {
                var t, r, n = this, i = n.d, a = (e = new n.constructor(e)).d, o = n.s, s = e.s;
                if (!i || !a) return o && s ? o !== s ? o : i === a ? 0 : !i ^ o < 0 ? 1 : -1 : NaN;
                if (!i[0] || !a[0]) return i[0] ? o : a[0] ? -s : 0;
                if (o !== s) return o;
                if (n.e !== e.e) return n.e > e.e ^ o < 0 ? 1 : -1;
                for (t = 0, r = (n = i.length) < (e = a.length) ? n : e; t < r; ++t) if (i[t] !== a[t]) return i[t] > a[t] ^ o < 0 ? 1 : -1;
                return n === e ? 0 : e < n ^ o < 0 ? 1 : -1
            }, v.cosine = v.cos = function () {
                var e, t, r = this, n = r.constructor;
                return r.d ? r.d[0] ? (e = n.precision, t = n.rounding, n.precision = e + Math.max(r.e, r.sd()) + 7, n.rounding = 1, r = function (e, t) {
                    var r, n = t.d.length,
                        n = n < 32 ? (1 / G(4, r = Math.ceil(n / 3))).toString() : (r = 16, "2.3283064365386962890625e-10");
                    e.precision += r, t = $(e, 1, t.times(n), new e(1));
                    for (var i = r; i--;) {
                        var a = t.times(t);
                        t = a.times(a).minus(a).times(8).plus(1)
                    }
                    return e.precision -= r, t
                }(n, V(n, r)), n.precision = e, n.rounding = t, k(2 == a || 3 == a ? r.neg() : r, e, t, !0)) : new n(1) : new n(NaN)
            }, v.cubeRoot = v.cbrt = function () {
                var e, t, r, n, i, a, o, s, u, c, f = this, l = f.constructor;
                if (!f.isFinite() || f.isZero()) return new l(f);
                for (x = !1, (a = f.s * y(f.s * f, 1 / 3)) && Math.abs(a) != 1 / 0 ? n = new l(a.toString()) : (r = b(f.d), (a = ((e = f.e) - r.length + 1) % 3) && (r += 1 == a || -2 == a ? "0" : "00"), a = y(r, 1 / 3), e = T((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2)), (n = new l(r = a == 1 / 0 ? "5e" + e : (r = a.toExponential()).slice(0, r.indexOf("e") + 1) + e)).s = f.s), o = (e = l.precision) + 3; ;) if (c = (u = (s = n).times(s).times(s)).plus(f), n = S(c.plus(f).times(s), c.plus(u), o + 2, 1), b(s.d).slice(0, o) === (r = b(n.d)).slice(0, o)) {
                    if ("9999" != (r = r.slice(o - 3, o + 1)) && (i || "4999" != r)) {
                        +r && (+r.slice(1) || "5" != r.charAt(0)) || (k(n, e + 1, 1), t = !n.times(n).times(n).eq(f));
                        break
                    }
                    if (!i && (k(s, e + 1, 0), s.times(s).times(s).eq(f))) {
                        n = s;
                        break
                    }
                    o += 4, i = 1
                }
                return x = !0, k(n, e, l.rounding, t)
            }, v.decimalPlaces = v.dp = function () {
                var e, t = this.d, r = NaN;
                if (t) {
                    if (r = 7 * ((e = t.length - 1) - T(this.e / 7)), e = t[e]) for (; e % 10 == 0; e /= 10) r--;
                    r < 0 && (r = 0)
                }
                return r
            }, v.dividedBy = v.div = function (e) {
                return S(this, new this.constructor(e))
            }, v.dividedToIntegerBy = v.divToInt = function (e) {
                var t = this.constructor;
                return k(S(this, new t(e), 0, 1, 1), t.precision, t.rounding)
            }, v.equals = v.eq = function (e) {
                return 0 === this.cmp(e)
            }, v.floor = function () {
                return k(new this.constructor(this), this.e + 1, 3)
            }, v.greaterThan = v.gt = function (e) {
                return 0 < this.cmp(e)
            }, v.greaterThanOrEqualTo = v.gte = function (e) {
                e = this.cmp(e);
                return 1 == e || 0 === e
            }, v.hyperbolicCosine = v.cosh = function () {
                var e, t, r, n, i = this, a = i.constructor, o = new a(1);
                if (!i.isFinite()) return new a(i.s ? 1 / 0 : NaN);
                if (i.isZero()) return o;
                t = a.precision, r = a.rounding, a.precision = t + Math.max(i.e, i.sd()) + 4, a.rounding = 1, n = (n = i.d.length) < 32 ? (1 / G(4, e = Math.ceil(n / 3))).toString() : (e = 16, "2.3283064365386962890625e-10"), i = $(a, 1, i.times(n), new a(1), !0);
                for (var s, u = e, c = new a(8); u--;) s = i.times(i), i = o.minus(s.times(c.minus(s.times(c))));
                return k(i, a.precision = t, a.rounding = r, !0)
            }, v.hyperbolicSine = v.sinh = function () {
                var e, t, r, n, i = this, a = i.constructor;
                if (!i.isFinite() || i.isZero()) return new a(i);
                if (t = a.precision, r = a.rounding, a.precision = t + Math.max(i.e, i.sd()) + 4, a.rounding = 1, (n = i.d.length) < 3) i = $(a, 2, i, i, !0); else {
                    e = 16 < (e = 1.4 * Math.sqrt(n)) ? 16 : 0 | e, i = $(a, 2, i = i.times(1 / G(5, e)), i, !0);
                    for (var o, s = new a(5), u = new a(16), c = new a(20); e--;) o = i.times(i), i = i.times(s.plus(o.times(u.times(o).plus(c))))
                }
                return k(i, a.precision = t, a.rounding = r, !0)
            }, v.hyperbolicTangent = v.tanh = function () {
                var e, t, r = this, n = r.constructor;
                return r.isFinite() ? r.isZero() ? new n(r) : (e = n.precision, t = n.rounding, n.precision = e + 7, n.rounding = 1, S(r.sinh(), r.cosh(), n.precision = e, n.rounding = t)) : new n(r.s)
            }, v.inverseCosine = v.acos = function () {
                var e = this, t = e.constructor, r = e.abs().cmp(1), n = t.precision, i = t.rounding;
                return -1 !== r ? 0 === r ? e.isNeg() ? C(t, n, i) : new t(0) : new t(NaN) : e.isZero() ? C(t, n + 4, i).times(.5) : (t.precision = n + 6, t.rounding = 1, e = e.asin(), r = C(t, n + 4, i).times(.5), t.precision = n, t.rounding = i, r.minus(e))
            }, v.inverseHyperbolicCosine = v.acosh = function () {
                var e, t, r = this, n = r.constructor;
                return r.lte(1) ? new n(r.eq(1) ? 0 : NaN) : r.isFinite() ? (e = n.precision, t = n.rounding, n.precision = e + Math.max(Math.abs(r.e), r.sd()) + 4, n.rounding = 1, x = !1, r = r.times(r).minus(1).sqrt().plus(r), x = !0, n.precision = e, n.rounding = t, r.ln()) : new n(r)
            }, v.inverseHyperbolicSine = v.asinh = function () {
                var e, t, r = this, n = r.constructor;
                return !r.isFinite() || r.isZero() ? new n(r) : (e = n.precision, t = n.rounding, n.precision = e + 2 * Math.max(Math.abs(r.e), r.sd()) + 6, n.rounding = 1, x = !1, r = r.times(r).plus(1).sqrt().plus(r), x = !0, n.precision = e, n.rounding = t, r.ln())
            }, v.inverseHyperbolicTangent = v.atanh = function () {
                var e, t, r, n = this, i = n.constructor;
                return n.isFinite() ? 0 <= n.e ? new i(n.abs().eq(1) ? n.s / 0 : n.isZero() ? n : NaN) : (e = i.precision, t = i.rounding, r = n.sd(), Math.max(r, e) < 2 * -n.e - 1 ? k(new i(n), e, t, !0) : (i.precision = r = r - n.e, n = S(n.plus(1), new i(1).minus(n), r + e, 1), i.precision = e + 4, i.rounding = 1, n = n.ln(), i.precision = e, i.rounding = t, n.times(.5))) : new i(NaN)
            }, v.inverseSine = v.asin = function () {
                var e, t, r, n = this, i = n.constructor;
                return n.isZero() ? new i(n) : (e = n.abs().cmp(1), t = i.precision, r = i.rounding, -1 !== e ? 0 === e ? ((e = C(i, t + 4, r).times(.5)).s = n.s, e) : new i(NaN) : (i.precision = t + 6, i.rounding = 1, n = n.div(new i(1).minus(n.times(n)).sqrt().plus(1)).atan(), i.precision = t, i.rounding = r, n.times(2)))
            }, v.inverseTangent = v.atan = function () {
                var e, t, r, n, i, a, o, s, u, c = this, f = c.constructor, l = f.precision, p = f.rounding;
                if (c.isFinite()) {
                    if (c.isZero()) return new f(c);
                    if (c.abs().eq(1) && l + 4 <= g) return (o = C(f, l + 4, p).times(.25)).s = c.s, o
                } else {
                    if (!c.s) return new f(NaN);
                    if (l + 4 <= g) return (o = C(f, l + 4, p).times(.5)).s = c.s, o
                }
                for (f.precision = s = l + 10, f.rounding = 1, e = r = Math.min(28, s / 7 + 2 | 0); e; --e) c = c.div(c.times(c).plus(1).sqrt().plus(1));
                for (x = !1, t = Math.ceil(s / 7), n = 1, u = c.times(c), o = new f(c), i = c; -1 !== e;) if (i = i.times(u), a = o.minus(i.div(n += 2)), i = i.times(u), void 0 !== (o = a.plus(i.div(n += 2))).d[t]) for (e = t; o.d[e] === a.d[e] && e--;) ;
                return r && (o = o.times(2 << r - 1)), x = !0, k(o, f.precision = l, f.rounding = p, !0)
            }, v.isFinite = function () {
                return !!this.d
            }, v.isInteger = v.isInt = function () {
                return !!this.d && T(this.e / 7) > this.d.length - 2
            }, v.isNaN = function () {
                return !this.s
            }, v.isNegative = v.isNeg = function () {
                return this.s < 0
            }, v.isPositive = v.isPos = function () {
                return 0 < this.s
            }, v.isZero = function () {
                return !!this.d && 0 === this.d[0]
            }, v.lessThan = v.lt = function (e) {
                return this.cmp(e) < 0
            }, v.lessThanOrEqualTo = v.lte = function (e) {
                return this.cmp(e) < 1
            }, v.logarithm = v.log = function (e) {
                var t, r, n, i, a, o, s, u, c = this.constructor, f = c.precision, l = c.rounding;
                if (null == e) e = new c(10), t = !0; else {
                    if (r = (e = new c(e)).d, e.s < 0 || !r || !r[0] || e.eq(1)) return new c(NaN);
                    t = e.eq(10)
                }
                if (r = this.d, this.s < 0 || !r || !r[0] || this.eq(1)) return new c(r && !r[0] ? -1 / 0 : 1 != this.s ? NaN : r ? 0 : 1 / 0);
                if (t) if (1 < r.length) a = !0; else {
                    for (i = r[0]; i % 10 == 0;) i /= 10;
                    a = 1 !== i
                }
                if (x = !1, o = F(this, s = f + 5), n = t ? O(c, s + 10) : F(e, s), N((u = S(o, n, s, 1)).d, i = f, l)) do {
                    if (o = F(this, s += 10), n = t ? O(c, s + 10) : F(e, s), u = S(o, n, s, 1), !a) {
                        +b(u.d).slice(i + 1, i + 15) + 1 == 1e14 && (u = k(u, f + 1, 0));
                        break
                    }
                } while (N(u.d, i += 10, l));
                return x = !0, k(u, f, l)
            }, v.minus = v.sub = function (e) {
                var t, r, n, i, a, o, s, u, c, f, l, p = this, m = p.constructor;
                if (e = new m(e), !p.d || !e.d) return p.s && e.s ? p.d ? e.s = -e.s : e = new m(e.d || p.s !== e.s ? p : NaN) : e = new m(NaN), e;
                if (p.s != e.s) return e.s = -e.s, p.plus(e);
                if (c = p.d, l = e.d, s = m.precision, u = m.rounding, !c[0] || !l[0]) {
                    if (l[0]) e.s = -e.s; else {
                        if (!c[0]) return new m(3 === u ? -0 : 0);
                        e = new m(p)
                    }
                    return x ? k(e, s, u) : e
                }
                if (r = T(e.e / 7), p = T(p.e / 7), c = c.slice(), a = p - r) {
                    for (o = (f = a < 0) ? (t = c, a = -a, l.length) : (t = l, r = p, c.length), a > (n = Math.max(Math.ceil(s / 7), o) + 2) && (a = n, t.length = 1), t.reverse(), n = a; n--;) t.push(0);
                    t.reverse()
                } else {
                    for ((f = (n = c.length) < (o = l.length)) && (o = n), n = 0; n < o; n++) if (c[n] != l[n]) {
                        f = c[n] < l[n];
                        break
                    }
                    a = 0
                }
                for (f && (t = c, c = l, l = t, e.s = -e.s), o = c.length, n = l.length - o; 0 < n; --n) c[o++] = 0;
                for (n = l.length; a < n;) {
                    if (c[--n] < l[n]) {
                        for (i = n; i && 0 === c[--i];) c[i] = z - 1;
                        --c[i], c[n] += z
                    }
                    c[n] -= l[n]
                }
                for (; 0 === c[--o];) c.pop();
                for (; 0 === c[0]; c.shift()) --r;
                return c[0] ? (e.d = c, e.e = A(c, r), x ? k(e, s, u) : e) : new m(3 === u ? -0 : 0)
            }, v.modulo = v.mod = function (e) {
                var t, r = this, n = r.constructor;
                return e = new n(e), !r.d || !e.s || e.d && !e.d[0] ? new n(NaN) : !e.d || r.d && !r.d[0] ? k(new n(r), n.precision, n.rounding) : (x = !1, 9 == n.modulo ? (t = S(r, e.abs(), 0, 3, 1)).s *= e.s : t = S(r, e, 0, n.modulo, 1), t = t.times(e), x = !0, r.minus(t))
            }, v.naturalExponential = v.exp = function () {
                return U(this)
            }, v.naturalLogarithm = v.ln = function () {
                return F(this)
            }, v.negated = v.neg = function () {
                var e = new this.constructor(this);
                return e.s = -e.s, k(e)
            }, v.plus = v.add = function (e) {
                var t, r, n, i, a, o, s, u, c = this, f = c.constructor;
                if (e = new f(e), !c.d || !e.d) return c.s && e.s ? c.d || (e = new f(e.d || c.s === e.s ? c : NaN)) : e = new f(NaN), e;
                if (c.s != e.s) return e.s = -e.s, c.minus(e);
                if (s = c.d, u = e.d, a = f.precision, o = f.rounding, !s[0] || !u[0]) return u[0] || (e = new f(c)), x ? k(e, a, o) : e;
                if (f = T(c.e / 7), c = T(e.e / 7), s = s.slice(), n = f - c) {
                    for (i = n < 0 ? (r = s, n = -n, u.length) : (r = u, c = f, s.length), n > (i = (f = Math.ceil(a / 7)) > i ? f + 1 : i + 1) && (n = i, r.length = 1), r.reverse(); n--;) r.push(0);
                    r.reverse()
                }
                for ((i = s.length) - (n = u.length) < 0 && (n = i, r = u, u = s, s = r), t = 0; n;) t = (s[--n] = s[n] + u[n] + t) / z | 0, s[n] %= z;
                for (t && (s.unshift(t), ++c), i = s.length; 0 == s[--i];) s.pop();
                return e.d = s, e.e = A(s, c), x ? k(e, a, o) : e
            }, v.precision = v.sd = function (e) {
                var t;
                if (void 0 !== e && e !== !!e && 1 !== e && 0 !== e) throw Error(d + e);
                return this.d ? (t = D(this.d), e && this.e + 1 > t && (t = this.e + 1)) : t = NaN, t
            }, v.round = function () {
                var e = this.constructor;
                return k(new e(this), this.e + 1, e.rounding)
            }, v.sine = v.sin = function () {
                var e, t, r = this, n = r.constructor;
                return r.isFinite() ? r.isZero() ? new n(r) : (e = n.precision, t = n.rounding, n.precision = e + Math.max(r.e, r.sd()) + 7, n.rounding = 1, r = function (e, t) {
                    var r, n = t.d.length;
                    if (n < 3) return $(e, 2, t, t);
                    r = 16 < (r = 1.4 * Math.sqrt(n)) ? 16 : 0 | r, t = $(e, 2, t = t.times(1 / G(5, r)), t);
                    for (var i, a = new e(5), o = new e(16), s = new e(20); r--;) i = t.times(t), t = t.times(a.plus(i.times(o.times(i).minus(s))));
                    return t
                }(n, V(n, r)), n.precision = e, n.rounding = t, k(2 < a ? r.neg() : r, e, t, !0)) : new n(NaN)
            }, v.squareRoot = v.sqrt = function () {
                var e, t, r, n, i, a, o = this, s = o.d, u = o.e, c = o.s, f = o.constructor;
                if (1 !== c || !s || !s[0]) return new f(!c || c < 0 && (!s || s[0]) ? NaN : s ? o : 1 / 0);
                for (x = !1, n = 0 == (c = Math.sqrt(+o)) || c == 1 / 0 ? (((t = b(s)).length + u) % 2 == 0 && (t += "0"), c = Math.sqrt(t), u = T((u + 1) / 2) - (u < 0 || u % 2), new f(t = c == 1 / 0 ? "5e" + u : (t = c.toExponential()).slice(0, t.indexOf("e") + 1) + u)) : new f(c.toString()), r = (u = f.precision) + 3; ;) if (n = (a = n).plus(S(o, a, r + 2, 1)).times(.5), b(a.d).slice(0, r) === (t = b(n.d)).slice(0, r)) {
                    if ("9999" != (t = t.slice(r - 3, r + 1)) && (i || "4999" != t)) {
                        +t && (+t.slice(1) || "5" != t.charAt(0)) || (k(n, u + 1, 1), e = !n.times(n).eq(o));
                        break
                    }
                    if (!i && (k(a, u + 1, 0), a.times(a).eq(o))) {
                        n = a;
                        break
                    }
                    r += 4, i = 1
                }
                return x = !0, k(n, u, f.rounding, e)
            }, v.tangent = v.tan = function () {
                var e, t, r = this, n = r.constructor;
                return r.isFinite() ? r.isZero() ? new n(r) : (e = n.precision, t = n.rounding, n.precision = e + 10, n.rounding = 1, (r = r.sin()).s = 1, r = S(r, new n(1).minus(r.times(r)).sqrt(), e + 10, 0), n.precision = e, n.rounding = t, k(2 == a || 4 == a ? r.neg() : r, e, t, !0)) : new n(NaN)
            }, v.times = v.mul = function (e) {
                var t, r, n, i, a, o, s, u, c, f = this.constructor, l = this.d, p = (e = new f(e)).d;
                if (e.s *= this.s, !(l && l[0] && p && p[0])) return new f(!e.s || l && !l[0] && !p || p && !p[0] && !l ? NaN : l && p ? 0 * e.s : e.s / 0);
                for (r = T(this.e / 7) + T(e.e / 7), (u = l.length) < (c = p.length) && (a = l, l = p, p = a, o = u, u = c, c = o), a = [], n = o = u + c; n--;) a.push(0);
                for (n = c; 0 <= --n;) {
                    for (t = 0, i = u + n; n < i;) s = a[i] + p[n] * l[i - n - 1] + t, a[i--] = s % z | 0, t = s / z | 0;
                    a[i] = (a[i] + t) % z | 0
                }
                for (; !a[--o];) a.pop();
                return t ? ++r : a.shift(), e.d = a, e.e = A(a, r), x ? k(e, f.precision, f.rounding) : e
            }, v.toBinary = function (e, t) {
                return r(this, 2, e, t)
            }, v.toDecimalPlaces = v.toDP = function (e, t) {
                var r = this.constructor, n = new r(this);
                return void 0 === e ? n : (w(e, 0, 1e9), void 0 === t ? t = r.rounding : w(t, 0, 8), k(n, e + n.e + 1, t))
            }, v.toExponential = function (e, t) {
                var r = this, n = r.constructor,
                    e = void 0 === e ? E(r, !0) : (w(e, 0, 1e9), void 0 === t ? t = n.rounding : w(t, 0, 8), E(r = k(new n(r), e + 1, t), !0, e + 1));
                return r.isNeg() && !r.isZero() ? "-" + e : e
            }, v.toFixed = function (e, t) {
                var r = this, n = r.constructor,
                    i = void 0 === e ? E(r) : (w(e, 0, 1e9), void 0 === t ? t = n.rounding : w(t, 0, 8), E(i = k(new n(r), e + r.e + 1, t), !1, e + i.e + 1));
                return r.isNeg() && !r.isZero() ? "-" + i : i
            }, v.toFraction = function (e) {
                var t, r, n, i, a, o, s, u, c, f, l = this, p = l.d, m = l.constructor;
                if (!p) return new m(l);
                if (u = r = new m(1), n = s = new m(0), c = (a = (t = new m(n)).e = D(p) - l.e - 1) % 7, t.d[0] = y(10, c < 0 ? 7 + c : c), null == e) e = 0 < a ? t : u; else {
                    if (!(o = new m(e)).isInt() || o.lt(u)) throw Error(d + o);
                    e = o.gt(t) ? 0 < a ? t : u : o
                }
                for (x = !1, o = new m(b(p)), c = m.precision, m.precision = a = 7 * p.length * 2; f = S(o, t, 0, 1, 1), 1 != (i = r.plus(f.times(n))).cmp(e);) r = n, n = i, i = u, u = s.plus(f.times(i)), s = i, i = t, t = o.minus(f.times(i)), o = i;
                return i = S(e.minus(r), n, 0, 1, 1), s = s.plus(i.times(u)), r = r.plus(i.times(n)), s.s = u.s = l.s, l = S(u, n, a, 1).minus(l).abs().cmp(S(s, r, a, 1).minus(l).abs()) < 1 ? [u, n] : [s, r], m.precision = c, x = !0, l
            }, v.toHexadecimal = v.toHex = function (e, t) {
                return r(this, 16, e, t)
            }, v.toNearest = function (e, t) {
                var r = (n = this).constructor, n = new r(n);
                if (null == e) {
                    if (!n.d) return n;
                    e = new r(1), t = r.rounding
                } else {
                    if (e = new r(e), void 0 === t ? t = r.rounding : w(t, 0, 8), !n.d) return e.s ? n : e;
                    if (!e.d) return e.s && (e.s = n.s), e
                }
                return e.d[0] ? (x = !1, n = S(n, e, 0, t, 1).times(e), x = !0, k(n)) : (e.s = n.s, n = e), n
            }, v.toNumber = function () {
                return +this
            }, v.toOctal = function (e, t) {
                return r(this, 8, e, t)
            }, v.toPower = v.pow = function (e) {
                var t, r, n, i, a, o, s = this, u = s.constructor, c = +(e = new u(e));
                if (!(s.d && e.d && s.d[0] && e.d[0])) return new u(y(+s, c));
                if ((s = new u(s)).eq(1)) return s;
                if (n = u.precision, a = u.rounding, e.eq(1)) return k(s, n, a);
                if ((t = T(e.e / 7)) >= e.d.length - 1 && (r = c < 0 ? -c : c) <= 9007199254740991) return i = P(u, s, r, n), e.s < 0 ? new u(1).div(i) : k(i, n, a);
                if ((o = s.s) < 0) {
                    if (t < e.d.length - 1) return new u(NaN);
                    if (0 == (1 & e.d[t]) && (o = 1), 0 == s.e && 1 == s.d[0] && 1 == s.d.length) return s.s = o, s
                }
                return (t = 0 != (r = y(+s, c)) && isFinite(r) ? new u(r + "").e : T(c * (Math.log("0." + b(s.d)) / Math.LN10 + s.e + 1))) > u.maxE + 1 || t < u.minE - 1 ? new u(0 < t ? o / 0 : 0) : (x = !1, u.rounding = s.s = 1, r = Math.min(12, (t + "").length), (i = U(e.times(F(s, n + r)), n)).d && N((i = k(i, n + 5, 1)).d, n, a) && (t = n + 10, +b((i = k(U(e.times(F(s, t + r)), t), t + 5, 1)).d).slice(n + 1, n + 15) + 1 == 1e14 && (i = k(i, n + 1, 0))), i.s = o, x = !0, k(i, n, u.rounding = a))
            }, v.toPrecision = function (e, t) {
                var r = this, n = r.constructor,
                    e = void 0 === e ? E(r, r.e <= n.toExpNeg || r.e >= n.toExpPos) : (w(e, 1, 1e9), void 0 === t ? t = n.rounding : w(t, 0, 8), E(r = k(new n(r), e, t), e <= r.e || r.e <= n.toExpNeg, e));
                return r.isNeg() && !r.isZero() ? "-" + e : e
            }, v.toSignificantDigits = v.toSD = function (e, t) {
                var r = this.constructor;
                return void 0 === e ? (e = r.precision, t = r.rounding) : (w(e, 1, 1e9), void 0 === t ? t = r.rounding : w(t, 0, 8)), k(new r(this), e, t)
            }, v.toString = function () {
                var e = this, t = e.constructor, t = E(e, e.e <= t.toExpNeg || e.e >= t.toExpPos);
                return e.isNeg() && !e.isZero() ? "-" + t : t
            }, v.truncated = v.trunc = function () {
                return k(new this.constructor(this), this.e + 1, 1)
            }, v.valueOf = v.toJSON = function () {
                var e = this, t = e.constructor, t = E(e, e.e <= t.toExpNeg || e.e >= t.toExpPos);
                return e.isNeg() ? "-" + t : t
            };
            var S = function (e, t, r, n, i, a) {
                var o, s, u, c, f, l, p, m, h, d, y, g, v, x, b, w, N, M, S, E = e.constructor, A = e.s == t.s ? 1 : -1,
                    O = e.d, C = t.d;
                if (!(O && O[0] && C && C[0])) return new E(e.s && t.s && (O ? !C || O[0] != C[0] : C) ? O && 0 == O[0] || !C ? 0 * A : A / 0 : NaN);
                for (s = a ? (f = 1, e.e - t.e) : (a = z, f = 7, T(e.e / f) - T(t.e / f)), M = C.length, w = O.length, h = (A = new E(A)).d = [], u = 0; C[u] == (O[u] || 0); u++) ;
                if (C[u] > (O[u] || 0) && s--, null == r ? (v = r = E.precision, n = E.rounding) : v = i ? r + (e.e - t.e) + 1 : r, v < 0) h.push(1), l = !0; else {
                    if (v = v / f + 2 | 0, u = 0, 1 == M) {
                        for (C = C[c = 0], v++; (u < w || c) && v--; u++) x = c * a + (O[u] || 0), h[u] = x / C | 0, c = x % C | 0;
                        l = c || u < w
                    } else {
                        for (1 < (c = a / (C[0] + 1) | 0) && (C = q(C, c, a), O = q(O, c, a), M = C.length, w = O.length), b = M, y = (d = O.slice(0, M)).length; y < M;) d[y++] = 0;
                        for ((S = C.slice()).unshift(0), N = C[0], C[1] >= a / 2 && ++N; c = 0, (o = I(C, d, M, y)) < 0 ? (g = d[0], M != y && (g = g * a + (d[1] || 0)), 1 < (c = g / N | 0) ? (a <= c && (c = a - 1), 1 == (o = I(p = q(C, c, a), d, m = p.length, y = d.length)) && (c--, B(p, M < m ? S : C, m, a))) : (0 == c && (o = c = 1), p = C.slice()), (m = p.length) < y && p.unshift(0), B(d, p, y, a), -1 == o && (o = I(C, d, M, y = d.length)) < 1 && (c++, B(d, M < y ? S : C, y, a)), y = d.length) : 0 === o && (c++, d = [0]), h[u++] = c, o && d[0] ? d[y++] = O[b] || 0 : (d = [O[b]], y = 1), (b++ < w || void 0 !== d[0]) && v--;) ;
                        l = void 0 !== d[0]
                    }
                    h[0] || h.shift()
                }
                if (1 == f) A.e = s, _ = l; else {
                    for (u = 1, c = h[0]; 10 <= c; c /= 10) u++;
                    A.e = u + s * f - 1, k(A, i ? r + A.e + 1 : r, n, l)
                }
                return A
            };

            function q(e, t, r) {
                var n, i = 0, a = e.length;
                for (e = e.slice(); a--;) n = e[a] * t + i, e[a] = n % r | 0, i = n / r | 0;
                return i && e.unshift(i), e
            }

            function I(e, t, r, n) {
                var i, a;
                if (r != n) a = n < r ? 1 : -1; else for (i = a = 0; i < r; i++) if (e[i] != t[i]) {
                    a = e[i] > t[i] ? 1 : -1;
                    break
                }
                return a
            }

            function B(e, t, r, n) {
                for (var i = 0; r--;) e[r] -= i, i = e[r] < t[r] ? 1 : 0, e[r] = i * n + e[r] - t[r];
                for (; !e[0] && 1 < e.length;) e.shift()
            }

            function k(e, t, r, n) {
                var i, a, o, s, u, c, f, l, p = e.constructor;
                e:if (null != t) {
                    if (!(f = e.d)) return e;
                    for (i = 1, s = f[0]; 10 <= s; s /= 10) i++;
                    if ((a = t - i) < 0) a += 7, o = t, u = (c = f[l = 0]) / y(10, i - o - 1) % 10 | 0; else if ((l = Math.ceil((a + 1) / 7)) >= (s = f.length)) {
                        if (!n) break e;
                        for (; s++ <= l;) f.push(0);
                        c = u = 0, o = (a %= 7) - 7 + (i = 1)
                    } else {
                        for (c = s = f[l], i = 1; 10 <= s; s /= 10) i++;
                        u = (o = (a %= 7) - 7 + i) < 0 ? 0 : c / y(10, i - o - 1) % 10 | 0
                    }
                    if (n = n || t < 0 || void 0 !== f[l + 1] || (o < 0 ? c : c % y(10, i - o - 1)), u = r < 4 ? (u || n) && (0 == r || r == (e.s < 0 ? 3 : 2)) : 5 < u || 5 == u && (4 == r || n || 6 == r && (0 < a ? 0 < o ? c / y(10, i - o) : 0 : f[l - 1]) % 10 & 1 || r == (e.s < 0 ? 8 : 7)), t < 1 || !f[0]) return f.length = 0, u ? (t -= e.e + 1, f[0] = y(10, (7 - t % 7) % 7), e.e = -t || 0) : f[0] = e.e = 0, e;
                    if (0 == a ? (f.length = l, s = 1, l--) : (f.length = l + 1, s = y(10, 7 - a), f[l] = 0 < o ? (c / y(10, i - o) % y(10, o) | 0) * s : 0), u) for (; ;) {
                        if (0 == l) {
                            for (a = 1, o = f[0]; 10 <= o; o /= 10) a++;
                            for (o = f[0] += s, s = 1; 10 <= o; o /= 10) s++;
                            a != s && (e.e++, f[0] == z && (f[0] = 1));
                            break
                        }
                        if (f[l] += s, f[l] != z) break;
                        f[l--] = 0, s = 1
                    }
                    for (a = f.length; 0 === f[--a];) f.pop()
                }
                return x && (e.e > p.maxE ? (e.d = null, e.e = NaN) : e.e < p.minE && (e.e = 0, e.d = [0])), e
            }

            function E(e, t, r) {
                if (!e.isFinite()) return L(e);
                var n, i = e.e, a = b(e.d), o = a.length;
                return t ? (r && 0 < (n = r - o) ? a = a.charAt(0) + "." + a.slice(1) + R(n) : 1 < o && (a = a.charAt(0) + "." + a.slice(1)), a = a + (e.e < 0 ? "e" : "e+") + e.e) : i < 0 ? (a = "0." + R(-i - 1) + a, r && 0 < (n = r - o) && (a += R(n))) : o <= i ? (a += R(i + 1 - o), r && 0 < (n = r - i - 1) && (a = a + "." + R(n))) : ((n = i + 1) < o && (a = a.slice(0, n) + "." + a.slice(n)), r && 0 < (n = r - o) && (i + 1 === o && (a += "."), a += R(n))), a
            }

            function A(e, t) {
                var r = e[0];
                for (t *= 7; 10 <= r; r /= 10) t++;
                return t
            }

            function O(e, t, r) {
                if (c < t) throw x = !0, r && (e.precision = r), Error("[DecimalError] Precision limit exceeded");
                return k(new e(n), t, 1, !0)
            }

            function C(e, t, r) {
                if (g < t) throw Error("[DecimalError] Precision limit exceeded");
                return k(new e(i), t, r, !0)
            }

            function D(e) {
                var t = e.length - 1, r = 7 * t + 1;
                if (t = e[t]) {
                    for (; t % 10 == 0; t /= 10) r--;
                    for (t = e[0]; 10 <= t; t /= 10) r++
                }
                return r
            }

            function R(e) {
                for (var t = ""; e--;) t += "0";
                return t
            }

            function P(e, t, r, n) {
                var i, a = new e(1), o = Math.ceil(n / 7 + 4);
                for (x = !1; ;) {
                    if (r % 2 && Z((a = a.times(t)).d, o) && (i = !0), 0 === (r = T(r / 2))) {
                        r = a.d.length - 1, i && 0 === a.d[r] && ++a.d[r];
                        break
                    }
                    Z((t = t.times(t)).d, o)
                }
                return x = !0, a
            }

            function j(e) {
                return 1 & e.d[e.d.length - 1]
            }

            function e(e, t, r) {
                for (var n, i = new e(t[0]), a = 0; ++a < t.length;) {
                    if (!(n = new e(t[a])).s) {
                        i = n;
                        break
                    }
                    i[r](n) && (i = n)
                }
                return i
            }

            function U(e, t) {
                var r, n, i, a, o, s, u, c = 0, f = 0, l = 0, p = e.constructor, m = p.rounding, h = p.precision;
                if (!e.d || !e.d[0] || 17 < e.e) return new p(e.d ? e.d[0] ? e.s < 0 ? 0 : 1 / 0 : 1 : e.s ? e.s < 0 ? 0 : e : NaN);
                for (u = null == t ? (x = !1, h) : t, s = new p(.03125); -2 < e.e;) e = e.times(s), l += 5;
                for (u += n = Math.log(y(2, l)) / Math.LN10 * 2 + 5 | 0, r = a = o = new p(1), p.precision = u; ;) {
                    if (a = k(a.times(e), u, 1), r = r.times(++f), b((s = o.plus(S(a, r, u, 1))).d).slice(0, u) === b(o.d).slice(0, u)) {
                        for (i = l; i--;) o = k(o.times(o), u, 1);
                        if (null != t) return p.precision = h, o;
                        if (!(c < 3 && N(o.d, u - n, m, c))) return k(o, p.precision = h, m, x = !0);
                        p.precision = u += 10, r = a = s = new p(1), f = 0, c++
                    }
                    o = s
                }
            }

            function F(e, t) {
                var r, n, i, a, o, s, u, c, f, l, p, m = 1, h = e, d = h.d, y = h.constructor, g = y.rounding,
                    v = y.precision;
                if (h.s < 0 || !d || !d[0] || !h.e && 1 == d[0] && 1 == d.length) return new y(d && !d[0] ? -1 / 0 : 1 != h.s ? NaN : d ? 0 : h);
                if (f = null == t ? (x = !1, v) : t, y.precision = f += 10, n = (r = b(d)).charAt(0), !(Math.abs(a = h.e) < 15e14)) return c = O(y, f + 2, v).times(a + ""), h = F(new y(n + "." + r.slice(1)), f - 10).plus(c), y.precision = v, null == t ? k(h, v, g, x = !0) : h;
                for (; n < 7 && 1 != n || 1 == n && 3 < r.charAt(1);) n = (r = b((h = h.times(e)).d)).charAt(0), m++;
                for (a = h.e, 1 < n ? (h = new y("0." + r), a++) : h = new y(n + "." + r.slice(1)), u = o = h = S((l = h).minus(1), h.plus(1), f, 1), p = k(h.times(h), f, 1), i = 3; ;) {
                    if (o = k(o.times(p), f, 1), b((c = u.plus(S(o, new y(i), f, 1))).d).slice(0, f) === b(u.d).slice(0, f)) {
                        if (u = u.times(2), 0 !== a && (u = u.plus(O(y, f + 2, v).times(a + ""))), u = S(u, new y(m), f, 1), null != t) return y.precision = v, u;
                        if (!N(u.d, f - 10, g, s)) return k(u, y.precision = v, g, x = !0);
                        y.precision = f += 10, c = o = h = S(l.minus(1), l.plus(1), f, 1), p = k(h.times(h), f, 1), i = s = 1
                    }
                    u = c, i += 2
                }
            }

            function L(e) {
                return String(e.s * e.s / 0)
            }

            function H(e, t) {
                var r, n, i;
                for (-1 < (r = t.indexOf(".")) && (t = t.replace(".", "")), 0 < (n = t.search(/e/i)) ? (r < 0 && (r = n), r += +t.slice(n + 1), t = t.substring(0, n)) : r < 0 && (r = t.length), n = 0; 48 === t.charCodeAt(n); n++) ;
                for (i = t.length; 48 === t.charCodeAt(i - 1); --i) ;
                if (t = t.slice(n, i)) {
                    if (i -= n, e.e = r = r - n - 1, e.d = [], n = (r + 1) % 7, r < 0 && (n += 7), n < i) {
                        for (n && e.d.push(+t.slice(0, n)), i -= 7; n < i;) e.d.push(+t.slice(n, n += 7));
                        n = 7 - (t = t.slice(n)).length
                    } else n -= i;
                    for (; n--;) t += "0";
                    e.d.push(+t), x && (e.e > e.constructor.maxE ? (e.d = null, e.e = NaN) : e.e < e.constructor.minE && (e.e = 0, e.d = [0]))
                } else e.e = 0, e.d = [0];
                return e
            }

            function $(e, t, r, n, i) {
                var a, o, s, u, c = e.precision, f = Math.ceil(c / 7);
                for (x = !1, u = r.times(r), s = new e(n); ;) {
                    if (o = S(s.times(u), new e(t++ * t++), c, 1), s = i ? n.plus(o) : n.minus(o), n = S(o.times(u), new e(t++ * t++), c, 1), void 0 !== (o = s.plus(n)).d[f]) {
                        for (a = f; o.d[a] === s.d[a] && a--;) ;
                        if (-1 == a) break
                    }
                    a = s, s = n, n = o, o = a
                }
                return x = !0, o.d.length = f + 1, o
            }

            function G(e, t) {
                for (var r = e; --t;) r *= e;
                return r
            }

            function V(e, t) {
                var r = t.s < 0, n = C(e, e.precision, 1), i = n.times(.5);
                if ((t = t.abs()).lte(i)) return a = r ? 4 : 1, t;
                if ((e = t.divToInt(n)).isZero()) a = r ? 3 : 2; else {
                    if ((t = t.minus(e.times(n))).lte(i)) return a = j(e) ? r ? 2 : 3 : r ? 4 : 1, t;
                    a = j(e) ? r ? 1 : 4 : r ? 3 : 2
                }
                return t.minus(n).abs()
            }

            function r(e, t, r, n) {
                var i, a, o, s, u, c, f, l, p = e.constructor, m = void 0 !== r;
                if (m ? (w(r, 1, 1e9), void 0 === n ? n = p.rounding : w(n, 0, 8)) : (r = p.precision, n = p.rounding), e.isFinite()) {
                    for (m ? (i = 2, 16 == t ? r = 4 * r - 3 : 8 == t && (r = 3 * r - 2)) : i = t, 0 <= (o = (c = E(e)).indexOf(".")) && (c = c.replace(".", ""), (l = new p(1)).e = c.length - o, l.d = M(E(l), 10, i), l.e = l.d.length), a = s = (f = M(c, 10, i)).length; 0 == f[--s];) f.pop();
                    if (f[0]) {
                        if (o < 0 ? a-- : ((e = new p(e)).d = f, e.e = a, f = (e = S(e, l, r, n, 0, i)).d, a = e.e, u = _), o = f[r], l = i / 2, u = u || void 0 !== f[r + 1], u = n < 4 ? (void 0 !== o || u) && (0 === n || n === (e.s < 0 ? 3 : 2)) : l < o || o === l && (4 === n || u || 6 === n && 1 & f[r - 1] || n === (e.s < 0 ? 8 : 7)), f.length = r, u) for (; ++f[--r] > i - 1;) f[r] = 0, r || (++a, f.unshift(1));
                        for (s = f.length; !f[s - 1]; --s) ;
                        for (o = 0, c = ""; o < s; o++) c += h.charAt(f[o]);
                        if (m) {
                            if (1 < s) if (16 == t || 8 == t) {
                                for (o = 16 == t ? 4 : 3, --s; s % o; s++) c += "0";
                                for (s = (f = M(c, i, t)).length; !f[s - 1]; --s) ;
                                for (o = 1, c = "1."; o < s; o++) c += h.charAt(f[o])
                            } else c = c.charAt(0) + "." + c.slice(1);
                            c = c + (a < 0 ? "p" : "p+") + a
                        } else if (a < 0) {
                            for (; ++a;) c = "0" + c;
                            c = "0." + c
                        } else if (++a > s) for (a -= s; a--;) c += "0"; else a < s && (c = c.slice(0, a) + "." + c.slice(a))
                    } else c = m ? "0p+0" : "0";
                    c = (16 == t ? "0x" : 2 == t ? "0b" : 8 == t ? "0o" : "") + c
                } else c = L(e);
                return e.s < 0 ? "-" + c : c
            }

            function Z(e, t) {
                return e.length > t && (e.length = t, 1)
            }

            function W(e) {
                return new this(e).abs()
            }

            function J(e) {
                return new this(e).acos()
            }

            function Y(e) {
                return new this(e).acosh()
            }

            function X(e, t) {
                return new this(e).plus(t)
            }

            function Q(e) {
                return new this(e).asin()
            }

            function K(e) {
                return new this(e).asinh()
            }

            function ee(e) {
                return new this(e).atan()
            }

            function te(e) {
                return new this(e).atanh()
            }

            function re(e, t) {
                e = new this(e), t = new this(t);
                var r, n = this.precision, i = this.rounding, a = n + 4;
                return e.s && t.s ? e.d || t.d ? !t.d || e.isZero() ? (r = t.s < 0 ? C(this, n, i) : new this(0)).s = e.s : !e.d || t.isZero() ? (r = C(this, a, 1).times(.5)).s = e.s : r = t.s < 0 ? (this.precision = a, this.rounding = 1, r = this.atan(S(e, t, a, 1)), t = C(this, a, 1), this.precision = n, this.rounding = i, e.s < 0 ? r.minus(t) : r.plus(t)) : this.atan(S(e, t, a, 1)) : (r = C(this, a, 1).times(0 < t.s ? .25 : .75)).s = e.s : r = new this(NaN), r
            }

            function ne(e) {
                return new this(e).cbrt()
            }

            function ie(e) {
                return k(e = new this(e), e.e + 1, 2)
            }

            function ae(e) {
                if (!e || "object" != typeof e) throw Error("[DecimalError] Object expected");
                for (var t, r, n = !0 === e.defaults, i = ["precision", 1, 1e9, "rounding", 0, 8, "toExpNeg", -o, 0, "toExpPos", 0, o, "maxE", 0, o, "minE", -o, 0, "modulo", 0, 9], a = 0; a < i.length; a += 3) if (t = i[a], n && (this[t] = s[t]), void 0 !== (r = e[t])) {
                    if (!(T(r) === r && i[a + 1] <= r && r <= i[a + 2])) throw Error(d + t + ": " + r);
                    this[t] = r
                }
                if (t = "crypto", n && (this[t] = s[t]), void 0 !== (r = e[t])) {
                    if (!0 !== r && !1 !== r && 0 !== r && 1 !== r) throw Error(d + t + ": " + r);
                    if (r) {
                        if ("undefined" == typeof crypto || !crypto || !crypto.getRandomValues && !crypto.randomBytes) throw Error("[DecimalError] crypto unavailable");
                        this[t] = !0
                    } else this[t] = !1
                }
                return this
            }

            function oe(e) {
                return new this(e).cos()
            }

            function se(e) {
                return new this(e).cosh()
            }

            function ue(e, t) {
                return new this(e).div(t)
            }

            function ce(e) {
                return new this(e).exp()
            }

            function fe(e) {
                return k(e = new this(e), e.e + 1, 3)
            }

            function le() {
                var e, t, r = new this(0);
                for (x = !1, e = 0; e < arguments.length;) if ((t = new this(arguments[e++])).d) r.d && (r = r.plus(t.times(t))); else {
                    if (t.s) return x = !0, new this(1 / 0);
                    r = t
                }
                return x = !0, r.sqrt()
            }

            function pe(e) {
                return e instanceof f || e && "[object Decimal]" === e.name || !1
            }

            function me(e) {
                return new this(e).ln()
            }

            function he(e, t) {
                return new this(e).log(t)
            }

            function de(e) {
                return new this(e).log(2)
            }

            function ye(e) {
                return new this(e).log(10)
            }

            function ge() {
                return e(this, arguments, "lt")
            }

            function ve() {
                return e(this, arguments, "gt")
            }

            function xe(e, t) {
                return new this(e).mod(t)
            }

            function be(e, t) {
                return new this(e).mul(t)
            }

            function we(e, t) {
                return new this(e).pow(t)
            }

            function Ne(e) {
                var t, r, n, i, a = 0, o = new this(1), s = [];
                if (void 0 === e ? e = this.precision : w(e, 1, 1e9), n = Math.ceil(e / 7), this.crypto) if (crypto.getRandomValues) for (t = crypto.getRandomValues(new Uint32Array(n)); a < n;) 429e7 <= (i = t[a]) ? t[a] = crypto.getRandomValues(new Uint32Array(1))[0] : s[a++] = i % 1e7; else {
                    if (!crypto.randomBytes) throw Error("[DecimalError] crypto unavailable");
                    for (t = crypto.randomBytes(n *= 4); a < n;) 214e7 <= (i = t[a] + (t[a + 1] << 8) + (t[a + 2] << 16) + ((127 & t[a + 3]) << 24)) ? crypto.randomBytes(4).copy(t, a) : (s.push(i % 1e7), a += 4);
                    a = n / 4
                } else for (; a < n;) s[a++] = 1e7 * Math.random() | 0;
                for (e %= 7, (n = s[--a]) && e && (i = y(10, 7 - e), s[a] = (n / i | 0) * i); 0 === s[a]; a--) s.pop();
                if (a < 0) s = [r = 0]; else {
                    for (r = -1; 0 === s[0]; r -= 7) s.shift();
                    for (n = 1, i = s[0]; 10 <= i; i /= 10) n++;
                    n < 7 && (r -= 7 - n)
                }
                return o.e = r, o.d = s, o
            }

            function Me(e) {
                return k(e = new this(e), e.e + 1, this.rounding)
            }

            function Se(e) {
                return (e = new this(e)).d ? e.d[0] ? e.s : 0 * e.s : e.s || NaN
            }

            function Ee(e) {
                return new this(e).sin()
            }

            function Ae(e) {
                return new this(e).sinh()
            }

            function Oe(e) {
                return new this(e).sqrt()
            }

            function Ce(e, t) {
                return new this(e).sub(t)
            }

            function _e(e) {
                return new this(e).tan()
            }

            function Te(e) {
                return new this(e).tanh()
            }

            function ze(e) {
                return k(e = new this(e), e.e + 1, 1)
            }

            (f = function e(t) {
                var r, n, i;

                function a(e) {
                    var t, r, n, i = this;
                    if (!(i instanceof a)) return new a(e);
                    if (e instanceof (i.constructor = a)) return i.s = e.s, void (x ? !e.d || e.e > a.maxE ? (i.e = NaN, i.d = null) : e.e < a.minE ? (i.e = 0, i.d = [0]) : (i.e = e.e, i.d = e.d.slice()) : (i.e = e.e, i.d = e.d && e.d.slice()));
                    if ("number" == (n = typeof e)) {
                        if (0 === e) return i.s = 1 / e < 0 ? -1 : 1, i.e = 0, void (i.d = [0]);
                        if (e < 0 ? (e = -e, i.s = -1) : i.s = 1, e === ~~e && e < 1e7) {
                            for (t = 0, r = e; 10 <= r; r /= 10) t++;
                            return void (x ? a.maxE < t ? (i.e = NaN, i.d = null) : t < a.minE ? (i.e = 0, i.d = [0]) : (i.e = t, i.d = [e]) : (i.e = t, i.d = [e]))
                        }
                        return 0 * e != 0 ? (e || (i.s = NaN), i.e = NaN, void (i.d = null)) : H(i, e.toString())
                    }
                    if ("string" != n) throw Error(d + e);
                    return 45 === (r = e.charCodeAt(0)) ? (e = e.slice(1), i.s = -1) : (43 === r && (e = e.slice(1)), i.s = 1), (u.test(e) ? H : function (e, t) {
                        var r, n, i, a, o, s, u, c;
                        if ("Infinity" === t || "NaN" === t) return +t || (e.s = NaN), e.e = NaN, e.d = null, e;
                        if (p.test(t)) c = 16, t = t.toLowerCase(); else if (l.test(t)) c = 2; else {
                            if (!m.test(t)) throw Error(d + t);
                            c = 8
                        }
                        for (a = 0 <= (i = (t = 0 < (i = t.search(/p/i)) ? (s = +t.slice(i + 1), t.substring(2, i)) : t.slice(2)).indexOf(".")), r = e.constructor, a && (i = (o = (t = t.replace(".", "")).length) - i, n = P(r, new r(c), i, 2 * i)), i = c = (u = M(t, c, z)).length - 1; 0 === u[i]; --i) u.pop();
                        return i < 0 ? new r(0 * e.s) : (e.e = A(u, c), e.d = u, x = !1, a && (e = S(e, n, 4 * o)), s && (e = e.times(Math.abs(s) < 54 ? y(2, s) : f.pow(2, s))), x = !0, e)
                    })(i, e)
                }

                if (a.prototype = v, a.ROUND_UP = 0, a.ROUND_DOWN = 1, a.ROUND_CEIL = 2, a.ROUND_FLOOR = 3, a.ROUND_HALF_UP = 4, a.ROUND_HALF_DOWN = 5, a.ROUND_HALF_EVEN = 6, a.ROUND_HALF_CEIL = 7, a.ROUND_HALF_FLOOR = 8, a.EUCLID = 9, a.config = a.set = ae, a.clone = e, a.isDecimal = pe, a.abs = W, a.acos = J, a.acosh = Y, a.add = X, a.asin = Q, a.asinh = K, a.atan = ee, a.atanh = te, a.atan2 = re, a.cbrt = ne, a.ceil = ie, a.cos = oe, a.cosh = se, a.div = ue, a.exp = ce, a.floor = fe, a.hypot = le, a.ln = me, a.log = he, a.log10 = ye, a.log2 = de, a.max = ge, a.min = ve, a.mod = xe, a.mul = be, a.pow = we, a.random = Ne, a.round = Me, a.sign = Se, a.sin = Ee, a.sinh = Ae, a.sqrt = Oe, a.sub = Ce, a.tan = _e, a.tanh = Te, a.trunc = ze, void 0 === t && (t = {}), t && !0 !== t.defaults) for (i = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"], r = 0; r < i.length;) t.hasOwnProperty(n = i[r++]) || (t[n] = this[n]);
                return a.config(t), a
            }(s)).default = f.Decimal = f, n = new f(n), i = new f(i), void 0 === (Be = function () {
                return f
            }.call(qe, Ie, qe, t)) || (t.exports = Be)
        }()
    }, function (e, t, r) {
        "use strict";
        var n;
        void 0 === (n = "function" == typeof (n = function () {
            function p() {
                return !0
            }

            function le() {
                return !1
            }

            function pe() {
            }

            return function e() {
                var t = [{
                    name: "number", test: function (e) {
                        return "number" == typeof e
                    }
                }, {
                    name: "string", test: function (e) {
                        return "string" == typeof e
                    }
                }, {
                    name: "boolean", test: function (e) {
                        return "boolean" == typeof e
                    }
                }, {
                    name: "Function", test: function (e) {
                        return "function" == typeof e
                    }
                }, {name: "Array", test: Array.isArray}, {
                    name: "Date", test: function (e) {
                        return e instanceof Date
                    }
                }, {
                    name: "RegExp", test: function (e) {
                        return e instanceof RegExp
                    }
                }, {
                    name: "Object", test: function (e) {
                        return "object" == typeof e && null !== e && e.constructor === Object
                    }
                }, {
                    name: "null", test: function (e) {
                        return null === e
                    }
                }, {
                    name: "undefined", test: function (e) {
                        return void 0 === e
                    }
                }], r = {name: "any", test: p}, n = [], i = [], L = {types: t, conversions: i, ignore: n};

                function H(t) {
                    var e = ce(L.types, function (e) {
                        return e.name === t
                    });
                    if (e) return e;
                    if ("any" === t) return r;
                    e = ce(L.types, function (e) {
                        return e.name.toLowerCase() === t.toLowerCase()
                    });
                    throw new TypeError('Unknown type "' + t + '"' + (e ? '. Did you mean "' + e.name + '"?' : ""))
                }

                function $(e) {
                    return e === r ? 999 : L.types.indexOf(e)
                }

                function G(t) {
                    var e = ce(L.types, function (e) {
                        return e.test(t)
                    });
                    if (e) return e.name;
                    throw new TypeError("Value has unknown type. Value: " + t)
                }

                function V(e) {
                    return e.map(function (e) {
                        var t = e.types.map(a);
                        return (e.restParam ? "..." : "") + t.join("|")
                    }).join(",")
                }

                function Z(e) {
                    e = se(e);
                    return !!e && e.restParam
                }

                function W(e) {
                    return e.types.some(function (e) {
                        return null != e.conversion
                    })
                }

                function J(e) {
                    if (e && 0 !== e.types.length) {
                        if (1 === e.types.length) return H(e.types[0].name).test;
                        if (2 === e.types.length) {
                            var t = H(e.types[0].name).test, r = H(e.types[1].name).test;
                            return function (e) {
                                return t(e) || r(e)
                            }
                        }
                        var n = e.types.map(function (e) {
                            return H(e.name).test
                        });
                        return function (e) {
                            for (var t = 0; t < n.length; t++) if (n[t](e)) return !0;
                            return !1
                        }
                    }
                    return p
                }

                function Y(e, t) {
                    return t < e.params.length ? e.params[t] : Z(e.params) ? se(e.params) : null
                }

                function X(e, t, r) {
                    t = Y(e, t);
                    return (t ? r ? t.types.filter(s) : t.types : []).map(a)
                }

                function a(e) {
                    return e.name
                }

                function s(e) {
                    return null === e.conversion || void 0 === e.conversion
                }

                function Q(e, t) {
                    e = function (e) {
                        for (var t = {}, r = 0; r < e.length; r++) t[e[r]] = !0;
                        return Object.keys(t)
                    }(fe(e, function (e) {
                        return X(e, t, !1)
                    }));
                    return -1 !== e.indexOf("any") ? ["any"] : e
                }

                function u(e) {
                    for (var t = 999, r = 0; r < e.types.length; r++) s(e.types[r]) && (t = Math.min(t, e.types[r].typeIndex));
                    return t
                }

                function c(e) {
                    for (var t = 999, r = 0; r < e.types.length; r++) s(e.types[r]) || (t = Math.min(t, e.types[r].conversionIndex));
                    return t
                }

                function K(e, t) {
                    var r, n, i, a, o, s = Math.min(e.params.length, t.params.length);
                    if (0 != (n = e.params.some(W) - t.params.some(W))) return n;
                    for (r = 0; r < s; r++) if (0 != (n = W(e.params[r]) - W(t.params[r]))) return n;
                    for (r = 0; r < s; r++) if (0 !== (i = e.params[r], a = t.params[r], o = void 0, n = 0 != (o = i.restParam - a.restParam) || 0 != (o = W(i) - W(a)) || 0 != (o = u(i) - u(a)) ? o : c(i) - c(a))) return n;
                    return e.params.length - t.params.length
                }

                function ee(e) {
                    var t, r, n, i, a = [], o = [];
                    switch (e.types.forEach(function (e) {
                        e.conversion && (a.push(H(e.conversion.from).test), o.push(e.conversion.convert))
                    }), o.length) {
                        case 0:
                            return function (e) {
                                return e
                            };
                        case 1:
                            return t = a[0], n = o[0], function (e) {
                                return t(e) ? n(e) : e
                            };
                        case 2:
                            return t = a[0], r = a[1], n = o[0], i = o[1], function (e) {
                                return t(e) ? n(e) : r(e) ? i(e) : e
                            };
                        default:
                            return function (e) {
                                for (var t = 0; t < o.length; t++) if (a[t](e)) return o[t](e);
                                return e
                            }
                    }
                }

                function te(e, o) {
                    return function t(r, n, i) {
                        if (n < r.length) {
                            var e = r[n], a = o ? e.types.filter(s) : e.types;
                            return fe(e.restParam ? (e = a.filter(s)).length < a.length ? [e, a] : [a] : a.map(function (e) {
                                return [e]
                            }), function (e) {
                                return t(r, n + 1, i.concat([e]))
                            })
                        }
                        return [i.map(function (e, t) {
                            return {types: e, restParam: t === r.length - 1 && Z(r)}
                        })]
                    }(e, 0, [])
                }

                function o(t, n) {
                    if (0 === Object.keys(n).length) throw new SyntaxError("No signatures provided");
                    var r = [];
                    Object.keys(n).map(function (e) {
                        return r = n[t = e], c = L.conversions, e = [], "" !== t.trim() && (e = t.split(",").map(ne).map(function (e, t, r) {
                            var n, i, a, o, s, u,
                                s = (i = c, s = 0 === (n = e).indexOf("..."), u = (s ? 3 < n.length ? n.slice(3) : "any" : n).split("|").map(ne).filter(ie).filter(re), a = u, o = {}, i.forEach(function (e) {
                                    -1 !== a.indexOf(e.from) || -1 === a.indexOf(e.to) || o[e.from] || (o[e.from] = e)
                                }), n = Object.keys(o).map(function (e) {
                                    return o[e]
                                }), u = u.map(function (e) {
                                    var t = H(e);
                                    return {
                                        name: e,
                                        typeIndex: $(t),
                                        test: t.test,
                                        conversion: null,
                                        conversionIndex: -1
                                    }
                                }), n = n.map(function (e) {
                                    var t = H(e.from);
                                    return {
                                        name: e.from,
                                        typeIndex: $(t),
                                        test: t.test,
                                        conversion: e,
                                        conversionIndex: i.indexOf(e)
                                    }
                                }), {types: u.concat(n), restParam: s});
                            if (s.restParam && t !== r.length - 1) throw new SyntaxError('Unexpected rest parameter "' + e + '": only allowed for the last parameter');
                            return s
                        })), e.some(oe) ? null : {params: e, fn: r};
                        var t, r, c
                    }).filter(ae).forEach(function (t) {
                        var e = ce(r, function (e) {
                            return function (e, t) {
                                for (var r = Math.max(e.params.length, t.params.length), n = 0; n < r; n++) if (!function (e, t) {
                                    for (var r, n = 0; n < e.length; n++) if (r = e[n], -1 !== t.indexOf(r)) return !0;
                                    return !1
                                }(X(e, n, !0), X(t, n, !0))) return;
                                var i = e.params.length, a = t.params.length, o = Z(e.params), s = Z(t.params);
                                return o ? s ? i === a : i <= a : s ? a <= i : i === a
                            }(e, t)
                        });
                        if (e) throw new TypeError('Conflicting signatures "' + V(e.params) + '" and "' + V(t.params) + '".');
                        r.push(t)
                    });
                    var i = fe(r, function (t) {
                        return (t ? te(t.params, !1) : []).map(function (e) {
                            return {params: e, fn: t.fn}
                        })
                    }).filter(ae);
                    i.sort(K);

                    function a() {
                        for (var e = U; e < F; e++) if (h[e](arguments)) return O[e].apply(this, arguments);
                        throw function (e, r, t) {
                            for (var n, i, a = e || "unnamed", o = t, s = 0; s < r.length; s++) {
                                var u = o.filter(function (e) {
                                    var t = J(Y(e, s));
                                    return (s < e.params.length || Z(e.params)) && t(r[s])
                                });
                                if (0 === u.length) {
                                    if (0 < (i = Q(o, s)).length) {
                                        var c = G(r[s]);
                                        return (n = new TypeError("Unexpected type of argument in function " + a + " (expected: " + i.join(" or ") + ", actual: " + c + ", index: " + s + ")")).data = {
                                            category: "wrongType",
                                            fn: a,
                                            index: s,
                                            actual: c,
                                            expected: i
                                        }, n
                                    }
                                } else o = u
                            }
                            return t = o.map(function (e) {
                                return Z(e.params) ? 1 / 0 : e.params.length
                            }), r.length < Math.min.apply(null, t) ? (i = Q(o, s), (n = new TypeError("Too few arguments in function " + a + " (expected: " + i.join(" or ") + ", index: " + r.length + ")")).data = {
                                category: "tooFewArgs",
                                fn: a,
                                index: r.length,
                                expected: i
                            }) : (t = Math.max.apply(null, t), r.length > t ? (n = new TypeError("Too many arguments in function " + a + " (expected: " + t + ", actual: " + r.length + ")")).data = {
                                category: "tooManyArgs",
                                fn: a,
                                index: r.length,
                                expectedLength: t
                            } : (n = new TypeError('Arguments of type "' + r.join(", ") + '" do not match any of the defined signatures of function ' + a + ".")).data = {
                                category: "mismatch",
                                actual: r.map(G)
                            }), n
                        }(t, arguments, i)
                    }

                    function o(e, t) {
                        return (arguments.length === B && d(e) && w(t) ? C : arguments.length === k && y(e) && N(t) ? _ : arguments.length === D && g(e) && M(t) ? T : arguments.length === R && v(e) && S(t) ? z : arguments.length === P && x(e) && E(t) ? q : arguments.length === j && b(e) && A(t) ? I : a).apply(o, arguments)
                    }

                    var s, e = i[0] && i[0].params.length <= 2 && !Z(i[0].params),
                        u = i[1] && i[1].params.length <= 2 && !Z(i[1].params),
                        c = i[2] && i[2].params.length <= 2 && !Z(i[2].params),
                        f = i[3] && i[3].params.length <= 2 && !Z(i[3].params),
                        l = i[4] && i[4].params.length <= 2 && !Z(i[4].params),
                        p = i[5] && i[5].params.length <= 2 && !Z(i[5].params), m = e && u && c && f && l && p,
                        h = i.map(function (e) {
                            return function (e) {
                                var r, t, n;
                                if (Z(e)) {
                                    var i = (r = e.slice(0, e.length - 1).map(J)).length, a = J(se(e));
                                    return function (e) {
                                        for (var t = 0; t < r.length; t++) if (!r[t](e[t])) return !1;
                                        return function (e) {
                                            for (var t = i; t < e.length; t++) if (!a(e[t])) return !1;
                                            return !0
                                        }(e) && e.length >= i + 1
                                    }
                                }
                                return 0 === e.length ? function (e) {
                                    return 0 === e.length
                                } : 1 === e.length ? (t = J(e[0]), function (e) {
                                    return t(e[0]) && 1 === e.length
                                }) : 2 === e.length ? (t = J(e[0]), n = J(e[1]), function (e) {
                                    return t(e[0]) && n(e[1]) && 2 === e.length
                                }) : (r = e.map(J), function (e) {
                                    for (var t = 0; t < r.length; t++) if (!r[t](e[t])) return !1;
                                    return e.length === r.length
                                })
                            }(e.params)
                        }), d = e ? J(i[0].params[0]) : le, y = u ? J(i[1].params[0]) : le,
                        g = c ? J(i[2].params[0]) : le, v = f ? J(i[3].params[0]) : le, x = l ? J(i[4].params[0]) : le,
                        b = p ? J(i[5].params[0]) : le, w = e ? J(i[0].params[1]) : le, N = u ? J(i[1].params[1]) : le,
                        M = c ? J(i[2].params[1]) : le, S = f ? J(i[3].params[1]) : le, E = l ? J(i[4].params[1]) : le,
                        A = p ? J(i[5].params[1]) : le, O = i.map(function (e) {
                            return function (e, n) {
                                var i, a, t = n;
                                e.some(W) && (i = Z(e), a = e.map(ee), t = function () {
                                    for (var e = [], t = i ? arguments.length - 1 : arguments.length, r = 0; r < t; r++) e[r] = a[r](arguments[r]);
                                    return i && (e[t] = arguments[t].map(a[t])), n.apply(this, e)
                                });
                                var r, o = t;
                                return Z(e) && (r = e.length - 1, o = function () {
                                    return t.apply(this, ue(arguments, 0, r).concat([ue(arguments, r)]))
                                }), o
                            }(e.params, e.fn)
                        }), C = e ? O[0] : pe, _ = u ? O[1] : pe, T = c ? O[2] : pe, z = f ? O[3] : pe, q = l ? O[4] : pe,
                        I = p ? O[5] : pe, B = e ? i[0].params.length : -1, k = u ? i[1].params.length : -1,
                        D = c ? i[2].params.length : -1, R = f ? i[3].params.length : -1,
                        P = l ? i[4].params.length : -1, j = p ? i[5].params.length : -1, U = m ? 6 : 0, F = i.length;
                    try {
                        Object.defineProperty(o, "name", {value: t})
                    } catch (t) {
                    }
                    return o.signatures = (s = {}, i.forEach(function (t) {
                        t.params.some(W) || te(t.params, !0).forEach(function (e) {
                            s[V(e)] = t.fn
                        })
                    }), s), o
                }

                function re(e) {
                    return -1 === L.ignore.indexOf(e)
                }

                function ne(e) {
                    return e.trim()
                }

                function ie(e) {
                    return !!e
                }

                function ae(e) {
                    return null !== e
                }

                function oe(e) {
                    return 0 === e.types.length
                }

                function se(e) {
                    return e[e.length - 1]
                }

                function ue(e, t, r) {
                    return Array.prototype.slice.call(e, t, r)
                }

                function ce(e, t) {
                    for (var r = 0; r < e.length; r++) if (t(e[r])) return e[r]
                }

                function fe(e, t) {
                    return Array.prototype.concat.apply([], e.map(t))
                }

                function f(e) {
                    for (var t = "", r = 0; r < e.length; r++) {
                        var n = e[r];
                        if (("object" == typeof n.signatures || "string" == typeof n.signature) && "" !== n.name) if ("" === t) t = n.name; else if (t !== n.name) {
                            var i = new Error("Function names do not match (expected: " + t + ", actual: " + n.name + ")");
                            throw i.data = {actual: n.name, expected: t}, i
                        }
                    }
                    return t
                }

                function l(e) {
                    var r, n = {};

                    function t(e, t) {
                        if (n.hasOwnProperty(e) && t !== n[e]) throw(r = new Error('Signature "' + e + '" is defined twice')).data = {signature: e}, r
                    }

                    for (var i = 0; i < e.length; i++) {
                        var a = e[i];
                        if ("object" == typeof a.signatures) for (var o in a.signatures) a.signatures.hasOwnProperty(o) && (t(o, a.signatures[o]), n[o] = a.signatures[o]); else {
                            if ("string" != typeof a.signature) throw(r = new TypeError("Function is no typed-function (index: " + i + ")")).data = {index: i}, r;
                            t(a.signature, a), n[a.signature] = a
                        }
                    }
                    return n
                }

                return (L = o("typed", {
                    "string, Object": o, Object: function (e) {
                        var t, r = [];
                        for (t in e) e.hasOwnProperty(t) && r.push(e[t]);
                        return o(f(r), e)
                    }, "...Function": function (e) {
                        return o(f(e), l(e))
                    }, "string, ...Function": function (e, t) {
                        return o(e, l(t))
                    }
                })).create = e, L.types = t, L.conversions = i, L.ignore = n, L.convert = function (e, t) {
                    var r = G(e);
                    if (t === r) return e;
                    for (var n = 0; n < L.conversions.length; n++) {
                        var i = L.conversions[n];
                        if (i.from === r && i.to === t) return i.convert(e)
                    }
                    throw new Error("Cannot convert from " + r + " to " + t)
                }, L.find = function (e, t) {
                    if (!e.signatures) throw new TypeError("Function is no typed-function");
                    var r;
                    if ("string" == typeof t) {
                        r = t.split(",");
                        for (var n = 0; n < r.length; n++) r[n] = r[n].trim()
                    } else {
                        if (!Array.isArray(t)) throw new TypeError("String array or a comma separated string expected");
                        r = t
                    }
                    t = r.join(","), t = e.signatures[t];
                    if (t) return t;
                    throw new TypeError("Signature not found (signature: " + (e.name || "unnamed") + "(" + r.join(", ") + "))")
                }, L.addType = function (e, t) {
                    if (!e || "string" != typeof e.name || "function" != typeof e.test) throw new TypeError("Object with properties {name: string, test: function} expected");
                    if (!1 !== t) for (var r = 0; r < L.types.length; r++) if ("Object" === L.types[r].name) return void L.types.splice(r, 0, e);
                    L.types.push(e)
                }, L.addConversion = function (e) {
                    if (!e || "string" != typeof e.from || "string" != typeof e.to || "function" != typeof e.convert) throw new TypeError("Object with properties {from: string, to: string, convert: function} expected");
                    L.conversions.push(e)
                }, L
            }()
        }) ? n.apply(t, []) : n) || (e.exports = n)
    }, function (e, t, r) {
        var n = r(12), i = r(13), a = r(14), o = r(15), s = r(16), u = r(17), r = r(18);
        r.alea = n, r.xor128 = i, r.xorwow = a, r.xorshift7 = o, r.xor4096 = s, r.tychei = u, e.exports = r
    }, function (e, t) {
        function r() {
        }

        r.prototype = {
            on: function (e, t, r) {
                var n = this.e || (this.e = {});
                return (n[e] || (n[e] = [])).push({fn: t, ctx: r}), this
            }, once: function (e, t, r) {
                var n = this;

                function i() {
                    n.off(e, i), t.apply(r, arguments)
                }

                return i._ = t, this.on(e, i, r)
            }, emit: function (e) {
                for (var t = [].slice.call(arguments, 1), r = ((this.e || (this.e = {}))[e] || []).slice(), n = 0, i = r.length; n < i; n++) r[n].fn.apply(r[n].ctx, t);
                return this
            }, off: function (e, t) {
                var r = this.e || (this.e = {}), n = r[e], i = [];
                if (n && t) for (var a = 0, o = n.length; a < o; a++) n[a].fn !== t && n[a].fn._ !== t && i.push(n[a]);
                return i.length ? r[e] = i : delete r[e], this
            }
        }, e.exports = r, e.exports.TinyEmitter = r
    }, function (e, t, r) {
        "use strict";

        function s(e, t) {
            return u({}, e, t)
        }

        var u = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r, n = arguments[t];
                for (r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }, c = {
            "{": "\\{",
            "}": "\\}",
            "\\": "\\textbackslash{}",
            "#": "\\#",
            $: "\\$",
            "%": "\\%",
            "&": "\\&",
            "^": "\\textasciicircum{}",
            _: "\\_",
            "~": "\\textasciitilde{}"
        }, f = {"???": "\\--", "???": "\\---", " ": "~", "\t": "\\qquad{}", "\r\n": "\\newline{}", "\n": "\\newline{}"};
        e.exports = function (e) {
            for (var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, r = t.preserveFormatting, r = void 0 !== r && r, t = t.escapeMapFn, t = void 0 === t ? s : t, n = String(e), i = "", a = t(u({}, c), r ? u({}, f) : {}), o = Object.keys(a); n;) !function () {
                var r = !1;
                o.forEach(function (e, t) {
                    r || n.length >= e.length && n.slice(0, e.length) === e && (i += a[o[t]], n = n.slice(e.length, n.length), r = !0)
                }), r || (i += n.slice(0, 1), n = n.slice(1, n.length))
            }();
            return i
        }
    }, function (e, n, o) {
        (function (e) {
            var r;
            !function (e) {
                function i(e) {
                    var n, t = this, r = (n = 4022871197, function (e) {
                        e = String(e);
                        for (var t = 0; t < e.length; t++) {
                            var r = .02519603282416938 * (n += e.charCodeAt(t));
                            r -= n = r >>> 0, n = (r *= n) >>> 0, n += 4294967296 * (r -= n)
                        }
                        return 2.3283064365386963e-10 * (n >>> 0)
                    });
                    t.next = function () {
                        var e = 2091639 * t.s0 + 2.3283064365386963e-10 * t.c;
                        return t.s0 = t.s1, t.s1 = t.s2, t.s2 = e - (t.c = 0 | e)
                    }, t.c = 1, t.s0 = r(" "), t.s1 = r(" "), t.s2 = r(" "), t.s0 -= r(e), t.s0 < 0 && (t.s0 += 1), t.s1 -= r(e), t.s1 < 0 && (t.s1 += 1), t.s2 -= r(e), t.s2 < 0 && (t.s2 += 1), r = null
                }

                function a(e, t) {
                    return t.c = e.c, t.s0 = e.s0, t.s1 = e.s1, t.s2 = e.s2, t
                }

                function t(e, t) {
                    var r = new i(e), t = t && t.state, n = r.next;
                    return n.int32 = function () {
                        return 4294967296 * r.next() | 0
                    }, n.double = function () {
                        return n() + 11102230246251565e-32 * (2097152 * n() | 0)
                    }, n.quick = n, t && ("object" == typeof t && a(t, r), n.state = function () {
                        return a(r, {})
                    }), n
                }

                e && e.exports ? e.exports = t : o(2) && o(6) ? void 0 === (r = function () {
                    return t
                }.call(n, o, n, e)) || (e.exports = r) : this.alea = t
            }(e, o(2))
        }).call(this, o(5)(e))
    }, function (e, a, o) {
        (function (e) {
            var r;
            !function (e) {
                function n(e) {
                    var t = this, r = "";
                    t.x = 0, t.y = 0, t.z = 0, t.w = 0, t.next = function () {
                        var e = t.x ^ t.x << 11;
                        return t.x = t.y, t.y = t.z, t.z = t.w, t.w ^= t.w >>> 19 ^ e ^ e >>> 8
                    }, e === (0 | e) ? t.x = e : r += e;
                    for (var n = 0; n < r.length + 64; n++) t.x ^= 0 | r.charCodeAt(n), t.next()
                }

                function i(e, t) {
                    return t.x = e.x, t.y = e.y, t.z = e.z, t.w = e.w, t
                }

                function t(e, t) {
                    var r = new n(e), e = t && t.state, t = function () {
                        return (r.next() >>> 0) / 4294967296
                    };
                    return t.double = function () {
                        do {
                            var e = ((r.next() >>> 11) + (r.next() >>> 0) / 4294967296) / (1 << 21)
                        } while (0 === e);
                        return e
                    }, t.int32 = r.next, t.quick = t, e && ("object" == typeof e && i(e, r), t.state = function () {
                        return i(r, {})
                    }), t
                }

                e && e.exports ? e.exports = t : o(2) && o(6) ? void 0 === (r = function () {
                    return t
                }.call(a, o, a, e)) || (e.exports = r) : this.xor128 = t
            }(e, o(2))
        }).call(this, o(5)(e))
    }, function (e, a, o) {
        (function (e) {
            var r;
            !function (e) {
                function n(e) {
                    var t = this, r = "";
                    t.next = function () {
                        var e = t.x ^ t.x >>> 2;
                        return t.x = t.y, t.y = t.z, t.z = t.w, t.w = t.v, (t.d = t.d + 362437 | 0) + (t.v = t.v ^ t.v << 4 ^ e ^ e << 1) | 0
                    }, t.x = 0, t.y = 0, t.z = 0, t.w = 0, e === ((t.v = 0) | e) ? t.x = e : r += e;
                    for (var n = 0; n < r.length + 64; n++) t.x ^= 0 | r.charCodeAt(n), n == r.length && (t.d = t.x << 10 ^ t.x >>> 4), t.next()
                }

                function i(e, t) {
                    return t.x = e.x, t.y = e.y, t.z = e.z, t.w = e.w, t.v = e.v, t.d = e.d, t
                }

                function t(e, t) {
                    var r = new n(e), e = t && t.state, t = function () {
                        return (r.next() >>> 0) / 4294967296
                    };
                    return t.double = function () {
                        do {
                            var e = ((r.next() >>> 11) + (r.next() >>> 0) / 4294967296) / (1 << 21)
                        } while (0 === e);
                        return e
                    }, t.int32 = r.next, t.quick = t, e && ("object" == typeof e && i(e, r), t.state = function () {
                        return i(r, {})
                    }), t
                }

                e && e.exports ? e.exports = t : o(2) && o(6) ? void 0 === (r = function () {
                    return t
                }.call(a, o, a, e)) || (e.exports = r) : this.xorwow = t
            }(e, o(2))
        }).call(this, o(5)(e))
    }, function (e, a, o) {
        (function (e) {
            var r;
            !function (e) {
                function n(e) {
                    var i = this;
                    i.next = function () {
                        var e = i.x, t = i.i, r = e[t], n = (r ^= r >>> 7) ^ r << 24;
                        return n ^= (r = e[t + 1 & 7]) ^ r >>> 10, n ^= (r = e[t + 3 & 7]) ^ r >>> 3, n ^= (r = e[t + 4 & 7]) ^ r << 7, r = e[t + 7 & 7], n ^= (r ^= r << 13) ^ r << 9, e[t] = n, i.i = t + 1 & 7, n
                    }, function (e, t) {
                        var r, n = [];
                        if (t === (0 | t)) n[0] = t; else for (t = "" + t, r = 0; r < t.length; ++r) n[7 & r] = n[7 & r] << 15 ^ t.charCodeAt(r) + n[r + 1 & 7] << 13;
                        for (; n.length < 8;) n.push(0);
                        for (r = 0; r < 8 && 0 === n[r]; ++r) ;
                        for (8 == r ? n[7] = -1 : n[r], e.x = n, e.i = 0, r = 256; 0 < r; --r) e.next()
                    }(i, e)
                }

                function i(e, t) {
                    return t.x = e.x.slice(), t.i = e.i, t
                }

                function t(e, t) {
                    null == e && (e = +new Date);
                    var r = new n(e), e = t && t.state, t = function () {
                        return (r.next() >>> 0) / 4294967296
                    };
                    return t.double = function () {
                        do {
                            var e = ((r.next() >>> 11) + (r.next() >>> 0) / 4294967296) / (1 << 21)
                        } while (0 === e);
                        return e
                    }, t.int32 = r.next, t.quick = t, e && (e.x && i(e, r), t.state = function () {
                        return i(r, {})
                    }), t
                }

                e && e.exports ? e.exports = t : o(2) && o(6) ? void 0 === (r = function () {
                    return t
                }.call(a, o, a, e)) || (e.exports = r) : this.xorshift7 = t
            }(e, o(2))
        }).call(this, o(5)(e))
    }, function (e, a, o) {
        (function (e) {
            var r;
            !function (e) {
                function n(e) {
                    var a = this;
                    a.next = function () {
                        var e, t, r = a.w, n = a.X, i = a.i;
                        return a.w = r = r + 1640531527 | 0, t = n[i + 34 & 127], e = n[i = i + 1 & 127], t ^= t << 13, e ^= e << 17, t ^= t >>> 15, e ^= e >>> 12, t = n[i] = t ^ e, a.i = i, t + (r ^ r >>> 16) | 0
                    }, function (e, t) {
                        var r, n, i, a, o, s = [], u = 128;
                        for (t === (0 | t) ? (n = t, t = null) : (t += "\0", n = 0, u = Math.max(u, t.length)), i = 0, a = -32; a < u; ++a) t && (n ^= t.charCodeAt((a + 32) % t.length)), 0 === a && (o = n), n ^= n << 10, n ^= n >>> 15, n ^= n << 4, n ^= n >>> 13, 0 <= a && (o = o + 1640531527 | 0, i = 0 == (r = s[127 & a] ^= n + o) ? i + 1 : 0);
                        for (128 <= i && (s[127 & (t && t.length || 0)] = -1), i = 127, a = 512; 0 < a; --a) n = s[i + 34 & 127], r = s[i = i + 1 & 127], n ^= n << 13, r ^= r << 17, n ^= n >>> 15, r ^= r >>> 12, s[i] = n ^ r;
                        e.w = o, e.X = s, e.i = i
                    }(a, e)
                }

                function i(e, t) {
                    return t.i = e.i, t.w = e.w, t.X = e.X.slice(), t
                }

                function t(e, t) {
                    null == e && (e = +new Date);
                    var r = new n(e), e = t && t.state, t = function () {
                        return (r.next() >>> 0) / 4294967296
                    };
                    return t.double = function () {
                        do {
                            var e = ((r.next() >>> 11) + (r.next() >>> 0) / 4294967296) / (1 << 21)
                        } while (0 === e);
                        return e
                    }, t.int32 = r.next, t.quick = t, e && (e.X && i(e, r), t.state = function () {
                        return i(r, {})
                    }), t
                }

                e && e.exports ? e.exports = t : o(2) && o(6) ? void 0 === (r = function () {
                    return t
                }.call(a, o, a, e)) || (e.exports = r) : this.xor4096 = t
            }(e, o(2))
        }).call(this, o(5)(e))
    }, function (e, a, o) {
        (function (e) {
            var r;
            !function (e) {
                function n(e) {
                    var i = this, t = "";
                    i.next = function () {
                        var e = (e = i.b) << 25 ^ e >>> 7 ^ (t = i.c), t = t - (r = i.d) | 0,
                            r = r << 24 ^ r >>> 8 ^ (n = i.a), n = n - e | 0;
                        return i.b = e = e << 20 ^ e >>> 12 ^ t, i.c = t = t - r | 0, i.d = r << 16 ^ t >>> 16 ^ n, i.a = n - e | 0
                    }, i.a = 0, i.b = 0, i.c = -1640531527, i.d = 1367130551, e === Math.floor(e) ? (i.a = e / 4294967296 | 0, i.b = 0 | e) : t += e;
                    for (var r = 0; r < t.length + 20; r++) i.b ^= 0 | t.charCodeAt(r), i.next()
                }

                function i(e, t) {
                    return t.a = e.a, t.b = e.b, t.c = e.c, t.d = e.d, t
                }

                function t(e, t) {
                    var r = new n(e), e = t && t.state, t = function () {
                        return (r.next() >>> 0) / 4294967296
                    };
                    return t.double = function () {
                        do {
                            var e = ((r.next() >>> 11) + (r.next() >>> 0) / 4294967296) / (1 << 21)
                        } while (0 === e);
                        return e
                    }, t.int32 = r.next, t.quick = t, e && ("object" == typeof e && i(e, r), t.state = function () {
                        return i(r, {})
                    }), t
                }

                e && e.exports ? e.exports = t : o(2) && o(6) ? void 0 === (r = function () {
                    return t
                }.call(a, o, a, e)) || (e.exports = r) : this.tychei = t
            }(e, o(2))
        }).call(this, o(5)(e))
    }, function (t, r, n) {
        var i;
        !function (a, o, s) {
            var u, c = s.pow(256, 6), f = s.pow(2, 52), l = 2 * f;

            function e(e, t, r) {
                var n = [], e = h(function e(t, r) {
                    var n, i = [], a = typeof t;
                    if (r && "object" == a) for (n in t) try {
                        i.push(e(t[n], r - 1))
                    } catch (e) {
                    }
                    return i.length ? i : "string" == a ? t : t + "\0"
                }((t = 1 == t ? {entropy: !0} : t || {}).entropy ? [e, d(o)] : null == e ? function () {
                    try {
                        var e;
                        return u && (e = u.randomBytes) ? e = e(256) : (e = new Uint8Array(256), (a.crypto || a.msCrypto).getRandomValues(e)), d(e)
                    } catch (e) {
                        var t = a.navigator, t = t && t.plugins;
                        return [+new Date, a, t, a.screen, d(o)]
                    }
                }() : e, 3), n), i = new p(n), n = function () {
                    for (var e = i.g(6), t = c, r = 0; e < f;) e = 256 * (e + r), t *= 256, r = i.g(1);
                    for (; l <= e;) e /= 2, t /= 2, r >>>= 1;
                    return (e + r) / t
                };
                return n.int32 = function () {
                    return 0 | i.g(4)
                }, n.quick = function () {
                    return i.g(4) / 4294967296
                }, n.double = n, h(d(i.S), o), (t.pass || r || function (e, t, r, n) {
                    return n && (n.S && m(n, i), e.state = function () {
                        return m(i, {})
                    }), r ? (s.random = e, t) : e
                })(n, e, "global" in t ? t.global : this == s, t.state)
            }

            function p(e) {
                var t, r = e.length, o = this, n = 0, i = o.i = o.j = 0, a = o.S = [];
                for (r || (e = [r++]); n < 256;) a[n] = n++;
                for (n = 0; n < 256; n++) a[n] = a[i = 255 & i + e[n % r] + (t = a[n])], a[i] = t;
                (o.g = function (e) {
                    for (var t, r = 0, n = o.i, i = o.j, a = o.S; e--;) t = a[n = 255 & n + 1], r = 256 * r + a[255 & (a[n] = a[i = 255 & i + t]) + (a[i] = t)];
                    return o.i = n, o.j = i, r
                })(256)
            }

            function m(e, t) {
                return t.i = e.i, t.j = e.j, t.S = e.S.slice(), t
            }

            function h(e, t) {
                for (var r, n = e + "", i = 0; i < n.length;) t[255 & i] = 255 & (r ^= 19 * t[255 & i]) + n.charCodeAt(i++);
                return d(t)
            }

            function d(e) {
                return String.fromCharCode.apply(0, e)
            }

            if (h(s.random(), o), t.exports) {
                t.exports = e;
                try {
                    u = n(19)
                } catch (e) {
                }
            } else void 0 === (i = function () {
                return e
            }.call(r, n, r, t)) || (t.exports = i)
        }("undefined" != typeof self ? self : this, [], Math)
    }, function (e, t) {
    }, function (e, t, r) {
        "use strict";
        r.r(t);
        var n = {};

        function i(e) {
            return (i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function M(e) {
            return "number" == typeof e
        }

        function I(e) {
            return e && !0 === e.constructor.prototype.isBigNumber || !1
        }

        function Z(e) {
            return e && "object" === i(e) && !0 === Object.getPrototypeOf(e).isComplex || !1
        }

        function w(e) {
            return e && "object" === i(e) && !0 === Object.getPrototypeOf(e).isFraction || !1
        }

        function W(e) {
            return e && !0 === e.constructor.prototype.isUnit || !1
        }

        function S(e) {
            return "string" == typeof e
        }

        r.r(n), r.d(n, "createTyped", function () {
            return et
        }), r.d(n, "createResultSet", function () {
            return it
        }), r.d(n, "createBigNumberClass", function () {
            return st
        }), r.d(n, "createComplexClass", function () {
            return ft
        }), r.d(n, "createFractionClass", function () {
            return pt
        }), r.d(n, "createRangeClass", function () {
            return mt
        }), r.d(n, "createMatrixClass", function () {
            return ht
        }), r.d(n, "createDenseMatrixClass", function () {
            return dt
        }), r.d(n, "createClone", function () {
            return yt
        }), r.d(n, "createIsInteger", function () {
            return Mt
        }), r.d(n, "createIsNegative", function () {
            return Ct
        }), r.d(n, "createIsNumeric", function () {
            return _t
        }), r.d(n, "createHasNumericValue", function () {
            return Tt
        }), r.d(n, "createIsPositive", function () {
            return zt
        }), r.d(n, "createIsZero", function () {
            return qt
        }), r.d(n, "createIsNaN", function () {
            return It
        }), r.d(n, "createTypeOf", function () {
            return Bt
        }), r.d(n, "createEqualScalar", function () {
            return Dt
        }), r.d(n, "createSparseMatrixClass", function () {
            return Rt
        }), r.d(n, "createNumber", function () {
            return Pt
        }), r.d(n, "createString", function () {
            return jt
        }), r.d(n, "createBoolean", function () {
            return Ut
        }), r.d(n, "createBignumber", function () {
            return Ft
        }), r.d(n, "createComplex", function () {
            return Lt
        }), r.d(n, "createFraction", function () {
            return Ht
        }), r.d(n, "createMatrix", function () {
            return $t
        }), r.d(n, "createSplitUnit", function () {
            return Gt
        }), r.d(n, "createUnaryMinus", function () {
            return hr
        }), r.d(n, "createUnaryPlus", function () {
            return dr
        }), r.d(n, "createAbs", function () {
            return yr
        }), r.d(n, "createApply", function () {
            return gr
        }), r.d(n, "createAddScalar", function () {
            return xr
        }), r.d(n, "createCbrt", function () {
            return br
        }), r.d(n, "createCeil", function () {
            return Er
        }), r.d(n, "createCube", function () {
            return Ar
        }), r.d(n, "createExp", function () {
            return Or
        }), r.d(n, "createExpm1", function () {
            return Cr
        }), r.d(n, "createFix", function () {
            return _r
        }), r.d(n, "createFloor", function () {
            return qr
        }), r.d(n, "createGcd", function () {
            return Rr
        }), r.d(n, "createLcm", function () {
            return Ur
        }), r.d(n, "createLog10", function () {
            return Fr
        }), r.d(n, "createLog2", function () {
            return Lr
        }), r.d(n, "createMod", function () {
            return Vr
        }), r.d(n, "createMultiplyScalar", function () {
            return Zr
        }), r.d(n, "createMultiply", function () {
            return Wr
        }), r.d(n, "createNthRoot", function () {
            return Jr
        }), r.d(n, "createSign", function () {
            return Yr
        }), r.d(n, "createSqrt", function () {
            return Xr
        }), r.d(n, "createSquare", function () {
            return Qr
        }), r.d(n, "createSubtract", function () {
            return Kr
        }), r.d(n, "createXgcd", function () {
            return tn
        }), r.d(n, "createDotMultiply", function () {
            return nn
        }), r.d(n, "createBitAnd", function () {
            return bn
        }), r.d(n, "createBitNot", function () {
            return wn
        }), r.d(n, "createBitOr", function () {
            return Nn
        }), r.d(n, "createBitXor", function () {
            return Sn
        }), r.d(n, "createArg", function () {
            return En
        }), r.d(n, "createConj", function () {
            return An
        }), r.d(n, "createIm", function () {
            return On
        }), r.d(n, "createRe", function () {
            return Cn
        }), r.d(n, "createNot", function () {
            return In
        }), r.d(n, "createOr", function () {
            return Bn
        }), r.d(n, "createXor", function () {
            return kn
        }), r.d(n, "createConcat", function () {
            return Dn
        }), r.d(n, "createColumn", function () {
            return Rn
        }), r.d(n, "createCount", function () {
            return Pn
        }), r.d(n, "createCross", function () {
            return jn
        }), r.d(n, "createDiag", function () {
            return Un
        }), r.d(n, "createFilter", function () {
            return Gn
        }), r.d(n, "createFlatten", function () {
            return Zn
        }), r.d(n, "createForEach", function () {
            return Wn
        }), r.d(n, "createGetMatrixDataType", function () {
            return Yn
        }), r.d(n, "createIdentity", function () {
            return Xn
        }), r.d(n, "createKron", function () {
            return Qn
        }), r.d(n, "createMap", function () {
            return Kn
        }), r.d(n, "createDiff", function () {
            return ti
        }), r.d(n, "createOnes", function () {
            return ri
        }), r.d(n, "createRange", function () {
            return oi
        }), r.d(n, "createReshape", function () {
            return si
        }), r.d(n, "createResize", function () {
            return ci
        }), r.d(n, "createRotate", function () {
            return fi
        }), r.d(n, "createRotationMatrix", function () {
            return li
        }), r.d(n, "createRow", function () {
            return pi
        }), r.d(n, "createSize", function () {
            return mi
        }), r.d(n, "createSqueeze", function () {
            return hi
        }), r.d(n, "createSubset", function () {
            return Mi
        }), r.d(n, "createTranspose", function () {
            return Ci
        }), r.d(n, "createCtranspose", function () {
            return _i
        }), r.d(n, "createZeros", function () {
            return Ti
        }), r.d(n, "createErf", function () {
            return zi
        }), r.d(n, "createMode", function () {
            return Ri
        }), r.d(n, "createProd", function () {
            return ji
        }), r.d(n, "createFormat", function () {
            return Ui
        }), r.d(n, "createBin", function () {
            return Fi
        }), r.d(n, "createOct", function () {
            return Li
        }), r.d(n, "createHex", function () {
            return Hi
        }), r.d(n, "createPrint", function () {
            return $i
        }), r.d(n, "createTo", function () {
            return Vi
        }), r.d(n, "createIsPrime", function () {
            return Zi
        }),r.d(n, "createNumeric", function () {
            return Wi
        }),r.d(n, "createDivideScalar", function () {
            return Ji
        }),r.d(n, "createPow", function () {
            return Yi
        }),r.d(n, "createRound", function () {
            return ea
        }),r.d(n, "createLog", function () {
            return ra
        }),r.d(n, "createLog1p", function () {
            return na
        }),r.d(n, "createNthRoots", function () {
            return ia
        }),r.d(n, "createDotPow", function () {
            return aa
        }),r.d(n, "createDotDivide", function () {
            return oa
        }),r.d(n, "createLsolve", function () {
            return ua
        }),r.d(n, "createUsolve", function () {
            return ca
        }),r.d(n, "createLsolveAll", function () {
            return pa
        }),r.d(n, "createUsolveAll", function () {
            return da
        }),r.d(n, "createLeftShift", function () {
            return ga
        }),r.d(n, "createRightArithShift", function () {
            return va
        }),r.d(n, "createRightLogShift", function () {
            return xa
        }),r.d(n, "createAnd", function () {
            return ba
        }),r.d(n, "createCompare", function () {
            return wa
        }),r.d(n, "createCompareNatural", function () {
            return Ma
        }),r.d(n, "createCompareText", function () {
            return Sa
        }),r.d(n, "createEqual", function () {
            return Ea
        }),r.d(n, "createEqualText", function () {
            return Aa
        }),r.d(n, "createSmaller", function () {
            return Oa
        }),r.d(n, "createSmallerEq", function () {
            return Ca
        }),r.d(n, "createLarger", function () {
            return _a
        }),r.d(n, "createLargerEq", function () {
            return Ta
        }),r.d(n, "createDeepEqual", function () {
            return za
        }),r.d(n, "createUnequal", function () {
            return qa
        }),r.d(n, "createPartitionSelect", function () {
            return Ia
        }),r.d(n, "createSort", function () {
            return Ba
        }),r.d(n, "createMax", function () {
            return ka
        }),r.d(n, "createMin", function () {
            return Da
        }),r.d(n, "createImmutableDenseMatrixClass", function () {
            return Ra
        }),r.d(n, "createIndexClass", function () {
            return Pa
        }),r.d(n, "createFibonacciHeapClass", function () {
            return ja
        }),r.d(n, "createSpaClass", function () {
            return Ua
        }),r.d(n, "createUnitClass", function () {
            return Ya
        }),r.d(n, "createUnitFunction", function () {
            return Xa
        }),r.d(n, "createSparse", function () {
            return Qa
        }),r.d(n, "createCreateUnit", function () {
            return Ka
        }),r.d(n, "createAcos", function () {
            return eo
        }),r.d(n, "createAcosh", function () {
            return vo
        }),r.d(n, "createAcot", function () {
            return xo
        }),r.d(n, "createAcoth", function () {
            return bo
        }),r.d(n, "createAcsc", function () {
            return wo
        }),r.d(n, "createAcsch", function () {
            return No
        }),r.d(n, "createAsec", function () {
            return Mo
        }),r.d(n, "createAsech", function () {
            return So
        }),r.d(n, "createAsin", function () {
            return Eo
        }),r.d(n, "createAsinh", function () {
            return Ao
        }),r.d(n, "createAtan", function () {
            return Oo
        }),r.d(n, "createAtan2", function () {
            return Co
        }),r.d(n, "createAtanh", function () {
            return _o
        }),r.d(n, "createCos", function () {
            return To
        }),r.d(n, "createCosh", function () {
            return zo
        }),r.d(n, "createCot", function () {
            return qo
        }),r.d(n, "createCoth", function () {
            return Io
        }),r.d(n, "createCsc", function () {
            return Bo
        }),r.d(n, "createCsch", function () {
            return ko
        }),r.d(n, "createSec", function () {
            return Do
        }),r.d(n, "createSech", function () {
            return Ro
        }),r.d(n, "createSin", function () {
            return Po
        }),r.d(n, "createSinh", function () {
            return jo
        }),r.d(n, "createTan", function () {
            return Uo
        }),r.d(n, "createTanh", function () {
            return Fo
        }),r.d(n, "createSetCartesian", function () {
            return Lo
        }),r.d(n, "createSetDifference", function () {
            return Ho
        }),r.d(n, "createSetDistinct", function () {
            return $o
        }),r.d(n, "createSetIntersect", function () {
            return Go
        }),r.d(n, "createSetIsSubset", function () {
            return Vo
        }),r.d(n, "createSetMultiplicity", function () {
            return Zo
        }),r.d(n, "createSetPowerset", function () {
            return Wo
        }),r.d(n, "createSetSize", function () {
            return Jo
        }),r.d(n, "createSetSymDifference", function () {
            return Yo
        }),r.d(n, "createSetUnion", function () {
            return Xo
        }),r.d(n, "createAdd", function () {
            return Qo
        }),r.d(n, "createHypot", function () {
            return Ko
        }),r.d(n, "createNorm", function () {
            return es
        }),r.d(n, "createDot", function () {
            return ts
        }),r.d(n, "createTrace", function () {
            return rs
        }),r.d(n, "createIndex", function () {
            return ns
        }),r.d(n, "createNode", function () {
            return os
        }),r.d(n, "createAccessorNode", function () {
            return fs
        }),r.d(n, "createArrayNode", function () {
            return ls
        }),r.d(n, "createAssignmentNode", function () {
            return gs
        }),r.d(n, "createBlockNode", function () {
            return vs
        }),r.d(n, "createConditionalNode", function () {
            return xs
        }),r.d(n, "createConstantNode", function () {
            return Os
        }),r.d(n, "createFunctionAssignmentNode", function () {
            return Cs
        }),r.d(n, "createIndexNode", function () {
            return Ts
        }),r.d(n, "createObjectNode", function () {
            return qs
        }),r.d(n, "createOperatorNode", function () {
            return Is
        }),r.d(n, "createParenthesisNode", function () {
            return Bs
        }),r.d(n, "createRangeNode", function () {
            return ks
        }),r.d(n, "createRelationalNode", function () {
            return Ds
        }),r.d(n, "createSymbolNode", function () {
            return Rs
        }),r.d(n, "createFunctionNode", function () {
            return Us
        }),r.d(n, "createParse", function () {
            return Ls
        }),r.d(n, "createCompile", function () {
            return Hs
        }),r.d(n, "createEvaluate", function () {
            return $s
        }),r.d(n, "createParserClass", function () {
            return Gs
        }),r.d(n, "createParser", function () {
            return Vs
        }),r.d(n, "createLup", function () {
            return Zs
        }),r.d(n, "createQr", function () {
            return Js
        }),r.d(n, "createSlu", function () {
            return iu
        }),r.d(n, "createLusolve", function () {
            return ou
        }),r.d(n, "createHelpClass", function () {
            return su
        }),r.d(n, "createChainClass", function () {
            return uu
        }),r.d(n, "createHelp", function () {
            return fu
        }),r.d(n, "createChain", function () {
            return lu
        }),r.d(n, "createDet", function () {
            return pu
        }),r.d(n, "createInv", function () {
            return mu
        }),r.d(n, "createEigs", function () {
            return hu
        }),r.d(n, "createExpm", function () {
            return du
        }),r.d(n, "createSqrtm", function () {
            return yu
        }),r.d(n, "createDivide", function () {
            return gu
        }),r.d(n, "createDistance", function () {
            return vu
        }),r.d(n, "createIntersect", function () {
            return xu
        }),r.d(n, "createSum", function () {
            return bu
        }),r.d(n, "createMean", function () {
            return wu
        }),r.d(n, "createMedian", function () {
            return Nu
        }),r.d(n, "createMad", function () {
            return Mu
        }),r.d(n, "createVariance", function () {
            return Su
        }),r.d(n, "createQuantileSeq", function () {
            return Eu
        }),r.d(n, "createStd", function () {
            return Au
        }),r.d(n, "createCombinations", function () {
            return _u
        }),r.d(n, "createCombinationsWithRep", function () {
            return zu
        }),r.d(n, "createGamma", function () {
            return Du
        }),r.d(n, "createFactorial", function () {
            return Ru
        }),r.d(n, "createKldivergence", function () {
            return Pu
        }),r.d(n, "createMultinomial", function () {
            return ju
        }),r.d(n, "createPermutations", function () {
            return Uu
        }),r.d(n, "createPickRandom", function () {
            return Gu
        }),r.d(n, "createRandom", function () {
            return Zu
        }),r.d(n, "createRandomInt", function () {
            return Wu
        }),r.d(n, "createStirlingS2", function () {
            return Ju
        }),r.d(n, "createBellNumbers", function () {
            return Yu
        }),r.d(n, "createCatalan", function () {
            return Xu
        }),r.d(n, "createComposition", function () {
            return Qu
        }),r.d(n, "createSimplify", function () {
            return ic
        }),r.d(n, "createDerivative", function () {
            return ac
        }),r.d(n, "createRationalize", function () {
            return oc
        }),r.d(n, "createReviver", function () {
            return sc
        }),r.d(n, "createReplacer", function () {
            return uc
        }),r.d(n, "createE", function () {
            return xc
        }),r.d(n, "createUppercaseE", function () {
            return _c
        }),r.d(n, "createFalse", function () {
            return mc
        }),r.d(n, "createI", function () {
            return Oc
        }),r.d(n, "createInfinity", function () {
            return dc
        }),r.d(n, "createLN10", function () {
            return Nc
        }),r.d(n, "createLN2", function () {
            return wc
        }),r.d(n, "createLOG10E", function () {
            return Sc
        }),r.d(n, "createLOG2E", function () {
            return Mc
        }),r.d(n, "createNaN", function () {
            return yc
        }),r.d(n, "createNull", function () {
            return hc
        }),r.d(n, "createPhi", function () {
            return bc
        }),r.d(n, "createPi", function () {
            return gc
        }),r.d(n, "createUppercasePi", function () {
            return Cc
        }),r.d(n, "createSQRT1_2", function () {
            return Ec
        }),r.d(n, "createSQRT2", function () {
            return Ac
        }),r.d(n, "createTau", function () {
            return vc
        }),r.d(n, "createTrue", function () {
            return pc
        }),r.d(n, "createVersion", function () {
            return Tc
        }),r.d(n, "createAtomicMass", function () {
            return uf
        }),r.d(n, "createAvogadro", function () {
            return cf
        }),r.d(n, "createBohrMagneton", function () {
            return Fc
        }),r.d(n, "createBohrRadius", function () {
            return Zc
        }),r.d(n, "createBoltzmann", function () {
            return ff
        }),r.d(n, "createClassicalElectronRadius", function () {
            return Wc
        }),r.d(n, "createConductanceQuantum", function () {
            return Lc
        }),r.d(n, "createCoulomb", function () {
            return jc
        }),r.d(n, "createDeuteronMass", function () {
            return ef
        }),r.d(n, "createEfimovFactor", function () {
            return sf
        }),r.d(n, "createElectricConstant", function () {
            return Rc
        }),r.d(n, "createElectronMass", function () {
            return Jc
        }),r.d(n, "createElementaryCharge", function () {
            return Uc
        }),r.d(n, "createFaraday", function () {
            return lf
        }),r.d(n, "createFermiCoupling", function () {
            return Yc
        }),r.d(n, "createFineStructure", function () {
            return Xc
        }),r.d(n, "createFirstRadiation", function () {
            return pf
        }),r.d(n, "createGasConstant", function () {
            return hf
        }),r.d(n, "createGravitationConstant", function () {
            return Ic
        }),r.d(n, "createGravity", function () {
            return Mf
        }),r.d(n, "createHartreeEnergy", function () {
            return Qc
        }),r.d(n, "createInverseConductanceQuantum", function () {
            return Hc
        }),r.d(n, "createKlitzing", function () {
            return Vc
        }),r.d(n, "createLoschmidt", function () {
            return mf
        }),r.d(n, "createMagneticConstant", function () {
            return Dc
        }),r.d(n, "createMagneticFluxQuantum", function () {
            return $c
        }),r.d(n, "createMolarMass", function () {
            return wf
        }),r.d(n, "createMolarMassC12", function () {
            return Nf
        }),r.d(n, "createMolarPlanckConstant", function () {
            return df
        }),r.d(n, "createMolarVolume", function () {
            return yf
        }),r.d(n, "createNeutronMass", function () {
            return tf
        }),r.d(n, "createNuclearMagneton", function () {
            return Gc
        }),r.d(n, "createPlanckCharge", function () {
            return Of
        }),r.d(n, "createPlanckConstant", function () {
            return Bc
        }),r.d(n, "createPlanckLength", function () {
            return Sf
        }),r.d(n, "createPlanckMass", function () {
            return Ef
        }),r.d(n, "createPlanckTemperature", function () {
            return Cf
        }),r.d(n, "createPlanckTime", function () {
            return Af
        }),r.d(n, "createProtonMass", function () {
            return Kc
        }),r.d(n, "createQuantumOfCirculation", function () {
            return rf
        }),r.d(n, "createReducedPlanckConstant", function () {
            return kc
        }),r.d(n, "createRydberg", function () {
            return nf
        }),r.d(n, "createSackurTetrode", function () {
            return gf
        }),r.d(n, "createSecondRadiation", function () {
            return vf
        }),r.d(n, "createSpeedOfLight", function () {
            return qc
        }),r.d(n, "createStefanBoltzmann", function () {
            return xf
        }),r.d(n, "createThomsonCrossSection", function () {
            return af
        }),r.d(n, "createVacuumImpedance", function () {
            return Pc
        }),r.d(n, "createWeakMixingAngle", function () {
            return of
        }),r.d(n, "createWienDisplacement", function () {
            return bf
        }),r.d(n, "createApplyTransform", function () {
            return zf
        }),r.d(n, "createColumnTransform", function () {
            return qf
        }),r.d(n, "createFilterTransform", function () {
            return Bf
        }),r.d(n, "createForEachTransform", function () {
            return Df
        }),r.d(n, "createIndexTransform", function () {
            return Rf
        }),r.d(n, "createMapTransform", function () {
            return Pf
        }),r.d(n, "createMaxTransform", function () {
            return Ff
        }),r.d(n, "createMeanTransform", function () {
            return Lf
        }),r.d(n, "createMinTransform", function () {
            return Hf
        }),r.d(n, "createRangeTransform", function () {
            return $f
        }),r.d(n, "createRowTransform", function () {
            return Gf
        }),r.d(n, "createSubsetTransform", function () {
            return Vf
        }),r.d(n, "createConcatTransform", function () {
            return Zf
        }),r.d(n, "createDiffTransform", function () {
            return Wf
        }),r.d(n, "createStdTransform", function () {
            return Jf
        }),r.d(n, "createSumTransform", function () {
            return Yf
        }),r.d(n, "createVarianceTransform", function () {
            return Xf
        });
        var x = Array.isArray;

        function E(e) {
            return e && !0 === e.constructor.prototype.isMatrix || !1
        }

        function d(e) {
            return Array.isArray(e) || E(e)
        }

        function g(e) {
            return e && e.isDenseMatrix && !0 === e.constructor.prototype.isMatrix || !1
        }

        function b(e) {
            return e && e.isSparseMatrix && !0 === e.constructor.prototype.isMatrix || !1
        }

        function l(e) {
            return e && !0 === e.constructor.prototype.isRange || !1
        }

        function A(e) {
            return e && !0 === e.constructor.prototype.isIndex || !1
        }

        function p(e) {
            return "boolean" == typeof e
        }

        function m(e) {
            return e && !0 === e.constructor.prototype.isResultSet || !1
        }

        function h(e) {
            return e && !0 === e.constructor.prototype.isHelp || !1
        }

        function y(e) {
            return "function" == typeof e
        }

        function v(e) {
            return e instanceof Date
        }

        function N(e) {
            return e instanceof RegExp
        }

        function O(e) {
            return !(!e || "object" !== i(e) || e.constructor !== Object || Z(e) || w(e))
        }

        function C(e) {
            return null === e
        }

        function _(e) {
            return void 0 === e
        }

        function ue(e) {
            return e && !0 === e.isAccessorNode && !0 === e.constructor.prototype.isNode || !1
        }

        function T(e) {
            return e && !0 === e.isArrayNode && !0 === e.constructor.prototype.isNode || !1
        }

        function z(e) {
            return e && !0 === e.isAssignmentNode && !0 === e.constructor.prototype.isNode || !1
        }

        function q(e) {
            return e && !0 === e.isBlockNode && !0 === e.constructor.prototype.isNode || !1
        }

        function B(e) {
            return e && !0 === e.isConditionalNode && !0 === e.constructor.prototype.isNode || !1
        }

        function ce(e) {
            return e && !0 === e.isConstantNode && !0 === e.constructor.prototype.isNode || !1
        }

        function k(e) {
            return e && !0 === e.isFunctionAssignmentNode && !0 === e.constructor.prototype.isNode || !1
        }

        function fe(e) {
            return e && !0 === e.isFunctionNode && !0 === e.constructor.prototype.isNode || !1
        }

        function D(e) {
            return e && !0 === e.isIndexNode && !0 === e.constructor.prototype.isNode || !1
        }

        function R(e) {
            return e && !0 === e.isNode && !0 === e.constructor.prototype.isNode || !1
        }

        function P(e) {
            return e && !0 === e.isObjectNode && !0 === e.constructor.prototype.isNode || !1
        }

        function le(e) {
            return e && !0 === e.isOperatorNode && !0 === e.constructor.prototype.isNode || !1
        }

        function j(e) {
            return e && !0 === e.isParenthesisNode && !0 === e.constructor.prototype.isNode || !1
        }

        function U(e) {
            return e && !0 === e.isRangeNode && !0 === e.constructor.prototype.isNode || !1
        }

        function pe(e) {
            return e && !0 === e.isSymbolNode && !0 === e.constructor.prototype.isNode || !1
        }

        function F(e) {
            return e && !0 === e.constructor.prototype.isChain || !1
        }

        function J(e) {
            var t = i(e);
            return "object" === t ? null === e ? "null" : Array.isArray(e) ? "Array" : e instanceof Date ? "Date" : e instanceof RegExp ? "RegExp" : I(e) ? "BigNumber" : Z(e) ? "Complex" : w(e) ? "Fraction" : E(e) ? "Matrix" : W(e) ? "Unit" : A(e) ? "Index" : l(e) ? "Range" : m(e) ? "ResultSet" : R(e) ? e.type : F(e) ? "Chain" : h(e) ? "Help" : "Object" : "function" === t ? "Function" : t
        }

        var a = r(8), o = r.n(a);

        function L(e) {
            return "boolean" == typeof e || !!isFinite(e) && e === Math.round(e)
        }

        var s = Math.sign || function (e) {
            return 0 < e ? 1 : e < 0 ? -1 : 0
        }, u = Math.log2 || function (e) {
            return Math.log(e) / Math.LN2
        }, c = Math.log10 || function (e) {
            return Math.log(e) / Math.LN10
        }, f = Math.log1p || function (e) {
            return Math.log(e + 1)
        }, H = Math.cbrt || function (e) {
            if (0 === e) return e;
            var t, r = e < 0;
            return r && (e = -e), t = isFinite(e) ? (e / ((t = Math.exp(Math.log(e) / 3)) * t) + 2 * t) / 3 : e, r ? -t : t
        }, $ = Math.expm1 || function (e) {
            return 2e-4 <= e || e <= -2e-4 ? Math.exp(e) - 1 : e + e * e / 2 + e * e * e / 6
        };

        function G(e, t, r) {
            var n = {2: "0b", 8: "0o", 16: "0x"}[t], i = "";
            if (r) {
                if (r < 1) throw new Error("size must be in greater than 0");
                if (!L(r)) throw new Error("size must be an integer");
                if (e > Math.pow(2, r - 1) - 1 || e < -Math.pow(2, r - 1)) throw new Error("Value must be in range [-2^".concat(r - 1, ", 2^").concat(r - 1, "-1]"));
                if (!L(e)) throw new Error("Value must be an integer");
                e < 0 && (e += Math.pow(2, r)), i = "i".concat(r)
            }
            r = "";
            return e < 0 && (e = -e, r = "-"), "".concat(r).concat(n).concat(e.toString(t)).concat(i)
        }

        function V(e, t) {
            if ("function" == typeof t) return t(e);
            if (e === 1 / 0) return "Infinity";
            if (e === -1 / 0) return "-Infinity";
            if (isNaN(e)) return "NaN";
            var r, n, i = "auto";
            if (t && (t.notation && (i = t.notation), M(t) ? r = t : M(t.precision) && (r = t.precision), t.wordSize && "number" != typeof (n = t.wordSize))) throw new Error('Option "wordSize" must be a number');
            switch (i) {
                case"fixed":
                    return X(e, r);
                case"exponential":
                    return Q(e, r);
                case"engineering":
                    return function (e, t) {
                        if (isNaN(e) || !isFinite(e)) return String(e);
                        var r = K(Y(e), t), n = r.exponent, i = r.coefficients,
                            a = n % 3 == 0 ? n : n < 0 ? n - 3 - n % 3 : n - n % 3;
                        if (M(t)) for (; t > i.length || n - a + 1 > i.length;) i.push(0); else for (var o = Math.abs(n - a) - (i.length - 1), s = 0; s < o; s++) i.push(0);
                        for (var u = Math.abs(n - a), c = 1; 0 < u;) c++, u--;
                        e = i.slice(c).join(""), e = M(t) && e.length || e.match(/[1-9]/) ? "." + e : "", e = i.slice(0, c).join("") + e + "e" + (0 <= n ? "+" : "") + a.toString();
                        return r.sign + e
                    }(e, r);
                case"bin":
                    return G(e, 2, n);
                case"oct":
                    return G(e, 8, n);
                case"hex":
                    return G(e, 16, n);
                case"auto":
                    return function (e, t, r) {
                        if (isNaN(e) || !isFinite(e)) return String(e);
                        var n = r && void 0 !== r.lowerExp ? r.lowerExp : -3,
                            i = r && void 0 !== r.upperExp ? r.upperExp : 5, r = Y(e), r = t ? K(r, t) : r;
                        if (r.exponent < n || r.exponent >= i) return Q(e, t);
                        i = r.coefficients, e = r.exponent;
                        i.length < t && (i = i.concat(ee(t - i.length))), i = i.concat(ee(e - i.length + 1 + (i.length < t ? t - i.length : 0)));
                        t = 0 < e ? e : 0;
                        return t < (i = ee(-e).concat(i)).length - 1 && i.splice(t + 1, 0, "."), r.sign + i.join("")
                    }(e, r, t && t).replace(/((\.\d*?)(0+))($|e)/, function () {
                        var e = arguments[2], t = arguments[4];
                        return "." !== e ? e + t : t
                    });
                default:
                    throw new Error('Unknown notation "' + i + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.')
            }
        }

        function Y(e) {
            var t = String(e).toLowerCase().match(/^0*?(-?)(\d+\.?\d*)(e([+-]?\d+))?$/);
            if (!t) throw new SyntaxError("Invalid number " + e);
            var r = t[1], e = t[2], n = parseFloat(t[4] || "0"), t = e.indexOf(".");
            n += -1 !== t ? t - 1 : e.length - 1;
            e = e.replace(".", "").replace(/^0*/, function (e) {
                return n -= e.length, ""
            }).replace(/0*$/, "").split("").map(function (e) {
                return parseInt(e)
            });
            return 0 === e.length && (e.push(0), n++), {sign: r, coefficients: e, exponent: n}
        }

        function X(e, t) {
            if (isNaN(e) || !isFinite(e)) return String(e);
            var r = Y(e), n = "number" == typeof t ? K(r, r.exponent + 1 + t) : r, e = n.coefficients,
                r = n.exponent + 1, t = r + (t || 0);
            return e.length < t && (e = e.concat(ee(t - e.length))), r < 0 && (e = ee(1 - r).concat(e), r = 1), r < e.length && e.splice(r, 0, 0 === r ? "0." : "."), n.sign + e.join("")
        }

        function Q(e, t) {
            if (isNaN(e) || !isFinite(e)) return String(e);
            var r = Y(e), n = t ? K(r, t) : r, e = n.coefficients, r = n.exponent;
            e.length < t && (e = e.concat(ee(t - e.length)));
            t = e.shift();
            return n.sign + t + (0 < e.length ? "." + e.join("") : "") + "e" + (0 <= r ? "+" : "") + r
        }

        function K(e, t) {
            for (var r = {
                sign: e.sign,
                coefficients: e.coefficients,
                exponent: e.exponent
            }, n = r.coefficients; t <= 0;) n.unshift(0), r.exponent++, t++;
            if (n.length > t && 5 <= n.splice(t, n.length - t)[0]) {
                var i = t - 1;
                for (n[i]++; 10 === n[i];) n.pop(), 0 === i && (n.unshift(0), r.exponent++, i++), n[--i]++
            }
            return r
        }

        function ee(e) {
            for (var t = [], r = 0; r < e; r++) t.push(0);
            return t
        }

        var te = Number.EPSILON || 2220446049250313e-31;

        function re(e, t, r) {
            if (null == r) return e === t;
            if (e === t) return !0;
            if (isNaN(e) || isNaN(t)) return !1;
            if (isFinite(e) && isFinite(t)) {
                var n = Math.abs(e - t);
                return n < te || n <= Math.max(Math.abs(e), Math.abs(t)) * r
            }
            return !1
        }

        var ne = Math.acosh || function (e) {
            return Math.log(Math.sqrt(e * e - 1) + e)
        }, ie = Math.asinh || function (e) {
            return Math.log(Math.sqrt(e * e + 1) + e)
        }, ae = Math.atanh || function (e) {
            return Math.log((1 + e) / (1 - e)) / 2
        }, oe = Math.cosh || function (e) {
            return (Math.exp(e) + Math.exp(-e)) / 2
        }, se = Math.sinh || function (e) {
            return (Math.exp(e) - Math.exp(-e)) / 2
        }, me = Math.tanh || function (e) {
            e = Math.exp(2 * e);
            return (e - 1) / (e + 1)
        };

        function he(e, t, r) {
            var n = new e.constructor(2), i = "";
            if (r) {
                if (r < 1) throw new Error("size must be in greater than 0");
                if (!L(r)) throw new Error("size must be an integer");
                if (e.greaterThan(n.pow(r - 1).sub(1)) || e.lessThan(n.pow(r - 1).mul(-1))) throw new Error("Value must be in range [-2^".concat(r - 1, ", 2^").concat(r - 1, "-1]"));
                if (!e.isInteger()) throw new Error("Value must be an integer");
                e.lessThan(0) && (e = e.add(n.pow(r))), i = "i".concat(r)
            }
            switch (t) {
                case 2:
                    return "".concat(e.toBinary()).concat(i);
                case 8:
                    return "".concat(e.toOctal()).concat(i);
                case 16:
                    return "".concat(e.toHexadecimal()).concat(i);
                default:
                    throw new Error("Base ".concat(t, " not supported "))
            }
        }

        function de(e, t) {
            return void 0 !== t ? e.toExponential(t - 1) : e.toExponential()
        }

        function ye(e) {
            return (ye = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function ge(t, r) {
            return "number" == typeof t ? V(t, r) : I(t) ? function (e, t) {
                if ("function" == typeof t) return t(e);
                if (!e.isFinite()) return e.isNaN() ? "NaN" : e.gt(0) ? "Infinity" : "-Infinity";
                var r, n, i, a = "auto";
                if (void 0 !== t && (t.notation && (a = t.notation), "number" == typeof t ? r = t : t.precision && (r = t.precision), t.wordSize && "number" != typeof (u = t.wordSize))) throw new Error('Option "wordSize" must be a number');
                switch (a) {
                    case"fixed":
                        return e.toFixed(r);
                    case"exponential":
                        return de(e, r);
                    case"engineering":
                        return n = r, o = e.e, s = o % 3 == 0 ? o : o < 0 ? o - 3 - o % 3 : o - o % 3, i = e.mul(Math.pow(10, -s)), -1 !== (n = i.toPrecision(n)).indexOf("e") && (n = i.toString()), n + "e" + (0 <= o ? "+" : "") + s.toString();
                    case"bin":
                        return he(e, 2, u);
                    case"oct":
                        return he(e, 8, u);
                    case"hex":
                        return he(e, 16, u);
                    case"auto":
                        var o = t && void 0 !== t.lowerExp ? t.lowerExp : -3,
                            s = t && void 0 !== t.upperExp ? t.upperExp : 5;
                        if (e.isZero()) return "0";
                        var u = e.toSignificantDigits(r), t = u.e;
                        return (o <= t && t < s ? u.toFixed() : de(e, r)).replace(/((\.\d*?)(0+))($|e)/, function () {
                            var e = arguments[2], t = arguments[4];
                            return "." !== e ? e + t : t
                        });
                    default:
                        throw new Error('Unknown notation "' + a + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.')
                }
            }(t, r) : (e = t) && "object" === ye(e) && "number" == typeof e.s && "number" == typeof e.n && "number" == typeof e.d ? r && "decimal" === r.fraction ? t.toString() : t.s * t.n + "/" + t.d : Array.isArray(t) ? function e(t, r) {
                if (Array.isArray(t)) {
                    for (var n = "[", i = t.length, a = 0; a < i; a++) 0 !== a && (n += ", "), n += e(t[a], r);
                    return n + "]"
                }
                return ge(t, r)
            }(t, r) : S(t) ? '"' + t + '"' : "function" == typeof t ? t.syntax ? String(t.syntax) : "function" : t && "object" === ye(t) ? "function" == typeof t.format ? t.format(r) : t && t.toString(r) !== {}.toString() ? t.toString(r) : "{" + Object.keys(t).map(function (e) {
                return '"' + e + '": ' + ge(t[e], r)
            }).join(", ") + "}" : String(t);
            var e
        }

        function ve(e) {
            for (var t = String(e), r = "", n = 0; n < t.length;) {
                var i = t.charAt(n);
                "\\" === i ? (r += i, n++, "" !== (i = t.charAt(n)) && -1 !== '"\\/bfnrtu'.indexOf(i) || (r += "\\"), r += i) : r += '"' === i ? '\\"' : i, n++
            }
            return '"' + r + '"'
        }

        function xe(e) {
            e = String(e);
            return e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        }

        function be(e, t) {
            if (!S(e)) throw new TypeError("Unexpected type of argument in function compareText (expected: string or Array or Matrix, actual: " + J(e) + ", index: 0)");
            if (!S(t)) throw new TypeError("Unexpected type of argument in function compareText (expected: string or Array or Matrix, actual: " + J(t) + ", index: 1)");
            return e === t ? 0 : t < e ? 1 : -1
        }

        function we(e, t, r) {
            if (!(this instanceof we)) throw new SyntaxError("Constructor must be called with the new operator");
            this.actual = e, this.expected = t, this.relation = r, this.message = "Dimension mismatch (" + (Array.isArray(e) ? "[" + e.join(", ") + "]" : e) + " " + (this.relation || "!=") + " " + (Array.isArray(t) ? "[" + t.join(", ") + "]" : t) + ")", this.stack = (new Error).stack
        }

        function Ne(e, t, r) {
            if (!(this instanceof Ne)) throw new SyntaxError("Constructor must be called with the new operator");
            this.index = e, arguments.length < 3 ? (this.min = 0, this.max = t) : (this.min = t, this.max = r), void 0 !== this.min && this.index < this.min ? this.message = "Index out of range (" + this.index + " < " + this.min + ")" : void 0 !== this.max && this.index >= this.max ? this.message = "Index out of range (" + this.index + " > " + (this.max - 1) + ")" : this.message = "Index out of range (" + this.index + ")", this.stack = (new Error).stack
        }

        function Me(e) {
            for (var t = []; Array.isArray(e);) t.push(e.length), e = e[0];
            return t
        }

        function Se(e, t) {
            if (0 === t.length) {
                if (Array.isArray(e)) throw new we(e.length, 0)
            } else !function e(t, r, n) {
                var i = t.length;
                if (i !== r[n]) throw new we(i, r[n]);
                if (n < r.length - 1) for (var a = n + 1, o = 0; o < i; o++) {
                    var s = t[o];
                    if (!Array.isArray(s)) throw new we(r.length - 1, r.length, "<");
                    e(t[o], r, a)
                } else for (o = 0; o < i; o++) if (Array.isArray(t[o])) throw new we(r.length + 1, r.length, ">")
            }(e, t, 0)
        }

        function Ee(e, t) {
            if (!M(e) || !L(e)) throw new TypeError("Index must be an integer (value: " + e + ")");
            if (e < 0 || "number" == typeof t && t <= e) throw new Ne(e, t)
        }

        function Ae(e, t, r) {
            if (!Array.isArray(e) || !Array.isArray(t)) throw new TypeError("Array expected");
            if (0 === t.length) throw new Error("Resizing to scalar is not supported");
            return t.forEach(function (e) {
                if (!M(e) || !L(e) || e < 0) throw new TypeError("Invalid size, must contain positive integers (size: " + ge(t) + ")")
            }), function e(t, r, n, i) {
                var a, o = t.length, s = r[n], u = Math.min(o, s);
                if (t.length = s, n < r.length - 1) {
                    for (var c = n + 1, f = 0; f < u; f++) a = t[f], Array.isArray(a) || (a = [a], t[f] = a), e(a, r, c, i);
                    for (f = u; f < s; f++) a = [], e(t[f] = a, r, c, i)
                } else {
                    for (f = 0; f < u; f++) for (; Array.isArray(t[f]);) t[f] = t[f][0];
                    for (f = u; f < s; f++) t[f] = i
                }
            }(e, t, 0, void 0 !== r ? r : 0), e
        }

        function Oe(e, t) {
            var s = qe(e), r = s.length;
            if (!Array.isArray(e) || !Array.isArray(t)) throw new TypeError("Array expected");
            if (0 === t.length) throw new we(0, r, "!=");
            var n = _e(t = Ce(t, r));
            if (r !== n) throw new we(n, r, "!=");
            try {
                return function (e) {
                    for (var t = s, r = e.length - 1; 0 < r; r--) {
                        for (var n = e[r], i = [], a = t.length / n, o = 0; o < a; o++) i.push(t.slice(o * n, (o + 1) * n));
                        t = i
                    }
                    return t
                }(t)
            } catch (e) {
                if (e instanceof we) throw new we(n, r, "!=");
                throw e
            }
        }

        function Ce(e, t) {
            var r = _e(e), n = e.slice(), i = e.indexOf(-1);
            if (0 <= e.indexOf(-1, i + 1)) throw new Error("More than one wildcard in sizes");
            if (0 <= i) {
                if (t % r != 0) throw new Error("Could not replace wildcard, since " + t + " is no multiple of " + -r);
                n[i] = -t / r
            }
            return n
        }

        function _e(e) {
            return e.reduce(function (e, t) {
                return e * t
            }, 1)
        }

        function Te(e, t) {
            for (var r = t || Me(e); Array.isArray(e) && 1 === e.length;) e = e[0], r.shift();
            for (var n = r.length; 1 === r[n - 1];) n--;
            return n < r.length && (e = function e(t, r, n) {
                if (n < r) for (var i = n + 1, a = 0, o = t.length; a < o; a++) t[a] = e(t[a], r, i); else for (; Array.isArray(t);) t = t[0];
                return t
            }(e, n, 0), r.length = n), e
        }

        function ze(e, t, r, n) {
            var i = n || Me(e);
            if (r) for (var a = 0; a < r; a++) e = [e], i.unshift(1);
            for (e = function e(t, r, n) {
                if (Array.isArray(t)) for (var i = n + 1, a = 0, o = t.length; a < o; a++) t[a] = e(t[a], r, i); else for (var s = n; s < r; s++) t = [t];
                return t
            }(e, t, 0); i.length < t;) i.push(1);
            return e
        }

        function qe(e) {
            if (!Array.isArray(e)) return e;
            var r = [];
            return e.forEach(function e(t) {
                Array.isArray(t) ? t.forEach(e) : r.push(t)
            }), r
        }

        function Ie(e, t) {
            return Array.prototype.map.call(e, t)
        }

        function Be(e, t) {
            Array.prototype.forEach.call(e, t)
        }

        function ke(e, t) {
            if (1 !== Me(e).length) throw new Error("Only one dimensional matrices supported");
            return Array.prototype.filter.call(e, t)
        }

        function De(e, t) {
            if (1 !== Me(e).length) throw new Error("Only one dimensional matrices supported");
            return Array.prototype.filter.call(e, function (e) {
                return t.test(e)
            })
        }

        function Re(e, t) {
            return Array.prototype.join.call(e, t)
        }

        function Pe(e) {
            if (!Array.isArray(e)) throw new TypeError("Array input expected");
            if (0 === e.length) return e;
            var t = [], r = 0;
            t[0] = {value: e[0], identifier: 0};
            for (var n = 1; n < e.length; n++) e[n] === e[n - 1] ? r++ : r = 0, t.push({value: e[n], identifier: r});
            return t
        }

        function je(e) {
            if (!Array.isArray(e)) throw new TypeError("Array input expected");
            if (0 === e.length) return e;
            for (var t = [], r = 0; r < e.length; r++) t.push(e[r].value);
            return t
        }

        function Ue(e, t) {
            for (var r, n = 0, i = 0; i < e.length; i++) {
                var a = e[i], o = Array.isArray(a);
                if (0 === i && o && (n = a.length), o && a.length !== n) return;
                a = o ? Ue(a, t) : t(a);
                if (void 0 === r) r = a; else if (r !== a) return "mixed"
            }
            return r
        }

        function Fe(e, t) {
            return -1 !== e.indexOf(t)
        }

        function Le(e) {
            return (Le = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function He(e) {
            var t = Le(e);
            if ("number" === t || "string" === t || "boolean" === t || null == e) return e;
            if ("function" == typeof e.clone) return e.clone();
            if (Array.isArray(e)) return e.map(He);
            if (e instanceof Date) return new Date(e.valueOf());
            if (I(e)) return e;
            if (e instanceof RegExp) throw new TypeError("Cannot clone " + e);
            return $e(e, He)
        }

        function $e(e, t) {
            var r, n = {};
            for (r in e) We(e, r) && (n[r] = t(e[r]));
            return n
        }

        function Ge(e, t) {
            for (var r in t) We(t, r) && (e[r] = t[r]);
            return e
        }

        function Ve(e, t) {
            var r, n, i;
            if (Array.isArray(e)) {
                if (!Array.isArray(t)) return !1;
                if (e.length !== t.length) return !1;
                for (n = 0, i = e.length; n < i; n++) if (!Ve(e[n], t[n])) return !1;
                return !0
            }
            if ("function" == typeof e) return e === t;
            if (e instanceof Object) {
                if (Array.isArray(t) || !(t instanceof Object)) return !1;
                for (r in e) if (!(r in t && Ve(e[r], t[r]))) return !1;
                for (r in t) if (!(r in e && Ve(e[r], t[r]))) return !1;
                return !0
            }
            return e === t
        }

        function Ze(e, t, r) {
            var n, i = !0;
            Object.defineProperty(e, t, {
                get: function () {
                    return i && (n = r(), i = !1), n
                }, set: function (e) {
                    n = e, i = !1
                }, configurable: !0, enumerable: !0
            })
        }

        function We(e, t) {
            return e && Object.hasOwnProperty.call(e, t)
        }

        function Je(t) {
            return Object.keys(t).map(function (e) {
                return t[e]
            })
        }

        function Ye(r, n, i, e) {
            function t(e) {
                var t = function (e, t) {
                    for (var r = {}, n = 0; n < t.length; n++) {
                        var i = t[n], a = e[i];
                        void 0 !== a && (r[i] = a)
                    }
                    return r
                }(e, n.map(Qe));
                return function (e, t, r) {
                    if (!t.filter(function (e) {
                        return !(e && "?" === e[0])
                    }).every(function (e) {
                        return void 0 !== r[e]
                    })) {
                        t = t.filter(function (e) {
                            return void 0 === r[e]
                        });
                        throw new Error('Cannot create function "'.concat(e, '", ') + "some dependencies are missing: ".concat(t.map(function (e) {
                            return '"'.concat(e, '"')
                        }).join(", "), "."))
                    }
                }(r, n, e), i(t)
            }

            return t.isFactory = !0, t.fn = r, t.dependencies = n.slice().sort(), e && (t.meta = e), t
        }

        function Xe(e) {
            return "function" == typeof e && "string" == typeof e.fn && Array.isArray(e.dependencies)
        }

        function Qe(e) {
            return e && "?" === e[0] ? e.slice(1) : e
        }

        (we.prototype = new RangeError).constructor = RangeError, we.prototype.name = "DimensionError", we.prototype.isDimensionError = !0, (Ne.prototype = new RangeError).constructor = RangeError, Ne.prototype.name = "IndexError", Ne.prototype.isIndexError = !0;
        var Ke = function () {
            return Ke = o.a.create, o.a
        }, et = Ye("typed", ["?BigNumber", "?Complex", "?DenseMatrix", "?Fraction"], function (e) {
            var r = e.BigNumber, n = e.Complex, t = e.DenseMatrix, i = e.Fraction, e = Ke();
            return e.types = [{name: "number", test: M}, {name: "Complex", test: Z}, {
                name: "BigNumber",
                test: I
            }, {name: "Fraction", test: w}, {name: "Unit", test: W}, {name: "string", test: S}, {
                name: "Chain",
                test: F
            }, {name: "Array", test: x}, {name: "Matrix", test: E}, {
                name: "DenseMatrix",
                test: g
            }, {name: "SparseMatrix", test: b}, {name: "Range", test: l}, {name: "Index", test: A}, {
                name: "boolean",
                test: p
            }, {name: "ResultSet", test: m}, {name: "Help", test: h}, {name: "function", test: y}, {
                name: "Date",
                test: v
            }, {name: "RegExp", test: N}, {name: "null", test: C}, {name: "undefined", test: _}, {
                name: "AccessorNode",
                test: ue
            }, {name: "ArrayNode", test: T}, {name: "AssignmentNode", test: z}, {
                name: "BlockNode",
                test: q
            }, {name: "ConditionalNode", test: B}, {name: "ConstantNode", test: ce}, {
                name: "FunctionNode",
                test: fe
            }, {name: "FunctionAssignmentNode", test: k}, {name: "IndexNode", test: D}, {
                name: "Node",
                test: R
            }, {name: "ObjectNode", test: P}, {name: "OperatorNode", test: le}, {
                name: "ParenthesisNode",
                test: j
            }, {name: "RangeNode", test: U}, {name: "SymbolNode", test: pe}, {
                name: "Object",
                test: O
            }], e.conversions = [{
                from: "number", to: "BigNumber", convert: function (e) {
                    if (r || tt(e), 15 < e.toExponential().replace(/e.*$/, "").replace(/^0\.?0*|\./, "").length) throw new TypeError("Cannot implicitly convert a number with >15 significant digits to BigNumber (value: " + e + "). Use function bignumber(x) to convert to BigNumber.");
                    return new r(e)
                }
            }, {
                from: "number", to: "Complex", convert: function (e) {
                    return n || rt(e), new n(e, 0)
                }
            }, {
                from: "number", to: "string", convert: function (e) {
                    return e + ""
                }
            }, {
                from: "BigNumber", to: "Complex", convert: function (e) {
                    return n || rt(e), new n(e.toNumber(), 0)
                }
            }, {
                from: "Fraction", to: "BigNumber", convert: function (e) {
                    throw new TypeError("Cannot implicitly convert a Fraction to BigNumber or vice versa. Use function bignumber(x) to convert to BigNumber or fraction(x) to convert to Fraction.")
                }
            }, {
                from: "Fraction", to: "Complex", convert: function (e) {
                    return n || rt(e), new n(e.valueOf(), 0)
                }
            }, {
                from: "number", to: "Fraction", convert: function (e) {
                    i || nt(e);
                    var t = new i(e);
                    if (t.valueOf() !== e) throw new TypeError("Cannot implicitly convert a number to a Fraction when there will be a loss of precision (value: " + e + "). Use function fraction(x) to convert to Fraction.");
                    return t
                }
            }, {
                from: "string", to: "number", convert: function (e) {
                    var t = Number(e);
                    if (isNaN(t)) throw new Error('Cannot convert "' + e + '" to a number');
                    return t
                }
            }, {
                from: "string", to: "BigNumber", convert: function (t) {
                    r || tt(t);
                    try {
                        return new r(t)
                    } catch (e) {
                        throw new Error('Cannot convert "' + t + '" to BigNumber')
                    }
                }
            }, {
                from: "string", to: "Fraction", convert: function (t) {
                    i || nt(t);
                    try {
                        return new i(t)
                    } catch (e) {
                        throw new Error('Cannot convert "' + t + '" to Fraction')
                    }
                }
            }, {
                from: "string", to: "Complex", convert: function (t) {
                    n || rt(t);
                    try {
                        return new n(t)
                    } catch (e) {
                        throw new Error('Cannot convert "' + t + '" to Complex')
                    }
                }
            }, {
                from: "boolean", to: "number", convert: function (e) {
                    return +e
                }
            }, {
                from: "boolean", to: "BigNumber", convert: function (e) {
                    return r || tt(e), new r(+e)
                }
            }, {
                from: "boolean", to: "Fraction", convert: function (e) {
                    return i || nt(e), new i(+e)
                }
            }, {
                from: "boolean", to: "string", convert: function (e) {
                    return String(e)
                }
            }, {
                from: "Array", to: "Matrix", convert: function (e) {
                    return t || function () {
                        throw new Error("Cannot convert array into a Matrix: no class 'DenseMatrix' provided")
                    }(), new t(e)
                }
            }, {
                from: "Matrix", to: "Array", convert: function (e) {
                    return e.valueOf()
                }
            }], e
        });

        function tt(e) {
            throw new Error("Cannot convert value ".concat(e, " into a BigNumber: no class 'BigNumber' provided"))
        }

        function rt(e) {
            throw new Error("Cannot convert value ".concat(e, " into a Complex number: no class 'Complex' provided"))
        }

        function nt(e) {
            throw new Error("Cannot convert value ".concat(e, " into a Fraction, no class 'Fraction' provided."))
        }

        var it = Ye("ResultSet", [], function () {
            function t(e) {
                if (!(this instanceof t)) throw new SyntaxError("Constructor must be called with the new operator");
                this.entries = e || []
            }

            return t.prototype.type = "ResultSet", t.prototype.isResultSet = !0, t.prototype.valueOf = function () {
                return this.entries
            }, t.prototype.toString = function () {
                return "[" + this.entries.join(", ") + "]"
            }, t.prototype.toJSON = function () {
                return {mathjs: "ResultSet", entries: this.entries}
            }, t.fromJSON = function (e) {
                return new t(e.entries)
            }, t
        }, {isClass: !0}), at = r(7), ot = r.n(at), st = Ye("BigNumber", ["?on", "config"], function (e) {
            var t = e.on, e = e.config, r = ot.a.clone({precision: e.precision, modulo: 9});
            return r.prototype.type = "BigNumber", r.prototype.isBigNumber = !0, r.prototype.toJSON = function () {
                return {mathjs: "BigNumber", value: this.toString()}
            }, r.fromJSON = function (e) {
                return new r(e.value)
            }, t && t("config", function (e, t) {
                e.precision !== t.precision && r.config({precision: e.precision})
            }), r
        }, {isClass: !0}), a = r(1), ut = r.n(a);

        function ct(e) {
            return (ct = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        var ft = Ye("Complex", [], function () {
            return ut.a.prototype.type = "Complex", ut.a.prototype.isComplex = !0, ut.a.prototype.toJSON = function () {
                return {mathjs: "Complex", re: this.re, im: this.im}
            }, ut.a.prototype.toPolar = function () {
                return {r: this.abs(), phi: this.arg()}
            }, ut.a.prototype.format = function (e) {
                var t = this.im, r = this.re, n = V(this.re, e), i = V(this.im, e),
                    e = M(e) ? e : e ? e.precision : null;
                return null !== e && (e = Math.pow(10, -e), Math.abs(r / t) < e && (r = 0), Math.abs(t / r) < e && (t = 0)), 0 === t ? n : 0 === r ? 1 === t ? "i" : -1 === t ? "-i" : i + "i" : t < 0 ? -1 === t ? n + " - i" : n + " - " + i.substring(1) + "i" : 1 === t ? n + " + i" : n + " + " + i + "i"
            }, ut.a.fromPolar = function (e) {
                switch (arguments.length) {
                    case 1:
                        var t = e;
                        if ("object" === ct(t)) return ut()(t);
                        throw new TypeError("Input has to be an object with r and phi keys.");
                    case 2:
                        t = e, e = arguments[1];
                        if (M(t)) {
                            if (W(e) && e.hasBase("ANGLE") && (e = e.toNumber("rad")), M(e)) return new ut.a({
                                r: t,
                                phi: e
                            });
                            throw new TypeError("Phi is not a number nor an angle unit.")
                        }
                        throw new TypeError("Radius r is not a number.");
                    default:
                        throw new SyntaxError("Wrong number of arguments in function fromPolar")
                }
            }, ut.a.prototype.valueOf = ut.a.prototype.toString, ut.a.fromJSON = function (e) {
                return new ut.a(e)
            }, ut.a.compare = function (e, t) {
                return e.re > t.re ? 1 : e.re < t.re ? -1 : e.im > t.im ? 1 : e.im < t.im ? -1 : 0
            }, ut.a
        }, {isClass: !0}), at = r(3), lt = r.n(at), pt = Ye("Fraction", [], function () {
            return lt.a.prototype.type = "Fraction", lt.a.prototype.isFraction = !0, lt.a.prototype.toJSON = function () {
                return {mathjs: "Fraction", n: this.s * this.n, d: this.d}
            }, lt.a.fromJSON = function (e) {
                return new lt.a(e)
            }, lt.a
        }, {isClass: !0}), mt = Ye("Range", [], function () {
            function o(e, t, r) {
                if (!(this instanceof o)) throw new SyntaxError("Constructor must be called with the new operator");
                var n = null != e, i = null != t, a = null != r;
                if (n) if (I(e)) e = e.toNumber(); else if ("number" != typeof e) throw new TypeError("Parameter start must be a number");
                if (i) if (I(t)) t = t.toNumber(); else if ("number" != typeof t) throw new TypeError("Parameter end must be a number");
                if (a) if (I(r)) r = r.toNumber(); else if ("number" != typeof r) throw new TypeError("Parameter step must be a number");
                this.start = n ? parseFloat(e) : 0, this.end = i ? parseFloat(t) : 0, this.step = a ? parseFloat(r) : 1
            }

            return o.prototype.type = "Range", o.prototype.isRange = !0, o.parse = function (e) {
                if ("string" != typeof e) return null;
                e = e.split(":").map(function (e) {
                    return parseFloat(e)
                });
                if (e.some(function (e) {
                    return isNaN(e)
                })) return null;
                switch (e.length) {
                    case 2:
                        return new o(e[0], e[1]);
                    case 3:
                        return new o(e[0], e[2], e[1]);
                    default:
                        return null
                }
            }, o.prototype.clone = function () {
                return new o(this.start, this.end, this.step)
            }, o.prototype.size = function () {
                var e = 0, t = this.start, r = this.step, t = this.end - t;
                return s(r) === s(t) ? e = Math.ceil(t / r) : 0 == t && (e = 0), isNaN(e) && (e = 0), [e]
            }, o.prototype.min = function () {
                var e = this.size()[0];
                return 0 < e ? 0 < this.step ? this.start : this.start + (e - 1) * this.step : void 0
            }, o.prototype.max = function () {
                var e = this.size()[0];
                return 0 < e ? 0 < this.step ? this.start + (e - 1) * this.step : this.start : void 0
            }, o.prototype.forEach = function (e) {
                var t = this.start, r = this.step, n = this.end, i = 0;
                if (0 < r) for (; t < n;) e(t, [i], this), t += r, i++; else if (r < 0) for (; n < t;) e(t, [i], this), t += r, i++
            }, o.prototype.map = function (n) {
                var i = [];
                return this.forEach(function (e, t, r) {
                    i[t[0]] = n(e, t, r)
                }), i
            }, o.prototype.toArray = function () {
                var r = [];
                return this.forEach(function (e, t) {
                    r[t[0]] = e
                }), r
            }, o.prototype.valueOf = function () {
                return this.toArray()
            }, o.prototype.format = function (e) {
                var t = V(this.start, e);
                return 1 !== this.step && (t += ":" + V(this.step, e)), t + (":" + V(this.end, e))
            }, o.prototype.toString = function () {
                return this.format()
            }, o.prototype.toJSON = function () {
                return {mathjs: "Range", start: this.start, end: this.end, step: this.step}
            }, o.fromJSON = function (e) {
                return new o(e.start, e.end, e.step)
            }, o
        }, {isClass: !0}), ht = Ye("Matrix", [], function () {
            function e() {
                if (!(this instanceof e)) throw new SyntaxError("Constructor must be called with the new operator")
            }

            return e.prototype.type = "Matrix", e.prototype.isMatrix = !0, e.prototype.storage = function () {
                throw new Error("Cannot invoke storage on a Matrix interface")
            }, e.prototype.datatype = function () {
                throw new Error("Cannot invoke datatype on a Matrix interface")
            }, e.prototype.create = function (e, t) {
                throw new Error("Cannot invoke create on a Matrix interface")
            }, e.prototype.subset = function (e, t, r) {
                throw new Error("Cannot invoke subset on a Matrix interface")
            }, e.prototype.get = function (e) {
                throw new Error("Cannot invoke get on a Matrix interface")
            }, e.prototype.set = function (e, t, r) {
                throw new Error("Cannot invoke set on a Matrix interface")
            }, e.prototype.resize = function (e, t) {
                throw new Error("Cannot invoke resize on a Matrix interface")
            }, e.prototype.reshape = function (e, t) {
                throw new Error("Cannot invoke reshape on a Matrix interface")
            }, e.prototype.clone = function () {
                throw new Error("Cannot invoke clone on a Matrix interface")
            }, e.prototype.size = function () {
                throw new Error("Cannot invoke size on a Matrix interface")
            }, e.prototype.map = function (e, t) {
                throw new Error("Cannot invoke map on a Matrix interface")
            }, e.prototype.forEach = function (e) {
                throw new Error("Cannot invoke forEach on a Matrix interface")
            }, e.prototype.toArray = function () {
                throw new Error("Cannot invoke toArray on a Matrix interface")
            }, e.prototype.valueOf = function () {
                throw new Error("Cannot invoke valueOf on a Matrix interface")
            }, e.prototype.format = function (e) {
                throw new Error("Cannot invoke format on a Matrix interface")
            }, e.prototype.toString = function () {
                throw new Error("Cannot invoke toString on a Matrix interface")
            }, e
        }, {isClass: !0}), dt = Ye("DenseMatrix", ["Matrix"], function (e) {
            e = e.Matrix;

            function p(e, t) {
                if (!(this instanceof p)) throw new SyntaxError("Constructor must be called with the new operator");
                if (t && !S(t)) throw new Error("Invalid datatype: " + t);
                if (E(e)) "DenseMatrix" === e.type ? (this._data = He(e._data), this._size = He(e._size)) : (this._data = e.toArray(), this._size = e.size()), this._datatype = t || e._datatype; else if (e && x(e.data) && x(e.size)) this._data = e.data, this._size = e.size, Se(this._data, this._size), this._datatype = t || e.datatype; else if (x(e)) this._data = function e(t) {
                    for (var r = 0, n = t.length; r < n; r++) {
                        var i = t[r];
                        x(i) ? t[r] = e(i) : i && !0 === i.isMatrix && (t[r] = e(i.valueOf()))
                    }
                    return t
                }(e), this._size = Me(this._data), Se(this._data, this._size), this._datatype = t; else {
                    if (e) throw new TypeError("Unsupported type of data (" + J(e) + ")");
                    this._data = [], this._size = [0], this._datatype = t
                }
            }

            function s(e, t, r) {
                if (0 !== t.length) return e._size = t.slice(0), e._data = Ae(e._data, e._size, r), e;
                for (var n = e._data; x(n);) n = n[0];
                return n
            }

            function c(e, t, r) {
                for (var n = e._size.slice(0), i = !1; n.length < t.length;) n.push(0), i = !0;
                for (var a = 0, o = t.length; a < o; a++) t[a] > n[a] && (n[a] = t[a], i = !0);
                i && s(e, n, r)
            }

            return (p.prototype = new e).createDenseMatrix = function (e, t) {
                return new p(e, t)
            }, p.prototype.type = "DenseMatrix", p.prototype.isDenseMatrix = !0, p.prototype.getDataType = function () {
                return Ue(this._data, J)
            }, p.prototype.storage = function () {
                return "dense"
            }, p.prototype.datatype = function () {
                return this._datatype
            }, p.prototype.create = function (e, t) {
                return new p(e, t)
            }, p.prototype.subset = function (e, t, r) {
                switch (arguments.length) {
                    case 1:
                        return function (e, t) {
                            if (!A(t)) throw new TypeError("Invalid index");
                            if (t.isScalar()) return e.get(t.min());
                            var r = t.size();
                            if (r.length !== e._size.length) throw new we(r.length, e._size.length);
                            for (var n = t.min(), i = t.max(), a = 0, o = e._size.length; a < o; a++) Ee(n[a], e._size[a]), Ee(i[a], e._size[a]);
                            return new p(function t(r, n, i, a) {
                                var e = a === i - 1, o = n.dimension(a);
                                return (e ? o.map(function (e) {
                                    return Ee(e, r.length), r[e]
                                }) : o.map(function (e) {
                                    Ee(e, r.length);
                                    e = r[e];
                                    return t(e, n, i, a + 1)
                                })).valueOf()
                            }(e._data, t, r.length, 0), e._datatype)
                        }(this, e);
                    case 2:
                    case 3:
                        return function (e, t, r, n) {
                            if (!t || !0 !== t.isIndex) throw new TypeError("Invalid index");
                            var i, a = t.size(), o = t.isScalar();
                            if (E(r) ? (i = r.size(), r = r.valueOf()) : i = Me(r), o) {
                                if (0 !== i.length) throw new TypeError("Scalar expected");
                                e.set(t.min(), r, n)
                            } else {
                                if (a.length < e._size.length) throw new we(a.length, e._size.length, "<");
                                if (i.length < a.length) {
                                    for (var s = 0, u = 0; 1 === a[s] && 1 === i[s];) s++;
                                    for (; 1 === a[s];) u++, s++;
                                    r = ze(r, a.length, u, i)
                                }
                                if (!Ve(a, i)) throw new we(a, i, ">");
                                c(e, t.max().map(function (e) {
                                    return e + 1
                                }), n);
                                n = a.length;
                                !function r(n, i, a, o, s) {
                                    var e = s === o - 1, t = i.dimension(s);
                                    e ? t.forEach(function (e, t) {
                                        Ee(e), n[e] = a[t[0]]
                                    }) : t.forEach(function (e, t) {
                                        Ee(e), r(n[e], i, a[t[0]], o, s + 1)
                                    })
                                }(e._data, t, r, n, 0)
                            }
                            return e
                        }(this, e, t, r);
                    default:
                        throw new SyntaxError("Wrong number of arguments")
                }
            }, p.prototype.get = function (e) {
                if (!x(e)) throw new TypeError("Array expected");
                if (e.length !== this._size.length) throw new we(e.length, this._size.length);
                for (var t = 0; t < e.length; t++) Ee(e[t], this._size[t]);
                for (var r = this._data, n = 0, i = e.length; n < i; n++) {
                    var a = e[n];
                    Ee(a, r.length), r = r[a]
                }
                return r
            }, p.prototype.set = function (e, t, r) {
                if (!x(e)) throw new TypeError("Array expected");
                if (e.length < this._size.length) throw new we(e.length, this._size.length, "<");
                var n;
                c(this, e.map(function (e) {
                    return e + 1
                }), r);
                for (var i = this._data, a = 0, o = e.length - 1; a < o; a++) Ee(n = e[a], i.length), i = i[n];
                return Ee(n = e[e.length - 1], i.length), i[n] = t, this
            }, p.prototype.resize = function (e, t, r) {
                if (!d(e)) throw new TypeError("Array or Matrix expected");
                e = e.valueOf().map(function (e) {
                    return Array.isArray(e) && 1 === e.length ? e[0] : e
                });
                return s(r ? this.clone() : this, e, t)
            }, p.prototype.reshape = function (e, t) {
                var r = t ? this.clone() : this;
                r._data = Oe(r._data, e);
                t = r._size.reduce(function (e, t) {
                    return e * t
                });
                return r._size = Ce(e, t), r
            }, p.prototype.clone = function () {
                return new p({data: He(this._data), size: He(this._size), datatype: this._datatype})
            }, p.prototype.size = function () {
                return this._size.slice(0)
            }, p.prototype.map = function (t) {
                var i = this, e = function r(e, n) {
                    return x(e) ? e.map(function (e, t) {
                        return r(e, n.concat(t))
                    }) : t(e, n, i)
                }(this._data, []);
                return new p(e, void 0 !== this._datatype ? Ue(e, J) : void 0)
            }, p.prototype.forEach = function (t) {
                var i = this;
                !function r(e, n) {
                    x(e) ? e.forEach(function (e, t) {
                        r(e, n.concat(t))
                    }) : t(e, n, i)
                }(this._data, [])
            }, p.prototype.toArray = function () {
                return He(this._data)
            }, p.prototype.valueOf = function () {
                return this._data
            }, p.prototype.format = function (e) {
                return ge(this._data, e)
            }, p.prototype.toString = function () {
                return ge(this._data)
            }, p.prototype.toJSON = function () {
                return {mathjs: "DenseMatrix", data: this._data, size: this._size, datatype: this._datatype}
            }, p.prototype.diagonal = function (e) {
                if (e) {
                    if (I(e) && (e = e.toNumber()), !M(e) || !L(e)) throw new TypeError("The parameter k must be an integer number")
                } else e = 0;
                for (var t = 0 < e ? e : 0, r = e < 0 ? -e : 0, n = this._size[0], e = this._size[1], i = Math.min(n - r, e - t), a = [], o = 0; o < i; o++) a[o] = this._data[o + r][o + t];
                return new p({data: a, size: [i], datatype: this._datatype})
            }, p.diagonal = function (e, t, r, n) {
                if (!x(e)) throw new TypeError("Array expected, size parameter");
                if (2 !== e.length) throw new Error("Only two dimensions matrix are supported");
                if (e = e.map(function (e) {
                    if (I(e) && (e = e.toNumber()), !M(e) || !L(e) || e < 1) throw new Error("Size values must be positive integers");
                    return e
                }), r) {
                    if (I(r) && (r = r.toNumber()), !M(r) || !L(r)) throw new TypeError("The parameter k must be an integer number")
                } else r = 0;
                var i, a = 0 < r ? r : 0, o = r < 0 ? -r : 0, s = e[0], u = e[1], c = Math.min(s - o, u - a);
                if (x(t)) {
                    if (t.length !== c) throw new Error("Invalid value array length");
                    i = function (e) {
                        return t[e]
                    }
                } else if (E(t)) {
                    r = t.size();
                    if (1 !== r.length || r[0] !== c) throw new Error("Invalid matrix length");
                    i = function (e) {
                        return t.get([e])
                    }
                } else i = function () {
                    return t
                };
                n = n || (I(i(0)) ? i(0).mul(0) : 0);
                var f = [];
                if (0 < e.length) {
                    f = Ae(f, e, n);
                    for (var l = 0; l < c; l++) f[l + o][l + a] = i(l)
                }
                return new p({data: f, size: [s, u]})
            }, p.fromJSON = function (e) {
                return new p(e)
            }, p.prototype.swapRows = function (e, t) {
                if (!(M(e) && L(e) && M(t) && L(t))) throw new Error("Row index must be positive integers");
                if (2 !== this._size.length) throw new Error("Only two dimensional matrix is supported");
                return Ee(e, this._size[0]), Ee(t, this._size[0]), p._swapRows(e, t, this._data), this
            }, p._swapRows = function (e, t, r) {
                var n = r[e];
                r[e] = r[t], r[t] = n
            }, p
        }, {isClass: !0}), yt = Ye("clone", ["typed"], function (e) {
            return (0, e.typed)("clone", {any: He})
        });

        function gt(e) {
            for (var t = 0; t < e.length; t++) if (d(e[t])) return 1
        }

        function vt(e, t) {
            E(e) && (e = e.valueOf());
            for (var r = 0, n = e.length; r < n; r++) {
                var i = e[r];
                Array.isArray(i) ? vt(i, t) : t(i)
            }
        }

        function xt(e, t, r) {
            return e && "function" == typeof e.map ? e.map(function (e) {
                return xt(e, t, r)
            }) : t(e)
        }

        function bt(e, t, r) {
            var n = Array.isArray(e) ? Me(e) : e.size();
            if (t < 0 || t >= n.length) throw new Ne(t, n.length);
            return E(e) ? e.create(wt(e.valueOf(), t, r)) : wt(e, t, r)
        }

        function wt(e, t, r) {
            var n, i, a, o;
            if (t <= 0) {
                if (Array.isArray(e[0])) {
                    for (o = function (e) {
                        for (var t = e.length, r = e[0].length, n = [], i = 0; i < r; i++) {
                            for (var a = [], o = 0; o < t; o++) a.push(e[o][i]);
                            n.push(a)
                        }
                        return n
                    }(e), i = [], n = 0; n < o.length; n++) i[n] = wt(o[n], t - 1, r);
                    return i
                }
                for (a = e[0], n = 1; n < e.length; n++) a = r(a, e[n]);
                return a
            }
            for (i = [], n = 0; n < e.length; n++) i[n] = wt(e[n], t - 1, r);
            return i
        }

        function Nt(e, t, r, n, i, a, o, s, u, c, f) {
            var l, p, m, h, d = e._values, y = e._index, e = e._ptr;
            if (n) for (p = e[t], m = e[t + 1], l = p; l < m; l++) r[h = y[l]] !== a ? (r[h] = a, o.push(h), c ? (n[h] = u ? s(d[l], f) : s(f, d[l]), i[h] = a) : n[h] = d[l]) : (n[h] = u ? s(d[l], n[h]) : s(n[h], d[l]), i[h] = a); else for (p = e[t], m = e[t + 1], l = p; l < m; l++) r[h = y[l]] !== a ? (r[h] = a, o.push(h)) : i[h] = a
        }

        var Mt = Ye("isInteger", ["typed"], function (e) {
            return (0, e.typed)("isInteger", {
                number: L, BigNumber: function (e) {
                    return e.isInt()
                }, Fraction: function (e) {
                    return 1 === e.d && isFinite(e.n)
                }, "Array | Matrix": function (e) {
                    return xt(e, this)
                }
            })
        });

        function St(e) {
            return e < 0
        }

        function Et(e) {
            return 0 < e
        }

        function At(e) {
            return 0 === e
        }

        function Ot(e) {
            return Number.isNaN(e)
        }

        Ot.signature = At.signature = Et.signature = St.signature = "number";
        var Ct = Ye("isNegative", ["typed"], function (e) {
            return (0, e.typed)("isNegative", {
                number: St, BigNumber: function (e) {
                    return e.isNeg() && !e.isZero() && !e.isNaN()
                }, Fraction: function (e) {
                    return e.s < 0
                }, Unit: function (e) {
                    return this(e.value)
                }, "Array | Matrix": function (e) {
                    return xt(e, this)
                }
            })
        }), _t = Ye("isNumeric", ["typed"], function (e) {
            return (0, e.typed)("isNumeric", {
                "number | BigNumber | Fraction | boolean": function () {
                    return !0
                }, "Complex | Unit | string | null | undefined | Node": function () {
                    return !1
                }, "Array | Matrix": function (e) {
                    return xt(e, this)
                }
            })
        }), Tt = Ye("hasNumericValue", ["typed", "isNumeric"], function (e) {
            var t = e.typed, r = e.isNumeric;
            return t("hasNumericValue", {
                string: function (e) {
                    return 0 < e.trim().length && !isNaN(Number(e))
                }, any: function (e) {
                    return r(e)
                }
            })
        }), zt = Ye("isPositive", ["typed"], function (e) {
            return (0, e.typed)("isPositive", {
                number: Et, BigNumber: function (e) {
                    return !e.isNeg() && !e.isZero() && !e.isNaN()
                }, Fraction: function (e) {
                    return 0 < e.s && 0 < e.n
                }, Unit: function (e) {
                    return this(e.value)
                }, "Array | Matrix": function (e) {
                    return xt(e, this)
                }
            })
        }), qt = Ye("isZero", ["typed"], function (e) {
            return (0, e.typed)("isZero", {
                number: At, BigNumber: function (e) {
                    return e.isZero()
                }, Complex: function (e) {
                    return 0 === e.re && 0 === e.im
                }, Fraction: function (e) {
                    return 1 === e.d && 0 === e.n
                }, Unit: function (e) {
                    return this(e.value)
                }, "Array | Matrix": function (e) {
                    return xt(e, this)
                }
            })
        }), It = Ye("isNaN", ["typed"], function (e) {
            return (0, e.typed)("isNaN", {
                number: Ot, BigNumber: function (e) {
                    return e.isNaN()
                }, Fraction: function (e) {
                    return !1
                }, Complex: function (e) {
                    return e.isNaN()
                }, Unit: function (e) {
                    return Number.isNaN(e.value)
                }, "Array | Matrix": function (e) {
                    return xt(e, Number.isNaN)
                }
            })
        }), Bt = Ye("typeOf", ["typed"], function (e) {
            return (0, e.typed)("typeOf", {any: J})
        });

        function kt(e, t, r) {
            if (null == r) return e.eq(t);
            if (e.eq(t)) return !0;
            if (e.isNaN() || t.isNaN()) return !1;
            if (e.isFinite() && t.isFinite()) {
                var n = e.minus(t).abs();
                if (n.isZero()) return !0;
                t = e.constructor.max(e.abs(), t.abs());
                return n.lte(t.times(r))
            }
            return !1
        }

        var Dt = Ye("equalScalar", ["typed", "config"], function (e) {
            var t = e.typed, n = e.config;
            return t("equalScalar", {
                "boolean, boolean": function (e, t) {
                    return e === t
                }, "number, number": function (e, t) {
                    return re(e, t, n.epsilon)
                }, "BigNumber, BigNumber": function (e, t) {
                    return e.eq(t) || kt(e, t, n.epsilon)
                }, "Fraction, Fraction": function (e, t) {
                    return e.equals(t)
                }, "Complex, Complex": function (e, t) {
                    return r = e, e = t, t = n.epsilon, re(r.re, e.re, t) && re(r.im, e.im, t);
                    var r
                }, "Unit, Unit": function (e, t) {
                    if (!e.equalBase(t)) throw new Error("Cannot compare units with different base");
                    return this(e.value, t.value)
                }
            })
        }), Rt = (Ye("equalScalar", ["typed", "config"], function (e) {
            var t = e.typed, r = e.config;
            return t("equalScalar", {
                "number, number": function (e, t) {
                    return re(e, t, r.epsilon)
                }
            })
        }), Ye("SparseMatrix", ["typed", "equalScalar", "Matrix"], function (e) {
            var b = e.typed, w = e.equalScalar, e = e.Matrix;

            function N(e, t) {
                if (!(this instanceof N)) throw new SyntaxError("Constructor must be called with the new operator");
                if (t && !S(t)) throw new Error("Invalid datatype: " + t);
                if (E(e)) r = this, i = t, "SparseMatrix" === (n = e).type ? (r._values = n._values ? He(n._values) : void 0, r._index = He(n._index), r._ptr = He(n._ptr), r._size = He(n._size), r._datatype = i || n._datatype) : a(r, n.valueOf(), i || n._datatype); else if (e && x(e.index) && x(e.ptr) && x(e.size)) this._values = e.values, this._index = e.index, this._ptr = e.ptr, this._size = e.size, this._datatype = t || e.datatype; else if (x(e)) a(this, e, t); else {
                    if (e) throw new TypeError("Unsupported type of data (" + J(e) + ")");
                    this._values = [], this._index = [], this._ptr = [0], this._size = [0, 0], this._datatype = t
                }
                var r, n, i
            }

            function a(e, t, r) {
                e._values = [], e._index = [], e._ptr = [], e._datatype = r;
                var n = t.length, i = 0, a = w, o = 0;
                if (S(r) && (a = b.find(w, [r, r]) || w, o = b.convert(0, r)), 0 < n) {
                    var s = 0;
                    do {
                        e._ptr.push(e._index.length);
                        for (var u = 0; u < n; u++) {
                            var c, f = t[u];
                            x(f) ? (0 === s && i < f.length && (i = f.length), s < f.length && (a(c = f[s], o) || (e._values.push(c), e._index.push(u)))) : (0 === s && i < 1 && (i = 1), a(f, o) || (e._values.push(f), e._index.push(u)))
                        }
                    } while (++s < i)
                }
                e._ptr.push(e._index.length), e._size = [n, i]
            }

            function g(e, t, r, n) {
                if (r - t == 0) return r;
                for (var i = t; i < r; i++) if (n[i] === e) return i;
                return t
            }

            function v(e, t, r, n, i, a, o) {
                i.splice(e, 0, n), a.splice(e, 0, t);
                for (var s = r + 1; s < o.length; s++) o[s]++
            }

            function u(e, t, r, n) {
                var i = n || 0, a = w, n = 0;
                S(e._datatype) && (a = b.find(w, [e._datatype, e._datatype]) || w, n = b.convert(0, e._datatype), i = b.convert(i, e._datatype));
                var o = !a(i, n), s = e._size[0], u = e._size[1];
                if (u < r) {
                    for (f = u; f < r; f++) if (e._ptr[f] = e._values.length, o) for (p = 0; p < s; p++) e._values.push(i), e._index.push(p);
                    e._ptr[r] = e._values.length
                } else r < u && (e._ptr.splice(r + 1, u - r), e._values.splice(e._ptr[r], e._values.length), e._index.splice(e._ptr[r], e._index.length));
                if (u = r, s < t) {
                    if (o) {
                        for (var c = 0, f = 0; f < u; f++) {
                            e._ptr[f] = e._ptr[f] + c, y = e._ptr[f + 1] + c;
                            for (var l = 0, p = s; p < t; p++, l++) e._values.splice(y + l, 0, i), e._index.splice(y + l, 0, p), c++
                        }
                        e._ptr[u] = e._values.length
                    }
                } else if (t < s) {
                    var m = 0;
                    for (f = 0; f < u; f++) {
                        e._ptr[f] = e._ptr[f] - m;
                        for (var h = e._ptr[f], d = e._ptr[f + 1] - m, y = h; y < d; y++) (p = e._index[y]) > t - 1 && (e._values.splice(y, 1), e._index.splice(y, 1), m++)
                    }
                    e._ptr[f] = e._values.length
                }
                return e._size[0] = t, e._size[1] = r, e
            }

            function t(e, t, r, n, i) {
                for (var a, o = n[0], s = n[1], u = [], c = 0; c < o; c++) for (u[c] = [], a = 0; a < s; a++) u[c][a] = 0;
                for (a = 0; a < s; a++) for (var f = r[a], l = r[a + 1], p = f; p < l; p++) u[c = t[p]][a] = e ? i ? He(e[p]) : e[p] : 1;
                return u
            }

            return (N.prototype = new e).createSparseMatrix = function (e, t) {
                return new N(e, t)
            }, N.prototype.type = "SparseMatrix", N.prototype.isSparseMatrix = !0, N.prototype.getDataType = function () {
                return Ue(this._values, J)
            }, N.prototype.storage = function () {
                return "sparse"
            }, N.prototype.datatype = function () {
                return this._datatype
            }, N.prototype.create = function (e, t) {
                return new N(e, t)
            }, N.prototype.density = function () {
                var e = this._size[0], t = this._size[1];
                return 0 !== e && 0 !== t ? this._index.length / (e * t) : 0
            }, N.prototype.subset = function (e, t, r) {
                if (!this._values) throw new Error("Cannot invoke subset on a Pattern only matrix");
                switch (arguments.length) {
                    case 1:
                        return function (e, t) {
                            if (!A(t)) throw new TypeError("Invalid index");
                            if (t.isScalar()) return e.get(t.min());
                            var r, n, i = t.size();
                            if (i.length !== e._size.length) throw new we(i.length, e._size.length);
                            for (var a = t.min(), o = t.max(), s = 0, u = e._size.length; s < u; s++) Ee(a[s], e._size[s]), Ee(o[s], e._size[s]);
                            var c = e._values, f = e._index, l = e._ptr, p = t.dimension(0), t = t.dimension(1), m = [],
                                h = [];
                            p.forEach(function (e, t) {
                                h[e] = t[0], m[e] = !0
                            });
                            var d = c ? [] : void 0, y = [], g = [];
                            return t.forEach(function (e) {
                                for (g.push(y.length), r = l[e], n = l[e + 1]; r < n; r++) s = f[r], !0 === m[s] && (y.push(h[s]), d && d.push(c[r]))
                            }), g.push(y.length), new N({values: d, index: y, ptr: g, size: i, datatype: e._datatype})
                        }(this, e);
                    case 2:
                    case 3:
                        return function (e, t, r, n) {
                            if (!t || !0 !== t.isIndex) throw new TypeError("Invalid index");
                            var i, a = t.size(), o = t.isScalar();
                            if (E(r) ? (i = r.size(), r = r.toArray()) : i = Me(r), o) {
                                if (0 !== i.length) throw new TypeError("Scalar expected");
                                e.set(t.min(), r, n)
                            } else {
                                if (1 !== a.length && 2 !== a.length) throw new we(a.length, e._size.length, "<");
                                if (i.length < a.length) {
                                    for (var s = 0, u = 0; 1 === a[s] && 1 === i[s];) s++;
                                    for (; 1 === a[s];) u++, s++;
                                    r = ze(r, a.length, u, i)
                                }
                                if (!Ve(a, i)) throw new we(a, i, ">");
                                for (var c = t.min()[0], f = t.min()[1], l = i[0], p = i[1], m = 0; m < l; m++) for (var h = 0; h < p; h++) {
                                    var d = r[m][h];
                                    e.set([m + c, h + f], d, n)
                                }
                            }
                            return e
                        }(this, e, t, r);
                    default:
                        throw new SyntaxError("Wrong number of arguments")
                }
            }, N.prototype.get = function (e) {
                if (!x(e)) throw new TypeError("Array expected");
                if (e.length !== this._size.length) throw new we(e.length, this._size.length);
                if (!this._values) throw new Error("Cannot invoke get on a Pattern only matrix");
                var t = e[0], r = e[1];
                Ee(t, this._size[0]), Ee(r, this._size[1]);
                e = g(t, this._ptr[r], this._ptr[r + 1], this._index);
                return e < this._ptr[r + 1] && this._index[e] === t ? this._values[e] : 0
            }, N.prototype.set = function (e, t, r) {
                if (!x(e)) throw new TypeError("Array expected");
                if (e.length !== this._size.length) throw new we(e.length, this._size.length);
                if (!this._values) throw new Error("Cannot invoke set on a Pattern only matrix");
                var n = e[0], i = e[1], a = this._size[0], o = this._size[1], s = w, e = 0;
                S(this._datatype) && (s = b.find(w, [this._datatype, this._datatype]) || w, e = b.convert(0, this._datatype)), (a - 1 < n || o - 1 < i) && (u(this, Math.max(n + 1, a), Math.max(i + 1, o), r), a = this._size[0], o = this._size[1]), Ee(n, a), Ee(i, o);
                o = g(n, this._ptr[i], this._ptr[i + 1], this._index);
                return o < this._ptr[i + 1] && this._index[o] === n ? s(t, e) ? function (e, t, r, n, i) {
                    r.splice(e, 1), n.splice(e, 1);
                    for (var a = t + 1; a < i.length; a++) i[a]--
                }(o, i, this._values, this._index, this._ptr) : this._values[o] = t : v(o, n, i, t, this._values, this._index, this._ptr), this
            }, N.prototype.resize = function (e, t, r) {
                if (!d(e)) throw new TypeError("Array or Matrix expected");
                var n = e.valueOf().map(function (e) {
                    return Array.isArray(e) && 1 === e.length ? e[0] : e
                });
                if (2 !== n.length) throw new Error("Only two dimensions matrix are supported");
                return n.forEach(function (e) {
                    if (!M(e) || !L(e) || e < 0) throw new TypeError("Invalid size, must contain positive integers (size: " + ge(n) + ")")
                }), u(r ? this.clone() : this, n[0], n[1], t)
            }, N.prototype.reshape = function (t, e) {
                if (!x(t)) throw new TypeError("Array expected");
                if (2 !== t.length) throw new Error("Sparse matrices can only be reshaped in two dimensions");
                t.forEach(function (e) {
                    if (!M(e) || !L(e) || e <= -2 || 0 === e) throw new TypeError("Invalid size, must contain positive integers or -1 (size: " + ge(t) + ")")
                });
                var r = this._size[0] * this._size[1];
                if (r != (t = Ce(t, r))[0] * t[1]) throw new Error("Reshaping sparse matrix will result in the wrong number of elements");
                var n = e ? this.clone() : this;
                if (this._size[0] === t[0] && this._size[1] === t[1]) return n;
                for (var i = [], a = 0; a < n._ptr.length; a++) for (var o = 0; o < n._ptr[a + 1] - n._ptr[a]; o++) i.push(a);
                for (var s = n._values.slice(), u = n._index.slice(), c = 0; c < n._index.length; c++) {
                    var f = u[c], l = i[c], l = f * n._size[1] + l;
                    i[c] = l % t[1], u[c] = Math.floor(l / t[1])
                }
                n._values.length = 0, n._index.length = 0, n._ptr.length = t[1] + 1, n._size = t.slice();
                for (var p = 0; p < n._ptr.length; p++) n._ptr[p] = 0;
                for (var m = 0; m < s.length; m++) {
                    var h = u[m], d = i[m], y = s[m];
                    v(g(h, n._ptr[d], n._ptr[d + 1], n._index), h, d, y, n._values, n._index, n._ptr)
                }
                return n
            }, N.prototype.clone = function () {
                return new N({
                    values: this._values ? He(this._values) : void 0,
                    index: He(this._index),
                    ptr: He(this._ptr),
                    size: He(this._size),
                    datatype: this._datatype
                })
            }, N.prototype.size = function () {
                return this._size.slice(0)
            }, N.prototype.map = function (v, e) {
                if (!this._values) throw new Error("Cannot invoke map on a Pattern only matrix");
                var x = this;
                return function (e, t, r, n) {
                    var i = [], a = [], o = [], s = w, u = 0;
                    S(e._datatype) && (s = b.find(w, [e._datatype, e._datatype]) || w, u = b.convert(0, e._datatype));
                    for (var c = function (e, t, r) {
                        e = v(e, [t, r], x), s(e, u) || (i.push(e), a.push(t))
                    }, f = 0; f <= r; f++) {
                        o.push(i.length);
                        var l = e._ptr[f], p = e._ptr[f + 1];
                        if (n) for (var m = l; m < p; m++) {
                            var h = e._index[m];
                            0 <= h && h <= t && c(e._values[m], +h, +f)
                        } else {
                            for (var d = {}, y = l; y < p; y++) d[e._index[y]] = e._values[y];
                            for (var g = 0; g <= t; g++) c(g in d ? d[g] : 0, +g, +f)
                        }
                    }
                    return o.push(i.length), new N({values: i, index: a, ptr: o, size: [1 + t, 1 + r]})
                }(this, this._size[0] - 1, this._size[1] - 1, e)
            }, N.prototype.forEach = function (e, t) {
                if (!this._values) throw new Error("Cannot invoke forEach on a Pattern only matrix");
                for (var r = this._size[0], n = this._size[1], i = 0; i < n; i++) {
                    var a = this._ptr[i], o = this._ptr[i + 1];
                    if (t) for (var s = a; s < o; s++) {
                        var u = this._index[s];
                        e(this._values[s], [u, i], this)
                    } else {
                        for (var c = {}, f = a; f < o; f++) c[this._index[f]] = this._values[f];
                        for (var l = 0; l < r; l++) e(l in c ? c[l] : 0, [l, i], this)
                    }
                }
            }, N.prototype.toArray = function () {
                return t(this._values, this._index, this._ptr, this._size, !0)
            }, N.prototype.valueOf = function () {
                return t(this._values, this._index, this._ptr, this._size, !1)
            }, N.prototype.format = function (e) {
                for (var t = this._size[0], r = this._size[1], n = this.density(), i = "Sparse Matrix [" + ge(t, e) + " x " + ge(r, e) + "] density: " + ge(n, e) + "\n", a = 0; a < r; a++) for (var o = this._ptr[a], s = this._ptr[a + 1], u = o; u < s; u++) i += "\n    (" + ge(this._index[u], e) + ", " + ge(a, e) + ") ==> " + (this._values ? ge(this._values[u], e) : "X");
                return i
            }, N.prototype.toString = function () {
                return ge(this.toArray())
            }, N.prototype.toJSON = function () {
                return {
                    mathjs: "SparseMatrix",
                    values: this._values,
                    index: this._index,
                    ptr: this._ptr,
                    size: this._size,
                    datatype: this._datatype
                }
            }, N.prototype.diagonal = function (e) {
                if (e) {
                    if (I(e) && (e = e.toNumber()), !M(e) || !L(e)) throw new TypeError("The parameter k must be an integer number")
                } else e = 0;
                var t = 0 < e ? e : 0, r = e < 0 ? -e : 0, e = this._size[0], n = this._size[1],
                    i = Math.min(e - r, n - t), a = [], o = [], e = [];
                e[0] = 0;
                for (var s = t; s < n && a.length < i; s++) for (var u = this._ptr[s], c = this._ptr[s + 1], f = u; f < c; f++) {
                    var l = this._index[f];
                    if (l === s - t + r) {
                        a.push(this._values[f]), o[a.length - 1] = l - r;
                        break
                    }
                }
                return e.push(a.length), new N({values: a, index: o, ptr: e, size: [i, 1]})
            }, N.fromJSON = function (e) {
                return new N(e)
            }, N.diagonal = function (e, t, r, n, i) {
                if (!x(e)) throw new TypeError("Array expected, size parameter");
                if (2 !== e.length) throw new Error("Only two dimensions matrix are supported");
                if (e = e.map(function (e) {
                    if (I(e) && (e = e.toNumber()), !M(e) || !L(e) || e < 1) throw new Error("Size values must be positive integers");
                    return e
                }), r) {
                    if (I(r) && (r = r.toNumber()), !M(r) || !L(r)) throw new TypeError("The parameter k must be an integer number")
                } else r = 0;
                var a = w, o = 0;
                S(i) && (a = b.find(w, [i, i]) || w, o = b.convert(0, i));
                var s, u = 0 < r ? r : 0, c = r < 0 ? -r : 0, r = e[0], f = e[1], l = Math.min(r - c, f - u);
                if (x(t)) {
                    if (t.length !== l) throw new Error("Invalid value array length");
                    s = function (e) {
                        return t[e]
                    }
                } else if (E(t)) {
                    e = t.size();
                    if (1 !== e.length || e[0] !== l) throw new Error("Invalid matrix length");
                    s = function (e) {
                        return t.get([e])
                    }
                } else s = function () {
                    return t
                };
                for (var p = [], m = [], h = [], d = 0; d < f; d++) {
                    h.push(p.length);
                    var y, g = d - u;
                    0 <= g && g < l && (a(y = s(g), o) || (m.push(g + c), p.push(y)))
                }
                return h.push(p.length), new N({values: p, index: m, ptr: h, size: [r, f]})
            }, N.prototype.swapRows = function (e, t) {
                if (!(M(e) && L(e) && M(t) && L(t))) throw new Error("Row index must be positive integers");
                if (2 !== this._size.length) throw new Error("Only two dimensional matrix is supported");
                return Ee(e, this._size[0]), Ee(t, this._size[0]), N._swapRows(e, t, this._size[1], this._values, this._index, this._ptr), this
            }, N._forEachRow = function (e, t, r, n, i) {
                for (var a = n[e], o = n[e + 1], s = a; s < o; s++) i(r[s], t[s])
            }, N._swapRows = function (e, t, r, n, i, a) {
                for (var o = 0; o < r; o++) {
                    var s, u = a[o], c = a[o + 1], f = g(e, u, c, i), u = g(t, u, c, i);
                    f < c && u < c && i[f] === e && i[u] === t ? n && (s = n[f], n[f] = n[u], n[u] = s) : f < c && i[f] === e && (c <= u || i[u] !== t) ? (s = n ? n[f] : void 0, i.splice(u, 0, t), n && n.splice(u, 0, s), i.splice(u <= f ? f + 1 : f, 1), n && n.splice(u <= f ? f + 1 : f, 1)) : u < c && i[u] === t && (c <= f || i[f] !== e) && (c = n ? n[u] : void 0, i.splice(f, 0, e), n && n.splice(f, 0, c), i.splice(f <= u ? u + 1 : u, 1), n && n.splice(f <= u ? u + 1 : u, 1))
                }
            }, N
        }, {isClass: !0})), Pt = Ye("number", ["typed"], function (e) {
            e = (0, e.typed)("number", {
                "": function () {
                    return 0
                }, number: function (e) {
                    return e
                }, string: function (e) {
                    if ("NaN" === e) return NaN;
                    var t = (n = (r = e).match(/(0[box])([0-9a-fA-F]*)\.([0-9a-fA-F]*)/)) ? {
                        input: r,
                        radix: {"0b": 2, "0o": 8, "0x": 16}[n[1]],
                        integerPart: n[2],
                        fractionalPart: n[3]
                    } : null;
                    if (t) return function (e) {
                        for (var t = parseInt(e.integerPart, e.radix), r = 0, n = 0; n < e.fractionalPart.length; n++) r += parseInt(e.fractionalPart[n], e.radix) / Math.pow(e.radix, n + 1);
                        t += r;
                        if (isNaN(t)) throw new SyntaxError('String "' + e.input + '" is no valid number');
                        return t
                    }(t);
                    var r = 0, n = e.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
                    n && (r = Number(n[2]), e = n[1]);
                    t = Number(e);
                    if (isNaN(t)) throw new SyntaxError('String "' + e + '" is no valid number');
                    if (n) {
                        if (t > Math.pow(2, r) - 1) throw new SyntaxError('String "'.concat(e, '" is out of range'));
                        t >= Math.pow(2, r - 1) && (t -= Math.pow(2, r))
                    }
                    return t
                }, BigNumber: function (e) {
                    return e.toNumber()
                }, Fraction: function (e) {
                    return e.valueOf()
                }, Unit: function (e) {
                    throw new Error("Second argument with valueless unit expected")
                }, null: function (e) {
                    return 0
                }, "Unit, string | Unit": function (e, t) {
                    return e.toNumber(t)
                }, "Array | Matrix": function (e) {
                    return xt(e, this)
                }
            });
            return e.fromJSON = function (e) {
                return parseFloat(e.value)
            }, e
        }), jt = Ye("string", ["typed"], function (e) {
            return (0, e.typed)("string", {
                "": function () {
                    return ""
                }, number: V, null: function (e) {
                    return "null"
                }, boolean: function (e) {
                    return e + ""
                }, string: function (e) {
                    return e
                }, "Array | Matrix": function (e) {
                    return xt(e, this)
                }, any: function (e) {
                    return String(e)
                }
            })
        }), Ut = Ye("boolean", ["typed"], function (e) {
            return (0, e.typed)("boolean", {
                "": function () {
                    return !1
                }, boolean: function (e) {
                    return e
                }, number: function (e) {
                    return !!e
                }, null: function (e) {
                    return !1
                }, BigNumber: function (e) {
                    return !e.isZero()
                }, string: function (e) {
                    var t = e.toLowerCase();
                    if ("true" === t) return !0;
                    if ("false" === t) return !1;
                    t = Number(e);
                    if ("" !== e && !isNaN(t)) return !!t;
                    throw new Error('Cannot convert "' + e + '" to a boolean')
                }, "Array | Matrix": function (e) {
                    return xt(e, this)
                }
            })
        }), Ft = Ye("bignumber", ["typed", "BigNumber"], function (e) {
            var t = e.typed, i = e.BigNumber;
            return t("bignumber", {
                "": function () {
                    return new i(0)
                }, number: function (e) {
                    return new i(e + "")
                }, string: function (e) {
                    var t = e.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
                    if (t) {
                        var r = t[2], n = i(t[1]), t = new i(2).pow(Number(r));
                        if (n.gt(t.sub(1))) throw new SyntaxError('String "'.concat(e, '" is out of range'));
                        r = new i(2).pow(Number(r) - 1);
                        return n.gte(r) ? n.sub(t) : n
                    }
                    return new i(e)
                }, BigNumber: function (e) {
                    return e
                }, Fraction: function (e) {
                    return new i(e.n).div(e.d).times(e.s)
                }, null: function (e) {
                    return new i(0)
                }, "Array | Matrix": function (e) {
                    return xt(e, this)
                }
            })
        }), Lt = Ye("complex", ["typed", "Complex"], function (e) {
            var t = e.typed, r = e.Complex;
            return t("complex", {
                "": function () {
                    return r.ZERO
                }, number: function (e) {
                    return new r(e, 0)
                }, "number, number": function (e, t) {
                    return new r(e, t)
                }, "BigNumber, BigNumber": function (e, t) {
                    return new r(e.toNumber(), t.toNumber())
                }, Fraction: function (e) {
                    return new r(e.valueOf(), 0)
                }, Complex: function (e) {
                    return e.clone()
                }, string: function (e) {
                    return r(e)
                }, null: function (e) {
                    return r(0)
                }, Object: function (e) {
                    if ("re" in e && "im" in e) return new r(e.re, e.im);
                    if ("r" in e && "phi" in e || "abs" in e && "arg" in e) return new r(e);
                    throw new Error("Expected object with properties (re and im) or (r and phi) or (abs and arg)")
                }, "Array | Matrix": function (e) {
                    return xt(e, this)
                }
            })
        }), Ht = Ye("fraction", ["typed", "Fraction"], function (e) {
            var t = e.typed, r = e.Fraction;
            return t("fraction", {
                number: function (e) {
                    if (!isFinite(e) || isNaN(e)) throw new Error(e + " cannot be represented as a fraction");
                    return new r(e)
                }, string: function (e) {
                    return new r(e)
                }, "number, number": function (e, t) {
                    return new r(e, t)
                }, null: function (e) {
                    return new r(0)
                }, BigNumber: function (e) {
                    return new r(e.toString())
                }, Fraction: function (e) {
                    return e
                }, Object: function (e) {
                    return new r(e)
                }, "Array | Matrix": function (e) {
                    return xt(e, this)
                }
            })
        }), $t = Ye("matrix", ["typed", "Matrix", "DenseMatrix", "SparseMatrix"], function (e) {
            var t = e.typed, n = (e.Matrix, e.DenseMatrix), i = e.SparseMatrix;
            return t("matrix", {
                "": function () {
                    return r([])
                }, string: function (e) {
                    return r([], e)
                }, "string, string": function (e, t) {
                    return r([], e, t)
                }, Array: function (e) {
                    return r(e)
                }, Matrix: function (e) {
                    return r(e, e.storage())
                }, "Array | Matrix, string": r, "Array | Matrix, string, string": r
            });

            function r(e, t, r) {
                if ("dense" === t || "default" === t || void 0 === t) return new n(e, r);
                if ("sparse" === t) return new i(e, r);
                throw new TypeError("Unknown matrix type " + JSON.stringify(t) + ".")
            }
        }), Gt = Ye("splitUnit", ["typed"], function (e) {
            return (0, e.typed)("splitUnit", {
                "Unit, Array": function (e, t) {
                    return e.splitUnit(t)
                }
            })
        }), a = "number, number";

        function Vt(e) {
            return Math.abs(e)
        }

        function Zt(e, t) {
            return e + t
        }

        function Wt(e, t) {
            return e * t
        }

        function Jt(e) {
            return -e
        }

        function Yt(e) {
            return e
        }

        function Xt(e) {
            return H(e)
        }

        function Qt(e) {
            return Math.ceil(e)
        }

        function Kt(e) {
            return e * e * e
        }

        function er(e) {
            return Math.exp(e)
        }

        function tr(e) {
            return $(e)
        }

        function rr(e, t) {
            if (!L(e) || !L(t)) throw new Error("Parameters in function gcd must be integer numbers");
            for (var r; 0 !== t;) r = e % t, e = t, t = r;
            return e < 0 ? -e : e
        }

        function nr(e, t) {
            if (!L(e) || !L(t)) throw new Error("Parameters in function lcm must be integer numbers");
            if (0 === e || 0 === t) return 0;
            for (var r, n = e * t; 0 !== t;) t = e % (r = t), e = r;
            return Math.abs(n / e)
        }

        function ir(e) {
            return Math.log(e)
        }

        function ar(e) {
            return c(e)
        }

        function or(e) {
            return u(e)
        }

        function sr(e, t) {
            if (0 < t) return e - t * Math.floor(e / t);
            if (0 === t) return e;
            throw new Error("Cannot calculate mod for a negative divisor")
        }

        function ur(e, t) {
            var r = t < 0;
            if (r && (t = -t), 0 === t) throw new Error("Root must be non-zero");
            if (e < 0 && Math.abs(t) % 2 != 1) throw new Error("Root must be odd when a is negative.");
            if (0 === e) return r ? 1 / 0 : 0;
            if (!isFinite(e)) return r ? 0 : e;
            t = Math.pow(Math.abs(e), 1 / t), t = e < 0 ? -t : t;
            return r ? 1 / t : t
        }

        function cr(e) {
            return s(e)
        }

        function fr(e) {
            return e * e
        }

        function lr(e, t) {
            var r, n, i, a = 0, o = 1, s = 1, u = 0;
            if (!L(e) || !L(t)) throw new Error("Parameters in function xgcd must be integer numbers");
            for (; t;) i = e - (n = Math.floor(e / t)) * t, a = o - n * (r = a), o = r, s = u - n * (r = s), u = r, e = t, t = i;
            return e < 0 ? [-e, -o, -u] : [e, e ? o : 0, u]
        }

        function pr(e, t) {
            return e * e < 1 && t === 1 / 0 || 1 < e * e && t === -1 / 0 ? 0 : Math.pow(e, t)
        }

        function mr(e) {
            return parseFloat(X(e, 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0))
        }

        Vt.signature = "number", Wt.signature = Zt.signature = a, tr.signature = er.signature = Kt.signature = Qt.signature = Xt.signature = Yt.signature = Jt.signature = "number", nr.signature = rr.signature = a, or.signature = ar.signature = ir.signature = "number", ur.signature = sr.signature = a, fr.signature = cr.signature = "number", mr.signature = pr.signature = lr.signature = a;
        var hr = Ye("unaryMinus", ["typed"], function (e) {
            return (0, e.typed)("unaryMinus", {
                number: Jt, Complex: function (e) {
                    return e.neg()
                }, BigNumber: function (e) {
                    return e.neg()
                }, Fraction: function (e) {
                    return e.neg()
                }, Unit: function (e) {
                    var t = e.clone();
                    return t.value = this(e.value), t
                }, "Array | Matrix": function (e) {
                    return xt(e, this, !0)
                }
            })
        }), dr = Ye("unaryPlus", ["typed", "config", "BigNumber"], function (e) {
            var t = e.typed, r = e.config, n = e.BigNumber;
            return t("unaryPlus", {
                number: Yt, Complex: function (e) {
                    return e
                }, BigNumber: function (e) {
                    return e
                }, Fraction: function (e) {
                    return e
                }, Unit: function (e) {
                    return e.clone()
                }, "Array | Matrix": function (e) {
                    return xt(e, this, !0)
                }, "boolean | string": function (e) {
                    return "BigNumber" === r.number ? new n(+e) : +e
                }
            })
        }), yr = Ye("abs", ["typed"], function (e) {
            return (0, e.typed)("abs", {
                number: Vt, Complex: function (e) {
                    return e.abs()
                }, BigNumber: function (e) {
                    return e.abs()
                }, Fraction: function (e) {
                    return e.abs()
                }, "Array | Matrix": function (e) {
                    return xt(e, this, !0)
                }, Unit: function (e) {
                    return e.abs()
                }
            })
        }), gr = Ye("apply", ["typed", "isInteger"], function (e) {
            var t = e.typed, i = e.isInteger;
            return t("apply", {
                "Array | Matrix, number | BigNumber, function": function (e, t, r) {
                    if (!i(t)) throw new TypeError("Integer number expected for dimension");
                    var n = Array.isArray(e) ? Me(e) : e.size();
                    if (t < 0 || t >= n.length) throw new Ne(t, n.length);
                    return E(e) ? e.create(vr(e.valueOf(), t, r)) : vr(e, t, r)
                }
            })
        });

        function vr(e, t, r) {
            var n, i, a;
            if (t <= 0) {
                if (Array.isArray(e[0])) {
                    for (a = function (e) {
                        for (var t = e.length, r = e[0].length, n = [], i = 0; i < r; i++) {
                            for (var a = [], o = 0; o < t; o++) a.push(e[o][i]);
                            n.push(a)
                        }
                        return n
                    }(e), i = [], n = 0; n < a.length; n++) i[n] = vr(a[n], t - 1, r);
                    return i
                }
                return r(e)
            }
            for (i = [], n = 0; n < e.length; n++) i[n] = vr(e[n], t - 1, r);
            return i
        }

        var xr = Ye("addScalar", ["typed"], function (e) {
                return (0, e.typed)("addScalar", {
                    "number, number": Zt, "Complex, Complex": function (e, t) {
                        return e.add(t)
                    }, "BigNumber, BigNumber": function (e, t) {
                        return e.plus(t)
                    }, "Fraction, Fraction": function (e, t) {
                        return e.add(t)
                    }, "Unit, Unit": function (e, t) {
                        if (null === e.value || void 0 === e.value) throw new Error("Parameter x contains a unit with undefined value");
                        if (null === t.value || void 0 === t.value) throw new Error("Parameter y contains a unit with undefined value");
                        if (!e.equalBase(t)) throw new Error("Units do not match");
                        e = e.clone();
                        return e.value = this(e.value, t.value), e.fixPrefix = !1, e
                    }
                })
            }),
            br = Ye("cbrt", ["config", "typed", "isNegative", "unaryMinus", "matrix", "Complex", "BigNumber", "Fraction"], function (e) {
                var i = e.config, t = e.typed, n = e.isNegative, a = e.unaryMinus, o = e.matrix, s = e.Complex,
                    u = e.BigNumber, c = e.Fraction;
                return t("cbrt", {
                    number: Xt, Complex: f, "Complex, boolean": f, BigNumber: function (e) {
                        return e.cbrt()
                    }, Unit: function (e) {
                        if (e.value && Z(e.value)) {
                            var t = e.clone();
                            return t.value = 1, (t = t.pow(1 / 3)).value = f(e.value), t
                        }
                        var r = n(e.value);
                        r && (e.value = a(e.value)), t = I(e.value) ? new u(1).div(3) : w(e.value) ? new c(1, 3) : 1 / 3;
                        t = e.pow(t);
                        return r && (t.value = a(t.value)), t
                    }, "Array | Matrix": function (e) {
                        return xt(e, this, !0)
                    }
                });

                function f(e, t) {
                    var r = e.arg() / 3, n = e.abs(), e = new s(Xt(n), 0).mul(new s(0, r).exp());
                    if (t) {
                        r = [e, new s(Xt(n), 0).mul(new s(0, r + 2 * Math.PI / 3).exp()), new s(Xt(n), 0).mul(new s(0, r - 2 * Math.PI / 3).exp())];
                        return "Array" === i.matrix ? r : o(r)
                    }
                    return e
                }
            }), wr = Ye("algorithm11", ["typed", "equalScalar"], function (e) {
                var S = e.typed, E = e.equalScalar;
                return function (e, t, r, n) {
                    var i = e._values, a = e._index, o = e._ptr, s = e._size, u = e._datatype;
                    if (!i) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
                    var c, f = s[0], l = s[1], p = E, m = 0, h = r;
                    "string" == typeof u && (c = u, p = S.find(E, [c, c]), m = S.convert(0, c), t = S.convert(t, c), h = S.find(r, [c, c]));
                    for (var d = [], y = [], g = [], v = 0; v < l; v++) {
                        g[v] = y.length;
                        for (var x = o[v], b = o[v + 1], w = x; w < b; w++) {
                            var N = a[w], M = n ? h(t, i[w]) : h(i[w], t);
                            p(M, m) || (y.push(N), d.push(M))
                        }
                    }
                    return g[l] = y.length, e.createSparseMatrix({values: d, index: y, ptr: g, size: [f, l], datatype: c})
                }
            }), Nr = Ye("algorithm14", ["typed"], function (e) {
                var c = e.typed;
                return function (e, t, r, n) {
                    var i, a = e._data, o = e._size, s = e._datatype, u = r;
                    "string" == typeof s && (i = s, t = c.convert(t, i), u = c.find(r, [i, i]));
                    n = 0 < o.length ? function e(t, r, n, i, a, o, s) {
                        var u = [];
                        if (r === n.length - 1) for (var c = 0; c < i; c++) u[c] = s ? t(o, a[c]) : t(a[c], o); else for (var f = 0; f < i; f++) u[f] = e(t, r + 1, n, n[r + 1], a[f], o, s);
                        return u
                    }(u, 0, o, o[0], a, t, n) : [];
                    return e.createDenseMatrix({data: n, size: He(o), datatype: i})
                }
            });

        function Mr(e, t) {
            return function (e) {
                if (Array.isArray(e)) return e
            }(e) || function (e, t) {
                if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) {
                    var r = [], n = !0, i = !1, a = void 0;
                    try {
                        for (var o, s = e[Symbol.iterator](); !(n = (o = s.next()).done) && (r.push(o.value), !t || r.length !== t); n = !0) ;
                    } catch (e) {
                        i = !0, a = e
                    } finally {
                        try {
                            n || null == s.return || s.return()
                        } finally {
                            if (i) throw a
                        }
                    }
                    return r
                }
            }(e, t) || function (e, t) {
                if (e) {
                    if ("string" == typeof e) return Sr(e, t);
                    var r = Object.prototype.toString.call(e).slice(8, -1);
                    return "Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Sr(e, t) : void 0
                }
            }(e, t) || function () {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }

        function Sr(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
            return n
        }

        var Er = Ye("ceil", ["typed", "config", "round", "matrix", "equalScalar"], function (e) {
            var t = e.typed, i = e.config, a = e.round, r = e.matrix, e = e.equalScalar,
                n = wr({typed: t, equalScalar: e}), o = Nr({typed: t});
            return t("ceil", {
                number: function (e) {
                    return (re(e, a(e), i.epsilon) ? a : Qt)(e)
                }, "number, number": function (e, t) {
                    if (re(e, a(e, t), i.epsilon)) return a(e, t);
                    var r = Mr("".concat(e, "e").split("e"), 2), n = r[0], e = r[1],
                        r = Math.ceil(Number("".concat(n, "e").concat(Number(e) + t))),
                        r = Mr("".concat(r, "e").split("e"), 2), n = r[0], e = r[1];
                    return Number("".concat(n, "e").concat(Number(e) - t))
                }, Complex: function (e) {
                    return e.ceil()
                }, "Complex, number": function (e, t) {
                    return e.ceil(t)
                }, BigNumber: function (e) {
                    return kt(e, a(e), i.epsilon) ? a(e) : e.ceil()
                }, "BigNumber, BigNumber": function (e, t) {
                    return kt(e, a(e, t), i.epsilon) ? a(e, t) : e.toDecimalPlaces(t.toNumber(), ot.a.ROUND_CEIL)
                }, Fraction: function (e) {
                    return e.ceil()
                }, "Fraction, number": function (e, t) {
                    return e.ceil(t)
                }, "Array | Matrix": function (e) {
                    return xt(e, this, !0)
                }, "Array | Matrix, number": function (e, t) {
                    var r = this;
                    return xt(e, function (e) {
                        return r(e, t)
                    }, !0)
                }, "SparseMatrix, number | BigNumber": function (e, t) {
                    return n(e, t, this, !1)
                }, "DenseMatrix, number | BigNumber": function (e, t) {
                    return o(e, t, this, !1)
                }, "number | Complex | BigNumber, Array": function (e, t) {
                    return o(r(t), e, this, !0).valueOf()
                }
            })
        }), Ar = Ye("cube", ["typed"], function (e) {
            return (0, e.typed)("cube", {
                number: Kt, Complex: function (e) {
                    return e.mul(e).mul(e)
                }, BigNumber: function (e) {
                    return e.times(e).times(e)
                }, Fraction: function (e) {
                    return e.pow(3)
                }, "Array | Matrix": function (e) {
                    return xt(e, this, !0)
                }, Unit: function (e) {
                    return e.pow(3)
                }
            })
        }), Or = Ye("exp", ["typed"], function (e) {
            return (0, e.typed)("exp", {
                number: er, Complex: function (e) {
                    return e.exp()
                }, BigNumber: function (e) {
                    return e.exp()
                }, "Array | Matrix": function (e) {
                    return xt(e, this)
                }
            })
        }), Cr = Ye("expm1", ["typed", "Complex"], function (e) {
            var t = e.typed, r = e.Complex;
            return t("expm1", {
                number: tr, Complex: function (e) {
                    var t = Math.exp(e.re);
                    return new r(t * Math.cos(e.im) - 1, t * Math.sin(e.im))
                }, BigNumber: function (e) {
                    return e.exp().minus(1)
                }, "Array | Matrix": function (e) {
                    return xt(e, this)
                }
            })
        }), _r = Ye("fix", ["typed", "Complex", "matrix", "ceil", "floor"], function (e) {
            var t = e.typed, r = e.Complex, n = e.matrix, i = e.ceil, a = e.floor, o = Nr({typed: t});
            return t("fix", {
                number: function (e) {
                    return (0 < e ? a : i)(e)
                }, "number, number | BigNumber": function (e, t) {
                    return (0 < e ? a : i)(e, t)
                }, Complex: function (e) {
                    return new r(0 < e.re ? Math.floor(e.re) : Math.ceil(e.re), 0 < e.im ? Math.floor(e.im) : Math.ceil(e.im))
                }, "Complex, number | BigNumber": function (e, t) {
                    return new r((0 < e.re ? a : i)(e.re, t), (0 < e.im ? a : i)(e.im, t))
                }, BigNumber: function (e) {
                    return (e.isNegative() ? i : a)(e)
                }, "BigNumber, number | BigNumber": function (e, t) {
                    return (e.isNegative() ? i : a)(e, t)
                }, Fraction: function (e) {
                    return e.s < 0 ? e.ceil() : e.floor()
                }, "Fraction, number | BigNumber": function (e, t) {
                    return e.s < 0 ? e.ceil(t) : e.floor(t)
                }, "Array | Matrix": function (e) {
                    return xt(e, this, !0)
                }, "Array | Matrix, number | BigNumber": function (e, t) {
                    var r = this;
                    return xt(e, function (e) {
                        return r(e, t)
                    }, !0)
                }, "number | Complex | BigNumber, Array": function (e, t) {
                    return o(n(t), e, this, !0).valueOf()
                }
            })
        });

        function Tr(e, t) {
            return function (e) {
                if (Array.isArray(e)) return e
            }(e) || function (e, t) {
                if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) {
                    var r = [], n = !0, i = !1, a = void 0;
                    try {
                        for (var o, s = e[Symbol.iterator](); !(n = (o = s.next()).done) && (r.push(o.value), !t || r.length !== t); n = !0) ;
                    } catch (e) {
                        i = !0, a = e
                    } finally {
                        try {
                            n || null == s.return || s.return()
                        } finally {
                            if (i) throw a
                        }
                    }
                    return r
                }
            }(e, t) || function (e, t) {
                if (e) {
                    if ("string" == typeof e) return zr(e, t);
                    var r = Object.prototype.toString.call(e).slice(8, -1);
                    return "Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? zr(e, t) : void 0
                }
            }(e, t) || function () {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }

        function zr(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
            return n
        }

        var qr = Ye("floor", ["typed", "config", "round", "matrix", "equalScalar"], function (e) {
                var t = e.typed, i = e.config, a = e.round, r = e.matrix, e = e.equalScalar,
                    n = wr({typed: t, equalScalar: e}), o = Nr({typed: t});
                return t("floor", {
                    number: function (e) {
                        return re(e, a(e), i.epsilon) ? a(e) : Math.floor(e)
                    }, "number, number": function (e, t) {
                        if (re(e, a(e, t), i.epsilon)) return a(e, t);
                        var r = Tr("".concat(e, "e").split("e"), 2), n = r[0], e = r[1],
                            r = Math.floor(Number("".concat(n, "e").concat(Number(e) + t))),
                            r = Tr("".concat(r, "e").split("e"), 2), n = r[0], e = r[1];
                        return Number("".concat(n, "e").concat(Number(e) - t))
                    }, Complex: function (e) {
                        return e.floor()
                    }, "Complex, number": function (e, t) {
                        return e.floor(t)
                    }, BigNumber: function (e) {
                        return kt(e, a(e), i.epsilon) ? a(e) : e.floor()
                    }, "BigNumber, BigNumber": function (e, t) {
                        return kt(e, a(e, t), i.epsilon) ? a(e, t) : e.toDecimalPlaces(t.toNumber(), ot.a.ROUND_FLOOR)
                    }, Fraction: function (e) {
                        return e.floor()
                    }, "Fraction, number": function (e, t) {
                        return e.floor(t)
                    }, "Array | Matrix": function (e) {
                        return xt(e, this, !0)
                    }, "Array | Matrix, number": function (e, t) {
                        var r = this;
                        return xt(e, function (e) {
                            return r(e, t)
                        }, !0)
                    }, "SparseMatrix, number | BigNumber": function (e, t) {
                        return n(e, t, this, !1)
                    }, "DenseMatrix, number | BigNumber": function (e, t) {
                        return o(e, t, this, !1)
                    }, "number | Complex | BigNumber, Array": function (e, t) {
                        return o(r(t), e, this, !0).valueOf()
                    }
                })
            }), Ir = Ye("algorithm01", ["typed"], function (e) {
                var M = e.typed;
                return function (e, t, r, n) {
                    var i = e._data, a = e._size, o = e._datatype, s = t._values, u = t._index, c = t._ptr, f = t._size,
                        t = t._datatype;
                    if (a.length !== f.length) throw new we(a.length, f.length);
                    if (a[0] !== f[0] || a[1] !== f[1]) throw new RangeError("Dimension mismatch. Matrix A (" + a + ") must match Matrix B (" + f + ")");
                    if (!s) throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
                    for (var l = a[0], p = a[1], o = "string" == typeof o && o === t ? o : void 0, m = o ? M.find(r, [o, o]) : r, h = [], d = 0; d < l; d++) h[d] = [];
                    for (var y = [], g = [], v = 0; v < p; v++) {
                        for (var x = v + 1, b = c[v], w = c[v + 1], N = b; N < w; N++) y[d = u[N]] = n ? m(s[N], i[d][v]) : m(i[d][v], s[N]), g[d] = x;
                        for (d = 0; d < l; d++) g[d] === x ? h[d][v] = y[d] : h[d][v] = i[d][v]
                    }
                    return e.createDenseMatrix({data: h, size: [l, p], datatype: o})
                }
            }), Br = Ye("algorithm04", ["typed", "equalScalar"], function (e) {
                var z = e.typed, q = e.equalScalar;
                return function (e, t, r) {
                    var n = e._values, i = e._index, a = e._ptr, o = e._size, s = e._datatype, u = t._values, c = t._index,
                        f = t._ptr, l = t._size, t = t._datatype;
                    if (o.length !== l.length) throw new we(o.length, l.length);
                    if (o[0] !== l[0] || o[1] !== l[1]) throw new RangeError("Dimension mismatch. Matrix A (" + o + ") must match Matrix B (" + l + ")");
                    var p, l = o[0], m = o[1], h = q, d = 0, y = r;
                    "string" == typeof s && s === t && (p = s, h = z.find(q, [p, p]), d = z.convert(0, p), y = z.find(r, [p, p]));
                    for (var g, v = n && u ? [] : void 0, x = [], b = [], w = n && u ? [] : void 0, N = n && u ? [] : void 0, M = [], S = [], E = 0; E < m; E++) {
                        b[E] = x.length;
                        for (var A, O = E + 1, C = a[E], _ = a[E + 1], T = C; T < _; T++) g = i[T], x.push(g), M[g] = O, w && (w[g] = n[T]);
                        for (C = f[E], _ = f[E + 1], T = C; T < _; T++) M[g = c[T]] === O ? w && (h(A = y(w[g], u[T]), d) ? M[g] = null : w[g] = A) : (x.push(g), S[g] = O, N && (N[g] = u[T]));
                        if (w && N) for (T = b[E]; T < x.length;) M[g = x[T]] === O ? (v[T] = w[g], T++) : S[g] === O ? (v[T] = N[g], T++) : x.splice(T, 1)
                    }
                    return b[m] = x.length, e.createSparseMatrix({values: v, index: x, ptr: b, size: [l, m], datatype: p})
                }
            }), kr = Ye("algorithm10", ["typed", "DenseMatrix"], function (e) {
                var N = e.typed, M = e.DenseMatrix;
                return function (e, t, r, n) {
                    var i = e._values, a = e._index, o = e._ptr, s = e._size, e = e._datatype;
                    if (!i) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
                    var u, c = s[0], f = s[1], l = r;
                    "string" == typeof e && (u = e, t = N.convert(t, u), l = N.find(r, [u, u]));
                    for (var p = [], m = [], h = [], d = 0; d < f; d++) {
                        for (var y = d + 1, g = o[d], v = o[d + 1], x = g; x < v; x++) {
                            var b = a[x];
                            m[b] = i[x], h[b] = y
                        }
                        for (var w = 0; w < c; w++) 0 === d && (p[w] = []), h[w] === y ? p[w][d] = n ? l(t, m[w]) : l(m[w], t) : p[w][d] = t
                    }
                    return new M({data: p, size: [c, f], datatype: u})
                }
            }), Dr = Ye("algorithm13", ["typed"], function (e) {
                var p = e.typed;
                return function (e, t, r) {
                    var n, i = e._data, a = e._size, o = e._datatype, s = t._data, u = t._size, c = t._datatype, f = [];
                    if (a.length !== u.length) throw new we(a.length, u.length);
                    for (var l = 0; l < a.length; l++) {
                        if (a[l] !== u[l]) throw new RangeError("Dimension mismatch. Matrix A (" + a + ") must match Matrix B (" + u + ")");
                        f[l] = a[l]
                    }
                    t = r;
                    "string" == typeof o && o === c && (n = o, t = p.find(r, [n, n]));
                    s = 0 < f.length ? function e(t, r, n, i, a, o) {
                        var s = [];
                        if (r === n.length - 1) for (var u = 0; u < i; u++) s[u] = t(a[u], o[u]); else for (var c = 0; c < i; c++) s[c] = e(t, r + 1, n, n[r + 1], a[c], o[c]);
                        return s
                    }(t, 0, f, f[0], i, s) : [];
                    return e.createDenseMatrix({data: s, size: f, datatype: n})
                }
            }), Rr = Ye("gcd", ["typed", "matrix", "equalScalar", "BigNumber", "DenseMatrix"], function (e) {
                var t = e.typed, r = e.matrix, n = e.equalScalar, i = e.BigNumber, e = e.DenseMatrix, a = Ir({typed: t}),
                    o = Br({typed: t, equalScalar: n}), s = kr({typed: t, DenseMatrix: e}), u = Dr({typed: t}),
                    c = Nr({typed: t});
                return t("gcd", {
                    "number, number": rr,
                    "BigNumber, BigNumber": function (e, t) {
                        if (!e.isInt() || !t.isInt()) throw new Error("Parameters in function gcd must be integer numbers");
                        for (var r = new i(0); !t.isZero();) {
                            var n = e.mod(t);
                            e = t, t = n
                        }
                        return e.lt(r) ? e.neg() : e
                    },
                    "Fraction, Fraction": function (e, t) {
                        return e.gcd(t)
                    },
                    "SparseMatrix, SparseMatrix": function (e, t) {
                        return o(e, t, this)
                    },
                    "SparseMatrix, DenseMatrix": function (e, t) {
                        return a(t, e, this, !0)
                    },
                    "DenseMatrix, SparseMatrix": function (e, t) {
                        return a(e, t, this, !1)
                    },
                    "DenseMatrix, DenseMatrix": function (e, t) {
                        return u(e, t, this)
                    },
                    "Array, Array": function (e, t) {
                        return this(r(e), r(t)).valueOf()
                    },
                    "Array, Matrix": function (e, t) {
                        return this(r(e), t)
                    },
                    "Matrix, Array": function (e, t) {
                        return this(e, r(t))
                    },
                    "SparseMatrix, number | BigNumber": function (e, t) {
                        return s(e, t, this, !1)
                    },
                    "DenseMatrix, number | BigNumber": function (e, t) {
                        return c(e, t, this, !1)
                    },
                    "number | BigNumber, SparseMatrix": function (e, t) {
                        return s(t, e, this, !0)
                    },
                    "number | BigNumber, DenseMatrix": function (e, t) {
                        return c(t, e, this, !0)
                    },
                    "Array, number | BigNumber": function (e, t) {
                        return c(r(e), t, this, !1).valueOf()
                    },
                    "number | BigNumber, Array": function (e, t) {
                        return c(r(t), e, this, !0).valueOf()
                    },
                    "Array | Matrix | number | BigNumber, Array | Matrix | number | BigNumber, ...Array | Matrix | number | BigNumber": function (e, t, r) {
                        for (var n = this(e, t), i = 0; i < r.length; i++) n = this(n, r[i]);
                        return n
                    }
                })
            }), Pr = Ye("algorithm02", ["typed", "equalScalar"], function (e) {
                var E = e.typed, A = e.equalScalar;
                return function (e, t, r, n) {
                    var i = e._data, a = e._size, o = e._datatype, s = t._values, u = t._index, c = t._ptr, f = t._size,
                        e = t._datatype;
                    if (a.length !== f.length) throw new we(a.length, f.length);
                    if (a[0] !== f[0] || a[1] !== f[1]) throw new RangeError("Dimension mismatch. Matrix A (" + a + ") must match Matrix B (" + f + ")");
                    if (!s) throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
                    var l, f = a[0], p = a[1], m = A, h = 0, d = r;
                    "string" == typeof o && o === e && (l = o, m = E.find(A, [l, l]), h = E.convert(0, l), d = E.find(r, [l, l]));
                    for (var y = [], g = [], v = [], x = 0; x < p; x++) {
                        v[x] = g.length;
                        for (var b = c[x], w = c[x + 1], N = b; N < w; N++) {
                            var M = u[N], S = n ? d(s[N], i[M][x]) : d(i[M][x], s[N]);
                            m(S, h) || (g.push(M), y.push(S))
                        }
                    }
                    return v[p] = g.length, t.createSparseMatrix({values: y, index: g, ptr: v, size: [f, p], datatype: l})
                }
            }), jr = Ye("algorithm06", ["typed", "equalScalar"], function (e) {
                var A = e.typed, O = e.equalScalar;
                return function (e, t, r) {
                    var n = e._values, i = e._size, a = e._datatype, o = t._values, s = t._size, u = t._datatype;
                    if (i.length !== s.length) throw new we(i.length, s.length);
                    if (i[0] !== s[0] || i[1] !== s[1]) throw new RangeError("Dimension mismatch. Matrix A (" + i + ") must match Matrix B (" + s + ")");
                    var c, s = i[0], f = i[1], l = O, p = 0, m = r;
                    "string" == typeof a && a === u && (c = a, l = A.find(O, [c, c]), p = A.convert(0, c), m = A.find(r, [c, c]));
                    for (var h = n && o ? [] : void 0, d = [], y = [], g = h ? [] : void 0, v = [], x = [], b = 0; b < f; b++) {
                        y[b] = d.length;
                        var w = b + 1;
                        if (Nt(e, b, v, g, x, w, d, m), Nt(t, b, v, g, x, w, d, m), g) for (var N = y[b]; N < d.length;) {
                            var M, S = d[N];
                            x[S] !== w || l(M = g[S], p) ? d.splice(N, 1) : (h.push(M), N++)
                        } else for (var E = y[b]; E < d.length;) x[d[E]] !== w ? d.splice(E, 1) : E++
                    }
                    return y[f] = d.length, e.createSparseMatrix({values: h, index: d, ptr: y, size: [s, f], datatype: c})
                }
            }), Ur = Ye("lcm", ["typed", "matrix", "equalScalar"], function (e) {
                var t = e.typed, r = e.matrix, e = e.equalScalar, n = Pr({typed: t, equalScalar: e}),
                    i = jr({typed: t, equalScalar: e}), a = wr({typed: t, equalScalar: e}), o = Dr({typed: t}),
                    s = Nr({typed: t});
                return t("lcm", {
                    "number, number": nr,
                    "BigNumber, BigNumber": function (e, t) {
                        if (!e.isInt() || !t.isInt()) throw new Error("Parameters in function lcm must be integer numbers");
                        if (e.isZero()) return e;
                        if (t.isZero()) return t;
                        for (var r = e.times(t); !t.isZero();) {
                            var n = t;
                            t = e.mod(n), e = n
                        }
                        return r.div(e).abs()
                    },
                    "Fraction, Fraction": function (e, t) {
                        return e.lcm(t)
                    },
                    "SparseMatrix, SparseMatrix": function (e, t) {
                        return i(e, t, this)
                    },
                    "SparseMatrix, DenseMatrix": function (e, t) {
                        return n(t, e, this, !0)
                    },
                    "DenseMatrix, SparseMatrix": function (e, t) {
                        return n(e, t, this, !1)
                    },
                    "DenseMatrix, DenseMatrix": function (e, t) {
                        return o(e, t, this)
                    },
                    "Array, Array": function (e, t) {
                        return this(r(e), r(t)).valueOf()
                    },
                    "Array, Matrix": function (e, t) {
                        return this(r(e), t)
                    },
                    "Matrix, Array": function (e, t) {
                        return this(e, r(t))
                    },
                    "SparseMatrix, number | BigNumber": function (e, t) {
                        return a(e, t, this, !1)
                    },
                    "DenseMatrix, number | BigNumber": function (e, t) {
                        return s(e, t, this, !1)
                    },
                    "number | BigNumber, SparseMatrix": function (e, t) {
                        return a(t, e, this, !0)
                    },
                    "number | BigNumber, DenseMatrix": function (e, t) {
                        return s(t, e, this, !0)
                    },
                    "Array, number | BigNumber": function (e, t) {
                        return s(r(e), t, this, !1).valueOf()
                    },
                    "number | BigNumber, Array": function (e, t) {
                        return s(r(t), e, this, !0).valueOf()
                    },
                    "Array | Matrix | number | BigNumber, Array | Matrix | number | BigNumber, ...Array | Matrix | number | BigNumber": function (e, t, r) {
                        for (var n = this(e, t), i = 0; i < r.length; i++) n = this(n, r[i]);
                        return n
                    }
                })
            }), Fr = Ye("log10", ["typed", "config", "Complex"], function (e) {
                var t = e.typed, r = e.config, n = e.Complex;
                return t("log10", {
                    number: function (e) {
                        return 0 <= e || r.predictable ? ar(e) : new n(e, 0).log().div(Math.LN10)
                    }, Complex: function (e) {
                        return new n(e).log().div(Math.LN10)
                    }, BigNumber: function (e) {
                        return !e.isNegative() || r.predictable ? e.log() : new n(e.toNumber(), 0).log().div(Math.LN10)
                    }, "Array | Matrix": function (e) {
                        return xt(e, this)
                    }
                })
            }), Lr = Ye("log2", ["typed", "config", "Complex"], function (e) {
                var t = e.typed, r = e.config, n = e.Complex;
                return t("log2", {
                    number: function (e) {
                        return 0 <= e || r.predictable ? or(e) : i(new n(e, 0))
                    }, Complex: i, BigNumber: function (e) {
                        return !e.isNegative() || r.predictable ? e.log(2) : i(new n(e.toNumber(), 0))
                    }, "Array | Matrix": function (e) {
                        return xt(e, this)
                    }
                });

                function i(e) {
                    var t = Math.sqrt(e.re * e.re + e.im * e.im);
                    return new n(Math.log2 ? Math.log2(t) : Math.log(t) / Math.LN2, Math.atan2(e.im, e.re) / Math.LN2)
                }
            }), Hr = Ye("algorithm03", ["typed"], function (e) {
                var O = e.typed;
                return function (e, t, r, n) {
                    var i = e._data, a = e._size, o = e._datatype, s = t._values, u = t._index, c = t._ptr, f = t._size,
                        t = t._datatype;
                    if (a.length !== f.length) throw new we(a.length, f.length);
                    if (a[0] !== f[0] || a[1] !== f[1]) throw new RangeError("Dimension mismatch. Matrix A (" + a + ") must match Matrix B (" + f + ")");
                    if (!s) throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
                    var l, p = a[0], m = a[1], h = 0, d = r;
                    "string" == typeof o && o === t && (l = o, h = O.convert(0, l), d = O.find(r, [l, l]));
                    for (var y = [], g = 0; g < p; g++) y[g] = [];
                    for (var v = [], x = [], b = 0; b < m; b++) {
                        for (var w = b + 1, N = c[b], M = c[b + 1], S = N; S < M; S++) {
                            var E = u[S];
                            v[E] = n ? d(s[S], i[E][b]) : d(i[E][b], s[S]), x[E] = w
                        }
                        for (var A = 0; A < p; A++) x[A] === w ? y[A][b] = v[A] : y[A][b] = n ? d(h, i[A][b]) : d(i[A][b], h)
                    }
                    return e.createDenseMatrix({data: y, size: [p, m], datatype: l})
                }
            }), $r = Ye("algorithm05", ["typed", "equalScalar"], function (e) {
                var z = e.typed, q = e.equalScalar;
                return function (e, t, r) {
                    var n = e._values, i = e._index, a = e._ptr, o = e._size, s = e._datatype, u = t._values, c = t._index,
                        f = t._ptr, l = t._size, t = t._datatype;
                    if (o.length !== l.length) throw new we(o.length, l.length);
                    if (o[0] !== l[0] || o[1] !== l[1]) throw new RangeError("Dimension mismatch. Matrix A (" + o + ") must match Matrix B (" + l + ")");
                    var p, l = o[0], m = o[1], h = q, d = 0, y = r;
                    "string" == typeof s && s === t && (p = s, h = z.find(q, [p, p]), d = z.convert(0, p), y = z.find(r, [p, p]));
                    for (var g, v = n && u ? [] : void 0, x = [], b = [], w = v ? [] : void 0, N = v ? [] : void 0, M = [], S = [], E = 0; E < m; E++) {
                        b[E] = x.length;
                        for (var A = E + 1, O = a[E], C = a[E + 1]; O < C; O++) g = i[O], x.push(g), M[g] = A, w && (w[g] = n[O]);
                        for (O = f[E], C = f[E + 1]; O < C; O++) M[g = c[O]] !== A && x.push(g), S[g] = A, N && (N[g] = u[O]);
                        if (v) for (O = b[E]; O < x.length;) {
                            var _ = M[g = x[O]], T = S[g];
                            _ !== A && T !== A || (h(T = y(_ === A ? w[g] : d, T === A ? N[g] : d), d) ? x.splice(O, 1) : (v.push(T), O++))
                        }
                    }
                    return b[m] = x.length, e.createSparseMatrix({values: v, index: x, ptr: b, size: [l, m], datatype: p})
                }
            }), Gr = Ye("algorithm12", ["typed", "DenseMatrix"], function (e) {
                var N = e.typed, M = e.DenseMatrix;
                return function (e, t, r, n) {
                    var i = e._values, a = e._index, o = e._ptr, s = e._size, e = e._datatype;
                    if (!i) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
                    var u, c = s[0], f = s[1], l = r;
                    "string" == typeof e && (u = e, t = N.convert(t, u), l = N.find(r, [u, u]));
                    for (var p = [], m = [], h = [], d = 0; d < f; d++) {
                        for (var y = d + 1, g = o[d], v = o[d + 1], x = g; x < v; x++) {
                            var b = a[x];
                            m[b] = i[x], h[b] = y
                        }
                        for (var w = 0; w < c; w++) 0 === d && (p[w] = []), h[w] === y ? p[w][d] = n ? l(t, m[w]) : l(m[w], t) : p[w][d] = n ? l(t, 0) : l(0, t)
                    }
                    return new M({data: p, size: [c, f], datatype: u})
                }
            }), Vr = Ye("mod", ["typed", "matrix", "equalScalar", "DenseMatrix"], function (e) {
                var t = e.typed, r = e.matrix, n = e.equalScalar, e = e.DenseMatrix, i = Pr({typed: t, equalScalar: n}),
                    a = Hr({typed: t}), o = $r({typed: t, equalScalar: n}), s = wr({typed: t, equalScalar: n}),
                    u = Gr({typed: t, DenseMatrix: e}), c = Dr({typed: t}), f = Nr({typed: t});
                return t("mod", {
                    "number, number": sr, "BigNumber, BigNumber": function (e, t) {
                        if (t.isNeg()) throw new Error("Cannot calculate mod for a negative divisor");
                        return t.isZero() ? e : e.mod(t)
                    }, "Fraction, Fraction": function (e, t) {
                        if (t.compare(0) < 0) throw new Error("Cannot calculate mod for a negative divisor");
                        return (0 <= e.compare(0) ? e : e.mod(t).add(t)).mod(t)
                    }, "SparseMatrix, SparseMatrix": function (e, t) {
                        return o(e, t, this, !1)
                    }, "SparseMatrix, DenseMatrix": function (e, t) {
                        return i(t, e, this, !0)
                    }, "DenseMatrix, SparseMatrix": function (e, t) {
                        return a(e, t, this, !1)
                    }, "DenseMatrix, DenseMatrix": function (e, t) {
                        return c(e, t, this)
                    }, "Array, Array": function (e, t) {
                        return this(r(e), r(t)).valueOf()
                    }, "Array, Matrix": function (e, t) {
                        return this(r(e), t)
                    }, "Matrix, Array": function (e, t) {
                        return this(e, r(t))
                    }, "SparseMatrix, any": function (e, t) {
                        return s(e, t, this, !1)
                    }, "DenseMatrix, any": function (e, t) {
                        return f(e, t, this, !1)
                    }, "any, SparseMatrix": function (e, t) {
                        return u(t, e, this, !0)
                    }, "any, DenseMatrix": function (e, t) {
                        return f(t, e, this, !0)
                    }, "Array, any": function (e, t) {
                        return f(r(e), t, this, !1).valueOf()
                    }, "any, Array": function (e, t) {
                        return f(r(t), e, this, !0).valueOf()
                    }
                })
            }), Zr = Ye("multiplyScalar", ["typed"], function (e) {
                return (0, e.typed)("multiplyScalar", {
                    "number, number": Wt, "Complex, Complex": function (e, t) {
                        return e.mul(t)
                    }, "BigNumber, BigNumber": function (e, t) {
                        return e.times(t)
                    }, "Fraction, Fraction": function (e, t) {
                        return e.mul(t)
                    }, "number | Fraction | BigNumber | Complex, Unit": function (e, t) {
                        t = t.clone();
                        return t.value = null === t.value ? t._normalize(e) : this(t.value, e), t
                    }, "Unit, number | Fraction | BigNumber | Complex": function (e, t) {
                        e = e.clone();
                        return e.value = null === e.value ? e._normalize(t) : this(e.value, t), e
                    }, "Unit, Unit": function (e, t) {
                        return e.multiply(t)
                    }
                })
            }), Wr = Ye("multiply", ["typed", "matrix", "addScalar", "multiplyScalar", "equalScalar", "dot"], function (e) {
                var B = e.typed, r = e.matrix, k = e.addScalar, D = e.multiplyScalar, I = e.equalScalar, i = e.dot,
                    n = wr({typed: B, equalScalar: I}), a = Nr({typed: B});

                function o(e, t) {
                    switch (e.length) {
                        case 1:
                            switch (t.length) {
                                case 1:
                                    if (e[0] !== t[0]) throw new RangeError("Dimension mismatch in multiplication. Vectors must have the same length");
                                    break;
                                case 2:
                                    if (e[0] !== t[0]) throw new RangeError("Dimension mismatch in multiplication. Vector length (" + e[0] + ") must match Matrix rows (" + t[0] + ")");
                                    break;
                                default:
                                    throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + t.length + " dimensions)")
                            }
                            break;
                        case 2:
                            switch (t.length) {
                                case 1:
                                    if (e[1] !== t[0]) throw new RangeError("Dimension mismatch in multiplication. Matrix columns (" + e[1] + ") must match Vector length (" + t[0] + ")");
                                    break;
                                case 2:
                                    if (e[1] !== t[0]) throw new RangeError("Dimension mismatch in multiplication. Matrix A columns (" + e[1] + ") must match Matrix B rows (" + t[0] + ")");
                                    break;
                                default:
                                    throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + t.length + " dimensions)")
                            }
                            break;
                        default:
                            throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix A has " + e.length + " dimensions)")
                    }
                }

                var s = B("_multiplyMatrixVector", {
                    "DenseMatrix, any": function (e, t) {
                        var r, n = e._data, i = e._size, a = e._datatype, o = t._data, t = t._datatype, s = i[0], u = i[1],
                            c = k, f = D;
                        a && t && a === t && "string" == typeof a && (r = a, c = B.find(k, [r, r]), f = B.find(D, [r, r]));
                        for (var l = [], p = 0; p < s; p++) {
                            for (var m = n[p], h = f(m[0], o[0]), d = 1; d < u; d++) h = c(h, f(m[d], o[d]));
                            l[p] = h
                        }
                        return e.createDenseMatrix({data: l, size: [s], datatype: r})
                    }, "SparseMatrix, any": function (e, t) {
                        var r = e._values, n = e._index, i = e._ptr, a = e._datatype;
                        if (!r) throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
                        var o, s = t._data, u = t._datatype, c = e._size[0], f = t._size[0], l = [], p = [], t = [], m = k,
                            h = D, d = I, y = 0;
                        a && u && a === u && "string" == typeof a && (o = a, m = B.find(k, [o, o]), h = B.find(D, [o, o]), d = B.find(I, [o, o]), y = B.convert(0, o));
                        for (var g = [], v = [], x = t[0] = 0; x < f; x++) {
                            var b = s[x];
                            if (!d(b, y)) for (var w = i[x], N = i[x + 1], M = w; M < N; M++) {
                                var S = n[M];
                                v[S] ? g[S] = m(g[S], h(b, r[M])) : (v[S] = !0, p.push(S), g[S] = h(b, r[M]))
                            }
                        }
                        for (var E = p.length, A = 0; A < E; A++) {
                            var O = p[A];
                            l[A] = g[O]
                        }
                        return t[1] = p.length, e.createSparseMatrix({
                            values: l,
                            index: p,
                            ptr: t,
                            size: [c, 1],
                            datatype: o
                        })
                    }
                }), u = B("_multiplyMatrixMatrix", {
                    "DenseMatrix, DenseMatrix": function (e, t) {
                        var r, n = e._data, i = e._size, a = e._datatype, o = t._data, s = t._size, t = t._datatype,
                            u = i[0], c = i[1], f = s[1], l = k, p = D;
                        a && t && a === t && "string" == typeof a && (r = a, l = B.find(k, [r, r]), p = B.find(D, [r, r]));
                        for (var m = [], h = 0; h < u; h++) {
                            var d = n[h];
                            m[h] = [];
                            for (var y = 0; y < f; y++) {
                                for (var g = p(d[0], o[0][y]), v = 1; v < c; v++) g = l(g, p(d[v], o[v][y]));
                                m[h][y] = g
                            }
                        }
                        return e.createDenseMatrix({data: m, size: [u, f], datatype: r})
                    }, "DenseMatrix, SparseMatrix": function (e, t) {
                        var r = e._data, n = e._size, i = e._datatype, a = t._values, o = t._index, s = t._ptr, u = t._size,
                            e = t._datatype;
                        if (!a) throw new Error("Cannot multiply Dense Matrix times Pattern only Matrix");
                        var c = n[0], f = u[1], l = k, p = D, m = I, h = 0;
                        i && e && i === e && "string" == typeof i && (v = i, l = B.find(k, [v, v]), p = B.find(D, [v, v]), m = B.find(I, [v, v]), h = B.convert(0, v));
                        for (var d = [], y = [], g = [], v = t.createSparseMatrix({
                            values: d,
                            index: y,
                            ptr: g,
                            size: [c, f],
                            datatype: v
                        }), x = 0; x < f; x++) {
                            g[x] = y.length;
                            var b = s[x], w = s[x + 1];
                            if (b < w) for (var N = 0, M = 0; M < c; M++) {
                                for (var S = M + 1, E = void 0, A = b; A < w; A++) {
                                    var O = o[A];
                                    N !== S ? (E = p(r[M][O], a[A]), N = S) : E = l(E, p(r[M][O], a[A]))
                                }
                                N !== S || m(E, h) || (y.push(M), d.push(E))
                            }
                        }
                        return g[f] = y.length, v
                    }, "SparseMatrix, DenseMatrix": function (e, t) {
                        var r = e._values, n = e._index, i = e._ptr, a = e._datatype;
                        if (!r) throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
                        var o = t._data, s = t._datatype, u = e._size[0], c = t._size[0], f = t._size[1], l = k, p = D,
                            m = I, h = 0;
                        a && s && a === s && "string" == typeof a && (v = a, l = B.find(k, [v, v]), p = B.find(D, [v, v]), m = B.find(I, [v, v]), h = B.convert(0, v));
                        for (var d = [], y = [], g = [], v = e.createSparseMatrix({
                            values: d,
                            index: y,
                            ptr: g,
                            size: [u, f],
                            datatype: v
                        }), x = [], b = [], w = 0; w < f; w++) {
                            g[w] = y.length;
                            for (var N = w + 1, M = 0; M < c; M++) {
                                var S = o[M][w];
                                if (!m(S, h)) for (var E = i[M], A = i[M + 1], O = E; O < A; O++) {
                                    var C = n[O];
                                    b[C] !== N ? (b[C] = N, y.push(C), x[C] = p(S, r[O])) : x[C] = l(x[C], p(S, r[O]))
                                }
                            }
                            for (var _ = g[w], T = y.length, z = _; z < T; z++) {
                                var q = y[z];
                                d[z] = x[q]
                            }
                        }
                        return g[f] = y.length, v
                    }, "SparseMatrix, SparseMatrix": function (e, t) {
                        var r = e._values, n = e._index, i = e._ptr, a = e._datatype, o = t._values, s = t._index,
                            u = t._ptr, c = t._datatype, f = e._size[0], l = t._size[1], p = r && o, m = k, h = D;
                        a && c && a === c && "string" == typeof a && (M = a, m = B.find(k, [M, M]), h = B.find(D, [M, M]));
                        for (var d, y, g, v, x, b = p ? [] : void 0, w = [], N = [], M = e.createSparseMatrix({
                            values: b,
                            index: w,
                            ptr: N,
                            size: [f, l],
                            datatype: M
                        }), S = p ? [] : void 0, E = [], A = 0; A < l; A++) {
                            N[A] = w.length;
                            for (var O = A + 1, C = u[A], _ = u[A + 1], T = C; T < _; T++) if (x = s[T], p) for (y = i[x], g = i[x + 1], d = y; d < g; d++) E[v = n[d]] !== O ? (E[v] = O, w.push(v), S[v] = h(o[T], r[d])) : S[v] = m(S[v], h(o[T], r[d])); else for (y = i[x], g = i[x + 1], d = y; d < g; d++) E[v = n[d]] !== O && (E[v] = O, w.push(v));
                            if (p) for (var C = N[A], z = w.length, q = C; q < z; q++) {
                                var I = w[q];
                                b[q] = S[I]
                            }
                        }
                        return N[l] = w.length, M
                    }
                });
                return B("multiply", Ge({
                    "Array, Array": function (e, t) {
                        o(Me(e), Me(t));
                        t = this(r(e), r(t));
                        return E(t) ? t.valueOf() : t
                    }, "Matrix, Matrix": function (e, t) {
                        var r = e.size(), n = t.size();
                        return o(r, n), (1 === r.length ? 1 === n.length ? function (e, t) {
                            if (0 === r[0]) throw new Error("Cannot multiply two empty vectors");
                            return i(e, t)
                        } : function (e, y) {
                            if ("dense" !== y.storage()) throw new Error("Support for SparseMatrix not implemented");
                            return function (e) {
                                var t, r = e._data, n = e._size, i = e._datatype, a = y._data, o = y._size, s = y._datatype,
                                    u = n[0], c = o[1], f = k, l = D;
                                i && s && i === s && "string" == typeof i && (t = i, f = B.find(k, [t, t]), l = B.find(D, [t, t]));
                                for (var p = [], m = 0; m < c; m++) {
                                    for (var h = l(r[0], a[0][m]), d = 1; d < u; d++) h = f(h, l(r[d], a[d][m]));
                                    p[m] = h
                                }
                                return e.createDenseMatrix({data: p, size: [c], datatype: t})
                            }(e)
                        } : 1 === n.length ? s : u)(e, t)
                    }, "Matrix, Array": function (e, t) {
                        return this(e, r(t))
                    }, "Array, Matrix": function (e, t) {
                        return this(r(e, t.storage()), t)
                    }, "SparseMatrix, any": function (e, t) {
                        return n(e, t, D, !1)
                    }, "DenseMatrix, any": function (e, t) {
                        return a(e, t, D, !1)
                    }, "any, SparseMatrix": function (e, t) {
                        return n(t, e, D, !0)
                    }, "any, DenseMatrix": function (e, t) {
                        return a(t, e, D, !0)
                    }, "Array, any": function (e, t) {
                        return a(r(e), t, D, !1).valueOf()
                    }, "any, Array": function (e, t) {
                        return a(r(t), e, D, !0).valueOf()
                    }, "any, any": D, "any, any, ...any": function (e, t, r) {
                        for (var n = this(e, t), i = 0; i < r.length; i++) n = this(n, r[i]);
                        return n
                    }
                }, D.signatures))
            }), Jr = Ye("nthRoot", ["typed", "matrix", "equalScalar", "BigNumber"], function (e) {
                var t = e.typed, r = e.matrix, n = e.equalScalar, s = e.BigNumber, i = Ir({typed: t}),
                    a = Pr({typed: t, equalScalar: n}), o = jr({typed: t, equalScalar: n}),
                    u = wr({typed: t, equalScalar: n}), c = Dr({typed: t}), f = Nr({typed: t}),
                    l = "Complex number not supported in function nthRoot. Use nthRoots instead.";
                return t("nthRoot", {
                    number: function (e) {
                        return ur(e, 2)
                    }, "number, number": ur, BigNumber: function (e) {
                        return p(e, new s(2))
                    }, Complex: function (e) {
                        throw new Error(l)
                    }, "Complex, number": function (e, t) {
                        throw new Error(l)
                    }, "BigNumber, BigNumber": p, "Array | Matrix": function (e) {
                        return this(e, 2)
                    }, "SparseMatrix, SparseMatrix": function (e, t) {
                        if (1 === t.density()) return o(e, t, this);
                        throw new Error("Root must be non-zero")
                    }, "SparseMatrix, DenseMatrix": function (e, t) {
                        return a(t, e, this, !0)
                    }, "DenseMatrix, SparseMatrix": function (e, t) {
                        if (1 === t.density()) return i(e, t, this, !1);
                        throw new Error("Root must be non-zero")
                    }, "DenseMatrix, DenseMatrix": function (e, t) {
                        return c(e, t, this)
                    }, "Array, Array": function (e, t) {
                        return this(r(e), r(t)).valueOf()
                    }, "Array, Matrix": function (e, t) {
                        return this(r(e), t)
                    }, "Matrix, Array": function (e, t) {
                        return this(e, r(t))
                    }, "SparseMatrix, number | BigNumber": function (e, t) {
                        return u(e, t, this, !1)
                    }, "DenseMatrix, number | BigNumber": function (e, t) {
                        return f(e, t, this, !1)
                    }, "number | BigNumber, SparseMatrix": function (e, t) {
                        if (1 === t.density()) return u(t, e, this, !0);
                        throw new Error("Root must be non-zero")
                    }, "number | BigNumber, DenseMatrix": function (e, t) {
                        return f(t, e, this, !0)
                    }, "Array, number | BigNumber": function (e, t) {
                        return this(r(e), t).valueOf()
                    }, "number | BigNumber, Array": function (e, t) {
                        return this(e, r(t)).valueOf()
                    }
                });

                function p(e, t) {
                    var r = s.precision, n = s.clone({precision: r + 2}), i = new s(0), a = new n(1), o = t.isNegative();
                    if (o && (t = t.neg()), t.isZero()) throw new Error("Root must be non-zero");
                    if (e.isNegative() && !t.abs().mod(2).equals(1)) throw new Error("Root must be odd when a is negative.");
                    if (e.isZero()) return o ? new n(1 / 0) : 0;
                    if (!e.isFinite()) return o ? i : e;
                    t = e.abs().pow(a.div(t)), t = e.isNeg() ? t.neg() : t;
                    return new s((o ? a.div(t) : t).toPrecision(r))
                }
            }), Yr = Ye("sign", ["typed", "BigNumber", "Fraction", "complex"], function (e) {
                var t = e.typed, r = e.BigNumber, n = e.complex, i = e.Fraction;
                return t("sign", {
                    number: cr, Complex: function (e) {
                        return 0 === e.im ? n(cr(e.re)) : e.sign()
                    }, BigNumber: function (e) {
                        return new r(e.cmp(0))
                    }, Fraction: function (e) {
                        return new i(e.s, 1)
                    }, "Array | Matrix": function (e) {
                        return xt(e, this, !0)
                    }, Unit: function (e) {
                        return this(e.value)
                    }
                })
            }), Xr = Ye("sqrt", ["config", "typed", "Complex"], function (e) {
                var t = e.config, r = e.typed, n = e.Complex;
                return r("sqrt", {
                    number: i, Complex: function (e) {
                        return e.sqrt()
                    }, BigNumber: function (e) {
                        return !e.isNegative() || t.predictable ? e.sqrt() : i(e.toNumber())
                    }, "Array | Matrix": function (e) {
                        return xt(e, this, !0)
                    }, Unit: function (e) {
                        return e.pow(.5)
                    }
                });

                function i(e) {
                    return isNaN(e) ? NaN : 0 <= e || t.predictable ? Math.sqrt(e) : new n(e, 0).sqrt()
                }
            }), Qr = Ye("square", ["typed"], function (e) {
                return (0, e.typed)("square", {
                    number: fr, Complex: function (e) {
                        return e.mul(e)
                    }, BigNumber: function (e) {
                        return e.times(e)
                    }, Fraction: function (e) {
                        return e.mul(e)
                    }, "Array | Matrix": function (e) {
                        return xt(e, this, !0)
                    }, Unit: function (e) {
                        return e.pow(2)
                    }
                })
            }),
            Kr = Ye("subtract", ["typed", "matrix", "equalScalar", "addScalar", "unaryMinus", "DenseMatrix"], function (e) {
                var t = e.typed, r = e.matrix, n = e.equalScalar, i = e.addScalar, a = e.unaryMinus, e = e.DenseMatrix,
                    o = Ir({typed: t}), s = Hr({typed: t}), u = $r({typed: t, equalScalar: n}),
                    c = kr({typed: t, DenseMatrix: e}), f = Dr({typed: t}), l = Nr({typed: t});
                return t("subtract", {
                    "number, number": function (e, t) {
                        return e - t
                    }, "Complex, Complex": function (e, t) {
                        return e.sub(t)
                    }, "BigNumber, BigNumber": function (e, t) {
                        return e.minus(t)
                    }, "Fraction, Fraction": function (e, t) {
                        return e.sub(t)
                    }, "Unit, Unit": function (e, t) {
                        if (null === e.value) throw new Error("Parameter x contains a unit with undefined value");
                        if (null === t.value) throw new Error("Parameter y contains a unit with undefined value");
                        if (!e.equalBase(t)) throw new Error("Units do not match");
                        e = e.clone();
                        return e.value = this(e.value, t.value), e.fixPrefix = !1, e
                    }, "SparseMatrix, SparseMatrix": function (e, t) {
                        return en(e, t), u(e, t, this)
                    }, "SparseMatrix, DenseMatrix": function (e, t) {
                        return en(e, t), s(t, e, this, !0)
                    }, "DenseMatrix, SparseMatrix": function (e, t) {
                        return en(e, t), o(e, t, this, !1)
                    }, "DenseMatrix, DenseMatrix": function (e, t) {
                        return en(e, t), f(e, t, this)
                    }, "Array, Array": function (e, t) {
                        return this(r(e), r(t)).valueOf()
                    }, "Array, Matrix": function (e, t) {
                        return this(r(e), t)
                    }, "Matrix, Array": function (e, t) {
                        return this(e, r(t))
                    }, "SparseMatrix, any": function (e, t) {
                        return c(e, a(t), i)
                    }, "DenseMatrix, any": function (e, t) {
                        return l(e, t, this)
                    }, "any, SparseMatrix": function (e, t) {
                        return c(t, e, this, !0)
                    }, "any, DenseMatrix": function (e, t) {
                        return l(t, e, this, !0)
                    }, "Array, any": function (e, t) {
                        return l(r(e), t, this, !1).valueOf()
                    }, "any, Array": function (e, t) {
                        return l(r(t), e, this, !0).valueOf()
                    }
                })
            });

        function en(e, t) {
            e = e.size(), t = t.size();
            if (e.length !== t.length) throw new we(e.length, t.length)
        }

        var tn = Ye("xgcd", ["typed", "config", "matrix", "BigNumber"], function (e) {
            var t = e.typed, l = e.config, p = e.matrix, m = e.BigNumber;
            return t("xgcd", {
                "number, number": function (e, t) {
                    t = lr(e, t);
                    return "Array" === l.matrix ? t : p(t)
                }, "BigNumber, BigNumber": function (e, t) {
                    var r, n, i, a = new m(0), o = new m(1), s = a, u = o, c = o, f = a;
                    if (!e.isInt() || !t.isInt()) throw new Error("Parameters in function xgcd must be integer numbers");
                    for (; !t.isZero();) n = e.div(t).floor(), i = e.mod(t), r = s, s = u.minus(n.times(s)), u = r, r = c, c = f.minus(n.times(c)), f = r, e = t, t = i;
                    return a = e.lt(a) ? [e.neg(), u.neg(), f.neg()] : [e, e.isZero() ? 0 : u, f], "Array" === l.matrix ? a : p(a)
                }
            })
        }), rn = Ye("algorithm09", ["typed", "equalScalar"], function (e) {
            var _ = e.typed, T = e.equalScalar;
            return function (e, t, r) {
                var n = e._values, i = e._index, a = e._ptr, o = e._size, s = e._datatype, u = t._values, c = t._index,
                    f = t._ptr, l = t._size, t = t._datatype;
                if (o.length !== l.length) throw new we(o.length, l.length);
                if (o[0] !== l[0] || o[1] !== l[1]) throw new RangeError("Dimension mismatch. Matrix A (" + o + ") must match Matrix B (" + l + ")");
                var p, l = o[0], m = o[1], h = T, d = 0, y = r;
                "string" == typeof s && s === t && (p = s, h = _.find(T, [p, p]), d = _.convert(0, p), y = _.find(r, [p, p]));
                for (var g, v, x, b, w = n && u ? [] : void 0, N = [], M = [], S = w ? [] : void 0, E = [], A = 0; A < m; A++) {
                    M[A] = N.length;
                    var O, C = A + 1;
                    if (S) for (x = f[A], b = f[A + 1], v = x; v < b; v++) E[g = c[v]] = C, S[g] = u[v];
                    for (x = a[A], b = a[A + 1], v = x; v < b; v++) g = i[v], S ? (O = E[g] === C ? S[g] : d, h(O = y(n[v], O), d) || (N.push(g), w.push(O))) : N.push(g)
                }
                return M[m] = N.length, e.createSparseMatrix({values: w, index: N, ptr: M, size: [l, m], datatype: p})
            }
        }), nn = Ye("dotMultiply", ["typed", "matrix", "equalScalar", "multiplyScalar"], function (e) {
            var t = e.typed, r = e.matrix, n = e.equalScalar, i = e.multiplyScalar, a = Pr({typed: t, equalScalar: n}),
                o = rn({typed: t, equalScalar: n}), s = wr({typed: t, equalScalar: n}), u = Dr({typed: t}),
                c = Nr({typed: t});
            return t("dotMultiply", {
                "any, any": i, "SparseMatrix, SparseMatrix": function (e, t) {
                    return o(e, t, i, !1)
                }, "SparseMatrix, DenseMatrix": function (e, t) {
                    return a(t, e, i, !0)
                }, "DenseMatrix, SparseMatrix": function (e, t) {
                    return a(e, t, i, !1)
                }, "DenseMatrix, DenseMatrix": function (e, t) {
                    return u(e, t, i)
                }, "Array, Array": function (e, t) {
                    return this(r(e), r(t)).valueOf()
                }, "Array, Matrix": function (e, t) {
                    return this(r(e), t)
                }, "Matrix, Array": function (e, t) {
                    return this(e, r(t))
                }, "SparseMatrix, any": function (e, t) {
                    return s(e, t, i, !1)
                }, "DenseMatrix, any": function (e, t) {
                    return c(e, t, i, !1)
                }, "any, SparseMatrix": function (e, t) {
                    return s(t, e, i, !0)
                }, "any, DenseMatrix": function (e, t) {
                    return c(t, e, i, !0)
                }, "Array, any": function (e, t) {
                    return c(r(e), t, i, !1).valueOf()
                }, "any, Array": function (e, t) {
                    return c(r(t), e, i, !0).valueOf()
                }
            })
        });

        function an(e, t) {
            if (e.isFinite() && !e.isInteger() || t.isFinite() && !t.isInteger()) throw new Error("Integers expected in function bitAnd");
            var r = e.constructor;
            if (e.isNaN() || t.isNaN()) return new r(NaN);
            if (e.isZero() || t.eq(-1) || e.eq(t)) return e;
            if (t.isZero() || e.eq(-1)) return t;
            if (!e.isFinite() || !t.isFinite()) {
                if (!e.isFinite() && !t.isFinite()) return e.isNegative() === t.isNegative() ? e : new r(0);
                if (!e.isFinite()) return t.isNegative() ? e : e.isNegative() ? new r(0) : t;
                if (!t.isFinite()) return e.isNegative() ? t : t.isNegative() ? new r(0) : e
            }
            return un(e, t, function (e, t) {
                return e & t
            })
        }

        function on(e) {
            if (e.isFinite() && !e.isInteger()) throw new Error("Integer expected in function bitNot");
            var t = e.constructor, r = t.precision;
            t.config({precision: 1e9});
            e = e.plus(new t(1));
            return e.s = -e.s || null, t.config({precision: r}), e
        }

        function sn(e, t) {
            if (e.isFinite() && !e.isInteger() || t.isFinite() && !t.isInteger()) throw new Error("Integers expected in function bitOr");
            var r = e.constructor;
            if (e.isNaN() || t.isNaN()) return new r(NaN);
            r = new r(-1);
            return e.isZero() || t.eq(r) || e.eq(t) ? t : t.isZero() || e.eq(r) ? e : e.isFinite() && t.isFinite() ? un(e, t, function (e, t) {
                return e | t
            }) : !e.isFinite() && !e.isNegative() && t.isNegative() || e.isNegative() && !t.isNegative() && !t.isFinite() ? r : e.isNegative() && t.isNegative() ? e.isFinite() ? e : t : e.isFinite() ? t : e
        }

        function un(e, t, r) {
            var n, i, a, o, s, u = e.constructor, c = +(e.s < 0), f = +(t.s < 0);
            if (c) {
                n = cn(on(e));
                for (var l = 0; l < n.length; ++l) n[l] ^= 1
            } else n = cn(e);
            if (f) {
                i = cn(on(t));
                for (var p = 0; p < i.length; ++p) i[p] ^= 1
            } else i = cn(t);
            s = n.length <= i.length ? (a = n, o = i, c) : (a = i, o = n, f);
            var m = a.length, h = o.length, d = 1 ^ r(c, f), y = new u(1 ^ d), g = new u(1), v = new u(2),
                f = u.precision;
            for (u.config({precision: 1e9}); 0 < m;) r(a[--m], o[--h]) === d && (y = y.plus(g)), g = g.times(v);
            for (; 0 < h;) r(s, o[--h]) === d && (y = y.plus(g)), g = g.times(v);
            return u.config({precision: f}), 0 == d && (y.s = -y.s), y
        }

        function cn(e) {
            for (var t = e.d, r = t[0] + "", n = 1; n < t.length; ++n) {
                for (var i = t[n] + "", a = 7 - i.length; a--;) i = "0" + i;
                r += i
            }
            for (var o = r.length; "0" === r.charAt(o);) o--;
            var s = e.e, u = r.slice(0, o + 1 || 1), e = u.length;
            if (0 < s) if (++s > e) for (s -= e; s--;) u += "0"; else s < e && (u = u.slice(0, s) + "." + u.slice(s));
            for (var c = [0], f = 0; f < u.length;) {
                for (var l = c.length; l--;) c[l] *= 10;
                c[0] += parseInt(u.charAt(f++));
                for (var p = 0; p < c.length; ++p) 1 < c[p] && (null !== c[p + 1] && void 0 !== c[p + 1] || (c[p + 1] = 0), c[p + 1] += c[p] >> 1, c[p] &= 1)
            }
            return c.reverse()
        }

        function fn(e, t) {
            if (e.isFinite() && !e.isInteger() || t.isFinite() && !t.isInteger()) throw new Error("Integers expected in function bitXor");
            var r = e.constructor;
            if (e.isNaN() || t.isNaN()) return new r(NaN);
            if (e.isZero()) return t;
            if (t.isZero()) return e;
            if (e.eq(t)) return new r(0);
            var n = new r(-1);
            return e.eq(n) ? on(t) : t.eq(n) ? on(e) : e.isFinite() && t.isFinite() ? un(e, t, function (e, t) {
                return e ^ t
            }) : e.isFinite() || t.isFinite() ? new r(e.isNegative() === t.isNegative() ? 1 / 0 : -1 / 0) : n
        }

        function ln(e, t) {
            if (e.isFinite() && !e.isInteger() || t.isFinite() && !t.isInteger()) throw new Error("Integers expected in function leftShift");
            var r = e.constructor;
            return e.isNaN() || t.isNaN() || t.isNegative() && !t.isZero() ? new r(NaN) : e.isZero() || t.isZero() ? e : e.isFinite() || t.isFinite() ? t.lt(55) ? e.times(Math.pow(2, t.toNumber()) + "") : e.times(new r(2).pow(t)) : new r(NaN)
        }

        function pn(e, t) {
            if (e.isFinite() && !e.isInteger() || t.isFinite() && !t.isInteger()) throw new Error("Integers expected in function rightArithShift");
            var r = e.constructor;
            return e.isNaN() || t.isNaN() || t.isNegative() && !t.isZero() ? new r(NaN) : e.isZero() || t.isZero() ? e : t.isFinite() ? (t.lt(55) ? e.div(Math.pow(2, t.toNumber()) + "") : e.div(new r(2).pow(t))).floor() : e.isNegative() ? new r(-1) : e.isFinite() ? new r(0) : new r(NaN)
        }

        at = "number, number";

        function mn(e, t) {
            if (!L(e) || !L(t)) throw new Error("Integers expected in function bitAnd");
            return e & t
        }

        function hn(e) {
            if (!L(e)) throw new Error("Integer expected in function bitNot");
            return ~e
        }

        function dn(e, t) {
            if (!L(e) || !L(t)) throw new Error("Integers expected in function bitOr");
            return e | t
        }

        function yn(e, t) {
            if (!L(e) || !L(t)) throw new Error("Integers expected in function bitXor");
            return e ^ t
        }

        function gn(e, t) {
            if (!L(e) || !L(t)) throw new Error("Integers expected in function leftShift");
            return e << t
        }

        function vn(e, t) {
            if (!L(e) || !L(t)) throw new Error("Integers expected in function rightArithShift");
            return e >> t
        }

        function xn(e, t) {
            if (!L(e) || !L(t)) throw new Error("Integers expected in function rightLogShift");
            return e >>> t
        }

        mn.signature = at, hn.signature = "number", xn.signature = vn.signature = gn.signature = yn.signature = dn.signature = at;
        var bn = Ye("bitAnd", ["typed", "matrix", "equalScalar"], function (e) {
            var t = e.typed, r = e.matrix, e = e.equalScalar, n = Pr({typed: t, equalScalar: e}),
                i = jr({typed: t, equalScalar: e}), a = wr({typed: t, equalScalar: e}), o = Dr({typed: t}),
                s = Nr({typed: t});
            return t("bitAnd", {
                "number, number": mn,
                "BigNumber, BigNumber": an,
                "SparseMatrix, SparseMatrix": function (e, t) {
                    return i(e, t, this, !1)
                },
                "SparseMatrix, DenseMatrix": function (e, t) {
                    return n(t, e, this, !0)
                },
                "DenseMatrix, SparseMatrix": function (e, t) {
                    return n(e, t, this, !1)
                },
                "DenseMatrix, DenseMatrix": function (e, t) {
                    return o(e, t, this)
                },
                "Array, Array": function (e, t) {
                    return this(r(e), r(t)).valueOf()
                },
                "Array, Matrix": function (e, t) {
                    return this(r(e), t)
                },
                "Matrix, Array": function (e, t) {
                    return this(e, r(t))
                },
                "SparseMatrix, any": function (e, t) {
                    return a(e, t, this, !1)
                },
                "DenseMatrix, any": function (e, t) {
                    return s(e, t, this, !1)
                },
                "any, SparseMatrix": function (e, t) {
                    return a(t, e, this, !0)
                },
                "any, DenseMatrix": function (e, t) {
                    return s(t, e, this, !0)
                },
                "Array, any": function (e, t) {
                    return s(r(e), t, this, !1).valueOf()
                },
                "any, Array": function (e, t) {
                    return s(r(t), e, this, !0).valueOf()
                }
            })
        }), wn = Ye("bitNot", ["typed"], function (e) {
            return (0, e.typed)("bitNot", {
                number: hn, BigNumber: on, "Array | Matrix": function (e) {
                    return xt(e, this)
                }
            })
        }), Nn = Ye("bitOr", ["typed", "matrix", "equalScalar", "DenseMatrix"], function (e) {
            var t = e.typed, r = e.matrix, n = e.equalScalar, e = e.DenseMatrix, i = Ir({typed: t}),
                a = Br({typed: t, equalScalar: n}), o = kr({typed: t, DenseMatrix: e}), s = Dr({typed: t}),
                u = Nr({typed: t});
            return t("bitOr", {
                "number, number": dn,
                "BigNumber, BigNumber": sn,
                "SparseMatrix, SparseMatrix": function (e, t) {
                    return a(e, t, this)
                },
                "SparseMatrix, DenseMatrix": function (e, t) {
                    return i(t, e, this, !0)
                },
                "DenseMatrix, SparseMatrix": function (e, t) {
                    return i(e, t, this, !1)
                },
                "DenseMatrix, DenseMatrix": function (e, t) {
                    return s(e, t, this)
                },
                "Array, Array": function (e, t) {
                    return this(r(e), r(t)).valueOf()
                },
                "Array, Matrix": function (e, t) {
                    return this(r(e), t)
                },
                "Matrix, Array": function (e, t) {
                    return this(e, r(t))
                },
                "SparseMatrix, any": function (e, t) {
                    return o(e, t, this, !1)
                },
                "DenseMatrix, any": function (e, t) {
                    return u(e, t, this, !1)
                },
                "any, SparseMatrix": function (e, t) {
                    return o(t, e, this, !0)
                },
                "any, DenseMatrix": function (e, t) {
                    return u(t, e, this, !0)
                },
                "Array, any": function (e, t) {
                    return u(r(e), t, this, !1).valueOf()
                },
                "any, Array": function (e, t) {
                    return u(r(t), e, this, !0).valueOf()
                }
            })
        }), Mn = Ye("algorithm07", ["typed", "DenseMatrix"], function (e) {
            var N = e.typed, M = e.DenseMatrix;
            return function (e, t, r) {
                var n = e._size, i = e._datatype, a = t._size, o = t._datatype;
                if (n.length !== a.length) throw new we(n.length, a.length);
                if (n[0] !== a[0] || n[1] !== a[1]) throw new RangeError("Dimension mismatch. Matrix A (" + n + ") must match Matrix B (" + a + ")");
                var s, u = n[0], c = n[1], f = 0, l = r;
                "string" == typeof i && i === o && (s = i, f = N.convert(0, s), l = N.find(r, [s, s]));
                for (var p = [], m = 0; m < u; m++) p[m] = [];
                for (var h = [], d = [], y = [], g = [], v = 0; v < c; v++) {
                    var x = v + 1;
                    for (S(e, v, y, h, x), S(t, v, g, d, x), m = 0; m < u; m++) {
                        var b = y[m] === x ? h[m] : f, w = g[m] === x ? d[m] : f;
                        p[m][v] = l(b, w)
                    }
                }
                return new M({data: p, size: [u, c], datatype: s})
            };

            function S(e, t, r, n, i) {
                for (var a = e._values, o = e._index, e = e._ptr, s = e[t], u = e[t + 1]; s < u; s++) {
                    var c = o[s];
                    r[c] = i, n[c] = a[s]
                }
            }
        }), Sn = Ye("bitXor", ["typed", "matrix", "DenseMatrix"], function (e) {
            var t = e.typed, r = e.matrix, e = e.DenseMatrix, n = Hr({typed: t}), i = Mn({typed: t, DenseMatrix: e}),
                a = Gr({typed: t, DenseMatrix: e}), o = Dr({typed: t}), s = Nr({typed: t});
            return t("bitXor", {
                "number, number": yn,
                "BigNumber, BigNumber": fn,
                "SparseMatrix, SparseMatrix": function (e, t) {
                    return i(e, t, this)
                },
                "SparseMatrix, DenseMatrix": function (e, t) {
                    return n(t, e, this, !0)
                },
                "DenseMatrix, SparseMatrix": function (e, t) {
                    return n(e, t, this, !1)
                },
                "DenseMatrix, DenseMatrix": function (e, t) {
                    return o(e, t, this)
                },
                "Array, Array": function (e, t) {
                    return this(r(e), r(t)).valueOf()
                },
                "Array, Matrix": function (e, t) {
                    return this(r(e), t)
                },
                "Matrix, Array": function (e, t) {
                    return this(e, r(t))
                },
                "SparseMatrix, any": function (e, t) {
                    return a(e, t, this, !1)
                },
                "DenseMatrix, any": function (e, t) {
                    return s(e, t, this, !1)
                },
                "any, SparseMatrix": function (e, t) {
                    return a(t, e, this, !0)
                },
                "any, DenseMatrix": function (e, t) {
                    return s(t, e, this, !0)
                },
                "Array, any": function (e, t) {
                    return s(r(e), t, this, !1).valueOf()
                },
                "any, Array": function (e, t) {
                    return s(r(t), e, this, !0).valueOf()
                }
            })
        }), En = Ye("arg", ["typed"], function (e) {
            return (0, e.typed)("arg", {
                number: function (e) {
                    return Math.atan2(0, e)
                }, BigNumber: function (e) {
                    return e.constructor.atan2(0, e)
                }, Complex: function (e) {
                    return e.arg()
                }, "Array | Matrix": function (e) {
                    return xt(e, this)
                }
            })
        }), An = Ye("conj", ["typed"], function (e) {
            return (0, e.typed)("conj", {
                number: function (e) {
                    return e
                }, BigNumber: function (e) {
                    return e
                }, Complex: function (e) {
                    return e.conjugate()
                }, "Array | Matrix": function (e) {
                    return xt(e, this)
                }
            })
        }), On = Ye("im", ["typed"], function (e) {
            return (0, e.typed)("im", {
                number: function (e) {
                    return 0
                }, BigNumber: function (e) {
                    return e.mul(0)
                }, Complex: function (e) {
                    return e.im
                }, "Array | Matrix": function (e) {
                    return xt(e, this)
                }
            })
        }), Cn = Ye("re", ["typed"], function (e) {
            return (0, e.typed)("re", {
                number: function (e) {
                    return e
                }, BigNumber: function (e) {
                    return e
                }, Complex: function (e) {
                    return e.re
                }, "Array | Matrix": function (e) {
                    return xt(e, this)
                }
            })
        });

        function _n(e) {
            return !e
        }

        function Tn(e, t) {
            return !(!e && !t)
        }

        function zn(e, t) {
            return !!e != !!t
        }

        function qn(e, t) {
            return !(!e || !t)
        }

        _n.signature = "number", qn.signature = zn.signature = Tn.signature = "number, number";
        var In = Ye("not", ["typed"], function (e) {
            return (0, e.typed)("not", {
                number: _n, Complex: function (e) {
                    return 0 === e.re && 0 === e.im
                }, BigNumber: function (e) {
                    return e.isZero() || e.isNaN()
                }, Unit: function (e) {
                    return null === e.value || this(e.value)
                }, "Array | Matrix": function (e) {
                    return xt(e, this)
                }
            })
        }), Bn = Ye("or", ["typed", "matrix", "equalScalar", "DenseMatrix"], function (e) {
            var t = e.typed, r = e.matrix, n = e.equalScalar, e = e.DenseMatrix, i = Hr({typed: t}),
                a = $r({typed: t, equalScalar: n}), o = Gr({typed: t, DenseMatrix: e}), s = Dr({typed: t}),
                u = Nr({typed: t});
            return t("or", {
                "number, number": Tn, "Complex, Complex": function (e, t) {
                    return 0 !== e.re || 0 !== e.im || 0 !== t.re || 0 !== t.im
                }, "BigNumber, BigNumber": function (e, t) {
                    return !e.isZero() && !e.isNaN() || !t.isZero() && !t.isNaN()
                }, "Unit, Unit": function (e, t) {
                    return this(e.value || 0, t.value || 0)
                }, "SparseMatrix, SparseMatrix": function (e, t) {
                    return a(e, t, this)
                }, "SparseMatrix, DenseMatrix": function (e, t) {
                    return i(t, e, this, !0)
                }, "DenseMatrix, SparseMatrix": function (e, t) {
                    return i(e, t, this, !1)
                }, "DenseMatrix, DenseMatrix": function (e, t) {
                    return s(e, t, this)
                }, "Array, Array": function (e, t) {
                    return this(r(e), r(t)).valueOf()
                }, "Array, Matrix": function (e, t) {
                    return this(r(e), t)
                }, "Matrix, Array": function (e, t) {
                    return this(e, r(t))
                }, "SparseMatrix, any": function (e, t) {
                    return o(e, t, this, !1)
                }, "DenseMatrix, any": function (e, t) {
                    return u(e, t, this, !1)
                }, "any, SparseMatrix": function (e, t) {
                    return o(t, e, this, !0)
                }, "any, DenseMatrix": function (e, t) {
                    return u(t, e, this, !0)
                }, "Array, any": function (e, t) {
                    return u(r(e), t, this, !1).valueOf()
                }, "any, Array": function (e, t) {
                    return u(r(t), e, this, !0).valueOf()
                }
            })
        }), kn = Ye("xor", ["typed", "matrix", "DenseMatrix"], function (e) {
            var t = e.typed, r = e.matrix, e = e.DenseMatrix, n = Hr({typed: t}), i = Mn({typed: t, DenseMatrix: e}),
                a = Gr({typed: t, DenseMatrix: e}), o = Dr({typed: t}), s = Nr({typed: t});
            return t("xor", {
                "number, number": zn, "Complex, Complex": function (e, t) {
                    return (0 !== e.re || 0 !== e.im) != (0 !== t.re || 0 !== t.im)
                }, "BigNumber, BigNumber": function (e, t) {
                    return (!e.isZero() && !e.isNaN()) != (!t.isZero() && !t.isNaN())
                }, "Unit, Unit": function (e, t) {
                    return this(e.value || 0, t.value || 0)
                }, "SparseMatrix, SparseMatrix": function (e, t) {
                    return i(e, t, this)
                }, "SparseMatrix, DenseMatrix": function (e, t) {
                    return n(t, e, this, !0)
                }, "DenseMatrix, SparseMatrix": function (e, t) {
                    return n(e, t, this, !1)
                }, "DenseMatrix, DenseMatrix": function (e, t) {
                    return o(e, t, this)
                }, "Array, Array": function (e, t) {
                    return this(r(e), r(t)).valueOf()
                }, "Array, Matrix": function (e, t) {
                    return this(r(e), t)
                }, "Matrix, Array": function (e, t) {
                    return this(e, r(t))
                }, "SparseMatrix, any": function (e, t) {
                    return a(e, t, this, !1)
                }, "DenseMatrix, any": function (e, t) {
                    return s(e, t, this, !1)
                }, "any, SparseMatrix": function (e, t) {
                    return a(t, e, this, !0)
                }, "any, DenseMatrix": function (e, t) {
                    return s(t, e, this, !0)
                }, "Array, any": function (e, t) {
                    return s(r(e), t, this, !1).valueOf()
                }, "any, Array": function (e, t) {
                    return s(r(t), e, this, !0).valueOf()
                }
            })
        }), Dn = Ye("concat", ["typed", "matrix", "isInteger"], function (e) {
            var t = e.typed, f = e.matrix, l = e.isInteger;
            return t("concat", {
                "...Array | Matrix | number | BigNumber": function (e) {
                    for (var t, r = e.length, n = -1, i = !1, a = [], o = 0; o < r; o++) {
                        var s = e[o];
                        if (E(s) && (i = !0), M(s) || I(s)) {
                            if (o !== r - 1) throw new Error("Dimension must be specified as last argument");
                            if (t = n, n = s.valueOf(), !l(n)) throw new TypeError("Integer number expected for dimension");
                            if (n < 0 || 0 < o && t < n) throw new Ne(n, t + 1)
                        } else {
                            var u = He(s).valueOf(), s = Me(u);
                            if (a[o] = u, t = n, n = s.length - 1, 0 < o && n !== t) throw new we(t + 1, n + 1)
                        }
                    }
                    if (0 === a.length) throw new SyntaxError("At least one matrix expected");
                    for (var c = a.shift(); a.length;) c = function e(t, r, n, i) {
                        if (i < n) {
                            if (t.length !== r.length) throw new we(t.length, r.length);
                            for (var a = [], o = 0; o < t.length; o++) a[o] = e(t[o], r[o], n, i + 1);
                            return a
                        }
                        return t.concat(r)
                    }(c, a.shift(), n, 0);
                    return i ? f(c) : c
                }, "...string": function (e) {
                    return e.join("")
                }
            })
        });
        var Rn = Ye("column", ["typed", "Index", "matrix", "range"], function (e) {
            var t = e.typed, n = e.Index, r = e.matrix, i = e.range;
            return t("column", {
                "Matrix, number": a, "Array, number": function (e, t) {
                    return a(r(He(e)), t).valueOf()
                }
            });

            function a(e, t) {
                if (2 !== e.size().length) throw new Error("Only two dimensional matrix is supported");
                Ee(t, e.size()[1]);
                var r = i(0, e.size()[0]), t = new n(r, t);
                return e.subset(t)
            }
        }), Pn = Ye("count", ["typed", "size", "prod"], function (e) {
            var t = e.typed, r = e.size, n = e.prod;
            return t("count", {
                string: function (e) {
                    return e.length
                }, "Matrix | Array": function (e) {
                    return n(r(e))
                }
            })
        }), jn = Ye("cross", ["typed", "matrix", "subtract", "multiply"], function (e) {
            var t = e.typed, r = e.matrix, a = e.subtract, o = e.multiply;
            return t("cross", {
                "Matrix, Matrix": function (e, t) {
                    return r(n(e.toArray(), t.toArray()))
                }, "Matrix, Array": function (e, t) {
                    return r(n(e.toArray(), t))
                }, "Array, Matrix": function (e, t) {
                    return r(n(e, t.toArray()))
                }, "Array, Array": n
            });

            function n(e, t) {
                var r = Math.max(Me(e).length, Me(t).length);
                e = Te(e), t = Te(t);
                var n = Me(e), i = Me(t);
                if (1 !== n.length || 1 !== i.length || 3 !== n[0] || 3 !== i[0]) throw new RangeError("Vectors with length 3 expected (Size A = [" + n.join(", ") + "], B = [" + i.join(", ") + "])");
                t = [a(o(e[1], t[2]), o(e[2], t[1])), a(o(e[2], t[0]), o(e[0], t[2])), a(o(e[0], t[1]), o(e[1], t[0]))];
                return 1 < r ? [t] : t
            }
        }), Un = Ye("diag", ["typed", "matrix", "DenseMatrix", "SparseMatrix"], function (e) {
            var t = e.typed, f = e.matrix, o = e.DenseMatrix, s = e.SparseMatrix;
            return t("diag", {
                Array: function (e) {
                    return n(e, 0, Me(e), null)
                }, "Array, number": function (e, t) {
                    return n(e, t, Me(e), null)
                }, "Array, BigNumber": function (e, t) {
                    return n(e, t.toNumber(), Me(e), null)
                }, "Array, string": function (e, t) {
                    return n(e, 0, Me(e), t)
                }, "Array, number, string": function (e, t, r) {
                    return n(e, t, Me(e), r)
                }, "Array, BigNumber, string": function (e, t, r) {
                    return n(e, t.toNumber(), Me(e), r)
                }, Matrix: function (e) {
                    return n(e, 0, e.size(), e.storage())
                }, "Matrix, number": function (e, t) {
                    return n(e, t, e.size(), e.storage())
                }, "Matrix, BigNumber": function (e, t) {
                    return n(e, t.toNumber(), e.size(), e.storage())
                }, "Matrix, string": function (e, t) {
                    return n(e, 0, e.size(), t)
                }, "Matrix, number, string": function (e, t, r) {
                    return n(e, t, e.size(), r)
                }, "Matrix, BigNumber, string": function (e, t, r) {
                    return n(e, t.toNumber(), e.size(), r)
                }
            });

            function n(e, c, t, r) {
                if (!L(c)) throw new TypeError("Second parameter in function diag must be an integer");
                var i = 0 < c ? c : 0, a = c < 0 ? -c : 0;
                switch (t.length) {
                    case 1:
                        return function (e, t, r, n) {
                            n = [n + a, n + i];
                            if (r && "sparse" !== r && "dense" !== r) throw new TypeError("Unknown matrix type ".concat(r, '"'));
                            t = ("sparse" === r ? s : o).diagonal(n, e, t);
                            return null !== r ? t : t.valueOf()
                        }(e, c, r, t[0]);
                    case 2:
                        return function (e, t, r, n, i) {
                            if (E(e)) {
                                var a = e.diagonal(c);
                                return null !== t ? t !== a.storage() ? f(a, t) : a : a.valueOf()
                            }
                            for (var o = Math.min(r[0] - n, r[1] - i), s = [], u = 0; u < o; u++) s[u] = e[u + n][u + i];
                            return null !== t ? f(s) : s
                        }(e, r, t, a, i)
                }
                throw new RangeError("Matrix for function diag must be 2 dimensional")
            }
        });

        function Fn(n) {
            function i(e) {
                var t = u[e];
                if (t && (delete s[t], delete u[e], --a, o === t)) {
                    if (!a) return c = 0, void (o = 1);
                    for (; !hasOwnProperty.call(s, ++o);) ;
                }
            }

            var a = 0, o = 1, s = Object.create(null), u = Object.create(null), c = 0;
            return n = Math.abs(n), {
                hit: function (e) {
                    var t = u[e], r = ++c;
                    if (s[r] = e, u[e] = r, !t) return ++a <= n ? void 0 : (e = s[o], i(e), e);
                    if (delete s[t], o === t) for (; !hasOwnProperty.call(s, ++o);) ;
                }, delete: i, clear: function () {
                    a = c = 0, o = 1, s = Object.create(null), u = Object.create(null)
                }
            }
        }

        function Ln(e) {
            return (Ln = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function Hn(a, e) {
            var e = 1 < arguments.length && void 0 !== e ? e : {}, o = e.hasher,
                s = null == (s = e.limit) ? Number.POSITIVE_INFINITY : s, o = null == o ? JSON.stringify : o;
            return function e() {
                "object" !== Ln(e.cache) && (e.cache = {values: new Map, lru: Fn(s || Number.POSITIVE_INFINITY)});
                for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
                var n = o(t);
                if (e.cache.values.has(n)) return e.cache.lru.hit(n), e.cache.values.get(n);
                var i = a.apply(a, t);
                return e.cache.values.set(n, i), e.cache.values.delete(e.cache.lru.hit(n)), i
            }
        }

        function $n(e) {
            return Object.keys(e.signatures || {}).reduce(function (e, t) {
                t = (t.match(/,/g) || []).length + 1;
                return Math.max(e, t)
            }, -1)
        }

        var Gn = Ye("filter", ["typed"], function (e) {
            return (0, e.typed)("filter", {
                "Array, function": Vn, "Matrix, function": function (e, t) {
                    return e.create(Vn(e.toArray(), t))
                }, "Array, RegExp": De, "Matrix, RegExp": function (e, t) {
                    return e.create(De(e.toArray(), t))
                }
            })
        });

        function Vn(e, n) {
            var i = $n(n);
            return ke(e, function (e, t, r) {
                return 1 === i ? n(e) : 2 === i ? n(e, [t]) : n(e, [t], r)
            })
        }

        var Zn = Ye("flatten", ["typed", "matrix"], function (e) {
            var t = e.typed, r = e.matrix;
            return t("flatten", {
                Array: function (e) {
                    return qe(He(e))
                }, Matrix: function (e) {
                    e = qe(He(e.toArray()));
                    return r(e)
                }
            })
        }), Wn = Ye("forEach", ["typed"], function (e) {
            return (0, e.typed)("forEach", {
                "Array, function": Jn, "Matrix, function": function (e, t) {
                    return e.forEach(t)
                }
            })
        });

        function Jn(t, i) {
            var a = $n(i);
            !function r(e, n) {
                Array.isArray(e) ? Be(e, function (e, t) {
                    r(e, n.concat(t))
                }) : 1 === a ? i(e) : 2 === a ? i(e, n) : i(e, n, t)
            }(t, [])
        }

        var Yn = Ye("getMatrixDataType", ["typed"], function (e) {
                return (0, e.typed)("getMatrixDataType", {
                    Array: function (e) {
                        return Ue(e, J)
                    }, Matrix: function (e) {
                        return e.getDataType()
                    }
                })
            }),
            Xn = Ye("identity", ["typed", "config", "matrix", "BigNumber", "DenseMatrix", "SparseMatrix"], function (e) {
                var t = e.typed, r = e.config, n = e.matrix, c = e.BigNumber, f = e.DenseMatrix, l = e.SparseMatrix;
                return t("identity", {
                    "": function () {
                        return "Matrix" === r.matrix ? n([]) : []
                    }, string: function (e) {
                        return n(e)
                    }, "number | BigNumber": function (e) {
                        return a(e, e, "Matrix" === r.matrix ? "dense" : void 0)
                    }, "number | BigNumber, string": function (e, t) {
                        return a(e, e, t)
                    }, "number | BigNumber, number | BigNumber": function (e, t) {
                        return a(e, t, "Matrix" === r.matrix ? "dense" : void 0)
                    }, "number | BigNumber, number | BigNumber, string": a, Array: function (e) {
                        return i(e)
                    }, "Array, string": i, Matrix: function (e) {
                        return i(e.valueOf(), e.storage())
                    }, "Matrix, string": function (e, t) {
                        return i(e.valueOf(), t)
                    }
                });

                function i(e, t) {
                    switch (e.length) {
                        case 0:
                            return t ? n(t) : [];
                        case 1:
                            return a(e[0], e[0], t);
                        case 2:
                            return a(e[0], e[1], t);
                        default:
                            throw new Error("Vector containing two values expected")
                    }
                }

                function a(e, t, r) {
                    var n = I(e) || I(t) ? c : null;
                    if (I(e) && (e = e.toNumber()), I(t) && (t = t.toNumber()), !L(e) || e < 1) throw new Error("Parameters in function identity must be positive integers");
                    if (!L(t) || t < 1) throw new Error("Parameters in function identity must be positive integers");
                    var i = n ? new c(1) : 1, a = n ? new n(0) : 0, n = [e, t];
                    if (r) {
                        if ("sparse" === r) return l.diagonal(n, i, 0, a);
                        if ("dense" === r) return f.diagonal(n, i, 0, a);
                        throw new TypeError('Unknown matrix type "'.concat(r, '"'))
                    }
                    for (var o = Ae([], n, a), s = e < t ? e : t, u = 0; u < s; u++) o[u][u] = i;
                    return o
                }
            }), Qn = Ye("kron", ["typed", "matrix", "multiplyScalar"], function (e) {
                var t = e.typed, r = e.matrix, a = e.multiplyScalar;
                return t("kron", {
                    "Matrix, Matrix": function (e, t) {
                        return r(n(e.toArray(), t.toArray()))
                    }, "Matrix, Array": function (e, t) {
                        return r(n(e.toArray(), t))
                    }, "Array, Matrix": function (e, t) {
                        return r(n(e, t.toArray()))
                    }, "Array, Array": n
                });

                function n(e, r) {
                    if (1 === Me(e).length && (e = [e]), 1 === Me(r).length && (r = [r]), 2 < Me(e).length || 2 < Me(r).length) throw new RangeError("Vectors with dimensions greater then 2 are not supported expected (Size x = " + JSON.stringify(e.length) + ", y = " + JSON.stringify(r.length) + ")");
                    var n = [], i = [];
                    return e.map(function (t) {
                        return r.map(function (e) {
                            return i = [], n.push(i), t.map(function (t) {
                                return e.map(function (e) {
                                    return i.push(a(t, e))
                                })
                            })
                        })
                    }) && n
                }
            }), Kn = Ye("map", ["typed"], function (e) {
                return (0, e.typed)("map", {
                    "Array, function": ei, "Matrix, function": function (e, t) {
                        return e.map(t)
                    }
                })
            });

        function ei(t, i) {
            var a = $n(i);
            return function r(e, n) {
                return Array.isArray(e) ? e.map(function (e, t) {
                    return r(e, n.concat(t))
                }) : 1 === a ? i(e) : 2 === a ? i(e, n) : i(e, n, t)
            }(t, [])
        }

        var ti = Ye("diff", ["typed", "matrix", "subtract", "number"], function (e) {
            var t = e.typed, r = e.matrix, i = e.subtract, n = e.number;
            return t("diff", {
                "Array | Matrix": function (e) {
                    return E(e) ? r(o(e.toArray())) : o(e)
                }, "Array | Matrix, number": function (e, t) {
                    if (!L(t)) throw new RangeError("Dimension must be a whole number");
                    return E(e) ? r(a(e.toArray(), t)) : a(e, t)
                }, "Array | Matrix, BigNumber": function (e, t) {
                    return this(e, n(t))
                }
            });

            function a(e, t) {
                if (E(e) && (e = e.toArray()), !Array.isArray(e)) throw RangeError("Array/Matrix does not have that many dimensions");
                if (0 < t) {
                    var r = [];
                    return e.forEach(function (e) {
                        r.push(a(e, t - 1))
                    }), r
                }
                if (0 === t) return o(e);
                throw RangeError("Cannot have negative dimension")
            }

            function o(e) {
                var t = [], r = e.length;
                if (r < 2) return e;
                for (var n = 1; n < r; n++) t.push(function a(e, t) {
                    E(e) && (e = e.toArray()), E(t) && (t = t.toArray());
                    var r = Array.isArray(e), n = Array.isArray(t);
                    if (r && n) return function (e, t) {
                        if (e.length !== t.length) throw RangeError("Not all sub-arrays have the same length");
                        for (var r = [], n = e.length, i = 0; i < n; i++) r.push(a(e[i], t[i]));
                        return r
                    }(e, t);
                    if (!r && !n) return i(t, e);
                    throw TypeError("Cannot calculate difference between 1 array and 1 non-array")
                }(e[n - 1], e[n]));
                return t
            }
        }), ri = Ye("ones", ["typed", "config", "matrix", "BigNumber"], function (e) {
            var t = e.typed, r = e.config, a = e.matrix, o = e.BigNumber;
            return t("ones", {
                "": function () {
                    return "Array" === r.matrix ? n([]) : n([], "default")
                }, "...number | BigNumber | string": function (e) {
                    if ("string" != typeof e[e.length - 1]) return "Array" === r.matrix ? n(e) : n(e, "default");
                    var t = e.pop();
                    return n(e, t)
                }, Array: n, Matrix: function (e) {
                    var t = e.storage();
                    return n(e.valueOf(), t)
                }, "Array | Matrix, string": function (e, t) {
                    return n(e.valueOf(), t)
                }
            });

            function n(e, t) {
                var n, r = (n = !1, e.forEach(function (e, t, r) {
                    I(e) && (n = !0, r[t] = e.toNumber())
                }), n ? new o(1) : 1);
                if (e.forEach(function (e) {
                    if ("number" != typeof e || !L(e) || e < 0) throw new Error("Parameters in function ones must be positive integers")
                }), t) {
                    var i = a(t);
                    return 0 < e.length ? i.resize(e, r) : i
                }
                i = [];
                return 0 < e.length ? Ae(i, e, r) : i
            }
        });

        function ni() {
            throw new Error('No "bignumber" implementation available')
        }

        function ii() {
            throw new Error('No "fraction" implementation available')
        }

        function ai() {
            throw new Error('No "matrix" implementation available')
        }

        var oi = Ye("range", ["typed", "config", "?matrix", "?bignumber", "smaller", "smallerEq", "larger", "largerEq"], function (e) {
            var t = e.typed, n = e.config, r = e.matrix, o = e.bignumber, s = e.smaller, u = e.smallerEq, c = e.larger,
                f = e.largerEq;
            return t("range", {
                string: a, "string, boolean": a, "number, number": function (e, t) {
                    return i(l(e, t, 1))
                }, "number, number, number": function (e, t, r) {
                    return i(l(e, t, r))
                }, "number, number, boolean": function (e, t, r) {
                    return i((r ? p : l)(e, t, 1))
                }, "number, number, number, boolean": function (e, t, r, n) {
                    return i((n ? p : l)(e, t, r))
                }, "BigNumber, BigNumber": function (e, t) {
                    return i(m(e, t, new e.constructor(1)))
                }, "BigNumber, BigNumber, BigNumber": function (e, t, r) {
                    return i(m(e, t, r))
                }, "BigNumber, BigNumber, boolean": function (e, t, r) {
                    var n = e.constructor;
                    return i((r ? h : m)(e, t, new n(1)))
                }, "BigNumber, BigNumber, BigNumber, boolean": function (e, t, r, n) {
                    return i((n ? h : m)(e, t, r))
                }
            });

            function i(e) {
                return "Matrix" === n.matrix ? r ? r(e) : ai() : e
            }

            function a(t, e) {
                var r = function () {
                    var e = t.split(":").map(function (e) {
                        return Number(e)
                    });
                    if (e.some(function (e) {
                        return isNaN(e)
                    })) return null;
                    switch (e.length) {
                        case 2:
                            return {start: e[0], end: e[1], step: 1};
                        case 3:
                            return {start: e[0], end: e[2], step: e[1]};
                        default:
                            return null
                    }
                }();
                if (!r) throw new SyntaxError('String "' + t + '" is no valid range');
                return "BigNumber" === n.number ? (void 0 === o && ni(), i((e ? h : m)(o(r.start), o(r.end), o(r.step)))) : i((e ? p : l)(r.start, r.end, r.step))
            }

            function l(e, t, r) {
                var n = [], i = e;
                if (0 < r) for (; s(i, t);) n.push(i), i += r; else if (r < 0) for (; c(i, t);) n.push(i), i += r;
                return n
            }

            function p(e, t, r) {
                var n = [], i = e;
                if (0 < r) for (; u(i, t);) n.push(i), i += r; else if (r < 0) for (; f(i, t);) n.push(i), i += r;
                return n
            }

            function m(e, t, r) {
                var n = o(0), i = [], a = e;
                if (r.gt(n)) for (; s(a, t);) i.push(a), a = a.plus(r); else if (r.lt(n)) for (; c(a, t);) i.push(a), a = a.plus(r);
                return i
            }

            function h(e, t, r) {
                var n = o(0), i = [], a = e;
                if (r.gt(n)) for (; u(a, t);) i.push(a), a = a.plus(r); else if (r.lt(n)) for (; f(a, t);) i.push(a), a = a.plus(r);
                return i
            }
        }), si = Ye("reshape", ["typed", "isInteger", "matrix"], function (e) {
            var t = e.typed, r = e.isInteger;
            return t("reshape", {
                "Matrix, Array": function (e, t) {
                    return e.reshape(t)
                }, "Array, Array": function (e, t) {
                    return t.forEach(function (e) {
                        if (!r(e)) throw new TypeError("Invalid size for dimension: " + e)
                    }), Oe(e, t)
                }
            })
        });

        function ui(e, t, r, n) {
            if (!(this instanceof ui)) throw new SyntaxError("Constructor must be called with the new operator");
            this.fn = e, this.count = t, this.min = r, this.max = n, this.message = "Wrong number of arguments in function " + e + " (" + t + " provided, " + r + (null != n ? "-" + n : "") + " expected)", this.stack = (new Error).stack
        }

        (ui.prototype = new Error).constructor = Error, ui.prototype.name = "ArgumentsError", ui.prototype.isArgumentsError = !0;
        var ci = Ye("resize", ["config", "matrix"], function (e) {
                var i = e.config, a = e.matrix;
                return function (e, t, r) {
                    if (2 !== arguments.length && 3 !== arguments.length) throw new ui("resize", arguments.length, 2, 3);
                    if (E(t) && (t = t.valueOf()), I(t[0]) && (t = t.map(function (e) {
                        return I(e) ? e.toNumber() : e
                    })), E(e)) return e.resize(t, r, !0);
                    if ("string" == typeof e) return function (e, t, r) {
                        if (void 0 !== r) {
                            if ("string" != typeof r || 1 !== r.length) throw new TypeError("Single character expected as defaultValue")
                        } else r = " ";
                        if (1 !== t.length) throw new we(t.length, 1);
                        var n = t[0];
                        if ("number" != typeof n || !L(n)) throw new TypeError("Invalid size, must contain positive integers (size: " + ge(t) + ")");
                        if (e.length > n) return e.substring(0, n);
                        if (e.length < n) {
                            for (var i = e, a = 0, o = n - e.length; a < o; a++) i += r;
                            return i
                        }
                        return e
                    }(e, t, r);
                    var n = !Array.isArray(e) && "Array" !== i.matrix;
                    if (0 === t.length) {
                        for (; Array.isArray(e);) e = e[0];
                        return He(e)
                    }
                    Array.isArray(e) || (e = [e]);
                    r = Ae(e = He(e), t, r);
                    return n ? a(r) : r
                }
            }), fi = Ye("rotate", ["typed", "multiply", "rotationMatrix"], function (e) {
                var t = e.typed, n = e.multiply, i = e.rotationMatrix;
                return t("rotate", {
                    "Array , number | BigNumber | Complex | Unit": function (e, t) {
                        return a(e, 2), n(i(t), e).toArray()
                    }, "Matrix , number | BigNumber | Complex | Unit": function (e, t) {
                        return a(e, 2), n(i(t), e)
                    }, "Array, number | BigNumber | Complex | Unit, Array | Matrix": function (e, t, r) {
                        return a(e, 3), n(i(t, r), e)
                    }, "Matrix, number | BigNumber | Complex | Unit, Array | Matrix": function (e, t, r) {
                        return a(e, 3), n(i(t, r), e)
                    }
                });

                function a(e, t) {
                    e = Array.isArray(e) ? Me(e) : e.size();
                    if (2 < e.length) throw new RangeError("Vector must be of dimensions 1x".concat(t));
                    if (2 === e.length && 1 !== e[1]) throw new RangeError("Vector must be of dimensions 1x".concat(t));
                    if (e[0] !== t) throw new RangeError("Vector must be of dimensions 1x".concat(t))
                }
            }),
            li = Ye("rotationMatrix", ["typed", "config", "multiplyScalar", "addScalar", "unaryMinus", "norm", "matrix", "BigNumber", "DenseMatrix", "SparseMatrix", "cos", "sin"], function (e) {
                var t = e.typed, n = e.config, i = e.multiplyScalar, c = e.addScalar, f = e.unaryMinus, l = e.norm,
                    p = e.BigNumber, a = e.matrix, r = e.DenseMatrix, o = e.SparseMatrix, m = e.cos, h = e.sin;
                return t("rotationMatrix", {
                    "": function () {
                        return "Matrix" === n.matrix ? a([]) : []
                    },
                    string: function (e) {
                        return a(e)
                    },
                    "number | BigNumber | Complex | Unit": function (e) {
                        return s(e, "Matrix" === n.matrix ? "dense" : void 0)
                    },
                    "number | BigNumber | Complex | Unit, string": s,
                    "number | BigNumber | Complex | Unit, Array": function (e, t) {
                        t = a(t);
                        return u(t), g(e, t, void 0)
                    },
                    "number | BigNumber | Complex | Unit, Matrix": function (e, t) {
                        u(t);
                        var r = t.storage() || ("Matrix" === n.matrix ? "dense" : void 0);
                        return g(e, t, r)
                    },
                    "number | BigNumber | Complex | Unit, Array, string": function (e, t, r) {
                        t = a(t);
                        return u(t), g(e, t, r)
                    },
                    "number | BigNumber | Complex | Unit, Matrix, string": function (e, t, r) {
                        return u(t), g(e, t, r)
                    }
                });

                function s(e, t) {
                    var r = I(e) ? new p(-1) : -1, n = m(e), e = h(e);
                    return y([[n, i(r, e)], [e, n]], t)
                }

                function u(e) {
                    e = e.size();
                    if (e.length < 1 || 3 !== e[0]) throw new RangeError("Vector must be of dimensions 1x3")
                }

                function d(e) {
                    return e.reduce(function (e, t) {
                        return i(e, t)
                    })
                }

                function y(e, t) {
                    if (t) {
                        if ("sparse" === t) return new o(e);
                        if ("dense" === t) return new r(e);
                        throw new TypeError('Unknown matrix type "'.concat(t, '"'))
                    }
                    return e
                }

                function g(e, t, r) {
                    var n = l(t);
                    if (0 === n) throw new RangeError("Rotation around zero vector");
                    var i = I(e) ? p : null, a = i ? new i(1) : 1, o = i ? new i(-1) : -1,
                        s = i ? new i(t.get([0]) / n) : t.get([0]) / n, u = i ? new i(t.get([1]) / n) : t.get([1]) / n,
                        t = i ? new i(t.get([2]) / n) : t.get([2]) / n, n = m(e), a = c(a, f(n)), e = h(e);
                    return y([[c(n, d([s, s, a])), c(d([s, u, a]), d([o, t, e])), c(d([s, t, a]), d([u, e]))], [c(d([s, u, a]), d([t, e])), c(n, d([u, u, a])), c(d([u, t, a]), d([o, s, e]))], [c(d([s, t, a]), d([o, u, e])), c(d([u, t, a]), d([s, e])), c(n, d([t, t, a]))]], r)
                }
            }), pi = Ye("row", ["typed", "Index", "matrix", "range"], function (e) {
                var t = e.typed, n = e.Index, r = e.matrix, i = e.range;
                return t("row", {
                    "Matrix, number": a, "Array, number": function (e, t) {
                        return a(r(He(e)), t).valueOf()
                    }
                });

                function a(e, t) {
                    if (2 !== e.size().length) throw new Error("Only two dimensional matrix is supported");
                    Ee(t, e.size()[0]);
                    var r = i(0, e.size()[1]), r = new n(t, r);
                    return e.subset(r)
                }
            }), mi = Ye("size", ["typed", "config", "?matrix"], function (e) {
                var t = e.typed, r = e.config, n = e.matrix;
                return t("size", {
                    Matrix: function (e) {
                        return e.create(e.size())
                    }, Array: Me, string: function (e) {
                        return "Array" === r.matrix ? [e.length] : n([e.length])
                    }, "number | Complex | BigNumber | Unit | boolean | null": function (e) {
                        return "Array" === r.matrix ? [] : n ? n([]) : ai()
                    }
                })
            }), hi = Ye("squeeze", ["typed", "matrix"], function (e) {
                var t = e.typed, r = e.matrix;
                return t("squeeze", {
                    Array: function (e) {
                        return Te(He(e))
                    }, Matrix: function (e) {
                        e = Te(e.toArray());
                        return Array.isArray(e) ? r(e) : e
                    }, any: He
                })
            });

        function di(e) {
            return (di = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function yi(e, t) {
            if (bi(e) && vi(e, t)) return e[t];
            if ("function" == typeof e[t] && xi(e, t)) throw new Error('Cannot access method "' + t + '" as a property');
            throw new Error('No access to property "' + t + '"')
        }

        function gi(e, t, r) {
            if (bi(e) && vi(e, t)) return e[t] = r;
            throw new Error('No access to property "' + t + '"')
        }

        function vi(e, t) {
            return e && "object" === di(e) && (We(wi, t) || !(t in Object.prototype) && !(t in Function.prototype))
        }

        function xi(e, t) {
            return null != e && "function" == typeof e[t] && !(We(e, t) && Object.getPrototypeOf && t in Object.getPrototypeOf(e)) && (We(Ni, t) || !(t in Object.prototype) && !(t in Function.prototype))
        }

        function bi(e) {
            return "object" === di(e) && e && e.constructor === Object
        }

        var wi = {length: !0, name: !0}, Ni = {toString: !0, valueOf: !0, toLocaleString: !0},
            Mi = Ye("subset", ["typed", "matrix"], function (e) {
                var t = e.typed, i = e.matrix;
                return t("subset", {
                    "Array, Index": function (e, t) {
                        e = i(e).subset(t);
                        return t.isScalar() ? e : e.valueOf()
                    }, "Matrix, Index": function (e, t) {
                        return e.subset(t)
                    }, "Object, Index": Ai, "string, Index": Si, "Array, Index, any": function (e, t, r) {
                        return i(He(e)).subset(t, r, void 0).valueOf()
                    }, "Array, Index, any, any": function (e, t, r, n) {
                        return i(He(e)).subset(t, r, n).valueOf()
                    }, "Matrix, Index, any": function (e, t, r) {
                        return e.clone().subset(t, r)
                    }, "Matrix, Index, any, any": function (e, t, r, n) {
                        return e.clone().subset(t, r, n)
                    }, "string, Index, string": Ei, "string, Index, string, string": Ei, "Object, Index, any": Oi
                })
            });

        function Si(t, e) {
            if (!A(e)) throw new TypeError("Index expected");
            if (1 !== e.size().length) throw new we(e.size().length, 1);
            var r = t.length;
            Ee(e.min()[0], r), Ee(e.max()[0], r);
            var e = e.dimension(0), n = "";
            return e.forEach(function (e) {
                n += t.charAt(e)
            }), n
        }

        function Ei(e, t, r, n) {
            if (!t || !0 !== t.isIndex) throw new TypeError("Index expected");
            if (1 !== t.size().length) throw new we(t.size().length, 1);
            if (void 0 !== n) {
                if ("string" != typeof n || 1 !== n.length) throw new TypeError("Single character expected as defaultValue")
            } else n = " ";
            var i = t.dimension(0);
            if (i.size()[0] !== r.length) throw new we(i.size()[0], r.length);
            var a = e.length;
            Ee(t.min()[0]), Ee(t.max()[0]);
            for (var o = [], s = 0; s < a; s++) o[s] = e.charAt(s);
            if (i.forEach(function (e, t) {
                o[e] = r.charAt(t[0])
            }), o.length > a) for (var u = a - 1, c = o.length; u < c; u++) o[u] || (o[u] = n);
            return o.join("")
        }

        function Ai(e, t) {
            if (1 !== t.size().length) throw new we(t.size(), 1);
            t = t.dimension(0);
            if ("string" != typeof t) throw new TypeError("String expected as index to retrieve an object property");
            return yi(e, t)
        }

        function Oi(e, t, r) {
            if (1 !== t.size().length) throw new we(t.size(), 1);
            t = t.dimension(0);
            if ("string" != typeof t) throw new TypeError("String expected as index to retrieve an object property");
            e = He(e);
            return gi(e, t, r), e
        }

        var Ci = Ye("transpose", ["typed", "matrix"], function (e) {
                var t = e.typed, r = e.matrix;
                return t("transpose", {
                    Array: function (e) {
                        return this(r(e)).valueOf()
                    }, Matrix: function (e) {
                        var t, r = e.size();
                        switch (r.length) {
                            case 1:
                                t = e.clone();
                                break;
                            case 2:
                                var n = r[0], i = r[1];
                                if (0 === i) throw new RangeError("Cannot transpose a 2D matrix with no columns (size: " + ge(r) + ")");
                                switch (e.storage()) {
                                    case"dense":
                                        t = function (e, t, r) {
                                            for (var n, i = e._data, a = [], o = 0; o < r; o++) {
                                                n = a[o] = [];
                                                for (var s = 0; s < t; s++) n[s] = He(i[s][o])
                                            }
                                            return e.createDenseMatrix({data: a, size: [r, t], datatype: e._datatype})
                                        }(e, n, i);
                                        break;
                                    case"sparse":
                                        t = function (e, t, r) {
                                            for (var n, i, a, o = e._values, s = e._index, u = e._ptr, c = o ? [] : void 0, f = [], l = [], p = [], m = 0; m < t; m++) p[m] = 0;
                                            for (n = 0, i = s.length; n < i; n++) p[s[n]]++;
                                            for (var h = 0, d = 0; d < t; d++) l.push(h), h += p[d], p[d] = l[d];
                                            for (l.push(h), a = 0; a < r; a++) for (var y = u[a], g = u[a + 1], v = y; v < g; v++) {
                                                var x = p[s[v]]++;
                                                f[x] = a, o && (c[x] = He(o[v]))
                                            }
                                            return e.createSparseMatrix({
                                                values: c,
                                                index: f,
                                                ptr: l,
                                                size: [r, t],
                                                datatype: e._datatype
                                            })
                                        }(e, n, i)
                                }
                                break;
                            default:
                                throw new RangeError("Matrix must be a vector or two dimensional (size: " + ge(this._size) + ")")
                        }
                        return t
                    }, any: He
                })
            }), _i = Ye("ctranspose", ["typed", "transpose", "conj"], function (e) {
                var t = e.typed, r = e.transpose, n = e.conj;
                return t("ctranspose", {
                    any: function (e) {
                        return n(r(e))
                    }
                })
            }), Ti = Ye("zeros", ["typed", "config", "matrix", "BigNumber"], function (e) {
                var t = e.typed, r = e.config, a = e.matrix, o = e.BigNumber;
                return t("zeros", {
                    "": function () {
                        return "Array" === r.matrix ? n([]) : n([], "default")
                    }, "...number | BigNumber | string": function (e) {
                        if ("string" != typeof e[e.length - 1]) return "Array" === r.matrix ? n(e) : n(e, "default");
                        var t = e.pop();
                        return n(e, t)
                    }, Array: n, Matrix: function (e) {
                        var t = e.storage();
                        return n(e.valueOf(), t)
                    }, "Array | Matrix, string": function (e, t) {
                        return n(e.valueOf(), t)
                    }
                });

                function n(e, t) {
                    var n, r = (n = !1, e.forEach(function (e, t, r) {
                        I(e) && (n = !0, r[t] = e.toNumber())
                    }), n ? new o(0) : 0);
                    if (e.forEach(function (e) {
                        if ("number" != typeof e || !L(e) || e < 0) throw new Error("Parameters in function zeros must be positive integers")
                    }), t) {
                        var i = a(t);
                        return 0 < e.length ? i.resize(e, r) : i
                    }
                    i = [];
                    return 0 < e.length ? Ae(i, e, r) : i
                }
            }), zi = Ye("erf", ["typed"], function (e) {
                return (0, e.typed)("name", {
                    number: function (e) {
                        var t = Math.abs(e);
                        return Di <= t ? s(e) : t <= qi ? s(e) * function (e) {
                            for (var t = e * e, r = Bi[0][4] * t, n = t, i = 0; i < 3; i += 1) r = (r + Bi[0][i]) * t, n = (n + ki[0][i]) * t;
                            return e * (r + Bi[0][3]) / (n + ki[0][3])
                        }(t) : t <= 4 ? s(e) * (1 - function (e) {
                            for (var t = Bi[1][8] * e, r = e, n = 0; n < 7; n += 1) t = (t + Bi[1][n]) * e, r = (r + ki[1][n]) * e;
                            var i = (t + Bi[1][7]) / (r + ki[1][7]), a = parseInt(16 * e) / 16, o = (e - a) * (e + a);
                            return Math.exp(-a * a) * Math.exp(-o) * i
                        }(t)) : s(e) * (1 - function (e) {
                            for (var t = 1 / (e * e), r = Bi[2][5] * t, n = t, i = 0; i < 4; i += 1) r = (r + Bi[2][i]) * t, n = (n + ki[2][i]) * t;
                            var a = t * (r + Bi[2][4]) / (n + ki[2][4]), a = (Ii - a) / e,
                                e = (e - (t = parseInt(16 * e) / 16)) * (e + t);
                            return Math.exp(-t * t) * Math.exp(-e) * a
                        }(t))
                    }, "Array | Matrix": function (e) {
                        return xt(e, this)
                    }
                })
            }), qi = .46875, Ii = .5641895835477563,
            Bi = [[3.1611237438705655, 113.86415415105016, 377.485237685302, 3209.3775891384694, .18577770618460315], [.5641884969886701, 8.883149794388377, 66.11919063714163, 298.6351381974001, 881.952221241769, 1712.0476126340707, 2051.0783778260716, 1230.3393547979972, 2.1531153547440383e-8], [.30532663496123236, .36034489994980445, .12578172611122926, .016083785148742275, .0006587491615298378, .016315387137302097]],
            ki = [[23.601290952344122, 244.02463793444417, 1282.6165260773723, 2844.236833439171], [15.744926110709835, 117.6939508913125, 537.1811018620099, 1621.3895745666903, 3290.7992357334597, 4362.619090143247, 3439.3676741437216, 1230.3393548037495], [2.568520192289822, 1.8729528499234604, .5279051029514285, .06051834131244132, .0023352049762686918]],
            Di = Math.pow(2, 53), Ri = Ye("mode", ["typed", "isNaN", "isNumeric"], function (e) {
                var t = e.typed, o = e.isNaN, s = e.isNumeric;
                return t("mode", {"Array | Matrix": r, "...": r});

                function r(e) {
                    if (0 === (e = qe(e.valueOf())).length) throw new Error("Cannot calculate mode of an empty array");
                    for (var t = {}, r = [], n = 0, i = 0; i < e.length; i++) {
                        var a = e[i];
                        if (s(a) && o(a)) throw new Error("Cannot calculate mode of an array containing NaN values");
                        a in t || (t[a] = 0), t[a]++, t[a] === n ? r.push(a) : t[a] > n && (n = t[a], r = [a])
                    }
                    return r
                }
            });

        function Pi(e, t, r) {
            var n;
            return -1 !== String(e).indexOf("Unexpected type") ? (n = 2 < arguments.length ? " (type: " + J(r) + ", value: " + JSON.stringify(r) + ")" : " (type: " + e.data.actual + ")", new TypeError("Cannot calculate " + t + ", unexpected type of argument" + n)) : -1 !== String(e).indexOf("complex numbers") ? (n = 2 < arguments.length ? " (type: " + J(r) + ", value: " + JSON.stringify(r) + ")" : "", new TypeError("Cannot calculate " + t + ", no ordering relation is defined for complex numbers" + n)) : e
        }

        var ji = Ye("prod", ["typed", "config", "multiplyScalar", "numeric"], function (e) {
            var t = e.typed, n = e.config, i = e.multiplyScalar, a = e.numeric;
            return t("prod", {
                "Array | Matrix": r, "Array | Matrix, number | BigNumber": function (e, t) {
                    throw new Error("prod(A, dim) is not yet supported")
                }, "...": r
            });

            function r(e) {
                var r;
                if (vt(e, function (t) {
                    try {
                        r = void 0 === r ? t : i(r, t)
                    } catch (e) {
                        throw Pi(e, "prod", t)
                    }
                }), "string" == typeof r && (r = a(r, n.number)), void 0 === r) throw new Error("Cannot calculate prod of an empty array");
                return r
            }
        }), Ui = Ye("format", ["typed"], function (e) {
            return (0, e.typed)("format", {any: ge, "any, Object | function | number": ge})
        }), Fi = Ye("bin", ["typed", "format"], function (e) {
            var t = e.typed, r = e.format;
            return t("bin", {
                "number | BigNumber": function (e) {
                    return r(e, {notation: "bin"})
                }, "number | BigNumber, number": function (e, t) {
                    return r(e, {notation: "bin", wordSize: t})
                }
            })
        }), Li = Ye("oct", ["typed", "format"], function (e) {
            var t = e.typed, r = e.format;
            return t("oct", {
                "number | BigNumber": function (e) {
                    return r(e, {notation: "oct"})
                }, "number | BigNumber, number": function (e, t) {
                    return r(e, {notation: "oct", wordSize: t})
                }
            })
        }), Hi = Ye("hex", ["typed", "format"], function (e) {
            var t = e.typed, r = e.format;
            return t("hex", {
                "number | BigNumber": function (e) {
                    return r(e, {notation: "hex"})
                }, "number | BigNumber, number": function (e, t) {
                    return r(e, {notation: "hex", wordSize: t})
                }
            })
        }), $i = Ye("print", ["typed"], function (e) {
            return (0, e.typed)("print", {"string, Object | Array": Gi, "string, Object | Array, number | Object": Gi})
        });

        function Gi(e, a, o) {
            return e.replace(/\$([\w.]+)/g, function (e, t) {
                for (var r = t.split("."), n = a[r.shift()]; r.length && void 0 !== n;) var i = r.shift(), n = i ? n[i] : n + ".";
                return void 0 !== n ? S(n) ? n : ge(n, o) : e
            })
        }

        var Vi = Ye("to", ["typed", "matrix"], function (e) {
                var t = e.typed, r = e.matrix, n = Dr({typed: t}), i = Nr({typed: t});
                return t("to", {
                    "Unit, Unit | string": function (e, t) {
                        return e.to(t)
                    }, "Matrix, Matrix": function (e, t) {
                        return n(e, t, this)
                    }, "Array, Array": function (e, t) {
                        return this(r(e), r(t)).valueOf()
                    }, "Array, Matrix": function (e, t) {
                        return this(r(e), t)
                    }, "Matrix, Array": function (e, t) {
                        return this(e, r(t))
                    }, "Matrix, any": function (e, t) {
                        return i(e, t, this, !1)
                    }, "any, Matrix": function (e, t) {
                        return i(t, e, this, !0)
                    }, "Array, any": function (e, t) {
                        return i(r(e), t, this, !1).valueOf()
                    }, "any, Array": function (e, t) {
                        return i(r(t), e, this, !0).valueOf()
                    }
                })
            }), Zi = Ye("isPrime", ["typed"], function (e) {
                return (0, e.typed)("isPrime", {
                    number: function (e) {
                        if (0 * e != 0) return !1;
                        if (e <= 3) return 1 < e;
                        if (e % 2 == 0 || e % 3 == 0) return !1;
                        for (var t = 5; t * t <= e; t += 6) if (e % t == 0 || e % (t + 2) == 0) return !1;
                        return !0
                    }, BigNumber: function (t) {
                        if (0 * t.toNumber() != 0) return !1;
                        if (t.lte(3)) return t.gt(1);
                        if (t.mod(2).eq(0) || t.mod(3).eq(0)) return !1;
                        if (t.lt(Math.pow(2, 32))) {
                            for (var e = t.toNumber(), r = 5; r * r <= e; r += 6) if (e % r == 0 || e % (r + 2) == 0) return !1;
                            return !0
                        }
                        for (var n = 0, i = (t = new (t.constructor.clone({precision: 2 * t.toFixed(0).length}))(t)).sub(1); i.mod(2).eq(0);) i = i.div(2), n += 1;
                        var a = null;
                        if (t.lt("3317044064679887385961981")) a = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41].filter(function (e) {
                            return e < t
                        }); else for (var o = Math.min(t.toNumber() - 2, Math.floor(2 * Math.pow(t.toFixed(0).length * Math.log(10), 2))), a = [], s = 2; s <= o; s += 1) a.push(o);
                        for (var u = 0; u < a.length; u += 1) {
                            var c = a[u], c = function (e, t, r) {
                                for (var n = 1; !t.eq(0);) t.mod(2).eq(0) ? (t = t.div(2), e = e.mul(e).mod(r)) : (t = t.sub(1), n = e.mul(n).mod(r));
                                return n
                            }(t.sub(t).add(c), i, t);
                            if (!c.eq(1)) for (var f = 0, l = c; !l.eq(t.sub(1)); f += 1, l = l.mul(l).mod(t)) if (f === n - 1) return !1
                        }
                        return !0
                    }, "Array | Matrix": function (e) {
                        return xt(e, this)
                    }
                })
            }), Wi = Ye("numeric", ["number", "?bignumber", "?fraction"], function (e) {
                var t = e.number, r = e.bignumber, n = e.fraction,
                    i = {string: !0, number: !0, BigNumber: !0, Fraction: !0}, a = {
                        number: function (e) {
                            return t(e)
                        }, BigNumber: r ? function (e) {
                            return r(e)
                        } : ni, Fraction: n ? function (e) {
                            return n(e)
                        } : ii
                    };
                return function (e, t) {
                    var r = J(e);
                    if (!(r in i)) throw new TypeError("Cannot convert " + e + ' of type "' + r + '"; valid input types are ' + Object.keys(i).join(", "));
                    if (!(t in a)) throw new TypeError("Cannot convert " + e + ' to type "' + t + '"; valid output types are ' + Object.keys(a).join(", "));
                    return t === r ? e : a[t](e)
                }
            }), Ji = Ye("divideScalar", ["typed", "numeric"], function (e) {
                var t = e.typed, i = e.numeric;
                return t("divideScalar", {
                    "number, number": function (e, t) {
                        return e / t
                    }, "Complex, Complex": function (e, t) {
                        return e.div(t)
                    }, "BigNumber, BigNumber": function (e, t) {
                        return e.div(t)
                    }, "Fraction, Fraction": function (e, t) {
                        return e.div(t)
                    }, "Unit, number | Fraction | BigNumber": function (e, t) {
                        var r = e.clone(), e = i(1, J(t));
                        return r.value = this(null === r.value ? r._normalize(e) : r.value, t), r
                    }, "number | Fraction | BigNumber, Unit": function (e, t) {
                        var r = (r = t.clone()).pow(-1), n = i(1, J(e));
                        return r.value = this(e, null === t.value ? t._normalize(n) : t.value), r
                    }, "Unit, Unit": function (e, t) {
                        return e.divide(t)
                    }
                })
            }),
            Yi = Ye("pow", ["typed", "config", "identity", "multiply", "matrix", "fraction", "number", "Complex"], function (e) {
                var t = e.typed, i = e.config, a = e.identity, o = e.multiply, r = e.matrix, s = e.number,
                    u = e.fraction, c = e.Complex;
                return t("pow", {
                    "number, number": n, "Complex, Complex": function (e, t) {
                        return e.pow(t)
                    }, "BigNumber, BigNumber": function (e, t) {
                        return t.isInteger() || 0 <= e || i.predictable ? e.pow(t) : new c(e.toNumber(), 0).pow(t.toNumber(), 0)
                    }, "Fraction, Fraction": function (e, t) {
                        if (1 === t.d) return e.pow(t);
                        if (i.predictable) throw new Error("Function pow does not support non-integer exponents for fractions.");
                        return n(e.valueOf(), t.valueOf())
                    }, "Array, number": f, "Array, BigNumber": function (e, t) {
                        return f(e, t.toNumber())
                    }, "Matrix, number": l, "Matrix, BigNumber": function (e, t) {
                        return l(e, t.toNumber())
                    }, "Unit, number | BigNumber": function (e, t) {
                        return e.pow(t)
                    }
                });

                function n(e, t) {
                    if (i.predictable && !L(t) && e < 0) try {
                        var r = u(t), n = s(r);
                        if ((t === n || Math.abs((t - n) / t) < 1e-14) && r.d % 2 == 1) return (r.n % 2 == 0 ? 1 : -1) * Math.pow(-e, t)
                    } catch (e) {
                    }
                    return i.predictable && (e < -1 && t === 1 / 0 || -1 < e && e < 0 && t === -1 / 0) ? NaN : L(t) || 0 <= e || i.predictable ? pr(e, t) : e * e < 1 && t === 1 / 0 || 1 < e * e && t === -1 / 0 ? 0 : new c(e, 0).pow(t, 0)
                }

                function f(e, t) {
                    if (!L(t) || t < 0) throw new TypeError("For A^b, b must be a positive integer (value is " + t + ")");
                    var r = Me(e);
                    if (2 !== r.length) throw new Error("For A^b, A must be 2 dimensional (A has " + r.length + " dimensions)");
                    if (r[0] !== r[1]) throw new Error("For A^b, A must be square (size is " + r[0] + "x" + r[1] + ")");
                    for (var n = a(r[0]).valueOf(), i = e; 1 <= t;) 1 == (1 & t) && (n = o(i, n)), t >>= 1, i = o(i, i);
                    return n
                }

                function l(e, t) {
                    return r(f(e.valueOf(), t))
                }
            });

        function Xi(t, e) {
            var r, n = Object.keys(t);
            return Object.getOwnPropertySymbols && (r = Object.getOwnPropertySymbols(t), e && (r = r.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            })), n.push.apply(n, r)), n
        }

        function Qi(n) {
            for (var e = 1; e < arguments.length; e++) {
                var i = null != arguments[e] ? arguments[e] : {};
                e % 2 ? Xi(Object(i), !0).forEach(function (e) {
                    var t, r;
                    t = n, e = i[r = e], r in t ? Object.defineProperty(t, r, {
                        value: e,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : t[r] = e
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(i)) : Xi(Object(i)).forEach(function (e) {
                    Object.defineProperty(n, e, Object.getOwnPropertyDescriptor(i, e))
                })
            }
            return n
        }

        var Ki = "Number of decimals in function round must be an integer",
            ea = Ye("round", ["typed", "matrix", "equalScalar", "zeros", "BigNumber", "DenseMatrix"], function (e) {
                var t = e.typed, r = e.matrix, n = e.equalScalar, i = e.zeros, a = e.BigNumber, e = e.DenseMatrix,
                    o = wr({typed: t, equalScalar: n}), s = Gr({typed: t, DenseMatrix: e}), u = Nr({typed: t});
                return t("round", Qi(Qi({}, ta), {}, {
                    Complex: function (e) {
                        return e.round()
                    }, "Complex, number": function (e, t) {
                        if (t % 1) throw new TypeError(Ki);
                        return e.round(t)
                    }, "Complex, BigNumber": function (e, t) {
                        if (!t.isInteger()) throw new TypeError(Ki);
                        t = t.toNumber();
                        return e.round(t)
                    }, "number, BigNumber": function (e, t) {
                        if (!t.isInteger()) throw new TypeError(Ki);
                        return new a(e).toDecimalPlaces(t.toNumber())
                    }, BigNumber: function (e) {
                        return e.toDecimalPlaces(0)
                    }, "BigNumber, BigNumber": function (e, t) {
                        if (!t.isInteger()) throw new TypeError(Ki);
                        return e.toDecimalPlaces(t.toNumber())
                    }, Fraction: function (e) {
                        return e.round()
                    }, "Fraction, number": function (e, t) {
                        if (t % 1) throw new TypeError(Ki);
                        return e.round(t)
                    }, "Array | Matrix": function (e) {
                        return xt(e, this, !0)
                    }, "SparseMatrix, number | BigNumber": function (e, t) {
                        return o(e, t, this, !1)
                    }, "DenseMatrix, number | BigNumber": function (e, t) {
                        return u(e, t, this, !1)
                    }, "number | Complex | BigNumber, SparseMatrix": function (e, t) {
                        return n(e, 0) ? i(t.size(), t.storage()) : s(t, e, this, !0)
                    }, "number | Complex | BigNumber, DenseMatrix": function (e, t) {
                        return n(e, 0) ? i(t.size(), t.storage()) : u(t, e, this, !0)
                    }, "Array, number | BigNumber": function (e, t) {
                        return u(r(e), t, this, !1).valueOf()
                    }, "number | Complex | BigNumber, Array": function (e, t) {
                        return u(r(t), e, this, !0).valueOf()
                    }
                }))
            }), ta = {
                number: mr, "number, number": function (e, t) {
                    if (!L(t)) throw new TypeError(Ki);
                    if (t < 0 || 15 < t) throw new Error("Number of decimals in function round must be in te range of 0-15");
                    return mr(e, t)
                }
            }, ra = Ye("log", ["config", "typed", "divideScalar", "Complex"], function (e) {
                var t = e.typed, r = e.config, n = e.divideScalar, i = e.Complex;
                return t("log", {
                    number: function (e) {
                        return 0 <= e || r.predictable ? ir(e) : new i(e, 0).log()
                    }, Complex: function (e) {
                        return e.log()
                    }, BigNumber: function (e) {
                        return !e.isNegative() || r.predictable ? e.ln() : new i(e.toNumber(), 0).log()
                    }, "Array | Matrix": function (e) {
                        return xt(e, this)
                    }, "any, any": function (e, t) {
                        return n(this(e), this(t))
                    }
                })
            }), na = Ye("log1p", ["typed", "config", "divideScalar", "log", "Complex"], function (e) {
                var t = e.typed, r = e.config, n = e.divideScalar, i = e.log, a = e.Complex;
                return t("log1p", {
                    number: function (e) {
                        return -1 <= e || r.predictable ? f(e) : o(new a(e, 0))
                    }, Complex: o, BigNumber: function (e) {
                        var t = e.plus(1);
                        return !t.isNegative() || r.predictable ? t.ln() : o(new a(e.toNumber(), 0))
                    }, "Array | Matrix": function (e) {
                        return xt(e, this)
                    }, "any, any": function (e, t) {
                        return n(this(e), i(t))
                    }
                });

                function o(e) {
                    var t = e.re + 1;
                    return new a(Math.log(Math.sqrt(t * t + e.im * e.im)), Math.atan2(e.im, t))
                }
            }), ia = Ye("nthRoots", ["config", "typed", "divideScalar", "Complex"], function (e) {
                var t = e.typed, c = (e.config, e.divideScalar, e.Complex), f = [function (e) {
                    return new c(e, 0)
                }, function (e) {
                    return new c(0, e)
                }, function (e) {
                    return new c(-e, 0)
                }, function (e) {
                    return new c(0, -e)
                }];

                function r(e, t) {
                    if (t < 0) throw new Error("Root must be greater than zero");
                    if (0 === t) throw new Error("Root must be non-zero");
                    if (t % 1 != 0) throw new Error("Root must be an integer");
                    if (0 === e || 0 === e.abs()) return [new c(0, 0)];
                    var r, n = "number" == typeof e;
                    !n && 0 !== e.re && 0 !== e.im || (r = n ? 2 * (e < 0) : 0 === e.im ? 2 * (e.re < 0) : 2 * (e.im < 0) + 1);
                    for (var i = e.arg(), e = e.abs(), a = [], o = Math.pow(e, 1 / t), s = 0; s < t; s++) {
                        var u = (r + 4 * s) / t;
                        u !== Math.round(u) ? a.push(new c({r: o, phi: (i + 2 * Math.PI * s) / t})) : a.push(f[u % 4](o))
                    }
                    return a
                }

                return t("nthRoots", {
                    Complex: function (e) {
                        return r(e, 2)
                    }, "Complex, number": r
                })
            }), aa = Ye("dotPow", ["typed", "equalScalar", "matrix", "pow", "DenseMatrix"], function (e) {
                var t = e.typed, r = e.equalScalar, n = e.matrix, i = e.pow, e = e.DenseMatrix, a = Hr({typed: t}),
                    o = Mn({typed: t, DenseMatrix: e}), s = wr({typed: t, equalScalar: r}),
                    u = Gr({typed: t, DenseMatrix: e}), c = Dr({typed: t}), f = Nr({typed: t});
                return t("dotPow", {
                    "any, any": i, "SparseMatrix, SparseMatrix": function (e, t) {
                        return o(e, t, i, !1)
                    }, "SparseMatrix, DenseMatrix": function (e, t) {
                        return a(t, e, i, !0)
                    }, "DenseMatrix, SparseMatrix": function (e, t) {
                        return a(e, t, i, !1)
                    }, "DenseMatrix, DenseMatrix": function (e, t) {
                        return c(e, t, i)
                    }, "Array, Array": function (e, t) {
                        return this(n(e), n(t)).valueOf()
                    }, "Array, Matrix": function (e, t) {
                        return this(n(e), t)
                    }, "Matrix, Array": function (e, t) {
                        return this(e, n(t))
                    }, "SparseMatrix, any": function (e, t) {
                        return s(e, t, this, !1)
                    }, "DenseMatrix, any": function (e, t) {
                        return f(e, t, this, !1)
                    }, "any, SparseMatrix": function (e, t) {
                        return u(t, e, this, !0)
                    }, "any, DenseMatrix": function (e, t) {
                        return f(t, e, this, !0)
                    }, "Array, any": function (e, t) {
                        return f(n(e), t, this, !1).valueOf()
                    }, "any, Array": function (e, t) {
                        return f(n(t), e, this, !0).valueOf()
                    }
                })
            }), oa = Ye("dotDivide", ["typed", "matrix", "equalScalar", "divideScalar", "DenseMatrix"], function (e) {
                var t = e.typed, r = e.matrix, n = e.equalScalar, i = e.divideScalar, e = e.DenseMatrix,
                    a = Pr({typed: t, equalScalar: n}), o = Hr({typed: t}), s = Mn({typed: t, DenseMatrix: e}),
                    u = wr({typed: t, equalScalar: n}), c = Gr({typed: t, DenseMatrix: e}), f = Dr({typed: t}),
                    l = Nr({typed: t});
                return t("dotDivide", {
                    "any, any": i, "SparseMatrix, SparseMatrix": function (e, t) {
                        return s(e, t, i, !1)
                    }, "SparseMatrix, DenseMatrix": function (e, t) {
                        return a(t, e, i, !0)
                    }, "DenseMatrix, SparseMatrix": function (e, t) {
                        return o(e, t, i, !1)
                    }, "DenseMatrix, DenseMatrix": function (e, t) {
                        return f(e, t, i)
                    }, "Array, Array": function (e, t) {
                        return this(r(e), r(t)).valueOf()
                    }, "Array, Matrix": function (e, t) {
                        return this(r(e), t)
                    }, "Matrix, Array": function (e, t) {
                        return this(e, r(t))
                    }, "SparseMatrix, any": function (e, t) {
                        return u(e, t, i, !1)
                    }, "DenseMatrix, any": function (e, t) {
                        return l(e, t, i, !1)
                    }, "any, SparseMatrix": function (e, t) {
                        return c(t, e, i, !0)
                    }, "any, DenseMatrix": function (e, t) {
                        return l(t, e, i, !0)
                    }, "Array, any": function (e, t) {
                        return l(r(e), t, i, !1).valueOf()
                    }, "any, Array": function (e, t) {
                        return l(r(t), e, i, !0).valueOf()
                    }
                })
            });

        function sa(e) {
            var y = e.DenseMatrix;
            return function (e, t, r) {
                e = e.size();
                if (2 !== e.length) throw new RangeError("Matrix must be two dimensional (size: " + ge(e) + ")");
                var n = e[0];
                if (n !== e[1]) throw new RangeError("Matrix must be square (size: " + ge(e) + ")");
                var i = [];
                if (E(t)) {
                    var e = t.size(), a = t._data;
                    if (1 === e.length) {
                        if (e[0] !== n) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
                        for (var o = 0; o < n; o++) i[o] = [a[o]];
                        return new y({data: i, size: [n, 1], datatype: t._datatype})
                    }
                    if (2 === e.length) {
                        if (e[0] !== n || 1 !== e[1]) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
                        if (g(t)) {
                            if (r) {
                                i = [];
                                for (var s = 0; s < n; s++) i[s] = [a[s][0]];
                                return new y({data: i, size: [n, 1], datatype: t._datatype})
                            }
                            return t
                        }
                        if (b(t)) {
                            for (var u = 0; u < n; u++) i[u] = [0];
                            for (var c = t._values, f = t._index, l = t._ptr, p = l[1], m = l[0]; m < p; m++) i[f[m]][0] = c[m];
                            return new y({data: i, size: [n, 1], datatype: t._datatype})
                        }
                    }
                    throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.")
                }
                if (x(t)) {
                    l = Me(t);
                    if (1 === l.length) {
                        if (l[0] !== n) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
                        for (var h = 0; h < n; h++) i[h] = [t[h]];
                        return new y({data: i, size: [n, 1]})
                    }
                    if (2 !== l.length) throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
                    if (l[0] !== n || 1 !== l[1]) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
                    for (var d = 0; d < n; d++) i[d] = [t[d][0]];
                    return new y({data: i, size: [n, 1]})
                }
            }
        }

        var ua = Ye("lsolve", ["typed", "matrix", "divideScalar", "multiplyScalar", "subtract", "equalScalar", "DenseMatrix"], function (e) {
                var t = e.typed, r = e.matrix, N = e.divideScalar, M = e.multiplyScalar, S = e.subtract, E = e.equalScalar,
                    A = e.DenseMatrix, O = sa({DenseMatrix: A});
                return t("lsolve", {
                    "SparseMatrix, Array | Matrix": function (e, t) {
                        for (var r = O(e, tSa, !0)._data, n = e._size[0], i = e._size[1], a = e._values, o = e._index, s = e._ptr, u = [], c = 0; c < i; c++) {
                            var f = r[c][0] || 0;
                            if (E(f, 0)) u[c] = [0]; else {
                                for (var l = 0, p = [], m = [], h = s[c], d = s[c + 1], y = h; y < d; y++) {
                                    var g = o[y];
                                    g === c ? l = a[y] : c < g && (p.push(a[y]), m.push(g))
                                }
                                if (E(l, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
                                for (var v = N(f, l), x = 0, b = m.length; x < b; x++) {
                                    var w = m[x];
                                    r[w] = [S(r[w][0] || 0, M(v, p[x]))]
                                }
                                u[c] = [v]
                            }
                        }
                        return new A({data: u, size: [n, 1]})
                    }, "DenseMatrix, Array | Matrix": n, "Array, Array | Matrix": function (e, t) {
                        return n(r(e), t).valueOf()
                    }
                });

                function n(e, t) {
                    for (var r = (t = O(e, t, !0))._data, n = e._size[0], i = e._size[1], a = [], o = e._data, s = 0; s < i; s++) {
                        var u = r[s][0] || 0, c = void 0;
                        if (E(u, 0)) c = 0; else {
                            var f = o[s][s];
                            if (E(f, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
                            c = N(u, f);
                            for (var l = s + 1; l < n; l++) r[l] = [S(r[l][0] || 0, M(c, o[l][s]))]
                        }
                        a[s] = [c]
                    }
                    return new A({data: a, size: [n, 1]})
                }
            }),
            ca = Ye("usolve", ["typed", "matrix", "divideScalar", "multiplyScalar", "subtract", "equalScalar", "DenseMatrix"], function (e) {
                var t = e.typed, r = e.matrix, w = e.divideScalar, N = e.multiplyScalar, M = e.subtract,
                    S = e.equalScalar, E = e.DenseMatrix, A = sa({DenseMatrix: E});
                return t("usolve", {
                    "SparseMatrix, Array | Matrix": function (e, t) {
                        for (var r = A(e, pTa, !0)._data, n = e._size[0], i = e._size[1], a = e._values, o = e._index, s = e._ptr, u = [], c = i - 1; 0 <= c; c--) {
                            var f = r[c][0] || 0;
                            if (S(f, 0)) u[c] = [0]; else {
                                for (var l = 0, p = [], m = [], h = s[c], d = s[c + 1] - 1; h <= d; d--) {
                                    var y = o[d];
                                    y === c ? l = a[d] : y < c && (p.push(a[d]), m.push(y))
                                }
                                if (S(l, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
                                for (var g = w(f, l), v = 0, x = m.length; v < x; v++) {
                                    var b = m[v];
                                    r[b] = [M(r[b][0], N(g, p[v]))]
                                }
                                u[c] = [g]
                            }
                        }
                        return new E({data: u, size: [n, 1]})
                    }, "DenseMatrix, Array | Matrix": n, "Array, Array | Matrix": function (e, t) {
                        return n(r(e), t).valueOf()
                    }
                });

                function n(e, t) {
                    for (var r = (t = A(e, t, !0))._data, n = e._size[0], t = e._size[1], i = [], a = e._data, o = t - 1; 0 <= o; o--) {
                        var s = r[o][0] || 0, u = void 0;
                        if (S(s, 0)) u = 0; else {
                            var c = a[o][o];
                            if (S(c, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
                            u = w(s, c);
                            for (var f = o - 1; 0 <= f; f--) r[f] = [M(r[f][0] || 0, N(u, a[f][o]))]
                        }
                        i[o] = [u]
                    }
                    return new E({data: i, size: [n, 1]})
                }
            });

        function fa(e) {
            return function (e) {
                if (Array.isArray(e)) return la(e)
            }(e) || function (e) {
                if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e)
            }(e) || function (e) {
                if (e) {
                    if ("string" == typeof e) return la(e, void 0);
                    var t = Object.prototype.toString.call(e).slice(8, -1);
                    return "Object" === t && e.constructor && (t = e.constructor.name), "Map" === t || "Set" === t ? Array.from(e) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? la(e, void 0) : void 0
                }
            }(e) || function () {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }

        function la(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
            return n
        }

        var pa = Ye("lsolveAll", ["typed", "matrix", "divideScalar", "multiplyScalar", "subtract", "equalScalar", "DenseMatrix"], function (e) {
            var t = e.typed, r = e.matrix, A = e.divideScalar, O = e.multiplyScalar, C = e.subtract, _ = e.equalScalar,
                T = e.DenseMatrix, z = sa({DenseMatrix: T});
            return t("lsolveAll", {
                "SparseMatrix, Array | Matrix": function (e, t) {
                    for (var r = [z(e, uUa, !0)._data.map(function (e) {
                        return e[0]
                    })], n = e._size[0], i = e._size[1], a = e._values, o = e._index, s = e._ptr, u = 0; u < i; u++) for (var c = r.length, f = 0; f < c; f++) {
                        for (var l = r[f], p = [], m = [], h = s[u], d = s[u + 1], y = 0, g = h; g < d; g++) {
                            var v = o[g];
                            v === u ? y = a[g] : u < v && (p.push(a[g]), m.push(v))
                        }
                        if (_(y, 0)) if (_(l[u], 0)) {
                            if (0 === f) {
                                var x = fa(l);
                                x[u] = 1;
                                for (var b = 0, w = m.length; b < w; b++) {
                                    var N = m[b];
                                    x[N] = C(x[N], p[b])
                                }
                                r.push(x)
                            }
                        } else {
                            if (0 === f) return [];
                            r.splice(f, 1), --f, --c
                        } else {
                            l[u] = A(l[u], y);
                            for (var M = 0, S = m.length; M < S; M++) {
                                var E = m[M];
                                l[E] = C(l[E], O(l[u], p[M]))
                            }
                        }
                    }
                    return r.map(function (e) {
                        return new T({
                            data: e.map(function (e) {
                                return [e]
                            }), size: [n, 1]
                        })
                    })
                }, "DenseMatrix, Array | Matrix": n, "Array, Array | Matrix": function (e, t) {
                    return n(r(e), t).map(function (e) {
                        return e.valueOf()
                    })
                }
            });

            function n(e, t) {
                for (var r = [z(e, t, !0)._data.map(function (e) {
                    return e[0]
                })], n = e._data, i = e._size[0], a = e._size[1], o = 0; o < a; o++) for (var s = r.length, u = 0; u < s; u++) {
                    var c = r[u];
                    if (_(n[o][o], 0)) if (_(c[o], 0)) {
                        if (0 === u) {
                            for (var f = fa(c), l = o + (f[o] = 1); l < a; l++) f[l] = C(f[l], n[l][o]);
                            r.push(f)
                        }
                    } else {
                        if (0 === u) return [];
                        r.splice(u, 1), --u, --s
                    } else {
                        c[o] = A(c[o], n[o][o]);
                        for (var p = o + 1; p < a; p++) c[p] = C(c[p], O(c[o], n[p][o]))
                    }
                }
                return r.map(function (e) {
                    return new T({
                        data: e.map(function (e) {
                            return [e]
                        }), size: [i, 1]
                    })
                })
            }
        });

        function ma(e) {
            return function (e) {
                if (Array.isArray(e)) return ha(e)
            }(e) || function (e) {
                if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e)
            }(e) || function (e) {
                if (e) {
                    if ("string" == typeof e) return ha(e, void 0);
                    var t = Object.prototype.toString.call(e).slice(8, -1);
                    return "Object" === t && e.constructor && (t = e.constructor.name), "Map" === t || "Set" === t ? Array.from(e) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? ha(e, void 0) : void 0
                }
            }(e) || function () {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }

        function ha(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
            return n
        }

        var da = Ye("usolveAll", ["typed", "matrix", "divideScalar", "multiplyScalar", "subtract", "equalScalar", "DenseMatrix"], function (e) {
                var t = e.typed, r = e.matrix, E = e.divideScalar, A = e.multiplyScalar, O = e.subtract, C = e.equalScalar,
                    _ = e.DenseMatrix, T = sa({DenseMatrix: _});
                return t("usolveAll", {
                    "SparseMatrix, Array | Matrix": function (e, t) {
                        for (var r = [T(e, MVa, !0)._data.map(function (e) {
                            return e[0]
                        })], n = e._size[0], i = e._size[1], a = e._values, o = e._index, s = e._ptr, u = i - 1; 0 <= u; u--) for (var c = r.length, f = 0; f < c; f++) {
                            for (var l = r[f], p = [], m = [], h = s[u], d = 0, y = s[u + 1] - 1; h <= y; y--) {
                                var g = o[y];
                                g === u ? d = a[y] : g < u && (p.push(a[y]), m.push(g))
                            }
                            if (C(d, 0)) if (C(l[u], 0)) {
                                if (0 === f) {
                                    var v = ma(l);
                                    v[u] = 1;
                                    for (var x = 0, b = m.length; x < b; x++) {
                                        var w = m[x];
                                        v[w] = O(v[w], p[x])
                                    }
                                    r.push(v)
                                }
                            } else {
                                if (0 === f) return [];
                                r.splice(f, 1), --f, --c
                            } else {
                                l[u] = E(l[u], d);
                                for (var N = 0, M = m.length; N < M; N++) {
                                    var S = m[N];
                                    l[S] = O(l[S], A(l[u], p[N]))
                                }
                            }
                        }
                        return r.map(function (e) {
                            return new _({
                                data: e.map(function (e) {
                                    return [e]
                                }), size: [n, 1]
                            })
                        })
                    }, "DenseMatrix, Array | Matrix": n, "Array, Array | Matrix": function (e, t) {
                        return n(r(e), t).map(function (e) {
                            return e.valueOf()
                        })
                    }
                });

                function n(e, t) {
                    for (var r = [T(e, t, !0)._data.map(function (e) {
                        return e[0]
                    })], n = e._data, i = e._size[0], a = e._size[1] - 1; 0 <= a; a--) for (var o = r.length, s = 0; s < o; s++) {
                        var u = r[s];
                        if (C(n[a][a], 0)) if (C(u[a], 0)) {
                            if (0 === s) {
                                for (var c = ma(u), f = a - (c[a] = 1); 0 <= f; f--) c[f] = O(c[f], n[f][a]);
                                r.push(c)
                            }
                        } else {
                            if (0 === s) return [];
                            r.splice(s, 1), --s, --o
                        } else {
                            u[a] = E(u[a], n[a][a]);
                            for (var l = a - 1; 0 <= l; l--) u[l] = O(u[l], A(u[a], n[l][a]))
                        }
                    }
                    return r.map(function (e) {
                        return new _({
                            data: e.map(function (e) {
                                return [e]
                            }), size: [i, 1]
                        })
                    })
                }
            }), ya = Ye("algorithm08", ["typed", "equalScalar"], function (e) {
                var _ = e.typed, T = e.equalScalar;
                return function (e, t, r) {
                    var n = e._values, i = e._index, a = e._ptr, o = e._size, s = e._datatype, u = t._values, c = t._index,
                        f = t._ptr, l = t._size, t = t._datatype;
                    if (o.length !== l.length) throw new we(o.length, l.length);
                    if (o[0] !== l[0] || o[1] !== l[1]) throw new RangeError("Dimension mismatch. Matrix A (" + o + ") must match Matrix B (" + l + ")");
                    if (!n || !u) throw new Error("Cannot perform operation on Pattern Sparse Matrices");
                    var p, l = o[0], m = o[1], h = T, d = 0, y = r;
                    "string" == typeof s && s === t && (p = s, h = _.find(T, [p, p]), d = _.convert(0, p), y = _.find(r, [p, p]));
                    for (var g, v = [], x = [], b = [], w = [], N = [], M = 0; M < m; M++) {
                        b[M] = x.length;
                        for (var S = M + 1, E = a[M], A = a[M + 1], O = E; O < A; O++) N[g = i[O]] = S, w[g] = n[O], x.push(g);
                        for (E = f[M], A = f[M + 1], O = E; O < A; O++) N[g = c[O]] === S && (w[g] = y(w[g], u[O]));
                        for (O = b[M]; O < x.length;) {
                            var C = w[g = x[O]];
                            h(C, d) ? x.splice(O, 1) : (v.push(C), O++)
                        }
                    }
                    return b[m] = x.length, e.createSparseMatrix({values: v, index: x, ptr: b, size: [l, m], datatype: p})
                }
            }), ga = Ye("leftShift", ["typed", "matrix", "equalScalar", "zeros", "DenseMatrix"], function (e) {
                var t = e.typed, r = e.matrix, n = e.equalScalar, i = e.zeros, e = e.DenseMatrix, a = Ir({typed: t}),
                    o = Pr({typed: t, equalScalar: n}), s = ya({typed: t, equalScalar: n}),
                    u = kr({typed: t, DenseMatrix: e}), c = wr({typed: t, equalScalar: n}), f = Dr({typed: t}),
                    l = Nr({typed: t});
                return t("leftShift", {
                    "number, number": gn,
                    "BigNumber, BigNumber": ln,
                    "SparseMatrix, SparseMatrix": function (e, t) {
                        return s(e, t, this, !1)
                    },
                    "SparseMatrix, DenseMatrix": function (e, t) {
                        return o(t, e, this, !0)
                    },
                    "DenseMatrix, SparseMatrix": function (e, t) {
                        return a(e, t, this, !1)
                    },
                    "DenseMatrix, DenseMatrix": function (e, t) {
                        return f(e, t, this)
                    },
                    "Array, Array": function (e, t) {
                        return this(r(e), r(t)).valueOf()
                    },
                    "Array, Matrix": function (e, t) {
                        return this(r(e), t)
                    },
                    "Matrix, Array": function (e, t) {
                        return this(e, r(t))
                    },
                    "SparseMatrix, number | BigNumber": function (e, t) {
                        return n(t, 0) ? e.clone() : c(e, t, this, !1)
                    },
                    "DenseMatrix, number | BigNumber": function (e, t) {
                        return n(t, 0) ? e.clone() : l(e, t, this, !1)
                    },
                    "number | BigNumber, SparseMatrix": function (e, t) {
                        return n(e, 0) ? i(t.size(), t.storage()) : u(t, e, this, !0)
                    },
                    "number | BigNumber, DenseMatrix": function (e, t) {
                        return n(e, 0) ? i(t.size(), t.storage()) : l(t, e, this, !0)
                    },
                    "Array, number | BigNumber": function (e, t) {
                        return this(r(e), t).valueOf()
                    },
                    "number | BigNumber, Array": function (e, t) {
                        return this(e, r(t)).valueOf()
                    }
                })
            }), va = Ye("rightArithShift", ["typed", "matrix", "equalScalar", "zeros", "DenseMatrix"], function (e) {
                var t = e.typed, r = e.matrix, n = e.equalScalar, i = e.zeros, e = e.DenseMatrix, a = Ir({typed: t}),
                    o = Pr({typed: t, equalScalar: n}), s = ya({typed: t, equalScalar: n}),
                    u = kr({typed: t, DenseMatrix: e}), c = wr({typed: t, equalScalar: n}), f = Dr({typed: t}),
                    l = Nr({typed: t});
                return t("rightArithShift", {
                    "number, number": vn,
                    "BigNumber, BigNumber": pn,
                    "SparseMatrix, SparseMatrix": function (e, t) {
                        return s(e, t, this, !1)
                    },
                    "SparseMatrix, DenseMatrix": function (e, t) {
                        return o(t, e, this, !0)
                    },
                    "DenseMatrix, SparseMatrix": function (e, t) {
                        return a(e, t, this, !1)
                    },
                    "DenseMatrix, DenseMatrix": function (e, t) {
                        return f(e, t, this)
                    },
                    "Array, Array": function (e, t) {
                        return this(r(e), r(t)).valueOf()
                    },
                    "Array, Matrix": function (e, t) {
                        return this(r(e), t)
                    },
                    "Matrix, Array": function (e, t) {
                        return this(e, r(t))
                    },
                    "SparseMatrix, number | BigNumber": function (e, t) {
                        return n(t, 0) ? e.clone() : c(e, t, this, !1)
                    },
                    "DenseMatrix, number | BigNumber": function (e, t) {
                        return n(t, 0) ? e.clone() : l(e, t, this, !1)
                    },
                    "number | BigNumber, SparseMatrix": function (e, t) {
                        return n(e, 0) ? i(t.size(), t.storage()) : u(t, e, this, !0)
                    },
                    "number | BigNumber, DenseMatrix": function (e, t) {
                        return n(e, 0) ? i(t.size(), t.storage()) : l(t, e, this, !0)
                    },
                    "Array, number | BigNumber": function (e, t) {
                        return this(r(e), t).valueOf()
                    },
                    "number | BigNumber, Array": function (e, t) {
                        return this(e, r(t)).valueOf()
                    }
                })
            }), xa = Ye("rightLogShift", ["typed", "matrix", "equalScalar", "zeros", "DenseMatrix"], function (e) {
                var t = e.typed, r = e.matrix, n = e.equalScalar, i = e.zeros, e = e.DenseMatrix, a = Ir({typed: t}),
                    o = Pr({typed: t, equalScalar: n}), s = ya({typed: t, equalScalar: n}),
                    u = kr({typed: t, DenseMatrix: e}), c = wr({typed: t, equalScalar: n}), f = Dr({typed: t}),
                    l = Nr({typed: t});
                return t("rightLogShift", {
                    "number, number": xn, "SparseMatrix, SparseMatrix": function (e, t) {
                        return s(e, t, this, !1)
                    }, "SparseMatrix, DenseMatrix": function (e, t) {
                        return o(t, e, this, !0)
                    }, "DenseMatrix, SparseMatrix": function (e, t) {
                        return a(e, t, this, !1)
                    }, "DenseMatrix, DenseMatrix": function (e, t) {
                        return f(e, t, this)
                    }, "Array, Array": function (e, t) {
                        return this(r(e), r(t)).valueOf()
                    }, "Array, Matrix": function (e, t) {
                        return this(r(e), t)
                    }, "Matrix, Array": function (e, t) {
                        return this(e, r(t))
                    }, "SparseMatrix, number | BigNumber": function (e, t) {
                        return n(t, 0) ? e.clone() : c(e, t, this, !1)
                    }, "DenseMatrix, number | BigNumber": function (e, t) {
                        return n(t, 0) ? e.clone() : l(e, t, this, !1)
                    }, "number | BigNumber, SparseMatrix": function (e, t) {
                        return n(e, 0) ? i(t.size(), t.storage()) : u(t, e, this, !0)
                    }, "number | BigNumber, DenseMatrix": function (e, t) {
                        return n(e, 0) ? i(t.size(), t.storage()) : l(t, e, this, !0)
                    }, "Array, number | BigNumber": function (e, t) {
                        return this(r(e), t).valueOf()
                    }, "number | BigNumber, Array": function (e, t) {
                        return this(e, r(t)).valueOf()
                    }
                })
            }), ba = Ye("and", ["typed", "matrix", "equalScalar", "zeros", "not"], function (e) {
                var t = e.typed, r = e.matrix, n = e.equalScalar, i = e.zeros, a = e.not,
                    o = Pr({typed: t, equalScalar: n}), s = jr({typed: t, equalScalar: n}),
                    u = wr({typed: t, equalScalar: n}), c = Dr({typed: t}), f = Nr({typed: t});
                return t("and", {
                    "number, number": qn, "Complex, Complex": function (e, t) {
                        return !(0 === e.re && 0 === e.im || 0 === t.re && 0 === t.im)
                    }, "BigNumber, BigNumber": function (e, t) {
                        return !(e.isZero() || t.isZero() || e.isNaN() || t.isNaN())
                    }, "Unit, Unit": function (e, t) {
                        return this(e.value || 0, t.value || 0)
                    }, "SparseMatrix, SparseMatrix": function (e, t) {
                        return s(e, t, this, !1)
                    }, "SparseMatrix, DenseMatrix": function (e, t) {
                        return o(t, e, this, !0)
                    }, "DenseMatrix, SparseMatrix": function (e, t) {
                        return o(e, t, this, !1)
                    }, "DenseMatrix, DenseMatrix": function (e, t) {
                        return c(e, t, this)
                    }, "Array, Array": function (e, t) {
                        return this(r(e), r(t)).valueOf()
                    }, "Array, Matrix": function (e, t) {
                        return this(r(e), t)
                    }, "Matrix, Array": function (e, t) {
                        return this(e, r(t))
                    }, "SparseMatrix, any": function (e, t) {
                        return a(t) ? i(e.size(), e.storage()) : u(e, t, this, !1)
                    }, "DenseMatrix, any": function (e, t) {
                        return a(t) ? i(e.size(), e.storage()) : f(e, t, this, !1)
                    }, "any, SparseMatrix": function (e, t) {
                        return a(e) ? i(e.size(), e.storage()) : u(t, e, this, !0)
                    }, "any, DenseMatrix": function (e, t) {
                        return a(e) ? i(e.size(), e.storage()) : f(t, e, this, !0)
                    }, "Array, any": function (e, t) {
                        return this(r(e), t).valueOf()
                    }, "any, Array": function (e, t) {
                        return this(e, r(t)).valueOf()
                    }
                })
            }),
            wa = Ye("compare", ["typed", "config", "matrix", "equalScalar", "BigNumber", "Fraction", "DenseMatrix"], function (e) {
                var t = e.typed, r = e.config, n = e.equalScalar, i = e.matrix, a = e.BigNumber, o = e.Fraction,
                    e = e.DenseMatrix, s = Hr({typed: t}), u = $r({typed: t, equalScalar: n}),
                    c = Gr({typed: t, DenseMatrix: e}), f = Dr({typed: t}), l = Nr({typed: t});
                return t("compare", {
                    "boolean, boolean": function (e, t) {
                        return e === t ? 0 : t < e ? 1 : -1
                    }, "number, number": function (e, t) {
                        return re(e, t, r.epsilon) ? 0 : t < e ? 1 : -1
                    }, "BigNumber, BigNumber": function (e, t) {
                        return kt(e, t, r.epsilon) ? new a(0) : new a(e.cmp(t))
                    }, "Fraction, Fraction": function (e, t) {
                        return new o(e.compare(t))
                    }, "Complex, Complex": function () {
                        throw new TypeError("No ordering relation is defined for complex numbers")
                    }, "Unit, Unit": function (e, t) {
                        if (!e.equalBase(t)) throw new Error("Cannot compare units with different base");
                        return this(e.value, t.value)
                    }, "SparseMatrix, SparseMatrix": function (e, t) {
                        return u(e, t, this)
                    }, "SparseMatrix, DenseMatrix": function (e, t) {
                        return s(t, e, this, !0)
                    }, "DenseMatrix, SparseMatrix": function (e, t) {
                        return s(e, t, this, !1)
                    }, "DenseMatrix, DenseMatrix": function (e, t) {
                        return f(e, t, this)
                    }, "Array, Array": function (e, t) {
                        return this(i(e), i(t)).valueOf()
                    }, "Array, Matrix": function (e, t) {
                        return this(i(e), t)
                    }, "Matrix, Array": function (e, t) {
                        return this(e, i(t))
                    }, "SparseMatrix, any": function (e, t) {
                        return c(e, t, this, !1)
                    }, "DenseMatrix, any": function (e, t) {
                        return l(e, t, this, !1)
                    }, "any, SparseMatrix": function (e, t) {
                        return c(t, e, this, !0)
                    }, "any, DenseMatrix": function (e, t) {
                        return l(t, e, this, !0)
                    }, "Array, any": function (e, t) {
                        return l(i(e), t, this, !1).valueOf()
                    }, "any, Array": function (e, t) {
                        return l(i(t), e, this, !0).valueOf()
                    }
                })
            }), a = r(4), Na = r.n(a), Ma = Ye("compareNatural", ["typed", "compare"], function (e) {
                var t = e.typed, a = e.compare, o = a.signatures["boolean,boolean"];
                return t("compareNatural", {
                    "any, any": function (e, t) {
                        var r, n = J(e), i = J(t);
                        if (!("number" !== n && "BigNumber" !== n && "Fraction" !== n || "number" !== i && "BigNumber" !== i && "Fraction" !== i)) return "0" !== (r = a(e, t)).toString() ? 0 < r ? 1 : -1 : Na()(n, i);
                        if ("Array" === n || "Matrix" === n || "Array" === i || "Matrix" === i) return 0 !== (r = function e(t, r, n) {
                            return b(r) && b(n) ? u(t, r.toJSON().values, n.toJSON().values) : b(r) ? e(t, r.toArray(), n) : b(n) ? e(t, r, n.toArray()) : g(r) ? e(t, r.toJSON().data, n) : g(n) ? e(t, r, n.toJSON().data) : Array.isArray(r) ? Array.isArray(n) ? u(t, r, n) : e(t, r, [n]) : e(t, [r], n)
                        }(this, e, t)) ? r : Na()(n, i);
                        if (n !== i) return Na()(n, i);
                        if ("Complex" === n) return e.re > t.re ? 1 : e.re < t.re ? -1 : e.im > t.im ? 1 : e.im < t.im ? -1 : 0;
                        if ("Unit" === n) return e.equalBase(t) ? this(e.value, t.value) : u(this, e.formatUnits(), t.formatUnits());
                        if ("boolean" === n) return o(e, t);
                        if ("string" === n) return Na()(e, t);
                        if ("Object" === n) return function (e, t, r) {
                            var n = Object.keys(t), i = Object.keys(r);
                            n.sort(Na.a), i.sort(Na.a);
                            var a = u(e, n, i);
                            if (0 !== a) return a;
                            for (var o = 0; o < n.length; o++) {
                                var s = e(t[n[o]], r[i[o]]);
                                if (0 !== s) return s
                            }
                            return 0
                        }(this, e, t);
                        if ("null" === n) return 0;
                        if ("undefined" === n) return 0;
                        throw new TypeError('Unsupported type of value "' + n + '"')
                    }
                });

                function u(e, t, r) {
                    for (var n = 0, i = Math.min(t.length, r.length); n < i; n++) {
                        var a = e(t[n], r[n]);
                        if (0 !== a) return a
                    }
                    return t.length > r.length ? 1 : t.length < r.length ? -1 : 0
                }
            }), Sa = Ye("compareText", ["typed", "matrix"], function (e) {
                var t = e.typed, r = e.matrix, n = Dr({typed: t}), i = Nr({typed: t});
                return t("compareText", {
                    "any, any": be, "DenseMatrix, DenseMatrix": function (e, t) {
                        return n(e, t, be)
                    }, "Array, Array": function (e, t) {
                        return this(r(e), r(t)).valueOf()
                    }, "Array, Matrix": function (e, t) {
                        return this(r(e), t)
                    }, "Matrix, Array": function (e, t) {
                        return this(e, r(t))
                    }, "DenseMatrix, any": function (e, t) {
                        return i(e, t, be, !1)
                    }, "any, DenseMatrix": function (e, t) {
                        return i(t, e, be, !0)
                    }, "Array, any": function (e, t) {
                        return i(r(e), t, be, !1).valueOf()
                    }, "any, Array": function (e, t) {
                        return i(r(t), e, be, !0).valueOf()
                    }
                })
            }), Ea = Ye("equal", ["typed", "matrix", "equalScalar", "DenseMatrix"], function (e) {
                var t = e.typed, r = e.matrix, n = e.equalScalar, e = e.DenseMatrix, i = Hr({typed: t}),
                    a = Mn({typed: t, DenseMatrix: e}), o = Gr({typed: t, DenseMatrix: e}), s = Dr({typed: t}),
                    u = Nr({typed: t});
                return t("equal", {
                    "any, any": function (e, t) {
                        return null === e ? null === t : null === t ? null === e : void 0 === e ? void 0 === t : void 0 === t ? void 0 === e : n(e, t)
                    }, "SparseMatrix, SparseMatrix": function (e, t) {
                        return a(e, t, n)
                    }, "SparseMatrix, DenseMatrix": function (e, t) {
                        return i(t, e, n, !0)
                    }, "DenseMatrix, SparseMatrix": function (e, t) {
                        return i(e, t, n, !1)
                    }, "DenseMatrix, DenseMatrix": function (e, t) {
                        return s(e, t, n)
                    }, "Array, Array": function (e, t) {
                        return this(r(e), r(t)).valueOf()
                    }, "Array, Matrix": function (e, t) {
                        return this(r(e), t)
                    }, "Matrix, Array": function (e, t) {
                        return this(e, r(t))
                    }, "SparseMatrix, any": function (e, t) {
                        return o(e, t, n, !1)
                    }, "DenseMatrix, any": function (e, t) {
                        return u(e, t, n, !1)
                    }, "any, SparseMatrix": function (e, t) {
                        return o(t, e, n, !0)
                    }, "any, DenseMatrix": function (e, t) {
                        return u(t, e, n, !0)
                    }, "Array, any": function (e, t) {
                        return u(r(e), t, n, !1).valueOf()
                    }, "any, Array": function (e, t) {
                        return u(r(t), e, n, !0).valueOf()
                    }
                })
            }), Aa = (Ye("equal", ["typed", "equalScalar"], function (e) {
                var t = e.typed, r = e.equalScalar;
                return t("equal", {
                    "any, any": function (e, t) {
                        return null === e ? null === t : null === t ? null === e : void 0 === e ? void 0 === t : void 0 === t ? void 0 === e : r(e, t)
                    }
                })
            }), Ye("equalText", ["typed", "compareText", "isZero"], function (e) {
                var t = e.typed, r = e.compareText, n = e.isZero;
                return t("equalText", {
                    "any, any": function (e, t) {
                        return n(r(e, t))
                    }
                })
            })), Oa = Ye("smaller", ["typed", "config", "matrix", "DenseMatrix"], function (e) {
                var t = e.typed, r = e.config, n = e.matrix, e = e.DenseMatrix, i = Hr({typed: t}),
                    a = Mn({typed: t, DenseMatrix: e}), o = Gr({typed: t, DenseMatrix: e}), s = Dr({typed: t}),
                    u = Nr({typed: t});
                return t("smaller", {
                    "boolean, boolean": function (e, t) {
                        return e < t
                    }, "number, number": function (e, t) {
                        return e < t && !re(e, t, r.epsilon)
                    }, "BigNumber, BigNumber": function (e, t) {
                        return e.lt(t) && !kt(e, t, r.epsilon)
                    }, "Fraction, Fraction": function (e, t) {
                        return -1 === e.compare(t)
                    }, "Complex, Complex": function (e, t) {
                        throw new TypeError("No ordering relation is defined for complex numbers")
                    }, "Unit, Unit": function (e, t) {
                        if (!e.equalBase(t)) throw new Error("Cannot compare units with different base");
                        return this(e.value, t.value)
                    }, "SparseMatrix, SparseMatrix": function (e, t) {
                        return a(e, t, this)
                    }, "SparseMatrix, DenseMatrix": function (e, t) {
                        return i(t, e, this, !0)
                    }, "DenseMatrix, SparseMatrix": function (e, t) {
                        return i(e, t, this, !1)
                    }, "DenseMatrix, DenseMatrix": function (e, t) {
                        return s(e, t, this)
                    }, "Array, Array": function (e, t) {
                        return this(n(e), n(t)).valueOf()
                    }, "Array, Matrix": function (e, t) {
                        return this(n(e), t)
                    }, "Matrix, Array": function (e, t) {
                        return this(e, n(t))
                    }, "SparseMatrix, any": function (e, t) {
                        return o(e, t, this, !1)
                    }, "DenseMatrix, any": function (e, t) {
                        return u(e, t, this, !1)
                    }, "any, SparseMatrix": function (e, t) {
                        return o(t, e, this, !0)
                    }, "any, DenseMatrix": function (e, t) {
                        return u(t, e, this, !0)
                    }, "Array, any": function (e, t) {
                        return u(n(e), t, this, !1).valueOf()
                    }, "any, Array": function (e, t) {
                        return u(n(t), e, this, !0).valueOf()
                    }
                })
            }), Ca = Ye("smallerEq", ["typed", "config", "matrix", "DenseMatrix"], function (e) {
                var t = e.typed, r = e.config, n = e.matrix, e = e.DenseMatrix, i = Hr({typed: t}),
                    a = Mn({typed: t, DenseMatrix: e}), o = Gr({typed: t, DenseMatrix: e}), s = Dr({typed: t}),
                    u = Nr({typed: t});
                return t("smallerEq", {
                    "boolean, boolean": function (e, t) {
                        return e <= t
                    }, "number, number": function (e, t) {
                        return e <= t || re(e, t, r.epsilon)
                    }, "BigNumber, BigNumber": function (e, t) {
                        return e.lte(t) || kt(e, t, r.epsilon)
                    }, "Fraction, Fraction": function (e, t) {
                        return 1 !== e.compare(t)
                    }, "Complex, Complex": function () {
                        throw new TypeError("No ordering relation is defined for complex numbers")
                    }, "Unit, Unit": function (e, t) {
                        if (!e.equalBase(t)) throw new Error("Cannot compare units with different base");
                        return this(e.value, t.value)
                    }, "SparseMatrix, SparseMatrix": function (e, t) {
                        return a(e, t, this)
                    }, "SparseMatrix, DenseMatrix": function (e, t) {
                        return i(t, e, this, !0)
                    }, "DenseMatrix, SparseMatrix": function (e, t) {
                        return i(e, t, this, !1)
                    }, "DenseMatrix, DenseMatrix": function (e, t) {
                        return s(e, t, this)
                    }, "Array, Array": function (e, t) {
                        return this(n(e), n(t)).valueOf()
                    }, "Array, Matrix": function (e, t) {
                        return this(n(e), t)
                    }, "Matrix, Array": function (e, t) {
                        return this(e, n(t))
                    }, "SparseMatrix, any": function (e, t) {
                        return o(e, t, this, !1)
                    }, "DenseMatrix, any": function (e, t) {
                        return u(e, t, this, !1)
                    }, "any, SparseMatrix": function (e, t) {
                        return o(t, e, this, !0)
                    }, "any, DenseMatrix": function (e, t) {
                        return u(t, e, this, !0)
                    }, "Array, any": function (e, t) {
                        return u(n(e), t, this, !1).valueOf()
                    }, "any, Array": function (e, t) {
                        return u(n(t), e, this, !0).valueOf()
                    }
                })
            }), _a = Ye("larger", ["typed", "config", "matrix", "DenseMatrix"], function (e) {
                var t = e.typed, r = e.config, n = e.matrix, e = e.DenseMatrix, i = Hr({typed: t}),
                    a = Mn({typed: t, DenseMatrix: e}), o = Gr({typed: t, DenseMatrix: e}), s = Dr({typed: t}),
                    u = Nr({typed: t});
                return t("larger", {
                    "boolean, boolean": function (e, t) {
                        return t < e
                    }, "number, number": function (e, t) {
                        return t < e && !re(e, t, r.epsilon)
                    }, "BigNumber, BigNumber": function (e, t) {
                        return e.gt(t) && !kt(e, t, r.epsilon)
                    }, "Fraction, Fraction": function (e, t) {
                        return 1 === e.compare(t)
                    }, "Complex, Complex": function () {
                        throw new TypeError("No ordering relation is defined for complex numbers")
                    }, "Unit, Unit": function (e, t) {
                        if (!e.equalBase(t)) throw new Error("Cannot compare units with different base");
                        return this(e.value, t.value)
                    }, "SparseMatrix, SparseMatrix": function (e, t) {
                        return a(e, t, this)
                    }, "SparseMatrix, DenseMatrix": function (e, t) {
                        return i(t, e, this, !0)
                    }, "DenseMatrix, SparseMatrix": function (e, t) {
                        return i(e, t, this, !1)
                    }, "DenseMatrix, DenseMatrix": function (e, t) {
                        return s(e, t, this)
                    }, "Array, Array": function (e, t) {
                        return this(n(e), n(t)).valueOf()
                    }, "Array, Matrix": function (e, t) {
                        return this(n(e), t)
                    }, "Matrix, Array": function (e, t) {
                        return this(e, n(t))
                    }, "SparseMatrix, any": function (e, t) {
                        return o(e, t, this, !1)
                    }, "DenseMatrix, any": function (e, t) {
                        return u(e, t, this, !1)
                    }, "any, SparseMatrix": function (e, t) {
                        return o(t, e, this, !0)
                    }, "any, DenseMatrix": function (e, t) {
                        return u(t, e, this, !0)
                    }, "Array, any": function (e, t) {
                        return u(n(e), t, this, !1).valueOf()
                    }, "any, Array": function (e, t) {
                        return u(n(t), e, this, !0).valueOf()
                    }
                })
            }), Ta = Ye("largerEq", ["typed", "config", "matrix", "DenseMatrix"], function (e) {
                var t = e.typed, r = e.config, n = e.matrix, e = e.DenseMatrix, i = Hr({typed: t}),
                    a = Mn({typed: t, DenseMatrix: e}), o = Gr({typed: t, DenseMatrix: e}), s = Dr({typed: t}),
                    u = Nr({typed: t});
                return t("largerEq", {
                    "boolean, boolean": function (e, t) {
                        return t <= e
                    }, "number, number": function (e, t) {
                        return t <= e || re(e, t, r.epsilon)
                    }, "BigNumber, BigNumber": function (e, t) {
                        return e.gte(t) || kt(e, t, r.epsilon)
                    }, "Fraction, Fraction": function (e, t) {
                        return -1 !== e.compare(t)
                    }, "Complex, Complex": function () {
                        throw new TypeError("No ordering relation is defined for complex numbers")
                    }, "Unit, Unit": function (e, t) {
                        if (!e.equalBase(t)) throw new Error("Cannot compare units with different base");
                        return this(e.value, t.value)
                    }, "SparseMatrix, SparseMatrix": function (e, t) {
                        return a(e, t, this)
                    }, "SparseMatrix, DenseMatrix": function (e, t) {
                        return i(t, e, this, !0)
                    }, "DenseMatrix, SparseMatrix": function (e, t) {
                        return i(e, t, this, !1)
                    }, "DenseMatrix, DenseMatrix": function (e, t) {
                        return s(e, t, this)
                    }, "Array, Array": function (e, t) {
                        return this(n(e), n(t)).valueOf()
                    }, "Array, Matrix": function (e, t) {
                        return this(n(e), t)
                    }, "Matrix, Array": function (e, t) {
                        return this(e, n(t))
                    }, "SparseMatrix, any": function (e, t) {
                        return o(e, t, this, !1)
                    }, "DenseMatrix, any": function (e, t) {
                        return u(e, t, this, !1)
                    }, "any, SparseMatrix": function (e, t) {
                        return o(t, e, this, !0)
                    }, "any, DenseMatrix": function (e, t) {
                        return u(t, e, this, !0)
                    }, "Array, any": function (e, t) {
                        return u(n(e), t, this, !1).valueOf()
                    }, "any, Array": function (e, t) {
                        return u(n(t), e, this, !0).valueOf()
                    }
                })
            }), za = Ye("deepEqual", ["typed", "equal"], function (e) {
                var t = e.typed, a = e.equal;
                return t("deepEqual", {
                    "any, any": function (e, t) {
                        return function e(t, r) {
                            if (Array.isArray(t)) {
                                if (Array.isArray(r)) {
                                    var n = t.length;
                                    if (n !== r.length) return !1;
                                    for (var i = 0; i < n; i++) if (!e(t[i], r[i])) return !1;
                                    return !0
                                }
                                return !1
                            }
                            return !Array.isArray(r) && a(t, r)
                        }(e.valueOf(), t.valueOf())
                    }
                })
            }), qa = Ye("unequal", ["typed", "config", "equalScalar", "matrix", "DenseMatrix"], function (e) {
                var t = e.typed, r = (e.config, e.equalScalar), n = e.matrix, e = e.DenseMatrix, i = Hr({typed: t}),
                    a = Mn({typed: t, DenseMatrix: e}), o = Gr({typed: t, DenseMatrix: e}), s = Dr({typed: t}),
                    u = Nr({typed: t});
                return t("unequal", {
                    "any, any": function (e, t) {
                        return null === e ? null !== t : null === t ? null !== e : void 0 === e ? void 0 !== t : void 0 === t ? void 0 !== e : c(e, t)
                    }, "SparseMatrix, SparseMatrix": function (e, t) {
                        return a(e, t, c)
                    }, "SparseMatrix, DenseMatrix": function (e, t) {
                        return i(t, e, c, !0)
                    }, "DenseMatrix, SparseMatrix": function (e, t) {
                        return i(e, t, c, !1)
                    }, "DenseMatrix, DenseMatrix": function (e, t) {
                        return s(e, t, c)
                    }, "Array, Array": function (e, t) {
                        return this(n(e), n(t)).valueOf()
                    }, "Array, Matrix": function (e, t) {
                        return this(n(e), t)
                    }, "Matrix, Array": function (e, t) {
                        return this(e, n(t))
                    }, "SparseMatrix, any": function (e, t) {
                        return o(e, t, c, !1)
                    }, "DenseMatrix, any": function (e, t) {
                        return u(e, t, c, !1)
                    }, "any, SparseMatrix": function (e, t) {
                        return o(t, e, c, !0)
                    }, "any, DenseMatrix": function (e, t) {
                        return u(t, e, c, !0)
                    }, "Array, any": function (e, t) {
                        return u(n(e), t, c, !1).valueOf()
                    }, "any, Array": function (e, t) {
                        return u(n(t), e, c, !0).valueOf()
                    }
                });

                function c(e, t) {
                    return !r(e, t)
                }
            }), Ia = (Ye("unequal", ["typed", "equalScalar"], function (e) {
                var t = e.typed, r = e.equalScalar;
                return t("unequal", {
                    "any, any": function (e, t) {
                        return null === e ? null !== t : null === t ? null !== e : void 0 === e ? void 0 !== t : void 0 === t ? void 0 !== e : !r(e, t)
                    }
                })
            }), Ye("partitionSelect", ["typed", "isNumeric", "isNaN", "compare"], function (e) {
                function n(e, t) {
                    return -r(e, t)
                }

                var t = e.typed, f = e.isNumeric, l = e.isNaN, r = e.compare, i = r;
                return t("partitionSelect", {
                    "Array | Matrix, number": function (e, t) {
                        return a(e, t, i)
                    }, "Array | Matrix, number, string": function (e, t, r) {
                        if ("asc" === r) return a(e, t, i);
                        if ("desc" === r) return a(e, t, n);
                        throw new Error('Compare string must be "asc" or "desc"')
                    }, "Array | Matrix, number, function": a
                });

                function a(e, t, r) {
                    if (!L(t) || t < 0) throw new Error("k must be a non-negative integer");
                    if (E(e)) {
                        if (1 < e.size().length) throw new Error("Only one dimensional matrices supported");
                        return o(e.valueOf(), t, r)
                    }
                    if (Array.isArray(e)) return o(e, t, r)
                }

                function o(e, t, r) {
                    if (t >= e.length) throw new Error("k out of bounds");
                    for (var n = 0; n < e.length; n++) if (f(e[n]) && l(e[n])) return e[n];
                    for (var i = 0, a = e.length - 1; i < a;) {
                        for (var o, s = i, u = a, c = e[Math.floor(Math.random() * (a - i + 1)) + i]; s < u;) 0 <= r(e[s], c) ? (o = e[u], e[u] = e[s], e[s] = o, --u) : ++s;
                        0 < r(e[s], c) && --s, t <= s ? a = s : i = s + 1
                    }
                    return e[t]
                }
            })), Ba = Ye("sort", ["typed", "matrix", "compare", "compareNatural"], function (e) {
                function t(e, t) {
                    return -i(e, t)
                }

                var r = e.typed, n = e.matrix, i = e.compare, a = e.compareNatural, o = i;
                return r("sort", {
                    Array: function (e) {
                        return u(e), e.sort(o)
                    }, Matrix: function (e) {
                        return c(e), n(e.toArray().sort(o), e.storage())
                    }, "Array, function": function (e, t) {
                        return u(e), e.sort(t)
                    }, "Matrix, function": function (e, t) {
                        return c(e), n(e.toArray().sort(t), e.storage())
                    }, "Array, string": function (e, t) {
                        return u(e), e.sort(s(t))
                    }, "Matrix, string": function (e, t) {
                        return c(e), n(e.toArray().sort(s(t)), e.storage())
                    }
                });

                function s(e) {
                    if ("asc" === e) return o;
                    if ("desc" === e) return t;
                    if ("natural" === e) return a;
                    throw new Error('String "asc", "desc", or "natural" expected')
                }

                function u(e) {
                    if (1 !== Me(e).length) throw new Error("One dimensional array expected")
                }

                function c(e) {
                    if (1 !== e.size().length) throw new Error("One dimensional matrix expected")
                }
            }), ka = Ye("max", ["typed", "config", "numeric", "larger"], function (e) {
                var t = e.typed, n = e.config, i = e.numeric, a = e.larger;
                return t("max", {
                    "Array | Matrix": o, "Array | Matrix, number | BigNumber": function (e, t) {
                        return bt(e, t.valueOf(), r)
                    }, "...": function (e) {
                        if (gt(e)) throw new TypeError("Scalar values expected in function max");
                        return o(e)
                    }
                });

                function r(e, t) {
                    try {
                        return a(e, t) ? e : t
                    } catch (e) {
                        throw Pi(e, "max", t)
                    }
                }

                function o(e) {
                    var r;
                    if (vt(e, function (t) {
                        try {
                            isNaN(t) && "number" == typeof t ? r = NaN : void 0 !== r && !a(t, r) || (r = t)
                        } catch (e) {
                            throw Pi(e, "max", t)
                        }
                    }), void 0 === r) throw new Error("Cannot calculate max of an empty array");
                    return "string" == typeof r && (r = i(r, n.number)), r
                }
            }), Da = Ye("min", ["typed", "config", "numeric", "smaller"], function (e) {
                var t = e.typed, n = e.config, i = e.numeric, a = e.smaller;
                return t("min", {
                    "Array | Matrix": o, "Array | Matrix, number | BigNumber": function (e, t) {
                        return bt(e, t.valueOf(), r)
                    }, "...": function (e) {
                        if (gt(e)) throw new TypeError("Scalar values expected in function min");
                        return o(e)
                    }
                });

                function r(e, t) {
                    try {
                        return a(e, t) ? e : t
                    } catch (e) {
                        throw Pi(e, "min", t)
                    }
                }

                function o(e) {
                    var r;
                    if (vt(e, function (t) {
                        try {
                            isNaN(t) && "number" == typeof t ? r = NaN : void 0 !== r && !a(t, r) || (r = t)
                        } catch (e) {
                            throw Pi(e, "min", t)
                        }
                    }), void 0 === r) throw new Error("Cannot calculate min of an empty array");
                    return "string" == typeof r && (r = i(r, n.number)), r
                }
            }), Ra = Ye("ImmutableDenseMatrix", ["smaller", "DenseMatrix"], function (e) {
                var r = e.smaller, n = e.DenseMatrix;

                function i(e, t) {
                    if (!(this instanceof i)) throw new SyntaxError("Constructor must be called with the new operator");
                    if (t && !S(t)) throw new Error("Invalid datatype: " + t);
                    if (E(e) || x(e)) {
                        var r = new n(e, t);
                        this._data = r._data, this._size = r._size, this._datatype = r._datatype, this._min = null, this._max = null
                    } else if (e && x(e.data) && x(e.size)) this._data = e.data, this._size = e.size, this._datatype = e.datatype, this._min = void 0 !== e.min ? e.min : null, this._max = void 0 !== e.max ? e.max : null; else {
                        if (e) throw new TypeError("Unsupported type of data (" + J(e) + ")");
                        this._data = [], this._size = [0], this._datatype = t, this._min = null, this._max = null
                    }
                }

                return (i.prototype = new n).type = "ImmutableDenseMatrix", i.prototype.isImmutableDenseMatrix = !0, i.prototype.subset = function (e) {
                    switch (arguments.length) {
                        case 1:
                            e = n.prototype.subset.call(this, e);
                            return E(e) ? new i({data: e._data, size: e._size, datatype: e._datatype}) : e;
                        case 2:
                        case 3:
                            throw new Error("Cannot invoke set subset on an Immutable Matrix instance");
                        default:
                            throw new SyntaxError("Wrong number of arguments")
                    }
                }, i.prototype.set = function () {
                    throw new Error("Cannot invoke set on an Immutable Matrix instance")
                }, i.prototype.resize = function () {
                    throw new Error("Cannot invoke resize on an Immutable Matrix instance")
                }, i.prototype.reshape = function () {
                    throw new Error("Cannot invoke reshape on an Immutable Matrix instance")
                }, i.prototype.clone = function () {
                    return new i({data: He(this._data), size: He(this._size), datatype: this._datatype})
                }, i.prototype.toJSON = function () {
                    return {mathjs: "ImmutableDenseMatrix", data: this._data, size: this._size, datatype: this._datatype}
                }, i.fromJSON = function (e) {
                    return new i(e)
                }, i.prototype.swapRows = function () {
                    throw new Error("Cannot invoke swapRows on an Immutable Matrix instance")
                }, i.prototype.min = function () {
                    var t;
                    return null === this._min && (t = null, this.forEach(function (e) {
                        null !== t && !r(e, t) || (t = e)
                    }), this._min = null !== t ? t : void 0), this._min
                }, i.prototype.max = function () {
                    var t;
                    return null === this._max && (t = null, this.forEach(function (e) {
                        null !== t && !r(t, e) || (t = e)
                    }), this._max = null !== t ? t : void 0), this._max
                }, i
            }, {isClass: !0}), Pa = Ye("Index", ["ImmutableDenseMatrix"], function (e) {
                var n = e.ImmutableDenseMatrix;

                function a(e) {
                    if (!(this instanceof a)) throw new SyntaxError("Constructor must be called with the new operator");
                    this._dimensions = [], this._isScalar = !0;
                    for (var t = 0, r = arguments.length; t < r; t++) {
                        var n = arguments[t];
                        if (l(n)) this._dimensions.push(n), this._isScalar = !1; else if (Array.isArray(n) || E(n)) {
                            var i = o(n.valueOf());
                            this._dimensions.push(i);
                            i = i.size();
                            1 === i.length && 1 === i[0] || (this._isScalar = !1)
                        } else if ("number" == typeof n) this._dimensions.push(o([n])); else {
                            if ("string" != typeof n) throw new TypeError("Dimension must be an Array, Matrix, number, string, or Range");
                            this._dimensions.push(n)
                        }
                    }
                }

                function o(e) {
                    for (var t = 0, r = e.length; t < r; t++) if ("number" != typeof e[t] || !L(e[t])) throw new TypeError("Index parameters must be positive integer numbers");
                    return new n(e)
                }

                return a.prototype.type = "Index", a.prototype.isIndex = !0, a.prototype.clone = function () {
                    var e = new a;
                    return e._dimensions = He(this._dimensions), e._isScalar = this._isScalar, e
                }, a.create = function (e) {
                    var t = new a;
                    return a.apply(t, e), t
                }, a.prototype.size = function () {
                    for (var e = [], t = 0, r = this._dimensions.length; t < r; t++) {
                        var n = this._dimensions[t];
                        e[t] = "string" == typeof n ? 1 : n.size()[0]
                    }
                    return e
                }, a.prototype.max = function () {
                    for (var e = [], t = 0, r = this._dimensions.length; t < r; t++) {
                        var n = this._dimensions[t];
                        e[t] = "string" == typeof n ? n : n.max()
                    }
                    return e
                }, a.prototype.min = function () {
                    for (var e = [], t = 0, r = this._dimensions.length; t < r; t++) {
                        var n = this._dimensions[t];
                        e[t] = "string" == typeof n ? n : n.min()
                    }
                    return e
                }, a.prototype.forEach = function (e) {
                    for (var t = 0, r = this._dimensions.length; t < r; t++) e(this._dimensions[t], t, this)
                }, a.prototype.dimension = function (e) {
                    return this._dimensions[e] || null
                }, a.prototype.isObjectProperty = function () {
                    return 1 === this._dimensions.length && "string" == typeof this._dimensions[0]
                }, a.prototype.getObjectProperty = function () {
                    return this.isObjectProperty() ? this._dimensions[0] : null
                }, a.prototype.isScalar = function () {
                    return this._isScalar
                }, a.prototype.valueOf = a.prototype.toArray = function () {
                    for (var e = [], t = 0, r = this._dimensions.length; t < r; t++) {
                        var n = this._dimensions[t];
                        e.push("string" == typeof n ? n : n.toArray())
                    }
                    return e
                }, a.prototype.toString = function () {
                    for (var e = [], t = 0, r = this._dimensions.length; t < r; t++) {
                        var n = this._dimensions[t];
                        "string" == typeof n ? e.push(JSON.stringify(n)) : e.push(n.toString())
                    }
                    return "[" + e.join(", ") + "]"
                }, a.prototype.toJSON = function () {
                    return {mathjs: "Index", dimensions: this._dimensions}
                }, a.fromJSON = function (e) {
                    return a.create(e.dimensions)
                }, a
            }, {isClass: !0}), ja = Ye("FibonacciHeap", ["smaller", "larger"], function (e) {
                var l = e.smaller, p = e.larger, m = 1 / Math.log((1 + Math.sqrt(5)) / 2);

                function t() {
                    if (!(this instanceof t)) throw new SyntaxError("Constructor must be called with the new operator");
                    this._minimum = null, this._size = 0
                }

                function i(e, t, r) {
                    t.left.right = t.right, t.right.left = t.left, r.degree--, r.child === t && (r.child = t.right), 0 === r.degree && (r.child = null), t.left = e, t.right = e.right, ((e.right = t).right.left = t).parent = null, t.mark = !1
                }

                t.prototype.type = "FibonacciHeap", t.prototype.isFibonacciHeap = !0, t.prototype.insert = function (e, t) {
                    var r = {key: e, value: t, degree: 0};
                    return this._minimum ? (t = this._minimum, r.left = t, r.right = t.right, (t.right = r).right.left = r, l(e, t.key) && (this._minimum = r)) : ((r.left = r).right = r, this._minimum = r), this._size++, r
                }, t.prototype.size = function () {
                    return this._size
                }, t.prototype.clear = function () {
                    this._minimum = null, this._size = 0
                }, t.prototype.isEmpty = function () {
                    return 0 === this._size
                }, t.prototype.extractMinimum = function () {
                    var e = this._minimum;
                    if (null === e) return e;
                    for (var t = this._minimum, r = e.degree, n = e.child; 0 < r;) {
                        var i = n.right;
                        n.left.right = n.right, n.right.left = n.left, n.left = t, n.right = t.right, ((t.right = n).right.left = n).parent = null, n = i, r--
                    }
                    return e.left.right = e.right, e.right.left = e.left, t = e === e.right ? null : function (e, t) {
                        var r = Math.floor(Math.log(t) * m) + 1, n = new Array(r), i = 0;
                        if (s = e) for (i++, s = s.right; s !== e;) i++, s = s.right;
                        for (; 0 < i;) {
                            for (var a, o, s, u = s.degree, c = s.right; o = n[u];) p(s.key, o.key) && (a = o, o = s, s = a), h(o, s), n[u] = null, u++;
                            n[u] = s, s = c, i--
                        }
                        e = null;
                        for (var f = 0; f < r; f++) (o = n[f]) && (e ? (o.left.right = o.right, o.right.left = o.left, o.left = e, o.right = e.right, (e.right = o).right.left = o, l(o.key, e.key) && (e = o)) : e = o);
                        return e
                    }(t = e.right, this._size), this._size--, this._minimum = t, e
                }, t.prototype.remove = function (e) {
                    this._minimum = function (e, t) {
                        t.key = -1;
                        var r = t.parent;
                        return r && l(t.key, r.key) && (i(e, t, r), function e(t, r) {
                            var n = r.parent;
                            n && (r.mark ? (i(t, r, n), e(n)) : r.mark = !0)
                        }(e, r)), l(t.key, e.key) && (e = t), e
                    }(this._minimum, e), this.extractMinimum()
                };
                var h = function (e, t) {
                    e.left.right = e.right, e.right.left = e.left, (e.parent = t).child ? (e.left = t.child, e.right = t.child.right, (t.child.right = e).right.left = e) : ((t.child = e).right = e).left = e, t.degree++, e.mark = !1
                };
                return t
            }, {isClass: !0}), Ua = Ye("Spa", ["addScalar", "equalScalar", "FibonacciHeap"], function (e) {
                var n = e.addScalar, c = e.equalScalar, t = e.FibonacciHeap;

                function r() {
                    if (!(this instanceof r)) throw new SyntaxError("Constructor must be called with the new operator");
                    this._values = [], this._heap = new t
                }

                return r.prototype.type = "Spa", r.prototype.isSpa = !0, r.prototype.set = function (e, t) {
                    this._values[e] ? this._values[e].value = t : (t = this._heap.insert(e, t), this._values[e] = t)
                }, r.prototype.get = function (e) {
                    e = this._values[e];
                    return e ? e.value : 0
                }, r.prototype.accumulate = function (e, t) {
                    var r = this._values[e];
                    r ? r.value = n(r.value, t) : (r = this._heap.insert(e, t), this._values[e] = r)
                }, r.prototype.forEach = function (e, t, r) {
                    var n = this._heap, i = this._values, a = [], o = n.extractMinimum();
                    for (o && a.push(o); o && o.key <= t;) o.key >= e && (c(o.value, 0) || r(o.key, o.value, this)), (o = n.extractMinimum()) && a.push(o);
                    for (var s = 0; s < a.length; s++) {
                        var u = a[s];
                        i[(o = n.insert(u.key, u.value)).key] = o
                    }
                }, r.prototype.swap = function (e, t) {
                    var r = this._values[e], n = this._values[t];
                    !r && n ? (r = this._heap.insert(e, n.value), this._heap.remove(n), this._values[e] = r, this._values[t] = void 0) : r && !n ? (n = this._heap.insert(t, r.value), this._heap.remove(r), this._values[t] = n, this._values[e] = void 0) : r && n && (e = r.value, r.value = n.value, n.value = e)
                }, r
            }, {isClass: !0}), Fa = Hn(function (e) {
                return new e(1).exp()
            }, {hasher: Ga}), La = Hn(function (e) {
                return new e(1).plus(new e(5).sqrt()).div(2)
            }, {hasher: Ga}), Ha = Hn(function (e) {
                return e.acos(-1)
            }, {hasher: Ga}), $a = Hn(function (e) {
                return Ha(e).times(2)
            }, {hasher: Ga});

        function Ga(e) {
            return e[0].precision
        }

        function Va(e) {
            return (Va = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function Za() {
            return (Za = Object.assign || function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r, n = arguments[t];
                    for (r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            }).apply(this, arguments)
        }

        function Wa(t, e) {
            var r, n = Object.keys(t);
            return Object.getOwnPropertySymbols && (r = Object.getOwnPropertySymbols(t), e && (r = r.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            })), n.push.apply(n, r)), n
        }

        function Ja(n) {
            for (var e = 1; e < arguments.length; e++) {
                var i = null != arguments[e] ? arguments[e] : {};
                e % 2 ? Wa(Object(i), !0).forEach(function (e) {
                    var t, r;
                    t = n, e = i[r = e], r in t ? Object.defineProperty(t, r, {
                        value: e,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : t[r] = e
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(i)) : Wa(Object(i)).forEach(function (e) {
                    Object.defineProperty(n, e, Object.getOwnPropertyDescriptor(i, e))
                })
            }
            return n
        }

        var Ya = Ye("Unit", ["?on", "config", "addScalar", "subtract", "multiplyScalar", "divideScalar", "pow", "abs", "fix", "round", "equal", "isNumeric", "format", "number", "Complex", "BigNumber", "Fraction"], function (e) {
            var d, y, M, t = e.on, g = e.config, u = e.addScalar, c = e.subtract, f = e.multiplyScalar,
                l = e.divideScalar, p = e.pow, m = e.abs, h = e.fix, v = e.round, x = e.equal, n = e.isNumeric,
                a = e.format, r = e.number, i = e.Complex, b = e.BigNumber, w = e.Fraction, o = r;

            function S(e, t) {
                if (!(this instanceof S)) throw new Error("Constructor must be called with the new operator");
                if (null != e && !n(e) && !Z(e)) throw new TypeError("First parameter in Unit constructor must be number, BigNumber, Fraction, Complex, or undefined");
                if (void 0 !== t && ("string" != typeof t || "" === t)) throw new TypeError("Second parameter in Unit constructor must be a string");
                if (void 0 !== t) {
                    t = S.parse(t);
                    this.units = t.units, this.dimensions = t.dimensions
                } else {
                    this.units = [{unit: k, prefix: z.NONE, power: 0}], this.dimensions = [];
                    for (var r = 0; r < I.length; r++) this.dimensions[r] = 0
                }
                this.value = null != e ? this._normalize(e) : null, this.fixPrefix = !1, this.skipAutomaticSimplification = !0
            }

            function N() {
                for (; " " === M || "\t" === M;) A()
            }

            function E(e) {
                return "0" <= e && e <= "9"
            }

            function A() {
                y++, M = d.charAt(y)
            }

            function s(e) {
                y = e, M = d.charAt(y)
            }

            function O() {
                var e = "", t = y;
                if ("+" === M ? A() : "-" === M && (e += M, A()), !("0" <= M && M <= "9" || "." === M)) return s(t), null;
                if ("." === M) {
                    if (e += M, A(), !E(M)) return s(t), null
                } else {
                    for (; E(M);) e += M, A();
                    "." === M && (e += M, A())
                }
                for (; E(M);) e += M, A();
                if ("E" === M || "e" === M) {
                    var r = "", t = y;
                    if (r += M, A(), "+" !== M && "-" !== M || (r += M, A()), !E(M)) return s(t), e;
                    for (e += r; E(M);) e += M, A()
                }
                return e
            }

            function C(e) {
                return M === e && (A(), e)
            }

            S.prototype.type = "Unit", S.prototype.isUnit = !0, S.parse = function (e, t) {
                if (t = t || {}, y = -1, M = "", "string" != typeof (d = e)) throw new TypeError("Invalid argument in Unit.parse, string expected");
                var r = new S, n = 1, i = !(r.units = []);
                A(), N();
                var a = O(), o = null;
                if (a) {
                    if ("BigNumber" === g.number) o = new b(a); else if ("Fraction" === g.number) try {
                        o = new w(a)
                    } catch (e) {
                        o = parseFloat(a)
                    } else o = parseFloat(a);
                    N(), C("*") ? (n = 1, i = !0) : C("/") && (n = -1, i = !0)
                }
                for (var s = [], u = 1; ;) {
                    for (N(); "(" === M;) s.push(n), u *= n, n = 1, A(), N();
                    var c;
                    if (!M) break;
                    var f = M;
                    if (null === (c = function () {
                        for (var e = ""; E(M) || S.isValidAlpha(M);) e += M, A();
                        var t = e.charAt(0);
                        return S.isValidAlpha(t) ? e : null
                    }())) throw new SyntaxError('Unexpected "' + f + '" in "' + d + '" at index ' + y.toString());
                    var l = _(c);
                    if (null === l) throw new SyntaxError('Unit "' + c + '" not found.');
                    var p = n * u;
                    if (N(), C("^")) {
                        N();
                        var m = O();
                        if (null === m) throw new SyntaxError('In "' + e + '", "^" must be followed by a floating-point number');
                        p *= m
                    }
                    r.units.push({unit: l.unit, prefix: l.prefix, power: p});
                    for (var h = 0; h < I.length; h++) r.dimensions[h] += (l.unit.dimensions[h] || 0) * p;
                    for (N(); ")" === M;) {
                        if (0 === s.length) throw new SyntaxError('Unmatched ")" in "' + d + '" at index ' + y.toString());
                        u /= s.pop(), A(), N()
                    }
                    i = !1;
                    C("*") ? (n = 1, i = !0) : C("/") ? (n = -1, i = !0) : n = 1, l.unit.base && (m = l.unit.base.key, j.auto[m] = {
                        unit: l.unit,
                        prefix: l.prefix
                    })
                }
                if (N(), M) throw new SyntaxError('Could not parse: "' + e + '"');
                if (i) throw new SyntaxError('Trailing characters: "' + e + '"');
                if (0 !== s.length) throw new SyntaxError('Unmatched "(" in "' + d + '"');
                if (0 === r.units.length && !t.allowNoUnits) throw new SyntaxError('"' + e + '" contains no units');
                return r.value = void 0 !== o ? r._normalize(o) : null, r
            }, S.prototype.clone = function () {
                var e = new S;
                e.fixPrefix = this.fixPrefix, e.skipAutomaticSimplification = this.skipAutomaticSimplification, e.value = He(this.value), e.dimensions = this.dimensions.slice(0), e.units = [];
                for (var t = 0; t < this.units.length; t++) for (var r in e.units[t] = {}, this.units[t]) We(this.units[t], r) && (e.units[t][r] = this.units[t][r]);
                return e
            }, S.prototype._isDerived = function () {
                return 0 !== this.units.length && (1 < this.units.length || 1e-15 < Math.abs(this.units[0].power - 1))
            }, S.prototype._normalize = function (e) {
                var t, r, n, i;
                if (null == e || 0 === this.units.length) return e;
                if (this._isDerived()) {
                    for (var a = e, o = S._getNumberConverter(J(e)), s = 0; s < this.units.length; s++) t = o(this.units[s].unit.value), i = o(this.units[s].prefix.value), n = o(this.units[s].power), a = f(a, p(f(t, i), n));
                    return a
                }
                return t = (o = S._getNumberConverter(J(e)))(this.units[0].unit.value), r = o(this.units[0].unit.offset), i = o(this.units[0].prefix.value), f(u(e, r), f(t, i))
            }, S.prototype._denormalize = function (e, t) {
                var r, n, i, a;
                if (null == e || 0 === this.units.length) return e;
                if (this._isDerived()) {
                    for (var o = e, s = S._getNumberConverter(J(e)), u = 0; u < this.units.length; u++) r = s(this.units[u].unit.value), a = s(this.units[u].prefix.value), i = s(this.units[u].power), o = l(o, p(f(r, a), i));
                    return o
                }
                return r = (s = S._getNumberConverter(J(e)))(this.units[0].unit.value), a = s(this.units[0].prefix.value), n = s(this.units[0].unit.offset), c(l(l(e, r), null == t ? a : t), n)
            };
            var _ = Hn(function (e) {
                if (We(D, e)) {
                    var t = D[e];
                    return {unit: t, prefix: t.prefixes[""]}
                }
                for (var r in D) if (We(D, r) && (n = e, i = r, a = void 0, o = void 0, a = n.length - i.length, o = n.length, n.substring(a, o) === i)) {
                    o = D[r], i = e.length - r.length, i = e.substring(0, i), i = We(o.prefixes, i) ? o.prefixes[i] : void 0;
                    if (void 0 !== i) return {unit: o, prefix: i}
                }
                var n, i, a, o;
                return null
            }, {
                hasher: function (e) {
                    return e[0]
                }, limit: 100
            });

            function T(e) {
                return e.equalBase(B.NONE) && null !== e.value && !g.predictable ? e.value : e
            }

            S.isValuelessUnit = function (e) {
                return null !== _(e)
            }, S.prototype.hasBase = function (e) {
                if ("string" == typeof e && (e = B[e]), !e) return !1;
                for (var t = 0; t < I.length; t++) if (1e-12 < Math.abs((this.dimensions[t] || 0) - (e.dimensions[t] || 0))) return !1;
                return !0
            }, S.prototype.equalBase = function (e) {
                for (var t = 0; t < I.length; t++) if (1e-12 < Math.abs((this.dimensions[t] || 0) - (e.dimensions[t] || 0))) return !1;
                return !0
            }, S.prototype.equals = function (e) {
                return this.equalBase(e) && x(this.value, e.value)
            }, S.prototype.multiply = function (e) {
                for (var t = this.clone(), r = 0; r < I.length; r++) t.dimensions[r] = (this.dimensions[r] || 0) + (e.dimensions[r] || 0);
                for (var n, i, a = 0; a < e.units.length; a++) {
                    var o = Ja({}, e.units[a]);
                    t.units.push(o)
                }
                return null !== this.value || null !== e.value ? (n = null === this.value ? this._normalize(1) : this.value, i = null === e.value ? e._normalize(1) : e.value, t.value = f(n, i)) : t.value = null, t.skipAutomaticSimplification = !1, T(t)
            }, S.prototype.divide = function (e) {
                for (var t = this.clone(), r = 0; r < I.length; r++) t.dimensions[r] = (this.dimensions[r] || 0) - (e.dimensions[r] || 0);
                for (var n, i, a = 0; a < e.units.length; a++) {
                    var o = Ja(Ja({}, e.units[a]), {}, {power: -e.units[a].power});
                    t.units.push(o)
                }
                return null !== this.value || null !== e.value ? (n = null === this.value ? this._normalize(1) : this.value, i = null === e.value ? e._normalize(1) : e.value, t.value = l(n, i)) : t.value = null, t.skipAutomaticSimplification = !1, T(t)
            }, S.prototype.pow = function (e) {
                for (var t = this.clone(), r = 0; r < I.length; r++) t.dimensions[r] = (this.dimensions[r] || 0) * e;
                for (var n = 0; n < t.units.length; n++) t.units[n].power *= e;
                return null !== t.value ? t.value = p(t.value, e) : t.value = null, t.skipAutomaticSimplification = !1, T(t)
            }, S.prototype.abs = function () {
                var e, t = this.clone();
                for (e in t.value = null !== t.value ? m(t.value) : null, t.units) "VA" !== t.units[e].unit.name && "VAR" !== t.units[e].unit.name || (t.units[e].unit = D.W);
                return t
            }, S.prototype.to = function (e) {
                var t, r = null === this.value ? this._normalize(1) : this.value;
                if ("string" == typeof e) {
                    if (t = S.parse(e), !this.equalBase(t)) throw new Error("Units do not match ('".concat(t.toString(), "' != '").concat(this.toString(), "')"));
                    if (null !== t.value) throw new Error("Cannot convert to a unit with a value");
                    return t.value = He(r), t.fixPrefix = !0, t.skipAutomaticSimplification = !0, t
                }
                if (W(e)) {
                    if (!this.equalBase(e)) throw new Error("Units do not match ('".concat(e.toString(), "' != '").concat(this.toString(), "')"));
                    if (null !== e.value) throw new Error("Cannot convert to a unit with a value");
                    return (t = e.clone()).value = He(r), t.fixPrefix = !0, t.skipAutomaticSimplification = !0, t
                }
                throw new Error("String or Unit expected as parameter")
            }, S.prototype.toNumber = function (e) {
                return o(this.toNumeric(e))
            }, S.prototype.toNumeric = function (e) {
                return (e = e ? this.to(e) : this.clone())._isDerived() || 0 === e.units.length ? e._denormalize(e.value) : e._denormalize(e.value, e.units[0].prefix.value)
            }, S.prototype.toString = function () {
                return this.format()
            }, S.prototype.toJSON = function () {
                return {
                    mathjs: "Unit",
                    value: this._denormalize(this.value),
                    unit: this.formatUnits(),
                    fixPrefix: this.fixPrefix
                }
            }, S.fromJSON = function (e) {
                var t = new S(e.value, e.unit);
                return t.fixPrefix = e.fixPrefix || !1, t
            }, S.prototype.valueOf = S.prototype.toString, S.prototype.simplify = function () {
                var e, t, r, n = this.clone(), i = [];
                for (r in H) if (We(H, r) && n.hasBase(B[r])) {
                    e = r;
                    break
                }
                if ("NONE" === e) n.units = []; else if (e && We(H, e) && (t = H[e]), t) n.units = [{
                    unit: t.unit,
                    prefix: t.prefix,
                    power: 1
                }]; else {
                    for (var a = !1, o = 0; o < I.length; o++) {
                        var s = I[o];
                        1e-12 < Math.abs(n.dimensions[o] || 0) && (We(H, s) ? i.push({
                            unit: H[s].unit,
                            prefix: H[s].prefix,
                            power: n.dimensions[o] || 0
                        }) : a = !0)
                    }
                    i.length < n.units.length && !a && (n.units = i)
                }
                return n
            }, S.prototype.toSI = function () {
                for (var e = this.clone(), t = [], r = 0; r < I.length; r++) {
                    var n = I[r];
                    if (1e-12 < Math.abs(e.dimensions[r] || 0)) {
                        if (!We(j.si, n)) throw new Error("Cannot express custom unit " + n + " in SI units");
                        t.push({unit: j.si[n].unit, prefix: j.si[n].prefix, power: e.dimensions[r] || 0})
                    }
                }
                return e.units = t, e.fixPrefix = !0, e.skipAutomaticSimplification = !0, e
            }, S.prototype.formatUnits = function () {
                for (var e = "", t = "", r = 0, n = 0, i = 0; i < this.units.length; i++) 0 < this.units[i].power ? (r++, e += " " + this.units[i].prefix.name + this.units[i].unit.name, 1e-15 < Math.abs(this.units[i].power - 1) && (e += "^" + this.units[i].power)) : this.units[i].power < 0 && n++;
                if (0 < n) for (var a = 0; a < this.units.length; a++) this.units[a].power < 0 && (0 < r ? (t += " " + this.units[a].prefix.name + this.units[a].unit.name, 1e-15 < Math.abs(this.units[a].power + 1) && (t += "^" + -this.units[a].power)) : (t += " " + this.units[a].prefix.name + this.units[a].unit.name, t += "^" + this.units[a].power));
                e = e.substr(1), t = t.substr(1), 1 < r && 0 < n && (e = "(" + e + ")"), 1 < n && 0 < r && (t = "(" + t + ")");
                var o = e;
                return 0 < r && 0 < n && (o += " / "), o + t
            }, S.prototype.format = function (e) {
                var t, r = this.skipAutomaticSimplification || null === this.value ? this.clone() : this.simplify(),
                    n = !1;
                for (t in void 0 !== r.value && null !== r.value && Z(r.value) && (n = Math.abs(r.value.re) < 1e-14), r.units) We(r.units, t) && r.units[t].unit && ("VA" === r.units[t].unit.name && n ? r.units[t].unit = D.VAR : "VAR" !== r.units[t].unit.name || n || (r.units[t].unit = D.VA));
                1 !== r.units.length || r.fixPrefix || Math.abs(r.units[0].power - Math.round(r.units[0].power)) < 1e-14 && (r.units[0].prefix = r._bestPrefix());
                var i = r._denormalize(r.value), i = null !== r.value ? a(i, e || {}) : "", e = r.formatUnits();
                return r.value && Z(r.value) && (i = "(" + i + ")"), 0 < e.length && 0 < i.length && (i += " "), i + e
            }, S.prototype._bestPrefix = function () {
                if (1 !== this.units.length) throw new Error("Can only compute the best prefix for single units with integer powers, like kg, s^2, N^-1, and so forth!");
                if (1e-14 <= Math.abs(this.units[0].power - Math.round(this.units[0].power))) throw new Error("Can only compute the best prefix for single units with integer powers, like kg, s^2, N^-1, and so forth!");
                var e = null !== this.value ? m(this.value) : 0, t = m(this.units[0].unit.value),
                    r = this.units[0].prefix;
                if (0 === e) return r;
                var n = this.units[0].power, i = Math.log(e / Math.pow(r.value * t, n)) / Math.LN10 - 1.2;
                if (-2.200001 < i && i < 1.800001) return r;
                i = Math.abs(i);
                var a, o, s, u = this.units[0].unit.prefixes;
                for (a in u) We(u, a) && (!(o = u[a]).scientific || ((s = Math.abs(Math.log(e / Math.pow(o.value * t, n)) / Math.LN10 - 1.2)) < i || s === i && o.name.length < r.name.length) && (r = o, i = s));
                return r
            };
            var z = {
                NONE: {"": {name: "", value: 1, scientific: !0}},
                SHORT: {
                    "": {name: "", value: 1, scientific: !0},
                    da: {
                        name: "da", value: 10, scientific: !(S.prototype.splitUnit = function (e) {
                            for (var t = this.clone(), r = [], n = 0; n < e.length && (t = t.to(e[n]), n !== e.length - 1); n++) {
                                var i = t.toNumeric(), a = v(i),
                                    a = new S(x(a, i) ? a : h(t.toNumeric()), e[n].toString());
                                r.push(a), t = c(t, a)
                            }
                            for (var o = 0, s = 0; s < r.length; s++) o = u(o, r[s].value);
                            return x(o, this.value) && (t.value = 0), r.push(t), r
                        })
                    },
                    h: {name: "h", value: 100, scientific: !1},
                    k: {name: "k", value: 1e3, scientific: !0},
                    M: {name: "M", value: 1e6, scientific: !0},
                    G: {name: "G", value: 1e9, scientific: !0},
                    T: {name: "T", value: 1e12, scientific: !0},
                    P: {name: "P", value: 1e15, scientific: !0},
                    E: {name: "E", value: 1e18, scientific: !0},
                    Z: {name: "Z", value: 1e21, scientific: !0},
                    Y: {name: "Y", value: 1e24, scientific: !0},
                    d: {name: "d", value: .1, scientific: !1},
                    c: {name: "c", value: .01, scientific: !1},
                    m: {name: "m", value: .001, scientific: !0},
                    u: {name: "u", value: 1e-6, scientific: !0},
                    n: {name: "n", value: 1e-9, scientific: !0},
                    p: {name: "p", value: 1e-12, scientific: !0},
                    f: {name: "f", value: 1e-15, scientific: !0},
                    a: {name: "a", value: 1e-18, scientific: !0},
                    z: {name: "z", value: 1e-21, scientific: !0},
                    y: {name: "y", value: 1e-24, scientific: !0}
                },
                LONG: {
                    "": {name: "", value: 1, scientific: !0},
                    deca: {name: "deca", value: 10, scientific: !1},
                    hecto: {name: "hecto", value: 100, scientific: !1},
                    kilo: {name: "kilo", value: 1e3, scientific: !0},
                    mega: {name: "mega", value: 1e6, scientific: !0},
                    giga: {name: "giga", value: 1e9, scientific: !0},
                    tera: {name: "tera", value: 1e12, scientific: !0},
                    peta: {name: "peta", value: 1e15, scientific: !0},
                    exa: {name: "exa", value: 1e18, scientific: !0},
                    zetta: {name: "zetta", value: 1e21, scientific: !0},
                    yotta: {name: "yotta", value: 1e24, scientific: !0},
                    deci: {name: "deci", value: .1, scientific: !1},
                    centi: {name: "centi", value: .01, scientific: !1},
                    milli: {name: "milli", value: .001, scientific: !0},
                    micro: {name: "micro", value: 1e-6, scientific: !0},
                    nano: {name: "nano", value: 1e-9, scientific: !0},
                    pico: {name: "pico", value: 1e-12, scientific: !0},
                    femto: {name: "femto", value: 1e-15, scientific: !0},
                    atto: {name: "atto", value: 1e-18, scientific: !0},
                    zepto: {name: "zepto", value: 1e-21, scientific: !0},
                    yocto: {name: "yocto", value: 1e-24, scientific: !0}
                },
                SQUARED: {
                    "": {name: "", value: 1, scientific: !0},
                    da: {name: "da", value: 100, scientific: !1},
                    h: {name: "h", value: 1e4, scientific: !1},
                    k: {name: "k", value: 1e6, scientific: !0},
                    M: {name: "M", value: 1e12, scientific: !0},
                    G: {name: "G", value: 1e18, scientific: !0},
                    T: {name: "T", value: 1e24, scientific: !0},
                    P: {name: "P", value: 1e30, scientific: !0},
                    E: {name: "E", value: 1e36, scientific: !0},
                    Z: {name: "Z", value: 1e42, scientific: !0},
                    Y: {name: "Y", value: 1e48, scientific: !0},
                    d: {name: "d", value: .01, scientific: !1},
                    c: {name: "c", value: 1e-4, scientific: !1},
                    m: {name: "m", value: 1e-6, scientific: !0},
                    u: {name: "u", value: 1e-12, scientific: !0},
                    n: {name: "n", value: 1e-18, scientific: !0},
                    p: {name: "p", value: 1e-24, scientific: !0},
                    f: {name: "f", value: 1e-30, scientific: !0},
                    a: {name: "a", value: 1e-36, scientific: !0},
                    z: {name: "z", value: 1e-42, scientific: !0},
                    y: {name: "y", value: 1e-48, scientific: !0}
                },
                CUBIC: {
                    "": {name: "", value: 1, scientific: !0},
                    da: {name: "da", value: 1e3, scientific: !1},
                    h: {name: "h", value: 1e6, scientific: !1},
                    k: {name: "k", value: 1e9, scientific: !0},
                    M: {name: "M", value: 1e18, scientific: !0},
                    G: {name: "G", value: 1e27, scientific: !0},
                    T: {name: "T", value: 1e36, scientific: !0},
                    P: {name: "P", value: 1e45, scientific: !0},
                    E: {name: "E", value: 1e54, scientific: !0},
                    Z: {name: "Z", value: 1e63, scientific: !0},
                    Y: {name: "Y", value: 1e72, scientific: !0},
                    d: {name: "d", value: .001, scientific: !1},
                    c: {name: "c", value: 1e-6, scientific: !1},
                    m: {name: "m", value: 1e-9, scientific: !0},
                    u: {name: "u", value: 1e-18, scientific: !0},
                    n: {name: "n", value: 1e-27, scientific: !0},
                    p: {name: "p", value: 1e-36, scientific: !0},
                    f: {name: "f", value: 1e-45, scientific: !0},
                    a: {name: "a", value: 1e-54, scientific: !0},
                    z: {name: "z", value: 1e-63, scientific: !0},
                    y: {name: "y", value: 1e-72, scientific: !0}
                },
                BINARY_SHORT_SI: {
                    "": {name: "", value: 1, scientific: !0},
                    k: {name: "k", value: 1e3, scientific: !0},
                    M: {name: "M", value: 1e6, scientific: !0},
                    G: {name: "G", value: 1e9, scientific: !0},
                    T: {name: "T", value: 1e12, scientific: !0},
                    P: {name: "P", value: 1e15, scientific: !0},
                    E: {name: "E", value: 1e18, scientific: !0},
                    Z: {name: "Z", value: 1e21, scientific: !0},
                    Y: {name: "Y", value: 1e24, scientific: !0}
                },
                BINARY_SHORT_IEC: {
                    "": {name: "", value: 1, scientific: !0},
                    Ki: {name: "Ki", value: 1024, scientific: !0},
                    Mi: {name: "Mi", value: Math.pow(1024, 2), scientific: !0},
                    Gi: {name: "Gi", value: Math.pow(1024, 3), scientific: !0},
                    Ti: {name: "Ti", value: Math.pow(1024, 4), scientific: !0},
                    Pi: {name: "Pi", value: Math.pow(1024, 5), scientific: !0},
                    Ei: {name: "Ei", value: Math.pow(1024, 6), scientific: !0},
                    Zi: {name: "Zi", value: Math.pow(1024, 7), scientific: !0},
                    Yi: {name: "Yi", value: Math.pow(1024, 8), scientific: !0}
                },
                BINARY_LONG_SI: {
                    "": {name: "", value: 1, scientific: !0},
                    kilo: {name: "kilo", value: 1e3, scientific: !0},
                    mega: {name: "mega", value: 1e6, scientific: !0},
                    giga: {name: "giga", value: 1e9, scientific: !0},
                    tera: {name: "tera", value: 1e12, scientific: !0},
                    peta: {name: "peta", value: 1e15, scientific: !0},
                    exa: {name: "exa", value: 1e18, scientific: !0},
                    zetta: {name: "zetta", value: 1e21, scientific: !0},
                    yotta: {name: "yotta", value: 1e24, scientific: !0}
                },
                BINARY_LONG_IEC: {
                    "": {name: "", value: 1, scientific: !0},
                    kibi: {name: "kibi", value: 1024, scientific: !0},
                    mebi: {name: "mebi", value: Math.pow(1024, 2), scientific: !0},
                    gibi: {name: "gibi", value: Math.pow(1024, 3), scientific: !0},
                    tebi: {name: "tebi", value: Math.pow(1024, 4), scientific: !0},
                    pebi: {name: "pebi", value: Math.pow(1024, 5), scientific: !0},
                    exi: {name: "exi", value: Math.pow(1024, 6), scientific: !0},
                    zebi: {name: "zebi", value: Math.pow(1024, 7), scientific: !0},
                    yobi: {name: "yobi", value: Math.pow(1024, 8), scientific: !0}
                },
                BTU: {"": {name: "", value: 1, scientific: !0}, MM: {name: "MM", value: 1e6, scientific: !0}}
            };
            z.SHORTLONG = Za({}, z.SHORT, z.LONG), z.BINARY_SHORT = Za({}, z.BINARY_SHORT_SI, z.BINARY_SHORT_IEC), z.BINARY_LONG = Za({}, z.BINARY_LONG_SI, z.BINARY_LONG_IEC);
            var q,
                I = ["MASS", "LENGTH", "TIME", "CURRENT", "TEMPERATURE", "LUMINOUS_INTENSITY", "AMOUNT_OF_SUBSTANCE", "ANGLE", "BIT"],
                B = {
                    NONE: {dimensions: [0, 0, 0, 0, 0, 0, 0, 0, 0]},
                    MASS: {dimensions: [1, 0, 0, 0, 0, 0, 0, 0, 0]},
                    LENGTH: {dimensions: [0, 1, 0, 0, 0, 0, 0, 0, 0]},
                    TIME: {dimensions: [0, 0, 1, 0, 0, 0, 0, 0, 0]},
                    CURRENT: {dimensions: [0, 0, 0, 1, 0, 0, 0, 0, 0]},
                    TEMPERATURE: {dimensions: [0, 0, 0, 0, 1, 0, 0, 0, 0]},
                    LUMINOUS_INTENSITY: {dimensions: [0, 0, 0, 0, 0, 1, 0, 0, 0]},
                    AMOUNT_OF_SUBSTANCE: {dimensions: [0, 0, 0, 0, 0, 0, 1, 0, 0]},
                    FORCE: {dimensions: [1, 1, -2, 0, 0, 0, 0, 0, 0]},
                    SURFACE: {dimensions: [0, 2, 0, 0, 0, 0, 0, 0, 0]},
                    VOLUME: {dimensions: [0, 3, 0, 0, 0, 0, 0, 0, 0]},
                    ENERGY: {dimensions: [1, 2, -2, 0, 0, 0, 0, 0, 0]},
                    POWER: {dimensions: [1, 2, -3, 0, 0, 0, 0, 0, 0]},
                    PRESSURE: {dimensions: [1, -1, -2, 0, 0, 0, 0, 0, 0]},
                    ELECTRIC_CHARGE: {dimensions: [0, 0, 1, 1, 0, 0, 0, 0, 0]},
                    ELECTRIC_CAPACITANCE: {dimensions: [-1, -2, 4, 2, 0, 0, 0, 0, 0]},
                    ELECTRIC_POTENTIAL: {dimensions: [1, 2, -3, -1, 0, 0, 0, 0, 0]},
                    ELECTRIC_RESISTANCE: {dimensions: [1, 2, -3, -2, 0, 0, 0, 0, 0]},
                    ELECTRIC_INDUCTANCE: {dimensions: [1, 2, -2, -2, 0, 0, 0, 0, 0]},
                    ELECTRIC_CONDUCTANCE: {dimensions: [-1, -2, 3, 2, 0, 0, 0, 0, 0]},
                    MAGNETIC_FLUX: {dimensions: [1, 2, -2, -1, 0, 0, 0, 0, 0]},
                    MAGNETIC_FLUX_DENSITY: {dimensions: [1, 0, -2, -1, 0, 0, 0, 0, 0]},
                    FREQUENCY: {dimensions: [0, 0, -1, 0, 0, 0, 0, 0, 0]},
                    ANGLE: {dimensions: [0, 0, 0, 0, 0, 0, 0, 1, 0]},
                    BIT: {dimensions: [0, 0, 0, 0, 0, 0, 0, 0, 1]}
                };
            for (q in B) We(B, q) && (B[q].key = q);
            var k = {
                name: "", base: {}, value: 1, offset: 0, dimensions: I.map(function (e) {
                    return 0
                })
            }, D = {
                meter: {name: "meter", base: B.LENGTH, prefixes: z.LONG, value: 1, offset: 0},
                inch: {name: "inch", base: B.LENGTH, prefixes: z.NONE, value: .0254, offset: 0},
                foot: {name: "foot", base: B.LENGTH, prefixes: z.NONE, value: .3048, offset: 0},
                yard: {name: "yard", base: B.LENGTH, prefixes: z.NONE, value: .9144, offset: 0},
                mile: {name: "mile", base: B.LENGTH, prefixes: z.NONE, value: 1609.344, offset: 0},
                link: {name: "link", base: B.LENGTH, prefixes: z.NONE, value: .201168, offset: 0},
                rod: {name: "rod", base: B.LENGTH, prefixes: z.NONE, value: 5.0292, offset: 0},
                chain: {name: "chain", base: B.LENGTH, prefixes: z.NONE, value: 20.1168, offset: 0},
                angstrom: {name: "angstrom", base: B.LENGTH, prefixes: z.NONE, value: 1e-10, offset: 0},
                m: {name: "m", base: B.LENGTH, prefixes: z.SHORT, value: 1, offset: 0},
                in: {name: "in", base: B.LENGTH, prefixes: z.NONE, value: .0254, offset: 0},
                ft: {name: "ft", base: B.LENGTH, prefixes: z.NONE, value: .3048, offset: 0},
                yd: {name: "yd", base: B.LENGTH, prefixes: z.NONE, value: .9144, offset: 0},
                mi: {name: "mi", base: B.LENGTH, prefixes: z.NONE, value: 1609.344, offset: 0},
                li: {name: "li", base: B.LENGTH, prefixes: z.NONE, value: .201168, offset: 0},
                rd: {name: "rd", base: B.LENGTH, prefixes: z.NONE, value: 5.02921, offset: 0},
                ch: {name: "ch", base: B.LENGTH, prefixes: z.NONE, value: 20.1168, offset: 0},
                mil: {name: "mil", base: B.LENGTH, prefixes: z.NONE, value: 254e-7, offset: 0},
                m2: {name: "m2", base: B.SURFACE, prefixes: z.SQUARED, value: 1, offset: 0},
                sqin: {name: "sqin", base: B.SURFACE, prefixes: z.NONE, value: 64516e-8, offset: 0},
                sqft: {name: "sqft", base: B.SURFACE, prefixes: z.NONE, value: .09290304, offset: 0},
                sqyd: {name: "sqyd", base: B.SURFACE, prefixes: z.NONE, value: .83612736, offset: 0},
                sqmi: {name: "sqmi", base: B.SURFACE, prefixes: z.NONE, value: 2589988.110336, offset: 0},
                sqrd: {name: "sqrd", base: B.SURFACE, prefixes: z.NONE, value: 25.29295, offset: 0},
                sqch: {name: "sqch", base: B.SURFACE, prefixes: z.NONE, value: 404.6873, offset: 0},
                sqmil: {name: "sqmil", base: B.SURFACE, prefixes: z.NONE, value: 6.4516e-10, offset: 0},
                acre: {name: "acre", base: B.SURFACE, prefixes: z.NONE, value: 4046.86, offset: 0},
                hectare: {name: "hectare", base: B.SURFACE, prefixes: z.NONE, value: 1e4, offset: 0},
                m3: {name: "m3", base: B.VOLUME, prefixes: z.CUBIC, value: 1, offset: 0},
                L: {name: "L", base: B.VOLUME, prefixes: z.SHORT, value: .001, offset: 0},
                l: {name: "l", base: B.VOLUME, prefixes: z.SHORT, value: .001, offset: 0},
                litre: {name: "litre", base: B.VOLUME, prefixes: z.LONG, value: .001, offset: 0},
                cuin: {name: "cuin", base: B.VOLUME, prefixes: z.NONE, value: 16387064e-12, offset: 0},
                cuft: {name: "cuft", base: B.VOLUME, prefixes: z.NONE, value: .028316846592, offset: 0},
                cuyd: {name: "cuyd", base: B.VOLUME, prefixes: z.NONE, value: .764554857984, offset: 0},
                teaspoon: {name: "teaspoon", base: B.VOLUME, prefixes: z.NONE, value: 5e-6, offset: 0},
                tablespoon: {name: "tablespoon", base: B.VOLUME, prefixes: z.NONE, value: 15e-6, offset: 0},
                drop: {name: "drop", base: B.VOLUME, prefixes: z.NONE, value: 5e-8, offset: 0},
                gtt: {name: "gtt", base: B.VOLUME, prefixes: z.NONE, value: 5e-8, offset: 0},
                minim: {name: "minim", base: B.VOLUME, prefixes: z.NONE, value: 6.161152e-8, offset: 0},
                fluiddram: {name: "fluiddram", base: B.VOLUME, prefixes: z.NONE, value: 36966911e-13, offset: 0},
                fluidounce: {name: "fluidounce", base: B.VOLUME, prefixes: z.NONE, value: 2957353e-11, offset: 0},
                gill: {name: "gill", base: B.VOLUME, prefixes: z.NONE, value: .0001182941, offset: 0},
                cc: {name: "cc", base: B.VOLUME, prefixes: z.NONE, value: 1e-6, offset: 0},
                cup: {name: "cup", base: B.VOLUME, prefixes: z.NONE, value: .0002365882, offset: 0},
                pint: {name: "pint", base: B.VOLUME, prefixes: z.NONE, value: .0004731765, offset: 0},
                quart: {name: "quart", base: B.VOLUME, prefixes: z.NONE, value: .0009463529, offset: 0},
                gallon: {name: "gallon", base: B.VOLUME, prefixes: z.NONE, value: .003785412, offset: 0},
                beerbarrel: {name: "beerbarrel", base: B.VOLUME, prefixes: z.NONE, value: .1173478, offset: 0},
                oilbarrel: {name: "oilbarrel", base: B.VOLUME, prefixes: z.NONE, value: .1589873, offset: 0},
                hogshead: {name: "hogshead", base: B.VOLUME, prefixes: z.NONE, value: .238481, offset: 0},
                fldr: {name: "fldr", base: B.VOLUME, prefixes: z.NONE, value: 36966911e-13, offset: 0},
                floz: {name: "floz", base: B.VOLUME, prefixes: z.NONE, value: 2957353e-11, offset: 0},
                gi: {name: "gi", base: B.VOLUME, prefixes: z.NONE, value: .0001182941, offset: 0},
                cp: {name: "cp", base: B.VOLUME, prefixes: z.NONE, value: .0002365882, offset: 0},
                pt: {name: "pt", base: B.VOLUME, prefixes: z.NONE, value: .0004731765, offset: 0},
                qt: {name: "qt", base: B.VOLUME, prefixes: z.NONE, value: .0009463529, offset: 0},
                gal: {name: "gal", base: B.VOLUME, prefixes: z.NONE, value: .003785412, offset: 0},
                bbl: {name: "bbl", base: B.VOLUME, prefixes: z.NONE, value: .1173478, offset: 0},
                obl: {name: "obl", base: B.VOLUME, prefixes: z.NONE, value: .1589873, offset: 0},
                g: {name: "g", base: B.MASS, prefixes: z.SHORT, value: .001, offset: 0},
                gram: {name: "gram", base: B.MASS, prefixes: z.LONG, value: .001, offset: 0},
                ton: {name: "ton", base: B.MASS, prefixes: z.SHORT, value: 907.18474, offset: 0},
                t: {name: "t", base: B.MASS, prefixes: z.SHORT, value: 1e3, offset: 0},
                tonne: {name: "tonne", base: B.MASS, prefixes: z.LONG, value: 1e3, offset: 0},
                grain: {name: "grain", base: B.MASS, prefixes: z.NONE, value: 6479891e-11, offset: 0},
                dram: {name: "dram", base: B.MASS, prefixes: z.NONE, value: .0017718451953125, offset: 0},
                ounce: {name: "ounce", base: B.MASS, prefixes: z.NONE, value: .028349523125, offset: 0},
                poundmass: {name: "poundmass", base: B.MASS, prefixes: z.NONE, value: .45359237, offset: 0},
                hundredweight: {name: "hundredweight", base: B.MASS, prefixes: z.NONE, value: 45.359237, offset: 0},
                stick: {name: "stick", base: B.MASS, prefixes: z.NONE, value: .115, offset: 0},
                stone: {name: "stone", base: B.MASS, prefixes: z.NONE, value: 6.35029318, offset: 0},
                gr: {name: "gr", base: B.MASS, prefixes: z.NONE, value: 6479891e-11, offset: 0},
                dr: {name: "dr", base: B.MASS, prefixes: z.NONE, value: .0017718451953125, offset: 0},
                oz: {name: "oz", base: B.MASS, prefixes: z.NONE, value: .028349523125, offset: 0},
                lbm: {name: "lbm", base: B.MASS, prefixes: z.NONE, value: .45359237, offset: 0},
                cwt: {name: "cwt", base: B.MASS, prefixes: z.NONE, value: 45.359237, offset: 0},
                s: {name: "s", base: B.TIME, prefixes: z.SHORT, value: 1, offset: 0},
                min: {name: "min", base: B.TIME, prefixes: z.NONE, value: 60, offset: 0},
                h: {name: "h", base: B.TIME, prefixes: z.NONE, value: 3600, offset: 0},
                second: {name: "second", base: B.TIME, prefixes: z.LONG, value: 1, offset: 0},
                sec: {name: "sec", base: B.TIME, prefixes: z.LONG, value: 1, offset: 0},
                minute: {name: "minute", base: B.TIME, prefixes: z.NONE, value: 60, offset: 0},
                hour: {name: "hour", base: B.TIME, prefixes: z.NONE, value: 3600, offset: 0},
                day: {name: "day", base: B.TIME, prefixes: z.NONE, value: 86400, offset: 0},
                week: {name: "week", base: B.TIME, prefixes: z.NONE, value: 604800, offset: 0},
                month: {name: "month", base: B.TIME, prefixes: z.NONE, value: 2629800, offset: 0},
                year: {name: "year", base: B.TIME, prefixes: z.NONE, value: 31557600, offset: 0},
                decade: {name: "decade", base: B.TIME, prefixes: z.NONE, value: 315576e3, offset: 0},
                century: {name: "century", base: B.TIME, prefixes: z.NONE, value: 315576e4, offset: 0},
                millennium: {name: "millennium", base: B.TIME, prefixes: z.NONE, value: 315576e5, offset: 0},
                hertz: {name: "Hertz", base: B.FREQUENCY, prefixes: z.LONG, value: 1, offset: 0, reciprocal: !0},
                Hz: {name: "Hz", base: B.FREQUENCY, prefixes: z.SHORT, value: 1, offset: 0, reciprocal: !0},
                rad: {name: "rad", base: B.ANGLE, prefixes: z.SHORT, value: 1, offset: 0},
                radian: {name: "radian", base: B.ANGLE, prefixes: z.LONG, value: 1, offset: 0},
                deg: {name: "deg", base: B.ANGLE, prefixes: z.SHORT, value: null, offset: 0},
                degree: {name: "degree", base: B.ANGLE, prefixes: z.LONG, value: null, offset: 0},
                grad: {name: "grad", base: B.ANGLE, prefixes: z.SHORT, value: null, offset: 0},
                gradian: {name: "gradian", base: B.ANGLE, prefixes: z.LONG, value: null, offset: 0},
                cycle: {name: "cycle", base: B.ANGLE, prefixes: z.NONE, value: null, offset: 0},
                arcsec: {name: "arcsec", base: B.ANGLE, prefixes: z.NONE, value: null, offset: 0},
                arcmin: {name: "arcmin", base: B.ANGLE, prefixes: z.NONE, value: null, offset: 0},
                A: {name: "A", base: B.CURRENT, prefixes: z.SHORT, value: 1, offset: 0},
                ampere: {name: "ampere", base: B.CURRENT, prefixes: z.LONG, value: 1, offset: 0},
                K: {name: "K", base: B.TEMPERATURE, prefixes: z.NONE, value: 1, offset: 0},
                degC: {name: "degC", base: B.TEMPERATURE, prefixes: z.NONE, value: 1, offset: 273.15},
                degF: {name: "degF", base: B.TEMPERATURE, prefixes: z.NONE, value: 1 / 1.8, offset: 459.67},
                degR: {name: "degR", base: B.TEMPERATURE, prefixes: z.NONE, value: 1 / 1.8, offset: 0},
                kelvin: {name: "kelvin", base: B.TEMPERATURE, prefixes: z.NONE, value: 1, offset: 0},
                celsius: {name: "celsius", base: B.TEMPERATURE, prefixes: z.NONE, value: 1, offset: 273.15},
                fahrenheit: {name: "fahrenheit", base: B.TEMPERATURE, prefixes: z.NONE, value: 1 / 1.8, offset: 459.67},
                rankine: {name: "rankine", base: B.TEMPERATURE, prefixes: z.NONE, value: 1 / 1.8, offset: 0},
                mol: {name: "mol", base: B.AMOUNT_OF_SUBSTANCE, prefixes: z.SHORT, value: 1, offset: 0},
                mole: {name: "mole", base: B.AMOUNT_OF_SUBSTANCE, prefixes: z.LONG, value: 1, offset: 0},
                cd: {name: "cd", base: B.LUMINOUS_INTENSITY, prefixes: z.SHORT, value: 1, offset: 0},
                candela: {name: "candela", base: B.LUMINOUS_INTENSITY, prefixes: z.LONG, value: 1, offset: 0},
                N: {name: "N", base: B.FORCE, prefixes: z.SHORT, value: 1, offset: 0},
                newton: {name: "newton", base: B.FORCE, prefixes: z.LONG, value: 1, offset: 0},
                dyn: {name: "dyn", base: B.FORCE, prefixes: z.SHORT, value: 1e-5, offset: 0},
                dyne: {name: "dyne", base: B.FORCE, prefixes: z.LONG, value: 1e-5, offset: 0},
                lbf: {name: "lbf", base: B.FORCE, prefixes: z.NONE, value: 4.4482216152605, offset: 0},
                poundforce: {name: "poundforce", base: B.FORCE, prefixes: z.NONE, value: 4.4482216152605, offset: 0},
                kip: {name: "kip", base: B.FORCE, prefixes: z.LONG, value: 4448.2216, offset: 0},
                kilogramforce: {name: "kilogramforce", base: B.FORCE, prefixes: z.NONE, value: 9.80665, offset: 0},
                J: {name: "J", base: B.ENERGY, prefixes: z.SHORT, value: 1, offset: 0},
                joule: {name: "joule", base: B.ENERGY, prefixes: z.SHORT, value: 1, offset: 0},
                erg: {name: "erg", base: B.ENERGY, prefixes: z.NONE, value: 1e-7, offset: 0},
                Wh: {name: "Wh", base: B.ENERGY, prefixes: z.SHORT, value: 3600, offset: 0},
                BTU: {name: "BTU", base: B.ENERGY, prefixes: z.BTU, value: 1055.05585262, offset: 0},
                eV: {name: "eV", base: B.ENERGY, prefixes: z.SHORT, value: 1602176565e-28, offset: 0},
                electronvolt: {
                    name: "electronvolt",
                    base: B.ENERGY,
                    prefixes: z.LONG,
                    value: 1602176565e-28,
                    offset: 0
                },
                W: {name: "W", base: B.POWER, prefixes: z.SHORT, value: 1, offset: 0},
                watt: {name: "watt", base: B.POWER, prefixes: z.LONG, value: 1, offset: 0},
                hp: {name: "hp", base: B.POWER, prefixes: z.NONE, value: 745.6998715386, offset: 0},
                VAR: {name: "VAR", base: B.POWER, prefixes: z.SHORT, value: i.I, offset: 0},
                VA: {name: "VA", base: B.POWER, prefixes: z.SHORT, value: 1, offset: 0},
                Pa: {name: "Pa", base: B.PRESSURE, prefixes: z.SHORT, value: 1, offset: 0},
                psi: {name: "psi", base: B.PRESSURE, prefixes: z.NONE, value: 6894.75729276459, offset: 0},
                atm: {name: "atm", base: B.PRESSURE, prefixes: z.NONE, value: 101325, offset: 0},
                bar: {name: "bar", base: B.PRESSURE, prefixes: z.SHORTLONG, value: 1e5, offset: 0},
                torr: {name: "torr", base: B.PRESSURE, prefixes: z.NONE, value: 133.322, offset: 0},
                mmHg: {name: "mmHg", base: B.PRESSURE, prefixes: z.NONE, value: 133.322, offset: 0},
                mmH2O: {name: "mmH2O", base: B.PRESSURE, prefixes: z.NONE, value: 9.80665, offset: 0},
                cmH2O: {name: "cmH2O", base: B.PRESSURE, prefixes: z.NONE, value: 98.0665, offset: 0},
                coulomb: {name: "coulomb", base: B.ELECTRIC_CHARGE, prefixes: z.LONG, value: 1, offset: 0},
                C: {name: "C", base: B.ELECTRIC_CHARGE, prefixes: z.SHORT, value: 1, offset: 0},
                farad: {name: "farad", base: B.ELECTRIC_CAPACITANCE, prefixes: z.LONG, value: 1, offset: 0},
                F: {name: "F", base: B.ELECTRIC_CAPACITANCE, prefixes: z.SHORT, value: 1, offset: 0},
                volt: {name: "volt", base: B.ELECTRIC_POTENTIAL, prefixes: z.LONG, value: 1, offset: 0},
                V: {name: "V", base: B.ELECTRIC_POTENTIAL, prefixes: z.SHORT, value: 1, offset: 0},
                ohm: {name: "ohm", base: B.ELECTRIC_RESISTANCE, prefixes: z.SHORTLONG, value: 1, offset: 0},
                henry: {name: "henry", base: B.ELECTRIC_INDUCTANCE, prefixes: z.LONG, value: 1, offset: 0},
                H: {name: "H", base: B.ELECTRIC_INDUCTANCE, prefixes: z.SHORT, value: 1, offset: 0},
                siemens: {name: "siemens", base: B.ELECTRIC_CONDUCTANCE, prefixes: z.LONG, value: 1, offset: 0},
                S: {name: "S", base: B.ELECTRIC_CONDUCTANCE, prefixes: z.SHORT, value: 1, offset: 0},
                weber: {name: "weber", base: B.MAGNETIC_FLUX, prefixes: z.LONG, value: 1, offset: 0},
                Wb: {name: "Wb", base: B.MAGNETIC_FLUX, prefixes: z.SHORT, value: 1, offset: 0},
                tesla: {name: "tesla", base: B.MAGNETIC_FLUX_DENSITY, prefixes: z.LONG, value: 1, offset: 0},
                T: {name: "T", base: B.MAGNETIC_FLUX_DENSITY, prefixes: z.SHORT, value: 1, offset: 0},
                b: {name: "b", base: B.BIT, prefixes: z.BINARY_SHORT, value: 1, offset: 0},
                bits: {name: "bits", base: B.BIT, prefixes: z.BINARY_LONG, value: 1, offset: 0},
                B: {name: "B", base: B.BIT, prefixes: z.BINARY_SHORT, value: 8, offset: 0},
                bytes: {name: "bytes", base: B.BIT, prefixes: z.BINARY_LONG, value: 8, offset: 0}
            }, R = {
                meters: "meter",
                inches: "inch",
                feet: "foot",
                yards: "yard",
                miles: "mile",
                links: "link",
                rods: "rod",
                chains: "chain",
                angstroms: "angstrom",
                lt: "l",
                litres: "litre",
                liter: "litre",
                liters: "litre",
                teaspoons: "teaspoon",
                tablespoons: "tablespoon",
                minims: "minim",
                fluiddrams: "fluiddram",
                fluidounces: "fluidounce",
                gills: "gill",
                cups: "cup",
                pints: "pint",
                quarts: "quart",
                gallons: "gallon",
                beerbarrels: "beerbarrel",
                oilbarrels: "oilbarrel",
                hogsheads: "hogshead",
                gtts: "gtt",
                grams: "gram",
                tons: "ton",
                tonnes: "tonne",
                grains: "grain",
                drams: "dram",
                ounces: "ounce",
                poundmasses: "poundmass",
                hundredweights: "hundredweight",
                sticks: "stick",
                lb: "lbm",
                lbs: "lbm",
                kips: "kip",
                kgf: "kilogramforce",
                acres: "acre",
                hectares: "hectare",
                sqfeet: "sqft",
                sqyard: "sqyd",
                sqmile: "sqmi",
                sqmiles: "sqmi",
                mmhg: "mmHg",
                mmh2o: "mmH2O",
                cmh2o: "cmH2O",
                seconds: "second",
                secs: "second",
                minutes: "minute",
                mins: "minute",
                hours: "hour",
                hr: "hour",
                hrs: "hour",
                days: "day",
                weeks: "week",
                months: "month",
                years: "year",
                decades: "decade",
                centuries: "century",
                millennia: "millennium",
                hertz: "hertz",
                radians: "radian",
                degrees: "degree",
                gradians: "gradian",
                cycles: "cycle",
                arcsecond: "arcsec",
                arcseconds: "arcsec",
                arcminute: "arcmin",
                arcminutes: "arcmin",
                BTUs: "BTU",
                watts: "watt",
                joules: "joule",
                amperes: "ampere",
                coulombs: "coulomb",
                volts: "volt",
                ohms: "ohm",
                farads: "farad",
                webers: "weber",
                teslas: "tesla",
                electronvolts: "electronvolt",
                moles: "mole",
                bit: "bits",
                byte: "bytes"
            };

            function P(e) {
                "BigNumber" === e.number ? (e = Ha(b), D.rad.value = new b(1), D.deg.value = e.div(180), D.grad.value = e.div(200), D.cycle.value = e.times(2), D.arcsec.value = e.div(648e3), D.arcmin.value = e.div(10800)) : (D.rad.value = 1, D.deg.value = Math.PI / 180, D.grad.value = Math.PI / 200, D.cycle.value = 2 * Math.PI, D.arcsec.value = Math.PI / 648e3, D.arcmin.value = Math.PI / 10800), D.radian.value = D.rad.value, D.degree.value = D.deg.value, D.gradian.value = D.grad.value
            }

            P(g), t && t("config", function (e, t) {
                e.number !== t.number && P(e)
            });
            var j = {
                si: {
                    NONE: {unit: k, prefix: z.NONE[""]},
                    LENGTH: {unit: D.m, prefix: z.SHORT[""]},
                    MASS: {unit: D.g, prefix: z.SHORT.k},
                    TIME: {unit: D.s, prefix: z.SHORT[""]},
                    CURRENT: {unit: D.A, prefix: z.SHORT[""]},
                    TEMPERATURE: {unit: D.K, prefix: z.SHORT[""]},
                    LUMINOUS_INTENSITY: {unit: D.cd, prefix: z.SHORT[""]},
                    AMOUNT_OF_SUBSTANCE: {unit: D.mol, prefix: z.SHORT[""]},
                    ANGLE: {unit: D.rad, prefix: z.SHORT[""]},
                    BIT: {unit: D.bits, prefix: z.SHORT[""]},
                    FORCE: {unit: D.N, prefix: z.SHORT[""]},
                    ENERGY: {unit: D.J, prefix: z.SHORT[""]},
                    POWER: {unit: D.W, prefix: z.SHORT[""]},
                    PRESSURE: {unit: D.Pa, prefix: z.SHORT[""]},
                    ELECTRIC_CHARGE: {unit: D.C, prefix: z.SHORT[""]},
                    ELECTRIC_CAPACITANCE: {unit: D.F, prefix: z.SHORT[""]},
                    ELECTRIC_POTENTIAL: {unit: D.V, prefix: z.SHORT[""]},
                    ELECTRIC_RESISTANCE: {unit: D.ohm, prefix: z.SHORT[""]},
                    ELECTRIC_INDUCTANCE: {unit: D.H, prefix: z.SHORT[""]},
                    ELECTRIC_CONDUCTANCE: {unit: D.S, prefix: z.SHORT[""]},
                    MAGNETIC_FLUX: {unit: D.Wb, prefix: z.SHORT[""]},
                    MAGNETIC_FLUX_DENSITY: {unit: D.T, prefix: z.SHORT[""]},
                    FREQUENCY: {unit: D.Hz, prefix: z.SHORT[""]}
                }
            };
            j.cgs = JSON.parse(JSON.stringify(j.si)), j.cgs.LENGTH = {
                unit: D.m,
                prefix: z.SHORT.c
            }, j.cgs.MASS = {unit: D.g, prefix: z.SHORT[""]}, j.cgs.FORCE = {
                unit: D.dyn,
                prefix: z.SHORT[""]
            }, j.cgs.ENERGY = {
                unit: D.erg,
                prefix: z.NONE[""]
            }, j.us = JSON.parse(JSON.stringify(j.si)), j.us.LENGTH = {
                unit: D.ft,
                prefix: z.NONE[""]
            }, j.us.MASS = {unit: D.lbm, prefix: z.NONE[""]}, j.us.TEMPERATURE = {
                unit: D.degF,
                prefix: z.NONE[""]
            }, j.us.FORCE = {unit: D.lbf, prefix: z.NONE[""]}, j.us.ENERGY = {
                unit: D.BTU,
                prefix: z.BTU[""]
            }, j.us.POWER = {unit: D.hp, prefix: z.NONE[""]}, j.us.PRESSURE = {
                unit: D.psi,
                prefix: z.NONE[""]
            }, j.auto = JSON.parse(JSON.stringify(j.si));
            var U, F, L, H = j.auto;
            for (U in S.setUnitSystem = function (e) {
                if (!We(j, e)) throw new Error("Unit system " + e + " does not exist. Choices are: " + Object.keys(j).join(", "));
                H = j[e]
            }, S.getUnitSystem = function () {
                for (var e in j) if (We(j, e) && j[e] === H) return e
            }, S.typeConverters = {
                BigNumber: function (e) {
                    return new b(e + "")
                }, Fraction: function (e) {
                    return new w(e)
                }, Complex: function (e) {
                    return e
                }, number: function (e) {
                    return e
                }
            }, S._getNumberConverter = function (e) {
                if (!S.typeConverters[e]) throw new TypeError('Unsupported type "' + e + '"');
                return S.typeConverters[e]
            }, D) We(D, U) && ((F = D[U]).dimensions = F.base.dimensions);
            for (L in R) if (We(R, L)) {
                var $, G = D[R[L]], V = {};
                for ($ in G) We(G, $) && (V[$] = G[$]);
                V.name = L, D[L] = V
            }
            return S.isValidAlpha = function (e) {
                return /^[a-zA-Z]$/.test(e)
            }, S.createUnit = function (e, t) {
                if ("object" !== Va(e)) throw new TypeError("createUnit expects first parameter to be of type 'Object'");
                if (t && t.override) for (var r in e) if (We(e, r) && S.deleteUnit(r), e[r].aliases) for (var n = 0; n < e[r].aliases.length; n++) S.deleteUnit(e[r].aliases[n]);
                var i, a;
                for (a in e) We(e, a) && (i = S.createUnitSingle(a, e[a]));
                return i
            }, S.createUnitSingle = function (e, t, r) {
                if (null == t && (t = {}), "string" != typeof e) throw new TypeError("createUnitSingle expects first parameter to be of type 'string'");
                if (We(D, e)) throw new Error('Cannot create unit "' + e + '": a unit with that name already exists');
                !function (e) {
                    for (var t = 0; t < e.length; t++) {
                        if (M = e.charAt(t), 0 === t && !S.isValidAlpha(M)) throw new Error('Invalid unit name (must begin with alpha character): "' + e + '"');
                        if (0 < t && !S.isValidAlpha(M) && !E(M)) throw new Error('Invalid unit name (only alphanumeric characters are allowed): "' + e + '"')
                    }
                }(e);
                var n, i, a, o = null, s = [], u = 0;
                if (t && "Unit" === t.type) o = t.clone(); else if ("string" == typeof t) "" !== t && (n = t); else {
                    if ("object" !== Va(t)) throw new TypeError('Cannot create unit "' + e + '" from "' + t.toString() + '": expecting "string" or "Unit" or "Object"');
                    n = t.definition, i = t.prefixes, u = t.offset, a = t.baseName, t.aliases && (s = t.aliases.valueOf())
                }
                if (s) for (var c = 0; c < s.length; c++) if (We(D, s[c])) throw new Error('Cannot create alias "' + s[c] + '": a unit with that name already exists');
                if (n && "string" == typeof n && !o) try {
                    o = S.parse(n, {allowNoUnits: !0})
                } catch (t) {
                    throw t.message = 'Could not create unit "' + e + '" from "' + n + '": ' + t.message, t
                } else n && "Unit" === n.type && (o = n.clone());
                s = s || [], u = u || 0, i = i && i.toUpperCase && z[i.toUpperCase()] || z.NONE;
                var f = {};
                if (o) {
                    var l, p,
                        m = !(f = {name: e, value: o.value, dimensions: o.dimensions.slice(0), prefixes: i, offset: u});
                    for (l in B) if (We(B, l)) {
                        for (var h = !0, d = 0; d < I.length; d++) if (1e-12 < Math.abs((f.dimensions[d] || 0) - (B[l].dimensions[d] || 0))) {
                            h = !1;
                            break
                        }
                        if (h) {
                            m = !0, f.base = B[l];
                            break
                        }
                    }
                    m || (a = a || e + "_STUFF", (p = {dimensions: o.dimensions.slice(0)}).key = a, B[a] = p, H[a] = {
                        unit: f,
                        prefix: z.NONE[""]
                    }, f.base = B[a])
                } else {
                    if (a = a || e + "_STUFF", 0 <= I.indexOf(a)) throw new Error('Cannot create new base unit "' + e + '": a base unit with that name already exists (and cannot be overridden)');
                    for (var y in I.push(a), B) We(B, y) && (B[y].dimensions[I.length - 1] = 0);
                    for (var g = {dimensions: []}, v = 0; v < I.length; v++) g.dimensions[v] = 0;
                    g.dimensions[I.length - 1] = 1, g.key = a, B[a] = g, f = {
                        name: e,
                        value: 1,
                        dimensions: B[a].dimensions.slice(0),
                        prefixes: i,
                        offset: u,
                        base: B[a]
                    }, H[a] = {unit: f, prefix: z.NONE[""]}
                }
                S.UNITS[e] = f;
                for (var x = 0; x < s.length; x++) {
                    var b, w = s[x], N = {};
                    for (b in f) We(f, b) && (N[b] = f[b]);
                    N.name = w, S.UNITS[w] = N
                }
                return delete _.cache, new S(null, e)
            }, S.deleteUnit = function (e) {
                delete S.UNITS[e]
            }, S.PREFIXES = z, S.BASE_DIMENSIONS = I, S.BASE_UNITS = B, S.UNIT_SYSTEMS = j, S.UNITS = D, S
        }, {isClass: !0}), Xa = Ye("unit", ["typed", "Unit"], function (e) {
            var t = e.typed, r = e.Unit;
            return t("unit", {
                Unit: function (e) {
                    return e.clone()
                }, string: function (e) {
                    return r.isValuelessUnit(e) ? new r(null, e) : r.parse(e, {allowNoUnits: !0})
                }, "number | BigNumber | Fraction | Complex, string": function (e, t) {
                    return new r(e, t)
                }, "Array | Matrix": function (e) {
                    return xt(e, this)
                }
            })
        }), Qa = Ye("sparse", ["typed", "SparseMatrix"], function (e) {
            var t = e.typed, r = e.SparseMatrix;
            return t("sparse", {
                "": function () {
                    return new r([])
                }, string: function (e) {
                    return new r([], e)
                }, "Array | Matrix": function (e) {
                    return new r(e)
                }, "Array | Matrix, string": function (e, t) {
                    return new r(e, t)
                }
            })
        }), Ka = Ye("createUnit", ["typed", "Unit"], function (e) {
            var t = e.typed, i = e.Unit;
            return t("createUnit", {
                "Object, Object": function (e, t) {
                    return i.createUnit(e, t)
                }, Object: function (e) {
                    return i.createUnit(e, {})
                }, "string, Unit | string | Object, Object": function (e, t, r) {
                    var n = {};
                    return n[e] = t, i.createUnit(n, r)
                }, "string, Unit | string | Object": function (e, t) {
                    var r = {};
                    return r[e] = t, i.createUnit(r, {})
                }, string: function (e) {
                    var t = {};
                    return t[e] = {}, i.createUnit(t, {})
                }
            })
        }), eo = Ye("acos", ["typed", "config", "Complex"], function (e) {
            var t = e.typed, r = e.config, n = e.Complex;
            return t("acos", {
                number: function (e) {
                    return -1 <= e && e <= 1 || r.predictable ? Math.acos(e) : new n(e, 0).acos()
                }, Complex: function (e) {
                    return e.acos()
                }, BigNumber: function (e) {
                    return e.acos()
                }, "Array | Matrix": function (e) {
                    return xt(e, this)
                }
            })
        });

        function to(e) {
            return ne(e)
        }

        function ro(e) {
            return Math.atan(1 / e)
        }

        function no(e) {
            return isFinite(e) ? (Math.log((e + 1) / e) + Math.log(e / (e - 1))) / 2 : 0
        }

        function io(e) {
            return Math.asin(1 / e)
        }

        function ao(e) {
            e = 1 / e;
            return Math.log(e + Math.sqrt(e * e + 1))
        }

        function oo(e) {
            return Math.acos(1 / e)
        }

        function so(e) {
            var t = 1 / e, e = Math.sqrt(t * t - 1);
            return Math.log(e + t)
        }

        function uo(e) {
            return ie(e)
        }

        function co(e) {
            return ae(e)
        }

        function fo(e) {
            return 1 / Math.tan(e)
        }

        function lo(e) {
            e = Math.exp(2 * e);
            return (e + 1) / (e - 1)
        }

        function po(e) {
            return 1 / Math.sin(e)
        }

        function mo(e) {
            return 0 === e ? Number.POSITIVE_INFINITY : Math.abs(2 / (Math.exp(e) - Math.exp(-e))) * s(e)
        }

        function ho(e) {
            return 1 / Math.cos(e)
        }

        function yo(e) {
            return 2 / (Math.exp(e) + Math.exp(-e))
        }

        function go(e) {
            return se(e)
        }

        go.signature = yo.signature = ho.signature = mo.signature = po.signature = lo.signature = fo.signature = co.signature = uo.signature = so.signature = oo.signature = ao.signature = io.signature = no.signature = ro.signature = to.signature = "number";
        var vo = Ye("acosh", ["typed", "config", "Complex"], function (e) {
                var t = e.typed, r = e.config, n = e.Complex;
                return t("acosh", {
                    number: function (e) {
                        return 1 <= e || r.predictable ? to(e) : e <= -1 ? new n(Math.log(Math.sqrt(e * e - 1) - e), Math.PI) : new n(e, 0).acosh()
                    }, Complex: function (e) {
                        return e.acosh()
                    }, BigNumber: function (e) {
                        return e.acosh()
                    }, "Array | Matrix": function (e) {
                        return xt(e, this)
                    }
                })
            }), xo = Ye("acot", ["typed", "BigNumber"], function (e) {
                var t = e.typed, r = e.BigNumber;
                return t("acot", {
                    number: ro, Complex: function (e) {
                        return e.acot()
                    }, BigNumber: function (e) {
                        return new r(1).div(e).atan()
                    }, "Array | Matrix": function (e) {
                        return xt(e, this)
                    }
                })
            }), bo = Ye("acoth", ["typed", "config", "Complex", "BigNumber"], function (e) {
                var t = e.typed, r = e.config, n = e.Complex, i = e.BigNumber;
                return t("acoth", {
                    number: function (e) {
                        return 1 <= e || e <= -1 || r.predictable ? no(e) : new n(e, 0).acoth()
                    }, Complex: function (e) {
                        return e.acoth()
                    }, BigNumber: function (e) {
                        return new i(1).div(e).atanh()
                    }, "Array | Matrix": function (e) {
                        return xt(e, this)
                    }
                })
            }), wo = Ye("acsc", ["typed", "config", "Complex", "BigNumber"], function (e) {
                var t = e.typed, r = e.config, n = e.Complex, i = e.BigNumber;
                return t("acsc", {
                    number: function (e) {
                        return e <= -1 || 1 <= e || r.predictable ? io(e) : new n(e, 0).acsc()
                    }, Complex: function (e) {
                        return e.acsc()
                    }, BigNumber: function (e) {
                        return new i(1).div(e).asin()
                    }, "Array | Matrix": function (e) {
                        return xt(e, this)
                    }
                })
            }), No = Ye("acsch", ["typed", "BigNumber"], function (e) {
                var t = e.typed, r = e.BigNumber;
                return t("acsch", {
                    number: ao, Complex: function (e) {
                        return e.acsch()
                    }, BigNumber: function (e) {
                        return new r(1).div(e).asinh()
                    }, "Array | Matrix": function (e) {
                        return xt(e, this)
                    }
                })
            }), Mo = Ye("asec", ["typed", "config", "Complex", "BigNumber"], function (e) {
                var t = e.typed, r = e.config, n = e.Complex, i = e.BigNumber;
                return t("asec", {
                    number: function (e) {
                        return e <= -1 || 1 <= e || r.predictable ? oo(e) : new n(e, 0).asec()
                    }, Complex: function (e) {
                        return e.asec()
                    }, BigNumber: function (e) {
                        return new i(1).div(e).acos()
                    }, "Array | Matrix": function (e) {
                        return xt(e, this)
                    }
                })
            }), So = Ye("asech", ["typed", "config", "Complex", "BigNumber"], function (e) {
                var t = e.typed, n = e.config, i = e.Complex, r = e.BigNumber;
                return t("asech", {
                    number: function (e) {
                        if (e <= 1 && -1 <= e || n.predictable) {
                            var t = 1 / e;
                            if (0 < t || n.predictable) return so(e);
                            var r = Math.sqrt(t * t - 1);
                            return new i(Math.log(r - t), Math.PI)
                        }
                        return new i(e, 0).asech()
                    }, Complex: function (e) {
                        return e.asech()
                    }, BigNumber: function (e) {
                        return new r(1).div(e).acosh()
                    }, "Array | Matrix": function (e) {
                        return xt(e, this)
                    }
                })
            }), Eo = Ye("asin", ["typed", "config", "Complex"], function (e) {
                var t = e.typed, r = e.config, n = e.Complex;
                return t("asin", {
                    number: function (e) {
                        return -1 <= e && e <= 1 || r.predictable ? Math.asin(e) : new n(e, 0).asin()
                    }, Complex: function (e) {
                        return e.asin()
                    }, BigNumber: function (e) {
                        return e.asin()
                    }, "Array | Matrix": function (e) {
                        return xt(e, this, !0)
                    }
                })
            }), Ao = Ye("asinh", ["typed"], function (e) {
                return (0, e.typed)("asinh", {
                    number: uo, Complex: function (e) {
                        return e.asinh()
                    }, BigNumber: function (e) {
                        return e.asinh()
                    }, "Array | Matrix": function (e) {
                        return xt(e, this, !0)
                    }
                })
            }), Oo = Ye("atan", ["typed"], function (e) {
                return (0, e.typed)("atan", {
                    number: function (e) {
                        return Math.atan(e)
                    }, Complex: function (e) {
                        return e.atan()
                    }, BigNumber: function (e) {
                        return e.atan()
                    }, "Array | Matrix": function (e) {
                        return xt(e, this, !0)
                    }
                })
            }), Co = Ye("atan2", ["typed", "matrix", "equalScalar", "BigNumber", "DenseMatrix"], function (e) {
                var t = e.typed, r = e.matrix, n = e.equalScalar, i = e.BigNumber, e = e.DenseMatrix,
                    a = Pr({typed: t, equalScalar: n}), o = Hr({typed: t}), s = rn({typed: t, equalScalar: n}),
                    u = wr({typed: t, equalScalar: n}), c = Gr({typed: t, DenseMatrix: e}), f = Dr({typed: t}),
                    l = Nr({typed: t});
                return t("atan2", {
                    "number, number": Math.atan2, "BigNumber, BigNumber": function (e, t) {
                        return i.atan2(e, t)
                    }, "SparseMatrix, SparseMatrix": function (e, t) {
                        return s(e, t, this, !1)
                    }, "SparseMatrix, DenseMatrix": function (e, t) {
                        return a(t, e, this, !0)
                    }, "DenseMatrix, SparseMatrix": function (e, t) {
                        return o(e, t, this, !1)
                    }, "DenseMatrix, DenseMatrix": function (e, t) {
                        return f(e, t, this)
                    }, "Array, Array": function (e, t) {
                        return this(r(e), r(t)).valueOf()
                    }, "Array, Matrix": function (e, t) {
                        return this(r(e), t)
                    }, "Matrix, Array": function (e, t) {
                        return this(e, r(t))
                    }, "SparseMatrix, number | BigNumber": function (e, t) {
                        return u(e, t, this, !1)
                    }, "DenseMatrix, number | BigNumber": function (e, t) {
                        return l(e, t, this, !1)
                    }, "number | BigNumber, SparseMatrix": function (e, t) {
                        return c(t, e, this, !0)
                    }, "number | BigNumber, DenseMatrix": function (e, t) {
                        return l(t, e, this, !0)
                    }, "Array, number | BigNumber": function (e, t) {
                        return l(r(e), t, this, !1).valueOf()
                    }, "number | BigNumber, Array": function (e, t) {
                        return l(r(t), e, this, !0).valueOf()
                    }
                })
            }), _o = Ye("atanh", ["typed", "config", "Complex"], function (e) {
                var t = e.typed, r = e.config, n = e.Complex;
                return t("atanh", {
                    number: function (e) {
                        return e <= 1 && -1 <= e || r.predictable ? co(e) : new n(e, 0).atanh()
                    }, Complex: function (e) {
                        return e.atanh()
                    }, BigNumber: function (e) {
                        return e.atanh()
                    }, "Array | Matrix": function (e) {
                        return xt(e, this, !0)
                    }
                })
            }), To = Ye("cos", ["typed"], function (e) {
                return (0, e.typed)("cos", {
                    number: Math.cos, Complex: function (e) {
                        return e.cos()
                    }, BigNumber: function (e) {
                        return e.cos()
                    }, Unit: function (e) {
                        if (!e.hasBase(e.constructor.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function cos is no angle");
                        return this(e.value)
                    }, "Array | Matrix": function (e) {
                        return xt(e, this)
                    }
                })
            }), zo = Ye("cosh", ["typed"], function (e) {
                return (0, e.typed)("cosh", {
                    number: oe, Complex: function (e) {
                        return e.cosh()
                    }, BigNumber: function (e) {
                        return e.cosh()
                    }, Unit: function (e) {
                        if (!e.hasBase(e.constructor.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function cosh is no angle");
                        return this(e.value)
                    }, "Array | Matrix": function (e) {
                        return xt(e, this)
                    }
                })
            }), qo = Ye("cot", ["typed", "BigNumber"], function (e) {
                var t = e.typed, r = e.BigNumber;
                return t("cot", {
                    number: fo, Complex: function (e) {
                        return e.cot()
                    }, BigNumber: function (e) {
                        return new r(1).div(e.tan())
                    }, Unit: function (e) {
                        if (!e.hasBase(e.constructor.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function cot is no angle");
                        return this(e.value)
                    }, "Array | Matrix": function (e) {
                        return xt(e, this)
                    }
                })
            }), Io = Ye("coth", ["typed", "BigNumber"], function (e) {
                var t = e.typed, r = e.BigNumber;
                return t("coth", {
                    number: lo, Complex: function (e) {
                        return e.coth()
                    }, BigNumber: function (e) {
                        return new r(1).div(e.tanh())
                    }, Unit: function (e) {
                        if (!e.hasBase(e.constructor.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function coth is no angle");
                        return this(e.value)
                    }, "Array | Matrix": function (e) {
                        return xt(e, this)
                    }
                })
            }), Bo = Ye("csc", ["typed", "BigNumber"], function (e) {
                var t = e.typed, r = e.BigNumber;
                return t("csc", {
                    number: po, Complex: function (e) {
                        return e.csc()
                    }, BigNumber: function (e) {
                        return new r(1).div(e.sin())
                    }, Unit: function (e) {
                        if (!e.hasBase(e.constructor.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function csc is no angle");
                        return this(e.value)
                    }, "Array | Matrix": function (e) {
                        return xt(e, this)
                    }
                })
            }), ko = Ye("csch", ["typed", "BigNumber"], function (e) {
                var t = e.typed, r = e.BigNumber;
                return t("csch", {
                    number: mo, Complex: function (e) {
                        return e.csch()
                    }, BigNumber: function (e) {
                        return new r(1).div(e.sinh())
                    }, Unit: function (e) {
                        if (!e.hasBase(e.constructor.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function csch is no angle");
                        return this(e.value)
                    }, "Array | Matrix": function (e) {
                        return xt(e, this)
                    }
                })
            }), Do = Ye("sec", ["typed", "BigNumber"], function (e) {
                var t = e.typed, r = e.BigNumber;
                return t("sec", {
                    number: ho, Complex: function (e) {
                        return e.sec()
                    }, BigNumber: function (e) {
                        return new r(1).div(e.cos())
                    }, Unit: function (e) {
                        if (!e.hasBase(e.constructor.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function sec is no angle");
                        return this(e.value)
                    }, "Array | Matrix": function (e) {
                        return xt(e, this)
                    }
                })
            }), Ro = Ye("sech", ["typed", "BigNumber"], function (e) {
                var t = e.typed, r = e.BigNumber;
                return t("sech", {
                    number: yo, Complex: function (e) {
                        return e.sech()
                    }, BigNumber: function (e) {
                        return new r(1).div(e.cosh())
                    }, Unit: function (e) {
                        if (!e.hasBase(e.constructor.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function sech is no angle");
                        return this(e.value)
                    }, "Array | Matrix": function (e) {
                        return xt(e, this)
                    }
                })
            }), Po = Ye("sin", ["typed"], function (e) {
                return (0, e.typed)("sin", {
                    number: Math.sin, Complex: function (e) {
                        return e.sin()
                    }, BigNumber: function (e) {
                        return e.sin()
                    }, Unit: function (e) {
                        if (!e.hasBase(e.constructor.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function sin is no angle");
                        return this(e.value)
                    }, "Array | Matrix": function (e) {
                        return xt(e, this, !0)
                    }
                })
            }), jo = Ye("sinh", ["typed"], function (e) {
                return (0, e.typed)("sinh", {
                    number: go, Complex: function (e) {
                        return e.sinh()
                    }, BigNumber: function (e) {
                        return e.sinh()
                    }, Unit: function (e) {
                        if (!e.hasBase(e.constructor.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function sinh is no angle");
                        return this(e.value)
                    }, "Array | Matrix": function (e) {
                        return xt(e, this, !0)
                    }
                })
            }), Uo = Ye("tan", ["typed"], function (e) {
                return (0, e.typed)("tan", {
                    number: Math.tan, Complex: function (e) {
                        return e.tan()
                    }, BigNumber: function (e) {
                        return e.tan()
                    }, Unit: function (e) {
                        if (!e.hasBase(e.constructor.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function tan is no angle");
                        return this(e.value)
                    }, "Array | Matrix": function (e) {
                        return xt(e, this, !0)
                    }
                })
            }), Fo = Ye("tanh", ["typed"], function (e) {
                return (0, e.typed)("tanh", {
                    number: me, Complex: function (e) {
                        return e.tanh()
                    }, BigNumber: function (e) {
                        return e.tanh()
                    }, Unit: function (e) {
                        if (!e.hasBase(e.constructor.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function tanh is no angle");
                        return this(e.value)
                    }, "Array | Matrix": function (e) {
                        return xt(e, this, !0)
                    }
                })
            }),
            Lo = Ye("setCartesian", ["typed", "size", "subset", "compareNatural", "Index", "DenseMatrix"], function (e) {
                var t = e.typed, s = e.size, u = e.subset, c = e.compareNatural, f = e.Index, l = e.DenseMatrix;
                return t("setCartesian", {
                    "Array | Matrix, Array | Matrix": function (e, t) {
                        var r = [];
                        if (0 !== u(s(e), new f(0)) && 0 !== u(s(t), new f(0))) for (var n = qe(Array.isArray(e) ? e : e.toArray()).sort(c), i = qe(Array.isArray(t) ? t : t.toArray()).sort(c), r = [], a = 0; a < n.length; a++) for (var o = 0; o < i.length; o++) r.push([n[a], i[o]]);
                        return Array.isArray(e) && Array.isArray(t) ? r : new l(r)
                    }
                })
            }),
            Ho = Ye("setDifference", ["typed", "size", "subset", "compareNatural", "Index", "DenseMatrix"], function (e) {
                var t = e.typed, u = e.size, c = e.subset, f = e.compareNatural, l = e.Index, p = e.DenseMatrix;
                return t("setDifference", {
                    "Array | Matrix, Array | Matrix": function (e, t) {
                        if (0 === c(u(e), new l(0))) a = []; else {
                            if (0 === c(u(t), new l(0))) return qe(e.toArray());
                            for (var r, n = Pe(qe(Array.isArray(e) ? e : e.toArray()).sort(f)), i = Pe(qe(Array.isArray(t) ? t : t.toArray()).sort(f)), a = [], o = 0; o < n.length; o++) {
                                r = !1;
                                for (var s = 0; s < i.length; s++) if (0 === f(n[o].value, i[s].value) && n[o].identifier === i[s].identifier) {
                                    r = !0;
                                    break
                                }
                                r || a.push(n[o])
                            }
                        }
                        return Array.isArray(e) && Array.isArray(t) ? je(a) : new p(je(a))
                    }
                })
            }),
            $o = Ye("setDistinct", ["typed", "size", "subset", "compareNatural", "Index", "DenseMatrix"], function (e) {
                var t = e.typed, i = e.size, a = e.subset, o = e.compareNatural, s = e.Index, u = e.DenseMatrix;
                return t("setDistinct", {
                    "Array | Matrix": function (e) {
                        var t;
                        if (0 === a(i(e), new s(0))) t = []; else {
                            var r = qe(Array.isArray(e) ? e : e.toArray()).sort(o);
                            (t = []).push(r[0]);
                            for (var n = 1; n < r.length; n++) 0 !== o(r[n], r[n - 1]) && t.push(r[n])
                        }
                        return Array.isArray(e) ? t : new u(t)
                    }
                })
            }),
            Go = Ye("setIntersect", ["typed", "size", "subset", "compareNatural", "Index", "DenseMatrix"], function (e) {
                var t = e.typed, s = e.size, u = e.subset, c = e.compareNatural, f = e.Index, l = e.DenseMatrix;
                return t("setIntersect", {
                    "Array | Matrix, Array | Matrix": function (e, t) {
                        if (0 === u(s(e), new f(0)) || 0 === u(s(t), new f(0))) i = []; else for (var r = Pe(qe(Array.isArray(e) ? e : e.toArray()).sort(c)), n = Pe(qe(Array.isArray(t) ? t : t.toArray()).sort(c)), i = [], a = 0; a < r.length; a++) for (var o = 0; o < n.length; o++) if (0 === c(r[a].value, n[o].value) && r[a].identifier === n[o].identifier) {
                            i.push(r[a]);
                            break
                        }
                        return Array.isArray(e) && Array.isArray(t) ? je(i) : new l(je(i))
                    }
                })
            }), Vo = Ye("setIsSubset", ["typed", "size", "subset", "compareNatural", "Index"], function (e) {
                var t = e.typed, s = e.size, u = e.subset, c = e.compareNatural, f = e.Index;
                return t("setIsSubset", {
                    "Array | Matrix, Array | Matrix": function (e, t) {
                        if (0 === u(s(e), new f(0))) return !0;
                        if (0 === u(s(t), new f(0))) return !1;
                        for (var r, n = Pe(qe(Array.isArray(e) ? e : e.toArray()).sort(c)), i = Pe(qe(Array.isArray(t) ? t : t.toArray()).sort(c)), a = 0; a < n.length; a++) {
                            r = !1;
                            for (var o = 0; o < i.length; o++) if (0 === c(n[a].value, i[o].value) && n[a].identifier === i[o].identifier) {
                                r = !0;
                                break
                            }
                            if (!1 === r) return !1
                        }
                        return !0
                    }
                })
            }), Zo = Ye("setMultiplicity", ["typed", "size", "subset", "compareNatural", "Index"], function (e) {
                var t = e.typed, a = e.size, o = e.subset, s = e.compareNatural, u = e.Index;
                return t("setMultiplicity", {
                    "number | BigNumber | Fraction | Complex, Array | Matrix": function (e, t) {
                        if (0 === o(a(t), new u(0))) return 0;
                        for (var r = qe(Array.isArray(t) ? t : t.toArray()), n = 0, i = 0; i < r.length; i++) 0 === s(r[i], e) && n++;
                        return n
                    }
                })
            }), Wo = Ye("setPowerset", ["typed", "size", "subset", "compareNatural", "Index"], function (e) {
                var t = e.typed, i = e.size, a = e.subset, o = e.compareNatural, s = e.Index;
                return t("setPowerset", {
                    "Array | Matrix": function (e) {
                        if (0 === a(i(e), new s(0))) return [];
                        for (var t = qe(Array.isArray(e) ? e : e.toArray()).sort(o), r = [], n = 0; n.toString(2).length <= t.length;) r.push(function (e, t) {
                            for (var r = [], n = 0; n < t.length; n++) "1" === t[n] && r.push(e[n]);
                            return r
                        }(t, n.toString(2).split("").reverse())), n++;
                        return function (e) {
                            for (var t, r = e.length - 1; 0 < r; r--) for (var n = 0; n < r; n++) e[n].length > e[n + 1].length && (t = e[n], e[n] = e[n + 1], e[n + 1] = t);
                            return e
                        }(r)
                    }
                })
            }), Jo = Ye("setSize", ["typed", "compareNatural"], function (e) {
                var t = e.typed, a = e.compareNatural;
                return t("setSize", {
                    "Array | Matrix": function (e) {
                        return (Array.isArray(e) ? qe(e) : qe(e.toArray())).length
                    }, "Array | Matrix, boolean": function (e, t) {
                        if (!1 === t || 0 === e.length) return (Array.isArray(e) ? qe(e) : qe(e.toArray())).length;
                        for (var r = qe(Array.isArray(e) ? e : e.toArray()).sort(a), n = 1, i = 1; i < r.length; i++) 0 !== a(r[i], r[i - 1]) && n++;
                        return n
                    }
                })
            }), Yo = Ye("setSymDifference", ["typed", "size", "concat", "subset", "setDifference", "Index"], function (e) {
                var t = e.typed, r = e.size, n = e.concat, i = e.subset, a = e.setDifference, o = e.Index;
                return t("setSymDifference", {
                    "Array | Matrix, Array | Matrix": function (e, t) {
                        if (0 === i(r(e), new o(0))) return qe(t);
                        if (0 === i(r(t), new o(0))) return qe(e);
                        e = qe(e), t = qe(t);
                        return n(a(e, t), a(t, e))
                    }
                })
            }),
            Xo = Ye("setUnion", ["typed", "size", "concat", "subset", "setIntersect", "setSymDifference", "Index"], function (e) {
                var t = e.typed, r = e.size, n = e.concat, i = e.subset, a = e.setIntersect, o = e.setSymDifference,
                    s = e.Index;
                return t("setUnion", {
                    "Array | Matrix, Array | Matrix": function (e, t) {
                        if (0 === i(r(e), new s(0))) return qe(t);
                        if (0 === i(r(t), new s(0))) return qe(e);
                        e = qe(e), t = qe(t);
                        return n(o(e, t), a(e, t))
                    }
                })
            }),
            Qo = Ye("add", ["typed", "matrix", "addScalar", "equalScalar", "DenseMatrix", "SparseMatrix"], function (e) {
                var t = e.typed, r = e.matrix, n = e.addScalar, i = e.equalScalar, a = e.DenseMatrix,
                    o = (e.SparseMatrix, Ir({typed: t})), s = Br({typed: t, equalScalar: i}),
                    u = kr({typed: t, DenseMatrix: a}), c = Dr({typed: t}), f = Nr({typed: t});
                return t("add", Ge({
                    "DenseMatrix, DenseMatrix": function (e, t) {
                        return c(e, t, n)
                    }, "DenseMatrix, SparseMatrix": function (e, t) {
                        return o(e, t, n, !1)
                    }, "SparseMatrix, DenseMatrix": function (e, t) {
                        return o(t, e, n, !0)
                    }, "SparseMatrix, SparseMatrix": function (e, t) {
                        return s(e, t, n)
                    }, "Array, Array": function (e, t) {
                        return this(r(e), r(t)).valueOf()
                    }, "Array, Matrix": function (e, t) {
                        return this(r(e), t)
                    }, "Matrix, Array": function (e, t) {
                        return this(e, r(t))
                    }, "DenseMatrix, any": function (e, t) {
                        return f(e, t, n, !1)
                    }, "SparseMatrix, any": function (e, t) {
                        return u(e, t, n, !1)
                    }, "any, DenseMatrix": function (e, t) {
                        return f(t, e, n, !0)
                    }, "any, SparseMatrix": function (e, t) {
                        return u(t, e, n, !0)
                    }, "Array, any": function (e, t) {
                        return f(r(e), t, n, !1).valueOf()
                    }, "any, Array": function (e, t) {
                        return f(r(t), e, n, !0).valueOf()
                    }, "any, any": n, "any, any, ...any": function (e, t, r) {
                        for (var n = this(e, t), i = 0; i < r.length; i++) n = this(n, r[i]);
                        return n
                    }
                }, n.signatures))
            }),
            Ko = Ye("hypot", ["typed", "abs", "addScalar", "divideScalar", "multiplyScalar", "sqrt", "smaller", "isPositive"], function (e) {
                var t = e.typed, a = e.abs, o = e.addScalar, s = e.divideScalar, u = e.multiplyScalar, c = e.sqrt,
                    f = e.smaller, l = e.isPositive;
                return t("hypot", {
                    "... number | BigNumber": function (e) {
                        for (var t = 0, r = 0, n = 0; n < e.length; n++) {
                            var i = a(e[n]);
                            f(r, i) ? (t = u(t, u(s(r, i), s(r, i))), t = o(t, 1), r = i) : t = o(t, l(i) ? u(s(i, r), s(i, r)) : i)
                        }
                        return u(r, c(t))
                    }, Array: function (e) {
                        return this.apply(this, qe(e))
                    }, Matrix: function (e) {
                        return this.apply(this, qe(e.toArray()))
                    }
                })
            }),
            es = Ye("norm", ["typed", "abs", "add", "pow", "conj", "sqrt", "multiply", "equalScalar", "larger", "smaller", "matrix", "ctranspose", "eigs"], function (e) {
                var t = e.typed, s = e.abs, u = e.add, a = e.pow, c = e.conj, f = e.sqrt, l = e.multiply,
                    o = e.equalScalar, p = e.larger, m = e.smaller, r = e.matrix, h = e.ctranspose, d = e.eigs;
                return t("norm", {
                    number: Math.abs, Complex: function (e) {
                        return e.abs()
                    }, BigNumber: function (e) {
                        return e.abs()
                    }, boolean: function (e) {
                        return Math.abs(e)
                    }, Array: function (e) {
                        return y(r(e), 2)
                    }, Matrix: function (e) {
                        return y(e, 2)
                    }, "number | Complex | BigNumber | boolean, number | BigNumber | string": function (e) {
                        return this(e)
                    }, "Array, number | BigNumber | string": function (e, t) {
                        return y(r(e), t)
                    }, "Matrix, number | BigNumber | string": y
                });

                function y(e, t) {
                    var r = e.size();
                    if (1 === r.length) return function (e, t) {
                        if (t === Number.POSITIVE_INFINITY || "inf" === t) return r = 0, e.forEach(function (e) {
                            e = s(e);
                            p(e, r) && (r = e)
                        }, !0), r;
                        var r, n;
                        if (t === Number.NEGATIVE_INFINITY || "-inf" === t) return e.forEach(function (e) {
                            e = s(e);
                            n && !m(e, n) || (n = e)
                        }, !0), n || 0;
                        if ("fro" === t) return y(e, 2);
                        if ("number" != typeof t || isNaN(t)) throw new Error("Unsupported parameter value");
                        if (o(t, 0)) return Number.POSITIVE_INFINITY;
                        var i = 0;
                        return e.forEach(function (e) {
                            i = u(a(s(e), t), i)
                        }, !0), a(i, 1 / t)
                    }(e, t);
                    if (2 === r.length) {
                        if (r[0] && r[1]) return function (e, t) {
                            if (1 === t) return r = [], n = 0, e.forEach(function (e, t) {
                                t = t[1], e = u(r[t] || 0, s(e));
                                p(e, n) && (n = e), r[t] = e
                            }, !0), n;
                            var r, n, i, a, o;
                            if (t === Number.POSITIVE_INFINITY || "inf" === t) return i = [], a = 0, e.forEach(function (e, t) {
                                t = t[0], e = u(i[t] || 0, s(e));
                                p(e, a) && (a = e), i[t] = e
                            }, !0), a;
                            if ("fro" === t) return o = 0, e.forEach(function (e, t) {
                                o = u(o, l(e, c(e)))
                            }), s(f(o));
                            if (2 === t) return function (e) {
                                var t = e.size();
                                if (t[0] !== t[1]) throw new RangeError("Invalid matrix dimensions");
                                t = h(e), e = l(t, e), e = d(e).values, e = e.get([e.size()[0] - 1]);
                                return s(f(e))
                            }(e);
                            throw new Error("Unsupported parameter value " + t)
                        }(e, t);
                        throw new RangeError("Invalid matrix dimensions")
                    }
                }
            }), ts = Ye("dot", ["typed", "addScalar", "multiplyScalar", "conj", "size"], function (e) {
                var g = e.typed, v = e.addScalar, x = e.multiplyScalar, b = e.conj, t = e.size;
                return g("dot", {
                    "Array | DenseMatrix, Array | DenseMatrix": function (e, t) {
                        var r = w(e, t), n = E(e) ? e._data : e, i = E(e) ? e._datatype : void 0, a = E(t) ? t._data : t,
                            o = E(t) ? t._datatype : void 0, e = 2 === N(e).length, t = 2 === N(t).length, s = v, u = x;
                        if (i && o && i === o && "string" == typeof i && (i = i, s = g.find(v, [i, i]), u = g.find(x, [i, i])), !e && !t) {
                            for (var c = u(b(n[0]), a[0]), f = 1; f < r; f++) c = s(c, u(b(n[f]), a[f]));
                            return c
                        }
                        if (!e && t) {
                            for (var l = u(b(n[0]), a[0][0]), p = 1; p < r; p++) l = s(l, u(b(n[p]), a[p][0]));
                            return l
                        }
                        if (e && !t) {
                            for (var m = u(b(n[0][0]), a[0]), h = 1; h < r; h++) m = s(m, u(b(n[h][0]), a[h]));
                            return m
                        }
                        if (e && t) {
                            for (var d = u(b(n[0][0]), a[0][0]), y = 1; y < r; y++) d = s(d, u(b(n[y][0]), a[y][0]));
                            return d
                        }
                    }, "SparseMatrix, SparseMatrix": function (e, t) {
                        w(e, t);
                        for (var r = e._index, n = e._values, i = t._index, a = t._values, o = 0, s = v, u = x, c = 0, f = 0; c < r.length && f < i.length;) {
                            var l = r[c], p = i[f];
                            l < p ? c++ : p < l ? f++ : l === p && (o = s(o, u(n[c], a[f])), c++, f++)
                        }
                        return o
                    }
                });

                function w(e, t) {
                    var r, n, e = N(e), t = N(t);
                    if (1 === e.length) r = e[0]; else {
                        if (2 !== e.length || 1 !== e[1]) throw new RangeError("Expected a column vector, instead got a matrix of size (" + e.join(", ") + ")");
                        r = e[0]
                    }
                    if (1 === t.length) n = t[0]; else {
                        if (2 !== t.length || 1 !== t[1]) throw new RangeError("Expected a column vector, instead got a matrix of size (" + t.join(", ") + ")");
                        n = t[0]
                    }
                    if (r !== n) throw new RangeError("Vectors must have equal length (" + r + " != " + n + ")");
                    if (0 === r) throw new RangeError("Cannot calculate the dot product of empty vectors");
                    return r
                }

                function N(e) {
                    return E(e) ? e.size() : t(e)
                }
            }), rs = Ye("trace", ["typed", "matrix", "add"], function (e) {
                var t = e.typed, r = e.matrix, p = e.add;
                return t("trace", {
                    Array: function (e) {
                        return n(r(e))
                    }, SparseMatrix: function (e) {
                        var t = e._values, r = e._index, n = e._ptr, i = e._size, e = i[0], a = i[1];
                        if (e !== a) throw new RangeError("Matrix must be square (size: " + ge(i) + ")");
                        var o = 0;
                        if (0 < t.length) for (var s = 0; s < a; s++) for (var u = n[s], c = n[s + 1], f = u; f < c; f++) {
                            var l = r[f];
                            if (l === s) {
                                o = p(o, t[f]);
                                break
                            }
                            if (s < l) break
                        }
                        return o
                    }, DenseMatrix: n, any: He
                });

                function n(e) {
                    var t = e._size, r = e._data;
                    switch (t.length) {
                        case 1:
                            if (1 === t[0]) return He(r[0]);
                            throw new RangeError("Matrix must be square (size: " + ge(t) + ")");
                        case 2:
                            var n = t[0];
                            if (n !== t[1]) throw new RangeError("Matrix must be square (size: " + ge(t) + ")");
                            for (var i = 0, a = 0; a < n; a++) i = p(i, r[a][a]);
                            return i;
                        default:
                            throw new RangeError("Matrix must be two dimensional (size: " + ge(t) + ")")
                    }
                }
            }), ns = Ye("index", ["typed", "Index"], function (e) {
                var t = e.typed, r = e.Index;
                return t("index", {
                    "...number | string | BigNumber | Range | Array | Matrix": function (e) {
                        var t = e.map(function (e) {
                            return I(e) ? e.toNumber() : Array.isArray(e) || E(e) ? e.map(function (e) {
                                return I(e) ? e.toNumber() : e
                            }) : e
                        }), e = new r;
                        return r.apply(e, t), e
                    }
                })
            }), is = {end: !0};

        function as(e) {
            return (as = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        var os = Ye("Node", ["mathWithTransform"], function (e) {
            var n = e.mathWithTransform;

            function t() {
                if (!(this instanceof t)) throw new SyntaxError("Constructor must be called with the new operator")
            }

            return t.prototype.evaluate = function (e) {
                return this.compile().evaluate(e)
            }, t.prototype.type = "Node", t.prototype.isNode = !0, t.prototype.comment = "", t.prototype.compile = function () {
                var t = this._compile(n, {}), r = {};
                return {
                    evaluate: function (e) {
                        e = e || {};
                        return function (e) {
                            for (var t in e) if (We(e, t) && t in is) throw new Error('Scope contains an illegal symbol, "' + t + '" is a reserved keyword')
                        }(e), t(e, r, null)
                    }
                }
            }, t.prototype._compile = function (e, t) {
                throw new Error("Method _compile should be implemented by type " + this.type)
            }, t.prototype.forEach = function (e) {
                throw new Error("Cannot run forEach on a Node interface")
            }, t.prototype.map = function (e) {
                throw new Error("Cannot run map on a Node interface")
            }, t.prototype._ifNode = function (e) {
                if (!R(e)) throw new TypeError("Callback function must return a Node");
                return e
            }, t.prototype.traverse = function (e) {
                e(this, null, null), function n(e, i) {
                    e.forEach(function (e, t, r) {
                        i(e, t, r), n(e, i)
                    })
                }(this, e)
            }, t.prototype.transform = function (i) {
                return function e(t, r, n) {
                    n = i(t, r, n);
                    return n !== t ? n : t.map(e)
                }(this, null, null)
            }, t.prototype.filter = function (n) {
                var i = [];
                return this.traverse(function (e, t, r) {
                    n(e, t, r) && i.push(e)
                }), i
            }, t.prototype.clone = function () {
                throw new Error("Cannot clone a Node interface")
            }, t.prototype.cloneDeep = function () {
                return this.map(function (e) {
                    return e.cloneDeep()
                })
            }, t.prototype.equals = function (e) {
                return !!e && Ve(this, e)
            }, t.prototype.toString = function (e) {
                var t = this._getCustomString(e);
                return void 0 !== t ? t : this._toString(e)
            }, t.prototype.toJSON = function () {
                throw new Error("Cannot serialize object: toJSON not implemented by " + this.type)
            }, t.prototype.toHTML = function (e) {
                var t = this._getCustomString(e);
                return void 0 !== t ? t : this.toHTML(e)
            }, t.prototype._toString = function () {
                throw new Error("_toString not implemented for " + this.type)
            }, t.prototype.toTex = function (e) {
                var t = this._getCustomString(e);
                return void 0 !== t ? t : this._toTex(e)
            }, t.prototype._toTex = function (e) {
                throw new Error("_toTex not implemented for " + this.type)
            }, t.prototype._getCustomString = function (e) {
                if (e && "object" === as(e)) switch (as(e.handler)) {
                    case"object":
                    case"undefined":
                        return;
                    case"function":
                        return e.handler(this, e);
                    default:
                        throw new TypeError("Object or function expected as callback")
                }
            }, t.prototype.getIdentifier = function () {
                return this.type
            }, t.prototype.getContent = function () {
                return this
            }, t
        }, {isClass: !0, isNode: !0});

        function ss(e) {
            return e && e.isIndexError ? new Ne(e.index + 1, e.min + 1, void 0 !== e.max ? e.max + 1 : void 0) : e
        }

        function us(e) {
            return (us = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function cs(e) {
            var r = e.subset;
            return function (e, t) {
                try {
                    if (Array.isArray(e)) return r(e, t);
                    if (e && "function" == typeof e.subset) return e.subset(t);
                    if ("string" == typeof e) return r(e, t);
                    if ("object" !== us(e)) throw new TypeError("Cannot apply index: unsupported type of object");
                    if (!t.isObjectProperty()) throw new TypeError("Cannot apply a numeric index as object property");
                    return yi(e, t.getObjectProperty())
                } catch (e) {
                    throw ss(e)
                }
            }
        }

        var fs = Ye("AccessorNode", ["subset", "Node"], function (e) {
            var t = e.subset, e = e.Node, o = cs({subset: t});

            function r(e, t) {
                if (!(this instanceof r)) throw new SyntaxError("Constructor must be called with the new operator");
                if (!R(e)) throw new TypeError('Node expected for parameter "object"');
                if (!D(t)) throw new TypeError('IndexNode expected for parameter "index"');
                this.object = e || null, this.index = t, Object.defineProperty(this, "name", {
                    get: function () {
                        return this.index ? this.index.isObjectProperty() ? this.index.getObjectProperty() : "" : this.object.name || ""
                    }.bind(this), set: function () {
                        throw new Error("Cannot assign a new name, name is read-only")
                    }
                })
            }

            function n(e) {
                return !(ue(e) || T(e) || ce(e) || fe(e) || P(e) || j(e) || pe(e))
            }

            return (r.prototype = new e).type = "AccessorNode", r.prototype.isAccessorNode = !0, r.prototype._compile = function (e, t) {
                var n = this.object._compile(e, t), i = this.index._compile(e, t);
                if (this.index.isObjectProperty()) {
                    var a = this.index.getObjectProperty();
                    return function (e, t, r) {
                        return yi(n(e, t, r), a)
                    }
                }
                return function (e, t, r) {
                    r = n(e, t, r), t = i(e, t, r);
                    return o(r, t)
                }
            }, r.prototype.forEach = function (e) {
                e(this.object, "object", this), e(this.index, "index", this)
            }, r.prototype.map = function (e) {
                return new r(this._ifNode(e(this.object, "object", this)), this._ifNode(e(this.index, "index", this)))
            }, r.prototype.clone = function () {
                return new r(this.object, this.index)
            }, r.prototype._toString = function (e) {
                var t = this.object.toString(e);
                return n(this.object) && (t = "(" + t + ")"), t + this.index.toString(e)
            }, r.prototype.toHTML = function (e) {
                var t = this.object.toHTML(e);
                return n(this.object) && (t = '<span class="math-parenthesis math-round-parenthesis">(</span>' + t + '<span class="math-parenthesis math-round-parenthesis">)</span>'), t + this.index.toHTML(e)
            }, r.prototype._toTex = function (e) {
                var t = this.object.toTex(e);
                return n(this.object) && (t = "\\left(' + object + '\\right)"), t + this.index.toTex(e)
            }, r.prototype.toJSON = function () {
                return {mathjs: "AccessorNode", object: this.object, index: this.index}
            }, r.fromJSON = function (e) {
                return new r(e.object, e.index)
            }, r
        }, {isClass: !0, isNode: !0}), ls = Ye("ArrayNode", ["Node"], function (e) {
            e = e.Node;

            function n(e) {
                if (!(this instanceof n)) throw new SyntaxError("Constructor must be called with the new operator");
                if (this.items = e || [], !Array.isArray(this.items) || !this.items.every(R)) throw new TypeError("Array containing Nodes expected")
            }

            return (n.prototype = new e).type = "ArrayNode", n.prototype.isArrayNode = !0, n.prototype._compile = function (t, r) {
                var e = Ie(this.items, function (e) {
                    return e._compile(t, r)
                });
                if ("Array" === t.config.matrix) return function (t, r, n) {
                    return Ie(e, function (e) {
                        return e(t, r, n)
                    })
                };
                var i = t.matrix;
                return function (t, r, n) {
                    return i(Ie(e, function (e) {
                        return e(t, r, n)
                    }))
                }
            }, n.prototype.forEach = function (e) {
                for (var t = 0; t < this.items.length; t++) e(this.items[t], "items[" + t + "]", this)
            }, n.prototype.map = function (e) {
                for (var t = [], r = 0; r < this.items.length; r++) t[r] = this._ifNode(e(this.items[r], "items[" + r + "]", this));
                return new n(t)
            }, n.prototype.clone = function () {
                return new n(this.items.slice(0))
            }, n.prototype._toString = function (t) {
                return "[" + this.items.map(function (e) {
                    return e.toString(t)
                }).join(", ") + "]"
            }, n.prototype.toJSON = function () {
                return {mathjs: "ArrayNode", items: this.items}
            }, n.fromJSON = function (e) {
                return new n(e.items)
            }, n.prototype.toHTML = function (t) {
                return '<span class="math-parenthesis math-square-parenthesis">[</span>' + this.items.map(function (e) {
                    return e.toHTML(t)
                }).join('<span class="math-separator">,</span>') + '<span class="math-parenthesis math-square-parenthesis">]</span>'
            }, n.prototype._toTex = function (t) {
                var r = "\\begin{bmatrix}";
                return this.items.forEach(function (e) {
                    e.items ? r += e.items.map(function (e) {
                        return e.toTex(t)
                    }).join("&") : r += e.toTex(t), r += "\\\\"
                }), r += "\\end{bmatrix}"
            }, n
        }, {isClass: !0, isNode: !0});

        function ps(e) {
            return (ps = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        var ms = [{AssignmentNode: {}, FunctionAssignmentNode: {}}, {
            ConditionalNode: {
                latexLeftParens: !1,
                latexRightParens: !1,
                latexParens: !1
            }
        }, {
            "OperatorNode:or": {
                associativity: "left",
                associativeWith: []
            }
        }, {
            "OperatorNode:xor": {
                associativity: "left",
                associativeWith: []
            }
        }, {
            "OperatorNode:and": {
                associativity: "left",
                associativeWith: []
            }
        }, {
            "OperatorNode:bitOr": {
                associativity: "left",
                associativeWith: []
            }
        }, {
            "OperatorNode:bitXor": {
                associativity: "left",
                associativeWith: []
            }
        }, {
            "OperatorNode:bitAnd": {
                associativity: "left",
                associativeWith: []
            }
        }, {
            "OperatorNode:equal": {associativity: "left", associativeWith: []},
            "OperatorNode:unequal": {associativity: "left", associativeWith: []},
            "OperatorNode:smaller": {associativity: "left", associativeWith: []},
            "OperatorNode:larger": {associativity: "left", associativeWith: []},
            "OperatorNode:smallerEq": {associativity: "left", associativeWith: []},
            "OperatorNode:largerEq": {associativity: "left", associativeWith: []},
            RelationalNode: {associativity: "left", associativeWith: []}
        }, {
            "OperatorNode:leftShift": {associativity: "left", associativeWith: []},
            "OperatorNode:rightArithShift": {associativity: "left", associativeWith: []},
            "OperatorNode:rightLogShift": {associativity: "left", associativeWith: []}
        }, {
            "OperatorNode:to": {
                associativity: "left",
                associativeWith: []
            }
        }, {RangeNode: {}}, {
            "OperatorNode:add": {
                associativity: "left",
                associativeWith: ["OperatorNode:add", "OperatorNode:subtract"]
            }, "OperatorNode:subtract": {associativity: "left", associativeWith: []}
        }, {
            "OperatorNode:multiply": {
                associativity: "left",
                associativeWith: ["OperatorNode:multiply", "OperatorNode:divide", "Operator:dotMultiply", "Operator:dotDivide"]
            },
            "OperatorNode:divide": {
                associativity: "left",
                associativeWith: [],
                latexLeftParens: !1,
                latexRightParens: !1,
                latexParens: !1
            },
            "OperatorNode:dotMultiply": {
                associativity: "left",
                associativeWith: ["OperatorNode:multiply", "OperatorNode:divide", "OperatorNode:dotMultiply", "OperatorNode:doDivide"]
            },
            "OperatorNode:dotDivide": {associativity: "left", associativeWith: []},
            "OperatorNode:mod": {associativity: "left", associativeWith: []}
        }, {
            "OperatorNode:unaryPlus": {associativity: "right"},
            "OperatorNode:unaryMinus": {associativity: "right"},
            "OperatorNode:bitNot": {associativity: "right"},
            "OperatorNode:not": {associativity: "right"}
        }, {
            "OperatorNode:pow": {associativity: "right", associativeWith: [], latexRightParens: !1},
            "OperatorNode:dotPow": {associativity: "right", associativeWith: []}
        }, {"OperatorNode:factorial": {associativity: "left"}}, {"OperatorNode:transpose": {associativity: "left"}}];

        function hs(e, t) {
            var r = e;
            "keep" !== t && (r = e.getContent());
            for (var n = r.getIdentifier(), i = 0; i < ms.length; i++) if (n in ms[i]) return i;
            return null
        }

        function ds(e, t) {
            var r = e;
            "keep" !== t && (r = e.getContent());
            e = r.getIdentifier(), t = hs(r, t);
            if (null === t) return null;
            t = ms[t][e];
            if (We(t, "associativity")) {
                if ("left" === t.associativity) return "left";
                if ("right" === t.associativity) return "right";
                throw Error("'" + e + "' has the invalid associativity '" + t.associativity + "'.")
            }
            return null
        }

        function ys(e, t, r) {
            var n = "keep" !== r ? e.getContent() : e, e = "keep" !== r ? e.getContent() : t, t = n.getIdentifier(),
                i = e.getIdentifier(), r = hs(n, r);
            if (null === r) return null;
            var a = ms[r][t];
            if (We(a, "associativeWith") && a.associativeWith instanceof Array) {
                for (var o = 0; o < a.associativeWith.length; o++) if (a.associativeWith[o] === i) return !0;
                return !1
            }
            return null
        }

        var gs = Ye("AssignmentNode", ["subset", "?matrix", "Node"], function (e) {
            var n, i, t = e.subset, r = e.matrix, e = e.Node, p = cs({subset: t}),
                m = (n = (r = {subset: t, matrix: r}).subset, i = r.matrix, function (e, t, r) {
                    try {
                        if (Array.isArray(e)) return i(e).subset(t, r).valueOf();
                        if (e && "function" == typeof e.subset) return e.subset(t, r);
                        if ("string" == typeof e) return n(e, t, r);
                        if ("object" !== ps(e)) throw new TypeError("Cannot apply index: unsupported type of object");
                        if (!t.isObjectProperty()) throw TypeError("Cannot apply a numeric index as object property");
                        return gi(e, t.getObjectProperty(), r), e
                    } catch (e) {
                        throw ss(e)
                    }
                });

            function a(e, t, r) {
                if (!(this instanceof a)) throw new SyntaxError("Constructor must be called with the new operator");
                if (this.object = e, this.index = r ? t : null, this.value = r || t, !pe(e) && !ue(e)) throw new TypeError('SymbolNode or AccessorNode expected as "object"');
                if (pe(e) && "end" === e.name) throw new Error('Cannot assign to symbol "end"');
                if (this.index && !D(this.index)) throw new TypeError('IndexNode expected as "index"');
                if (!R(this.value)) throw new TypeError('Node expected as "value"');
                Object.defineProperty(this, "name", {
                    get: function () {
                        return this.index ? this.index.isObjectProperty() ? this.index.getObjectProperty() : "" : this.object.name || ""
                    }.bind(this), set: function () {
                        throw new Error("Cannot assign a new name, name is read-only")
                    }
                })
            }

            function o(e, t) {
                var r = hs(e, t = t || "keep"), e = hs(e.value, t);
                return "all" === t || null !== e && e <= r
            }

            return (a.prototype = new e).type = "AssignmentNode", a.prototype.isAssignmentNode = !0, a.prototype._compile = function (e, t) {
                var i = this.object._compile(e, t), s = this.index ? this.index._compile(e, t) : null,
                    u = this.value._compile(e, t), a = this.object.name;
                if (this.index) {
                    if (this.index.isObjectProperty()) {
                        var o = this.index.getObjectProperty();
                        return function (e, t, r) {
                            var n = i(e, t, r), r = u(e, t, r);
                            return gi(n, o, r)
                        }
                    }
                    if (pe(this.object)) return function (e, t, r) {
                        var n = i(e, t, r), r = u(e, t, r), t = s(e, t, n);
                        return gi(e, a, m(n, t, r)), r
                    };
                    var c = this.object.object._compile(e, t);
                    if (this.object.index.isObjectProperty()) {
                        var f = this.object.index.getObjectProperty();
                        return function (e, t, r) {
                            var n = c(e, t, r), i = yi(n, f), a = s(e, t, i), r = u(e, t, r);
                            return gi(n, f, m(i, a, r)), r
                        }
                    }
                    var l = this.object.index._compile(e, t);
                    return function (e, t, r) {
                        var n = c(e, t, r), i = l(e, t, n), a = p(n, i), o = s(e, t, a), r = u(e, t, r);
                        return m(n, i, m(a, o, r)), r
                    }
                }
                if (!pe(this.object)) throw new TypeError("SymbolNode expected as object");
                return function (e, t, r) {
                    return gi(e, a, u(e, t, r))
                }
            }, a.prototype.forEach = function (e) {
                e(this.object, "object", this), this.index && e(this.index, "index", this), e(this.value, "value", this)
            }, a.prototype.map = function (e) {
                return new a(this._ifNode(e(this.object, "object", this)), this.index ? this._ifNode(e(this.index, "index", this)) : null, this._ifNode(e(this.value, "value", this)))
            }, a.prototype.clone = function () {
                return new a(this.object, this.index, this.value)
            }, a.prototype._toString = function (e) {
                var t = this.object.toString(e), r = this.index ? this.index.toString(e) : "",
                    n = this.value.toString(e);
                return o(this, e && e.parenthesis) && (n = "(" + n + ")"), t + r + " = " + n
            }, a.prototype.toJSON = function () {
                return {mathjs: "AssignmentNode", object: this.object, index: this.index, value: this.value}
            }, a.fromJSON = function (e) {
                return new a(e.object, e.index, e.value)
            }, a.prototype.toHTML = function (e) {
                var t = this.object.toHTML(e), r = this.index ? this.index.toHTML(e) : "", n = this.value.toHTML(e);
                return o(this, e && e.parenthesis) && (n = '<span class="math-paranthesis math-round-parenthesis">(</span>' + n + '<span class="math-paranthesis math-round-parenthesis">)</span>'), t + r + '<span class="math-operator math-assignment-operator math-variable-assignment-operator math-binary-operator">=</span>' + n
            }, a.prototype._toTex = function (e) {
                var t = this.object.toTex(e), r = this.index ? this.index.toTex(e) : "", n = this.value.toTex(e);
                return o(this, e && e.parenthesis) && (n = "\\left(".concat(n, "\\right)")), t + r + ":=" + n
            }, a
        }, {isClass: !0, isNode: !0}), vs = Ye("BlockNode", ["ResultSet", "Node"], function (e) {
            var o = e.ResultSet, e = e.Node;

            function a(e) {
                if (!(this instanceof a)) throw new SyntaxError("Constructor must be called with the new operator");
                if (!Array.isArray(e)) throw new Error("Array expected");
                this.blocks = e.map(function (e) {
                    var t = e && e.node, e = !e || void 0 === e.visible || e.visible;
                    if (!R(t)) throw new TypeError('Property "node" must be a Node');
                    if ("boolean" != typeof e) throw new TypeError('Property "visible" must be a boolean');
                    return {node: t, visible: e}
                })
            }

            return (a.prototype = new e).type = "BlockNode", a.prototype.isBlockNode = !0, a.prototype._compile = function (t, r) {
                var e = Ie(this.blocks, function (e) {
                    return {evaluate: e.node._compile(t, r), visible: e.visible}
                });
                return function (r, n, i) {
                    var a = [];
                    return Be(e, function (e) {
                        var t = e.evaluate(r, n, i);
                        e.visible && a.push(t)
                    }), new o(a)
                }
            }, a.prototype.forEach = function (e) {
                for (var t = 0; t < this.blocks.length; t++) e(this.blocks[t].node, "blocks[" + t + "].node", this)
            }, a.prototype.map = function (e) {
                for (var t = [], r = 0; r < this.blocks.length; r++) {
                    var n = this.blocks[r], i = this._ifNode(e(n.node, "blocks[" + r + "].node", this));
                    t[r] = {node: i, visible: n.visible}
                }
                return new a(t)
            }, a.prototype.clone = function () {
                return new a(this.blocks.map(function (e) {
                    return {node: e.node, visible: e.visible}
                }))
            }, a.prototype._toString = function (t) {
                return this.blocks.map(function (e) {
                    return e.node.toString(t) + (e.visible ? "" : ";")
                }).join("\n")
            }, a.prototype.toJSON = function () {
                return {mathjs: "BlockNode", blocks: this.blocks}
            }, a.fromJSON = function (e) {
                return new a(e.blocks)
            }, a.prototype.toHTML = function (t) {
                return this.blocks.map(function (e) {
                    return e.node.toHTML(t) + (e.visible ? "" : '<span class="math-separator">;</span>')
                }).join('<span class="math-separator"><br /></span>')
            }, a.prototype._toTex = function (t) {
                return this.blocks.map(function (e) {
                    return e.node.toTex(t) + (e.visible ? "" : ";")
                }).join("\\;\\;\n")
            }, a
        }, {isClass: !0, isNode: !0}), xs = Ye("ConditionalNode", ["Node"], function (e) {
            e = e.Node;

            function n(e, t, r) {
                if (!(this instanceof n)) throw new SyntaxError("Constructor must be called with the new operator");
                if (!R(e)) throw new TypeError("Parameter condition must be a Node");
                if (!R(t)) throw new TypeError("Parameter trueExpr must be a Node");
                if (!R(r)) throw new TypeError("Parameter falseExpr must be a Node");
                this.condition = e, this.trueExpr = t, this.falseExpr = r
            }

            return (n.prototype = new e).type = "ConditionalNode", n.prototype.isConditionalNode = !0, n.prototype._compile = function (e, t) {
                var n = this.condition._compile(e, t), i = this.trueExpr._compile(e, t),
                    a = this.falseExpr._compile(e, t);
                return function (e, t, r) {
                    return (function (e) {
                        if ("number" == typeof e || "boolean" == typeof e || "string" == typeof e) return e;
                        if (e) {
                            if (I(e)) return !e.isZero();
                            if (Z(e)) return e.re || e.im;
                            if (W(e)) return e.value
                        }
                        if (null != e) throw new TypeError('Unsupported type of condition "' + J(e) + '"')
                    }(n(e, t, r)) ? i : a)(e, t, r)
                }
            }, n.prototype.forEach = function (e) {
                e(this.condition, "condition", this), e(this.trueExpr, "trueExpr", this), e(this.falseExpr, "falseExpr", this)
            }, n.prototype.map = function (e) {
                return new n(this._ifNode(e(this.condition, "condition", this)), this._ifNode(e(this.trueExpr, "trueExpr", this)), this._ifNode(e(this.falseExpr, "falseExpr", this)))
            }, n.prototype.clone = function () {
                return new n(this.condition, this.trueExpr, this.falseExpr)
            }, n.prototype._toString = function (e) {
                var t = e && e.parenthesis ? e.parenthesis : "keep", r = hs(this, t), n = this.condition.toString(e),
                    i = hs(this.condition, t);
                ("all" === t || "OperatorNode" === this.condition.type || null !== i && i <= r) && (n = "(" + n + ")");
                var a = this.trueExpr.toString(e), i = hs(this.trueExpr, t);
                ("all" === t || "OperatorNode" === this.trueExpr.type || null !== i && i <= r) && (a = "(" + a + ")");
                i = this.falseExpr.toString(e), e = hs(this.falseExpr, t);
                return ("all" === t || "OperatorNode" === this.falseExpr.type || null !== e && e <= r) && (i = "(" + i + ")"), n + " ? " + a + " : " + i
            }, n.prototype.toJSON = function () {
                return {
                    mathjs: "ConditionalNode",
                    condition: this.condition,
                    trueExpr: this.trueExpr,
                    falseExpr: this.falseExpr
                }
            }, n.fromJSON = function (e) {
                return new n(e.condition, e.trueExpr, e.falseExpr)
            }, n.prototype.toHTML = function (e) {
                var t = e && e.parenthesis ? e.parenthesis : "keep", r = hs(this, t), n = this.condition.toHTML(e),
                    i = hs(this.condition, t);
                ("all" === t || "OperatorNode" === this.condition.type || null !== i && i <= r) && (n = '<span class="math-parenthesis math-round-parenthesis">(</span>' + n + '<span class="math-parenthesis math-round-parenthesis">)</span>');
                var a = this.trueExpr.toHTML(e), i = hs(this.trueExpr, t);
                ("all" === t || "OperatorNode" === this.trueExpr.type || null !== i && i <= r) && (a = '<span class="math-parenthesis math-round-parenthesis">(</span>' + a + '<span class="math-parenthesis math-round-parenthesis">)</span>');
                i = this.falseExpr.toHTML(e), e = hs(this.falseExpr, t);
                return ("all" === t || "OperatorNode" === this.falseExpr.type || null !== e && e <= r) && (i = '<span class="math-parenthesis math-round-parenthesis">(</span>' + i + '<span class="math-parenthesis math-round-parenthesis">)</span>'), n + '<span class="math-operator math-conditional-operator">?</span>' + a + '<span class="math-operator math-conditional-operator">:</span>' + i
            }, n.prototype._toTex = function (e) {
                return "\\begin{cases} {" + this.trueExpr.toTex(e) + "}, &\\quad{\\text{if }\\;" + this.condition.toTex(e) + "}\\\\{" + this.falseExpr.toTex(e) + "}, &\\quad{\\text{otherwise}}\\end{cases}"
            }, n
        }, {isClass: !0, isNode: !0}), at = r(11), bs = r.n(at), ws = {
            Alpha: "A",
            alpha: "\\alpha",
            Beta: "B",
            beta: "\\beta",
            Gamma: "\\Gamma",
            gamma: "\\gamma",
            Delta: "\\Delta",
            delta: "\\delta",
            Epsilon: "E",
            epsilon: "\\epsilon",
            varepsilon: "\\varepsilon",
            Zeta: "Z",
            zeta: "\\zeta",
            Eta: "H",
            eta: "\\eta",
            Theta: "\\Theta",
            theta: "\\theta",
            vartheta: "\\vartheta",
            Iota: "I",
            iota: "\\iota",
            Kappa: "K",
            kappa: "\\kappa",
            varkappa: "\\varkappa",
            Lambda: "\\Lambda",
            lambda: "\\lambda",
            Mu: "M",
            mu: "\\mu",
            Nu: "N",
            nu: "\\nu",
            Xi: "\\Xi",
            xi: "\\xi",
            Omicron: "O",
            omicron: "o",
            Pi: "\\Pi",
            pi: "\\pi",
            varpi: "\\varpi",
            Rho: "P",
            rho: "\\rho",
            varrho: "\\varrho",
            Sigma: "\\Sigma",
            sigma: "\\sigma",
            varsigma: "\\varsigma",
            Tau: "T",
            tau: "\\tau",
            Upsilon: "\\Upsilon",
            upsilon: "\\upsilon",
            Phi: "\\Phi",
            phi: "\\phi",
            varphi: "\\varphi",
            Chi: "X",
            chi: "\\chi",
            Psi: "\\Psi",
            psi: "\\psi",
            Omega: "\\Omega",
            omega: "\\omega",
            true: "\\mathrm{True}",
            false: "\\mathrm{False}",
            i: "i",
            inf: "\\infty",
            Inf: "\\infty",
            infinity: "\\infty",
            Infinity: "\\infty",
            oo: "\\infty",
            lim: "\\lim",
            undefined: "\\mathbf{?}"
        }, Ns = {
            transpose: "^\\top",
            ctranspose: "^H",
            factorial: "!",
            pow: "^",
            dotPow: ".^\\wedge",
            unaryPlus: "+",
            unaryMinus: "-",
            bitNot: "\\~",
            not: "\\neg",
            multiply: "\\cdot",
            divide: "\\frac",
            dotMultiply: ".\\cdot",
            dotDivide: ".:",
            mod: "\\mod",
            add: "+",
            subtract: "-",
            to: "\\rightarrow",
            leftShift: "<<",
            rightArithShift: ">>",
            rightLogShift: ">>>",
            equal: "=",
            unequal: "\\neq",
            smaller: "<",
            larger: ">",
            smallerEq: "\\leq",
            largerEq: "\\geq",
            bitAnd: "\\&",
            bitXor: "\\underline{|}",
            bitOr: "|",
            and: "\\wedge",
            xor: "\\veebar",
            or: "\\vee"
        }, Ms = {
            abs: {1: "\\left|${args[0]}\\right|"},
            add: {2: "\\left(${args[0]}".concat(Ns.add, "${args[1]}\\right)")},
            cbrt: {1: "\\sqrt[3]{${args[0]}}"},
            ceil: {1: "\\left\\lceil${args[0]}\\right\\rceil"},
            cube: {1: "\\left(${args[0]}\\right)^3"},
            divide: {2: "\\frac{${args[0]}}{${args[1]}}"},
            dotDivide: {2: "\\left(${args[0]}".concat(Ns.dotDivide, "${args[1]}\\right)")},
            dotMultiply: {2: "\\left(${args[0]}".concat(Ns.dotMultiply, "${args[1]}\\right)")},
            dotPow: {2: "\\left(${args[0]}".concat(Ns.dotPow, "${args[1]}\\right)")},
            exp: {1: "\\exp\\left(${args[0]}\\right)"},
            expm1: "\\left(e".concat(Ns.pow, "{${args[0]}}-1\\right)"),
            fix: {1: "\\mathrm{${name}}\\left(${args[0]}\\right)"},
            floor: {1: "\\left\\lfloor${args[0]}\\right\\rfloor"},
            gcd: "\\gcd\\left(${args}\\right)",
            hypot: "\\hypot\\left(${args}\\right)",
            log: {1: "\\ln\\left(${args[0]}\\right)", 2: "\\log_{${args[1]}}\\left(${args[0]}\\right)"},
            log10: {1: "\\log_{10}\\left(${args[0]}\\right)"},
            log1p: {1: "\\ln\\left(${args[0]}+1\\right)", 2: "\\log_{${args[1]}}\\left(${args[0]}+1\\right)"},
            log2: "\\log_{2}\\left(${args[0]}\\right)",
            mod: {2: "\\left(${args[0]}".concat(Ns.mod, "${args[1]}\\right)")},
            multiply: {2: "\\left(${args[0]}".concat(Ns.multiply, "${args[1]}\\right)")},
            norm: {1: "\\left\\|${args[0]}\\right\\|", 2: void 0},
            nthRoot: {2: "\\sqrt[${args[1]}]{${args[0]}}"},
            nthRoots: {2: "\\{y : $y^{args[1]} = {${args[0]}}\\}"},
            pow: {2: "\\left(${args[0]}\\right)".concat(Ns.pow, "{${args[1]}}")},
            round: {1: "\\left\\lfloor${args[0]}\\right\\rceil", 2: void 0},
            sign: {1: "\\mathrm{${name}}\\left(${args[0]}\\right)"},
            sqrt: {1: "\\sqrt{${args[0]}}"},
            square: {1: "\\left(${args[0]}\\right)^2"},
            subtract: {2: "\\left(${args[0]}".concat(Ns.subtract, "${args[1]}\\right)")},
            unaryMinus: {1: "".concat(Ns.unaryMinus, "\\left(${args[0]}\\right)")},
            unaryPlus: {1: "".concat(Ns.unaryPlus, "\\left(${args[0]}\\right)")},
            bitAnd: {2: "\\left(${args[0]}".concat(Ns.bitAnd, "${args[1]}\\right)")},
            bitNot: {1: Ns.bitNot + "\\left(${args[0]}\\right)"},
            bitOr: {2: "\\left(${args[0]}".concat(Ns.bitOr, "${args[1]}\\right)")},
            bitXor: {2: "\\left(${args[0]}".concat(Ns.bitXor, "${args[1]}\\right)")},
            leftShift: {2: "\\left(${args[0]}".concat(Ns.leftShift, "${args[1]}\\right)")},
            rightArithShift: {2: "\\left(${args[0]}".concat(Ns.rightArithShift, "${args[1]}\\right)")},
            rightLogShift: {2: "\\left(${args[0]}".concat(Ns.rightLogShift, "${args[1]}\\right)")},
            bellNumbers: {1: "\\mathrm{B}_{${args[0]}}"},
            catalan: {1: "\\mathrm{C}_{${args[0]}}"},
            stirlingS2: {2: "\\mathrm{S}\\left(${args}\\right)"},
            arg: {1: "\\arg\\left(${args[0]}\\right)"},
            conj: {1: "\\left(${args[0]}\\right)^*"},
            im: {1: "\\Im\\left\\lbrace${args[0]}\\right\\rbrace"},
            re: {1: "\\Re\\left\\lbrace${args[0]}\\right\\rbrace"},
            and: {2: "\\left(${args[0]}".concat(Ns.and, "${args[1]}\\right)")},
            not: {1: Ns.not + "\\left(${args[0]}\\right)"},
            or: {2: "\\left(${args[0]}".concat(Ns.or, "${args[1]}\\right)")},
            xor: {2: "\\left(${args[0]}".concat(Ns.xor, "${args[1]}\\right)")},
            cross: {2: "\\left(${args[0]}\\right)\\times\\left(${args[1]}\\right)"},
            ctranspose: {1: "\\left(${args[0]}\\right)".concat(Ns.ctranspose)},
            det: {1: "\\det\\left(${args[0]}\\right)"},
            dot: {2: "\\left(${args[0]}\\cdot${args[1]}\\right)"},
            expm: {1: "\\exp\\left(${args[0]}\\right)"},
            inv: {1: "\\left(${args[0]}\\right)^{-1}"},
            sqrtm: {1: "{${args[0]}}".concat(Ns.pow, "{\\frac{1}{2}}")},
            trace: {1: "\\mathrm{tr}\\left(${args[0]}\\right)"},
            transpose: {1: "\\left(${args[0]}\\right)".concat(Ns.transpose)},
            combinations: {2: "\\binom{${args[0]}}{${args[1]}}"},
            combinationsWithRep: {2: "\\left(\\!\\!{\\binom{${args[0]}}{${args[1]}}}\\!\\!\\right)"},
            factorial: {1: "\\left(${args[0]}\\right)".concat(Ns.factorial)},
            gamma: {1: "\\Gamma\\left(${args[0]}\\right)"},
            equal: {2: "\\left(${args[0]}".concat(Ns.equal, "${args[1]}\\right)")},
            larger: {2: "\\left(${args[0]}".concat(Ns.larger, "${args[1]}\\right)")},
            largerEq: {2: "\\left(${args[0]}".concat(Ns.largerEq, "${args[1]}\\right)")},
            smaller: {2: "\\left(${args[0]}".concat(Ns.smaller, "${args[1]}\\right)")},
            smallerEq: {2: "\\left(${args[0]}".concat(Ns.smallerEq, "${args[1]}\\right)")},
            unequal: {2: "\\left(${args[0]}".concat(Ns.unequal, "${args[1]}\\right)")},
            erf: {1: "erf\\left(${args[0]}\\right)"},
            max: "\\max\\left(${args}\\right)",
            min: "\\min\\left(${args}\\right)",
            variance: "\\mathrm{Var}\\left(${args}\\right)",
            acos: {1: "\\cos^{-1}\\left(${args[0]}\\right)"},
            acosh: {1: "\\cosh^{-1}\\left(${args[0]}\\right)"},
            acot: {1: "\\cot^{-1}\\left(${args[0]}\\right)"},
            acoth: {1: "\\coth^{-1}\\left(${args[0]}\\right)"},
            acsc: {1: "\\csc^{-1}\\left(${args[0]}\\right)"},
            acsch: {1: "\\mathrm{csch}^{-1}\\left(${args[0]}\\right)"},
            asec: {1: "\\sec^{-1}\\left(${args[0]}\\right)"},
            asech: {1: "\\mathrm{sech}^{-1}\\left(${args[0]}\\right)"},
            asin: {1: "\\sin^{-1}\\left(${args[0]}\\right)"},
            asinh: {1: "\\sinh^{-1}\\left(${args[0]}\\right)"},
            atan: {1: "\\tan^{-1}\\left(${args[0]}\\right)"},
            atan2: {2: "\\mathrm{atan2}\\left(${args}\\right)"},
            atanh: {1: "\\tanh^{-1}\\left(${args[0]}\\right)"},
            cos: {1: "\\cos\\left(${args[0]}\\right)"},
            cosh: {1: "\\cosh\\left(${args[0]}\\right)"},
            cot: {1: "\\cot\\left(${args[0]}\\right)"},
            coth: {1: "\\coth\\left(${args[0]}\\right)"},
            csc: {1: "\\csc\\left(${args[0]}\\right)"},
            csch: {1: "\\mathrm{csch}\\left(${args[0]}\\right)"},
            sec: {1: "\\sec\\left(${args[0]}\\right)"},
            sech: {1: "\\mathrm{sech}\\left(${args[0]}\\right)"},
            sin: {1: "\\sin\\left(${args[0]}\\right)"},
            sinh: {1: "\\sinh\\left(${args[0]}\\right)"},
            tan: {1: "\\tan\\left(${args[0]}\\right)"},
            tanh: {1: "\\tanh\\left(${args[0]}\\right)"},
            to: {2: "\\left(${args[0]}".concat(Ns.to, "${args[1]}\\right)")},
            numeric: function (e, t) {
                return e.args[0].toTex()
            },
            number: {0: "0", 1: "\\left(${args[0]}\\right)", 2: "\\left(\\left(${args[0]}\\right)${args[1]}\\right)"},
            string: {0: '\\mathtt{""}', 1: "\\mathrm{string}\\left(${args[0]}\\right)"},
            bignumber: {0: "0", 1: "\\left(${args[0]}\\right)"},
            complex: {
                0: "0",
                1: "\\left(${args[0]}\\right)",
                2: "\\left(\\left(${args[0]}\\right)+".concat(ws.i, "\\cdot\\left(${args[1]}\\right)\\right)")
            },
            matrix: {
                0: "\\begin{bmatrix}\\end{bmatrix}",
                1: "\\left(${args[0]}\\right)",
                2: "\\left(${args[0]}\\right)"
            },
            sparse: {0: "\\begin{bsparse}\\end{bsparse}", 1: "\\left(${args[0]}\\right)"},
            unit: {1: "\\left(${args[0]}\\right)", 2: "\\left(\\left(${args[0]}\\right)${args[1]}\\right)"}
        }, Ss = {deg: "^\\circ"};

        function Es(e) {
            return bs()(e, {preserveFormatting: !0})
        }

        function As(e, t) {
            return (t = void 0 !== t && t) ? We(Ss, e) ? Ss[e] : "\\mathrm{" + Es(e) + "}" : We(ws, e) ? ws[e] : Es(e)
        }

        var Os = Ye("ConstantNode", ["Node"], function (e) {
            e = e.Node;

            function t(e) {
                if (!(this instanceof t)) throw new SyntaxError("Constructor must be called with the new operator");
                this.value = e
            }

            return (t.prototype = new e).type = "ConstantNode", t.prototype.isConstantNode = !0, t.prototype._compile = function (e, t) {
                var r = this.value;
                return function () {
                    return r
                }
            }, t.prototype.forEach = function (e) {
            }, t.prototype.map = function (e) {
                return this.clone()
            }, t.prototype.clone = function () {
                return new t(this.value)
            }, t.prototype._toString = function (e) {
                return ge(this.value, e)
            }, t.prototype.toHTML = function (e) {
                e = this._toString(e);
                switch (J(this.value)) {
                    case"number":
                    case"BigNumber":
                    case"Fraction":
                        return '<span class="math-number">' + e + "</span>";
                    case"string":
                        return '<span class="math-string">' + e + "</span>";
                    case"boolean":
                        return '<span class="math-boolean">' + e + "</span>";
                    case"null":
                        return '<span class="math-null-symbol">' + e + "</span>";
                    case"undefined":
                        return '<span class="math-undefined">' + e + "</span>";
                    default:
                        return '<span class="math-symbol">' + e + "</span>"
                }
            }, t.prototype.toJSON = function () {
                return {mathjs: "ConstantNode", value: this.value}
            }, t.fromJSON = function (e) {
                return new t(e.value)
            }, t.prototype._toTex = function (e) {
                var t = this._toString(e);
                switch (J(this.value)) {
                    case"string":
                        return "\\mathtt{" + Es(t) + "}";
                    case"number":
                    case"BigNumber":
                        if (!isFinite(this.value)) return this.value.valueOf() < 0 ? "-\\infty" : "\\infty";
                        e = t.toLowerCase().indexOf("e");
                        return -1 !== e ? t.substring(0, e) + "\\cdot10^{" + t.substring(e + 1) + "}" : t;
                    case"Fraction":
                        return this.value.toLatex();
                    default:
                        return t
                }
            }, t
        }, {isClass: !0, isNode: !0}), Cs = Ye("FunctionAssignmentNode", ["typed", "Node"], function (e) {
            var f = e.typed, e = e.Node;

            function n(e, t, r) {
                if (!(this instanceof n)) throw new SyntaxError("Constructor must be called with the new operator");
                if ("string" != typeof e) throw new TypeError('String expected for parameter "name"');
                if (!Array.isArray(t)) throw new TypeError('Array containing strings or objects expected for parameter "params"');
                if (!R(r)) throw new TypeError('Node expected for parameter "expr"');
                if (e in is) throw new Error('Illegal function name, "' + e + '" is a reserved keyword');
                this.name = e, this.params = t.map(function (e) {
                    return e && e.name || e
                }), this.types = t.map(function (e) {
                    return e && e.type || "any"
                }), this.expr = r
            }

            function i(e, t) {
                var r = hs(e, t), e = hs(e.expr, t);
                return "all" === t || null !== e && e <= r
            }

            return (n.prototype = new e).type = "FunctionAssignmentNode", n.prototype.isFunctionAssignmentNode = !0, n.prototype._compile = function (e, t) {
                var r = Object.create(t);
                Be(this.params, function (e) {
                    r[e] = !0
                });
                var a = this.expr._compile(e, r), o = this.name, s = this.params, u = Re(this.types, ","),
                    c = o + "(" + Re(this.params, ", ") + ")";
                return function (r, n, i) {
                    var e = {};
                    e[u] = function () {
                        for (var e = Object.create(n), t = 0; t < s.length; t++) e[s[t]] = arguments[t];
                        return a(r, e, i)
                    };
                    e = f(o, e);
                    return e.syntax = c, gi(r, o, e), e
                }
            }, n.prototype.forEach = function (e) {
                e(this.expr, "expr", this)
            }, n.prototype.map = function (e) {
                e = this._ifNode(e(this.expr, "expr", this));
                return new n(this.name, this.params.slice(0), e)
            }, n.prototype.clone = function () {
                return new n(this.name, this.params.slice(0), this.expr)
            }, n.prototype._toString = function (e) {
                var t = e && e.parenthesis ? e.parenthesis : "keep", e = this.expr.toString(e);
                return i(this, t) && (e = "(" + e + ")"), this.name + "(" + this.params.join(", ") + ") = " + e
            }, n.prototype.toJSON = function () {
                var r = this.types;
                return {
                    mathjs: "FunctionAssignmentNode", name: this.name, params: this.params.map(function (e, t) {
                        return {name: e, type: r[t]}
                    }), expr: this.expr
                }
            }, n.fromJSON = function (e) {
                return new n(e.name, e.params, e.expr)
            }, n.prototype.toHTML = function (e) {
                for (var t = e && e.parenthesis ? e.parenthesis : "keep", r = [], n = 0; n < this.params.length; n++) r.push('<span class="math-symbol math-parameter">' + xe(this.params[n]) + "</span>");
                e = this.expr.toHTML(e);
                return i(this, t) && (e = '<span class="math-parenthesis math-round-parenthesis">(</span>' + e + '<span class="math-parenthesis math-round-parenthesis">)</span>'), '<span class="math-function">' + xe(this.name) + '</span><span class="math-parenthesis math-round-parenthesis">(</span>' + r.join('<span class="math-separator">,</span>') + '<span class="math-parenthesis math-round-parenthesis">)</span><span class="math-operator math-assignment-operator math-variable-assignment-operator math-binary-operator">=</span>' + e
            }, n.prototype._toTex = function (e) {
                var t = e && e.parenthesis ? e.parenthesis : "keep", e = this.expr.toTex(e);
                return i(this, t) && (e = "\\left(".concat(e, "\\right)")), "\\mathrm{" + this.name + "}\\left(" + this.params.map(As).join(",") + "\\right):=" + e
            }, n
        }, {isClass: !0, isNode: !0});

        function _s(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
            return n
        }

        var Ts = Ye("IndexNode", ["Range", "Node", "size"], function (e) {
            var n = e.Range, t = e.Node, m = e.size;

            function i(e, t) {
                if (!(this instanceof i)) throw new SyntaxError("Constructor must be called with the new operator");
                if (this.dimensions = e, this.dotNotation = t || !1, !Array.isArray(e) || !e.every(R)) throw new TypeError('Array containing Nodes expected for parameter "dimensions"');
                if (this.dotNotation && !this.isObjectProperty()) throw new Error("dotNotation only applicable for object properties")
            }

            function h(e, t, r) {
                return new n(I(e) ? e.toNumber() : e, I(t) ? t.toNumber() : t, I(r) ? r.toNumber() : r)
            }

            return (i.prototype = new t).type = "IndexNode", i.prototype.isIndexNode = !0, i.prototype._compile = function (r, p) {
                var i = Ie(this.dimensions, function (e, i) {
                    if (U(e)) {
                        if (e.needsEnd()) {
                            var t = Object.create(p);
                            t.end = !0;
                            var a = e.start._compile(r, t), o = e.end._compile(r, t),
                                s = e.step ? e.step._compile(r, t) : function () {
                                    return 1
                                };
                            return function (e, t, r) {
                                var n = m(r).valueOf(), t = Object.create(t);
                                return t.end = n[i], h(a(e, t, r), o(e, t, r), s(e, t, r))
                            }
                        }
                        var n = e.start._compile(r, p), u = e.end._compile(r, p),
                            c = e.step ? e.step._compile(r, p) : function () {
                                return 1
                            };
                        return function (e, t, r) {
                            return h(n(e, t, r), u(e, t, r), c(e, t, r))
                        }
                    }
                    if (pe(e) && "end" === e.name) {
                        t = Object.create(p);
                        t.end = !0;
                        var f = e._compile(r, t);
                        return function (e, t, r) {
                            var n = m(r).valueOf(), t = Object.create(t);
                            return t.end = n[i], f(e, t, r)
                        }
                    }
                    var l = e._compile(r, p);
                    return function (e, t, r) {
                        return l(e, t, r)
                    }
                }), a = yi(r, "index");
                return function (t, r, n) {
                    var e = Ie(i, function (e) {
                        return e(t, r, n)
                    });
                    return a.apply(void 0, function (e) {
                        if (Array.isArray(e)) return _s(e)
                    }(e = e) || function (e) {
                        if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e)
                    }(e) || function (e) {
                        if (e) {
                            if ("string" == typeof e) return _s(e, void 0);
                            var t = Object.prototype.toString.call(e).slice(8, -1);
                            return "Object" === t && e.constructor && (t = e.constructor.name), "Map" === t || "Set" === t ? Array.from(e) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _s(e, void 0) : void 0
                        }
                    }(e) || function () {
                        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                    }())
                }
            }, i.prototype.forEach = function (e) {
                for (var t = 0; t < this.dimensions.length; t++) e(this.dimensions[t], "dimensions[" + t + "]", this)
            }, i.prototype.map = function (e) {
                for (var t = [], r = 0; r < this.dimensions.length; r++) t[r] = this._ifNode(e(this.dimensions[r], "dimensions[" + r + "]", this));
                return new i(t, this.dotNotation)
            }, i.prototype.clone = function () {
                return new i(this.dimensions.slice(0), this.dotNotation)
            }, i.prototype.isObjectProperty = function () {
                return 1 === this.dimensions.length && ce(this.dimensions[0]) && "string" == typeof this.dimensions[0].value
            }, i.prototype.getObjectProperty = function () {
                return this.isObjectProperty() ? this.dimensions[0].value : null
            }, i.prototype._toString = function (e) {
                return this.dotNotation ? "." + this.getObjectProperty() : "[" + this.dimensions.join(", ") + "]"
            }, i.prototype.toJSON = function () {
                return {mathjs: "IndexNode", dimensions: this.dimensions, dotNotation: this.dotNotation}
            }, i.fromJSON = function (e) {
                return new i(e.dimensions, e.dotNotation)
            }, i.prototype.toHTML = function (e) {
                for (var t = [], r = 0; r < this.dimensions.length; r++) t[r] = this.dimensions[r].toHTML();
                return this.dotNotation ? '<span class="math-operator math-accessor-operator">.</span><span class="math-symbol math-property">' + xe(this.getObjectProperty()) + "</span>" : '<span class="math-parenthesis math-square-parenthesis">[</span>' + t.join('<span class="math-separator">,</span>') + '<span class="math-parenthesis math-square-parenthesis">]</span>'
            }, i.prototype._toTex = function (t) {
                var e = this.dimensions.map(function (e) {
                    return e.toTex(t)
                });
                return this.dotNotation ? "." + this.getObjectProperty() : "_{" + e.join(",") + "}"
            }, i
        }, {isClass: !0, isNode: !0});

        function zs(e) {
            return (zs = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        var qs = Ye("ObjectNode", ["Node"], function (e) {
            e = e.Node;

            function n(t) {
                if (!(this instanceof n)) throw new SyntaxError("Constructor must be called with the new operator");
                if (this.properties = t || {}, t && ("object" !== zs(t) || !Object.keys(t).every(function (e) {
                    return R(t[e])
                }))) throw new TypeError("Object containing Nodes expected")
            }

            return (n.prototype = new e).type = "ObjectNode", n.prototype.isObjectNode = !0, n.prototype._compile = function (e, t) {
                var r, a = {};
                for (r in this.properties) if (We(this.properties, r)) {
                    var n = ve(r), n = JSON.parse(n);
                    if (!vi(this.properties, n)) throw new Error('No access to property "' + n + '"');
                    a[n] = this.properties[r]._compile(e, t)
                }
                return function (e, t, r) {
                    var n, i = {};
                    for (n in a) We(a, n) && (i[n] = a[n](e, t, r));
                    return i
                }
            }, n.prototype.forEach = function (e) {
                for (var t in this.properties) We(this.properties, t) && e(this.properties[t], "properties[" + ve(t) + "]", this)
            }, n.prototype.map = function (e) {
                var t, r = {};
                for (t in this.properties) We(this.properties, t) && (r[t] = this._ifNode(e(this.properties[t], "properties[" + ve(t) + "]", this)));
                return new n(r)
            }, n.prototype.clone = function () {
                var e, t = {};
                for (e in this.properties) We(this.properties, e) && (t[e] = this.properties[e]);
                return new n(t)
            }, n.prototype._toString = function (e) {
                var t, r = [];
                for (t in this.properties) We(this.properties, t) && r.push(ve(t) + ": " + this.properties[t].toString(e));
                return "{" + r.join(", ") + "}"
            }, n.prototype.toJSON = function () {
                return {mathjs: "ObjectNode", properties: this.properties}
            }, n.fromJSON = function (e) {
                return new n(e.properties)
            }, n.prototype.toHTML = function (e) {
                var t, r = [];
                for (t in this.properties) We(this.properties, t) && r.push('<span class="math-symbol math-property">' + xe(t) + '</span><span class="math-operator math-assignment-operator math-property-assignment-operator math-binary-operator">:</span>' + this.properties[t].toHTML(e));
                return '<span class="math-parenthesis math-curly-parenthesis">{</span>' + r.join('<span class="math-separator">,</span>') + '<span class="math-parenthesis math-curly-parenthesis">}</span>'
            }, n.prototype._toTex = function (e) {
                var t, r = [];
                for (t in this.properties) We(this.properties, t) && r.push("\\mathbf{" + t + ":} & " + this.properties[t].toTex(e) + "\\\\");
                return "\\left\\{\\begin{array}{ll}".concat(r.join("\n"), "\\end{array}\\right\\}")
            }, n
        }, {isClass: !0, isNode: !0}), Is = Ye("OperatorNode", ["Node"], function (e) {
            e = e.Node;

            function i(e, t, r, n) {
                if (!(this instanceof i)) throw new SyntaxError("Constructor must be called with the new operator");
                if ("string" != typeof e) throw new TypeError('string expected for parameter "op"');
                if ("string" != typeof t) throw new TypeError('string expected for parameter "fn"');
                if (!Array.isArray(r) || !r.every(R)) throw new TypeError('Array containing Nodes expected for parameter "args"');
                this.implicit = !0 === n, this.op = e, this.fn = t, this.args = r || []
            }

            function c(n, i, e, t, r) {
                var a, o = hs(n, i), s = ds(n, i);
                if ("all" === i || 2 < t.length && "OperatorNode:add" !== n.getIdentifier() && "OperatorNode:multiply" !== n.getIdentifier()) return t.map(function (e) {
                    switch (e.getContent().type) {
                        case"ArrayNode":
                        case"ConstantNode":
                        case"SymbolNode":
                        case"ParenthesisNode":
                            return !1;
                        default:
                            return !0
                    }
                });
                switch (t.length) {
                    case 0:
                        a = [];
                        break;
                    case 1:
                        var u = hs(t[0], i);
                        if (r && null !== u) {
                            var c = "keep" === i ? (m = t[0].getIdentifier(), n.getIdentifier()) : (m = t[0].getContent().getIdentifier(), n.getContent().getIdentifier());
                            if (!1 === ms[o][c].latexLeftParens) {
                                a = [!1];
                                break
                            }
                            if (!1 === ms[u][m].latexParens) {
                                a = [!1];
                                break
                            }
                        }
                        if (null === u) {
                            a = [!1];
                            break
                        }
                        if (u <= o) {
                            a = [!0];
                            break
                        }
                        a = [!1];
                        break;
                    case 2:
                        var f, l, p = hs(t[0], i), c = ys(n, t[0], i),
                            m = null !== p && (p === o && "right" === s && !c || p < o), u = hs(t[1], i),
                            c = ys(n, t[1], i), c = null !== u && (u === o && "left" === s && !c || u < o);
                        r && (r = "keep" === i ? (f = n.getIdentifier(), l = n.args[0].getIdentifier(), n.args[1].getIdentifier()) : (f = n.getContent().getIdentifier(), l = n.args[0].getContent().getIdentifier(), n.args[1].getContent().getIdentifier()), null !== p && (!1 === ms[o][f].latexLeftParens && (m = !1), !1 === ms[p][l].latexParens && (m = !1)), null !== u && (!1 === ms[o][f].latexRightParens && (c = !1), !1 === ms[u][r].latexParens && (c = !1))), a = [m, c];
                        break;
                    default:
                        "OperatorNode:add" !== n.getIdentifier() && "OperatorNode:multiply" !== n.getIdentifier() || (a = t.map(function (e) {
                            var t = hs(e, i), r = ys(n, e, i), e = ds(e, i);
                            return null !== t && (o === t && s === e && !r || t < o)
                        }))
                }
                return 2 <= t.length && "OperatorNode:multiply" === n.getIdentifier() && n.implicit && "auto" === i && "hide" === e && (a = t.map(function (e, t) {
                    e = "ParenthesisNode" === e.getIdentifier();
                    return !(!a[t] && !e)
                })), a
            }

            return (i.prototype = new e).type = "OperatorNode", i.prototype.isOperatorNode = !0, i.prototype._compile = function (t, r) {
                if ("string" != typeof this.fn || !xi(t, this.fn)) throw t[this.fn] ? new Error('No access to function "' + this.fn + '"') : new Error("Function " + this.fn + ' missing in provided namespace "math"');
                var i = yi(t, this.fn), e = Ie(this.args, function (e) {
                    return e._compile(t, r)
                });
                if (1 === e.length) {
                    var n = e[0];
                    return function (e, t, r) {
                        return i(n(e, t, r))
                    }
                }
                if (2 !== e.length) return function (t, r, n) {
                    return i.apply(null, Ie(e, function (e) {
                        return e(t, r, n)
                    }))
                };
                var a = e[0], o = e[1];
                return function (e, t, r) {
                    return i(a(e, t, r), o(e, t, r))
                }
            }, i.prototype.forEach = function (e) {
                for (var t = 0; t < this.args.length; t++) e(this.args[t], "args[" + t + "]", this)
            }, i.prototype.map = function (e) {
                for (var t = [], r = 0; r < this.args.length; r++) t[r] = this._ifNode(e(this.args[r], "args[" + r + "]", this));
                return new i(this.op, this.fn, t, this.implicit)
            }, i.prototype.clone = function () {
                return new i(this.op, this.fn, this.args.slice(0), this.implicit)
            }, i.prototype.isUnary = function () {
                return 1 === this.args.length
            }, i.prototype.isBinary = function () {
                return 2 === this.args.length
            }, i.prototype._toString = function (r) {
                var e = r && r.parenthesis ? r.parenthesis : "keep", t = r && r.implicit ? r.implicit : "hide",
                    n = this.args, i = c(this, e, t, n, !1);
                if (1 === n.length) {
                    var e = ds(this, e), a = n[0].toString(r);
                    i[0] && (a = "(" + a + ")");
                    var o = /[a-zA-Z]+/.test(this.op);
                    return "right" === e ? this.op + (o ? " " : "") + a : "left" === e ? a + (o ? " " : "") + this.op : a + this.op
                }
                if (2 === n.length) {
                    o = n[0].toString(r), a = n[1].toString(r);
                    return i[0] && (o = "(" + o + ")"), i[1] && (a = "(" + a + ")"), this.implicit && "OperatorNode:multiply" === this.getIdentifier() && "hide" === t ? o + " " + a : o + " " + this.op + " " + a
                }
                if (2 < n.length && ("OperatorNode:add" === this.getIdentifier() || "OperatorNode:multiply" === this.getIdentifier())) {
                    n = n.map(function (e, t) {
                        return e = e.toString(r), i[t] && (e = "(" + e + ")"), e
                    });
                    return this.implicit && "OperatorNode:multiply" === this.getIdentifier() && "hide" === t ? n.join(" ") : n.join(" " + this.op + " ")
                }
                return this.fn + "(" + this.args.join(", ") + ")"
            }, i.prototype.toJSON = function () {
                return {mathjs: "OperatorNode", op: this.op, fn: this.fn, args: this.args, implicit: this.implicit}
            }, i.fromJSON = function (e) {
                return new i(e.op, e.fn, e.args, e.implicit)
            }, i.prototype.toHTML = function (r) {
                var e = r && r.parenthesis ? r.parenthesis : "keep", t = r && r.implicit ? r.implicit : "hide",
                    n = this.args, i = c(this, e, t, n, !1);
                if (1 === n.length) {
                    var e = ds(this, e), a = n[0].toHTML(r);
                    return i[0] && (a = '<span class="math-parenthesis math-round-parenthesis">(</span>' + a + '<span class="math-parenthesis math-round-parenthesis">)</span>'), "right" === e ? '<span class="math-operator math-unary-operator math-lefthand-unary-operator">' + xe(this.op) + "</span>" + a : a + '<span class="math-operator math-unary-operator math-righthand-unary-operator">' + xe(this.op) + "</span>"
                }
                if (2 === n.length) {
                    var a = n[0].toHTML(r), o = n[1].toHTML(r);
                    return i[0] && (a = '<span class="math-parenthesis math-round-parenthesis">(</span>' + a + '<span class="math-parenthesis math-round-parenthesis">)</span>'), i[1] && (o = '<span class="math-parenthesis math-round-parenthesis">(</span>' + o + '<span class="math-parenthesis math-round-parenthesis">)</span>'), this.implicit && "OperatorNode:multiply" === this.getIdentifier() && "hide" === t ? a + '<span class="math-operator math-binary-operator math-implicit-binary-operator"></span>' + o : a + '<span class="math-operator math-binary-operator math-explicit-binary-operator">' + xe(this.op) + "</span>" + o
                }
                o = n.map(function (e, t) {
                    return e = e.toHTML(r), i[t] && (e = '<span class="math-parenthesis math-round-parenthesis">(</span>' + e + '<span class="math-parenthesis math-round-parenthesis">)</span>'), e
                });
                return 2 < n.length && ("OperatorNode:add" === this.getIdentifier() || "OperatorNode:multiply" === this.getIdentifier()) ? this.implicit && "OperatorNode:multiply" === this.getIdentifier() && "hide" === t ? o.join('<span class="math-operator math-binary-operator math-implicit-binary-operator"></span>') : o.join('<span class="math-operator math-binary-operator math-explicit-binary-operator">' + xe(this.op) + "</span>") : '<span class="math-function">' + xe(this.fn) + '</span><span class="math-paranthesis math-round-parenthesis">(</span>' + o.join('<span class="math-separator">,</span>') + '<span class="math-paranthesis math-round-parenthesis">)</span>'
            }, i.prototype._toTex = function (r) {
                var e = r && r.parenthesis ? r.parenthesis : "keep", t = r && r.implicit ? r.implicit : "hide",
                    n = this.args, i = c(this, e, t, n, !0), a = void 0 === (a = Ns[this.fn]) ? this.op : a;
                if (1 === n.length) {
                    var o = ds(this, e), s = n[0].toTex(r);
                    return i[0] && (s = "\\left(".concat(s, "\\right)")), "right" === o ? a + s : s + a
                }
                if (2 === n.length) {
                    o = n[0], s = o.toTex(r);
                    i[0] && (s = "\\left(".concat(s, "\\right)"));
                    var u = n[1].toTex(r);
                    switch (i[1] && (u = "\\left(".concat(u, "\\right)")), o = ("keep" === e ? o : o.getContent()).getIdentifier(), this.getIdentifier()) {
                        case"OperatorNode:divide":
                            return a + "{" + s + "}{" + u + "}";
                        case"OperatorNode:pow":
                            switch (s = "{" + s + "}", u = "{" + u + "}", o) {
                                case"ConditionalNode":
                                case"OperatorNode:divide":
                                    s = "\\left(".concat(s, "\\right)")
                            }
                            break;
                        case"OperatorNode:multiply":
                            if (this.implicit && "hide" === t) return s + "~" + u
                    }
                    return s + a + u
                }
                if (2 < n.length && ("OperatorNode:add" === this.getIdentifier() || "OperatorNode:multiply" === this.getIdentifier())) {
                    u = n.map(function (e, t) {
                        return e = e.toTex(r), i[t] && (e = "\\left(".concat(e, "\\right)")), e
                    });
                    return "OperatorNode:multiply" === this.getIdentifier() && this.implicit ? u.join("~") : u.join(a)
                }
                return "\\mathrm{" + this.fn + "}\\left(" + n.map(function (e) {
                    return e.toTex(r)
                }).join(",") + "\\right)"
            }, i.prototype.getIdentifier = function () {
                return this.type + ":" + this.fn
            }, i
        }, {isClass: !0, isNode: !0}), Bs = Ye("ParenthesisNode", ["Node"], function (e) {
            e = e.Node;

            function t(e) {
                if (!(this instanceof t)) throw new SyntaxError("Constructor must be called with the new operator");
                if (!R(e)) throw new TypeError('Node expected for parameter "content"');
                this.content = e
            }

            return (t.prototype = new e).type = "ParenthesisNode", t.prototype.isParenthesisNode = !0, t.prototype._compile = function (e, t) {
                return this.content._compile(e, t)
            }, t.prototype.getContent = function () {
                return this.content.getContent()
            }, t.prototype.forEach = function (e) {
                e(this.content, "content", this)
            }, t.prototype.map = function (e) {
                return new t(e(this.content, "content", this))
            }, t.prototype.clone = function () {
                return new t(this.content)
            }, t.prototype._toString = function (e) {
                return !e || e && !e.parenthesis || e && "keep" === e.parenthesis ? "(" + this.content.toString(e) + ")" : this.content.toString(e)
            }, t.prototype.toJSON = function () {
                return {mathjs: "ParenthesisNode", content: this.content}
            }, t.fromJSON = function (e) {
                return new t(e.content)
            }, t.prototype.toHTML = function (e) {
                return !e || e && !e.parenthesis || e && "keep" === e.parenthesis ? '<span class="math-parenthesis math-round-parenthesis">(</span>' + this.content.toHTML(e) + '<span class="math-parenthesis math-round-parenthesis">)</span>' : this.content.toHTML(e)
            }, t.prototype._toTex = function (e) {
                return !e || e && !e.parenthesis || e && "keep" === e.parenthesis ? "\\left(".concat(this.content.toTex(e), "\\right)") : this.content.toTex(e)
            }, t
        }, {isClass: !0, isNode: !0}), ks = Ye("RangeNode", ["Node"], function (e) {
            e = e.Node;

            function n(e, t, r) {
                if (!(this instanceof n)) throw new SyntaxError("Constructor must be called with the new operator");
                if (!R(e)) throw new TypeError("Node expected");
                if (!R(t)) throw new TypeError("Node expected");
                if (r && !R(r)) throw new TypeError("Node expected");
                if (3 < arguments.length) throw new Error("Too many arguments");
                this.start = e, this.end = t, this.step = r || null
            }

            function i(e, t) {
                var r = hs(e, t), n = {}, i = hs(e.start, t);
                n.start = null !== i && i <= r || "all" === t, e.step && (i = hs(e.step, t), n.step = null !== i && i <= r || "all" === t);
                e = hs(e.end, t);
                return n.end = null !== e && e <= r || "all" === t, n
            }

            return (n.prototype = new e).type = "RangeNode", n.prototype.isRangeNode = !0, n.prototype.needsEnd = function () {
                return 0 < this.filter(function (e) {
                    return pe(e) && "end" === e.name
                }).length
            }, n.prototype._compile = function (e, t) {
                var n = e.range, i = this.start._compile(e, t), a = this.end._compile(e, t);
                if (this.step) {
                    var o = this.step._compile(e, t);
                    return function (e, t, r) {
                        return n(i(e, t, r), a(e, t, r), o(e, t, r))
                    }
                }
                return function (e, t, r) {
                    return n(i(e, t, r), a(e, t, r))
                }
            }, n.prototype.forEach = function (e) {
                e(this.start, "start", this), e(this.end, "end", this), this.step && e(this.step, "step", this)
            }, n.prototype.map = function (e) {
                return new n(this._ifNode(e(this.start, "start", this)), this._ifNode(e(this.end, "end", this)), this.step && this._ifNode(e(this.step, "step", this)))
            }, n.prototype.clone = function () {
                return new n(this.start, this.end, this.step && this.step)
            }, n.prototype._toString = function (e) {
                var t, r = i(this, e && e.parenthesis ? e.parenthesis : "keep"), n = this.start.toString(e);
                r.start && (n = "(" + n + ")"), t = n, this.step && (n = this.step.toString(e), r.step && (n = "(" + n + ")"), t += ":" + n);
                e = this.end.toString(e);
                return r.end && (e = "(" + e + ")"), t + ":" + e
            }, n.prototype.toJSON = function () {
                return {mathjs: "RangeNode", start: this.start, end: this.end, step: this.step}
            }, n.fromJSON = function (e) {
                return new n(e.start, e.end, e.step)
            }, n.prototype.toHTML = function (e) {
                var t, r = i(this, e && e.parenthesis ? e.parenthesis : "keep"), n = this.start.toHTML(e);
                r.start && (n = '<span class="math-parenthesis math-round-parenthesis">(</span>' + n + '<span class="math-parenthesis math-round-parenthesis">)</span>'), t = n, this.step && (n = this.step.toHTML(e), r.step && (n = '<span class="math-parenthesis math-round-parenthesis">(</span>' + n + '<span class="math-parenthesis math-round-parenthesis">)</span>'), t += '<span class="math-operator math-range-operator">:</span>' + n);
                e = this.end.toHTML(e);
                return r.end && (e = '<span class="math-parenthesis math-round-parenthesis">(</span>' + e + '<span class="math-parenthesis math-round-parenthesis">)</span>'), t + '<span class="math-operator math-range-operator">:</span>' + e
            }, n.prototype._toTex = function (e) {
                var t, r = i(this, e && e.parenthesis ? e.parenthesis : "keep"), n = this.start.toTex(e);
                r.start && (n = "\\left(".concat(n, "\\right)")), this.step && (t = this.step.toTex(e), r.step && (t = "\\left(".concat(t, "\\right)")), n += ":" + t);
                e = this.end.toTex(e);
                return r.end && (e = "\\left(".concat(e, "\\right)")), n + ":" + e
            }, n
        }, {isClass: !0, isNode: !0}), Ds = Ye("RelationalNode", ["Node"], function (e) {
            e = e.Node;

            function i(e, t) {
                if (!(this instanceof i)) throw new SyntaxError("Constructor must be called with the new operator");
                if (!Array.isArray(e)) throw new TypeError("Parameter conditionals must be an array");
                if (!Array.isArray(t)) throw new TypeError("Parameter params must be an array");
                if (e.length !== t.length - 1) throw new TypeError("Parameter params must contain exactly one more element than parameter conditionals");
                this.conditionals = e, this.params = t
            }

            return (i.prototype = new e).type = "RelationalNode", i.prototype.isRelationalNode = !0, i.prototype._compile = function (o, t) {
                var s = this, u = this.params.map(function (e) {
                    return e._compile(o, t)
                });
                return function (e, t, r) {
                    for (var n, i = u[0](e, t, r), a = 0; a < s.conditionals.length; a++) if (n = i, i = u[a + 1](e, t, r), !yi(o, s.conditionals[a])(n, i)) return !1;
                    return !0
                }
            }, i.prototype.forEach = function (r) {
                var n = this;
                this.params.forEach(function (e, t) {
                    return r(e, "params[" + t + "]", n)
                }, this)
            }, i.prototype.map = function (r) {
                var n = this;
                return new i(this.conditionals.slice(), this.params.map(function (e, t) {
                    return n._ifNode(r(e, "params[" + t + "]", n))
                }, this))
            }, i.prototype.clone = function () {
                return new i(this.conditionals, this.params)
            }, i.prototype._toString = function (n) {
                for (var i = n && n.parenthesis ? n.parenthesis : "keep", a = hs(this, i), e = this.params.map(function (e, t) {
                    var r = hs(e, i);
                    return "all" === i || null !== r && r <= a ? "(" + e.toString(n) + ")" : e.toString(n)
                }), t = {
                    equal: "==",
                    unequal: "!=",
                    smaller: "<",
                    larger: ">",
                    smallerEq: "<=",
                    largerEq: ">="
                }, r = e[0], o = 0; o < this.conditionals.length; o++) r += " " + t[this.conditionals[o]] + " " + e[o + 1];
                return r
            }, i.prototype.toJSON = function () {
                return {mathjs: "RelationalNode", conditionals: this.conditionals, params: this.params}
            }, i.fromJSON = function (e) {
                return new i(e.conditionals, e.params)
            }, i.prototype.toHTML = function (n) {
                for (var i = n && n.parenthesis ? n.parenthesis : "keep", a = hs(this, i), e = this.params.map(function (e, t) {
                    var r = hs(e, i);
                    return "all" === i || null !== r && r <= a ? '<span class="math-parenthesis math-round-parenthesis">(</span>' + e.toHTML(n) + '<span class="math-parenthesis math-round-parenthesis">)</span>' : e.toHTML(n)
                }), t = {
                    equal: "==",
                    unequal: "!=",
                    smaller: "<",
                    larger: ">",
                    smallerEq: "<=",
                    largerEq: ">="
                }, r = e[0], o = 0; o < this.conditionals.length; o++) r += '<span class="math-operator math-binary-operator math-explicit-binary-operator">' + xe(t[this.conditionals[o]]) + "</span>" + e[o + 1];
                return r
            }, i.prototype._toTex = function (n) {
                for (var i = n && n.parenthesis ? n.parenthesis : "keep", a = hs(this, i), e = this.params.map(function (e, t) {
                    var r = hs(e, i);
                    return "all" === i || null !== r && r <= a ? "\\left(" + e.toTex(n) + "\right)" : e.toTex(n)
                }), t = e[0], r = 0; r < this.conditionals.length; r++) t += Ns[this.conditionals[r]] + e[r + 1];
                return t
            }, i
        }, {isClass: !0, isNode: !0}), Rs = Ye("SymbolNode", ["math", "?Unit", "Node"], function (e) {
            var r = e.math, o = e.Unit, e = e.Node;

            function s(e) {
                return !!o && o.isValuelessUnit(e)
            }

            function u(e) {
                if (!(this instanceof u)) throw new SyntaxError("Constructor must be called with the new operator");
                if ("string" != typeof e) throw new TypeError('String expected for parameter "name"');
                this.name = e
            }

            return (u.prototype = new e).type = "SymbolNode", u.prototype.isSymbolNode = !0, u.prototype._compile = function (n, e) {
                var i = this.name;
                if (!0 === e[i]) return function (e, t, r) {
                    return t[i]
                };
                if (i in n) return function (e, t, r) {
                    return yi(i in e ? e : n, i)
                };
                var a = s(i);
                return function (e, t, r) {
                    return i in e ? yi(e, i) : a ? new o(null, i) : u.onUndefinedSymbol(i)
                }
            }, u.prototype.forEach = function (e) {
            }, u.prototype.map = function (e) {
                return this.clone()
            }, u.onUndefinedSymbol = function (e) {
                throw new Error("Undefined symbol " + e)
            }, u.prototype.clone = function () {
                return new u(this.name)
            }, u.prototype._toString = function (e) {
                return this.name
            }, u.prototype.toHTML = function (e) {
                var t = xe(this.name);
                return "true" === t || "false" === t ? '<span class="math-symbol math-boolean">' + t + "</span>" : "i" === t ? '<span class="math-symbol math-imaginary-symbol">' + t + "</span>" : "Infinity" === t ? '<span class="math-symbol math-infinity-symbol">' + t + "</span>" : "NaN" === t ? '<span class="math-symbol math-nan-symbol">' + t + "</span>" : "null" === t ? '<span class="math-symbol math-null-symbol">' + t + "</span>" : "undefined" === t ? '<span class="math-symbol math-undefined-symbol">' + t + "</span>" : '<span class="math-symbol">' + t + "</span>"
            }, u.prototype.toJSON = function () {
                return {mathjs: "SymbolNode", name: this.name}
            }, u.fromJSON = function (e) {
                return new u(e.name)
            }, u.prototype._toTex = function (e) {
                var t = !1;
                void 0 === r[this.name] && s(this.name) && (t = !0);
                t = As(this.name, t);
                return "\\" === t[0] ? t : " " + t
            }, u
        }, {isClass: !0, isNode: !0});

        function Ps(e) {
            return (Ps = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function js() {
            return (js = Object.assign || function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r, n = arguments[t];
                    for (r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            }).apply(this, arguments)
        }

        var Us = Ye("FunctionNode", ["math", "Node", "SymbolNode"], function (e) {
            var i = e.math, t = e.Node, r = e.SymbolNode;

            function d(e, t) {
                if (!(this instanceof d)) throw new SyntaxError("Constructor must be called with the new operator");
                if ("string" == typeof e && (e = new r(e)), !R(e)) throw new TypeError('Node expected as parameter "fn"');
                if (!Array.isArray(t) || !t.every(R)) throw new TypeError('Array containing Nodes expected for parameter "args"');
                this.fn = e, this.args = t || [], Object.defineProperty(this, "name", {
                    get: function () {
                        return this.fn.name || ""
                    }.bind(this), set: function () {
                        throw new Error("Cannot assign a new name, name is read-only")
                    }
                })
            }

            (d.prototype = new t).type = "FunctionNode", d.prototype.isFunctionNode = !0, d.prototype._compile = function (a, t) {
                if (!(this instanceof d)) throw new TypeError("No valid FunctionNode");
                var o = Ie(this.args, function (e) {
                    return e._compile(a, t)
                });
                if (pe(this.fn)) {
                    var i = function (e) {
                        return r in e ? yi(e, r) : r in a ? yi(a, r) : d.onUndefinedFunction(r)
                    }, r = this.fn.name, e = r in a ? yi(a, r) : void 0;
                    if ("function" == typeof e && !0 === e.rawArgs) {
                        var n = this.args;
                        return function (e, t, r) {
                            return i(e)(n, a, js({}, e, t))
                        }
                    }
                    if (1 === o.length) {
                        var s = o[0];
                        return function (e, t, r) {
                            return i(e)(s(e, t, r))
                        }
                    }
                    if (2 !== o.length) return function (t, r, n) {
                        return i(t).apply(null, Ie(o, function (e) {
                            return e(t, r, n)
                        }))
                    };
                    var u = o[0], c = o[1];
                    return function (e, t, r) {
                        return i(e)(u(e, t, r), c(e, t, r))
                    }
                }
                if (ue(this.fn) && D(this.fn.index) && this.fn.index.isObjectProperty()) {
                    var f = this.fn.object._compile(a, t), l = this.fn.index.getObjectProperty(), p = this.args;
                    return function (t, r, n) {
                        var i = f(t, r, n);
                        return function (e) {
                            if (!xi(i, e)) throw new Error('No access to method "' + e + '"')
                        }(l), i[l] && i[l].rawArgs ? i[l](p, a, js({}, t, r)) : i[l].apply(i, Ie(o, function (e) {
                            return e(t, r, n)
                        }))
                    }
                }
                var m = this.fn._compile(a, t), h = this.args;
                return function (t, r, n) {
                    var e = m(t, r, n);
                    return e && e.rawArgs ? e(h, a, js({}, t, r)) : e.apply(e, Ie(o, function (e) {
                        return e(t, r, n)
                    }))
                }
            }, d.prototype.forEach = function (e) {
                e(this.fn, "fn", this);
                for (var t = 0; t < this.args.length; t++) e(this.args[t], "args[" + t + "]", this)
            }, d.prototype.map = function (e) {
                for (var t = this._ifNode(e(this.fn, "fn", this)), r = [], n = 0; n < this.args.length; n++) r[n] = this._ifNode(e(this.args[n], "args[" + n + "]", this));
                return new d(t, r)
            }, d.prototype.clone = function () {
                return new d(this.fn, this.args.slice(0))
            }, d.onUndefinedFunction = function (e) {
                throw new Error("Undefined function " + e)
            };
            var n = d.prototype.toString;

            function a(e, t, r) {
                for (var n, i = "", a = /\$(?:\{([a-z_][a-z_0-9]*)(?:\[([0-9]+)\])?\}|\$)/gi, o = 0; null !== (n = a.exec(e));) if (i += e.substring(o, n.index), o = n.index, "$$" === n[0]) i += "$", o++; else {
                    o += n[0].length;
                    var s = t[n[1]];
                    if (!s) throw new ReferenceError("Template: Property " + n[1] + " does not exist.");
                    if (void 0 === n[2]) switch (Ps(s)) {
                        case"string":
                            i += s;
                            break;
                        case"object":
                            if (R(s)) i += s.toTex(r); else {
                                if (!Array.isArray(s)) throw new TypeError("Template: " + n[1] + " has to be a Node, String or array of Nodes");
                                i += s.map(function (e, t) {
                                    if (R(e)) return e.toTex(r);
                                    throw new TypeError("Template: " + n[1] + "[" + t + "] is not a Node.")
                                }).join(",")
                            }
                            break;
                        default:
                            throw new TypeError("Template: " + n[1] + " has to be a Node, String or array of Nodes")
                    } else {
                        if (!R(s[n[2]] && s[n[2]])) throw new TypeError("Template: " + n[1] + "[" + n[2] + "] is not a Node.");
                        i += s[n[2]].toTex(r)
                    }
                }
                return i + e.slice(o)
            }

            d.prototype.toString = function (e) {
                var t, r = this.fn.toString(e);
                return e && "object" === Ps(e.handler) && We(e.handler, r) && (t = e.handler[r](this, e)), void 0 !== t ? t : n.call(this, e)
            }, d.prototype._toString = function (t) {
                var e = this.args.map(function (e) {
                    return e.toString(t)
                });
                return (k(this.fn) ? "(" + this.fn.toString(t) + ")" : this.fn.toString(t)) + "(" + e.join(", ") + ")"
            }, d.prototype.toJSON = function () {
                return {mathjs: "FunctionNode", fn: this.fn, args: this.args}
            }, d.fromJSON = function (e) {
                return new d(e.fn, e.args)
            }, d.prototype.toHTML = function (t) {
                var e = this.args.map(function (e) {
                    return e.toHTML(t)
                });
                return '<span class="math-function">' + xe(this.fn) + '</span><span class="math-paranthesis math-round-parenthesis">(</span>' + e.join('<span class="math-separator">,</span>') + '<span class="math-paranthesis math-round-parenthesis">)</span>'
            };
            var o = d.prototype.toTex;
            return d.prototype.toTex = function (e) {
                var t;
                return e && "object" === Ps(e.handler) && We(e.handler, this.name) && (t = e.handler[this.name](this, e)), void 0 !== t ? t : o.call(this, e)
            }, d.prototype._toTex = function (t) {
                var e, r, n = this.args.map(function (e) {
                    return e.toTex(t)
                });
                switch (Ms[this.name] && (e = Ms[this.name]), !i[this.name] || "function" != typeof i[this.name].toTex && "object" !== Ps(i[this.name].toTex) && "string" != typeof i[this.name].toTex || (e = i[this.name].toTex), Ps(e)) {
                    case"function":
                        r = e(this, t);
                        break;
                    case"string":
                        r = a(e, this, t);
                        break;
                    case"object":
                        switch (Ps(e[n.length])) {
                            case"function":
                                r = e[n.length](this, t);
                                break;
                            case"string":
                                r = a(e[n.length], this, t)
                        }
                }
                return void 0 !== r ? r : a("\\mathrm{${name}}\\left(${args}\\right)", this, t)
            }, d.prototype.getIdentifier = function () {
                return this.type + ":" + this.name
            }, d
        }, {isClass: !0, isNode: !0});

        function Fs() {
            return (Fs = Object.assign || function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r, n = arguments[t];
                    for (r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            }).apply(this, arguments)
        }

        var Ls = Ye("parse", ["typed", "numeric", "config", "AccessorNode", "ArrayNode", "AssignmentNode", "BlockNode", "ConditionalNode", "ConstantNode", "FunctionAssignmentNode", "FunctionNode", "IndexNode", "ObjectNode", "OperatorNode", "ParenthesisNode", "RangeNode", "RelationalNode", "SymbolNode"], function (e) {
                var t = e.typed, s = e.numeric, u = e.config, i = e.AccessorNode, c = e.ArrayNode, o = e.AssignmentNode,
                    a = e.BlockNode, f = e.ConditionalNode, l = e.ConstantNode, p = e.FunctionAssignmentNode,
                    m = e.FunctionNode, h = e.IndexNode, d = e.ObjectNode, y = e.OperatorNode, g = e.ParenthesisNode,
                    n = e.RangeNode, v = e.RelationalNode, x = e.SymbolNode, b = t("parse", {
                        string: function (e) {
                            return j(e, {})
                        }, "Array | Matrix": function (e) {
                            return r(e, {})
                        }, "string, Object": function (e, t) {
                            return j(e, void 0 !== t.nodes ? t.nodes : {})
                        }, "Array | Matrix, Object": r
                    });

                function r(e) {
                    var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
                        r = void 0 !== t.nodes ? t.nodes : {};
                    return xt(e, function (e) {
                        if ("string" != typeof e) throw new TypeError("String expected");
                        return j(e, r)
                    })
                }

                var w = 0, N = 1, M = 2, S = 3, E = 4, A = {
                        ",": !0,
                        "(": !0,
                        ")": !0,
                        "[": !0,
                        "]": !0,
                        "{": !0,
                        "}": !0,
                        '"': !0,
                        "'": !0,
                        ";": !0,
                        "+": !0,
                        "-": !0,
                        "*": !0,
                        ".*": !0,
                        "/": !0,
                        "./": !0,
                        "%": !0,
                        "^": !0,
                        ".^": !0,
                        "~": !0,
                        "!": !0,
                        "&": !0,
                        "|": !0,
                        "^|": !0,
                        "=": !0,
                        ":": !0,
                        "?": !0,
                        "==": !0,
                        "!=": !0,
                        "<": !0,
                        ">": !0,
                        "<=": !0,
                        ">=": !0,
                        "<<": !0,
                        ">>": !0,
                        ">>>": !0
                    }, O = {mod: !0, to: !0, in: !0, and: !0, xor: !0, or: !0, not: !0},
                    C = {true: !0, false: !1, null: null, undefined: void 0}, _ = ["NaN", "Infinity"];

                function T(e, t) {
                    return e.expression.substr(e.index, t)
                }

                function z(e) {
                    return T(e, 1)
                }

                function q(e) {
                    e.index++
                }

                function I(e) {
                    return e.expression.charAt(e.index - 1)
                }

                function B(e) {
                    return e.expression.charAt(e.index + 1)
                }

                function k(e) {
                    for (e.tokenType = w, e.token = "", e.comment = ""; b.isWhitespace(z(e), e.nestingLevel);) q(e);
                    if ("#" === z(e)) for (; "\n" !== z(e) && "" !== z(e);) e.comment += z(e), q(e);
                    if ("" !== z(e)) {
                        if ("\n" === z(e) && !e.nestingLevel) return e.tokenType = N, e.token = z(e), q(e), 0;
                        var t = z(e), r = T(e, 2), n = T(e, 3);
                        if (3 === n.length && A[n]) return e.tokenType = N, e.token = n, q(e), q(e), q(e), 0;
                        if (2 === r.length && A[r]) return e.tokenType = N, e.token = r, q(e), q(e), 0;
                        if (A[t]) return e.tokenType = N, e.token = t, q(e), 0;
                        if (b.isDigitDot(t)) {
                            e.tokenType = M;
                            t = T(e, 2);
                            if ("0b" !== t && "0o" !== t && "0x" !== t) {
                                if ("." === z(e)) e.token += z(e), q(e), b.isDigit(z(e)) || (e.tokenType = N); else {
                                    for (; b.isDigit(z(e));) e.token += z(e), q(e);
                                    b.isDecimalMark(z(e), B(e)) && (e.token += z(e), q(e))
                                }
                                for (; b.isDigit(z(e));) e.token += z(e), q(e);
                                if ("E" === z(e) || "e" === z(e)) if (b.isDigit(B(e)) || "-" === B(e) || "+" === B(e)) {
                                    if (e.token += z(e), q(e), "+" !== z(e) && "-" !== z(e) || (e.token += z(e), q(e)), !b.isDigit(z(e))) throw oe(e, 'Digit expected, got "' + z(e) + '"');
                                    for (; b.isDigit(z(e));) e.token += z(e), q(e);
                                    if (b.isDecimalMark(z(e), B(e))) throw oe(e, 'Digit expected, got "' + z(e) + '"')
                                } else if ("." === B(e)) throw q(e), oe(e, 'Digit expected, got "' + z(e) + '"')
                            } else {
                                for (e.token += z(e), q(e), e.token += z(e), q(e); b.isHexDigit(z(e));) e.token += z(e), q(e);
                                if ("." === z(e)) for (e.token += ".", q(e); b.isHexDigit(z(e));) e.token += z(e), q(e); else if ("i" === z(e)) for (e.token += "i", q(e); b.isDigit(z(e));) e.token += z(e), q(e)
                            }
                        } else {
                            if (!b.isAlpha(z(e), I(e), B(e))) {
                                for (e.tokenType = E; "" !== z(e);) e.token += z(e), q(e);
                                throw oe(e, 'Syntax error in part "' + e.token + '"')
                            }
                            for (; b.isAlpha(z(e), I(e), B(e)) || b.isDigit(z(e));) e.token += z(e), q(e);
                            We(O, e.token) ? e.tokenType = N : e.tokenType = S
                        }
                    } else e.tokenType = N
                }

                function D(e) {
                    for (; k(e), "\n" === e.token;) ;
                }

                function R(e) {
                    e.nestingLevel++
                }

                function P(e) {
                    e.nestingLevel--
                }

                function j(e, t) {
                    var r = {
                        extraNodes: {},
                        expression: "",
                        comment: "",
                        index: 0,
                        token: "",
                        tokenType: w,
                        nestingLevel: 0,
                        conditionalLevel: null
                    };
                    Fs(r, {expression: e, extraNodes: t}), k(r);
                    t = function (e) {
                        var t, r, n = [];
                        for ("" !== e.token && "\n" !== e.token && ";" !== e.token && ((t = U(e)).comment = e.comment); "\n" === e.token || ";" === e.token;) 0 === n.length && t && (r = ";" !== e.token, n.push({
                            node: t,
                            visible: r
                        })), k(e), "\n" !== e.token && ";" !== e.token && "" !== e.token && ((t = U(e)).comment = e.comment, r = ";" !== e.token, n.push({
                            node: t,
                            visible: r
                        }));
                        return 0 < n.length ? new a(n) : (t || ((t = new l(void 0)).comment = e.comment), t)
                    }(r);
                    if ("" !== r.token) throw r.tokenType === N ? se(r, "Unexpected operator " + r.token) : oe(r, 'Unexpected part "' + r.token + '"');
                    return t
                }

                function U(e) {
                    var t, r, n, i, a = function (e) {
                        for (var t = function (e) {
                            for (var t = F(e); "or" === e.token;) D(e), t = new y("or", "or", [t, F(e)]);
                            return t
                        }(e); "?" === e.token;) {
                            var r = e.conditionalLevel;
                            e.conditionalLevel = e.nestingLevel, D(e);
                            var n = t, i = U(e);
                            if (":" !== e.token) throw oe(e, "False part of conditional expression expected");
                            e.conditionalLevel = null, D(e);
                            var a = U(e), t = new f(n, i, a);
                            e.conditionalLevel = r
                        }
                        return t
                    }(e);
                    if ("=" !== e.token) return a;
                    if (pe(a)) return t = a.name, D(e), n = U(e), new o(new x(t), n);
                    if (ue(a)) return D(e), n = U(e), new o(a.object, a.index, n);
                    if (fe(a) && pe(a.fn) && (i = !0, r = [], t = a.name, a.args.forEach(function (e, t) {
                        pe(e) ? r[t] = e.name : i = !1
                    }), i)) return D(e), n = U(e), new p(t, r, n);
                    throw oe(e, "Invalid left hand side of assignment operator =")
                }

                function F(e) {
                    for (var t = L(e); "xor" === e.token;) D(e), t = new y("xor", "xor", [t, L(e)]);
                    return t
                }

                function L(e) {
                    for (var t = H(e); "and" === e.token;) D(e), t = new y("and", "and", [t, H(e)]);
                    return t
                }

                function H(e) {
                    for (var t = $(e); "|" === e.token;) D(e), t = new y("|", "bitOr", [t, $(e)]);
                    return t
                }

                function $(e) {
                    for (var t = G(e); "^|" === e.token;) D(e), t = new y("^|", "bitXor", [t, G(e)]);
                    return t
                }

                function G(e) {
                    for (var t = V(e); "&" === e.token;) D(e), t = new y("&", "bitAnd", [t, V(e)]);
                    return t
                }

                function V(e) {
                    for (var t = [Z(e)], r = [], n = {
                        "==": "equal",
                        "!=": "unequal",
                        "<": "smaller",
                        ">": "larger",
                        "<=": "smallerEq",
                        ">=": "largerEq"
                    }; We(n, e.token);) {
                        var i = {name: e.token, fn: n[e.token]};
                        r.push(i), D(e), t.push(Z(e))
                    }
                    return 1 === t.length ? t[0] : 2 === t.length ? new y(r[0].name, r[0].fn, t) : new v(r.map(function (e) {
                        return e.fn
                    }), t)
                }

                function Z(e) {
                    for (var t, r, n, i = W(e), a = {
                        "<<": "leftShift",
                        ">>": "rightArithShift",
                        ">>>": "rightLogShift"
                    }; We(a, e.token);) r = a[t = e.token], D(e), n = [i, W(e)], i = new y(t, r, n);
                    return i
                }

                function W(e) {
                    for (var t, r, n, i = J(e), a = {
                        to: "to",
                        in: "to"
                    }; We(a, e.token);) r = a[t = e.token], D(e), i = "in" === t && "" === e.token ? new y("*", "multiply", [i, new x("in")], !0) : (n = [i, J(e)], new y(t, r, n));
                    return i
                }

                function J(e) {
                    var t = [], r = ":" === e.token ? new l(1) : Y(e);
                    if (":" === e.token && e.conditionalLevel !== e.nestingLevel) {
                        for (t.push(r); ":" === e.token && t.length < 3;) D(e), ")" === e.token || "]" === e.token || "," === e.token || "" === e.token ? t.push(new x("end")) : t.push(Y(e));
                        r = 3 === t.length ? new n(t[0], t[2], t[1]) : new n(t[0], t[1])
                    }
                    return r
                }

                function Y(e) {
                    for (var t, r, n, i = X(e), a = {
                        "+": "add",
                        "-": "subtract"
                    }; We(a, e.token);) r = a[t = e.token], D(e), n = [i, X(e)], i = new y(t, r, n);
                    return i
                }

                function X(e) {
                    for (var t, r, n, i = t = Q(e), a = {
                        "*": "multiply",
                        ".*": "dotMultiply",
                        "/": "divide",
                        "./": "dotDivide",
                        "%": "mod",
                        mod: "mod"
                    }; We(a, e.token);) n = a[r = e.token], D(e), i = Q(e), t = new y(r, n, [t, i]);
                    return t
                }

                function Q(e) {
                    for (var t, r = t = K(e); e.tokenType === S || "in" === e.token && ce(t) || !(e.tokenType !== M || ce(r) || le(r) && "!" !== r.op) || "(" === e.token;) r = K(e), t = new y("*", "multiply", [t, r], !0);
                    return t
                }

                function K(e) {
                    for (var t = ee(e), r = t, n = []; "/" === e.token && ce(r);) {
                        if (n.push(Fs({}, e)), D(e), e.tokenType !== M) {
                            Fs(e, n.pop());
                            break
                        }
                        if (n.push(Fs({}, e)), D(e), e.tokenType !== S && "(" !== e.token) {
                            n.pop(), Fs(e, n.pop());
                            break
                        }
                        Fs(e, n.pop()), n.pop(), r = ee(e), t = new y("/", "divide", [t, r])
                    }
                    return t
                }

                function ee(e) {
                    var t, r, n, i = {"-": "unaryMinus", "+": "unaryPlus", "~": "bitNot", not: "not"};
                    return We(i, e.token) ? (n = i[e.token], t = e.token, D(e), r = [ee(e)], new y(t, n, r)) : (n = function (e) {
                        for (var t, r, n = function (e) {
                            var t, r, n = [];
                            if (e.tokenType === S && We(e.extraNodes, e.token)) {
                                var i = e.extraNodes[e.token];
                                if (k(e), "(" === e.token) {
                                    if (n = [], R(e), k(e), ")" !== e.token) for (n.push(U(e)); "," === e.token;) k(e), n.push(U(e));
                                    if (")" !== e.token) throw oe(e, "Parenthesis ) expected");
                                    P(e), k(e)
                                }
                                return new i(n)
                            }
                            return (t = e).tokenType === S || t.tokenType === N && t.token in O ? (i = t.token, k(t), te(t, We(C, i) ? new l(C[i]) : -1 !== _.indexOf(i) ? new l(s(i, "number")) : new x(i))) : '"' === (t = t).token ? (r = re(t), te(t, new l(r))) : "'" === (r = t).token ? (t = ne(r), te(r, new l(t))) : function (e) {
                                var t, r, n, i;
                                if ("[" !== e.token) return function (e) {
                                    if ("{" !== e.token) return (n = e).tokenType === M ? (i = n.token, k(n), new l(s(i, u.number))) : function (e) {
                                        var t;
                                        if ("(" !== e.token) return function (e) {
                                            throw"" === e.token ? oe(e, "Unexpected end of expression") : oe(e, "Value expected")
                                        }(e);
                                        if (R(e), k(e), t = U(e), ")" !== e.token) throw oe(e, "Parenthesis ) expected");
                                        return P(e), k(e), te(e, t = new g(t))
                                    }(n);
                                    var t;
                                    R(e);
                                    var r = {};
                                    do {
                                        if (k(e), "}" !== e.token) {
                                            if ('"' === e.token) t = re(e); else if ("'" === e.token) t = ne(e); else {
                                                if (!(e.tokenType === S || e.tokenType === N && e.token in O)) throw oe(e, "Symbol or string expected as object key");
                                                t = e.token, k(e)
                                            }
                                            if (":" !== e.token) throw oe(e, "Colon : expected after object key");
                                            k(e), r[t] = U(e)
                                        }
                                    } while ("," === e.token);
                                    if ("}" !== e.token) throw oe(e, "Comma , or bracket } expected after object value");
                                    P(e), k(e);
                                    var n, i, n = new d(r);
                                    return te(e, n)
                                }(e);
                                if (R(e), k(e), "]" !== e.token) {
                                    var a = ie(e);
                                    if (";" === e.token) {
                                        for (n = 1, r = [a]; ";" === e.token;) k(e), r[n] = ie(e), n++;
                                        if ("]" !== e.token) throw oe(e, "End of matrix ] expected");
                                        P(e), k(e), i = r[0].items.length;
                                        for (var o = 1; o < n; o++) if (r[o].items.length !== i) throw se(e, "Column dimensions mismatch (" + r[o].items.length + " !== " + i + ")");
                                        t = new c(r)
                                    } else {
                                        if ("]" !== e.token) throw oe(e, "End of matrix ] expected");
                                        P(e), k(e), t = a
                                    }
                                } else P(e), k(e), t = new c([]);
                                return te(e, t)
                            }(r)
                        }(e), i = {
                            "!": "factorial",
                            "'": "ctranspose"
                        }; We(i, e.token);) r = i[t = e.token], k(e), n = te(e, n = new y(t, r, [n]));
                        return n
                    }(t = e), "^" !== t.token && ".^" !== t.token || (e = "^" === (r = t.token) ? "pow" : "dotPow", D(t), t = [n, ee(t)], n = new y(r, e, t)), n)
                }

                function te(e, t, r) {
                    for (var n; !("(" !== e.token && "[" !== e.token && "." !== e.token || r && -1 === r.indexOf(e.token));) if (n = [], "(" === e.token) {
                        if (!pe(t) && !ue(t)) return t;
                        if (R(e), k(e), ")" !== e.token) for (n.push(U(e)); "," === e.token;) k(e), n.push(U(e));
                        if (")" !== e.token) throw oe(e, "Parenthesis ) expected");
                        P(e), k(e), t = new m(t, n)
                    } else if ("[" === e.token) {
                        if (R(e), k(e), "]" !== e.token) for (n.push(U(e)); "," === e.token;) k(e), n.push(U(e));
                        if ("]" !== e.token) throw oe(e, "Parenthesis ] expected");
                        P(e), k(e), t = new i(t, new h(n))
                    } else {
                        if (k(e), e.tokenType !== S) throw oe(e, "Property name expected after dot");
                        n.push(new l(e.token)), k(e), t = new i(t, new h(n, !0))
                    }
                    return t
                }

                function re(e) {
                    for (var t = ""; "" !== z(e) && '"' !== z(e);) "\\" === z(e) && (t += z(e), q(e)), t += z(e), q(e);
                    if (k(e), '"' !== e.token) throw oe(e, 'End of string " expected');
                    return k(e), JSON.parse('"' + t + '"')
                }

                function ne(e) {
                    for (var t = ""; "" !== z(e) && "'" !== z(e);) "\\" === z(e) && (t += z(e), q(e)), t += z(e), q(e);
                    if (k(e), "'" !== e.token) throw oe(e, "End of string ' expected");
                    return k(e), JSON.parse('"' + t + '"')
                }

                function ie(e) {
                    for (var t = [U(e)], r = 1; "," === e.token;) k(e), t[r] = U(e), r++;
                    return new c(t)
                }

                function ae(e) {
                    return e.index - e.token.length + 1
                }

                function oe(e, t) {
                    e = ae(e), t = new SyntaxError(t + " (char " + e + ")");
                    return t.char = e, t
                }

                function se(e, t) {
                    e = ae(e), t = new SyntaxError(t + " (char " + e + ")");
                    return t.char = e, t
                }

                return b.isAlpha = function (e, t, r) {
                    return b.isValidLatinOrGreek(e) || b.isValidMathSymbol(e, r) || b.isValidMathSymbol(t, e)
                }, b.isValidLatinOrGreek = function (e) {
                    return /^[a-zA-Z_$\u00C0-\u02AF\u0370-\u03FF\u2100-\u214F]$/.test(e)
                }, b.isValidMathSymbol = function (e, t) {
                    return /^[\uD835]$/.test(e) && /^[\uDC00-\uDFFF]$/.test(t) && /^[^\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDFCC\uDFCD]$/.test(t)
                }, b.isWhitespace = function (e, t) {
                    return " " === e || "\t" === e || "\n" === e && 0 < t
                }, b.isDecimalMark = function (e, t) {
                    return "." === e && "/" !== t && "*" !== t && "^" !== t
                }, b.isDigitDot = function (e) {
                    return "0" <= e && e <= "9" || "." === e
                }, b.isDigit = function (e) {
                    return "0" <= e && e <= "9"
                }, b.isHexDigit = function (e) {
                    return "0" <= e && e <= "9" || "a" <= e && e <= "f" || "A" <= e && e <= "F"
                }, b
            }), Hs = Ye("compile", ["typed", "parse"], function (e) {
                var t = e.typed, r = e.parse;
                return t("compile", {
                    string: function (e) {
                        return r(e).compile()
                    }, "Array | Matrix": function (e) {
                        return xt(e, function (e) {
                            return r(e).compile()
                        })
                    }
                })
            }), $s = Ye("evaluate", ["typed", "parse"], function (e) {
                var t = e.typed, r = e.parse;
                return t("evaluate", {
                    string: function (e) {
                        return r(e).compile().evaluate({})
                    }, "string, Object": function (e, t) {
                        return r(e).compile().evaluate(t)
                    }, "Array | Matrix": function (e) {
                        var t = {};
                        return xt(e, function (e) {
                            return r(e).compile().evaluate(t)
                        })
                    }, "Array | Matrix, Object": function (e, t) {
                        return xt(e, function (e) {
                            return r(e).compile().evaluate(t)
                        })
                    }
                })
            }), Gs = Ye("Parser", ["parse"], function (e) {
                var t = e.parse;

                function r() {
                    if (!(this instanceof r)) throw new SyntaxError("Constructor must be called with the new operator");
                    this.scope = {}
                }

                return r.prototype.type = "Parser", r.prototype.isParser = !0, r.prototype.evaluate = function (e) {
                    return t(e).compile().evaluate(this.scope)
                }, r.prototype.get = function (e) {
                    return e in this.scope ? yi(this.scope, e) : void 0
                }, r.prototype.getAll = function () {
                    return Ge({}, this.scope)
                }, r.prototype.set = function (e, t) {
                    return gi(this.scope, e, t)
                }, r.prototype.remove = function (e) {
                    delete this.scope[e]
                }, r.prototype.clear = function () {
                    for (var e in this.scope) We(this.scope, e) && delete this.scope[e]
                }, r
            }, {isClass: !0}), Vs = Ye("parser", ["typed", "Parser"], function (e) {
                var t = e.typed, r = e.Parser;
                return t("parser", {
                    "": function () {
                        return new r
                    }
                })
            }),
            Zs = Ye("lup", ["typed", "matrix", "abs", "addScalar", "divideScalar", "multiplyScalar", "subtract", "larger", "equalScalar", "unaryMinus", "DenseMatrix", "SparseMatrix", "Spa"], function (e) {
                var t = e.typed, r = e.matrix, A = e.abs, w = e.addScalar, O = e.divideScalar, C = e.multiplyScalar,
                    N = e.subtract, _ = e.larger, T = e.equalScalar, z = e.unaryMinus, M = e.DenseMatrix,
                    q = e.SparseMatrix, I = e.Spa;
                return t("lup", {
                    DenseMatrix: n, SparseMatrix: function (e) {
                        var c, f, l, p = e._size[0], t = e._size[1], r = Math.min(p, t), m = e._values, h = e._index,
                            d = e._ptr, y = [], g = [], v = [], x = [p, r], b = [], w = [], N = [], M = [r, t], S = [],
                            E = [];
                        for (c = 0; c < p; c++) S[c] = c, E[c] = c;
                        for (f = 0; f < t; f++) !function () {
                            var i = new I;
                            f < p && (v.push(y.length), y.push(1), g.push(f)), N.push(b.length);
                            var e = d[f], t = d[f + 1];
                            for (l = e; l < t; l++) c = h[l], i.set(S[c], m[l]);
                            0 < f && i.forEach(0, f - 1, function (r, n) {
                                q._forEachRow(r, y, g, v, function (e, t) {
                                    r < e && i.accumulate(e, z(C(t, n)))
                                })
                            });
                            var r, n, a, o = f, s = i.get(f), u = A(s);
                            i.forEach(f + 1, p - 1, function (e, t) {
                                var r = A(t);
                                _(r, u) && (o = e, u = r, s = t)
                            }), f !== o && (q._swapRows(f, o, x[1], y, g, v), q._swapRows(f, o, M[1], b, w, N), i.swap(f, o), n = o, a = E[r = f], e = E[n], S[a] = n, S[e] = r, E[r] = e, E[n] = a), i.forEach(0, p - 1, function (e, t) {
                                e <= f ? (b.push(t), w.push(e)) : (t = O(t, s), T(t, 0) || (y.push(t), g.push(e)))
                            })
                        }();
                        return N.push(b.length), v.push(y.length), {
                            L: new q({values: y, index: g, ptr: v, size: x}),
                            U: new q({values: b, index: w, ptr: N, size: M}),
                            p: S,
                            toString: function () {
                                return "L: " + this.L.toString() + "\nU: " + this.U.toString() + "\nP: " + this.p
                            }
                        }
                    }, Array: function (e) {
                        e = n(r(e));
                        return {L: e.L.valueOf(), U: e.U.valueOf(), p: e.p}
                    }
                });

                function n(e) {
                    var t, r = e._size[0], n = e._size[1], i = Math.min(r, n), a = He(e._data), o = [], s = [r, i],
                        u = [], e = [i, n], c = [];
                    for (y = 0; y < r; y++) c[y] = y;
                    for (t = 0; t < n; t++) {
                        if (0 < t) for (y = 0; y < r; y++) {
                            for (var f = Math.min(y, t), l = 0, p = 0; p < f; p++) l = w(l, C(a[y][p], a[p][t]));
                            a[y][t] = N(a[y][t], l)
                        }
                        for (var m = t, h = 0, d = 0, y = t; y < r; y++) {
                            var g = a[y][t], v = A(g);
                            _(v, h) && (m = y, h = v, d = g)
                        }
                        if (t !== m && (c[t] = [c[m], c[m] = c[t]][0], M._swapRows(t, m, a)), t < r) for (y = t + 1; y < r; y++) {
                            var x = a[y][t];
                            T(x, 0) || (a[y][t] = O(a[y][t], d))
                        }
                    }
                    for (t = 0; t < n; t++) for (y = 0; y < r; y++) 0 === t && (y < n && (u[y] = []), o[y] = []), y < t ? (y < n && (u[y][t] = a[y][t]), t < r && (o[y][t] = 0)) : y !== t ? (y < n && (u[y][t] = 0), t < r && (o[y][t] = a[y][t])) : (y < n && (u[y][t] = a[y][t]), t < r && (o[y][t] = 1));
                    var s = new M({data: o, size: s}), e = new M({data: u, size: e}), b = [];
                    for (y = 0, i = c.length; y < i; y++) b[c[y]] = y;
                    return {
                        L: s, U: e, p: b, toString: function () {
                            return "L: " + this.L.toString() + "\nU: " + this.U.toString() + "\nP: " + this.p
                        }
                    }
                }
            });

        function Ws() {
            return (Ws = Object.assign || function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r, n = arguments[t];
                    for (r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            }).apply(this, arguments)
        }

        var Js = Ye("qr", ["typed", "matrix", "zeros", "identity", "isZero", "equal", "sign", "sqrt", "conj", "unaryMinus", "addScalar", "divideScalar", "multiplyScalar", "subtract", "complex"], function (e) {
            var t = e.typed, r = e.matrix, g = e.zeros, v = e.identity, x = e.isZero, b = e.equal, w = e.sign,
                N = e.sqrt, M = e.conj, S = e.unaryMinus, E = e.addScalar, A = e.divideScalar, O = e.multiplyScalar,
                C = e.subtract, o = e.complex;
            return Ws(t("qr", {
                DenseMatrix: n, SparseMatrix: function (e) {
                    throw new Error("qr not implemented for sparse matrices yet")
                }, Array: function (e) {
                    e = n(r(e));
                    return {Q: e.Q.valueOf(), R: e.R.valueOf()}
                }
            }), {_denseQRimpl: s});

            function s(e) {
                for (var t = e._size[0], r = e._size[1], n = v([t], "dense"), i = n._data, e = e.clone(), a = e._data, o = g([t], ""), s = 0; s < Math.min(r, t); ++s) {
                    var u = a[s][s], c = S(b(u, 0) ? 1 : w(u)), f = M(c), l = 0;
                    for (m = s; m < t; m++) l = E(l, O(a[m][s], M(a[m][s])));
                    c = O(c, N(l));
                    if (!x(c)) {
                        for (var p = C(u, c), m = s + (o[s] = 1); m < t; m++) o[m] = A(a[m][s], p);
                        for (var h = S(M(A(p, c))), d = void 0, y = s; y < r; y++) {
                            for (d = 0, m = s; m < t; m++) d = E(d, O(M(o[m]), a[m][y]));
                            for (d = O(d, h), m = s; m < t; m++) a[m][y] = O(C(a[m][y], O(o[m], d)), f)
                        }
                        for (m = 0; m < t; m++) {
                            for (d = 0, y = s; y < t; y++) d = E(d, O(i[m][y], o[y]));
                            for (d = O(d, h), y = s; y < t; ++y) i[m][y] = A(C(i[m][y], O(d, M(o[y]))), f)
                        }
                    }
                }
                return {
                    Q: n, R: e, toString: function () {
                        return "Q: " + this.Q.toString() + "\nR: " + this.R.toString()
                    }
                }
            }

            function n(e) {
                var t = s(e), r = t.R._data;
                if (0 < e._data.length) for (var n = "Complex" === r[0][0].type ? o(0) : 0, i = 0; i < r.length; ++i) for (var a = 0; a < i && a < (r[0] || []).length; ++a) r[i][a] = n;
                return t
            }
        });

        function Ys(e, t, r, n, i, a, o) {
            var s = 0;
            for (r[o] = e; 0 <= s;) {
                var u = r[o + s], c = r[n + u];
                -1 === c ? (s--, a[t++] = u) : (r[n + u] = r[i + c], r[o + ++s] = c)
            }
            return t
        }

        var Xs = Ye("csAmd", ["add", "multiply", "transpose"], function (e) {
            var Q = e.add, K = e.multiply, ee = e.transpose;
            return function (e, t) {
                if (!t || e <= 0 || 3 < e) return null;
                var r = t._size, n = r[0], i = r[1], a = 0, r = Math.max(16, 10 * Math.sqrt(i)),
                    c = function (e, t, r, n, i) {
                        var a = ee(t);
                        if (1 === e && n === r) return Q(t, a);
                        if (2 !== e) return K(a, t);
                        for (var o = a._index, s = a._ptr, u = 0, c = 0; c < r; c++) {
                            var f = s[c];
                            if (s[c] = u, !(s[c + 1] - f > i)) for (var l = s[c + 1]; f < l; f++) o[u++] = o[f]
                        }
                        return s[r] = u, t = ee(a), K(a, t)
                    }(e, t, n, i, r = Math.min(i - 2, r));
                !function (e, t) {
                    for (var r = c._values, n = c._index, i = c._ptr, a = c._size[1], o = 0, s = 0; s < a; s++) {
                        var u = i[s];
                        for (i[s] = o; u < i[s + 1]; u++) e(n[u], s, r ? r[u] : 1, t) && (n[o] = n[u], r && (r[o] = r[u]), o++)
                    }
                    i[a] = o, n.splice(o, n.length - o), r && r.splice(o, r.length - o)
                }(re, null);
                for (var o, s, u, f, l, p, m, h, d, y, g, v, x, b = c._index, w = c._ptr, N = w[i], M = [], S = [], E = i + 1, A = 2 * (i + 1), O = 3 * (i + 1), C = 4 * (i + 1), _ = 5 * (i + 1), T = 6 * (i + 1), z = 7 * (i + 1), q = M, I = function (e, t, r, n, i, a, o, s, u, c, f) {
                    for (var l = 0; l < e; l++) r[0 + l] = t[l + 1] - t[l];
                    for (var p = r[0 + e] = 0; p <= e; p++) r[n + p] = -1, i[p] = -1, r[a + p] = -1, r[o + p] = -1, r[s + p] = 1, r[u + p] = 1, r[c + p] = 0, r[f + p] = r[0 + p];
                    var m = te(0, 0, r, u, e);
                    return r[c + e] = -2, t[e] = -1, r[u + e] = 0, m
                }(i, w, S, O, q, A, z, E, T, C, _), B = function (e, t, r, n, i, a, o, s, u, c, f) {
                    for (var l = 0, p = 0; p < e; p++) {
                        var m, h = r[n + p];
                        0 === h ? (r[i + p] = -2, l++, t[p] = -1, r[a + p] = 0) : o < h ? (r[s + p] = 0, r[i + p] = -1, l++, t[p] = -e - 2, r[s + e]++) : (-1 !== (m = r[u + h]) && (c[m] = p), r[f + p] = r[u + h], r[u + h] = p)
                    }
                    return l
                }(i, w, S, _, C, T, r, E, O, q, A), k = 0; B < i;) {
                    for (s = -1; k < i && -1 === (s = S[O + k]); k++) ;
                    -1 !== S[A + s] && (q[S[A + s]] = -1), S[O + k] = S[A + s];
                    var D = S[C + s], R = S[E + s];
                    B += R;
                    var P = 0;
                    S[E + s] = -R;
                    for (var j, U = w[s], F = 0 === D ? U : N, L = F, H = 1; H <= D + 1; H++) {
                        for (p = D < H ? (l = U, S[0 + (f = s)] - D) : (l = w[f = b[U++]], S[0 + f]), u = 1; u <= p; u++) (m = S[E + (o = b[l++])]) <= 0 || (P += m, S[E + o] = -m, -1 !== S[A + (b[L++] = o)] && (q[S[A + o]] = q[o]), -1 !== q[o] ? S[A + q[o]] = S[A + o] : S[O + S[_ + o]] = S[A + o]);
                        f !== s && (w[f] = -s - 2, S[T + f] = 0)
                    }
                    for (0 !== D && (N = L), S[_ + s] = P, w[s] = F, S[0 + s] = L - F, S[C + s] = -2, I = te(I, a, S, T, i), h = F; h < L; h++) if (!((d = S[C + (o = b[h])]) <= 0)) for (var $ = I - (m = -S[E + o]), U = w[o], G = w[o] + d - 1; U <= G; U++) S[T + (f = b[U])] >= I ? S[T + f] -= m : 0 !== S[T + f] && (S[T + f] = S[_ + f] + $);
                    for (h = F; h < L; h++) {
                        for (y = (G = w[o = b[h]]) + S[C + o] - 1, x = v = 0, U = g = G; U <= y; U++) 0 !== S[T + (f = b[U])] && (0 < (j = S[T + f] - I) ? (x += j, v += b[g++] = f) : (w[f] = -s - 2, S[T + f] = 0));
                        S[C + o] = g - G + 1;
                        var V = g, Z = G + S[0 + o];
                        for (U = 1 + y; U < Z; U++) {
                            var W = S[E + (Y = b[U])];
                            W <= 0 || (x += W, v += b[g++] = Y)
                        }
                        0 === x ? (w[o] = -s - 2, P -= m = -S[E + o], R += m, B += m, S[E + o] = 0, S[C + o] = -1) : (S[_ + o] = Math.min(S[_ + o], x), b[g] = b[V], b[V] = b[G], b[G] = s, S[0 + o] = g - G + 1, v = (v < 0 ? -v : v) % i, S[A + o] = S[z + v], q[S[z + v] = o] = v)
                    }
                    for (S[_ + s] = P, I = te(I + (a = Math.max(a, P)), a, S, T, i), h = F; h < L; h++) if (!(0 <= S[E + (o = b[h])])) for (o = S[z + (v = q[o])], S[z + v] = -1; -1 !== o && -1 !== S[A + o]; o = S[A + o], I++) {
                        for (p = S[0 + o], d = S[C + o], U = w[o] + 1; U <= w[o] + p - 1; U++) S[T + b[U]] = I;
                        for (var J = o, Y = S[A + o]; -1 !== Y;) {
                            var X = S[0 + Y] === p && S[C + Y] === d;
                            for (U = w[Y] + 1; X && U <= w[Y] + p - 1; U++) S[T + b[U]] !== I && (X = 0);
                            X ? (w[Y] = -o - 2, S[E + o] += S[E + Y], S[E + Y] = 0, S[C + Y] = -1, Y = S[A + Y], S[A + J] = Y) : Y = S[A + (J = Y)]
                        }
                    }
                    for (h = U = F; h < L; h++) (m = -S[E + (o = b[h])]) <= 0 || (S[E + o] = m, x = S[_ + o] + P - m, -1 !== S[O + (x = Math.min(x, i - B - m))] && (q[S[O + x]] = o), S[A + o] = S[O + x], q[o] = -1, S[O + x] = o, k = Math.min(k, x), S[_ + o] = x, b[U++] = o);
                    S[E + s] = R, 0 == (S[0 + s] = U - F) && (w[s] = -1, S[T + s] = 0), 0 !== D && (N = U)
                }
                for (o = 0; o < i; o++) w[o] = -w[o] - 2;
                for (Y = 0; Y <= i; Y++) S[O + Y] = -1;
                for (Y = i; 0 <= Y; Y--) 0 < S[E + Y] || (S[A + Y] = S[O + w[Y]], S[O + w[Y]] = Y);
                for (f = i; 0 <= f; f--) S[E + f] <= 0 || -1 !== w[f] && (S[A + f] = S[O + w[f]], S[O + w[f]] = f);
                for (o = s = 0; o <= i; o++) -1 === w[o] && (s = Ys(o, s, S, O, A, M, T));
                return M.splice(M.length - 1, 1), M
            };

            function te(e, t, r, n, i) {
                if (e < 2 || e + t < 0) {
                    for (var a = 0; a < i; a++) 0 !== r[n + a] && (r[n + a] = 1);
                    e = 2
                }
                return e
            }

            function re(e, t) {
                return e !== t
            }
        });
        var Qs = Ye("csCounts", ["transpose"], function (e) {
            var E = e.transpose;
            return function (e, t, r, n) {
                if (!e || !t || !r) return null;
                for (var i, a, o, s, u, c, f = e._size, l = f[0], p = f[1], m = 4 * p + (n ? p + l + 1 : 0), h = [], d = p, y = 2 * p, g = 3 * p, v = 4 * p, x = 5 * p + 1, b = 0; b < m; b++) h[b] = -1;
                var w = [], e = E(e), N = e._index, M = e._ptr;
                for (b = 0; b < p; b++) for (w[a = r[b]] = -1 === h[g + a] ? 1 : 0; -1 !== a && -1 === h[g + a]; a = t[a]) h[g + a] = b;
                if (n) {
                    for (b = 0; b < p; b++) h[r[b]] = b;
                    for (i = 0; i < l; i++) {
                        for (b = p, u = M[i], c = M[i + 1], s = u; s < c; s++) b = Math.min(b, h[N[s]]);
                        h[x + i] = h[v + b], h[v + b] = i
                    }
                }
                for (i = 0; i < p; i++) h[0 + i] = i;
                for (b = 0; b < p; b++) {
                    for (-1 !== t[a = r[b]] && w[t[a]]--, o = n ? h[v + b] : a; -1 !== o; o = n ? h[x + o] : -1) for (s = M[o]; s < M[o + 1]; s++) {
                        var S = function (e, t, r, n, i, a, o) {
                            var s, u, c, f = 0;
                            if (e <= t || r[n + t] <= r[i + e]) return -1;
                            if (r[i + e] = r[n + t], n = r[a + e], r[a + e] = t, -1 === n) f = 1, c = e; else {
                                for (f = 2, c = n; c !== r[o + c]; c = r[o + c]) ;
                                for (s = n; s !== c; s = u) u = r[o + s], r[o + s] = c
                            }
                            return {jleaf: f, q: c}
                        }(i = N[s], a, h, g, d, y, 0);
                        1 <= S.jleaf && w[a]++, 2 === S.jleaf && w[S.q]--
                    }
                    -1 !== t[a] && (h[0 + a] = t[a])
                }
                for (a = 0; a < p; a++) -1 !== t[a] && (w[t[a]] += w[a]);
                return w
            }
        }), Ks = Ye("csSqr", ["add", "multiply", "transpose"], function (e) {
            var t = e.add, r = e.multiply, e = e.transpose, s = Xs({add: t, multiply: r, transpose: e}),
                u = Qs({transpose: e});
            return function (e, t, r) {
                var n, i = t._ptr, a = t._size[1], o = {};
                if (o.q = s(e, t), e && !o.q) return null;
                if (r) {
                    var x = e ? function (e, t) {
                        for (var r = e._values, n = e._index, i = e._ptr, a = e._size, o = e._datatype, s = a[0], u = a[1], c = null, f = [], l = [], p = 0, m = 0; m < u; m++) {
                            l[m] = p;
                            for (var h = t ? t[m] : m, d = i[h], y = i[h + 1], g = d; g < y; g++) {
                                var v = n[g];
                                f[p] = v, c && (c[p] = r[g]), p++
                            }
                        }
                        return l[u] = p, e.createSparseMatrix({values: c, index: f, ptr: l, size: [s, u], datatype: o})
                    }(t, o.q) : t;
                    o.parent = function () {
                        if (!x) return null;
                        var e, t = x._index, r = x._ptr, n = x._size, i = n[0], a = n[1], o = [], s = [], u = a;
                        for (1, h = 0; h < i; h++) s[u + h] = -1;
                        for (var c = 0; c < a; c++) {
                            o[c] = -1, s[0 + c] = -1;
                            for (var f = r[c], l = r[c + 1], p = f; p < l; p++) {
                                for (var m = t[p], h = s[u + m]; -1 !== h && h < c; h = e) e = s[0 + h], s[0 + h] = c, -1 === e && (o[h] = c);
                                s[u + m] = c
                            }
                        }
                        return o
                    }();
                    t = function (e, t) {
                        if (!e) return null;
                        for (var r = 0, n = [], i = [], a = t, o = 2 * t, s = 0; s < t; s++) i[0 + s] = -1;
                        for (s = t - 1; 0 <= s; s--) -1 !== e[s] && (i[a + s] = i[0 + e[s]], i[0 + e[s]] = s);
                        for (s = 0; s < t; s++) -1 === e[s] && (r = Ys(s, r, i, 0, a, n, o));
                        return n
                    }(o.parent, a);
                    if (o.cp = u(x, o.parent, t, 1), x && o.parent && o.cp && function (e) {
                        var t = x._ptr, r = x._index, n = x._size, i = n[0], a = n[1];
                        e.pinv = [], e.leftmost = [];
                        for (var o, s, u, c = e.parent, f = e.pinv, l = e.leftmost, p = [], m = i, h = i + a, d = i + 2 * a, y = 0; y < a; y++) p[m + y] = -1, p[h + y] = -1, p[d + y] = 0;
                        for (v = 0; v < i; v++) l[v] = -1;
                        for (y = a - 1; 0 <= y; y--) for (s = t[y], u = t[y + 1], o = s; o < u; o++) l[r[o]] = y;
                        for (v = i - 1; 0 <= v; v--) (f[v] = -1) !== (y = l[v]) && (0 == p[d + y]++ && (p[h + y] = v), p[0 + v] = p[m + y], p[m + y] = v);
                        for (e.lnz = 0, e.m2 = i, y = 0; y < a; y++) {
                            var g, v = p[m + y];
                            e.lnz++, v < 0 && (v = e.m2++), --d[f[v] = y] <= 0 || (e.lnz += p[d + y], -1 !== (g = c[y]) && (0 === p[d + g] && (p[h + g] = p[h + y]), p[0 + p[h + y]] = p[m + g], p[m + g] = p[0 + v], p[d + g] += p[d + y]))
                        }
                        for (v = 0; v < i; v++) f[v] < 0 && (f[v] = y++);
                        return 1
                    }(o)) for (n = o.unz = 0; n < a; n++) o.unz += o.cp[n]
                } else o.unz = 4 * i[a] + a, o.lnz = o.unz;
                return o
            }
        });

        function eu(e, t) {
            e[t] = -e[t] - 2
        }

        function tu(e) {
            return e < 0 ? -e - 2 : e
        }

        var ru = Ye("csSpsolve", ["divideScalar", "multiply", "subtract"], function (e) {
                var N = e.divideScalar, M = e.multiply, S = e.subtract;
                return function (e, p, m, t, r, n, i) {
                    for (var a, o, s, u = e._values, c = e._index, f = e._ptr, l = e._size[1], h = p._values, d = p._index, y = p._ptr, e = function (e, t, r) {
                        for (var n = e._ptr, i = e._size, a = p._index, o = p._ptr, s = i[1], u = s, i = o[m], c = o[m + 1], f = i; f < c; f++) {
                            var l = a[f];
                            n[l] < 0 || (u = function (e, t, r, n, i) {
                                var a, o = t._index, s = t._ptr, u = t._size[1], c = 0;
                                for (n[0] = e; 0 <= c;) {
                                    e = n[c];
                                    var f = i ? i[e] : e;
                                    s[e] < 0 || (eu(s, e), n[u + c] = f < 0 ? 0 : tu(s[f]));
                                    for (var l = 1, p = n[u + c], m = f < 0 ? 0 : tu(s[f + 1]); p < m; p++) if (!(s[a = o[p]] < 0)) {
                                        n[u + c] = p, n[++c] = a, l = 0;
                                        break
                                    }
                                    l && (c--, n[--r] = e)
                                }
                                return r
                            }(l, e, u, t, r))
                        }
                        for (f = u; f < s; f++) eu(n, t[f]);
                        return u
                    }(e, t, n), g = e; g < l; g++) r[t[g]] = 0;
                    for (a = y[m], o = y[m + 1], g = a; g < o; g++) r[d[g]] = h[g];
                    for (var v = e; v < l; v++) {
                        var x = t[v], b = n ? n[x] : x;
                        if (!(b < 0)) for (a = f[b], o = f[b + 1], r[x] = N(r[x], u[i ? a : o - 1]), g = i ? a + 1 : a, s = i ? o : o - 1; g < s; g++) {
                            var w = c[g];
                            r[w] = S(r[w], M(u[g], r[x]))
                        }
                    }
                    return e
                }
            }),
            nu = Ye("csLu", ["abs", "divideScalar", "multiply", "subtract", "larger", "largerEq", "SparseMatrix"], function (e) {
                var A = e.abs, O = e.divideScalar, C = e.multiply, t = e.subtract, _ = e.larger, T = e.largerEq,
                    z = e.SparseMatrix, q = ru({divideScalar: O, multiply: C, subtract: t});
                return function (e, t, r) {
                    if (!e) return null;
                    var n, i = e._size[1], a = 100, o = 100;
                    t && (n = t.q, a = t.lnz || a, o = t.unz || o);
                    for (var s = [], u = [], c = [], f = new z({
                        values: s,
                        index: u,
                        ptr: c,
                        size: [i, i]
                    }), l = [], p = [], m = [], t = new z({
                        values: l,
                        index: p,
                        ptr: m,
                        size: [i, i]
                    }), h = [], d = [], y = [], g = 0; g < i; g++) d[g] = 0, h[g] = -1, c[g + 1] = 0;
                    for (var v = o = a = 0; v < i; v++) {
                        c[v] = a, m[v] = o;
                        for (var x, b = n ? n[v] : v, w = q(f, e, b, y, d, h, 1), N = -1, M = -1, S = w; S < i; S++) h[g = y[S]] < 0 ? (x = A(d[g]), _(x, M) && (M = x, N = g)) : (p[o] = h[g], l[o++] = d[g]);
                        if (-1 === N || M <= 0) return null;
                        h[b] < 0 && T(A(d[b]), C(M, r)) && (N = b);
                        var E = d[N];
                        for (p[o] = v, l[o++] = E, h[N] = v, u[a] = N, s[a++] = 1, S = w; S < i; S++) h[g = y[S]] < 0 && (u[a] = g, s[a++] = O(d[g], E)), d[g] = 0
                    }
                    for (c[i] = a, m[i] = o, S = 0; S < a; S++) u[S] = h[u[S]];
                    return s.splice(a, s.length - a), u.splice(a, u.length - a), l.splice(o, l.length - o), p.splice(o, p.length - o), {
                        L: f,
                        U: t,
                        pinv: h
                    }
                }
            }),
            iu = Ye("slu", ["typed", "abs", "add", "multiply", "transpose", "divideScalar", "subtract", "larger", "largerEq", "SparseMatrix"], function (e) {
                var t = e.typed, r = e.abs, n = e.add, i = e.multiply, a = e.transpose, o = e.divideScalar,
                    s = e.subtract, u = e.larger, c = e.largerEq, e = e.SparseMatrix,
                    f = Ks({add: n, multiply: i, transpose: a}), l = nu({
                        abs: r,
                        divideScalar: o,
                        multiply: i,
                        subtract: s,
                        larger: u,
                        largerEq: c,
                        SparseMatrix: e
                    });
                return t("slu", {
                    "SparseMatrix, number, number": function (e, t, r) {
                        if (!L(t) || t < 0 || 3 < t) throw new Error("Symbolic Ordering and Analysis order must be an integer number in the interval [0, 3]");
                        if (r < 0 || 1 < r) throw new Error("Partial pivoting threshold must be a number from 0 to 1");
                        t = f(t, e, !1), r = l(e, t, r);
                        return {
                            L: r.L, U: r.U, p: r.pinv, q: t.q, toString: function () {
                                return "L: " + this.L.toString() + "\nU: " + this.U.toString() + "\np: " + this.p.toString() + (this.q ? "\nq: " + this.q.toString() : "") + "\n"
                            }
                        }
                    }
                })
            });

        function au(e, t) {
            var r, n = t.length, i = [];
            if (e) for (r = 0; r < n; r++) i[e[r]] = t[r]; else for (r = 0; r < n; r++) i[r] = t[r];
            return i
        }

        var ou = Ye("lusolve", ["typed", "matrix", "lup", "slu", "usolve", "lsolve", "DenseMatrix"], function (e) {
                var t = e.typed, r = e.matrix, n = e.lup, i = e.slu, a = e.usolve, o = e.lsolve,
                    s = sa({DenseMatrix: e.DenseMatrix});
                return t("lusolve", {
                    "Array, Array | Matrix": function (e, t) {
                        e = r(e);
                        e = n(e);
                        return c(e.L, e.U, e.p, null, t).valueOf()
                    }, "DenseMatrix, Array | Matrix": function (e, t) {
                        e = n(e);
                        return c(e.L, e.U, e.p, null, t)
                    }, "SparseMatrix, Array | Matrix": function (e, t) {
                        e = n(e);
                        return c(e.L, e.U, e.p, null, t)
                    }, "SparseMatrix, Array | Matrix, number, number": function (e, t, r, n) {
                        n = i(e, r, n);
                        return c(n.L, n.U, n.p, n.q, t)
                    }, "Object, Array | Matrix": function (e, t) {
                        return c(e.L, e.U, e.p, e.q, t)
                    }
                });

                function u(e) {
                    if (E(e)) return e;
                    if (x(e)) return r(e);
                    throw new TypeError("Invalid Matrix LU decomposition")
                }

                function c(e, t, r, n, i) {
                    e = u(e), t = u(t), r && ((i = s(e, i, !0))._data = au(r, i._data));
                    i = o(e, i), i = a(t, i);
                    return n && (i._data = au(n, i._data)), i
                }
            }), su = Ye("Help", ["parse"], function (e) {
                var o = e.parse;

                function n(e) {
                    if (!(this instanceof n)) throw new SyntaxError("Constructor must be called with the new operator");
                    if (!e) throw new Error('Argument "doc" missing');
                    this.doc = e
                }

                return n.prototype.type = "Help", n.prototype.isHelp = !0, n.prototype.toString = function () {
                    var e = this.doc || {}, t = "\n";
                    if (e.name && (t += "Name: " + e.name + "\n\n"), e.category && (t += "Category: " + e.category + "\n\n"), e.description && (t += "Description:\n    " + e.description + "\n\n"), e.syntax && (t += "Syntax:\n    " + e.syntax.join("\n    ") + "\n\n"), e.examples) {
                        t += "Examples:\n";
                        for (var r = {}, n = 0; n < e.examples.length; n++) {
                            var i = e.examples[n];
                            t += "    " + i + "\n";
                            var a = void 0;
                            try {
                                a = o(i).compile().evaluate(r)
                            } catch (e) {
                                a = e
                            }
                            void 0 === a || h(a) || (t += "        " + ge(a, {precision: 14}) + "\n")
                        }
                        t += "\n"
                    }
                    return e.seealso && e.seealso.length && (t += "See also: " + e.seealso.join(", ") + "\n"), t
                }, n.prototype.toJSON = function () {
                    var e = He(this.doc);
                    return e.mathjs = "Help", e
                }, n.fromJSON = function (t) {
                    var r = {};
                    return Object.keys(t).filter(function (e) {
                        return "mathjs" !== e
                    }).forEach(function (e) {
                        r[e] = t[e]
                    }), new n(r)
                }, n.prototype.valueOf = n.prototype.toString, n
            }, {isClass: !0}), uu = Ye("Chain", ["?on", "math"], function (e) {
                var t = e.on, e = e.math;

                function n(e) {
                    if (!(this instanceof n)) throw new SyntaxError("Constructor must be called with the new operator");
                    F(e) ? this.value = e.value : this.value = e
                }

                function i(e, t) {
                    Ze(n.prototype, e, function () {
                        var e = t();
                        if ("function" == typeof e) return a(e)
                    })
                }

                function a(r) {
                    return function () {
                        for (var e = [this.value], t = 0; t < arguments.length; t++) e[t + 1] = arguments[t];
                        return new n(r.apply(r, e))
                    }
                }

                n.prototype.type = "Chain", n.prototype.isChain = !0, n.prototype.done = function () {
                    return this.value
                }, n.prototype.valueOf = function () {
                    return this.value
                }, n.prototype.toString = function () {
                    return ge(this.value)
                }, n.prototype.toJSON = function () {
                    return {mathjs: "Chain", value: this.value}
                }, n.fromJSON = function (e) {
                    return new n(e.value)
                }, n.createProxy = function (t, e) {
                    if ("string" == typeof t) "function" == typeof e && (n.prototype[t] = a(e)); else for (var r in t) !function (e) {
                        We(t, e) && void 0 === o[e] && i(e, function () {
                            return t[e]
                        })
                    }(r)
                };
                var o = {expression: !0, docs: !0, type: !0, classes: !0, json: !0, error: !0, isChain: !0};
                return n.createProxy(e), t && t("import", function (e, t, r) {
                    r || i(e, t)
                }), n
            }, {isClass: !0}), a = {
                name: "pi",
                category: "Constants",
                syntax: ["pi"],
                description: "The number pi is a mathematical constant that is the ratio of a circle's circumference to its diameter, and is approximately equal to 3.14159",
                examples: ["pi", "sin(pi/2)"],
                seealso: ["tau"]
            }, at = {
                name: "e",
                category: "Constants",
                syntax: ["e"],
                description: "Euler's number, the base of the natural logarithm. Approximately equal to 2.71828",
                examples: ["e", "e ^ 2", "exp(2)", "log(e)"],
                seealso: ["exp"]
            }, cu = {
                bignumber: {
                    name: "bignumber",
                    category: "Construction",
                    syntax: ["bignumber(x)"],
                    description: "Create a big number from a number or string.",
                    examples: ["0.1 + 0.2", "bignumber(0.1) + bignumber(0.2)", 'bignumber("7.2")', 'bignumber("7.2e500")', "bignumber([0.1, 0.2, 0.3])"],
                    seealso: ["boolean", "complex", "fraction", "index", "matrix", "string", "unit"]
                },
                boolean: {
                    name: "boolean",
                    category: "Construction",
                    syntax: ["x", "boolean(x)"],
                    description: "Convert a string or number into a boolean.",
                    examples: ["boolean(0)", "boolean(1)", "boolean(3)", 'boolean("true")', 'boolean("false")', "boolean([1, 0, 1, 1])"],
                    seealso: ["bignumber", "complex", "index", "matrix", "number", "string", "unit"]
                },
                complex: {
                    name: "complex",
                    category: "Construction",
                    syntax: ["complex()", "complex(re, im)", "complex(string)"],
                    description: "Create a complex number.",
                    examples: ["complex()", "complex(2, 3)", 'complex("7 - 2i")'],
                    seealso: ["bignumber", "boolean", "index", "matrix", "number", "string", "unit"]
                },
                createUnit: {
                    name: "createUnit",
                    category: "Construction",
                    syntax: ["createUnit(definitions)", "createUnit(name, definition)"],
                    description: "Create a user-defined unit and register it with the Unit type.",
                    examples: ['createUnit("foo")', 'createUnit("knot", {definition: "0.514444444 m/s", aliases: ["knots", "kt", "kts"]})', 'createUnit("mph", "1 mile/hour")'],
                    seealso: ["unit", "splitUnit"]
                },
                fraction: {
                    name: "fraction",
                    category: "Construction",
                    syntax: ["fraction(num)", "fraction(num,den)"],
                    description: "Create a fraction from a number or from a numerator and denominator.",
                    examples: ["fraction(0.125)", "fraction(1, 3) + fraction(2, 5)"],
                    seealso: ["bignumber", "boolean", "complex", "index", "matrix", "string", "unit"]
                },
                index: {
                    name: "index",
                    category: "Construction",
                    syntax: ["[start]", "[start:end]", "[start:step:end]", "[start1, start 2, ...]", "[start1:end1, start2:end2, ...]", "[start1:step1:end1, start2:step2:end2, ...]"],
                    description: "Create an index to get or replace a subset of a matrix",
                    examples: ["[]", "[1, 2, 3]", "A = [1, 2, 3; 4, 5, 6]", "A[1, :]", "A[1, 2] = 50", "A[0:2, 0:2] = ones(2, 2)"],
                    seealso: ["bignumber", "boolean", "complex", "matrix,", "number", "range", "string", "unit"]
                },
                matrix: {
                    name: "matrix",
                    category: "Construction",
                    syntax: ["[]", "[a1, b1, ...; a2, b2, ...]", "matrix()", 'matrix("dense")', "matrix([...])"],
                    description: "Create a matrix.",
                    examples: ["[]", "[1, 2, 3]", "[1, 2, 3; 4, 5, 6]", "matrix()", "matrix([3, 4])", 'matrix([3, 4; 5, 6], "sparse")', 'matrix([3, 4; 5, 6], "sparse", "number")'],
                    seealso: ["bignumber", "boolean", "complex", "index", "number", "string", "unit", "sparse"]
                },
                number: {
                    name: "number",
                    category: "Construction",
                    syntax: ["x", "number(x)", "number(unit, valuelessUnit)"],
                    description: "Create a number or convert a string or boolean into a number.",
                    examples: ["2", "2e3", "4.05", "number(2)", 'number("7.2")', "number(true)", "number([true, false, true, true])", 'number(unit("52cm"), "m")'],
                    seealso: ["bignumber", "boolean", "complex", "fraction", "index", "matrix", "string", "unit"]
                },
                sparse: {
                    name: "sparse",
                    category: "Construction",
                    syntax: ["sparse()", "sparse([a1, b1, ...; a1, b2, ...])", 'sparse([a1, b1, ...; a1, b2, ...], "number")'],
                    description: "Create a sparse matrix.",
                    examples: ["sparse()", "sparse([3, 4; 5, 6])", 'sparse([3, 0; 5, 0], "number")'],
                    seealso: ["bignumber", "boolean", "complex", "index", "number", "string", "unit", "matrix"]
                },
                splitUnit: {
                    name: "splitUnit",
                    category: "Construction",
                    syntax: ["splitUnit(unit: Unit, parts: Unit[])"],
                    description: "Split a unit in an array of units whose sum is equal to the original unit.",
                    examples: ['splitUnit(1 m, ["feet", "inch"])'],
                    seealso: ["unit", "createUnit"]
                },
                string: {
                    name: "string",
                    category: "Construction",
                    syntax: ['"text"', "string(x)"],
                    description: "Create a string or convert a value to a string",
                    examples: ['"Hello World!"', "string(4.2)", "string(3 + 2i)"],
                    seealso: ["bignumber", "boolean", "complex", "index", "matrix", "number", "unit"]
                },
                unit: {
                    name: "unit",
                    category: "Construction",
                    syntax: ["value unit", "unit(value, unit)", "unit(string)"],
                    description: "Create a unit.",
                    examples: ["5.5 mm", "3 inch", 'unit(7.1, "kilogram")', 'unit("23 deg")'],
                    seealso: ["bignumber", "boolean", "complex", "index", "matrix", "number", "string"]
                },
                e: at,
                E: at,
                false: {
                    name: "false",
                    category: "Constants",
                    syntax: ["false"],
                    description: "Boolean value false",
                    examples: ["false"],
                    seealso: ["true"]
                },
                i: {
                    name: "i",
                    category: "Constants",
                    syntax: ["i"],
                    description: "Imaginary unit, defined as i*i=-1. A complex number is described as a + b*i, where a is the real part, and b is the imaginary part.",
                    examples: ["i", "i * i", "sqrt(-1)"],
                    seealso: []
                },
                Infinity: {
                    name: "Infinity",
                    category: "Constants",
                    syntax: ["Infinity"],
                    description: "Infinity, a number which is larger than the maximum number that can be handled by a floating point number.",
                    examples: ["Infinity", "1 / 0"],
                    seealso: []
                },
                LN2: {
                    name: "LN2",
                    category: "Constants",
                    syntax: ["LN2"],
                    description: "Returns the natural logarithm of 2, approximately equal to 0.693",
                    examples: ["LN2", "log(2)"],
                    seealso: []
                },
                LN10: {
                    name: "LN10",
                    category: "Constants",
                    syntax: ["LN10"],
                    description: "Returns the natural logarithm of 10, approximately equal to 2.302",
                    examples: ["LN10", "log(10)"],
                    seealso: []
                },
                LOG2E: {
                    name: "LOG2E",
                    category: "Constants",
                    syntax: ["LOG2E"],
                    description: "Returns the base-2 logarithm of E, approximately equal to 1.442",
                    examples: ["LOG2E", "log(e, 2)"],
                    seealso: []
                },
                LOG10E: {
                    name: "LOG10E",
                    category: "Constants",
                    syntax: ["LOG10E"],
                    description: "Returns the base-10 logarithm of E, approximately equal to 0.434",
                    examples: ["LOG10E", "log(e, 10)"],
                    seealso: []
                },
                NaN: {
                    name: "NaN",
                    category: "Constants",
                    syntax: ["NaN"],
                    description: "Not a number",
                    examples: ["NaN", "0 / 0"],
                    seealso: []
                },
                null: {
                    name: "null",
                    category: "Constants",
                    syntax: ["null"],
                    description: "Value null",
                    examples: ["null"],
                    seealso: ["true", "false"]
                },
                pi: a,
                PI: a,
                phi: {
                    name: "phi",
                    category: "Constants",
                    syntax: ["phi"],
                    description: "Phi is the golden ratio. Two quantities are in the golden ratio if their ratio is the same as the ratio of their sum to the larger of the two quantities. Phi is defined as `(1 + sqrt(5)) / 2` and is approximately 1.618034...",
                    examples: ["phi"],
                    seealso: []
                },
                SQRT1_2: {
                    name: "SQRT1_2",
                    category: "Constants",
                    syntax: ["SQRT1_2"],
                    description: "Returns the square root of 1/2, approximately equal to 0.707",
                    examples: ["SQRT1_2", "sqrt(1/2)"],
                    seealso: []
                },
                SQRT2: {
                    name: "SQRT2",
                    category: "Constants",
                    syntax: ["SQRT2"],
                    description: "Returns the square root of 2, approximately equal to 1.414",
                    examples: ["SQRT2", "sqrt(2)"],
                    seealso: []
                },
                tau: {
                    name: "tau",
                    category: "Constants",
                    syntax: ["tau"],
                    description: "Tau is the ratio constant of a circle's circumference to radius, equal to 2 * pi, approximately 6.2832.",
                    examples: ["tau", "2 * pi"],
                    seealso: ["pi"]
                },
                true: {
                    name: "true",
                    category: "Constants",
                    syntax: ["true"],
                    description: "Boolean value true",
                    examples: ["true"],
                    seealso: ["false"]
                },
                version: {
                    name: "version",
                    category: "Constants",
                    syntax: ["version"],
                    description: "A string with the version number of math.js",
                    examples: ["version"],
                    seealso: []
                },
                speedOfLight: {description: "Speed of light in vacuum", examples: ["speedOfLight"]},
                gravitationConstant: {description: "Newtonian constant of gravitation", examples: ["gravitationConstant"]},
                planckConstant: {description: "Planck constant", examples: ["planckConstant"]},
                reducedPlanckConstant: {description: "Reduced Planck constant", examples: ["reducedPlanckConstant"]},
                magneticConstant: {description: "Magnetic constant (vacuum permeability)", examples: ["magneticConstant"]},
                electricConstant: {description: "Electric constant (vacuum permeability)", examples: ["electricConstant"]},
                vacuumImpedance: {description: "Characteristic impedance of vacuum", examples: ["vacuumImpedance"]},
                coulomb: {description: "Coulomb's constant", examples: ["coulomb"]},
                elementaryCharge: {description: "Elementary charge", examples: ["elementaryCharge"]},
                bohrMagneton: {description: "Borh magneton", examples: ["bohrMagneton"]},
                conductanceQuantum: {description: "Conductance quantum", examples: ["conductanceQuantum"]},
                inverseConductanceQuantum: {
                    description: "Inverse conductance quantum",
                    examples: ["inverseConductanceQuantum"]
                },
                magneticFluxQuantum: {description: "Magnetic flux quantum", examples: ["magneticFluxQuantum"]},
                nuclearMagneton: {description: "Nuclear magneton", examples: ["nuclearMagneton"]},
                klitzing: {description: "Von Klitzing constant", examples: ["klitzing"]},
                bohrRadius: {description: "Borh radius", examples: ["bohrRadius"]},
                classicalElectronRadius: {description: "Classical electron radius", examples: ["classicalElectronRadius"]},
                electronMass: {description: "Electron mass", examples: ["electronMass"]},
                fermiCoupling: {description: "Fermi coupling constant", examples: ["fermiCoupling"]},
                fineStructure: {description: "Fine-structure constant", examples: ["fineStructure"]},
                hartreeEnergy: {description: "Hartree energy", examples: ["hartreeEnergy"]},
                protonMass: {description: "Proton mass", examples: ["protonMass"]},
                deuteronMass: {description: "Deuteron Mass", examples: ["deuteronMass"]},
                neutronMass: {description: "Neutron mass", examples: ["neutronMass"]},
                quantumOfCirculation: {description: "Quantum of circulation", examples: ["quantumOfCirculation"]},
                rydberg: {description: "Rydberg constant", examples: ["rydberg"]},
                thomsonCrossSection: {description: "Thomson cross section", examples: ["thomsonCrossSection"]},
                weakMixingAngle: {description: "Weak mixing angle", examples: ["weakMixingAngle"]},
                efimovFactor: {description: "Efimov factor", examples: ["efimovFactor"]},
                atomicMass: {description: "Atomic mass constant", examples: ["atomicMass"]},
                avogadro: {description: "Avogadro's number", examples: ["avogadro"]},
                boltzmann: {description: "Boltzmann constant", examples: ["boltzmann"]},
                faraday: {description: "Faraday constant", examples: ["faraday"]},
                firstRadiation: {description: "First radiation constant", examples: ["firstRadiation"]},
                loschmidt: {description: "Loschmidt constant at T=273.15 K and p=101.325 kPa", examples: ["loschmidt"]},
                gasConstant: {description: "Gas constant", examples: ["gasConstant"]},
                molarPlanckConstant: {description: "Molar Planck constant", examples: ["molarPlanckConstant"]},
                molarVolume: {
                    description: "Molar volume of an ideal gas at T=273.15 K and p=101.325 kPa",
                    examples: ["molarVolume"]
                },
                sackurTetrode: {
                    description: "Sackur-Tetrode constant at T=1 K and p=101.325 kPa",
                    examples: ["sackurTetrode"]
                },
                secondRadiation: {description: "Second radiation constant", examples: ["secondRadiation"]},
                stefanBoltzmann: {description: "Stefan-Boltzmann constant", examples: ["stefanBoltzmann"]},
                wienDisplacement: {description: "Wien displacement law constant", examples: ["wienDisplacement"]},
                molarMass: {description: "Molar mass constant", examples: ["molarMass"]},
                molarMassC12: {description: "Molar mass constant of carbon-12", examples: ["molarMassC12"]},
                gravity: {
                    description: "Standard acceleration of gravity (standard acceleration of free-fall on Earth)",
                    examples: ["gravity"]
                },
                planckLength: {description: "Planck length", examples: ["planckLength"]},
                planckMass: {description: "Planck mass", examples: ["planckMass"]},
                planckTime: {description: "Planck time", examples: ["planckTime"]},
                planckCharge: {description: "Planck charge", examples: ["planckCharge"]},
                planckTemperature: {description: "Planck temperature", examples: ["planckTemperature"]},
                derivative: {
                    name: "derivative",
                    category: "Algebra",
                    syntax: ["derivative(expr, variable)", "derivative(expr, variable, {simplify: boolean})"],
                    description: "Takes the derivative of an expression expressed in parser Nodes. The derivative will be taken over the supplied variable in the second parameter. If there are multiple variables in the expression, it will return a partial derivative.",
                    examples: ['derivative("2x^3", "x")', 'derivative("2x^3", "x", {simplify: false})', 'derivative("2x^2 + 3x + 4", "x")', 'derivative("sin(2x)", "x")', 'f = parse("x^2 + x")', 'x = parse("x")', "df = derivative(f, x)", "df.evaluate({x: 3})"],
                    seealso: ["simplify", "parse", "evaluate"]
                },
                lsolve: {
                    name: "lsolve",
                    category: "Algebra",
                    syntax: ["x=lsolve(L, b)"],
                    description: "Finds one solution of the linear system L * x = b where L is an [n x n] lower triangular matrix and b is a [n] column vector.",
                    examples: ["a = [-2, 3; 2, 1]", "b = [11, 9]", "x = lsolve(a, b)"],
                    seealso: ["lsolveAll", "lup", "lusolve", "usolve", "matrix", "sparse"]
                },
                lsolveAll: {
                    name: "lsolveAll",
                    category: "Algebra",
                    syntax: ["x=lsolveAll(L, b)"],
                    description: "Finds all solutions of the linear system L * x = b where L is an [n x n] lower triangular matrix and b is a [n] column vector.",
                    examples: ["a = [-2, 3; 2, 1]", "b = [11, 9]", "x = lsolve(a, b)"],
                    seealso: ["lsolve", "lup", "lusolve", "usolve", "matrix", "sparse"]
                },
                lup: {
                    name: "lup",
                    category: "Algebra",
                    syntax: ["lup(m)"],
                    description: "Calculate the Matrix LU decomposition with partial pivoting. Matrix A is decomposed in three matrices (L, U, P) where P * A = L * U",
                    examples: ["lup([[2, 1], [1, 4]])", "lup(matrix([[2, 1], [1, 4]]))", "lup(sparse([[2, 1], [1, 4]]))"],
                    seealso: ["lusolve", "lsolve", "usolve", "matrix", "sparse", "slu", "qr"]
                },
                lusolve: {
                    name: "lusolve",
                    category: "Algebra",
                    syntax: ["x=lusolve(A, b)", "x=lusolve(lu, b)"],
                    description: "Solves the linear system A * x = b where A is an [n x n] matrix and b is a [n] column vector.",
                    examples: ["a = [-2, 3; 2, 1]", "b = [11, 9]", "x = lusolve(a, b)"],
                    seealso: ["lup", "slu", "lsolve", "usolve", "matrix", "sparse"]
                },
                simplify: {
                    name: "simplify",
                    category: "Algebra",
                    syntax: ["simplify(expr)", "simplify(expr, rules)"],
                    description: "Simplify an expression tree.",
                    examples: ['simplify("3 + 2 / 4")', 'simplify("2x + x")', 'f = parse("x * (x + 2 + x)")', "simplified = simplify(f)", "simplified.evaluate({x: 2})"],
                    seealso: ["derivative", "parse", "evaluate"]
                },
                rationalize: {
                    name: "rationalize",
                    category: "Algebra",
                    syntax: ["rationalize(expr)", "rationalize(expr, scope)", "rationalize(expr, scope, detailed)"],
                    description: "Transform a rationalizable expression in a rational fraction. If rational fraction is one variable polynomial then converts the numerator and denominator in canonical form, with decreasing exponents, returning the coefficients of numerator.",
                    examples: ['rationalize("2x/y - y/(x+1)")', 'rationalize("2x/y - y/(x+1)", true)'],
                    seealso: ["simplify"]
                },
                slu: {
                    name: "slu",
                    category: "Algebra",
                    syntax: ["slu(A, order, threshold)"],
                    description: "Calculate the Matrix LU decomposition with full pivoting. Matrix A is decomposed in two matrices (L, U) and two permutation vectors (pinv, q) where P * A * Q = L * U",
                    examples: ["slu(sparse([4.5, 0, 3.2, 0; 3.1, 2.9, 0, 0.9; 0, 1.7, 3, 0; 3.5, 0.4, 0, 1]), 1, 0.001)"],
                    seealso: ["lusolve", "lsolve", "usolve", "matrix", "sparse", "lup", "qr"]
                },
                usolve: {
                    name: "usolve",
                    category: "Algebra",
                    syntax: ["x=usolve(U, b)"],
                    description: "Finds one solution of the linear system U * x = b where U is an [n x n] upper triangular matrix and b is a [n] column vector.",
                    examples: ["x=usolve(sparse([1, 1, 1, 1; 0, 1, 1, 1; 0, 0, 1, 1; 0, 0, 0, 1]), [1; 2; 3; 4])"],
                    seealso: ["usolveAll", "lup", "lusolve", "lsolve", "matrix", "sparse"]
                },
                usolveAll: {
                    name: "usolveAll",
                    category: "Algebra",
                    syntax: ["x=usolve(U, b)"],
                    description: "Finds all solutions of the linear system U * x = b where U is an [n x n] upper triangular matrix and b is a [n] column vector.",
                    examples: ["x=usolve(sparse([1, 1, 1, 1; 0, 1, 1, 1; 0, 0, 1, 1; 0, 0, 0, 1]), [1; 2; 3; 4])"],
                    seealso: ["usolve", "lup", "lusolve", "lsolve", "matrix", "sparse"]
                },
                qr: {
                    name: "qr",
                    category: "Algebra",
                    syntax: ["qr(A)"],
                    description: "Calculates the Matrix QR decomposition. Matrix `A` is decomposed in two matrices (`Q`, `R`) where `Q` is an orthogonal matrix and `R` is an upper triangular matrix.",
                    examples: ["qr([[1, -1,  4], [1,  4, -2], [1,  4,  2], [1,  -1, 0]])"],
                    seealso: ["lup", "slu", "matrix"]
                },
                abs: {
                    name: "abs",
                    category: "Arithmetic",
                    syntax: ["abs(x)"],
                    description: "Compute the absolute value.",
                    examples: ["abs(3.5)", "abs(-4.2)"],
                    seealso: ["sign"]
                },
                add: {
                    name: "add",
                    category: "Operators",
                    syntax: ["x + y", "add(x, y)"],
                    description: "Add two values.",
                    examples: ["a = 2.1 + 3.6", "a - 3.6", "3 + 2i", "3 cm + 2 inch", '"2.3" + "4"'],
                    seealso: ["subtract"]
                },
                cbrt: {
                    name: "cbrt",
                    category: "Arithmetic",
                    syntax: ["cbrt(x)", "cbrt(x, allRoots)"],
                    description: "Compute the cubic root value. If x = y * y * y, then y is the cubic root of x. When `x` is a number or complex number, an optional second argument `allRoots` can be provided to return all three cubic roots. If not provided, the principal root is returned",
                    examples: ["cbrt(64)", "cube(4)", "cbrt(-8)", "cbrt(2 + 3i)", "cbrt(8i)", "cbrt(8i, true)", "cbrt(27 m^3)"],
                    seealso: ["square", "sqrt", "cube", "multiply"]
                },
                ceil: {
                    name: "ceil",
                    category: "Arithmetic",
                    syntax: ["ceil(x)"],
                    description: "Round a value towards plus infinity. If x is complex, both real and imaginary part are rounded towards plus infinity.",
                    examples: ["ceil(3.2)", "ceil(3.8)", "ceil(-4.2)"],
                    seealso: ["floor", "fix", "round"]
                },
                cube: {
                    name: "cube",
                    category: "Arithmetic",
                    syntax: ["cube(x)"],
                    description: "Compute the cube of a value. The cube of x is x * x * x.",
                    examples: ["cube(2)", "2^3", "2 * 2 * 2"],
                    seealso: ["multiply", "square", "pow"]
                },
                divide: {
                    name: "divide",
                    category: "Operators",
                    syntax: ["x / y", "divide(x, y)"],
                    description: "Divide two values.",
                    examples: ["a = 2 / 3", "a * 3", "4.5 / 2", "3 + 4 / 2", "(3 + 4) / 2", "18 km / 4.5"],
                    seealso: ["multiply"]
                },
                dotDivide: {
                    name: "dotDivide",
                    category: "Operators",
                    syntax: ["x ./ y", "dotDivide(x, y)"],
                    description: "Divide two values element wise.",
                    examples: ["a = [1, 2, 3; 4, 5, 6]", "b = [2, 1, 1; 3, 2, 5]", "a ./ b"],
                    seealso: ["multiply", "dotMultiply", "divide"]
                },
                dotMultiply: {
                    name: "dotMultiply",
                    category: "Operators",
                    syntax: ["x .* y", "dotMultiply(x, y)"],
                    description: "Multiply two values element wise.",
                    examples: ["a = [1, 2, 3; 4, 5, 6]", "b = [2, 1, 1; 3, 2, 5]", "a .* b"],
                    seealso: ["multiply", "divide", "dotDivide"]
                },
                dotPow: {
                    name: "dotPow",
                    category: "Operators",
                    syntax: ["x .^ y", "dotPow(x, y)"],
                    description: "Calculates the power of x to y element wise.",
                    examples: ["a = [1, 2, 3; 4, 5, 6]", "a .^ 2"],
                    seealso: ["pow"]
                },
                exp: {
                    name: "exp",
                    category: "Arithmetic",
                    syntax: ["exp(x)"],
                    description: "Calculate the exponent of a value.",
                    examples: ["exp(1.3)", "e ^ 1.3", "log(exp(1.3))", "x = 2.4", "(exp(i*x) == cos(x) + i*sin(x))   # Euler's formula"],
                    seealso: ["expm", "expm1", "pow", "log"]
                },
                expm: {
                    name: "expm",
                    category: "Arithmetic",
                    syntax: ["exp(x)"],
                    description: "Compute the matrix exponential, expm(A) = e^A. The matrix must be square. Not to be confused with exp(a), which performs element-wise exponentiation.",
                    examples: ["expm([[0,2],[0,0]])"],
                    seealso: ["exp"]
                },
                expm1: {
                    name: "expm1",
                    category: "Arithmetic",
                    syntax: ["expm1(x)"],
                    description: "Calculate the value of subtracting 1 from the exponential value.",
                    examples: ["expm1(2)", "pow(e, 2) - 1", "log(expm1(2) + 1)"],
                    seealso: ["exp", "pow", "log"]
                },
                fix: {
                    name: "fix",
                    category: "Arithmetic",
                    syntax: ["fix(x)"],
                    description: "Round a value towards zero. If x is complex, both real and imaginary part are rounded towards zero.",
                    examples: ["fix(3.2)", "fix(3.8)", "fix(-4.2)", "fix(-4.8)"],
                    seealso: ["ceil", "floor", "round"]
                },
                floor: {
                    name: "floor",
                    category: "Arithmetic",
                    syntax: ["floor(x)"],
                    description: "Round a value towards minus infinity.If x is complex, both real and imaginary part are rounded towards minus infinity.",
                    examples: ["floor(3.2)", "floor(3.8)", "floor(-4.2)"],
                    seealso: ["ceil", "fix", "round"]
                },
                gcd: {
                    name: "gcd",
                    category: "Arithmetic",
                    syntax: ["gcd(a, b)", "gcd(a, b, c, ...)"],
                    description: "Compute the greatest common divisor.",
                    examples: ["gcd(8, 12)", "gcd(-4, 6)", "gcd(25, 15, -10)"],
                    seealso: ["lcm", "xgcd"]
                },
                hypot: {
                    name: "hypot",
                    category: "Arithmetic",
                    syntax: ["hypot(a, b, c, ...)", "hypot([a, b, c, ...])"],
                    description: "Calculate the hypotenusa of a list with values. ",
                    examples: ["hypot(3, 4)", "sqrt(3^2 + 4^2)", "hypot(-2)", "hypot([3, 4, 5])"],
                    seealso: ["abs", "norm"]
                },
                lcm: {
                    name: "lcm",
                    category: "Arithmetic",
                    syntax: ["lcm(x, y)"],
                    description: "Compute the least common multiple.",
                    examples: ["lcm(4, 6)", "lcm(6, 21)", "lcm(6, 21, 5)"],
                    seealso: ["gcd"]
                },
                log: {
                    name: "log",
                    category: "Arithmetic",
                    syntax: ["log(x)", "log(x, base)"],
                    description: "Compute the logarithm of a value. If no base is provided, the natural logarithm of x is calculated. If base if provided, the logarithm is calculated for the specified base. log(x, base) is defined as log(x) / log(base).",
                    examples: ["log(3.5)", "a = log(2.4)", "exp(a)", "10 ^ 4", "log(10000, 10)", "log(10000) / log(10)", "b = log(1024, 2)", "2 ^ b"],
                    seealso: ["exp", "log1p", "log2", "log10"]
                },
                log2: {
                    name: "log2",
                    category: "Arithmetic",
                    syntax: ["log2(x)"],
                    description: "Calculate the 2-base of a value. This is the same as calculating `log(x, 2)`.",
                    examples: ["log2(0.03125)", "log2(16)", "log2(16) / log2(2)", "pow(2, 4)"],
                    seealso: ["exp", "log1p", "log", "log10"]
                },
                log1p: {
                    name: "log1p",
                    category: "Arithmetic",
                    syntax: ["log1p(x)", "log1p(x, base)"],
                    description: "Calculate the logarithm of a `value+1`",
                    examples: ["log1p(2.5)", "exp(log1p(1.4))", "pow(10, 4)", "log1p(9999, 10)", "log1p(9999) / log(10)"],
                    seealso: ["exp", "log", "log2", "log10"]
                },
                log10: {
                    name: "log10",
                    category: "Arithmetic",
                    syntax: ["log10(x)"],
                    description: "Compute the 10-base logarithm of a value.",
                    examples: ["log10(0.00001)", "log10(10000)", "10 ^ 4", "log(10000) / log(10)", "log(10000, 10)"],
                    seealso: ["exp", "log"]
                },
                mod: {
                    name: "mod",
                    category: "Operators",
                    syntax: ["x % y", "x mod y", "mod(x, y)"],
                    description: "Calculates the modulus, the remainder of an integer division.",
                    examples: ["7 % 3", "11 % 2", "10 mod 4", "isOdd(x) = x % 2", "isOdd(2)", "isOdd(3)"],
                    seealso: ["divide"]
                },
                multiply: {
                    name: "multiply",
                    category: "Operators",
                    syntax: ["x * y", "multiply(x, y)"],
                    description: "multiply two values.",
                    examples: ["a = 2.1 * 3.4", "a / 3.4", "2 * 3 + 4", "2 * (3 + 4)", "3 * 2.1 km"],
                    seealso: ["divide"]
                },
                norm: {
                    name: "norm",
                    category: "Arithmetic",
                    syntax: ["norm(x)", "norm(x, p)"],
                    description: "Calculate the norm of a number, vector or matrix.",
                    examples: ["abs(-3.5)", "norm(-3.5)", "norm(3 - 4i)", "norm([1, 2, -3], Infinity)", "norm([1, 2, -3], -Infinity)", "norm([3, 4], 2)", "norm([[1, 2], [3, 4]], 1)", 'norm([[1, 2], [3, 4]], "inf")', 'norm([[1, 2], [3, 4]], "fro")']
                },
                nthRoot: {
                    name: "nthRoot",
                    category: "Arithmetic",
                    syntax: ["nthRoot(a)", "nthRoot(a, root)"],
                    description: 'Calculate the nth root of a value. The principal nth root of a positive real number A, is the positive real solution of the equation "x^root = A".',
                    examples: ["4 ^ 3", "nthRoot(64, 3)", "nthRoot(9, 2)", "sqrt(9)"],
                    seealso: ["nthRoots", "pow", "sqrt"]
                },
                nthRoots: {
                    name: "nthRoots",
                    category: "Arithmetic",
                    syntax: ["nthRoots(A)", "nthRoots(A, root)"],
                    description: 'Calculate the nth roots of a value. An nth root of a positive real number A, is a positive real solution of the equation "x^root = A". This function returns an array of complex values.',
                    examples: ["nthRoots(1)", "nthRoots(1, 3)"],
                    seealso: ["sqrt", "pow", "nthRoot"]
                },
                pow: {
                    name: "pow",
                    category: "Operators",
                    syntax: ["x ^ y", "pow(x, y)"],
                    description: "Calculates the power of x to y, x^y.",
                    examples: ["2^3", "2*2*2", "1 + e ^ (pi * i)"],
                    seealso: ["multiply", "nthRoot", "nthRoots", "sqrt"]
                },
                round: {
                    name: "round",
                    category: "Arithmetic",
                    syntax: ["round(x)", "round(x, n)"],
                    description: "round a value towards the nearest integer.If x is complex, both real and imaginary part are rounded towards the nearest integer. When n is specified, the value is rounded to n decimals.",
                    examples: ["round(3.2)", "round(3.8)", "round(-4.2)", "round(-4.8)", "round(pi, 3)", "round(123.45678, 2)"],
                    seealso: ["ceil", "floor", "fix"]
                },
                sign: {
                    name: "sign",
                    category: "Arithmetic",
                    syntax: ["sign(x)"],
                    description: "Compute the sign of a value. The sign of a value x is 1 when x>1, -1 when x<0, and 0 when x=0.",
                    examples: ["sign(3.5)", "sign(-4.2)", "sign(0)"],
                    seealso: ["abs"]
                },
                sqrt: {
                    name: "sqrt",
                    category: "Arithmetic",
                    syntax: ["sqrt(x)"],
                    description: "Compute the square root value. If x = y * y, then y is the square root of x.",
                    examples: ["sqrt(25)", "5 * 5", "sqrt(-1)"],
                    seealso: ["square", "sqrtm", "multiply", "nthRoot", "nthRoots", "pow"]
                },
                sqrtm: {
                    name: "sqrtm",
                    category: "Arithmetic",
                    syntax: ["sqrtm(x)"],
                    description: "Calculate the principal square root of a square matrix. The principal square root matrix `X` of another matrix `A` is such that `X * X = A`.",
                    examples: ["sqrtm([[1, 2], [3, 4]])"],
                    seealso: ["sqrt", "abs", "square", "multiply"]
                },
                square: {
                    name: "square",
                    category: "Arithmetic",
                    syntax: ["square(x)"],
                    description: "Compute the square of a value. The square of x is x * x.",
                    examples: ["square(3)", "sqrt(9)", "3^2", "3 * 3"],
                    seealso: ["multiply", "pow", "sqrt", "cube"]
                },
                subtract: {
                    name: "subtract",
                    category: "Operators",
                    syntax: ["x - y", "subtract(x, y)"],
                    description: "subtract two values.",
                    examples: ["a = 5.3 - 2", "a + 2", "2/3 - 1/6", "2 * 3 - 3", "2.1 km - 500m"],
                    seealso: ["add"]
                },
                unaryMinus: {
                    name: "unaryMinus",
                    category: "Operators",
                    syntax: ["-x", "unaryMinus(x)"],
                    description: "Inverse the sign of a value. Converts booleans and strings to numbers.",
                    examples: ["-4.5", "-(-5.6)", '-"22"'],
                    seealso: ["add", "subtract", "unaryPlus"]
                },
                unaryPlus: {
                    name: "unaryPlus",
                    category: "Operators",
                    syntax: ["+x", "unaryPlus(x)"],
                    description: "Converts booleans and strings to numbers.",
                    examples: ["+true", '+"2"'],
                    seealso: ["add", "subtract", "unaryMinus"]
                },
                xgcd: {
                    name: "xgcd",
                    category: "Arithmetic",
                    syntax: ["xgcd(a, b)"],
                    description: "Calculate the extended greatest common divisor for two values. The result is an array [d, x, y] with 3 entries, where d is the greatest common divisor, and d = x * a + y * b.",
                    examples: ["xgcd(8, 12)", "gcd(8, 12)", "xgcd(36163, 21199)"],
                    seealso: ["gcd", "lcm"]
                },
                bitAnd: {
                    name: "bitAnd",
                    category: "Bitwise",
                    syntax: ["x & y", "bitAnd(x, y)"],
                    description: "Bitwise AND operation. Performs the logical AND operation on each pair of the corresponding bits of the two given values by multiplying them. If both bits in the compared position are 1, the bit in the resulting binary representation is 1, otherwise, the result is 0",
                    examples: ["5 & 3", "bitAnd(53, 131)", "[1, 12, 31] & 42"],
                    seealso: ["bitNot", "bitOr", "bitXor", "leftShift", "rightArithShift", "rightLogShift"]
                },
                bitNot: {
                    name: "bitNot",
                    category: "Bitwise",
                    syntax: ["~x", "bitNot(x)"],
                    description: "Bitwise NOT operation. Performs a logical negation on each bit of the given value. Bits that are 0 become 1, and those that are 1 become 0.",
                    examples: ["~1", "~2", "bitNot([2, -3, 4])"],
                    seealso: ["bitAnd", "bitOr", "bitXor", "leftShift", "rightArithShift", "rightLogShift"]
                },
                bitOr: {
                    name: "bitOr",
                    category: "Bitwise",
                    syntax: ["x | y", "bitOr(x, y)"],
                    description: "Bitwise OR operation. Performs the logical inclusive OR operation on each pair of corresponding bits of the two given values. The result in each position is 1 if the first bit is 1 or the second bit is 1 or both bits are 1, otherwise, the result is 0.",
                    examples: ["5 | 3", "bitOr([1, 2, 3], 4)"],
                    seealso: ["bitAnd", "bitNot", "bitXor", "leftShift", "rightArithShift", "rightLogShift"]
                },
                bitXor: {
                    name: "bitXor",
                    category: "Bitwise",
                    syntax: ["bitXor(x, y)"],
                    description: "Bitwise XOR operation, exclusive OR. Performs the logical exclusive OR operation on each pair of corresponding bits of the two given values. The result in each position is 1 if only the first bit is 1 or only the second bit is 1, but will be 0 if both are 0 or both are 1.",
                    examples: ["bitOr(1, 2)", "bitXor([2, 3, 4], 4)"],
                    seealso: ["bitAnd", "bitNot", "bitOr", "leftShift", "rightArithShift", "rightLogShift"]
                },
                leftShift: {
                    name: "leftShift",
                    category: "Bitwise",
                    syntax: ["x << y", "leftShift(x, y)"],
                    description: "Bitwise left logical shift of a value x by y number of bits.",
                    examples: ["4 << 1", "8 >> 1"],
                    seealso: ["bitAnd", "bitNot", "bitOr", "bitXor", "rightArithShift", "rightLogShift"]
                },
                rightArithShift: {
                    name: "rightArithShift",
                    category: "Bitwise",
                    syntax: ["x >> y", "rightArithShift(x, y)"],
                    description: "Bitwise right arithmetic shift of a value x by y number of bits.",
                    examples: ["8 >> 1", "4 << 1", "-12 >> 2"],
                    seealso: ["bitAnd", "bitNot", "bitOr", "bitXor", "leftShift", "rightLogShift"]
                },
                rightLogShift: {
                    name: "rightLogShift",
                    category: "Bitwise",
                    syntax: ["x >>> y", "rightLogShift(x, y)"],
                    description: "Bitwise right logical shift of a value x by y number of bits.",
                    examples: ["8 >>> 1", "4 << 1", "-12 >>> 2"],
                    seealso: ["bitAnd", "bitNot", "bitOr", "bitXor", "leftShift", "rightArithShift"]
                },
                bellNumbers: {
                    name: "bellNumbers",
                    category: "Combinatorics",
                    syntax: ["bellNumbers(n)"],
                    description: "The Bell Numbers count the number of partitions of a set. A partition is a pairwise disjoint subset of S whose union is S. `bellNumbers` only takes integer arguments. The following condition must be enforced: n >= 0.",
                    examples: ["bellNumbers(3)", "bellNumbers(8)"],
                    seealso: ["stirlingS2"]
                },
                catalan: {
                    name: "catalan",
                    category: "Combinatorics",
                    syntax: ["catalan(n)"],
                    description: "The Catalan Numbers enumerate combinatorial structures of many different types. catalan only takes integer arguments. The following condition must be enforced: n >= 0.",
                    examples: ["catalan(3)", "catalan(8)"],
                    seealso: ["bellNumbers"]
                },
                composition: {
                    name: "composition",
                    category: "Combinatorics",
                    syntax: ["composition(n, k)"],
                    description: "The composition counts of n into k parts. composition only takes integer arguments. The following condition must be enforced: k <= n.",
                    examples: ["composition(5, 3)"],
                    seealso: ["combinations"]
                },
                stirlingS2: {
                    name: "stirlingS2",
                    category: "Combinatorics",
                    syntax: ["stirlingS2(n, k)"],
                    description: "he Stirling numbers of the second kind, counts the number of ways to partition a set of n labelled objects into k nonempty unlabelled subsets. `stirlingS2` only takes integer arguments. The following condition must be enforced: k <= n. If n = k or k = 1, then s(n,k) = 1.",
                    examples: ["stirlingS2(5, 3)"],
                    seealso: ["bellNumbers"]
                },
                config: {
                    name: "config",
                    category: "Core",
                    syntax: ["config()", "config(options)"],
                    description: "Get configuration or change configuration.",
                    examples: ["config()", "1/3 + 1/4", 'config({number: "Fraction"})', "1/3 + 1/4"],
                    seealso: []
                },
                import: {
                    name: "import",
                    category: "Core",
                    syntax: ["import(functions)", "import(functions, options)"],
                    description: "Import functions or constants from an object.",
                    examples: ["import({myFn: f(x)=x^2, myConstant: 32 })", "myFn(2)", "myConstant"],
                    seealso: []
                },
                typed: {
                    name: "typed",
                    category: "Core",
                    syntax: ["typed(signatures)", "typed(name, signatures)"],
                    description: "Create a typed function.",
                    examples: ['double = typed({ "number, number": f(x)=x+x })', "double(2)", 'double("hello")'],
                    seealso: []
                },
                arg: {
                    name: "arg",
                    category: "Complex",
                    syntax: ["arg(x)"],
                    description: "Compute the argument of a complex value. If x = a+bi, the argument is computed as atan2(b, a).",
                    examples: ["arg(2 + 2i)", "atan2(3, 2)", "arg(2 + 3i)"],
                    seealso: ["re", "im", "conj", "abs"]
                },
                conj: {
                    name: "conj",
                    category: "Complex",
                    syntax: ["conj(x)"],
                    description: "Compute the complex conjugate of a complex value. If x = a+bi, the complex conjugate is a-bi.",
                    examples: ["conj(2 + 3i)", "conj(2 - 3i)", "conj(-5.2i)"],
                    seealso: ["re", "im", "abs", "arg"]
                },
                re: {
                    name: "re",
                    category: "Complex",
                    syntax: ["re(x)"],
                    description: "Get the real part of a complex number.",
                    examples: ["re(2 + 3i)", "im(2 + 3i)", "re(-5.2i)", "re(2.4)"],
                    seealso: ["im", "conj", "abs", "arg"]
                },
                im: {
                    name: "im",
                    category: "Complex",
                    syntax: ["im(x)"],
                    description: "Get the imaginary part of a complex number.",
                    examples: ["im(2 + 3i)", "re(2 + 3i)", "im(-5.2i)", "im(2.4)"],
                    seealso: ["re", "conj", "abs", "arg"]
                },
                evaluate: {
                    name: "evaluate",
                    category: "Expression",
                    syntax: ["evaluate(expression)", "evaluate([expr1, expr2, expr3, ...])"],
                    description: "Evaluate an expression or an array with expressions.",
                    examples: ['evaluate("2 + 3")', 'evaluate("sqrt(" + 4 + ")")'],
                    seealso: []
                },
                help: {
                    name: "help",
                    category: "Expression",
                    syntax: ["help(object)", "help(string)"],
                    description: "Display documentation on a function or data type.",
                    examples: ["help(sqrt)", 'help("complex")'],
                    seealso: []
                },
                distance: {
                    name: "distance",
                    category: "Geometry",
                    syntax: ["distance([x1, y1], [x2, y2])", "distance([[x1, y1], [x2, y2]])"],
                    description: "Calculates the Euclidean distance between two points.",
                    examples: ["distance([0,0], [4,4])", "distance([[0,0], [4,4]])"],
                    seealso: []
                },
                intersect: {
                    name: "intersect",
                    category: "Geometry",
                    syntax: ["intersect(expr1, expr2, expr3, expr4)", "intersect(expr1, expr2, expr3)"],
                    description: "Computes the intersection point of lines and/or planes.",
                    examples: ["intersect([0, 0], [10, 10], [10, 0], [0, 10])", "intersect([1, 0, 1],  [4, -2, 2], [1, 1, 1, 6])"],
                    seealso: []
                },
                and: {
                    name: "and",
                    category: "Logical",
                    syntax: ["x and y", "and(x, y)"],
                    description: "Logical and. Test whether two values are both defined with a nonzero/nonempty value.",
                    examples: ["true and false", "true and true", "2 and 4"],
                    seealso: ["not", "or", "xor"]
                },
                not: {
                    name: "not",
                    category: "Logical",
                    syntax: ["not x", "not(x)"],
                    description: "Logical not. Flips the boolean value of given argument.",
                    examples: ["not true", "not false", "not 2", "not 0"],
                    seealso: ["and", "or", "xor"]
                },
                or: {
                    name: "or",
                    category: "Logical",
                    syntax: ["x or y", "or(x, y)"],
                    description: "Logical or. Test if at least one value is defined with a nonzero/nonempty value.",
                    examples: ["true or false", "false or false", "0 or 4"],
                    seealso: ["not", "and", "xor"]
                },
                xor: {
                    name: "xor",
                    category: "Logical",
                    syntax: ["x xor y", "xor(x, y)"],
                    description: "Logical exclusive or, xor. Test whether one and only one value is defined with a nonzero/nonempty value.",
                    examples: ["true xor false", "false xor false", "true xor true", "0 xor 4"],
                    seealso: ["not", "and", "or"]
                },
                concat: {
                    name: "concat",
                    category: "Matrix",
                    syntax: ["concat(A, B, C, ...)", "concat(A, B, C, ..., dim)"],
                    description: "Concatenate matrices. By default, the matrices are concatenated by the last dimension. The dimension on which to concatenate can be provided as last argument.",
                    examples: ["A = [1, 2; 5, 6]", "B = [3, 4; 7, 8]", "concat(A, B)", "concat(A, B, 1)", "concat(A, B, 2)"],
                    seealso: ["det", "diag", "identity", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "transpose", "zeros"]
                },
                count: {
                    name: "count",
                    category: "Matrix",
                    syntax: ["count(x)"],
                    description: "Count the number of elements of a matrix, array or string.",
                    examples: ["a = [1, 2; 3, 4; 5, 6]", "count(a)", "size(a)", 'count("hello world")'],
                    seealso: ["size"]
                },
                cross: {
                    name: "cross",
                    category: "Matrix",
                    syntax: ["cross(A, B)"],
                    description: "Calculate the cross product for two vectors in three dimensional space.",
                    examples: ["cross([1, 1, 0],  [0, 1, 1])", "cross([3, -3, 1], [4, 9, 2])", "cross([2, 3, 4],  [5, 6, 7])"],
                    seealso: ["multiply", "dot"]
                },
                column: {
                    name: "column",
                    category: "Matrix",
                    syntax: ["column(x, index)"],
                    description: "Return a column from a matrix or array.",
                    examples: ["A = [[1, 2], [3, 4]]", "column(A, 1)", "column(A, 2)"],
                    seealso: ["row"]
                },
                ctranspose: {
                    name: "ctranspose",
                    category: "Matrix",
                    syntax: ["x'", "ctranspose(x)"],
                    description: "Complex Conjugate and Transpose a matrix",
                    examples: ["a = [1, 2, 3; 4, 5, 6]", "a'", "ctranspose(a)"],
                    seealso: ["concat", "det", "diag", "identity", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "zeros"]
                },
                det: {
                    name: "det",
                    category: "Matrix",
                    syntax: ["det(x)"],
                    description: "Calculate the determinant of a matrix",
                    examples: ["det([1, 2; 3, 4])", "det([-2, 2, 3; -1, 1, 3; 2, 0, -1])"],
                    seealso: ["concat", "diag", "identity", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "transpose", "zeros"]
                },
                diag: {
                    name: "diag",
                    category: "Matrix",
                    syntax: ["diag(x)", "diag(x, k)"],
                    description: "Create a diagonal matrix or retrieve the diagonal of a matrix. When x is a vector, a matrix with the vector values on the diagonal will be returned. When x is a matrix, a vector with the diagonal values of the matrix is returned. When k is provided, the k-th diagonal will be filled in or retrieved, if k is positive, the values are placed on the super diagonal. When k is negative, the values are placed on the sub diagonal.",
                    examples: ["diag(1:3)", "diag(1:3, 1)", "a = [1, 2, 3; 4, 5, 6; 7, 8, 9]", "diag(a)"],
                    seealso: ["concat", "det", "identity", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "transpose", "zeros"]
                },
                diff: {
                    name: "diff",
                    category: "Matrix",
                    syntax: ["diff(arr)", "diff(arr, dim)"],
                    description: ["Create a new matrix or array with the difference of the passed matrix or array.", "Dim parameter is optional and used to indicant the dimension of the array/matrix to apply the difference", "If no dimension parameter is passed it is assumed as dimension 0", "Dimension is zero-based in javascript and one-based in the parser", "Arrays must be 'rectangular' meaning arrays like [1, 2]", "If something is passed as a matrix it will be returned as a matrix but other than that all matrices are converted to arrays"],
                    examples: ["diff([1, 2, 4, 7, 0])", "diff([1, 2, 4, 7, 0], 0)", "diff(matrix([1, 2, 4, 7, 0]))", "diff([[1, 2], [3, 4]])", "diff([[1, 2], [3, 4]], 0)", "diff([[1, 2], [3, 4]], 1)", "diff([[1, 2], [3, 4]], bignumber(1))", "diff(matrix([[1, 2], [3, 4]]), 1)", "diff([[1, 2], matrix([3, 4])], 1)"],
                    seealso: ["subtract", "partitionSelect"]
                },
                dot: {
                    name: "dot",
                    category: "Matrix",
                    syntax: ["dot(A, B)", "A * B"],
                    description: "Calculate the dot product of two vectors. The dot product of A = [a1, a2, a3, ..., an] and B = [b1, b2, b3, ..., bn] is defined as dot(A, B) = a1 * b1 + a2 * b2 + a3 * b3 + ... + an * bn",
                    examples: ["dot([2, 4, 1], [2, 2, 3])", "[2, 4, 1] * [2, 2, 3]"],
                    seealso: ["multiply", "cross"]
                },
                getMatrixDataType: {
                    name: "getMatrixDataType",
                    category: "Matrix",
                    syntax: ["getMatrixDataType(x)"],
                    description: 'Find the data type of all elements in a matrix or array, for example "number" if all items are a number and "Complex" if all values are complex numbers. If a matrix contains more than one data type, it will return "mixed".',
                    examples: ["getMatrixDataType([1, 2, 3])", "getMatrixDataType([[5 cm], [2 inch]])", 'getMatrixDataType([1, "text"])', "getMatrixDataType([1, bignumber(4)])"],
                    seealso: ["matrix", "sparse", "typeOf"]
                },
                identity: {
                    name: "identity",
                    category: "Matrix",
                    syntax: ["identity(n)", "identity(m, n)", "identity([m, n])"],
                    description: "Returns the identity matrix with size m-by-n. The matrix has ones on the diagonal and zeros elsewhere.",
                    examples: ["identity(3)", "identity(3, 5)", "a = [1, 2, 3; 4, 5, 6]", "identity(size(a))"],
                    seealso: ["concat", "det", "diag", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "transpose", "zeros"]
                },
                filter: {
                    name: "filter",
                    category: "Matrix",
                    syntax: ["filter(x, test)"],
                    description: "Filter items in a matrix.",
                    examples: ["isPositive(x) = x > 0", "filter([6, -2, -1, 4, 3], isPositive)", "filter([6, -2, 0, 1, 0], x != 0)"],
                    seealso: ["sort", "map", "forEach"]
                },
                flatten: {
                    name: "flatten",
                    category: "Matrix",
                    syntax: ["flatten(x)"],
                    description: "Flatten a multi dimensional matrix into a single dimensional matrix.",
                    examples: ["a = [1, 2, 3; 4, 5, 6]", "size(a)", "b = flatten(a)", "size(b)"],
                    seealso: ["concat", "resize", "size", "squeeze"]
                },
                forEach: {
                    name: "forEach",
                    category: "Matrix",
                    syntax: ["forEach(x, callback)"],
                    description: "Iterates over all elements of a matrix/array, and executes the given callback function.",
                    examples: ["forEach([1, 2, 3], function(val) { console.log(val) })"],
                    seealso: ["map", "sort", "filter"]
                },
                inv: {
                    name: "inv",
                    category: "Matrix",
                    syntax: ["inv(x)"],
                    description: "Calculate the inverse of a matrix",
                    examples: ["inv([1, 2; 3, 4])", "inv(4)", "1 / 4"],
                    seealso: ["concat", "det", "diag", "identity", "ones", "range", "size", "squeeze", "subset", "trace", "transpose", "zeros"]
                },
                eigs: {
                    name: "eigs",
                    category: "Matrix",
                    syntax: ["eigs(x)"],
                    description: "Calculate the eigenvalues and eigenvectors of a real symmetric matrix",
                    examples: ["eigs([[5, 2.3], [2.3, 1]])"],
                    seealso: ["inv"]
                },
                kron: {
                    name: "kron",
                    category: "Matrix",
                    syntax: ["kron(x, y)"],
                    description: "Calculates the kronecker product of 2 matrices or vectors.",
                    examples: ["kron([[1, 0], [0, 1]], [[1, 2], [3, 4]])", "kron([1,1], [2,3,4])"],
                    seealso: ["multiply", "dot", "cross"]
                },
                map: {
                    name: "map",
                    category: "Matrix",
                    syntax: ["map(x, callback)"],
                    description: "Create a new matrix or array with the results of the callback function executed on each entry of the matrix/array.",
                    examples: ["map([1, 2, 3], square)"],
                    seealso: ["filter", "forEach"]
                },
                ones: {
                    name: "ones",
                    category: "Matrix",
                    syntax: ["ones(m)", "ones(m, n)", "ones(m, n, p, ...)", "ones([m])", "ones([m, n])", "ones([m, n, p, ...])"],
                    description: "Create a matrix containing ones.",
                    examples: ["ones(3)", "ones(3, 5)", "ones([2,3]) * 4.5", "a = [1, 2, 3; 4, 5, 6]", "ones(size(a))"],
                    seealso: ["concat", "det", "diag", "identity", "inv", "range", "size", "squeeze", "subset", "trace", "transpose", "zeros"]
                },
                partitionSelect: {
                    name: "partitionSelect",
                    category: "Matrix",
                    syntax: ["partitionSelect(x, k)", "partitionSelect(x, k, compare)"],
                    description: "Partition-based selection of an array or 1D matrix. Will find the kth smallest value, and mutates the input array. Uses Quickselect.",
                    examples: ["partitionSelect([5, 10, 1], 2)", 'partitionSelect(["C", "B", "A", "D"], 1)'],
                    seealso: ["sort"]
                },
                range: {
                    name: "range",
                    category: "Type",
                    syntax: ["start:end", "start:step:end", "range(start, end)", "range(start, end, step)", "range(string)"],
                    description: "Create a range. Lower bound of the range is included, upper bound is excluded.",
                    examples: ["1:5", "3:-1:-3", "range(3, 7)", "range(0, 12, 2)", 'range("4:10")', "a = [1, 2, 3, 4; 5, 6, 7, 8]", "a[1:2, 1:2]"],
                    seealso: ["concat", "det", "diag", "identity", "inv", "ones", "size", "squeeze", "subset", "trace", "transpose", "zeros"]
                },
                resize: {
                    name: "resize",
                    category: "Matrix",
                    syntax: ["resize(x, size)", "resize(x, size, defaultValue)"],
                    description: "Resize a matrix.",
                    examples: ["resize([1,2,3,4,5], [3])", "resize([1,2,3], [5])", "resize([1,2,3], [5], -1)", "resize(2, [2, 3])", 'resize("hello", [8], "!")'],
                    seealso: ["size", "subset", "squeeze", "reshape"]
                },
                reshape: {
                    name: "reshape",
                    category: "Matrix",
                    syntax: ["reshape(x, sizes)"],
                    description: "Reshape a multi dimensional array to fit the specified dimensions.",
                    examples: ["reshape([1, 2, 3, 4, 5, 6], [2, 3])", "reshape([[1, 2], [3, 4]], [1, 4])", "reshape([[1, 2], [3, 4]], [4])"],
                    seealso: ["size", "squeeze", "resize"]
                },
                rotate: {
                    name: "rotate",
                    category: "Matrix",
                    syntax: ["rotate(w, theta)", "rotate(w, theta, v)"],
                    description: "Returns a 2-D rotation matrix (2x2) for a given angle (in radians). Returns a 2-D rotation matrix (3x3) of a given angle (in radians) around given axis.",
                    examples: ["rotate([1, 0], math.pi / 2)", 'rotate(matrix([1, 0]), unit("35deg"))', 'rotate([1, 0, 0], unit("90deg"), [0, 0, 1])', 'rotate(matrix([1, 0, 0]), unit("90deg"), matrix([0, 0, 1]))'],
                    seealso: ["matrix", "rotationMatrix"]
                },
                rotationMatrix: {
                    name: "rotationMatrix",
                    category: "Matrix",
                    syntax: ["rotationMatrix(theta)", "rotationMatrix(theta, v)", "rotationMatrix(theta, v, format)"],
                    description: "Returns a 2-D rotation matrix (2x2) for a given angle (in radians). Returns a 2-D rotation matrix (3x3) of a given angle (in radians) around given axis.",
                    examples: ["rotationMatrix(pi / 2)", 'rotationMatrix(unit("45deg"), [0, 0, 1])', 'rotationMatrix(1, matrix([0, 0, 1]), "sparse")'],
                    seealso: ["cos", "sin"]
                },
                row: {
                    name: "row",
                    category: "Matrix",
                    syntax: ["row(x, index)"],
                    description: "Return a row from a matrix or array.",
                    examples: ["A = [[1, 2], [3, 4]]", "row(A, 1)", "row(A, 2)"],
                    seealso: ["column"]
                },
                size: {
                    name: "size",
                    category: "Matrix",
                    syntax: ["size(x)"],
                    description: "Calculate the size of a matrix.",
                    examples: ["size(2.3)", 'size("hello world")', "a = [1, 2; 3, 4; 5, 6]", "size(a)", "size(1:6)"],
                    seealso: ["concat", "count", "det", "diag", "identity", "inv", "ones", "range", "squeeze", "subset", "trace", "transpose", "zeros"]
                },
                sort: {
                    name: "sort",
                    category: "Matrix",
                    syntax: ["sort(x)", "sort(x, compare)"],
                    description: 'Sort the items in a matrix. Compare can be a string "asc", "desc", "natural", or a custom sort function.',
                    examples: ["sort([5, 10, 1])", 'sort(["C", "B", "A", "D"])', "sortByLength(a, b) = size(a)[1] - size(b)[1]", 'sort(["Langdon", "Tom", "Sara"], sortByLength)', 'sort(["10", "1", "2"], "natural")'],
                    seealso: ["map", "filter", "forEach"]
                },
                squeeze: {
                    name: "squeeze",
                    category: "Matrix",
                    syntax: ["squeeze(x)"],
                    description: "Remove inner and outer singleton dimensions from a matrix.",
                    examples: ["a = zeros(3,2,1)", "size(squeeze(a))", "b = zeros(1,1,3)", "size(squeeze(b))"],
                    seealso: ["concat", "det", "diag", "identity", "inv", "ones", "range", "size", "subset", "trace", "transpose", "zeros"]
                },
                subset: {
                    name: "subset",
                    category: "Matrix",
                    syntax: ["value(index)", "value(index) = replacement", "subset(value, [index])", "subset(value, [index], replacement)"],
                    description: "Get or set a subset of a matrix or string. Indexes are one-based. Both the ranges lower-bound and upper-bound are included.",
                    examples: ["d = [1, 2; 3, 4]", "e = []", "e[1, 1:2] = [5, 6]", "e[2, :] = [7, 8]", "f = d * e", "f[2, 1]", "f[:, 1]"],
                    seealso: ["concat", "det", "diag", "identity", "inv", "ones", "range", "size", "squeeze", "trace", "transpose", "zeros"]
                },
                trace: {
                    name: "trace",
                    category: "Matrix",
                    syntax: ["trace(A)"],
                    description: "Calculate the trace of a matrix: the sum of the elements on the main diagonal of a square matrix.",
                    examples: ["A = [1, 2, 3; -1, 2, 3; 2, 0, 3]", "trace(A)"],
                    seealso: ["concat", "det", "diag", "identity", "inv", "ones", "range", "size", "squeeze", "subset", "transpose", "zeros"]
                },
                transpose: {
                    name: "transpose",
                    category: "Matrix",
                    syntax: ["x'", "transpose(x)"],
                    description: "Transpose a matrix",
                    examples: ["a = [1, 2, 3; 4, 5, 6]", "a'", "transpose(a)"],
                    seealso: ["concat", "det", "diag", "identity", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "zeros"]
                },
                zeros: {
                    name: "zeros",
                    category: "Matrix",
                    syntax: ["zeros(m)", "zeros(m, n)", "zeros(m, n, p, ...)", "zeros([m])", "zeros([m, n])", "zeros([m, n, p, ...])"],
                    description: "Create a matrix containing zeros.",
                    examples: ["zeros(3)", "zeros(3, 5)", "a = [1, 2, 3; 4, 5, 6]", "zeros(size(a))"],
                    seealso: ["concat", "det", "diag", "identity", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "transpose"]
                },
                combinations: {
                    name: "combinations",
                    category: "Probability",
                    syntax: ["combinations(n, k)"],
                    description: "Compute the number of combinations of n items taken k at a time",
                    examples: ["combinations(7, 5)"],
                    seealso: ["combinationsWithRep", "permutations", "factorial"]
                },
                combinationsWithRep: {
                    name: "combinationsWithRep",
                    category: "Probability",
                    syntax: ["combinationsWithRep(n, k)"],
                    description: "Compute the number of combinations of n items taken k at a time with replacements.",
                    examples: ["combinationsWithRep(7, 5)"],
                    seealso: ["combinations", "permutations", "factorial"]
                },
                factorial: {
                    name: "factorial",
                    category: "Probability",
                    syntax: ["n!", "factorial(n)"],
                    description: "Compute the factorial of a value",
                    examples: ["5!", "5 * 4 * 3 * 2 * 1", "3!"],
                    seealso: ["combinations", "combinationsWithRep", "permutations", "gamma"]
                },
                gamma: {
                    name: "gamma",
                    category: "Probability",
                    syntax: ["gamma(n)"],
                    description: "Compute the gamma function. For small values, the Lanczos approximation is used, and for large values the extended Stirling approximation.",
                    examples: ["gamma(4)", "3!", "gamma(1/2)", "sqrt(pi)"],
                    seealso: ["factorial"]
                },
                kldivergence: {
                    name: "kldivergence",
                    category: "Probability",
                    syntax: ["kldivergence(x, y)"],
                    description: "Calculate the Kullback-Leibler (KL) divergence  between two distributions.",
                    examples: ["kldivergence([0.7,0.5,0.4], [0.2,0.9,0.5])"],
                    seealso: []
                },
                multinomial: {
                    name: "multinomial",
                    category: "Probability",
                    syntax: ["multinomial(A)"],
                    description: "Multinomial Coefficients compute the number of ways of picking a1, a2, ..., ai unordered outcomes from `n` possibilities. multinomial takes one array of integers as an argument. The following condition must be enforced: every ai > 0.",
                    examples: ["multinomial([1, 2, 1])"],
                    seealso: ["combinations", "factorial"]
                },
                permutations: {
                    name: "permutations",
                    category: "Probability",
                    syntax: ["permutations(n)", "permutations(n, k)"],
                    description: "Compute the number of permutations of n items taken k at a time",
                    examples: ["permutations(5)", "permutations(5, 3)"],
                    seealso: ["combinations", "combinationsWithRep", "factorial"]
                },
                pickRandom: {
                    name: "pickRandom",
                    category: "Probability",
                    syntax: ["pickRandom(array)", "pickRandom(array, number)", "pickRandom(array, weights)", "pickRandom(array, number, weights)", "pickRandom(array, weights, number)"],
                    description: "Pick a random entry from a given array.",
                    examples: ["pickRandom(0:10)", "pickRandom([1, 3, 1, 6])", "pickRandom([1, 3, 1, 6], 2)", "pickRandom([1, 3, 1, 6], [2, 3, 2, 1])", "pickRandom([1, 3, 1, 6], 2, [2, 3, 2, 1])", "pickRandom([1, 3, 1, 6], [2, 3, 2, 1], 2)"],
                    seealso: ["random", "randomInt"]
                },
                random: {
                    name: "random",
                    category: "Probability",
                    syntax: ["random()", "random(max)", "random(min, max)", "random(size)", "random(size, max)", "random(size, min, max)"],
                    description: "Return a random number.",
                    examples: ["random()", "random(10, 20)", "random([2, 3])"],
                    seealso: ["pickRandom", "randomInt"]
                },
                randomInt: {
                    name: "randomInt",
                    category: "Probability",
                    syntax: ["randomInt(max)", "randomInt(min, max)", "randomInt(size)", "randomInt(size, max)", "randomInt(size, min, max)"],
                    description: "Return a random integer number",
                    examples: ["randomInt(10, 20)", "randomInt([2, 3], 10)"],
                    seealso: ["pickRandom", "random"]
                },
                compare: {
                    name: "compare",
                    category: "Relational",
                    syntax: ["compare(x, y)"],
                    description: "Compare two values. Returns 1 when x > y, -1 when x < y, and 0 when x == y.",
                    examples: ["compare(2, 3)", "compare(3, 2)", "compare(2, 2)", "compare(5cm, 40mm)", "compare(2, [1, 2, 3])"],
                    seealso: ["equal", "unequal", "smaller", "smallerEq", "largerEq", "compareNatural", "compareText"]
                },
                compareNatural: {
                    name: "compareNatural",
                    category: "Relational",
                    syntax: ["compareNatural(x, y)"],
                    description: "Compare two values of any type in a deterministic, natural way. Returns 1 when x > y, -1 when x < y, and 0 when x == y.",
                    examples: ["compareNatural(2, 3)", "compareNatural(3, 2)", "compareNatural(2, 2)", "compareNatural(5cm, 40mm)", 'compareNatural("2", "10")', "compareNatural(2 + 3i, 2 + 4i)", "compareNatural([1, 2, 4], [1, 2, 3])", "compareNatural([1, 5], [1, 2, 3])", "compareNatural([1, 2], [1, 2])", "compareNatural({a: 2}, {a: 4})"],
                    seealso: ["equal", "unequal", "smaller", "smallerEq", "largerEq", "compare", "compareText"]
                },
                compareText: {
                    name: "compareText",
                    category: "Relational",
                    syntax: ["compareText(x, y)"],
                    description: "Compare two strings lexically. Comparison is case sensitive. Returns 1 when x > y, -1 when x < y, and 0 when x == y.",
                    examples: ['compareText("B", "A")', 'compareText("A", "B")', 'compareText("A", "A")', 'compareText("2", "10")', 'compare("2", "10")', "compare(2, 10)", 'compareNatural("2", "10")', 'compareText("B", ["A", "B", "C"])'],
                    seealso: ["compare", "compareNatural"]
                },
                deepEqual: {
                    name: "deepEqual",
                    category: "Relational",
                    syntax: ["deepEqual(x, y)"],
                    description: "Check equality of two matrices element wise. Returns true if the size of both matrices is equal and when and each of the elements are equal.",
                    examples: ["deepEqual([1,3,4], [1,3,4])", "deepEqual([1,3,4], [1,3])"],
                    seealso: ["equal", "unequal", "smaller", "larger", "smallerEq", "largerEq", "compare"]
                },
                equal: {
                    name: "equal",
                    category: "Relational",
                    syntax: ["x == y", "equal(x, y)"],
                    description: "Check equality of two values. Returns true if the values are equal, and false if not.",
                    examples: ["2+2 == 3", "2+2 == 4", "a = 3.2", "b = 6-2.8", "a == b", "50cm == 0.5m"],
                    seealso: ["unequal", "smaller", "larger", "smallerEq", "largerEq", "compare", "deepEqual", "equalText"]
                },
                equalText: {
                    name: "equalText",
                    category: "Relational",
                    syntax: ["equalText(x, y)"],
                    description: "Check equality of two strings. Comparison is case sensitive. Returns true if the values are equal, and false if not.",
                    examples: ['equalText("Hello", "Hello")', 'equalText("a", "A")', 'equal("2e3", "2000")', 'equalText("2e3", "2000")', 'equalText("B", ["A", "B", "C"])'],
                    seealso: ["compare", "compareNatural", "compareText", "equal"]
                },
                larger: {
                    name: "larger",
                    category: "Relational",
                    syntax: ["x > y", "larger(x, y)"],
                    description: "Check if value x is larger than y. Returns true if x is larger than y, and false if not.",
                    examples: ["2 > 3", "5 > 2*2", "a = 3.3", "b = 6-2.8", "(a > b)", "(b < a)", "5 cm > 2 inch"],
                    seealso: ["equal", "unequal", "smaller", "smallerEq", "largerEq", "compare"]
                },
                largerEq: {
                    name: "largerEq",
                    category: "Relational",
                    syntax: ["x >= y", "largerEq(x, y)"],
                    description: "Check if value x is larger or equal to y. Returns true if x is larger or equal to y, and false if not.",
                    examples: ["2 >= 1+1", "2 > 1+1", "a = 3.2", "b = 6-2.8", "(a >= b)"],
                    seealso: ["equal", "unequal", "smallerEq", "smaller", "compare"]
                },
                smaller: {
                    name: "smaller",
                    category: "Relational",
                    syntax: ["x < y", "smaller(x, y)"],
                    description: "Check if value x is smaller than value y. Returns true if x is smaller than y, and false if not.",
                    examples: ["2 < 3", "5 < 2*2", "a = 3.3", "b = 6-2.8", "(a < b)", "5 cm < 2 inch"],
                    seealso: ["equal", "unequal", "larger", "smallerEq", "largerEq", "compare"]
                },
                smallerEq: {
                    name: "smallerEq",
                    category: "Relational",
                    syntax: ["x <= y", "smallerEq(x, y)"],
                    description: "Check if value x is smaller or equal to value y. Returns true if x is smaller than y, and false if not.",
                    examples: ["2 <= 1+1", "2 < 1+1", "a = 3.2", "b = 6-2.8", "(a <= b)"],
                    seealso: ["equal", "unequal", "larger", "smaller", "largerEq", "compare"]
                },
                unequal: {
                    name: "unequal",
                    category: "Relational",
                    syntax: ["x != y", "unequal(x, y)"],
                    description: "Check unequality of two values. Returns true if the values are unequal, and false if they are equal.",
                    examples: ["2+2 != 3", "2+2 != 4", "a = 3.2", "b = 6-2.8", "a != b", "50cm != 0.5m", "5 cm != 2 inch"],
                    seealso: ["equal", "smaller", "larger", "smallerEq", "largerEq", "compare", "deepEqual"]
                },
                setCartesian: {
                    name: "setCartesian",
                    category: "Set",
                    syntax: ["setCartesian(set1, set2)"],
                    description: "Create the cartesian product of two (multi)sets. Multi-dimension arrays will be converted to single-dimension arrays before the operation.",
                    examples: ["setCartesian([1, 2], [3, 4])"],
                    seealso: ["setUnion", "setIntersect", "setDifference", "setPowerset"]
                },
                setDifference: {
                    name: "setDifference",
                    category: "Set",
                    syntax: ["setDifference(set1, set2)"],
                    description: "Create the difference of two (multi)sets: every element of set1, that is not the element of set2. Multi-dimension arrays will be converted to single-dimension arrays before the operation.",
                    examples: ["setDifference([1, 2, 3, 4], [3, 4, 5, 6])", "setDifference([[1, 2], [3, 4]], [[3, 4], [5, 6]])"],
                    seealso: ["setUnion", "setIntersect", "setSymDifference"]
                },
                setDistinct: {
                    name: "setDistinct",
                    category: "Set",
                    syntax: ["setDistinct(set)"],
                    description: "Collect the distinct elements of a multiset. A multi-dimension array will be converted to a single-dimension array before the operation.",
                    examples: ["setDistinct([1, 1, 1, 2, 2, 3])"],
                    seealso: ["setMultiplicity"]
                },
                setIntersect: {
                    name: "setIntersect",
                    category: "Set",
                    syntax: ["setIntersect(set1, set2)"],
                    description: "Create the intersection of two (multi)sets. Multi-dimension arrays will be converted to single-dimension arrays before the operation.",
                    examples: ["setIntersect([1, 2, 3, 4], [3, 4, 5, 6])", "setIntersect([[1, 2], [3, 4]], [[3, 4], [5, 6]])"],
                    seealso: ["setUnion", "setDifference"]
                },
                setIsSubset: {
                    name: "setIsSubset",
                    category: "Set",
                    syntax: ["setIsSubset(set1, set2)"],
                    description: "Check whether a (multi)set is a subset of another (multi)set: every element of set1 is the element of set2. Multi-dimension arrays will be converted to single-dimension arrays before the operation.",
                    examples: ["setIsSubset([1, 2], [3, 4, 5, 6])", "setIsSubset([3, 4], [3, 4, 5, 6])"],
                    seealso: ["setUnion", "setIntersect", "setDifference"]
                },
                setMultiplicity: {
                    name: "setMultiplicity",
                    category: "Set",
                    syntax: ["setMultiplicity(element, set)"],
                    description: "Count the multiplicity of an element in a multiset. A multi-dimension array will be converted to a single-dimension array before the operation.",
                    examples: ["setMultiplicity(1, [1, 2, 2, 4])", "setMultiplicity(2, [1, 2, 2, 4])"],
                    seealso: ["setDistinct", "setSize"]
                },
                setPowerset: {
                    name: "setPowerset",
                    category: "Set",
                    syntax: ["setPowerset(set)"],
                    description: "Create the powerset of a (multi)set: the powerset contains very possible subsets of a (multi)set. A multi-dimension array will be converted to a single-dimension array before the operation.",
                    examples: ["setPowerset([1, 2, 3])"],
                    seealso: ["setCartesian"]
                },
                setSize: {
                    name: "setSize",
                    category: "Set",
                    syntax: ["setSize(set)", "setSize(set, unique)"],
                    description: 'Count the number of elements of a (multi)set. When the second parameter "unique" is true, count only the unique values. A multi-dimension array will be converted to a single-dimension array before the operation.',
                    examples: ["setSize([1, 2, 2, 4])", "setSize([1, 2, 2, 4], true)"],
                    seealso: ["setUnion", "setIntersect", "setDifference"]
                },
                setSymDifference: {
                    name: "setSymDifference",
                    category: "Set",
                    syntax: ["setSymDifference(set1, set2)"],
                    description: "Create the symmetric difference of two (multi)sets. Multi-dimension arrays will be converted to single-dimension arrays before the operation.",
                    examples: ["setSymDifference([1, 2, 3, 4], [3, 4, 5, 6])", "setSymDifference([[1, 2], [3, 4]], [[3, 4], [5, 6]])"],
                    seealso: ["setUnion", "setIntersect", "setDifference"]
                },
                setUnion: {
                    name: "setUnion",
                    category: "Set",
                    syntax: ["setUnion(set1, set2)"],
                    description: "Create the union of two (multi)sets. Multi-dimension arrays will be converted to single-dimension arrays before the operation.",
                    examples: ["setUnion([1, 2, 3, 4], [3, 4, 5, 6])", "setUnion([[1, 2], [3, 4]], [[3, 4], [5, 6]])"],
                    seealso: ["setIntersect", "setDifference"]
                },
                erf: {
                    name: "erf",
                    category: "Special",
                    syntax: ["erf(x)"],
                    description: "Compute the erf function of a value using a rational Chebyshev approximations for different intervals of x",
                    examples: ["erf(0.2)", "erf(-0.5)", "erf(4)"],
                    seealso: []
                },
                mad: {
                    name: "mad",
                    category: "Statistics",
                    syntax: ["mad(a, b, c, ...)", "mad(A)"],
                    description: "Compute the median absolute deviation of a matrix or a list with values. The median absolute deviation is defined as the median of the absolute deviations from the median.",
                    examples: ["mad(10, 20, 30)", "mad([1, 2, 3])"],
                    seealso: ["mean", "median", "std", "abs"]
                },
                max: {
                    name: "max",
                    category: "Statistics",
                    syntax: ["max(a, b, c, ...)", "max(A)", "max(A, dim)"],
                    description: "Compute the maximum value of a list of values.",
                    examples: ["max(2, 3, 4, 1)", "max([2, 3, 4, 1])", "max([2, 5; 4, 3])", "max([2, 5; 4, 3], 1)", "max([2, 5; 4, 3], 2)", "max(2.7, 7.1, -4.5, 2.0, 4.1)", "min(2.7, 7.1, -4.5, 2.0, 4.1)"],
                    seealso: ["mean", "median", "min", "prod", "std", "sum", "variance"]
                },
                mean: {
                    name: "mean",
                    category: "Statistics",
                    syntax: ["mean(a, b, c, ...)", "mean(A)", "mean(A, dim)"],
                    description: "Compute the arithmetic mean of a list of values.",
                    examples: ["mean(2, 3, 4, 1)", "mean([2, 3, 4, 1])", "mean([2, 5; 4, 3])", "mean([2, 5; 4, 3], 1)", "mean([2, 5; 4, 3], 2)", "mean([1.0, 2.7, 3.2, 4.0])"],
                    seealso: ["max", "median", "min", "prod", "std", "sum", "variance"]
                },
                median: {
                    name: "median",
                    category: "Statistics",
                    syntax: ["median(a, b, c, ...)", "median(A)"],
                    description: "Compute the median of all values. The values are sorted and the middle value is returned. In case of an even number of values, the average of the two middle values is returned.",
                    examples: ["median(5, 2, 7)", "median([3, -1, 5, 7])"],
                    seealso: ["max", "mean", "min", "prod", "std", "sum", "variance", "quantileSeq"]
                },
                min: {
                    name: "min",
                    category: "Statistics",
                    syntax: ["min(a, b, c, ...)", "min(A)", "min(A, dim)"],
                    description: "Compute the minimum value of a list of values.",
                    examples: ["min(2, 3, 4, 1)", "min([2, 3, 4, 1])", "min([2, 5; 4, 3])", "min([2, 5; 4, 3], 1)", "min([2, 5; 4, 3], 2)", "min(2.7, 7.1, -4.5, 2.0, 4.1)", "max(2.7, 7.1, -4.5, 2.0, 4.1)"],
                    seealso: ["max", "mean", "median", "prod", "std", "sum", "variance"]
                },
                mode: {
                    name: "mode",
                    category: "Statistics",
                    syntax: ["mode(a, b, c, ...)", "mode(A)", "mode(A, a, b, B, c, ...)"],
                    description: "Computes the mode of all values as an array. In case mode being more than one, multiple values are returned in an array.",
                    examples: ["mode(2, 1, 4, 3, 1)", "mode([1, 2.7, 3.2, 4, 2.7])", "mode(1, 4, 6, 1, 6)"],
                    seealso: ["max", "mean", "min", "median", "prod", "std", "sum", "variance"]
                },
                prod: {
                    name: "prod",
                    category: "Statistics",
                    syntax: ["prod(a, b, c, ...)", "prod(A)"],
                    description: "Compute the product of all values.",
                    examples: ["prod(2, 3, 4)", "prod([2, 3, 4])", "prod([2, 5; 4, 3])"],
                    seealso: ["max", "mean", "min", "median", "min", "std", "sum", "variance"]
                },
                quantileSeq: {
                    name: "quantileSeq",
                    category: "Statistics",
                    syntax: ["quantileSeq(A, prob[, sorted])", "quantileSeq(A, [prob1, prob2, ...][, sorted])", "quantileSeq(A, N[, sorted])"],
                    description: "Compute the prob order quantile of a matrix or a list with values. The sequence is sorted and the middle value is returned. Supported types of sequence values are: Number, BigNumber, Unit Supported types of probablity are: Number, BigNumber. \n\nIn case of a (multi dimensional) array or matrix, the prob order quantile of all elements will be calculated.",
                    examples: ["quantileSeq([3, -1, 5, 7], 0.5)", "quantileSeq([3, -1, 5, 7], [1/3, 2/3])", "quantileSeq([3, -1, 5, 7], 2)", "quantileSeq([-1, 3, 5, 7], 0.5, true)"],
                    seealso: ["mean", "median", "min", "max", "prod", "std", "sum", "variance"]
                },
                std: {
                    name: "std",
                    category: "Statistics",
                    syntax: ["std(a, b, c, ...)", "std(A)", "std(A, normalization)"],
                    description: 'Compute the standard deviation of all values, defined as std(A) = sqrt(variance(A)). Optional parameter normalization can be "unbiased" (default), "uncorrected", or "biased".',
                    examples: ["std(2, 4, 6)", "std([2, 4, 6, 8])", 'std([2, 4, 6, 8], "uncorrected")', 'std([2, 4, 6, 8], "biased")', "std([1, 2, 3; 4, 5, 6])"],
                    seealso: ["max", "mean", "min", "median", "prod", "sum", "variance"]
                },
                sum: {
                    name: "sum",
                    category: "Statistics",
                    syntax: ["sum(a, b, c, ...)", "sum(A)"],
                    description: "Compute the sum of all values.",
                    examples: ["sum(2, 3, 4, 1)", "sum([2, 3, 4, 1])", "sum([2, 5; 4, 3])"],
                    seealso: ["max", "mean", "median", "min", "prod", "std", "sum", "variance"]
                },
                variance: {
                    name: "variance",
                    category: "Statistics",
                    syntax: ["variance(a, b, c, ...)", "variance(A)", "variance(A, normalization)"],
                    description: 'Compute the variance of all values. Optional parameter normalization can be "unbiased" (default), "uncorrected", or "biased".',
                    examples: ["variance(2, 4, 6)", "variance([2, 4, 6, 8])", 'variance([2, 4, 6, 8], "uncorrected")', 'variance([2, 4, 6, 8], "biased")', "variance([1, 2, 3; 4, 5, 6])"],
                    seealso: ["max", "mean", "min", "median", "min", "prod", "std", "sum"]
                },
                acos: {
                    name: "acos",
                    category: "Trigonometry",
                    syntax: ["acos(x)"],
                    description: "Compute the inverse cosine of a value in radians.",
                    examples: ["acos(0.5)", "acos(cos(2.3))"],
                    seealso: ["cos", "atan", "asin"]
                },
                acosh: {
                    name: "acosh",
                    category: "Trigonometry",
                    syntax: ["acosh(x)"],
                    description: "Calculate the hyperbolic arccos of a value, defined as `acosh(x) = ln(sqrt(x^2 - 1) + x)`.",
                    examples: ["acosh(1.5)"],
                    seealso: ["cosh", "asinh", "atanh"]
                },
                acot: {
                    name: "acot",
                    category: "Trigonometry",
                    syntax: ["acot(x)"],
                    description: "Calculate the inverse cotangent of a value.",
                    examples: ["acot(0.5)", "acot(cot(0.5))", "acot(2)"],
                    seealso: ["cot", "atan"]
                },
                acoth: {
                    name: "acoth",
                    category: "Trigonometry",
                    syntax: ["acoth(x)"],
                    description: "Calculate the hyperbolic arccotangent of a value, defined as `acoth(x) = (ln((x+1)/x) + ln(x/(x-1))) / 2`.",
                    examples: ["acoth(2)", "acoth(0.5)"],
                    seealso: ["acsch", "asech"]
                },
                acsc: {
                    name: "acsc",
                    category: "Trigonometry",
                    syntax: ["acsc(x)"],
                    description: "Calculate the inverse cotangent of a value.",
                    examples: ["acsc(2)", "acsc(csc(0.5))", "acsc(0.5)"],
                    seealso: ["csc", "asin", "asec"]
                },
                acsch: {
                    name: "acsch",
                    category: "Trigonometry",
                    syntax: ["acsch(x)"],
                    description: "Calculate the hyperbolic arccosecant of a value, defined as `acsch(x) = ln(1/x + sqrt(1/x^2 + 1))`.",
                    examples: ["acsch(0.5)"],
                    seealso: ["asech", "acoth"]
                },
                asec: {
                    name: "asec",
                    category: "Trigonometry",
                    syntax: ["asec(x)"],
                    description: "Calculate the inverse secant of a value.",
                    examples: ["asec(0.5)", "asec(sec(0.5))", "asec(2)"],
                    seealso: ["acos", "acot", "acsc"]
                },
                asech: {
                    name: "asech",
                    category: "Trigonometry",
                    syntax: ["asech(x)"],
                    description: "Calculate the inverse secant of a value.",
                    examples: ["asech(0.5)"],
                    seealso: ["acsch", "acoth"]
                },
                asin: {
                    name: "asin",
                    category: "Trigonometry",
                    syntax: ["asin(x)"],
                    description: "Compute the inverse sine of a value in radians.",
                    examples: ["asin(0.5)", "asin(sin(0.5))"],
                    seealso: ["sin", "acos", "atan"]
                },
                asinh: {
                    name: "asinh",
                    category: "Trigonometry",
                    syntax: ["asinh(x)"],
                    description: "Calculate the hyperbolic arcsine of a value, defined as `asinh(x) = ln(x + sqrt(x^2 + 1))`.",
                    examples: ["asinh(0.5)"],
                    seealso: ["acosh", "atanh"]
                },
                atan: {
                    name: "atan",
                    category: "Trigonometry",
                    syntax: ["atan(x)"],
                    description: "Compute the inverse tangent of a value in radians.",
                    examples: ["atan(0.5)", "atan(tan(0.5))"],
                    seealso: ["tan", "acos", "asin"]
                },
                atanh: {
                    name: "atanh",
                    category: "Trigonometry",
                    syntax: ["atanh(x)"],
                    description: "Calculate the hyperbolic arctangent of a value, defined as `atanh(x) = ln((1 + x)/(1 - x)) / 2`.",
                    examples: ["atanh(0.5)"],
                    seealso: ["acosh", "asinh"]
                },
                atan2: {
                    name: "atan2",
                    category: "Trigonometry",
                    syntax: ["atan2(y, x)"],
                    description: "Computes the principal value of the arc tangent of y/x in radians.",
                    examples: ["atan2(2, 2) / pi", "angle = 60 deg in rad", "x = cos(angle)", "y = sin(angle)", "atan2(y, x)"],
                    seealso: ["sin", "cos", "tan"]
                },
                cos: {
                    name: "cos",
                    category: "Trigonometry",
                    syntax: ["cos(x)"],
                    description: "Compute the cosine of x in radians.",
                    examples: ["cos(2)", "cos(pi / 4) ^ 2", "cos(180 deg)", "cos(60 deg)", "sin(0.2)^2 + cos(0.2)^2"],
                    seealso: ["acos", "sin", "tan"]
                },
                cosh: {
                    name: "cosh",
                    category: "Trigonometry",
                    syntax: ["cosh(x)"],
                    description: "Compute the hyperbolic cosine of x in radians.",
                    examples: ["cosh(0.5)"],
                    seealso: ["sinh", "tanh", "coth"]
                },
                cot: {
                    name: "cot",
                    category: "Trigonometry",
                    syntax: ["cot(x)"],
                    description: "Compute the cotangent of x in radians. Defined as 1/tan(x)",
                    examples: ["cot(2)", "1 / tan(2)"],
                    seealso: ["sec", "csc", "tan"]
                },
                coth: {
                    name: "coth",
                    category: "Trigonometry",
                    syntax: ["coth(x)"],
                    description: "Compute the hyperbolic cotangent of x in radians.",
                    examples: ["coth(2)", "1 / tanh(2)"],
                    seealso: ["sech", "csch", "tanh"]
                },
                csc: {
                    name: "csc",
                    category: "Trigonometry",
                    syntax: ["csc(x)"],
                    description: "Compute the cosecant of x in radians. Defined as 1/sin(x)",
                    examples: ["csc(2)", "1 / sin(2)"],
                    seealso: ["sec", "cot", "sin"]
                },
                csch: {
                    name: "csch",
                    category: "Trigonometry",
                    syntax: ["csch(x)"],
                    description: "Compute the hyperbolic cosecant of x in radians. Defined as 1/sinh(x)",
                    examples: ["csch(2)", "1 / sinh(2)"],
                    seealso: ["sech", "coth", "sinh"]
                },
                sec: {
                    name: "sec",
                    category: "Trigonometry",
                    syntax: ["sec(x)"],
                    description: "Compute the secant of x in radians. Defined as 1/cos(x)",
                    examples: ["sec(2)", "1 / cos(2)"],
                    seealso: ["cot", "csc", "cos"]
                },
                sech: {
                    name: "sech",
                    category: "Trigonometry",
                    syntax: ["sech(x)"],
                    description: "Compute the hyperbolic secant of x in radians. Defined as 1/cosh(x)",
                    examples: ["sech(2)", "1 / cosh(2)"],
                    seealso: ["coth", "csch", "cosh"]
                },
                sin: {
                    name: "sin",
                    category: "Trigonometry",
                    syntax: ["sin(x)"],
                    description: "Compute the sine of x in radians.",
                    examples: ["sin(2)", "sin(pi / 4) ^ 2", "sin(90 deg)", "sin(30 deg)", "sin(0.2)^2 + cos(0.2)^2"],
                    seealso: ["asin", "cos", "tan"]
                },
                sinh: {
                    name: "sinh",
                    category: "Trigonometry",
                    syntax: ["sinh(x)"],
                    description: "Compute the hyperbolic sine of x in radians.",
                    examples: ["sinh(0.5)"],
                    seealso: ["cosh", "tanh"]
                },
                tan: {
                    name: "tan",
                    category: "Trigonometry",
                    syntax: ["tan(x)"],
                    description: "Compute the tangent of x in radians.",
                    examples: ["tan(0.5)", "sin(0.5) / cos(0.5)", "tan(pi / 4)", "tan(45 deg)"],
                    seealso: ["atan", "sin", "cos"]
                },
                tanh: {
                    name: "tanh",
                    category: "Trigonometry",
                    syntax: ["tanh(x)"],
                    description: "Compute the hyperbolic tangent of x in radians.",
                    examples: ["tanh(0.5)", "sinh(0.5) / cosh(0.5)"],
                    seealso: ["sinh", "cosh"]
                },
                to: {
                    name: "to",
                    category: "Units",
                    syntax: ["x to unit", "to(x, unit)"],
                    description: "Change the unit of a value.",
                    examples: ["5 inch to cm", "3.2kg to g", "16 bytes in bits"],
                    seealso: []
                },
                clone: {
                    name: "clone",
                    category: "Utils",
                    syntax: ["clone(x)"],
                    description: "Clone a variable. Creates a copy of primitive variables,and a deep copy of matrices",
                    examples: ["clone(3.5)", "clone(2 - 4i)", "clone(45 deg)", "clone([1, 2; 3, 4])", 'clone("hello world")'],
                    seealso: []
                },
                format: {
                    name: "format",
                    category: "Utils",
                    syntax: ["format(value)", "format(value, precision)"],
                    description: "Format a value of any type as string.",
                    examples: ["format(2.3)", "format(3 - 4i)", "format([])", "format(pi, 3)"],
                    seealso: ["print"]
                },
                bin: {
                    name: "bin",
                    category: "Utils",
                    syntax: ["bin(value)"],
                    description: "Format a number as binary",
                    examples: ["bin(2)"],
                    seealso: ["oct", "hex"]
                },
                oct: {
                    name: "oct",
                    category: "Utils",
                    syntax: ["oct(value)"],
                    description: "Format a number as octal",
                    examples: ["oct(56)"],
                    seealso: ["bin", "hex"]
                },
                hex: {
                    name: "hex",
                    category: "Utils",
                    syntax: ["hex(value)"],
                    description: "Format a number as hexadecimal",
                    examples: ["hex(240)"],
                    seealso: ["bin", "oct"]
                },
                isNaN: {
                    name: "isNaN",
                    category: "Utils",
                    syntax: ["isNaN(x)"],
                    description: "Test whether a value is NaN (not a number)",
                    examples: ["isNaN(2)", "isNaN(0 / 0)", "isNaN(NaN)", "isNaN(Infinity)"],
                    seealso: ["isNegative", "isNumeric", "isPositive", "isZero"]
                },
                isInteger: {
                    name: "isInteger",
                    category: "Utils",
                    syntax: ["isInteger(x)"],
                    description: "Test whether a value is an integer number.",
                    examples: ["isInteger(2)", "isInteger(3.5)", "isInteger([3, 0.5, -2])"],
                    seealso: ["isNegative", "isNumeric", "isPositive", "isZero"]
                },
                isNegative: {
                    name: "isNegative",
                    category: "Utils",
                    syntax: ["isNegative(x)"],
                    description: "Test whether a value is negative: smaller than zero.",
                    examples: ["isNegative(2)", "isNegative(0)", "isNegative(-4)", "isNegative([3, 0.5, -2])"],
                    seealso: ["isInteger", "isNumeric", "isPositive", "isZero"]
                },
                isNumeric: {
                    name: "isNumeric",
                    category: "Utils",
                    syntax: ["isNumeric(x)"],
                    description: "Test whether a value is a numeric value. Returns true when the input is a number, BigNumber, Fraction, or boolean.",
                    examples: ["isNumeric(2)", 'isNumeric("2")', 'hasNumericValue("2")', "isNumeric(0)", "isNumeric(bignumber(500))", "isNumeric(fraction(0.125))", "isNumeric(2 + 3i)", 'isNumeric([2.3, "foo", false])'],
                    seealso: ["isInteger", "isZero", "isNegative", "isPositive", "isNaN", "hasNumericValue"]
                },
                hasNumericValue: {
                    name: "hasNumericValue",
                    category: "Utils",
                    syntax: ["hasNumericValue(x)"],
                    description: "Test whether a value is an numeric value. In case of a string, true is returned if the string contains a numeric value.",
                    examples: ["hasNumericValue(2)", 'hasNumericValue("2")', 'isNumeric("2")', "hasNumericValue(0)", "hasNumericValue(bignumber(500))", "hasNumericValue(fraction(0.125))", "hasNumericValue(2 + 3i)", 'hasNumericValue([2.3, "foo", false])'],
                    seealso: ["isInteger", "isZero", "isNegative", "isPositive", "isNaN", "isNumeric"]
                },
                isPositive: {
                    name: "isPositive",
                    category: "Utils",
                    syntax: ["isPositive(x)"],
                    description: "Test whether a value is positive: larger than zero.",
                    examples: ["isPositive(2)", "isPositive(0)", "isPositive(-4)", "isPositive([3, 0.5, -2])"],
                    seealso: ["isInteger", "isNumeric", "isNegative", "isZero"]
                },
                isPrime: {
                    name: "isPrime",
                    category: "Utils",
                    syntax: ["isPrime(x)"],
                    description: "Test whether a value is prime: has no divisors other than itself and one.",
                    examples: ["isPrime(3)", "isPrime(-2)", "isPrime([2, 17, 100])"],
                    seealso: ["isInteger", "isNumeric", "isNegative", "isZero"]
                },
                isZero: {
                    name: "isZero",
                    category: "Utils",
                    syntax: ["isZero(x)"],
                    description: "Test whether a value is zero.",
                    examples: ["isZero(2)", "isZero(0)", "isZero(-4)", "isZero([3, 0, -2, 0])"],
                    seealso: ["isInteger", "isNumeric", "isNegative", "isPositive"]
                },
                typeOf: {
                    name: "typeOf",
                    category: "Utils",
                    syntax: ["typeOf(x)"],
                    description: "Get the type of a variable.",
                    examples: ["typeOf(3.5)", "typeOf(2 - 4i)", "typeOf(45 deg)", 'typeOf("hello world")'],
                    seealso: ["getMatrixDataType"]
                },
                numeric: {
                    name: "numeric",
                    category: "Utils",
                    syntax: ["numeric(x)"],
                    description: "Convert a numeric input to a specific numeric type: number, BigNumber, or Fraction.",
                    examples: ['numeric("4")', 'numeric("4", "number")', 'numeric("4", "BigNumber")', 'numeric("4", "Fraction)', 'numeric(4, "Fraction")', 'numeric(fraction(2, 5), "number)'],
                    seealso: ["number", "fraction", "bignumber", "string", "format"]
                }
            }, fu = Ye("help", ["typed", "mathWithTransform", "Help"], function (e) {
                var t = e.typed, i = e.mathWithTransform, a = e.Help;
                return t("help", {
                    any: function (e) {
                        var t, r = e;
                        if ("string" != typeof e) for (t in i) if (We(i, t) && e === i[t]) {
                            r = t;
                            break
                        }
                        var n = yi(cu, r);
                        if (n) return new a(n);
                        n = "function" == typeof r ? r.name : r;
                        throw new Error('No documentation found on "' + n + '"')
                    }
                })
            }), lu = Ye("chain", ["typed", "Chain"], function (e) {
                var t = e.typed, r = e.Chain;
                return t("chain", {
                    "": function () {
                        return new r
                    }, any: function (e) {
                        return new r(e)
                    }
                })
            }), pu = Ye("det", ["typed", "matrix", "subtract", "multiply", "unaryMinus", "lup"], function (e) {
                var t = e.typed, n = e.matrix, f = e.subtract, l = e.multiply, p = e.unaryMinus, m = e.lup;
                return t("det", {
                    any: He, "Array | Matrix": function (e) {
                        var t;
                        switch ((t = E(e) ? e.size() : Array.isArray(e) ? (e = n(e)).size() : []).length) {
                            case 0:
                                return He(e);
                            case 1:
                                if (1 === t[0]) return He(e.valueOf()[0]);
                                throw new RangeError("Matrix must be square (size: " + ge(t) + ")");
                            case 2:
                                var r = t[0];
                                if (r === t[1]) return function (e, t) {
                                    if (1 === t) return He(e[0][0]);
                                    if (2 === t) return f(l(e[0][0], e[1][1]), l(e[1][0], e[0][1]));
                                    for (var r = m(e), n = r.U[0][0], i = 1; i < t; i++) n = l(n, r.U[i][i]);
                                    for (var a = 0, o = 0, s = []; ;) {
                                        for (; s[o];) o++;
                                        if (t <= o) break;
                                        for (var u = o, c = 0; !s[r.p[u]];) s[r.p[u]] = !0, u = r.p[u], c++;
                                        c % 2 == 0 && a++
                                    }
                                    return a % 2 == 0 ? n : p(n)
                                }(e.clone().valueOf(), r);
                                throw new RangeError("Matrix must be square (size: " + ge(t) + ")");
                            default:
                                throw new RangeError("Matrix must be two dimensional (size: " + ge(t) + ")")
                        }
                    }
                })
            }),
            mu = Ye("inv", ["typed", "matrix", "divideScalar", "addScalar", "multiply", "unaryMinus", "det", "identity", "abs"], function (e) {
                var t = e.typed, i = e.matrix, g = e.divideScalar, v = e.addScalar, x = e.multiply, b = e.unaryMinus,
                    w = e.det, N = e.identity, M = e.abs;
                return t("inv", {
                    "Array | Matrix": function (e) {
                        var t = E(e) ? e.size() : Me(e);
                        switch (t.length) {
                            case 1:
                                if (1 === t[0]) return E(e) ? i([g(1, e.valueOf()[0])]) : [g(1, e[0])];
                                throw new RangeError("Matrix must be square (size: " + ge(t) + ")");
                            case 2:
                                var r = t[0], n = t[1];
                                if (r === n) return E(e) ? i(a(e.valueOf(), r, n), e.storage()) : a(e, r, n);
                                throw new RangeError("Matrix must be square (size: " + ge(t) + ")");
                            default:
                                throw new RangeError("Matrix must be two dimensional (size: " + ge(t) + ")")
                        }
                    }, any: function (e) {
                        return g(1, e)
                    }
                });

                function a(e, t, r) {
                    var n, i, a;
                    if (1 === t) {
                        if (0 === (o = e[0][0])) throw Error("Cannot calculate inverse, determinant is zero");
                        return [[g(1, o)]]
                    }
                    if (2 === t) {
                        var o = w(e);
                        if (0 === o) throw Error("Cannot calculate inverse, determinant is zero");
                        return [[g(e[1][1], o), g(b(e[0][1]), o)], [g(b(e[1][0]), o), g(e[0][0], o)]]
                    }
                    var s = e.concat();
                    for (p = 0; p < t; p++) s[p] = s[p].concat();
                    for (var u = N(t).valueOf(), c = 0; c < r; c++) {
                        for (var f = M(s[c][c]), l = c, p = c + 1; p < t;) M(s[p][c]) > f && (f = M(s[p][c]), l = p), p++;
                        if (0 === f) throw Error("Cannot calculate inverse, determinant is zero");
                        (p = l) !== c && (a = s[c], s[c] = s[p], s[p] = a, a = u[c], u[c] = u[p], u[p] = a);
                        var m = s[c], h = u[c];
                        for (p = 0; p < t; p++) {
                            var d = s[p], y = u[p];
                            if (p !== c) {
                                if (0 !== d[c]) {
                                    for (i = g(b(d[c]), m[c]), n = c; n < r; n++) d[n] = v(d[n], x(i, m[n]));
                                    for (n = 0; n < r; n++) y[n] = v(y[n], x(i, h[n]))
                                }
                            } else {
                                for (i = m[c], n = c; n < r; n++) d[n] = g(d[n], i);
                                for (n = 0; n < r; n++) y[n] = g(y[n], i)
                            }
                        }
                    }
                    return u
                }
            }),
            hu = Ye("eigs", ["config", "typed", "matrix", "addScalar", "equal", "subtract", "abs", "atan", "cos", "sin", "multiplyScalar", "inv", "bignumber", "multiply", "add"], function (e) {
                var h = e.config, t = e.typed, r = e.matrix, d = e.addScalar, y = e.subtract, o = e.equal, l = e.abs,
                    p = e.atan, g = e.cos, v = e.sin, x = e.multiplyScalar, m = e.inv, b = e.bignumber, w = e.multiply,
                    N = e.add;
                return t("eigs", {
                    Array: function (e) {
                        var t = r(e), e = t.size();
                        if (2 !== e.length || e[0] !== e[1]) throw new RangeError("Matrix must be square (size: " + ge(e) + ")");
                        e = n(t, e[0]);
                        return {values: e[0], vectors: e[1]}
                    }, Matrix: function (e) {
                        var t = e.size();
                        if (2 !== t.length || t[0] !== t[1]) throw new RangeError("Matrix must be square (size: " + ge(t) + ")");
                        t = n(e, t[0]);
                        return {values: r(t[0]), vectors: r(t[1])}
                    }
                });

                function n(e, t) {
                    var r = e.datatype();
                    if (void 0 === r && (r = e.getDataType()), "number" !== r && "BigNumber" !== r && "Fraction" !== r) throw"mixed" === r ? new TypeError("Mixed matrix element type is not supported") : new TypeError("Matrix element type not supported (" + r + ")");
                    if (function (e, t) {
                        for (var r = 0; r < t; r++) for (var n = r; n < t; n++) if (!o(e[r][n], e[n][r])) throw new TypeError("Input matrix is not symmetric")
                    }(e.toArray(), t), "number" === r) return s(e.toArray());
                    if ("Fraction" !== r) return "BigNumber" === r ? function (e) {
                        for (var t = e.length, r = l(h.epsilon / t), n = new Array(t), i = 0; i < t; i++) n[i] = A(t, 0), n[i][i] = 1;
                        for (var a = S(e); l(a[1]) >= l(r);) {
                            var o, s = a[0][0], u = a[0][1];
                            e = function (e, t, r, n) {
                                for (var i = e.length, a = b(g(t)), o = b(v(t)), s = x(a, a), u = x(o, o), c = A(i, b(0)), f = A(i, b(0)), l = w(b(2), a, o, e[r][n]), t = d(y(x(s, e[r][r]), l), x(u, e[n][n])), s = N(x(u, e[r][r]), l, x(s, e[n][n])), p = 0; p < i; p++) c[p] = y(x(a, e[r][p]), x(o, e[n][p])), f[p] = d(x(o, e[r][p]), x(a, e[n][p]));
                                e[r][r] = t, e[n][n] = s, e[r][n] = b(0), e[n][r] = b(0);
                                for (var m = 0; m < i; m++) m !== r && m !== n && (e[r][m] = c[m], e[m][r] = c[m], e[n][m] = f[m], e[m][n] = f[m]);
                                return e
                            }(e, o = function (e, t, r) {
                                e = y(t, e);
                                return l(e) <= h.epsilon ? b(-1).acos().div(4) : x(.5, p(w(2, r, m(e))))
                            }(e[s][s], e[u][u], e[s][u]), s, u), n = function (e, t, r, n) {
                                for (var i = e.length, a = g(t), o = v(t), s = A(i, b(0)), u = A(i, b(0)), c = 0; c < i; c++) s[c] = y(x(a, e[c][r]), x(o, e[c][n])), u[c] = d(x(o, e[c][r]), x(a, e[c][n]));
                                for (var f = 0; f < i; f++) e[f][r] = s[f], e[f][n] = u[f];
                                return e
                            }(n, o, s, u), a = S(e)
                        }
                        for (var c = A(t, 0), f = 0; f < t; f++) c[f] = e[f][f];
                        return E(He(c), He(n))
                    }(e.toArray()) : void 0;
                    for (var n = e.toArray(), i = 0; i < t; i++) for (var a = i; a < t; a++) n[i][a] = n[i][a].valueOf(), n[a][i] = n[i][a];
                    return s(e.toArray())
                }

                function s(e) {
                    for (var t = e.length, r = Math.abs(h.epsilon / t), n = new Array(t), i = 0; i < t; i++) n[i] = A(t, 0), n[i][i] = 1;
                    for (var a, o, s, u, c = M(e); Math.abs(c[1]) >= Math.abs(r);) {
                        var f = c[0][0], l = c[0][1];
                        e = function (e, t, r, n) {
                            for (var i = e.length, a = Math.cos(t), o = Math.sin(t), s = a * a, u = o * o, c = A(i, 0), f = A(i, 0), t = s * e[r][r] - 2 * a * o * e[r][n] + u * e[n][n], s = u * e[r][r] + 2 * a * o * e[r][n] + s * e[n][n], l = 0; l < i; l++) c[l] = a * e[r][l] - o * e[n][l], f[l] = o * e[r][l] + a * e[n][l];
                            e[r][r] = t, e[n][n] = s, e[r][n] = 0;
                            for (var p = e[n][r] = 0; p < i; p++) p !== r && p !== n && (e[r][p] = c[p], e[p][r] = c[p], e[n][p] = f[p], e[p][n] = f[p]);
                            return e
                        }(e, (a = e[f][f], o = e[l][l], s = e[f][l], u = void 0, u = o - a, a = Math.abs(u) <= h.epsilon ? Math.PI / 4 : .5 * Math.atan(2 * s / (o - a))), f, l), n = function (e, t, r, n) {
                            for (var i = e.length, a = Math.cos(t), o = Math.sin(t), s = A(i, 0), u = A(i, 0), c = 0; c < i; c++) s[c] = a * e[c][r] - o * e[c][n], u[c] = o * e[c][r] + a * e[c][n];
                            for (var f = 0; f < i; f++) e[f][r] = s[f], e[f][n] = u[f];
                            return e
                        }(n, a, f, l), c = M(e)
                    }
                    for (var p = A(t, 0), m = 0; m < t; m++) p[m] = e[m][m];
                    return E(He(p), He(n))
                }

                function M(e) {
                    for (var t = e.length, r = 0, n = [0, 1], i = 0; i < t; i++) for (var a = i + 1; a < t; a++) Math.abs(r) < Math.abs(e[i][a]) && (r = Math.abs(e[i][a]), n = [i, a]);
                    return [n, r]
                }

                function S(e) {
                    for (var t = e.length, r = 0, n = [0, 1], i = 0; i < t; i++) for (var a = i + 1; a < t; a++) l(r) < l(e[i][a]) && (r = l(e[i][a]), n = [i, a]);
                    return [n, r]
                }

                function E(e, t) {
                    for (var r = e.length, n = Array(r), i = Array(r), a = 0; a < r; a++) i[a] = Array(r);
                    for (var o = 0; o < r; o++) {
                        for (var s = 0, u = e[0], c = 0; c < e.length; c++) e[c] < u && (u = e[s = c]);
                        n[o] = e.splice(s, 1)[0];
                        for (var f = 0; f < r; f++) i[f][o] = t[f][s], t[f].splice(s, 1)
                    }
                    return [He(n), He(i)]
                }

                function A(e, t) {
                    for (var r = new Array(e), n = 0; n < e; n++) r[n] = t;
                    return r
                }
            }), du = Ye("expm", ["typed", "abs", "add", "identity", "inv", "multiply"], function (e) {
                var t = e.typed, h = e.abs, d = e.add, y = e.identity, g = e.inv, v = e.multiply;
                return t("expm", {
                    Matrix: function (e) {
                        var t = e.size();
                        if (2 !== t.length || t[0] !== t[1]) throw new RangeError("Matrix must be square (size: " + ge(t) + ")");
                        for (var r = t[0], t = function (e) {
                            for (var t = 0; t < 30; t++) for (var r = 0; r <= t; r++) {
                                var n = t - r;
                                if (function (e, t, r) {
                                    for (var n = 1, i = 2; i <= t; i++) n *= i;
                                    for (var a = n, o = t + 1; o <= 2 * t; o++) a *= o;
                                    var s = a * (2 * t + 1);
                                    return 8 * Math.pow(e / Math.pow(2, r), 2 * t) * n * n / (a * s)
                                }(e, r, n) < 1e-15) return {q: r, j: n}
                            }
                            throw new Error("Could not find acceptable parameters to compute the matrix exponential (try increasing maxSearchSize in expm.js)")
                        }(function (e) {
                            for (var t = e.size()[0], r = 0, n = 0; n < t; n++) {
                                for (var i = 0, a = 0; a < t; a++) i += h(e.get([n, a]));
                                r = Math.max(i, r)
                            }
                            return r
                        }(e)), n = t.q, i = t.j, a = v(e, Math.pow(2, -i)), o = y(r), s = y(r), u = 1, c = a, f = -1, l = 1; l <= n; l++) 1 < l && (c = v(c, a), f = -f), o = d(o, v(u = u * (n - l + 1) / ((2 * n - l + 1) * l), c)), s = d(s, v(u * f, c));
                        for (var p = v(g(s), o), m = 0; m < i; m++) p = v(p, p);
                        return b(e) ? e.createSparseMatrix(p) : p
                    }
                })
            }),
            yu = Ye("sqrtm", ["typed", "abs", "add", "multiply", "sqrt", "subtract", "inv", "size", "max", "identity"], function (e) {
                var t = e.typed, a = e.abs, o = e.add, s = e.multiply, r = e.sqrt, u = e.subtract, c = e.inv,
                    f = e.size, l = e.max, p = e.identity;
                return t("sqrtm", {
                    "Array | Matrix": function (e) {
                        var t = E(e) ? e.size() : Me(e);
                        switch (t.length) {
                            case 1:
                                if (1 === t[0]) return r(e);
                                throw new RangeError("Matrix must be square (size: " + ge(t) + ")");
                            case 2:
                                if (t[0] === t[1]) return function (e) {
                                    var t = 0, r = e, n = p(f(e));
                                    do {
                                        var i = r, r = s(.5, o(i, c(n))), n = s(.5, o(n, c(i)));
                                        if (1e-6 < (i = l(a(u(r, i)))) && 1e3 < ++t) throw new Error("computing square root of matrix: iterative method could not converge")
                                    } while (1e-6 < i);
                                    return r
                                }(e);
                                throw new RangeError("Matrix must be square (size: " + ge(t) + ")");
                            default:
                                throw new RangeError("Matrix must be at most two dimensional (size: " + ge(t) + ")")
                        }
                    }
                })
            }), gu = Ye("divide", ["typed", "matrix", "multiply", "equalScalar", "divideScalar", "inv"], function (e) {
                var t = e.typed, r = e.matrix, n = e.multiply, i = e.equalScalar, a = e.divideScalar, o = e.inv,
                    s = wr({typed: t, equalScalar: i}), u = Nr({typed: t});
                return t("divide", Ge({
                    "Array | Matrix, Array | Matrix": function (e, t) {
                        return n(e, o(t))
                    }, "DenseMatrix, any": function (e, t) {
                        return u(e, t, a, !1)
                    }, "SparseMatrix, any": function (e, t) {
                        return s(e, t, a, !1)
                    }, "Array, any": function (e, t) {
                        return u(r(e), t, a, !1).valueOf()
                    }, "any, Array | Matrix": function (e, t) {
                        return n(e, o(t))
                    }
                }, a.signatures))
            }),
            vu = Ye("distance", ["typed", "addScalar", "subtract", "divideScalar", "multiplyScalar", "unaryMinus", "sqrt", "abs"], function (e) {
                var t = e.typed, c = e.addScalar, f = e.subtract, l = e.multiplyScalar, p = e.divideScalar,
                    i = e.unaryMinus, m = e.sqrt, a = e.abs;
                return t("distance", {
                    "Array, Array, Array": function (e, t, r) {
                        if (2 !== e.length || 2 !== t.length || 2 !== r.length) throw new TypeError("Invalid Arguments: Try again");
                        if (!o(e)) throw new TypeError("Array with 2 numbers or BigNumbers expected for first argument");
                        if (!o(t)) throw new TypeError("Array with 2 numbers or BigNumbers expected for second argument");
                        if (!o(r)) throw new TypeError("Array with 2 numbers or BigNumbers expected for third argument");
                        var n = p(f(r[1], r[0]), f(t[1], t[0])), r = l(l(n, n), t[0]), n = i(l(n, t[0])), t = e[1];
                        return d(e[0], e[1], r, n, t)
                    }, "Object, Object, Object": function (e, t, r) {
                        if (2 !== Object.keys(e).length || 2 !== Object.keys(t).length || 2 !== Object.keys(r).length) throw new TypeError("Invalid Arguments: Try again");
                        if (!o(e)) throw new TypeError("Values of pointX and pointY should be numbers or BigNumbers");
                        if (!o(t)) throw new TypeError("Values of lineOnePtX and lineOnePtY should be numbers or BigNumbers");
                        if (!o(r)) throw new TypeError("Values of lineTwoPtX and lineTwoPtY should be numbers or BigNumbers");
                        if ("pointX" in e && "pointY" in e && "lineOnePtX" in t && "lineOnePtY" in t && "lineTwoPtX" in r && "lineTwoPtY" in r) {
                            var n = p(f(r.lineTwoPtY, r.lineTwoPtX), f(t.lineOnePtY, t.lineOnePtX)),
                                r = l(l(n, n), t.lineOnePtX), n = i(l(n, t.lineOnePtX)), t = e.pointX;
                            return d(e.pointX, e.pointY, r, n, t)
                        }
                        throw new TypeError("Key names do not match")
                    }, "Array, Array": function (e, t) {
                        if (2 === e.length && 3 === t.length) {
                            if (!o(e)) throw new TypeError("Array with 2 numbers or BigNumbers expected for first argument");
                            if (!n(t)) throw new TypeError("Array with 3 numbers or BigNumbers expected for second argument");
                            return d(e[0], e[1], t[0], t[1], t[2])
                        }
                        if (3 === e.length && 6 === t.length) {
                            if (!n(e)) throw new TypeError("Array with 3 numbers or BigNumbers expected for first argument");
                            if (!u(t)) throw new TypeError("Array with 6 numbers or BigNumbers expected for second argument");
                            return y(e[0], e[1], e[2], t[0], t[1], t[2], t[3], t[4], t[5])
                        }
                        if (e.length === t.length && 0 < e.length) {
                            if (!s(e)) throw new TypeError("All values of an array should be numbers or BigNumbers");
                            if (!s(t)) throw new TypeError("All values of an array should be numbers or BigNumbers");
                            return g(e, t)
                        }
                        throw new TypeError("Invalid Arguments: Try again")
                    }, "Object, Object": function (e, t) {
                        if (2 === Object.keys(e).length && 3 === Object.keys(t).length) {
                            if (!o(e)) throw new TypeError("Values of pointX and pointY should be numbers or BigNumbers");
                            if (!n(t)) throw new TypeError("Values of xCoeffLine, yCoeffLine and constant should be numbers or BigNumbers");
                            if ("pointX" in e && "pointY" in e && "xCoeffLine" in t && "yCoeffLine" in t && "constant" in t) return d(e.pointX, e.pointY, t.xCoeffLine, t.yCoeffLine, t.constant);
                            throw new TypeError("Key names do not match")
                        }
                        if (3 === Object.keys(e).length && 6 === Object.keys(t).length) {
                            if (!n(e)) throw new TypeError("Values of pointX, pointY and pointZ should be numbers or BigNumbers");
                            if (!u(t)) throw new TypeError("Values of x0, y0, z0, a, b and c should be numbers or BigNumbers");
                            if ("pointX" in e && "pointY" in e && "x0" in t && "y0" in t && "z0" in t && "a" in t && "b" in t && "c" in t) return y(e.pointX, e.pointY, e.pointZ, t.x0, t.y0, t.z0, t.a, t.b, t.c);
                            throw new TypeError("Key names do not match")
                        }
                        if (2 === Object.keys(e).length && 2 === Object.keys(t).length) {
                            if (!o(e)) throw new TypeError("Values of pointOneX and pointOneY should be numbers or BigNumbers");
                            if (!o(t)) throw new TypeError("Values of pointTwoX and pointTwoY should be numbers or BigNumbers");
                            if ("pointOneX" in e && "pointOneY" in e && "pointTwoX" in t && "pointTwoY" in t) return g([e.pointOneX, e.pointOneY], [t.pointTwoX, t.pointTwoY]);
                            throw new TypeError("Key names do not match")
                        }
                        if (3 !== Object.keys(e).length || 3 !== Object.keys(t).length) throw new TypeError("Invalid Arguments: Try again");
                        if (!n(e)) throw new TypeError("Values of pointOneX, pointOneY and pointOneZ should be numbers or BigNumbers");
                        if (!n(t)) throw new TypeError("Values of pointTwoX, pointTwoY and pointTwoZ should be numbers or BigNumbers");
                        if ("pointOneX" in e && "pointOneY" in e && "pointOneZ" in e && "pointTwoX" in t && "pointTwoY" in t && "pointTwoZ" in t) return g([e.pointOneX, e.pointOneY, e.pointOneZ], [t.pointTwoX, t.pointTwoY, t.pointTwoZ]);
                        throw new TypeError("Key names do not match")
                    }, Array: function (e) {
                        if (!function (e) {
                            if (2 === e[0].length && r(e[0][0]) && r(e[0][1])) {
                                if (e.some(function (e) {
                                    return 2 !== e.length || !r(e[0]) || !r(e[1])
                                })) return
                            } else {
                                if (!(3 === e[0].length && r(e[0][0]) && r(e[0][1]) && r(e[0][2]))) return;
                                if (e.some(function (e) {
                                    return 3 !== e.length || !r(e[0]) || !r(e[1]) || !r(e[2])
                                })) return
                            }
                            return 1
                        }(e)) throw new TypeError("Incorrect array format entered for pairwise distance calculation");
                        return function (e) {
                            for (var t = [], r = [], n = [], i = 0; i < e.length - 1; i++) for (var a = i + 1; a < e.length; a++) 2 === e[0].length ? (r = [e[i][0], e[i][1]], n = [e[a][0], e[a][1]]) : 3 === e[0].length && (r = [e[i][0], e[i][1], e[i][2]], n = [e[a][0], e[a][1], e[a][2]]), t.push(g(r, n));
                            return t
                        }(e)
                    }
                });

                function r(e) {
                    return "number" == typeof e || I(e)
                }

                function o(e) {
                    return e.constructor !== Array && (e = h(e)), r(e[0]) && r(e[1])
                }

                function n(e) {
                    return e.constructor !== Array && (e = h(e)), r(e[0]) && r(e[1]) && r(e[2])
                }

                function s(e) {
                    return Array.isArray(e) || (e = h(e)), e.every(r)
                }

                function u(e) {
                    return e.constructor !== Array && (e = h(e)), r(e[0]) && r(e[1]) && r(e[2]) && r(e[3]) && r(e[4]) && r(e[5])
                }

                function h(e) {
                    for (var t = Object.keys(e), r = [], n = 0; n < t.length; n++) r.push(e[t[n]]);
                    return r
                }

                function d(e, t, r, n, i) {
                    i = a(c(c(l(r, e), l(n, t)), i)), n = m(c(l(r, r), l(n, n)));
                    return p(i, n)
                }

                function y(e, t, r, n, i, a, o, s, u) {
                    t = [f(l(f(i, t), u), l(f(a, r), s)), f(l(f(a, r), o), l(f(n, e), u)), f(l(f(n, e), s), l(f(i, t), o))], t = m(c(c(l(t[0], t[0]), l(t[1], t[1])), l(t[2], t[2]))), u = m(c(c(l(o, o), l(s, s)), l(u, u)));
                    return p(t, u)
                }

                function g(e, t) {
                    for (var r, n = e.length, i = 0, a = 0; a < n; a++) r = f(e[a], t[a]), i = c(l(r, r), i);
                    return m(i)
                }
            }),
            xu = Ye("intersect", ["typed", "config", "abs", "add", "addScalar", "matrix", "multiply", "multiplyScalar", "divideScalar", "subtract", "smaller", "equalScalar"], function (e) {
                var t = e.typed, b = e.config, w = e.abs, N = e.add, M = e.addScalar, i = e.matrix, S = e.multiply,
                    E = e.multiplyScalar, A = e.divideScalar, O = e.subtract, C = e.smaller, _ = e.equalScalar;
                return t("intersect", {
                    "Array, Array, Array": function (e, t, r) {
                        if (!z(e)) throw new TypeError("Array with 3 numbers or BigNumbers expected for first argument");
                        if (!z(t)) throw new TypeError("Array with 3 numbers or BigNumbers expected for second argument");
                        if (!(4 === r.length && m(r[0]) && m(r[1]) && m(r[2]) && m(r[3]))) throw new TypeError("Array with 4 numbers expected as third argument");
                        return n = e[0], i = e[1], a = e[2], o = t[0], s = t[1], u = t[2], c = r[0], f = r[1], l = r[2], p = r[3], e = E(n, c), t = E(o, c), r = E(i, f), c = E(s, f), f = E(a, l), l = E(u, l), f = A(O(O(O(p, e), r), f), O(O(O(M(M(t, c), l), e), r), f)), [M(n, E(f, O(o, n))), M(i, E(f, O(s, i))), M(a, E(f, O(u, a)))];
                        var n, i, a, o, s, u, c, f, l, p
                    }, "Array, Array, Array, Array": function (u, c, f, e) {
                        if (2 === u.length) {
                            if (!T(u)) throw new TypeError("Array with 2 numbers or BigNumbers expected for first argument");
                            if (!T(c)) throw new TypeError("Array with 2 numbers or BigNumbers expected for second argument");
                            if (!T(f)) throw new TypeError("Array with 2 numbers or BigNumbers expected for third argument");
                            if (!T(e)) throw new TypeError("Array with 2 numbers or BigNumbers expected for fourth argument");
                            return function (e) {
                                var t = u, r = f, n = O(t, c), i = O(r, e), a = O(E(n[0], i[1]), E(i[0], n[1]));
                                if (C(w(a), b.epsilon)) return null;
                                var o = E(i[0], t[1]), s = E(i[1], t[0]), e = E(i[0], r[1]), r = E(i[1], r[0]),
                                    a = A(M(O(O(o, s), e), r), a);
                                return N(S(n, a), t)
                            }(e)
                        }
                        if (3 !== u.length) throw new TypeError("Arrays with two or thee dimensional points expected");
                        if (!z(u)) throw new TypeError("Array with 3 numbers or BigNumbers expected for first argument");
                        if (!z(c)) throw new TypeError("Array with 3 numbers or BigNumbers expected for second argument");
                        if (!z(f)) throw new TypeError("Array with 3 numbers or BigNumbers expected for third argument");
                        if (!z(e)) throw new TypeError("Array with 3 numbers or BigNumbers expected for fourth argument");
                        return h = u[0], d = u[1], y = u[2], t = c[0], r = c[1], n = c[2], g = f[0], v = f[1], x = f[2], s = q(h, g, i = e[0], g, d, v, a = e[1], v, y, x, o = e[2], x), l = q(i, g, t, h, a, v, r, d, o, x, n, y), p = q(h, g, t, h, d, v, r, d, y, x, n, y), m = q(i, g, i, g, a, v, a, v, o, x, o, x), e = q(t, h, t, h, r, d, r, d, n, y, n, y), e = A(O(E(s, l), E(p, m)), O(E(e, m), E(l, l))), m = A(M(s, E(e, l)), m), h = M(h, E(e, O(t, h))), d = M(d, E(e, O(r, d))), y = M(y, E(e, O(n, y))), g = M(g, E(m, O(i, g))), v = M(v, E(m, O(a, v))), x = M(x, E(m, O(o, x))), _(h, g) && _(d, v) && _(y, x) ? [h, d, y] : null;
                        var t, r, n, i, a, o, s, l, p, m, h, d, y, g, v, x
                    }, "Matrix, Matrix, Matrix": function (e, t, r) {
                        return i(this(e.valueOf(), t.valueOf(), r.valueOf()))
                    }, "Matrix, Matrix, Matrix, Matrix": function (e, t, r, n) {
                        return i(this(e.valueOf(), t.valueOf(), r.valueOf(), n.valueOf()))
                    }
                });

                function m(e) {
                    return "number" == typeof e || I(e)
                }

                function T(e) {
                    return 2 === e.length && m(e[0]) && m(e[1])
                }

                function z(e) {
                    return 3 === e.length && m(e[0]) && m(e[1]) && m(e[2])
                }

                function q(e, t, r, n, i, a, o, s, u, c, f, l) {
                    n = E(O(e, t), O(r, n)), s = E(O(i, a), O(o, s)), l = E(O(u, c), O(f, l));
                    return M(M(n, s), l)
                }
            }), bu = Ye("sum", ["typed", "config", "add", "numeric"], function (e) {
                var t = e.typed, n = e.config, i = e.add, a = e.numeric;
                return t("sum", {
                    "Array | Matrix": r, "Array | Matrix, number | BigNumber": function (e, t) {
                        try {
                            return bt(e, t, i)
                        } catch (e) {
                            throw Pi(e, "sum")
                        }
                    }, "...": function (e) {
                        if (gt(e)) throw new TypeError("Scalar values expected in function sum");
                        return r(e)
                    }
                });

                function r(e) {
                    var r;
                    return vt(e, function (t) {
                        try {
                            r = void 0 === r ? t : i(r, t)
                        } catch (e) {
                            throw Pi(e, "sum", t)
                        }
                    }), void 0 === r && (r = a(0, n.number)), "string" == typeof r && (r = a(r, n.number)), r
                }
            }), wu = Ye("mean", ["typed", "add", "divide"], function (e) {
                var t = e.typed, i = e.add, a = e.divide;
                return t("mean", {
                    "Array | Matrix": r, "Array | Matrix, number | BigNumber": function (e, t) {
                        try {
                            var r = bt(e, t, i), n = Array.isArray(e) ? Me(e) : e.size();
                            return a(r, n[t])
                        } catch (e) {
                            throw Pi(e, "mean")
                        }
                    }, "...": function (e) {
                        if (gt(e)) throw new TypeError("Scalar values expected in function mean");
                        return r(e)
                    }
                });

                function r(e) {
                    var r, n = 0;
                    if (vt(e, function (t) {
                        try {
                            r = void 0 === r ? t : i(r, t), n++
                        } catch (e) {
                            throw Pi(e, "mean", t)
                        }
                    }), 0 === n) throw new Error("Cannot calculate the mean of an empty array");
                    return a(r, n)
                }
            }), Nu = Ye("median", ["typed", "add", "divide", "compare", "partitionSelect"], function (e) {
                var t = e.typed, r = e.add, n = e.divide, o = e.compare, s = e.partitionSelect;

                function i(e) {
                    try {
                        var t = (e = qe(e.valueOf())).length;
                        if (0 === t) throw new Error("Cannot calculate median of an empty array");
                        if (t % 2 == 0) {
                            for (var r = t / 2 - 1, n = s(e, 1 + r), i = e[r], a = 0; a < r; ++a) 0 < o(e[a], i) && (i = e[a]);
                            return c(i, n)
                        }
                        t = s(e, (t - 1) / 2);
                        return u(t)
                    } catch (e) {
                        throw Pi(e, "median")
                    }
                }

                var u = t({
                    "number | BigNumber | Complex | Unit": function (e) {
                        return e
                    }
                }), c = t({
                    "number | BigNumber | Complex | Unit, number | BigNumber | Complex | Unit": function (e, t) {
                        return n(r(e, t), 2)
                    }
                });
                return t("median", {
                    "Array | Matrix": i, "Array | Matrix, number | BigNumber": function (e, t) {
                        throw new Error("median(A, dim) is not yet supported")
                    }, "...": function (e) {
                        if (gt(e)) throw new TypeError("Scalar values expected in function median");
                        return i(e)
                    }
                })
            }), Mu = Ye("mad", ["typed", "abs", "map", "median", "subtract"], function (e) {
                var t = e.typed, r = e.abs, n = e.map, i = e.median, a = e.subtract;
                return t("mad", {"Array | Matrix": o, "...": o});

                function o(e) {
                    if (0 === (e = qe(e.valueOf())).length) throw new Error("Cannot calculate median absolute deviation (mad) of an empty array");
                    try {
                        var t = i(e);
                        return i(n(e, function (e) {
                            return r(a(e, t))
                        }))
                    } catch (e) {
                        throw e instanceof TypeError && -1 !== e.message.indexOf("median") ? new TypeError(e.message.replace("median", "mad")) : Pi(e, "mad")
                    }
                }
            }), Su = Ye("variance", ["typed", "add", "subtract", "multiply", "divide", "apply", "isNaN"], function (e) {
                var t = e.typed, a = e.add, o = e.subtract, s = e.multiply, u = e.divide, n = e.apply, c = e.isNaN;
                return t("variance", {
                    "Array | Matrix": function (e) {
                        return i(e, "unbiased")
                    }, "Array | Matrix, string": i, "Array | Matrix, number | BigNumber": function (e, t) {
                        return r(e, t, "unbiased")
                    }, "Array | Matrix, number | BigNumber, string": r, "...": function (e) {
                        return i(e, "unbiased")
                    }
                });

                function i(e, t) {
                    var r = 0;
                    if (0 === e.length) throw new SyntaxError("Function variance requires one or more parameters (0 provided)");
                    if (vt(e, function (t) {
                        try {
                            i = void 0 === i ? t : a(i, t), r++
                        } catch (e) {
                            throw Pi(e, "variance", t)
                        }
                    }), 0 === r) throw new Error("Cannot calculate variance of an empty array");
                    var n = u(i, r), i = void 0;
                    if (vt(e, function (e) {
                        e = o(e, n);
                        i = void 0 === i ? s(e, e) : a(i, s(e, e))
                    }), c(i)) return i;
                    switch (t) {
                        case"uncorrected":
                            return u(i, r);
                        case"biased":
                            return u(i, r + 1);
                        case"unbiased":
                            e = I(i) ? i.mul(0) : 0;
                            return 1 === r ? e : u(i, r - 1);
                        default:
                            throw new Error('Unknown normalization "' + t + '". Choose "unbiased" (default), "uncorrected", or "biased".')
                    }
                }

                function r(e, t, r) {
                    try {
                        if (0 === e.length) throw new SyntaxError("Function variance requires one or more parameters (0 provided)");
                        return n(e, t, function (e) {
                            return i(e, r)
                        })
                    } catch (e) {
                        throw Pi(e, "variance")
                    }
                }
            }), Eu = Ye("quantileSeq", ["typed", "add", "multiply", "partitionSelect", "compare"], function (e) {
                var t = e.typed, y = e.add, g = e.multiply, v = e.partitionSelect, x = e.compare;

                function h(e, t, r) {
                    var n = qe(e), i = n.length;
                    if (0 === i) throw new Error("Cannot calculate quantile of an empty sequence");
                    if (M(t)) {
                        var a = t * (i - 1), o = a % 1;
                        if (0 == o) {
                            e = r ? n[a] : v(n, a);
                            return b(e), e
                        }
                        var s, u, c = Math.floor(a);
                        if (r) s = n[c], u = n[c + 1]; else {
                            u = v(n, c + 1), s = n[c];
                            for (var f = 0; f < c; ++f) 0 < x(n[f], s) && (s = n[f])
                        }
                        return b(s), b(u), y(g(s, 1 - o), g(u, o))
                    }
                    i = t.times(i - 1);
                    if (i.isInteger()) {
                        i = i.toNumber();
                        var l = r ? n[i] : v(n, i);
                        return b(l), l
                    }
                    var p, m, l = i.floor(), i = i.minus(l), h = l.toNumber();
                    if (r) p = n[h], m = n[h + 1]; else {
                        m = v(n, h + 1), p = n[h];
                        for (var d = 0; d < h; ++d) 0 < x(n[d], p) && (p = n[d])
                    }
                    b(p), b(m);
                    r = new i.constructor(1);
                    return y(g(p, r.minus(i)), g(m, i))
                }

                var b = t({
                    "number | BigNumber | Unit": function (e) {
                        return e
                    }
                });
                return function (e, t, r) {
                    var n, i;
                    if (arguments.length < 2 || 3 < arguments.length) throw new SyntaxError("Function quantileSeq requires two or three parameters");
                    if (d(e)) {
                        if ("boolean" != typeof (r = r || !1)) throw new TypeError("Unexpected type of argument in function quantileSeq");
                        if (n = e.valueOf(), M(t)) {
                            if (t < 0) throw new Error("N/prob must be non-negative");
                            if (t <= 1) return h(n, t, r);
                            if (1 < t) {
                                if (!L(t)) throw new Error("N must be a positive integer");
                                for (var a = t + 1, o = new Array(t), s = 0; s < t;) o[s] = h(n, ++s / a, r);
                                return o
                            }
                        }
                        if (I(t)) {
                            var u = t.constructor;
                            if (t.isNegative()) throw new Error("N/prob must be non-negative");
                            if (i = new u(1), t.lte(i)) return new u(h(n, t, r));
                            if (t.gt(i)) {
                                if (!t.isInteger()) throw new Error("N must be a positive integer");
                                var c = t.toNumber();
                                if (4294967295 < c) throw new Error("N must be less than or equal to 2^32-1, as that is the maximum length of an Array");
                                var f = new u(c + 1);
                                o = new Array(c);
                                for (var l = 0; l < c;) o[l] = new u(h(n, new u(++l).div(f), r));
                                return o
                            }
                        }
                        if (Array.isArray(t)) {
                            o = new Array(t.length);
                            for (var p = 0; p < o.length; ++p) {
                                var m = t[p];
                                if (M(m)) {
                                    if (m < 0 || 1 < m) throw new Error("Probability must be between 0 and 1, inclusive")
                                } else {
                                    if (!I(m)) throw new TypeError("Unexpected type of argument in function quantileSeq");
                                    if (i = new m.constructor(1), m.isNegative() || m.gt(i)) throw new Error("Probability must be between 0 and 1, inclusive")
                                }
                                o[p] = h(n, m, r)
                            }
                            return o
                        }
                        throw new TypeError("Unexpected type of argument in function quantileSeq")
                    }
                    throw new TypeError("Unexpected type of argument in function quantileSeq")
                }
            }), Au = Ye("std", ["typed", "sqrt", "variance"], function (e) {
                var t = e.typed, r = e.sqrt, n = e.variance;
                return t("std", {
                    "Array | Matrix": i,
                    "Array | Matrix, string": i,
                    "Array | Matrix, number | BigNumber": i,
                    "Array | Matrix, number | BigNumber, string": i,
                    "...": function (e) {
                        return i(e)
                    }
                });

                function i(e, t) {
                    if (0 === e.length) throw new SyntaxError("Function std requires one or more parameters (0 provided)");
                    try {
                        return r(n.apply(null, arguments))
                    } catch (e) {
                        throw e instanceof TypeError && -1 !== e.message.indexOf(" variance") ? new TypeError(e.message.replace(" variance", " std")) : e
                    }
                }
            });

        function Ou(e, t) {
            if (t < e) return 1;
            if (t === e) return t;
            var r = t + e >> 1;
            return Ou(e, r) * Ou(1 + r, t)
        }

        function Cu(e, t) {
            if (!L(e) || e < 0) throw new TypeError("Positive integer value expected in function combinations");
            if (!L(t) || t < 0) throw new TypeError("Positive integer value expected in function combinations");
            if (e < t) throw new TypeError("k must be less than or equal to n");
            var r = e - t;
            return t < r ? Ou(1 + r, e) / Ou(1, t) : Ou(t + 1, e) / Ou(1, r)
        }

        Cu.signature = "number, number";
        var _u = Ye("combinations", ["typed"], function (e) {
            return (0, e.typed)("combinations", {
                "number, number": Cu, "BigNumber, BigNumber": function (e, t) {
                    var r, n, i = e.constructor, a = e.minus(t), o = new i(1);
                    if (!Tu(e) || !Tu(t)) throw new TypeError("Positive integer value expected in function combinations");
                    if (t.gt(e)) throw new TypeError("k must be less than n in function combinations");
                    if (r = o, t.lt(a)) for (n = o; n.lte(a); n = n.plus(o)) r = r.times(t.plus(n)).dividedBy(n); else for (n = o; n.lte(t); n = n.plus(o)) r = r.times(a.plus(n)).dividedBy(n);
                    return r
                }
            })
        });

        function Tu(e) {
            return e.isInteger() && e.gte(0)
        }

        var zu = Ye("combinationsWithRep", ["typed"], function (e) {
            return (0, e.typed)("combinationsWithRep", {
                "number, number": function (e, t) {
                    if (!L(e) || e < 0) throw new TypeError("Positive integer value expected in function combinationsWithRep");
                    if (!L(t) || t < 0) throw new TypeError("Positive integer value expected in function combinationsWithRep");
                    if (e < 1) throw new TypeError("k must be less than or equal to n + k - 1");
                    return t < e - 1 ? Ou(e, e + t - 1) / Ou(1, t) : Ou(t + 1, e + t - 1) / Ou(1, e - 1)
                }, "BigNumber, BigNumber": function (e, t) {
                    var r, n, i = new e.constructor(1), a = e.minus(i);
                    if (!qu(e) || !qu(t)) throw new TypeError("Positive integer value expected in function combinationsWithRep");
                    if (e.lt(i)) throw new TypeError("k must be less than or equal to n + k - 1 in function combinationsWithRep");
                    if (r = i, t.lt(a)) for (n = i; n.lte(a); n = n.plus(i)) r = r.times(t.plus(n)).dividedBy(n); else for (n = i; n.lte(t); n = n.plus(i)) r = r.times(a.plus(n)).dividedBy(n);
                    return r
                }
            })
        });

        function qu(e) {
            return e.isInteger() && e.gte(0)
        }

        function Iu(e) {
            var t;
            if (L(e)) return e <= 0 ? isFinite(e) ? 1 / 0 : NaN : 171 < e ? 1 / 0 : Ou(1, e - 1);
            if (e < .5) return Math.PI / (Math.sin(Math.PI * e) * Iu(1 - e));
            if (171.35 <= e) return 1 / 0;
            if (85 < e) {
                var r = e * e, n = r * e, i = n * e, a = i * e;
                return Math.sqrt(2 * Math.PI / e) * Math.pow(e / Math.E, e) * (1 + 1 / (12 * e) + 1 / (288 * r) - 139 / (51840 * n) - 571 / (2488320 * i) + 163879 / (209018880 * a) + 5246819 / (75246796800 * a * e))
            }
            --e, t = ku[0];
            for (var o = 1; o < ku.length; ++o) t += ku[o] / (e + o);
            a = e + Bu + .5;
            return Math.sqrt(2 * Math.PI) * Math.pow(a, e + .5) * Math.exp(-a) * t
        }

        Iu.signature = "number";
        var Bu = 4.7421875,
            ku = [.9999999999999971, 57.15623566586292, -59.59796035547549, 14.136097974741746, -.4919138160976202, 3399464998481189e-20, 4652362892704858e-20, -9837447530487956e-20, .0001580887032249125, -.00021026444172410488, .00021743961811521265, -.0001643181065367639, 8441822398385275e-20, -26190838401581408e-21, 36899182659531625e-22],
            Du = Ye("gamma", ["typed", "config", "multiplyScalar", "pow", "BigNumber", "Complex"], function (e) {
                var t = e.typed, o = e.config, u = e.multiplyScalar, c = e.pow, s = e.BigNumber, f = e.Complex;
                return t("gamma", {
                    number: Iu, Complex: function (e) {
                        if (0 === e.im) return this(e.re);
                        e = new f(e.re - 1, e.im);
                        for (var t = new f(ku[0], 0), r = 1; r < ku.length; ++r) {
                            var n = e.re + r, i = n * n + e.im * e.im;
                            0 != i ? (t.re += ku[r] * n / i, t.im += -ku[r] * e.im / i) : t.re = ku[r] < 0 ? -1 / 0 : 1 / 0
                        }
                        var a = new f(e.re + Bu + .5, e.im), o = Math.sqrt(2 * Math.PI);
                        e.re += .5;
                        var s = c(a, e);
                        0 === s.im ? s.re *= o : (0 === s.re || (s.re *= o), s.im *= o);
                        o = Math.exp(-a.re);
                        return a.re = o * Math.cos(-a.im), a.im = o * Math.sin(-a.im), u(u(s, a), t)
                    }, BigNumber: function (e) {
                        if (e.isInteger()) return e.isNegative() || e.isZero() ? new s(1 / 0) : function e(t) {
                            if (t < 8) return new s([1, 1, 2, 6, 24, 120, 720, 5040][t]);
                            var r = o.precision + (0 | Math.log(t.toNumber())), r = s.clone({precision: r});
                            if (t % 2 == 1) return t.times(e(new s(t - 1)));
                            for (var n = t, i = new r(t), a = t.toNumber(); 2 < n;) a += n -= 2, i = i.times(a);
                            return new s(i.toPrecision(s.precision))
                        }(e.minus(1));
                        if (!e.isFinite()) return new s(e.isNegative() ? NaN : 1 / 0);
                        throw new Error("Integer BigNumber expected")
                    }, "Array | Matrix": function (e) {
                        return xt(e, this)
                    }
                })
            }), Ru = Ye("factorial", ["typed", "gamma"], function (e) {
                var t = e.typed, r = e.gamma;
                return t("factorial", {
                    number: function (e) {
                        if (e < 0) throw new Error("Value must be non-negative");
                        return r(e + 1)
                    }, BigNumber: function (e) {
                        if (e.isNegative()) throw new Error("Value must be non-negative");
                        return r(e.plus(1))
                    }, "Array | Matrix": function (e) {
                        return xt(e, this)
                    }
                })
            }),
            Pu = Ye("kldivergence", ["typed", "matrix", "divide", "sum", "multiply", "dotDivide", "log", "isNumeric"], function (e) {
                var t = e.typed, r = e.matrix, i = e.divide, a = e.sum, o = e.multiply, s = e.dotDivide, u = e.log,
                    c = e.isNumeric;
                return t("kldivergence", {
                    "Array, Array": function (e, t) {
                        return n(r(e), r(t))
                    }, "Matrix, Array": function (e, t) {
                        return n(e, r(t))
                    }, "Array, Matrix": function (e, t) {
                        return n(r(e), t)
                    }, "Matrix, Matrix": n
                });

                function n(e, t) {
                    var r = t.size().length, n = e.size().length;
                    if (1 < r) throw new Error("first object must be one dimensional");
                    if (1 < n) throw new Error("second object must be one dimensional");
                    if (r !== n) throw new Error("Length of two vectors must be equal");
                    if (0 === a(e)) throw new Error("Sum of elements in first object must be non zero");
                    if (0 === a(t)) throw new Error("Sum of elements in second object must be non zero");
                    e = i(e, a(e)), t = i(t, a(t)), t = a(o(e, u(s(e, t))));
                    return c(t) ? t : Number.NaN
                }
            }),
            ju = Ye("multinomial", ["typed", "add", "divide", "multiply", "factorial", "isInteger", "isPositive"], function (e) {
                var t = e.typed, n = e.add, i = e.divide, a = e.multiply, o = e.factorial, s = e.isInteger,
                    u = e.isPositive;
                return t("multinomial", {
                    "Array | Matrix": function (e) {
                        var t = 0, r = 1;
                        return vt(e, function (e) {
                            if (!s(e) || !u(e)) throw new TypeError("Positive integer value expected in function multinomial");
                            t = n(t, e), r = a(r, o(e))
                        }), i(o(t), r)
                    }
                })
            }), Uu = Ye("permutations", ["typed", "factorial"], function (e) {
                return (0, e.typed)("permutations", {
                    "number | BigNumber": e.factorial, "number, number": function (e, t) {
                        if (!L(e) || e < 0) throw new TypeError("Positive integer value expected in function permutations");
                        if (!L(t) || t < 0) throw new TypeError("Positive integer value expected in function permutations");
                        if (e < t) throw new TypeError("second argument k must be less than or equal to first argument n");
                        return Ou(e - t + 1, e)
                    }, "BigNumber, BigNumber": function (e, t) {
                        var r, n;
                        if (!Fu(e) || !Fu(t)) throw new TypeError("Positive integer value expected in function permutations");
                        if (t.gt(e)) throw new TypeError("second argument k must be less than or equal to first argument n");
                        for (r = e.mul(0).add(1), n = e.minus(t).plus(1); n.lte(e); n = n.plus(1)) r = r.times(n);
                        return r
                    }
                })
            });

        function Fu(e) {
            return e.isInteger() && e.gte(0)
        }

        var a = r(9), Lu = r.n(a), Hu = Lu()(Date.now());

        function $u(e) {
            var t = null === (e = e) ? Hu : Lu()(String(e));
            return function () {
                return t()
            }
        }

        var Gu = Ye("pickRandom", ["typed", "config", "?on"], function (e) {
            var t = e.typed, r = e.config, e = e.on, d = $u(r.randomSeed);
            return e && e("config", function (e, t) {
                e.randomSeed !== t.randomSeed && (d = $u(e.randomSeed))
            }), t({
                "Array | Matrix": function (e) {
                    return n(e, {})
                }, "Array | Matrix, Object": n, "Array | Matrix, number": function (e, t) {
                    return n(e, {number: t})
                }, "Array | Matrix, Array | Matrix": function (e, t) {
                    return n(e, {weights: t})
                }, "Array | Matrix, Array | Matrix, number": function (e, t, r) {
                    return n(e, {number: r, weights: t})
                }, "Array | Matrix, number, Array | Matrix": function (e, t, r) {
                    return n(e, {number: t, weights: r})
                }
            });

            function n(e, t) {
                var r = t.number, n = t.weights, i = t.elementWise, a = void 0 === i || i, t = void 0 === r;
                t && (r = 1);
                i = E(e) ? e.create : E(n) ? n.create : null;
                e = e.valueOf(), n = n && n.valueOf(), !0 === a && (e = qe(e), n = qe(n));
                var o = 0;
                if (void 0 !== n) {
                    if (n.length !== e.length) throw new Error("Weights must have the same length as possibles");
                    for (var s = 0, u = n.length; s < u; s++) {
                        if (!M(n[s]) || n[s] < 0) throw new Error("Weights must be an array of positive numbers");
                        o += n[s]
                    }
                }
                for (var c, f = e.length, l = []; l.length < r;) {
                    if (void 0 === n) c = e[Math.floor(d() * f)]; else for (var p = d() * o, m = 0, h = e.length; m < h; m++) if ((p -= n[m]) < 0) {
                        c = e[m];
                        break
                    }
                    l.push(c)
                }
                return t ? l[0] : i ? i(l) : l
            }
        });

        function Vu(e, t) {
            var r = [];
            if (1 < (e = e.slice(0)).length) for (var n = 0, i = e.shift(); n < i; n++) r.push(Vu(e, t)); else for (var a = 0, o = e.shift(); a < o; a++) r.push(t());
            return r
        }

        var Zu = Ye("random", ["typed", "config", "?on"], function (e) {
                var t = e.typed, r = e.config, e = e.on, n = $u(r.randomSeed);
                return e && e("config", function (e, t) {
                    e.randomSeed !== t.randomSeed && (n = $u(e.randomSeed))
                }), t("random", {
                    "": function () {
                        return a(0, 1)
                    }, number: function (e) {
                        return a(0, e)
                    }, "number, number": a, "Array | Matrix": function (e) {
                        return i(e, 0, 1)
                    }, "Array | Matrix, number": function (e, t) {
                        return i(e, 0, t)
                    }, "Array | Matrix, number, number": i
                });

                function i(e, t, r) {
                    var n = Vu(e.valueOf(), function () {
                        return a(t, r)
                    });
                    return E(e) ? e.create(n) : n
                }

                function a(e, t) {
                    return e + n() * (t - e)
                }
            }), Wu = Ye("randomInt", ["typed", "config", "?on"], function (e) {
                var t = e.typed, r = e.config, e = e.on, n = $u(r.randomSeed);
                return e && e("config", function (e, t) {
                    e.randomSeed !== t.randomSeed && (n = $u(e.randomSeed))
                }), t("randomInt", {
                    "": function () {
                        return a(0, 1)
                    }, number: function (e) {
                        return a(0, e)
                    }, "number, number": a, "Array | Matrix": function (e) {
                        return i(e, 0, 1)
                    }, "Array | Matrix, number": function (e, t) {
                        return i(e, 0, t)
                    }, "Array | Matrix, number, number": i
                });

                function i(e, t, r) {
                    var n = Vu(e.valueOf(), function () {
                        return a(t, r)
                    });
                    return E(e) ? e.create(n) : n
                }

                function a(e, t) {
                    return Math.floor(e + n() * (t - e))
                }
            }),
            Ju = Ye("stirlingS2", ["typed", "addScalar", "subtract", "multiplyScalar", "divideScalar", "pow", "factorial", "combinations", "isNegative", "isInteger", "larger"], function (e) {
                var t = e.typed, u = e.addScalar, c = e.subtract, f = e.multiplyScalar, l = e.divideScalar, p = e.pow,
                    m = e.factorial, h = e.combinations, d = e.isNegative, y = e.isInteger, g = e.larger;
                return t("stirlingS2", {
                    "number | BigNumber, number | BigNumber": function (e, t) {
                        if (!y(e) || d(e) || !y(t) || d(t)) throw new TypeError("Non-negative integer value expected in function stirlingS2");
                        if (g(t, e)) throw new TypeError("k must be less than or equal to n in function stirlingS2");
                        for (var r = m(t), n = 0, i = 0; i <= t; i++) var a = p(-1, c(t, i)), o = h(t, i), s = p(i, e), n = u(n, f(f(o, s), a));
                        return l(n, r)
                    }
                })
            }), Yu = Ye("bellNumbers", ["typed", "addScalar", "isNegative", "isInteger", "stirlingS2"], function (e) {
                var t = e.typed, n = e.addScalar, i = e.isNegative, a = e.isInteger, o = e.stirlingS2;
                return t("bellNumbers", {
                    "number | BigNumber": function (e) {
                        if (!a(e) || i(e)) throw new TypeError("Non-negative integer value expected in function bellNumbers");
                        for (var t = 0, r = 0; r <= e; r++) t = n(t, o(e, r));
                        return t
                    }
                })
            }),
            Xu = Ye("catalan", ["typed", "addScalar", "divideScalar", "multiplyScalar", "combinations", "isNegative", "isInteger"], function (e) {
                var t = e.typed, r = e.addScalar, n = e.divideScalar, i = e.multiplyScalar, a = e.combinations,
                    o = e.isNegative, s = e.isInteger;
                return t("catalan", {
                    "number | BigNumber": function (e) {
                        if (!s(e) || o(e)) throw new TypeError("Non-negative integer value expected in function catalan");
                        return n(a(i(e, 2), e), r(e, 1))
                    }
                })
            }),
            Qu = Ye("composition", ["typed", "addScalar", "combinations", "isNegative", "isPositive", "isInteger", "larger"], function (e) {
                var t = e.typed, r = e.addScalar, n = e.combinations, i = e.isPositive, a = (e.isNegative, e.isInteger),
                    o = e.larger;
                return t("composition", {
                    "number | BigNumber, number | BigNumber": function (e, t) {
                        if (!(a(e) && i(e) && a(t) && i(t))) throw new TypeError("Positive integer value expected in function composition");
                        if (o(t, e)) throw new TypeError("k must be less than or equal to n in function composition");
                        return n(r(e, -1), r(t, -1))
                    }
                })
            }), Ku = Ye("simplifyUtil", ["FunctionNode", "OperatorNode", "SymbolNode"], function (e) {
                var r = e.FunctionNode, n = e.OperatorNode, i = e.SymbolNode, a = {add: !0, multiply: !0},
                    o = {add: !0, multiply: !0};

                function s(e, t) {
                    if (!le(e)) return !1;
                    e = e.fn.toString();
                    return t && We(t, e) && We(t[e], "associative") ? t[e].associative : o[e] || !1
                }

                function u(e) {
                    var i, a = [];
                    return s(e) ? (i = e.op, function e(t) {
                        for (var r = 0; r < t.args.length; r++) {
                            var n = t.args[r];
                            le(n) && i === n.op ? e(n) : a.push(n)
                        }
                    }(e), a) : e.args
                }

                function c(t) {
                    return le(t) ? function (e) {
                        try {
                            return new n(t.op, t.fn, e, t.implicit)
                        } catch (e) {
                            return console.error(e), []
                        }
                    } : function (e) {
                        return new r(new i(t.name), e)
                    }
                }

                return {
                    createMakeNodeFunction: c, isCommutative: function (e, t) {
                        if (!le(e)) return !0;
                        e = e.fn.toString();
                        return t && We(t, e) && We(t[e], "commutative") ? t[e].commutative : a[e] || !1
                    }, isAssociative: s, flatten: function e(t) {
                        if (!t.args || 0 === t.args.length) return t;
                        t.args = u(t);
                        for (var r = 0; r < t.args.length; r++) e(t.args[r])
                    }, allChildren: u, unflattenr: function e(t) {
                        if (t.args && 0 !== t.args.length) {
                            for (var r = c(t), n = t.args.length, i = 0; i < n; i++) e(t.args[i]);
                            if (2 < n && s(t)) {
                                for (var a = t.args.pop(); 0 < t.args.length;) a = r([t.args.pop(), a]);
                                t.args = a.args
                            }
                        }
                    }, unflattenl: function e(t) {
                        if (t.args && 0 !== t.args.length) {
                            for (var r = c(t), n = t.args.length, i = 0; i < n; i++) e(t.args[i]);
                            if (2 < n && s(t)) {
                                for (var a = t.args.shift(); 0 < t.args.length;) a = r([a, t.args.shift()]);
                                t.args = a.args
                            }
                        }
                    }
                }
            }),
            ec = Ye("simplifyCore", ["equal", "isZero", "add", "subtract", "multiply", "divide", "pow", "ConstantNode", "OperatorNode", "FunctionNode", "ParenthesisNode"], function (e) {
                var s = e.equal, u = e.isZero, c = e.add, f = e.subtract, l = e.multiply, p = e.divide, m = e.pow,
                    h = e.ConstantNode, d = e.OperatorNode, y = e.FunctionNode, g = e.ParenthesisNode, v = new h(0),
                    x = new h(1);
                return function e(t) {
                    if (le(t) && t.isUnary()) {
                        var r = e(t.args[0]);
                        if ("+" === t.op) return r;
                        if ("-" === t.op) {
                            if (le(r)) {
                                if (r.isUnary() && "-" === r.op) return r.args[0];
                                if (r.isBinary() && "subtract" === r.fn) return new d("-", "subtract", [r.args[1], r.args[0]])
                            }
                            return new d(t.op, t.fn, [r])
                        }
                    } else if (le(t) && t.isBinary()) {
                        var n = e(t.args[0]), i = e(t.args[1]);
                        if ("+" === t.op) {
                            if (ce(n)) {
                                if (u(n.value)) return i;
                                if (ce(i)) return new h(c(n.value, i.value))
                            }
                            return ce(i) && u(i.value) ? n : le(i) && i.isUnary() && "-" === i.op ? new d("-", "subtract", [n, i.args[0]]) : new d(t.op, t.fn, i ? [n, i] : [n])
                        }
                        if ("-" === t.op) {
                            if (ce(n) && i) {
                                if (ce(i)) return new h(f(n.value, i.value));
                                if (u(n.value)) return new d("-", "unaryMinus", [i])
                            }
                            if ("subtract" === t.fn) return ce(i) && u(i.value) ? n : le(i) && i.isUnary() && "-" === i.op ? e(new d("+", "add", [n, i.args[0]])) : new d(t.op, t.fn, [n, i])
                        } else {
                            if ("*" === t.op) {
                                if (ce(n)) {
                                    if (u(n.value)) return v;
                                    if (s(n.value, 1)) return i;
                                    if (ce(i)) return new h(l(n.value, i.value))
                                }
                                if (ce(i)) {
                                    if (u(i.value)) return v;
                                    if (s(i.value, 1)) return n;
                                    if (le(n) && n.isBinary() && n.op === t.op) {
                                        r = n.args[0];
                                        if (ce(r)) {
                                            var a = new h(l(r.value, i.value));
                                            return new d(t.op, t.fn, [a, n.args[1]], t.implicit)
                                        }
                                    }
                                    return new d(t.op, t.fn, [i, n], t.implicit)
                                }
                                return new d(t.op, t.fn, [n, i], t.implicit)
                            }
                            if ("/" === t.op) {
                                if (ce(n)) {
                                    if (u(n.value)) return v;
                                    if (ce(i) && (s(i.value, 1) || s(i.value, 2) || s(i.value, 4))) return new h(p(n.value, i.value))
                                }
                                return new d(t.op, t.fn, [n, i])
                            }
                            if ("^" === t.op) {
                                if (ce(i)) {
                                    if (u(i.value)) return x;
                                    if (s(i.value, 1)) return n;
                                    if (ce(n)) return new h(m(n.value, i.value));
                                    if (le(n) && n.isBinary() && "^" === n.op) {
                                        a = n.args[1];
                                        if (ce(a)) return new d(t.op, t.fn, [n.args[0], new h(l(a.value, i.value))])
                                    }
                                }
                                return new d(t.op, t.fn, [n, i])
                            }
                        }
                    } else {
                        if (j(t)) {
                            var o = e(t.content);
                            return j(o) || pe(o) || ce(o) ? o : new g(o)
                        }
                        if (fe(t)) {
                            o = t.args.map(e).map(function (e) {
                                return j(e) ? e.content : e
                            });
                            return new y(e(t.fn), o)
                        }
                    }
                    return t
                }
            }),
            tc = Ye("simplifyConstant", ["typed", "config", "mathWithTransform", "?fraction", "?bignumber", "ConstantNode", "OperatorNode", "FunctionNode", "SymbolNode"], function (e) {
                var t = e.typed, r = e.config, l = e.mathWithTransform, n = e.fraction, i = e.bignumber,
                    a = e.ConstantNode, o = e.OperatorNode, p = e.FunctionNode, e = e.SymbolNode,
                    e = Ku({FunctionNode: p, OperatorNode: o, SymbolNode: e}), m = e.isCommutative, h = e.isAssociative,
                    d = e.allChildren, y = e.createMakeNodeFunction;

                function g(t, r, n) {
                    try {
                        return x(l[t].apply(null, r), n)
                    } catch (e) {
                        return r = r.map(function (e) {
                            return w(e) ? e.valueOf() : e
                        }), x(l[t].apply(null, r), n)
                    }
                }

                var v = t({
                    Fraction: function (e) {
                        var t = e.s * e.n, t = t < 0 ? new o("-", "unaryMinus", [new a(-t)]) : new a(t);
                        return 1 === e.d ? t : new o("/", "divide", [t, new a(e.d)])
                    }, number: function (e) {
                        return e < 0 ? u(new a(-e)) : new a(e)
                    }, BigNumber: function (e) {
                        return e < 0 ? u(new a(-e)) : new a(e)
                    }, Complex: function (e) {
                        throw new Error("Cannot convert Complex number to Node")
                    }
                });

                function s(e, t) {
                    if (t && !1 !== t.exactFractions && isFinite(e) && n) {
                        var r = n(e), t = t && "number" == typeof t.fractionsLimit ? t.fractionsLimit : 1 / 0;
                        if (r.valueOf() === e && r.n < t && r.d < t) return r
                    }
                    return e
                }

                var x = t({
                    "string, Object": function (e, t) {
                        return "BigNumber" === r.number ? (void 0 === i && ni(), i(e)) : "Fraction" === r.number ? (void 0 === n && ii(), n(e)) : s(parseFloat(e), t)
                    }, "Fraction, Object": function (e, t) {
                        return e
                    }, "BigNumber, Object": function (e, t) {
                        return e
                    }, "number, Object": s, "Complex, Object": function (e, t) {
                        return 0 !== e.im ? e : s(e.re, t)
                    }
                });

                function u(e) {
                    return new o("-", "unaryMinus", [e])
                }

                function b(r, e, n, i) {
                    return e.reduce(function (e, t) {
                        if (R(e) || R(t)) R(e) ? R(t) || (t = v(t)) : e = v(e); else {
                            try {
                                return g(r, [e, t], i)
                            } catch (e) {
                            }
                            e = v(e), t = v(t)
                        }
                        return n([e, t])
                    })
                }

                return function (e, t) {
                    t = function t(e, r) {
                        switch (e.type) {
                            case"SymbolNode":
                                return e;
                            case"ConstantNode":
                                return "number" != typeof e.value && isNaN(e.value) ? e : x(e.value, r);
                            case"FunctionNode":
                                if (l[e.name] && l[e.name].rawArgs) return e;
                                if (-1 === ["add", "multiply"].indexOf(e.name)) {
                                    var n = e.args.map(function (e) {
                                        return t(e, r)
                                    });
                                    if (!n.some(R)) try {
                                        return g(e.name, n, r)
                                    } catch (t) {
                                    }
                                    return n = n.map(function (e) {
                                        return R(e) ? e : v(e)
                                    }), new p(e.name, n)
                                }
                            case"OperatorNode":
                                var i, a, o = e.fn.toString(), s = y(e);
                                if (le(e) && e.isUnary()) a = R((i = [t(e.args[0], r)])[0]) ? s(i) : g(o, i, r); else if (h(e)) if (i = (i = d(e)).map(function (e) {
                                    return t(e, r)
                                }), m(o)) {
                                    for (var u = [], c = [], f = 0; f < i.length; f++) (R(i[f]) ? c : u).push(i[f]);
                                    a = 1 < u.length ? (a = b(o, u, s, r), c.unshift(a), b(o, c, s, r)) : b(o, i, s, r)
                                } else a = b(o, i, s, r); else a = b(o, i = e.args.map(function (e) {
                                    return t(e, r)
                                }), s, r);
                                return a;
                            case"ParenthesisNode":
                                return t(e.content, r);
                            case"AccessorNode":
                            case"ArrayNode":
                            case"AssignmentNode":
                            case"BlockNode":
                            case"FunctionAssignmentNode":
                            case"IndexNode":
                            case"ObjectNode":
                            case"RangeNode":
                            case"ConditionalNode":
                            default:
                                throw new Error("Unimplemented node type in simplifyConstant: ".concat(e.type))
                        }
                    }(e, t);
                    return R(t) ? t : v(t)
                }
            }), rc = Ye("resolve", ["parse", "FunctionNode", "OperatorNode", "ParenthesisNode"], function (e) {
                var a = e.parse, o = e.FunctionNode, s = e.OperatorNode, u = e.ParenthesisNode;
                return function t(e, r) {
                    if (!r) return e;
                    if (pe(e)) {
                        var n = r[e.name];
                        if (R(n)) return t(n, r);
                        if ("number" == typeof n) return a(String(n))
                    } else {
                        if (le(e)) {
                            var i = e.args.map(function (e) {
                                return t(e, r)
                            });
                            return new s(e.op, e.fn, i, e.implicit)
                        }
                        if (j(e)) return new u(t(e.content, r));
                        if (fe(e)) {
                            i = e.args.map(function (e) {
                                return t(e, r)
                            });
                            return new o(e.name, i)
                        }
                    }
                    return e
                }
            });

        function nc(e) {
            return (nc = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        var ic = Ye("simplify", ["config", "typed", "parse", "add", "subtract", "multiply", "divide", "pow", "isZero", "equal", "?fraction", "?bignumber", "mathWithTransform", "ConstantNode", "FunctionNode", "OperatorNode", "ParenthesisNode", "SymbolNode"], function (e) {
                var t = e.config, r = e.typed, u = e.parse, n = e.add, i = e.subtract, a = e.multiply, o = e.divide,
                    s = e.pow, c = e.isZero, l = e.equal, f = e.fraction, p = e.bignumber, m = e.mathWithTransform,
                    h = e.ConstantNode, d = e.FunctionNode, y = e.OperatorNode, g = e.ParenthesisNode, v = e.SymbolNode,
                    p = tc({
                        typed: r,
                        config: t,
                        mathWithTransform: m,
                        fraction: f,
                        bignumber: p,
                        ConstantNode: h,
                        OperatorNode: y,
                        FunctionNode: d,
                        SymbolNode: v
                    }), o = ec({
                        equal: l,
                        isZero: c,
                        add: n,
                        subtract: i,
                        multiply: a,
                        divide: o,
                        pow: s,
                        ConstantNode: h,
                        OperatorNode: y,
                        FunctionNode: d,
                        ParenthesisNode: g
                    }), x = rc({parse: u, FunctionNode: d, OperatorNode: y, ParenthesisNode: g}),
                    s = Ku({FunctionNode: d, OperatorNode: y, SymbolNode: v}), b = s.isCommutative, w = s.isAssociative,
                    N = s.flatten, M = s.unflattenr, S = s.unflattenl, E = s.createMakeNodeFunction, s = r("simplify", {
                        string: function (e) {
                            return this(u(e), this.rules, {}, {})
                        }, "string, Object": function (e, t) {
                            return this(u(e), this.rules, t, {})
                        }, "string, Object, Object": function (e, t, r) {
                            return this(u(e), this.rules, t, r)
                        }, "string, Array": function (e, t) {
                            return this(u(e), t, {}, {})
                        }, "string, Array, Object": function (e, t, r) {
                            return this(u(e), t, r, {})
                        }, "string, Array, Object, Object": function (e, t, r, n) {
                            return this(u(e), t, r, n)
                        }, "Node, Object": function (e, t) {
                            return this(e, this.rules, t, {})
                        }, "Node, Object, Object": function (e, t, r) {
                            return this(e, this.rules, t, r)
                        }, Node: function (e) {
                            return this(e, this.rules, {}, {})
                        }, "Node, Array": function (e, t) {
                            return this(e, t, {}, {})
                        }, "Node, Array, Object": function (e, t, r) {
                            return this(e, t, r, {})
                        }, "Node, Array, Object, Object": function (e, t, r, n) {
                            t = function (e) {
                                for (var t = [], r = 0; r < e.length; r++) {
                                    var n = e[r], i = void 0, a = nc(n);
                                    switch (a) {
                                        case"string":
                                            var o = n.split("->");
                                            if (2 !== o.length) throw SyntaxError("Could not parse rule: " + n);
                                            n = {l: o[0], r: o[1]};
                                        case"object":
                                            var s, i = {l: A(u(n.l)), r: A(u(n.r))};
                                            n.context && (i.evaluate = n.context), n.evaluate && (i.evaluate = u(n.evaluate)), w(i.l) && (s = E(i.l), o = new v("_p" + C++), i.expanded = {}, i.expanded.l = s([i.l.clone(), o]), N(i.expanded.l), M(i.expanded.l), i.expanded.r = s([i.r, o]));
                                            break;
                                        case"function":
                                            i = n;
                                            break;
                                        default:
                                            throw TypeError("Unsupported type of rule: " + a)
                                    }
                                    t.push(i)
                                }
                                return t
                            }(t);
                            for (var i = x(e, r), a = {}, o = (i = A(i)).toString({parenthesis: "all"}); !a[o];) {
                                a[o] = !0;
                                for (var s = C = 0; s < t.length; s++) i = "function" == typeof t[s] ? t[s](i, n) : (N(i), _(i, t[s])), S(i);
                                o = i.toString({parenthesis: "all"})
                            }
                            return i
                        }
                    });

                function A(e) {
                    return e.transform(function (e, t, r) {
                        return j(e) ? A(e.content) : e
                    })
                }

                s.simplifyCore = o, s.resolve = x;
                var O = {
                    true: !0,
                    false: !0,
                    e: !0,
                    i: !0,
                    Infinity: !0,
                    LN2: !0,
                    LN10: !0,
                    LOG2E: !0,
                    LOG10E: !0,
                    NaN: !0,
                    phi: !0,
                    pi: !0,
                    SQRT1_2: !0,
                    SQRT2: !0,
                    tau: !0
                };
                s.rules = [o, {l: "log(e)", r: "1"}, {l: "n-n1", r: "n+-n1"}, {l: "-(c*v)", r: "(-c) * v"}, {
                    l: "-v",
                    r: "(-1) * v"
                }, {l: "n/n1^n2", r: "n*n1^-n2"}, {l: "n/n1", r: "n*n1^-1"}, {
                    l: "(n ^ n1) ^ n2",
                    r: "n ^ (n1 * n2)"
                }, {l: "n*n", r: "n^2"}, {l: "n * n^n1", r: "n^(n1+1)"}, {l: "n^n1 * n^n2", r: "n^(n1+n2)"}, {
                    l: "n+n",
                    r: "2*n"
                }, {l: "n+-n", r: "0"}, {l: "n1*n2 + n2", r: "(n1+1)*n2"}, {
                    l: "n1*n3 + n2*n3",
                    r: "(n1+n2)*n3"
                }, {l: "n1 + -1 * (n2 + n3)", r: "n1 + -1 * n2 + -1 * n3"}, p, {l: "(-n)*n1", r: "-(n*n1)"}, {
                    l: "c+v",
                    r: "v+c",
                    context: {add: {commutative: !1}}
                }, {l: "v*c", r: "c*v", context: {multiply: {commutative: !1}}}, {l: "n+-n1", r: "n-n1"}, {
                    l: "n*(n1^-1)",
                    r: "n/n1"
                }, {l: "n*n1^-n2", r: "n/n1^n2"}, {l: "n1^-1", r: "1/n1"}, {
                    l: "n*(n1/n2)",
                    r: "(n*n1)/n2"
                }, {l: "n-(n1+n2)", r: "n-n1-n2"}, {l: "1*n", r: "n"}, {l: "n1/(n2/n3)", r: "(n1*n3)/n2"}];
                var C = 0, _ = r("applyRule", {
                    "Node, Object": function (e, t) {
                        var r = e;
                        if (r instanceof y || r instanceof d) {
                            if (r.args) for (var n = 0; n < r.args.length; n++) r.args[n] = _(r.args[n], t)
                        } else r instanceof g && r.content && (r.content = _(r.content, t));
                        var i = t.r, a = q(t.l, r)[0];
                        return !a && t.expanded && (i = t.expanded.r, a = q(t.expanded.l, r)[0]), a && (e = r.implicit, r = i.clone(), e && "implicit" in i && (r.implicit = !0), r = r.transform(function (e) {
                            return e.isSymbolNode && We(a.placeholders, e.name) ? a.placeholders[e.name].clone() : e
                        })), r
                    }
                });

                function T(e, t) {
                    var r, n, i = {placeholders: {}};
                    if (!e.placeholders && !t.placeholders) return i;
                    if (!e.placeholders) return t;
                    if (!t.placeholders) return e;
                    for (r in e.placeholders) if (We(e.placeholders, r) && (i.placeholders[r] = e.placeholders[r], We(t.placeholders, r) && !function e(t, r) {
                        if (t instanceof h && r instanceof h) {
                            if (!l(t.value, r.value)) return !1
                        } else if (t instanceof v && r instanceof v) {
                            if (t.name !== r.name) return !1
                        } else {
                            if (!(t instanceof y && r instanceof y || t instanceof d && r instanceof d)) return !1;
                            if (t instanceof y) {
                                if (t.op !== r.op || t.fn !== r.fn) return !1
                            } else if (t instanceof d && t.name !== r.name) return !1;
                            if (t.args.length !== r.args.length) return !1;
                            for (var n = 0; n < t.args.length; n++) if (!e(t.args[n], r.args[n])) return !1
                        }
                        return !0
                    }(e.placeholders[r], t.placeholders[r]))) return null;
                    for (n in t.placeholders) We(t.placeholders, n) && (i.placeholders[n] = t.placeholders[n]);
                    return i
                }

                function z(e, t) {
                    var r, n = [];
                    if (0 === e.length || 0 === t.length) return n;
                    for (var i = 0; i < e.length; i++) for (var a = 0; a < t.length; a++) (r = T(e[i], t[a])) && n.push(r);
                    return n
                }

                function q(e, t, r) {
                    var n = [{placeholders: {}}];
                    if (e instanceof y && t instanceof y || e instanceof d && t instanceof d) {
                        if (e instanceof y) {
                            if (e.op !== t.op || e.fn !== t.fn) return []
                        } else if (e instanceof d && e.name !== t.name) return [];
                        if (!(1 === t.args.length && 1 === e.args.length || !w(t) && t.args.length === e.args.length || r)) {
                            if (2 <= t.args.length && 2 === e.args.length) {
                                for (var i = function (e, t) {
                                    var r, n, i = [], a = E(e);
                                    if (b(e, t)) for (var o = 0; o < e.args.length; o++) (n = e.args.slice(0)).splice(o, 1), r = 1 === n.length ? n[0] : a(n), i.push(a([e.args[o], r])); else r = 1 === (n = e.args.slice(1)).length ? n[0] : a(n), i.push(a([e.args[0], r]));
                                    return i
                                }(t, e.context), a = [], o = 0; o < i.length; o++) var s = q(e, i[o], !0), a = a.concat(s);
                                return a
                            }
                            if (2 < e.args.length) throw Error("Unexpected non-binary associative function: " + e.toString());
                            return []
                        }
                        for (var u = [], c = 0; c < e.args.length; c++) {
                            var f = q(e.args[c], t.args[c]);
                            if (0 === f.length) return [];
                            u.push(f)
                        }
                        n = function () {
                            if (0 === u.length) return u;
                            for (var e = u.reduce(z), t = [], r = {}, n = 0; n < e.length; n++) {
                                var i = JSON.stringify(e[n]);
                                r[i] || (r[i] = !0, t.push(e[n]))
                            }
                            return t
                        }()
                    } else if (e instanceof v) {
                        if (0 === e.name.length) throw new Error("Symbol in rule has 0 length...!?");
                        if (O[e.name]) {
                            if (e.name !== t.name) return []
                        } else if ("n" === e.name[0] || "_p" === e.name.substring(0, 2)) n[0].placeholders[e.name] = t; else if ("v" === e.name[0]) {
                            if (ce(t)) return [];
                            n[0].placeholders[e.name] = t
                        } else {
                            if ("c" !== e.name[0]) throw new Error("Invalid symbol in rule: " + e.name);
                            if (!(t instanceof h)) return [];
                            n[0].placeholders[e.name] = t
                        }
                    } else {
                        if (!(e instanceof h)) return [];
                        if (!l(e.value, t.value)) return []
                    }
                    return n
                }

                return s
            }),
            ac = Ye("derivative", ["typed", "config", "parse", "simplify", "equal", "isZero", "numeric", "ConstantNode", "FunctionNode", "OperatorNode", "ParenthesisNode", "SymbolNode"], function (e) {
                var t = e.typed, r = e.config, n = e.parse, i = e.simplify, o = e.equal, s = e.isZero, a = e.numeric,
                    u = e.ConstantNode, c = e.FunctionNode, f = e.OperatorNode, l = e.ParenthesisNode, p = e.SymbolNode,
                    e = t("derivative", {
                        "Node, SymbolNode, Object": function (e, t, r) {
                            var n = {};
                            h(n, e, t.name);
                            n = d(e, n);
                            return r.simplify ? i(n) : n
                        }, "Node, SymbolNode": function (e, t) {
                            return this(e, t, {simplify: !0})
                        }, "string, SymbolNode": function (e, t) {
                            return this(n(e), t)
                        }, "string, SymbolNode, Object": function (e, t, r) {
                            return this(n(e), t, r)
                        }, "string, string": function (e, t) {
                            return this(n(e), n(t))
                        }, "string, string, Object": function (e, t, r) {
                            return this(n(e), n(t), r)
                        }, "Node, string": function (e, t) {
                            return this(e, n(t))
                        }, "Node, string, Object": function (e, t, r) {
                            return this(e, n(t), r)
                        }
                    });
                e._simplify = !0, e.toTex = function (e) {
                    return m.apply(null, e.args)
                };
                var m = t("_derivTex", {
                    "Node, SymbolNode": function (e, t) {
                        return ce(e) && "string" === J(e.value) ? m(n(e.value).toString(), t.toString(), 1) : m(e.toString(), t.toString(), 1)
                    }, "Node, ConstantNode": function (e, t) {
                        if ("string" === J(t.value)) return m(e, n(t.value));
                        throw new Error("The second parameter to 'derivative' is a non-string constant")
                    }, "Node, SymbolNode, ConstantNode": function (e, t, r) {
                        return m(e.toString(), t.name, r.value)
                    }, "string, string, number": function (e, t, r) {
                        return (1 === r ? "{d\\over d" + t + "}" : "{d^{" + r + "}\\over d" + t + "^{" + r + "}}") + "\\left[".concat(e, "\\right]")
                    }
                }), h = t("constTag", {
                    "Object, ConstantNode, string": function (e, t) {
                        return e[t] = !0
                    }, "Object, SymbolNode, string": function (e, t, r) {
                        return t.name !== r && (e[t] = !0)
                    }, "Object, ParenthesisNode, string": function (e, t, r) {
                        return h(e, t.content, r)
                    }, "Object, FunctionAssignmentNode, string": function (e, t, r) {
                        return -1 === t.params.indexOf(r) ? e[t] = !0 : h(e, t.expr, r)
                    }, "Object, FunctionNode | OperatorNode, string": function (e, t, r) {
                        if (0 < t.args.length) {
                            for (var n = h(e, t.args[0], r), i = 1; i < t.args.length; ++i) n = h(e, t.args[i], r) && n;
                            if (n) return e[t] = !0
                        }
                        return !1
                    }
                }), d = t("_derivative", {
                    "ConstantNode, Object": function (e) {
                        return y(0)
                    }, "SymbolNode, Object": function (e, t) {
                        return void 0 !== t[e] ? y(0) : y(1)
                    }, "ParenthesisNode, Object": function (e, t) {
                        return new l(d(e.content, t))
                    }, "FunctionAssignmentNode, Object": function (e, t) {
                        return void 0 !== t[e] ? y(0) : d(e.expr, t)
                    }, "FunctionNode, Object": function (e, t) {
                        if (1 !== e.args.length && function (e) {
                            if ("log" !== e.name && "nthRoot" !== e.name && "pow" !== e.name || 2 !== e.args.length) {
                                for (var t = 0; t < e.args.length; ++t) e.args[t] = y(0);
                                throw e.compile().evaluate(), new Error("Expected TypeError, but none found")
                            }
                        }(e), void 0 !== t[e]) return y(0);
                        var r, n, i, a = e.args[0], o = !1, s = !1;
                        switch (e.name) {
                            case"cbrt":
                                o = !0, n = new f("*", "multiply", [y(3), new f("^", "pow", [a, new f("/", "divide", [y(2), y(3)])])]);
                                break;
                            case"sqrt":
                            case"nthRoot":
                                if (1 === e.args.length) o = !0, n = new f("*", "multiply", [y(2), new c("sqrt", [a])]); else if (2 === e.args.length) return t[r = new f("/", "divide", [y(1), e.args[1]])] = t[e.args[1]], d(new f("^", "pow", [a, r]), t);
                                break;
                            case"log10":
                                r = y(10);
                            case"log":
                                if (r || 1 !== e.args.length) {
                                    if (1 === e.args.length && r || 2 === e.args.length && void 0 !== t[e.args[1]]) n = new f("*", "multiply", [a.clone(), new c("log", [r || e.args[1]])]), o = !0; else if (2 === e.args.length) return d(new f("/", "divide", [new c("log", [a]), new c("log", [e.args[1]])]), t)
                                } else n = a.clone(), o = !0;
                                break;
                            case"pow":
                                return t[r] = t[e.args[1]], d(new f("^", "pow", [a, e.args[1]]), t);
                            case"exp":
                                n = new c("exp", [a.clone()]);
                                break;
                            case"sin":
                                n = new c("cos", [a.clone()]);
                                break;
                            case"cos":
                                n = new f("-", "unaryMinus", [new c("sin", [a.clone()])]);
                                break;
                            case"tan":
                                n = new f("^", "pow", [new c("sec", [a.clone()]), y(2)]);
                                break;
                            case"sec":
                                n = new f("*", "multiply", [e, new c("tan", [a.clone()])]);
                                break;
                            case"csc":
                                s = !0, n = new f("*", "multiply", [e, new c("cot", [a.clone()])]);
                                break;
                            case"cot":
                                s = !0, n = new f("^", "pow", [new c("csc", [a.clone()]), y(2)]);
                                break;
                            case"asin":
                                o = !0, n = new c("sqrt", [new f("-", "subtract", [y(1), new f("^", "pow", [a.clone(), y(2)])])]);
                                break;
                            case"acos":
                                s = o = !0, n = new c("sqrt", [new f("-", "subtract", [y(1), new f("^", "pow", [a.clone(), y(2)])])]);
                                break;
                            case"atan":
                                o = !0, n = new f("+", "add", [new f("^", "pow", [a.clone(), y(2)]), y(1)]);
                                break;
                            case"asec":
                                o = !0, n = new f("*", "multiply", [new c("abs", [a.clone()]), new c("sqrt", [new f("-", "subtract", [new f("^", "pow", [a.clone(), y(2)]), y(1)])])]);
                                break;
                            case"acsc":
                                s = o = !0, n = new f("*", "multiply", [new c("abs", [a.clone()]), new c("sqrt", [new f("-", "subtract", [new f("^", "pow", [a.clone(), y(2)]), y(1)])])]);
                                break;
                            case"acot":
                                s = o = !0, n = new f("+", "add", [new f("^", "pow", [a.clone(), y(2)]), y(1)]);
                                break;
                            case"sinh":
                                n = new c("cosh", [a.clone()]);
                                break;
                            case"cosh":
                                n = new c("sinh", [a.clone()]);
                                break;
                            case"tanh":
                                n = new f("^", "pow", [new c("sech", [a.clone()]), y(2)]);
                                break;
                            case"sech":
                                s = !0, n = new f("*", "multiply", [e, new c("tanh", [a.clone()])]);
                                break;
                            case"csch":
                                s = !0, n = new f("*", "multiply", [e, new c("coth", [a.clone()])]);
                                break;
                            case"coth":
                                s = !0, n = new f("^", "pow", [new c("csch", [a.clone()]), y(2)]);
                                break;
                            case"asinh":
                                o = !0, n = new c("sqrt", [new f("+", "add", [new f("^", "pow", [a.clone(), y(2)]), y(1)])]);
                                break;
                            case"acosh":
                                o = !0, n = new c("sqrt", [new f("-", "subtract", [new f("^", "pow", [a.clone(), y(2)]), y(1)])]);
                                break;
                            case"atanh":
                                o = !0, n = new f("-", "subtract", [y(1), new f("^", "pow", [a.clone(), y(2)])]);
                                break;
                            case"asech":
                                s = o = !0, n = new f("*", "multiply", [a.clone(), new c("sqrt", [new f("-", "subtract", [y(1), new f("^", "pow", [a.clone(), y(2)])])])]);
                                break;
                            case"acsch":
                                s = o = !0, n = new f("*", "multiply", [new c("abs", [a.clone()]), new c("sqrt", [new f("+", "add", [new f("^", "pow", [a.clone(), y(2)]), y(1)])])]);
                                break;
                            case"acoth":
                                s = o = !0, n = new f("-", "subtract", [y(1), new f("^", "pow", [a.clone(), y(2)])]);
                                break;
                            case"abs":
                                n = new f("/", "divide", [new c(new p("abs"), [a.clone()]), a.clone()]);
                                break;
                            case"gamma":
                            default:
                                throw new Error('Function "' + e.name + '" is not supported by derivative, or a wrong number of arguments is passed')
                        }
                        o = o ? (i = "/", "divide") : (i = "*", "multiply");
                        t = d(a, t);
                        return s && (t = new f("-", "unaryMinus", [t])), new f(i, o, [t, n])
                    }, "OperatorNode, Object": function (e, r) {
                        if (void 0 !== r[e]) return y(0);
                        if ("+" === e.op) return new f(e.op, e.fn, e.args.map(function (e) {
                            return d(e, r)
                        }));
                        if ("-" === e.op) {
                            if (e.isUnary()) return new f(e.op, e.fn, [d(e.args[0], r)]);
                            if (e.isBinary()) return new f(e.op, e.fn, [d(e.args[0], r), d(e.args[1], r)])
                        }
                        if ("*" === e.op) {
                            var t = e.args.filter(function (e) {
                                return void 0 !== r[e]
                            });
                            if (0 < t.length) {
                                var n = e.args.filter(function (e) {
                                    return void 0 === r[e]
                                }), n = 1 === n.length ? n[0] : new f("*", "multiply", n), n = t.concat(d(n, r));
                                return new f("*", "multiply", n)
                            }
                            return new f("+", "add", e.args.map(function (t) {
                                return new f("*", "multiply", e.args.map(function (e) {
                                    return e === t ? d(e, r) : e.clone()
                                }))
                            }))
                        }
                        if ("/" === e.op && e.isBinary()) {
                            var i = e.args[0], a = e.args[1];
                            return void 0 !== r[a] ? new f("/", "divide", [d(i, r), a]) : void 0 !== r[i] ? new f("*", "multiply", [new f("-", "unaryMinus", [i]), new f("/", "divide", [d(a, r), new f("^", "pow", [a.clone(), y(2)])])]) : new f("/", "divide", [new f("-", "subtract", [new f("*", "multiply", [d(i, r), a.clone()]), new f("*", "multiply", [i.clone(), d(a, r)])]), new f("^", "pow", [a.clone(), y(2)])])
                        }
                        if ("^" === e.op && e.isBinary()) {
                            n = e.args[0], i = e.args[1];
                            if (void 0 !== r[n]) return ce(n) && (s(n.value) || o(n.value, 1)) ? y(0) : new f("*", "multiply", [e, new f("*", "multiply", [new c("log", [n.clone()]), d(i.clone(), r)])]);
                            if (void 0 === r[i]) return new f("*", "multiply", [new f("^", "pow", [n.clone(), i.clone()]), new f("+", "add", [new f("*", "multiply", [d(n, r), new f("/", "divide", [i.clone(), n.clone()])]), new f("*", "multiply", [d(i, r), new c("log", [n.clone()])])])]);
                            if (ce(i)) {
                                if (s(i.value)) return y(0);
                                if (o(i.value, 1)) return d(n, r)
                            }
                            a = new f("^", "pow", [n.clone(), new f("-", "subtract", [i, y(1)])]);
                            return new f("*", "multiply", [i.clone(), new f("*", "multiply", [d(n, r), a])])
                        }
                        throw new Error('Operator "' + e.op + '" is not supported by derivative, or a wrong number of arguments is passed')
                    }
                });

                function y(e, t) {
                    return new u(a(e, t || r.number))
                }

                return e
            }),
            oc = Ye("rationalize", ["config", "typed", "equal", "isZero", "add", "subtract", "multiply", "divide", "pow", "parse", "simplify", "?bignumber", "?fraction", "mathWithTransform", "ConstantNode", "OperatorNode", "FunctionNode", "SymbolNode", "ParenthesisNode"], function (e) {
                var t = e.config, r = e.typed, n = e.equal, i = e.isZero, a = e.add, o = e.subtract, s = e.multiply,
                    u = e.divide, c = e.pow, f = e.parse, p = e.simplify, l = e.fraction, m = e.bignumber,
                    h = e.mathWithTransform, d = e.ConstantNode, y = e.OperatorNode, g = e.FunctionNode,
                    v = e.SymbolNode, e = e.ParenthesisNode, x = tc({
                        typed: r,
                        config: t,
                        mathWithTransform: h,
                        fraction: l,
                        bignumber: m,
                        ConstantNode: d,
                        OperatorNode: y,
                        FunctionNode: g,
                        SymbolNode: v
                    }), b = ec({
                        equal: n,
                        isZero: i,
                        add: a,
                        subtract: o,
                        multiply: s,
                        divide: u,
                        pow: c,
                        ConstantNode: d,
                        OperatorNode: y,
                        FunctionNode: g,
                        ParenthesisNode: e
                    });
                return r("rationalize", {
                    string: function (e) {
                        return this(f(e), {}, !1)
                    }, "string, boolean": function (e, t) {
                        return this(f(e), {}, t)
                    }, "string, Object": function (e, t) {
                        return this(f(e), t, !1)
                    }, "string, Object, boolean": function (e, t, r) {
                        return this(f(e), t, r)
                    }, Node: function (e) {
                        return this(e, {}, !1)
                    }, "Node, boolean": function (e, t) {
                        return this(e, {}, t)
                    }, "Node, Object": function (e, t) {
                        return this(e, t, !1)
                    }, "Node, Object, boolean": function (r, n, e) {
                        var t, i, a, o = ((l = {}).firstRules = (t = [b, {l: "n+n", r: "2*n"}, {
                                l: "n+-n",
                                r: "0"
                            }, x, {l: "n*(n1^-1)", r: "n/n1"}, {l: "n*n1^-n2", r: "n/n1^n2"}, {
                                l: "n1^-1",
                                r: "1/n1"
                            }, {l: "n*(n1/n2)", r: "(n*n1)/n2"}, {l: "1*n", r: "n"}]).concat(f = [{
                                l: "(-n1)/(-n2)",
                                r: "n1/n2"
                            }, {l: "(-n1)*(-n2)", r: "n1*n2"}, {l: "n1--n2", r: "n1+n2"}, {
                                l: "n1-n2",
                                r: "n1+(-n2)"
                            }, {l: "(n1+n2)*n3", r: "(n1*n3 + n2*n3)"}, {
                                l: "n1*(n2+n3)",
                                r: "(n1*n2+n1*n3)"
                            }, {l: "c1*n + c2*n", r: "(c1+c2)*n"}, {l: "c1*n + n", r: "(c1+1)*n"}, {
                                l: "c1*n - c2*n",
                                r: "(c1-c2)*n"
                            }, {l: "c1*n - n", r: "(c1-1)*n"}, {l: "v/c", r: "(1/c)*v"}, {
                                l: "v/-c",
                                r: "-(1/c)*v"
                            }, {l: "-v*-c", r: "c*v"}, {l: "-v*c", r: "-c*v"}, {l: "v*-c", r: "-c*v"}, {
                                l: "v*c",
                                r: "c*v"
                            }, {l: "-(-n1*n2)", r: "(n1*n2)"}, {l: "-(n1*n2)", r: "(-n1*n2)"}, {
                                l: "-(-n1+n2)",
                                r: "(n1-n2)"
                            }, {l: "-(n1+n2)", r: "(-n1-n2)"}, {l: "(n1^n2)^n3", r: "(n1^(n2*n3))"}, {
                                l: "-(-n1/n2)",
                                r: "(n1/n2)"
                            }, {l: "-(n1/n2)", r: "(-n1/n2)"}], i = [{
                                l: "(n1/(n2/n3))",
                                r: "((n1*n3)/n2)"
                            }, {l: "(n1/n2/n3)", r: "(n1/(n2*n3))"}]), l.distrDivRules = [{
                                l: "(n1/n2 + n3/n4)",
                                r: "((n1*n4 + n3*n2)/(n2*n4))"
                            }, {l: "(n1/n2 + n3)", r: "((n1 + n3*n2)/n2)"}, {
                                l: "(n1 + n2/n3)",
                                r: "((n1*n3 + n2)/n3)"
                            }], l.sucDivRules = i, l.firstRulesAgain = t.concat(f), l.finalRules = [b, {
                                l: "n*-n",
                                r: "-n^2"
                            }, {l: "n*n", r: "n^2"}, x, {l: "n*-n^n1", r: "-n^(n1+1)"}, {
                                l: "n*n^n1",
                                r: "n^(n1+1)"
                            }, {l: "n^n1*-n^n2", r: "-n^(n1+n2)"}, {l: "n^n1*n^n2", r: "n^(n1+n2)"}, {
                                l: "n^n1*-n",
                                r: "-n^(n1+1)"
                            }, {l: "n^n1*n", r: "n^(n1+1)"}, {l: "n^n1/-n", r: "-n^(n1-1)"}, {
                                l: "n^n1/n",
                                r: "n^(n1-1)"
                            }, {l: "n/-n^n1", r: "-n^(1-n1)"}, {l: "n/n^n1", r: "n^(1-n1)"}, {
                                l: "n^n1/-n^n2",
                                r: "n^(n1-n2)"
                            }, {l: "n^n1/n^n2", r: "n^(n1-n2)"}, {l: "n1+(-n2*n3)", r: "n1-n2*n3"}, {
                                l: "v*(-c)",
                                r: "-c*v"
                            }, {l: "n1+-n2", r: "n1-n2"}, {l: "v*c", r: "c*v"}, {l: "(n1^n2)^n3", r: "(n1^(n2*n3))"}], l),
                            i = function (e) {
                                var a = [], t = p(r, e, n, {exactFractions: !1}), o = "+-*/";
                                !function e(t) {
                                    var r = t.type;
                                    if ("FunctionNode" === r) throw new Error("There is an unsolved function call");
                                    if ("OperatorNode" === r) if ("^" === t.op) {
                                        if ("ConstantNode" !== t.args[1].type || !L(parseFloat(t.args[1].value))) throw new Error("There is a non-integer exponent");
                                        e(t.args[0])
                                    } else {
                                        if (-1 === o.indexOf(t.op)) throw new Error("Operator " + t.op + " invalid in polynomial expression");
                                        for (var n = 0; n < t.args.length; n++) e(t.args[n])
                                    } else if ("SymbolNode" === r) {
                                        var i = t.name;
                                        -1 === a.indexOf(i) && a.push(i)
                                    } else if ("ParenthesisNode" === r) e(t.content); else if ("ConstantNode" !== r) throw new Error("type " + r + " is not allowed in polynomial expression")
                                }(t);
                                e = {};
                                return e.expression = t, e.variables = a, e
                            }(o.firstRules), t = i.variables.length;
                        if (r = i.expression, 1 <= t) {
                            r = function e(t, r, n) {
                                var i, a, o = t.type, s = 1 < arguments.length;
                                if ("OperatorNode" === o && t.isBinary() && (i = !1, "^" === t.op && ("ParenthesisNode" !== t.args[0].type && "OperatorNode" !== t.args[0].type || "ConstantNode" !== t.args[1].type || (i = 2 <= (a = parseFloat(t.args[1].value)) && L(a))), i && (t = 2 < a ? (i = t.args[0], a = new y("^", "pow", [t.args[0].cloneDeep(), new d(a - 1)]), new y("*", "multiply", [i, a])) : new y("*", "multiply", [t.args[0], t.args[0].cloneDeep()]), s && ("content" === n ? r.content = t : r.args[n] = t))), "ParenthesisNode" === o) e(t.content, t, "content"); else if ("ConstantNode" !== o && "SymbolNode" !== o) for (var u = 0; u < t.args.length; u++) e(t.args[u], t, u);
                                if (!s) return t
                            }(r);
                            var s, u = !0, c = !1;
                            for (r = p(r, o.firstRules, {}, {exactFractions: !1}); s = u ? o.distrDivRules : o.sucDivRules, u = !u, (s = (r = p(r, s)).toString()) !== a;) c = !0, a = s;
                            c && (r = p(r, o.firstRulesAgain, {}, {exactFractions: !1})), r = p(r, o.finalRules, {}, {exactFractions: !1})
                        }
                        var f = [], l = {};
                        return "OperatorNode" === r.type && r.isBinary() && "/" === r.op ? (1 === t && (r.args[0] = w(r.args[0], f), r.args[1] = w(r.args[1])), e && (l.numerator = r.args[0], l.denominator = r.args[1])) : (1 === t && (r = w(r, f)), e && (l.numerator = r, l.denominator = null)), e ? (l.coefficients = f, l.variables = i.variables, l.expression = r, l) : r
                    }
                });

                function w(e, u) {
                    void 0 === u && (u = []);
                    var c = u[0] = 0, f = "";
                    !function e(t, r, n) {
                        var i = t.type;
                        if ("FunctionNode" === i) throw new Error("There is an unsolved function call");
                        if ("OperatorNode" === i) {
                            if (-1 === "+-*^".indexOf(t.op)) throw new Error("Operator " + t.op + " invalid");
                            if (null !== r) {
                                if (("unaryMinus" === t.fn || "pow" === t.fn) && "add" !== r.fn && "subtract" !== r.fn && "multiply" !== r.fn) throw new Error("Invalid " + t.op + " placing");
                                if (("subtract" === t.fn || "add" === t.fn || "multiply" === t.fn) && "add" !== r.fn && "subtract" !== r.fn) throw new Error("Invalid " + t.op + " placing");
                                if (("subtract" === t.fn || "add" === t.fn || "unaryMinus" === t.fn) && 0 !== n.noFil) throw new Error("Invalid " + t.op + " placing")
                            }
                            "^" !== t.op && "*" !== t.op || (n.fire = t.op);
                            for (var a = 0; a < t.args.length; a++) "unaryMinus" === t.fn && (n.oper = "-"), "+" !== t.op && "subtract" !== t.fn || (n.fire = "", n.cte = 1, n.oper = 0 === a ? "+" : t.op), n.noFil = a, e(t.args[a], t, n)
                        } else if ("SymbolNode" === i) {
                            if (t.name !== f && "" !== f) throw new Error("There is more than one variable");
                            if (f = t.name, null === r) return u[1] = 1, 0;
                            if ("^" === r.op && 0 !== n.noFil) throw new Error("In power the variable should be the first parameter");
                            if ("*" === r.op && 1 !== n.noFil) throw new Error("In multiply the variable should be the second parameter");
                            "" !== n.fire && "*" !== n.fire || (c < 1 && (u[1] = 0), u[1] += n.cte * ("+" === n.oper ? 1 : -1), c = Math.max(1, c))
                        } else {
                            if ("ConstantNode" !== i) throw new Error("Type " + i + " is not allowed");
                            var o = parseFloat(t.value);
                            if (null === r) return u[0] = o, 0;
                            if ("^" === r.op) {
                                if (1 !== n.noFil) throw new Error("Constant cannot be powered");
                                if (!L(o) || o <= 0) throw new Error("Non-integer exponent is not allowed");
                                for (var s = c + 1; s < o; s++) u[s] = 0;
                                return c < o && (u[o] = 0), u[o] += n.cte * ("+" === n.oper ? 1 : -1), c = Math.max(o, c), 0
                            }
                            n.cte = o, "" === n.fire && (u[0] += n.cte * ("+" === n.oper ? 1 : -1))
                        }
                    }(e, null, {cte: 1, oper: "+", fire: ""});
                    for (var t, r, n, i, a, o = !0, s = c = u.length - 1; 0 <= s; s--) 0 !== u[s] && (r = new d(o ? u[s] : Math.abs(u[s])), n = u[s] < 0 ? "-" : "+", 0 < s && (a = new v(f), 1 < s && (i = new d(s), a = new y("^", "pow", [a, i])), r = -1 === u[s] && o ? new y("-", "unaryMinus", [a]) : 1 === Math.abs(u[s]) ? a : new y("*", "multiply", [r, a])), t = o ? r : "+" == n ? new y("+", "add", [t, r]) : new y("-", "subtract", [t, r]), o = !1);
                    return o ? new d(0) : t
                }
            }), sc = Ye("reviver", ["classes"], function (e) {
                var n = e.classes;
                return function (e, t) {
                    var r = n[t && t.mathjs];
                    return r && "function" == typeof r.fromJSON ? r.fromJSON(t) : t
                }
            }), uc = Ye("replacer", [], function () {
                return function (e, t) {
                    return "number" != typeof t || isFinite(t) && !isNaN(t) ? t : {mathjs: "number", value: String(t)}
                }
            }), cc = Math.PI, fc = 2 * Math.PI, lc = Math.E, pc = Ye("true", [], function () {
                return !0
            }), mc = Ye("false", [], function () {
                return !1
            }), hc = Ye("null", [], function () {
                return null
            }), dc = zc("Infinity", ["config", "?BigNumber"], function (e) {
                var t = e.config, e = e.BigNumber;
                return "BigNumber" === t.number ? new e(1 / 0) : 1 / 0
            }), yc = zc("NaN", ["config", "?BigNumber"], function (e) {
                var t = e.config, e = e.BigNumber;
                return "BigNumber" === t.number ? new e(NaN) : NaN
            }), gc = zc("pi", ["config", "?BigNumber"], function (e) {
                var t = e.config, e = e.BigNumber;
                return "BigNumber" === t.number ? Ha(e) : cc
            }), vc = zc("tau", ["config", "?BigNumber"], function (e) {
                var t = e.config, e = e.BigNumber;
                return "BigNumber" === t.number ? $a(e) : fc
            }), xc = zc("e", ["config", "?BigNumber"], function (e) {
                var t = e.config, e = e.BigNumber;
                return "BigNumber" === t.number ? Fa(e) : lc
            }), bc = zc("phi", ["config", "?BigNumber"], function (e) {
                var t = e.config, e = e.BigNumber;
                return "BigNumber" === t.number ? La(e) : 1.618033988749895
            }), wc = zc("LN2", ["config", "?BigNumber"], function (e) {
                var t = e.config, e = e.BigNumber;
                return "BigNumber" === t.number ? new e(2).ln() : Math.LN2
            }), Nc = zc("LN10", ["config", "?BigNumber"], function (e) {
                var t = e.config, e = e.BigNumber;
                return "BigNumber" === t.number ? new e(10).ln() : Math.LN10
            }), Mc = zc("LOG2E", ["config", "?BigNumber"], function (e) {
                var t = e.config, e = e.BigNumber;
                return "BigNumber" === t.number ? new e(1).div(new e(2).ln()) : Math.LOG2E
            }), Sc = zc("LOG10E", ["config", "?BigNumber"], function (e) {
                var t = e.config, e = e.BigNumber;
                return "BigNumber" === t.number ? new e(1).div(new e(10).ln()) : Math.LOG10E
            }), Ec = zc("SQRT1_2", ["config", "?BigNumber"], function (e) {
                var t = e.config, e = e.BigNumber;
                return "BigNumber" === t.number ? new e("0.5").sqrt() : Math.SQRT1_2
            }), Ac = zc("SQRT2", ["config", "?BigNumber"], function (e) {
                var t = e.config, e = e.BigNumber;
                return "BigNumber" === t.number ? new e(2).sqrt() : Math.SQRT2
            }), Oc = zc("i", ["Complex"], function (e) {
                return e.Complex.I
            }), Cc = Ye("PI", ["pi"], function (e) {
                return e.pi
            }), _c = Ye("E", ["e"], function (e) {
                return e.e
            }), Tc = Ye("version", [], function () {
                return "9.3.2"
            });

        function zc(e, t, r) {
            return Ye(e, t, r, {recreateOnConfigChange: !0})
        }

        var qc = _f("speedOfLight", "299792458", "m s^-1"),
            Ic = _f("gravitationConstant", "6.67430e-11", "m^3 kg^-1 s^-2"),
            Bc = _f("planckConstant", "6.62607015e-34", "J s"),
            kc = _f("reducedPlanckConstant", "1.0545718176461565e-34", "J s"),
            Dc = _f("magneticConstant", "1.25663706212e-6", "N A^-2"),
            Rc = _f("electricConstant", "8.8541878128e-12", "F m^-1"),
            Pc = _f("vacuumImpedance", "376.730313667", "ohm"), jc = _f("coulomb", "8.987551792261171e9", "N m^2 C^-2"),
            Uc = _f("elementaryCharge", "1.602176634e-19", "C"), Fc = _f("bohrMagneton", "9.2740100783e-24", "J T^-1"),
            Lc = _f("conductanceQuantum", "7.748091729863649e-5", "S"),
            Hc = _f("inverseConductanceQuantum", "12906.403729652257", "ohm"),
            $c = _f("magneticFluxQuantum", "2.0678338484619295e-15", "Wb"),
            Gc = _f("nuclearMagneton", "5.0507837461e-27", "J T^-1"), Vc = _f("klitzing", "25812.807459304513", "ohm"),
            Zc = _f("bohrRadius", "5.29177210903e-11", "m"),
            Wc = _f("classicalElectronRadius", "2.8179403262e-15", "m"),
            Jc = _f("electronMass", "9.1093837015e-31", "kg"), Yc = _f("fermiCoupling", "1.1663787e-5", "GeV^-2"),
            Xc = Tf("fineStructure", .0072973525693), Qc = _f("hartreeEnergy", "4.3597447222071e-18", "J"),
            Kc = _f("protonMass", "1.67262192369e-27", "kg"), ef = _f("deuteronMass", "3.3435830926e-27", "kg"),
            tf = _f("neutronMass", "1.6749271613e-27", "kg"),
            rf = _f("quantumOfCirculation", "3.6369475516e-4", "m^2 s^-1"),
            nf = _f("rydberg", "10973731.568160", "m^-1"), af = _f("thomsonCrossSection", "6.6524587321e-29", "m^2"),
            of = Tf("weakMixingAngle", .2229), sf = Tf("efimovFactor", 22.7),
            uf = _f("atomicMass", "1.66053906660e-27", "kg"), cf = _f("avogadro", "6.02214076e23", "mol^-1"),
            ff = _f("boltzmann", "1.380649e-23", "J K^-1"), lf = _f("faraday", "96485.33212331001", "C mol^-1"),
            pf = _f("firstRadiation", "3.7417718521927573e-16", "W m^2"),
            mf = _f("loschmidt", "2.686780111798444e25", "m^-3"),
            hf = _f("gasConstant", "8.31446261815324", "J K^-1 mol^-1"),
            df = _f("molarPlanckConstant", "3.990312712893431e-10", "J s mol^-1"),
            yf = _f("molarVolume", "0.022413969545014137", "m^3 mol^-1"), gf = Tf("sackurTetrode", -1.16487052358),
            vf = _f("secondRadiation", "0.014387768775039337", "m K"),
            xf = _f("stefanBoltzmann", "5.67037441918443e-8", "W m^-2 K^-4"),
            bf = _f("wienDisplacement", "2.897771955e-3", "m K"), wf = _f("molarMass", "0.99999999965e-3", "kg mol^-1"),
            Nf = _f("molarMassC12", "11.9999999958e-3", "kg mol^-1"), Mf = _f("gravity", "9.80665", "m s^-2"),
            Sf = _f("planckLength", "1.616255e-35", "m"), Ef = _f("planckMass", "2.176435e-8", "kg"),
            Af = _f("planckTime", "5.391245e-44", "s"), Of = _f("planckCharge", "1.87554603778e-18", "C"),
            Cf = _f("planckTemperature", "1.416785e+32", "K");

        function _f(e, n, i) {
            return Ye(e, ["config", "Unit", "BigNumber"], function (e) {
                var t = e.config, r = e.Unit, e = e.BigNumber,
                    e = new r("BigNumber" === t.number ? new e(n) : parseFloat(n), i);
                return e.fixPrefix = !0, e
            })
        }

        function Tf(e, r) {
            return Ye(e, ["config", "BigNumber"], function (e) {
                var t = e.config, e = e.BigNumber;
                return "BigNumber" === t.number ? new e(r) : r
            })
        }

        var zf = Ye("apply", ["typed", "isInteger"], function (e) {
            var t = e.typed, e = e.isInteger, r = gr({typed: t, isInteger: e});
            return t("apply", {
                "...any": function (e) {
                    var t = e[1];
                    M(t) ? e[1] = t - 1 : I(t) && (e[1] = t.minus(1));
                    try {
                        return r.apply(null, e)
                    } catch (e) {
                        throw ss(e)
                    }
                }
            })
        }, {isTransformFunction: !0}), qf = Ye("column", ["typed", "Index", "matrix", "range"], function (e) {
            var t = e.typed, r = e.Index, n = e.matrix, e = e.range, i = Rn({typed: t, Index: r, matrix: n, range: e});
            return t("column", {
                "...any": function (e) {
                    var t = e.length - 1, r = e[t];
                    M(r) && (e[t] = r - 1);
                    try {
                        return i.apply(null, e)
                    } catch (e) {
                        throw ss(e)
                    }
                }
            })
        }, {isTransformFunction: !0});

        function If(e, t, r) {
            var n = e.filter(function (e) {
                return pe(e) && !(e.name in t) && !(e.name in r)
            })[0];
            if (!n) throw new Error('No undefined variable found in inline expression "' + e + '"');
            var i = n.name, a = Object.create(r), o = e.compile();
            return function (e) {
                return a[i] = e, o.evaluate(a)
            }
        }

        var Bf = Ye("filter", ["typed"], function (e) {
            e = e.typed;

            function t(e, t, r) {
                var n, i;
                return e[0] && (n = e[0].compile().evaluate(r)), e[1] && (i = pe(e[1]) || k(e[1]) ? e[1].compile().evaluate(r) : If(e[1], t, r)), a(n, i)
            }

            t.rawArgs = !0;
            var a = e("filter", {
                "Array, function": kf, "Matrix, function": function (e, t) {
                    return e.create(kf(e.toArray(), t))
                }, "Array, RegExp": De, "Matrix, RegExp": function (e, t) {
                    return e.create(De(e.toArray(), t))
                }
            });
            return t
        }, {isTransformFunction: !0});

        function kf(e, n) {
            var i = $n(n);
            return ke(e, function (e, t, r) {
                return 1 === i ? n(e) : 2 === i ? n(e, [t + 1]) : n(e, [t + 1], r)
            })
        }

        var Df = Ye("forEach", ["typed"], function (e) {
            e = e.typed;

            function t(e, t, r) {
                var n, i;
                return e[0] && (n = e[0].compile().evaluate(r)), e[1] && (i = pe(e[1]) || k(e[1]) ? e[1].compile().evaluate(r) : If(e[1], t, r)), a(n, i)
            }

            t.rawArgs = !0;
            var a = e("forEach", {
                "Array | Matrix, function": function (t, i) {
                    var a = $n(i);
                    !function r(e, n) {
                        Array.isArray(e) ? Be(e, function (e, t) {
                            r(e, n.concat(t + 1))
                        }) : 1 === a ? i(e) : 2 === a ? i(e, n) : i(e, n, t)
                    }(t.valueOf(), [])
                }
            });
            return t
        }, {isTransformFunction: !0}), Rf = Ye("index", ["Index"], function (e) {
            var a = e.Index;
            return function () {
                for (var e = [], t = 0, r = arguments.length; t < r; t++) {
                    var n = arguments[t];
                    if (l(n)) n.start--, n.end -= 0 < n.step ? 0 : 2; else if (n && !0 === n.isSet) n = n.map(function (e) {
                        return e - 1
                    }); else if (x(n) || E(n)) n = n.map(function (e) {
                        return e - 1
                    }); else if (M(n)) n--; else if (I(n)) n = n.toNumber() - 1; else if ("string" != typeof n) throw new TypeError("Dimension must be an Array, Matrix, number, string, or Range");
                    e[t] = n
                }
                var i = new a;
                return a.apply(i, e), i
            }
        }, {isTransformFunction: !0}), Pf = Ye("map", ["typed"], function (e) {
            e = e.typed;

            function t(e, t, r) {
                var n, i;
                return e[0] && (n = e[0].compile().evaluate(r)), e[1] && (i = pe(e[1]) || k(e[1]) ? e[1].compile().evaluate(r) : If(e[1], t, r)), a(n, i)
            }

            t.rawArgs = !0;
            var a = e("map", {
                "Array, function": function (e, t) {
                    return jf(e, t, e)
                }, "Matrix, function": function (e, t) {
                    return e.create(jf(e.valueOf(), t, e))
                }
            });
            return t
        }, {isTransformFunction: !0});

        function jf(e, t, i) {
            var a = $n(t);
            return function r(e, n) {
                return Array.isArray(e) ? Ie(e, function (e, t) {
                    return r(e, n.concat(t + 1))
                }) : 1 === a ? t(e) : 2 === a ? t(e, n) : t(e, n, i)
            }(e, [])
        }

        function Uf(e) {
            var t;
            return 2 === e.length && d(e[0]) && (M(t = (e = e.slice())[1]) ? e[1] = t - 1 : I(t) && (e[1] = t.minus(1))), e
        }

        var Ff = Ye("max", ["typed", "config", "numeric", "larger"], function (e) {
                var t = e.typed, r = e.config, n = e.numeric, e = e.larger,
                    i = ka({typed: t, config: r, numeric: n, larger: e});
                return t("max", {
                    "...any": function (e) {
                        e = Uf(e);
                        try {
                            return i.apply(null, e)
                        } catch (e) {
                            throw ss(e)
                        }
                    }
                })
            }, {isTransformFunction: !0}), Lf = Ye("mean", ["typed", "add", "divide"], function (e) {
                var t = e.typed, r = e.add, e = e.divide, n = wu({typed: t, add: r, divide: e});
                return t("mean", {
                    "...any": function (e) {
                        e = Uf(e);
                        try {
                            return n.apply(null, e)
                        } catch (e) {
                            throw ss(e)
                        }
                    }
                })
            }, {isTransformFunction: !0}), Hf = Ye("min", ["typed", "config", "numeric", "smaller"], function (e) {
                var t = e.typed, r = e.config, n = e.numeric, e = e.smaller,
                    i = Da({typed: t, config: r, numeric: n, smaller: e});
                return t("min", {
                    "...any": function (e) {
                        e = Uf(e);
                        try {
                            return i.apply(null, e)
                        } catch (e) {
                            throw ss(e)
                        }
                    }
                })
            }, {isTransformFunction: !0}),
            $f = Ye("range", ["typed", "config", "?matrix", "?bignumber", "smaller", "smallerEq", "larger", "largerEq"], function (e) {
                var t = e.typed, r = e.config, n = e.matrix, i = e.bignumber, a = e.smaller, o = e.smallerEq,
                    s = e.larger, e = e.largerEq, u = oi({
                        typed: t,
                        config: r,
                        matrix: n,
                        bignumber: i,
                        smaller: a,
                        smallerEq: o,
                        larger: s,
                        largerEq: e
                    });
                return t("range", {
                    "...any": function (e) {
                        return "boolean" != typeof e[e.length - 1] && e.push(!0), u.apply(null, e)
                    }
                })
            }, {isTransformFunction: !0}), Gf = Ye("row", ["typed", "Index", "matrix", "range"], function (e) {
                var t = e.typed, r = e.Index, n = e.matrix, e = e.range, i = pi({typed: t, Index: r, matrix: n, range: e});
                return t("row", {
                    "...any": function (e) {
                        var t = e.length - 1, r = e[t];
                        M(r) && (e[t] = r - 1);
                        try {
                            return i.apply(null, e)
                        } catch (e) {
                            throw ss(e)
                        }
                    }
                })
            }, {isTransformFunction: !0}), Vf = Ye("subset", ["typed", "matrix"], function (e) {
                var t = e.typed, e = e.matrix, r = Mi({typed: t, matrix: e});
                return t("subset", {
                    "...any": function (e) {
                        try {
                            return r.apply(null, e)
                        } catch (e) {
                            throw ss(e)
                        }
                    }
                })
            }, {isTransformFunction: !0}), Zf = Ye("concat", ["typed", "matrix", "isInteger"], function (e) {
                var t = e.typed, r = e.matrix, e = e.isInteger, n = Dn({typed: t, matrix: r, isInteger: e});
                return t("concat", {
                    "...any": function (e) {
                        var t = e.length - 1, r = e[t];
                        M(r) ? e[t] = r - 1 : I(r) && (e[t] = r.minus(1));
                        try {
                            return n.apply(null, e)
                        } catch (e) {
                            throw ss(e)
                        }
                    }
                })
            }, {isTransformFunction: !0}),
            Wf = Ye("diff", ["typed", "matrix", "subtract", "number", "bignumber"], function (e) {
                var t = e.typed, r = e.matrix, n = e.subtract, i = e.number, e = e.bignumber,
                    a = ti({typed: t, matrix: r, subtract: n, number: i, bignumber: e});
                return t("diff", {
                    "...any": function (e) {
                        e = Uf(e);
                        try {
                            return a.apply(null, e)
                        } catch (e) {
                            throw ss(e)
                        }
                    }
                })
            }, {isTransformFunction: !0}), Jf = Ye("std", ["typed", "sqrt", "variance"], function (e) {
                var t = e.typed, r = e.sqrt, e = e.variance, n = Au({typed: t, sqrt: r, variance: e});
                return t("std", {
                    "...any": function (e) {
                        e = Uf(e);
                        try {
                            return n.apply(null, e)
                        } catch (e) {
                            throw ss(e)
                        }
                    }
                })
            }, {isTransformFunction: !0}), Yf = Ye("sum", ["typed", "config", "add", "numeric"], function (e) {
                var t = e.typed, r = e.config, n = e.add, e = e.numeric, i = bu({typed: t, config: r, add: n, numeric: e});
                return t("sum", {
                    "...any": function (e) {
                        e = Uf(e);
                        try {
                            return i.apply(null, e)
                        } catch (e) {
                            throw ss(e)
                        }
                    }
                })
            }, {isTransformFunction: !0}),
            Xf = Ye("variance", ["typed", "add", "subtract", "multiply", "divide", "apply", "isNaN"], function (e) {
                var t = e.typed, r = e.add, n = e.subtract, i = e.multiply, a = e.divide, o = e.apply, e = e.isNaN,
                    s = Su({typed: t, add: r, subtract: n, multiply: i, divide: a, apply: o, isNaN: e});
                return t("variance", {
                    "...any": function (e) {
                        e = Uf(e);
                        try {
                            return s.apply(null, e)
                        } catch (e) {
                            throw ss(e)
                        }
                    }
                })
            }, {isTransformFunction: !0}), a = r(10), Qf = r.n(a);

        function Kf(e) {
            return (Kf = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function el(u, e, c, f) {
            function s(e, t, r) {
                var n, i, a, o;
                if (r.wrap && "function" == typeof t && ((o = t).transform && (s.transform = o.transform), t = s), "function" == typeof t && "string" == typeof t.signature && (t = u(e, (n = {}, i = t.signature, a = t, i in n ? Object.defineProperty(n, i, {
                    value: a,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : n[i] = a, n))), m(c[e]) && m(t)) return t = r.override ? u(e, t.signatures) : u(c[e], t), c[e] = t, delete f[e], l(e, t), c.emit("import", e, function () {
                    return t
                }), 0;

                function s() {
                    for (var e = [], t = 0, r = arguments.length; t < r; t++) {
                        var n = arguments[t];
                        e[t] = n && n.valueOf()
                    }
                    return o.apply(c, e)
                }

                if (void 0 === c[e] || r.override) return c[e] = t, delete f[e], l(e, t), c.emit("import", e, function () {
                    return t
                }), 0;
                if (!r.silent) throw new Error('Cannot import "' + e + '": already exists')
            }

            function l(e, t) {
                t && "function" == typeof t.transform ? (c.expression.transform[e] = t.transform, r(e) && (c.expression.mathWithTransform[e] = t.transform)) : (delete c.expression.transform[e], r(e) && (c.expression.mathWithTransform[e] = t))
            }

            function p(e) {
                delete c.expression.transform[e], r(e) ? c.expression.mathWithTransform[e] = c[e] : delete c.expression.mathWithTransform[e]
            }

            function m(e) {
                return "function" == typeof e && "object" === Kf(e.signatures)
            }

            function r(e) {
                return !We(t, e)
            }

            function h(e) {
                return !(-1 !== e.fn.indexOf(".") || We(t, e.fn) || e.meta && e.meta.isClass)
            }

            function d(e) {
                return void 0 !== e && void 0 !== e.meta && !0 === e.meta.isTransformFunction
            }

            var t = {expression: !0, type: !0, docs: !0, error: !0, json: !0, chain: !0};
            return function (e, a) {
                var t = arguments.length;
                if (1 !== t && 2 !== t) throw new ui("import", t, 1, 2);
                a = a || {};
                var r, n, i = {};
                for (r in function t(r, e, n) {
                    if (Array.isArray(e)) e.forEach(function (e) {
                        return t(r, e)
                    }); else if ("object" === Kf(e)) for (var i in e) We(e, i) && t(r, e[i], i); else if (Xe(e) || void 0 !== n) {
                        if (n = Xe(e) ? d(e) ? e.fn + ".transform" : e.fn : n, We(r, n) && r[n] !== e && !a.silent) throw new Error('Cannot import "' + n + '" twice');
                        r[n] = e
                    } else if (!a.silent) throw new TypeError("Factory, Object, or Array expected")
                }(i, e), i) if (We(i, r)) {
                    var o = i[r];
                    if (Xe(o)) !function (r, n, e) {
                        var i = 2 < arguments.length && void 0 !== e ? e : r.fn;
                        if (Fe(i, ".")) throw new Error("Factory name should not contain a nested path. Name: " + JSON.stringify(i));
                        var t = d(r) ? c.expression.transform : c, a = i in c.expression.transform,
                            o = We(t, i) ? t[i] : void 0, e = function () {
                                var t = {};
                                r.dependencies.map(Qe).forEach(function (e) {
                                    if (Fe(e, ".")) throw new Error("Factory dependency should not contain a nested path. Name: " + JSON.stringify(e));
                                    "math" === e ? t.math = c : "mathWithTransform" === e ? t.mathWithTransform = c.expression.mathWithTransform : "classes" === e ? t.classes = c : t[e] = c[e]
                                });
                                var e = r(t);
                                if (e && "function" == typeof e.transform) throw new Error('Transforms cannot be attached to factory functions. Please create a separate function for it with exports.path="expression.transform"');
                                if (void 0 === o || n.override) return e;
                                if (m(o) && m(e)) return u(o, e);
                                if (n.silent) return o;
                                throw new Error('Cannot import "' + i + '": already exists')
                            };
                        r.meta && !1 === r.meta.lazy ? t[i] = e() : Ze(t, i, e), o && a ? p(i) : (d(r) || h(r)) && Ze(c.expression.mathWithTransform, i, function () {
                            return t[i]
                        }), f[i] = r, c.emit("import", i, e)
                    }(o, a); else if ("function" == typeof (n = o) || "number" == typeof n || "string" == typeof n || "boolean" == typeof n || null === n || W(n) || Z(n) || I(n) || w(n) || E(n) || Array.isArray(n)) s(r, o, a); else if (!a.silent) throw new TypeError("Factory, Object, or Array expected")
                }
            }
        }

        var tl = {epsilon: 1e-12, matrix: "Matrix", number: "number", precision: 64, predictable: !1, randomSeed: null},
            rl = ["Matrix", "Array"], nl = ["number", "BigNumber", "Fraction"];

        function il(e, t, r) {
            var n;
            void 0 !== e[t] && (n = e[t], -1 === r.indexOf(n)) && console.warn('Warning: Unknown value "' + e[t] + '" for configuration option "' + t + '". Available options: ' + r.map(function (e) {
                return JSON.stringify(e)
            }).join(", ") + ".")
        }

        function al() {
            return (al = Object.assign || function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r, n = arguments[t];
                    for (r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            }).apply(this, arguments)
        }

        t.default = function e(t, r) {
            var n = al({}, tl, r);
            if ("function" != typeof Object.create) throw new Error("ES5 not supported by this JavaScript engine. Please load the es5-shim and es5-sham library for compatibility.");
            var i, a, o, s = (i = {
                isNumber: M,
                isComplex: Z,
                isBigNumber: I,
                isFraction: w,
                isUnit: W,
                isString: S,
                isArray: x,
                isMatrix: E,
                isCollection: d,
                isDenseMatrix: g,
                isSparseMatrix: b,
                isRange: l,
                isIndex: A,
                isBoolean: p,
                isResultSet: m,
                isHelp: h,
                isFunction: y,
                isDate: v,
                isRegExp: N,
                isObject: O,
                isNull: C,
                isUndefined: _,
                isAccessorNode: ue,
                isArrayNode: T,
                isAssignmentNode: z,
                isBlockNode: q,
                isConditionalNode: B,
                isConstantNode: ce,
                isFunctionAssignmentNode: k,
                isFunctionNode: fe,
                isIndexNode: D,
                isNode: R,
                isObjectNode: P,
                isOperatorNode: le,
                isParenthesisNode: j,
                isRangeNode: U,
                isSymbolNode: pe,
                isChain: F
            }, r = new Qf.a, i.on = r.on.bind(r), i.off = r.off.bind(r), i.once = r.once.bind(r), i.emit = r.emit.bind(r), i);

            function u(e) {
                if (e) {
                    var t = $e(a, He);
                    il(e, "matrix", rl), il(e, "number", nl), function e(t, r) {
                        if (Array.isArray(r)) throw new TypeError("Arrays are not supported by deepExtend");
                        for (var n in r) if (We(r, n) && !(n in Object.prototype) && !(n in Function.prototype)) if (r[n] && r[n].constructor === Object) void 0 === t[n] && (t[n] = {}), t[n] && t[n].constructor === Object ? e(t[n], r[n]) : t[n] = r[n]; else {
                            if (Array.isArray(r[n])) throw new TypeError("Arrays are not supported by deepExtend");
                            t[n] = r[n]
                        }
                        return t
                    }(a, e);
                    var r = $e(a, He), e = $e(e, He);
                    return o("config", r, t, e), r
                }
                return $e(a, He)
            }

            s.config = (a = n, o = s.emit, u.MATRIX_OPTIONS = rl, u.NUMBER_OPTIONS = nl, Object.keys(tl).forEach(function (e) {
                Object.defineProperty(u, e, {
                    get: function () {
                        return a[e]
                    }, enumerable: !0, configurable: !0
                })
            }), u), s.expression = {transform: {}, mathWithTransform: {config: s.config}};
            var c = {}, f = el(function () {
                for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                return s.typed.apply(s.typed, t)
            }, 0, s, c);
            return s.import = f, s.on("config", function () {
                Je(c).forEach(function (e) {
                    e && e.meta && e.meta.recreateOnConfigChange && f(e, {override: !0})
                })
            }), s.create = e.bind(null, t), s.factory = Ye, s.import(Je((function e(t, r) {
                for (var n in t) {
                    var i;
                    We(t, n) && ("object" === Le(i = t[n]) && null !== i ? e(i, r) : r[n] = i)
                }
            }(t, t = {}), t))), s.ArgumentsError = ui, s.DimensionError = we, s.IndexError = Ne, s
        }(n)
    }], i.c = n, i.d = function (e, t, r) {
        i.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: r})
    }, i.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
    }, i.t = function (t, e) {
        if (1 & e && (t = i(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var r = Object.create(null);
        if (i.r(r), Object.defineProperty(r, "default", {
            enumerable: !0,
            value: t
        }), 2 & e && "string" != typeof t) for (var n in t) i.d(r, n, function (e) {
            return t[e]
        }.bind(null, n));
        return r
    }, i.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return i.d(t, "a", t), t
    }, i.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, i.p = "", i(i.s = 20).default;

    function i(e) {
        if (n[e]) return n[e].exports;
        var t = n[e] = {i: e, l: !1, exports: {}};
        return r[e].call(t.exports, t, t.exports, i), t.l = !0, t.exports
    }

    var r, n
});