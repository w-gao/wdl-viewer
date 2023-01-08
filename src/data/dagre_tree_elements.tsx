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
    id: '1',
    type: 'input',
    data: { label: 'input' },
    position,
  },
  {
    id: '2',
    data: { label: 'node 2' },
    position,
  },
  {
    id: '2a',
    data: { label: 'node 2a' },
    position,
  },
  {
    id: '2b',
    data: { label: 'node 2b' },
    position,
  },
  {
    id: '2c',
    data: { label: 'node 2c' },
    position,
  },
  {
    id: '2d',
    data: { label: 'node 2d' },
    position,
  },
  {
    id: '3',
    data: { label: 'node 3' },
    position,
  },
];

export const initialEdges = [
  { id: 'e12', source: '1', target: '2', type: edgeType, animated: true },
  // { id: 'e13', source: '1', target: '3', type: edgeType, animated: true },
  { id: 'e22a', source: '2', target: '2a', type: edgeType, animated: true },
  { id: 'e22b', source: '2', target: '2b', type: edgeType, animated: true },
  { id: 'e22c', source: '2', target: '2c', type: edgeType, animated: true },
  { id: 'e2c2d', source: '2c', target: '2d', type: edgeType, animated: true },
  { id: 'e12d', source: '1', target: '2d', type: edgeType, animated: true },
  { id: 'e13', source: '1', target: '3', type: edgeType, animated: true },
  { id: 'e32d', source: '3', target: '2d', type: edgeType, animated: true },

  { id: 'e12a', source: '1', target: '2a', type: edgeType, animated: true },

];
