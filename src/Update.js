import * as R from 'ramda'

const MSGS = {
    OG_INPUT: 'OG_INPUT',
    FG_INPUT: 'FG_INPUT',
    FORMULA_CHANGE: 'FORMULA_CHANGE',
}

export function ogInputMsg(originalGravity) {
    return {
        type: MSGS.OG_INPUT,
        originalGravity,
    }
}

export function fgInputMsg(finalGravity) {
    return {
        type: MSGS.FG_INPUT,
        finalGravity,
    }
}

export function formulaChangeMsg(useStandardFormula) {
    return {
        type: MSGS.FORMULA_CHANGE,
        useStandardFormula,
    }
}

const toFloat = R.pipe(parseFloat, R.defaultTo(0.0))

function standardFormula(og, fg) {
    const [original, final] = [toFloat(og), toFloat(fg)]
    return ((original - final) * 131.25).toFixed(3) + '%'
}

function alternateFormula(og, fg) {
    const [original, final] = [toFloat(og), toFloat(fg)]
    return (
        (
            76.08 *
            (original - final) /
            (1.775 - original) *
            (final / 0.794)
        ).toFixed(3) + '%'
    )
}

const toValidFloat = function(val) {
    if (!isNaN(parseFloat(val)) && parseFloat(val) != null) {
        return val
    }
    return 0.0
}

export default function update(msg, model) {
    switch (msg.type) {
        case MSGS.OG_INPUT: {
            const originalGravity = toValidFloat(msg.originalGravity)
            const { finalGravity, useStandardFormula } = model

            const abv = useStandardFormula
                ? standardFormula(originalGravity, finalGravity)
                : alternateFormula(originalGravity, finalGravity)

            return {
                ...model,
                originalGravity,
                abv,
            }
        }
        case MSGS.FG_INPUT: {
            const finalGravity = toValidFloat(msg.finalGravity)
            const { originalGravity, useStandardFormula } = model

            const abv = useStandardFormula
                ? standardFormula(originalGravity, finalGravity)
                : alternateFormula(originalGravity, finalGravity)

            return {
                ...model,
                finalGravity,
                abv,
            }
        }
        case MSGS.FORMULA_CHANGE: {
            const { useStandardFormula } = msg
            const { originalGravity, finalGravity } = model

            const abv = useStandardFormula
                ? standardFormula(originalGravity, finalGravity)
                : alternateFormula(originalGravity, finalGravity)

            return {
                ...model,
                useStandardFormula,
                abv,
            }
        }
        default: {
            const { originalGravity, finalGravity, useStandardFormula } = model
            const abv = useStandardFormula
                ? standardFormula(originalGravity, finalGravity)
                : alternateFormula(originalGravity, finalGravity)

            return {
                ...model,
                abv,
            }
        }
    }
}
