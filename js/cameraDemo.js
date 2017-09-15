/**
 * Created by chaowang211311 on 2017/5/23.
 */
(function(){
    //渲染器
    var renderer;
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
    }
    //相机
    var camera;
    function initCamera(){
        camera=new THREE.PerspectiveCamera(45,width/height,1,1000);
        camera.position.x=0;
        camera.position.y=0;
        camera.position.z=600;
        camera.up.x=0;
        camera.up.y=1;
        camera.up.z=0;

        camera.lookAt({
            x:0,
            y:0,
            z:0
        });
    }
    //场景
    var scene;
    function initScene(){
        scene=new THREE.Scene();
    }
    //场景光
    var light;
    function initLight(){
        light=new THREE.AmbientLight(0xFF0000);
        light.position.set(100,100,200);
        scene.add(light);

        light=new THREE.PointLight(0x00FF00);
        light.position.set(0,0,300);
        scene.add(light);
    }

    var cube;
    function initObject(){
        var geometry=new THREE.CylinderGeometry(70,100,200);
        var material=new THREE.MeshLambertMaterial({//lambert朗伯，亮度单位
            color:0xFFFFFF
        });
        var mesh=new THREE.Mesh(geometry,material);
        mesh.position=new THREE.Vector3(0,0,0);

        scene.add(mesh);
    }

    function threeStart(){
        initThree();
        initCamera();
        initScene();
        //initLight();
        initObject();
        animation();
    }

    function animation(){
        changeFov();
        renderer.render(scene,camera);
        requestAnimationFrame(animation)
    }

    function changeFov(){
        var txtFov=document.getElementById("txtFov").value;
        var val=parseFloat(txtFov);
        setCameraFov(val);
    }

    function setCameraFov(fov){
       camera.fov=fov;
       camera.updateProjectionMatrix();//投影矩阵
    }

   threeStart();
})();