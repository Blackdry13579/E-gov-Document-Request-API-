import React from 'react';
import { cn } from '../utils/cn';

/**
 * Multi-step progress indicator
 */
const StepProgress = ({ steps, currentStep }) => {
  return (
    <div className="w-full flex items-center justify-between mb-10 px-4">
      {steps.map((step, idx) => {
        const isCompleted = idx < currentStep;
        const isActive = idx === currentStep;
        
        return (
          <React.Fragment key={idx}>
            {/* Step Circle */}
            <div className="flex flex-col items-center gap-2">
              <div className={cn(
                'size-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all',
                isCompleted ? 'bg-emerald-500 border-emerald-500 text-white' :
                isActive ? 'bg-primary border-primary text-white scale-110 shadow-lg shadow-primary/20' :
                'bg-white border-slate-200 text-slate-400'
              )}>
                {isCompleted ? <span className="material-symbols-outlined text-xl">check</span> : idx + 1}
              </div>
              <span className={cn(
                'text-[10px] font-bold uppercase tracking-wider',
                isActive ? 'text-primary' : 'text-slate-400'
              )}>
                {step}
              </span>
            </div>

            {/* Line connector */}
            {idx < steps.length - 1 && (
              <div className="flex-1 h-0.5 bg-slate-100 mx-4 mt-[-20px]">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-500"
                  style={{ width: isCompleted ? '100%' : '0%' }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StepProgress;
