import {useEffect, useRef, useState} from "react";
import cytoscape from "cytoscape";
// @ts-ignore
// import cise from "cytoscape-cise";
import "./home.scss";

type Cytoscape = any;

type WorkflowDependenciesGraph = {
    identifier: string;
    filename: string;
    as_: string;
    imports: WorkflowDependenciesGraph[];
}


/**
 * Given an HTML div element reference, set up cytoscape.
 *
 * @param ref an HTML div element.  Can be null.
 */
const setUp = (ref: HTMLDivElement | null): Cytoscape => {
    // cytoscape.use(cise);
    const cy: Cytoscape = cytoscape({
        container: ref,
        boxSelectionEnabled: true,
        minZoom: 0.3,  // out
        maxZoom: 5,
        zoom: 0.8,
        // pan: {x: 363, y: 587},
        // the ordering of the styles implies the priority.
        style: [
            {
                selector: "node",
                css: {
                    "text-wrap": "wrap",
                    "shape": "rectangle",
                    "background-color": "#D1F8FF",
                    "border-width": "2px",
                    "border-color": "#4F4F4F",
                    "width": "150px",
                    "height": "65px",
                }
            },
            {
                selector: "node[id]",
                css: {
                    "content": "data(label)",
                    "text-valign": "center",
                    "text-halign": "center",
                }
            },
            {
                selector: ":parent",
                css: {
                    "text-valign": "top",
                    "text-halign": "center",
                    "shape": "round-rectangle",
                    "background-color": "#FFFFFF",
                    "border-opacity": 0.8,
                    // @ts-ignore
                    "padding": "20px",
                }
            },
            {
                selector: "edge",
                css: {
                    "content": "data(label)",
                    "curve-style": "straight",
                    // "curve-style": "unbundled-bezier",
                    "line-color": "#778eaa",
                    "target-arrow-color": "#778eaa",
                    "text-wrap": "wrap",
                    "target-arrow-shape": "triangle",
                    "arrow-scale": 2.5,
                }
            },
            {selector: "edge[cpd]", css: {"curve-style": "unbundled-bezier", "control-point-distances": "data(cpd)"}},
            {selector: "edge[cpw]", css: {"curve-style": "unbundled-bezier", "control-point-weights": "data(cpw)"}},
            {selector: "edge[sep]", css: {"source-endpoint": "data(sep)"}},
            {selector: "edge[tep]", css: {"target-endpoint": "data(tep)"}},
            // @ts-ignore
            {selector: "edge[tt]", css: {"curve-style": "taxi", "taxi-turn": "data(tt)"}},
            // @ts-ignore
            {selector: "edge[td]", css: {"curve-style": "taxi", "taxi-direction": "data(td)"}},
            {
                selector: ":selected",
                css: {
                    "background-color": "#C5E2FF",
                    "line-color": "#459EFF",
                    "target-arrow-color": "#459EFF",
                }
            },
            {
                selector: ".preset_information",
                css: {
                    "shape": "barrel",
                    "background-opacity": 0,
                    "width": "400px",
                    "height": "120px",
                }
            }
        ],
        elements: {
            nodes: [],
            edges: []
        },
        layout: {
            // name: "preset",

            // name: 'cise',
            // animate: false,
            // fit: true,

            name: 'breadthfirst',
            fit: true,
            directed: false,
            padding: 20,
            spacingFactor: 1.75,
            boundingBox: undefined,
            avoidOverlap: true,
        },
    });

    return cy;
}

const HomeView = () => {
    const cyRef = useRef(null);

    const reload_data = (cy: Cytoscape, graph: WorkflowDependenciesGraph) => {
        const nodes = [];
        const edges = [];

        // ROOT
        nodes.push({data: {id: graph.identifier, label: graph.filename}});

        // DFS
        let graphs: [string, WorkflowDependenciesGraph][] = [];
        for (let dependent of graph.imports) {
            graphs.push([graph.identifier, dependent])
        }

        while (graphs.length > 0) {
            let [parent, curr] = graphs.pop()!;

            nodes.push({data: {id: curr.identifier, label: curr.filename}});
            edges.push({data: {id: `${parent}_${curr.identifier}`, source: parent, target: curr.identifier}});

            for (let dependent of curr.imports) {
                graphs.push([curr.identifier, dependent]);
            }
        }

        // const elements = {
        //     nodes: [
        //         {data: {id: 'a'}},
        //         {data: {id: 'b'}},
        //         {data: {id: 'c'}},
        //         {data: {id: 'd'}},
        //         {data: {id: 'e'}},
        //         {data: {id: 'f'}}
        //     ],
        //     edges: [
        //         {data: {id: 'ab', source: 'a', target: 'b'}},
        //         {data: {id: 'bc', source: 'b', target: 'c'}},
        //         {data: {id: 'ca', source: 'c', target: 'a'}},
        //         {data: {id: 'bd', source: 'b', target: 'd'}},
        //         {data: {id: 'de', source: 'd', target: 'e'}},
        //         {data: {id: 'ef', source: 'e', target: 'f'}},
        //     ]
        // }
        const elements = {
            nodes: nodes,
            edges: edges
        }

        // TODO: we only need to dynamically add new ones
        cy.elements().remove();
        cy.add(elements);

        cy.elements().makeLayout({
            name: 'breadthfirst',
            fit: true, // whether to fit the viewport to the graph
            directed: false, // whether the tree is directed downwards (or edges can point in any direction if false)
            padding: 30, // padding on fit
            circle: false, // put depths in concentric circles if true, put depths top down if false
            grid: false, // whether to create an even grid into which the DAG is placed (circle:false only)
            spacingFactor: 1.75, // positive spacing factor, larger => more space between nodes (N.B. n/a if causes overlap)
            boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
            avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
            nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
            roots: [graph.identifier], // the roots of the trees
            maximal: false, // whether to shift nodes down their natural BFS depths in order to avoid upwards edges (DAGS only)
            depthSort: undefined, // a sorting function to order nodes at equal depth. e.g. function(a, b){ return a.data('weight') - b.data('weight') }
        }).run();
    }

    useEffect(() => {
        if (!cyRef.current) {
            console.error("target div is undefined");
            return;
        }

        let cy = setUp(cyRef.current);

        cy.on("zoom pan", () => {
            const element = document.getElementById("graph");
            if (!element) return;

            const factor = 60 * cy.zoom();
            element.style.backgroundSize = `${factor}px ${factor}px, ${factor}px ${factor}px`;

            const pan = cy.pan();
            const x = pan.x;
            const y = pan.y;
            element.style.backgroundPosition = `${x}px ${y}px, ${x}px ${y}px`;
        });

        cy.on("tap", "node", (ev: any) => {
            const node = ev.target;
            cy.remove(node);
        });

        fetch("http://localhost:5000/api/v1/workflow/graph", {
            method: "POST",
            mode: "cors",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                // "workflow_url": "https://raw.githubusercontent.com/broadinstitute/warp/develop/pipelines/broad/rna_seq/RNAWithUMIsPipeline.wdl"
                "workflow_url": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/AnnoRdPeSr.wdl"
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                reload_data(cy, res["wf_dependencies_graph"])
            });

    }, []);

    return (
        <div id="graph">
            <div className="cy" ref={cyRef}/>
        </div>
    );
};

export default HomeView;
