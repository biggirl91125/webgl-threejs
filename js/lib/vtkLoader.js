/**
 * Created by chaowang211311 on 2017/6/6.
 */
//构造函数
THREE.VTKLoader=function(){
    //继承自监听器，使这个类有监听功能
    //THREE.EventDispatcher.prototype.call(this);
    Object.assign(this,THREE.EventDispatcher.prototype);
};
//VTKLoader的原型函数，包含成员函数、成员变量的定义
THREE.VTKLoader.prototype={
    //构造函数
    constructor:THREE.VTKLoader,
    load:function(url,callback){
        var scope = this;

        //ajax异步请求
        var request=new XMLHttpRequest();
        request.addEventListener('load',function(event){
            var geometry=scope.parse(event.target.responseText);
            scope.dispatchEvent({type:'load',content:geometry});

            if(callback)callback(geometry);
        },false);

        request.addEventListener('progress',function(event){
            scope.dispatchEvent({type:'progress',loaded:event.loaded,total:event.total});
        },false);

        request.addEventListener('error',function(){
            scope.dispatchEvent({type:'error',message:'Couldn\'t load URL ['+url+']'});
        },false);

        request.open('GET',url,true);
        request.send(null);
    },
    //解析数据
    parse:function(data){
        var geometry=new THREE.Geometry();
        function vertex(x,y,z){
            geometry.vertices.push(new THREE.Vector3(x,y,z));
        }

        function face3(a,b,c){
            geometry.faces.push(new THREE.Face3(a,b,c));
        }

        function face4(a,b,c,d){
            geometry.faces.push(new THREE.Face4(a,b,c,d));
        }

        var pattern,result;
        pattern=/([\+|\-]?[\d]+[\.][\d|\-|e]+)[ ]+([\+|\-]?[\d]+[\.][\d|\-|e]+)[ ]+([\+|\-]?[\d]+[\.][\d|\-|e]+)/g;

        while((result=pattern.exec(data))!=null){
            vertex(parseFloat(result[1]),parseFloat(result[2]),parseFloat(result[3]));
        }

        pattern=/3[ ]+([\d]+)[ ]+([\d]+)[ ]+([\d]+)/g;
        while((result=pattern.exec(data)) != null){
            face3(parseInt(result[1]),parseInt(result[2]),parseInt(result[3]));
        }

        pattern=/4[ ]+([\d]+)[ ]+([\d]+)[ ]+([\d]+)[ ]+([\d]+)/g;
        while((result=pattern.exec(data))!= null){
            face4(parseInt(result[1]),parseInt(result[2]),parseInt(result[3]),parseInt(result[4]));
        }

        //geometry.computeCentroids();//计算重心
        geometry.computeFaceNormals();//计算面法向量
        geometry.computeVertexNormals();//计算顶点法向量
        geometry.computeBoundingSphere();//计算包围几何体的椭圆

        return geometry;

    }
};