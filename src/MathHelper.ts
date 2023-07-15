import { Vector2 } from "./Vector2";

export class CircumCircle {
    center: Vector2;
    radius: number;
    constructor(center: Vector2, radius: number) {
        this.center = center;
        this.radius = radius;
    }
}

export class MathHelper {
    /* 
    Parabola Math
    https://www.desmos.com/calculator/7bhdnnoaz7
    */
    static calculateParabolaY(focus: Vector2, x: number, directrix: number) {
        var numer = Math.pow(x, 2)-(2*focus.x*x)+Math.pow(focus.x, 2)+Math.pow(focus.y, 2)-Math.pow(directrix, 2);
        var denom = 2*(-directrix+focus.y);
        return numer/denom;
    }

    static calculateParabolaIntersection(focusA: Vector2, focusB: Vector2, directrix: number, sign: boolean): Vector2 {
        let amd = focusA.y - directrix;
        let bmd = focusB.y - directrix;
        let _2ad = (2 * focusA.x / amd);
        let _2bd = (2 * focusB.x / bmd);
        let _1amd = 1 / amd;
        let _1bmd = 1 / bmd;
        let _ax2d = Math.pow(focusA.x, 2) / amd;
        let _ay2d = Math.pow(focusA.y, 2) / amd;
        let _d2amd = Math.pow(directrix, 2) / amd;
        let _bx2d = Math.pow(focusB.x, 2) / bmd;
        let _by2d = Math.pow(focusB.y, 2) / bmd;
        let _d2bmd = Math.pow(directrix, 2) / bmd;
        let sqrt_ = Math.sqrt(Math.pow(_2bd - _2ad, 2) - 4 * (_1amd - _1bmd) * (_ax2d + _ay2d - _d2amd - _bx2d - _by2d + _d2bmd));
        let numerA = (!sign ? sqrt_ : -sqrt_) + _2ad - _2bd;
        let denomA = 2 * (_1amd - _1bmd);
        let x = numerA / denomA;
        let y = this.calculateParabolaY(focusA, x, directrix);
        return new Vector2(x, y);
    }

    /*
    Circum Circle Math
    https://www.desmos.com/calculator/mti5rxpesg
    */
    calculateCircumCircle(p1: Vector2, p2: Vector2, p3: Vector2): CircumCircle {
        let a = p1.x, b = p1.y;
        let c = p2.x, d = p2.y;
        let i = p3.x, n = p3.y;
        let q1 = -((a - c) / (b - d));
        let q2 = -((i - c) / (n - d));
        let q3 = -((a - i) / (b - n));
        let u1 = (a + c) / 2, u2 = (b + d) / 2;
        let u5 = (a + i) / 2, u6 = (b + n) / 2;
        let x = (-u6 + u2 + u5 * q3 - u1 * q1) / (q3 - q1);
        let y = x * q1 + u2 + -u1 * q1;
        let radius = Math.sqrt(Math.pow(a - x, 2) + Math.pow(b - y, 2));
        return new CircumCircle(new Vector2(x, y), radius);
    }
}