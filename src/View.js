import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'

const { div, pre, h1 } = hh(h)

function view(dispatch, model) {
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
            pre({ className: 'pre truncate' }, JSON.stringify(model, null, 4)),
        ]
    )
}

export default view
