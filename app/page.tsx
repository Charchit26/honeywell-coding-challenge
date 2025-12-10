'use client';

import { useEffect, useState, useCallback, useMemo, useLayoutEffect } from 'react';
import styles from './page.module.scss';
import fakeAPI from './fake-api';
import { MobileIncidentsList } from './components/MobileIncidentsList';
import { DesktopIncidentsTable } from './components/DesktopIncidentsTable';

interface Incident {
  name: string;
  id: number;
  priority: number;
  datetime: string;
  locationId: string;
}

interface Location {
  name: string;
  id: string;
}

const DEFAULT_ITEMS_PER_PAGE = 3;

export default function Home() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [locations, setLocations] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allLocations = await fakeAPI.getLocations();
        setLocations(Object.fromEntries(
          allLocations.map((loc: Location) => [loc.id, loc.name])
        ));

        const incidentsArrays = await Promise.all(
          allLocations.map((loc: Location) => fakeAPI.getIncidentsByLocationId(loc.id))
        );

        console.log('Fetched incidents arrays:', incidentsArrays);

        const incidentIds = new Set<number>();
        const allIncidents = incidentsArrays
          .flat()
          .filter(incident => !incidentIds.has(incident.id) && incidentIds.add(incident.id))
          .sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());

        setIncidents(allIncidents);
        setCurrentPage(1);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useLayoutEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getPriorityLabel = useCallback((priority: number) => {
    const labels: Record<number, string> = {
      1: 'Critical',
      2: 'High',
      3: 'Medium',
    };
    return (
      <span>
        {labels[priority] || 'Unknown'}
      </span>
    );
  }, []);

  const getPriorityIcon = useCallback((priority: number) => {
    const icons: Record<number, string> = {
      1: 'alarm-high.svg',
      2: 'alarm-medium.svg',
      3: 'alarm-low.svg',
    };
    return icons[priority] || null;
  }, []);

  const formatDateTime = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleString();
  }, []);

  const paginatedIncidents = useMemo(() => {
    const startIndex = (currentPage - 1) * DEFAULT_ITEMS_PER_PAGE;
    const endIndex = startIndex + DEFAULT_ITEMS_PER_PAGE;
    return incidents.slice(startIndex, endIndex);
  }, [incidents, currentPage]);

  const totalPages = Math.ceil(incidents.length / DEFAULT_ITEMS_PER_PAGE);

  if (loading) {
    return (
      <main>
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1>Incidents</h1>
      </div>

      {incidents.length === 0 ? (
        <p className={styles.emptyTable}>No incidents to display.</p>
      ) : isMobile ? (
        <MobileIncidentsList
          incidents={paginatedIncidents}
          locations={locations}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          getPriorityLabel={getPriorityLabel}
          formatDateTime={formatDateTime}
        />
      ) : (
        <DesktopIncidentsTable
          incidents={paginatedIncidents}
          locations={locations}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          getPriorityLabel={getPriorityLabel}
          getPriorityIcon={getPriorityIcon}
          formatDateTime={formatDateTime}
        />
      )}
    </main>
  );
}
