/**
 * Created by chaowang211311 on 2017/6/9.
 */
(function(){

    var renderer;
    var stats;
    var width,height;
    function initThree(){
        width=document.getElementById("canvas-frame").clientWidth;
        height=document.getElementById("canvas-frame").clientHeight;

        renderer=new THREE.WebGLRenderer({
            antialias:true
        });
        renderer.setSize(width,height);
        document.getElementById("canvas-frame").appendChild(renderer.domElement);
        renderer.setClearColor(0xFFFFFF,1.0);

        //性能检测器
        // stats=new Stats();
        // stats.domElement.style.position='absolute';
        // stats.domElement.style.left='0px';
        // stats.domElement.style.top='0px';
        // document.getElementById('canvas-frame').appendChild(stats.domElement);

    }
    var camera;
    function initCamera(){
        camera=new THREE.PerspectiveCamera(45,width/height,1,10000);
        camera.position.x=100;
        camera.position.y=300;
        camera.position.z=600;

        camera.up.x=0;
        camera.up.y=0;
        camera.up.z=0;
        camera.lookAt({
            x:0,
            y:0,
            z:0
        });

    }
    var scene;
    function initScene(){
        scene=new THREE.Scene();
    }

    var light;
    function initLight(){
        light=new THREE.AmbientLight(0xFF0000);
        light.position.set(100,100,200);
        scene.add(light);
    }

    var mesh;
    function initObject(){
        var geometry=new THREE.BoxGeometry(100,100,100);//width,height,depth

        for(var i=0;i<geometry.faces.length;i+=2){
            var hex=Math.random()*0xffffff;
            geometry.faces[i].color.setHex(hex);
            geometry.faces[i+1].color.setHex(hex);
        }

        var material=new THREE.MeshBasicMaterial({
            vertexColors:THREE.FaceColors
        });
        mesh=new THREE.Mesh(geometry,material);
        mesh.position=new THREE.Vector3(0,0,0);
        scene.add(mesh);
    }

    function initGrid(){
        var helper=new THREE.GridHelper(1000,50);
        //helper.setColors(0x0000ff,0x808080);
        scene.add(helper);
    }

    function threeStart(){
        initThree();
        initCamera();
        initScene();
        initLight();

        initObject();
        initGrid();

        animation();
    }

    function animation(){
        mesh.rotateX(0.01);
        renderer.render(scene,camera);
        requestAnimationFrame(animation);
    }

    threeStart();

})();