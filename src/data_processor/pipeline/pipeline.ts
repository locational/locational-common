import {Parser} from 'expr-eval'

export function transform(input, pipeline) {
    const step_fns = pipeline.map(step => {
        if (step.type === 'map') {
            return {fn: map_fn(step), type: step.type}
        } else {
            return console.warn('Not Implemented')
        }
    })

    return step_fns.reduce((acc, {fn, init, type}) => {
        if (type === 'map') {
            acc = acc.map(fn)
        } else if (type === 'reduce') {
            acc = [acc.reduce(fn, init)]
        }
        return acc
    }, input)
}

const map_fn = function (step) {
    const {expr, output_field} = step
    const expr_obj = Parser.parse(expr)

    return function (line) {
        line[output_field] = expr_obj.evaluate(line)
        return line
    }
}
