/**
 * Created by chaowang211311 on 2017/5/27.
 */
(function(){
    var camera,scene,renderer;
    var mesh;
    var texture;

    function start(){
        clock();
        init();
        animate();
    }

    function init(){
        //renderer
        renderer=new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth,window.innerHeight);
        document.body.appendChild(renderer.domElement);

        //camera
        camera=new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight,1,1000);
        camera.position.z=400;

        //scene
        scene=new THREE.Scene();

        var geometry=new THREE.CubeGeometry(150,150,150);
        texture=new THREE.Texture(canvas);
        var material=new THREE.MeshBasicMaterial({map:texture});
        texture.needsUpdate=true;
        mesh=new THREE.Mesh(geometry,material);

        scene.add(mesh);

        window.addEventListener('resize',onWindowResize,false);

    }

    function onWindowResize(){
        camera.aspect=window.innerWidth/window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth,window.innerHeight);

    }

    function animate(){
        texture.needsUpdate=true;
        mesh.rotation.y-=0.01;
        mesh.rotation.x-=0.01;
        requestAnimationFrame(animate);
        renderer.render(scene,camera);
    }

    start();
})();