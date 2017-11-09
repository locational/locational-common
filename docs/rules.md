# Rules for building Locational 

In the following list, `data` refers to larger, homogenous collections of similar objects, as distinct from _UI_state_

## Components, state and data

1. Do not observe `data` and no `data` in `state`
3. Views must observe at least 1 filter or control for the data
2. Process data outside the view


## Transducing data for display

Expect to receive a request for data, and be able to return a 

1. Cache requests if you can
2. Lazy evaluate if you can


## Charts

> "Everything is a chart - except anything that cannot be."

1. Except charts to have a unified interface for every chart type (incl. maps?)
2. Charts can take `addEventListeners` for clicks
3. Charts will be updated only when specifically called - e.g. in response to a change in an observed `filter` re-calling a `calculateChartData` function


## DataThings

- Just data. Each cell is editable as 'real' values.
- Each column/field has a `type`, a default `display` format (can be overridden)

## DataViewThings

- No 'real' data. Only computed values.
- Not necessarily the same shape as the input DataThing - can be a transformed version.
