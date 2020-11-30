import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class EventBrokerService{
    private _events: { [id: string]: EventEmitter<any>; } = {};
    register(eventName: string) {
        if (!this._events[eventName]) {
          this._events[eventName] = new EventEmitter();
        }
      }
    
      publish(eventName: string, payload: any = {}) {
        if (!this._events[eventName]) {
          console.error(`${eventName} event not registered...`);
          return;
        }
        this._events[eventName].next(payload);
      }
    
      subscribe(eventName: string) {
        if (!this._events[eventName]) {
          console.error(`${eventName} event not registered...`);
          return;
        }
        return this._events[eventName];
      }
    
      clearAll() {
        this._events = {};
      }
}