export default (): void => {
  const reportContainer = document.getElementById('reportContainer');
  if (reportContainer) {
    reportContainer.classList.add('hidden');
  }
}