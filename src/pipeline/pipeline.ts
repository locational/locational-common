import {Parser} from 'expr-eval'

export function transform(input, steps) {
    const step_fns = steps.map(step => {
        if (step.type === 'map') {
            return {fn: map_fn(step), type: step.type}
        } else {
            return console.warn('Not Implemented')
        }
    })

    const new_rows = step_fns.reduce((acc, {fn, init, type}) => {
        if (type === 'map') {
            acc = acc.map(fn)
        } else if (type === 'reduce') {
            acc = [acc.reduce(fn, init)]
        }
        return acc
    }, input)

    const new_columns = steps.map(step => {
        if (step.type === 'map') {
            return {
                "label": step.output_field,
                "field": step.output_field,
                "type": typeof new_rows[0][step.output_field]
            }
        }
        return false
    }).filter(a => a)


    return {
        rows: new_rows,
        new_columns,
    }
}

const map_fn = function (step) {
    const {expr, output_field} = step
    const expr_obj = Parser.parse(expr)

    return function (line) {
        line[output_field] = expr_obj.evaluate(line)
        return line
    }
}
