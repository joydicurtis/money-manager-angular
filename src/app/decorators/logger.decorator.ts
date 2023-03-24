export function Logger(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {

  const originalMethod = descriptor.value;

  const date = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour:  "numeric",
    minute: "numeric",
    second: "2-digit"
  })

  const style = 'border: 1px solid black; font-weight: bold;';
  const style2 = 'font-weight: bold;';
  const style3 = 'color: green';

  function getMessage() {
    let text: string = '';
    switch(propertyKey) {
      case 'getItems': {
       text = 'Transactions data was fetched';
       break;
      }
      case 'deleteItem': {
        text = 'Delete event was emitted to parent component';
        break;
      }
      case 'openDialog': {
        text = 'Create transaction dialog was opened';
        break;
      }
      case 'submit': {
        text = 'Data was submitted';
        break;
      }
      case 'close': {
        text = 'Dialog was closed without saving data';
        break;
      }
      case 'openEditDialog': {
        text = 'Edit transaction dialog was opened';
        break;
      }
    }
    return text;
  }

  descriptor.value = function (...args: any[]) {
    console.log(`%c${date}`, style);
    const result = originalMethod.apply(this, args);
    console.log(`%c${propertyKey}`, style2, 'function was performed!');
    console.log(`%c${getMessage()}`, style3);
    console.log('');
    return result;
  }

}
