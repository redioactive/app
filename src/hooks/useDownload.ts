const useDownload = (tableData: any[]) => {
  const convertToCSV = (data: any[]) => {
    const header = Object.keys(data[0]).join(",");
    const rows = data.map((row) =>
      Object.values(row)
        .map((value) => `"${value}"`)
        .join(",")
    );
    return [header, ...rows].join("\n");
  };

  const downloadFile = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const down = () => {
    const BOM = "\uFEFF";
    const csvData = BOM + convertToCSV(tableData);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    downloadFile(url, "data.csv");
  };

  return { down };
};

export default useDownload;

