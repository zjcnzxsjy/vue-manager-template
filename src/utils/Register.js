export function registerStoreModules(requireModules) {
  console.log(requireModules)
  const modules = {};
  requireModules.keys().forEach(fileName => {
    const requireModuleName = fileName.replace(/(\.\/|\.js)/g, '');
    modules[requireModuleName] = {
      ...requireModules(fileName).default
    }
  })
  return modules;
}