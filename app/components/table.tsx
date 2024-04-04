import { DIN, SKIER_WEIGHTS, SKIER_HEIGHTS, BOOT_LENGTHS } from '../constants';

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

export default function Table() {
    const offset = SKIER_WEIGHTS.length - SKIER_HEIGHTS.length

    // Defined a header of cells to use in the grid
    let cells = [
        <div key="weight-header" className="text-md font-bold">Weight (kg)</div>,
        <div key="height-header" className="text-md font-bold">Height (cm)</div>,
        <div key="skier-header" className="text-md font-bold">Skier Code</div>,
        <div key="lenght-header" className="text-md font-bold col-span-8">Boot Length (mm)</div>,
        <div key="padding-subheader" className="col-start-3"></div>
    ];

    // Add the boot lengths
    for (let i = 0; i < BOOT_LENGTHS.length; i++) {
        let len = BOOT_LENGTHS[i]
        cells.push(<div key={keyString(-1, i)} className="text-xs font-thin tracking-tighter">{ intervalString(len) }</div>)
    }


    for (let i = 0; i < SKIER_WEIGHTS.length; i++) {
        let weight = SKIER_WEIGHTS[i]
        cells.push(<div key={keyString(i, -3)} className="text-xs font-thin tracking-tighter">{ intervalString(weight) }</div>)
        cells.push(<div key={keyString(i, -2)} className="text-xs font-thin tracking-tighter">{ i > offset ? intervalString(SKIER_HEIGHTS[i-offset]) : "" }</div>)
        cells.push(<div key={keyString(i, -1)}className="text-md font-semibold">{ weight.code }</div>)

        for (let j = 0; j < BOOT_LENGTHS.length; j++) {
            let len = BOOT_LENGTHS[j]
            cells.push(
                <div key={keyString(i, j)} className="font-light tracking-tight">
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
