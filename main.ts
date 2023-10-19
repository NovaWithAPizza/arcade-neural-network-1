//% color=300 weight=50 icon="\uf21e" block="Neural Network"
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
        for (let index2 = 0; index2 < Neurons - 1; index2++) {
            OutputArray[0].push(TempArray)
        }
        TempArray = []
        for (let index3 = 0; index3 < Neurons + 1; index3++) {
            TempArray.push(0)
        }
        for (let index4 = 0; index4 < Layers - 1; index4++) {
            OutputArray.push([])
            for (let index5 = 0; index5 < Neurons; index5++) {
                OutputArray[OutputArray.length - 1].push(TempArray)
            }
        }
        OutputArray.push([])
        for (let index99 = 0; index99 < Neurons; index99++) {
            OutputArray[OutputArray.length - 1].push(TempArray)
        }
        return OutputArray
    }
    //% block
    export function Accuracy(Net: any[], Inputs: number, Neurons: number, Layers: number, Outputs: number, InputOutput: number[][][]) {
        let OutputArray2: number[][][] = []
        let TempArray2: number[] = []
        let _var2 = 0
        let xednI2 = 0
        let value2 = 0
        let ArrayTemp2: number[] = []
        _var2 = 0
        for (let value22 of InputOutput) {
            for (let index6 = 0; index6 <= Outputs - 1; index6++) {
                _var2 += value22[1][index6] - Think(Net, value22[0], Neurons, Layers, Outputs)[index6]
            }
        }
        return _var2 / InputOutput.length
    }
    //% block
    export function Mutate(Net: number[][][], Inputs: number, Neurons: number, Layers: number, Outputs: number) {
        let OutputArray3: number[][][] = []
        let TempArray3: number[] = []
        let _var3 = 0
        let xednI3 = 0
        let value3 = 0
        let ArrayTemp3: number[] = []
        OutputArray3 = MakeNet(Inputs, Neurons, Layers, Outputs)
        for (let index7 = 0; index7 <= Neurons - 1; index7++) {
            xednI3 = 0
            for (let index8 = 0; index8 < Inputs + 1; index8++) {
                OutputArray3[0][index7][xednI3] = Math.constrain((Net[0][index7][xednI3] * 100 + randint(-10, 10)) / 100, 0, 1)
                xednI3 += 1
            }
        }
        value3 = 1
        for (let index9 = 0; index9 < Layers - 1; index9++) {
            for (let index92 = 0; index92 <= Neurons - 1; index92++) {
                xednI3 = 0
                for (let index10 = 0; index10 < Neurons + 1; index10++) {
                    OutputArray3[value3][index92][xednI3] = Math.constrain((Net[value3][index92][xednI3] * 100 + randint(-10, 10)) / 100, 0, 1)
                    xednI3 += 1
                }
            }
            value3 += 1
        }
        for (let index102 = 0; index102 <= Outputs - 1; index102++) {
            xednI3 = 0
            for (let index11 = 0; index11 < Neurons + 1; index11++) {
                OutputArray3[value3][index102][xednI3] = Math.constrain((Net[value3][index102][xednI3] * 100 + randint(-10, 10)) / 100, 0, 1)
                xednI3 += 1
            }
        }
        return OutputArray3
    }
    //% block
    export function Think(Net: number[][][], Inputs: number[], Neurons: number, Layers: number, Outputs: number) {
        let OutputArray4: number[][][] = []
        let TempArray4: number[] = []
        let _var4 = 0
        let xednI4 = 0
        let value4 = 0
        let ArrayTemp4: number[] = []
        TempArray4 = [0]
        for (let index12 = 0; index12 < Inputs.length; index12++) {
            TempArray4.push(0)
        }
        for (let index122 = 0; index122 <= Neurons - 1; index122++) {
            for (let value32 of Inputs) {
                TempArray4[index122] = TempArray4[index122] + Net[0][index122][Inputs.indexOf(value32) + 1] * value32
            }
            TempArray4[index122] = Math.constrain(TempArray4[index122] + Net[0][index122][0], 0, 1)
        }
        ArrayTemp4 = []
        for (let index13 = 0; index13 < Neurons; index13++) {
            ArrayTemp4.push(0)
        }
        xednI4 = 1
        for (let index14 = 0; index14 < Layers - 1; index14++) {
            for (let index15 = 0; index15 <= Neurons - 1; index15++) {
                for (let value42 of TempArray4) {
                    ArrayTemp4[index15] = ArrayTemp4[index15] + Net[xednI4][index15][TempArray4.indexOf(value42) + 1] * value42
                }
                ArrayTemp4[index15] = Math.constrain(ArrayTemp4[index15] + Net[xednI4][index15][0], 0, 1)
            }
            TempArray4 = ArrayTemp4
            ArrayTemp4 = [0]
            for (let index16 = 0; index16 < Neurons; index16++) {
                ArrayTemp4.push(0)
            }
            xednI4 += 1
        }
        ArrayTemp4 = [0]
        for (let index17 = 0; index17 < Outputs - 1; index17++) {
            ArrayTemp4.push(0)
        }
        for (let index18 = 0; index18 <= Outputs - 1; index18++) {
            for (let value5 of TempArray4) {
                ArrayTemp4[index18] = ArrayTemp4[index18] + Net[xednI4][index18][TempArray4.indexOf(value5) + 1] * value5
            }
            ArrayTemp4[index18] = Math.constrain(ArrayTemp4[index18] + Net[xednI4][index18][0], 0, 1)
        }
        return ArrayTemp4
    }
}