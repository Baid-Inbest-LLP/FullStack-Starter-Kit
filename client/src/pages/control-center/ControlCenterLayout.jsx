import { NavLink, Outlet } from 'react-router-dom';
import PageBanner from '../../components/common/PageBanner';
import { ROUTES } from '../../constants';

// Add a tab here (and a child route in App.jsx) for each new master-data section.
const tabs = [{ label: 'Theme', to: ROUTES.CONTROL_CENTER_THEME }];

export default function ControlCenterLayout() {
  return (
    <div>
      <PageBanner
        className="mb-4"
        title="Control Center"
        subtitle="App-wide configuration and master data"
      />

      <div className="control-center-tabs-shell mb-4">
        <div className="control-center-tabs-list" role="tablist" aria-label="Control Center">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                isActive ? 'control-center-tab control-center-tab--active' : 'control-center-tab'
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </div>
      </div>

      <Outlet />
    </div>
  );
}
