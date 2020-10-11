import { utils } from '../utils';

export class JsxHelper {

  constructor(component) {
    this.component = component;
    this.props = component.props;
    this.value = component.props?.value;
    this.baseClasses = [];
  }

  runDefaultHandleClick(event) {
    utils.alertWhenError(() => {
      if (!this.value.disabled && this.value.onClick) {
        this.value.onClick();
      }
    });
  }

  begin(callback) {
    return utils.alertWhenError(() => callback(this));
  }

  addBaseClass(name) {
    this.baseClasses.push(name);
  }

  getClassName() {
    if (this.baseClasses.length > 0) {
      const names = this.baseClasses.slice();

      if (this.value.className) {
        names.push(this.value.className);
      }

      return names.join(' ');
    }
  }

  getHandleClick() {
    return (event) => this.component.handleClick(event);
  }
}
