import { Node, MarkerType } from '@xyflow/react';
import { RoadmapCollection } from '../types';
import { COLORS } from '../constants';

const createNode = (
  id: string,
  label: string,
  x: number,
  y: number,
  color: { bg: string; border: string },
  description?: string,
  duration?: string,
  level?: string
): Node => ({
  id,
  type: 'custom',
  position: { x, y },
  data: { 
    label, 
    color: color.bg, 
    borderColor: color.border,
    description,
    duration,
    level
  },
  draggable: true,
});

const createEdge = (id: string, source: string, target: string, style?: { strokeWidth?: number; stroke?: string }) => ({
  id,
  source,
  target,
  animated: true,
  type: 'default',
  style: { 
    strokeWidth: style?.strokeWidth || 3,
    stroke: style?.stroke || '#6366f1'
  },
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: style?.stroke || '#6366f1',
    width: 30,
    height: 30
  }
});

export const initialRoadmapData: RoadmapCollection = {
  ai: {
    nodes: [
      createNode('1', 'Python Basics', 250, 50, COLORS.CYAN, 'Master Python fundamentals and syntax', '2-3 weeks', 'Beginner'),
      createNode('2', 'Mathematics & Statistics', 250, 150, COLORS.ORANGE, 'Linear algebra, calculus, probability & statistics', '4-6 weeks', 'Intermediate'),
      createNode('3', 'NumPy & Pandas', 100, 250, COLORS.BLUE, 'Data manipulation and numerical computing', '2-3 weeks', 'Intermediate'),
      createNode('4', 'Data Visualization', 400, 250, COLORS.TEAL, 'Matplotlib, Seaborn, Plotly for insights', '2 weeks', 'Intermediate'),
      createNode('5', 'Machine Learning', 250, 350, COLORS.PURPLE, 'Supervised & unsupervised learning algorithms', '6-8 weeks', 'Advanced'),
      createNode('6', 'Deep Learning', 100, 450, COLORS.INDIGO, 'Neural networks and backpropagation', '4-6 weeks', 'Advanced'),
      createNode('7', 'Neural Networks', 400, 450, COLORS.VIOLET, 'CNNs, RNNs, Transformers architecture', '6-8 weeks', 'Expert'),
      createNode('8', 'AI Projects', 250, 550, COLORS.PINK, 'Build real-world AI applications', 'Ongoing', 'Expert'),
    ],
    edges: [
      createEdge('e1-2', '1', '2', { strokeWidth: 3, stroke: COLORS.CYAN.bg }),
      createEdge('e2-3', '2', '3', { strokeWidth: 3, stroke: COLORS.ORANGE.bg }),
      createEdge('e2-4', '2', '4', { strokeWidth: 3, stroke: COLORS.ORANGE.bg }),
      createEdge('e3-5', '3', '5', { strokeWidth: 3, stroke: COLORS.BLUE.bg }),
      createEdge('e4-5', '4', '5', { strokeWidth: 3, stroke: COLORS.TEAL.bg }),
      createEdge('e5-6', '5', '6', { strokeWidth: 3, stroke: COLORS.PURPLE.bg }),
      createEdge('e5-7', '5', '7', { strokeWidth: 3, stroke: COLORS.PURPLE.bg }),
      createEdge('e6-8', '6', '8', { strokeWidth: 3, stroke: COLORS.INDIGO.bg }),
      createEdge('e7-8', '7', '8', { strokeWidth: 3, stroke: COLORS.VIOLET.bg }),
    ],
  },
  dsa: {
    nodes: [
      createNode('1', 'Programming Basics', 250, 50, COLORS.EMERALD, 'Variables, loops, functions & OOP', '3-4 weeks', 'Beginner'),
      createNode('2', 'Arrays & Strings', 250, 150, COLORS.ORANGE, 'Core data structures and string manipulation', '3 weeks', 'Beginner'),
      createNode('3', 'Linked Lists', 100, 250, COLORS.CYAN, 'Singly, doubly, circular linked lists', '2 weeks', 'Intermediate'),
      createNode('4', 'Stacks & Queues', 400, 250, COLORS.TEAL, 'LIFO and FIFO data structures', '2 weeks', 'Intermediate'),
      createNode('5', 'Trees & Graphs', 250, 350, COLORS.PURPLE, 'Binary trees, BST, graph traversal algorithms', '4-5 weeks', 'Advanced'),
      createNode('6', 'Sorting Algorithms', 100, 450, COLORS.BLUE, 'Quick, merge, heap sort and complexity', '2-3 weeks', 'Intermediate'),
      createNode('7', 'Dynamic Programming', 400, 450, COLORS.VIOLET, 'Memoization and tabulation techniques', '5-6 weeks', 'Expert'),
      createNode('8', 'Advanced Algorithms', 250, 550, COLORS.PINK, 'Greedy, backtracking, divide & conquer', '4-6 weeks', 'Expert'),
    ],
    edges: [
      createEdge('e1-2', '1', '2', { strokeWidth: 3, stroke: COLORS.EMERALD.bg }),
      createEdge('e2-3', '2', '3', { strokeWidth: 3, stroke: COLORS.ORANGE.bg }),
      createEdge('e2-4', '2', '4', { strokeWidth: 3, stroke: COLORS.ORANGE.bg }),
      createEdge('e3-5', '3', '5', { strokeWidth: 3, stroke: COLORS.CYAN.bg }),
      createEdge('e4-5', '4', '5', { strokeWidth: 3, stroke: COLORS.TEAL.bg }),
      createEdge('e5-6', '5', '6', { strokeWidth: 3, stroke: COLORS.PURPLE.bg }),
      createEdge('e5-7', '5', '7', { strokeWidth: 3, stroke: COLORS.PURPLE.bg }),
      createEdge('e6-8', '6', '8', { strokeWidth: 3, stroke: COLORS.BLUE.bg }),
      createEdge('e7-8', '7', '8', { strokeWidth: 3, stroke: COLORS.VIOLET.bg }),
    ],
  },
  webdev: {
    nodes: [
      createNode('1', 'HTML & CSS', 250, 50, COLORS.CYAN, 'Structure and style web pages', '2-3 weeks', 'Beginner'),
      createNode('2', 'JavaScript', 250, 150, COLORS.YELLOW, 'DOM manipulation and ES6+ features', '4-5 weeks', 'Beginner'),
      createNode('3', 'React.js', 100, 250, COLORS.BLUE, 'Component-based UI library', '4-6 weeks', 'Intermediate'),
      createNode('4', 'TypeScript', 400, 250, COLORS.INDIGO, 'Type-safe JavaScript superset', '2-3 weeks', 'Intermediate'),
      createNode('5', 'Next.js', 250, 350, COLORS.PURPLE, 'React framework with SSR & SSG', '3-4 weeks', 'Advanced'),
      createNode('6', 'State Management', 100, 450, COLORS.TEAL, 'Redux, Zustand, React Context', '2-3 weeks', 'Advanced'),
      createNode('7', 'Testing', 400, 450, COLORS.EMERALD, 'Jest, React Testing Library, E2E tests', '2-3 weeks', 'Advanced'),
      createNode('8', 'Deployment', 250, 550, COLORS.PINK, 'Vercel, Netlify, AWS deployment', '1-2 weeks', 'Advanced'),
    ],
    edges: [
      createEdge('e1-2', '1', '2', { strokeWidth: 3, stroke: COLORS.CYAN.bg }),
      createEdge('e2-3', '2', '3', { strokeWidth: 3, stroke: COLORS.YELLOW.bg }),
      createEdge('e2-4', '2', '4', { strokeWidth: 3, stroke: COLORS.YELLOW.bg }),
      createEdge('e3-5', '3', '5', { strokeWidth: 3, stroke: COLORS.BLUE.bg }),
      createEdge('e4-5', '4', '5', { strokeWidth: 3, stroke: COLORS.INDIGO.bg }),
      createEdge('e5-6', '5', '6', { strokeWidth: 3, stroke: COLORS.PURPLE.bg }),
      createEdge('e5-7', '5', '7', { strokeWidth: 3, stroke: COLORS.PURPLE.bg }),
      createEdge('e6-8', '6', '8', { strokeWidth: 3, stroke: COLORS.TEAL.bg }),
      createEdge('e7-8', '7', '8', { strokeWidth: 3, stroke: COLORS.EMERALD.bg }),
    ],
  },
};