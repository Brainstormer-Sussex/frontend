import React, { useEffect, useState, useRef, createRef } from "react";
import Scene, { inputShapes, inputCoords } from "./PolyPyramidScene.js"
import Pyramid from './Pyramid.js'
import { convert_to_pyramid_layers } from "./Logic/PolyPyramidLogic/ConvertSolutionFormat.js";
import { generate_headers, populate_problem_matrix3D, reduce_problem_matrix } from "./Logic/PolyPyramidLogic/Generate_problem_matrix3D.js";
import { create_dicts } from "./Logic/PolysphereLogic/Create_dict_objects.js";
import { solve } from "./Logic/PolysphereLogic/Solver.js";
import { shapeStore } from "./Logic/PolyPyramidLogic/Shapes3D.js";
// import { shapeStore } from "./Logic/PolyPyramidLogic/Shapes3D.js";
import { Header } from "../../components";
import ContentSection from "./content.js";
import { Button, Checkbox, Flex, Input, } from 'antd';
import { Grid, } from "@mui/material";
import { StyleProvider } from '@ant-design/cssinjs';
import "./PolyPyramidUI.css";

const maxLayerCnt = 5;
// Create a five-level pyramid
export let worker = new Pyramid(maxLayerCnt, 1.25);
const scene = new Scene();

const FPS = 30;
let uiTimer = null;
const createTimer = (func) => {
    if (uiTimer) {
        clearInterval(uiTimer);
        uiTimer = null;
    }

    uiTimer = setInterval(() => {
        func();
    }, 1000 / FPS);
}

window.onbeforeunload = () => {
    if (uiTimer) clearTimeout(uiTimer);
}

const Colours = {
    "A": 0xff0000,
    "B": 0xff0080,
    "C": 0xff99cc,
    "D": 0x0000ff,
    "E": 0xffff00,
    "F": 0xcc6699,
    "G": 0x660033,
    "H": 0x4dff4d,
    "I": 0xe65c00,
    "J": 0x006600,
    "K": 0xff9900,
    "L": 0x00bfff,
    "M": 0xfff8f0,
    "N": 0xFFC0CB,
    "O": 0x7f6065,
    "P": 0xa3c4bd,
    "Q": 0xe1f0ed,
    "R": 0xdad2b6,
    "S": 0xb6ccc5,
    "T": 0x714E8E,
    "U": 0xc6b8d1,
    "V": 0x8e714e,
    "W": 0xaeae44,
    "X": 0x516649,
    "Y": 0xcd92a3,
    "Z": 0xb3de84,
}

// Change the color value stored in matrix
// export function setSphereColor(x, y, layer, color) {
//     worker.layers[layer][x][y].color.set(color);
//     console.log("Setting up sphere colors");
//     console.log(worker.layers[layer][x][y].color);
// }

function generatePyramid() {
    console.log("generate pyramid");
    console.log("worker: ", worker)
    for (let i = 0; i < worker.layers.length; i++) {
        const spheres = worker.layers[i].matrix;
        for (let x = 0; x < worker.layers[i].size; x++) {
            for (let y = 0; y < worker.layers[i].size; y++) {
                let pos = spheres[x][y].pos;
                let color = spheres[x][y].color;

                if (!spheres[x][y].userData) {
                    spheres[x][y].userData = scene.createSphere(pos[0], pos[1], pos[2], color, worker.radius());
                    scene.add(spheres[x][y].userData);
                } else {
                    spheres[x][y].userData.material.color.set(color);
                    spheres[x][y].userData.material.specular.set(color);
                    // spheres[x][y].userData.material.needsUpdate = true;
                }
            }
        }
    }
}

// function destroyPyramid() {
//     for (let i = 0; i < worker.layers.length; i++) {
//         const spheres = worker.layers[i].matrix;
//         for (let x = 0; x < worker.layers[i].size; x++) {
//             for (let y = 0; y < worker.layers[i].size; y++) {
//                 if (!spheres[x][y].userData) {
//                     scene.disposeSphere(spheres[x][y].userData);
//                 }
//             }
//         }
//     }
// }



