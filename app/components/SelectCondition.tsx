'use client';

import { Card, CardHeader } from '@/components/ui/card';
import { conditionTypes } from '../lib/conditionTypes';
import { useState } from 'react';

export function SelectCondition() {
  const [selectedCondition, setSelectedCondition] = useState<string | null>(
    null
  );
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8'>
      <input type='hidden' name='condition' value={selectedCondition || ''} />
      {conditionTypes.map((type) => (
        <div key={`condition-${type.id}`} className='cursor-pointer'>
          <Card
            className={
              selectedCondition === type.name
                ? 'border-primary border-2'
                : 'border-2 border-primary/10'
            }
            onClick={() => setSelectedCondition(type.name)}
          >
            <CardHeader className='text-primary'>
              {type.image}{' '}
              <h3 className='text-black font-medium'>{type.title}</h3>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
}
