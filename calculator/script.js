import { Calculator } from "./provider.js"

let output,
    buttons,
    info,
    signs,
    signsObject,
    operate,
    del_one,
    history = [],
    math_tracker = [],
    numbers = []

operate = new Calculator()
for (let n = 0; n < 10; n++) {
    numbers.push(n.toString())
}
numbers.push('.')


signs = ['/', '*', '+', '-', '**']
// Select all the buttons
info = document.querySelector('.data')
buttons = document.querySelectorAll('.functional-btns')
// Select the output div
output = document.querySelector('.exp-displayer')
// back space
del_one = document.querySelector('.back-space')
del_one.addEventListener('click', (e) => {
    let output_cont = output.textContent.toString().trim()
    if (output_cont.length > 0) {
        output.textContent = output_cont.substring(0, output_cont.length - 1)
        math_tracker.pop()
    }


})

// Control the buttons

buttons.forEach(btn => {
    let output_cont = output.textContent.toString().trim()
    btn.addEventListener('click', (e) => {
        // Prevent default action
        e.preventDefault()
        // Get the btn id as value
        let btn_val = btn.id
        if (btn_val == 'root') return
        // Change btn color on click
        btn.style.background = "rgba(142, 147, 3, 0.844)"


        // check if it is an operator
        //  calc when equal sign is clickes
        if (btn_val === '=') {
            if (output.textContent.trim().length == 0
                ||
                signs.includes(math_tracker[math_tracker.length - 1])
                ||
                (signs.includes(math_tracker[math_tracker.length - 1]) &&
                    signs.includes(math_tracker[math_tracker.length - 2]))

            ) {
                setTimeout(() => btn.style.background = "inherit", 100)
                return
            }
            calculate(math_tracker)
        }
        else if (signs.includes(btn_val)) {
            if (!signs.includes(math_tracker[math_tracker.length - 1])) {
                math_tracker.push(btn_val)
                output.textContent += btn_val
            }
        } else {
            math_tracker.push(btn_val)
            output.textContent += btn_val
        }

        setTimeout(() => btn.style.background = "inherit", 100)
        if (btn_val == 'clear') {
            math_tracker = []
            output.textContent = ''
            return
        }
    })

});

function calculate(tracker_list) {
    let value = "";
    let vars = []
    let signs_ex = []

    for (let val = 0; val < tracker_list.length; val++) {
        // numbers.includes(tracker_list[val]) ? console.log(true, tracker_list[val]) : countSigns++
        if (numbers.includes(tracker_list[val]) || parseInt(tracker_list[val]) || parseFloat(tracker_list[val])) {
            value += tracker_list[val]
            console.log(value)
            if (val == tracker_list.length - 1) {
                vars.push(value.includes('.') ? parseFloat(value) : parseInt(value))
            }
        } else {
            vars.push(value.includes('.') ? parseFloat(value) : parseInt(value))
            value = ""
            signs_ex.push(tracker_list[val])
        }
        // console.log(val, tracker_list.length - 1, val == tracker_list.length - 1)
    }

    console.log("Only The Variables " + vars)
    console.log("Only The Signs " + signs_ex)
    let total = 0;


    if (signs_ex.length > 0) {
        for (let c = 0; c < signs_ex.length; c++) {
            // Get the sign at index
            let decisive_sign = signs_ex[c]
            // Check the signa and operate with match
            if (decisive_sign == '+') total = operate.add(vars[0], vars[1])
            else if (decisive_sign == '-') total = operate.sub(vars[0], vars[1])
            else if (decisive_sign == '*') total = operate.mult(vars[0], vars[1])
            else if (decisive_sign == '/') total = operate.div(vars[0], vars[1])
            else if (decisive_sign == '%') total = operate.percent(vars[0], vars[1])
            else if (decisive_sign == '**') total = operate.exp(vars[0], vars[1])
            else if (decisive_sign == 'root') total = operate.root(vars[0], vars[1])
            // if (decisive_sign == '-') total = operate.add(vars[0], vars[1])
            c > 0 ? true :
                info.appendChild(createElement(vars[0], 'p'))
            info.appendChild(createElement(decisive_sign, 'p'))
            info.appendChild(createElement(vars[1], 'p'))
            vars.splice(0, 2)
            vars.unshift(total)
        }
    } else {
        total = value.includes('.') ? parseFloat(value) : parseInt(value)
    }

    // Clean up history 
    if (history.length > 3) {
        history.pop(0)
        for (let ch = 0; ch < 6; ch++) {
            info.removeChild(info.firstChild)
        }
    } else history.push(math_tracker)

    //  Reset the calculation tracker
    math_tracker = []
    // Draw a horizonatal linee
    horizontalLine(info)
    // Append the ttal to history
    info.appendChild(createElement(total, 'h3'))
    // Write
    output.textContent += total
    horizontalLine(info)
    output.textContent = ''
    output.textContent += total
    total = total.toString()
    for (let t = 0; t < total.length; t++) {
        math_tracker.push(total[t])
    }
    console.log(math_tracker)

}

function createElement(someText, type_of_element) {
    let par = document.createElement(type_of_element)
    let variable = document.createTextNode(someText);
    par.appendChild(variable)
    return par
}
const lineBreak = (div_to_append_to) => div_to_append_to.appendChild(document.createElement('br'))
const horizontalLine = (div_to_append_to) => div_to_append_to.appendChild(document.createElement('hr'))







