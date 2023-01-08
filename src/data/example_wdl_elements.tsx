import { Node as ReactFlowNode } from 'reactflow';


const position = { x: 0, y: 0 };
const edgeType = 'simplebezier';
// const edgeType = 'straight';
// const edgeType = 'default';
// const edgeType = 'step';
// const edgeType = 'smoothstep';
// const edgeType = 'simplebezier';


export const initialNodes: ReactFlowNode[] = [
    {
        id: "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/AnnoRdPeSr.wdl",
        data: {
            label: "AnnoRdPeSr.wdl"
        },
        position,
    },
    {
        id: "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/RdPeSrAnno.wdl",
        data: {
            label: "RdPeSrAnno.wdl"
        },
        position,
    },
    {
        id: "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/TasksBenchmark.wdl",
        data: {
            label: "TasksBenchmark.wdl"
        },
        position,
    },
    {
        id: "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/Structs.wdl",
        data: {
            label: "Structs.wdl"
        },
        position,
    },
    {
        id: "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/TasksMakeCohortVcf.wdl",
        data: {
            label: "TasksMakeCohortVcf.wdl"
        },
        position,
    },
    {
        id: "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/Duphold.wdl",
        data: {
            label: "Duphold.wdl"
        },
        position,
    },
    {
        id: "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/VaPoR.wdl",
        data: {
            label: "VaPoR.wdl"
        },
        position,
    },
    {
        id: "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/VaPoRVcf.wdl",
        data: {
            label: "VaPoRVcf.wdl"
        },
        position,
    },
    {
        id: "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/VaPoRBedPerContig.wdl",
        data: {
            label: "VaPoRBedPerContig.wdl"
        },
        position,
    }
];

export const initialEdges = [
    {
        "id": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/AnnoRdPeSr.wdl_https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/RdPeSrAnno.wdl",
        "source": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/AnnoRdPeSr.wdl",
        "target": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/RdPeSrAnno.wdl",
        "type": edgeType,
        "animated": true
    },
    {
        "id": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/RdPeSrAnno.wdl_https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/TasksBenchmark.wdl",
        "source": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/RdPeSrAnno.wdl",
        "target": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/TasksBenchmark.wdl",
        "type": edgeType,
        "animated": true
    },
    {
        "id": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/TasksBenchmark.wdl_https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/Structs.wdl",
        "source": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/TasksBenchmark.wdl",
        "target": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/Structs.wdl",
        "type": edgeType,
        "weight": 2,
        "animated": true
    },
    {
        "id": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/RdPeSrAnno.wdl_https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/TasksMakeCohortVcf.wdl",
        "source": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/RdPeSrAnno.wdl",
        "target": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/TasksMakeCohortVcf.wdl",
        "type": edgeType,
        "animated": true
    },
    {
        "id": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/TasksMakeCohortVcf.wdl_https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/Structs.wdl",
        "source": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/TasksMakeCohortVcf.wdl",
        "target": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/Structs.wdl",
        "type": edgeType,
        "weight": 2,
        "animated": true
    },
    {
        "id": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/RdPeSrAnno.wdl_https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/Structs.wdl",
        "source": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/RdPeSrAnno.wdl",
        "target": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/Structs.wdl",
        "type": edgeType,
        "weight": 2,
        "animated": true
    },
    {
        "id": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/AnnoRdPeSr.wdl_https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/Duphold.wdl",
        "source": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/AnnoRdPeSr.wdl",
        "target": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/Duphold.wdl",
        "type": edgeType,
        "animated": true
    },
    {
        "id": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/Duphold.wdl_https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/TasksBenchmark.wdl",
        "source": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/Duphold.wdl",
        "target": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/TasksBenchmark.wdl",
        "type": edgeType,
        "animated": true
    },
    {
        "id": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/Duphold.wdl_https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/TasksMakeCohortVcf.wdl",
        "source": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/Duphold.wdl",
        "target": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/TasksMakeCohortVcf.wdl",
        "type": edgeType,
        "animated": true
    },
    {
        "id": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/Duphold.wdl_https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/Structs.wdl",
        "source": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/Duphold.wdl",
        "target": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/Structs.wdl",
        "type": edgeType,
        "weight": 2,
        "animated": true
    },
    {
        "id": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/AnnoRdPeSr.wdl_https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/VaPoR.wdl",
        "source": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/AnnoRdPeSr.wdl",
        "target": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/VaPoR.wdl",
        "type": edgeType,
        "animated": true
    },
    {
        "id": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/VaPoR.wdl_https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/VaPoRVcf.wdl",
        "source": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/VaPoR.wdl",
        "target": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/VaPoRVcf.wdl",
        "type": edgeType,
        "animated": true
    },
    {
        "id": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/VaPoRVcf.wdl_https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/TasksBenchmark.wdl",
        "source": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/VaPoRVcf.wdl",
        "target": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/TasksBenchmark.wdl",
        "type": edgeType,
        "animated": true
    },
    {
        "id": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/VaPoRVcf.wdl_https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/Structs.wdl",
        "source": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/VaPoRVcf.wdl",
        "target": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/Structs.wdl",
        "type": edgeType,
        "weight": 2,
        "animated": true
    },
    {
        "id": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/VaPoR.wdl_https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/VaPoRBedPerContig.wdl",
        "source": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/VaPoR.wdl",
        "target": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/VaPoRBedPerContig.wdl",
        "type": edgeType,
        "animated": true
    },
    {
        "id": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/VaPoRBedPerContig.wdl_https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/TasksBenchmark.wdl",
        "source": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/VaPoRBedPerContig.wdl",
        "target": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/TasksBenchmark.wdl",
        "type": edgeType,
        "animated": true
    },
    {
        "id": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/VaPoRBedPerContig.wdl_https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/Structs.wdl",
        "source": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/VaPoRBedPerContig.wdl",
        "target": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/Structs.wdl",
        "type": edgeType,
        "weight": 2,
        "animated": true
    },
    {
        "id": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/VaPoR.wdl_https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/TasksBenchmark.wdl",
        "source": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/VaPoR.wdl",
        "target": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/TasksBenchmark.wdl",
        "type": edgeType,
        "animated": true
    },
    {
        "id": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/VaPoR.wdl_https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/Structs.wdl",
        "source": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/VaPoR.wdl",
        "target": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/Structs.wdl",
        "type": edgeType,
        "weight": 2,
        "animated": true
    },
    {
        "id": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/AnnoRdPeSr.wdl_https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/Structs.wdl",
        "source": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/AnnoRdPeSr.wdl",
        "target": "https://raw.githubusercontent.com/broadinstitute/gatk-sv/master/wdl/Structs.wdl",
        "type": edgeType,
        "weight": 2,
        "animated": true
    }
];
