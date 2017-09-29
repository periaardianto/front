import { Component, HostListener, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { ActivatedRoute, Router } from '@angular/router';

import { Client, Upload } from '../../../services/api';
import { MindsTitle } from '../../../services/ux/title';
import { Navigation as NavigationService } from '../../../services/navigation';
import { MindsActivityObject } from '../../../interfaces/entities';
import { SessionFactory } from '../../../services/session';
import { Poster } from '../../../modules/legacy/controllers/newsfeed/poster/poster';

@Component({
  selector: 'minds-boost-newsfeed',
  templateUrl: 'boost-newsfeed.html'
})

export class BoostNewsfeed {

  newsfeed: Array<Object>;
  offset: string = '';
  inProgress: boolean = false;
  moreData: boolean = true;
  session = SessionFactory.build();
  showRightSidebar: boolean = true;
  minds;

  message: string = '';

  paramsSubscription: Subscription;

  pollingTimer: any;
  pollingOffset: string = '';
  pollingNewPosts: number = 0;

  @ViewChild('poster') private poster: Poster;

  constructor(public client: Client, public upload: Upload, public navigation: NavigationService,
              public router: Router, public route: ActivatedRoute, public title: MindsTitle) {
  }

  ngOnInit() {
    if (!this.session.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.load();
      //this.setUpPoll();
      this.minds = window.Minds;
    }

    this.paramsSubscription = this.route.params.subscribe(params => {

      if (params['ts']) {
        this.load(true);
      }
    });

    this.title.setTitle('Newsfeed');
    this.detectWidth();
  }

  pollingLoadNew() {
    if (!this.pollingOffset || !this.pollingNewPosts) {
      return;
    }

    if (this.pollingNewPosts > 120) { // just replace the whole newsfeed
      return this.load(true);
    }

    this.inProgress = true;

    console.warn('pollingLoadNew');
    this.client.get('api/v1/boost/fetch/newsfeed', {
      limit: this.pollingNewPosts,
      offset: this.pollingOffset,
      prepend: true
    }, { cache: true })
      .then((data: MindsActivityObject) => {
        this.inProgress = false;
        this.pollingNewPosts = 0;

        if (!data.activity) {
          return;
        }

        this.pollingOffset = data['load-previous'] ? data['load-previous']: '';
      })
      .catch(e => {
        this.inProgress = false;
      });
  }

  ngOnDestroy() {
    clearInterval(this.pollingTimer);
    this.paramsSubscription.unsubscribe();
  }

  /**
   * Load newsfeed
   */
  load(refresh: boolean = false) {
    if (this.inProgress) {
      //console.log('already loading more..');
      return false;
    }

    if (refresh) {
      this.offset = '';
      this.pollingOffset = '';
      this.pollingNewPosts = 0;
    }

    this.inProgress = true;

    this.client.get('api/v1/boost/fetch/newsfeed', { limit: 1, offset: this.offset }, { cache: true })
      .then((data: any) => {
        if (!data.boosts) {
          this.moreData = false;
          this.inProgress = false;
          return false;
        }
        if (this.newsfeed && !refresh) {
          this.newsfeed = this.newsfeed.concat(data.boosts);
        } else {
          this.newsfeed = data.boosts;

          if (data['load-previous']) {
            this.pollingOffset = data['load-previous'];
          }
        }
        this.offset = data['load-next'];
        this.inProgress = false;
      })
      .catch(function (e) {
        this.inProgress = false;
      });
  }

  delete(activity) {
    let i: any;
    for (i in this.newsfeed) {
      if (this.newsfeed[i] === activity)
        this.newsfeed.splice(i, 1);
    }
  }

  @HostListener('window:resize')
  detectWidth() {
    if (window.innerWidth < 1200)
      this.showRightSidebar = false;
    else
      this.showRightSidebar = true;
  }

  canDeactivate() {
    if (!this.poster || !this.poster.attachment)
      return true;
    const progress = this.poster.attachment.getUploadProgress();
    if (progress > 0 && progress < 100) {
      return confirm('Your file is still uploading. Are you sure?');
    }

    return true;
  }

  onViewed(activity: any) {
    this.client.put('api/v1/boost/fetch/newsfeed/' + activity.boosted_guid);
  }

}
