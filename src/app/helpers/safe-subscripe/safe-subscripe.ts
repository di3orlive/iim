import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { OnDestroy } from '@angular/core';

export class SafeSubscribe implements OnDestroy {
  private _subscriptions: Subscription[] = [];
  public ngOnDestroy(): void {
    for (let sub of this._subscriptions) {
      sub.unsubscribe();
    }
  }

  public markForSafeDelete(sub: any) {
    this._subscriptions.push(sub);
  }
}

export function safeSubscribe<T>(this: Observable<T>, component: SafeSubscribe,
                                 next?: (value: T) => void, error?: (error: T) => void, complete?: () => void, ): Subscription {
  let sub = this.subscribe(next, error, complete);
  component.markForSafeDelete(sub);
  return sub;
}
Observable.prototype.safeSubscribe = safeSubscribe;

declare module 'rxjs/Observable' {
  interface Observable<T> {
    safeSubscribe: typeof safeSubscribe;
  }
}

