import DashboardHeader from "./_components/DashboardHeader";
import SideNavBar from "./_components/SideNavBar";

const DashBoardLayout = ({ children }) => {
  return (
    <div>
      <div className="fixed hidden h-screen md:w-64 md:block bg-slate-100">
        <SideNavBar />
      </div>
      <div className="md:ml-64">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
};
export default DashBoardLayout;
