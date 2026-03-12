import { Star } from 'lucide-react';

interface RatingStarsProps {
  nota: number;
  total?: number;
  showCount?: boolean;
}

export function RatingStars({ nota, total, showCount = true }: RatingStarsProps) {
  const fullStars = Math.floor(nota);
  const hasHalf = nota - fullStars >= 0.5;

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map(i => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i <= fullStars
                ? 'fill-secondary text-secondary'
                : i === fullStars + 1 && hasHalf
                ? 'fill-secondary/50 text-secondary'
                : 'fill-muted text-muted'
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-semibold text-foreground">{nota.toFixed(1)}</span>
      {showCount && total !== undefined && (
        <span className="text-sm text-muted-foreground">({total} aval.)</span>
      )}
    </div>
  );
}
