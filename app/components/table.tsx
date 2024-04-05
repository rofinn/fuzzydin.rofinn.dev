import { DIN, SKIER_WEIGHTS, SKIER_HEIGHTS, BOOT_LENGTHS } from '../constants';
import { Results } from '../types';

function keyString(i: number, j: number) {
    return i.toString() + " - " + j.toString()
}

function intervalString(interval: { code: any, lo: number, hi: number}) {
    if (interval.hi == 1000) {
        return interval.lo.toString() + " +";
    } else {
        return interval.lo.toString() + "-" + interval.hi.toString();
    }
}

type Props = { results: Results; }

export default function Table(props: Props) {
    const offset = SKIER_WEIGHTS.length - SKIER_HEIGHTS.length

    // Defined a header of cells to use in the grid
    let cells = [
        <div key="weight-header" className="text-md font-bold p-2">Weight (kg)</div>,
        <div key="height-header" className="text-md font-bold p-2">Height (cm)</div>,
        <div key="skier-header" className="text-md font-bold p-2">Skier Code</div>,
        <div key="lenght-header" className="text-md font-bold p-2 col-span-8">Boot Length (mm)</div>,
        <div key="padding-subheader" className="col-start-3"></div>
    ];

    // Add the boot lengths
    for (let i = 0; i < BOOT_LENGTHS.length; i++) {
        let len = BOOT_LENGTHS[i]
        let idx = props.results.boot.codes.findIndex(code => code == len.code)
        let className = "text-xs font-thin tracking-tighter px-2"

        if (idx >= 0) {
            let weight = props.results.boot.weights[idx]
            if (weight <= 0.25) {
                className = "rounded text-xs font-light bg-gray-300 text-white px-2"
            } else if (weight <= 0.5) {
                className = "rounded text-xs font-medium bg-gray-400 text-white px-2"
            } else if (weight <= 0.75) {
                className = "rounded text-xs font-medium bg-gray-500 text-white px-2"
            } else {
                className = "rounded text-xs font-medium bg-gray-700 text-white px-2"
            }
        }
        cells.push(<div key={keyString(-1, i)} className={className}>{ intervalString(len) }</div>)
    }


    for (let i = 0; i < SKIER_WEIGHTS.length; i++) {
        let weight = SKIER_WEIGHTS[i]
        cells.push(<div key={keyString(i, -3)} className="text-xs font-thin tracking-tighter">{ intervalString(weight) }</div>)
        cells.push(<div key={keyString(i, -2)} className="text-xs font-thin tracking-tighter">{ i > offset ? intervalString(SKIER_HEIGHTS[i-offset]) : "" }</div>)

        let widx = props.results.skier.codes.findIndex(code => code == weight.code)
        let wClassName = "text-md font-semibold px-2"
        if (widx >= 0) {
            let weight = props.results.skier.weights[widx]
            if (weight <= 0.25) {
                wClassName = "rounded text-md font-light bg-gray-300 text-white"
            } else if (weight <= 0.5) {
                wClassName = "rounded text-md font-medium bg-gray-400 text-white"
            } else if (weight <= 0.75) {
                wClassName = "rounded text-md font-medium bg-gray-500 text-white"
            } else {
                wClassName = "rounded text-md font-medium bg-gray-700 text-white"
            }
        }

        cells.push(<div key={keyString(i, -1)} className={wClassName}>{ weight.code }</div>)

        for (let j = 0; j < BOOT_LENGTHS.length; j++) {
            let len = BOOT_LENGTHS[j]
            let lidx = props.results.boot.codes.findIndex(code => code == len.code)
            let className = "font-light tracking-tight"
            if (widx >= 0 && lidx >= 0){
                let weight = props.results.skier.weights[widx] * props.results.boot.weights[lidx]
                if (weight <= 0.25) {
                    className = "rounded text-md font-light tracking-tight bg-gray-300 text-white"
                } else if (weight <= 0.5) {
                    className = "rounded text-md font-medium tracking-tight bg-gray-400 text-white"
                } else if (weight <= 0.75) {
                    className = "rounded text-md font-medium tracking-tight bg-gray-500 text-white"
                } else {
                    className = "rounded text-md font-medium tracking-tight bg-gray-700 text-white"
                }
            }
            cells.push(
                <div key={keyString(i, j)} className={className}>
                    { len.code in DIN[weight.code] ? DIN[weight.code][len.code].toString() : "" }
                </div>
            )
        }
    }
    return (
        <div className="grid grid-cols-[repeat(11,max-content)] gap-2 text-center text-2xs lg:text-xs xl:text-sm overflow-auto">
            {cells}
        </div>
    );
}
