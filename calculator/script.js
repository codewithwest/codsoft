
let output, buttons, history, math_tracker = [], numbers, signs

numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
signs = ['/', '*', '+', '-', '%',]
buttons = document.querySelectorAll('.functional-btns')
let dummy = 'yellow + me is goo'
console.log(dummy.substring(dummy.indexOf('+'), dummy.length - 1))
output = document.querySelector('.exp-displayer')
buttons.forEach(b => {
    b.addEventListener('click', (e) => {
        e.preventDefault()
        if (b.innerHTML == '=') {
            // math_tracker.push(output.textContent.includes('.') ? parseFloat(output.textContent) : parseInt(output.textContent))
            let output_str = output.textContent
            console.log('This operator' + math_tracker[math_tracker.length - 1])
            console.log('This index' + output_str.substring(output_str.lastIndexOf(math_tracker[math_tracker.length - 1]) + 1, output_str.length))
            let las_num = output_str.substring(output_str.lastIndexOf(math_tracker[math_tracker.length - 1]) + 1, output_str.length)
            math_tracker.push(las_num.includes('.') ? parseFloat(las_num) : parseInt(las_num))
            console.log(math_tracker)
            let cleaned_str = math_tracker.join().replaceAll(',', '')
            console.log("Raw string " + cleaned_str)
            console.log("the total is " + parseInt(cleaned_str))

            for (const val in math_tracker) {
                // switch (b.textContent.toString()) {
                //     case "+":
                //         break;
                //     case "-":
                //         alert('minus')
                //         break;
                //     case "/":
                //         alert('minus')
                //         break;
                //     case "*":
                //         alert('minus')
                //         break;
                //     default:
                //         console.log('nothing')
                //         break;
                // }
            }

        }
        else {
            if (numbers.includes(b.textContent)) {
                let inputValue = b.textContent
                if (output.innerHTML.trim().length > 0) {
                    output.textContent += inputValue
                }
                else {
                    output.textContent = inputValue
                }
            } else {
                if (output.innerHTML.trim().length > 0) {
                    output.textContent += b.textContent

                    math_tracker.push(output.textContent.includes('.') ? parseFloat(output.textContent) : parseInt(output.textContent))
                    math_tracker.push(b.textContent)
                }
            }
        }
    })
})


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
    squared(a) {
        return a ** 2
    }

}



