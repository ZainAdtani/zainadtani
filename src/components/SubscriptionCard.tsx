import { useTilt } from '@/hooks/use-tilt';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Pause, Trash2 } from 'lucide-react';
import { Subscription } from '@/types/subscription';

interface SubscriptionCardProps {
  subscription: Subscription;
  onEdit: (subscription: Subscription) => void;
  onTogglePause: (id: string) => void;
  onDelete: (id: string) => void;
}

export function SubscriptionCard({ subscription, onEdit, onTogglePause, onDelete }: SubscriptionCardProps) {
  const { ref, transform } = useTilt();

  return (
    <div
      ref={ref}
      className={`relative group transition-all duration-300 ${
        subscription.paused ? 'opacity-50' : ''
      }`}
      style={{ 
        transform,
        transition: 'transform 0.1s ease-out',
      }}
    >
      {/* Glow effect for active subscriptions */}
      {!subscription.paused && (
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300" />
      )}

      {/* Card */}
      <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-1">{subscription.name}</h3>
            <Badge 
              variant="outline" 
              className="text-xs border-white/30 text-white/70"
            >
              {subscription.cadence}
            </Badge>
          </div>
        </div>

        {/* Amount */}
        <div className="mb-4">
          <p className="text-2xl font-bold text-white">{subscription.amount}</p>
          {subscription.nextBillDate && (
            <p className="text-xs text-white/50 mt-1">Next bill: {subscription.nextBillDate}</p>
          )}
        </div>

        {/* Details */}
        <div className="space-y-2 mb-4">
          {subscription.method && (
            <p className="text-sm text-white/70">{subscription.method}</p>
          )}
          {subscription.category && (
            <Badge variant="secondary" className="text-xs bg-white/10 text-white/80 border-0">
              {subscription.category}
            </Badge>
          )}
        </div>

        {/* Mini sparkline placeholder */}
        <div className="h-8 mb-4 flex items-end gap-1">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="flex-1 bg-white/20 rounded-sm"
              style={{ height: `${20 + Math.random() * 80}%` }}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(subscription)}
            className="flex-1 text-white/70 hover:text-white hover:bg-white/10"
          >
            <Edit className="w-3 h-3 mr-1" />
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onTogglePause(subscription.id)}
            className="flex-1 text-white/70 hover:text-white hover:bg-white/10"
          >
            <Pause className="w-3 h-3 mr-1" />
            {subscription.paused ? 'Resume' : 'Pause'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(subscription.id)}
            className="text-red-400/70 hover:text-red-400 hover:bg-red-500/10"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
