import { Component, OnInit, OnDestroy } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { DataService } from './services/data-service/data-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'jokes';

  subscription:Subscription

  joke;

  constructor(private updates: SwUpdate,private dataSvc:DataService) {
    this.updates.available.subscribe(event => {
      // this.update = true;
      this.updates.activateUpdate().then(()=>{
        document.location.reload();
      })
    })
  }

  ngOnInit(){
    this.subscription = this.dataSvc.giveMeJoke().subscribe(joke=>{
      this.joke = joke;
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