function drawLayer(idx, v) {
    console.log("drawLayer " + idx + v)

    let layer = worker.getLayer(idx);
    const spheres = layer.matrix;
    for (let x = 0; x < layer.size; x++) {
        for (let y = 0; y < layer.size; y++) {
            if (spheres[x][y].userData) {
                spheres[x][y].userData.visible = v;
                spheres[x][y].visible = v;
                spheres[x][y].userData.needsUpdate = true;
                console.log("?")
            }
        }
    }
}

let input;
let input_shapes;
let input_squares;
let problem_mat;
let problem_def;
let headers;
let dicts;


class PolySpherePyramidPuzzle extends React.Component {
    constructor(props) {
        super(props);
        this.panel = createRef();
        this.inputRef = {
            shape: createRef(),
            inputX: createRef(),
            inputY: createRef(),
            inputZ: createRef(),
            sphere1: true,
            sphere2: true,
            sphere3: true,
            sphere4: true,
            sphere5: true,
            sphere6: true,
        }
        this.onSolveButtonClick = this.onSolveButtonClick.bind(this);
        this.state = {
            stopExecution: false,
            solutionCount: 0,
            solutions: [],
            isFourLevel: false,
            isFifthLevel: false,
            checked: false
        }
    }



    // Used to draw solution pyramid (position output from backend)
    drawSolution(position) {
        if (position) {
            for (let layer = 0; layer < position.length; layer++) {
                for (let i = 0; i < position[layer].length; i++) {
                    for (let j = 0; j < position[layer].length; j++) {
                        if (["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"].indexOf(position[layer][i][j]) !== -1) {
                            // Set to shape colour
                            console.log("draw solution: ")
                            worker.getLayer(maxLayerCnt - layer).set(i, j, Colours[position[layer][i][j]]);
                        }
                        else {
                            // Set to default color to indicate empty
                            worker.getLayer(maxLayerCnt - layer).set(i, j, 0x778080);
                        }
                    }
                }
            }
            generatePyramid();
        }
    }

    checkInput(shapes, coords) {
        for (let i = 0; i < shapes.length; i++) {
            if (shapeStore[shapes[i]].layout.length !== coords[i].length) {
                // Wrong number of spheres for shape, abort.
                return false;
            }
        }
        return true;
    }

    onFourLevelCheckChange() {
        this.setState({ isFourLevel: !this.state.isFourLevel }, () => this.onFourLevelStateChange());
    }

    onFourLevelStateChange() {
        if (this.state.isFourLevel) {
            document.getElementById("l5").checked = false;
            document.getElementById("l5").disabled = true;
            drawLayer(5, false);
            this.onClearButtonClick();
        }
        else {
            document.getElementById("l5").checked = true;
            document.getElementById("l5").disabled = false;
            drawLayer(5, true);
            this.onClearButtonClick();
        }
    }

    onFifthLevelCheckChange() {
        this.setState({ isFifthLevel: !this.state.isFifthLevel }, () => this.onFifithLevelStateChange());
    }

    onFifithLevelStateChange() {
        if (this.state.isFifthLevel) {
            document.getElementById("l6").checked = false;
            document.getElementById("l6").disabled = true;
            drawLayer(6, false);
            this.onClearButtonClick();
        }
        else {
            document.getElementById("l6").checked = true;
            document.getElementById("l6").disabled = false;
            drawLayer(6, true);
            this.onClearButtonClick();
        }
    }

