import * as THREE from './three.module.js'
import {OrbitControls} from './OrbitControls.js'
import { PCDLoader } from './PCDLoader.js'
import * as BufferGeometryUtils from './BufferGeometryUtils.js'

var canvas = document.getElementById('canvas');
var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setSize(canvas.clientWidth,canvas.clientHeight);

var width = window.screen.availWidth
var height = window.screen.availHeight

var camera = new THREE.PerspectiveCamera(1,width/height,1,50000000);
camera.position.set(0,0,9000);
var loader = new PCDLoader();

var controls = new OrbitControls(camera,renderer.domElement);
var array = [1,0,0]
loader.load('./arma_Red.pcd',function(points){
    // points.geometry.center();
    points.geometry.translate(50,0,0);
    var pcd1 = points
    loader.load('./arma_Blue.pcd',function(points){
        // points.geometry.center()
        var newGeometry = BufferGeometryUtils.mergeBufferGeometries([pcd1.geometry,points.geometry])        
        var ptsmat = new THREE.PointsMaterial({size:0.1,vertexColors:true})
        var newMesh = new THREE.Points(newGeometry,ptsmat)
        newMesh.geometry.translate(-20,-20,0)        
        scene.add(newMesh)
        
    })

})

var animate = function(){
    renderer.render(scene,camera)
    controls.update()
    requestAnimationFrame(animate)
}

animate()