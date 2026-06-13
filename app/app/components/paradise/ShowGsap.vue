<template>
    <div class="w-full min-h-[70%] border-2 border-white rounded-2xl p-[1%] flex justify-between">
        <h2 class="press-start text-purple-700 text-xl max-h-[12%]"> SOME GSAP THING. LOOK AT THIS LITTLE GUY BE CONSTRUCTED AND RECONSTRUCTED. </h2>
        <div class="flex flex-row justify-between items-center h-[85%]">
            <div class="flex items-center justify-center bg-slate-200 rounded-2xl max-h-full p-4">
                <div class="flex items-center justify-center w-[220px] h-[310px]">
                    <svg ref="figRef" viewBox="0 0 220 310" width="310" height="220"
                        class="-rotate-90 overflow-visible">
                        <rect id="head" x="80" y="10" width="60" height="60" rx="5" fill="#7F77DD" />
                        <rect id="body" x="65" y="80" width="90" height="110" rx="5" fill="#534AB7" />
                        <rect id="leftArm" x="22" y="80" width="36" height="90" rx="5" fill="#AFA9EC" />
                        <rect id="rightArm" x="162" y="80" width="36" height="90" rx="5" fill="#AFA9EC" />
                        <rect id="leftLeg" x="65" y="198" width="40" height="90" rx="5" fill="#3C3489" />
                        <rect id="rightLeg" x="115" y="198" width="40" height="90" rx="5" fill="#3C3489" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const figRef = ref<SVGSVGElement | null>(null)
let timeline: gsap.core.Timeline | null = null

type PieceKey = 'head' | 'body' | 'leftArm' | 'rightArm' | 'leftLeg' | 'rightLeg'

interface Position {
    x: number
    y: number
}

const scattered: Record<PieceKey, Position> = {
    head: { x: -100, y: -120 },
    body: { x: 60, y: -150 },
    leftArm: { x: -130, y: 50 },
    rightArm: { x: 160, y: -50 },
    leftLeg: { x: -70, y: 160 },
    rightLeg: { x: 140, y: 150 },
}

const order: PieceKey[] = ['head', 'body', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg']

function getElements(): Record<PieceKey, SVGRectElement> | null {
    if (!figRef.value) return null
    const get = (id: PieceKey) => figRef.value!.querySelector<SVGRectElement>(`#${id}`)
    const els = Object.fromEntries(order.map(k => [k, get(k)])) as Record<PieceKey, SVGRectElement | null>
    if (Object.values(els).some(el => !el)) return null
    return els as Record<PieceKey, SVGRectElement>
}

function buildTimeline(els: Record<PieceKey, SVGRectElement>): gsap.core.Timeline {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 })

    for (const k of order) {
        gsap.set(els[k], {
            x: scattered[k].x,
            y: scattered[k].y,
            opacity: 0,
            rotation: gsap.utils.random(-90, 90),
            transformOrigin: '50% 50%',
        })
    }

    tl.to(Object.values(els), { opacity: 1, duration: 0.01 })

    order.forEach((k, i) => {
        tl.to(
            els[k],
            { x: 0, y: 0, rotation: 0, duration: 0.55, ease: 'back.out(1.4)', delay: i === 0 ? 0.2 : 0 },
            i === 0 ? 'assemble' : `assemble+=${i * 0.12}`,
        )
    })

    tl.to({}, { duration: 1.2 })

        ;[...order].reverse().forEach((k, i) => {
            tl.to(
                els[k],
                {
                    x: scattered[k].x,
                    y: scattered[k].y,
                    rotation: gsap.utils.random(-100, 100),
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.in',
                },
                `break+=${i * 0.08}`,
            )
        })

    tl.to({}, { duration: 0.5 })

    return tl
}

onMounted(() => {
    const els = getElements()
    if (!els) return
    timeline = buildTimeline(els)
})

onUnmounted(() => {
    timeline?.kill()
    timeline = null
})
</script>