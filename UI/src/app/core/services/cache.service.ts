import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable({ providedIn: 'root' })
export class CacheService {
    constructor(private _localStorageService: LocalStorageService) { }

    /**
     * get the value from storage for pair of key
     * @param  {string} cacheKey
     */
    public get(cacheKey: string): any {
        if (cacheKey) {
            return this._localStorageService.get(cacheKey);
        }
    }

    /**
     * save the value into storage with pair of key
     * @param  {string} cacheKey
     */
    public set(cacheKey: string, cacheValue: any): void {
        if (cacheKey && cacheValue) {
            //localStorage.setItem(cacheKey, cacheValue)
            this._localStorageService.set(cacheKey, cacheValue);
        }
    }

    /**
     * remove the value form storage
     * @param  {string} cacheKey
     */
    public remove(cacheKey: string): void {
        if (cacheKey) {
            //this._localStorageService.remove(cacheKey);
        }
    }

    /**
     * remove the value form storage
     * @param  {string} cacheKey
     */
    public removeAll(isValid: boolean): void {
        if (isValid) {
            this._localStorageService.clearAll();
        }
    }
}