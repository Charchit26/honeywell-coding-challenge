import styles from '../page.module.scss';
import PageNavigation from './PageNavigation';

interface Incident {
  name: string;
  id: number;
  priority: number;
  datetime: string;
  locationId: string;
}

interface DesktopIncidentsTableProps {
  incidents: Incident[];
  locations: Record<string, string>;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  getPriorityLabel: (priority: number) => React.ReactNode;
  getPriorityIcon: (priority: number) => string | null;
  formatDateTime: (dateString: string) => string;
}

export function DesktopIncidentsTable({
  incidents,
  locations,
  currentPage,
  setCurrentPage,
  totalPages,
  getPriorityLabel,
  getPriorityIcon,
  formatDateTime,
}: DesktopIncidentsTableProps) {
  return (
    <>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th></th>
              <th>Incident</th>
              <th>Date & Time</th>
              <th>Priority</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((incident) => (
              <tr key={incident.id}>
                <td><img src={`img/${getPriorityIcon(incident.priority)}`}></img></td>
                <td>{incident.name}</td>
                <td>
                  {formatDateTime(incident.datetime)}
                </td>
                <td>
                  {getPriorityLabel(incident.priority)}
                </td>
                <td>
                  {locations[incident.locationId] || 'unknown'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PageNavigation currentPage={currentPage} totalPages={totalPages} 
      incidentsLength={incidents.length} setCurrentPage={setCurrentPage} />
    </>
  );
}
