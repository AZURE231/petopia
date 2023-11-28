function subscribe(eventName: string, listener: (param: any) => void) {
  document.addEventListener(eventName, listener);
}

function unsubscribe(eventName: string, listener: (param: any) => void) {
  document.removeEventListener(eventName, listener);
}

function publish(eventName: string) {
  const event = new CustomEvent(eventName);
  document.dispatchEvent(event);
}

export { publish, subscribe, unsubscribe};