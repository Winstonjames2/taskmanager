const Dashboard: React.FC = () => {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow">📋 Tasks Overview</div>
        <div className="bg-white p-4 rounded shadow">📈 Analytics</div>
        <div className="bg-white p-4 rounded shadow">⚙️ Settings</div>
      </div>
    </div>
  );
};

export default Dashboard;
