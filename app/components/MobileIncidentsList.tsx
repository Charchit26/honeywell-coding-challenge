import { ReactNode } from 'react';
import styles from '../page.module.scss';
import PageNavigation from './PageNavigation';

interface Incident {
  name: string;
  id: number;
  priority: number;
  datetime: string;
  locationId: string;
}

interface MobileIncidentsListProps {
  incidents: Incident[];
  locations: Record<string, string>;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  getPriorityLabel: (priority: number) => ReactNode;
  formatDateTime: (dateString: string) => string;
}

export function MobileIncidentsList({
  incidents,
  locations,
  currentPage,
  setCurrentPage,
  totalPages,
  getPriorityLabel,
  formatDateTime,
}: MobileIncidentsListProps) {
  return (
    <>
      <div className={styles.listWrapper}>
        {incidents.map((incident) => (
          <div key={incident.id} className={styles.listItem}>
              <div><strong>{incident.name}</strong></div>
              <div>{getPriorityLabel(incident.priority)}</div>
              <div>Location:{locations[incident.locationId] || 'unknown'}</div>
              <div>Date:{formatDateTime(incident.datetime)}</div>
          </div>
        ))}
      </div>

      <PageNavigation currentPage={currentPage} totalPages={totalPages} 
      incidentsLength={incidents.length} setCurrentPage={setCurrentPage} />
    </>
  );
}
