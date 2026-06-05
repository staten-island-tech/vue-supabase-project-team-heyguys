<template>
  <div class="chart-container w-full max-w-2xl mx-auto p-6 flex flex-col items-center justify-center relative select-none">
    <h2 class="text-xl font-bold mb-6 text-gray-800 dark:text-gray-100 tracking-wide">
      Gacha Drop Probability Distribution
    </h2>
    
    <div v-if="!gachaStore.initialized" class="text-gray-500 animate-pulse py-12 flex flex-col items-center gap-2">
      <div class="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
      <span>Loading gacha drops...</span>
    </div>
    
    <div v-else-if="isEmpty" class="text-gray-400 py-12 italic">
      No items found in the database to display.
    </div>

    <div v-show="gachaStore.initialized && !isEmpty" class="relative w-full flex justify-center">
      <div ref="chartRef" class="w-full max-w-[500px]"></div>
      
      <div 
        ref="tooltipRef"
        class="absolute pointer-events-none opacity-0 bg-slate-900 text-white p-3 rounded-xl shadow-2xl text-sm border border-slate-700/50 backdrop-blur-md transition-opacity duration-200 z-50 min-w-[180px]"
      >
        <div class="font-bold border-b border-slate-700/60 pb-1.5 mb-1.5 text-gray-100" id="tooltip-title"></div>
        <div id="tooltip-rarity" class="text-xs font-bold px-2 py-0.5 rounded inline-block my-0.5"></div>
        <div class="text-emerald-400 font-medium mt-1" id="tooltip-percentage"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGachaStore } from "#imports"
import * as d3 from 'd3'

const gachaStore = useGachaStore()
const chartRef = ref<HTMLElement | null>(null)
const tooltipRef = ref<HTMLElement | null>(null)

// Ensure data exists before drawing
const isEmpty = computed(() => {
  return !gachaStore.rewardData || gachaStore.rewardData.length === 0
})

// Configuration for colors & exact store drop rates
const rarityConfig: Record<string, { color: string; prob: number }> = {
  Legendary: { color: '#fbbf24', prob: 0.01 }, // Yellow-400
  Epic: { color: '#c084fc', prob: 0.09 },      // Purple-400
  Rare: { color: '#38bdf8', prob: 0.30 },      // Sky-400
  Common: { color: '#9ca3af', prob: 0.60 }     // Gray-400
}

onMounted(async () => {
  if (!gachaStore.initialized) {
    await gachaStore.initialize()
  }
  renderChart()
})

// Re-render chart reactively if initialized state flips asynchronously
watch(() => gachaStore.initialized, (newVal) => {
  if (newVal) {
    nextTick(() => renderChart())
  }
})

