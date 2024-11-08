import React from 'react';

export function CardField({ label, children }: { label?: string, children: React.ReactNode }) {

    return (
        <div style={{display:'flex', gap: '12px', flexWrap:'wrap'}}>
            <label style={{color: '#a7a7a7'}}>{`${label}: `}</label>
            {children}
        </div>
    )
}