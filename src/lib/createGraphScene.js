import { createScene, PointCollection, WireCollection} from 'w-gl';
import bus from './bus';
import getGraph from './getGraph';
import createLayout from 'ngraph.forcelayout';

export default function createGraphScene(canvas) {
  let drawLinks = true;

  // Since graph can be loaded dynamically, we have these uninitialized
  // and captured into closure. loadGraph will do the initialization
  let graph, layout;
  let scene, linkUI, nodeUI;

  let layoutSteps = 0; // how many frames shall we run layout?
  let rafHandle;

  loadGraph(getGraph());
  bus.on('load-graph', loadGraph);

  return {
    dispose,
    runLayout,
  };

  function loadGraph(newGraph) {
    if (scene) {
      scene.dispose();
      scene = null
      cancelAnimationFrame(rafHandle);
    }
    scene = initScene();
    graph = newGraph

    layout = createLayout(graph, {
      timeStep: 0.5,
      springLength: 10,
      springCoeff: 0.8,
      gravity: -12,
      dragCoeff: 0.9,
    });

    layout.step();
    let ui = initUIElements();
    linkUI = ui.linkUI;
    nodeUI = ui.nodeUI;

    rafHandle = requestAnimationFrame(frame);
  }

  function runLayout(stepsCount) {
    layoutSteps += stepsCount;
  }

  function initScene() {
    let scene = createScene(canvas);
    scene.setClearColor(12/255, 41/255, 82/255, 1)
    let initialSceneSize = 100;
    scene.setViewBox({
      left:  -initialSceneSize,
      top:   -initialSceneSize,
      right:  initialSceneSize,
      bottom: initialSceneSize,
    });
    return scene;
  }
  
  function initUIElements() {
    let nodeIdToUI = new Map();
    let linkIdToUI = new Map();
    let nodes = new PointCollection(graph.getNodesCount());

    graph.forEachNode(node => {
      var point = layout.getNodePosition(node.id);
      let size = 10;
      if (node.data && node.data.size) {
        size = node.data.size;
      } else {
        if (!node.data) node.data = {};
        node.data.size = size;
      }
      point.size = size
      point.color = 0x90f8fcff;
      var ui = nodes.add(point, node.id);
      nodeIdToUI.set(node.id, ui);
    });

    let lines = new WireCollection(graph.getLinksCount(), {
      allowColors: false,
      is3D: false
    });
    lines.color.r = 0xc5/255;
    lines.color.g = 0xdc/255;
    lines.color.b = 0xff/255;
    lines.color.a = 0.2;

    graph.forEachLink(link => {
      var from = layout.getNodePosition(link.fromId);
      var to = layout.getNodePosition(link.toId);
      var line = { from, to };
      var ui = lines.add(line);
      linkIdToUI.set(link.id, ui);
    });

    scene.appendChild(lines);
    scene.appendChild(nodes);

    return {nodeUI: nodeIdToUI, linkUI: linkIdToUI};
  }

  function frame() {
    rafHandle = requestAnimationFrame(frame);

    if (layoutSteps > 0) {
      layoutSteps -= 1;
      layout.step();
    }
    drawGraph();
    scene.renderFrame();
  }

  function drawGraph() {
    graph.forEachNode(node => {
      var pos = layout.getNodePosition(node.id);
      nodeUI.get(node.id).update(pos);
    });

    if (drawLinks) {
      graph.forEachLink(link => {
        var fromPos = layout.getNodePosition(link.fromId);
        var toPos = layout.getNodePosition(link.toId);
        linkUI.get(link.id).update(fromPos, toPos);
      })
    }
  }

  function dispose() {
    cancelAnimationFrame(rafHandle);

    scene.dispose();
    bus.off('load-graph', loadGraph);
  }
}