    onSolveButtonClick() {
        console.log("--onSolveButtonClick--")
        this.setState({
            solutionCount: 0,
            solutions: [],
            stopExecution: false
        })
        input_shapes = inputShapes.get();
        input_squares = inputCoords.get();
        // If incorrect number of spheres for shape, abort.
        if (!this.checkInput(input_shapes, input_squares)) {
            return;
        }

        problem_mat = populate_problem_matrix3D();
        problem_def = reduce_problem_matrix(problem_mat, generate_headers(problem_mat), input_shapes, input_squares, this.state.isFifthLevel);
        // problem_def = reduce_problem_matrix(problem_mat, generate_headers(problem_mat), input_shapes, input_squares, this.state.isFourLevel);
        problem_mat = problem_def[0];
        headers = problem_def[1];
        console.log(problem_mat);
        console.log(headers);
        dicts = create_dicts(problem_mat, headers, this.state.isFifthLevel);
        // dicts = create_dicts(problem_mat, headers, this.state.isFourLevel);
        console.log(Object.keys(dicts[0]).length);
        // console.log(dicts[0]);
        // console.log(dicts[1]);
        // console.log(headers);
        let ret = solve(dicts[0], dicts[1], [], this.state.isFifthLevel, headers);
        // let ret = solve(dicts[0], dicts[1], [], this.state.isFourLevel, headers);
        let cnt = 0;
        createTimer(() => {
            let arr = ret.next().value;
            console.log(arr);
            if (!arr) {
                clearInterval(uiTimer);
                uiTimer = null;
                console.log('done');
                return;
            }
            cnt++;
            this.setState({ solutionCount: cnt });
            let pyramid_layers = convert_to_pyramid_layers(arr, problem_mat, headers, input_shapes, input_squares);
            this.setState({ solutions: [...this.state.solutions, pyramid_layers] });
            this.drawSolution(pyramid_layers);
        });
    };

    onNextButtonClick() {
        this.drawSolution(this.state.solutions.pop());
    }

    onClearButtonClick() {
        inputShapes.clear();
        inputCoords.clear();
        this.setState({
            solutions: [],
            solutionCount: 0
        });
        //  Set pyramid to empty and render empty pyramid
        let empty_position = new Array(5);
        for (let i = 0; i < 5; i++) {
            empty_position[i] = new Array(5 - i);
            empty_position[i].fill(0);
        }
        for (let layer = 0; layer < 5; layer++) {
            for (let row = 0; row < 5 - layer; row++) {
                empty_position[layer][row] = new Array(5 - layer);
                empty_position[layer][row].fill(0);
            }
        }
        this.drawSolution(empty_position);
    };

    onStopButtonClick() {
        this.setState({ stopExecution: true })
        clearInterval(uiTimer);
        uiTimer = null;
    }

    componentDidMount() {
        scene.init(this.panel.current);
        generatePyramid();
    }

    componentWillUnmount() {
        scene.dispose();
    }

    onInputClick() {
        // console.log(this.inputRef.shape.current.value);
        // console.log(this.inputRef.inputX.current.value);
        // console.log(this.inputRef.inputY.current.value);
        // console.log(this.inputRef.inputZ.current.value);
    }

    onMenuClick() {
        // console.log('click', e);
    };

    // onChange = (e) => {
    //     this.setState({ checked: e.target.checked });
    // }

