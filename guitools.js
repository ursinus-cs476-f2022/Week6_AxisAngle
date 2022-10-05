/**
 * Convert a comma-separated string of 3D vector
 * coordinates into a glMatrix.vec3 object
 * @param {string} s x,y,z string of vector coordinates
 * @return {glMatrix.vec3} Vector version of values
 */
function splitVecStr(s) {
  ret = [];
  s.split(",").forEach(function(x) {
      ret.push(parseFloat(x));
  });
  if (ret.length != 3) {
    alert("Must have 3 comma-separated coordinates in a vector!");
  }
  return glMatrix.vec3.fromValues(ret[0], ret[1], ret[2]);
}

/**
 * Convert an array into a comma-separated
 * list of values
 * @param {list} v List
 * @param {int} k Number of decimal places (default 2)
 */
function vecToStr(v, k) {
  if (k === undefined) {
      k = 2;
  }
  s = "";
  for (let i = 0; i < v.length; i++) {
      s += v[i].toFixed(k);
      if (i < v.length-1) {
          s += ",";
      }
  }
  return s;
}

PLOT_COLORS = {
  "C0":"#0066ff", "C1":"#ff9933", "C2":"#33cc33", "C3":"#cc00ff",
  "C4":"#ff3300", "C5":"#996633"
}; 


/**
 * Return Plotly plots of equal axes that contain a set of vectors
 * @param {list of glMatrix.vec3} vs
 * @return x, y, and z axes plots 
 */
function getAxesEqual(vs) {
  //Determine the axis ranges
  minval = 0;
  maxval = 0;
  for (let i = 0; i < vs.length; i++) {
      for (let j = 0; j < 3; j++) {
          if (vs[i][j] < minval){ minval = vs[i][j]; }
          if (vs[i][j] > maxval){ maxval = vs[i][j]; }
      }
  }
  return {
  x:{ x: [minval, maxval], y: [0, 0], z: [0, 0],
    mode: 'lines', line: {color: '#000000', width: 1}, type: 'scatter3d', name:'xaxis'
  },
  y:{ x: [0, 0], y: [minval, maxval], z: [0, 0],
    mode: 'lines', line: {color: '#000000', width: 1}, type: 'scatter3d', name:'yaxis'
  },
  z:{ x: [0, 0], y: [0, 0], z: [minval, maxval],
    mode: 'lines', line: {color: '#000000', width: 1}, type: 'scatter3d', name:'zaxis'
  }};
}

function getMousePos(canvas, evt) {
  let rect = canvas.getBoundingClientRect();
  return {
      X: evt.clientX - rect.left,
      Y: evt.clientY - rect.top
  };
}



/**
 * A class for managing the GUI for rotation computation
 */
class RotGUI {
  constructor(rotFn) {
    this.rotFn = rotFn;
    this.setupMenu();
  }

  /**
   * Run the rotation method to rotate a vector v around an axis
   * by a particular angle
   */
  doRotation() {
    let axis = splitVecStr(this.axis);
    let v = splitVecStr(this.v);
    try{
      this.resultVec = this.rotFn(axis, this.angle, v);
      this.result = vecToStr(this.resultVec);
      this.drawVectors();
    }
    catch(err) {
      alert("There was an error with your rotation code!");
      this.result = "error";
      console.log(err);
    }
  }

  /**
   * Setup a menu with inputs for 3 vectors, as well as
   * a button for computing and a text area for display
   */
  setupMenu() {
    let menu = new dat.GUI();
    this.menu = menu;
    this.axis = "0, 0, 1";
    this.angle = "45";
    this.v = "1,1,0";
    this.vRot = "";
    this.result = "";
    menu.add(this, "axis");
    menu.add(this, "angle");
    menu.add(this, "v");
    menu.add(this, "vRot").listen();
    menu.add(this, "doRotation");
  }

  drawVectors() {
    let plots = [];
    let labels = ["axis", "v", "vRot"];
    let vecs = [splitVecStr(this.axis), splitVecStr(this.v), this.resultVec];
    // Plot endpoints
    for (let i = 0; i < 3; i++) {
      let v = vecs[i];
      let viz = { x: [v[0]], y: [v[1]], z: [v[2]],
        mode: 'markers+lines', line: {color: '#ffffff', width: 10},
        type: 'scatter3d', name: labels[i],
        marker: {color: PLOT_COLORS["C"+i], size: 10, symbol: 'circle'}
      };
      plots.push(viz);
    }

    // Plot vectors between endpoints
    labels = ["axis", "v", "vRot"];
    for (let i = 0; i < 3; i++) {
      let v = vecs[i];
      let viz = { x: [0, v[0]], y: [0, v[1]], z: [0, v[2]],
        mode: 'lines', line: {color: PLOT_COLORS["C"+i], width: 10},
        type: 'scatter3d', name: labels[i],
      };
      plots.push(viz);
    }

    let axes = getAxesEqual([splitVecStr(this.axis), splitVecStr(this.v), this.resultVec]);
    plots.push(axes.x);
    plots.push(axes.y);
    plots.push(axes.z);
    let layout = {
      autosize: false, width: 500, height: 500,
      margin: { l: 0, r: 0, b: 0, t: 65 }
    };
    Plotly.newPlot('angleViz', plots, layout);  
  }
}

