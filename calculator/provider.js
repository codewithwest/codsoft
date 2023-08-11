class Calculator {
    add(a, b) {
        return a + b
    }
    sub(a, b) {
        return a - b
    }
    mult(a, b) {
        return a * b
    }
    div(a, b) {
        return a / b
    }

    percent(a, b) {
        return a / 100 * b
    }
    exp(a, b) {
        return a ** b
    }


}

export { Calculator }