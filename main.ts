namespace AI {
    //% block
export function MakeNet(Inputs: number, Layers: number, Neurons: number, Outputs: number) {
    let OutputArray: number[][][] = []
    let TempArray: number[] = []
    let _var = 0
    let xednI = 0
    let value = 0
    let ArrayTemp: number[] = []
    OutputArray = []
    TempArray = []
    for (let index = 0; index < Inputs + 1; index++) {
        TempArray.push(0)
    }
    OutputArray.push([TempArray])
    for (let index = 0; index < Neurons - 1; index++) {
        OutputArray[0].push(TempArray)
    }
    TempArray = []
    for (let index = 0; index < Neurons + 1; index++) {
        TempArray.push(0)
    }
    OutputArray.push([TempArray])
    for (let index = 0; index < Layers - 1; index++) {
        for (let index = 0; index < Neurons - 1; index++) {
            OutputArray[OutputArray.length - 1].push(TempArray)
        }
    }
    OutputArray.push([TempArray])
    return OutputArray
}
export function Accuracy(Net: any[], Inputs: number, Neurons: number, Layers: number, Outputs: number, InputOutput: number[][][]) {
    let OutputArray: number[][][] = []
    let TempArray: number[] = []
    let _var = 0
    let xednI = 0
    let value = 0
    let ArrayTemp: number[] = []
    _var = 0
    for (let value2 of InputOutput) {
        for (let index6 = 0; index6 <= Outputs - 1; index6++) {
            _var += value2[1][index6] - Think(Net, value2[0], Neurons, Layers, Outputs)[index6]
        }
    }
    return _var / InputOutput.length
}
export function Mutate(Net: number[][][], Inputs: number, Neurons: number, Layers: number, Outputs: number) {
    let OutputArray: number[][][] = []
    let TempArray: number[] = []
    let _var = 0
    let xednI = 0
    let value = 0
    let ArrayTemp: number[] = []
    OutputArray = MakeNet(Inputs, Neurons, Layers, Outputs)
    for (let index7 = 0; index7 <= Neurons - 1; index7++) {
        xednI = 0
        for (let index = 0; index < Inputs + 1; index++) {
            OutputArray[0][index7][xednI] = Math.constrain((Net[0][index7][xednI] * 100 + randint(-10, 10)) / 100, 0, 1)
            xednI += 1
        }
    }
    value = 1
    for (let index = 0; index < Layers - 1; index++) {
        for (let index9 = 0; index9 <= Neurons - 1; index9++) {
            xednI = 0
            for (let index = 0; index < Neurons + 1; index++) {
                OutputArray[value][index9][xednI] = Math.constrain((Net[value][index9][xednI] * 100 + randint(-10, 10)) / 100, 0, 1)
                xednI += 1
            }
        }
        value += 1
    }
    for (let index10 = 0; index10 <= Outputs - 1; index10++) {
        xednI = 0
        for (let index = 0; index < Neurons + 1; index++) {
            OutputArray[value][index10][xednI] = Math.constrain((Net[value][index10][xednI] * 100 + randint(-10, 10)) / 100, 0, 1)
            xednI += 1
        }
    }
    return OutputArray
}
export function Think(Net: number[][][], Inputs: number[], Neurons: number, Layers: number, Outputs: number) {
    let OutputArray: number[][][] = []
    let TempArray: number[] = []
    let _var = 0
    let xednI = 0
    let value = 0
    let ArrayTemp: number[] = []
    TempArray = [0]
    for (let index = 0; index < Inputs.length; index++) {
        TempArray.push(0)
    }
    for (let index12 = 0; index12 <= Neurons - 1; index12++) {
        for (let value3 of Inputs) {
            TempArray[index12] = TempArray[index12] + Net[0][index12][Inputs.indexOf(value3) + 1] * value3
        }
        TempArray[index12] = Math.constrain(TempArray[index12] + Net[0][index12][0], 0, 1)
    }
    ArrayTemp = []
    for (let index = 0; index < Neurons; index++) {
        ArrayTemp.push(0)
    }
    xednI = 1
    for (let index = 0; index < Layers - 1; index++) {
        for (let index15 = 0; index15 <= Neurons - 1; index15++) {
            for (let value4 of TempArray) {
                ArrayTemp[index15] = ArrayTemp[index15] + Net[xednI][index15][TempArray.indexOf(value4) + 1] * value4
            }
            ArrayTemp[index15] = Math.constrain(ArrayTemp[index15] + Net[xednI][index15][0], 0, 1)
        }
        TempArray = ArrayTemp
        ArrayTemp = [0]
        for (let index = 0; index < Neurons; index++) {
            ArrayTemp.push(0)
        }
        xednI += 1
    }
    ArrayTemp = [0]
    for (let index = 0; index < Outputs - 1; index++) {
        ArrayTemp.push(0)
    }
    for (let index18 = 0; index18 <= Outputs - 1; index18++) {
        for (let value5 of TempArray) {
            ArrayTemp[index18] = ArrayTemp[index18] + Net[xednI][index18][TempArray.indexOf(value5) + 1] * value5
        }
        ArrayTemp[index18] = Math.constrain(ArrayTemp[index18] + Net[xednI][index18][0], 0, 1)
    }
    return ArrayTemp
}
}