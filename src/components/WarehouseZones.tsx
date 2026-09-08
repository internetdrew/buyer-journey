import { useId } from 'react';
import type { ZoneId } from '../rollout-data';

const zones: { id: ZoneId; x: number; y: number; width: number; height: number }[] = [
  { id: 'A', x: 8, y: 8, width: 164, height: 92 },
  { id: 'B', x: 184, y: 8, width: 228, height: 92 },
  { id: 'C', x: 8, y: 112, width: 164, height: 92 },
  { id: 'D', x: 184, y: 112, width: 228, height: 92 },
  { id: 'E', x: 8, y: 216, width: 404, height: 68 },
];

export default function WarehouseZones({ activeZones, previousZones }: {
  activeZones: ZoneId[];
  previousZones: ZoneId[];
}) {
  const titleId = useId();
  const newZones = activeZones.filter(zone => !previousZones.includes(zone));

  return (
    <figure>
      <figcaption className='text-sm font-medium'>
        Warehouse zones <span className='font-normal text-neutral-500'>· Illustrative</span>
      </figcaption>
      <svg viewBox='0 0 420 292' role='img' aria-labelledby={titleId} className='mt-3 w-full'>
        <title id={titleId}>
          {zones.map(({ id }) => `Zone ${id}: ${newZones.includes(id) ? 'introduced this week' : activeZones.includes(id) ? 'already active' : 'not yet active'}.`).join(' ')}
        </title>
        {zones.map(({ id, x, y, width, height }) => {
          const isNew = newZones.includes(id);
          const active = activeZones.includes(id);
          const color = active ? '#465637' : '#737373';
          return (
            <g key={id}>
              <rect x={x} y={y} width={width} height={height} rx='4' fill={isNew ? '#e9eedf' : active ? '#f5f6f2' : '#fafafa'} stroke={isNew ? '#647650' : '#d4d4d4'} strokeWidth={isNew ? 2 : 1} strokeDasharray={active ? undefined : '4 4'} />
              <text x={x + width / 2} y={y + height / 2 - 3} textAnchor='middle' fill={color} fontSize='16' fontFamily='inherit'>Zone {id}</text>
              <text x={x + width / 2} y={y + height / 2 + 16} textAnchor='middle' fill={color} fontSize='11' fontFamily='inherit'>
                {isNew ? 'New this week' : active ? 'Already active' : 'Not yet active'}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
