import React from 'react';
import { render, screen } from '@testing-library/react';
import { MobileIncidentsList } from '../MobileIncidentsList';

const sampleIncidents = [
  { id: 1, name: 'Leak detected', priority: 1, datetime: new Date().toISOString(), locationId: 'LAX' },
  { id: 2, name: 'Power issue', priority: 2, datetime: new Date().toISOString(), locationId: 'JFK' },
];

const locations = { LAX: 'Los Angeles', JFK: 'New York' };

describe('MobileIncidentsList', () => {
  it('renders incidents and pagination info', () => {
    render(
      <MobileIncidentsList
        incidents={sampleIncidents}
        locations={locations}
        currentPage={1}
        setCurrentPage={() => {}}
        totalPages={1}
        getPriorityLabel={() => <span>High</span>}
        formatDateTime={() => 'now'}
      />
    );

    expect(screen.getByText('Leak detected')).toBeInTheDocument();
    expect(screen.getByText('Power issue')).toBeInTheDocument();
    expect(screen.getByText(/Page 1 of/)).toBeInTheDocument();
    expect(screen.getByText('Location:Los Angeles')).toBeInTheDocument();
  });
});
