import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'
import { ogInputMsg, fgInputMsg, formulaChangeMsg } from './Update'

const { div, pre, h1, h2, h3, input, label } = hh(h)

export default function view(dispatch, model) {
    return div(
        {
            className: 'w-60 center white bg-dark-gray h-100 pa2',
            style: 'overflow: auto;',
        },
        [
            h1(
                {
                    className: 'b--green bb center fw1',
                    style: 'width: fit-content;',
                },
                'FPJS ABV Calculator'
            ),
            inputForm(dispatch, model),
            resultLabel(model),
            // pre({ className: 'pre truncate' }, JSON.stringify(model, null, 4)),
        ]
    )
}

function inputForm(dispatch, model) {
    return div({ className: 'w-60 center flex flex-column' }, [
        div({ className: 'flex flex-row' }, [
            inputField(
                e => dispatch(ogInputMsg(e.target.value)),
                'Original Gravity',
                model.originalGravity
            ),
            inputField(
                e => dispatch(fgInputMsg(e.target.value)),
                'Final Gravity',
                model.finalGravity
            ),
        ]),
        div({ className: 'flex flex-row' }, formulaRadioInput(dispatch, model)),
    ])
}

function inputField(oninput, label, value) {
    return div({ className: 'pa2 w-50' }, [
        div({ className: 'f6 pb1' }, [label]),
        input({
            className: 'w-100 br3 pa1 bn',
            type: 'text',
            oninput,
            value,
        }),
    ])
}

function resultLabel(model) {
    return div(
        { className: 'w-60 center pa2 flex justify-between items-center' },
        [
            h3({ className: 'fw2' }, 'Alcohol By Volume: '),
            h2({ className: 'fw3 green' }, model.abv),
        ]
    )
}

function formulaRadioInput(dispatch, model) {
    return [
        div({ className: 'pa2 w-50' }, [
            label({ className: 'pr2', for: 'standard_choice' }, 'Standard'),
            input({
                name: 'formula_method',
                className: '',
                id: 'standard_choice',
                type: 'radio',
                checked: model.useStandardFormula === true,
                onchange: () => dispatch(formulaChangeMsg(true)),
            }),
        ]),
        div({ className: 'pa2 w-50' }, [
            label({ className: 'pr2', for: 'alternate_choice' }, 'Alternate'),
            input({
                name: 'formula_method',
                className: '',
                id: 'alternate_choice',
                type: 'radio',
                checked: model.useStandardFormula === false,
                onchange: () => dispatch(formulaChangeMsg(false)),
            }),
        ]),
    ]
}
