export class JsxHelper {

  constructor(component) {
    this.component = component;
    this.props = component.props;
    this.value = this.props.value;
    this.baseClasses = [];
  }

  runDefaultHandleClick(event) {
    try {
      if (!this.value.disabled && this.value.onClick) {
        this.value.onClick();
      }
    } catch (error) {
      window.alert(error.message);
    }
  }

  begin(callback) {
    try {
      return callback(this);
    } catch (error) {
      window.alert(error.message);
    }
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
