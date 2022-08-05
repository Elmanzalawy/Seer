<template>

</template>

<script>
import * as Three from 'three'
import vertexShader from '../shaders/vertex.glsl'
import fragmentShader from '../shaders/fragment.glsl'
import atmosphereVertexShader from '../shaders/atmosphereVertex.glsl'
import atmosphereFragmentShader from '../shaders/atmosphereFragment.glsl'

export default {
    mounted: function() {
        const scene = new Three.Scene()
        const camera = new Three.PerspectiveCamera(
            75,
            innerWidth / innerHeight,
            0.1,
            1000
        )

        const renderer = new Three.WebGLRenderer({
            antialias: true,
        })
        renderer.setSize(innerWidth, innerHeight)
        renderer.setPixelRatio(window.devicePixelRatio)
        document.body.appendChild(renderer.domElement)

        //create sphere
        const sphere = new Three.Mesh
        (
            new Three.SphereGeometry(5,50,50),
            new Three.ShaderMaterial({
                vertexShader,
                fragmentShader,
                uniforms: {
                    globeTexture: {
                        value: new Three.TextureLoader().load('images/earth.jpg')
                    }
                }
            })
            // new Three.MeshBasicMaterial({
            //     // color: "#FF0000",
            //     map: new Three.TextureLoader().load('images/earth.jpg')
            // })
        )

        scene.add(sphere)

        //create atmosphere
        const atmosphere = new Three.Mesh
        (
            new Three.SphereGeometry(5,50,50),
            new Three.ShaderMaterial({
                vertexShader: atmosphereVertexShader,
                fragmentShader: atmosphereFragmentShader,
                blending: Three.AdditiveBlending,
                side: Three.BackSide
            })
            // new Three.MeshBasicMaterial({
            //     // color: "#FF0000",
            //     map: new Three.TextureLoader().load('images/earth.jpg')
            // })
        )
        atmosphere.scale.set(1.1, 1.1, 1.1)
        scene.add(atmosphere)


        camera.position.z = 15;

        function animate() {
            requestAnimationFrame(animate)
            renderer.render(scene, camera)
            sphere.rotation.y += 0.001;
        }
        animate()
    }
}
</script>

<style>
/*  */
</style>
