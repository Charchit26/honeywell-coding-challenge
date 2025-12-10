import React from 'react';
import { render, screen } from '@testing-library/react';
import { DesktopIncidentsTable } from '../DesktopIncidentsTable';

const sampleIncidents = [
  { id: 10, name: 'Bush Fire', priority: 2, datetime: new Date().toISOString(), locationId: 'SYD' },
];

const locations = { SYD: 'Sydney' };

describe('DesktopIncidentsTable', () => {
  it('renders table rows and pagination info', () => {
    render(
      <DesktopIncidentsTable
        incidents={sampleIncidents}
        locations={locations}
        currentPage={1}
        setCurrentPage={() => {}}
        totalPages={1}
        getPriorityLabel={() => <span>High</span>}
        getPriorityIcon={() => 'alarm-medium.svg'}
        formatDateTime={() => 'now'}
      />
    );

    expect(screen.getByText('Incident')).toBeInTheDocument();
    expect(screen.getByText('Bush Fire')).toBeInTheDocument();
    expect(screen.getByText('Sydney')).toBeInTheDocument();
    expect(screen.getByText(/Page 1 of/)).toBeInTheDocument();
  });
});
