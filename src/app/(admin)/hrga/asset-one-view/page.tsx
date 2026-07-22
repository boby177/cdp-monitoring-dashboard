import PowerBIAssetOneView from "@/components/power-bi/asset-one-view";

export default function MonitoringPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Asset One View Power BI
      </h1>
      <PowerBIAssetOneView />
    </div>
  );
}