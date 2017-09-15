/**
 * Created by chaowang211311 on 2017/5/9.
 */
(function(){
    var renderer;
    var width,height;

    function initThree(){
        width=document.getElementById('canvas-frame').clientWidth;
        height=document.getElementById('canvas-frame').clientHeight;

        renderer=new THREE.WebGLRenderer({
            antialias:true
        });
        renderer.setSize(width,height);
        document.getElementById('canvas-frame').appendChild(renderer.domElement);
        renderer.setClearColor(0xFFFFFF,1.0);

        initStats();
    }
    var stats;
    function initStats(){
        stats=new Stats();
        stats.domElement.style.position='absolute';
        stats.domElement.style.left='0px';
        stats.domElement.style.top='0px';
        document.getElementById("canvas-frame").appendChild(stats.domElement);
    }
    function initTween(){
        new TWEEN
            .Tween(mesh.position)
            .to({x:-400},3000)
            .repeat(Infinity)
            .start();
    }
    var camera;
    function initCamera(){
        camera=new THREE.PerspectiveCamera(45,width/height,1,10000);
        camera.position.x=0;
        camera.position.y=1000;
        camera.position.z=0;
        camera.up.x=0;
        camera.up.y=0;
        camera.up.z=1;
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
        light=new THREE.DirectionalLight(0xFF0000,1.0,0);
        light.position.set(100,100,200);
        scene.add(light);
    }


    function initObject2(){
        var geometry=new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(-500,0,0));
        geometry.vertices.push(new THREE.Vector3(500,0,0));

        for(var i=0;i<=20;i++){
            var line1=new THREE.Line(geometry,new THREE.LineBasicMaterial({
                color:0x000000,
                opacity:0.2
            }));
            line1.position.z=(i*50)-500;
            scene.add(line1);

            var line2=new THREE.Line(geometry,new THREE.LineBasicMaterial({
                color:0x000000,
                opacity:0.2
            }));
            line2.position.x=(i*50)-500;
            line2.rotation.y=90*Math.PI/180;
            scene.add(line2);
        }

    }

    function render(){
        camera.position.x=camera.position.x+1;//改变相机位置
        renderer.render(scene,camera);//必须重新绘制
        requestAnimationFrame(render);

        stats.update();//统计时间和帧数
    }

    function threeStart(){
        initThree();
        initCamera();
        initScene();
        initLight();
        initObject2();
        render();
    }
    threeStart();
})();


function create(){
    THREE.Vector3=function(x,y,z){
        this.x=x||0;
        this.y=y||0;
        this.z=z||0;
    };
}