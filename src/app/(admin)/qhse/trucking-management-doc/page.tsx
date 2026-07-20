import PowerBIReportKir from "@/components/power-bi/trucking-management-doc";

export default function MonitoringPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Trucking Management Document
      </h1>
      <PowerBIReportKir />
    </div>
  );
}