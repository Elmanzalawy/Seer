<template>

</template>

<script>
import * as Three from 'three'
import vertexShader from '../shaders/vertex.glsl'
import fragmentShader from '../shaders/fragment.glsl'
import atmosphereVertexShader from '../shaders/atmosphereVertex.glsl'
import atmosphereFragmentShader from '../shaders/atmosphereFragment.glsl'
import gsap  from 'gsap';

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

        //add sphere to group so we can apply events to it (mouse drag)
        const group = new Three.Group()
        group.add(sphere)
        scene.add(group)

        camera.position.z = 15;

        const starGeometry = new Three.BufferGeometry()
        const starMaterial = new Three.PointsMaterial({
            color: '#ffffff',
        })

        const starVertices = []
        for(let i=0; i<10000; i++){
            const x = (Math.random() - 0.5) * 2000; //rand value between -1000 and 1000
            const y = (Math.random() - 0.5) * 2000; //rand value between -1000 and 1000
            const z = - Math.random() * 3000
            starVertices.push(x,y,z)
        }

        starGeometry.setAttribute('position', new Three.Float32BufferAttribute(starVertices, 3))
        const stars = new Three.Points(starGeometry, starMaterial);
        scene.add(stars)

        const mouse = {
            x: undefined,
            y: undefined
        }
        addEventListener('mousemove', (e) => {
            mouse.x = (e.clientX / innerWidth) * 2 - 1
            mouse.y = (e.clientY / innerHeight) * 2 + 1
        })

        function animate() {
            requestAnimationFrame(animate)
            renderer.render(scene, camera)
            sphere.rotation.y += 0.001;
            // group.rotation.y = mouse.x * 0.5;
            gsap.to(group.rotation, {
                x: mouse.y * 0.3,
                y: mouse.x * 0.5,
                duration: 2
            })
        }
        animate()
    }
}
</script>

<style>
/*  */
</style>
