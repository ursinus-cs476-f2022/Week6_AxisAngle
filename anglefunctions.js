/**
 * Apply Rodrigues' rotation formula
 * @param {vec3} axis Axis around which to rotate
 * @param {float} angle Angle, in degrees, by which to rotate around the axis
 * @param {vec3} v Vector to rotate about the axis by angle
 */
function rodriguesRot(axis, angle, v) {
    angle = Math.PI*angle/180; // Convert to radians
    let vRot = glMatrix.vec3.create(); // The resulting vector
    // TODO: Fill this in

    return vRot;
}


/**
 * Apply the quaternion rotation formula, using only the fromValues
 * and multiply methods in glMatrix.quat4
 * @param {vec3} axis Axis around which to rotate
 * @param {float} angle Angle, in degrees, by which to rotate around the axis
 * @param {vec3} v Vector to rotate about the axis by angle
 */
 function quaternionRot(axis, angle, v) {
    angle = Math.PI*angle/180; // Convert to radians
    let vRot = glMatrix.vec3.create(); // The resulting vector
    // TODO: Fill this in

    return vRot;
}