    render() {
        return (
            <StyleProvider hashPriority="high">
                <div>
                    <Header />
                    <br />
                    <br />
                    <br />
                    <br />
                    <ContentSection />
                    <Grid
                        item
                        container
                        spacing={2}
                        sx={{ marginTop: '2rem' }}
                    >
                        <Grid item xs={12} md={6}>
                            <div ref={this.panel} className="panel">
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div className="row">
                                <div className="col">
                                    <form
                                        id="positionInputForm"
                                        style={{
                                            marginTop: "2rem",
                                            paddingBottom: "4px",
                                        }}
                                    >
                                        <Flex align="flex-start" gap="medium" vertical>
                                            <div className="text-right">
                                                <Button
                                                    type="success"
                                                    ghost
                                                    size="medium"
                                                    success
                                                    style={{
                                                        "backgroundColor": "#1e701ea8",
                                                        "color": "#FFF"
                                                    }}
                                                    onClick={() => this.onSolveButtonClick()}
                                                >Solve</Button>
                                                <Button
                                                    type="primary"
                                                    onClick={() => this.onNextButtonClick()}
                                                >
                                                    Next Iteration
                                                </Button>
                                                <Button
                                                    type="secondary"
                                                    ghost
                                                    onClick={() => this.onClearButtonClick()}
                                                >
                                                    Start again
                                                </Button>
                                                <Button
                                                    type="dashed"
                                                    danger
                                                    onClick={() => this.onStopButtonClick()}
                                                >
                                                    Stop
                                                </Button>
                                            </div>
                                        </Flex>
                                        <Flex
                                            align="flex-start"
                                            gap="medium"
                                            style={{
                                                marginTop: "2rem",
                                                paddingBottom: "4px",
                                            }}
                                            vertical
                                        >
                                            <p>Number of solutions: {this.state.solutionCount}</p>
                                        </Flex>

                                    </form>
                                    <label
                                        htmlFor="inputShape"
                                        style={{ paddingRight: "3px", "display": "none" }}
                                    >Shape</label>
                                    <Input
                                        style={{ "display": "none" }}
                                        type="text"
                                        placeholder="Basic usage"
                                        ref={this.inputRef.shape}
                                        id="inputShape"
                                        defaultValue="a"
                                        onKeyUp={(e) => { e.target.value = e.target.value.replace(/[^A-La-l]/g, '').toUpperCase(); }}
                                    />
                                    <br />
                                    
                                    <Flex gap="middle" horizontal>
                                            <Flex horizontal>
                                                <Button
                                                    id="isFourCheck"
                                                    type="dashed"
                                                    onClick={() => this.onFourLevelCheckChange()}
                                                >
                                                    Free form pyramid 5 level pyramind
                                                </Button>
                                                <Button
                                                    id="isFifthCheck"
                                                    type="dashed"
                                                    className="ml-3"
                                                    onClick={() => this.onFifithLevelStateChange()}
                                                >
                                                    Free form pyramid
                                                </Button>
                                            </Flex>
                                        </Flex>
                                    <div className="text-wrap mt-3">
                                        <Flex gap="middle" vertical>
                                            <Flex vertical={'vertical'}>
                                                <div key="1-btn">
                                                    <Button
                                                        size="small"
                                                        id="l1"
                                                        type="dashed"
                                                        value={this.state.sphere1}
                                                        onClick={(e) => {
                                                            this.setState({ sphere1: !this.state.sphere1 }, () => drawLayer(1, !this.state.sphere1))
                                                        }}
                                                    >
                                                        <b>{this.state.sphere1 ? "Show" : "Hide"}</b> &nbsp; Polysphere Pyramid Layer 1
                                                    </Button>
                                                </div>
                                                <div key="2-btn" className="mt-3">
                                                    <Button
                                                        size="small"
                                                        id="l2"
                                                        type="dashed"
                                                        value={this.state.sphere2}
                                                        onClick={(e) => {
                                                            this.setState({ sphere2: !this.state.sphere2 }, () => drawLayer(2, !this.state.sphere2))
                                                        }}
                                                    >
                                                        <b>{this.state.sphere2 ? "Show" : "Hide"}</b> &nbsp; Polysphere Pyramid Layer 2
                                                    </Button>
                                                </div>
                                                <div key="3-btn" className="mt-3">

                                                    <Button
                                                        size="small"
                                                        id="l3"
                                                        type="dashed"
                                                        value={this.state.sphere3}
                                                        onClick={(e) => {
                                                            this.setState({ sphere3: !this.state.sphere3 }, () => drawLayer(3, !this.state.sphere3))
                                                        }}
                                                    >
                                                        <b>{this.state.sphere3 ? "Show" : "Hide"}</b> &nbsp; Polysphere Pyramid Layer 3
                                                    </Button>
                                                </div>
                                                <div key="4-btn" className="mt-3">
                                                    <Button
                                                        size="small"
                                                        id="l4"
                                                        type="dashed"
                                                        value={this.state.sphere4}
                                                        onClick={(e) => {
                                                            this.setState({ sphere4: !this.state.sphere4 }, () => drawLayer(4, !this.state.sphere4))
                                                        }}
                                                    >
                                                        <b>{this.state.sphere4 ? "Show" : "Hide"}</b> &nbsp; Polysphere Pyramid Layer 4
                                                    </Button>
                                                </div>
                                                <div key="5-btn" className="mt-3">
                                                    <Button
                                                        size="small"
                                                        id="l5"
                                                        type="dashed"
                                                        value={this.state.sphere5}
                                                        onClick={(e) => {
                                                            this.setState({ sphere5: !this.state.sphere5 }, () => drawLayer(5, !this.state.sphere5))
                                                        }}
                                                    >
                                                        <b>{this.state.sphere5 ? "Show" : "Hide"}</b> &nbsp; Polysphere Pyramid Layer 5
                                                    </Button>
                                                </div>
                                            </Flex>
                                        </Flex>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </StyleProvider>
        )
    }
}


export default PolySpherePyramidPuzzle;