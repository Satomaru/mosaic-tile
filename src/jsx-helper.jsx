export class JsxHelper {

  static alertWhenError(callback) {
    try {
      return callback();
    } catch (error) {
      window.alert(error.message || error);
      throw error;
    }
  }

  constructor(component) {
    this.component = component;
    this.props = component.props;
    this.value = component.props?.value;
    this.baseClasses = [];
  }

  runDefaultHandleClick(event) {
    JsxHelper.alertWhenError(() => {
      if (!this.value.disabled && this.value.onClick) {
        this.value.onClick();
      }
    });
  }

  runDefaultHandleContextMenu(event) {
    JsxHelper.alertWhenError(() => {
      event.preventDefault();

      if (!this.value.disabled && this.value.onContextMenu) {
        this.value.onContextMenu();
      }
    });
  }

  begin(callback) {
    return JsxHelper.alertWhenError(() => callback(this));
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

  getHandleContextMenu() {
    return (event) => this.component.handleContextMenu(event);
  }
}