function renderChart() {
  if (!chartRef.value || !gachaStore.initialized || isEmpty.value) return

  // Clear pre-existing SVG elements on re-renders
  d3.select(chartRef.value).selectAll('*').remove()

  const width = 500
  const height = 500
  const radius = Math.min(width, height) / 2

  // Distinct dimensional tracks for the inner (Rarities) and outer (Pieces) rings
  const innerRadiusStart = 0
  const innerRadiusEnd = radius * 0.45
  const outerRadiusStart = radius * 0.50
  const outerRadiusEnd = radius * 0.90

  const innerData: any[] = []
  const outerData: any[] = []

  // Transform store probabilityTable into D3-compatible datasets
  gachaStore.probabilityTable.forEach((tier) => {
    const pieces = tier.pieces || []
    if (pieces.length === 0) return // Omit empty categories to keep chart clean

    const config = rarityConfig[tier.rarityName] || { color: '#e5e7eb', prob: 0 }
    
    // Inner track entry (Collective Category)
    innerData.push({
      type: 'rarity',
      name: `${tier.rarityName} Items`,
      rarityName: tier.rarityName,
      probability: config.prob * 100,
      color: config.color
    })

    // Outer track entries (Individual breakdown per piece)
    const pieceProb = (config.prob / pieces.length) * 100
    pieces.forEach((piece, index) => {
      // Intelligently cycle brightness variant of base color to distinguish adjacent pieces
      const baseColor = d3.color(config.color)
      let variantColor = config.color
      if (baseColor) {
        variantColor = index % 2 === 0 
          ? baseColor.brighter(0.2).formatHex() 
          : baseColor.darker(0.1).formatHex()
      }

      outerData.push({
        type: 'piece',
        name: piece.name,
        rarityName: tier.rarityName,
        probability: pieceProb,
        color: variantColor,
        meta: piece
      })
    })
  })

  // Append SVG wrapper Canvas
  const svg = d3.select(chartRef.value)
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('style', 'max-width: 100%; height: auto;')
    .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`)

  // Generators: .sort(null) is vital to preserve identical sequence order across both rings
  const pieInner = d3.pie<any>().value((d:any) => d.probability).sort(null)
  const pieOuter = d3.pie<any>().value((d:any) => d.probability).sort(null)

  const arcInner = d3.arc<any>().innerRadius(innerRadiusStart).outerRadius(innerRadiusEnd)
  const arcOuter = d3.arc<any>().innerRadius(outerRadiusStart).outerRadius(outerRadiusEnd)

  // 1. Draw Inner Ring (Rarities)
  const innerSlices = svg.selectAll('.inner-slice')
    .data(pieInner(innerData))
    .enter()
    .append('g')

  innerSlices.append('path')
    .attr('d', arcInner)
    .attr('fill', (d:any) => d.data.color)
    .attr('stroke', '#ffffff')
    .attr('stroke-width', '2px')
    .style('cursor', 'pointer')
    .on('mouseover', handleMouseOver)
    .on('mousemove', handleMouseMove)
    .on('mouseleave', handleMouseLeave)

  // Context text inside inner track (Only shown if space permits)
  innerSlices.append('text')
    .attr('transform', (d:any) => `translate(${arcInner.centroid(d)})`)
    .attr('dy', '0.35em')
    .attr('text-anchor', 'middle')
    .attr('fill', '#1e293b')
    .style('font-size', '12px')
    .style('font-weight', '700')
    .style('pointer-events', 'none')
    .text((d:any) => d.data.probability >= 8 ? d.data.rarityName : '')

  // 2. Draw Outer Ring (Pieces)
  const outerSlices = svg.selectAll('.outer-slice')
    .data(pieOuter(outerData))
    .enter()
    .append('g')

  outerSlices.append('path')
    .attr('d', arcOuter)
    .attr('fill', (d:any) => d.data.color)
    .attr('stroke', '#ffffff')
    .attr('stroke-width', '1px')
    .style('cursor', 'pointer')
    .on('mouseover', handleMouseOver)
    .on('mousemove', handleMouseMove)
    .on('mouseleave', handleMouseLeave)

  // Interactive Hover Context Interactions
  function handleMouseOver(event: MouseEvent, d: any) {
    if (!tooltipRef.value) return
    const data = d.data
    const tooltip = d3.select(tooltipRef.value)
    
    // Inject node contextual parameters
    tooltip.select('#tooltip-title').text(data.name)
    
    const badge = tooltip.select('#tooltip-rarity').text(data.rarityName)
    let badgeStyle = 'bg-gray-500 text-white'
    if (data.rarityName === 'Legendary') badgeStyle = 'bg-yellow-400 text-slate-900'
    else if (data.rarityName === 'Epic') badgeStyle = 'bg-purple-500 text-white'
    else if (data.rarityName === 'Rare') badgeStyle = 'bg-sky-500 text-white'
    
    badge.attr('class', `text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded inline-block my-0.5 ${badgeStyle}`)
    tooltip.select('#tooltip-percentage').text(`Roll Chance: ${data.probability.toFixed(2)}%`)

    // Visual segment scale response
    d3.select(event.currentTarget as SVGPathElement)
      .transition()
      .duration(150)
      .attr('opacity', 0.85)

    tooltip.style('opacity', 1)
  }

  function handleMouseMove(event: MouseEvent) {
    if (!tooltipRef.value || !chartRef.value) return
    
    // Compute exact mouse position inside component dimensions
    const bounds = chartRef.value.getBoundingClientRect()
    const x = event.clientX - bounds.left
    const y = event.clientY - bounds.top

    // Dynamic floating positioning safely away from cursor path
    d3.select(tooltipRef.value)
      .style('left', `${x + 20}px`)
      .style('top', `${y + 10}px`)
  }

  function handleMouseLeave(event: MouseEvent) {
    if (!tooltipRef.value) return
    
    d3.select(event.currentTarget as SVGPathElement)
      .transition()
      .duration(150)
      .attr('opacity', 1)

    d3.select(tooltipRef.value).style('opacity', 0)
  }
}
</script>

<style scoped>
path {
  transition: filter 0.2s ease-in-out;
}
path:hover {
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.2));
}
</style>