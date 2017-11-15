import {Parser} from 'expr-eval'
import {partial} from 'lodash'

export function transform(input, pipeline) {
    const step_fns = pipeline.map(step => {
        if (step.type === 'map') {
            return {fn: map_fn(step), type: step.type}
        } else {
            let output = reduce_fn(step) as any
            output.type = step.type
            return output
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

const reduce_fn = (step) => {
    let {reducers, init, expr, output_field} = step
    if (!reducers) {
        reducers = [{init, expr, output_field}]
    }

    const parsed_expr_array = Object.freeze(reducers.map(reducer => {
        return Parser.parse(reducer.expr)
    }))

    const acc_object = reducers.reduce((reduced, reducer) => {
        reduced[reducer.output_field] = reducer.init
        return reduced
    }, {})

    return {
        fn: function (acc, line) {
            reducers.forEach((reducer, index) => {
                const parsed_expr = parsed_expr_array[index]
                const acc_vars = {'$acc': acc[reducer.output_field]}
                const vars = {...line, ...acc_vars}
                acc[reducer.output_field] = parsed_expr.evaluate(vars)
            })
            return acc
        },
        init: acc_object
    }
}
