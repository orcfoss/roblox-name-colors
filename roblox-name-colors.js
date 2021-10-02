/** The base name color palette. */
var basePalette = [
    { red: 107, green: 50,  blue: 124, describer: "purple" },
    { red: 218, green: 133, blue: 65,  describer: "orange" },
    { red: 245, green: 205, blue: 48,  describer: "yellow" },
    { red: 232, green: 186, blue: 200, describer: "purple" },
    { red: 215, green: 197, blue: 154, describer: "tan"    }
]

/** The modern name color palette (2014+). */
var modernPalette = [
    { red: 253, green: 41,  blue: 67,  describer: "red"   },
    { red: 1,   green: 162, blue: 255, describer: "blue"  },
    { red: 2,   green: 184, blue: 87,  describer: "green" },
    ... basePalette
]

/** The older name color palette (2006-2014). */
var oldPalette = [
    { red: 196, green: 40,  blue: 28,  describer: "red"   },
    { red: 13,  green: 105, blue: 172, describer: "blue"  },
    { red: 39,  green: 70,  blue: 45,  describer: "green" },
    ... basePalette
]

/**
 * A modulus function, in accordance with Lua spec.
 *
 * @param {number} a
 * @param {number} b
 * 
 * @returns {number} Modulo of a and b.
 */
function mod(a, b) { 
    return (a - Math.floor(a / b) * b)
}

/**
 * Converts a name color to a hexadecimal value.
 *
 * @param {array} color Computed name color array with "red", "green", and "blue" keys.
 *
 * @returns {string} Computed name color hex code.
 */
function hex(color) {
    return ((1 << 24) + (color.red << 16) + (color.green << 8) + color.blue).toString(16).slice(1)
}

/**
 * Computes a name color.
 *
 * @param {string} text Text to compute a name color of.
 * @param {boolean} [rgb=true] Whether to return the color represented as an array with "red", "green", and "blue" keys, or to return it as a hexadecimal color code.
 * @param {boolean} [useModernPalette=true] Whether to use the modern color palette.
 * 
 * @returns {string} Computed name color.
 */
function compute(text, rgb = true, useModernPalette = true) {
    let palette = (useModernPalette ? modernPalette : oldPalette)

    let val = 0
    for (let i = 0; i < text.length; i++) {
        let cv = text.charCodeAt(i)
        let ri = text.length - i

        if (mod(text.length, 2) == 1) {
            ri--
        }

        if (mod(ri, 4) >= 2) {
            cv = -cv
        }

        val += cv
    }
    
    let color = palette[mod(val, palette.length)]
    return rgb ? color : hex(color)
}

/**
 * Finds a color in the name color palette by a short description (i.e. "modern bright red".)
 * 
 * @param {string} describer Short description of the color.
 * @param {boolean} [rgb=true] Whether to return the color in an array with "red", "green", and "blue" keys. If this is false, it will return the color represented as a hexadecimal color code.
 * @param {(undefined|boolean)} [useModernPalette=undefined] Whether to use the modern color palette. If implicitly specified, this will override the describer when it comes to determening which palette to use.
 * 
 * @returns {(array|string|boolean)} Returns the color, if found, in a RGB array or a hex color code (depending on rgb.) If a color couldn't be found, returns false.
 */
function describedBy(describer, rgb = true, useModernPalette = undefined) {
    describer = describer.toLowerCase()
    
    let palette
    if (useModernPalette === null) {
        // Auto-determine
        palette = describer.includes("old") ? oldPalette : modernPalette
    } else if (useModernPalette === false) {
        // Old palette
        palette = oldPalette
    } else {
        // New palette
        palette = modernPalette
    }

    let found = false
    for (let i = 0; i < palette.length; i++) {
        if (found) break
        
        let split = describer.split(" ")
        for (let j = 0; j < split.length; j++) {
            if (palette[i]["describer"].includes(split[j])) {
                found = palette[i]
                break
            }
        }
    }
    
    return found ? (rgb ? found : hex(found)) : false
}

module.exports = {
    compute,
    describedBy
}