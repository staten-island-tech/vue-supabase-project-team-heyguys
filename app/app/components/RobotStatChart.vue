<template>
  <div class="w-full flex justify-center mt-4">
    <svg
      ref="svgRef"
      :viewBox="`0 0 ${width} ${height}`"
      preserveAspectRatio="xMidYMid meet"
      class="w-full max-w-[180px] select-none"
    ></svg>
  </div>
</template>

<script setup lang="ts">
import * as d3 from 'd3'

/**
 * Renders a small D3 bar chart for HP / Attack / Defense / Speed.
 *
 * - hp     = Head's stat
 * - attack = Left Arm stat + Right Arm stat
 * - defense = Body's stat
 * - speed  = Left Leg stat + Right Leg stat
 *
 * `maxValue` sets the top of the y-scale. Since attack/speed are the SUM
 * of two parts, this should usually be ~2x the highest single-part stat
 * you expect (so a maxed-out arm pair doesn't overflow the chart).
 * Tweak the default below to match your game's actual stat ranges.
 */
const props = withDefaults(
  defineProps<{
    stats: statSpread
    maxValue?: number
  }>(),
  {
    maxValue: 100,
  },
)

const width = 220
const height = 110
const margin = { top: 10, right: 6, bottom: 16, left: 6 }

const svgRef = ref<SVGSVGElement | null>(null)

// Colors corresponding to each stat - tweak these to match your palette
const statConfig = [
  { key: 'hp', label: 'HP', color: '#4ade80' },
  { key: 'attack', label: 'ATK', color: '#f87171' },
  { key: 'defense', label: 'DEF', color: '#60a5fa' },
  { key: 'speed', label: 'SPD', color: '#facc15' },
] as const

type ChartDatum = {
  key: (typeof statConfig)[number]['key']
  label: string
  color: string
  value: number
}

function draw() {
  if (!svgRef.value) return

  const svg = d3.select(svgRef.value)
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const data: ChartDatum[] = statConfig.map((cfg) => ({
    ...cfg,
    value: props.stats[cfg.key] ?? 0,
  }))

  const x = d3
    .scaleBand<string>()
    .domain(data.map((d) => d.label))
    .range([0, innerWidth])
    .padding(0.35)

  const y = d3
    .scaleLinear()
    .domain([0, props.maxValue])
    .range([innerHeight, 0])
    .clamp(true)

  // Persistent <g> for the plot area, created once
  let chartArea = svg.select<SVGGElement>('g.chart-area')
  if (chartArea.empty()) {
    chartArea = svg
      .append('g')
      .attr('class', 'chart-area')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
  }

  // Baseline
  let baseline = chartArea.select<SVGLineElement>('line.baseline')
  if (baseline.empty()) {
    baseline = chartArea.append('line').attr('class', 'baseline')
  }
  baseline
    .attr('x1', 0)
    .attr('x2', innerWidth)
    .attr('y1', innerHeight)
    .attr('y2', innerHeight)
    .attr('stroke', '#1f2937')
    .attr('stroke-width', 1.5)

  // Bars
  chartArea
    .selectAll<SVGRectElement, ChartDatum>('rect.bar')
    .data(data, (d) => d.key)
    .join(
      (enter) =>
        enter
          .append('rect')
          .attr('class', 'bar')
          .attr('x', (d) => x(d.label) ?? 0)
          .attr('width', x.bandwidth())
          .attr('y', innerHeight)
          .attr('height', 0)
          .attr('fill', (d) => d.color)
          .attr('stroke', '#1f2937')
          .attr('stroke-width', 1.5)
          .call((enter) =>
            enter
              .transition()
              .duration(350)
              .attr('y', (d) => y(d.value))
              .attr('height', (d) => innerHeight - y(d.value)),
          ),
      (update) =>
        update.call((update) =>
          update
            .transition()
            .duration(350)
            .attr('x', (d) => x(d.label) ?? 0)
            .attr('width', x.bandwidth())
            .attr('y', (d) => y(d.value))
            .attr('height', (d) => innerHeight - y(d.value)),
        ),
      (exit) => exit.remove(),
    )

  // Value labels above each bar
  chartArea
    .selectAll<SVGTextElement, ChartDatum>('text.value-label')
    .data(data, (d) => d.key)
    .join(
      (enter) =>
        enter
          .append('text')
          .attr('class', 'value-label press-start')
          .attr('text-anchor', 'middle')
          .attr('font-size', '9px')
          .attr('fill', '#1f2937')
          .attr('x', (d) => (x(d.label) ?? 0) + x.bandwidth() / 2)
          .attr('y', (d) => y(d.value) - 4)
          .text((d) => d.value),
      (update) =>
        update.call((update) =>
          update
            .transition()
            .duration(350)
            .attr('x', (d) => (x(d.label) ?? 0) + x.bandwidth() / 2)
            .attr('y', (d) => y(d.value) - 4)
            .textTween(function (d) {
              const node = this as SVGTextElement
              const start = Number(node.textContent) || 0
              const i = d3.interpolateRound(start, d.value)
              return (t) => (node.textContent = String(i(t)))
            }),
        ),
      (exit) => exit.remove(),
    )

  // Axis labels (HP / ATK / DEF / SPD) under each bar, color-matched
  let axis = svg.select<SVGGElement>('g.x-axis')
  if (axis.empty()) {
    axis = svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(${margin.left}, ${margin.top + innerHeight + 12})`)
  }

  axis
    .selectAll<SVGTextElement, ChartDatum>('text.axis-label')
    .data(data, (d) => d.key)
    .join('text')
    .attr('class', 'axis-label press-start')
    .attr('text-anchor', 'middle')
    .attr('font-size', '8px')
    .attr('fill', (d) => d.color)
    .attr('stroke', '#1f2937')
    .attr('stroke-width', 0.4)
    .attr('x', (d) => (x(d.label) ?? 0) + x.bandwidth() / 2)
    .attr('y', 0)
    .text((d) => d.label)
}

onMounted(draw)
watch(() => props.stats, draw, { deep: true })
</script>