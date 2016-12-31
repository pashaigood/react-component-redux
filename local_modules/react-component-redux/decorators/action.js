/**
 * @author PBelugin
 * TODO: Add some checking.
 */
export default (component, name, prop) => {
  component.rootActions = component.rootActions || {};
  component.rootActions[name] = prop.value;

  return prop;
}
